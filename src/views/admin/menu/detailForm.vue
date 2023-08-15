<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerModal"
    :title="drawerTitle"
    showFooter
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup name="MenuForm">
  import { ref, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { API_MENU_CREATE, API_MENU_UPDATE } from '/@/api/admin/menu';
  import { message } from 'ant-design-vue';

  const { t } = useI18n();
  const rawData = ref<any>();
  const drawerTitle = ref<string>(t('common.form.new'));
  const emit = defineEmits(['success', 'register']);

  // form definition
  const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  // data initialization
  const [registerModal, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    // remove old data of info form
    await resetFields();
    setDrawerProps({ confirmLoading: false });

    // get drawer title
    if (data && data.id) {
      // pass received data to info form
      await setFieldsValue(data);
      // save received data
      rawData.value = data;
      drawerTitle.value = t('common.form.edit') + ' - ' + data?.name;
    } else {
      await setFieldsValue({ pid: data.pid, pname: data.name, active: false });
      // save received pid and set active to false as default
      rawData.value = { pid: data.pid };
      drawerTitle.value = t('common.form.new');
    }
  });

  /*
   * submit after data is updated
   */
  async function handleSubmit() {
    try {
      // validate form data
      let values = await validate();
      rawData.value = { ...unref(rawData.value), ...values };
      setDrawerProps({ confirmLoading: true });
      // merge data and send to backend
      if (rawData.value.id) {
        rawData.value.id = Number(rawData.value.id);
        API_MENU_UPDATE(rawData.value)
          .then(() => {
            closeDrawer();
            emit('success', rawData.value);
            message.success(t('common.tip.update'));
          })
          .catch((err) => {
            message.warning(t('common.exception.update'), err);
          });
      } else {
        API_MENU_CREATE(rawData.value)
          .then(() => {
            closeDrawer();
            emit('success', rawData.value);
            message.success(t('common.tip.create'));
          })
          .catch((err) => {
            message.warning(t('common.exception.new'), err);
          });
      }
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
