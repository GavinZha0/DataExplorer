<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerModal"
    :title="drawerTitle"
    showFooter
    :closable="false"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>

<script lang="ts" setup name="DetailForm">
  import { ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { roleFormSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { API_ROLE_CREATE, API_ROLE_UPDATE } from '/@/api/admin/role';
  import { message } from 'ant-design-vue';

  const { t } = useI18n();
  const rawData = ref<any>();
  const drawerTitle = ref<string>(t('common.form.new'));
  const emit = defineEmits(['success', 'register']);

  // form definition
  const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: roleFormSchema,
    showActionButtonGroup: false,
  });

  // data initialization
  const [registerModal, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    // remove old data of info form
    await resetFields();
    setDrawerProps({ confirmLoading: false });

    // pass received data to info form
    await setFieldsValue(data);

    // get drawer title
    if (data && data.id) {
      drawerTitle.value = data?.name;
    } else {
      drawerTitle.value = t('common.form.new');
    }

    // save received data
    rawData.value = data;
  });

  /*
   * submit after data is updated
   */
  async function handleSubmit() {
    try {
      // validate form data
      const values = await validate();
      values.id = Number(values.id);
      setDrawerProps({ confirmLoading: true });
      if (values.id) {
        API_ROLE_UPDATE(values)
          .then(() => {
            closeDrawer();
            emit('success', values);
          })
          .catch((err) => {
            message.warning(t('common.exception.update'), err);
          });
      } else {
        API_ROLE_CREATE(values)
          .then(() => {
            closeDrawer();
            emit('success', values);
            message.success(t('common.tip.new'));
          })
          .catch((err) => {
            message.error(t('common.exception.new'), err);
          });
      }
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
