<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-input-search
          v-model:value="searchText"
          allow-clear
          :placeholder="t('system.log.action.toolbar.search')"
          style="width: 320px"
          @search="handleSearch"
        />
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'username'">
          <a v-if="record.result !== 'ok'" @click="() => handleFilterByName(record)" style="margin-left: 2px; color: #cc0000">{{ record.username }}</a>
          <a v-else @click="() => handleFilterByName(record)" style="margin-left: 2px">{{ record.username }}</a>
        </template>
        <template v-else-if="column.key === 'type'">
          <Tag
            v-if="record.type == 'ADD' || record.type == 'CLONE'"
            color="green"
            style="margin-right: 2px"
          >
            {{ record.type }}
          </Tag>
          <Tag v-else-if="record.type == 'DELETE'" color="orange" style="margin-right: 2px">
            {{ record.type }}
          </Tag>
          <Tag v-else color="blue" style="margin-right: 2px">
            {{ record.type }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'result'">
          <Alert v-if="record.result !== 'ok'" :message="record.result" type="error" />
        </template>
        <template v-else-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
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
  </PageWrapper>
</template>

<script lang="ts" setup name="LogAct">
  import { reactive, ref } from 'vue';
  import { BasicTable, useTable, TableAction, TableSearch } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Tag, message } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { columns } from './data';
  import { API_LOG_ACT_DEL, API_LOG_ACT_LIST } from '/@/api/system/log';

  const { t } = useI18n();
  let searchInfo = reactive<TableSearch>({ fields: ['name', 'group', 'module'] });
  let searchText = ref<string>();

  // table definition
  const [registerTable, { reload, deleteTableDataRecord }] = useTable({
    //title: t('admin.user.panel.user'),
    api: API_LOG_ACT_LIST,
    rowKey: 'id',
    columns,
    defSort: { fields: ['tsUtc'], orders: ['descend'] },
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
   * filter by name
   */
  function handleFilterByName(record: Recordable) {
    const opt = {
      filterInfo: {
        username: [record.username],
      },
    };

    // reload data with filter parameter
    reload(opt);
  }

  /*
   * delete existing user
   */
  function handleDelete(id: number) {
    API_LOG_ACT_DEL(id)
      .then(() => {
        // update table data after a record is deleted
        deleteTableDataRecord(id);
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
</script>
