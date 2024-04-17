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
        <template #title>{{ t('dataviz.dataset.detail.toolbar.limit') }}</template>
        <InputNumber
          :min="0"
          :step="100"
          size="small"
          v-model:value="datasetInfo.limit"
          class="toolbar-input"
          :placeholder="t('dataviz.dataset.detail.toolbar.limit')"
          :addonAfter="datasetInfo.total"
        />
      </Tooltip>
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
          <div style="width: 100%; height: 750px; border: solid 1px;" :forceRender="true">
            <BasicTable
              v-if="selectedVisKeys[0]=='stat'"
              ref="statTableRef"
              :size="'small'"
              :bordered="true"
              :show-table-setting="false"
              :columns="statColumns"
              :data-source="statFieldList"
              :show-index-column="false"
              :use-search-form="false"
              :pagination="false"
              :striped="false"
              :scroll="{ y: 650 }"
              :rowClassName="tableRowColor"
              @resizeColumn="
                (w, col) => {
                  col.width = w;
                }
              "
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'missing'">
                  <div v-if="record.missing>0" style="margin-left: 5px; color: orange">{{ record.missing }}</div>
                  <div v-else style="margin-left: 5px; color: black">{{ record.missing }}</div>
                </template>
                <template v-if="column.key === 'variance'">
                  <div v-if="record.variance==0" style="margin-left: 5px; color: orange">{{ record.variance }}</div>
                  <div v-else style="margin-left: 5px; color: black">{{ record.variance }}</div>
                </template>
              </template>
            </BasicTable>
            <Card v-else-if="selectedVisKeys[0]=='kdebar'">
              <CardGrid v-for="(item, index) in statFieldList" :key="index" class="!md:w-1/4 !w-full">
                <div class="flex justify-between" style="background-color:bisque;">
                  <span style="color:green">{{ item.name }}</span>
                  <span style="cursor: pointer;"><close-square-outlined /></span>
                </div>
                <div>
                  <div :id="item.name" :ref="setKdeGridRef" class="flex h-60"></div>
                </div>
              </CardGrid>
            </Card>
            <Card v-else-if="selectedVisKeys[0]=='scatter'">
              <CardGrid v-for="(item, index) in rawData.relPair" :key="index" class="!md:w-1/3 !w-full">
                <div class="flex justify-between" style="background-color:wheat;">
                  <span v-if="item.fields.length==1" style="color:green">{{ item.fields[0] }}</span>
                  <span v-else-if="item.fields.length>1" style="color:green">{{ item.fields[0] }} vs {{ item.fields[1] }}</span>
                  <span><close-square-outlined /></span>
                </div>
                <div :id="'scatter_'+item.id" :ref="setScatterGridRef" class="flex h-80"></div>
              </CardGrid>
            </Card>
            <div v-else>
              <div ref="chart1Container" :style="chart1Style"></div>
              <div ref="chart2Container" :style="chart2Style"></div>
            </div>
          </div>
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
                  :api="API_ML_FEATURE_GROUPS"
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
                display: rightPanelKey == 'datasource' ? 'block' : 'none',
              }"
          >
            <ApiTreeSelect
              :placeholder="t('ml.feature.form.datasource.source')"
              :api="API_DATASOURCE_TREE"
              :immediate="true"
              v-model:value="rawData.sourceId"
              resultField="records"
              :fieldNames="{ key: 'id', label: 'name', value: 'id' }"
              :afterFetch="buildSourceTree"
              @change="handleSourceChange"
              style="width: 100%"
            >
              <template #suffixIcon>
                <Icon
                  v-if="dsInfo.selectedSource.type == 'MySQL'"
                  icon="carbon:sql"
                  :size="24"
                  style="color: #00bb00; margin-top: -8px"
                />
                <Icon
                  v-else-if="dsInfo.selectedSource.type == 'CSV'"
                  icon="carbon:csv"
                  :size="24"
                  style="color: #00bb00; margin-top: -8px"
                />
                <Icon
                  v-else-if="dsInfo.selectedSource.type == 'JSON'"
                  icon="carbon:json"
                  :size="24"
                  style="color: #00bb00; margin-top: -8px"
                />
              </template>
            </ApiTreeSelect>
            <ApiSelect
              style="width: 100%"
              v-model:value="rawData.datasetName"
              :placeholder="t('ml.feature.form.datasource.dataset')"
              :api="API_DATASOURCE_TABLES"
              :params="{id: rawData.sourceId}"
              :fieldNames="{ key: 'id', title: 'name', value: 'name' }"
              resultField="records"
              @change="handleDatasetChange"
            />
            <BasicTree
              draggable="true"
              block-node
              :treeData="fieldTreeList"
              v-model:value="dsInfo.selectedField"
              :fieldNames="{ key: 'id', title: 'name', value: 'name' }"
              :actionList="fieldActions"
              @drop="handleDropEnd"
              @dblclick.native="handleClickAdd"
            >
            </BasicTree>
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
              display: rightPanelKey == 'query' ? 'block' : 'none',
            }"
          >
            <Button size="small" @click="formatQuery">
              {{ t('common.toolbar.format') }}
            </Button>
            <div id="codeEditor" style="width: 100%; height: 750px; border-top: solid 1px gray">
              <CodeEditor
                border
                class="code-mirror"
                placeholder="Custom query"
                v-model:value="rawData.query"
                mode="sql"
              />
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
              display: rightPanelKey == 'vis' ? 'block' : 'none',
            }"
          >
            <Menu
              mode="inline"
              :multiple="false"
              v-model:selectedKeys="selectedVisKeys"
              :open-keys="openVisKeys"
              style="width: 100%"
              :forceRender="true"
              @click="handleVisSwitch"
              @openChange="handleVisChange"
            >
              <MenuItem key="stat">
                <template #icon>
                  <Avatar src="/resource/img/ml-feature-stats.png" shape="square" style="width: 32px"/>
                </template>
                <span>Statistics</span>
              </MenuItem>
              <SubMenu key="dists">
                <template #icon>
                  <Avatar src="/resource/img/ml-feature-dists.png" shape="square" style="width: 32px"/>
                </template>
                <template #title>Distribution</template>
                <MenuItem key="kdebar">Kde & Bar</MenuItem>
                <MenuItem key="boxplot">Boxplot</MenuItem>
                <MenuItem key="allkdes">Compared Kdes</MenuItem>
              </SubMenu>
              <SubMenu key="corr">
                <template #icon>
                  <Avatar src="/resource/img/ml-feature-corr.png" shape="square" style="width: 32px"/>
                </template>
                <template #title>Correlation</template>
                <MenuItem key="pairwise">Pairwise</MenuItem>
                <MenuItem key="pearson">Pearson Matrix</MenuItem>
                <MenuItem key="parallel">Parallel coordinates</MenuItem>
                <MenuItem key="andrews">Andrews Curve</MenuItem>
              </SubMenu>
              <SubMenu key="selection">
                <template #icon>
                  <Avatar src="/resource/img/ml-feature-selection.png" shape="square" style="width: 32px"/>
                </template>
                <template #title>Feature Selection</template>
                <MenuItem key="variance">Variance Rank</MenuItem>
                <MenuItem key="gini">Gini Coefficient(SelectKBest)</MenuItem>
                <MenuItem key="chi">Chi-Square Test(SelectKBest)</MenuItem>
                <MenuItem key="mutual">Mutual Info(SelectKBest)</MenuItem>
                <MenuItem key="score">Boruta(TreeModel)</MenuItem>
                <MenuItem key="lasso">Lasso Regression(sklearn)</MenuItem>
                <MenuItem key="rfe">Recursive Feature Elimination(sklearn)</MenuItem>
              </SubMenu>
              <SubMenu key="reduction">
                <template #icon>
                  <Avatar src="/resource/img/ml-feature-reduction.png" shape="square" style="width: 32px"/>
                </template>
                <template #title>Dim Reduction</template>
                <MenuItem key="pca">PCA</MenuItem>
                <MenuItem key="kpca">KPCA</MenuItem>
                <MenuItem key="lda">LDA</MenuItem>
                <MenuItem key="mda">MDA</MenuItem>
                <MenuItem key="qda">QDA</MenuItem>
                <MenuItem key="mds">MDS</MenuItem>
                <MenuItem key="tsne">t-SNE</MenuItem>
              </SubMenu>
              <MenuItem key="trend">
                <template #icon>
                  <Avatar src="/resource/img/ml-feature-trend.png" shape="square" style="width: 32px"/>
                </template>
                <span>Time Series</span>
              </MenuItem>
              <MenuItem key="scatter">
                <template #icon>
                  <Avatar src="/resource/img/ml-feature-scatter.png" shape="square" style="width: 32px"/>
                </template>
                <span>One-One Scatter</span>
              </MenuItem>
            </Menu>
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
      <MenuItem key="datasource">
        <template #icon>
          <GiftOutlined
            :style="{
              fontSize: '24px',
              color: 'green',
            }"
          />
        </template>
        <span>Datasource</span>
      </MenuItem>
      <MenuItem key="query">
        <template #icon>
          <ConsoleSqlOutlined
            :style="{
              fontSize: '24px',
              color: 'green',
            }"
          />
        </template>
        <span>Query</span>
      </MenuItem>
      <MenuItem key="vis">
        <template #icon>
          <AreaChartOutlined
            :style="{
              fontSize: '24px',
              color: 'green',
            }"
          />
        </template>
        <span>Vis</span>
      </MenuItem>
    </Menu>
  </BasicDrawer>
</template>

<script lang="ts" setup name="DetailForm">
  import { computed, h, reactive, ref, unref, nextTick, watch } from 'vue';
  import { BasicForm, FormActionType } from '/@/components/Form/index';
  import { formInfoSchema, statColumns, sKdePlotCfg, barPlotCfg, boxPlotCfg, pairPlotCfg, scatterPlotCfg, pearsonMatrxiCfg, parallelCfg, stackedBarCfg, pcaImpCfg, pcaD2Cfg, pcaD3Cfg, stackedBarSeriesTpl, cKdePlotCfg, cKdeTransTpl, cKdeSeriesTpl, boxTransformTpl, boxSeriesTpl, parallelTransTpl, parallelSeriesTpl, scatterTransTpl, scatterSeriesTpl, trendCurveCfg, trendSeriesTpl, tsBarPlotCfg, tsBarSeriesTpl, allKdeTransTpl, allKdeSeriesTpl, d2d3TransTpl, d2d3SeriesTpl, allKdePlotCfg } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTable, TableActionType } from '/@/components/Table';
  import {
    PlaySquareTwoTone,
    SaveTwoTone,
    InfoCircleFilled,
    GiftOutlined,
    ConsoleSqlOutlined,
    AimOutlined,
    AreaChartOutlined
  } from '@ant-design/icons-vue';
  import { BasicTree, TreeActionItem } from '/@/components/Tree';
  import 'splitpanes/dist/splitpanes.css';
  import { CodeEditor } from '/@/components/CodeEditor';
  import { format } from 'sql-formatter';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ApiTreeSelect } from '/@/components/Form';
  import {
    message,
    Tooltip,
    Row,
    Col,
    Menu,
    SubMenu,
    MenuItem,
    Card,
    CardGrid,
    Avatar,
    InputNumber,
    Button
  } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import {
    API_DATASOURCE_TREE,
    API_DATASOURCE_TABLES,
    API_DATASOURCE_EXECUTE,
    API_DATASOURCE_FIELDS,
  } from '/@/api/datamgr/datasource';
  import { cloneDeep } from 'lodash-es';
  import { ApiSelect } from '/@/components/Form';
  import { ApiMlFeatureDataType, initMlFeature } from '/@/api/ml/model/feature';
  import * as echarts from 'echarts';
  import 'echarts-gl';
  //import { ecSimpleTransform } from 'echarts-simple-transform';
  import { aggregate } from "echarts-simple-transform";
  import { DataFrame } from '@antv/ava';
  import { DataView } from '@antv/data-set';
  import { Facet } from '@antv/g2plot';
  import { pearson } from '@antv/ava/lib/data';
  import { PCA } from 'ml-pca';
  import { jStat } from 'jstat';
  import { RandomForestClassifier as RFClassifier } from 'ml-random-forest';
  import { API_ML_FEATURE_CREATE, API_ML_FEATURE_UPDATE, API_ML_FEATURE_GROUPS } from '/@/api/ml/feature';

  const { t } = useI18n();
  const drawerTitle = ref<string>(t('common.form.new'));
  const emit = defineEmits(['success', 'register']);
  const rawData = ref<ApiMlFeatureDataType>(initMlFeature);
  const rightPanelSize = ref<number>(4);
  const rightPanelKey = ref<string>('datasource');
  const selectedPanelKeys = ref<string[]>(['datasource']);
  const selectedVisKeys = ref<string[]>(['stat']);
  const openVisKeys = ref<string[]>([]);
  const infoFormRef = ref<Nullable<FormActionType>>(null);
  const dsInfo = ref<any>({
    sourceTree: [],
    selectedSource: {}, // used to show source type icon
    selectedField: ''
  });
  const datasetInfo = reactive<any>({ limit: 1000, total: '', data: [], distr: {}, kde: [], pearson: []});
  const dbTables = ref<any>({ selected: undefined });
  let statGridRefs: any = {};
  let corrGridRefs: any = {};
  const targetField = ref<any>();

  const statTableRef = ref<Nullable<TableActionType>>(null);
  const instances = {chart1:{},chart2:{}};
  const chart1Container = ref<any>();
  const chart2Container = ref<any>();
  const chart1Style = ref<any>({width: '100%', height: '365px'});
  const chart2Style = ref<any>({width: '100%', height: '365px'});

  // register transform
  echarts.registerTransform(aggregate);

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
    
    if(data.target){
      // initialize taregtField
      targetField.value = rawData.value.fields.find((el)=>el.name == data.target);
    }

    // init data
    datasetInfo.limit = 1000;
    datasetInfo.total = 0;
    datasetInfo.data = [];
    datasetInfo.dataArray = [];
    datasetInfo.dataFrame = {};
    datasetInfo.dataInfo = {};
    dbTables.value = { selected: undefined };
  });

  // distribution chart containers
  const setKdeGridRef = (el) => {
    if (el && rawData.value.fields) {
      for (let field of rawData.value.fields) {
        if (el.id == field.name) {
          field.container = el;
          statGridRefs[el.id] = el;
          break;
        }
      }
    }
  };

  // scatter chart containers
  const setScatterGridRef = (el) => {
    if (el && rawData.value.relPair) {
      for (let item of rawData.value.relPair) {
        if (el.id == 'scatter_'+item.id) {
          item.container = el;
          corrGridRefs[el.id] = el;
          break;
        }
      }
    }
  };
  

  /*
  * build field tree with cagegory
  */
  const fieldTreeList = computed(() => {
    // grouped fieldTree
    const fieldTree = [
      {
        id: 1000,
        name: 'Continuous Fields',
        category: 'continuous',
        draggable: false,
        selectable: false,
        isLeaf: false,
        children: []
      },
      {
        id: 2000,
        name: 'Discrete Fields',
        category: 'discrete',
        draggable: false,
        selectable: false,
        isLeaf: false,
        children: []
      },
      {
        id: 3000,
        name: 'Datetime Fields',
        category: 'datetime',
        draggable: false,
        selectable: false,
        isLeaf: false,
        children: []
      },
      {
        id: 4000,
        name: 'Coordinate Fields',
        category: 'coordinate',
        draggable: false,
        selectable: false,
        isLeaf: false,
        children: []
      },
      {
        id: 5000,
        name: 'Insignificant Fields',
        category: 'insignificant',
        draggable: false,
        selectable: false,
        isLeaf: false,
        children: []
      }
    ];

    let filteredFields = [];
    // group fields based on category and sort by name
    if (rawData.value.fields && rawData.value.fields.length>0) {
      filteredFields = rawData.value.fields.filter((el)=>el.category=='continuous' && el.disabled==undefined);
      filteredFields.sort((a,b)=>a.name.localeCompare(b.name));
      fieldTree[0].children = filteredFields;

      filteredFields = rawData.value.fields.filter((el)=>el.category=='discrete' && el.disabled==undefined);
      filteredFields.sort((a,b)=>a.name.localeCompare(b.name));
      fieldTree[1].children = filteredFields;

      filteredFields = rawData.value.fields.filter((el)=>el.category=='datetime' && el.disabled==undefined);
      filteredFields.sort((a,b)=>a.name.localeCompare(b.name));
      fieldTree[2].children = filteredFields;

      filteredFields = rawData.value.fields.filter((el)=>el.category=='coordinate' && el.disabled==undefined);
      filteredFields.sort((a,b)=>a.name.localeCompare(b.name));
      fieldTree[3].children = filteredFields;

      filteredFields = rawData.value.fields.filter((el)=>el.disabled==true);
      filteredFields.sort((a,b)=>a.name.localeCompare(b.name));
      fieldTree[4].children = filteredFields;
    }

    // add count to category name
    fieldTree[0].name = 'Continuous Fields (' + fieldTree[0].children.length + ')';
    fieldTree[1].name = 'Discrete Fields (' + fieldTree[1].children.length + ')';
    fieldTree[2].name = 'Datetime Fields (' + fieldTree[2].children.length + ')';
    fieldTree[3].name = 'Coordinate Fields (' + fieldTree[3].children.length + ')';
    fieldTree[4].name = 'Insignificant Fields (' + fieldTree[4].children.length + ')';
    return fieldTree;
  });

  /*
  * distribution fields
  */
  const statFieldList = computed(() => {
    let filteredFields = [];
    let statFields = [];
    if (rawData.value.fields && rawData.value.fields.length>0) {
      filteredFields = rawData.value.fields.filter((el)=>el.category=='continuous' && el.disabled==undefined);
      filteredFields.sort((a,b)=>a.name.localeCompare(b.name));
      statFields = filteredFields;

      filteredFields = rawData.value.fields.filter((el)=>el.category=='discrete' && el.disabled==undefined);
      filteredFields.sort((a,b)=>a.name.localeCompare(b.name));
      statFields = [...statFields, ...filteredFields];

      filteredFields = rawData.value.fields.filter((el)=>el.category=='datetime' && el.disabled==undefined);
      filteredFields.sort((a,b)=>a.name.localeCompare(b.name));
      statFields = [...statFields, ...filteredFields];
    }
    return statFields;
  });

  /*
   * update charts when target field is changed
   */
  watch(()=>rawData.value.target, (newVal, oldVal) => {
    if(newVal && datasetInfo.distr[newVal]){
      for(const dataField of fieldTreeList.value[0].children){
        // build classified kde
        buildCKdeData(datasetInfo.dataFrame, dataField, targetField.value);
      }
      for(const dataField of fieldTreeList.value[1].children){
        // build classified bar
        buildCBarData(datasetInfo.dataFrame,datasetInfo.distr[dataField.name].rank,dataField, targetField.value);
      }
    }
    
    if(datasetInfo.pearson?.length>0){
      // render chart when there is data
      if(selectedVisKeys.value[0] == 'kdebar'){
        renderKdes();
        renderBars();
      } else if(selectedVisKeys.value[0] == 'pairwise'){
        renderPairwise();
      } else if(selectedVisKeys.value[0] == 'scatter'){
        for(const rel of rawData.value.relPair){
          renderScatter(rel);
        }
      } else if(selectedVisKeys.value[0] == 'andrews'){
        renderAndrewsCurve();
      } else if(selectedVisKeys.value[0] == 'parallel'){
        renderParallelCurve();
      } else if(selectedVisKeys.value[0] == 'pca'){
        renderPca();
      } 
    }
  }, { deep: true });

  /*
   * show different color for different categories
   */
  const tableRowColor = (record: any, index: number) =>{
    if(record.disabled==true){
      return null;
    }
    switch(record.category){
      case 'discrete':{
        return 'table-discrete';
      }
      case 'datetime':{
        return 'table-datetime';
      }
      case 'coordinate':{
        return 'table-coordinate';
      }
      default: {
        return null;
      }
    }
  };

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
  * build datasource tree after get source list for datasource form
  */
  const buildSourceTree = (data) => {
    // save source tree
    dsInfo.value.sourceTree = data.records;

    let isFound = false;
    for (let node of data.records) {
      // first level is group name. it is not selectable
      node.selectable = false;
      for (let sub of node.children) {
        // child is datasource name
        sub.selectable = true;
        if (rawData.value.sourceId!=undefined && sub.id == rawData.value.sourceId) {
          // find current datasource to show
          isFound = true;
        }
      }
    }

    if (rawData.value.sourceId!=undefined && !isFound) {
      // sourceId is defined but can't be found in response
    message.error(t('dataviz.dataset.error.sourceMiss'));
    rawData.value.sourceId = -1;
    }

    return data;
  };

  /*
   * get source name when source is changed
   */
  const handleSourceChange = (key: any) => {
    // find selected source in tree
    for (const node of dsInfo.value.sourceTree) {
      for (const sub of node.children) {
        if (sub.id == key) {
          // find selected source
          // its type will be used to show an icon
          rawData.value.sourceName = sub.name;
          dsInfo.value.selectedSource = sub;
          return;
        }
      }
    }
  };

  /*
   * get fields when dataset selection change
   */
   const handleDatasetChange = (key: string) => {
    if(key && key.length>0){
      // key is table name
      API_DATASOURCE_FIELDS(rawData.value.sourceId, key).then((response) => {
        if(response.records.length==0){
          rawData.value.fields = [];
          return;
        }
        // merge received data fields with rawData.fields
        const fieldCfg = cloneDeep(unref(rawData).fields);
        rawData.value.fields = mergeConfig(response.records, fieldCfg);
      });
    }
  };

  /*
   * drop a field to different category or put it on a scatter panel
   */
   const handleDropEnd = (ev: AntTreeNodeDropEvent) => {
    if (ev) {
      // get view id from event
      const dragId = ev.dragNodesKeys[0];
      const dragField = rawData.value.fields.find((el)=>el.id == dragId);
      if(ev.node.category == 'insignificant'){
        delete dragField.category;
        dragField.disabled = true;
      } else {
        dragField.category = ev.node.category;
      }
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
    if(menu.key == 'query'){
      rightPanelSize.value = 6;
    } else {
      rightPanelSize.value = 4;
    }
  };

  /*
  * add a field to scatter panel when double click
  */
  const handleClickAdd = (ev: any) => {
    const fieldName = ev.currentTarget.innerText;
    const field = rawData.value.fields.find((el)=>el.name == fieldName);
    if(field.disabled || field.category!='continuous'){ return; }
    
    let idx = rawData.value.relPair?.length;
    if(idx == 0 || rawData.value.relPair[idx-1].fields?.length > 1){
      // add a new pair and wait for the second field to show scatter
      rawData.value.relPair.push({
        id: idx==0?0:rawData.value.relPair[idx-1].id+1,
        fields: [fieldName]
      });
    } else {
      // show scatter when second field is added
      rawData.value.relPair[idx-1].fields?.push(fieldName);
      nextTick(() => {
        renderScatter(rawData.value.relPair[idx-1]);
      });
      
    }
  }


  /*
  * show different chart when click different vis option
  */
  const handleVisSwitch = (menu: any) => {
    if(menu.key == 'kdebar'){
      nextTick(() => {
        renderKdes();
        renderBars();
      });
    } else if(menu.key == 'boxplot'){
      nextTick(() => {
        renderBoxes(datasetInfo.dataFrame, rawData.value.fields);
      });
    } else if(menu.key == 'allkdes'){
      nextTick(() => {
        renderAllKdes();
      });
    } else if(menu.key == 'pairwise'){
      nextTick(() => {
        renderPairwise();
      });
    } else if(menu.key == 'pearson'){
      nextTick(() => {
        renderPearsonMatrx();
      });
    } else if(menu.key == 'parallel'){
      nextTick(() => {
        renderParallelCurve();
      });
    } else if(menu.key == 'andrews'){
      nextTick(() => {
        renderAndrewsCurve();
      });
    } else if(menu.key == 'pca'){
      nextTick(() => {
        renderPca();
      });
    } else if(menu.key == 'lda'){
      nextTick(() => {
        renderImportanceBar();
      });
    }else if(menu.key == 'trend'){
      nextTick(() => {
        renderTrendCurve();
      });
    } else if(menu.key == 'scatter'){
      nextTick(() => {
        for(const rel of rawData.value.relPair){
          renderScatter(rel);
        }
      });
    } 
  };

  /*
  * show one sub menu only when menu is changed
  */
  const handleVisChange = (openKeys: string[]) => {
    const latestOpenKey = openKeys.find(key => openVisKeys.value.indexOf(key) === -1);
    openVisKeys.value = latestOpenKey ? [latestOpenKey] : [];
  };

  /*
  * show target icon in field list
  */
  const fieldActions: TreeActionItem[] = [
  {
      render: (node) => {
        if(node.isLeaf==undefined || node.isLeaf==true){
          return h(AimOutlined, {
            class: 'ml-2',
            onClick: () => {
              let previousTargetName = undefined;
              if(targetField.value){
                // remove previous target field
                previousTargetName = targetField.value.name;
                delete targetField.value.target;
                delete rawData.value.target;
                delete targetField.value.class;
                targetField.value = undefined;
              }

              // find taregt field
              let rawField = rawData.value.fields.find((el)=>el.id == node.id);
              if(!previousTargetName || previousTargetName != rawField.name){
                rawField.target = true;
                rawData.value.target = rawField?.name;
                targetField.value = rawField;
                extractTargetClass(datasetInfo.dataInfo);
              }
            }
          });
        }
      }
    }
  ];

  /*
   * format sql query
   * "mysql" | "bigquery" | "db2" | "hive" | "mariadb" | "n1ql" | "plsql" | "postgresql" |
   * "redshift" | "singlestoredb" | "snowflake" | "spark" | "sql" | "sqlite" | "transactsql" |
   * "trino" | "tsql"
   * the sql should match the datasource type
   * when you connect to MySQL or Mariadb you should use mysql language to query data
   * so here the datasource type is used to format the query string by default
   */
  function formatQuery() {
    const sqlLanguage = dsInfo.value.selectedSource.type.toLowerCase();
    rawData.value.query = format(rawData.value.query, {
      language: sqlLanguage,
      tabWidth: 2,
      keywordCase: 'upper',
    });
  }

  /*
   * run sql query to get data
   */
  const execute = () => {
    let sqlString = '';
    if(rawData.value.query?.length>0){
      // custom query
      sqlString = rawData.value.query;
    } else if(rawData.value.datasetName.length>0){
      // get dataset
      sqlString = 'select * from ' + rawData.value.datasetName;
    } else {
      return;
    }
    
    // pass variables to backend for checking and replacement
    // backend also can handle variable replacement
    API_DATASOURCE_EXECUTE(
      rawData.value.sourceId,
      sqlString,
      null,
      null,
      datasetInfo.limit,
    ).then((response) => {
      datasetInfo.total = response.total; // total records
      datasetInfo.dataArray = response.records; // data array
      const columnNames = response.metadata.map((it)=>it.name);
      datasetInfo.dataFrame = new DataFrame(response.records, {columns: columnNames}); // dataframe for getting rows or columns easily
      datasetInfo.dataInfo = datasetInfo.dataFrame.info(); // statistics info
      datasetInfo.data = buildRecords(response.records, response.metadata); // json data

      // merge received data fields with rawData.fields
      rawData.value.fields = mergeConfig(response.metadata, rawData.value.fields);
      // add statistics info to field config
      addStatsToFieldCfg(datasetInfo.dataFrame.info(), rawData.value.fields);
      // get classes if target is discrete
      extractTargetClass(datasetInfo.dataInfo);
      // update table view
      statTableRef.value.setTableData(rawData.value.fields);
      // analysize orignal data to get basic chart data
      analysizeRawData(datasetInfo.dataFrame, datasetInfo.dataInfo, rawData.value.fields);
    });
  };


  /*
   * build records based on received data
   */
   const buildRecords = (records: any[], columns: any[]) => {
    // convert 2 dimensional array([[]]) to json array([{}]) for table to show
    let jsonArray: any[] = [];
    for (let i = 0; i < records.length; i++) {
      let dt = {};
      for (let j = 0; j < columns.length; j++) {
        dt[columns[j].name] = records[i][j];
      }
      jsonArray.push(dt);
    }
    return jsonArray;
  };

  /*
   * merge field configs
   */
   const mergeConfig = (metadata: any[], fieldCfg: any[]) => {
    const mergedCfg: any[] = [];

    for (let item of metadata) {
      let newItem = {};
      if (fieldCfg && fieldCfg.length>0) {
        // find previous user config
        newItem = fieldCfg.find((ele) => {
          return ele.name.toLowerCase() == item.name.toLowerCase();
        });
      } else {
        newItem = {id: item.id, name: item.name, type: item.type};
        if (
          item.name.toLowerCase() == 'id' ||
          item.name.toLowerCase() == 'pid' ||
          item.name.toLowerCase() == 'cid' ||
          item.name.toLowerCase() == 'uid' ||
          item.name.toLowerCase() == 'idx' ||
          item.name.toLowerCase() == 'index' ||
          item.name.toLowerCase().indexOf('_id')>0
        ){
          // disable it if it is a id
          newItem.disabled = true;
        }
        // detect category
        if (item.type == 'boolean' || item.type == 'string'){
          newItem.category = 'discrete';
        } else if (item.type == 'timestamp'){
          newItem.category = 'datetime';
        } else if (item.type == 'numberxxxxxx'){
          newItem.category = 'coordination';
        } else if (item.type == 'number'){
          newItem.category = 'continuous';
        } 
      }

      // update data index
      newItem.dataIdx = item.id;
      mergedCfg.push(unref(newItem));
    }
    
    // sort by name
    //mergedCfg.sort((a,b)=>a.name.localeCompare(b.name));
    return mergedCfg;
  };

  /*
  * add statistics info to field config
  */
  const addStatsToFieldCfg = (statInfo: any[], fieldCfg: any[]) => {
    // add statistics info to fields config
    for(const field of fieldCfg){
      const stats = statInfo[field.dataIdx];
        
      field.count = stats.count;
      field.distinct = stats.distinct;
      field.missing = stats.missing;
      field.suggestedType = stats.recommendation;

      if(stats.variance!=undefined) {
        // continuous fields
        if(stats.recommendation == 'boolean'){
          // for example: numeric record(0,1,1,1,1,0,0,1,1,1,0)
          // set the field to discrete if it is suggested to boolean
          field.category = 'discrete';
        } else {
          field.zeros = stats.zeros;
          field.min = stats.minimum;
          field.max = stats.maximum;
          field.mean = Number(stats.mean.toFixed(3));
          field.pct5 = Number(stats.percentile5.toFixed(3));
          field.pct25 = Number(stats.percentile25.toFixed(3));
          field.median = Number(stats.percentile50.toFixed(3));
          field.pct75 = Number(stats.percentile75.toFixed(3));
          field.pct95 = Number(stats.percentile95.toFixed(3));
          field.stdDev = Number(stats.standardDeviation.toFixed(3));
          field.variance = Number(stats.variance.toFixed(3));
        }
      }   
    }
  };

  /*
  * extract target classes
  */
  const extractTargetClass = (dataInfo: any) =>{
    if(targetField.value?.category=='discrete' && dataInfo){
      // get all classes of discrete field
      targetField.value.class = [];
      const targetInfo = dataInfo.find((el)=>el.name == targetField.value?.name);
      Object.keys(targetInfo.valueMap).forEach((key) => {
        targetField.value.class.push(key);
      });
    }
  };


  /*
  * analysize data
  */
  const analysizeRawData = (dataFrame: any, dataInfo: any, fieldCfg: any[]) => {
    // cleanup old data
    datasetInfo.distr = {};
    datasetInfo.allKdes = [];

    for(let i=0; i<fieldCfg.length; i++){
      const rowField = fieldCfg[i];

      // build KDE data for continuous fields
      buildKdeData(dataFrame, rowField, targetField.value);

      // build Rank data for discrete fields
      buildRankBarData(dataFrame, dataInfo, rowField, targetField.value);

      // pairwise with first 8 fields
      if(rowField.category == 'continuous'){
        const pairwiseFields = fieldCfg.filter((el)=>el.pairwise);
        if(!pairwiseFields || pairwiseFields.length<8){
          // display pairwise matrix with 8 fields at most
          rowField.pairwise = true;
        }
      }
    }

    // trigger computed field
    fieldCfg.push({});
    fieldCfg.pop();

    // calculate pearson coefficient for corr matrix displaying
    calPearsonCoeff(dataFrame, fieldCfg);

    // calculate andrews cvrve
    calAndrewsData(dataFrame, fieldCfg);

    // PCA matrix
    calPcaMatrix(dataFrame, fieldCfg);

    // decision tree
    //calFeatureImportance(dataFrame, fieldCfg);

    buildTrendData(dataFrame, dataInfo, fieldCfg);
  };

  /*
  * build single KDE data for continuous field
  * build classified KDE if target is defined
  */
  const buildKdeData = (dataFrame: any, fieldCfg: any, targetField: any) => {
    // return if it is not continuous field
    if(fieldCfg.category != 'continuous' || fieldCfg.disabled){return;}
    
    if(!datasetInfo.distr[fieldCfg.name]){
      // initialize kde data
      datasetInfo.distr[fieldCfg.name] = {sKde: [], cKde: []}; // single kde and classified kde
    }

    if(!datasetInfo.distr[fieldCfg.name].sKde || datasetInfo.distr[fieldCfg.name].sKde.length==0){
      datasetInfo.distr[fieldCfg.name].sKde = [];
      // get field data
      const fieldData = dataFrame.getByColumn(fieldCfg.name).data;
      // build json data for function transform()
      // value must be number, otherwise transform() will throw exception
      const fieldJsonData = fieldData.map((it)=>({v: it}));
      // create new data view
      const dv = new DataView().source(fieldJsonData);
          
      // calculate KDE (Kernel Density Estimates）
      dv.transform({
        type: 'kernel-smooth.regression',
        fields: ['v'],
        method: 'gaussian', // cosine, epanechnikov, gaussian, quartic, triangular, tricube, triweight, uniform
        as: ['x', 'y'], 
      });

      // round value and convert to number
      dv.transform({
        type: 'map',
        callback(row) {
          //if(row.x!=null){
            // round value (toFixed() return a string)
            //x = Number(row.x.toFixed(2)); 
          //}
          const x = Number(row.x.toFixed(2)); 
          const y = Number((row.y*100).toFixed(4)); // density(%)
          const name = fieldCfg.name;
          datasetInfo.distr[fieldCfg.name].sKde.push([x,y,name]); // data array
          return row;
        },
      });

      // combined kdes (data array) 
      datasetInfo.allKdes = [...datasetInfo.allKdes, ...datasetInfo.distr[fieldCfg.name].sKde];  
    }

    // build classified kde 
    buildCKdeData(dataFrame, fieldCfg, targetField);
  };

  /*
  * build classified KDE data for continuous field when target is defined
  */
  const buildCKdeData = (dataFrame: any, fieldCfg: any, targetField: any) => {
    // return if it is not continuous field
    if(fieldCfg.category != 'continuous' || fieldCfg.disabled){return;}
    // return if target field is not discrete
    if(!targetField || targetField.category!='discrete'){return;}
    datasetInfo.distr[fieldCfg.name].cKde = [];
    let fieldKdeData = [];

    // get two columns data (field and target)
    const fieldsData = dataFrame.get('0:1000000',[fieldCfg.name, targetField.name]).data;
    // build json data for function transform()
    // value must be number, otherwise transform() will throw exception
    const fieldsJsonData = fieldsData.map((it)=>({v: it[0], t:it[1]}));
    const dv = new DataView().source(fieldsJsonData);
    // group values by target
    dv.transform({
      type: 'partition',
      groupBy: ['t'], // group by target
    });

    // every row has a group data
    for(const cat in dv.rows){
      const subDv = new DataView().source(dv.rows[cat]);
      // calculate KDE (Kernel Density Estimates）for every category
      subDv.transform({
        type: 'kernel-smooth.regression',
        fields: ['v'],
        method: 'gaussian', // cosine, epanechnikov, gaussian, quartic, triangular, tricube, triweight, uniform
        as: ['x', 'y'], 
      });

      for(let row of subDv.rows){
        row['cat'] = cat.substring(1); // category name

        // round value
        if(row.x!=null){
          row.x = Number(row.x.toFixed(2)); 
        }
        row.y = Number((row.y*100).toFixed(4)); // density(%)
      }
      fieldKdeData = [ ...fieldKdeData, ...subDv.rows ];
    }

    // classified kde (data array)
    datasetInfo.distr[fieldCfg.name].cKde = fieldKdeData;
  };

  /*
  * build Rank bar data for discrete fields
  */
  const buildRankBarData = (dataFrame: any, dataInfo: any, fieldCfg: any, targetField: any) => {
    if(fieldCfg.category != 'discrete' && fieldCfg.category != 'datetime'){return;}
    if(!datasetInfo.distr[fieldCfg.name]){
      // initialize rank data
      datasetInfo.distr[fieldCfg.name] = {rank: []};
    }

    const dtInfo = dataInfo.find((el)=>el.name==fieldCfg.name);
    const rankData = [];
    if(!datasetInfo.distr[fieldCfg.name].rank || datasetInfo.distr[fieldCfg.name].rank.length==0){
      Object.keys(dtInfo.valueMap).forEach((key) => {
        // build data array based on valueMap which has value's count
        rankData.push([key, dtInfo.valueMap[key]]);
      });
      // 2d array (col0: name, col1: total, 2~n: cnt per class)
      datasetInfo.distr[fieldCfg.name].rank = rankData;
    }
    
    // build classified bars
    buildCBarData(dataFrame, rankData, fieldCfg, targetField);
  }


  /*
  * build classified bar data for discrete fields
  */
  const buildCBarData = (dataFrame: any, rankData: any, fieldCfg: any, targetField: any) => {
    if(fieldCfg.category != 'discrete' && fieldCfg.category != 'datetime'){return;}
    if(!targetField || targetField.category!='discrete'){return;}
    if(targetField.name == fieldCfg.name){return;}

    // get two columns data (field and target)
    const fieldsData = dataFrame.get('0:1000000',[fieldCfg.name, targetField.name]).data;
    const fieldsJsonData = fieldsData.map((it)=>({c: it[0], t:it[1]}));
    const dv = new DataView().source(fieldsJsonData);
    dv.transform({
      type: 'aggregate',
      fields: ['c'],
      operations: ['count'],
      as: ['cnt'],
      groupBy: ['c','t'],
    });

    for(const row of rankData){
      for(const cls of targetField.class){
        // convert el.c and el.t to string then compare
        // because maybe they are bool or number
        const groupData = dv.rows.find((el)=>String(el.c)==row[0]&&String(el.t)==cls);
        if(groupData!=undefined){
          // add cnt per class to a row after col total
          row.push(groupData.cnt);
        } else {
          row.push(0);
        }      
      }
    }
  };

  /*
  * calculate pearson coeff to show corellation matrx
  */
  const calPearsonCoeff = (dataFrame: any, fieldsCfg: any[]) => {
    if(!datasetInfo.pearson){
      // initialize pearson matrix
      datasetInfo.pearson = [];
    }

    // calculate pearson coefficient for corr matrix displaying
    const continuousFields = fieldsCfg.filter((el)=>el.category=='continuous'&&el.disabled==undefined);
    const cfNames = continuousFields.map((el)=>el.name);

    for(let i=0; i<cfNames.length; i++){
      const rowData = dataFrame.getByColumn(cfNames[i]);
      for(let j=0; j<=i; j++){
        if(cfNames[i] == cfNames[j]){
          // same field
          datasetInfo.pearson.push([i, j, 1]);
        } else {
          const colData = dataFrame.getByColumn(cfNames[j]);
          // calculate pearson coefficient
          const coefficient = pearson(rowData.data, colData.data);
          // pearson data (array)
          datasetInfo.pearson.push([i, j, Number(coefficient.toFixed(2))]);
        }
      }
    }
  };

  /*
  * calculate data for andrews curve
  * https://pandas.pydata.org/docs/reference/api/pandas.plotting.andrews_curves.html
  */
  const calAndrewsData = (dataFrame: any, fieldCfg: any[]) => {
    const continuousFields = fieldCfg.filter((el)=>el.category=='continuous'&&el.disabled==undefined);
    datasetInfo.andrews = [];
    const sqrt2 = 1.4142;

    // andrews curve
    for(let n=0; n<dataFrame.data.length; n++){
      const record = dataFrame.data[n];
      // range [-PI, +PI], step: PI/4
      let newRecord = [];
      for(let i=-4; i<5; i++){
        let andrewsValue = 0; 
        const xPi = Math.PI*(i/4);
        for(let j=0; j<continuousFields.length; j++){
          const currField = continuousFields[j];
          const fieldValue = record[currField.dataIdx];
          const xt = Math.ceil(j/2)*xPi;
          // Max-Min standardization (normalization)
          // map data to [0, 1]
          const normalizedValue = (fieldValue-currField.min)/(currField.max-currField.min);
          if(j==0){
            andrewsValue = normalizedValue/sqrt2;
          } else if(j%2==1) {
            andrewsValue += normalizedValue*Math.sin(xt);
          } else {
            andrewsValue += normalizedValue*Math.cos(xt);
          }
        }

        newRecord.push(andrewsValue);
      }

      // data array
      datasetInfo.andrews.push(newRecord);
    }
  };

  /*
  * calculate PCA matrix
  */
  function calPcaMatrix(dataFrame: any, fieldsCfg: any[]) {
    datasetInfo.pca = {pct: [], d2d3: []};
    const continuousFields = fieldsCfg.filter((el)=>el.category=='continuous'&&el.disabled==undefined);
    const cfNames = continuousFields.map((el)=>el.name);
    let featureMatrix = dataFrame.get('0:1000000', cfNames).data;
    const df = new DataFrame(featureMatrix);
    let transMatrix = df.colData;

    /*
    for(const field of continuousFields){
      // get data of all continuous fields and do standardization(z-score)
      const fieldData = dataFrame.getByColumn(field.name).data;
      
      //const statInfo = jStat(fieldData);
      const zScoreData = [];
      const dfField = dfInfo.find((el)=>el.name == field.name);
      for(const fieldValue in fieldData){
        //const zScore = statInfo.zscore(fieldValue);
        const zScore = (fieldValue-dfField.mean)/dfField.standardDeviation;
        zScoreData.push(zScore);
      }
      

      // do we need to do z-score??? - Gavin
      transMatrix.push(fieldData);
    }
    // Transpose data array
    featureMatrix = transMatrix[0].map((col, i) => transMatrix.map(row => row[i]));
    */

    // PCA analysis
    const pca = new PCA(featureMatrix);

    // get importance of PCAs to display
    const pcaVars = pca.getExplainedVariance();
    datasetInfo.pca.pct = pcaVars.map((ele, index) => { return {name: 'PC'+index, value: Number((ele*100).toFixed(1))}});
    for(let i=datasetInfo.pca.pct.length-1; i>=0; i--){
      // remove it if the importance is too small
      if(datasetInfo.pca.pct[i].value < 1){
        datasetInfo.pca.pct.splice(i, 1);
      }
    }

    // get eigen value and vectors
    const eigValues = pca.getEigenvalues();
    const eigVectors = pca.getEigenvectors();
    // sort eig values and get largest 2
    //const indices = [...eigValues.keys()].sort((a, b) => eigValues[b] - eigValues[a]);

    if(datasetInfo.pca.pct.length>1){
      // get largest 3 (should be the first 3. Should sort them if not)
      let selectedEig = [];
      for(let i=0; i<datasetInfo.pca.pct.length && i<3; i++){
        // put pc0, pc1 and pc2 into Eig
        selectedEig.push(eigVectors.data.map(col => col[i]));
      }
      // map original features to 2 dim
      const pcaData = jStat(selectedEig).multiply(transMatrix).toArray();
      // Transpose data array
      datasetInfo.pca.d2d3 = pcaData[0].map((col, i) => pcaData.map(row => row[i]));
    }
  };

  /*
  * build trend data for datetime fields
  */
  function buildTrendData(dataFrame: any, dataInfo: any, fieldsCfg: any[]) {
    datasetInfo.tsTrends = {};
    datasetInfo.tsBars = {};
    const tsFields = fieldsCfg.filter((el)=>el.category=='datetime'&&el.disabled==undefined);
    if(!tsFields){return;}

    const continuousFields = fieldsCfg.filter((el)=>el.category=='continuous'&&el.disabled==undefined);
    const disFields = fieldsCfg.filter((el)=>el.category=='discrete'&&el.disabled==undefined);
    for(const tsField of tsFields){
      for(const csField of continuousFields){
        // get field data
        const fieldData = dataFrame.get('0:1000000', [tsField.name, csField.name]).data;
        // build json data for function transform()
        // value must be number, otherwise transform() will throw exception
        const fieldJsonData = fieldData.map((it)=>({t: it[0], v: it[1]}));
        // create new data view
        const dv = new DataView().source(fieldJsonData);
            
        // calculate KDE (Kernel Density Estimates）
        dv.transform({
          type: 'aggregate',
          fields: ['v'],
          operations: ['mean'], // sum or mean or count or median
          as: ['v'], 
          groupBy: ['t']
        });
        const subDv = new DataView().source(dv.rows);
        subDv.transform({
          type: 'sort-by',
          fields: ['t'],
          order: 'ASC',
        });

        const newRec = [csField.name];
        newRec.push(...subDv.rows.map((el)=>el.v));
        if(!datasetInfo.tsTrends[tsField.name]){
          datasetInfo.tsTrends[tsField.name] = [];
          const header = ['name'];
          header.push(...subDv.rows.map((el)=>el.t));
          datasetInfo.tsTrends[tsField.name].push(header);
        }
        datasetInfo.tsTrends[tsField.name].push(newRec);
      }

      for(const disField of disFields){
        // get field data
        const fieldData = dataFrame.get('0:100000', [tsField.name, disField.name]).data;
        // build json data for function transform()
        // value must be number, otherwise transform() will throw exception
        const fieldJsonData = fieldData.map((it)=>({t: it[0], c: it[1]}));
        // create new data view
        const dv = new DataView().source(fieldJsonData);
            
        // calculate discrete count
        dv.transform({
          type: 'aggregate',
          fields: ['c'],
          operations: ['count'], 
          as: ['v'], 
          groupBy: ['t']
        });
        const subDv = new DataView().source(dv.rows);
        subDv.transform({
          type: 'sort-by',
          fields: ['t'],
          order: 'ASC',
        });

        const newRec = [disField.name];
        newRec.push(...subDv.rows.map((el)=>el.v));
        if(!datasetInfo.tsBars[tsField.name]){
          datasetInfo.tsBars[tsField.name] = [];
          const header = ['name'];
          header.push(...subDv.rows.map((el)=>el.t));
          datasetInfo.tsBars[tsField.name].push(header);
        }
        datasetInfo.tsBars[tsField.name].push(newRec);
      }
    }
  }

  /*
  * get feature importance by random forest classifier
  */
  function calFeatureImportance(dataFrame: any, fieldCfg: any[]) {
    datasetInfo.featureImp = [];
    if(targetField.value){
      const options = {
        seed: 3,
        maxFeatures: 0.8,
        replacement: true,
        nEstimators: 25
      };

      const continuousFields = fieldCfg.filter((el)=>el.category=='continuous'&&el.disabled==undefined);
      datasetInfo.featureImp = continuousFields.map((el)=>{return {name: el.name, value: 0};});
      const cfNames = continuousFields.map((el)=>el.name);
      let featureMatrix = dataFrame.get('0:100000', cfNames).data;
      let targetMatrix = dataFrame.get('0:100000', targetField.value.name).data;

      // convert target name to numerical code
      const targetNames = targetField.value.class;
      // Transpose
      const trainSet = featureMatrix; //transMatrix[0].map((col, i) => transMatrix.map(row => row[i]));
      const targetSet = targetMatrix.map((el)=>[targetNames.indexOf(el[0])]); //targetCodes.map((v) => [v]);

      // run RandomForest Classifier to get feature importance
      const classifier = new RFClassifier(options);
      classifier.train(trainSet, targetSet);
      const fImportance = classifier.featureImportance();

      for(let i=0; i<fImportance.length; i++){
        // convert importance to percent
        datasetInfo.featureImp[i].value = Number((fImportance[i]*100).toFixed(2));
      }
      for(let i=datasetInfo.featureImp.length-1; i>=0; i--){
        if(datasetInfo.featureImp[i].value < 1){
          // ignore the feature if its importance is less than 1%
          datasetInfo.featureImp.splice(i, 1);
        }
      }

      // sort importance
      datasetInfo.featureImp.sort((a, b) => b.value - a.value);
    }
  }

   /*
  * calculate category data for distribution charts
  */
  function calCategoryData(catName: any, dataField: any) {
    if(!catName){
      return;
    }
    if(!datasetInfo.distr[dataField.name]){
      datasetInfo.distr[dataField.name] = {sKde: [], cKde: []};
    } else {
      datasetInfo.distr[dataField.name].cKde = [];
    }
    
    if(!datasetInfo.data || datasetInfo.data.length==0){
      return;
    }

    let fieldKdeData = [];
    const dvs = new DataView().source(datasetInfo.data);
    dvs.transform({
      type: 'partition',
      groupBy: [catName], 
    });

    for(const cat in dvs.rows){
      const subDv = new DataView().source(dvs.rows[cat]);
      // KDE (Kernel Density Estimates）
      subDv.transform({
        type: 'kernel-smooth.regression',
        fields: [dataField.name],
        method: 'gaussian', // cosine, epanechnikov, gaussian, quartic, triangular, tricube, triweight, uniform
        as: ['x_point', 'density'], 
      });

      for(let row of subDv.rows){
        row['category'] = cat.substring(1);

        // round value
        if(row.x_point!=null){
          row.x_point = row.x_point.toFixed(2); 
        }
        row.density = Number((row.density*100).toFixed(3)); // density(%)
      }
      fieldKdeData = [ ...fieldKdeData, ...subDv.rows ];
    }
    const extDv = new DataView().source(fieldKdeData);
    // sort data
    extDv.transform({
        type: 'sort-by',
        fields: ['x_point'],
        order: 'ASC',
      });
    datasetInfo.distr[dataField.name].cKde = extDv.rows;
  };

  const chartCleanup = (fields: any[]) =>{
    if(fields instanceof Array){
      // kdes and bars
      for(const field of fields){
        try {
          if(field.instance && field.instance.destroy instanceof Function){
            field.instance.destroy();
          }
          if(field.instance && field.instance.dispose instanceof Function){
            field.instance.dispose();
          }
          
        } catch (e) {
        //
        } finally {
          if(field.container?.innerHTML){
            field.container.innerHTML = '';
          field.instance = null;
          }
        }
      }
    } else if (fields) {
      // scatters
      try {
        if(fields.instance && fields.instance.destroy instanceof Function){
          fields.instance.destroy();
        }
        if(fields.instance && fields.instance.dispose instanceof Function){
          fields.instance.dispose();
        }
        
      } catch (e) {
      //
      } finally {
        fields.container.innerHTML = '';
        fields.instance = null;
      }
    }

    // single chart
    try {
      if(instances.chart1 && (instances.chart1.destroy instanceof Function)){
        // for g2plot
        instances.chart1.destroy();
      }
      if(instances.chart1 && (instances.chart1.dispose instanceof Function)){
        // for echarts
        instances.chart1.dispose();
      }
      if(instances.chart2 && (instances.chart1.destroy instanceof Function)){
        instances.chart2.destroy();
      }
      if(instances.chart2 && (instances.chart1.dispose instanceof Function)){
        instances.chart2.dispose();
      }
    } catch (e) {
      //
    } finally {
      // clean it up before render
      chart1Container.innerHTML = '';
      chart2Container.innerHTML = '';
      instances.chart1 = null;
      instances.chart2 = null;
    }
  };

  /*
  * render KDE plot
  */
  const renderKdes = () => {
    const continuousFields = rawData.value.fields.filter((el)=>el.category=='continuous'&&el.disabled==undefined);
    chartCleanup(continuousFields);
    for(const field of continuousFields){
      let plotCfg = {};
      if(targetField.value){
        //classified KDE Areas
        plotCfg = cloneDeep(cKdePlotCfg);
        plotCfg.dataset[0].source = datasetInfo.distr[field.name].cKde;
        for(let i=0; i<targetField.value.class.length; i++){
          // add transform to filter data for categories and sort data
          const transformCfg = cloneDeep(cKdeTransTpl);
          transformCfg.transform[0].config.value = targetField.value.class[i];
          // add series for every category
          const seriesCfg = cloneDeep(cKdeSeriesTpl);
          seriesCfg.name = targetField.value.class[i];
          seriesCfg.datasetIndex = i+1; // point to transformed dataset

          plotCfg.dataset.push(transformCfg);
          plotCfg.series.push(seriesCfg);
        }
      } else {
        //single KDE Area
        plotCfg = cloneDeep(sKdePlotCfg);
        plotCfg.dataset.source = datasetInfo.distr[field.name].sKde;
      }
  
      // render chart
      field.instance = echarts.init(field.container);
      field.instance.setOption(plotCfg);
    }
  };

  /*
  * render ECharts
  */
  const renderBars = () => {
    const discreteFields = rawData.value.fields.filter((el)=>(el.category=='discrete' || el.category=='datetime') && el.disabled==undefined);
    chartCleanup(discreteFields);
    for(const field of discreteFields){
      let plotCfg = {};
      if(targetField.value && targetField.value.name != field.name){
        // multiple Rank Bar
        plotCfg = cloneDeep(stackedBarCfg);
        plotCfg.dataset[0].source = datasetInfo.distr[field.name].rank;  
        for(let i=0; i<targetField.value.class.length; i++){
          const seriesCfg = cloneDeep(stackedBarSeriesTpl);
          seriesCfg.encode.x = i+2;
          plotCfg.series.push(seriesCfg);
        }
      } else {
        // single Rank Bar
        plotCfg = cloneDeep(barPlotCfg);
        plotCfg.dataset[0].source = datasetInfo.distr[field.name].rank;
      }

      field.instance = echarts.init(field.container);
      field.instance.setOption(plotCfg);
    }
  };

  /*
  * render distribution merged KDE chart
  */
  const renderBoxes = (dataFrame: any, fieldCfg: any[]) => {
    chartCleanup(null);
    chart1Style.value = {width: '100%', height: '700px'};
    chart2Style.value = {width: '100%', height: '0px'};

    const continuousFields = fieldCfg.filter((el)=>el.category=='continuous'&&el.disabled==undefined);
    const cfNames = continuousFields.map((el)=>el.name);
    const plotCfg = cloneDeep(boxPlotCfg);
    for(let i=0; i<cfNames.length; i++){
      plotCfg.dataset[0].source?.push(dataFrame.get('0:100000', cfNames[i]).data);
      const transformCfg = cloneDeep(boxTransformTpl);
      transformCfg.transform.config.value = i;
      plotCfg.dataset.push(transformCfg);
      const seriesCfg = cloneDeep(boxSeriesTpl);
      seriesCfg.name = cfNames[i];
      seriesCfg.datasetIndex = seriesCfg.datasetIndex+i;
      plotCfg.series.push(seriesCfg);
    }
    plotCfg.xAxis.axisLabel.formatter = function (param) {
      return cfNames[param];
    }
    
    // render chart
    instances.chart1 = echarts.init(chart1Container.value);
    instances.chart1.setOption(plotCfg);
  }

  /*
  * render distribution merged KDE chart
  */
  const renderAllKdes = () => {
    chartCleanup(null);
    chart1Style.value = {width: '100%', height: '700px'};
    chart2Style.value = {width: '100%', height: '0px'};

    //multiple KDE Areas
    const plotCfg = cloneDeep(allKdePlotCfg);
    plotCfg.dataset[0].source = datasetInfo.allKdes;
    const continuousFields = rawData.value.fields.filter((el)=>el.category=='continuous'&&el.disabled==undefined);
    for(let i=0; i<continuousFields.length; i++){
      // add transform to filter data for categories and sort data
      const transformCfg = cloneDeep(allKdeTransTpl);
      transformCfg.transform[0].config.value = continuousFields[i].name;
      // add series for every category
      const seriesCfg = cloneDeep(allKdeSeriesTpl);
      seriesCfg.name = continuousFields[i].name;
      seriesCfg.datasetIndex = i+1; // point to transformed dataset

      plotCfg.dataset.push(transformCfg);
      plotCfg.series.push(seriesCfg);
    }
    // render chart
    instances.chart1 = echarts.init(chart1Container.value);
    instances.chart1.setOption(plotCfg);
  }

  /*
  * render Interation pariwise chart (g2plot)
  */
  const renderPairwise = () => {
    chartCleanup(null);
    chart1Style.value = {width: '100%', height: '700px'};
    chart2Style.value = {width: '100%', height: '0px'};
    
    const g2plotCfg = cloneDeep(pairPlotCfg);
    const continuousFields = statFieldList.value.filter((el)=>el.category == 'continuous');
    for(const field of continuousFields){
      if(field.pairwise){
        g2plotCfg.fields.push(field.name);
      }
    }
    g2plotCfg.data = datasetInfo.data;
    g2plotCfg.eachView = (view, facet) => {
    if (facet.rowIndex === facet.columnIndex) {
      return {
        type: 'histogram',
        options: {
          data: facet.data,
          binField: facet.columnField,
          binNumber: 30,
          stackField: targetField.value?targetField.value.name:undefined,
          isStack: true
        }
      };
    } else if (facet.rowIndex > facet.columnIndex) {
      return {
        type: 'scatter',
        options: {
          data: facet.data,
          xField: facet.columnField,
          yField: facet.rowField,
          colorField: targetField.value?targetField.value.name:undefined,
          shape: 'circle',
          size: 2,
          xAxis: {
            title: {
              style: {
                fill: "green"
              }
            }
          },
          yAxis: {
            title: {
              style: {
                fill: "green"
              }
            }
          }
        }
      };
    } else {
      return {
        type: 'scatter',
        options: {
          data: [],
          xField: facet.columnField,
          yField: facet.rowField
        }
      };
    }
  };
    
    // render chart
    instances.chart1 = new Facet(chart1Container.value, g2plotCfg);
    instances.chart1.render();
  }

  /*
  * render interation scatter plot chart
  */
  const renderScatter = (relPair: any) => {
    chartCleanup(relPair);

    const plotCfg = cloneDeep(scatterPlotCfg);
    plotCfg.xAxis.name = relPair.fields[0];
    plotCfg.yAxis.name = relPair.fields[1];
    if(targetField.value){
      plotCfg.dataset[0].source = datasetInfo.dataFrame.get('0:100000', [...relPair.fields, targetField.value.name]).data;
      plotCfg.series = [];
      for(let i=0; i<targetField.value.class.length; i++){
        const cls = targetField.value.class[i];
        const transformCfg = cloneDeep(scatterTransTpl);
        transformCfg.transform.config.value = cls;
        plotCfg.dataset.push(transformCfg);
        const seriesCfg = cloneDeep(scatterSeriesTpl);
        seriesCfg.name = cls;
        seriesCfg.datasetIndex = i+1;
        plotCfg.series.push(seriesCfg);
      }
    } else {
      plotCfg.dataset[0].source = datasetInfo.dataFrame.get('0:100000', relPair.fields).data;
    }

    // render chart
    relPair.instance = echarts.init(relPair.container);
    relPair.instance.setOption(plotCfg);
  }

  /*
  * render Correlation pearson matrx chart
  */
  const renderPearsonMatrx = () => {
    chartCleanup(null);
    chart1Style.value = {width: '100%', height: '700px'};
    chart2Style.value = {width: '100%', height: '0px'};

    const continuousFields = rawData.value.fields.filter((el)=>el.category=='continuous'&&el.disabled==undefined);
    const cfNames = continuousFields.map((el)=>el.name);
    const plotCfg = cloneDeep(pearsonMatrxiCfg);
    plotCfg.xAxis.data = cfNames;
    plotCfg.yAxis.data = cfNames;
    plotCfg.dataset.source = datasetInfo.pearson;

    // render chart
    instances.chart1 = echarts.init(chart1Container.value);
    instances.chart1.setOption(plotCfg);
  }

    /*
  * render parallel coordition curve chart
  */
  const renderParallelCurve = () => {
    chartCleanup(null);
    chart1Style.value = {width: '100%', height: '700px'};
    chart2Style.value = {width: '100%', height: '0px'};

    const continuousFields = rawData.value.fields.filter((el)=>el.category=='continuous'&&el.disabled==undefined);
    const plotCfg = cloneDeep(parallelCfg);
    plotCfg.dataset[0].source = datasetInfo.dataArray;
    plotCfg.parallelAxis = continuousFields.map((el)=>{return {dim: el.dataIdx, name: el.name, min: Math.floor(el.min), max: Math.ceil(el.max), nameLocation: 'start'};});
    if(targetField.value){
      let idx = 1;
      plotCfg.series = [];
      for(const target of targetField.value.class){
        const transformCfg = cloneDeep(parallelTransTpl);
        transformCfg.transform.config = { dimension: targetField.value.dataIdx, value: target };
        plotCfg.dataset.push(transformCfg);
        const seriesCfg = cloneDeep(parallelSeriesTpl);
        seriesCfg.name = target;
        seriesCfg.datasetIndex = idx;
        plotCfg.series.push(seriesCfg);
        idx++;
      }
    }

    instances.chart1 = echarts.init(chart1Container.value);
    instances.chart1.setOption(plotCfg);
  }

  /*
  * render andrews curve chart
  */
  const renderAndrewsCurve = () => {
    chartCleanup(null);
    chart1Style.value = {width: '100%', height: '700px'};
    chart2Style.value = {width: '100%', height: '0px'};

    const xData = [];
    const df = new DataFrame(datasetInfo.andrews);
    const dfInfo = df.info();
    for(let i=-4; i<5; i++){
      // 9 X axis
      xData.push({dim:i+4, name: (Math.PI*(i/4)).toFixed(2), nameLocation: 'start', min: Math.floor(dfInfo[i+4].minimum), max: Math.ceil(dfInfo[i+4].maximum)});
    }
    const plotCfg = cloneDeep(parallelCfg);
    plotCfg.parallelAxis = xData;
    plotCfg.dataset[0].source = datasetInfo.andrews;
    if(targetField.value){
      for(let i=0; i<datasetInfo.andrews.length; i++){
        // add target to data
        datasetInfo.andrews[i][9] = datasetInfo.dataFrame.getByIndex(i,targetField.value.dataIdx).data[0][0];
      }
      let idx = 1;
      plotCfg.series = [];
      for(const target of targetField.value.class){
        const transformCfg = cloneDeep(parallelTransTpl);
        transformCfg.transform.config = { dimension: 9, value: target };
        plotCfg.dataset.push(transformCfg);
        const seriesCfg = cloneDeep(parallelSeriesTpl);
        seriesCfg.name = target;
        seriesCfg.datasetIndex = idx;
        plotCfg.series.push(seriesCfg);
        idx++;
      }
    }

    instances.chart1 = echarts.init(chart1Container.value);
    instances.chart1.setOption(plotCfg);
  }

  const pcaD2D3Ref = ref<number>(2);
  const pcaD2D3Switch = () => {
    if(pcaD2D3Ref.value == 2){
      pcaD2D3Ref.value = 3;
    } else {
      pcaD2D3Ref.value = 2;
    }
    renderPca();
  };

  /*
  * render distribution merged KDE chart
  */
  const renderPca = () => {
    chartCleanup(null);
    chart1Style.value = {float: 'left', width: '50%', height: '700px'};
    chart2Style.value = {float: 'left', width: '50%', height: '700px'};

    let plotCfg = cloneDeep(pcaImpCfg);
    plotCfg.dataset.source = datasetInfo.pca.pct;
    instances.chart1 = echarts.init(chart1Container.value);
    instances.chart1.setOption(plotCfg);

    if(pcaD2D3Ref.value == 2){
      plotCfg = cloneDeep(pcaD2Cfg);
    } else {
      plotCfg = cloneDeep(pcaD3Cfg);
    }
    plotCfg.toolbox.feature.myToolD2D3.onclick = pcaD2D3Switch;
    plotCfg.dataset[0].source = datasetInfo.pca.d2d3;

    if(targetField.value){
      const targetColIdx = datasetInfo.pca.pct.length<3?2:3;
      for(let i=0; i<datasetInfo.pca.d2d3.length; i++){
        // add target to data
        datasetInfo.pca.d2d3[i][targetColIdx] = datasetInfo.dataFrame.getByIndex(i,targetField.value.dataIdx).data[0][0];
      }

      plotCfg.series = [];
      for(let i=0; i<targetField.value.class.length; i++){
        const targetClass = targetField.value.class[i];

        const transformCfg = cloneDeep(d2d3TransTpl);
        transformCfg.transform.config = { dimension: targetColIdx, value: targetClass };
        plotCfg.dataset.push(transformCfg);

        const seriesCfg = cloneDeep(d2d3SeriesTpl);
        seriesCfg.name = targetClass;
        seriesCfg.datasetIndex = i+1;
        if(pcaD2D3Ref.value == 3){
          seriesCfg.type = 'scatter3D';
        }
        plotCfg.series.push(seriesCfg);
      }
    }

    instances.chart2 = echarts.init(chart2Container.value);
    instances.chart2.setOption(plotCfg);
  }

  const trendAggRef = ref<string>('mean');
  const trendAggSwith = () => {
    if(trendAggRef.value == 'mean'){
      trendAggRef.value = 'median';
    } else if (trendAggRef.value == 'median'){
      trendAggRef.value = 'sum';
    } else if(trendAggRef.value == 'sum'){
      trendAggRef.value = 'count';
    } else if(trendAggRef.value == 'count'){
      trendAggRef.value = 'mean';
    }
  };

  /*
  * render ECharts
  */
  const renderTrendCurve = () => {
    const tsFields = rawData.value.fields.filter((el)=>el.category=='datetime'&&el.disabled==undefined);
    chartCleanup(tsFields);
    if(!tsFields || tsFields.length==0){return;}
    chart1Style.value = {width: '100%', height: '350px'};
    chart2Style.value = {width: '100%', height: '350px'};

    const tsField = tsFields[0];
    let plotCfg = cloneDeep(trendCurveCfg);
    plotCfg.dataset[0].source = datasetInfo.tsTrends[tsField.name];
    // xAxis can be set to 'time'
    // and data should be given to series with format [['2012-01-01', 247],['2012-01-02', 139]]
    plotCfg.toolbox.feature.myToolAgg.onclick = trendAggSwith;
    for(const continuousField of fieldTreeList.value[0].children){
      if(targetField.value){
        // multiple Rank Bar
        plotCfg = cloneDeep(stackedBarCfg);
        plotCfg.dataset[0].source = datasetInfo.distr[field.name].rank;  
        for(let i=0; i<targetField.value.class.length; i++){
          const seriesCfg = cloneDeep(stackedBarSeriesTpl);
          seriesCfg.encode.y = i+2;
          plotCfg.series.push(seriesCfg);
        }
      } else {
        // single Rank Bar
        const seriesCfg = cloneDeep(trendSeriesTpl);
        seriesCfg.name = continuousField.name;
        plotCfg.series.push(seriesCfg);
      }
    }
    instances.chart1 = echarts.init(chart1Container.value);
    instances.chart1.setOption(plotCfg);

    plotCfg = cloneDeep(tsBarPlotCfg);
    plotCfg.dataset[0].source = datasetInfo.tsBars[tsField.name];
    for(const disField of fieldTreeList.value[1].children){
      if(targetField.value){
        // multiple Rank Bar
        plotCfg = cloneDeep(tsBarPlotCfg);
        plotCfg.dataset[0].source = datasetInfo.distr[field.name].rank;  
        for(let i=0; i<targetField.value.class.length; i++){
          const seriesCfg = cloneDeep(stackedBarSeriesTpl);
          seriesCfg.encode.y = i+2;
          plotCfg.series.push(seriesCfg);
        }
      } else {
        // single Rank Bar
        const seriesCfg = cloneDeep(tsBarSeriesTpl);
        seriesCfg.name = disField.name;
        plotCfg.series.push(seriesCfg);
      }
    }
    instances.chart2 = echarts.init(chart2Container.value);
    instances.chart2.setOption(plotCfg);
  };

  /*
  * render distribution chart (single KDE and Rank bar)
  */
  const renderImportanceBar = () => {
    chartCleanup(null);
    chart1Style.value = {width: '100%', height: '700px'};
    chart2Style.value = {width: '100%', height: '0px'};

    const plotCfg = cloneDeep(pcaImpCfg);
    plotCfg.dataset.source = datasetInfo.featureImp;
    instances.chart1 = echarts.init(chart1Container.value);
    instances.chart1.setOption(plotCfg);
  }

  

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

      let clonedData = cloneDeep(unref(rawData));
      for (let item of clonedData.fields) {
        // update fields to remove unnecessary attributes of table
        delete item.id;
        delete item.dataIdx;
      }
      const features = clonedData.fields?.filter((el)=>el.disabled==undefined && el.target==undefined);
      rawData.value.features = features?.length;
      clonedData.features = features?.length;

      setDrawerProps({ confirmLoading: true });
      if (rawData.value.id) {
        API_ML_FEATURE_UPDATE(clonedData).then(() => {
          // notify parent
          emit('success', clonedData);
          message.success(t('common.tip.update'));
        });
      } else {
        API_ML_FEATURE_CREATE(clonedData).then(() => {
          // notify parent
          emit('success', clonedData);
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
