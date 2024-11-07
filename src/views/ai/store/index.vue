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
              <a @click="() => handleEdit(record)" style="margin-left: 5px">{{ record.name }}</a>
            </template>
            <template v-else-if="column.key === 'tags'">
              <Tag
                v-for="(tag, index) in record.tags"
                :key="index"
                color="green"
                style="margin-right: 2px"
              >
                {{ tag }}
              </Tag>
            </template>
            <template v-else-if="column.key === 'evaluation'">
              <Tag
                v-for="(evaluate, index) in record.evaluation"
                :key="index"
                color="blue"
                style="margin-right: 2px"
              >
                {{ evaluate.name }}: {{ evaluate.value }}
              </Tag>
            </template>
            <template v-else-if="column.key === 'rate'">
              <Rate v-model:value="record.rate" disabled />
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
    <DetailForm width="600" @register="detailDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts" setup name="AiStore">
  import { reactive, ref } from 'vue';
  import { Icon } from '/@/components/Icon';
  import { BasicTable, useTable, TableAction, TableSearch } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Switch, Tooltip, message, Tag, Rate } from 'ant-design-vue';
  import { indexColumns } from './data';
  import { useUserStore } from '/@/store/modules/user';
  import {
    API_AI_MODEL_CLONE,
    API_AI_MODEL_DEL,
    API_AI_MODEL_LIST,
    API_AI_MODEL_PUBLIC,
  } from '/@/api/ai/model';
  import { useI18n } from 'vue-i18n';
  import { useDrawer } from '/@/components/Drawer';
  import DetailForm from './detailForm.vue';

  const { t } = useI18n();
  const [detailDrawer, { openDrawer: openDetailDrawer }] = useDrawer();
  let searchInfo = reactive<TableSearch>({ fields: ['name', 'group', 'desc'] });
  let searchText = ref<string>();
    const loginUserName = ref<string>(useUserStore().getUserInfo.name);
  // table definition
  const [registerTable, { reload, updateTableDataRecord, deleteTableDataRecord }] = useTable({
    rowKey: 'id',
    api: API_AI_MODEL_LIST,
    columns: indexColumns,
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
    API_AI_MODEL_DEL(id)
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
    API_AI_MODEL_CLONE(id)
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
    API_AI_MODEL_PUBLIC(id, pub)
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

<style lang="less" scoped>
  .DatasetTab {
    ::v-deep(.ant-tabs-bar) {
      margin-bottom: 100px;
    }

    ::v-deep(.ant-tabs-nav .ant-tabs-tab) {
      margin-right: 100px;
    }
  }

  .ant-card-body {
    padding: 10px;
  }
</style>
