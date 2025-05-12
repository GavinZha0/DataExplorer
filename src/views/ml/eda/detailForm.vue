<template>
  <component src="https://cdn.bokeh.org/bokeh/release/bokeh-3.3.4.min.js" :is="'script'" />
  <BasicDrawer v-bind="$attrs"
               :isDetail="true"
               @register="registerDrawer"
               :title="drawerTitle"
               :closable="false"
               :showDetailBack="true"
               :keyboard="false"
               @ok="handleSubmit">
    <template #titleToolbar>
      <Tooltip>
        <template #title>
          {{ t('common.toolbar.execute') }}
        </template>
        <PlaySquareTwoTone class="toolbar-button" @click="execute" />
      </Tooltip>
      <Tooltip>
        <template #title>
          {{ t('common.toolbar.save') }}
        </template>
        <SaveTwoTone class="toolbar-button" @click="handleSubmit" />
      </Tooltip>
    </template>
    <div style="width: 98%; float: left">
      <Row type="flex" :gutter="4">
        <Col :md="24 - rightPanelSize" :sm="24">
        <div style="width: 100%; height: 900px; border: solid 1px;" :forceRender="true">
          <div id="chartContainer" style="width: 100%; height: 900px; overflow: scroll" />
        </div>
          </Col>
          <Col :md="rightPanelSize" :sm="24">
          <div :style="{
                borderWidth: '1px',
                borderColor: 'black',
                height: '100%',
                width: '100%',
                paddingLeft: '5px',
                paddingRight: '5px',
                paddingTop: '5px',
                paddingBottom: '5px',
                display: rightPanelKey == 'info' ? 'block' : 'none',
              }">
            <BasicForm ref="infoFormRef"
                       :schemas="formInfoSchema"
                       :showActionButtonGroup="false"
                       layout="vertical">
              <template #group="{ model, field }">
                <ApiSelect :api="API_ML_EDA_GROUPS"
                           mode="tags"
                           v-model:value="model[field]"
                           resultField="records"
                           @change="handleEdaGroupChange" />
              </template>
            </BasicForm>
          </div>
          <div :style="{
              borderWidth: '1px',
              borderColor: 'black',
              height: '100%',
              width: '100%',
              paddingLeft: '5px',
              paddingRight: '5px',
              paddingTop: '5px',
              paddingBottom: '5px',
              display: rightPanelKey == 'vis' ? 'block' : 'none',
            }">
            <ApiTreeSelect style="width: 100%"
                           v-model:value="rawData.datasetId"
                           :placeholder="t('ml.feature.form.datasource.dataset')"
                           :api="API_ML_DATASET_TREE"
                           :immediate="true"
                           :fieldNames="{ key: 'id', label: 'name', value: 'id' }"
                           resultField="records"
                           @change="handleDatasetChange" />
            <div :style="{height: '450px'}" >
              <Tree
                :tree-data="edaVisTree"
                v-model:selectedKeys="selectedVisKeys"
                :expanded-keys="openVisKeys"
                :height="460"
                @select="handleSubVisSwitch"
                @expand="handleVisChange"
              />
            </div>
            <Divider />
            <BasicForm v-if="selectedVisKeys[0] == 'box'"
                       ref="optionFormRef"
                       :schemas="statBoxOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'violin'"
                       ref="optionFormRef"
                       :schemas="statViolinOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'anova'"
                       ref="optionFormRef"
                       :schemas="statAnovaOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'outlier'"
                       ref="optionFormRef"
                       :schemas="outlierQtMethodSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'outlier' && rawData.config.outlier.method == 'quantile'"
                       ref="optionFormRef"
                       :schemas="outlierQtOptionSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'outlier' && rawData.config.outlier.method == 'zscore'"
                       ref="optionFormRef"
                       :schemas="outlierZsOptionSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'outlier' && rawData.config.outlier.method == 'dbscan'"
                       ref="optionFormRef"
                       :schemas="outlierDbscanOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'outlier' && rawData.config.outlier.method == 'svm'"
                       ref="optionFormRef"
                       :schemas="outlierSvmOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'outlier' && rawData.config.outlier.method == 'vae'"
                       ref="optionFormRef"
                       :schemas="outlierVaeOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'outlier' && (rawData.config.outlier.method == 'knn' || rawData.config.outlier.method == 'lof')"
                       ref="optionFormRef"
                       :schemas="outlierKnnOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'outlier' && (rawData.config.outlier.method == 'cof' || rawData.config.outlier.method == 'iforest' || rawData.config.outlier.method == 'som')"
                       ref="optionFormRef"
                       :schemas="outlierCofOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'hist'"
                       ref="optionFormRef"
                       :schemas="distHistOptSchema"
                       :showActionButtonGroup="false"

                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'kde'"
                       ref="optionFormRef"
                       :schemas="kdeOptionSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'volume'"
                       ref="optionFormRef"
                       :schemas="volumeOptionSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'ccm'"
                       ref="optionFormRef"
                       :schemas="ccmOptionSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'cov'"
                       ref="optionFormRef"
                       :schemas="covOptionSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'pair'"
                       ref="optionFormRef"
                       :schemas="corrPairOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'scatter'"
                       ref="optionFormRef"
                       :schemas="corrSingleScatterOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'scatters'"
                       ref="optionFormRef"
                       :schemas="corrScatterMatrixOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'curve'"
                       ref="optionFormRef"
                       :schemas="corrCurveOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'kmeans'"
                       ref="optionFormRef"
                       :schemas="clusKmeansOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'corrfilter'"
                       ref="optionFormRef"
                       :schemas="featureFilterOptionSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'modeleval'"
                       ref="optionFormRef"
                       :schemas="featureModelOptionSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'itersearch'"
                       ref="optionFormRef"
                       :schemas="featureSearchOptionSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'autodetect'"
                       ref="optionFormRef"
                       :schemas="featureDetectOptionSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'pca'"
                       ref="optionFormRef"
                       :schemas="pcaOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'lda'"
                       ref="optionFormRef"
                       :schemas="ldaOptionSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'svd'"
                       ref="optionFormRef"
                       :schemas="svdOptionSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'tsne'"
                       ref="optionFormRef"
                       :schemas="tsneOptionSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'isomap'"
                       ref="optionFormRef"
                       :schemas="isomapOptionSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'lle'"
                       ref="optionFormRef"
                       :schemas="lleOptionSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'series'"
                       ref="optionFormRef"
                       :schemas="tsSeriesOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'trend'"
                       ref="optionFormRef"
                       :schemas="tsTrendOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'diff'"
                       ref="optionFormRef"
                       :schemas="tsDiffOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'tsfreq'"
                       ref="optionFormRef"
                       :schemas="tsFreqOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'compare'"
                       ref="optionFormRef"
                       :schemas="tsCompareOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'autocorr'"
                       ref="optionFormRef"
                       :schemas="tsAcfOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'mavg'"
                       ref="optionFormRef"
                       :schemas="tsMavgOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'quantile'"
                       ref="optionFormRef"
                       :schemas="tsQuantileOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'cycle'"
                       ref="optionFormRef"
                       :schemas="tsCycleOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'decomp'"
                       ref="optionFormRef"
                       :schemas="tsDecompOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'predict'"
                       ref="optionFormRef"
                       :schemas="tsPredictOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'anomaly'"
                       ref="optionFormRef"
                       :schemas="tsAnomalyOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'similarity'"
                       ref="optionFormRef"
                       :schemas="tsSimilarityOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
            <BasicForm v-if="selectedVisKeys[0] == 'anc'"
                       ref="optionFormRef"
                       :schemas="tsAncOptSchema"
                       :showActionButtonGroup="false"
                       @fieldValueChange="handleVisOptionChange">
            </BasicForm>
          </div>
          </Col>
</Row>
    </div>
    <Menu mode="inline"
          theme="light"
          :multiple="false"
          :selectable="true"
          :inlineCollapsed="true"
          v-model:selectedKeys="selectedPanelKeys"
          style="float: left; width: 2%"
          @click="handleMenuSwitch">
      <MenuItem key="info">
        <template #icon>
          <InfoCircleFilled :style="{
              fontSize: '24px',
              color: 'green',
            }" />
        </template>
        <span>Info</span>
      </MenuItem>
      <MenuItem key="vis">
        <template #icon>
          <AreaChartOutlined :style="{
              fontSize: '24px',
              color: 'green',
            }" />
        </template>
        <span>Visulazation</span>
      </MenuItem>
    </Menu>
  </BasicDrawer>
</template>

<script lang="ts" setup name="DetailForm">
  import { h, reactive, ref } from 'vue';
  import { BasicForm, FormActionType } from '/@/components/Form/index';
  import {
    formInfoSchema, edaVisTree, histOptionSchema, kdeOptionSchema, boxOptionSchema, violinOptionSchema, covOptionSchema, 
    ccmOptionSchema, volumeOptionSchema, anovaOptionSchema, pairOptionSchema, scatterMatrixOptionSchema, curveOptionSchema,
    outlierKnnOptionSchema, eda_cfg_default, outlierQtOptionSchema, outlierZsOptionSchema, outlierQtMethodSchema, outlierVaeOptionSchema,
    outlierSvmOptionSchema, pcaOptionSchema, ldaOptionSchema, tsneOptionSchema, isomapOptionSchema, lleOptionSchema, featureFilterOptionSchema,
    featureModelOptionSchema, featureSearchOptionSchema, featureDetectOptionSchema, tsSeriesOptionSchema, tsTrendOptionSchema, tsDiffOptionSchema,
    tsFreqOptionSchema, tsCompareOptionSchema, tsAcfOptionSchema, tsMavgOptionSchema, tsQuantileOptionSchema, tsCycleOptionSchema, tsDecompOptionSchema,
    tsPredictOptionSchema, singleScatterOptionSchema, svdOptionSchema, outlierDbscanOptionSchema, outlierCofOptionSchema, tsAnomalyOptionSchema, tsAncOptionSchema,
    clusKmeansOptionSchema, tsSimilarityOptionSchema
  } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import {
    PlaySquareTwoTone,
    SaveTwoTone,
    InfoCircleFilled,
    AreaChartOutlined
  } from '@ant-design/icons-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ApiTreeSelect } from '/@/components/Form';
  import {
    message,
    Tooltip,
    Row,
    Col,
    Menu,
    MenuItem,
    Tree,
    Divider
  } from 'ant-design-vue';
  import { API_ML_DATASET_EXECUTE, API_ML_DATASET_TREE, API_ML_DATASET_GET } from '/@/api/ml/dataset';
  import { cloneDeep } from 'lodash-es';
  import { ApiSelect } from '/@/components/Form';
  import { ApiMlEdaDataType, initMlEda } from '/@/api/ml/model/eda';
  import { API_ML_EDA_CREATE, API_ML_EDA_UPDATE, API_ML_EDA_GROUPS, API_ML_EDA_BUILD } from '/@/api/ml/eda';
  // import { Bokeh } from '@bokeh/bokehjs'; doesn't work - Gavin
  // import { Bokeh } from '/@/thirdparty/bokeh/bokeh-3.3.4.min.js';
  import Plotly from 'plotly.js-dist';
  import pako from 'pako';


  const { t } = useI18n();
  const drawerTitle = ref<string>(t('common.form.new'));
  const emit = defineEmits(['success', 'register']);
  const rawData = ref<ApiMlEdaDataType>(initMlEda);
  const rightPanelSize = ref<number>(4);
  const rightPanelKey = ref<string>('vis');
  const selectedPanelKeys = ref<string[]>(['vis']);
  const selectedVisKeys = ref<string[]>(['stat']);
  const openVisKeys = ref<string[]>([]);
  const infoFormRef = ref<Nullable<FormActionType>>(null);
  const optionFormRef = ref<Nullable<FormActionType>>(null);
  const dataset = reactive<any>({ info: {}, data: [], tf: [], vf: [], cf: []});
  const anaImgs = ref<any>({});
  let clonedEdaCfg = cloneDeep(eda_cfg_default);

  let statBoxOptSchema = cloneDeep(boxOptionSchema);
  let statViolinOptSchema = cloneDeep(violinOptionSchema);
  let statAnovaOptSchema = cloneDeep(anovaOptionSchema);
  let distHistOptSchema = cloneDeep(histOptionSchema);
  let corrScatterMatrixOptSchema = cloneDeep(scatterMatrixOptionSchema);
  let corrPairOptSchema = cloneDeep(pairOptionSchema);
  let corrCurveOptSchema = cloneDeep(curveOptionSchema);
  let corrSingleScatterOptSchema = cloneDeep(singleScatterOptionSchema);

  let outlierDbscanOptSchema = cloneDeep(outlierDbscanOptionSchema);
  let outlierSvmOptSchema = cloneDeep(outlierSvmOptionSchema);
  let outlierKnnOptSchema = cloneDeep(outlierKnnOptionSchema);
  let outlierVaeOptSchema = cloneDeep(outlierVaeOptionSchema);
  let outlierCofOptSchema = cloneDeep(outlierCofOptionSchema);

  let clusKmeansOptSchema = cloneDeep(clusKmeansOptionSchema);
  let pcaOptSchema = cloneDeep(pcaOptionSchema);
  
  let tsSeriesOptSchema = cloneDeep(tsSeriesOptionSchema);
  let tsTrendOptSchema = cloneDeep(tsTrendOptionSchema);
  let tsDiffOptSchema = cloneDeep(tsDiffOptionSchema);
  let tsFreqOptSchema = cloneDeep(tsFreqOptionSchema);
  let tsCompareOptSchema = cloneDeep(tsCompareOptionSchema);
  let tsAcfOptSchema = cloneDeep(tsAcfOptionSchema);
  let tsMavgOptSchema = cloneDeep(tsMavgOptionSchema);
  let tsQuantileOptSchema = cloneDeep(tsQuantileOptionSchema);
  let tsCycleOptSchema = cloneDeep(tsCycleOptionSchema);
  let tsDecompOptSchema = cloneDeep(tsDecompOptionSchema);
  let tsPredictOptSchema = cloneDeep(tsPredictOptionSchema);
  let tsAnomalyOptSchema = cloneDeep(tsAnomalyOptionSchema);
  let tsSimilarityOptSchema = cloneDeep(tsSimilarityOptionSchema);
  let tsAncOptSchema = cloneDeep(tsAncOptionSchema);

  // drawer data initialization
  const [registerDrawer, { setDrawerProps }] = useDrawerInner(async (data) => {
    // remove old data of info form
    if (infoFormRef.value) {
      infoFormRef.value.resetFields();
    }

    setDrawerProps({ confirmLoading: false });

    // pass received data to info form
    if (infoFormRef.value) {
      await infoFormRef.value.setFieldsValue(data);
    }

    // get drawer title
    if (data && data.id) {
      drawerTitle.value = '[' + data.name + ']';
    } else {
      drawerTitle.value = t('common.form.new');
    }

    // save received data
    rawData.value = data;
    if(!rawData.value.relPair){
      rawData.value.relPair = [];
    }

    // init data
    dataset.info = {};
    dataset.data = [];
    dataset.tf = [];
    dataset.vf = [];
    dataset.cf = [];
    if (rawData.value.config == undefined) {
      rawData.value.config = cloneDeep(clonedEdaCfg);
    }

    openVisKeys.value = ['stat'];
    selectedVisKeys.value = ['overview'];
    if (data && data.id) {
      buildChart('overview', rawData.value.config['overview']);
    }

    handleDatasetChange(data.datasetId);
  });


  /*
   * only pick up the latest one as selected field when selecting change
   * select component accepts user defined item when it is tags mode
   * so you can select existing group name or create a new group
   */
  const handleEdaGroupChange = (value: string[]) => {
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
   * get dataset info when dataset selection change
   * dataset info should be updated and eda info should be cleaned up
   */
   const handleDatasetChange = (key: number) => {
    if(key && key>0){
      // key is dataset id
      API_ML_DATASET_GET(key).then((response) => {
        // get dataset info from backend
        dataset.info = response;
        dataset.tf = [];
        dataset.vf = [];
        dataset.cf = [];
        
        // re-initialize eda data
        statBoxOptSchema = cloneDeep(boxOptionSchema);
        statViolinOptSchema = cloneDeep(violinOptionSchema);
        statAnovaOptSchema = cloneDeep(anovaOptionSchema);
        distHistOptSchema = cloneDeep(histOptionSchema);
        corrScatterMatrixOptSchema = cloneDeep(scatterMatrixOptionSchema);
        corrPairOptSchema = cloneDeep(pairOptionSchema);
        corrCurveOptSchema = cloneDeep(curveOptionSchema);
        corrSingleScatterOptSchema = cloneDeep(singleScatterOptionSchema);

        outlierDbscanOptSchema = cloneDeep(outlierDbscanOptionSchema);
        outlierSvmOptSchema = cloneDeep(outlierSvmOptionSchema);
        outlierKnnOptSchema = cloneDeep(outlierKnnOptionSchema);
        outlierVaeOptSchema = cloneDeep(outlierVaeOptionSchema);
        outlierCofOptSchema = cloneDeep(outlierCofOptionSchema);

        clusKmeansOptSchema = cloneDeep(clusKmeansOptionSchema);
        pcaOptSchema = cloneDeep(pcaOptionSchema);

        tsSeriesOptSchema = cloneDeep(tsSeriesOptionSchema);
        tsTrendOptSchema = cloneDeep(tsTrendOptionSchema);
        tsDiffOptSchema = cloneDeep(tsDiffOptionSchema);
        tsFreqOptSchema = cloneDeep(tsFreqOptionSchema);
        tsCompareOptSchema = cloneDeep(tsCompareOptionSchema);
        tsAcfOptSchema = cloneDeep(tsAcfOptionSchema);
        tsMavgOptSchema = cloneDeep(tsMavgOptionSchema);
        tsQuantileOptSchema = cloneDeep(tsQuantileOptionSchema);
        tsCycleOptSchema = cloneDeep(tsCycleOptionSchema);
        tsDecompOptSchema = cloneDeep(tsDecompOptionSchema);
        tsPredictOptSchema = cloneDeep(tsPredictOptionSchema);
        tsAnomalyOptSchema = cloneDeep(tsAnomalyOptionSchema);
        tsSimilarityOptSchema = cloneDeep(tsSimilarityOptionSchema);
        tsAncOptSchema = cloneDeep(tsAncOptionSchema);

        // reinitalize default config
        rawData.value.config = clonedEdaCfg = cloneDeep(eda_cfg_default);

        for(const field of response.fields){
          if (field.omit) {
            continue;
          } else if (field.target) {
            // do nothing
          }

          if (field.attr == 'date') {
            // add ts field to schema options
            dataset.tf.push(field.name);
            tsSeriesOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            tsTrendOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            tsDiffOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            tsFreqOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            tsCompareOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            tsAcfOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            tsMavgOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            tsQuantileOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            tsCycleOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            tsDecompOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            tsPredictOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            tsAnomalyOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            tsSimilarityOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            tsAncOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });

            outlierDbscanOptSchema[5].componentProps.options.push({ label: field.name, value: field.name });
            outlierSvmOptSchema[4].componentProps.options.push({ label: field.name, value: field.name });
            outlierKnnOptSchema[4].componentProps.options.push({ label: field.name, value: field.name });
            outlierVaeOptSchema[5].componentProps.options.push({ label: field.name, value: field.name });
            outlierCofOptSchema[4].componentProps.options.push({ label: field.name, value: field.name });

            clusKmeansOptSchema[4].componentProps.options.push({ label: field.name, value: field.name });
            pcaOptSchema[3].componentProps.options.push({ label: field.name, value: field.name });
            
          } else if(field.attr == 'conti' || field.attr == 'disc'){
            // add value field to schema options
            dataset.vf.push(field.name);
            statAnovaOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            corrSingleScatterOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            corrSingleScatterOptSchema[1].componentProps.options.push({ label: field.name, value: field.name });
            corrSingleScatterOptSchema[5].componentProps.options.push({ label: field.name, value: field.name });
            corrSingleScatterOptSchema[6].componentProps.options.push({ label: field.name, value: field.name });

            tsSeriesOptSchema[2].componentProps.options.push({ label: field.name, value: field.name });
            tsTrendOptSchema[2].componentProps.options.push({ label: field.name, value: field.name });
            tsDiffOptSchema[2].componentProps.options.push({ label: field.name, value: field.name });
            tsFreqOptSchema[1].componentProps.options.push({ label: field.name, value: field.name });
            tsCompareOptSchema[2].componentProps.options.push({ label: field.name, value: field.name });
            tsAcfOptSchema[2].componentProps.options.push({ label: field.name, value: field.name });
            tsMavgOptSchema[2].componentProps.options.push({ label: field.name, value: field.name });
            tsQuantileOptSchema[2].componentProps.options.push({ label: field.name, value: field.name });
            tsCycleOptSchema[2].componentProps.options.push({ label: field.name, value: field.name });
            tsDecompOptSchema[2].componentProps.options.push({ label: field.name, value: field.name });
            tsPredictOptSchema[2].componentProps.options.push({ label: field.name, value: field.name });
            tsAnomalyOptSchema[2].componentProps.options.push({ label: field.name, value: field.name });
            tsSimilarityOptSchema[2].componentProps.options.push({ label: field.name, value: field.name });
            tsAncOptSchema[2].componentProps.options.push({ label: field.name, value: field.name });
          } else if(field.attr == 'cat'){
            // add category field to schema options
            dataset.cf.push(field.name);
            tsSeriesOptSchema[4].componentProps.options.push({ label: field.name, value: field.name });
            tsAnomalyOptSchema[4].componentProps.options.push({ label: field.name, value: field.name });
            tsSimilarityOptSchema[4].componentProps.options.push({ label: field.name, value: field.name });
            statBoxOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            statViolinOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            statAnovaOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            distHistOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            corrScatterMatrixOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            corrPairOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            corrCurveOptSchema[0].componentProps.options.push({ label: field.name, value: field.name });
            corrSingleScatterOptSchema[2].componentProps.options.push({ label: field.name, value: field.name });

            outlierDbscanOptSchema[5].componentProps.options.push({ label: field.name, value: field.name });
            outlierSvmOptSchema[4].componentProps.options.push({ label: field.name, value: field.name });
            outlierKnnOptSchema[4].componentProps.options.push({ label: field.name, value: field.name });
            outlierVaeOptSchema[5].componentProps.options.push({ label: field.name, value: field.name });
            outlierCofOptSchema[4].componentProps.options.push({ label: field.name, value: field.name });

            clusKmeansOptSchema[4].componentProps.options.push({ label: field.name, value: field.name });
            pcaOptSchema[3].componentProps.options.push({ label: field.name, value: field.name });
            
          }
        }

        if (tsSeriesOptSchema[0].componentProps.options.length == 1) {
          // set default ts field when only one field
          tsSeriesOptSchema[0].defaultValue = tsSeriesOptSchema[0].componentProps.options[0].value;
          tsTrendOptSchema[0].defaultValue = tsTrendOptSchema[0].componentProps.options[0].value;
          tsDiffOptSchema[0].defaultValue = tsDiffOptSchema[0].componentProps.options[0].value;
          tsFreqOptSchema[0].defaultValue = tsFreqOptSchema[0].componentProps.options[0].value;
          tsCompareOptSchema[0].defaultValue = tsCompareOptSchema[0].componentProps.options[0].value;
          tsAcfOptSchema[0].defaultValue = tsAcfOptSchema[0].componentProps.options[0].value;
          tsMavgOptSchema[0].defaultValue = tsMavgOptSchema[0].componentProps.options[0].value;
          tsQuantileOptSchema[0].defaultValue = tsQuantileOptSchema[0].componentProps.options[0].value;
          tsCycleOptSchema[0].defaultValue = tsCycleOptSchema[0].componentProps.options[0].value;
          tsDecompOptSchema[0].defaultValue = tsDecompOptSchema[0].componentProps.options[0].value;
          tsPredictOptSchema[0].defaultValue = tsPredictOptSchema[0].componentProps.options[0].value;
          tsAnomalyOptSchema[0].defaultValue = tsAnomalyOptSchema[0].componentProps.options[0].value;
          tsSimilarityOptSchema[0].defaultValue = tsSimilarityOptSchema[0].componentProps.options[0].value;
          tsAncOptSchema[0].defaultValue = tsAncOptSchema[0].componentProps.options[0].value;

          rawData.value.config.series['ts'] = tsSeriesOptSchema[0].defaultValue;
          rawData.value.config.trend['ts'] = tsTrendOptSchema[0].defaultValue;
          rawData.value.config.diff['ts'] = tsDiffOptSchema[0].defaultValue;
          rawData.value.config.quantile['ts'] = tsQuantileOptSchema[0].defaultValue;
          rawData.value.config.compare['ts'] = tsCompareOptSchema[0].defaultValue;
          rawData.value.config.mavg['ts'] = tsMavgOptSchema[0].defaultValue;
          rawData.value.config.tsfreq['ts'] = tsFreqOptSchema[0].defaultValue;
          rawData.value.config.autocorr['ts'] = tsAcfOptSchema[0].defaultValue;
          rawData.value.config.cycle['ts'] = tsCycleOptSchema[0].defaultValue;
          rawData.value.config.decomp['ts'] = tsDecompOptSchema[0].defaultValue;
          rawData.value.config.predict['ts'] = tsPredictOptSchema[0].defaultValue;
          rawData.value.config.anomaly['ts'] = tsAnomalyOptSchema[0].defaultValue;
          rawData.value.config.anomaly['ts'] = tsSimilarityOptSchema[0].defaultValue;
          rawData.value.config.anc['ts'] = tsAncOptSchema[0].defaultValue;
        }

        if (tsTrendOptSchema[2].componentProps.options.length == 1) {
          // set default value field when only one field
          tsSeriesOptSchema[2].defaultValue = tsTrendOptSchema[2].componentProps.options[0].value;
          tsTrendOptSchema[2].defaultValue = tsTrendOptSchema[2].componentProps.options[0].value;
          tsDiffOptSchema[2].defaultValue = tsDiffOptSchema[2].componentProps.options[0].value;
          tsFreqOptSchema[1].defaultValue = tsFreqOptSchema[1].componentProps.options[0].value;
          tsCompareOptSchema[2].defaultValue = tsCompareOptSchema[2].componentProps.options[0].value;
          tsAcfOptSchema[2].defaultValue = tsAcfOptSchema[2].componentProps.options[0].value;
          tsMavgOptSchema[2].defaultValue = tsMavgOptSchema[2].componentProps.options[0].value;
          tsQuantileOptSchema[2].defaultValue = tsQuantileOptSchema[2].componentProps.options[0].value;
          tsCycleOptSchema[2].defaultValue = tsCycleOptSchema[2].componentProps.options[0].value;
          tsDecompOptSchema[2].defaultValue = tsDecompOptSchema[2].componentProps.options[0].value;
          tsPredictOptSchema[2].defaultValue = tsPredictOptSchema[2].componentProps.options[0].value;
          tsAnomalyOptSchema[2].defaultValue = tsAnomalyOptSchema[2].componentProps.options[0].value;
          tsSimilarityOptSchema[2].defaultValue = tsSimilarityOptSchema[2].componentProps.options[0].value;
          tsAncOptSchema[2].defaultValue = tsAncOptSchema[2].componentProps.options[0].value;

          rawData.value.config.series['vf'] = tsSeriesOptSchema[2].defaultValue;
          rawData.value.config.trend['vf'] = tsTrendOptSchema[2].defaultValue;
          rawData.value.config.diff['vf'] = tsDiffOptSchema[2].defaultValue;
          rawData.value.config.tsfreq['vf'] = tsFreqOptSchema[1].defaultValue;
          rawData.value.config.compare['vf'] = tsCompareOptSchema[2].defaultValue;
          rawData.value.config.autocorr['vf'] = tsAcfOptSchema[2].defaultValue;
          rawData.value.config.mavg['vf'] = tsMavgOptSchema[2].defaultValue;
          rawData.value.config.quantile['vf'] = tsQuantileOptSchema[2].defaultValue;
          rawData.value.config.cycle['vf'] = tsCycleOptSchema[2].defaultValue;
          rawData.value.config.decomp['vf'] = tsDecompOptSchema[2].defaultValue;
          rawData.value.config.predict['vf'] = tsPredictOptSchema[2].defaultValue;
          rawData.value.config.anomaly['vf'] = tsAnomalyOptSchema[2].defaultValue;
          rawData.value.config.anomaly['vf'] = tsSimilarityOptSchema[2].defaultValue;
          rawData.value.config.anc['vf'] = tsAncOptSchema[2].defaultValue;
        }

        if (tsSeriesOptSchema[4].componentProps.options.length == 1) {
          // set default category field when only one field
          tsSeriesOptSchema[4].defaultValue = tsSeriesOptSchema[4].componentProps.options[0].value;
          tsAnomalyOptSchema[4].defaultValue = tsAnomalyOptSchema[4].componentProps.options[0].value;
          tsSimilarityOptSchema[4].defaultValue = tsSimilarityOptSchema[4].componentProps.options[0].value;
          rawData.value.config.series['cat'] = tsSeriesOptSchema[4].defaultValue;
          rawData.value.config.anomaly['cat'] = tsAnomalyOptSchema[4].defaultValue;
          rawData.value.config.similarity['cat'] = tsSimilarityOptSchema[4].defaultValue;
        }

        openVisKeys.value = ['stat'];
        selectedVisKeys.value = ['overview'];
        buildChart('overview', rawData.value.config['overview']);

      });
    }
  };

  /*
* switch panel - info/datasource/vis/config/
*/
  const handleMenuSwitch = async (menu: any) => {
    if (rightPanelKey.value == menu.key && rightPanelSize.value > 0) {
      // close it when click itself
      rightPanelSize.value = 0;
      return;
    }

    //show panel when click a different menu
    rightPanelKey.value = menu.key;
    rightPanelSize.value = 4;
  };


  /*
  * show only one sub menu when menu is changed
  */
  const handleVisChange = (openKeys: string[]) => {
    const latestOpenKey = openKeys.find(key => openVisKeys.value.indexOf(key) === -1);
    openVisKeys.value = latestOpenKey ? [latestOpenKey] : [];
  };

  /*
  * show different chart when click different vis option
  */
  const handleSubVisSwitch = (menu: any) => {
    if(menu != null && menu.length > 0){
      let key = menu[0];
      // reset config to default
      rawData.value.config[key] = cloneDeep(clonedEdaCfg[key]);
      buildChart(key, rawData.value.config[key]);
    }
  };

  async function handleKindOptChange(key: string, value: string) {
    const visKind = selectedVisKeys.value[0];
    let cfg = rawData.value.config[visKind];
    if (value == undefined || value == '') {
      delete cfg[key];
    } else {
      cfg[key] = value;
      if(key == 'method'){
        if(cfg['threshold']){
          delete cfg['threshold'];
        }
      }
    }

    buildChart(visKind, cfg);
  };

  /*
 * Vis option change
 */
  const handleVisOptionChange = (key: string, value) => {
    const visKind = selectedVisKeys.value[0];
    let cfg = rawData.value.config[visKind];
    if (value == undefined || (value == '' && value != 0)) {
      delete cfg[key];
    } else {
      cfg[key] = value;
      if(key == 'method'){
        if(cfg['threshold']){
          delete cfg['threshold'];
        }
      }
    }

    buildChart(visKind, cfg);
  };

  /*
* send command to backend to build chart
*/
  const buildFeatureChart = (fig: any) => {
    let title = '';
    let pData = [];
    let width = undefined;
    var pLayout = {};
    const figData = fig.data;
    switch (fig.kind) {
      case 'corrfilter': 
      case 'modeleval':
      case 'itersearch': {
        title = 'Features Importance Rank with method ' + figData.method;
        let mapColor = figData.prime.map((x) => { if (x) { return 'green' } else { return 'orange' } });
        pData = [{
          type: 'bar',
          x: figData.name,
          y: figData.value,
          text: figData.value,
          //marker: { color: mapColor }
        }];
        pLayout = {
          yaxis: {title: 'Importance'}
        };
        break;
      }
      case 'autodetect': {
        title = 'Total features: ' + figData.columns.length;
        figData.data.unshift(figData.columns);
        figData.index.unshift('Feature');
        pData = [{
          type: 'table',
          columnwidth: [500,150],
          header: {
            values: figData.index,
            line: {width: 1, color: 'black'},
            fill: { color: "gray" }
          },
          cells: {
            values: figData.data,
            align: ["left", "center"],
            line: {color: "black", width: 1},
            fill: {color: ['gray', 'white']},
          }
        }];
        if (figData.index.length > 14) {
          width = figData.index.length * 100;
        }

        pLayout = {
          title: {text: title}
        };
        break;
      }
    }

    Plotly.purge("chartContainer");
    Plotly.newPlot("chartContainer", pData, pLayout);
  };

  /*
* send command to backend to build chart
*/
  async function buildChart (kind: string, config: any) {
    if (rawData.value.datasetId == undefined || rawData.value.datasetId <= 0) {
      return;
    }
    try {
      setDrawerProps({ confirmLoading: true });
      API_ML_EDA_BUILD(rawData.value.datasetId, config.pid, kind, config).then((response) => {
        let respObj = response;
        if (response.zip && response.data) {
          // decode base64
          const binData = atob(response.data);
          const u8array = Uint8Array.from(binData, (m) => m.charCodeAt(0));
          // unzip data
          const unzipArray = pako.inflate(u8array);
          const unzipStr = new TextDecoder().decode(unzipArray);
          // replace zipped data
          respObj.data = JSON.parse(unzipStr);
        }

        switch (respObj.type) {
          case 'img': {
            anaImgs.value[respObj.kind] = respObj.data;
            break;
          }
          case 'bokeh': {
            Bokeh.embed.embed_item(respObj.data, "chartContainer");
            break;
          }
          case 'plotly': {
            let pData = respObj.data?respObj.data['data']:[];
            let pLayout = respObj.data?respObj.data['layout']:{};
            let pConfig = respObj.data?respObj.data['config']:{};

            /*
            // layout 
            if (pLayout) {
              //pLayout['hovermode'] = 'x';
            } else {
              //pLayout = { hovermode: 'x' };
            }
            */

            // config
            if (pConfig) {
              pConfig['modeBarButtonsToRemove'] = ['zoomIn', 'zoomOut', 'autoScale', 'select', 'lasso'];
              pConfig['displaylogo'] = false;
              pConfig['scrollZoom'] = true;
            } else {
              pConfig = {
                displayModeBar: false,
                modeBarButtonsToRemove: ['zoomIn', 'zoomOut', 'pan', 'autoScale', 'select', 'lasso'],
                displaylogo: false,
                scrollZoom: true
              }
            }


            Plotly.newPlot("chartContainer", pData, pLayout, pConfig);
            break;
          }
          case 'data': {
            buildFeatureChart(respObj)
            break;
          }
          default: {
            break;
          }
        }
    });
  } finally {
    setDrawerProps({ confirmLoading: false });
  }
};

  /*
   * run sql query to get data
   */
  const execute = () => {
    // pass variables to backend for checking and replacement
    // backend also can handle variable replacement
    API_ML_DATASET_EXECUTE(
      rawData.value.datasetId,
      0,
    ).then((response) => {
      datasetInfo.total = response.total; // total records
      datasetInfo.dataArray = response.records; // data array
      const columnNames = response.metadata.map((it)=>it.name);
    });
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

      setDrawerProps({ confirmLoading: true });
      if (rawData.value.id) {
        API_ML_EDA_UPDATE(rawData.value).then(() => {
          // notify parent
          emit('success', rawData.value);
          message.success(t('common.tip.update'));
        });
      } else {
        API_ML_EDA_CREATE(rawData.value).then(() => {
          // notify parent
          emit('success', rawData.value);
          message.success(t('common.tip.new'));
        });
      }
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>

<style lang="less" scoped>

  ::v-deep(.ant-card-grid) {
    padding: 5px;
  }

  ::v-deep(.ant-descriptions-bordered.ant-descriptions-small .ant-descriptions-item-label) {
    padding: 4px 4px;
  }

  ::v-deep(.ant-descriptions-bordered.ant-descriptions-small .ant-descriptions-item-content) {
    padding: 4px 4px;
  }

  ::v-deep(.ant-descriptions-item-label) {
    font-size: 12px;
  }

  .report-page {
    width: 100%;
    height: 80px;
    opacity: 0.9;
  }

  .report-page::after {
    content: '';
    background: url('/@/assets/images/report-page.png');
    background-repeat: no-repeat;
    background-position: right center;
    background-size: contain;
    width: 100%;
    height: 80px;
    left: 0;
    top: 0;
    position: absolute;
    z-index: -1;
  }

  .report-page-index {
    text-align: right;
    right: 2px;
    bottom: 0;
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

  ::v-deep(.table-disabled) {
    background-color: gray;
  }

  ::v-deep(.table-discrete) {
    background-color: rgba(236, 236, 152, 0.2);
  }

  ::v-deep(.table-datetime) {
    background-color: rgba(127, 158, 70, 0.2);
  }

  ::v-deep(.table-coordinate) {
    background-color: rgba(66, 151, 144, 0.2);
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
