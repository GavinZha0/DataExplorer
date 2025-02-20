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
          <Tabs active="editor" centered size="small">
            <Tabs.TabPane key="workflow" :tab="t('ml.workflow.tab.workflow')">
              <div style="width: 100%; border: solid 1px gray; height: 700px">
                <div id="x6-container" ref="x6GraphRef" class="x6-graph"></div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane key="experiment" :tab="t('ml.workflow.tab.experiment')">
              <div>{{ evalResult }}</div>
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
                  @change="handleWorkflowGroupChange"
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
                    v-model:selectedKeys="selectedMenuKeys"
                    :open-keys="openMenuKeys"
                    style="width: 100%"
                    :forceRender="true"
                    @openChange="handleMenuChange">
                <SubMenu key="source">
                  <template #icon>
                    <Avatar src="/resource/img/ml/source.png" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Source
                  </template>
                  <MenuItem key="dataset" @mousedown="startDrag($event, 'source', 'dataset', 'Dataset')">Dataset</MenuItem>
                </SubMenu>
                <SubMenu key="proc">
                  <template #icon>
                    <Avatar src="/resource/img/ml/proc.png" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Pre-process
                  </template>
                  <MenuItem key="clean" @mousedown="startDrag($event, 'proc', 'clean', 'Cleaning')">Cleaning</MenuItem>
                  <MenuItem key="transform" @mousedown="startDrag($event, 'proc', 'transform', 'Transformation')">Transformation</MenuItem>
                  <MenuItem key="encode" @mousedown="startDrag($event, 'proc', 'encode', 'Encoding')">Encoding</MenuItem>
                  <MenuItem key="scale" @mousedown="startDrag($event, 'proc', 'scale', 'Scaling')">Scaling</MenuItem>
                </SubMenu>
                <SubMenu key="fe">
                  <template #icon>
                    <Avatar src="/resource/img/ml/fe.png" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Feature Engineering
                  </template>
                  <MenuItem key="extract" @mousedown="startDrag($event, 'fe', 'extract', 'Feature Extraction')">Feature Extraction</MenuItem>
                  <MenuItem key="select" @mousedown="startDrag($event, 'fe', 'select', 'Feature Selection')">Feature Selection</MenuItem>
                  <MenuItem key="reduce" @mousedown="startDrag($event, 'fe', 'reduce', 'Feature Reduction')">Feature Reduction</MenuItem>
                </SubMenu>
                <SubMenu key="ml">
                  <template #icon>
                    <Avatar src="/resource/img/ml/ml.png" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Classic ML
                  </template>
                  <MenuItem key="clf" @mousedown="startDrag($event, 'ml', 'clf', 'Classification')">Classification</MenuItem>
                  <MenuItem key="reg" @mousedown="startDrag($event, 'ml', 'reg', 'Regression')">Regression</MenuItem>
                  <MenuItem key="cluster" @mousedown="startDrag($event, 'ml', 'cluster', 'Clustering')">Clustering</MenuItem>
                  <MenuItem key="anomaly" @mousedown="startDrag($event, 'ml', 'anomaly', 'Anomaly Detection')">Anomaly Detection</MenuItem>
                </SubMenu>
                <SubMenu key="dl">
                  <template #icon>
                    <Avatar src="/resource/img/ml/dl.png" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Deep Learning
                  </template>
                  <MenuItem key="ann" @mousedown="startDrag($event, 'dl', 'ann', 'ANN')">Artificial Neural Network</MenuItem>
                  <MenuItem key="rnn" @mousedown="startDrag($event, 'dl', 'rnn', 'RNN')">Recurrent Neural Network</MenuItem>
                  <MenuItem key="cnn" @mousedown="startDrag($event, 'dl', 'cnn', 'CNN')">Convolutional Neural Network</MenuItem>
                  <MenuItem key="gan" @mousedown="startDrag($event, 'dl', 'gan', 'GAN')">Generative Adversarial Network</MenuItem>
                  <MenuItem key="drn" @mousedown="startDrag($event, 'dl', 'drn', 'DRN')">Deep Residual Network </MenuItem>
                  <MenuItem key="lstm" @mousedown="startDrag($event, 'dl', 'lstm', 'LSTM')">Long/Short Term Memory</MenuItem>
                  <MenuItem key="rbfn" @mousedown="startDrag($event, 'dl', 'rbfn', 'RBFN')">RBFN</MenuItem>
                  <MenuItem key="dbn" @mousedown="startDrag($event, 'dl', 'dbn', 'DBN')">Deep Belief Network</MenuItem>
                  <MenuItem key="rbm" @mousedown="startDrag($event, 'dl', 'rbm', 'RBM')">RBM</MenuItem>
                  <MenuItem key="autocode" @mousedown="startDrag($event, 'deepl', 'autocode', 'AutoEncoding')">AutoEncoding</MenuItem>
                </SubMenu>
                <SubMenu key="rl">
                  <template #icon>
                    <Avatar src="/resource/img/ml/rl.png" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Reinforce Learning
                  </template>
                  <MenuItem key="qlearn" @mousedown="startDrag($event, 'rl', 'qlearn', 'Q Learning')">Q Learning</MenuItem>
                  <MenuItem key="sarsa" @mousedown="startDrag($event, 'rl', 'sarsa', 'SARSA')">SARSA</MenuItem>
                  <MenuItem key="ddpg" @mousedown="startDrag($event, 'rl', 'ddpg', 'DDPG')">DDPG</MenuItem>
                  <MenuItem key="a2c" @mousedown="startDrag($event, 'rl', 'a2c', 'A2C')">A2C</MenuItem>
                  <MenuItem key="ppo" @mousedown="startDrag($event, 'rl', 'ppo', 'PPO')">PPO</MenuItem>
                  <MenuItem key="dqn" @mousedown="startDrag($event, 'rl', 'dqn', 'DQN')">DQN</MenuItem>
                  <MenuItem key="trpo" @mousedown="startDrag($event, 'rl', 'trpo', 'TRPO')">TRPO</MenuItem>
                </SubMenu>
                <SubMenu key="anomaly">
                  <template #icon>
                    <Avatar src="/resource/img/ml/anomaly.png" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Anomaly Detection
                  </template>
                  <MenuItem key="quantile" @mousedown="startDrag($event, 'anomaly', 'quantile', 'Quantile')">Quantile</MenuItem>
                  <MenuItem key="zscore" @mousedown="startDrag($event, 'anomaly', 'zscore', 'Z Score')">Z Score</MenuItem>
                  <MenuItem key="dbacan" @mousedown="startDrag($event, 'anomaly', 'dbacan', 'DBACAN')">DBACAN</MenuItem>
                  <MenuItem key="iforest" @mousedown="startDrag($event, 'anomaly', 'iforest', 'Isolation Forest')">Isolation Forest</MenuItem>
                  <MenuItem key="lof" @mousedown="startDrag($event, 'anomaly', 'lof', 'Local Outlier Factor')">Local Outlier Factor</MenuItem>
                  <MenuItem key="svm" @mousedown="startDrag($event, 'anomaly', 'svm', 'One-Class SVM')">One-Class SVM</MenuItem>
                  <MenuItem key="rcf" @mousedown="startDrag($event, 'anomaly', 'rcf', 'Random Cut Forest')">Random Cut Forest</MenuItem>
                  <MenuItem key="autocode" @mousedown="startDrag($event, 'anomaly', 'autocode', 'Auto Encoder')">Auto Encoder</MenuItem>
                </SubMenu>
                <SubMenu key="ts">
                  <template #icon>
                    <Avatar src="/resource/img/ml/ts.jpg" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Time Series
                  </template>
                  <MenuItem key="ses" @mousedown="startDrag($event, 'ts', 'ses', 'SES')">SES</MenuItem>
                  <MenuItem key="holt" @mousedown="startDrag($event, 'ts', 'holt', 'Holt Winters')">Holt Winters</MenuItem>
                  <MenuItem key="arima" @mousedown="startDrag($event, 'ts', 'arima', 'ARIMA')">ARIMA</MenuItem>
                  <MenuItem key="prophet" @mousedown="startDrag($event, 'ts', 'prophet', 'Prophet')">Prophet</MenuItem>
                  <MenuItem key="cnn" @mousedown="startDrag($event, 'ts', 'cnn', 'CNN')">CNN</MenuItem>
                  <MenuItem key="rnn" @mousedown="startDrag($event, 'ts', 'rnn', 'RNN')">RNN</MenuItem>
                  <MenuItem key="lstm" @mousedown="startDrag($event, 'ts', 'lstm', 'LSTM')">LSTM</MenuItem>
                </SubMenu>
                <SubMenu key="monitor">
                  <template #icon>
                    <Avatar src="/resource/img/ml/monitor.png" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Learning Moniter
                  </template>
                  <MenuItem key="tiny" @mousedown="startDrag($event, 'monitor', 'tiny', 'Tiny Chart')">Tensor Board</MenuItem>
                  <MenuItem key="tbord" @mousedown="startDrag($event, 'monitor', 'tbord', 'Tensor Board')">Tensor Board</MenuItem>
                  <MenuItem key="pyvis" @mousedown="startDrag($event, 'monitor', 'pyvis', 'Pytorch Vis')">Pytorch Vis</MenuItem>
                </SubMenu>
                <SubMenu key="eval">
                  <template #icon>
                    <Avatar src="/resource/img/ml/eval.png" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Model Evaluation
                  </template>
                  <MenuItem key="accu" @mousedown="startDrag($event, 'eval', 'accu', 'Accuracy')">Accuracy</MenuItem>
                  <MenuItem key="prec" @mousedown="startDrag($event, 'eval', 'prec', 'Precision')">Precision</MenuItem>
                  <MenuItem key="recall" @mousedown="startDrag($event, 'eval', 'recall', 'Recall')">Recall</MenuItem>
                  <MenuItem key="f1" @mousedown="startDrag($event, 'eval', 'f1', 'F1 Score')">F1 Score</MenuItem>
                  <MenuItem key="pr" @mousedown="startDrag($event, 'eval', 'pr', 'PR Curve')">PR Curve</MenuItem>
                  <MenuItem key="roc" @mousedown="startDrag($event, 'eval', 'roc', 'AUC-ROC')">AUC-ROC</MenuItem>
                  <MenuItem key="confusion" @mousedown="startDrag($event, 'eval', 'confusion', 'Confusion Matrix')">Confusion Matrix</MenuItem>
                </SubMenu>
                <SubMenu key="output">
                  <template #icon>
                    <Avatar src="/resource/img/ml/output.png" shape="square" style="width: 32px" />
                  </template>
                  <template #title>
                    Output
                  </template>
                  <MenuItem key="log" @mousedown="startDrag($event, 'output', 'log', 'Log')">Log</MenuItem>
                  <MenuItem key="model" @mousedown="startDrag($event, 'output', 'model', 'Model')">Model</MenuItem>
                  <MenuItem key="chart" @mousedown="startDrag($event, 'output', 'chart', 'Chart')">Chart</MenuItem>
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
            <NodeAttrs
              :kind="nodeAttrs.kind"
              :node="nodeAttrs.node"
            >
            </NodeAttrs>
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
                <color-picker v-model:pureColor="rawData.canvas.grid.color" format="hex" disable-history disable-alpha 
                @pure-color-change="handleCanvasChange('color')"/>
              </template>
              <template #bgColor="{ model, field }">
                <color-picker v-model:pureColor="rawData.canvas.bg.color" format="hex" disable-history disable-alpha 
                @pure-color-change="handleCanvasChange('bgColor')"/>
              </template>
              <template #edgeColor="{ model, field }">
                <color-picker v-model:pureColor="rawData.canvas.edge.color" format="hex" disable-history disable-alpha 
                @pure-color-change="handleCanvasChange('edgeColor')"/>
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
  import { ref, unref, reactive } from 'vue';
  import { BasicForm, FormActionType } from '/@/components/Form/index';
  import { formInfoSchema, formConfigSchema, formCanvasSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import {
    PlaySquareTwoTone,
    SaveTwoTone,
    GiftOutlined,
    InfoCircleFilled,
    SettingFilled,
    CarOutlined,
    BorderInnerOutlined
  } from '@ant-design/icons-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ApiSelect } from '/@/components/Form';
  import { message, Tooltip, Row, Col, Avatar, Menu, MenuItem, SubMenu, Tabs } from 'ant-design-vue';
  import { ApiWorkflowDataType, initWorkflow } from '/@/api/ml/model/workflow';
  import {
    API_ML_WORKFLOW_CREATE,
    API_ML_WORKFLOW_UPDATE,
    API_ML_WORKFLOW_GROUPS,
    API_ML_WORKFLOW_EXECUTE
  } from '/@/api/ml/workflow';
  import 'splitpanes/dist/splitpanes.css';
  import X6Graph from '/@/components/X6Graph/index';
  import { ColorPicker } from "vue3-colorpicker";
  import "vue3-colorpicker/style.css";
  import NodeAttrs from './nodeAttrs.vue';
  import { defaultCanvasAttrs } from '/@/components/X6Graph/type';

  const { t } = useI18n();
  const drawerTitle = ref<string>(t('common.form.new'));
  const emit = defineEmits(['success', 'register']);
  const rawData = ref<ApiWorkflowDataType>({ ...initWorkflow});
  const rightPanelSize = ref<number>(4);
  const rightPanelKey = ref<string>('component');
  const selectedPanelKeys = ref<string[]>(['component']);
  const infoFormRef = ref<Nullable<FormActionType>>(null);
  const configFormRef = ref<Nullable<FormActionType>>(null);
  const canvasFormRef = ref<Nullable<FormActionType>>(null);
  const selectedMenuKeys = ref<string[]>(['dataset']);
  const openMenuKeys = ref<string[]>([]);
  const x6GraphRef = ref();
  let workflow: any = undefined;
  const nodeAttrs = reactive<any>({kind: '', node: null});
  const evalResult = ref<string>('');

  // drawer data initialization
  const [registerDrawer, { setDrawerProps }] = useDrawerInner(async (data) => {
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
      rawData.value.canvas = defaultCanvasAttrs;
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
    if(canvasFormRef.value && rawData.value.canvas) {
      if(rawData.value.canvas.grid){
        canvasFormRef.value.setFieldsValue(rawData.value.canvas.grid);
      }
      if(rawData.value.canvas.bg){
        canvasFormRef.value.setFieldsValue({bgColor: rawData.value.canvas.bg.color});
      }
      if(rawData.value.canvas.edge){
        canvasFormRef.value.setFieldsValue({edgeColor: rawData.value.canvas.edge.color, edgeRouter: rawData.value.canvas.edge.router});
      }
    }

    // initialize workflow
    workflow = X6Graph.init(rawData.value.canvas, x6GraphRef.value, nodeSelectedHandler);
    if(workflow && data.workflow){
      // load workflow if exist
      workflow.graph.fromJSON(data.workflow);
      if(rawData.value.canvas?.edge?.color){
        // update edge color
        for(const edge of workflow.graph.getEdges()){
          edge.attr('line/stroke', rawData.value.canvas?.edge?.color);
        }
      }
    }
  });

  /*
  * show only one sub menu when menu is changed
  */
  const handleMenuChange = (openKeys: string[]) => {
    const latestOpenKey = openKeys.find(key => openMenuKeys.value.indexOf(key) === -1);
    openMenuKeys.value = latestOpenKey ? [latestOpenKey] : [];
  };

  /*
   * this will be registered to workflow
   * it will be invoked when node is selected
   */
  const nodeSelectedHandler = (node) => {
    if(node){
      // only one node is selected
      // pass node info to attr panel
      nodeAttrs.node = node;
      const dt = node.getData();
      nodeAttrs.kind = dt.kind;
    }
  };

  /*
   * switch panel - info/config/components/attrs/canvas
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
  const handleWorkflowGroupChange = (value: string[]) => {
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
   * drag a component to graph
   */
  const startDrag = (e, type, kind, title) => {
    let nodeShape = 'ExeNode';
    if(type == 'monitor'){
      nodeShape = 'ChartNode';
    }

    // create a new node
    let nodeData = {type: type, kind: kind, title: title};
    const node = workflow.graph.createNode({ shape: nodeShape, data: nodeData });
    workflow.dnd.start(node, e);
  };


  /*
   * canvas option change
   * colors of rawData are not needed to be udpated here
   */
  const handleCanvasChange = (key: string, value: string) => {
    if(key.startsWith('bg')){
      // bgColor
      workflow.updateCanvas('bg', rawData.value.canvas.bg);
    } else if(key.startsWith('edge')){
      const edgeKey = key.substring(4,20).toLowerCase();
      if(edgeKey != 'color'){
        // update rawData
        rawData.value.canvas.edge[edgeKey] = value;
      }
      workflow.updateCanvas('edge', rawData.value.canvas.edge);
    } else {
      if(key != 'color'){
        // update rawData
        rawData.value.canvas.grid[key] = value;
      }
      workflow.updateCanvas('grid', rawData.value.canvas.grid);
    }
  };


  /*
  * execute workflow
  */
  const executeWorkflow = () => {  
    API_ML_WORKFLOW_EXECUTE(rawData.value.id)
      .then((response) => {
        message.success(t('common.success.execute'));
        evalResult.value = response;
      })
      .catch((err) => {
        message.warning(t('common.exception.execute'), err);
      });
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
        rawData.value.group = infoValues.group;

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
