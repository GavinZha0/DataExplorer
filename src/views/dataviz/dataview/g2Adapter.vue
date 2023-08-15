<template>
  <a-tabs default-active-key="layer" hide-add size="small" centered style="height: 830px">
    <a-tab-pane key="style" :forceRender="true" :closable="false">
      <template #tab>
        <Tooltip>
          <template #title>{{ t('dataviz.dataview.form.custom.style.title') }}</template>
          <FundOutlined />
        </Tooltip>
      </template>
      <Row>
        <Col :span="10">
          <div style="height: 700px; padding-right: 5px; border-right-width: 2px">
            <BasicForm @register="registerStyleCommonForm" />
          </div>
        </Col>
      </Row>
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup name="G2Adapter">
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { formCustomCommonStyle } from './g2plotData';
  import {
    Tabs as ATabs,
    TabPane as ATabPane,
    Row,
    Col,
    Checkbox,
    message,
    Select,
  } from 'ant-design-vue';
  import { formCustomToolkit } from './cyData';
  import { FundOutlined } from '@ant-design/icons-vue';
  import { reactive } from 'vue';
  const { t } = useI18n();
  const emit = defineEmits(['change']);
  let adapterActive = false;
  const rawData = reactive({
    chartType: '',
    libVer: '',
    libCfg: { chartType: '', config: {} },
    fields: [],
  });


  // Toolkit form
  const [
    registerToolkitForm,
    {
      setFieldsValue: setToolkitFields,
      resetFields: resetToolkitFields,
      validate: valToolkitFields,
    },
  ] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: formCustomToolkit,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleStyleCommonChange,
  });

  // common style definition
  const [
    registerStyleCommonForm,
    {
      setFieldsValue: setStyleCommonFields,
      resetFields: resetStyleCommonFields,
      validate: valStyleCommonFields,
    },
  ] = useForm({
    labelWidth: 160,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formCustomToolkit,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleStyleCommonChange,
  });

  /*
   * handle the change of common style
   */
  async function handleStyleCommonChange() {

  }

  // expose these methods to parent
  defineExpose({ setConfigData });
</script>

<style lang="less" scoped>
  .card-item {
    background-color: #fdfdfd;
    cursor: move;
  }

  .card-item:hover {
    background-color: #f1f1f1;
    cursor: move;
  }

  .preview_img {
    cursor: pointer;
    width: 98%;
    border: 1px solid;
    height: 60px;
    margin-top: 5px;
    position: relative;
    color: green;
    font-weight: bold;
    text-wrap: normal;
    img {
      height: 100%;
      object-fit: cover;
      float: right;
      margin-right: 5px;
    }
  }
  .preview_img:hover {
    border: 2px solid;
    color: orange;
  }

  .preview_img:focus {
    border: 2px solid;
    color: orange;
  }

  ::v-deep(.filesets) {
    border: 1px solid silver;
    padding: 0px 10px 5px 10px;
  }

  ::v-deep(.fieldsetlegend) {
    padding: 2px 5px 2px 5px;
    width: auto;
    font-size: 15px;
  }

  ::v-deep(.ant-form legend) {
    color: rgba(0, 0, 0, 0.45);
    border-bottom: 0;
    margin-bottom: 0;
  }

  ::v-deep(.ant-tree-switcher) {
    width: 10px;
  }

  .fielditem {
    padding: 2px;
    margin: 2px 2px 2px 2px;
    border: solid 1px #eee;
    background-color: #f1f1f1;
    width: 100%;
    font-size: 12px;
  }

  .fielditem:hover {
    background-color: #fdfdfd;
    cursor: move;
  }
</style>
