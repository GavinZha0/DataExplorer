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
        <a-input-number
          :min="0"
          :step="50"
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
          <div class="mr-2 overflow-hidden bg-white">
            <splitpanes class="default-theme" horizontal style="width: 100%; height: 770px">
              <pane size="70">
                <splitpanes>
                  <pane size="70">
                    <div id="codeEditor" style="width: 100%; height: 750px; border: solid 1px">
                      <CodeEditor
                        border
                        class="code-mirror"
                        placeholder="Input custom sql"
                        v-model:value="rawData.query"
                        mode="sql"
                      />
                    </div>
                  </pane>
                  <pane size="30">
                    <div
                      id="erGraph"
                      ref="erGraphRef"
                      style="width: 100%; height: 750px; border: solid 1px"
                    >
                      <span style="font-weight: bold; margin-left: 10px">Database table fields</span>
                      <BasicTable
                        size="small"
                        :bordered="true"
                        :show-table-setting="false"
                        :columns="tableColumns"
                        :data-source="dbTables[dbTables.selected]"
                        :show-index-column="false"
                        :use-search-form="false"
                        :pagination="false"
                        :scroll="{ x: 200, y: 600 }"
                        @resizeColumn="
                          (w, col) => {
                            col.width = w;
                          }
                        "
                      />
                    </div>
                  </pane>
                </splitpanes>
              </pane>
              <pane size="30">
                <div id="tableDiv" style="height: 800px; border: solid 1px; margin-top: 5px">
                  <BasicTable
                    ref="TableRef"
                    size="small"
                    :bordered="true"
                    :canResize="true"
                    :show-table-setting="false"
                    :columns="rawData.fields"
                    :data-source="datasetInfo.data"
                    :show-index-column="false"
                    :use-search-form="false"
                    :pagination="false"
                    :scroll="{ x: 600, y: 650 }"
                    @resizeColumn="
                      (w, col) => {
                        col.width = w;
                      }
                    "
                  >
                    <template #headerCell="{ column }">
                      <HeaderCell :column="column" />
                      <br />
                      <Tooltip>
                        <template #title>{{
                          t('dataviz.dataset.detail.table.action.hidden')
                        }}</template>
                        <EyeInvisibleOutlined
                          class="ml-2"
                          :style="{
                            fontSize: '16px',
                            color: 'gray',
                            cursor: 'pointer',
                          }"
                          @click="handleColumnHidden(column.key)"
                        />
                      </Tooltip>

                      <Tooltip>
                        <template #title>
                          {{ t('dataviz.dataset.detail.table.action.rename') }}
                        </template>
                        <Dropdown placement="bottom" :trigger="['click']">
                          <MehOutlined
                            class="ml-2"
                            :style="{
                              fontSize: '16px',
                              cursor: 'pointer',
                              color: column.alias ? '#08c' : 'gray',
                            }"
                          />
                          <template #overlay>
                            <Menu>
                              <MenuItem key="default">
                                <AInput
                                  allowClear
                                  :id="column.key"
                                  :placeholder="column.name"
                                  v-model="rawData.fields[column.key].alias"
                                  @pressEnter="handleColumnRename"
                                />
                              </MenuItem>
                            </Menu>
                          </template>
                        </Dropdown>
                      </Tooltip>

                      <Tooltip>
                        <template #title>{{
                          t('dataviz.dataset.detail.table.action.metrics')
                        }}</template>
                        <FundOutlined
                          class="ml-2"
                          :style="{
                            fontSize: '16px',
                            color: column.metrics ? '#08c' : 'gray',
                            cursor: 'pointer',
                          }"
                          @click="handleColumnDimMetrics(column.key)"
                        />
                      </Tooltip>
                      <Tooltip>
                        <template #title>{{
                          t('dataviz.dataset.detail.table.action.filter')
                        }}</template>
                        <Dropdown placement="bottom" :trigger="['click']">
                          <FilterOutlined
                            class="ml-2"
                            :style="{
                              fontSize: '16px',
                              color: column.filter ? '#08c' : 'gray',
                              cursor: 'pointer',
                            }"
                          />
                          <template #overlay>
                            <Menu>
                              <MenuItem key="default">
                                <AInput
                                  allowClear
                                  :id="column.key"
                                  :placeholder="column.filter"
                                  v-model:value="rawData.fields[column.key].filter"
                                  @pressEnter="handleColumnFilter"
                                />
                              </MenuItem>
                            </Menu>
                          </template>
                        </Dropdown>
                      </Tooltip>
                      <!--Tooltip>
                        <template #title>{{
                          t('dataviz.dataset.detail.table.action.group')
                        }}</template>
                        <MergeCellsOutlined
                          class="ml-2"
                          :style="{
                            fontSize: '16px',
                            color: column.group == undefined ? 'gray' : '#08c',
                            cursor: 'pointer',
                          }"
                          @click="handleColumnGroup(column.key)"
                        />
                      </Tooltip-->
                      <Tooltip>
                        <template #title>{{
                          t('dataviz.dataset.detail.table.action.sorter')
                        }}</template>
                        <SortAscendingOutlined
                          v-if="column.order > 0"
                          class="ml-2"
                          :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                          @click="handleColumnSorter(column.key)"
                        />
                        <SortDescendingOutlined
                          v-else-if="column.order < 0"
                          class="ml-2"
                          :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                          @click="handleColumnSorter(column.key)"
                        />
                        <SortAscendingOutlined
                          v-else
                          class="ml-2"
                          :style="{ fontSize: '16px', color: 'gray', cursor: 'pointer' }"
                          @click="handleColumnSorter(column.key)"
                        />
                      </Tooltip>
                    </template>
                  </BasicTable>
                </div>
              </pane>
            </splitpanes>
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
                    :api="API_DATASET_GROUPS"
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
                    v-if="datasourceInfo.selectedSource.type == 'MySQL'"
                    icon="carbon:sql"
                    :size="24"
                    style="color: #00bb00; margin-top: -8px"
                  />
                  <Icon
                    v-else-if="datasourceInfo.selectedSource.type == 'CSV'"
                    icon="carbon:csv"
                    :size="24"
                    style="color: #00bb00; margin-top: -8px"
                  />
                  <Icon
                    v-else-if="datasourceInfo.selectedSource.type == 'JSON'"
                    icon="carbon:json"
                    :size="24"
                    style="color: #00bb00; margin-top: -8px"
                  />
                </template>
              </ApiTreeSelect>
              <ApiTree
                :api="API_DATASOURCE_TABLES"
                :params="datasourceInfo.selectedSource"
                :immediate="false"
                :height="630"
                :draggable="true"
                v-model:value="datasourceInfo.selectedTable"
                resultField="records"
                :fieldNames="{ key: 'id', title: 'name', value: 'id' }"
                @select="handleTableSelect"
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
                  {{ t('dataviz.dataset.form.config.var') }}
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
                  {{ t('dataviz.dataset.form.config.filter') }}
                </legend>
                <BasicTree
                  :treeData="filterFieldList"
                  :actionList="filterActions"
                  @dblclick="openFilterModal"
                />
              </fieldset>
                  <!--fieldset class="filesets">
                    <legend style="padding: 0.5em; width: auto; font-size: 15px; font-weight: bold">
                      {{ t('dataviz.dataset.form.config.group') }}
                    </legend>
                    <BasicTree
                      :draggable="true"
                      :treeData="groupFieldList"
                      :actionList="groupActions"
                      @drop="handleGroupDrop"
                    />
                  </fieldset-->
              <fieldset class="filesets">
                <legend style="padding: 0.5em; width: auto; font-size: 15px; font-weight: bold">
                  {{ t('dataviz.dataset.form.config.sorter') }}
                </legend>
                <BasicTree
                  :draggable="true"
                  :treeData="sortFieldList"
                  :actionList="sorterActions"
                  :renderIcon="sorterIcons"
                  @drop="handleSorterDrop"
                />
              </fieldset>
              <fieldset class="filesets">
                <legend style="padding: 0.5em; width: auto; font-size: 15px; font-weight: bold">
                  {{ t('dataviz.dataset.form.config.hidden') }}
                </legend>
                <BasicTree
                  :treeData="hiddenFieldList"
                  :actionList="hiddenActions"
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
    <FilterModal @register="registerFilterModal" @success="handleFilterSuccess" />
  </BasicDrawer>
</template>

<script lang="ts" setup name="DetailForm">
  import { computed, h, reactive, ref, unref } from 'vue';
  import { BasicForm, FormActionType } from '/@/components/Form/index';
  import { tableColumns, formInfoSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTable } from '/@/components/Table';
  import HeaderCell from '/@/components/Table/src/components/HeaderCell.vue';
  import {
    PlaySquareTwoTone,
    SaveTwoTone,
    ProfileTwoTone,
    FundOutlined,
    MehOutlined,
    SortAscendingOutlined,
    SortDescendingOutlined,
    EyeInvisibleOutlined,
    FilterOutlined,
    PlusSquareTwoTone,
    DeleteOutlined,
    InfoCircleFilled,
    GiftOutlined,
    SettingFilled,
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
    InputNumber as AInputNumber,
    Input as AInput,
  } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import {
    API_DATASET_CREATE,
    API_DATASET_UPDATE,
    API_DATASET_GROUPS,
  } from '/@/api/dataviz/dataset';
  import {
    API_DATASOURCE_TREE,
    API_DATASOURCE_TABLES,
    API_DATASOURCE_EXECUTE,
    API_DATASOURCE_FIELDS,
  } from '/@/api/datamgr/datasource';
  import { cloneDeep } from 'lodash-es';
  import { useModal } from '/@/components/Modal';
  import VarModal from './varModal.vue';
  import FilterModal from './filterModal.vue';
  import { ApiSelect } from '/@/components/Form';
  import { ApiDatasetDataType, initDataset } from '/@/api/datamgr/model/dataset';
  //import { JsonTreeView } from 'json-tree-view-vue3';

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
  const rawData = ref<ApiDatasetDataType>(initDataset);
  const rightPanelSize = ref<number>(4);
  const rightPanelKey = ref<string>('datasource');
  const selectedPanelKeys = ref<string[]>(['datasource']);
  const infoFormRef = ref<Nullable<FormActionType>>(null);
  const datasourceInfo = ref<any>({
    groupSourceTree: [],
    selectedSource: { id: -1 },
    selectedTable: '',
  });
  const datasetInfo = reactive<any>({ limit: 100, total: '', data: [] });
  const dbTables = ref<any>({ selected: undefined });

  // Variable modal definition
  const [registerVarModal, { openModal: openVarModal }] = useModal();

  // filter modal definition
  const [registerFilterModal, { openModal: openFilterModal }] = useModal();

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
    rawData.value = JSON.parse(JSON.stringify(data));

    // initialize table columns
    buildColumns();
    datasetInfo.limit = 100;
    datasetInfo.total = '';
    datasetInfo.data = [];
    dbTables.value = { selected: undefined };
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
          // this will trigger API_DATASOURCE_TABLES because of params change
          datasourceInfo.value.selectedSource = sub;
          return;
        }
      }
    }
  };

  /*
   * select a table to get fields
   */
  const handleTableSelect = (key, event) => {
    if (!key) {
      return;
    }
    const tableName = event.selectedNodes[0].name;
    if (dbTables.value.selected == tableName) {
      return;
    } else if (dbTables.value[tableName]) {
      dbTables.value.selected = tableName;
    } else {
      API_DATASOURCE_FIELDS(datasourceInfo.value.selectedSource.id, tableName).then((response) => {
        dbTables.value[tableName] = response.records;
        dbTables.value.selected = tableName;
      });
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

  // filter computation filed for list to show
  // in backend Druid SQL Parser can be used to add filters
  const filterFieldList = computed(() => {
    if (rawData.value.fields == undefined) {
      return [];
    }
    let ret = rawData.value.fields.filter((col) => col.filter);
    // remove proxy
    let filterRet = JSON.parse(JSON.stringify(ret));
    for (const item of filterRet) {
      // format the title
      item.title = item.title + ' ' + item.filter;
    }

    return filterRet;
  });

  // show delete icon in filter tree
  const filterActions: TreeActionItem[] = [
    {
      render: (node) => {
        return h(DeleteOutlined, {
          class: 'ml-2',
          onClick: () => {
            // key is index of rawData.fields
            let rawField = rawData.value.fields[node.key];
            delete rawField.filter;
            //tableRef.value.setColumns(rawField);
          },
        });
      },
    },
  ];

  // group computation filed for list to show
  // in backend Druid SQL Parser can be used to add groupby
  // when group by a field the metrics should be set to sum/avg/max/min/count, but it should be done by sql statement
  // so disable it for now. Gavin!!!
  const groupFieldList = computed(() => {
    if (rawData.value.fields == undefined) {
      return [];
    }
    let ret = rawData.value.fields.filter((col) => {
      return col.group != undefined;
    });
    // remove proxy
    let groupRet = JSON.parse(JSON.stringify(ret));
    // 0 is highest priority
    groupRet.sort((a, b) => a.group - b.group);
    return groupRet;
  });

  // drag and drop to change group priority
  const handleGroupDrop = (node: any) => {
    const dragKey = node.dragNode.eventKey; // column index of dragging object
    const dragPos = node.dragNode.group; // group starts from 0
    const dropPos = node.dropPosition; // relative position (priority) to drop object
    const minPos = dragPos < dropPos ? dragPos : dropPos;
    const maxPos = dragPos > dropPos ? dragPos : dropPos;
    const minAttr = dragPos < dropPos ? 's' : 't';

    if (minAttr == 's') {
      for (const [index, item] of groupFieldList.value.entries()) {
        // only the node between source node and target node need to be updated
        if (index > minPos && index < maxPos) {
          // move a node to back from front
          const pri = rawData.value.fields[item.key].group;
          rawData.value.fields[item.key].group = pri - 1;
        }
      }
      rawData.value.fields[dragKey].group = maxPos + 1;
    } else if (minAttr == 't') {
      for (const [index, item] of groupFieldList.value.entries()) {
        // only the node between source node and target node need to be updated
        if (index >= minPos && index < maxPos) {
          // move a node to front from back
          const pri = rawData.value.fields[item.key].group;
          rawData.value.fields[item.key].group = pri + 1;
        }
      }
      rawData.value.fields[dragKey].group = minPos + 1;
    }
  };

  // show delete icon in sorter tree
  const groupActions: TreeActionItem[] = [
    {
      render: (node) => {
        return h(DeleteOutlined, {
          class: 'ml-2',
          onClick: () => {
            // key is index of rawData.fields
            let rawField = rawData.value.fields[node.key];
            for (const [index, item] of rawData.value.fields.entries()) {
              if (item.group != undefined && item.group > rawField.group) {
                // update pri when delete one
                const pos = rawData.value.fields[index].group;
                rawData.value.fields[index].group = pos - 1;
              }
            }

            // remove sorter fields
            delete rawField.group;
          },
        });
      },
    },
  ];

  // sorter computation filed for list to show
  // in backend Druid SQL Parser can be used to add sorter
  const sortFieldList = computed(() => {
    if (rawData.value.fields == undefined) {
      return [];
    }
    let ret = rawData.value.fields.filter((col) => {
      return col.order != undefined;
    });
    // remove proxy
    let sorterRet = JSON.parse(JSON.stringify(ret));
    // 0 is not used. 1 is highest priority
    // + means 'asc', - means 'desc'
    sorterRet.sort((a, b) => Math.abs(a.order) - Math.abs(b.order));
    return sorterRet;
  });

  // drag and drop to change order priority
  const handleSorterDrop = (node: any) => {
    const dragKey = node.dragNode.eventKey; // column index of dragging object
    const dragPos = Math.abs(node.dragNode.order) - 1; // order starts from 1 but pos starts from 0
    const dropPos = node.dropPosition; // relative position (priority) to drop object
    const minPos = dragPos < dropPos ? dragPos : dropPos;
    const maxPos = dragPos > dropPos ? dragPos : dropPos;
    const minAttr = dragPos < dropPos ? 's' : 't';

    if (minAttr == 's') {
      for (const [index, item] of sortFieldList.value.entries()) {
        // only the node between source node and target node need to be updated
        if (index > minPos && index < maxPos) {
          // move a node to back from front
          const sign = Math.sign(rawData.value.fields[item.key].order);
          const pri = Math.abs(rawData.value.fields[item.key].order);
          rawData.value.fields[item.key].order = sign * (pri - 1);
        }
      }
      const sign = Math.sign(rawData.value.fields[dragKey].order);
      rawData.value.fields[dragKey].order = sign * (maxPos + 1);
    } else if (minAttr == 't') {
      for (const [index, item] of sortFieldList.value.entries()) {
        // only the node between source node and target node need to be updated
        if (index >= minPos && index < maxPos) {
          // move a node to front from back
          const sign = Math.sign(rawData.value.fields[item.key].order);
          const pri = Math.abs(rawData.value.fields[item.key].order);
          rawData.value.fields[item.key].order = sign * (pri + 1);
        }
      }
      const sign = Math.sign(rawData.value.fields[dragKey].order);
      rawData.value.fields[dragKey].order = sign * (minPos + 1);
    }
  };

  function sorterIcons(node: any) {
    if (node.order > 0) {
      return 'ant-design:sort-ascending-outlined';
    } else if (node.order < 0) {
      return 'ant-design:sort-descending-outlined';
    } else {
      return '';
    }
  }

  // show delete icon in sorter tree
  const sorterActions: TreeActionItem[] = [
    {
      render: (node) => {
        return h(DeleteOutlined, {
          class: 'ml-2',
          onClick: () => {
            // key is index of rawData.fields
            let rawField = rawData.value.fields[node.key];
            for (const [index, item] of rawData.value.fields.entries()) {
              if (item.order != undefined && Math.abs(item.order) > Math.abs(rawField.order)) {
                // update pri when delete one
                const sign = Math.sign(rawData.value.fields[index].order);
                const pos = Math.abs(rawData.value.fields[index].order);
                rawData.value.fields[index].order = sign * (pos - 1);
              }
            }

            // remove sorter fields
            delete rawField.order;
          },
        });
      },
    },
  ];

  // hidden computation filed for list to show
  // in backend Druid SQL Parser can be used to remove a filed for sql
  const hiddenFieldList = computed(() => {
    if (rawData.value.fields == undefined) {
      return [];
    }
    let ret = rawData.value.fields.filter((col) => {
      return col.hidden == true;
    });
    // remove proxy
    let hiddenRet = JSON.parse(JSON.stringify(ret));
    return hiddenRet;
  });

  // show delete icon in hidden tree
  const hiddenActions: TreeActionItem[] = [
    {
      render: (node) => {
        return h(DeleteOutlined, {
          class: 'ml-2',
          onClick: () => {
            // key is index of rawData.fields
            let rawField = rawData.value.fields[node.key];
            // remove hidden field
            delete rawField.hidden;
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
    rawData.value.query = format(rawData.value.query, {
      language: sqlLanguage,
      tabWidth: 2,
      keywordCase: 'upper',
    });
  }

  /*
   * run sql query and show result in table
   */
  const execute = () => {
    if (!rawData.value.query) {
      return;
    }

    // replace variables of sql query
    // Mysql/MariaDB don't support named variable, only support '?'
    // sqlite support named variable. so here use 'sqlite'
    // sqlite - ?, ?1, :name, @name, $name
    // only @, $ and ${} are available for DataPie
    // string/date variable must have "''"
    let sqlString = rawData.value.query;
    if (sqlString.indexOf('${') < 0) {
      // ${variable} is not supported by this function
      // but backend supports
      sqlString = format(sqlString, {
        language: 'sqlite',
        params: unref(sqlVarForReplace),
        paramTypes: { named: ['@', '$'] },
      });
    }

    // pass variables to backend for checking and replacement
    // backend also can handle variable replacement
    API_DATASOURCE_EXECUTE(
      rawData.value.sourceId,
      sqlString,
      rawData.value.variable,
      rawData.value.fields,
      datasetInfo.limit,
    ).then((response) => {
      datasetInfo.total = response.total;
      // merge existed config to new columns
      mergeConfig(response.metadata);
      // build columns and convert records when received data from backend
      buildColumns();
      datasetInfo.data = buildRecords(response.records, response.metadata);
    });
  };

  /*
   * merge column configs
   */
  function mergeConfig(metadata: any[]) {
    const backupFields = cloneDeep(unref(rawData).fields);
    // clean up
    rawData.value.fields = [];

    for (let item of metadata) {
      if (backupFields) {
        // find previous user config
        const previousCfg = backupFields.find((ele) => {
          return ele.name.toLowerCase() == item.name.toLowerCase();
        });

        // merge config if previous config is existed
        if (previousCfg) {
          item = { ...previousCfg, ...item };
        }
      } else {
        // no previous config
        if (
          item.type == 'number' &&
          item.name.toLowerCase() != 'id' &&
          item.name.toLowerCase() != 'uid' &&
          item.name.toLowerCase() != 'idx' &&
          item.name.toLowerCase() != 'index'
        ) {
          // detect metrics automatically when a new dataset is created
          item.metrics = true;
        }
      }

      // add to rawData
      rawData.value.fields.push(item);
    }
  }

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
        title: item['alias'] ? item['alias'] : item['name'],
        ifShow: item['hidden'] ? !item['hidden'] : true,
        width: 150,
        align: 'left',
        ellipsis: false,
        resizable: true,
      };

      if (item['alias']) {
        rawData.value.fields[index].alias = item.alias;
      }
    }
    return rawData.value.fields;
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
  function handleColumnHidden(key: number) {
    // key was set to index when built columns
    let rawField = rawData.value.fields[key];

    // hide column
    rawField.hidden = true; // for save
    rawField.ifShow = false;
    delete rawField.alias; // keep original name
    // keep sorter and filter in rawField
  }

  /*
   * change the column name
   */
  function handleColumnRename(event: any) {
    let rawField = rawData.value.fields[event.target.id];
    if (event.target.value) {
      rawField.alias = event.target.value;
    } else {
      delete rawField.alias;
    }
  }

  /*
   * change the column to dim or metrics
   */
  function handleColumnDimMetrics(key: number) {
    let rawField = rawData.value.fields[key];
    if (rawField.metrics == undefined) {
      rawField.metrics = true;
    } else {
      delete rawField.metrics; // delete unnecessary field for saving
    }
  }

  /*
   * group the column
   */
  function handleColumnGroup(key: number) {
    let rawField = rawData.value.fields[key];
    const existingGroups = rawData.value.fields.filter((col) => {
      return col.group != undefined;
    });

    if (rawField.group == undefined) {
      rawField.group = existingGroups.length;
    } else {
      for (const [index, item] of rawData.value.fields.entries()) {
        if (item.group != undefined && item.group > rawField.group) {
          // update group when delete one
          rawData.value.fields[index].group -= 1;
        }
      }
      delete rawField.group;
    }
  }

  /*
   * sort the column
   */
  function handleColumnSorter(key: number) {
    // doesn't consider multiple sorter
    // so 'pri' is not used
    let rawField = rawData.value.fields[key];
    const existingSorters = rawData.value.fields.filter((col) => {
      return col.order != undefined;
    });

    let priority = 1;
    if (existingSorters.find((col) => col.name == rawField.name)) {
      // keep old priority if it is in sorter list
      priority = rawField.order;
    } else {
      // add it end of list as lowest priority
      priority = existingSorters ? existingSorters.length + 1 : 1;
    }

    if (rawField.order == undefined) {
      rawField.order = priority; //Asc
    } else if (rawField.order > 0) {
      rawField.order *= -1; // Desc
    } else {
      for (const [index, item] of rawData.value.fields.entries()) {
        if (item.order != undefined && Math.abs(item.order) > Math.abs(rawField.order)) {
          // update order when delete one
          const sign = Math.sign(rawData.value.fields[index].order);
          const pri = Math.abs(rawData.value.fields[index].order);
          rawData.value.fields[index].order = sign * (pri - 1);
        }
      }
      delete rawField.order;
    }
  }

  /*
   * filter the column
   */
  // different database has different valid operators
  // enhance it later Gavin!!!
  const validOperators = ['>', '<', '=', '>=', '<=', '!=', 'in', 'like'];
  const invalidOperators = ['=='];
  function handleColumnFilter(event: any) {
    let rawField = rawData.value.fields[event.target.id];
    let filterValue = event.target.value.trim();
    if (filterValue) {
      if (filterValue.toUpperCase().indexOf(rawField.name.toUpperCase()) == 0) {
        // remove field name from filter value
        filterValue = filterValue.substring(rawField.name.length, filterValue.length);
        filterValue = filterValue.trim();
      }
      for (let oper of invalidOperators) {
        if (filterValue.indexOf(oper) == 0) {
          message.error(t('dataviz.dataset.error.wrongFilter'));
          break;
        }
      }
      rawField.filter = filterValue;
    } else {
      delete rawField.filter;
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
      for (let item of clonedData.fields) {
        // update fields to remove unnecessary attributes of table
        delete item.width;
        delete item.resizable;
        delete item.ellipsis;
        delete item.id;
        delete item.key;
        delete item.align;
        delete item.dataIndex;
        delete item.title;
        delete item.ifShow;
      }
      setDrawerProps({ confirmLoading: true });
      if (rawData.value.id) {
        API_DATASET_UPDATE(clonedData).then(() => {
          // notify parent
          emit('success', clonedData);
          message.success(t('common.tip.update'));
        });
      } else {
        API_DATASET_CREATE(clonedData).then(() => {
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
