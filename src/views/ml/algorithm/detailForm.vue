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
            <Tabs.TabPane key="development" :tab="t('ml.algorithm.tab.development')" :forceRender="true">
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
            <Tabs.TabPane key="experiment" :tab="t('ml.algorithm.tab.experiment')" :forceRender="true">
              <keep-alive></keep-alive>
              <Experiment :data="selExperItem"/>
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
                @fieldValueChange="handleAlgoFormChange"
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
                @fieldValueChange="handleTrainFormChange"
                >
                <template #score="{ model, field }">
                  <ApiSelect
                    :api="API_ML_ALGO_SCORES"
                    :params="algoParams"
                    :immediate="true"
                    v-model:value="model[field]"
                    @select="handleScoreSelection"
                  />
                </template>
                <template #params>
                  <BasicTable 
                    size="small"
                    :bordered="true"
                    :show-table-setting="false"
                    :columns="paramColumns"
                    :data-source="paramList"
                    :show-index-column="false"
                    :use-search-form="false"
                    :pagination="false"
                    :scroll="{ x: 100, y: 400 }"
                    @resizeColumn="(w, col) => {col.width = w;}"
                    @editEnd="handleParamEditEnd" 
                  >
                    <template #headerCell="{ column }">
                      <template v-if="column.key === 'name'">
                        {{ t('ml.algorithm.form.train.params.name') }}
                      </template>
                      <template v-else>
                        {{ t('ml.algorithm.form.train.params.value') }}
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
                  <BasicTree
                    :height="650"
                    :treeData="experData"
                    v-model:value="model[field]"
                    v-model:selectedKeys="selExperId"
                    :fieldNames="{ key: 'run_uuid' }"
                    :actionList="trialActions"
                    :renderIcon="trialIcons"
                    @select="handleExperimentSelect"
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
        <span>Train</span>
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
  import { formInfoSchema, formDataSchema, formAlgoSchema, formTrainSchema, formChartSchema, formExperSchema, algoTplSklearn, paramColumns } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { ApiTree, ApiSelect } from '/@/components/Form';
  import { BasicTree, TreeActionItem } from '/@/components/Tree';
  import Experiment from './experiment.vue';
  import dayjs from 'dayjs';
  import {
    PlaySquareTwoTone,
    SaveTwoTone,
    InfoCircleFilled,
    ExperimentOutlined,
    DeleteOutlined,
    FunctionOutlined,
    HistoryOutlined,
    HddOutlined,
    StarOutlined,
    PlayCircleOutlined
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
    Tabs
  } from 'ant-design-vue';
  import {
    API_ML_ALGO_CREATE,
    API_ML_ALGO_UPDATE,
    API_ML_ALGO_GROUPS,
    API_ML_ALGO_ALGOS,
    API_ML_ALGO_VERS,
    API_ML_ALGO_ARGS,
    API_ML_ALGO_SCORES,
    API_ML_ALGO_EXECUTE
  } from '/@/api/ml/algorithm';
  import {
    API_AI_MODEL_CREATE,
    API_AI_MODEL_REMOVE
  } from '../../../api/ai/model';
  import { API_ML_DATASET_TREE } from '/@/api/ml/dataset';
  import { ApiAlgorithmDataType, initAlgorithm } from '/@/api/ml/model/algorithm';
  import { API_ML_EXPERIMENT_TRIALS, API_ML_EXPERIMENT_DEL_EXPER, API_ML_EXPERIMENT_REG_TRIAL, API_ML_EXPERIMENT_UNREG_TRIAL, API_ML_EXPERIMENT_PUBLISH_TRIAL, API_ML_EXPERIMENT_UNPUBLISH_TRIAL } from '/@/api/ml/experiment';
  import { cloneDeep } from 'lodash-es';
  import { BasicTable } from '/@/components/Table';
  import { emitter } from '/@/utils/event';

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
  const experParam = ref<any>({id: 17});
  const experData = ref<any[]>([]);
  const selExperItem = ref<[]>([]);
  const selExperId = ref<number[]>([]);
  const algoParams = reactive<any>({framework: 'sklearn', category: 'clf'});
  const selectedAlgo = ref<string[]>([]);
  const expandedAlgo = ref<string[]>([]);
  const selectedDataset = ref<number[]>([]);
  const expandedDataset = ref<number[]>([]);
  let algoTree = [];
  const paramList = ref<any[]>([]);
  const DATE_TIME_FORMAT = 'MM/DD/YYYY HH:mm';
  let frameVers = {};

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
      }

      if(data.algoName){
        // get arguments of the algo
        const arg_params = {...unref(algoParams), algo: data.algoName}
        API_ML_ALGO_ARGS(arg_params).then((response) => {
            paramList.value = response.records;
            if(data.trainCfg?.params){
              for(const p in data.trainCfg.params){
                const pIdx = paramList.value.findIndex((el)=>el.name == p);
                if(pIdx >= 0){
                  paramList.value[pIdx]['value'] = data.trainCfg.params[p];
                }
              }
            }
        });
      }
      
      // get experiment list
      experParam.value.id = data.id;
      selExperId.value = [];
      API_ML_EXPERIMENT_TRIALS({id: data.id}).then((response) => {
        experData.value = afterFetchExperiment(response);
      });

      drawerTitle.value = '[' + data.name + ']';
    } else {
      rawData.value = cloneDeep(initAlgorithm);
      drawerTitle.value = t('common.form.new');
    }


    // get framework versions
    API_ML_ALGO_VERS().then((response) => {
        frameVers = response;
    });
  });

  /*
   * add parameter
   */
   function handleParamAdd() {
    // add an empty parameter to table
    if (paramList.value) {
      paramList.value.push({name: '', value: ''});
    }
  }

  /*
   * update parameter
   */
   function handleParamEditEnd({ index, key, value }: Recordable) {
    rawData.value.trainCfg.params[paramList.value[index]['name']] = value.trim();
    // build source code based on updated parameters
    buildSrcCode();
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
  * algo form config change
  */
  const handleAlgoFormChange = (key: string, value: string) => {
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
  * train form config change
  */
  const handleTrainFormChange = (key: string, value: string) => {
    // as query parameter to get algo list
    if(key == 'epochs'){
      rawData.value.trainCfg[key] = value;
      // build source code based on selected socre
      buildSrcCode();
    }
  };

    /*
  * train score change
  */
  const handleScoreSelection = (key: string) => {
    rawData.value.trainCfg.score = key;
    // build source code based on selected socre
    buildSrcCode();
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
  const afterFetchExperiment = (data: any[]) =>{
    let recordTree = [];

    if(data?.records){
      const groupByExper = Object.groupBy(data.records, item => {
        return item.exper_id;
      });

      for(const experId in groupByExper){
        // sort trials from old to new
        let experArray = groupByExper[experId]?.sort((a:any,b:any)=>Number(a.ts)-Number(b.ts));
        const minTs = Number(experArray[0].ts);
        // set minimal ts as experiment title
        let nodeExper = {title: dayjs(minTs).format(DATE_TIME_FORMAT), run_uuid: 'Exper-' + experId, ts: minTs, experId: experId, children: experArray, selectable: true};

        // build trials as tree nodes
        for(const [idx, trial] of experArray.entries()){
          trial.title = 'Trial-' + idx;
          trial.selectable = false;
          
          if(trial.metrics){
            // show metrics as children
            trial['children'] = [];
            for(const ele in trial.metrics){
              // put metrics into cildren
              trial.children.push({
                      title: ele + ': ' + trial.metrics[ele], 
                      run_uuid: 100*idx+trial.children.length, 
                      selectable: false
                    });
            }
          }
        }
        recordTree.push(nodeExper);
      }
      
      // sort experiment from new to old
      return recordTree.sort((a:any,b:any)=>Number(b.ts)-Number(a.ts));
    } else {
      return [];
    }
  };

  /*
  * cache algo tree after get it from backend
  */
  const afterFetchAlgos = (data: any) =>{
    algoTree = data;
    const algoTreeList: any[] = [];
    if(data){
      // build algo tree
      for(const pname in data){
        if(data[pname].length>0){
          const node: any = {key: pname, title: pname, value: pname, selectable: false, children: []};
          for(const cname of data[pname]){
            node.children.push({key: cname, title: cname, value: cname});
          }
          algoTreeList.push(node);
          if(selectedAlgo.value[0]){
            if(data[pname].indexOf(selectedAlgo.value[0]) >= 0){
              expandedAlgo.value = [pname];
            }
          }
        }
      } 
    }
    return algoTreeList;
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
  const handleAlgoSelection = (names: string[]) => {
    if(names.length==0){
      return;
    }
    // clean up parameters
    rawData.value.trainCfg['params'] = {};

    // build source code without parameters
    buildSrcCode();

    // get arguments of the algo
    const arg_params = {...unref(algoParams), algo: names[0]}
    API_ML_ALGO_ARGS(arg_params).then((response) => {
        paramList.value = response.records;
    });
  };

  const buildSrcCode = () =>{
    const algoName = selectedAlgo.value[0]
    let modelName = null;
    if(algoParams.framework == 'sklearn'){
      let tplCode = cloneDeep(algoTplSklearn);
      for(let node in algoTree){
        if(algoTree[node].indexOf(algoName)>=0){
          modelName = node;
          break;
        }
      }
      
      tplCode = tplCode.replaceAll('{PYTHON_VER}', frameVers['python']);
      tplCode = tplCode.replaceAll('{SKLEARN_VER}', frameVers['sklearn']);
      tplCode = tplCode.replaceAll('{MODULE}', modelName);
      tplCode = tplCode.replaceAll('{ALGORITHM}', algoName);

      // build arguments based on parameters
      let paramArray: string[] = [];
      if(rawData.value.trainCfg?.params){
        for(let item in rawData.value.trainCfg.params){
          const pValue = rawData.value.trainCfg.params[item];
          if(pValue.trim() != ''){
            paramArray.push(`${item}=config['${item}']`);
          }
        }
      }
      let paramArgStr = paramArray.join();
      tplCode = tplCode.replaceAll('{PARAMS}', paramArgStr);

      if(rawData.value.trainCfg?.epochs){
        tplCode = tplCode.replaceAll('{EPOCHS}', rawData.value.trainCfg?.epochs);
      } else {
        tplCode = tplCode.replaceAll('{EPOCHS}', '1');
      }
      

      if(rawData.value.trainCfg?.score){
        const mScore = rawData.value.trainCfg?.score;
        if(mScore == 'silhouette_score' || mScore == 'calinski_harabasz_score'){
          // the two scores are not available for metrics.get_scorer()
          // the two scores don't need target values(y)
          tplCode = tplCode.replaceAll("get_scorer('{SCORE_NAME}')", mScore);
          tplCode = tplCode.replaceAll("estimator, data['x'], data['y']", "data['x'], estimator.labels_");
        } 
        tplCode = tplCode.replaceAll('{SCORE_NAME}', mScore);
      }
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
      emitter.emit('INFO', `${rawData.value.algoName}: training is scheduled!`);
    });
  };

  // show experiment status
  function trialIcons(node: any) {
    if (node.status == 'FINISHED' && node.version>0) {
      if(node.published){
        return 'ant-design:play-circle-filled';
      } else {
        return 'ant-design:star-filled';
      }
    } else if (node.status == 'FAILED') {
      return 'ant-design:close-circle-outlined';
    } else if (node.status == 'RUNNING') {
      return 'ant-design:warning-outlined';
    } else {
      return null;
    }
  }

  // show action icon in experiment tree(delete, register)
  const trialActions: TreeActionItem[] = [
    {
      render: (node) => {
        if(node?.selectable){
          // delete an experiment
          return h(DeleteOutlined, {
            style: {padding: '3px'}, 
            onClick: () => { handleExperDelete(node); },
          });
        } else if(node?.status == 'FINISHED'){
          return h('span', null, 
          [
            // register/unregister a trial
            h(StarOutlined, {
              style: {color: 'orange', padding: '3px'},
              onClick: () => { handleModelRegister(node); }
            }), 
            // disable this for now
            // deploy/undeploy a trial
            //h(PlayCircleOutlined, { 
            //  style: {color: 'green', padding: '3px'}, 
            //  onClick: () => { handleModelPublish(node); }
            //})
          ]);
        }
      },
    },
  ];


  /*
   * delete a experiment
   */
  const handleExperDelete = (node) => {
    const idx = experData.value.findIndex((v) => {
      // find item
      return v.experId == node.exper_id;
    });

    // delete experiment from db
    API_ML_EXPERIMENT_DEL_EXPER(node.exper_id).then((response) => {
      // remove item
      experData.value.splice(idx, 1);
    });
  };


  /*
   * register model
   */
  const handleModelRegister = (node) => {
    // experiment idx
    const eIdx = experData.value.findIndex((v) => {
      // find experiment
      return v.experId == node.exper_id;
    });

    // trial idx
    const tIdx = experData.value[eIdx].children.findIndex((v) => {
      // find trial
      return v.run_uuid == node.run_uuid;
    });

    let regTrial = experData.value[eIdx].children[tIdx];

    if(node.version==null || Number(node.version) == 0){
      // register trial in mlflow
      API_ML_EXPERIMENT_REG_TRIAL(node.run_uuid, rawData.value.algoName, rawData.value.id).then((response) => {
        regTrial['version'] = response.version;
        // create a record for AI store, so you can see it in AI store
        const mdInfo = {name:rawData.value.name, algoId: rawData.value.id, area: 'data', runId: node.run_uuid, version: response.version};
        API_AI_MODEL_CREATE(mdInfo).then((rsp) => {
          // do nothing when create successfully        
        });
      });
    } else {
      // un-register trial
      API_AI_MODEL_REMOVE(rawData.value.id, node.version).then((rsp) => {
        API_ML_EXPERIMENT_UNREG_TRIAL(rawData.value.id, node.version).then((response) => { 
          regTrial['version'] = 0;
        }); 
      });  
    }
  };


  /*
   * publish model to AI Model Store
   */
   const handleModelPublish = (node) => {
    // experiment idx
    const eIdx = experData.value.findIndex((v) => {
      // find experiment
      return v.experId == node.exper_id;
    });

    // trial idx
    const tIdx = experData.value[eIdx].children.findIndex((v) => {
      // find trial
      return v.run_uuid == node.run_uuid;
    });

    let selectedTrial = experData.value[eIdx].children[tIdx];

    if(node.published){
      // un-publish trial
      API_ML_EXPERIMENT_UNPUBLISH_TRIAL(rawData.value.id, node.version).then((response) => {
        selectedTrial['published'] = false;
      });
    } else {
      // publish trial
      API_ML_EXPERIMENT_PUBLISH_TRIAL(node.run_uuid, rawData.value.algoName, rawData.value.id).then((response) => {
        selectedTrial['version'] = response.version;
        selectedTrial['published'] = response.published;
      });
    }
  };



  /*
   * experiment option change
   */
   const handleExperChange = (key: string, value: string) => {
    experParam.value.succOnly = value;
  };

  /*
   * Experiment selection
   */
   const handleExperimentSelect = (key: any) => {
    if(Array.isArray(key) && key.length>0){
      activeTab.value = 'experiment';
      // key is run_uuid
      const selExper = experData.value.find((ele)=>ele.run_uuid == key);
      // trials
      selExperItem.value = selExper.children;
    }
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
      rawData.value.frameVer = frameVers[algo.framework];
      rawData.value.category = algo.category;
      rawData.value.algoName = selectedAlgo.value[0];
    
      rawData.value.dataCfg.evalRatio = data.evalRatio;
      rawData.value.dataCfg.shuffle = data.shuffle==undefined?false:data.shuffle;

      rawData.value.trainCfg.gpu = train.gpu==undefined?false:train.gpu;
      rawData.value.trainCfg.strategy = train.strategy;
      rawData.value.trainCfg.trials = train.trials;
      rawData.value.trainCfg.epochs = train.epochs;
      rawData.value.trainCfg.timeout = train.timeout;
      rawData.value.trainCfg.score = train.score;
      rawData.value.trainCfg.threshold = train.threshold;

      if(rawData.value.trainCfg.params == {}){
        delete rawData.value.trainCfg.params;
      } else {
        // check if all parameter are valid array or json
        const tmp = cloneDeep(unref(rawData.value.trainCfg.params));
        for(const it in tmp){
          if(tmp[it].trim()==''){
            delete rawData.value.trainCfg.params[it];
          } else if(tmp[it].trim().startsWith('[')){
            try{
              // it is valid json or array if it can be parsed
              const vls = JSON.parse(tmp[it]);
            } catch (error) {
              // correct invalid parameter
              const newIt = tmp[it].replaceAll('[', '').replaceAll(']', '').replaceAll('\'', '').replaceAll('"', '').replaceAll(' ', '');
              const newList = newIt.split(',');
              const newStr = JSON.stringify(newList)
              // update param
              rawData.value.trainCfg.params[it] = newStr;
            }
          }
        }
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


  .node-del {
    color: red;
  }

  .node-reg {
    color: red;
  }

</style>
