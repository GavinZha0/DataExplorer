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
                  v-model:value="rawData.srcCode"
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
                layout="vertical">
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
                  display: rightPanelKey == 'algo' ? 'block' : 'none',
                }"
            >
              <BasicForm
                ref="attrFormRef"
                :schemas="formAttrSchema"
                :showActionButtonGroup="false"
                layout="vertical"
                @fieldValueChange="handleAttrChange"
                >
                <template #algoName="{ model, field }">
                  <ApiTreeSelect
                    :api="API_ML_ALGO_ALGOS"
                    :params="algoParams"
                    :immediate="true"
                    v-model:value="model[field]"
                    :fieldNames="{ key: 'name', label: 'name', value: 'name' }"
                    :afterFetch="cacheAlgoTree"
                    @select="handleAlgoSelection"
                  />
                </template>
                <template #dataset="{ model, field }">
                  <ApiTreeSelect style="width: 100%"
                    v-model:value="model[field]"
                    :placeholder="t('ml.algorithm.form.algo.dataset')"
                   :api="API_ML_DATASET_TREE"
                   :immediate="true"
                    :fieldNames="{ key: 'id', label: 'name', value: 'id' }"
                   resultField="records"/>
                </template>
                <template #params>
                  <BasicTable @register="registerParamsTable" @edit-end="handleParamEditEnd">
                    <template #headerCell="{ column }">
                      <template v-if="column.key === 'name'">
                        {{ t('ml.algorithm.form.algo.params.name') }}
                        <PlusSquareTwoTone
                          class="ml-2"
                          :style="{ fontSize: '20px', marginLeft: '8px', cursor: 'pointer' }"
                          @click="handleParamAdd"
                        />
                      </template>
                      <template v-else>
                        {{ t('ml.algorithm.form.algo.params.value') }}
                      </template>
                    </template>
                  </BasicTable>
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
                  display: rightPanelKey == 'train' ? 'block' : 'none',
                }"
            >
              <BasicForm
                ref="trainFormRef"
                :schemas="formTrainSchema"
                :showActionButtonGroup="false"
                layout="vertical"
                >
                <template #dataset="{ model, field }">
                  <ApiTreeSelect style="width: 100%"
                    v-model:value="model[field]"
                    :placeholder="t('ml.algorithm.form.train.dataset')"
                   :api="API_ML_DATASET_TREE"
                   :immediate="true"
                    :fieldNames="{ key: 'id', label: 'name', value: 'id' }"
                   resultField="records"/>
                </template>
                <template #earlyStop>
                  <BasicTable @register="registerMetricsTable" @edit-end="handleMetricsEditEnd">
                    <template #headerCell="{ column }">
                      <template v-if="column.key === 'name'">
                        {{ t('ml.algorithm.form.train.early_stop.name') }}
                        <PlusSquareTwoTone
                          class="ml-2"
                          :style="{ fontSize: '20px', marginLeft: '8px', cursor: 'pointer' }"
                          @click="handleMetricsAdd"
                        />
                      </template>
                      <template v-else>
                        {{ t('ml.algorithm.form.train.early_stop.value') }}
                      </template>
                    </template>
                  </BasicTable>
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
                    :placeholder="t('ml.algorithm.form.train.dataset')"
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
      <MenuItem key="algo">
        <template #icon>
          <FunctionOutlined
            :style="{
              fontSize: '24px',
              color: 'green',
            }"
          />
        </template>
        <span>Algo&Data</span>
      </MenuItem>
      <MenuItem key="train">
        <template #icon>
          <ExperimentOutlined
            :style="{
              fontSize: '24px',
              color: 'green',
            }"
          />
        </template>
        <span>Train&Eval</span>
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
          <HistoryOutlined
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
  import { ref, unref, h, reactive } from 'vue';
  import { BasicForm, FormActionType } from '/@/components/Form/index';
  import { formInfoSchema, formAttrSchema, formTrainSchema, formChartSchema, formHistorySchema, algoTplSklearn, metricColumns, paramColumns, skMetricLib } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { ApiTreeSelect } from '/@/components/Form';
  import { BasicTree, TreeActionItem } from '/@/components/Tree';
  import {
    PlaySquareTwoTone,
    SaveTwoTone,
    InfoCircleFilled,
    AreaChartOutlined,
    ExperimentOutlined,
    DeleteOutlined,
    PlusSquareTwoTone,
    FunctionOutlined,
    HistoryOutlined
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
    API_ML_ALGO_ALGOS,
    API_ML_ALGO_EXECUTE
  } from '/@/api/ml/algorithm';
  import { ApiSelect } from '/@/components/Form';
  import { API_ML_DATASET_TREE } from '/@/api/ml/dataset';
  import { ApiAlgorithmDataType, initAlgorithm } from '/@/api/ml/model/algorithm';
  import { API_ML_ALGO_HISTORY_LIST, API_ML_ALGO_HISTORY_DEL } from '/@/api/ml/algoHistory';
  import { wsClient } from "/@/utils/http/ws/webstomp";
  import { useUserStore } from '/@/store/modules/user';
  import { cloneDeep } from 'lodash-es';
  import { BasicTable, useTable } from '/@/components/Table';

  const { t } = useI18n();
  const drawerTitle = ref<string>(t('common.form.new'));
  const emit = defineEmits(['success', 'register']);
  const rawData = ref<ApiAlgorithmDataType>(initAlgorithm);
  const activeTab = ref<string>('editor');
  const rightPanelSize = ref<number>(5);
  const rightPanelKey = ref<string>('algo');
  const selectedPanelKeys = ref<string[]>(['algo']);
  const infoFormRef = ref<Nullable<FormActionType>>(null);
  const attrFormRef = ref<Nullable<FormActionType>>(null);
  const trainFormRef = ref<Nullable<FormActionType>>(null);
  const trainPct = ref<number>(0);
  const metricVal = ref<number>(0);
  const historyParam = ref<any>({algoId: 2, succOnly: true});
  const historyData = ref<any[]>([]);
  const selHisKey = ref<number[]>([0]);
  const userStore = useUserStore();
  const algoParams = reactive<any>({framework: '', category: ''});
  let tplTree = [];
  const paramList = ref<any[]>([]);
  const metricList = ref<any[]>([]);

  // drawer data initialization
  const [registerDrawer, { setDrawerProps }] = useDrawerInner(async (data) => {
    // remove old data of info form
    if (infoFormRef.value) {
      infoFormRef.value.resetFields();
    }
    if (trainFormRef.value) {
      trainFormRef.value.resetFields();
    }

    setDrawerProps({ confirmLoading: false });

    // save received data
    rawData.value = data;
    algoParams.framework = data.framework;
    algoParams.category = data.category;
    
    // pass received data to info form
    if (infoFormRef.value) {
      infoFormRef.value.setFieldsValue(data);
    }

    if (attrFormRef.value && data.attr) {
      attrFormRef.value.setFieldsValue(data.attr);
      if(data.attr?.params){
        paramList.value = data.attr.params;
      }
    }
    
    if(!data.attr){
      // initialize attr
      data.attr = {params: paramList.value};
    }

    if (trainFormRef.value && data.config) {
      await trainFormRef.value.setFieldsValue(data.config);
      if(data.config?.metrics){
        metricList.value = data.config.metrics;
      }
    }

    if(!data.config){
      // initialize config
      data.config = {metrics: metricList.value};
    }

    // get drawer title
    if (data && data.id) {
      drawerTitle.value = '[' + data.name + ']';
    } else {
      drawerTitle.value = t('common.form.new');
    }

    // get history list
    API_ML_ALGO_HISTORY_LIST(historyParam.value).then((response) => {
      historyData.value = response.records;
    });
    

    // subscribe the message (user x and alg y)
      // one user can run multiple algorithms at the same time
      // so one user must have multiple channels to receive separated logs
      if(data.id){
        const userId = userStore.getUserInfo?.id;
        const channel = '/user/' + userId + '/wsReport';
        wsClient.subscribe(channel, function (stompMsg){
          const jsonMsg = JSON.parse(stompMsg.body);
          message.success(stompMsg.body);
        });
      }
  });

  // parameter table definition (arguments of train function)
  const [registerParamsTable, paramTableMethod] = useTable({
    bordered: true,
    columns: paramColumns,
    dataSource: paramList,
    pagination: false,
    canResize: false,
    scroll: { y: 280 },
    showIndexColumn: false
  });


  // metrics table definition (used for early stop)
  const [registerMetricsTable, metricTableMethod] = useTable({
    bordered: true,
    columns: metricColumns,
    dataSource: metricList,
    pagination: false,
    canResize: false,
    scroll: { y: 360 },
    showIndexColumn: false
  });

  
  /*
   * add parameter
   */
   function handleParamAdd() {
    // add an empty parameter to table
    if (paramList.value) {
      paramTableMethod.insertTableDataRecord({ name: '', value: '' }, paramList.value.length);
    } else {
      paramTableMethod.insertTableDataRecord({ name: '', value: '' }, 0);
    }
  }

  /*
   * update parameter
   */
   function handleParamEditEnd({ index, key, value }: Recordable) {
    if (paramList.value.length <= index) {
      // add a new one
      paramList.value.push({ name: '', value: '' });
    }
    paramList.value[index][key] = value.trim();
    if(paramList.value[index]['name'] == '' && paramList.value[index]['value'] == ''){
      // delete empty parameter
      paramList.value.splice(index, 1);
    }
  }

  /*
   * add metrics
   */
   function handleMetricsAdd() {
    // add an empty metrics to table
    if (metricList.value) {
      metricTableMethod.insertTableDataRecord({ name: '', value: '' }, metricList.value.length);
    } else {
      metricTableMethod.insertTableDataRecord({ name: '', value: '' }, 0);
    }
  }


  /*
   * update metrics
   */
  function handleMetricsEditEnd({ index, key, value }: Recordable) {
    if (metricList.value.length <= index) {
      // add a new one
      metricList.value.push({ name: '', value: '' });
    }
    metricList.value[index][key] = value.trim();
    if(metricList.value[index]['name'] == '' && metricList.value[index]['value'] == ''){
      // delete empty parameter
      metricList.value.splice(index, 1);
    }
  }

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
  * Attr option change
  */
  const handleAttrChange = (key: string, value: string) => {
    if(key == 'framework' || key == 'category'){
      algoParams[key] = value;
    }
  };

  /*
  * cache algo tree
  */
  const cacheAlgoTree = (data: any[]) =>{
    if(data){
      tplTree = data.records;
      return data.records;
    } else {
      return [];
    }
  };

  /*
  * algo templete change
  */
  const handleAlgoSelection = (name: string) => {
    let modelName = null;
    if(algoParams.framework == 'sklearn'){
      let tpl = cloneDeep(algoTplSklearn);
      for(let node of tplTree){
        for(let child of node.children){
          if(child.name == name){
            modelName = node.name;
            break;
          }
        }
        if(modelName!=null){
          break;
        }
      }
      
      tpl = tpl.replaceAll('{MODULE}', modelName);
      tpl = tpl.replaceAll('{ALGORITHM}', name);

      // build arguments based on parameters
      let paramArray: string[] = [];
      if(rawData.value.attr?.params){
        for(let item of rawData.value.attr.params){
          if(item.name!='' && item.value!=''){
            paramArray.push(`${item.name}=config['${item.name}']`);
          }
        }
      }
      let paramArgStr = paramArray.join();
      tpl = tpl.replaceAll('{PARAMS}', paramArgStr);

      // build eval metrics
      let metricArray: string[] = [];
      let funcArray: string[] = [];
      if(rawData.value.config?.metrics){
        for(let item of rawData.value.config.metrics){
          if(item.name!=''){
            let func_name = item.name;
            if(item.name == 'score'){
              func_name = `${algoParams.category}_${item.name}`;
            }
            if(skMetricLib[func_name]){
              funcArray.push(`${item.name} = ${skMetricLib[func_name]}`);
              metricArray.push(`'${item.name}': ${item.name}`);
            }
          }
        }
      }

      let funcStr = funcArray.join('\n      ');
      tpl = tpl.replaceAll('{METRIC_GET}', funcStr);

      let metricStr = metricArray.join();
      if(metricStr!=''){
        metricStr = `ray.train.report({${metricStr}})`;
      }      
      tpl = tpl.replaceAll('{METRICS_RPT}', metricStr);

      rawData.value.srcCode = tpl;
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
    if(menu.key == 'train'){
      rightPanelSize.value = 5;
    } else {
      rightPanelSize.value = 5;
    }
  };

  /*
   * execute training
   */
  const execute = () => {
    if (!rawData.value.srcCode) {
      return;
    }

    // save first
    //await handleSubmit();

    // execute algo training
    API_ML_ALGO_EXECUTE(rawData.value.id, rawData.value.framework).then((response) => {
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
      const info = await infoFormRef.value.validate();
      const attr = await attrFormRef.value.validate();
      const cfg = await trainFormRef.value.validate();
      rawData.value.name = info.name;
      rawData.value.desc = info.desc;
      rawData.value.group = info.group;

      rawData.value.category = attr.category;
      rawData.value.algoName = attr.algoName;
      rawData.value.framework = attr.framework;
      rawData.value.datasetId = attr.dataset;
      rawData.value.attr = attr;

      rawData.value.attr['params'] = [];
      if(paramList.value.length>0){
        for(var item of paramList.value){
          if(item.name && item.name.length>0 && item.value && item.value.length>0){
            rawData.value.attr.params.push(item);
          }
        }
      }
      if(rawData.value.attr.params == []){
        delete rawData.value.attr.params;
      }

      rawData.value.config = cfg;
      rawData.value.config['metrics'] = [];
      if(metricList.value.length>0){
        for(var item of metricList.value){
          if(item.name && item.name.length>0 && item.value && item.value.length>0){
            rawData.value.config.metrics.push(item);
          }
        }
      }
      if(rawData.value.config.metrics == []){
        delete rawData.value.config.metrics;
      }

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
