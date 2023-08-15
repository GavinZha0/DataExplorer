<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="drawerTitle"
    @ok="handleSubmit"
  >
    <ApiTree
      resultField="records"
      :fieldNames="{ key: 'id', title: 'name' }"
      :api="API_USER_LIST"
      :immediate="true"
      :checkable="true"
      v-model:checkedKeys="rawData.userIds"
    />
  </BasicDrawer>
</template>
<script lang="ts" setup name="UserForm">
  import { computed, ref, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { ApiTree } from '/@/components/Form';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { API_USER_LIST } from '/@/api/admin/user';
  import { message } from 'ant-design-vue';
  import { API_ROLE_USER_UPDATE } from '/@/api/admin/role';

  const { t } = useI18n();
  const rawData = ref<any>({ userIds: [] });
  const emit = defineEmits(['success', 'register']);

  // get drawer title
  const drawerTitle = computed(() => {
    if (rawData.value && rawData.value.id) {
      return t('admin.role.table.action.user') + ' - ' + rawData.value.name;
    }
  });

  // data initialization
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false });

    // save received data
    rawData.value = data;
  });

  /*
   * submit after data is updated
   */
  async function handleSubmit() {
    try {
      // validate form data
      setDrawerProps({ confirmLoading: true });
      // merge data and send to backend
      API_ROLE_USER_UPDATE(unref(rawData.value))
        .then(() => {
          closeDrawer();
          emit('success', unref(rawData.value));
          message.success(t('common.tip.update'));
        })
        .catch((err) => {
          message.error(t('common.exception.update'), err);
        });
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
