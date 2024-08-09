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
            <Tabs.TabPane key="development" :tab="t('ml.algorithm.tab.development')">
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
            <Tabs.TabPane key="experiment" :tab="t('ml.algorithm.tab.experiment')">
              <div style="width: 100%; border: solid 1px gray; height: 700px">{{ experData[0] }}</div>
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
                ref="algoFormRef"
                :schemas="formAlgoSchema"
                :showActionButtonGroup="false"
                @fieldValueChange="handleAlgoChange"
                >
                <template #algoName="{ model, field }">
                  <ApiTree
                    :api="API_ML_ALGO_ALGOS"
                    :params="algoParams"
                    :immediate="true"
                    :height="600"
                    v-model:value="model[field]"
                    v-model:selectedKeys="selectedAlgo"
                    v-model:expandedKeys="expandedAlgo"
                    :fieldNames="{ key: 'name', title: 'name', value: 'name' }"
                    :afterFetch="afterFetchAlgos"
                    @select="handleAlgoSelection"
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
                  display: rightPanelKey == 'data' ? 'block' : 'none',
                }"
            >
              <BasicForm
                ref="dataFormRef"
                :schemas="formDataSchema"
                :showActionButtonGroup="false"
                >
                <template #dataset="{ model, field }">
                  <ApiTree
                    :api="API_ML_DATASET_TREE"
                    :immediate="true"
                    :height="600"
                    v-model:value="model[field]"
                    v-model:selectedKeys="selectedDataset"
                    v-model:expandedKeys="expandedDataset"
                    :fieldNames="{ key: 'id', title: 'name', value: 'id' }"
                    :afterFetch="afterFetchDataset"
                    @select="handleDatasetSelection"
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
                  display: rightPanelKey == 'train' ? 'block' : 'none',
                }"
            >
              <BasicForm
                ref="trainFormRef"
                :schemas="formTrainSchema"
                :showActionButtonGroup="false"
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
                  display: rightPanelKey == 'experiment' ? 'block' : 'none',
                }"
            >
              <BasicForm
                ref="experFormRef"
                :schemas="formExperSchema"
                :showActionButtonGroup="false"
                @fieldValueChange="handleExperChange"
                >
                <template #trials="{ model, field }">
                  <JsonTreeView :data="experData" :maxDepth="1" rootKey="Trials"/>
                  
                  <!--ApiTree
                    :api="API_ML_EXPERIMENT_TRIALS"
                    :params="experParam"
                    :immediate="true"
                    :height="600"
                    v-model:value="model[field]"
                    :fieldNames="{ key: 'start_time', title: 'start_time', value: 'run_uuid' }"
                    :afterFetch="afterFetchTrials"
                    @select="handleExperSelect"
                  /-->
                  <!--BasicTree
                    :treeData="experData"
                    v-model:value="model[field]"
                    v-model:selectedKeys="selHisKey"
                    :fieldNames="{ title: 'createdAt', key: 'id' }"
                    style="width: 100%, overflowY: 'scroll'"
                    :actionList="experActions"
                    :renderIcon="experIcons"
                    @select="handleExperSelect"
                  /-->
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
        <span>Algo</span>
      </MenuItem>
      <MenuItem key="data">
        <template #icon>
          <HddOutlined
            :style="{
              fontSize: '24px',
              color: 'green',
            }"
          />
        </template>
        <span>Data</span>
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
      <MenuItem key="experiment">
        <template #icon>
          <HistoryOutlined
            :style="{
              fontSize: '24px',
              color: 'green',
            }"
          />
        </template>
        <span>Experiment</span>
      </MenuItem>
    </Menu>
  </BasicDrawer>
</template>

<script lang="ts" setup name="DetailForm">
  import { ref, unref, h, reactive } from 'vue';
  import { BasicForm, FormActionType } from '/@/components/Form/index';
  import { formInfoSchema, formDataSchema, formAlgoSchema, formTrainSchema, formChartSchema, formExperSchema, algoTplSklearn, metricColumns, paramColumns, skMetricLib } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { ApiTree, ApiTreeSelect } from '/@/components/Form';
  import { BasicTree, TreeActionItem } from '/@/components/Tree';
  import dayjs from 'dayjs';
  import {
    PlaySquareTwoTone,
    SaveTwoTone,
    InfoCircleFilled,
    AreaChartOutlined,
    ExperimentOutlined,
    DeleteOutlined,
    PlusSquareTwoTone,
    FunctionOutlined,
    HistoryOutlined,
    HddOutlined
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
  import { API_ML_EXPERIMENT_TRIALS, API_ML_EXPERIMENT_DEL_TRIAL } from '/@/api/ml/experiment';
  import { cloneDeep } from 'lodash-es';
  import { BasicTable, useTable } from '/@/components/Table';
  import { JsonTreeView } from '/@/components/Json-tree-view';

  const { t } = useI18n();
  const drawerTitle = ref<string>(t('common.form.new'));
  const emit = defineEmits(['success', 'register']);
  const rawData = ref<ApiAlgorithmDataType>(initAlgorithm);
  const activeTab = ref<string>('development');
  const rightPanelSize = ref<number>(5);
  const rightPanelKey = ref<string>('algo');
  const selectedPanelKeys = ref<string[]>(['algo']);
  const infoFormRef = ref<Nullable<FormActionType>>(null);
  const dataFormRef = ref<Nullable<FormActionType>>(null);
  const algoFormRef = ref<Nullable<FormActionType>>(null);
  const trainFormRef = ref<Nullable<FormActionType>>(null);
  const trainPct = ref<number>(0);
  const metricVal = ref<number>(0);
  const experParam = ref<any>({algoId: 17, succOnly: true});
  //const experData = ref<any[]>([]);
  const experData = ref<any>({});
  const selHisKey = ref<number[]>([0]);
  const algoParams = reactive<any>({framework: 'sklearn', category: 'clf'});
  const selectedAlgo = ref<string[]>([]);
  const expandedAlgo = ref<string[]>([]);
  const selectedDataset = ref<number[]>([]);
  const expandedDataset = ref<number[]>([]);
  let algoTree = [];
  const paramList = ref<any[]>([]);
  const metricList = ref<any[]>([]);
  const DATE_TIME_FORMAT = 'MM/DD/YYYY HH:mm';
  let experimentBackup = {};

/*
BasicTree: ok
ApiTree: no delete icon
JsonTreeView: must have root key
use tree to show datetime only and put details into a separate panel
json tree can show details in tree without a separate panel
which one is better?
*/

  // drawer data initialization
  const [registerDrawer, { setDrawerProps }] = useDrawerInner(async (data) => {
    // remove old data of info form
    if (infoFormRef.value) {
      infoFormRef.value.resetFields();
    }
    if (dataFormRef.value) {
      dataFormRef.value.resetFields();
    }
    if (algoFormRef.value) {
      algoFormRef.value.resetFields();
    }
    if (trainFormRef.value) {
      trainFormRef.value.resetFields();
    }

    setDrawerProps({ confirmLoading: false });

    if(data.id){
      // save received data
      rawData.value = data;
      algoParams.framework = data.framework;
      algoParams.category = data.category;

      // pass received data to info form
      if (infoFormRef.value) {
        infoFormRef.value.setFieldsValue(data);
      }
      if (algoFormRef.value){
        algoFormRef.value.setFieldsValue(data);
        if(data.algoName){
          selectedAlgo.value = [data.algoName];
        }
      }

      if (dataFormRef.value && data.dataCfg) {
        dataFormRef.value.setFieldsValue(data.dataCfg);
        if(data.dataCfg.datasetId){
          selectedDataset.value = [data.dataCfg.datasetId];
        }
      }

      if (trainFormRef.value && data.trainCfg) {
        await trainFormRef.value.setFieldsValue(data.trainCfg);
        if(data.trainCfg?.params){
          paramList.value = data.trainCfg.params;
        } else {
          data.trainCfg.params = paramList.value;
        }
        if(data.trainCfg?.metrics){
          metricList.value = data.trainCfg.metrics;
        } else {
          data.trainCfg.metrics = metricList.value;
        }
      }

      // get experiment list
      API_ML_EXPERIMENT_TRIALS(data.id).then((response) => {
        experimentBackup = {};
        let jsonObj = {};
        for(const key in response){
          // convert unix time to formatted local time
          const ts = dayjs(Number(key)).format(DATE_TIME_FORMAT);
          jsonObj[ts] = response[key]
          experimentBackup[ts] = cloneDeep(response[key]);
          delete response[key]['start_time']
          delete response[key]['run_uuid'];
      }
        experData.value = jsonObj;
      });

      drawerTitle.value = '[' + data.name + ']';
    } else {
      rawData.value = initAlgorithm;
      drawerTitle.value = t('common.form.new');
    }

    // subscribe the message (user x and alg y)
      // one user can run multiple algorithms at the same time
      // so one user must have multiple channels to receive separated logs

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
  * algo config change
  */
  const handleAlgoChange = (key: string, value: string) => {
    // as query parameter to get algo list
    if(key == 'framework'){
      // clearn category when frameowrk is changed
      algoParams[key] = value;
      algoParams['category'] = null;
    } else if (key == 'category'){
      algoParams[key] = value;
    }
  };

  /*
  * find pid after get dataset from backend
  */
  const afterFetchDataset = (data: any[]) =>{
    if(data?.records){
      if(selectedDataset.value[0]){
        const setPid = findPidInTree(data.records, 'id', selectedDataset.value[0], null);
        expandedDataset.value = [setPid];
      }
      return data.records;
    } else {
      return [];
    }
  };

  /*
  * find pid after get dataset from backend
  */
  const afterFetchTrials = (data: any[]) =>{
    if(data?.records){
      for(const row of data.records){
        row.start_time = dayjs(Number(row.start_time)).format(DATE_TIME_FORMAT);
      }
      return data.records;
    } else {
      return [];
    }
  };

  /*
  * cache algo tree after get it from backend
  */
  const afterFetchAlgos = (data: any[]) =>{
    if(data?.records){
      algoTree = data.records;
      if(selectedAlgo.value[0]){
        const setPid = findPidInTree(algoTree, 'name', selectedAlgo.value[0], null);
        expandedAlgo.value = [setPid];
      }
      return data.records;
    } else {
      return [];
    }
  };

  const findPidInTree = (node, field, value, pid) => {
    let nodePid = null;
    if(Array.isArray(node)){
      for(const nd of node){
        nodePid = findPidInTree(nd, field, value, nd[field]);
        if(nodePid){
          return nodePid;
        }
      }
    } else if (node.children && node.children.length>0){
      for(const cd of node.children){
        nodePid = findPidInTree(cd, field, value, node[field]);
        if(nodePid){
          return nodePid;
        }
      }
    } else if (node[field] == value){
      return pid;
    }
    return nodePid;
  };
  /*
  * algo name selection
  */
  const handleAlgoSelection = (name: string) => {
    let modelName = null;
    if(algoParams.framework == 'sklearn'){
      let tplCode = cloneDeep(algoTplSklearn);
      for(let node of algoTree){
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
      
      tplCode = tplCode.replaceAll('{MODULE}', modelName);
      tplCode = tplCode.replaceAll('{ALGORITHM}', name);

      // build arguments based on parameters
      let paramArray: string[] = [];
      if(rawData.value.trainCfg?.params){
        for(let item of rawData.value.trainCfg.params){
          if(item.name!='' && item.value!=''){
            paramArray.push(`${item.name}=config['${item.name}']`);
          }
        }
      }
      let paramArgStr = paramArray.join();
      tplCode = tplCode.replaceAll('{PARAMS}', paramArgStr);

      // build eval metrics
      let metricArray: string[] = [];
      let funcArray: string[] = [];
      if(rawData.value.trainCfg?.metrics){
        for(let item of rawData.value.trainCfg.metrics){
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
      tplCode = tplCode.replaceAll('{METRIC_GET}', funcStr);

      let metricStr = metricArray.join();
      if(metricStr!=''){
        metricStr = `ray.train.report({${metricStr}})`;
      }      
      tplCode = tplCode.replaceAll('{METRICS_RPT}', metricStr);

      rawData.value.srcCode = tplCode;
    }
  };

  /*
  * dataset selection
  */
  const handleDatasetSelection = (key: any[], value: any) => {
    // key is dataset id
    rawData.value.dataCfg.datasetId = key[0];
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
    rightPanelSize.value = 5;
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

  // show experiment status
  function experIcons(node: any) {
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

  // show delete icon in experiment tree
  const experActions: TreeActionItem[] = [
    {
      render: (node) => {
        return h(DeleteOutlined, {
          class: 'ml-2',
          onClick: () => {
            const idx = experData.value.findIndex((v) => {
              // find item
              return v.id == node.id;
            });
            // remove item
            experData.value.splice(idx, 1);
            // delete experiment from db
            API_ML_EXPERIMENT_DEL_TRIAL(idx).then((response) => {
              const aaa = 666;
            });
          },
        });
      },
    },
  ];

  /*
   * experiment option change
   */
   const handleExperChange = (key: string, value: string) => {
    experParam.value.succOnly = value;
    // get experiment list
    API_ML_EXPERIMENT_TRIALS(experParam.value).then((response) => {
      experData.value = response.records;
    });
  };

  /*
   * Hisexperimenttory selection
   */
  const handleExperSelect = (key: any) => {
    activeTab.value = 'experiment';
  };


  /*
   * submit after data is updated
   */
  async function handleSubmit() {
    try {
      // validate form data
      const info = await infoFormRef.value.validate();
      const algo = await algoFormRef.value.validate();
      const data = await dataFormRef.value.validate();
      const train = await trainFormRef.value.validate();
      rawData.value.name = info.name;
      rawData.value.desc = info.desc;
      rawData.value.group = info.group;

      rawData.value.framework = algo.framework;
      rawData.value.category = algo.category;
      rawData.value.algoName = selectedAlgo.value[0];
    
      rawData.value.dataCfg.evalRatio = data.evalRatio;
      rawData.value.dataCfg.shuffle = data.shuffle==undefined?false:data.shuffle;

      rawData.value.trainCfg.gpu = train.gpu==undefined?false:train.gpu;
      rawData.value.trainCfg.strategy = train.strategy;
      rawData.value.trainCfg.trials = train.trials;
      rawData.value.trainCfg.epochs = train.epochs;
      rawData.value.trainCfg.timeout = train.timeout;
      delete rawData.value.trainCfg.searchAlgo;

      rawData.value.trainCfg['params'] = [];
      if(paramList.value.length>0){
        for(var item of paramList.value){
          if(item.name && item.name.length>0 && item.value && item.value.length>0){
            rawData.value.trainCfg.params.push(item);
          }
        }
      }
      if(rawData.value.trainCfg.params == []){
        delete rawData.value.trainCfg.params;
      }

      rawData.value.trainCfg['metrics'] = [];
      if(metricList.value.length>0){
        for(var item of metricList.value){
          if(item.name && item.name.length>0 && item.value && item.value.length>0){
            rawData.value.trainCfg.metrics.push(item);
          }
        }
      }
      if(rawData.value.trainCfg.metrics == []){
        delete rawData.value.trainCfg.metrics;
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
