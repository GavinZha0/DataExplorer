<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :title="drawerTitle"
    showFooter
    @ok="handleSubmit"
  >
    <Row type="flex" :gutter="2" align="top">
      <Col :md="11" :sm="24">
        <BasicForm @register="registerInfoForm">
        </BasicForm>
      </Col>
      <Col :md="1" :sm="24">
        <div style="height: 750px; border-right-width: 2px"></div>
      </Col>
      <Col :md="12" :sm="24">
        <BasicForm @register="registerConfigForm">
          <template #files="{ model, field }">
            <Upload
              v-model:file-list="fileList"
              :multiple="true"
              accept=".pt,.pb,.pkl,.txt,.json,.params"
              >
              <PlusSquareTwoTone :style="{fontSize: '32px'}" />
            </Upload>
          </template>
        </BasicForm>
      </Col>
    </Row>
  </BasicDrawer>
</template>

<script lang="ts" setup name="DetailForm">
  import { ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formInfoSchema, formConfigSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { message, Row, Col, Upload, UploadProps } from 'ant-design-vue';
  import { PlusSquareTwoTone } from '@ant-design/icons-vue';
  import {
    API_AI_MODEL_CREATE,
    API_AI_MODEL_UPDATE,
  } from '/@/api/ai/model';
  import { ApiModelDataType } from '/@/api/ai/model/model';
  import { NameValueType } from '/@/api/model/baseModel';

  const { t } = useI18n();
  const rawData = ref<ApiModelDataType>();
  const urlParams = ref<NameValueType[]>([]);
  const drawerTitle = ref<string>(t('common.form.new'));
  const emit = defineEmits(['success', 'register']);
  const fileList = ref<UploadProps['fileList']>([]);

  // drawer initialization
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    // remove old data
    resetInfoFields();
    resetConfigFields();

    // save received data
    rawData.value = data;
    urlParams.value = data.params ? data.params : [];
    setDrawerProps({ confirmLoading: false });

    // set received data to form
    setInfoFieldsValue({ ...data });
    setConfigFieldsValue({ ...data });
    fileList.value = data.files.map((item) => ({ name: item, status: 'done' }));

    // get drawer title
    if (data && data.id) {
      drawerTitle.value = '[' + data.name + ']';
    } else {
      drawerTitle.value = t('common.form.new');
    }
  });


  // info form definition
  const [
      registerInfoForm,
      {
        setFieldsValue: setInfoFieldsValue,
        resetFields: resetInfoFields,
        validate: validateInfoFields,
      },
    ] = useForm({
      layout: 'vertical',
      labelCol: {span: 10},
      baseColProps: { span: 24 },
      schemas: formInfoSchema,
      showActionButtonGroup: false,
    });

    // config form definition
  const [
      registerConfigForm,
      {
        setFieldsValue: setConfigFieldsValue,
        resetFields: resetConfigFields,
        validate: validateConfigFields,
      },
    ] = useForm({
      layout: 'vertical',
      labelCol: {span: 10},
      baseColProps: { span: 24 },
      schemas: formConfigSchema,
      showActionButtonGroup: false,
    });

  /*
   * submit after data is updated
   */
  async function handleSubmit() {
    try {
      // validate form data
      // detail form has all data fields which are defined by ApiDsDataType
      let values1 = await validateInfoFields();
      let values2 = await validateConfigFields();
      let values = {...values1, ...values2};
      setDrawerProps({ confirmLoading: true });
      if (values.id) {
        values.id = rawData.value.id;
        API_AI_MODEL_UPDATE(values).then(() => {
          message.success(t('common.tip.update'));
          closeDrawer();
          // notify parent
          emit('success', values);
        });
      } else {
        // create new data when id is null
        API_AI_MODEL_CREATE(values).then(() => {
          message.success(t('common.tip.new'));
          closeDrawer();
          // notify parent to update list table
          emit('success', values);
        });
      }
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>

<style scoped>

.upload-list-inline :deep(.ant-upload-list-item) {
  float: left;
  width: 80px;
  height: 80px;
  margin-right: 2px;
}
.upload-list-inline :deep(.ant-upload-animate-enter) {
  animation-name: uploadAnimateInlineIn;
}
.upload-list-inline :deep(.ant-upload-animate-leave) {
  animation-name: uploadAnimateInlineOut;
}
</style>