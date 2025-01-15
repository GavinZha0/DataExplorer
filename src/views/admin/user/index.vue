<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <Row type="flex" :gutter="4">
      <Col :md="orgFormSize" :sm="24">
        <div class="ml-2 mr-2 mb-2 overflow-hidden bg-white">
          <div style="font-weight: bold; background-color: wheat">
            {{ t('admin.user.panel.org') }}
          </div>
          <div style="height: 800px">
            <ApiTree
              resultField="records"
              :fieldNames="{ key: 'id', title: 'name' }"
              :api="API_ORG_LIST"
              :immediate="true"
              @select="handleOrgSelect"
            >
              <template #title="{ dataRef }">
                <span v-if="dataRef.deleted"><del>{{ dataRef.name }} ({{dataRef.userCount}})</del></span>
                <span v-else>{{ dataRef.name }} ({{ dataRef.userCount }})</span>
              </template>
            </ApiTree>
          </div>
        </div>
      </Col>
      <Col :md="24 - orgFormSize" :sm="24">
        <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5" :searchInfo="searchInfo">
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
              :placeholder="t('admin.user.toolbar.search')"
              style="width: 360px"
              @search="handleSearch"
            />
          </template>
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'avatar'">
              <Avatar :size="32" :src="record.avatar" />
            </template>
            <template v-else-if="column.key === 'name'">
              <a v-if="record.deleted" @click="() => handleEdit(record)" style="margin-left: 5px"><del>{{ record.name }}</del></a>
              <a v-else @click="() => handleEdit(record)" style="margin-left: 5px">{{ record.name }}</a>
            </template>
            <template v-else-if="column.key === 'roleNames'">
              <Tag
                v-for="(role, index) in record.roleNames"
                :key="index"
                color="green"
                style="margin-right: 2px"
              >
                {{ role }}
              </Tag>
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
      </Col>
    </Row>
    <DetailForm @register="detailDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts" setup name="User">
  import { reactive, ref } from 'vue';
  import { BasicTable, useTable, TableAction, TableSearch } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { ApiTree } from '/@/components/Form';
  import { Row, Col, Tag, Avatar, Tooltip, Switch, message } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { columns } from './data';
  import { API_USER_ACTIVATE, API_USER_DEL, API_USER_LIST } from '/@/api/admin/user';
  import { Icon } from '/@/components/Icon';
  import { useDrawer } from '/@/components/Drawer';
  import DetailForm from './detailForm.vue';
  import { API_ORG_LIST } from '/@/api/admin/org';

  const { t } = useI18n();
  const [detailDrawer, { openDrawer: openDetailDrawer }] = useDrawer();
  let searchInfo = reactive<TableSearch>({ fields: ['name', 'realname', 'email', 'phone'] });
  let searchText = ref<string>();
  const orgFormSize = ref<number>(4);

  // table definition
  const [registerTable, { reload, updateTableDataRecord, deleteTableDataRecord }] = useTable({
    api: API_USER_LIST,
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
    API_USER_DEL(id)
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
   * select an org then reload users
   */
  function handleOrgSelect(orgId: number) {
    const opt = {
      filterInfo: {
        org: orgId,
      },
    };

    // reload data with filter parameter
    reload(opt);
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
    API_USER_ACTIVATE(id, active)
      .then(() => {
        // update table data after some fields are edited
        updateTableDataRecord(id, { active: active });
      })
      .catch((err) => {
        message.error(t('common.exception.active'), err);
      });
  }
</script>
