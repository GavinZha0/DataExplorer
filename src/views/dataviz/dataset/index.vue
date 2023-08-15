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
          :placeholder="t('dataviz.dataset.toolbar.search')"
          style="width: 360px"
          @search="handleSearch"
        />
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a @click="() => handleEdit(record)" style="margin-left: 5px">{{ record.name }}</a>
        </template>
        <template v-else-if="column.key === 'dim'">
          <Tag
            v-for="(ele, index) in record.dim"
            :key="index"
            color="blue"
            style="margin-right: 2px"
          >
            {{ ele }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'metrics'">
          <Tag
            v-for="(ele, index) in record.metrics"
            :key="index"
            color="green"
            style="margin-right: 2px"
          >
            {{ ele }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'pubFlag'">
          <Switch
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

<script lang="ts" setup name="Dataset">
  import { reactive, ref } from 'vue';
  import { BasicTable, useTable, TableAction, TableSearch } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Switch, Tag, Tooltip, message } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { indexColumns } from './data';
  import { Icon } from '/@/components/Icon';
  import { useDrawer } from '/@/components/Drawer';
  import DetailForm from './detailForm.vue';
  import {
    API_DATASET_CLONE,
    API_DATASET_DEL,
    API_DATASET_LIST,
    API_DATASET_PUBLIC,
  } from '/@/api/dataviz/dataset';
  import { ApiDatasetDataType } from '/@/api/dataviz/model/dataset';

  const { t } = useI18n();
  const [detailDrawer, { openDrawer: openDetailDrawer }] = useDrawer();
  let searchInfo = reactive<TableSearch>({ fields: ['name', 'group', 'desc'] });
  let searchText = ref<string>();

  // build dim and metrics after fetch data
  const buildDimMetrics = (records: Recordable[]) => {
    for (let rec of records) {
      rec.dim = [];
      rec.metrics = [];
      for (const field of rec.fields) {
        if (field.hidden) {
          continue;
        }
        if (field.metrics) {
          // add metrics
          if (field.alias) {
            // renamed by user
            rec.metrics.push(field.alias);
          } else {
            rec.metrics.push(field.name);
          }
        } else {
          //all others are dim
          if (field.alias) {
            // renamed by user
            rec.dim.push(field.alias);
          } else {
            rec.dim.push(field.name);
          }
        }
      }
    }
    return records;
  };

  // table definition
  const [registerTable, { reload, updateTableDataRecord, deleteTableDataRecord }] = useTable({
    rowKey: 'id',
    api: API_DATASET_LIST,
    columns: indexColumns,
    afterFetch: buildDimMetrics,
    useSearchForm: false, // don't use this.
    showTableSetting: true,
    showIndexColumn: false,
    bordered: true,
    ellipsis: true,
    canResize: true,
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
    API_DATASET_DEL(id)
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
    API_DATASET_CLONE(id)
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
   * set source to public or private
   */
  function handlePublic(id: number, pub: boolean) {
    API_DATASET_PUBLIC(id, pub)
      .then(() => {
        // update table
        updateTableDataRecord(id, { public: pub });
      })
      .catch((err) => {
        message.warning(t('common.exception.public'), err);
      });
  }

  /*
   * update table after edit
   * event is from DetailForm
   */
  function handleSuccess(values: ApiDatasetDataType) {
    if (values.id) {
      // update table data after some fields are edited
      // id is number in data
      // updateTableDataRecord() will not work if values.id is string.
      updateTableDataRecord(values.id, values);
    } else {
      reload();
    }
  }
</script>
