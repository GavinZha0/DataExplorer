<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <CollapseContainer :title="selectedPage.title" :border="true" :canExpan="false">
    <template #action>
      <Tooltip>
        <template #title>{{ t('common.toolbar.timezone') }}</template>
        <Select
          style="width: 200px"
          show-search
          v-model:value="timeZone"
          :options="
            Intl.supportedValuesOf('timeZone').map((item) => ({ label: item, value: item }))
            "
        >
        </Select>
      </Tooltip>
      <Tooltip>
        <template #title>{{ t('common.toolbar.picker') }}</template>
        <a-range-picker
          v-model:value="dateRange"
          :ranges="ranges"
          :format="datePickerFormat"
          :disabled-date="disabledDate"
          :locale="getLocale"
        />
      </Tooltip>
      <Tooltip>
        <template #title>{{ t('common.toolbar.refresh') }}</template>
        <InteractionOutlined class="toolbar-button" @click="execute" style="color: seagreen" />
      </Tooltip>
    </template>
    </CollapseContainer>
    <a-row type="flex" :gutter="4">
      <a-col :md="24 - rightPanelSize" :sm="24">
        <div
          id="reportcontainer"
          ref="reportContainer"
          style="height: 100%; width: 100%; text-align: center; background-color: white"
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
                <span v-if="selectedPage.toolbar" class="dragger-button">
                  <FullscreenExitOutlined
                    v-if="item.max"
                    :style="{ fontSize: '20px', color: 'green' }"
                    @click="handleMaxMin(item)"
                  />
                  <FullscreenOutlined
                    v-else
                    :style="{ fontSize: '20px', color: 'green' }"
                    @click="handleMaxMin(item)"
                  />
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
              rightPanelSize = 3 - rightPanelSize;
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
              key="page"
              :forceRender="true"
              :closable="false"
              :tab="t('dataviz.datareport.form.pages.title')"
            >
              <Card
                v-for="(item, index) of rawData.pages"
                :key="index"
                hoverable
                style="width: 100%; margin-top: 10px"
              >
                <CardMeta>
                  <template #title>
                    <div class="report-page" @click="handlePageSwitch(index)">{{ item.title }}</div>
                  </template>
                </CardMeta>
                <template #actions>
                  <span>{{ index + 1 }}</span>
                </template>
              </Card>
            </a-tab-pane>
            <a-tab-pane
              key="filter"
              :forceRender="true"
              :closable="false"
              :tab="t('dataviz.datareport.form.filter.title')"
            >
              <BasicForm
                ref="filterRef"
                :schemas="selectedPage.filter"
                layout="vertical"
                :baseColProps="{ span: 24 }"
                :showActionButtonGroup="false"
              />
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
    </a-row>
  </PageWrapper>
</template>

<script lang="ts" setup name="Home">
  import { nextTick, ref } from 'vue';
  import { BasicForm, FormActionType } from '/@/components/Form/index';
  import {
    LeftOutlined,
    RightOutlined,
    SyncOutlined,
    InteractionOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
  } from '@ant-design/icons-vue';
  import 'splitpanes/dist/splitpanes.css';
  import { useI18n } from '/@/hooks/web/useI18n';

  import {
    Tooltip,
    Row as ARow,
    Col as ACol,
    Tabs as ATabs,
    TabPane as ATabPane,
    Card,
    CardMeta,
    RangePicker as ARangePicker,
    Select,
  } from 'ant-design-vue';
  import { CollapseContainer } from '/@/components/Container';
  import { API_HOME_GET } from '/@/api/home/home';
  import { API_DATAVIEW_EXECUTE } from '/@/api/dataviz/dataview';
  import { setGlobal } from '@antv/g2plot';
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
  import {
    ApiDatareportDataType,
    initReportData,
    initReportPage,
    ReportPageType,
  } from '/@/api/dataviz/model/datareport';
  import dayjs, { Dayjs } from 'dayjs';
  import { RangeValue } from 'ant-design-vue/es/vc-picker/interface';
  import { renderLeafletMap2 } from '/@/views/dataviz/dataview/leafletFunc';
  import { convertGroupToTree, convertArrayToTree, renderCyNet2 } from '/@/views/dataviz/dataview/cyFunc';
  import $ from 'jquery';

  const { t } = useI18n();
  // rawData is dataview record which is from backend
  const rawData = ref<ApiDatareportDataType>({ ...initReportData });
  const selectedPage = ref<ReportPageType>({ ...initReportPage });
  const rightPanelSize = ref<number>(0);
  let gridRefs: any = {};
  const filterRef = ref<Nullable<FormActionType>>(null);
  const gojsContainerRef = ref<any>();

  // set locale of G2Plot
  const { getLocale } = useLocale();
  setGlobal({ locale: getLocale.value });

  const timeZone = ref<string>('America/New_York');
  const datePickerFormat = ref<string>('MM/DD/YYYY');
  const dateRange = ref<[Dayjs, Dayjs]>([
        dayjs('01/01/2004', 'MM/DD/YYYY'),
        dayjs('12/31/2004', 'MM/DD/YYYY'),
      ]);
  const ranges = ref<any>({
    Today: [dayjs(), dayjs()] as RangeValue,
    'This Week': [dayjs().startOf('week'), dayjs()] as RangeValue,
    'This Month': [dayjs().startOf('month'), dayjs()] as RangeValue,
    'This Year': [dayjs().startOf('year'), dayjs()] as RangeValue,
  });

  // disable future date selection
  const disabledDate = (current: Dayjs) => {
    // Can not select days after today
    return current && current > dayjs().endOf('day');
  };

  /*
   * maximize or normalize a view
   */
  const handleMaxMin = (view: any) => {
    if (view.max) {
      delete view.max;
    } else {
      view.max = true;
    }
  };

  /*
   * switch a page
   */
  const handlePageSwitch = async (idx: number) => {
    if (selectedPage.value == rawData.value.pages[idx]) {
      //do nothing when selected page is current page
      return;
    }

    for (let rf in gridRefs) {
      // clean up the old charts
      gridRefs[rf].innerHTML = '';
    }
    gridRefs = {};
    selectedPage.value = rawData.value.pages[idx];

    // query config and data
    execute();
  };

  /*
   * run every dataview to get data and config then render it
   */
  const execute = () => {
    if (selectedPage.value && selectedPage.value.grid) {
      for (let grid of selectedPage.value.grid) {
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
    if (grid.libCfg.config.dataMode == 'FieldLevel') {
      grid.data = convertGroupToTree(grid.data, grid.dim, 0);
    } else if (grid.libCfg.config.dataMode == 'IdPid') {
        grid.data = convertArrayToTree(
          grid.data,
          null,
          grid.dim[0],
          grid.relation[0],
          grid.relation[1],
          0,
        );
    }
    grid.instance = renderCyNet2(grid.container, gojsContainerRef.value, grid.data, grid.libCfg, '1.7', $);
  };


    // remove old data of filter form
    gridRefs = {};
    selectedPage.value = {grid: []};
    rawData.value = {};

/*
   * load reports to show on dashboard
   */
   const loadHomePage = () => {
    API_HOME_GET().then((response) => {
        // get reports to show on current dashboard
        rawData.value = response;
        if(response.pages!=null && response.pages.length > 0){
          selectedPage.value = rawData.value.pages[0];
          execute();
        }
      });
  };


  nextTick(()=>{
    loadHomePage();
  });
  
</script>

<style lang="less" scoped>
  .toolbar-input {
    width: 40% !important;
    max-width: 100%;
    top: -5px;
    margin-right: 8px;
  }

  .toolbar-button {
    font-size: 25px;
    margin-left: 5px;
    margin-right: 25px;
  }

  .toolbar-button:hover {
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

  .dragger-button {
    float: right;
    margin-top: 2px;
    margin-right: 2px;
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
