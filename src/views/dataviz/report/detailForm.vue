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
        <SaveTwoTone class="toolbar-button" @click="saveDatareport" />
      </Tooltip>
    </template>
    <a-row type="flex" :gutter="4">
      <a-col :md="24 - rightPanelSize" :sm="24">
        <div
          id="reportcontainer"
          ref="reportContainer"
          style="
            height: 100%;
            width: 100%;
            text-align: center;
            border: 1px solid;
            background-color: white;
          "
          :ondragover="(ev) => ev.preventDefault()"
          :ondrop="(ev) => handleDropEnd(ev)"
        >
          <grid-layout
            v-model:layout="selectedPage.grid"
            :col-num="24"
            :maxRows="19"
            :row-height="30"
            :is-draggable="true"
            :is-resizable="true"
            :autoSize="false"
            :margin="[10, 10]"
            :vertical-compact="true"
            :preventCollision="false"
            :use-css-transforms="true"
          >
            <grid-item
              v-for="item in selectedPage.grid"
              :key="item.i"
              :i="item.i"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              drag-allow-from=".dragger"
              :class="vue - grid - item"
              :style="{
                borderWidth: selectedPage.border ? '1px' : '0px',
                borderStyle: selectedPage.border,
              }"
            >
              <div id="header" class="dragger">
                <span v-if="selectedPage.label" :style="{ float: 'left', marginLeft: '5px' }">
                  {{ item.name }}
                </span>
                <span class="dragger-button" @click="handleRemoveView(item.id)">
                  <CloseSquareTwoTone :style="{ fontSize: '20px' }" />
                </span>
                <span v-if="selectedPage.toolbar" class="dragger-button">
                  <FullscreenOutlined :style="{ fontSize: '20px', color: 'green' }" />
                </span>
                <span v-if="selectedPage.interval > 0" class="dragger-button">
                  <SyncOutlined :style="{ fontSize: '16px', color: 'green' }" />
                </span>
              </div>
              <div
                :id="item.type + item.id"
                :ref="setGridDivRef"
                style="
                  width: 98%;
                  height: 90%;
                  text-align: center;
                  vertical-align: middle;
                  padding: 5px;
                "
              ></div>
            </grid-item>
          </grid-layout>
        </div>
        <div
          id="gojsContainer"
          ref="gojsContainerRef"
          style="height: 1%; width: 100%; display: none"
        ></div>
      </a-col>
      <div class="layout-area">
        <div
          @click="
            () => {
              rightPanelSize = 5 - rightPanelSize;
            }
          "
        >
          <span v-if="rightPanelSize == 0" class="expand"><LeftOutlined /></span>
          <span v-else class="collapse"><RightOutlined /></span>
        </div>
      </div>
      <a-col :md="rightPanelSize" :sm="24">
        <div class="ml-2 overflow-hidden bg-white">
          <a-tabs default-active-key="page" hide-add size="middle" centered style="height: 750px">
            <a-tab-pane
              key="info"
              :forceRender="true"
              :closable="false"
              :tab="t('dataviz.datareport.form.info.title')"
            >
              <BasicForm @register="registerInfoForm">
                <template #group="{ model, field }">
                  <ApiSelect
                    :api="API_DATAREPORT_GROUPS"
                    mode="tags"
                    v-model:value="model[field]"
                    resultField="records"
                    @change="handleDatareportGroupChange"
                  />
                </template>
              </BasicForm>
            </a-tab-pane>
            <a-tab-pane
              key="page"
              :forceRender="true"
              :closable="false"
              :tab="t('dataviz.datareport.form.pages.title')"
            >
              <PlusCircleTwoTone class="new-page-button" @click="handleAddPage" />
              <draggable
                item-key="id"
                :list="rawData.pages"
                chosen-class="chosen"
                force-fallback="true"
                animation="500"
              >
                <template #item="{ element, index }">
                  <div style="margin-top: 10px">
                    <Card hoverable style="width: 100%; margin-top: 10px">
                      <CardMeta>
                        <template #title>
                          <div class="report-page" @click="handlePageSwitch(index)">{{
                            element.title
                          }}</div>
                        </template>
                      </CardMeta>
                      <template #actions>
                        <span>{{ index + 1 }}</span>
                        <CopyOutlined @click="handleClonePage(index)" />
                        <DeleteOutlined @click="handleRemovePage(index)" />
                      </template>
                    </Card>
                  </div>
                </template>
              </draggable>
            </a-tab-pane>
            <a-tab-pane
              key="dataview"
              :forceRender="true"
              :closable="false"
              :tab="t('dataviz.datareport.form.dataview.title')"
            >
              <ApiSelect
                :api="API_DATAVIEW_GROUPS"
                v-model:value="dataviewGroupName"
                style="width: 100%"
                :placeholder="t('common.table.title.group')"
                resultField="records"
                labelField="value"
                valueField="value"
                @change="handleDataviewGroupChange"
              />
              <Card>
                <CardGrid v-for="item in dataviewList" :key="item.id" style="width: 100%">
                  <div
                    :id="item.id"
                    draggable="true"
                    style="cursor: pointer"
                    :ondragstart="(ev) => handleDragStart(ev)"
                    @dblclick.native="handleClickAdd"
                  >
                    <span>
                      <Avatar
                        :id="item.id"
                        shape="square"
                        :size="36"
                        :src="
                          'data:image/svg+xml;utf8,' +
                          encodeURIComponent(chartTypes[item.type].svgCode)
                        "
                      />
                      <span>{{ item.name }}</span>
                      <div class="text-secondary">{{ item.desc }}</div>
                    </span>
                  </div>
                </CardGrid>
              </Card>
            </a-tab-pane>
            <a-tab-pane
              key="config"
              :forceRender="true"
              :closable="false"
              :tab="t('dataviz.datareport.form.config.name')"
            >
              <BasicForm
                ref="configFormRef"
                :schemas="formConfigSchema"
                :showActionButtonGroup="false"
                @fieldValueChange="handleConfigChange"
              />
            </a-tab-pane>
            <a-tab-pane
              key="filter"
              :forceRender="true"
              :closable="false"
              :tab="t('dataviz.datareport.form.filter.title')"
            >
            <Select
              size="small"
              v-model:value="rawData.filter"
              style="width: 100%"
              mode="multiple"
              :options="dimsForFilter.map((item) => ({ label: item, value: item }))"
              :placeholder="t('dataviz.datareport.form.filter.title')"
              />
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
    </a-row>
  </BasicDrawer>
</template>

<script lang="ts" setup name="DetailForm">
  import { nextTick, ref, unref } from 'vue';
  import { BasicForm, FormActionType, useForm } from '/@/components/Form/index';
  import { formInfoSchema, formConfigSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import {
    LeftOutlined,
    RightOutlined,
    PlaySquareTwoTone,
    SaveTwoTone,
    CopyOutlined,
    DeleteOutlined,
    PlusCircleTwoTone,
    SyncOutlined,
    FullscreenOutlined,
    CloseSquareTwoTone,
  } from '@ant-design/icons-vue';
  import 'splitpanes/dist/splitpanes.css';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ApiSelect } from '/@/components/Form';
  import {
    message,
    Tooltip,
    Avatar,
    Card,
    CardGrid,
    CardMeta,
    Row as ARow,
    Col as ACol,
    Tabs as ATabs,
    TabPane as ATabPane,
    Select
  } from 'ant-design-vue';
  import {
    API_DATAVIEW_GROUPS,
    API_DATAVIEW_BY_GROUP,
    API_DATAVIEW_EXECUTE,
  } from '/@/api/dataviz/dataview';
  import Thumbnails from '@antv/thumbnails';
  import { setGlobal } from '@antv/g2plot';
  import draggable from 'vuedraggable';
  import ApexCharts from 'apexcharts';
  import { g2plotRender } from '@antv/antv-spec';
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
  import { cloneDeep } from 'lodash-es';
  import { useLocale } from '/@/locales/useLocale';
  import { renderLeafletMap2 } from '../dataview/leafletFunc';
  import {
    ApiDatareportDataType,
    initReportData,
    initReportPage,
    ReportPageType,
  } from '/@/api/dataviz/model/datareport';
  import {
    API_DATAREPORT_CREATE,
    API_DATAREPORT_GROUPS,
    API_DATAREPORT_UPDATE,
  } from '/@/api/dataviz/datareport';
  import { mapTypes, netTypes } from '/@/views/dataviz/dataview/data';
  import { convertGroupToTree, renderCyNet2 } from '/@/views/dataviz/dataview/cyFunc';
  import $ from 'jquery';
import { getEnvironmentData } from 'worker_threads';
import { GoogleProvider } from 'leaflet-geosearch';
import template from 'template_js';

  const { t } = useI18n();
  const drawerTitle = ref<string>(t('common.form.new'));
  const emit = defineEmits(['success', 'register']);
  // rawData is dataview record which is from backend
  const rawData = ref<ApiDatareportDataType>({ ...initReportData });
  const selectedPage = ref<ReportPageType>({ ...initReportPage });
  const rightPanelSize = ref<number>(5);
  const dataviewGroupName = ref<string>();
  const configFormRef = ref<Nullable<FormActionType>>(null);
  let gridRefs: any = {};
  const dimsForFilter = ref<string[]>([]);
  const chartTypes = ref<any>({ ...Thumbnails, ...mapTypes, ...netTypes });
  const gojsContainerRef = ref<any>();

  // set locale of G2Plot
  const { getLocale } = useLocale();
  setGlobal({ locale: getLocale.value });
  template.config({ sTag: '{', eTag: '}' });

  // info form definition
  const [
    registerInfoForm,
    {
      setFieldsValue: setInfoFieldsValue,
      resetFields: resetInfoFields,
      validate: validateInfoFields,
    },
  ] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    layout: 'vertical',
    schemas: formInfoSchema,
    showActionButtonGroup: false,
  });

  // drawer data initialization
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    // remove old data of info form
    await resetInfoFields();
    for (let rf in gridRefs) {
      // clean up the old charts
      gridRefs[rf].innerHTML = '';
    }
    gridRefs = {};
    selectedPage.value = {};
    setDrawerProps({ confirmLoading: false });

    if (!data || !data.id) {
      // new report with an empty page
      drawerTitle.value = t('common.form.new');
      rawData.value = { ...initReportData };
      rawData.value.pages?.push({ ...initReportPage });
    } else {
      //edit report
      drawerTitle.value = t('common.form.edit') + ' - ' + data.name;

      // clone received data
      // grid will be added some properties like data, instance, etc.
      // Clone it to avoid polluting grid
      rawData.value = cloneDeep(data);

      // pass received data to info form
      setInfoFieldsValue(unref(rawData.value));
    }

    // default selected page 0
    selectedPage.value = rawData.value.pages[0];
    await configFormRef.value?.resetFields();
    configFormRef.value?.setFieldsValue(unref(selectedPage.value));

    // query config and data
    execute();
  });

  /*
   * add a new page
   */
  const handleAddPage = () => {
    rawData.value.pages?.push({ ...initReportPage });
  };

  /*
   * clone a page
   */
  const handlePageSwitch = async (idx: number) => {
    if (selectedPage.value == rawData.value.pages[idx]) {
      //selected page is current page
      return;
    }

    for (let rf in gridRefs) {
      // clean up the old charts
      gridRefs[rf].innerHTML = '';
    }
    gridRefs = {};
    selectedPage.value = rawData.value.pages[idx];
    await configFormRef.value?.resetFields();
    configFormRef.value?.setFieldsValue(unref(selectedPage.value));
    // query config and data
    execute();
  };
  /*
   * clone a page
   */
  const handleClonePage = (idx: number) => {
    rawData.value.pages?.splice(idx, 0, { ...rawData.value.pages[idx] });
  };

  /*
   * remove a page
   */
  const handleRemovePage = (idx: number) => {
    rawData.value.pages?.splice(idx, 1);
  };

  /*
   * only pick up the latest one as selected field when selecting change
   * select component accepts user defined item when it is tags mode
   * so you can select existing group name or create a new group
   */
  const handleDatareportGroupChange = (value: string[]) => {
    if (value.length > 0) {
      // get the latest one when there are multiple selections
      setInfoFieldsValue({ group: value[value.length - 1] });
    } else {
      // set to undefined when it is empty to avoid []
      setInfoFieldsValue({ group: undefined });
    }
  };

  /*
   * save id to event when drag start
   */
  const handleDragStart = (ev) => {
    if (ev) {
      // pass view id to event
      ev.dataTransfer.setData('id', ev.target.id);
    }
  };

  /*
   * show view when drop end
   */
  const handleDropEnd = (ev) => {
    if (ev) {
      //ev.preventDefault();
      // get view id from event
      const view_id = Number(ev.dataTransfer.getData('id'));
      const existingGrid = selectedPage.value.grid?.find((g) => {
        return g.id == view_id;
      });
      if (existingGrid) {
        // dragging view is on current page
        return;
      }

      // add a new grid to selected page
      selectedPage.value.grid?.push({
        i: selectedPage.value.grid?.length,
        x: 0,
        y: 0,
        w: 5,
        h: 5,
        id: view_id,
        type: 'view',
      });

      // get view data and config to show
      execute(view_id);
    }
  };

  /*
   * add view to page when double click
   */
   const handleClickAdd = (ev: any) => {
    const view_id = Number(ev.currentTarget.id);
      const existingGrid = selectedPage.value.grid?.find((g) => {
        return g.id == view_id;
      });
      if (existingGrid) {
        // dragging view is on current page
        return;
      }

      // add a new grid to selected page
      selectedPage.value.grid?.push({
        i: selectedPage.value.grid?.length,
        x: 0,
        y: 0,
        w: 5,
        h: 5,
        id: view_id,
        type: 'view',
      });

      // get view data and config to show
      execute(view_id);
   }


  /*
   * remove a grid from page
   */
  const handleRemoveView = (id: number) => {
    // find grid index
    let gridIdx = selectedPage.value.grid?.findIndex((g) => {
      return g.id == id;
    });
    if (gridIdx != undefined && gridIdx >= 0) {
      // clean chart container
      gridRefs['view' + id].innerHTML = '';
      delete gridRefs['view' + id];
      // remove gird from page
      selectedPage.value.grid?.splice(gridIdx, 1);
    }
  };

  /*
   * change page config
   */
  const handleConfigChange = (key: string, value: string) => {
    selectedPage.value[key] = value;
  };

  /*
   * update rawData when source is changed
   */
  const dataviewList = ref<any[]>([]);
  const handleDataviewGroupChange = (name: string) => {
    API_DATAVIEW_BY_GROUP(dataviewGroupName.value).then((response) => {
      // get view list
      dataviewList.value = response.records;
    });
  };

  /*
   * run every dataview to get data and config then render it
   */
  const execute = (viewId: number | undefined) => {
    if (selectedPage.value && selectedPage.value.grid) {
      for (let grid of selectedPage.value.grid) {
        if (viewId != undefined && viewId != grid.id) {
          continue;
        }
        if (grid.type == 'view' && !grid.data) {
          // get data and chart config
          API_DATAVIEW_EXECUTE(grid.id, 0).then((response) => {
            let viewData = buildRecords(response.records, response.columns);

            // find existing view grid
            let gridView = selectedPage.value.grid.find((g) => {
              return g.id == response.id;
            });

            if (gridView) {
              gridView['name'] = response.name;
              gridView['group'] = response.group;
              gridView['libName'] = response.libName;
              gridView['libVer'] = response.libVer;
              gridView['libCfg'] = response.libCfg;
              gridView['dim'] = response.dim;
              gridView['metrics'] = response.metrics;
              gridView['interval'] = response.interval; // interval(min) of auto refresh
              gridView['data'] = viewData;

              if(response.variable && response.variable.length > 0){
                // build filter based on variable and filter later
                if(selectedPage.value.filter == undefined){
                  selectedPage.value.filter = [];
                }
                for(let param of response.variable){
                  let filterItem = {
                    enabled: false,
                    label: param.name,
                    defaultValue: param.value
                  };

                  filterItem.targetViews = [response.id];
                  selectedPage.value.filter.push(filterItem);
                }
              }
              
              if(response.dim){
                for(const dim of response.dim){
                  if(dimsForFilter.value.indexOf(dim)<0){
                    dimsForFilter.value.push(dim);
                  }
                }
              }
              
              // render view
              renderChart(gridView);
            }
          });
        } else if (grid.type == 'view' && grid.data) {
          // render view with existing data and chart config
          renderChart(grid);
        }
      }
    }
  };

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
        if (columns[j].type == 'number') {
          // float covers integer
          cValue = parseFloat(cValue);
        }
        dt[columns[j].name] = cValue;
      }
      jsonArray.push(dt);
    }
    return jsonArray;
  }

  // it's chart container
  const setGridDivRef = (el) => {
    if (el && selectedPage.value.grid) {
      for (let item of selectedPage.value.grid) {
        if (el.id == item.type + item.id) {
          item.container = el;
          gridRefs[el.id] = el;
          break;
        }
      }
    }
  };

  /*
   * render chart
   */
  const renderChart = (grid: any) => {
    if (grid.container) {
      try {
        grid.instance.remove();
      } catch (e) {
        //
      }
      try {
        grid.instance.destroy();
      } catch (e) {
        //
      }
      // clean it up before render
      grid.container.innerHTML = '';
    }
    // render charts when DOM is ready
    nextTick(() => {
      if (!grid.libName || grid.libName === 'G2Plot') {
        renderG2Plot(grid);
      } else if (grid.libName === 'ECharts') {
        renderECharts(grid);
      } else if (grid.libName === 'AmCharts') {
        renderAmCharts(grid);
      } else if (grid.libName === 'ApexCharts') {
        renderApexCharts(grid);
      } else if (grid.libName === 'Leaflet') {
        renderLeafletMap(grid);
      } else if (grid.libName === 'Cytoscape') {
        renderCyNet(grid);
      }
    });
  };

  /*
   * render G2Plot
   */
  const renderG2Plot = (grid: any) => {
    grid.instance = g2plotRender(
      {
        chartType: grid.libCfg.chartType,
        config: { ...grid.libCfg.config, data: grid.data },
      },
      grid.container,
    );
  };

  /*
   * render ECharts
   */
  const renderECharts = (grid: any) => {
    let clonedCfg = cloneDeep(grid.libCfg);
    clonedCfg.dataset.source = grid.data;
    grid.instance = echarts.init(grid.container);
    grid.instance.setOption(clonedCfg);
  };

  /*
   * render ApexCharts
   */
  const renderApexCharts = (grid: any) => {
    let clonedCfg = cloneDeep(grid.libCfg);
    const catData = grid.data.map(function (value) {
      return value[grid.dim[0]];
    });
    clonedCfg.xaxis.categories = catData;

    for (let i = 0; i < grid.metrics.length; i++) {
      const valData = grid.data.map(function (value) {
        return value[grid.metrics[i]];
      });
      clonedCfg.series[i].data = valData;
    }

    grid.instance = new ApexCharts(grid.container, clonedCfg);
    grid.instance.render();
  };

  /*
   * render Amcharts
   */
   const renderAmCharts = (grid: any) => {
    // check version first ......

    // combine data  into config
    let clonedCfg: any = cloneDeep(grid.libCfg.config);
    clonedCfg.data = grid.data;

    am4core.useTheme(am4themes_animated);
    // render amCharts
    let inst = am4core.createFromConfig(clonedCfg, grid.container, am4charts.XYChart);

    return inst;
  };

  /*
   * render Leaflet map
   */
  const renderLeafletMap = (grid: any) => {
    grid.instance = renderLeafletMap2(grid.container, null, grid.data, grid.libCfg, '1.7', null);
  };

  /*
   * render Cy net
   */
  const renderCyNet = (grid: any) => {
    // convert flat data to tree data
    grid.data = convertGroupToTree(grid.data, grid.dim, 0);
    grid.instance = renderCyNet2(grid.container, gojsContainerRef.value, grid.data, grid.libCfg, '1.7', $);
  };

  /*
   * submit after data is updated
   */
  async function saveDatareport() {
    try {
      let values;
      // validate form data
      values = await validateInfoFields();
      rawData.value.name = values.name;
      rawData.value.desc = values.desc;
      rawData.value.group = values.group;
      rawData.value.type = values.type;

      if (!rawData.value.pages || rawData.value.pages.length <= 0) {
        // empty report
        return;
      }

      let clonedData = Object.assign({}, unref(rawData));
      // it will cause a issue if use cloneDeep() here
      //let clonedData = unref(rawData); 
      clonedData.viewIds = [];
      clonedData.pages = [];
      for (const currentPage of rawData.value.pages) {
        if (currentPage.grid && currentPage.grid.length > 0) {
          let newPage = {
              border: currentPage.border,
              filter: currentPage.filter,
              label: currentPage.label,
              layout: currentPage.layout,
              portrait: currentPage.portrait,
              title: currentPage.title,
              toolbar: currentPage.toolbar,
              grid: []
            };

          for (let grid of currentPage.grid) {
            if (grid.type == 'view' && !rawData.value.viewIds.includes(Number(grid.id))) {
              clonedData.viewIds.push(Number(grid.id));
            }

            let newGrid = {
              id: grid.id,
              name: grid.group + '/' + grid.name,
              type: grid.type,
              i: grid.i,
              h: grid.h,
              w: grid.w,
              x: grid.x,
              y: grid.y,
            };
            newPage.grid.push(newGrid);
          }
          clonedData.pages.push(newPage);
        }
      }

      setDrawerProps({ confirmLoading: true });
      if (clonedData.id) {
        clonedData.id = Number(clonedData.id);
        API_DATAREPORT_UPDATE(unref(clonedData))
          .then(() => {
            // notify parent
            emit('success', unref(clonedData));
            message.success(t('common.tip.update'));
          })
          .catch((err) => {
            message.warning(t('common.exception.update'), err);
          });
      } else {
        clonedData.pubFlag = false; // default
        API_DATAREPORT_CREATE(unref(clonedData))
          .then(() => {
            // notify parent
            emit('success', unref(clonedData));
            message.success(t('common.tip.new'));
          })
          .catch((err) => {
            message.warning(t('common.exception.new'), err);
          });
      }
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>

<style lang="less" scoped>
  .toolbar-input {
    width: 40% !important;
    max-width: 100%;
    top: -5px;
    margin-right: 8px;
  }

  .toolbar-button {
    font-size: 28px;
    margin-right: 8px;
  }

  .toolbar-button:hover {
    background-color: orange;
    cursor: pointer;
  }

  .toolbar-button2 {
    color: #08c;
    font-size: 28px;
    margin-right: 8px;
  }

  .toolbar-button2:hover {
    background-color: orange;
    cursor: pointer;
  }

  ::v-deep(.ant-card-actions) {
    height: 25px;
    margin: 0;
    padding: 0;
    list-style: none;
    background: #fafafa;
    border-top: 1px solid #f0f0f0;
    zoom: 1;
  }

  ::v-deep(.ant-card-actions > li) {
    float: left;
    margin: 0;
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
    align-content: center;
  }

  ::v-deep(.ant-card-grid) {
    padding: 5px;
  }

  .vue-grid-layout {
    background: #eee;
  }
  .vue-grid-item:not(.vue-grid-placeholder) {
    background: white;
    border-width: 1px;
    border-color: gray;
    border-style: dashed;
  }
  .vue-grid-item .resizing {
    opacity: 0.9;
  }
  .vue-grid-item .static {
    background: #cce;
  }
  .vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
  }
  .vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
  }
  .vue-grid-item .minMax {
    font-size: 12px;
  }
  .vue-grid-item .add {
    cursor: pointer;
  }
  .vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>")
      no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
  }

  .card-item {
    background-color: #fdfdfd;
    cursor: move;
  }

  .card-item:hover {
    background-color: #f1f1f1;
    cursor: move;
  }

  .dragger {
    width: 100%;
    height: 24px;
    background-color: antiquewhite;
  }

  .dragger:hover {
    cursor: move;
  }

  .dragger-button {
    float: right;
    margin-top: 2px;
    margin-right: 2px;
    cursor: pointer;
  }

  .chosen {
    border: solid 2px #3089dc !important;
  }

  .report-page {
    width: 100%;
    height: 80px;
    opacity: 0.9;
  }

  .report-page::after {
    content: '';
    background: url('/@/assets/images/report-page-4.png');
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

  .droppable-element {
    width: 100%;
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
