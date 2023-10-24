<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="drawerTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-if="lang == 'zh-CN'"
          v-model:value="model[field]"
          :treeData="treeData"
          :fieldNames="{ title: 'title', key: 'id' }"
          checkable
          toolbar
          :title="t('admin.role.table.action.menu')"
        />
        <BasicTree
          v-else
          v-model:value="model[field]"
          :treeData="treeData"
          :fieldNames="{ title: 'name', key: 'id' }"
          checkable
          toolbar
          :title="t('admin.role.table.action.menu')"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup name="MenuForm">

import {computed, ref, unref} from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { menuFormSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { API_MENU_LIST } from '/@/api/admin/menu';
  import { message } from 'ant-design-vue';
  import { API_ROLE_UPDATE } from '/@/api/admin/role';
  import { useLocale } from '/@/locales/useLocale';

  const { t } = useI18n();
  const rawData = ref<any>();
  const treeData = ref<TreeItem[]>([]);
  const emit = defineEmits(['success', 'register']);
  const lang = ref<string>(useLocale().getLocale.value);

  // get drawer title
  const drawerTitle = computed(() => {
    if (rawData.value && rawData.value.id) {
      return t('admin.role.table.action.menu') + ' - ' + rawData.value.name;
    }
  });

  // form definition
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: menuFormSchema,
    showActionButtonGroup: false,
  });

  // data initialization
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    // remove old data of info form
    await resetFields();
    setDrawerProps({ confirmLoading: false });

    if (unref(treeData).length === 0) {
      // get menu tree from backend
      API_MENU_LIST({ page: null, filter: null, sorter: null, search: null })
        .then((response) => {
          treeData.value = response.records as any as TreeItem[];
        })
        .catch((err) => {
          message.warning(t('common.exception.load'), err);
        });
    }

    // pass received data to info form
    await setFieldsValue(data);

    // save received data
    rawData.value = data;
  });

  /*
   * submit after data is updated
   */
  async function handleSubmit() {
    try {
      // validate form data
      let values = await validate();
      values.id = Number(values.id);
      setDrawerProps({ confirmLoading: true });
      // merge data and send to backend
      API_ROLE_UPDATE(values)
        .then(() => {
          closeDrawer();
          emit('success', values);
        })
        .catch((err) => {
          message.warning(t('common.exception.update'), err);
        });
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }

</script>
