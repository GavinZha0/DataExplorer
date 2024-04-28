<template>
  <BasicDrawer
    v-bind="$attrs"
    :isDetail="true"
    @register="registerDrawer"
    :title="drawerTitle"
    :closable="false"
    :showDetailBack="true"
    :keyboard="false"
    @close="handleFormClose"
  >
    <template #titleToolbar>
      <Tooltip>
        <template #title>{{ t('ml.workflow.toolbar.layout') }}</template>
        <GoldTwoTone class="toolbar-button" @click="layoutWorkflow" />
      </Tooltip>
      <Tooltip>
        <template #title>{{ t('common.toolbar.execute') }}</template>
        <PlaySquareTwoTone class="toolbar-button" @click="executeWorkflow" />
      </Tooltip>
      <Tooltip>
        <template #title>{{ t('common.toolbar.save') }}</template>
        <SaveTwoTone class="toolbar-button" @click="saveWorkflow" />
      </Tooltip>
    </template>
    <div style="width: 98%; float: left">
      <Row type="flex" :gutter="4">
        <Col :md="24 - rightPanelSize" :sm="24">
          <Tabs active="flow" centered size="small">
            <Tabs.TabPane key="flow" :tab="t('ml.workflow.tab.flow')">
              <div style="width: 100%; border: solid 1px gray; height: 700px">
                <div id="x6-container" ref="x6GraphRef" class="x6-graph"></div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane key="chart" :tab="t('ml.workflow.tab.chart')">
              <div>hello</div>
            </Tabs.TabPane>
          </Tabs> 
        </Col>
        <Col :md="rightPanelSize" :sm="24" :forceRender="true">
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
              :forceRender="true"
              :schemas="formInfoSchema"
              :showActionButtonGroup="false"
              layout="vertical"
            >
              <template #group="{ model, field }">
                <ApiSelect
                  :api="API_ML_WORKFLOW_GROUPS"
                  mode="tags"
                  v-model:value="model[field]"
                  resultField="records"
                  @change="handleFlowGroupChange"
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
              :forceRender="true"
              :schemas="formConfigSchema"
              :showActionButtonGroup="false"
            >
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
              overflowY: 'scroll',
              display: rightPanelKey == 'component' ? 'block' : 'none'
            }"
          >
          <div style="height: 700px; overflow-y: scroll;">
          <Menu mode="inline"
                    :multiple="false"
                    v-model:selectedKeys="selectedVisKeys"
                    :open-keys="openVisKeys"
                    style="width: 100%"
                    :forceRender="true"
                    @click="handleSubVisSwitch"
                    @openChange="handleVisChange">
                <SubMenu key="source">
                  <template #icon>
                    <Avatar src="/resource/img/ml/source.png" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Source
                  </template>
                  <MenuItem key="db" @mousedown="startDrag($event, 'source', 'Database')">Database</MenuItem>
                  <MenuItem key="file" @mousedown="startDrag($event, 'source', 'File')">File</MenuItem>
                  <MenuItem key="dataset" @mousedown="startDrag($event, 'source', 'Dataset')">Dataset</MenuItem>
                  <MenuItem key="url" @mousedown="startDrag($event, 'source', 'URL')">URL</MenuItem>
                </SubMenu>
                <SubMenu key="process">
                  <template #icon>
                    <Avatar src="/resource/img/ml/process.png" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Pre-process
                  </template>
                  <MenuItem key="miss" @mousedown="startDrag($event, 'process', 'Miss values')">Miss values</MenuItem>
                  <MenuItem key="outlier" @mousedown="startDrag($event, 'process', 'Outiler')">Outiler</MenuItem>
                  <MenuItem key="filter" @mousedown="startDrag($event, 'process', 'Filter')">Filter</MenuItem>
                  <MenuItem key="split" @mousedown="startDrag($event, 'process', 'Split')">Split</MenuItem>
                  <MenuItem key="merge" @mousedown="startDrag($event, 'process', 'Merge')">Merge</MenuItem>
                  <MenuItem key="extract" @mousedown="startDrag($event, 'process', 'Extract')">Extract</MenuItem>
                  <MenuItem key="encode" @mousedown="startDrag($event, 'process', 'Encode')">Encode</MenuItem>
                  <MenuItem key="scale" @mousedown="startDrag($event, 'process', 'Scale')">Scale</MenuItem>
                </SubMenu>
                <SubMenu key="feature">
                  <template #icon>
                    <Avatar src="/resource/img/ml/feature.png" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Feature Engineering
                  </template>
                  <MenuItem key="imp" @mousedown="startDrag($event, 'feature', 'Feature Importance')">Feature Importance</MenuItem>
                  <MenuItem key="select" @mousedown="startDrag($event, 'feature', 'Feature Selection')">Feature Selection</MenuItem>
                  <MenuItem key="dim" @mousedown="startDrag($event, 'feature', 'Dim Reduction')">Dim Reduction</MenuItem>
                  <MenuItem key="synth" @mousedown="startDrag($event, 'feature', 'Feature Synthesis')">Feature Synthesis</MenuItem>
                </SubMenu>
                <SubMenu key="algo">
                  <template #icon>
                    <Avatar src="/resource/img/ml/algo.png" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Traditional Algorithm
                  </template>
                  <MenuItem key="clf" @mousedown="startDrag($event, 'algo', 'Classification')">Classification</MenuItem>
                  <MenuItem key="reg" @mousedown="startDrag($event, 'algo', 'Regression')">Regression</MenuItem>
                  <MenuItem key="cluster" @mousedown="startDrag($event, 'algo', 'Clustering')">Clustering</MenuItem>
                  <MenuItem key="dim" @mousedown="startDrag($event, 'algo', 'Dim Reduction')">Dim Reduction</MenuItem>
                </SubMenu>
                <SubMenu key="deepl">
                  <template #icon>
                    <Avatar src="/resource/img/ml/deepl.png" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Deep Learning
                  </template>
                  <MenuItem key="mpl" @mousedown="startDrag($event, 'deepl', 'MPL')">MPL</MenuItem>
                  <MenuItem key="rnn" @mousedown="startDrag($event, 'deepl', 'RNN')">RNN</MenuItem>
                  <MenuItem key="cnn" @mousedown="startDrag($event, 'deepl', 'CNN')">CNN</MenuItem>
                  <MenuItem key="gan" @mousedown="startDrag($event, 'deepl', 'GAN')">GAN</MenuItem>
                  <MenuItem key="lstm" @mousedown="startDrag($event, 'deepl', 'LSTM')">LSTM</MenuItem>
                  <MenuItem key="rbfn" @mousedown="startDrag($event, 'deepl', 'RBFN')">RBFN</MenuItem>
                  <MenuItem key="dbn" @mousedown="startDrag($event, 'deepl', 'DBN')">DBN</MenuItem>
                  <MenuItem key="rbm" @mousedown="startDrag($event, 'deepl', 'RBM')">RBM</MenuItem>
                  <MenuItem key="autocode" @mousedown="startDrag($event, 'deepl', 'AutoEncoding')">AutoEncoding</MenuItem>
                </SubMenu>
                <SubMenu key="reinforcel">
                  <template #icon>
                    <Avatar src="/resource/img/ml/reinforcel.png" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Reinforce Learning
                  </template>
                  <MenuItem key="qlearn" @mousedown="startDrag($event, 'reinforcel', 'Q Learning')">Q Learning</MenuItem>
                  <MenuItem key="sarsa" @mousedown="startDrag($event, 'reinforcel', 'SARSA')">SARSA</MenuItem>
                  <MenuItem key="ddpg" @mousedown="startDrag($event, 'reinforcel', 'DDPG')">DDPG</MenuItem>
                  <MenuItem key="a2c" @mousedown="startDrag($event, 'reinforcel', 'A2C')">A2C</MenuItem>
                  <MenuItem key="ppo" @mousedown="startDrag($event, 'reinforcel', 'PPO')">PPO</MenuItem>
                  <MenuItem key="dqn" @mousedown="startDrag($event, 'reinforcel', 'DQN')">DQN</MenuItem>
                  <MenuItem key="trpo" @mousedown="startDrag($event, 'reinforcel', 'TRPO')">TRPO</MenuItem>
                </SubMenu>
                <SubMenu key="automl">
                  <template #icon>
                    <Avatar src="/resource/img/ml/automl.png" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Auto ML
                  </template>
                  <MenuItem key="autosk" @mousedown="startDrag($event, 'automl', 'Auto Sklearn')">Auto Sklearn</MenuItem>
                  <MenuItem key="autokeras" @mousedown="startDrag($event, 'automl', 'Auto Keras')">Auto Keras</MenuItem>
                  <MenuItem key="tpot" @mousedown="startDrag($event, 'automl', 'TPOT')">TPOT</MenuItem>
                  <MenuItem key="h2o" @mousedown="startDrag($event, 'automl', 'H2O')">H2O</MenuItem>
                  <MenuItem key="pycaret" @mousedown="startDrag($event, 'automl', 'PyCaret')">PyCaret</MenuItem>
                  <MenuItem key="gluon" @mousedown="startDrag($event, 'automl', 'AutoGluon')">AutoGluon</MenuItem>
                  <MenuItem key="mlbox" @mousedown="startDrag($event, 'automl', 'MLBox')">MLBox</MenuItem>
                  <MenuItem key="flaml" @mousedown="startDrag($event, 'automl', 'FLAML')">FLAML</MenuItem>
                  <MenuItem key="nni" @mousedown="startDrag($event, 'automl', 'NNI')">NNI</MenuItem>
                </SubMenu>
                <SubMenu key="anomaly">
                  <template #icon>
                    <Avatar src="/resource/img/ml/anomaly.png" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Anomaly Detection
                  </template>
                  <MenuItem key="quantile" @mousedown="startDrag($event, 'anomaly', 'Quantile')">Quantile</MenuItem>
                  <MenuItem key="zscore" @mousedown="startDrag($event, 'anomaly', 'Z Score')">Z Score</MenuItem>
                  <MenuItem key="dbacan" @mousedown="startDrag($event, 'anomaly', 'DBACAN')">DBACAN</MenuItem>
                  <MenuItem key="iforest" @mousedown="startDrag($event, 'anomaly', 'Isolation Forest')">Isolation Forest</MenuItem>
                  <MenuItem key="lof" @mousedown="startDrag($event, 'anomaly', 'Local Outlier Factor')">Local Outlier Factor</MenuItem>
                  <MenuItem key="svm" @mousedown="startDrag($event, 'anomaly', 'One-Class SVM')">One-Class SVM</MenuItem>
                  <MenuItem key="rcf" @mousedown="startDrag($event, 'anomaly', 'Random Cut Forest')">Random Cut Forest</MenuItem>
                  <MenuItem key="autocode" @mousedown="startDrag($event, 'anomaly', 'Auto Encoder')">Auto Encoder</MenuItem>
                </SubMenu>
                <SubMenu key="ts">
                  <template #icon>
                    <Avatar src="/resource/img/ml/ts.jpg" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Time Series
                  </template>
                  <MenuItem key="ses" @mousedown="startDrag($event, 'ts', 'SES')">SES</MenuItem>
                  <MenuItem key="holt" @mousedown="startDrag($event, 'ts', 'Holt Winters')">Holt Winters</MenuItem>
                  <MenuItem key="arima" @mousedown="startDrag($event, 'ts', 'ARIMA')">ARIMA</MenuItem>
                  <MenuItem key="prophet" @mousedown="startDrag($event, 'ts', 'Prophet')">Prophet</MenuItem>
                  <MenuItem key="cnn" @mousedown="startDrag($event, 'ts', 'CNN')">CNN</MenuItem>
                  <MenuItem key="rnn" @mousedown="startDrag($event, 'ts', 'RNN')">RNN</MenuItem>
                  <MenuItem key="lstm" @mousedown="startDrag($event, 'ts', 'LSTM')">LSTM</MenuItem>
                </SubMenu>
                <SubMenu key="monitor">
                  <template #icon>
                    <Avatar src="/resource/img/ml/monitor.png" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Learning Moniter
                  </template>
                  <MenuItem key="tiny" @mousedown="startDrag($event, 'monitor', 'Tiny Chart')">Tensor Board</MenuItem>
                  <MenuItem key="tbord" @mousedown="startDrag($event, 'monitor', 'Tensor Board')">Tensor Board</MenuItem>
                  <MenuItem key="pyvis" @mousedown="startDrag($event, 'monitor', 'Pytorch Vis')">Pytorch Vis</MenuItem>
                </SubMenu>
                <SubMenu key="eval">
                  <template #icon>
                    <Avatar src="/resource/img/ml/eval.png" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Evaluation
                  </template>
                  <MenuItem key="accu" @mousedown="startDrag($event, 'eval', 'Accuracy')">Accuracy</MenuItem>
                  <MenuItem key="prec" @mousedown="startDrag($event, 'eval', 'Precision')">Precision</MenuItem>
                  <MenuItem key="recall" @mousedown="startDrag($event, 'eval', 'Recall')">Recall</MenuItem>
                  <MenuItem key="f1" @mousedown="startDrag($event, 'eval', 'F1 Score')">F1 Score</MenuItem>
                  <MenuItem key="pr" @mousedown="startDrag($event, 'eval', 'PR Curve')">PR Curve</MenuItem>
                  <MenuItem key="roc" @mousedown="startDrag($event, 'eval', 'AUC-ROC')">AUC-ROC</MenuItem>
                  <MenuItem key="confusion" @mousedown="startDrag($event, 'eval', 'Confusion Matrix')">Confusion Matrix</MenuItem>
                </SubMenu>
                <SubMenu key="output">
                  <template #icon>
                    <Avatar src="/resource/img/ml/output.png" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Output
                  </template>
                  <MenuItem key="log" @mousedown="startDrag($event, 'output', 'Log')">Log</MenuItem>
                  <MenuItem key="model" @mousedown="startDrag($event, 'output', 'Model')">Model</MenuItem>
                  <MenuItem key="chart" @mousedown="startDrag($event, 'output', 'Chart')">Chart</MenuItem>
                </SubMenu>
              </Menu>
            </div>
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
              display: rightPanelKey == 'attribute' ? 'block' : 'none'
            }"
          >
            <BasicForm
              ref="attributeFormRef"
              layout="vertical"
              :forceRender="true"
              :schemas="formAttributeSchema"
              :showActionButtonGroup="false"
              @fieldValueChange="handleAttributeChange"
            >
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
              display: rightPanelKey == 'canvas' ? 'block' : 'none'
            }"
          >
            <BasicForm
              ref="canvasFormRef"
              :forceRender="true"
              :schemas="formCanvasSchema"
              :showActionButtonGroup="false"
              @fieldValueChange="handleCanvasChange"
            >
              <template #gridColor="{ model, field }">
                <!--el-color-picker v-model="canvas.gridColor" /-->
                <color-picker v-model:pureColor="canvas.gridColor" format="hex" disable-history disable-alpha/>
              </template>
              <template #bgColor="{ model, field }">
                <!--el-color-picker v-model="canvas.bgColor" /-->
                <color-picker v-model:pureColor="canvas.bgColor" format="hex" disable-history disable-alpha/>
              </template>
              <template #edgeColor="{ model, field }">
                <!--el-color-picker v-model="canvas.edgeColor" /-->
                <color-picker v-model:pureColor="canvas.edgeColor" format="hex" disable-history disable-alpha/>
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
      <MenuItem key="component">
        <template #icon>
          <GiftOutlined
            :style="{
              fontSize: '24px',
              color: 'green',
            }"
          />
        </template>
        <span>Component</span>
      </MenuItem>
      <MenuItem key="attribute">
        <template #icon>
          <CarOutlined
            :style="{
              fontSize: '24px',
              color: 'green',
            }"
          />
        </template>
        <span>Atrribute</span>
      </MenuItem>
      <MenuItem key="canvas">
        <template #icon>
          <BorderInnerOutlined
            :style="{
              fontSize: '24px',
              color: 'green',
            }"
          />
        </template>
        <span>Canvas</span>
      </MenuItem>
    </Menu>
  </BasicDrawer>
</template>

<script lang="ts" setup name="DetailForm">
  import { ref, unref, watch, reactive } from 'vue';
  import { BasicForm, FormActionType, useForm } from '/@/components/Form/index';
  import {
    formInfoSchema,
    formConfigSchema,
    formAttributeSchema,
    formCanvasSchema
  } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import {
    PlaySquareTwoTone,
    SaveTwoTone,
    GiftOutlined,
    InfoCircleFilled,
    SettingFilled,
    GoldTwoTone,
    CarOutlined,
    BorderInnerOutlined
  } from '@ant-design/icons-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ApiSelect } from '/@/components/Form';
  import {
    message,
    Tooltip,
    Row,
    Col,
    Avatar,
    Menu,
    MenuItem,
    SubMenu,
    Tabs,
    TabPane,
  } from 'ant-design-vue';
  import {
    ApiWorkflowDataType,
    initWorkflow
  } from '/@/api/ml/model/workflow';
  import {
    API_ML_WORKFLOW_CREATE,
    API_ML_WORKFLOW_UPDATE,
    API_ML_WORKFLOW_GROUPS,
  } from '/@/api/ml/workflow';
  import 'splitpanes/dist/splitpanes.css';
  import X6Graph from '/@/components/X6Graph/index';
  import { ColorPicker } from "vue3-colorpicker";
  import "vue3-colorpicker/style.css";

  const { t } = useI18n();
  const drawerTitle = ref<string>(t('common.form.new'));
  const emit = defineEmits(['success', 'register']);
  const rawData = ref<ApiWorkflowDataType>({ ...initWorkflow});
  const rightPanelSize = ref<number>(4);
  const rightPanelKey = ref<string>('component');
  const selectedPanelKeys = ref<string[]>(['component']);
  const infoFormRef = ref<Nullable<FormActionType>>(null);
  const configFormRef = ref<Nullable<FormActionType>>(null);
  const attributeFormRef = ref<Nullable<FormActionType>>(null);
  const canvasFormRef = ref<Nullable<FormActionType>>(null);
  const canvas = reactive<any>({bgColor: '#0A0A0A', gridColor: '#FFF59C', edgeColor: '#808080'});
  const x6GraphRef = ref();
  let workflow: any = undefined;
  const layoutDir = ref<string>('LR');

  // drawer data initialization
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    // remove old data of info form
    if (infoFormRef.value) {
      await infoFormRef.value.resetFields();
    }

    setDrawerProps({ confirmLoading: false });

    // save received data
    rawData.value = data;

    // get drawer title
    if (data && data.id) {
      drawerTitle.value = '[' + data.name + ']';
    } else {
      drawerTitle.value = t('common.form.new');
      rawData.value.canvas = {bg:{}, grid:{}, edge:{}};
      workflow = X6Graph.init(null, x6GraphRef.value);
      return;
    }


    // pass received data to info form
    if (infoFormRef.value && data) {
      infoFormRef.value.setFieldsValue(data);
    }

    // initial config
    if (configFormRef.value && data?.config) {
      configFormRef.value.setFieldsValue(data.config);
    }

    // initial config
    if(canvasFormRef.value && data?.canvas) {
      if(data.canvas.grid){
        canvas.color = data.canvas.grid.color;
        canvasFormRef.value.setFieldsValue(data.canvas.grid);
      }
      if(data.canvas.bg){
        canvas.bgColor = data.canvas.bg.color;
        canvasFormRef.value.setFieldsValue({bgColor: data.canvas.bg.color});
      }
      if(data.canvas.edge){
        canvas.edgeColor = data.canvas.edge.color;
        canvasFormRef.value.setFieldsValue({edgeColor: data.canvas.edge.color, edgeRouter: 'normal', edgeConnector: 'smooth'});
      }
    }

  workflow = X6Graph.init(data.canvas, x6GraphRef.value);
  if(workflow && data.workflow){
    workflow.graph.fromJSON(data.workflow);
  }
});

  /*
   * switch panel - info/config/model/attrs
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
   * only pick up the latest one as selected field when selecting change
   * select component accepts user defined item when it is tags mode
   * so you can select existing group name or create a new group
   */
  const handleFlowGroupChange = (value: string[]) => {
    if (infoFormRef.value && value.length > 1) {
      // get the latest one when there are multiple selections
      infoFormRef.value.setFieldsValue({ group: value[value.length - 1] });
    }
  };

  /*
   * drag a component to graph
   */
  const startDrag = (e, type, title) => {
    let nodeShape = 'AlgoNode';
    if(type == 'monitor'){
      nodeShape = 'ChartNode';
    }

    const node = workflow.graph.createNode({
      shape: nodeShape,
      data: {type: type, title: title}
    });
    workflow.dnd.start(node, e);
  };


  /*
   * node attribute change
   */
   const handleAttributeChange = (key: string, value: string) => {

  };

  /*
   * watch canvas colors
   * fieldValueChange is not triggered by color change when use v-model=model[field]
   */
   watch(()=>canvas.bgColor, (newVal, oldVal) => {
    handleCanvasChange('bgColor', newVal);
  });

  watch(()=>canvas.gridColor, (newVal, oldVal) => {
    handleCanvasChange('color', newVal);
  });

  watch(()=>canvas.edgeColor, (newVal, oldVal) => {
    handleCanvasChange('edgeColor', newVal);
  });


  /*
   * canvas option change
   */
  const handleCanvasChange = (key: string, value: string) => {
    if(key.startsWith('bg')){
      const bgKey = key.substring(2,20).toLowerCase();
      if(!rawData.value.canvas.bg){
        rawData.value.canvas.bg = {};  
      }
      rawData.value.canvas.bg[bgKey] = value;
      workflow.updateCanvas('bg', rawData.value.canvas.bg);
    } else if(key.startsWith('edge')){
      const edgeKey = key.substring(4,20).toLowerCase();
      if(!rawData.value.canvas.edge){
        rawData.value.canvas.edge = {};  
      }
      rawData.value.canvas.edge[edgeKey] = value;
      workflow.updateCanvas('edge', rawData.value.canvas.edge);
    } else {
      if(!rawData.value.canvas.grid){
        rawData.value.canvas.grid = {};  
      }
      rawData.value.canvas.grid[key] = value;
      workflow.updateCanvas('grid', rawData.value.canvas.grid);
    }
  };

  /*
   * layout workflow
   */
  const layoutWorkflow = () => {
    if(layoutDir.value == 'LR'){
      // up to down
      layoutDir.value = 'UD';
    } else {
      // left to right
      layoutDir.value = 'LR';
    }

    workflow.layout(layoutDir.value);
  };

  /*
   * execute workflow
   */
   const executeWorkflow = () => {


  };

  /*
   * save workflow
   */
  async function saveWorkflow() {
    try {
      if (infoFormRef.value) {
        // validate form data
        const infoValues = await infoFormRef.value.validate();
        rawData.value.name = infoValues.name;
        rawData.value.desc = infoValues.desc;
        rawData.value.group = infoValues.group[0];

        const configValues = await configFormRef.value.validate();
        rawData.value.config = configValues;

        const flowData = workflow.graph.toJSON();
        rawData.value.workflow = {nodes: [], edges: []};
        for(const cell of flowData.cells){
          if(cell.source && cell.target){
            rawData.value.workflow.edges.push({
              id: cell.id, 
              shape: cell.shape, 
              source: cell.source, 
              target: cell.target
            });
          } else {
            rawData.value.workflow.nodes.push({
              id: cell.id, 
              shape: cell.shape, 
              data: cell.data, 
              position: cell.position
            });
          }
        }
        // id should be a number, but we get string from form.
        // so convert it to number
        // otherwise updateTableDataRecord() will not work because string id can not be found in data
        setDrawerProps({ confirmLoading: true });
        if (rawData.value.id) {
          rawData.value.id = Number(rawData.value.id);
          API_ML_WORKFLOW_UPDATE(unref(rawData.value))
            .then(() => {
              // notify parent
              emit('success', unref(rawData.value));
            })
            .catch((err) => {
              message.warning(t('common.exception.update'), err);
            });
        } else {
          API_ML_WORKFLOW_CREATE(unref(rawData.value))
            .then(() => {
              // notify parent
              emit('success', unref(rawData.value));
            })
            .catch((err) => {
              message.warning(t('common.exception.new'), err);
            });
        }
      } 
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }

  /*
   * close current form
   */
  function handleFormClose() {
    console.log("aaa");
  }
</script>

<style lang="less" scoped>
  
  .sider {
  width: 220px;
  height: 100%;
  padding: 5px 5px 5px 5px;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
}
  .toolbar-input {
    width: 150px !important;
    top: -5px;
    margin-right: 8px;
    color: darkred;
    outline-color: red;
    background-color: #cc0000;
  }

  .toolbar-button {
    font-size: 28px;
    margin-right: 8px;
  }

  .toolbar-button:hover {
    background-color: gold;
    cursor: pointer;
  }

  @keyframes ant-line {
    to {
        stroke-dashoffset: -1000
    }
  }
</style>
