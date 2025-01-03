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
        <template #title>{{ t('ml.dataset.detail.toolbar.limit') }}</template>
        <InputNumber
          :min="0"
          :step="10"
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
        <template #title>{{ t('common.toolbar.format') }}</template>
        <ProfileTwoTone class="toolbar-button" @click="formatQuery" />
      </Tooltip>
      <Tooltip>
        <template #title>{{ t('common.toolbar.save') }}</template>
        <SaveTwoTone class="toolbar-button" @click="handleSubmit" />
      </Tooltip>
    </template>
    <div style="width: 98%; float: left">
      <Row type="flex" :gutter="4">
        <Col :md="24 - rightPanelSize" :sm="24">
        <div class="mr-2 overflow-hidden bg-white" style="border: solid 1px; height: 760px">
          <div style="width: 100%; height: 380px">
            <splitpanes>
              <pane size="30">
                <div id="codeEditor" style="width: 100%; height: 380px; border: solid 1px">
                  <CodeEditor border
                              class="code-mirror"
                              placeholder="Input custom sql"
                              v-model:value="rawData.content"
                              mode="sql" />
                </div>
              </pane>
              <pane size="70">
                <div id="stats"
                     ref="statsRef"
                     style="width: 100%; height: 380px; border: solid 1px">
                  <span style="font-weight: bold; margin-left: 10px">Field summary</span>
                  <BasicTable ref="statTableRef"
                              :size="'small'"
                              :bordered="true"
                              :canResize="true"
                              :show-table-setting="false"
                              :columns="statColumns[rawData.type]"
                              :data-source="statFieldList"
                              :show-index-column="false"
                              :use-search-form="false"
                              :pagination="false"
                              :striped="false"
                              :scroll="{ x: 300, y: 300 }"
                              :rowClassName="tableRowColor"
                              @resizeColumn="(w, col)=>{col.width = w;}">
                    <template #bodyCell="{ column, record }">
                      <template v-if="column.key == 'name' && record.target">
                        <div style="margin-left: 5px; color: red">{{ record.name }}</div>
                      </template>
                      <template v-if="column.key === 'missing'">
                        <div v-if="record.missing>0" style="margin-left: 5px; color: orange">{{ record.missing }}</div>
                        <div v-else style="margin-left: 5px; color: black">{{ record.missing }}</div>
                      </template>
                      <template v-if="column.key === 'variance'">
                        <div v-if="record.variance==0" style="margin-left: 5px; color: orange">{{ record.variance }}</div>
                        <div v-else style="margin-left: 5px; color: black">{{ record.variance }}</div>
                      </template>
                      <template v-else-if="column.key === 'unique'">
                        <Tag
                          v-for="(ele, index) in record.unique"
                          :key="index"
                          color="green"
                          style="margin-right: 2px"
                        >
                          {{ ele }}
                        </Tag>
                      </template>
                    </template>
                  </BasicTable>
                </div>
              </pane>
            </splitpanes>
          </div>
          <div id="tableDiv" style="width: 100%; height: 360p; margin-top: 5px">
            <BasicTable ref="TableRef"
                        size="small"
                        :bordered="true"
                        :canResize="true"
                        :show-table-setting="false"
                        :columns="rawData.fields"
                        :data-source="datasetInfo.data"
                        :show-index-column="false"
                        :use-search-form="false"
                        :pagination="false"
                        :scroll="{ x: 300, y: 300 }"
                        @resizeColumn="
                        (w, col)=>
              {
              col.width = w;
              }
              "
              >
              <template #headerCell="{ column }">
                <HeaderCell :column="column" />
                <br />
                <Tooltip>
                  <template #title>
                    {{ t('ml.dataset.detail.table.action.omit') }}
                  </template>
                  <EyeInvisibleOutlined class="ml-2"
                                        :style="{ fontSize: '16px', color: 'gray', cursor: 'pointer' }"
                                        @click="handleColumnOmit(column.key)" />
                </Tooltip>
                <Tooltip>
                  <template #title>
                    {{ t('ml.dataset.detail.table.action.timeline') }}
                  </template>
                  <HourglassOutlined class="ml-2"
                               :style="{ fontSize: '16px', color: column.timeline ? 'orange' : 'gray', cursor: 'pointer' }"
                               @click="handleColumnTimeline(column.key)" />
                </Tooltip>
                <Tooltip>
                  <template #title>
                    {{ t('ml.dataset.detail.table.action.attr') }}
                  </template>
                  <Dropdown placement="bottom" :trigger="['click']">
                    <NodeIndexOutlined v-if="column.attr == 'conti'"
                                       class="ml-2"
                                       :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }" />
                    <FieldBinaryOutlined v-else-if="column.attr == 'disc'"
                                         class="ml-2"
                                         :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }" />
                    <FieldTimeOutlined v-else-if="column.attr == 'date'"
                                       class="ml-2"
                                       :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }" />
                    <EnvironmentOutlined v-else-if="column.attr == 'coord'"
                                         class="ml-2"
                                         :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }" />
                    <GoldOutlined v-else
                                  class="ml-2"
                                  :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }" />
                    <template #overlay>
                      <Menu>
                        <MenuItem key="attr">
                          <Radio.Group v-model:value="column.attr" size="small" button-style="solid" @change="handleColumnAttr(column.key, column.attr)">
                            <Radio.Button value="conti" :style="radioStyle">Continuous</Radio.Button>
                            <Radio.Button value="disc" :style="radioStyle">Discrete</Radio.Button>
                            <Radio.Button value="cat" :style="radioStyle">Category</Radio.Button>
                            <Radio.Button value="date" :style="radioStyle">Datetime</Radio.Button>
                            <Radio.Button value="coord" :style="radioStyle">Coordinate</Radio.Button>
                          </Radio.Group>
                        </MenuItem>
                      </Menu>
                    </template>
                  </Dropdown>
                </Tooltip>
                <Tooltip>
                  <template #title>
                    {{ t('ml.dataset.detail.table.action.target') }}
                  </template>
                  <AimOutlined class="ml-2"
                               :style="{ fontSize: '16px', color: column.target ? 'red' : 'gray', cursor: 'pointer' }"
                               @click="handleColumnTarget(column.key)" />
                </Tooltip>
                <Tooltip>
                  <template #title>
                    {{ t('ml.dataset.detail.table.action.miss') }}
                  </template>
                  <Dropdown placement="bottom" :trigger="['click']">
                    <AppleOutlined v-if="column.miss" class="ml-2" :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }" />
                    <AppleOutlined v-else class="ml-2" :style="{ fontSize: '16px', color: 'gray', cursor: 'pointer' }" />
                    <template #overlay>
                      <Menu>
                        <MenuItem key="miss">
                          <Radio.Group v-model:value="column.miss" size="small" button-style="solid" @change="handleColumnMiss(column.key, column.miss)">
                            <Radio.Button value="drop" :style="radioStyle">Drop</Radio.Button>
                            <Radio.Button value="min" :style="radioStyle">Fill min</Radio.Button>
                            <Radio.Button value="max" :style="radioStyle">Fill max</Radio.Button>
                            <Radio.Button value="mean" :style="radioStyle">Fill mean</Radio.Button>
                            <Radio.Button value="median" :style="radioStyle">Fill median</Radio.Button>
                            <Radio.Button value="prev" :style="radioStyle">Fill prev</Radio.Button>
                            <Radio.Button value="next" :style="radioStyle">Fill next</Radio.Button>
                            <Radio.Button value="zero" :style="radioStyle">fill zero</Radio.Button>
                            <Radio.Button value="none" :style="radioStyle">None</Radio.Button>
                          </Radio.Group>
                        </MenuItem>
                      </Menu>
                    </template>
                  </Dropdown>
                </Tooltip>
                <Tooltip>
                  <template #title>
                    {{ t('ml.dataset.detail.table.action.encode') }}
                  </template>
                  <Dropdown placement="bottom" :trigger="['click']">
                    <FunctionOutlined v-if="column.encode" class="ml-2" :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }" />
                    <FunctionOutlined v-else class="ml-2" :style="{ fontSize: '16px', color: 'gray', cursor: 'pointer' }" />
                    <template #overlay>
                      <Menu>
                        <MenuItem key="encode">
                          <Radio.Group v-model:value="column.encode" size="small" button-style="solid" @change="handleColumnEncode(column.key, column.encode)">
                            <Radio.Button value="ordinal" :style="radioStyle">Ordinal</Radio.Button>
                            <Radio.Button value="onehot" :style="radioStyle">One-Hot</Radio.Button>
                            <Radio.Button value="binary" :style="radioStyle">Binary</Radio.Button>
                            <Radio.Button value="hash" :style="radioStyle">Hashing</Radio.Button>
                            <Radio.Button value="count" :style="radioStyle">Count</Radio.Button>
                            <Radio.Button value="mean" :style="radioStyle">Mean</Radio.Button>
                            <Radio.Button value="woe" :style="radioStyle">WOE</Radio.Button>
                            <Radio.Button value="bins" :style="radioStyle">Binning</Radio.Button>
                            <Radio.Button value="loo" :style="radioStyle">Leave One Out</Radio.Button>
                            <Radio.Button value="none" :style="radioStyle">None</Radio.Button>
                          </Radio.Group>
                        </MenuItem>
                      </Menu>
                    </template>
                  </Dropdown>
                </Tooltip>
                <Tooltip>
                  <template #title>
                    {{ t('ml.dataset.detail.table.action.scale') }}
                  </template>
                  <Dropdown placement="bottom" :trigger="['click']">
                    <MergeCellsOutlined v-if="column.scale" class="ml-2" :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }" />
                    <MergeCellsOutlined v-else class="ml-2" :style="{ fontSize: '16px', color: 'gray', cursor: 'pointer' }" />
                    <template #overlay>
                      <Menu>
                        <MenuItem key="scale">
                          <Radio.Group v-model:value="column.scale" size="small" button-style="solid" @change="handleColumnScale(column.key, column.scale)">
                            <Radio.Button value="minmax" :style="radioStyle">Min-Max</Radio.Button>
                            <Radio.Button value="std" :style="radioStyle">Standardization</Radio.Button>
                            <Radio.Button value="l1" :style="radioStyle">Normal-L1</Radio.Button>
                            <Radio.Button value="l2" :style="radioStyle">Normal-L2</Radio.Button>
                            <Radio.Button value="max" :style="radioStyle">Normal-Max</Radio.Button>
                            <Radio.Button value="abs" :style="radioStyle">MaxAbs</Radio.Button>
                            <Radio.Button value="robust" :style="radioStyle">Robust</Radio.Button>
                            <Radio.Button value="log" :style="radioStyle">Logarithm</Radio.Button>
                            <Radio.Button value="none" :style="radioStyle">None</Radio.Button>
                          </Radio.Group>
                        </MenuItem>
                      </Menu>
                    </template>
                  </Dropdown>
                </Tooltip>
              </template>
              <template #bodyCell="{ column, record }">
                <template v-if="column.name === 'image'">
                  <img :src="'data:image/png;base64,' + record.image" >
                </template>
              </template>
            </BasicTable>
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
                    :api="API_ML_DATASET_GROUPS"
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
                placeholder="Select Datasource"
                :api="API_DATASOURCE_TREE"
                :immediate="true"
                v-model:value="rawData.sourceId"
                resultField="records"
                :fieldNames="{ key: 'id', label: 'name', value: 'id' }"
                :afterFetch="handleDatasourceTree"
                @change="handleSourceChange"
                style="width: 100%"
              >
                <template #suffixIcon>
                  <Icon
                    v-if="datasourceInfo.selectedSource.type == 'mysql'"
                    icon="carbon:sql"
                    :size="24"
                    style="color: #00bb00; margin-top: -8px"
                  />
                  <Icon
                    v-else-if="datasourceInfo.selectedSource.type == 's3bucket'"
                    icon="carbon:csv"
                    :size="24"
                    style="color: #00bb00; margin-top: -8px"
                  />
                  <Icon
                    v-else-if="datasourceInfo.selectedSource.type == 'http'"
                    icon="carbon:json"
                    :size="24"
                    style="color: #00bb00; margin-top: -8px"
                  />
                  <Icon
                    v-else-if="datasourceInfo.selectedSource.type == 'datahub'"
                    icon="carbon:cloud-data-ops"
                    :size="24"
                    style="color: #00bb00; margin-top: -8px"
                  />
                </template>
              </ApiTreeSelect>
              <ApiTree
                :api="API_DATASOURCE_SETS"
                :params="datasourceInfo.selectedSource"
                :immediate="false"
                :height="650"
                v-model:value="datasourceInfo.selectedTable"
                v-model:selectedKeys="selectedSourceField.id"
                v-model:expandedKeys="expandedSourceField.id"
                :fieldNames="{ key: 'id', title: 'name', value: 'id' }"
                :afterFetch="afterFetchSourceSet"
                @dblclick="handleFieldDbClick"
              />
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
              <fieldset class="filesets">
                <legend style="padding: 0.5em; width: auto; font-size: 15px; font-weight: bold">
                  {{ t('ml.dataset.form.config.var') }}
                  <PlusSquareTwoTone
                    class="ml-2"
                    :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                    @click="openVarModal(true, {})"
                  />
                </legend>
                <BasicTree
                  :treeData="varFieldList"
                  :actionList="varActions"
                  :renderIcon="varIcons"
                  @dblclick="openVarModal"
                >
                  <!--template #title="item">
                    <Icon icon="ant-design:field-number-outlined" :size="20" style="color: #669900; margin-right: 5px" />
                    <span style="float: left">{{ item.name }}: {{ item.value }}</span>
                    <span><DeleteOutlined style="float: right" /></span>
                  </template-->
                </BasicTree>
              </fieldset>
              <fieldset class="filesets">
                <legend style="padding: 0.5em; width: auto; font-size: 15px; font-weight: bold">
                  {{ t('ml.dataset.form.config.omit') }}
                </legend>
                <BasicTree
                  :treeData="omitFieldList"
                  :actionList="omitActions"
                  :fieldNames="{ title: 'name' }"
                />
              </fieldset>
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
    </Menu>
    <VarModal @register="registerVarModal" @success="handleVarSuccess" />
  </BasicDrawer>
</template>

<script lang="ts" setup name="DetailForm">
  import { computed, h, reactive, ref, unref } from 'vue';
  import { BasicForm, FormActionType } from '/@/components/Form/index';
  import { dataStatColumns, imgStatColumns, formInfoSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTable } from '/@/components/Table';
  import HeaderCell from '/@/components/Table/src/components/HeaderCell.vue';
  import {
    PlaySquareTwoTone,
    SaveTwoTone,
    ProfileTwoTone,
    EyeInvisibleOutlined,
    PlusSquareTwoTone,
    DeleteOutlined,
    InfoCircleFilled,
    GiftOutlined,
    SettingFilled,
    FieldTimeOutlined,
    FieldBinaryOutlined,
    AppleOutlined,
    GoldOutlined,
    AimOutlined,
    EnvironmentOutlined,
    FunctionOutlined,
    MergeCellsOutlined,
    NodeIndexOutlined,
    HourglassOutlined
  } from '@ant-design/icons-vue';
  import { BasicTree, TreeActionItem } from '/@/components/Tree';
  import { Splitpanes, Pane } from 'splitpanes';
  import 'splitpanes/dist/splitpanes.css';
  import { CodeEditor } from '/@/components/CodeEditor';
  import { format } from 'sql-formatter';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ApiTreeSelect, ApiTree } from '/@/components/Form';
  import {
    message,
    Tooltip,
    Menu,
    MenuItem,
    Dropdown,
    Row,
    Col,
    InputNumber,
    Radio,
    Tag
  } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import {
    API_ML_DATASET_CREATE,
    API_ML_DATASET_UPDATE,
    API_ML_DATASET_GROUPS,
    API_ML_DATASET_STAT,
    API_ML_DATASET_EXECUTE
  } from '/@/api/ml/dataset';
  import {
    API_DATASOURCE_TREE,
    API_DATASOURCE_SETS
  } from '/@/api/datamgr/datasource';
  import { cloneDeep } from 'lodash-es';
  import { useModal } from '/@/components/Modal';
  import VarModal from './varModal.vue';
  import FilterModal from './filterModal.vue';
  import { ApiSelect } from '/@/components/Form';
  import { ApiMlDatasetDataType, initDataset } from '/@/api/ml/model/dataset';

  /*
   * CodeMirror 5 is being used here (the hint can not be show now ???)
   * There are two options for the future
   * CodeMirror 6(https://github.com/codemirror/dev/) or vue-codemirror (https://github.com/surmon-china/vue-codemirror)
   * CodeMirror VS ACE VS monaco (https://www.jianshu.com/p/0f16dd70246c, https://www.qiyuandi.com/zhanzhang/zonghe/13271.html)
   */

  /*
   * JsonTreeView is one of options to show variable and filter
   * It should be enhanced to add delete button and support icon and double click
   * https://github.com/seijikohara/json-tree-view-vue3
   *  Vue-Json-Edit is good but doesn't support vue3. https://github.com/jinkin1995/vue-json-edit
   * https://github.com/liudding/json-vuer?ref=morioh.com&utm_source=morioh.com
   * https://github.com/qiuquanwu/vue3-json-viewer
   */

  const { t } = useI18n();
  const drawerTitle = ref<string>(t('common.form.new'));
  const emit = defineEmits(['success', 'register']);
  const rawData = ref<ApiMlDatasetDataType>(initDataset);
  const rightPanelSize = ref<number>(4);
  const rightPanelKey = ref<string>('datasource');
  const selectedPanelKeys = ref<string[]>(['datasource']);
  const radioStyle = reactive({
      display: 'flex',
      height: '30px',
      lineHeight: '30px',
    });
  const infoFormRef = ref<Nullable<FormActionType>>(null);
  const datasourceInfo = ref<any>({
    groupSourceTree: [],
    selectedSource: { id: -1 },
    selectedTable: '',
  });
  const datasetInfo = reactive<any>({ limit: 20, total: '', data: [] });
  const dbTables = ref<any>({ selected: undefined });
  const selectedSourceField = ref<any>({id:[], name:''});
  const expandedSourceField = ref<any>({id:[], name:''});
  const statColumns = ref<any>({data: dataStatColumns, timeseries: dataStatColumns, image: imgStatColumns});

  // Variable modal definition
  const [registerVarModal, { openModal: openVarModal }] = useModal();

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

    datasourceInfo.value.groupSourceTree = [];
    datasourceInfo.value.selectedSource.id = -1;
    datasourceInfo.value.selectedTable = '';
    selectedSourceField.value.id = [];
    selectedSourceField.value.name = '';
    expandedSourceField.value.id = [];
    expandedSourceField.value.name = '';
    
    // get drawer title
    if (data && data.id) {
      drawerTitle.value = '[' + data.name + ']';
      // save received data
      rawData.value = JSON.parse(JSON.stringify(data));
      if(data.content.indexOf('.datasets.') > 0){
        const segs = data.content.split('.');
        expandedSourceField.value.name = segs[0];
        selectedSourceField.value.name = segs[2];
      }
    } else {
      drawerTitle.value = t('common.form.new');
    }

    // initialize table columns
    buildColumns();
    datasetInfo.limit = 20;
    datasetInfo.total = '';
    datasetInfo.data = [];
    dbTables.value = { selected: undefined };

    execute();
  });


  /*
* distribution fields
*/
  const statFieldList = computed(() => {
    let filteredFields = [];
    let statFields = [];
    if (rawData.value.fields && rawData.value.fields.length > 0) {
      filteredFields = rawData.value.fields.filter((el) => el.attr == 'conti' && el.omit == undefined);
      filteredFields.sort((a, b) => a.name.localeCompare(b.name));
      statFields = filteredFields;

      filteredFields = rawData.value.fields.filter((el) => el.attr == 'disc' && el.omit == undefined);
      filteredFields.sort((a, b) => a.name.localeCompare(b.name));
      statFields = [...statFields, ...filteredFields];

      filteredFields = rawData.value.fields.filter((el) => el.attr == 'cat' && el.omit == undefined);
      filteredFields.sort((a, b) => a.name.localeCompare(b.name));
      statFields = [...statFields, ...filteredFields];

      filteredFields = rawData.value.fields.filter((el) => el.attr == 'date' && el.omit == undefined);
      filteredFields.sort((a, b) => a.name.localeCompare(b.name));
      statFields = [...statFields, ...filteredFields];

      filteredFields = rawData.value.fields.filter((el) => el.attr == 'coord' && el.omit == undefined);
      filteredFields.sort((a, b) => a.name.localeCompare(b.name));
      statFields = [...statFields, ...filteredFields];
    }
    return statFields;
  });


  /*
 * show different color for different categories
 */
  const tableRowColor = (record: any, index: number) => {
    if (record.omit == true) {
      return null;
    } else {
      return 'table-' + record.attr;
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

  // initialize datasource tree of source form
  const handleDatasourceTree = (data) => {
    // save source tree list
    datasourceInfo.value.groupSourceTree = data.records;

    if (!rawData.value.sourceId) {
      return data;
    }

    for (let node of data.records) {
      // first level is group name. it is not selectable
      node.selectable = false;
      for (let sub of node.children) {
        // child is datasource name
        sub.selectable = true;
        if (sub.id == rawData.value.sourceId) {
          // find current datasource
          datasourceInfo.value.selectedSource = sub;
          return data;
        }
      }
    }

    // sourceId is defined but can't be found in response
    message.error(t('dataviz.dataset.error.sourceMiss'));
    datasourceInfo.value.selectedSource.id = -1;
    return data;
  };

  /*
   * get source tables when source is changed
   */
  const handleSourceChange = (key: any) => {
    // find selected source in tree
    for (const node of datasourceInfo.value.groupSourceTree) {
      for (const sub of node.children) {
        if (sub.id == key) {
          // find selected source
          // its type will be used to show an icon
          // this will trigger API_DATASOURCE_SETS because of params change
          datasourceInfo.value.selectedSource = sub;
          return;
        }
      }
    }
  };

  /*
  * find pid after get dataset from backend
  */
  const afterFetchSourceSet = (data: any[]) =>{
    if(data?.records){
      if(selectedSourceField.value.name && selectedSourceField.value.name != ''){
        const setPid = findIdInTree(data.records, 'name', expandedSourceField.value.name, null);
        expandedSourceField.value.id = [setPid];
        const setId = findIdInTree(data.records, 'name', selectedSourceField.value.name, null);
        selectedSourceField.value.id = [setId];
      }
      return data.records;
    } else {
      return [];
    }
  };


  const findIdInTree = (node, field, value, id) => {
    let nodeId = null;
    if(Array.isArray(node)){
      for(const nd of node){
        nodeId = findIdInTree(nd, field, value, nd[field]);
        if(nodeId){
          return nodeId;
        }
      }
    } else if (node[field] == value){
      return node.id;
    } else if (node.children && node.children.length>0){
      for(const cd of node.children){
        nodeId = findIdInTree(cd, field, value, node[field]);
        if(nodeId){
          return nodeId;
        }
      }
    } 
    return nodeId;
  };


  /*
 * get source tables when source is changed
 */
  const handleFieldDbClick = (evt: any, target: any) => {
    if(target.id > 0){
      rawData.value.content = 'select * from ' + target.name;
      rawData.value.type = 'data';
    } else {
      if(target.parent?.node?.name){
        const pName = target.parent?.node?.name;
        rawData.value.content = pName + '.datasets.' + target.name;

        if(pName.indexOf('sklearn')>=0){
          rawData.value.type = 'data';
        } else if(pName.indexOf('torchvision')>=0){
          rawData.value.type = 'image';
        } else if(pName.indexOf('torchaudio')>=0){
          rawData.value.type = 'audio';
        } else if(pName.indexOf('torchtext')>=0){
          rawData.value.type = 'text';
        }
      }
    }    
  };

  // variable computation filed for list to show
  // when this is used everything is good (renderIcon and actionList work well)
  // it will be better without this if the slot 'title' works with ':groupSourceTree="rawData.variable"'
  // how to show delete icon when mouse hover?
  // enhance it later to use slot. then this can be removed.
  const varFieldList = computed(() => {
    if (rawData.value.variable == undefined) {
      return [];
    }
    let varRet: any[] = [];
    for (const item of rawData.value.variable) {
      let varClone = JSON.parse(JSON.stringify(item));
      // combine variable name and value into title for displaying
      varClone.title = item.name + ': ' + item.value;
      varRet.push(varClone);
    }
    return varRet;
  });

  // current variables for replacing
  // in backend Druid SQL Parser can be used to do var replacement
  const sqlVarForReplace = computed(() => {
    if (rawData.value.variable == undefined) {
      return {};
    }
    const vars = {};
    for (let item of rawData.value.variable) {
      vars[item.name] = item.value;
    }
    return vars;
  });

  function varIcons(node: any) {
    if (node.type === 'number') {
      return 'ant-design:field-number-outlined';
    } else if (node.type === 'date') {
      return 'ant-design:field-time-outlined';
    } else if (node.type === 'string') {
      return 'ant-design:field-string-outlined';
    } else if (node.type === 'bool') {
      return 'ant-design:field-binary-outlined';
    } else if (node.type === 'bool') {
      return 'ant-design:unordered-list-outlined';
    } else {
      return 'ant-design:dollar-outlined';
    }
  }

  // show delete icon in variable tree
  const varActions: TreeActionItem[] = [
    {
      render: (node) => {
        return h(DeleteOutlined, {
          class: 'ml-2',
          onClick: () => {
            const idx = rawData.value.variable.findIndex((v) => {
              // find variable
              return v.name == node.name;
            });
            // remove variable
            rawData.value.variable.splice(idx, 1);
            if (infoFormRef.value) {
              infoFormRef.value.setFieldsValue({ variable: rawData.value.variable });
            }
          },
        });
      },
    },
  ];

  // hidden computation filed for list to show
  // in backend Druid SQL Parser can be used to remove a filed for sql
  const omitFieldList = computed(() => {
    if (rawData.value.fields == undefined) {
      return [];
    }
    let ret = rawData.value.fields.filter((col) => {
      return col.omit == true;
    });
    // remove proxy
    let hiddenRet = JSON.parse(JSON.stringify(ret));
    return hiddenRet;
  });

  // show delete icon in hidden tree
  const omitActions: TreeActionItem[] = [
    {
      render: (node) => {
        return h(DeleteOutlined, {
          class: 'ml-2',
          onClick: () => {
            // key is index of rawData.fields
            let rawField = rawData.value.fields[node.key];
            // remove hidden field
            delete rawField.omit;
            delete rawField.ifShow;
          },
        });
      },
    },
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
    const sqlLanguage = datasourceInfo.value.selectedSource.type.toLowerCase();
    rawData.value.content = format(rawData.value.content, {
      language: 'sqlite',
      tabWidth: 2,
      keywordCase: 'upper',
    });

    // for file path with '/'
    rawData.value.content = rawData.value.content.replaceAll(' / ', '/');
  }

  /*
   * run sql query and show result in table
   */
  const execute = () => {
    if (!rawData.value.content) {
      return;
    }

    // replace variables of sql query
    // Mysql/MariaDB don't support named variable, only support '?'
    // sqlite support named variable. so here use 'sqlite'
    // sqlite - ?, ?1, :name, @name, $name
    // only @, $ and ${} are available for DataPie
    // string/date variable must have "''"
    let content = rawData.value.content;
    if (content.indexOf('${') < 0) {
      // ${variable} is not supported by this function
      // but backend supports
      content = format(content, {
        language: 'sqlite',
        params: unref(sqlVarForReplace),
        paramTypes: { named: ['@', '$'] },
      });

      // for file path with '/'
      content = content.replaceAll(' / ', '/');
    }

    /*
    API_ML_DATASET_EXECUTE(rawData.value.id)
      .then((response) => {
        datasetInfo.data = response.records;
        datasetInfo.total = response.total;
        rawData.value.fields = mergeConfig(response.stat, rawData.value.fields);
        buildColumns();
      });
      */


      API_ML_DATASET_STAT(rawData.value.sourceId, content, rawData.value.type, rawData.value.variable, datasetInfo.limit)
      .then((response) => {
        datasetInfo.data = response.records;
        datasetInfo.total = response.total;
        rawData.value.volume = response.total;
        rawData.value.fields = mergeConfig(response.stat, rawData.value.fields);
        buildColumns();
      });


  };

  /*
 * merge field configs
 */
  const mergeConfig = (stat: any[], fieldCfg: any[]) => {
    const mergedCfg: any[] = [];

    for (let [index, item] of stat.entries()) {
      let field = undefined;
      if (fieldCfg && fieldCfg.length > 0) {
        // find previous user config
        field = fieldCfg.find((ele) => {
          return ele.name.toLowerCase() == item.name.toLowerCase();
        });
      }

      if (field == undefined) {
        if (
          item.name.toLowerCase() == 'id' ||
          item.name.toLowerCase() == 'pid' ||
          item.name.toLowerCase() == 'cid' ||
          item.name.toLowerCase() == 'uid' ||
          item.name.toLowerCase() == 'idx' ||
          item.name.toLowerCase() == 'index' ||
          item.name.toLowerCase().indexOf('_id') > 0 ||
          item.name.toLowerCase().indexOf('_index') > 0
        ) {
          // disable it if it is a id
          item.omit = true;
        }

        // detect data type
        if (item.type == 'boolean') {
          item.attr = 'disc';
        } else if (item.type == 'string' || item.type == 'object') {
          item.type = 'string';
          item.attr = 'cat';
        } else if (item.type == 'timestamp') {
          item.attr = 'date';
        } else if (item.type == 'numberxxxxxx') {
          item.attr = 'coor';
        } else if (item.type == 'number' || item.type.indexOf('float') == 0) {
          item.type = 'number';
          item.attr = 'conti';
        } else if (item.type == 'number' || item.type.indexOf('int') == 0) {
          item.type = 'number';
          item.attr = 'disc';
        }
      } else {
        item.attr = field.attr;
        item.target = field.target;
        item.omit = field.omit;
        item.miss = field.miss;
        item.encode = field.encode;
        item.scale = field.scale;
        item.size = field.size;
        item.timeline = field.timeline;
      }

      // convert array to string
      if(item.size && Array.isArray(item.size)){
        item.size = item.size.toString();
      }

      // update data index
      item.id = index;
      item.dataIdx = index;
      mergedCfg.push(unref(item));
    }

    return mergedCfg;
  };


  /*
   * build column config from fields for displaying
   */
  function buildColumns() {
    if (!rawData.value.fields) {
      return {};
    }
    // this is for table to show
    for (let [index, item] of rawData.value.fields.entries()) {
      // merge default table attributes
      rawData.value.fields[index] = {
        ...item,
        key: index, // use index as key
        dataIndex: item['name'],
        title: item['name'],
        ifShow: item['omit'] ? !item['omit'] : true,
        width: 180,
        align: 'left',
        ellipsis: false,
        resizable: true
      };
    }
  }

  /*
   * build records based on received data
   */
  function buildRecords(records: any[], columns: any[]) {
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
  }

  /*
   * change the column to show or hide
   */
  function handleColumnOmit(key: number) {
    // key was set to index when built columns
    let rawField = rawData.value.fields[key];

    // hide column
    rawField.omit = true; // for save
    rawField.ifShow = false;
  }

  /*
   * mark the column as target
   */
  function handleColumnTarget(key: number) {
    // key was set to index when built columns
    let rawField = rawData.value.fields[key];
    if (rawField.target == undefined) {
      rawField.target = true;
    } else {
      delete rawField.target; // delete unnecessary field for saving
    }
  }

    /*
   * mark the data type is timeseries
   */
   function handleColumnTimeline(key: number) {
    // key was set to index when built columns
    let rawField = rawData.value.fields[key];
    if (rawField.target == undefined && rawField.attr == 'date') {
      rawField.timeline = true;
      rawData.value.type = 'timeseries';
    } else {
      delete rawField.timeline; // delete unnecessary field for saving
      rawData.value.type = 'data';
    }
  }

  /*
 * change the column attribute
 */
  function handleColumnAttr(key: number, value: string) {
    // key was set to index when built columns
    let rawField = rawData.value.fields[key];
    rawField.attr = value;
  }

  /*
* change the column miss operation
*/
  function handleColumnMiss(key: number, value: string) {
    // key was set to index when built columns
    let rawField = rawData.value.fields[key];
    if (value == 'none') {
      delete rawField.miss;
    } else {
      rawField.miss = value;
    }
  }

  /*
* change the column encode
*/
  function handleColumnEncode(key: number, value: string) {
    // key was set to index when built columns
    let rawField = rawData.value.fields[key];
    if (value == 'none') {
      delete rawField.encode;
    } else {
      rawField.encode = value;
    }
  }

  /*
* change the column scale
*/
  function handleColumnScale(key: number, value: string) {
    // key was set to index when built columns
    let rawField = rawData.value.fields[key];
    if (value == 'none') {
      delete rawField.scale;
    } else {
      rawField.scale = value;
    }
  }

  /*
   * add or update variable
   * event is from varModal
   */
  function handleVarSuccess(data) {
    let varIdx;
    if (rawData.value.variable) {
      varIdx = rawData.value.variable.findIndex((ele) => {
        return ele.name == data.name;
      });
    } else {
      rawData.value.variable = [];
    }

    if (varIdx != undefined && varIdx >= 0) {
      rawData.value.variable[varIdx] = data;
    } else {
      rawData.value.variable.push(data);
    }

    // set to form
    if (infoFormRef.value) {
      infoFormRef.value.setFieldsValue({ variable: rawData.value.variable });
    }
  }

  /*
   * add or update variable
   * event is from varModal
   */
  function handleFilterSuccess(data) {
    rawData.value.fields[data.key].filter = data.operator + data.value;
    // set to form
    //setFieldsValue({ fields: rawData.value.fields });
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

      let clonedData = cloneDeep(unref(rawData));
      clonedData.transform = undefined;
      clonedData.target = [];
      let fCount = 0;
      for (let item of clonedData.fields) {
        // update fields to remove unnecessary attributes of table
        delete item.width;
        delete item.resizable;
        delete item.ellipsis;
        delete item.id;
        delete item.key;
        delete item.dataIdx;
        delete item.align;
        delete item.dataIndex;
        delete item.title;
        delete item.ifShow;
        delete item.missing;
        delete item.min;
        delete item.max;
        delete item.mean;
        delete item.median;
        delete item.pct5;
        delete item.pct25;
        delete item.pct75;
        delete item.pct95;
        delete item.stdDev;
        delete item.variance;
        delete item.count;
        delete item.freq;
        delete item.top;
        if(item.unique == null){
          delete item.unique;
        }

        if (item.target) {
          clonedData.target.push(item.name);
        } else if(!item.omit){
          fCount++;
        }
      }
      clonedData.fCount = fCount;

      setDrawerProps({ confirmLoading: true });
      if (rawData.value.id) {
        API_ML_DATASET_UPDATE(clonedData).then(() => {
          // notify parent
          emit('success', clonedData);
          message.success(t('common.tip.update'));
        });
      } else {
        API_ML_DATASET_CREATE(clonedData).then(() => {
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

  ::v-deep(.table-disc) {
    background-color: rgba(236, 236, 152, 0.2);
  }

  ::v-deep(.table-cat) {
    background-color: rgba(236, 236, 152, 0.2);
  }

  ::v-deep(.table-date) {
    background-color: rgba(127, 158, 70, 0.2);
  }

  ::v-deep(.table-coor) {
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
