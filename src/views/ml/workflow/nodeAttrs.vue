<template>
  <div>
    <Avatar :src="'/resource/img/ml/'+nodeData.type+'.png'" shape="square" style="width: 32px" />
    <span style="margin-left: 5px;">{{ nodeData.title }}</span>
    <Divider />
    <BasicForm v-if="kind == 'dataset'" @register="regSourceDatasetForm" @fieldValueChange="handleSourceDatasetChange">
      <template #dataset="{ model, field }">
        <ApiTree
          :api="API_ML_DATASET_TREE"
          :params="pubSource"
          :immediate="true"
          :checkable="false"
          v-model:value="model[field]"
          style="width: 100%, overflowY: 'scroll'"
          resultField="records"
          :fieldNames="{ key: 'id', title: 'name' }"
          @select="handleSourceDatasetChange"
        />
      </template>
    </BasicForm>
    <BasicForm v-else-if="kind == 'clean'" @register="regProcCleanForm" @fieldValueChange="handleProcCleanChange"/>
    <BasicForm v-else-if="kind == 'transform'" @register="regProcTransformForm" @fieldValueChange="handleProcTransformChange">
      <template #trans="{ model, field }">
        <fieldset class="filesets">
          <BasicTree
            v-model:value="model[field]"
            :fieldNames="{ key: 'sf' }"
            :treeData="procTransList"
            :actionList="transActions"
            @select="handleSelectTrans"
          >
          </BasicTree>
        </fieldset>
      </template>
    </BasicForm>
    <BasicForm v-else-if="kind == 'encode'" @register="regProcEncodeForm" @fieldValueChange="handleProcEncodeChange">
      <template #encode="{ model, field }">
        <fieldset class="filesets">
          <BasicTree
            v-model:value="model[field]"
            :fieldNames="{ key: 'sf' }"
            :treeData="procEncodeList"
            :actionList="encodeActions"
            @select="handleSelectEncode"
          >
          </BasicTree>
        </fieldset>
      </template>
    </BasicForm>
    <BasicForm v-else-if="kind == 'scale'" @register="regProcScaleForm" @fieldValueChange="handleProcScaleChange">
      <template #scale="{ model, field }">
        <fieldset class="filesets">
          <BasicTree
            v-model:value="model[field]"
            :fieldNames="{ key: 'sf' }"
            :treeData="procScaleList"
            :actionList="scaleActions"
            @select="handleSelectScale"
          >
          </BasicTree>
        </fieldset>
      </template>
    </BasicForm>
    <BasicForm v-else-if="kind == 'extract' && feExtractMethod == 'pycaret'" @register="regFeExPycaretForm" @fieldValueChange="handleFeExtractChange"/>
    <BasicForm v-else-if="kind == 'extract' && feExtractMethod == 'dfs'" @register="regFeExDfsForm" @fieldValueChange="handleFeExtractChange"/>
    <BasicForm v-else-if="kind == 'extract' && feExtractMethod == 'openfe'" @register="regFeExFeForm" @fieldValueChange="handleFeExtractChange"/>
    <BasicForm v-else-if="kind == 'extract' && feExtractMethod == 'tsfresh'" @register="regFeExTsForm" @fieldValueChange="handleFeExtractChange"/>
    <BasicForm v-else-if="kind == 'select' && feSelectMethod == 'pycaret'" @register="regFeSelCaretForm" @fieldValueChange="handleFeSelectChange"/>
    <BasicForm v-else-if="kind == 'select' && feSelectMethod == 'rfe'" @register="regFeSelRfeForm" @fieldValueChange="handleFeSelectChange"/>
    <BasicForm v-else-if="kind == 'select' && feSelectMethod == 'permute'" @register="regFeSelPermuteForm" @fieldValueChange="handleFeSelectChange"/>
    <BasicForm v-else-if="kind == 'select' && feSelectMethod == 'boruta'" @register="regFeSelBorutaForm" @fieldValueChange="handleFeSelectChange"/>
    <BasicForm v-else-if="kind == 'select' && feSelectMethod == 'feengine'" @register="regFeSelEngineForm" @fieldValueChange="handleFeSelectChange"/>
    <BasicForm v-else-if="kind == 'reduce'" @register="regFeReduceForm" @fieldValueChange="handleFeReduceChange"/>
    <BasicForm v-else-if="kind == 'clf' && mlClfMethod == 'pycaret'" @register="regMlClfCaretForm" @fieldValueChange="handleMlClfChange"/>
    <BasicForm v-else-if="kind == 'clf' && mlClfMethod == 'tpot'" @register="regMlClfTpotForm" @fieldValueChange="handleMlClfChange"/>
    <BasicForm v-else-if="kind == 'clf' && mlClfMethod == 'h2o'" @register="regMlClfH2oForm" @fieldValueChange="handleMlClfChange"/>
    <BasicForm v-else-if="kind == 'clf' && mlClfMethod == 'autogluon'" @register="regMlClfGluonForm" @fieldValueChange="handleMlClfChange"/>
    <BasicForm v-else-if="kind == 'clf' && mlClfMethod == 'autots'" @register="regMlClfTsForm" @fieldValueChange="handleMlClfChange"/>
    <BasicForm v-else-if="kind == 'reg' && mlRegMethod == 'pycaret'" @register="regMlRegCaretForm" @fieldValueChange="handleMlRegChange"/>
    <BasicForm v-else-if="kind == 'reg' && mlRegMethod == 'tpot'" @register="regMlRegTpotForm" @fieldValueChange="handleMlRegChange"/>
    <BasicForm v-else-if="kind == 'reg' && mlRegMethod == 'h2o'" @register="regMlRegH2oForm" @fieldValueChange="handleMlRegChange"/>
    <BasicForm v-else-if="kind == 'reg' && mlRegMethod == 'autogluon'" @register="regMlRegGluonForm" @fieldValueChange="handleMlRegChange"/>
    <BasicForm v-else-if="kind == 'reg' && mlRegMethod == 'autots'" @register="regMlRegTsForm" @fieldValueChange="handleMlRegChange"/>
    <BasicForm v-else-if="kind == 'cluster' && mlClusterMethod == 'pycaret'" @register="regMlClusterCaretForm" @fieldValueChange="handleMlClusterChange"/>
    <BasicForm v-else-if="kind == 'cluster' && mlClusterMethod == 'tpot'" @register="regMlClusterTpotForm" @fieldValueChange="handleMlClusterChange"/>
    <BasicForm v-else-if="kind == 'cluster' && mlClusterMethod == 'h2o'" @register="regMlClusterH2oForm" @fieldValueChange="handleMlClusterChange"/>
    <BasicForm v-else-if="kind == 'cluster' && mlClusterMethod == 'autogluon'" @register="regMlClusterGluonForm" @fieldValueChange="handleMlClusterChange"/>
    <BasicForm v-else-if="kind == 'cluster' && mlClusterMethod == 'autots'" @register="regMlClusterTsForm" @fieldValueChange="handleMlClusterChange"/>
    <BasicForm v-else-if="kind == 'anomaly'" @register="regMlAnomalyForm" @fieldValueChange="handleMlAnomalyChange"/>
  </div>
</template>
<script lang="ts" setup name="NodeAttrs">
  import { Avatar, Divider } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { DeleteOutlined } from '@ant-design/icons-vue';
  import {
    formSourceDataset,
    formProcClean, formProcTransform, formProcEncode, formProcScale,
    procCleanDefault, formFeReduce, formMlAnomaly,
    formFeExtractCaret, formFeExtractDfs, formFeExtractOpenfe, formFeExtractTsfresh,
    feExtractDefault, feSelectDefault, feReduceDefault,
    mlClfDefault, mlRegDefault, mlClusterDefault,
    formFeSelectCaret, formFeSelectRfe, formFeSelectPermute, formFeSelectBoruta, formFeSelectEngine,
    formMlClfCaret, formMlClfTpot, formMlClfH2o, formMlClfGluon, formMlClfTs,
    formMlRegCaret, formMlRegTpot, formMlRegH2o, formMlRegGluon, formMlRegTs,
    formMlClusterCaret, formMlClusterTpot, formMlClusterH2o, formMlClusterGluon, formMlClusterTs
  } from './nodeData';
  import { reactive, ref, watch, computed, h, nextTick } from 'vue';
  import { API_ML_DATASET_TREE } from '/@/api/ml/dataset';
  import { ApiTree } from '/@/components/Form';
import { unref } from 'vue';

  // properties definition of attribute panel
  const props = defineProps({
    kind: {
      type: String,
      required: true
    },
    node: {
      required: true
    },
  });

  
  const { t } = useI18n();
  const emit = defineEmits(['change']);
  const pubSource = ref<Boolean>(false);
  let nodeData = reactive({type:'node', title: 'Node', text: '', data: undefined});
  const x6Node = computed(() => props.node);
  const procTransList = ref<TreeItem[]>([]);
  let procTransItem = {};
  const procEncodeList = ref<TreeItem[]>([]);
  let procEncodeItem = {};
  const procScaleList = ref<TreeItem[]>([]);
  let procScaleItem = {};
  const feExtractMethod = ref<string>('pycaret');
  const feSelectMethod = ref<string>('pycaret');
  const mlClfMethod = ref<string>('pycaret');
  const mlRegMethod = ref<string>('pycaret');
  const mlClusterMethod = ref<string>('pycaret');

  /*
   * watch input chagne (node) when node is selected
   */
  watch(()=>x6Node.value, (node) => {
    if(node){
      nodeData = node.getData();
      // initialize parameters of attr panel
      // the parameters are saved in node.data
      // put default value into node.data if node.data is undefined
      switch(nodeData.kind){
        case 'dataset':{
          if(nodeData.data){
            nextTick(() => { setDatasetFields({...nodeData.data}); });
          } else {
            nodeData.data = {};
          }
          break;
        }
        case 'clean':{
          if(nodeData.data){
            nextTick(() => { setCleanFields({...nodeData.data}); });
          } else {
            nodeData.data = procCleanDefault;
            const defaultKey = 'ml.workflow.form.proc.clean.miss.' + procCleanDefault.miss;
            x6Node.value.setData({text: 'Miss: ' + t(defaultKey)});
          }
          break;
        }
        case 'transform':{
          if(nodeData.data){
            nextTick(() => { setTransFields({...nodeData.data}); });
          } else {
            nodeData.data = {};
          }
          break;
        }
        case 'encode':{
          if(nodeData.data){
            nextTick(() => { setEncodeFields({...nodeData.data}); });
          } else {
            nodeData.data = {};
          }
          break;
        }
        case 'scale':{
          if(nodeData.data){
            nextTick(() => { setScaleFields({...nodeData.data}); });
          } else {
            nodeData.data = {};
          }
          break;
        }
        case 'extract':{
          if(nodeData.data){
            nextTick(() => {
              if(feExtractMethod.value == 'pycaret'){
                setFeExCaretFields({...nodeData.data});
              } else if(feExtractMethod.value == 'dfs'){
                setFeExDfsFields({...nodeData.data});
              } else if(feExtractMethod.value == 'openfe'){
                setFeExFeFields({...nodeData.data});
              } else if(feExtractMethod.value == 'tsfresh'){
                setFeExTsFields({...nodeData.data});
              }
            });
          } else {
            nodeData.data = feExtractDefault[feExtractMethod.value];
            const defaultKey = 'ml.workflow.form.fe.extract.method.' + feExtractMethod.value;
            x6Node.value.setData({text: t(defaultKey)});
          }
          break;
        }
        case 'select':{
          if(nodeData.data){
            nextTick(() => {
              if(feSelectMethod.value == 'pycaret'){
                setFeSelCaretFields({...nodeData.data});
              } else if(feSelectMethod.value == 'rfe'){
                setFeSelRfeFields({...nodeData.data});
              } else if(feSelectMethod.value == 'permute'){
                setFeSelPermuteFields({...nodeData.data});
              } else if(feSelectMethod.value == 'boruta'){
                setFeSelBorutaFields({...nodeData.data});
              } else if(feSelectMethod.value == 'feengine'){
                setFeSelEngineFields({...nodeData.data});
              } 
            });
          } else {
            nodeData.data = feSelectDefault[feSelectMethod.value];
            const defaultKey = 'ml.workflow.form.fe.select.method.' + feSelectMethod.value;
            x6Node.value.setData({text: t(defaultKey)});
          }
          break;
        }
        case 'reduce':{
          if(nodeData.data){
            nextTick(() => { setFeReduceFields({...nodeData.data}); });
          } else {
            nodeData.data = feReduceDefault;
            const defaultKey = 'ml.workflow.form.fe.reduce.method.' + feReduceDefault.method;
            x6Node.value.setData({text: t(defaultKey)});
          }
          break;
        }
        case 'clf':{
          if(nodeData.data){
            nextTick(() => {
              if(mlClfMethod.value == 'pycaret'){
                setMlClfCaretFields({...nodeData.data});
              } else if(mlClfMethod.value == 'tpot'){
                setMlClfTpotFields({...nodeData.data});
              } else if(mlClfMethod.value == 'h2o'){
                setMlClfH2oFields({...nodeData.data});
              } else if(mlClfMethod.value == 'autogluon'){
                setMlClfGluonFields({...nodeData.data});
              } else if(mlClfMethod.value == 'autots'){
                setMlClfTsFields({...nodeData.data});
              } 
            });
          } else {
            nodeData.data = mlClfDefault[mlClfMethod.value];
            const defaultKey = 'ml.workflow.form.ml.method.' + mlClfMethod.value;
            x6Node.value.setData({text: t(defaultKey)});
          }
          break;
        }
        case 'reg':{
          if(nodeData.data){
            nextTick(() => {
              if(mlClfMethod.value == 'pycaret'){
                setMlRegCaretFields({...nodeData.data});
              } else if(mlRegMethod.value == 'tpot'){
                setMlRegTpotFields({...nodeData.data});
              } else if(mlRegMethod.value == 'h2o'){
                setMlRegH2oFields({...nodeData.data});
              } else if(mlRegMethod.value == 'autogluon'){
                setMlRegGluonFields({...nodeData.data});
              } else if(mlRegMethod.value == 'autots'){
                setMlRegTsFields({...nodeData.data});
              } 
            });
          } else {
            nodeData.data = mlRegDefault[mlRegMethod.value];
            const defaultKey = 'ml.workflow.form.ml.method.' + mlRegMethod.value;
            x6Node.value.setData({text: t(defaultKey)});
          }
          break;
        }
        case 'cluster':{
          if(nodeData.data){
            nextTick(() => {
              if(mlClusterMethod.value == 'pycaret'){
                setMlClusterCaretFields({...nodeData.data});
              } else if(mlClusterMethod.value == 'tpot'){
                setMlClusterTpotFields({...nodeData.data});
              } else if(mlClusterMethod.value == 'h2o'){
                setMlClusterH2oFields({...nodeData.data});
              } else if(mlClusterMethod.value == 'autogluon'){
                setMlClusterGluonFields({...nodeData.data});
              } else if(mlClusterMethod.value == 'autots'){
                setMlClusterTsFields({...nodeData.data});
              } 
            });
          } else {
            nodeData.data = mlClusterDefault[mlClusterMethod.value];
            const defaultKey = 'ml.workflow.form.ml.method.' + mlClusterMethod.value;
            x6Node.value.setData({text: t(defaultKey)});
          }
          break;
        }
      }
    }
  },{immediate: true, deep: true});

  // Source/Dataset definition
  const [
    regSourceDatasetForm,
    {setFieldsValue: setDatasetFields, resetFields: resetDatasetFields, validate: valDatsetFields},
  ] = useForm({
    labelWidth: 200,
    baseColProps: { span: 24 },
    schemas: formSourceDataset,
    showActionButtonGroup: false,
    submitOnChange: false,
  });

  // Pre Processing/Clean definition
  const [
    regProcCleanForm,
    { setFieldsValue: setCleanFields, resetFields: resetCleanFields, validate: valCleanFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formProcClean,
    showActionButtonGroup: false
  });

  // Pre Processing/Transform definition
  const [
    regProcTransformForm,
    { setFieldsValue: setTransFields, resetFields: resetTransFields, validate: valTransFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formProcTransform,
    showActionButtonGroup: true,
    showResetButton: false,
    submitButtonOptions: {text: 'Add'},
    submitOnChange: false,
    submitFunc: handleAddTrans
  });

  // Pre Processing/Encode definition
  const [
    regProcEncodeForm,
    { setFieldsValue: setEncodeFields, resetFields: resetEncodeFields, validate: valEncodeFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formProcEncode,
    showActionButtonGroup: true,
    showResetButton: false,
    submitButtonOptions: {text: 'Add'},
    submitOnChange: false,
    submitFunc: handleAddEncode
  });

  // Pre Processing/Scale definition
  const [
    regProcScaleForm,
    { setFieldsValue: setScaleFields, resetFields: resetScaleFields, validate: valScaleFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formProcScale,
    showActionButtonGroup: true,
    showResetButton: false,
    submitButtonOptions: {text: 'Add'},
    submitOnChange: false,
    submitFunc: handleAddScale
  });

  // feature/Extraction pyCaret definition
  const [
    regFeExPycaretForm,
    { setFieldsValue: setFeExCaretFields, resetFields: resetFeExCaretFields, validate: valFeExCaretFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formFeExtractCaret,
    showActionButtonGroup: false
  });

    // feature/Extraction Dfs definition
    const [
    regFeExDfsForm,
    { setFieldsValue: setFeExDfsFields, resetFields: resetFeExDfsFields, validate: valFeExDfsFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formFeExtractDfs,
    showActionButtonGroup: false
  });

      // feature/Extraction Openfe definition
      const [
    regFeExFeForm,
    { setFieldsValue: setFeExFeFields, resetFields: resetFeExFeFields, validate: valFeExFeFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formFeExtractOpenfe,
    showActionButtonGroup: false
  });

      // feature/Extraction tsFresh definition
      const [
    regFeExTsForm,
    { setFieldsValue: setFeExTsFields, resetFields: resetFeExTsFields, validate: valFeExTsFields }
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formFeExtractTsfresh,
    showActionButtonGroup: false
  });

  // feature/Selection pyCaret definition
  const [
    regFeSelCaretForm,
    { setFieldsValue: setFeSelCaretFields, resetFields: resetFeSelCaretFields, validate: valFeSelCaretFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formFeSelectCaret,
    showActionButtonGroup: false
  });

    // feature/Selection Rfe definition
    const [
    regFeSelRfeForm,
    { setFieldsValue: setFeSelRfeFields, resetFields: resetFeSelRfeFields, validate: valFeSelRfeFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formFeSelectRfe,
    showActionButtonGroup: false
  });

    // feature/Selection Permute definition
    const [
    regFeSelPermuteForm,
    { setFieldsValue: setFeSelPermuteFields, resetFields: resetFeSelPermuteFields, validate: valFeSelPermuteFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formFeSelectPermute,
    showActionButtonGroup: false
  });

    // feature/Selection Boruta definition
    const [
    regFeSelBorutaForm,
    { setFieldsValue: setFeSelBorutaFields, resetFields: resetFeSelBorutaFields, validate: valFeSelBorutaFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formFeSelectBoruta,
    showActionButtonGroup: false
  });

    // feature/Selection FeEngine definition
    const [
    regFeSelEngineForm,
    { setFieldsValue: setFeSelEngineFields, resetFields: resetFeSelEngineFields, validate: valFeSelEngineFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formFeSelectEngine,
    showActionButtonGroup: false
  });

  // feature/Reduction definition
  const [
    regFeReduceForm,
    { setFieldsValue: setFeReduceFields, resetFields: resetFeReduceFields, validate: valFeReduceFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formFeReduce,
    showActionButtonGroup: false
  });

  // ML/Classfication pyCaret definition
  const [
    regMlClfCaretForm,
    { setFieldsValue: setMlClfCaretFields, resetFields: resetMlClfCaretFields, validate: valMlClfCaretFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formMlClfCaret,
    showActionButtonGroup: false
  });

  // ML/Classfication TPOT definition
  const [
    regMlClfTpotForm,
    { setFieldsValue: setMlClfTpotFields, resetFields: resetMlClfTpotFields, validate: valMlClfTpotFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formMlClfTpot,
    showActionButtonGroup: false
  });

    // ML/Classfication H2o definition
    const [
    regMlClfH2oForm,
    { setFieldsValue: setMlClfH2oFields, resetFields: resetMlClfH2oFields, validate: valMlClfH2oFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formMlClfH2o,
    showActionButtonGroup: false
  });

    // ML/Classfication autoGluon definition
    const [
    regMlClfGluonForm,
    { setFieldsValue: setMlClfGluonFields, resetFields: resetMlClfGluonFields, validate: valMlClfGluonFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formMlClfGluon,
    showActionButtonGroup: false
  });

    // ML/Classfication autoTs definition
    const [
    regMlClfTsForm,
    { setFieldsValue: setMlClfTsFields, resetFields: resetMlClfTsFields, validate: valMlClfTsFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formMlClfTs,
    showActionButtonGroup: false
  });

   // Ml/Regression pyCaret definition
  const [
    regMlRegCaretForm,
    {setFieldsValue: setMlRegCaretFields, resetFields: resetMlRegCaretFields, validate: valMlRegCaretFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formMlRegCaret,
    showActionButtonGroup: false
  });

  // Ml/Regression TPOT definition
  const [
    regMlRegTpotForm,
    {setFieldsValue: setMlRegTpotFields, resetFields: resetMlRegTpotFields, validate: valMlRegTpotFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formMlRegTpot,
    showActionButtonGroup: false
  });


  // Ml/Regression H2o definition
  const [
    regMlRegH2oForm,
    {setFieldsValue: setMlRegH2oFields, resetFields: resetMlRegH2oFields, validate: valMlRegH2oFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formMlRegH2o,
    showActionButtonGroup: false
  });


  // Ml/Regression autoGluon definition
  const [
    regMlRegGluonForm,
    {setFieldsValue: setMlRegGluonFields, resetFields: resetMlRegGluonFields, validate: valMlRegGluonFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formMlRegGluon,
    showActionButtonGroup: false
  });


  // Ml/Regression autoTs definition
  const [
    regMlRegTsForm,
    {setFieldsValue: setMlRegTsFields, resetFields: resetMlRegTsFields, validate: valMlRegTsFields },
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formMlRegTs,
    showActionButtonGroup: false
  });

  // Ml/Clustering pyCaret definition
  const [
    regMlClusterCaretForm,
    {setFieldsValue: setMlClusterCaretFields, resetFields: resetMlClusterCaretFields, validate: valMlClusterCaretFields},
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formMlClusterCaret,
    showActionButtonGroup: false
  });

   // Ml/Clustering TPOT definition
   const [
    regMlClusterTpotForm,
    {setFieldsValue: setMlClusterTpotFields, resetFields: resetMlClusterTpotFields, validate: valMlClusterTpotFields},
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formMlClusterTpot,
    showActionButtonGroup: false
  });

   // Ml/Clustering H2o definition
   const [
    regMlClusterH2oForm,
    {setFieldsValue: setMlClusterH2oFields, resetFields: resetMlClusterH2oFields, validate: valMlClusterH2oFields},
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formMlClusterH2o,
    showActionButtonGroup: false
  });

   // Ml/Clustering autoGluon definition
   const [
    regMlClusterGluonForm,
    {setFieldsValue: setMlClusterGluonFields, resetFields: resetMlClusterGluonFields, validate: valMlClusterGluonFields},
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formMlClusterGluon,
    showActionButtonGroup: false
  });

   // Ml/Clustering autoTs definition
   const [
    regMlClusterTsForm,
    {setFieldsValue: setMlClusterTsFields, resetFields: resetMlClusterTsFields, validate: valMlClusterTsFields},
  ] = useForm({
    labelWidth: 200,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formMlClusterTs,
    showActionButtonGroup: false
  });


  // Algo/Dim reduction definition
  const [
    regMlAnomalyForm,
    { setFieldsValue: setAnomalyFields, resetFields: resetAnomalyFields, validate: valAnomalyFields },
  ] = useForm({
    labelWidth: 90,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formMlAnomaly,
    showActionButtonGroup: false
  });

  /*
   * attrs of Source/Dataset change
   * group change will not trigger this functiion
   */
  const handleSourceDatasetChange = (key: string, value: string) => {
    if(key == 'pub'){
      pubSource.value = value;
    } else if(Array.isArray(key) && key.length>0){
      //update node info when dataset is selected
      if(value.node?.parent){
        x6Node.value.setData({
          text: value.node.parent.node.name + '/' + value.node.name,
          data: {id: key[0]} // dataset id
        });
      } else {
        x6Node.value.setData({
          text: value.node.name,
          data: {id: key[0]} // dataset id
        });
      }
    }
  }

  /*
   * attrs of Process/Clean change
   */
  const handleProcCleanChange = (key: string, value: string) => {
    let attrs = nodeData.data;
    attrs[key] = value;
    if(key == 'miss'){
      // update node text
      const tkey = 'ml.workflow.form.proc.clean.miss.' + value;
      x6Node.value.setData({text: 'Miss: ' + t(tkey)});
    }
    // save atrributes to node
    x6Node.value.setData({data: attrs});
  }

  /*
   * attrs of Process/Transform change
   */
   const handleProcTransformChange = (key: string, value: string) => {
    procTransItem[key] = value;
  }

  // show delete icon in transform tree
  const transActions: TreeActionItem[] = [
    {
      render: (node) => {
        return h(DeleteOutlined, {
          class: 'ml-2',
          onClick: () => {
            if(node.sf){
              // delete selected item
              const transIdx = procTransList.value.findIndex((el)=>el.sf == node.sf);
              procTransList.value.splice(transIdx, 1);
              // update grpah node
              x6Node.value.setData({
                text: procTransList.value.length + ' fields',
                data: unref(procTransList.value)
              });
            }
          },
        });
      },
    },
  ];

    /*
   * add a transform
   */
   function handleAddTrans() {
    if(procTransItem['sf'] && procTransItem['method'] && procTransItem['param']){
      const tkey = 'ml.workflow.form.proc.transform.method.' + procTransItem['method'];
      if(procTransItem['tf']){
        procTransItem.title = procTransItem['sf'] + '->' + procTransItem['tf'] + ' : ' + t(tkey) + ' (' + procTransItem['param'] + ')';
      } else {
        procTransItem.title = procTransItem['sf'] + ' : ' + t(tkey) + ' (' + procTransItem['param'] + ')';
      }

      let transIdx = procTransList.value.findIndex((el)=>el.sf == procTransItem.sf);
      if(transIdx>=0){
        procTransList.value[transIdx] = procTransItem;
      } else {
        procTransList.value.push(procTransItem);
      }
      
      // clean for next trans
      procTransItem = {};
    }
    x6Node.value.setData({
      text: procTransList.value.length + ' fields',
      data: unref(procTransList.value)
    });
  };

  /*
   * select transform to show
   */
  const handleSelectTrans = (selectedList: any[], event: any) => {
    if(selectedList.length > 0){
      // key is 'sf'
      const key = selectedList[0];
      const trans = procTransList.value.find((el)=>el.sf == key);
      setTransFields({...trans});
    }
  };

  /*
   * attrs of Process/Encode change
   */
   const handleProcEncodeChange = (key: string, value: string) => {
    procEncodeItem[key] = value;
  }


  // show delete icon in encode tree
  const encodeActions: TreeActionItem[] = [
    {
      render: (node) => {
        return h(DeleteOutlined, {
          class: 'ml-2',
          onClick: () => {
            if(node.sf){
              // delete selected item
              const encodeIdx = procEncodeList.value.findIndex((el)=>el.sf == node.sf);
              procEncodeList.value.splice(encodeIdx, 1);
              // update grpah node
              x6Node.value.setData({
                text: procEncodeList.value.length + ' fields',
                data: unref(procEncodeList.value)
              });
            }
          },
        });
      },
    },
  ];

    /*
   * add encode to list
   */
   function handleAddEncode() {
    if(procEncodeItem['sf'] && procEncodeItem['method']){
      const tkey = 'ml.workflow.form.proc.encode.method.' + procEncodeItem['method'];
      procEncodeItem.title = procEncodeItem['sf'] + ' : ' + t(tkey);

      let encodeIdx = procEncodeList.value.findIndex((el)=>el.sf == procEncodeItem.sf);
      if(encodeIdx>=0){
        procEncodeList.value[encodeIdx] = procEncodeItem;
      } else {
        procEncodeList.value.push(procEncodeItem);
      }
      
      // clean for next encode
      procEncodeItem = {};
    }
    
    x6Node.value.setData({
      text: procEncodeList.value.length + ' fields',
      data: unref(procEncodeList.value)
    });
  };

  /*
   * select a encode to show
   */
  const handleSelectEncode = (selectedList: any[], event: any) => {
    if(selectedList.length > 0){
      // key is 'sf'
      const key = selectedList[0];
      const encode = procEncodeList.value.find((el)=>el.sf == key);
      setEncodeFields({...encode});
    }
  };


  /*
   * attrs of Process/Scaling change
   */
   const handleProcScaleChange = (key: string, value: string) => {
    procScaleItem[key] = value;
  }

  // show delete icon in scale tree
  const scaleActions: TreeActionItem[] = [
    {
      render: (node) => {
        return h(DeleteOutlined, {
          class: 'ml-2',
          onClick: () => {
            if(node.sf){
              // delete selected item
              const scaleIdx = procScaleList.value.findIndex((el)=>el.sf == node.sf);
              procScaleList.value.splice(scaleIdx, 1);
              // update grpah node
              x6Node.value.setData({
                text: procScaleList.value.length + ' fields',
                data: unref(procScaleList.value)
              });
            }
          },
        });
      },
    },
  ];

    /*
   * add scale to list
   */
   function handleAddScale() {
    if(procScaleItem['sf'] && procScaleItem['method']){
      const tkey = 'ml.workflow.form.proc.scale.method.' + procScaleItem['method'];
      procScaleItem.title = procScaleItem['sf'] + ' : ' + t(tkey);

      let scaleIdx = procScaleList.value.findIndex((el)=>el.sf == procScaleItem.sf);
      if(scaleIdx>=0){
        procScaleList.value[scaleIdx] = procScaleItem;
      } else {
        procScaleList.value.push(procScaleItem);
      }
      
      // clean for next encode
      procScaleItem = {};
    }
    
    x6Node.value.setData({
      text: procScaleList.value.length + ' fields',
      data: unref(procScaleList.value)
    });
  };

  /*
   * select a encode to show
   */
  const handleSelectScale = (selectedList: any[], event: any) => {
    if(selectedList.length > 0){
      // key is 'sf'
      const key = selectedList[0];
      const encode = procScaleList.value.find((el)=>el.sf == key);
      setScaleFields({...encode});
    }
  };

  /*
   * attrs of Feature/Extraction change
   */
  const handleFeExtractChange = (key: string, value: string) => {
    // get current attrs
    let attrs = nodeData.data;
    if(key == 'method'){
      feExtractMethod.value = value;
      // update text and re-initialize parameters of this method
      attrs = feExtractDefault[value];
      // update text and data
      const tkey = 'ml.workflow.form.fe.extract.method.' + value;
      x6Node.value.setData({text: t(tkey), data: attrs});
    } else{
      // save attributes to node
      attrs[key] = value;
      x6Node.value.setData({data: attrs});
    }
  }
  

  /*
   * attrs of Feature/Selection change
   */
   const handleFeSelectChange = (key: string, value: string) => {
    let attrs = nodeData.data;
    if(key == 'method'){
      feSelectMethod.value = value;
      // update text and re-initialize parameters of this method
      attrs = feSelectDefault[value];
      // update text and data
      const tkey = 'ml.workflow.form.fe.select.method.' + value;
      x6Node.value.setData({text: t(tkey), data: attrs});
    } else{
      // save attributes to node
      attrs[key] = value;
      x6Node.value.setData({data: attrs});
    }
  }
  
  /*
   * attrs of Feature/Reduction change
   */
   const handleFeReduceChange = (key: string, value: string) => {
    let attrs = nodeData.data;
    if(key == 'method'){
      const tkey = 'ml.workflow.form.fe.reduce.method.' + value;
      x6Node.value.setData({text: t(tkey)});
    } 
    // save attributes to node
    attrs[key] = value;
    x6Node.value.setData({data: attrs});
  }
  
  /*
   * attrs of Algo/Classfication change
   */
   const handleMlClfChange = (key: string, value: string) => {
    let attrs = nodeData.data;
    if(key == 'method'){
      mlClfMethod.value = value;
      // update text and re-initialize parameters of this method
      attrs = mlClfDefault[value];
      // update text and data
      const tkey = 'ml.workflow.form.ml.method.' + value;
      x6Node.value.setData({text: t(tkey), data: attrs});
    } else{
      // save attributes to node
      attrs[key] = value;
      x6Node.value.setData({data: attrs});
    }
  }

  /*
   * attrs of Algo/Regression change
   */
   const handleMlRegChange = (key: string, value: string) => {
    let attrs = nodeData.data;
    if(key == 'method'){
      mlRegMethod.value = value;
      // update text and re-initialize parameters of this method
      attrs = mlRegDefault[value];
      // update text and data
      const tkey = 'ml.workflow.form.ml.method.' + value;
      x6Node.value.setData({text: t(tkey), data: attrs});
    } else{
      // save attributes to node
      attrs[key] = value;
      x6Node.value.setData({data: attrs});
    }
  }

  /*
   * attrs of Algo/Clustering change
   */
   const handleMlClusterChange = (key: string, value: string) => {
    let attrs = nodeData.data;
    if(key == 'method'){
      mlClusterMethod.value = value;
      // update text and re-initialize parameters of this method
      attrs = mlClusterDefault[value];
      // update text and data
      const tkey = 'ml.workflow.form.ml.method.' + value;
      x6Node.value.setData({text: t(tkey)});
    } else{
      // save attributes to node
      attrs[key] = value;
      x6Node.value.setData({data: attrs});
    }
  }

  /*
   * attrs of Algo/Dim Reduction change
   */
   const handleMlAnomalyChange = (key: string, value: string) => {
    let attrs = nodeData.data;
    if(key == 'method'){
      // update text and data
      const tkey = 'ml.workflow.form.ml.anomaly.method.' + value;
      x6Node.value.setData({text: t(tkey)});
    }
    // save attributes to node
    attrs[key] = value;
    x6Node.value.setData({data: attrs});
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
  </style>