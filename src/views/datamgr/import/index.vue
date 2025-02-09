<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable
      @register="registerTable"
      :searchInfo="searchInfo"
      :canResize="true"
      @resizeColumn="(w, col) => { col.width = w; }"
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
          :placeholder="t('datamgr.importer.toolbar.search')"
          style="width: 360px"
          @search="handleSearch"
        />
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'files'">
          <Tag
            v-for="(ele, index) in record.files"
            :key="index"
            color="blue"
            style="margin-right: 2px; cursor: pointer"
            @click="() => handleEdit(record)"
          >
            {{ ele.name }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'overwrite'">
          <Switch v-model:checked="record.overwrite" size="small" disabled />
        </template>
        <template v-else-if="column.key === 'status'">
          <Tag v-if="record.status == 'uploading'" color="orange">
            <loading-outlined :spin="true" />{{ uploadPct }}%
          </Tag>
          <Tag v-else-if="record.status == 'processing'" color="processing">
            <sync-outlined :spin="true" />{{ record.status }}
          </Tag>
          <Tag v-if="record.status == 'success'" color="success">
            <check-circle-outlined />{{ record.status }}
          </Tag>
          <Tag v-else-if="record.status == 'error'" color="error">
            <close-circle-outlined />{{ record.status }}
          </Tag>
          <Tag v-else color="default"> <clock-circle-outlined />waiting</Tag>
        </template>
        <template v-else-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:import-outlined',
                tooltip: t('common.table.action.import'),
                onClick: handleImport.bind(record.id),
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
    <UploadForm @register="uploadDrawer" @success="handleSuccess" @progress="handleProgress" />
  </PageWrapper>
</template>

<script lang="ts" setup name="Import">
  import { reactive, ref } from 'vue';
  import { BasicTable, useTable, TableAction, TableSearch } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Switch, Tag, Tooltip, message } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { indexColumns } from './data';
  import { Icon } from '/@/components/Icon';
  import {
    CheckCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined,
    LoadingOutlined,
    ClockCircleOutlined,
  } from '@ant-design/icons-vue';
  import { useDrawer } from '/@/components/Drawer';
  import UploadForm from './uploadForm.vue';
  import {
    API_IMPORTER_DEL,
    API_IMPORTER_LIST,
    API_IMPORTER_UPLOAD,
  } from '/@/api/collection/importer';

  const { t } = useI18n();
  const [uploadDrawer, { openDrawer: openUploadDrawer }] = useDrawer();
  let searchInfo = reactive<TableSearch>({ fields: ['name', 'group', 'desc'] });
  let searchText = ref<string>();
  const uploadPct = ref<number>(0);

  // table definition
  const [registerTable, { reload, updateTableDataRecord, deleteTableDataRecord }] = useTable({
    rowKey: 'id',
    api: API_IMPORTER_LIST,
    columns: indexColumns,
    useSearchForm: false, // don't use this.
    showTableSetting: true,
    showIndexColumn: false,
    bordered: true,
    ellipsis: true,
    canResize: true,
    defSort: { fields: ['updatedAt'], orders: ['descend'] },
    actionColumn: {
      width: 80,
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
    openUploadDrawer(true, {});
  }

  /*
   * edit existing record
   */
  function handleEdit(record: Recordable) {
    // open edit drawer with record
    openUploadDrawer(true, { ...record });
  }

  /*
   * delete existing record
   */
  function handleDelete(id: number) {
    API_IMPORTER_DEL(id)
      .then(() => {
        // update table data after a record is deleted
        deleteTableDataRecord(id);
      })
      .catch((err) => {
        message.warning(t('common.exception.delete'), err);
      });
  }

  /*
   * import file quickly based on selected config
   */
  function handleImport(id: number) {
    API_IMPORTER_UPLOAD(id)
      .then(() => {
        // update table data after a record is deleted
        reload();
      })
      .catch((err) => {
        message.warning(t('common.exception.clone'), err);
      });
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
 * update table after edit
 * event is from DetailForm
 */
  function handleProgress(value: number) {
    uploadPct.value = value;
  }

  /*
   * update table after edit
   * event is from DetailForm
   */
  function handleSuccess(values: any) {
    reload();
  }
</script>
