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
  import { ref, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './data';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { TreeItem } from '/@/components/Tree';
  import { message } from 'ant-design-vue';
  import { API_ORG_CREATE, API_ORG_UPDATE } from '/@/api/admin/org';
  import { API_ORG_OPTIONS } from '/@/api/admin/org';

  const { t } = useI18n();
  const rawData = ref();
  const treeData = ref<TreeItem[]>([]);
  const drawerTitle = ref<string>(t('common.form.new'));
  const emit = defineEmits(['success', 'register']);

  // form definition
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
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
      drawerTitle.value = data?.name;
    } else {
      drawerTitle.value = t('common.form.new');
    }

    if (unref(treeData).length === 0) {
      // get org tree from backend
      API_ORG_OPTIONS()
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
      if (values.id) {
        API_ORG_UPDATE(values)
          .then(() => {
            closeDrawer();
            message.success(t('common.tip.update'));
            emit('success', values);
          })
          .catch((err) => {
            message.warning(t('common.exception.update'), err);
          });
      } else {
        API_ORG_CREATE(values)
          .then(() => {
            closeDrawer();
            message.success(t('common.tip.new'));
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
