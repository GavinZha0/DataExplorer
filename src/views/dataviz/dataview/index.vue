<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable
      @register="registerTable"
      :searchInfo="searchInfo"
      @resizeColumn="
        (w, col) => {
          col.width = w;
        }
      "
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
          :placeholder="t('dataviz.dataview.toolbar.search')"
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
          <img
            style="width: 32px; heigth: 32px; margin-right: 10px; cursor: pointer;"
            :src="'data:image/svg+xml;utf8,' + encodeURIComponent(chartTypes[record.type].svgCode)"
            @click="() => handleEdit(record)"
          >
        </template>
        <template v-else-if="column.key === 'dim'">
          <Tag
            v-for="(dim, index) in record.dim"
            :key="index"
            color="blue"
            style="margin-right: 2px"
          >
            {{ dim }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'metrics'">
          <Tag
            v-for="(metric, index) in record.metrics"
            :key="index"
            color="green"
            style="margin-right: 2px"
          >
            <span v-if="record.agg">{{ record.agg }}({{ metric }})</span>
            <span v-else>{{ metric }}</span>
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

<script lang="ts" setup name="Dataview">
  import { reactive, ref } from 'vue';
  import { BasicTable, useTable, TableAction, TableSearch } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Switch, Tag, Tooltip, message } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { indexColumns, mapTypes, netTypes } from './data';
  import { Icon } from '/@/components/Icon';
  import Thumbnails from '@antv/thumbnails';
  import { useDrawer } from '/@/components/Drawer';
  import DetailForm from './detailForm.vue';
  import {
    API_DATAVIEW_CLONE,
    API_DATAVIEW_DEL,
    API_DATAVIEW_LIST,
    API_DATAVIEW_PUBLIC,
  } from '/@/api/dataviz/dataview';
  import { useUserStore } from '/@/store/modules/user';

  const { t } = useI18n();
  const [detailDrawer, { openDrawer: openDetailDrawer }] = useDrawer();
  let searchInfo = reactive<TableSearch>({ fields: ['name', 'group', 'desc'] });
  let searchText = ref<string>();
  const chartTypes = ref<any>({ ...Thumbnails, ...mapTypes, ...netTypes });
  const loginUserName = ref<string>(useUserStore().getUserInfo.name);

  // table definition
  const [registerTable, { reload, updateTableDataRecord, deleteTableDataRecord }] = useTable({
    rowKey: 'id',
    api: API_DATAVIEW_LIST,
    columns: indexColumns,
    useSearchForm: false, // don't use this.
    showTableSetting: true,
    showIndexColumn: false,
    bordered: true,
    ellipsis: true,
    canResize: true,
    actionColumn: {
      width: 100,
      title: t('common.table.title.action'),
      dataIndex: 'action',
    },
  });

  /*
   * create new record
   */
  function handleCreate() {
    // open edit drawer with default config
    // if data is null that initial function will not be triggered
    openDetailDrawer(true, { libName: 'G2Plot', libVer: '4.2', libCfg: '' });
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
    API_DATAVIEW_DEL(id)
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
    API_DATAVIEW_CLONE(id)
      .then(() => {
        // update table data after a record is deleted
        reload();
      })
      .catch((err) => {
        message.warning(t('common.exception.delete'), err);
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
   * set source to public or private
   */
  function handlePublic(id: number, pub: boolean) {
    API_DATAVIEW_PUBLIC(id, pub)
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
   * event is from DetailForm
   */
  function handleSuccess(values) {
    if (values.id) {
      // update table data after some fields are edited
      // id is number in data
      // updateTableDataRecord() will not work if values.id is string.
      updateTableDataRecord(values.id, values);
      message.success(t('common.tip.update'));
    } else {
      reload();
      message.success(t('common.tip.new'));
    }
  }
</script>
