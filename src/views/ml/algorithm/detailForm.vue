<template>
  <BasicDrawer
    v-bind="$attrs"
    :isDetail="true"
    @register="registerDrawer"
    :title="drawerTitle"
    :closable="false"
    :showDetailBack="true"
    :keyboard="false"
    @ok="handleSubmit"
  >
    <template #titleToolbar>
      <Tooltip>
        <template #title>{{ t('common.toolbar.execute') }}</template>
        <PlaySquareTwoTone class="toolbar-button" @click="execute" />
      </Tooltip>
      <Tooltip>
        <template #title>{{ t('common.toolbar.save') }}</template>
        <SaveTwoTone class="toolbar-button" @click="handleSubmit" />
      </Tooltip>
    </template>
    <div style="width: 98%; float: left">
      <Row type="flex" :gutter="4">
        <Col :md="24 - rightPanelSize" :sm="24">
          <Tabs v-model:activeKey="activeTab" centered size="small">
            <Tabs.TabPane key="editor" :tab="t('ml.algorithm.tab.editor')">
              <div style="width: 100%; border: solid 1px gray; height: 700px">
                <CodeEditor
                  border
                  class="code-mirror"
                  placeholder="Input code"
                  v-model:value="rawData.content"
                  mode="python"
                />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane key="history" :tab="t('ml.algorithm.tab.history')">
              <div style="width: 100%; border: solid 1px gray; height: 700px">{{ historyData[0] }}</div>
            </Tabs.TabPane>
          </Tabs> 
        </Col>
        <Col :md="rightPanelSize" :sm="24">
            <div
                :style="{
                  borderWidth: '1px',
                  borderColor: 'black',
                  height: '100%',
                  width: '100%',
                  paddingLeft: '5px',
                  paddingRight: '5px',
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  display: rightPanelKey == 'info' ? 'block' : 'none',
                }"
            >
              <BasicForm
                ref="infoFormRef"
                :schemas="formInfoSchema"
                :showActionButtonGroup="false"
                layout="vertical"
                >
                <template #group="{ model, field }">
                  <ApiSelect
                    :api="API_ML_ALGO_GROUPS"
                    mode="tags"
                    v-model:value="model[field]"
                    resultField="records"
                    @change="handleDatasetGroupChange"
                  />
                </template>
              </BasicForm>
            </div>
            <div
                :style="{
                  borderWidth: '1px',
                  borderColor: 'black',
                  height: '100%',
                  width: '100%',
                  paddingLeft: '5px',
                  paddingRight: '5px',
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  display: rightPanelKey == 'config' ? 'block' : 'none',
                }"
            >
              <BasicForm
                ref="configFormRef"
                :schemas="formConfigSchema"
                :showActionButtonGroup="false"
                layout="vertical"
                >
                <template #dataset="{ model, field }">
                  <ApiTreeSelect style="width: 100%"
                    v-model:value="model[field]"
                    :placeholder="t('ml.algorithm.form.config.dataset')"
                   :api="API_ML_DATASET_TREE"
                   :immediate="true"
                    :fieldNames="{ key: 'id', label: 'name', value: 'id' }"
                   resultField="records"/>
                </template>
              </BasicForm>
            </div>  
            <div
                :style="{
                  borderWidth: '1px',
                  borderColor: 'black',
                  height: '100%',
                  width: '100%',
                  paddingLeft: '5px',
                  paddingRight: '5px',
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  display: rightPanelKey == 'chart' ? 'block' : 'none',
                }"
            >
              <BasicForm
                ref="chartFormRef"
                :schemas="formChartSchema"
                :showActionButtonGroup="false"
                layout="vertical"
                >
                  <template #progress="{ model, field }">
                    <Progress type="circle" :percent="trainPct" />
                  </template>
                  <template #accuracy="{ model, field }">
                    <Progress type="circle" :percent="metricVal" />
                  </template>
              </BasicForm>
            </div>
            <div
                :style="{
                  borderWidth: '1px',
                  borderColor: 'black',
                  height: '100%',
                  width: '100%',
                  paddingLeft: '5px',
                  paddingRight: '5px',
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  display: rightPanelKey == 'history' ? 'block' : 'none',
                }"
            >
              <BasicForm
                ref="historyFormRef"
                :schemas="formHistorySchema"
                :showActionButtonGroup="false"
                @fieldValueChange="handleHistoryChange"
                >
                <template #dataset="{ model, field }">
                  <ApiTreeSelect style="width: 100%"
                    v-model:value="model[field]"
                    :placeholder="t('ml.algorithm.form.config.dataset')"
                   :api="API_ML_DATASET_TREE"
                   :immediate="true"
                    :fieldNames="{ key: 'id', label: 'name', value: 'id' }"
                   resultField="records"/>
                </template>
                <template #experment="{ model, field }">
                  <BasicTree
                    :treeData="historyData"
                    v-model:value="model[field]"
                    v-model:selectedKeys="selHisKey"
                    :fieldNames="{ title: 'createdAt', key: 'id' }"
                    style="width: 100%, overflowY: 'scroll'"
                    :actionList="historyActions"
                    :renderIcon="historyIcons"
                    @select="handleHistorySelect"
                  />
                </template>
              </BasicForm>
            </div>   
          </Col>
        </Row>
    </div>  
    <Menu
      mode="inline"
      theme="light"
      :multiple="false"
      :selectable="true"
      :inlineCollapsed="true"
      v-model:selectedKeys="selectedPanelKeys"
      style="float: left; width: 2%"
      @click="handleMenuSwitch"
    >
      <MenuItem key="info">
        <template #icon>
          <InfoCircleFilled
            :style="{
              fontSize: '24px',
              color: 'green',
            }"
          />
        </template>
        <span>Info</span>
      </MenuItem>
      <MenuItem key="config">
        <template #icon>
          <SettingFilled
            :style="{
              fontSize: '24px',
              color: 'green',
            }"
          />
        </template>
        <span>Config</span>
      </MenuItem>
      <MenuItem key="chart">
        <template #icon>
          <AreaChartOutlined
            :style="{
              fontSize: '24px',
              color: 'green',
            }"
          />
        </template>
        <span>Chart</span>
      </MenuItem>
      <MenuItem key="history">
        <template #icon>
          <ExperimentOutlined
            :style="{
              fontSize: '24px',
              color: 'green',
            }"
          />
        </template>
        <span>History</span>
      </MenuItem>
    </Menu>
  </BasicDrawer>
</template>

<script lang="ts" setup name="DetailForm">
  import { ref, unref, h } from 'vue';
  import { BasicForm, FormActionType } from '/@/components/Form/index';
  import { formInfoSchema, formConfigSchema, formChartSchema, formHistorySchema } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { ApiTreeSelect } from '/@/components/Form';
  import { BasicTree, TreeActionItem } from '/@/components/Tree';
  import {
    PlaySquareTwoTone,
    SaveTwoTone,
    InfoCircleFilled,
    SettingFilled,
    AreaChartOutlined,
    ExperimentOutlined,
    DeleteOutlined
  } from '@ant-design/icons-vue';
  import { CodeEditor } from '/@/components/CodeEditor';
  import { useI18n } from '/@/hooks/web/useI18n';
  import {
    message,
    Tooltip,
    Menu,
    MenuItem,
    Row,
    Col,
    Progress,
    Tabs
  } from 'ant-design-vue';
  import {
    API_ML_ALGO_CREATE,
    API_ML_ALGO_UPDATE,
    API_ML_ALGO_GROUPS,
    API_ML_ALGO_EXECUTE
  } from '/@/api/ml/algorithm';
  import { ApiSelect } from '/@/components/Form';
  import { API_ML_DATASET_TREE } from '/@/api/ml/dataset';
  import { ApiAlgorithmDataType, initAlgorithm } from '/@/api/ml/model/algorithm';
  import { API_ML_ALGO_HISTORY_LIST, API_ML_ALGO_HISTORY_DEL } from '/@/api/ml/algoHistory';

  const { t } = useI18n();
  const drawerTitle = ref<string>(t('common.form.new'));
  const emit = defineEmits(['success', 'register']);
  const rawData = ref<ApiAlgorithmDataType>(initAlgorithm);
  const activeTab = ref<string>('editor');
  const rightPanelSize = ref<number>(4);
  const rightPanelKey = ref<string>('config');
  const selectedPanelKeys = ref<string[]>(['config']);
  const infoFormRef = ref<Nullable<FormActionType>>(null);
  const configFormRef = ref<Nullable<FormActionType>>(null);
  const trainPct = ref<number>(0);
  const metricVal = ref<number>(0);
  const historyParam = ref<any>({algoId: 2, succOnly: true});
  const historyData = ref<any[]>([]);
  const selHisKey = ref<number[]>([0]);

  // drawer data initialization
  const [registerDrawer, { setDrawerProps }] = useDrawerInner(async (data) => {
    // remove old data of info form
    if (infoFormRef.value) {
      infoFormRef.value.resetFields();
    }
    if (configFormRef.value) {
      configFormRef.value.resetFields();
    }

    setDrawerProps({ confirmLoading: false });

    // pass received data to info form
    if (infoFormRef.value) {
      infoFormRef.value.setFieldsValue(data);
    }

    if (configFormRef.value) {
      await configFormRef.value.setFieldsValue(data.config);
    }

    // get drawer title
    if (data && data.id) {
      drawerTitle.value = '[' + data.name + ']';
    } else {
      drawerTitle.value = t('common.form.new');
    }

    // save received data
    rawData.value = data;

    // get history list
    API_ML_ALGO_HISTORY_LIST(historyParam.value).then((response) => {
      historyData.value = response.records;
    });

  });

  /*
   * only pick up the latest one as selected field when selecting change
   * select component accepts user defined item when it is tags mode
   * so you can select existing group name or create a new group
   */
  const handleDatasetGroupChange = (value: string[]) => {
    if (infoFormRef.value) {
      if (value.length > 0) {
        // get the latest one when there are multiple selections
        infoFormRef.value.setFieldsValue({ group: value[value.length - 1] });
      } else {
        // set to undefined when it is empty to avoid []
        infoFormRef.value.setFieldsValue({ group: undefined });
      }
    }
  };

      /*
   * switch panel - info/model
   */
   const handleMenuSwitch = async (menu: any) => {
    if (rightPanelKey.value == menu.key && rightPanelSize.value > 0) {
      rightPanelSize.value = 0;
      return;
    }

    rightPanelKey.value = menu.key;
    rightPanelSize.value = 4;
  };

  /*
   * execute training
   */
  const execute = async () => {
    if (!rawData.value.content) {
      return;
    }

    // save first
    await handleSubmit();

    // execute algo training
    API_ML_ALGO_EXECUTE(rawData.value.id).then((response) => {
      const aaa = response;
    });
  };

  
  function historyIcons(node: any) {
    if (node.status == 0) {
      return 'ant-design:check-circle-outlined';
    } else if (node.status == 1) {
      return 'ant-design:close-circle-outlined';
    } else if (node.status == 2) {
      return 'ant-design:warning-outlined';
    } else if (node.status == 3) {
      return 'ant-design:stop-outlined';
    } else if (node.status == 4) {
      return 'ant-design:question-circle-outlined';
    } else {
      return 'ant-design:hourglass-outlined';
    }
  }

  // show delete icon in history tree
  const historyActions: TreeActionItem[] = [
    {
      render: (node) => {
        return h(DeleteOutlined, {
          class: 'ml-2',
          onClick: () => {
            const idx = historyData.value.findIndex((v) => {
              // find item
              return v.id == node.id;
            });
            // remove item
            historyData.value.splice(idx, 1);
            // delete history from db
            API_ML_ALGO_HISTORY_DEL(idx).then((response) => {
              const aaa = 666;
            });
          },
        });
      },
    },
  ];

  /*
   * history option change
   */
   const handleHistoryChange = (key: string, value: string) => {
    historyParam.value.succOnly = value;
    // get history list
    API_ML_ALGO_HISTORY_LIST(historyParam.value).then((response) => {
      historyData.value = response.records;
    });
  };

  /*
   * History selection
   */
  const handleHistorySelect = (key: any) => {
    activeTab.value = 'history';
  };


  /*
   * submit after data is updated
   */
  async function handleSubmit() {
    try {
      // validate form data
      const values = await infoFormRef.value.validate();
      rawData.value.name = values.name;
      rawData.value.desc = values.desc;
      rawData.value.group = values.group;
      rawData.value.type = values.type;
      rawData.value.framework = values.framework;
      rawData.value.frameVer = values.frameVer;

      const cfg = await configFormRef.value.validate();
      rawData.value.config = cfg;
      
      setDrawerProps({ confirmLoading: true });
      if (rawData.value.id) {
        API_ML_ALGO_UPDATE(unref(rawData.value)).then(() => {
          // notify parent
          emit('success', unref(rawData.value));
          message.success(t('common.tip.update'));
        });
      } else {
        API_ML_ALGO_CREATE(unref(rawData.value)).then(() => {
          // notify parent
          emit('success', unref(rawData.value));
          message.success(t('common.tip.new'));
        });
      }
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>

<style lang="less" scoped>
  ::v-deep(.filesets) {
    border: 1px solid silver;
    padding: 0px 10px 5px 10px;
  }

  ::v-deep(.fieldsetlegend) {
    padding: 2px 5px 2px 5px;
    width: auto;
    font-size: 15px;
  }

  .fielditem {
    padding: 2px;
    margin: 2px 0px 2px 0px;
    border: solid 1px #eee;
    background-color: #f1f1f1;
    width: 100%;
    font-size: 12px;
  }

  .fielditem:hover {
    background-color: #fdfdfd;
    cursor: move;
  }

  .toolbar-input {
    width: 150px !important;
    top: -5px;
    margin-right: 8px;
  }

  .toolbar-button {
    font-size: 28px;
    margin-right: 8px;
  }

  .toolbar-button:hover {
    background-color: gray;
    cursor: pointer;
  }

  /* 伸缩按钮部分 */
  .layout-area {
    width: 10px;
    height: 100%;
    float: left;
    color: green;
    position: absolute;
    top: 3px;
    right: 0px;
    z-index: 999;
  }

  /* 伸缩按钮居中 */
  .layout-area .collapse {
    border: 1px solid #f0f000;
    border-radius: 0px 10px 10px 0px;
    position: absolute;
    right: 0px;
    top: 3px;
    background-color: #f0f000;
    height: 50px;
    padding-top: 15px;
    cursor: pointer;
    z-index: 999;
  }

  /* 伸缩按钮居中 */
  .layout-area .expand {
    border: 1px solid #f0f000;
    border-radius: 10px 0px 0px 10px;
    position: absolute;
    right: 0px;
    top: 3px;
    background-color: #f0f000;
    height: 50px;
    padding-top: 15px;
    cursor: pointer;
    z-index: 999;
  }
</style>
