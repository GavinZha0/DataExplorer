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

<script lang="ts" setup name="DetailForm">
  import { ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { message } from 'ant-design-vue';
  import { API_PARAM_CREATE, API_PARAM_UPDATE } from '/@/api/admin/param';

  const { t } = useI18n();
  const rawData = ref();
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
    // remove old data
    await resetFields();
    setDrawerProps({ confirmLoading: false });

    // pass received data to info form
    await setFieldsValue(data);

    // get drawer title
    if (data && data.id) {
      drawerTitle.value = t('common.form.edit') + ' - ' + data?.name;
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
      let values = await validate();
      values.id = Number(values.id);
      setDrawerProps({ confirmLoading: true });
      // merge data and send to backend
      if (values.id) {
        API_PARAM_UPDATE(values)
          .then(() => {
            closeDrawer();
            values.previous = rawData.value.value;
            emit('success', values);
          })
          .catch((err) => {
            message.warning(t('common.exception.update'), err);
          });
      }
      else{
        API_PARAM_CREATE(values)
          .then(() => {
            closeDrawer();
            emit('success', values);
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
