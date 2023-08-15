<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
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
          :placeholder="t('admin.org.toolbar.search')"
          style="width: 320px"
          @search="handleSearch"
        />
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'logo'">
          <Avatar :size="32" :src="record.logo" />
        </template>
        <template v-else-if="column.key === 'name'">
          <a v-if="record.deleted" @click="() => handleEdit(record)" style="margin-left: 5px"><del>{{ record.name }}</del></a>
          <a v-else @click="() => handleEdit(record)" style="margin-left: 5px">{{ record.name }}</a>
        </template>
        <template v-else-if="column.key === 'active'">
          <Switch
            :disabled="record.deleted"
            v-model:checked="record.active"
            size="small"
            @click="() => handleActive(record.id, record.active)"
          />
        </template>
        <template v-else-if="column.key === 'action'">
          <TableAction
            :actions="[
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
  </PageWrapper>
</template>

<script lang="ts" setup name="Org">
  import { reactive, ref } from 'vue';
  import { BasicTable, useTable, TableAction, TableSearch } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Avatar, Switch, Tooltip, message } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { columns } from './data';
  import { API_ORG_ACTIVE, API_ORG_DEL, API_ORG_LIST } from '/@/api/admin/org';
  import { Icon } from '/@/components/Icon';
  import { useDrawer } from '/@/components/Drawer';
  import DetailForm from './detailForm.vue';

  const { t } = useI18n();
  const [detailDrawer, { openDrawer: openDetailDrawer }] = useDrawer();
  let searchInfo = reactive<TableSearch>({ fields: ['name', 'realname'] });
  let searchText = ref<string>();

  // table definition
  const [registerTable, { reload, updateTableDataRecord, deleteTableDataRecord }] = useTable({
    //title: t('admin.org.panel.table'),
    api: API_ORG_LIST,
    rowKey: 'id',
    columns,
    isTreeTable: false,
    pagination: true,
    striped: false,
    useSearchForm: false,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 80,
      title: t('common.table.title.action'),
      dataIndex: 'action',
    },
  });

  /*
   * create new user
   */
  function handleCreate() {
    // open edit drawer without record
    openDetailDrawer(true, {});
  }

  /*
   * edit existing user
   */
  function handleEdit(record: Recordable) {
    // open edit drawer with record
    openDetailDrawer(true, { ...record });
  }

  /*
   * delete existing user
   */
  function handleDelete(id: number) {
    API_ORG_DEL(id)
      .then(() => {
        // update table data after a record is deleted
        deleteTableDataRecord(id);
      })
      .catch((err) => {
        message.warning(t('common.exception.delete'), err);
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

  /*
   * fuzzy search
   */
  function handleSearch() {
    searchInfo.value = searchText.value;
    // reload data with search parameter which will be gotten in function reload
    reload();
  }

  /*
   * active/deactivate selected user
   */
  function handleActive(id: number, active: boolean) {
    API_ORG_ACTIVE(id, active)
      .then(() => {
        // update table data after some fields are edited
        updateTableDataRecord(id, { active: active });
      })
      .catch((err) => {
        message.warning(t('common.exception.active'), err);
      });
  }
</script>
