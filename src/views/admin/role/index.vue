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
          :placeholder="t('admin.role.toolbar.search')"
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
                icon: 'ant-design:team-outlined',
                tooltip: t('admin.role.table.action.user'),
                onClick: handleUser.bind(null, record),
              },
              {
                icon: 'ant-design:audit-outlined',
                tooltip: t('admin.role.table.action.menu'),
                onClick: handleMenu.bind(null, record),
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
    <UserForm @register="userDrawer" @success="handleSuccess" />
    <MenuForm @register="menuDrawer" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup name="Role">

  import { BasicTable, useTable, TableAction, TableSearch } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import DetailForm from './detailForm.vue';
  import UserForm from './userForm.vue';
  import MenuForm from './menuForm.vue';
  import { columns } from './data';
  import { Icon } from '/@/components/Icon';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { API_ROLE_ACTIVE, API_ROLE_DEL, API_ROLE_LIST } from '/@/api/admin/role';
  import { message, Switch, Tooltip } from 'ant-design-vue';
  import { reactive, ref } from 'vue';

  const { t } = useI18n();
  const [detailDrawer, { openDrawer: openDetailDrawer }] = useDrawer();
  const [userDrawer, { openDrawer: openUserDrawer }] = useDrawer();
  const [menuDrawer, { openDrawer: openMenuDrawer }] = useDrawer();
  let searchInfo = reactive<TableSearch>({ fields: ['name', 'description'] });
  let searchText = ref<string>();

  // table definition
  const [registerTable, { reload, updateTableDataRecord, deleteTableDataRecord }] = useTable({
    //title: t('admin.role.panel.user'),
    api: API_ROLE_LIST,
    columns,
    useSearchForm: false, // don't use this.
    showTableSetting: true,
    showIndexColumn: false,
    bordered: true,
    canResize: true,
    actionColumn: {
      width: 120,
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
    API_ROLE_DEL(id)
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
   * add/del/edit/view the users under select role
   */
  function handleUser(record: Recordable) {
    openUserDrawer(true, { ...record });
  }

  /*
   * add/del/edit/view the menu permits under select role
   */
  function handleMenu(record: Recordable) {
    openMenuDrawer(true, { ...record });
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
    API_ROLE_ACTIVE(id, active)
      .then(() => {
        // update table data after some fields are edited
        updateTableDataRecord(id, { active: active });
      })
      .catch((err) => {
        message.warning(t('common.exception.active'), err);
      });
  }
</script>
