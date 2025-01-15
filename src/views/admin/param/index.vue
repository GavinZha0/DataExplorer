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
          :placeholder="t('admin.param.toolbar.search')"
          style="width: 320px"
          @search="handleSearch"
        />
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a @click="() => handleEdit(record)" style="margin-left: 5px">{{ record.name }}</a>
        </template>
        <template v-else-if="column.key === 'value'">
          <Tag
            color="green"
            style="margin-right: 2px"
          >
            {{ record.value }}
          </Tag>
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

<script lang="ts" setup name="Param">
  import { reactive, ref } from 'vue';
  import { BasicTable, useTable, TableAction, TableSearch } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Tag, Tooltip, message } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { columns } from './data';
  import { API_PARAM_DEL, API_PARAM_LIST } from '/@/api/admin/param';
  import { Icon } from '/@/components/Icon';
  import { useDrawer } from '/@/components/Drawer';
  import DetailForm from './detailForm.vue';

  const { t } = useI18n();
  const [detailDrawer, { openDrawer: openDetailDrawer }] = useDrawer();
  let searchInfo = reactive<TableSearch>({ fields: ['name', 'group', 'module'] });
  let searchText = ref<string>();

  // table definition
  const [registerTable, { reload, updateTableDataRecord, deleteTableDataRecord }] = useTable({
    //title: t('admin.user.panel.user'),
    api: API_PARAM_LIST,
    rowKey: 'id',
    columns,
    useSearchForm: false, // don't use this.
    showTableSetting: true,
    showIndexColumn: false,
    bordered: true,
    canResize: true,
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
    API_PARAM_DEL(id)
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

</script>
