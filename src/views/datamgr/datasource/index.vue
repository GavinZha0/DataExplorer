<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable
      @register="registerTable"
      :searchInfo="searchInfo"
      @resizeColumn=" (w, col) => { col.width = w; } "
    >
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
          :placeholder="t('dataviz.datasource.toolbar.search')"
          style="width: 360px"
          @search="handleSearch"
        />
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a v-if="record.createdBy != loginUserName" @click="() => handleEdit(record)" style="margin-left: 5px; color: green">{{ record.name }}</a>
          <a v-else @click="() => handleEdit(record)" style="margin-left: 5px">{{ record.name }}</a>
        </template>
        <template v-else-if="column.key === 'type'">
          <Tag color="green" style="margin-right: 2px">
            {{ record.type }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'pubFlag'">
          <Switch
            v-if="record.createdBy != loginUserName"
            v-model:checked="record.pubFlag"
            size="small"
            :disabled="true"
          />
          <Switch
            v-else
            v-model:checked="record.pubFlag"
            size="small"
            @click="() => handlePublic(record.id, record.pubFlag)"
          />
        </template>
        <template v-else-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:copy-outlined',
                tooltip: t('common.table.action.clone'),
                onClick: handleClone.bind(null, record.id),
              },
              {
                icon: 'ant-design:lock-outlined',
                tooltip: t('dataviz.datasource.table.action.lock'),
                onClick: handleLock.bind(null, record),
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
    <DetailForm width="500" @register="detailDrawer" @success="handleSuccess" />
    <LockForm @register="lockDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts" setup name="Datasource">
  import { reactive, ref } from 'vue';
  import { BasicTable, useTable, TableAction, TableSearch } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Switch, Tag, Tooltip, message } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { indexColumns } from './data';
  import { Icon } from '/@/components/Icon';
  import { useDrawer } from '/@/components/Drawer';
  import DetailForm from './detailForm.vue';
  import LockForm from './lockForm.vue';
  import {
    API_DATASOURCE_CLONE,
    API_DATASOURCE_DEL,
    API_DATASOURCE_LIST,
    API_DATASOURCE_PUBLIC,
  } from '/@/api/dataviz/datasource';
  import { atob } from 'js-base64';
  import { ApiDsDataType } from '/@/api/dataviz/model/datasource';
  import { useUserStore } from '/@/store/modules/user';

  const { t } = useI18n();
  const [detailDrawer, { openDrawer: openDetailDrawer }] = useDrawer();
  const [lockDrawer, { openDrawer: openLockDrawer }] = useDrawer();
  // define the search fields for fuzzy search
  let searchInfo = reactive<TableSearch>({ fields: ['name', 'group', 'desc'] });
  const searchText = ref<string>();
  const loginUserName = ref<string>(useUserStore().getUserInfo.name);

  // table definition
  const [registerTable, { reload, updateTableDataRecord, deleteTableDataRecord }] = useTable({
    rowKey: 'id',
    api: API_DATASOURCE_LIST,
    columns: indexColumns,
    useSearchForm: false, // don't use this.
    showTableSetting: true,
    showIndexColumn: false,
    bordered: true,
    afterFetch: (list: Recordable[]) => {
      let recList = list;
      for (let item of recList) {
        // decode password
        item.password = atob(item.password);
      }
      return recList;
    },
    actionColumn: {
      width: 120,
      title: t('common.table.title.action'),
      dataIndex: 'action',
    },
  });

  /*
   * create new record
   */
  function handleCreate() {
    // open edit drawer without data
    // set data to {} in order to trigger useDrawerInner
    // if data is null that initial function will not be triggered
    openDetailDrawer(true, {});
  }

  /*
   * edit existing record
   */
  function handleEdit(record: Recordable) {
    // open edit drawer with record
    openDetailDrawer(true, { ...record });
  }

  /*
   * delete existing record
   */
  function handleDelete(id: number) {
    API_DATASOURCE_DEL(id)
      .then(() => {
        // update table data after a record is deleted
        deleteTableDataRecord(id);
      })
      .catch((err) => {
        message.warning(t('common.exception.delete'), err);
      });
  }

  /*
   * clone existing record
   */
  function handleClone(id: number) {
    API_DATASOURCE_CLONE(id)
      .then(() => {
        // update table data after a record is deleted
        reload();
      })
      .catch((err) => {
        message.warning(t('common.exception.delete'), err);
      });
  }

  /*
   * open lock drawer
   */
  function handleLock(record: Recordable) {
    openLockDrawer(true, { ...record });
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
   * set source to public or private
   */
  function handlePublic(id: number, pub: boolean) {
    API_DATASOURCE_PUBLIC(id, pub)
      .then(() => {
        // update table
        updateTableDataRecord(id, { public: pub });
      })
      .catch((err) => {
        message.warning(t('common.exception.active'), err);
      });
  }

  /*
   * update table after edit
   */
  function handleSuccess(values: ApiDsDataType) {
    if (values.id) {
      // update table data after some fields are edited
      // id must be number here
      updateTableDataRecord(values.id, values);
    } else {
      reload();
    }
  }
</script>
