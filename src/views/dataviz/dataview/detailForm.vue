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
        <template #title>{{ t('dataviz.dataview.detail.toolbar.limit') }}</template>
        <a-input-number
          :min="0"
          :step="100"
          size="small"
          v-model:value="datasetInfo.limit"
          class="toolbar-input"
          :placeholder="t('dataviz.dataview.detail.toolbar.limit')"
          :addonAfter="datasetInfo.dataset[datasetInfo.index].total"
        />
      </Tooltip>
      <Tooltip>
        <template #title>{{ t('common.toolbar.execute') }}</template>
        <PlaySquareTwoTone class="toolbar-button" @click="execute(true)" />
      </Tooltip>
      <Tooltip>
        <template #title>{{ t('dataviz.dataview.detail.toolbar.advance') }}</template>
        <SketchOutlined
          v-if="advancedInfo.disabled"
          class="toolbar-button2"
          @click="() => (advancedInfo.disabled = !advancedInfo.disabled)"
        />
        <SketchOutlined
          v-else
          class="toolbar-button3"
          @click="() => (advancedInfo.disabled = !advancedInfo.disabled)"
        />
      </Tooltip>
      <Tooltip>
        <template #title>{{ t('common.toolbar.save') }}</template>
        <SaveTwoTone class="toolbar-button" @click="saveDataview" />
      </Tooltip>
      <Upload
        v-model:file-list="mapFiles"
        :show-upload-list="false"
        accept=".geojson,.json,.csv,.jsonarray"
        :before-upload="handleMapUpload"
      >
        <a ref="uploadRef"></a>
      </Upload>
    </template>
    <div style="width: 98%; float: left">
      <Row type="flex" :gutter="4">
        <Col :md="24 - rightPanelSize" :sm="24">
          <div>
            <DownSquareOutlined
              class="toolbar-button"
              style="color: #08c; margin-top: 5px; float: right"
              @click="() => (thumbnailPage = 1 - thumbnailPage)"
            />
            <div v-for="(item, name, index) in chartTypes" :key="item.id">
              <img
                v-if="
                  item.active &&
                  ((thumbnailPage == 0 && index < 20) || (thumbnailPage == 1 && index >= 20))
                "
                height="40"
                width="40"
                style="
                  border: 2px solid chocolate;
                  margin: 0 4px 4px 0;
                  cursor: pointer;
                  float: right;
                "
                :src="'data:image/svg+xml;utf8,' + encodeURIComponent(item.svgCode)"
              />
              <img
                v-else-if="
                  item.advised &&
                  ((thumbnailPage == 0 && index < 20) || (thumbnailPage == 1 && index >= 20))
                "
                height="40"
                width="40"
                style="border: 2px solid gray; margin: 0 4px 4px 0; cursor: pointer; float: right"
                @click="handleChartSelection(item.id)"
                :src="'data:image/svg+xml;utf8,' + encodeURIComponent(item.svgCode)"
              />
              <img
                v-else-if="(thumbnailPage == 0 && index < 20) || (thumbnailPage == 1 && index >= 20)"
                height="40"
                width="40"
                style="
                  border: 1px solid silver;
                  opacity: 0.7;
                  margin: 0 4px 4px 0;
                  cursor: not-allowed;
                  float: right;
                "
                :src="'data:image/svg+xml;utf8,' + encodeURIComponent(item.svgCode)"
              />
            </div>
            <splitpanes class="default-theme" horizontal style="width: 100%; height: 770px">
              <pane size="70">
                <div
                  ref="chartContainerRef"
                  id="chartContainer"
                  style="
                    height: 99%;
                    width: 100%;
                    padding: 20px;
                    text-align: center;
                    border: 1px solid;
                    background-color: white;
                  "
                >
                </div>
                <div
                  id="gojsContainer"
                  ref="gojsContainerRef"
                  style="height: 1%; width: 100%; display: none"
                ></div>
              </pane>
              <pane size="30">
                <div id="tableDiv" style="height: 800px; border: solid 1px; margin-top: 5px">
                  <BasicTable
                    :size="'small'"
                    :bordered="true"
                    :show-table-setting="false"
                    :columns="tableDataset.columns"
                    :data-source="datasetInfo.dataset[datasetInfo.index].data"
                    :show-index-column="false"
                    :use-search-form="false"
                    :pagination="false"
                    :scroll="{ y: 650 }"
                    @resizeColumn="
                      (w, col) => {
                        col.width = w;
                      }
                    "
                  >
                    <template #headerCell="{ column }">
                      <HeaderCell :column="column" />
                      <Tooltip v-if="!column.action">
                        <template #title>{{ t('dataviz.dataview.table.title.metrics') }}</template>
                        <FundOutlined
                          v-if="column.metrics"
                          class="ml-2"
                          :style="{
                            fontSize: '16px',
                            color: column.selected ? '#08c' : 'gray',
                            cursor: 'pointer',
                          }"
                          @click="handleColumnClick('metrics', column)"
                        />
                        <RadarChartOutlined
                          v-else
                          class="ml-2"
                          :style="{
                            fontSize: '16px',
                            color: column.selected ? '#08c' : 'gray',
                            cursor: 'pointer',
                          }"
                          @click="handleColumnClick('dim', column)"
                        />&nbsp;
                      </Tooltip>
                      <Tooltip v-if="!column.action">
                        <template #title>{{ t('dataviz.dataview.table.action.filter') }}</template>
                        <Dropdown placement="bottom" :trigger="['click']">
                          <FilterOutlined
                            class="ml-2"
                            :style="{
                              fontSize: '16px',
                              color: column.filter ? '#08c' : 'gray',
                              cursor: 'pointer',
                            }"
                            @click="
                              () => {
                                columnFilterEditor = column.filter;
                              }
                            "
                          />
                          <template #overlay>
                            <Menu>
                              <MenuItem key="default">
                                <Input
                                  allowClear
                                  :placeholder="column.filter"
                                  v-model:value="columnFilterEditor"
                                  @pressEnter="
                                    handleColumnClick('filter', column, columnFilterEditor)
                                  "
                                />
                              </MenuItem>
                            </Menu>
                          </template>
                        </Dropdown>
                      </Tooltip>
                      <Tooltip v-if="column.selected">
                        <template #title>{{ t('dataviz.dataview.table.action.sorter') }}</template>
                        <SortAscendingOutlined
                          v-if="column.order === 'ASC'"
                          class="ml-2"
                          :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                          @click="handleColumnClick('sorter', column, 'DESC')"
                        />
                        <SortDescendingOutlined
                          v-else-if="column.order === 'DESC'"
                          class="ml-2"
                          :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                          @click="handleColumnClick('sorter', column, undefined)"
                        />
                        <SortAscendingOutlined
                          v-else
                          class="ml-2"
                          :style="{ fontSize: '16px', color: 'gray', cursor: 'pointer' }"
                          @click="handleColumnClick('sorter', column, 'ASC')"
                        />
                      </Tooltip>
                      <Tooltip v-if="column.calc">
                        <template #title>{{ t('dataviz.dataview.form.calc.update') }}</template>
                        <FormOutlined
                          class="ml-2"
                          :style="{
                            fontSize: '16px',
                            color: '#08c',
                            cursor: 'pointer',
                          }"
                          @click="handleCalculation('update', column.name)"
                        />
                      </Tooltip>
                      <Tooltip v-if="column.calc">
                        <template #title>{{ t('dataviz.dataview.form.calc.delete') }}</template>
                        <DeleteOutlined
                          class="ml-2"
                          :style="{
                            fontSize: '16px',
                            color: '#08c',
                            cursor: 'pointer',
                          }"
                          @click="handleCalculation('delete', column.name)"
                        />
                      </Tooltip>
                      <Tooltip v-if="column.action">
                        <template #title>{{ t('dataviz.dataview.form.calc.new') }}</template>
                        <PlusSquareOutlined
                          class="ml-2"
                          :style="{
                            fontSize: '16px',
                            color: '#08c',
                            cursor: 'pointer',
                          }"
                          @click="handleCalculation('new')"
                        />
                      </Tooltip>
                    </template>
                  </BasicTable>
                </div>
              </pane>
            </splitpanes>
          </div>
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
                  :api="API_DATAVIEW_GROUPS"
                  mode="tags"
                  v-model:value="model[field]"
                  resultField="records"
                  @change="handleDataviewGroupChange"
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
              layout="vertical"
              :forceRender="true"
              :schemas="formConfigSchema"
              :showActionButtonGroup="false"
              @fieldValueChange="handleConfigChange"
            >
              <template #datasetSelectTree="{ model, field }">
                <ApiTreeSelect
                  placeholder="Select Dataset"
                  :api="API_DATASET_TREE"
                  v-model:value="model[field]"
                  :immediate="true"
                  resultField="records"
                  :fieldNames="{ key: 'id', label: 'name', value: 'id' }"
                  style="width: 100%"
                  @change="handleDatasetChange"
                />
              </template>
              <template #dimSelect="{ model, field }">
                <Select
                  allow-clear
                  mode="multiple"
                  v-model:value="model[field]"
                  :options="dimFieldOptions"
                  :field-names="{ key: 'id', label: 'name', value: 'name' }"
                  @change="handleFieldSelection('dim', model[field])"
                >
                  <template #tagRender="{ label, onClose }">
                    <Tag closable="true" color="blue" @close="onClose">
                      {{ label }}&nbsp;&nbsp;
                    </Tag>
                  </template>
                  <template #option="{ metrics, title }">
                    <b v-if="metrics"><FundOutlined />&nbsp;{{ title }}</b>
                    <template v-else><RadarChartOutlined />&nbsp;{{ title }}</template>
                  </template>
                </Select>
              </template>
              <template #locSelect="{ model, field }">
                <Select
                  allow-clear
                  mode="multiple"
                  v-model:value="model[field]"
                  :options="dimFieldOptions"
                  :field-names="{ key: 'id', label: 'name', value: 'name' }"
                  @change="handleFieldSelection('loc', model[field])"
                >
                  <template #tagRender="{ label, onClose }">
                    <Tag closable="true" color="blue" @close="onClose">
                      {{ label }}&nbsp;&nbsp;
                    </Tag>
                  </template>
                  <template #option="{ metrics, title }">
                    <b v-if="metrics"><FundOutlined />&nbsp;{{ title }}</b>
                    <template v-else><RadarChartOutlined />&nbsp;{{ title }}</template>
                  </template>
                </Select>
              </template>
              <template #relSelect="{ model, field }">
                <Select
                  allow-clear
                  mode="multiple"
                  v-model:value="model[field]"
                  :options="dimFieldOptions"
                  :field-names="{ key: 'id', label: 'name', value: 'name' }"
                  @change="handleFieldSelection('rel', model[field])"
                >
                  <template #tagRender="{ label, onClose }">
                    <Tag closable="true" color="blue" @close="onClose">
                      {{ label }}&nbsp;&nbsp;
                    </Tag>
                  </template>
                  <template #option="{ metrics, title }">
                    <b v-if="metrics"><FundOutlined />&nbsp;{{ title }}</b>
                    <template v-else><RadarChartOutlined />&nbsp;{{ title }}</template>
                  </template>
                </Select>
              </template>
              <template #metricsSelect="{ model, field }">
                <Select
                  allow-clear
                  mode="multiple"
                  v-model:value="model[field]"
                  :options="configFieldOptions"
                  :field-names="{ key: 'id', label: 'name', value: 'name' }"
                  @change="handleFieldSelection('metrics', model[field])"
                >
                  <template #tagRender="{ label, onClose }">
                    <Tag closable="true" color="green" @close="onClose">
                      {{ label }}&nbsp;&nbsp;
                    </Tag>
                  </template>
                  <template #option="{ metrics, title }">
                    <b v-if="metrics"><FundOutlined />&nbsp;{{ title }}</b>
                    <template v-else><RadarChartOutlined />&nbsp;{{ title }}</template>
                  </template>
                </Select>
              </template>
            </BasicForm>
            <fieldset class="filesets">
              <legend style="padding: 0.5em; width: auto; font-size: 15px">
                {{ t('dataviz.dataview.form.config.fields.var') }}
                <PlusSquareTwoTone
                  class="ml-2"
                  :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                  @click="openVarModal(true, {})"
                />
              </legend>
              <BasicTree
                :treeData="varFieldList"
                :actionList="treeAction"
                @dblclick="handleVarUpdate"
              />
            </fieldset>
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
              display: rightPanelKey == 'custom' ? 'block' : 'none',
            }"
          >
            <LeafletAdapter
              v-if="rawData.libName == 'Leaflet'"
              ref="leafletRef"
              version=""
              config="{}"
              @change="handleCustomLeafletChange"
            />
            <cyAdapter
              v-if="rawData.libName == 'Cytoscape'"
              ref="cyRef"
              version=""
              config="{}"
              @change="handleCustomCyChange"
            />
            <G2plotAdapter
              v-else
              ref="g2plotRef"
              version=""
              config="{}"
              @change="handleCustomG2plotChange"
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
              display: rightPanelKey == 'advance' ? 'block' : 'none',
            }"
          >
            <Form layout="inline">
              <FormItem name="libName" :wrapperCol="{ style: { width: '200px' } }">
                <ApiSelect
                  size="small"
                  v-model:value="rawData.libName"
                  :disabled="advancedInfo.disabled"
                  :placeholder="t('dataviz.dataview.form.advance.lib_name')"
                  :api="API_PARAM_GET"
                  params="dataviz.dataview.chart_lib"
                  immediate="true"
                  labelField="name"
                  valueField="name"
                  :afterFetch="
                    (v) => {
                      // save libs for libName change
                      advancedInfo.libs = v.value;
                      advancedInfo.selectedLib = v.value.find((e) => {
                        return e.name == rawData.libName;
                      });
                      return v.value;
                    }
                  "
                  @change="handAdvLibNameChange"
                />
              </FormItem>
              <FormItem
                name="libVer"
                :wrapperCol="{ style: { width: '160px', marginLeft: '-15px' } }"
              >
                <Select
                  size="small"
                  v-model:value="rawData.libVer"
                  :disabled="advancedInfo.disabled"
                  :options="
                    advancedInfo.selectedLib.ver.map((item) => ({ label: item, value: item }))
                  "
                  :placeholder="t('dataviz.dataview.form.advance.lib_ver')"
                />
              </FormItem>
              <FormItem name="apply" :wrapperCol="{ offset: 10 }">
                <Button
                  type="primary"
                  size="small"
                  :disabled="advancedInfo.disabled"
                  @click="handleAdvApply"
                >
                  {{ t('dataviz.dataview.form.advance.apply') }}
                </Button>
              </FormItem>
            </Form>
            <div id="codeEditor" style="width: 100%; height: 750px; border-top: solid 1px gray">
              <CodeEditor
                border
                :readonly="advancedInfo.disabled"
                class="code-mirror"
                placeholder="Chart Config"
                v-model:value="advancedInfo.textCfg"
                mode="application/json"
              />
            </div>
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
      <MenuItem key="custom">
        <template #icon>
          <MacCommandFilled
            :style="{
              fontSize: '24px',
              color: 'green',
            }"
          />
        </template>
        <span>Custom</span>
      </MenuItem>
      <MenuItem key="advance">
        <template #icon>
          <SketchCircleFilled
            :style="{
              fontSize: '24px',
              color: 'green',
            }"
          />
        </template>
        <span>Advance</span>
      </MenuItem>
    </Menu>
    <CalcModal @register="registerCalcModal" @success="handleSuccess" />
    <VarModal @register="registerVarModal" @success="handleSuccess" />
  </BasicDrawer>
</template>

<script lang="ts" setup name="DetailForm">
  import { computed, h, nextTick, reactive, ref, unref, watch } from 'vue';
  import { BasicForm, FormActionType } from '/@/components/Form/index';
  import {
    formInfoSchema,
    formConfigSchema,
    mapTypes,
    pointsData,
    netTypes,
    initMarkerMapCfg,
    initBubbleMapCfg,
    initChoroplethMapCfg,
    initHeatMapCfg,
    initMovementMapCfg,
    initMigrationMapCfg,
    initMapInfo,
    initNetInfo,
  } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTable } from '/@/components/Table';
  import HeaderCell from '/@/components/Table/src/components/HeaderCell.vue';
  import {
    PlaySquareTwoTone,
    SaveTwoTone,
    FundOutlined,
    RadarChartOutlined,
    PlusSquareTwoTone,
    DeleteOutlined,
    SketchOutlined,
    SortAscendingOutlined,
    SortDescendingOutlined,
    FilterOutlined,
    PlusSquareOutlined,
    FormOutlined,
    DownSquareOutlined,
    InfoCircleFilled,
    SketchCircleFilled,
    MacCommandFilled,
    SettingFilled,
  } from '@ant-design/icons-vue';
  import { BasicTree, TreeActionItem } from '/@/components/Tree';
  import { Splitpanes, Pane } from 'splitpanes';
  import 'splitpanes/dist/splitpanes.css';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ApiTreeSelect } from '/@/components/Form';
  import {
    message,
    Tooltip,
    Button,
    Tag,
    Select,
    Row,
    Col,
    InputNumber as AInputNumber,
    Form,
    FormItem,
    Dropdown,
    Menu,
    MenuItem,
    Input,
    Upload,
    UploadProps,
  } from 'ant-design-vue';
  import { API_DATASET_EXECUTE, API_DATASET_GET } from '/@/api/dataviz/dataset';
  import Thumbnails from '@antv/thumbnails';
  import { Advisor, DataFrame } from '@antv/ava';
  import { API_DATASET_TREE } from '/@/api/dataviz/dataset';
  import { useModal } from '/@/components/Modal';
  import CalcModal from './calcModal.vue';
  import VarModal from './varModal.vue';
  import { setGlobal } from '@antv/g2plot';
  import { CodeEditor } from '/@/components/CodeEditor';
  import {
    AntAvaType,
    ApiDataviewDataType,
    DatasetInfoType,
    initAva,
    initDataview,
  } from '/@/api/dataviz/model/dataview';
  import { ApiSelect } from '/@/components/Form';
  import 'vue-json-pretty/lib/styles.css';
  import ApexCharts from 'apexcharts';
  import { g2plotRender, specToG2PlotConfig } from '@antv/antv-spec';
  import * as echarts from 'echarts';
  import * as am4core from '@amcharts/amcharts4/core';
  import * as am4charts from '@amcharts/amcharts4/charts';
  import am4themes_animated from '@amcharts/amcharts4/themes/animated';
  import L from 'leaflet';
  import { PanelLayers } from '/@/thirdparty/leaflet/leaflet-panel-layers.src';
  import '/@/thirdparty/leaflet/css/MarkerCluster.Default.css';
  import '/@/thirdparty/leaflet/css/MarkerCluster.css';
  import 'leaflet.featuregroup.subgroup/dist/leaflet.featuregroup.subgroup-src';
  //import { PruneCluster, PruneClusterForLeaflet } from '/@/thirdparty/leaflet/PruneCluster';
  //import '/@/thirdparty/leaflet/css/PruneCluster.css';
  import 'leaflet/dist/leaflet.css';
  import { ZoomBar } from '/@/thirdparty/leaflet/L.Control.ZoomBar.js';
  import '/@/thirdparty/leaflet/css/L.Control.ZoomBar.css';
  import 'leaflet.fullscreen2';
  import 'leaflet-search';
  import '/@/thirdparty/leaflet/css/leaflet.fullscreen2.css';
  import 'leaflet-search/dist/leaflet-search.src.css';
  import { GeoNames } from '/@/thirdparty/leaflet/L.Control.Geonames';
  import '/@/thirdparty/leaflet/css/L.Control.Geonames.css';
  import Locate from 'leaflet.locatecontrol';
  import 'leaflet.locatecontrol/dist/L.Control.Locate.css';
  //import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
  import 'leaflet-geosearch/dist/geosearch.css';
  import { EasyPrint } from '/@/thirdparty/leaflet/easyPrint';
  import 'leaflet-quadtree';
  import { SlideMenu } from '/@/thirdparty/leaflet/L.Control.SlideMenu';
  import '/@/thirdparty/leaflet/css/L.Control.SlideMenu.css';
  import 'leaflet.timeline/dist/TimelineSliderControl';
  import 'leaflet.timeline/dist/Timeline';
  import '/@/thirdparty/leaflet/css/timeline.css';
  import 'leaflet.coordinates/dist/Leaflet.Coordinates-0.1.5.src';
  import 'leaflet.coordinates/dist/Leaflet.Coordinates-0.1.5.css';
  import 'leaflet-easybutton';
  import 'leaflet-easybutton/src/easy-button.css';
  import '/@/thirdparty/leaflet/css/leaflet-panel-layers.src.css';
  import '/@/thirdparty/leaflet/css/leaflet.extra-markers.css';
  import '/@/assets/fontawesome-free/css/all.min.css';
  import '/@/thirdparty/leaflet/css/leaflet-beautify-marker-icon.css';
  import '@ansur/leaflet-pulse-icon/dist/L.Icon.Pulse.css';
  import 'heatmap.js/build/heatmap';
  import 'leaflet-choropleth';
  import '/@/thirdparty/leaflet/leaflet.migrationLayer';
  import chroma from 'chroma-js';
  import cytoscape from 'cytoscape';
  import viewUtilities from 'cytoscape-view-utilities';
  import { panzoom } from '/@/thirdparty/cytoscape/cytoscape-panzoom';
  import '/@/thirdparty/cytoscape/css/cytoscape.js-panzoom.css';
  import '/@/thirdparty/cytoscape/css/cytoscape.js-popper.css';
  import fcose from 'cytoscape-fcose';
  import cise from 'cytoscape-cise';
  import d3Force from 'cytoscape-d3-force';
  import dagre from 'cytoscape-dagre';
  import cola from 'cytoscape-cola';
  import klay from 'cytoscape-klay';
  import popper from 'cytoscape-popper';
  import spread from 'cytoscape-spread';
  import avsdf from 'cytoscape-avsdf';
  import elk from 'cytoscape-elk';
  import { DataView } from '@antv/data-set';
  import { cloneDeep } from 'lodash-es';
  import { useLocale } from '/@/locales/useLocale';
  import { API_PARAM_GET } from '/@/api/admin/param';
  import {
    API_DATAVIEW_CREATE,
    API_DATAVIEW_GROUPS,
    API_DATAVIEW_UPDATE,
  } from '/@/api/dataviz/dataview';
  import G2plotAdapter from '/@/views/dataviz/dataview/g2plotAdapter.vue';
  import LeafletAdapter from '/@/views/dataviz/dataview/leafletAdapter.vue';
  import CyAdapter from '/@/views/dataviz/dataview/cyAdapter.vue';
  import _ from 'lodash';
  import { ChartAntVSpec } from '@antv/antv-spec/lib/src/schema';
  import { Parser } from 'expr-eval';
  import { baseLayerLib, overLayerLib } from '/@/views/dataviz/dataview/leafletData';
  import template from 'template_js';
  import {
    addVirRootNode,
    buildCyNestNet,
    buildCyNetEvents,
    buildCyNetTooltip,
    buildCyStyle,
    buildCyTreeNet,
    convertArrayToTree,
    convertGroupToTree,
    getAwesomeSvgIcon,
    getGojsLayout,
    getMaxTreeDepth,
    renderGoLayoutByCy,
  } from '/@/views/dataviz/dataview/cyFunc';
  import {
    buildBubbleMap,
    buildChoroplethMap,
    buildHeatMap,
    buildMarkerMap,
    buildMigrationMap,
    buildMovementMap,
    buildTimelineMap,
    getVisibleMarkers,
    renderFileLayer,
  } from '/@/views/dataviz/dataview/leafletFunc';
  import $ from 'jquery';
  import {
    cyLayoutLib,
    initStarNetCfg,
    initTreeNetCfg,
    defaultNodeIcon,
    defaultMarkerShapes,
    defaultNodeBody,
    nodeBodyMap,
    defaultCyStyle,
    initNestNetCfg,
  } from '/@/views/dataviz/dataview/cyData';

  const { t } = useI18n();
  const drawerTitle = ref<string>(t('common.form.new'));
  const emit = defineEmits(['success', 'register']);
  const rawData = ref<ApiDataviewDataType>(initDataview);
  const rightPanelSize = ref<number>(4);
  const rightPanelKey = ref<string>('config');
  const selectedPanelKeys = ref<string[]>(['config']);
  const chartContainerRef = ref<any>();
  const gojsContainerRef = ref<any>();
  const infoFormRef = ref<Nullable<FormActionType>>(null);
  const configFormRef = ref<Nullable<FormActionType>>(null);
  const g2plotRef = ref();
  const leafletRef = ref();
  const cyRef = ref();
  const uploadRef = ref();
  const chartTypes = ref<any>({ ...Thumbnails, ...mapTypes, ...netTypes });
  const thumbnailPage = ref<number>(0);
  const advancedInfo = reactive<any>({
    disabled: true,
    libs: [],
    selectedLib: { ver: [] },
    textCfg: '',
  });
  const antAvaInfo: any = reactive<AntAvaType>({ ...initAva });
  const datasetInfo = reactive<DatasetInfoType>({
    index: 0,
    viewData: [],
    dataInfo: [],
    dataset: [{ variable: [], columns: [], data: [], total: 0 }],
    limit: 100,
  });
  const columnFilterEditor = ref<string>();
  const avaAdvisor = new Advisor();
  // set locale of G2Plot
  const { getLocale } = useLocale();
  setGlobal({ locale: getLocale.value });
  template.config({ sTag: '{', eTag: '}' });

  // Calculation modal register
  const [registerCalcModal, { openModal: openCalcModal }] = useModal();

  // Variable modal register
  const [registerVarModal, { openModal: openVarModal }] = useModal();

  // drawer data initialization
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    // remove old data of info form
    if (infoFormRef.value) {
      await infoFormRef.value.resetFields();
    }

    setDrawerProps({ confirmLoading: false });

    resetDataview();

    // save received data
    rawData.value = data;

    // get drawer title
    if (data && data.id) {
      drawerTitle.value = '[' + data.name + ']';
    } else {
      drawerTitle.value = t('common.form.new');
    }

    // initialize dataset info of config form
    datasetInfo.index = 0;
    datasetInfo.viewData = [];
    datasetInfo.treeData = []; // for network chart
    datasetInfo.dataInfo = [];
    datasetInfo.limit = 100;
    datasetInfo.dataset = [{ variable: [], columns: [], data: [], total: 0 }];

    // pass received data to info form
    if (infoFormRef.value) {
      infoFormRef.value.setFieldsValue(data);
    }

    // initialize dataset id of config form
    if (configFormRef.value) {
      configFormRef.value.setFieldsValue({
        datasetId: data.datasetId,
        dim: data.dim,
        metrics: data.metrics,
        agg: data.agg,
      });

      if (data.type) {
        // selected chart type
        chartTypes.value[data.type].active = true;
        thumbnailPage.value = chartTypes.value[data.type].page ? 1 : 0;
      }
    }

    // initialize advance config
    advancedInfo.disabled = true;
    advancedInfo.textCfg = JSON.stringify(data.libCfg);

    // pass lib config to custom adapter
    passConfigToAdapter(rawData.value.libCfg, rawData.value.libName, rawData.value.libVer);

    // query data
    execute();
  });

  /*
   * switch panel - info/config/custom/advance
   */
  const handleMenuSwitch = async (menu: any) => {
    if (rightPanelKey.value == menu.key && rightPanelSize.value > 0) {
      rightPanelSize.value = 0;
      return;
    }

    rightPanelKey.value = menu.key;
    if (menu.key == 'info' || menu.key == 'config') {
      rightPanelSize.value = 4;
    } else {
      rightPanelSize.value = 7;
    }
  };

  // table column names and records
  const tableDataset = computed(() => {
    const datasetItem = datasetInfo.dataset[datasetInfo.index];
    if (datasetItem) {
      return datasetItem;
    } else {
      return { columns: [], records: [] };
    }
  });

  // combined dim and metrics filed for selection on config form
  const dimFieldOptions = computed(() => {
    const datasetItem = datasetInfo.dataset[datasetInfo.index];
    if (datasetItem && datasetItem.columns.length > 0) {
      let dimMetrics: any[] = [];
      for (const item of datasetItem.columns) {
        if (!item.metrics && !item.action) {
          // add dim first
          dimMetrics.push(item);
        }
      }
      return dimMetrics;
    } else {
      return [];
    }
  });

  // combined dim and metrics filed for selection on config form
  const configFieldOptions = computed(() => {
    const datasetItem = datasetInfo.dataset[datasetInfo.index];
    if (datasetItem && datasetItem.columns.length > 0) {
      let dimMetrics: any[] = [];
      for (const item of datasetItem.columns) {
        if (!item.metrics && !item.action) {
          // add dim first
          dimMetrics.push(item);
        }
      }
      for (const item of datasetItem.columns) {
        if (item.metrics && !item.action) {
          // add metrics after dim
          dimMetrics.push(item);
        }
      }
      return dimMetrics;
    } else {
      return [];
    }
  });

  // variable computation filed for tree display
  const varFieldList = computed(() => {
    let varRet: any[] = [];
    if (rawData.value.variable) {
      for (const item of rawData.value.variable) {
        let varClone = JSON.parse(JSON.stringify(item));
        // combine variable name and value into title for displaying
        varClone.title = item.name + ': ' + item.value;
        varRet.push(varClone);
      }
    }

    const datasetItem = datasetInfo.dataset[datasetInfo.index];
    if (datasetItem && datasetItem.variable) {
      for (const item of datasetItem.variable) {
        let varClone = JSON.parse(JSON.stringify(item));
        // combine variable name and value into title for displaying
        varClone.title = item.name + ': ' + item.value;
        varClone.disabled = true;
        varRet.push(varClone);
      }
    }

    return varRet;
  });

  // show delete icon in variable tree
  const treeAction: TreeActionItem[] = [
    {
      render: (node) => {
        if (node.disabled) {
          return null;
        } else {
          return h(DeleteOutlined, {
            class: 'ml-2',
            onClick: () => {
              const idx = rawData.value.variable.findIndex((v) => {
                return v.name == node.name;
              });
              // remove variable
              rawData.value.variable.splice(idx, 1);
            },
          });
        }
      },
    },
  ];

  /*
   * click dim icon on table column to add/remove it from list
   */
  async function handleColumnClick(key: string, column: any, value: any = undefined) {
    if (key == 'dim' || key == 'metrics') {
      if (!rawData.value[key]) {
        rawData.value[key] = [];
      }

      if (column.selected) {
        // remove a dim from list
        for (let i = 0; i < rawData.value[key].length; i++) {
          if (rawData.value[key][i] == column.name) {
            rawData.value[key].splice(i, 1);
          }
        }
        delete column.selected;
      } else {
        // add a dim to list
        rawData.value[key].push(column.name);
        column.selected = true;
      }

      if (configFormRef.value) {
        if (key == 'dim') {
          configFormRef.value.setFieldsValue({ dim: rawData.value[key] });
        } else {
          configFormRef.value.setFieldsValue({ metrics: rawData.value[key] });
        }
      }

      // invoke this to trigger advice
      handleFieldSelection(key, rawData.value[key]);
    } else if (key == 'sorter') {
      column.order = value;
      if (rawData.value.sorter) {
        let isFound = false;
        for (let i = 0; i < rawData.value.sorter.length; i++) {
          let ele = rawData.value.sorter[i];
          const sortParts = ele.split(' ');
          if (sortParts[0] == column.name) {
            isFound = true;
            if (value) {
              // asc or desc
              rawData.value.sorter[i] = column.name + ' ' + value;
            } else {
              // remove it from sorter
              rawData.value.sorter.splice(i, 1);
            }
            break;
          }
        }

        if (!isFound && value) {
          // add a new one
          rawData.value.sorter.push(column.name + ' ' + value);
        }
      } else {
        rawData.value.sorter = [];
        rawData.value.sorter.push(column.name + ' ' + value);
      }

      // apply aggregation to data
      dataTransform();

      // render chart
      renderChart();
    } else if (key == 'filter') {
      column.filter = cloneDeep(value);
      if (rawData.value.filter) {
        if (value) {
          rawData.value.filter[column.name] = value;
        } else {
          // remove empty filter
          delete rawData.value.filter[column.name];
        }
      } else {
        rawData.value.filter = {};
        rawData.value.filter[column.name] = value;
      }

      // apply aggregation to data
      dataTransform();

      // render chart
      renderChart();
    }
  }

  /*
   * only pick up the latest one as selected field when selecting change
   * select component accepts user defined item when it is tags mode
   * so you can select existing group name or create a new group
   */
  const handleDataviewGroupChange = (value: string[]) => {
    if (infoFormRef.value && value.length > 1) {
      // get the latest one when there are multiple selections
      infoFormRef.value.setFieldsValue({ group: value[value.length - 1] });
    }
  };

  /*
   * load indicated dataset when it is changed
   */
  const handleDatasetChange = (key: any) => {
    // by default the dataset of dataview will be loaded when the detail panel is shown
    rawData.value.datasetId = key;
    if (infoFormRef.value) {
      infoFormRef.value.setFieldsValue({ datasetId: key });
    }

    // clean up
    resetDataview();

    // find cached dataset
    const datasetIdx = datasetInfo.dataset.findIndex((ele) => {
      return ele.id == key;
    });
    if (!datasetIdx || datasetIdx < 0) {
      // query dataset and data if it was not cached
      execute();
    } else {
      // switch to it if it is found
      datasetInfo.index = datasetIdx;
    }
  };

  /*
   * aggregation config change
   */
  const handleConfigChange = (key: string, operation: string) => {
    if (key == 'agg') {
      rawData.value[key] = operation;

      // apply aggregation to data
      dataTransform();

      // render chart
      renderChart();
    } else if (key == 'prec') {
      rawData.value[key] = operation;
      // apply aggregation to data
      dataTransform();

      // render chart
      renderChart();
    }
  };

  /*
   * apply aggregation method to data
   */
  const dataTransform = () => {
    if (
      !datasetInfo.dataset ||
      !datasetInfo.dataset[datasetInfo.index].data ||
      !rawData.value.dim ||
      !rawData.value.metrics
    ) {
      // data is not available or dim/metrics is empty
      datasetInfo.viewData.length = 0;
      datasetInfo.dataInfo = [];
      return;
    }

    // has data and transform is needed
    const datasetItem = datasetInfo.dataset[datasetInfo.index];
    const dv = new DataView().source(datasetItem.data);

    let transfered = false;
    if (rawData.value.filter && Object.keys(rawData.value.filter).length > 0) {
      transfered = true;
      let expressions: string[] = [];

      // combine multiple expressions with '&&'
      for (let key in rawData.value.filter) {
        expressions.push('(' + rawData.value.filter[key] + ')');
      }
      const exprStr = expressions.join(' && ');

      const parser = new Parser();
      let expr = parser.parse(exprStr);
      dv.transform({
        type: 'filter',
        callback(row) {
          return expr.evaluate(row);
        },
      });
    }

    if (rawData.value.agg) {
      // aggregate data by operation count/sum/mean/median/min/max
      transfered = true;
      dv.transform({
        type: 'aggregate',
        fields: rawData.value.metrics,
        operations: [rawData.value.agg],
        as: rawData.value.metrics,
        groupBy: rawData.value.dim,
      });
    }

    console.log('<Pie> aggregated data length: ' + dv.rows.length);
    // sort aggregated data
    if (rawData.value.sorter && rawData.value.sorter.length > 0) {
      transfered = true;
      let fields: string[] = [],
        orders: string[] = [];
      for (const item of rawData.value.sorter) {
        const sortParts = item.split(' ');
        fields.push(sortParts[0]);
        orders.push(sortParts[1].toUpperCase());
      }

      // how to sort by multiple fields with different orders ???
      dv.transform({
        type: 'sort-by',
        fields: fields,
        order: orders[0],
      });
    }

    // data precision
    if (transfered) {
      if (rawData.value.prec) {
        for (let cell of dv.rows) {
          for (let mField of rawData.value.metrics) {
            cell[mField] = (cell[mField] + Number.EPSILON).toFixed(rawData.value.prec);
          }
        }
      }

      datasetInfo.viewData = dv.rows;
    } else {
      datasetInfo.viewData = datasetInfo.dataset[datasetInfo.index].data;
    }

    if (rawData.value.libName == 'Cytoscape') {
      if (rawData.value.libCfg.config.dataMode == 'FieldLevel') {
        datasetInfo.treeData = convertGroupToTree(datasetInfo.viewData, rawData.value.dim, 0);
      } else if (rawData.value.libCfg.config.dataMode == 'IdPid') {
        datasetInfo.treeData = convertArrayToTree(
          datasetInfo.viewData,
          null,
          rawData.value.dim[0],
          rawData.value.relation[0],
          rawData.value.relation[1],
          0,
        );
      }
    }

    const dataFrame = new DataFrame(datasetInfo.viewData);
    datasetInfo.dataInfo = dataFrame.info();
  };

  /*
   * advise chart when dim/metrics field is changed
   */
  const handleFieldSelection = async (key: string, fields: string[]) => {
    const removedField: string[] = _.difference(rawData.value[key], fields);
    if (removedField) {
      for (const column of datasetInfo.dataset[datasetInfo.index].columns) {
        if (removedField[0] == column.name) {
          // remove selection flag from table header
          column.selected = false;
          break;
        }
      }
    }

    rawData.value[key] = fields;
    // highlight column icon on table
    for (const field of fields) {
      for (const column of datasetInfo.dataset[datasetInfo.index].columns) {
        if (field == column.name) {
          column.selected = true;
          break;
        }
      }
    }

    if (
      !rawData.value.dim ||
      !rawData.value.metrics ||
      rawData.value.dim.length < 1 ||
      rawData.value.metrics.length < 1 ||
      (rawData.value.relation && rawData.value.relation.length != 2)
    ) {
      // no dim or metrics is selected
      return;
    }

    // redo aggregation based on selected dim, metrics and agg method
    dataTransform();

    // put dim and metrics together
    const combinedFields: string[] = rawData.value.dim.concat(rawData.value.metrics);

    //remove previous highlight and selection
    for (let item in chartTypes.value) {
      chartTypes.value[item].advised = false;
      chartTypes.value[item].active = false;
    }

    // get advised charts
    antAvaInfo.advices.length = 0;
    antAvaInfo.libCfg.length = 0;
    antAvaInfo.advices = avaAdvisor.advise({
      data: datasetInfo.viewData, // json array
      fields: combinedFields,
      options: { refine: true },
    });

    if (antAvaInfo.advices.length > 0) {
      for (let advice of antAvaInfo.advices) {
        //highlight advised charts
        chartTypes.value[advice.type].advised = true;
        // convert all spec to g2plot config and remove data
        antAvaInfo.libCfg.push(specToChartConfig(advice.spec, rawData.value.libName));
      }
    }

    // detect if it is possible to build map chart
    const advicedMapCfg: any[] = mapChartDetect(
      rawData.value.dim,
      rawData.value.metrics,
      datasetInfo.dataInfo,
    );

    for (const mapAdvice of advicedMapCfg) {
      const mapType = mapAdvice.chartType.toLowerCase() + '_map';
      antAvaInfo.advices.push({ type: mapType });
      antAvaInfo.libCfg.push(mapAdvice);
      chartTypes.value[mapType].advised = true;
    }

    // detect if it is possible to build net chart
    const advicedNetCfg = netChartDetect(
      rawData.value.dim,
      rawData.value.rel,
      rawData.value.metrics,
      datasetInfo.dataInfo,
      datasetInfo.viewData,
    );
    for (const netAdvice of advicedNetCfg) {
      const netType = netAdvice.chartType.toLowerCase() + '_net';
      antAvaInfo.advices.push({ type: netType });
      antAvaInfo.libCfg.push(netAdvice);
      chartTypes.value[netType].advised = true;
    }

    if (!antAvaInfo.advices || antAvaInfo.advices.length == 0) {
      // no advise
      return;
    }

    // select the first advised chart as default one
    antAvaInfo.current = 0;
    chartTypes.value[antAvaInfo.advices[0].type].active = true;
    thumbnailPage.value = chartTypes.value[antAvaInfo.advices[0].type].page ? 1 : 0;
    // update chart type name which is the name in chartTypes
    rawData.value.type = antAvaInfo.advices[0].type;
    rawData.value.libCfg = antAvaInfo.libCfg[0];
    advancedInfo.textCfg = JSON.stringify(rawData.value.libCfg);

    if (rawData.value.type.endsWith('_map')) {
      rawData.value.libName = 'Leaflet';
    } else if (rawData.value.type.endsWith('_net')) {
      rawData.value.libName = 'Cytoscape';
    } else {
      rawData.value.libName = 'G2Plot';
    }

    // render chart
    renderChart();
    // pass config to adapter
    await nextTick();
    passConfigToAdapter(rawData.value.libCfg, rawData.value.libName, rawData.value.libVer);
  };

  /*
   * detect if map is available based on current selection (Dim and Metrics)
   * return map config
   */
  const mapChartDetect = (dim: any[], metrics: any[], info: any[]) => {
    const LAT_MIN = -90,
      LAT_MAX = 90,
      LNG_MIN = -180,
      LNG_MAX = 180;
    let libCfgMk = initMarkerMapCfg;
    let libCfgBb = initBubbleMapCfg;
    let libCfgCh = initChoroplethMapCfg;
    let libCfgHeat = initHeatMapCfg;
    let libCfgMove = initMovementMapCfg;
    let libCfgMig = initMigrationMapCfg;
    let possibleMap: any[] = [];
    let locField = {
      lat: undefined,
      lng: undefined,
    };

    for (let fieldName of dim) {
      if (fieldName.toUpperCase() == 'LAT' || fieldName.toUpperCase() == 'LATITUDE') {
        // find lat by name
        locField.lat = fieldName;
        continue;
      } else if (fieldName.toUpperCase() == 'LNG' || fieldName.toUpperCase() == 'LONGITUDE') {
        // find lng by name
        locField.lng = fieldName;
        continue;
      } else if (
        ['VILLAGE', 'COUNTY', 'CITY', 'REGION', 'STATE', 'PROVINCE', 'COUNTRY'].includes(
          fieldName.toUpperCase(),
        )
      ) {
        // detect region name from fieldName
        libCfgCh.config.choropleth.refJoin[1] = fieldName;
        libCfgCh.config.choropleth.colorField = metrics[0];
      }

      const fieldInfo = info.find((ele) => {
        return ele.name == fieldName;
      });
      if (['integer', 'float'].includes(fieldInfo.recommendation)) {
        if (fieldInfo.maximum < LAT_MAX && fieldInfo.minimum > LAT_MIN && !locField.lat) {
          // 90 > lat > -90
          locField.lat = fieldName;
          continue;
        } else if (fieldInfo.maximum < LNG_MAX && fieldInfo.minimum > LNG_MIN && !locField.lng) {
          // 180 > lng > -180
          locField.lng = fieldName;
          continue;
        }
      }

      // in dim maybe there are not only lat/lng but also shapeField/colorField
      if (!libCfgMk.config.marker.shapeField) {
        // set dim to shapeField/colorField
        libCfgMk.config.marker.shapeField = fieldName;
        libCfgBb.config.bubble.colorField = fieldName;
        if (fieldInfo.recommendation == 'string' && fieldInfo.distinct > 0 && fieldInfo.valueMap) {
          // get distinct shapes from statistics info if it is limited enum
          let sIdx = 0;
          libCfgMk.config.marker.shapeMap = [];
          libCfgBb.config.bubble.colorMap = [];
          const stepColors = chroma.scale(['green', 'orange', 'red']).colors(fieldInfo.distinct);
          for (const key of Object.keys(fieldInfo.valueMap)) {
            // build shapeMap based on valueMap for marker map
            libCfgMk.config.marker.shapeMap.push({
              shape: defaultMarkerShapes[sIdx % defaultMarkerShapes.length],
              value: key,
              label: key,
            });
            // build shapeMap based on valueMap for bubble map
            libCfgBb.config.bubble.colorMap.push({
              color: stepColors[sIdx],
              value: key,
              label: key,
            });
            sIdx++;
          }
        }
      }
    }

    // found both lat and lng
    if (locField.lat && locField.lng) {
      libCfgMove.config.latField = locField.lat;
      libCfgMove.config.lngField = locField.lng;
      libCfgMk.config.latField = locField.lat;
      libCfgMk.config.lngField = locField.lng;
      libCfgBb.config.latField = locField.lat;
      libCfgBb.config.lngField = locField.lng;
      libCfgHeat.config.latField = locField.lat;
      libCfgHeat.config.lngField = locField.lng;
      libCfgHeat.config.heat.valueField = metrics[0];
      if (!libCfgMk.config.marker.shapeField) {
        // fix shape by default for marker map
        libCfgMk.config.marker.shape = 'star';
      }
      if (!libCfgBb.config.bubble.colorField) {
        // fix color by default for bubble map
        libCfgBb.config.bubble.color = 'green';
      }

      // set the first metrics to colorField/sizeField
      libCfgMk.config.marker.colorField = metrics[0];
      libCfgBb.config.bubble.sizeField = metrics[0];
      libCfgMove.config.movement.colorField = metrics[0];
      libCfgMig.config.line.colorField = metrics[0];
      const fieldInfo = info.find((ele) => {
        return ele.name == metrics[0];
      });
      // color steps for limited string field

      if (fieldInfo.recommendation == 'string' && fieldInfo.distinct > 0 && fieldInfo.valueMap) {
        // get distinct colors from statistics info if it is limited enum
        let sIdx = 0;
        libCfgMk.config.marker.colorMap = [];
        const stepColors = chroma.scale(['green', 'orange', 'red']).colors(fieldInfo.distinct);
        for (const key of Object.keys(fieldInfo.valueMap)) {
          // build colorMap based on valueMap for marker map
          libCfgMk.config.marker.colorMap.push({
            color: stepColors[sIdx],
            value: key,
            label: key,
          });
          sIdx++;
        }
      } else if (fieldInfo.maximum != undefined && fieldInfo.minimum != undefined) {
        // get two colors from statistics info if it is continues value
        // two steps by default, [min, mean] and [mean, max]
        libCfgMk.config.marker.colorMap = [];
        const stepColors = chroma.scale(['green', 'red']).colors(4);
        if (fieldInfo.count > 8) {
          libCfgMk.config.marker.colorMap.push({
            color: stepColors[0],
            value: [Math.floor(fieldInfo.minimum), Math.floor(fieldInfo.percentile25)],
            label: Math.floor(fieldInfo.minimum) + '~' + Math.floor(fieldInfo.percentile25),
          });
          libCfgMk.config.marker.colorMap.push({
            color: stepColors[1],
            value: [Math.floor(fieldInfo.percentile25), Math.floor(fieldInfo.percentile50)],
            label: Math.floor(fieldInfo.percentile25) + '~' + Math.floor(fieldInfo.percentile50),
          });
          libCfgMk.config.marker.colorMap.push({
            color: stepColors[2],
            value: [Math.floor(fieldInfo.percentile50), Math.floor(fieldInfo.percentile75)],
            label: Math.floor(fieldInfo.percentile50) + '~' + Math.floor(fieldInfo.percentile75),
          });
          libCfgMk.config.marker.colorMap.push({
            color: stepColors[3],
            value: [Math.floor(fieldInfo.percentile75), Math.ceil(fieldInfo.maximum)],
            label: Math.floor(fieldInfo.percentile75) + '~' + Math.ceil(fieldInfo.maximum),
          });
        } else {
          libCfgMk.config.marker.colorMap.push({
            color: stepColors[0],
            value: [Math.floor(fieldInfo.minimum), Math.floor(fieldInfo.mean)],
            label: Math.floor(fieldInfo.minimum) + '~' + Math.floor(fieldInfo.mean),
          });
          libCfgMk.config.marker.colorMap.push({
            color: stepColors[3],
            value: [Math.floor(fieldInfo.mean), Math.ceil(fieldInfo.maximum)],
            label: Math.floor(fieldInfo.mean) + '~' + Math.ceil(fieldInfo.maximum),
          });
        }
      }

      libCfgMove.config.movement.colorMap = libCfgMk.config.marker.colorMap;
      libCfgMig.config.line.colorMap = libCfgMk.config.marker.colorMap;

      // build tooltip to show metrics values
      libCfgMk.config.tooltip = '';
      for (const metricsName of metrics) {
        libCfgMk.config.tooltip += metricsName + ': {=' + metricsName + '}<br/>';
      }
      libCfgMk.config.tooltip = libCfgMk.config.tooltip.substring(
        0,
        libCfgMk.config.tooltip.length - 5,
      );

      // same tooltip for bubble and marker
      libCfgBb.config.tooltip = libCfgMk.config.tooltip;
      libCfgHeat.config.tooltip = libCfgMk.config.tooltip;
      libCfgMove.config.tooltip = libCfgMk.config.tooltip;
      possibleMap.push(libCfgMk);
      possibleMap.push(libCfgBb);
      possibleMap.push(libCfgMove);
      possibleMap.push(libCfgMig);
      if (dim.length == 2) {
        possibleMap.push(libCfgHeat);
      }
    }

    if (libCfgCh.config.choropleth.refJoin.length > 0) {
      const fieldInfo = info.find((ele) => {
        return ele.name == metrics[0];
      });
      const stepColors = chroma.scale(['wheat', 'red']).colors(4);
      libCfgCh.config.choropleth.colorScale = stepColors;
      if (fieldInfo.maximum != undefined && fieldInfo.minimum != undefined) {
        // get two colors from statistics info if it is continues value
        // two steps by default, [min, mean] and [mean, max]
        libCfgCh.config.choropleth.colorMap = [];
        if (fieldInfo.count > 8) {
          libCfgCh.config.choropleth.colorMap.push({
            color: stepColors[0],
            value: [Math.floor(fieldInfo.minimum), Math.floor(fieldInfo.percentile25)],
            label: Math.floor(fieldInfo.minimum) + '~' + Math.floor(fieldInfo.percentile25),
          });
          libCfgCh.config.choropleth.colorMap.push({
            color: stepColors[1],
            value: [Math.floor(fieldInfo.percentile25), Math.floor(fieldInfo.percentile50)],
            label: Math.floor(fieldInfo.percentile25) + '~' + Math.floor(fieldInfo.percentile50),
          });
          libCfgCh.config.choropleth.colorMap.push({
            color: stepColors[2],
            value: [Math.floor(fieldInfo.percentile50), Math.floor(fieldInfo.percentile75)],
            label: Math.floor(fieldInfo.percentile50) + '~' + Math.floor(fieldInfo.percentile75),
          });
          libCfgCh.config.choropleth.colorMap.push({
            color: stepColors[3],
            value: [Math.floor(fieldInfo.percentile75), Math.ceil(fieldInfo.maximum)],
            label: Math.floor(fieldInfo.percentile75) + '~' + Math.ceil(fieldInfo.maximum),
          });
        } else {
          libCfgCh.config.choropleth.colorMap.push({
            color: stepColors[0],
            value: [Math.floor(fieldInfo.minimum), Math.floor(fieldInfo.mean)],
            label: Math.floor(fieldInfo.minimum) + '~' + Math.floor(fieldInfo.mean),
          });
          libCfgCh.config.choropleth.colorMap.push({
            color: stepColors[3],
            value: [Math.floor(fieldInfo.mean), Math.ceil(fieldInfo.maximum)],
            label: Math.floor(fieldInfo.mean) + '~' + Math.ceil(fieldInfo.maximum),
          });
        }
      }

      // build tooltip to show metrics values
      libCfgCh.config.tooltip = '';
      for (const metricsName of metrics) {
        libCfgCh.config.tooltip += metricsName + ': {=' + metricsName + '}<br/>';
      }
      libCfgCh.config.tooltip = libCfgCh.config.tooltip.substring(
        0,
        libCfgCh.config.tooltip.length - 5,
      );

      possibleMap.push(libCfgCh);
    }

    return possibleMap;
  };

  /*
   * detect if network is available based on current selection (Dim and Metrics)
   * return map config
   */
  const netChartDetect = (dim: any[], rel: any[], metrics: any[], info: any[], data: any[]) => {
    if ((!rel && dim.length < 2) || (rel && rel.length != 2)) {
      return [];
    }
    let libCfgTree = initTreeNetCfg;
    let libCfgStar = initStarNetCfg;
    let libCfgNest = initNestNetCfg;
    let possibleNet: any[] = [];
    let dataMode = 'FieldLevel';

    const fieldInfo = info.find((ele) => {
      return ele.name == metrics[0];
    });

    libCfgTree.config.node.icon.colorField = metrics[0];
    libCfgStar.config.node.body.colorField = metrics[0];
    libCfgNest.config.node.body.colorField = metrics[0];
    const bgColors = chroma.scale(['green', 'red']).colors(4);
    if (fieldInfo.maximum != undefined && fieldInfo.minimum != undefined) {
      // two steps: [min, mean] and [mean, max]
      // for steps: [min, pct25], [pct25, pct50], [pct50, pct75] and [pct75, max] when data count > 8
      libCfgTree.config.node.icon.colorMap = [];
      if (fieldInfo.count > 8) {
        libCfgTree.config.node.icon.colorMap.push({
          color: bgColors[0],
          value: [Math.floor(fieldInfo.minimum), Math.floor(fieldInfo.percentile25)],
          label: Math.floor(fieldInfo.minimum) + '~' + Math.floor(fieldInfo.percentile25),
        });
        libCfgTree.config.node.icon.colorMap.push({
          color: bgColors[1],
          value: [Math.floor(fieldInfo.percentile25), Math.floor(fieldInfo.percentile50)],
          label: Math.floor(fieldInfo.percentile25) + '~' + Math.floor(fieldInfo.percentile50),
        });
        libCfgTree.config.node.icon.colorMap.push({
          color: bgColors[2],
          value: [Math.floor(fieldInfo.percentile50), Math.floor(fieldInfo.percentile75)],
          label: Math.floor(fieldInfo.percentile50) + '~' + Math.floor(fieldInfo.percentile75),
        });
        libCfgTree.config.node.icon.colorMap.push({
          color: bgColors[3],
          value: [Math.floor(fieldInfo.percentile75), Math.ceil(fieldInfo.maximum)],
          label: Math.floor(fieldInfo.percentile75) + '~' + Math.ceil(fieldInfo.maximum),
        });
      } else {
        libCfgTree.config.node.icon.colorMap.push({
          color: bgColors[0],
          value: [Math.floor(fieldInfo.minimum), Math.floor(fieldInfo.mean)],
          label: Math.floor(fieldInfo.minimum) + '~' + Math.floor(fieldInfo.mean),
        });
        libCfgTree.config.node.icon.colorMap.push({
          color: bgColors[3],
          value: [Math.floor(fieldInfo.mean), Math.ceil(fieldInfo.maximum)],
          label: Math.floor(fieldInfo.mean) + '~' + Math.ceil(fieldInfo.maximum),
        });
      }
      libCfgStar.config.node.body.colorMap = libCfgTree.config.node.icon.colorMap;
      libCfgNest.config.node.body.colorMap = libCfgTree.config.node.icon.colorMap;
    }

    let treeData: any[] = [];
    if (!rel || rel.length == 0) {
      // convert flat data to tree data based on fields
      treeData = convertGroupToTree(data, dim, 0);
    } else {
      // convert flat data to tree data based on id/pid
      dataMode = 'IdPid';
      treeData = convertArrayToTree(data, null, dim[0], rel[0], rel[1], 0);
    }
    libCfgTree.config.dataMode = dataMode;
    libCfgStar.config.dataMode = dataMode;
    libCfgNest.config.dataMode = dataMode;

    // save data to render net chart
    datasetInfo.treeData = treeData;

    // add root node
    const treeDeep = getMaxTreeDepth(treeData);
    libCfgTree.config.node.icon.shapeField = 'nodeLevel';
    libCfgStar.config.node.body.shapeField = 'nodeLevel';
    for (let i = 0; i < treeDeep; i++) {
      libCfgTree.config.node.icon.shapeMap.push({
        shape: defaultNodeIcon[i],
        value: i,
        label: dataMode == 'FieldLevel' ? dim[i] : i,
      });
      libCfgStar.config.node.body.shapeMap.push({
        shape: defaultNodeBody[i],
        value: i,
        label: dataMode == 'FieldLevel' ? dim[i] : i,
      });
    }

    // tree layout options
    libCfgTree.config.layout.push(
      cyLayoutLib.find((ele) => {
        return ele.alias == 'Mrtree';
      }),
    );
    libCfgStar.config.layout.push(
      cyLayoutLib.find((ele) => {
        return ele.alias == 'Fcose';
      }),
    );
    libCfgNest.config.layout.push(
      cyLayoutLib.find((ele) => {
        return ele.alias == 'Fcose';
      }),
    );

    // build tooltip to show metrics values
    libCfgTree.config.node.icon.tooltip = '';
    for (const metricsName of metrics) {
      libCfgTree.config.node.icon.tooltip += metricsName + ': {=' + metricsName + '}<br/>';
    }
    libCfgTree.config.node.icon.tooltip = libCfgTree.config.node.icon.tooltip.substring(
      0,
      libCfgTree.config.node.icon.tooltip.length - 5,
    );
    libCfgStar.config.node.icon.tooltip = libCfgTree.config.node.icon.tooltip;
    libCfgNest.config.node.icon.tooltip = libCfgTree.config.node.icon.tooltip;

    possibleNet.push(libCfgTree);
    possibleNet.push(libCfgStar);
    possibleNet.push(libCfgNest);
    return possibleNet;
  };

  /*
   * add/update/delete a calculation field
   */
  const handleCalculation = (key: string, name: string) => {
    if (key == 'new') {
      openCalcModal(true, {});
    } else if (key == 'update') {
      let calcField = rawData.value.calculation.find((ele) => ele.name == name);
      openCalcModal(true, calcField);
    } else if (key == 'delete') {
      // delete calculation field
      let calcIdx = rawData.value.calculation.findIndex((ele) => ele.name == name);
      rawData.value.calculation.splice(calcIdx, 1);
      // delete column from table
      let colIdx = datasetInfo.dataset[datasetInfo.index].columns.findIndex(
        (ele) => ele.name == name,
      );
      datasetInfo.dataset[datasetInfo.index].columns.splice(colIdx, 1);
    }
  };

  /*
   * select a chart from list
   */
  const fieldCalculation = (key: string, calc: any) => {
    if (!rawData.value.calculation || rawData.value.calculation.length == 0) {
      // no calculation
      return;
    }

    let datasetItem = datasetInfo.dataset[datasetInfo.index];
    let fixedFields = [];
    for (let col of datasetItem.columns) {
      if ((key == 'update' && col.name == calc.name) || col.action) {
        // ski this column when update this column or it is action column
        continue;
      }
      fixedFields.push(col.name);
    }

    const dv = new DataView().source(datasetItem.data);
    // get all fixed fields first
    dv.transform({
      type: 'pick',
      fields: fixedFields,
    });

    const parser = new Parser();
    if (key == 'init') {
      // create calculation fields
      for (let item of rawData.value.calculation) {
        let expr = parser.parse(item.value);
        dv.transform({
          type: 'map',
          callback(row) {
            row[item.name] = expr.evaluate(row);
            return row;
          },
        });
      }
    } else {
      let expr = parser.parse(calc.value);
      dv.transform({
        type: 'map',
        callback(row) {
          row[calc.name] = expr.evaluate(row);
          return row;
        },
      });
    }

    // final data after calculation
    datasetItem.data = dv.rows;

    //add a column
    if (key == 'new') {
      let col = {
        name: calc.name,
        title: calc.name,
        dataIndex: calc.name,
        metrics: calc.metrics,
        calc: true,
        width: 150,
        align: 'left',
        ellipsis: false,
        resizable: true,
      };
      const lastPos = datasetItem.columns.length - 1;
      datasetItem.columns.splice(lastPos, 0, col);
    }
  };

  /*
   * select a chart from list
   */
  const handleVarUpdate = (event: any, node: any) => {
    if (!node.disabled) {
      openVarModal(true, { name: node.name, type: node.type, value: node.value });
    }
  };

  /*
   * select a chart from list
   */
  const handleChartSelection = (id: string) => {
    // remove previous selection
    chartTypes.value[antAvaInfo.advices[antAvaInfo.current].type].active = false;

    const idx = antAvaInfo.advices.findIndex((ele) => {
      return ele.type == id;
    });
    const advice = antAvaInfo.advices[idx];
    // highlight selected chart
    chartTypes.value[advice.type].active = true;
    thumbnailPage.value = chartTypes.value[advice.type].page ? 1 : 0;
    antAvaInfo.current = idx;
    // chart type name (id in chartTypes)
    rawData.value.type = advice.type;

    // remove data from generated chart config
    rawData.value.libCfg = antAvaInfo.libCfg[idx];
    if (rawData.value.libCfg.config?.data) {
      delete rawData.value.libCfg.config.data;
    }
    advancedInfo.textCfg = JSON.stringify(rawData.value.libCfg);

    // pass lib config to custom adapter
    if (rawData.value.type?.endsWith('_map')) {
      rawData.value.libName = 'Leaflet';
      rawData.value.libVer = '1.7';
    } else if (rawData.value.type?.endsWith('_net')) {
      rawData.value.libName = 'Cytoscape';
      rawData.value.libVer = '3.2';
    } else {
      rawData.value.libName = 'G2Plot';
    }

    // render chart
    renderChart();
    passConfigToAdapter(rawData.value.libCfg, rawData.value.libName, rawData.value.libVer);
  };

  /*
   * convert spec to specific chart config
   */
  const specToChartConfig = (spec: ChartAntVSpec, type: string) => {
    let chartConfig;
    if (type == 'G2Plot') {
      chartConfig = specToG2PlotConfig(spec);
      // remove data from config
      delete chartConfig.config.data;
    } else if (type == 'ECharts') {
      // the conversion function should be in adapter
      chartConfig = specToEChartsConfig(spec);
    } else if (type == 'AmCharts') {
      chartConfig = specToEChartsConfig(spec);
    } else if (type == 'ApexCharts') {
      chartConfig = specToEChartsConfig(spec);
    } else if (type == 'VegaLite') {
      chartConfig = specToEChartsConfig(spec);
    }
    return chartConfig;
  };

  /*
   * convert spec to ECharts config
   */
  const specToEChartsConfig = (spec: ChartAntVSpec) => {
    // to do
    return null;
  };

  /*
   * // pass lib config to custom adapter
   */
  const passConfigToAdapter = async (libCfg: any, libName: string, libVer: string) => {
    if (libCfg.length == 0) {
      return;
    }

    await nextTick();
    if (libName == 'G2Plot' && g2plotRef.value) {
      g2plotRef.value.setConfigData(libCfg, libVer);
    } else if (libName == 'ECharts' && g2plotRef.value) {
      // pass config to ECharts adapter
      // to do
    } else if (libName == 'AmCharts' && g2plotRef.value) {
      // pass config to AmCharts adapter
      // to do
    } else if (libName == 'ApexCharts' && g2plotRef.value) {
      // pass config to ApexCharts adapter
      // to do
    } else if (libName == 'Leaflet' && leafletRef.value) {
      // pass config to leaflet adapter
      leafletRef.value.setConfigData(libCfg, libVer);
    } else if (libName == 'Cytoscape' && cyRef.value) {
      // pass config to leaflet adapter
      cyRef.value.setConfigData(libCfg, libVer, configFieldOptions);
    }
  };

  /*
   * clean view
   */
  const resetDataview = () => {
    if (configFormRef.value) {
      // clean up select fields of config form
      // dim, metrics, shape, color, size, filter
      configFormRef.value.setFieldsValue({
        dim: [],
        metrics: [],
        agg: '',
      });
    }

    //remove previous highlight and selection
    for (let item in chartTypes.value) {
      chartTypes.value[item].advised = false;
      chartTypes.value[item].active = false;
    }

    // remove all advised charts
    antAvaInfo.advices.length = 0;
    antAvaInfo.libCfg.length = 0;
    antAvaInfo.current = 0;
    antAvaInfo.inst = null;

    // initialize advance config
    rawData.value.type = undefined;
    rawData.value.libName = 'G2Plot';
    rawData.value.libVer = '2.4';
    rawData.value.libCfg = undefined;
    advancedInfo.textCfg = undefined;
    advancedInfo.disabled = true;

    // clean chart
    if (chartContainerRef.value) {
      chartContainerRef.value.innerHTML = '';
    }
  };

  /*
   * load data and render chart
   */
  const execute = (reload = false) => {
    if (!rawData.value.datasetId) {
      return;
    }

    // find cached dataset info
    const datasetIndex = datasetInfo.dataset?.findIndex(
      (item) => item.id == rawData.value.datasetId,
    );

    if (datasetIndex >= 0) {
      // switch to cached dataset which has table data
      datasetInfo.index = datasetIndex;
      if (!reload) {
        return;
      }

      // reload data
      datasetInfo.dataset[datasetIndex].variable = [];
      datasetInfo.dataset[datasetIndex].columns = [];
      datasetInfo.dataset[datasetIndex].data = [];
      datasetInfo.dataset[datasetIndex].total = 0;
    } else {
      // create a new one if it is not found
      datasetInfo.dataset?.push({
        id: rawData.value.datasetId,
        variable: [],
        columns: [],
        data: [],
        total: 0,
      });
      datasetInfo.index = datasetInfo.dataset.length - 1;
    }

    let datasetItem = datasetInfo.dataset[datasetInfo.index];

    // query data based on dataset id
    API_DATASET_GET(rawData.value.datasetId).then((response) => {
      // get variable
      datasetItem.variable = response.variable;
    });

    // query data based on dataset id
    API_DATASET_EXECUTE(rawData.value.datasetId, datasetInfo.limit).then((response) => {
      datasetItem.data = buildRecords(response.records, response.metadata); // converted data
      // build columns and convert records when received data from backend
      datasetItem.columns = buildColumns(response.metadata);
      datasetItem.total = response.total;

      validateViewCfg(datasetItem.columns);

      // initialize calculation fields
      fieldCalculation('init', null);

      // apply aggregation to data
      dataTransform();

      // render chart
      renderChart();
    });
  };

  /*
   * validate config
   */
  const validateViewCfg = (fields: any[]) => {
    if (!rawData.value.dim || !rawData.value.metrics) {
      return;
    }

    for (let dim of rawData.value.dim) {
      const foundDim = fields.find((f) => f.dataIndex === dim);
      if (!foundDim) {
        message.warning(t('dataviz.dataview.error.dimCfgErr'));
        break;
      }
    }

    for (let metrics of rawData.value.metrics) {
      const foundMetrics = fields.find((f) => f.dataIndex === metrics);
      if (!foundMetrics) {
        message.warning(t('dataviz.dataview.error.metricsCfgErr'));
        break;
      }
    }

    if (rawData.value.filter) {
      for (let filter of Object.keys(rawData.value.filter)) {
        const foundFilter = fields.find((f) => f.dataIndex === filter);
        if (!foundFilter) {
          delete rawData.value.filter[filter];
          message.warning(t('dataviz.dataview.error.filterErr'));
          break;
        }
      }
    }
  };

  /*
   * build column config from fields for displaying
   */
  function buildColumns(fields: any) {
    // this is for table to show
    let tableColumns: any[] = [];
    let combinedFields = rawData.value.dim;
    if (rawData.value.dim && rawData.value.metrics) {
      // both dim and metrics are selected
      combinedFields = rawData.value.dim.concat(rawData.value.metrics);
    } else if (rawData.value.metrics) {
      combinedFields = rawData.value.metrics; // only metrics is selected
    }

    for (let item of fields) {
      // merge default table attributes
      let col = {
        ...item,
        dataIndex: item['name'],
        title: item['name'],
        width: 150,
        align: 'left',
        ellipsis: false,
        resizable: true,
      };

      if (combinedFields && combinedFields.length > 0) {
        for (const sel of combinedFields) {
          if (col.name == sel) {
            // highlight selected fields (dim and metrics)
            col.selected = true;
            break;
          }
        }
      }

      if (rawData.value.sorter) {
        for (const ele of rawData.value.sorter) {
          const sortParts = ele.split(' ');
          if (sortParts[0] == col.name) {
            // asc or desc
            col.order = sortParts[1];
            break;
          }
        }
      }

      if (rawData.value.filter) {
        for (const ele in rawData.value.filter) {
          if (rawData.value.filter[ele] == col.name) {
            col.filter = rawData.value.filter[ele];
            break;
          }
        }
      }

      tableColumns.push(col);
    }

    if (rawData.value.calculation) {
      // has data and transform is needed
      for (let item of rawData.value.calculation) {
        let col = {
          ...item,
          calc: true,
          dataIndex: item['name'],
          title: item['name'],
          width: 150,
          align: 'left',
          ellipsis: false,
          resizable: true,
        };
        tableColumns.push(col);
      }
    }

    let actCol = {
      action: true,
      title: '',
      width: 30,
      align: 'left',
      ellipsis: false,
      resizable: false,
    };
    tableColumns.push(actCol);

    return tableColumns;
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
        let cValue = records[i][j];
        // convert string to number(integer or float)
        if (columns[j].type == 'number' && cValue != null) {
          // float covers integer
          cValue = parseFloat(cValue);
        }
        dt[columns[j].name] = cValue;
      }
      jsonArray.push(dt);
    }
    return jsonArray;
  }

  /*
   * render chart
   */
  const renderChart = async () => {
    if (!rawData.value.libCfg) {
      // do nothing if no chart config
      return;
    }

    if (chartContainerRef.value && chartContainerRef.value != null) {
      try {
        antAvaInfo.inst.remove();
      } catch (e) {
        //
      }
      try {
        antAvaInfo.inst.destroy();
      } catch (e) {
        //
      }
      // remove old chart
      chartContainerRef.value.innerHTML = '';
    }

    if (rawData.value.libName === 'Leaflet') {
      antAvaInfo.inst = renderLeafletMap(
        datasetInfo.viewData,
        rawData.value.libCfg,
        rawData.value.libVer,
      );
    } else if (rawData.value.libName === 'Cytoscape') {
      antAvaInfo.inst = renderCyNet(
        datasetInfo.treeData,
        rawData.value.libCfg,
        rawData.value.libVer,
      );
    } else if (rawData.value.libName === 'G2Plot') {
      antAvaInfo.inst = renderG2Plot(
        datasetInfo.viewData,
        rawData.value.libCfg,
        rawData.value.libVer,
      );
    } else if (rawData.value.libName === 'ECharts') {
      antAvaInfo.inst = renderECharts(
        datasetInfo.viewData,
        rawData.value.libCfg,
        rawData.value.libVer,
      );
    } else if (rawData.value.libName === 'AmCharts') {
      antAvaInfo.inst = renderAmCharts(
        datasetInfo.viewData,
        rawData.value.libCfg,
        rawData.value.libVer,
      );
    } else if (rawData.value.libName === 'ApexCharts') {
      antAvaInfo.inst = renderApexCharts(
        datasetInfo.viewData,
        rawData.value.libCfg,
        rawData.value.libVer,
      );
    } else if (rawData.value.libName === 'VegaLite') {
      antAvaInfo.inst = renderVegaLite(
        datasetInfo.viewData,
        rawData.value.libCfg,
        rawData.value.libVer,
      );
    } else {
      antAvaInfo.inst = null;
    }
  };

  /*
   * render G2plot
   */
  const renderG2Plot = (data: any[], libCfg: any, libVer = '2.4') => {
    if (!libCfg) {
      return;
    }

    const upgradeSupported = ['2.0', '2.1'];
    const renderSupported = ['2.3', '2.4'];
    const upgradeIdx = upgradeSupported.indexOf(libVer);
    const renderIdx = renderSupported.indexOf(libVer);
    if (renderIdx < 0) {
      // this version is not supported to render
      if (upgradeIdx < 0) {
        // this version is too old, it is not supported to upgrade automatically
        // show a tip to ask to upgrade manually or rebuild this chart
        message.error(t('common.error.unsupport.upgrade'));
        return;
      } else {
        // it is supported to upgrade automatically
        // show a tip to upgrade
        // after upgrade it can be rendered
        message.warning(t('common.error.unsupport.render'));
        return;
      }
    } else if (renderIdx != renderSupported.length - 1) {
      // current config can be rendered but is old version
      // show a tip to user to suggest upgrade
      // this should support auto upgrade
      message.info(t('common.error.support.upgrade'));
    } else {
      // this is the latest version
      // render it directly
    }

    // add index as id for update/delete if id does not exist
    if (libCfg.config.annotations) {
      for (let idx in libCfg.config.annotations) {
        if (libCfg.config.annotations[idx].id == undefined) {
          libCfg.config.annotations[idx].id = idx;
        }
      }
    }

    // combine data  into config
    let clonedCfg = cloneDeep(libCfg);
    clonedCfg.config.data = data;

    // render g2plot chart
    let inst = g2plotRender(clonedCfg, chartContainerRef.value);

    return inst;
  };

  /*
   * render Echarts
   */
  const renderECharts = (data: any[], libCfg: any, libVer = '5.3') => {
    // check version first ......

    // combine data  into config
    let clonedCfg = cloneDeep(libCfg);
    clonedCfg.dataset.source = data;

    // initialize eCharts
    let inst = echarts.init(chartContainerRef.value);
    // render eCharts
    inst.setOption(clonedCfg);
    return inst;
  };

  /*
   * render Amcharts
   */
  const renderAmCharts = (data: any[], libCfg: any, libVer = '4.2') => {
    // check version first ......

    // combine data  into config
    let clonedCfg: any = cloneDeep(libCfg.config);
    clonedCfg.data = data;

    am4core.useTheme(am4themes_animated);
    // render amCharts
    let inst = am4core.createFromConfig(clonedCfg, chartContainerRef.value, am4charts.XYChart);

    return inst;
  };

  /*
   * render Apex Charts
   */
  const renderApexCharts = (data: any[], libCfg: any, libVer = '4.2') => {
    // check version first ......

    let clonedCfg = cloneDeep(libCfg);

    // combine data  into config
    const dim = rawData.value.dim[0];
    const catData = data.map(function (value) {
      return value[dim];
    });
    clonedCfg.xaxis.categories = catData;

    for (let i = 0; i < rawData.value.metrics.length; i++) {
      const metrics = rawData.value.metrics[i];
      const valData = data.map(function (value) {
        return value[metrics];
      });
      clonedCfg.series[i].data = valData;
    }

    let inst = new ApexCharts(chartContainerRef.value, clonedCfg);
    inst.render();
    return inst;
  };

  /*
   * render vega lite
   */
  const renderVegaLite = (data: any[], libCfg: any, libVer = '5.6') => {
    // check version first ......

    // combine data  into config
    let clonedCfg: any = cloneDeep(libCfg);
    clonedCfg.data = { values: data };
    //let inst = vegaEmbed(chartContainerRef.value, clonedCfg);
    return null;
  };

  /*
   * render cy network
   */
  let netInfo = { ...initNetInfo };
  let cyDataFile = ref<any>();
  netInfo.dataFile = cyDataFile;
  const renderCyNet = (data: any[], libCfg: any, libVer = '1.7') => {
    panzoom(cytoscape, $);
    fcose(cytoscape);
    cise(cytoscape);
    d3Force(cytoscape);
    dagre(cytoscape);
    cola(cytoscape);
    klay(cytoscape);
    spread(cytoscape);
    avsdf(cytoscape);
    elk(cytoscape);
    popper(cytoscape);
    viewUtilities(cytoscape);

    let inst = cytoscape({
      container: chartContainerRef.value,
      autounselectify: false,
      multiClickDebounceTime: 200,
      wheelSensitivity: 0.2,
      elements: {
        nodes: [],
        edges: [],
      },
      layout: {
        name: 'random',
      },
      style: defaultCyStyle,
    });

    var cyUtilApi = inst.viewUtilities({
      highlightStyles: [
        {
          node: { 'underlay-color': '#0b9bcd', 'underlay-padding': 1, 'underlay-opacity': 0.5 },
          edge: { 'underlay-color': '#0b9bcd', 'underlay-padding': 1, 'underlay-opacity': 0.5 },
        },
        {
          node: { 'underlay-color': '#f5e663', 'underlay-padding': 1, 'underlay-opacity': 0.5 },
          edge: { 'underlay-color': '#f5e663', 'underlay-padding': 1, 'underlay-opacity': 0.5 },
        },
      ],
      setVisibilityOnHide: false, // whether to set visibility on hide/show
      setDisplayOnHide: true, // whether to set display on hide/show
      zoomAnimationDuration: 1000, //default duration for zoom animation speed
      neighbor: function (ele) {
        if (ele.isNode()) {
          return ele.closedNeighborhood();
        } else if (ele.isEdge()) {
          return ele.source().closedNeighborhood().union(ele.target().closedNeighborhood());
        }
      },
      neighborSelectTime: 1000,
    });

    let legends = [];
    let shapeField = undefined;
    let colorField = undefined;
    if (libCfg.config.node.icon.shapeMap) {
      legends = [...legends, ...libCfg.config.node.icon.shapeMap];
      shapeField = libCfg.config.node.icon.shapeField;
    } else if (libCfg.config.node.body.shapeMap) {
      const mappedShape = libCfg.config.node.body.shapeMap.map((item) => ({
        shape: nodeBodyMap[item.shape],
        label: item.label,
        value: item.value,
      }));
      legends = [...legends, ...mappedShape];
      shapeField = libCfg.config.node.body.shapeField;
    }

    if (libCfg.config.node.icon.colorMap) {
      legends = [...legends, ...libCfg.config.node.icon.colorMap];
      colorField = 'iconColor';
    } else if (libCfg.config.node.body.colorMap) {
      legends = [...legends, ...libCfg.config.node.body.colorMap];
      colorField = 'bodyColor';
    }

    netInfo.layout = libCfg.config.layout;
    inst.userLayouts = libCfg.config.layout;
    inst.selectedLayout = 0;

    inst.panzoom({
      layouts: [...libCfg.config.layout],
      legend: { items: [...legends], shapeField: shapeField, colorField: colorField },
      fileName: 'network.png',
      dataFile: cyDataFile,
      viewUtil: cyUtilApi,
      toolkit: { ...libCfg.config.toolkit, panel: libCfg.config.aux?.panel },
    });

    // build fixed style
    buildCyStyle(inst, libCfg.config);
    inst.elements().selectify();
    inst.autounselectify(false);

    // build cy node and edge
    switch (libCfg.chartType) {
      case 'Tree': {
        netInfo.element = buildCyTreeNet(data, libCfg.config);
        inst.add(netInfo.element.nodes);
        inst.add(netInfo.element.edges);
        if (true) {
          const virElement: any = addVirRootNode(inst);
          if (virElement) {
            inst.add(virElement.nodes);
            inst.add(virElement.edges);
            netInfo.element.nodes = [...netInfo.element.nodes, ...virElement.nodes];
            netInfo.element.edges = [...netInfo.element.edges, ...virElement.edges];
          }
        }
        if (
          libCfg.config.layout[0].options?.widget &&
          libCfg.config.layout[0].options?.widget == 'gojs'
        ) {
          // build layout by gojs then map to cy and render
          const goElements = getGojsLayout(
            netInfo.element,
            libCfg.config.layout[0],
            gojsContainerRef.value,
            inst,
          );
          renderGoLayoutByCy(inst, goElements);
        } else {
          inst
            .layout({ name: libCfg.config.layout[0].name, ...libCfg.config.layout[0].options })
            .run();
          inst.style().update();
        }
        break;
      }
      case 'Star': {
        netInfo.element = buildCyTreeNet(data, libCfg.config);
        inst.add(netInfo.element.nodes);
        inst.add(netInfo.element.edges);
        if (true) {
          const virElement: any = addVirRootNode(inst);
          if (virElement) {
            inst.add(virElement.nodes);
            inst.add(virElement.edges);
            netInfo.element.nodes = [...netInfo.element.nodes, ...virElement.nodes];
            netInfo.element.edges = [...netInfo.element.edges, ...virElement.edges];
          }
        }
        inst
          .layout({ name: libCfg.config.layout[0].name, ...libCfg.config.layout[0].options })
          .run();
        inst.style().update();
        break;
      }
      case 'Gojs': {
        netInfo.element = buildCyTreeNet(data, libCfg.config);
        inst.add(netInfo.element.nodes);
        inst.add(netInfo.element.edges);
        if (true) {
          const virElement: any = addVirRootNode(inst);
          if (virElement) {
            inst.add(virElement.nodes);
            inst.add(virElement.edges);
            netInfo.element.nodes = [...netInfo.element.nodes, ...virElement.nodes];
            netInfo.element.edges = [...netInfo.element.edges, ...virElement.edges];
          }
        }
        // build layout by gojs then map to cy and render
        const goElements = getGojsLayout(
          netInfo.element,
          libCfg.config.layout[0],
          gojsContainerRef.value,
          inst,
        );
        renderGoLayoutByCy(inst, goElements);
        break;
      }
      case 'Nest': {
        netInfo.element = buildCyNestNet(data, libCfg.config);
        inst.add(netInfo.element.nodes);
        //inst.add(netInfo.element.edges);
        inst
          .layout({ name: libCfg.config.layout[0].name, ...libCfg.config.layout[0].options })
          .run();
        inst.style().update();
        break;
      }
    }

    inst.elements().selectify();
    buildCyNetTooltip(inst);
    buildCyNetEvents(inst, libCfg.config.aux, $);
    return inst;
  };

  /*
   * watch uploaded file
   */
  watch(cyDataFile, (newVal, oldVal) => {
    netInfo.dataFile = unref(newVal);
    antAvaInfo.inst.elements().remove();

    if (newVal.nodes) {
      antAvaInfo.inst.add(newVal.nodes);
    }

    if (newVal.edges) {
      antAvaInfo.inst.add(newVal.edges);
    }

    antAvaInfo.inst.layout({ name: netInfo.layout[0].name, ...netInfo.layout.options }).run();
    antAvaInfo.inst.style().update();
  });

  /*
   * render leaflet map
   */
  let mapInfo = { ...initMapInfo };
  const renderLeafletMap = (data: any[], libCfg: any, libVer = '1.7') => {
    // create basic map
    let inst = L.map(chartContainerRef.value, {
      zoom: 5,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: false,
      center: [40, 100],
      attributionControl: false,
    });

    // add zoom bar by default
    ZoomBar({ position: 'topleft' }).addTo(inst);

    switch (libCfg.chartType) {
      case 'Marker': {
        // build markers and add them to map
        const clusteredMarkers = buildMarkerMap(data, libCfg.config);
        if (clusteredMarkers) {
          mapInfo.cluster.all = clusteredMarkers.all;
          mapInfo.cluster.shape = clusteredMarkers.shape;
          mapInfo.cluster.color = clusteredMarkers.color;
          if (mapInfo.cluster.all) {
            mapInfo.cluster.all.addTo(inst);
            inst.fitBounds(mapInfo.cluster.all.getBounds());
          }
        }
        break;
      }
      case 'Bubble': {
        // build markers and add them to map
        const clusteredMarkers = buildBubbleMap(data, libCfg.config, datasetInfo.dataInfo);
        if (clusteredMarkers) {
          mapInfo.cluster.all = clusteredMarkers.all;
          mapInfo.cluster.shape = clusteredMarkers.shape;
          mapInfo.cluster.color = clusteredMarkers.color;
          if (mapInfo.cluster.all) {
            mapInfo.cluster.all.addTo(inst);
            inst.fitBounds(mapInfo.cluster.all.getBounds());
          }
        }
        break;
      }
      case 'Choropleth': {
        const choropletMap: any = buildChoroplethMap(data, libCfg.config, inst);
        if (choropletMap) {
          mapInfo.choroplethLayer = choropletMap.choroplethLayer;
          mapInfo.choroplethLayer.addTo(inst);
          inst.fitBounds(mapInfo.choroplethLayer.getBounds());
        }
        break;
      }
      case 'Heat': {
        const heatMap: any = buildHeatMap(data, libCfg.config);
        if (heatMap) {
          mapInfo.cluster.all = heatMap.all;
          mapInfo.heatmapLayer = heatMap.heatmapLayer;
          mapInfo.heatmapLayer.addTo(inst);
          inst.fitBounds(mapInfo.cluster.all.getBounds());
          // the widget has a bug which need to be fixed
          // Cannot assign to read only property 'data' of object '#<ImageData>'
          // img.data = imgData;
          // this should be comment out
        }
        break;
      }
      case 'Timeline': {
        buildTimelineMap(data, libCfg.config);
        break;
      }
      case 'Movement': {
        const movementMap: any = buildMovementMap(data, libCfg.config);
        if (movementMap) {
          mapInfo.cluster.all = movementMap.all;
          mapInfo.cluster.color = movementMap.color;
          mapInfo.antPath = movementMap.antPath;
          mapInfo.antPath.addTo(inst);
          mapInfo.cluster.all.addTo(inst);
          inst.fitBounds(mapInfo.cluster.all.getBounds());
        }
        break;
      }
      case 'Migration': {
        const migrationMap: any = buildMigrationMap(data, libCfg.config, inst);
        if (migrationMap) {
          mapInfo.cluster.all = migrationMap.all;
          mapInfo.cluster.color = migrationMap.color;
          mapInfo.migrationLayer = migrationMap.migrationLayer;
          mapInfo.migrationLayer.addTo(inst);
          //mapInfo.cluster.all.addTo(inst);
          inst.fitBounds(mapInfo.cluster.all.getBounds());
        }
        break;
      }
    }

    buildPanelBar(libCfg.config, inst, libCfg.chartType);

    return inst;
  };

  /*
   * build panel and toolbar
   */
  const buildPanelBar = async (cfg: any, map: any, type) => {
    let baseLayerCfg = { group: 'Map', collapsed: true, layers: [] };
    let overLayerCfg = { group: 'Overlayer', collapsed: true, layers: [] };
    let markerLayerCfg = { group: 'Marker', layers: [] };

    // build base layer options
    if (cfg.baselayer && Array.isArray(cfg.baselayer)) {
      for (const layerName of cfg.baselayer) {
        // get base layer config based on layer name
        const selectedLayer = baseLayerLib.find((item) => {
          return item.name == layerName;
        });
        if (selectedLayer) {
          baseLayerCfg.layers.push(cloneDeep(selectedLayer));
        }
      }
    }
    // activate the first one by default
    baseLayerCfg.layers[0].active = true;

    // build over layer options
    if (cfg.overlayer && Array.isArray(cfg.overlayer?.layers)) {
      for (const layerName of cfg.overlayer?.layers) {
        // get over layer config based on layer name
        let selectedLayer = overLayerLib.find((item) => {
          return item.name == layerName;
        });
        if (selectedLayer) {
          // activate all overlayers by default
          selectedLayer.active = true;
          overLayerCfg.layers.push(cloneDeep(selectedLayer));
        }
      }
    }

    let overPanel = [];
    if (overLayerCfg.layers.length > 0) {
      // add overlayer options to panel
      overPanel.push(overLayerCfg);
    }

    // build marker layer for legend
    let legendLayers: any = [];
    // shape first
    if (mapInfo.cluster.shape && !mapInfo.cluster.shape.default && cfg.marker) {
      for (const key of Object.keys(mapInfo.cluster.shape)) {
        let cfgShape = cfg.marker?.shapeMap?.find((v) => {
          return v.label == key;
        });
        legendLayers.push({
          name: key,
          active: true,
          icon: '<i class="fas fa-' + cfgShape.shape + '" style="color:skyblue"></i>',
          filter: true,
          layer: mapInfo.cluster.shape[key],
        });
      }
    }

    // color after shape
    let colorMap = cfg.marker ? cfg.marker.colorMap : undefined;
    if (cfg.bubble && cfg.bubble.colorMap) {
      colorMap = cfg.bubble.colorMap;
    } else if (cfg.movement && cfg.movement.colorMap) {
      colorMap = cfg.movement.colorMap;
    } else if (cfg.line && cfg.line.colorMap) {
      colorMap = cfg.line.colorMap;
    }

    if (mapInfo.cluster.color && !mapInfo.cluster.color.default && colorMap) {
      for (const cfgColor of colorMap) {
        legendLayers.push({
          name: cfgColor.label,
          active: true,
          icon: '<i class="fas fa-square" style="color:' + cfgColor.color + '"></i>',
          filter: true,
          layer: mapInfo.cluster.color[cfgColor.label],
        });
      }
    }

    if (type == 'Choropleth') {
      for (const it of cfg.choropleth?.colorMap) {
        legendLayers.push({
          name: it.label,
          active: true,
          icon: '<i class="fas fa-square" style="color:' + it.color + '"></i>',
          filter: false,
          layer: {
            type: 'geoJson',
            args: [
              {
                type: 'Feature',
                geometry: null,
              },
            ],
          },
        });
      }
    }

    markerLayerCfg.layers = legendLayers;
    mapInfo.cluster.legend = legendLayers;
    if (legendLayers.length > 0) {
      // add legend to over layer panel
      overPanel.push(markerLayerCfg);
    }

    if (overPanel.length == 0) {
      // set it to null if no overlayer option and legend
      overPanel = null;
    }

    mapInfo.ctrlPanel = PanelLayers([baseLayerCfg], overPanel, {
      position: 'topright',
      title: '',
      collapsibleGroups: true,
      collapsed: false,
      compact: false,
      hideSingleBase: true,
      autoZIndex: false,
    }).addTo(map);

    if (cfg.toolkit?.search) {
      // button is shown on map but except when click. Gavin !!!
      mapInfo.toolkit.search = GeoNames({
        position: 'topcenter',
        username: 'Mr_DataPie',
        enablePostalCodes: false,
      }).addTo(map);
    }

    if (cfg.toolkit?.fullscreen) {
      mapInfo.toolkit.fullscreen = L.fullScreen({
        position: 'topleft',
        forceSeparateButton: true,
      }).addTo(map);
    }

    if (cfg.panel?.rank || cfg.panel?.info) {
      mapInfo.quadtree = L.quadtree();
      for (const mk of mapInfo.cluster.all.getLayers()) {
        mapInfo.quadtree.add(mk);
      }
      mapInfo.infoPanel = SlideMenu('<p>test</p>', {
        position: 'topleft',
        menuposition: 'topleft',
        width: '15%',
        height: '100%',
        icon: 'fa-solid fa-user-secret',
      }).addTo(map);
      map.on('zoomend moveend resize', () => {
        const htmlText = getVisibleMarkers(mapInfo.quadtree, map, 'sales', 'asc');
        mapInfo.infoPanel.setContents(htmlText);
      });
    }

    if (cfg.toolkit?.open) {
      // file load button
      mapInfo.toolkit.open = L.easyButton(
        '<img src="/resource/img/open-folder.png">',
        function (btn, map) {
          uploadRef.value.click();
        },
      ).addTo(map);
    }

    if (cfg.toolkit?.seek) {
      mapInfo.toolkit.seek = new L.Control.Search({ layer: mapInfo.cluster.all });
      map.addControl(mapInfo.toolkit.seek);
    }

    if (cfg.toolkit?.export) {
      // it works when replace domtoimage with html2canvas
      mapInfo.toolkit.export = EasyPrint({
        title: 'Export',
        position: 'topleft',
        exportOnly: true,
        hideControlContainer: true,
      }).addTo(map);
    }

    if (cfg.toolkit?.locator) {
      mapInfo.toolkit.locator = new Locate({
        position: 'topleft',
        strings: {
          title: 'Locator',
        },
      }).addTo(map);
    }

    if (cfg.toolkit?.player) {
      // add timeline player to map
      mapInfo.toolkit.timeline = L.timeline(pointsData).addTo(map);
      mapInfo.toolkit.player = L.timelineSliderControl({
        formatOutput: function (date) {
          return new Date(date).toLocaleDateString();
        },
      }).addTo(map);
      mapInfo.toolkit.player.addTimelines(mapInfo.toolkit.timeline);
    }

    if (cfg.toolkit?.coordinator) {
      // coordinator
      mapInfo.toolkit.coordinator = L.control
        .coordinates({
          position: 'bottomleft',
          decimals: 2,
          useDMS: false,
          labelTemplateLat: '{y},',
          labelTemplateLng: '{x}',
          useLatLngOrder: true, //ordering of labels, default false-> lng-lat
          markerType: L.marker,
          enableUserInput: true,
        })
        .addTo(map);
    }

    if (cfg.toolkit?.scale) {
      mapInfo.toolkit.scale = L.control
        .scale({ position: 'bottomright', imperial: false })
        .addTo(map);
    }
  };

  /*
   * upload map file
   */
  const handleMapUpload: UploadProps['beforeUpload'] = (file: any, fileList: any[]) => {
    mapInfo.file.name = file.name;
    mapInfo.file.type = file.type;
    if (file.type == '' && file.name.toUpperCase().endsWith('.GEOJSON')) {
      mapInfo.file.type = 'application/geojson';
    }
    if (file.type == '' && file.name.toUpperCase().endsWith('.JSONARRAY')) {
      mapInfo.file.type = 'application/jsonarray';
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      try {
        // render file layer after data is loaded successfully
        mapInfo.file.data = fileReader.result;
        if (file.type == 'application/json' && fileReader.result) {
          if (
            fileReader.result.indexOf('features') > 0 &&
            fileReader.result.indexOf('geometry') > 0
          ) {
            mapInfo.file.type = 'application/geojson';
          } else {
            mapInfo.file.type = 'application/jsonarray';
          }
        }
        mapInfo.file.layer = renderFileLayer(fileReader.result, mapInfo.file.type);
        if (mapInfo.file.layer) {
          if (mapInfo.file.type == 'text/csv') {
            mapInfo.cluster.all.addLayer(mapInfo.file.layer);
          } else {
            mapInfo.file.layer.addTo(antAvaInfo.inst);
          }
        }
      } catch (error) {
        console.error(error);
        // remove old layer
        if (antAvaInfo.inst) {
          antAvaInfo.inst.removeLayer(mapInfo.file.layer);
        }
        mapInfo.file.data = undefined;
        mapInfo.file.layer = undefined;
      } finally {
        console.log('finally');
      }
    };

    fileReader.onerror = (event) => {
      console.error(event);
    };
    fileReader.readAsText(file);
    return false;
  };

  /*
   * handle custom change
   * rawData.libCfg was updated in adapter
   * advCfgText need to be updated when custom is changed
   * chart need to be refreshed
   */
  const handleCustomG2plotChange = (key: string, param: any) => {
    // the rawData.config of adapter is updated too when rawData.value.libCfg is updated here
    if (key == 'locale') {
      // update language
      setGlobal(param);
    } else if (antAvaInfo.inst) {
      if (key == 'annotations') {
        if (param.action == 'add') {
          antAvaInfo.inst.addAnnotations([param[key]]);
        } else {
          antAvaInfo.inst.removeAnnotations([param[key]]);
        }
      } else {
        // update chart
        antAvaInfo.inst.update(param);
      }
    }

    // update advance panel
    advancedInfo.textCfg = JSON.stringify(rawData.value.libCfg);
  };

  /*
   * handle custom change
   * rawData.libCfg was updated in adapter
   * advCfgText need to be updated when custom is changed
   * chart need to be refreshed
   */
  const handleCustomLeafletChange = (category: string, key: string, value: any) => {
    // the rawData.config of adapter is updated too when rawData.value.libCfg is updated here
    switch (category) {
      case 'baselayer': {
        const layer = baseLayerLib.find((ele) => {
          return ele.name == key;
        });
        if (value) {
          mapInfo.ctrlPanel.addBaseLayer(cloneDeep(layer), layer.name, 'Map');
        } else {
          mapInfo.ctrlPanel.removeLayer(layer);
        }
        break;
      }
      case 'overlayer': {
        const layer = overLayerLib.find((ele) => {
          return ele.name == key;
        });
        if (value) {
          layer.active = true;
          mapInfo.ctrlPanel.addOverlay(cloneDeep(layer), layer.name, 'Overlayer');
        } else {
          mapInfo.ctrlPanel.removeLayer(layer);
        }
        break;
      }
      case 'toolkit': {
        if (key == 'seek') {
          if (value) {
            if (mapInfo.toolkit.seek) {
              antAvaInfo.inst.addControl(mapInfo.toolkit.seek);
            } else {
              mapInfo.toolkit.seek = new L.Control.Search({ layer: mapInfo.cluster.all });
              antAvaInfo.inst.addControl(mapInfo.toolkit.seek);
            }
          } else {
            antAvaInfo.inst.removeControl(mapInfo.toolkit.seek);
          }
        } else if (key == 'fullscreen') {
          if (value) {
            if (mapInfo.toolkit.fullscreen) {
              // fullscreen inst exist
              mapInfo.toolkit.fullscreen.addTo(antAvaInfo.inst);
            } else {
              // new fullscreen when it doesn't exist
              mapInfo.toolkit.fullscreen = L.fullScreen({
                position: 'topleft',
                forceSeparateButton: true,
              }).addTo(antAvaInfo.inst);
            }
          } else {
            // remove fullscreen
            mapInfo.toolkit.fullscreen.remove();
          }
        } else if (key == 'scale') {
          if (value) {
            if (mapInfo.toolkit.scale) {
              // scale inst exist
              mapInfo.toolkit.scale.addTo(antAvaInfo.inst);
            } else {
              // new scale when it doesn't exist
              mapInfo.toolkit.scale = L.control
                .scale({ position: 'bottomright', imperial: false })
                .addTo(antAvaInfo.inst);
            }
          } else {
            // remove scale
            mapInfo.toolkit.scale.remove();
          }
        } else if (key == 'search') {
          if (value) {
            if (mapInfo.toolkit.search) {
              // search inst exist
              mapInfo.toolkit.search.addTo(antAvaInfo.inst);
            } else {
              // new search when it doesn't exist
              mapInfo.toolkit.search = GeoNames({
                position: 'topcenter',
                username: 'Mr_DataPie',
                enablePostalCodes: false,
              }).addTo(antAvaInfo.inst);
            }
          } else {
            // remove search
            mapInfo.toolkit.search.remove();
          }
        } else if (key == 'coordinator') {
          if (value) {
            if (mapInfo.toolkit.coordinator) {
              // coordinator inst exist
              mapInfo.toolkit.coordinator.addTo(antAvaInfo.inst);
            } else {
              // new coordinator when it doesn't exist
              mapInfo.toolkit.coordinator = L.control
                .coordinates({
                  position: 'bottomleft',
                  decimals: 2,
                  useDMS: false,
                  useLatLngOrder: true, //ordering of labels, default false-> lng-lat
                  markerType: L.marker,
                  enableUserInput: true,
                })
                .addTo(antAvaInfo.inst);
            }
          } else {
            // remove coordinator
            mapInfo.toolkit.coordinator.remove();
          }
        } else if (key == 'open') {
          if (value) {
            if (mapInfo.toolkit.open) {
              // open inst exist
              mapInfo.toolkit.open.addTo(antAvaInfo.inst);
            } else {
              // new open when it doesn't exist
              mapInfo.toolkit.open = L.easyButton(
                '<img src="/resource/img/open-1.png">',
                function (btn, map) {
                  uploadRef.value.click();
                },
              ).addTo(antAvaInfo.inst);
            }
          } else {
            // remove open
            mapInfo.toolkit.open.remove();
          }
        } else if (key == 'export') {
          if (value) {
            if (mapInfo.toolkit.export) {
              // export inst exist
              mapInfo.toolkit.export.addTo(antAvaInfo.inst);
            } else {
              // new export when it doesn't exist
              mapInfo.toolkit.export = EasyPrint({
                title: 'Export',
                position: 'topleft',
                exportOnly: true,
                hideControlContainer: true,
              }).addTo(antAvaInfo.inst);
            }
          } else {
            // remove export
            mapInfo.toolkit.export.remove();
          }
        } else if (key == 'locator') {
          if (value) {
            if (mapInfo.toolkit.locator) {
              // locator inst exist
              mapInfo.toolkit.locator.addTo(antAvaInfo.inst);
            } else {
              // new locator when it doesn't exist
              mapInfo.toolkit.locator = new Locate({
                position: 'topleft',
                strings: {
                  title: 'Locator',
                },
              }).addTo(antAvaInfo.inst);
            }
          } else {
            // remove locator
            mapInfo.toolkit.locator.remove();
          }
        } else if (key == 'player') {
          if (value) {
            if (mapInfo.toolkit.player) {
              // player inst exist
              mapInfo.toolkit.timeline.addTo(antAvaInfo.inst);
              mapInfo.toolkit.player.addTo(antAvaInfo.inst);
            } else {
              // new player when it doesn't exist
              mapInfo.toolkit.timeline = L.timeline(pointsData).addTo(antAvaInfo.inst);
              mapInfo.toolkit.player = L.timelineSliderControl({
                formatOutput: function (date) {
                  return new Date(date).toLocaleDateString();
                },
              }).addTo(antAvaInfo.inst);
              mapInfo.toolkit.player.addTimelines(mapInfo.toolkit.timeline);
            }
          } else {
            // remove player
            mapInfo.toolkit.timeline.remove();
            mapInfo.toolkit.player.remove();
          }
        }
        break;
      }
      case 'cluster': {
        // need rebuild cluster or save then take effect. Gavin!!!
        if (key == 'enabled') {
          antAvaInfo.inst.removeLayer(mapInfo.cluster.all);
          if (value) {
            mapInfo.cluster.all.options.disableClusteringAtZoom = null;
            //mapInfo.cluster.all.setMaxZoom(null);
          } else {
            mapInfo.cluster.all.options.disableClusteringAtZoom = 1;
            //mapInfo.cluster.all.setMaxZoom(1);
          }
          mapInfo.cluster.all.addTo(antAvaInfo.inst);
        }
        break;
      }
      case 'marker': {
        // do nothing
        // save and reload it to take effect
        break;
      }
      default: {
        //
      }
    }

    // update advance panel
    advancedInfo.textCfg = JSON.stringify(rawData.value.libCfg);
  };

  /*
   * handle Cytoscape custom change
   * rawData.libCfg was updated in adapter
   * advCfgText need to be updated when custom is changed
   * chart need to be refreshed
   */
  const handleCustomCyChange = (category: string, key: string, value: any) => {
    // the rawData.config of adapter is updated too when rawData.value.libCfg is updated here
    switch (category) {
      case 'layout': {
        let layIdx = rawData.value.libCfg.config.layout.findIndex((ele) => {
          return ele.alias == key;
        });
        rawData.value.libCfg.config.layout[layIdx] = value;
        const layouts = cloneDeep(unref(rawData.value.libCfg.config.layout));
        $.fn.cyPanUpdate({ layouts });
        break;
      }
      case 'toolkit': {
        $.fn.cyPanUpdate({ tool: key, enabled: value });
        break;
      }
      case 'aux': {
        if (key == 'animate') {
          // enable or disable animation of layout
          const layouts = cloneDeep(unref(rawData.value.libCfg.config.layout));
          $.fn.cyPanUpdate({ layouts });
        } else if (
          key == 'collapse' ||
          key == 'highlight' ||
          key == 'rankField' ||
          key == 'rankOrder' ||
          key == 'infoField'
        ) {
          buildCyNetEvents(antAvaInfo.inst, rawData.value.libCfg.config.aux, $);
        } else if (key == 'panel') {
          $.fn.cyPanUpdate({ tool: key, enabled: value ? true : false });
          buildCyNetEvents(antAvaInfo.inst, rawData.value.libCfg.config.aux, $);
        }
        break;
      }
      case 'nodeIcon': {
        if (key == 'labelSize') {
          antAvaInfo.inst.style().selector('node').style({
            'font-size': value,
          });
        } else if (key == 'labelColor') {
          antAvaInfo.inst.style().selector('node').style({
            color: value,
          });
        } else {
          const cyNodes = antAvaInfo.inst.nodes();
          for (const node of cyNodes) {
            if (key == 'shape') {
              node.data()['iconShape'] = value;
            } else if (key == 'color') {
              node.data()['iconColor'] = value;
            }
          }
        }
        break;
      }
      case 'nodeBody': {
        if (key == 'shape') {
          antAvaInfo.inst
            .style()
            .selector('node')
            .style({
              shape: value,
              'background-opacity': value ? 1 : 0,
            });
        } else if (key == 'color') {
          antAvaInfo.inst
            .style()
            .selector('node[^bodyColor]')
            .style({
              'background-color': value == null ? '' : value,
              'background-opacity': value == null ? 0 : 1,
            });
        } else {
          const cyNodes = antAvaInfo.inst.nodes();
          for (const node of cyNodes) {
            if (key == 'shape') {
              node.data()['bodyShape'] = value;
              if (value == undefined) {
                node.data()['bodyOpacity'] = 0;
              }
            } else if (key == 'color') {
              node.data()['bodyColor'] = value;
            }
          }
        }
        break;
      }
      case 'edgeLine':
      case 'edgeMarker': {
        if (key == 'style') {
          antAvaInfo.inst.style().selector('edge').style({
            'line-style': value,
          });
        } else if (key == 'color') {
          antAvaInfo.inst.style().selector('edge').style({
            'line-color': value,
          });
        } else if (key == 'labelSize') {
          antAvaInfo.inst.style().selector('edge').style({
            'font-size': value,
          });
        } else if (key == 'labelColor') {
          antAvaInfo.inst.style().selector('edge').style({
            color: value,
          });
        } else if (key == 'type') {
          antAvaInfo.inst.style().selector('edge').style({
            'curve-style': value,
          });
        } else if (key == 'width') {
          antAvaInfo.inst.style().selector('edge').style({
            width: value,
          });
        } else if (key == 'marker') {
          antAvaInfo.inst.style().selector('edge').style({
            'mid-target-arrow-shape': value,
          });
        } else {
          const cyEdges = antAvaInfo.inst.edges();
          for (const edge of cyEdges) {
            if (key == 'styleField') {
              edge.data()['lineStyle'] = value;
            } else if (key == 'colorField') {
              edge.data()['lineColor'] = value;
            } else if (key == 'widthField') {
              edge.data()['lineWidth'] = value;
            }
          }
        }
        break;
      }
    }

    if (antAvaInfo?.inst) {
      antAvaInfo.inst.style().update();
    }
  };

  /*
   * advance chart lib name is changed
   */
  const handAdvLibNameChange = (key: string, value: any) => {
    // selected lib
    advancedInfo.selectedLib = value;

    // set lib version to the first one which should be latest version
    rawData.value.libVer = value.ver[0];
  };

  /*
   * advance config is changed
   * update rawData.libCfg and adapter
   * refresh chart also
   */
  const handleAdvApply = () => {
    if (!rawData.value.datasetId) {
      message.error(t('dataviz.dataview.error.datasetNull'));
      return;
    } else if (datasetInfo.viewData.length == 0 && datasetInfo.index != 0) {
      // chart data point to dataset data if there is data but no chart is rendered
      datasetInfo.viewData = datasetInfo.dataset[datasetInfo.index].data;
    }

    rawData.value.libCfg = JSON.parse(advancedInfo.textCfg);

    extractBasicCfg(rawData.value.libCfg, rawData.value.libName, rawData.value.libVer);

    // render chart
    renderChart();

    // pass lib config to custom adapter
    passConfigToAdapter(rawData.value.libCfg, rawData.value.libName, rawData.value.libVer);
  };

  /*
   * advance config is changed
   */
  const extractBasicCfg = (libCfg, libName, libVer) => {
    let chartType,
      dim = [],
      metrics = [];

    if (libName === 'G2Plot') {
      chartType = libCfg.chartType;
      if (rawData.value.type && rawData.value.type.indexOf(chartType.toLowerCase()) <= 0) {
        // current chart type is not matched with the type in lib config
        chartTypes.value[rawData.value.type].active = false;
        for (const key in chartTypes.value) {
          if (key.indexOf(chartType.toLowerCase()) == 0) {
            rawData.value.type = key;
            chartTypes.value[rawData.value.type].active = true;
            thumbnailPage.value = chartTypes.value[rawData.value.type].page ? 1 : 0;
            break;
          }
        }
      } else {
        for (const key in chartTypes.value) {
          if (key.indexOf(chartType.toLowerCase()) == 0) {
            rawData.value.type = key;
            chartTypes.value[rawData.value.type].active = true;
            thumbnailPage.value = chartTypes.value[rawData.value.type].page ? 1 : 0;
            break;
          }
        }
      }

      dim.push(libCfg.config.xField);
      if (libCfg.config.seriesField) {
        dim.push(libCfg.config.seriesField);
      }
      if (libCfg.config.groupField) {
        dim.push(libCfg.config.groupField);
      }
      rawData.value.dim = dim;

      metrics.push(libCfg.config.yField);
      rawData.value.metrics = metrics;
      if (configFormRef.value) {
        configFormRef.value.setFieldsValue({
          dim: rawData.value.dim,
          metrics: rawData.value.metrics,
        });
      }
    } else if (libName === 'ECharts') {
      //
    } else if (libName === 'AmCharts') {
      //
    } else if (libName === 'ApexCharts') {
      //
    } else if (libName === 'VegaLite') {
      //
    }
  };

  /*
   * submit after data is updated
   */
  async function saveDataview() {
    try {
      let values;
      if (infoFormRef.value) {
        // validate form data
        values = await infoFormRef.value.validate();
        rawData.value.name = values.name;
        rawData.value.desc = values.desc;
        if (Array.isArray(values.group)) {
          // change array to a single string
          // group is array because it is set to tags to support both adding and selecting
          rawData.value.group = values.group[0];
        }
      }
      if (configFormRef.value) {
        let cfgInfo = await configFormRef.value.validate();
        rawData.value.datasetId = cfgInfo.datasetId;
        rawData.value.relation = cfgInfo.relation;
        rawData.value.location = cfgInfo.location;
        rawData.value.dim = cfgInfo.dim;
        rawData.value.metrics = cfgInfo.metrics;
      }

      // id should be a number, but we get string from form.
      // so convert it to number
      // otherwise updateTableDataRecord() will not work because string id can not be found in data
      setDrawerProps({ confirmLoading: true });
      if (values.id) {
        values.id = Number(values.id);
        API_DATAVIEW_UPDATE(unref(rawData.value))
          .then(() => {
            // notify parent
            emit('success', unref(rawData.value));
          })
          .catch((err) => {
            message.warning(t('common.exception.update'), err);
          });
      } else {
        rawData.value.pubFlag = false; // default
        rawData.value.variable = [];
        rawData.value.model = {};
        API_DATAVIEW_CREATE(unref(rawData.value))
          .then(() => {
            // notify parent
            emit('success', unref(rawData.value));
          })
          .catch((err) => {
            message.warning(t('common.exception.new'), err);
          });
      }
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }

  /*
   * add or update variable
   * event is from varModal
   */
  function handleSuccess(data) {
    if (data.key == 'var') {
      delete data.key;
      let varIdx = rawData.value.variable.findIndex((ele) => {
        return ele.name == data.name;
      });
      if (varIdx != undefined && varIdx >= 0) {
        rawData.value.variable[varIdx] = data;
      } else {
        rawData.value.variable.push(data);
      }
    } else {
      delete data.key;
      if (!data.metrics) {
        if (data.type == 'number') {
          // metrics if it is a number
          data.metrics = true;
        } else {
          // delete it if it is dim
          delete data.metrics;
        }
      }

      let calcIdx = rawData.value.calculation.findIndex((ele) => {
        return ele.name == data.name;
      });
      if (calcIdx != undefined && calcIdx >= 0) {
        rawData.value.calculation[calcIdx] = data;
        fieldCalculation('update', data);
      } else {
        rawData.value.calculation.push(data);
        fieldCalculation('new', data);
      }
    }
  }

  /*
   * close current form
   */
  function handleFormClose() {
    if (antAvaInfo.inst && rawData.value.type?.endsWith('_map')) {
      try {
        antAvaInfo.inst.remove();
      } catch (e) {
        //
      }
    }
    if (antAvaInfo.inst && rawData.value.type?.endsWith('_net')) {
      try {
        antAvaInfo.inst.destroy();
      } catch (e) {
        //
      }
    }
  }
</script>

<style lang="less" scoped>
  .visible-list {
    width: 100%;
  }

  .fielditem {
    padding: 2px;
    margin: 2px 0px 2px 0px;
    border: solid 1px #eee;
    background-color: #f1f1f1;
    width: 100%;
    font-size: 12px;
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

  .toolbar-button2 {
    color: #08c;
    font-size: 28px;
    margin-right: 8px;
  }

  .toolbar-button2:hover {
    background-color: gold;
    cursor: pointer;
  }

  .toolbar-button3 {
    color: darkorange;
    font-size: 28px;
    margin-right: 8px;
  }

  .toolbar-button3:hover {
    background-color: gold;
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
  .marker-tooltip {
    text-align: left;
  }
</style>
