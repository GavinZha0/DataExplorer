<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Tooltip>
          <template #title>{{ t('common.toolbar.new') }}</template>
          <a-button
            type="primary"
            @click="handleCreate"
            style="position: absolute; left: 10px; top: 0px"
          >
            <Icon icon="ant-design:plus-outlined" :size="20" />
          </a-button>
        </Tooltip>
        <a-input-search
          v-model:value="searchText"
          allow-clear
          :placeholder="t('admin.menu.toolbar.search')"
          style="width: 320px"
          @search="handleSearch"
        />
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a @click="() => handleEdit(record)" style="margin-left: 5px">{{ record.name }}</a>
        </template>
        <template v-else-if="column.key === 'active'">
          <Switch
            v-model:checked="record.active"
            size="small"
            @click="() => handleActive(record.id, record.active)"
          />
        </template>
        <template v-else-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:plus-square-outlined',
                tooltip: t('common.toolbar.new'),
                onClick: handleCreate.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: t('common.table.action.delete'),
                popConfirm: {
                  title: t('common.table.action.confirm'),
                  placement: 'left',
                  confirm: handleDelete.bind(null, record.id),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <DetailForm @register="detailDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup name="MenuForm">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { Tooltip, Switch, message } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import DetailForm from './detailForm.vue';
  import { columns } from './data';
  import { API_MENU_ACTIVE, API_MENU_DEL, API_MENU_LIST } from '/@/api/admin/menu';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { cloneDeep } from 'lodash-es';

  const { t } = useI18n();
  const [detailDrawer, { openDrawer: openDetailDrawer }] = useDrawer();
  const [registerTable, { updateTableDataRecord, reload }] = useTable({
    //title: t('admin.menu.panel.menu'),
    api: API_MENU_LIST,
    columns,
    isTreeTable: true,
    defaultExpandAllRows: false, // doesn't work
    pagination: false,
    striped: false,
    useSearchForm: false, // don't use this.
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    actionColumn: {
      width: 80,
      title: t('common.table.title.action'),
      dataIndex: 'action',
    },
  });

  /*
   * create menu
   */
  function handleCreate(record: Recordable | undefined) {
    if (record) {
      let parentMenu = cloneDeep(record);
      parentMenu.pid = parentMenu?.id;
      delete parentMenu?.id;

      openDetailDrawer(true, { ...parentMenu });
    } else {
      openDetailDrawer(true, {});
    }
  }

  /*
   * edit menu
   */
  function handleEdit(record: Recordable) {
    openDetailDrawer(true, { ...record });
  }

  /*
   * activate or deactivate menu
   */
  function handleActive(id: number, active: boolean) {
    API_MENU_ACTIVE(id, active)
      .then(() => {
        message.success(t('common.tip.active'));
      })
      .catch((err) => {
        message.warning(t('common.exception.new'), err);
      });
  }

  /*
   * delete a menu
   */
  function handleDelete(id: number) {
    API_MENU_DEL(id)
      .then(() => {
        message.success(t('common.tip.active'));
      })
      .catch((err) => {
        message.warning(t('common.exception.new'), err);
      });
  }

  /*
   * update table after edit
   */
  function handleSuccess(values) {
    if (values.id) {
      // update table data after some fields are edited
      updateTableDataRecord(values.id, values);
    } else {
      reload();
    }
  }
</script>
