<template>
  <a-tabs default-active-key="style" hide-add size="small" centered style="height: 750px">
    <a-tab-pane key="style" :forceRender="true" :closable="false">
      <template #tab>
        <Tooltip>
          <template #title>{{ t('dataviz.dataview.form.custom.style.title') }}</template>
          <gift-outlined />
        </Tooltip>
      </template>
      <Row>
        <Col :span="10">
          <div style="height: 700px; padding-right: 5px; border-right-width: 2px">
            <BasicForm @register="registerStyleCommonForm" />
          </div>
        </Col>
        <Col :span="14">
          <BasicForm v-if="rawData.chartType == 'Line'" @register="registerStyleLineForm">
            <template #pointColor="{ model, field }">
              <!--el-color-picker v-model="model[field]" /-->
              <color-picker v-model:pureColor="model[field]" format="hex" disable-history disable-alpha shape="circle" />
            </template>
          </BasicForm>
          <BasicForm v-if="rawData.chartType == 'Area'" @register="registerStyleAreaForm">
            <template #areaFillColor="{ model, field }">
              <color-picker v-model:pureColor="model[field]" format="hex" disable-history disable-alpha shape="circle" />
            </template>
          </BasicForm>
          <BasicForm
            v-if="rawData.chartType == 'Column' || rawData.chartType == 'Bar'"
            @register="registerStyleColumnForm"
          >
            <template #labelColor="{ model, field }">
              <color-picker v-model:pureColor="model[field]" format="hex" disable-history disable-alpha shape="circle" />
            </template>
          </BasicForm>
          <BasicForm
            v-if="rawData.chartType == 'Pie' || rawData.chartType == 'Donut'"
            @register="registerStylePieForm"
          />
          <BasicForm v-if="rawData.chartType == 'Scatter'" @register="registerStyleScatterForm" />
        </Col>
      </Row>
    </a-tab-pane>
    <a-tab-pane key="xaxes" :forceRender="true" :closable="false">
      <template #tab>
        <Tooltip>
          <template #title>{{ t('dataviz.dataview.form.custom.xaxes.title') }}</template>
          <appstore-outlined />
        </Tooltip>
      </template>
      <BasicForm @register="registerXAxisForm">
        <template #titleColor="{ model, field }">
          <color-picker v-model:pureColor="model[field]" format="hex" disable-history disable-alpha shape="circle" />
        </template>
        <template #gridColor="{ model, field }">
          <color-picker v-model:pureColor="model[field]" format="hex" disable-history disable-alpha shape="circle" />
        </template>
      </BasicForm>
    </a-tab-pane>
    <a-tab-pane key="yaxes" :forceRender="true" :closable="false">
      <template #tab>
        <Tooltip>
          <template #title>{{ t('dataviz.dataview.form.custom.yaxes.title') }}</template>
          <drag-outlined />
        </Tooltip>
      </template>
      <BasicForm @register="registerYAxisForm">
        <template #titleColor="{ model, field }">
          <color-picker v-model:pureColor="model[field]" format="hex" disable-history disable-alpha shape="circle" />
        </template>
        <template #gridColor="{ model, field }">
          <color-picker v-model:pureColor="model[field]" format="hex" disable-history disable-alpha shape="circle" />
        </template>
      </BasicForm>
    </a-tab-pane>
    <a-tab-pane key="tooltip" :forceRender="true" :closable="false">
      <template #tab>
        <Tooltip>
          <template #title>{{ t('dataviz.dataview.form.custom.tooltip.title') }}</template>
          <message-outlined />
        </Tooltip>
      </template>
      <BasicForm @register="registerTooltipForm">
        <template #hairColor="{ model, field }">
          <color-picker v-model:pureColor="model[field]" format="hex" disable-history disable-alpha shape="circle" />
        </template>
        <template #hairBgColor="{ model, field }">
          <color-picker v-model:pureColor="model[field]" format="hex" disable-history disable-alpha shape="circle" />
        </template>
      </BasicForm>
    </a-tab-pane>
    <a-tab-pane key="legend" :forceRender="true" :closable="false">
      <template #tab>
        <Tooltip>
          <template #title>{{ t('dataviz.dataview.form.custom.legend.title') }}</template>
          <flag-outlined />
        </Tooltip>
      </template>
      <BasicForm @register="registerLegendForm" />
    </a-tab-pane>
    <a-tab-pane key="aux" :forceRender="true" :closable="false">
      <template #tab>
        <Tooltip>
          <template #title>{{ t('dataviz.dataview.form.custom.aux.title') }}</template>
          <paper-clip-outlined />
        </Tooltip>
      </template>
      <BasicForm @register="registerAuxForm">
        <template #labelColor="{ model, field }">
          <color-picker v-model:pureColor="model[field]" format="hex" disable-history disable-alpha shape="circle" />
        </template>
        <template #lineColor="{ model, field }">
          <color-picker v-model:pureColor="model[field]" format="hex" disable-history disable-alpha shape="circle" />
        </template>
        <template #lineTextColor="{ model, field }">
          <color-picker v-model:pureColor="model[field]" format="hex" disable-history disable-alpha shape="circle" />
        </template>
        <template #segColor="{ model, field }">
          <color-picker v-model:pureColor="model[field]" format="hex" disable-history disable-alpha shape="circle" />
        </template>
        <template #regionColor="{ model, field }">
          <color-picker v-model:pureColor="model[field]" format="hex" disable-history disable-alpha shape="circle" />
        </template>
        <template #pointColor="{ model, field }">
          <color-picker v-model:pureColor="model[field]" format="hex" disable-history disable-alpha shape="circle" />
        </template>
      </BasicForm>
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup name="G2plotAdapter">
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Tooltip, Tabs as ATabs, TabPane as ATabPane, Row, Col } from 'ant-design-vue';
  import {
    formCustomCommonStyle,
    formCustomLineStyle,
    formCustomAreaStyle,
    formCustomColumnStyle,
    formCustomPieStyle,
    formCustomAux,
    formCustomXAxis,
    formCustomYAxis,
    formCustomLegend,
    formCustomTooltip,
    initStyleCommon,
    initStyleLine,
    initStyleColumn,
    initStylePie,
    initStyleArea,
    initTooltip,
    initLegend,
    initAux,
    initXAxis,
    initYAxis,
    formCustomScatterStyle,
    initStyleScatter,
  } from './g2plotData';
  import {
    DragOutlined,
    GiftOutlined,
    FlagOutlined,
    MessageOutlined,
    PaperClipOutlined,
    AppstoreOutlined,
  } from '@ant-design/icons-vue';
  import { nextTick, reactive, unref } from 'vue';
  import { ColorPicker } from "vue3-colorpicker";
  import "vue3-colorpicker/style.css";
  import htmlColors from 'html-colors';
  import { cloneDeep } from 'lodash-es';

  const { t } = useI18n();
  const emit = defineEmits(['change']);
  let adapterActive = false;
  const rawData = reactive({
    chartType: '',
    libVer: '',
    libCfg: {},
  });

  // can't get real data when it set up here
  //const props = defineProps({ version: string, config: any });
  //const { version, config } = toRefs(props);

  // common style definition
  const [
    registerStyleCommonForm,
    {
      setFieldsValue: setStyleCommonFields,
      resetFields: resetStyleCommonFields,
      validate: valStyleCommonFields,
    },
  ] = useForm({
    labelWidth: 160,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formCustomCommonStyle,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleStyleCommonChange,
  });

  // line style definition
  const [
    registerStyleLineForm,
    {
      setFieldsValue: setStyleLineFields,
      resetFields: resetStyleLineFields,
      validate: valStyleLineFields,
    },
  ] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: formCustomLineStyle,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleStyleLineChange,
  });

  // area style definition
  const [
    registerStyleAreaForm,
    {
      setFieldsValue: setStyleAreaFields,
      resetFields: resetStyleAreaFields,
      validate: valStyleAreaFields,
    },
  ] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: formCustomAreaStyle,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleStyleAreaChange,
  });

  // column style definition
  const [
    registerStyleColumnForm,
    {
      setFieldsValue: setStyleColumnFields,
      resetFields: resetStyleColumnFields,
      validate: valStyleColumnFields,
    },
  ] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: formCustomColumnStyle,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleStyleColumnChange,
  });

  // pie style definition
  const [
    registerStylePieForm,
    {
      setFieldsValue: setStylePieFields,
      resetFields: resetStylePieFields,
      validate: valStylePieFields,
    },
  ] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: formCustomPieStyle,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleStylePieChange,
  });

  // scatter style definition
  const [
    registerStyleScatterForm,
    {
      setFieldsValue: setStyleScatterFields,
      resetFields: resetStyleScatterFields,
      validate: valStyleScatterFields,
    },
  ] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: formCustomScatterStyle,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleStyleScatterChange,
  });

  // X axes definition
  const [
    registerXAxisForm,
    { setFieldsValue: setXAxisFields, resetFields: resetXAxisFields, validate: valXAxisFields },
  ] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formCustomXAxis,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleXAxisChange,
  });

  // Y axes definition
  const [
    registerYAxisForm,
    { setFieldsValue: setYAxisFields, resetFields: resetYAxisFields, validate: valYAxisFields },
  ] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formCustomYAxis,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleYAxisChange,
  });

  // tooltip definition
  const [
    registerTooltipForm,
    {
      setFieldsValue: setTooltipFields,
      resetFields: resetTooltipFields,
      validate: valTooltipFields,
    },
  ] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formCustomTooltip,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleTooltipChange,
  });

  // legend definition
  const [
    registerLegendForm,
    { setFieldsValue: setLegendFields, resetFields: resetLegendFields, validate: valLegendFields },
  ] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formCustomLegend,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleLegendChange,
  });

  // aux definition
  const [
    registerAuxForm,
    { setFieldsValue: setAuxFields, resetFields: resetAuxFields, validate: valAuxFields },
  ] = useForm({
    labelWidth: 80,
    compact: true,
    baseColProps: { span: 24 },
    schemas: formCustomAux,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleAuxChange,
  });

  const customConfig = reactive<any>({
    styleCommon: { ...initStyleCommon },
    styleLine: { ...initStyleLine },
    styleArea: { ...initStyleArea },
    styleColumn: { ...initStyleColumn },
    stylePie: { ...initStylePie },
    styleScatter: { ...initStyleScatter },
    xAxis: { ...initXAxis },
    yAxis: { ...initYAxis },
    tooltip: { ...initTooltip },
    legend: { ...initLegend },
    aux: { ...initAux },
  });

  /*
   * parent invokes this method to pass the config data
   */
  const setConfigData = (libCfg, libVer) => {
    if (!libCfg || libCfg == '') {
      return;
    }

    adapterActive = false;
    rawData.libVer = libVer;
    rawData.libCfg = libCfg;
    rawData.chartType = libCfg.chartType;

    // parse config based on version
    parseConfig(rawData.libCfg.config, rawData.chartType);
    adapterActive = true;
  };

  /*
   * parse chart config and convert to custom fields
   */
  const parseConfig = async (libCfg: any, chartType: string) => {
    if (!libCfg) {
      return;
    }
    parseCommonStyle(libCfg);
    parseXAxis(libCfg.xAxis);
    parseYAxis(libCfg.yAxis);
    parseTooltip(libCfg.tooltip);
    parseLegend(libCfg.legend);
    parseAux(libCfg.annotations);

    // wait for specific form being rendered (v-if)
    await nextTick();

    if (chartType == 'Line') {
      parseLineStyle(libCfg);
    } else if (chartType == 'Area') {
      parseAreaStyle(libCfg);
    } else if (chartType == 'Column' || chartType == 'Bar') {
      parseColumnStyle(libCfg);
    } else if (chartType == 'Pie' || chartType == 'donut') {
      parsePieStyle(libCfg);
    } else if (chartType == 'Scatter') {
      parseScatterStyle(libCfg);
    }
  };

  // common style
  const parseCommonStyle = async (cfg: any) => {
    // reset customConfig and form
    customConfig.styleCommon = { ...unref(initStyleCommon) };
    await resetStyleCommonFields();
    if (!cfg) {
      return;
    }

    // support en and zh
    if (cfg.locale && cfg.locale != 'en-US') {
      customConfig.styleCommon.locale = cfg.locale;
    }

    if (cfg.theme) {
      // default or dark
      customConfig.styleCommon.theme = cfg.theme;
    }

    // animation(occasion, effect and duration)
    if (cfg.animation?.appear) {
      customConfig.styleCommon.occasion = 'appear';
      customConfig.styleCommon.effect = cfg.animation.appear.animation;
      // undefined == default == 500ms
      customConfig.styleCommon.duration = cfg.animation.appear.duration;
    } else if (cfg.animation?.enter) {
      customConfig.styleCommon.occasion = 'enter';
      customConfig.styleCommon.effect = cfg.animation.enter.animation;
      customConfig.styleCommon.duration = cfg.animation.enter.duration;
    } else if (cfg.animation?.update) {
      customConfig.styleCommon.occasion = 'update';
      customConfig.styleCommon.effect = cfg.animation.update.animation;
      customConfig.styleCommon.duration = cfg.animation.update.duration;
    }

    // interactions
    if (cfg.interactions) {
      for (const item of cfg.interactions) {
        // action type
        // ex. interactions: [{ type: 'element-active' }, { type: 'brush' }]
        customConfig.styleCommon.interactions.push(item.type);
      }
    }

    if (cfg.pattern?.type) {
      customConfig.styleCommon.pattern = cfg.pattern.type;
    }

    if (cfg.scrollbar?.type) {
      customConfig.styleCommon.scrollbar = cfg.scrollbar.type;
    }

    setStyleCommonFields(unref(customConfig.styleCommon));
  };

  // line style
  const parseLineStyle = async (cfg: any) => {
    // reset customConfig and form
    customConfig.styleLine = { ...unref(initStyleLine) };
    await resetStyleLineFields();
    if (!cfg) {
      return;
    }

    // get new values from config
    customConfig.styleLine.area = cfg.area;
    customConfig.styleLine.isStack = cfg.isStack;
    customConfig.styleLine.smooth = cfg.smooth;
    customConfig.styleLine.connectNulls = cfg.connectNulls;
    customConfig.styleLine.stepType = cfg.stepType;
    if (cfg.point) {
      customConfig.styleLine.pointShape = cfg.point.shape;
      customConfig.styleLine.pointSize = cfg.point.size;
      if (cfg.point.style?.fill) {
        if (cfg.point.style.fill.startsWith('#')) {
          customConfig.styleLine.pointColor = cfg.point.style.fill;
        } else {
          customConfig.styleLine.pointColor = htmlColors.hex(cfg.point.style.fill);
        }
      }
    }

    if (cfg.slider?.trendCfg) {
      if (cfg.slider.trendCfg.isArea) {
        customConfig.styleLine.sliderStyle = 'area';
      } else {
        customConfig.styleLine.sliderStyle = 'line';
      }
    }

    setStyleLineFields(unref(customConfig.styleLine));
  };

  // area style
  const parseAreaStyle = async (cfg: any) => {
    // reset customConfig and form
    customConfig.styleArea = { ...unref(initStyleArea) };
    await resetStyleAreaFields();
    if (!cfg) {
      return;
    }

    customConfig.styleArea.startOnZero = cfg.startOnZero;
    customConfig.styleArea.isStack = cfg.isStack;
    customConfig.styleArea.isPercent = cfg.isPercent;
    customConfig.styleArea.smooth = cfg.smooth;
    customConfig.styleArea.areaFillOpacity = cfg.areaStyle?.fillOpacity;
    if (cfg.areaStyle?.fill) {
      if (cfg.areaStyle.fill.startsWith('#')) {
        customConfig.styleArea.areaFillColor = cfg.areaStyle.fill;
      } else {
        customConfig.styleArea.areaFillColor = htmlColors.hex(cfg.areaStyle.fill);
      }
    }
    setStyleAreaFields(unref(customConfig.styleArea));
  };

  // column or bar style
  const parseColumnStyle = async (cfg: any) => {
    // reset customConfig and form
    customConfig.styleColumn = { ...unref(initStyleColumn) };
    await resetStyleColumnFields();
    if (!cfg) {
      return;
    }

    customConfig.styleColumn.isGroup = cfg.isGroup;
    customConfig.styleColumn.isStack = cfg.isStack;
    customConfig.styleColumn.isPercent = cfg.isPercent;
    customConfig.styleColumn.isRange = cfg.isRange;
    customConfig.styleColumn.conversionTag = cfg.conversionTag;

    if (cfg.label) {
      customConfig.styleColumn.labelPos = cfg.label.position;
      customConfig.styleColumn.labelSize = cfg.label.style?.fontSize;
      if (cfg.label.style?.fill) {
        if (cfg.label.style.fill.startsWith('#')) {
          customConfig.styleColumn.labelColor = cfg.label.style.fill;
        } else {
          customConfig.styleColumn.labelColor = htmlColors.hex(cfg.label.style.fill);
        }
      }
      if (cfg.label.layout) {
        for (let layout of cfg.label.layout) {
          if (layout.type == 'interval-adjust-position') {
            customConfig.styleColumn.labelPos = 'auto';
          }
        }
      }
    }
    setStyleColumnFields(unref(customConfig.styleColumn));
  };

  // pie/donut/gauge/radar style
  const parsePieStyle = async (cfg: any) => {
    // reset customConfig and form
    customConfig.stylePie = { ...unref(initStylePie) };
    await resetStylePieFields();
    if (!cfg) {
      return;
    }

    customConfig.stylePie.isPercent = cfg.isPercent;
    customConfig.stylePie.isMeter = cfg.isMeter;

    if (cfg.radius != undefined) {
      // default is 1 when it is undefined
      customConfig.stylePie.radius = cfg.radius;
    }
    customConfig.stylePie.innerRadius = cfg.innerRadius;

    if (cfg.startAngle != undefined) {
      // convert 0~2PI to 0~360 degrade
      customConfig.stylePie.startAngle = (180 * cfg.startAngle) / Math.PI;
    }
    if (cfg.endAngle != undefined) {
      // convert 0~2PI to 0~360 degrade
      customConfig.stylePie.endAngle = (180 * cfg.endAngle) / Math.PI;
    }

    if (cfg.label) {
      // default is outer when label is undefined
      customConfig.stylePie.labelType = cfg.label.type;
      if (cfg.label.content) {
        customConfig.stylePie.labelContent = cfg.label.content;
      }
    } else if (cfg.label == false) {
      // disable label
      customConfig.stylePie.labelType = undefined;
    }

    customConfig.stylePie.statTitle = cfg.statistic?.title;
    customConfig.stylePie.statContent = cfg.statistic?.content;
    setStylePieFields(unref(customConfig.stylePie));
  };

  // scatter style
  const parseScatterStyle = async (cfg: any) => {
    // reset customConfig and form
    customConfig.styleScatter = { ...unref(initStyleScatter) };
    await resetStyleScatterFields();
    if (!cfg) {
      return;
    }

    customConfig.styleScatter.regLineType = cfg.regressionLine?.type;
    setStyleScatterFields(unref(customConfig.styleScatter));
  };

  // X axis config
  const parseXAxis = async (xAxisCfg: any) => {
    // reset customConfig and form
    customConfig.xAxis = { ...unref(initXAxis) };
    await resetXAxisFields();
    const axis = customConfig.xAxis;

    if (xAxisCfg == undefined) {
      // default config
      return;
    } else if (xAxisCfg == false) {
      // disabled
      axis.position = undefined;
    } else {
      if (xAxisCfg.position) {
        axis.position = xAxisCfg.position;
      }

      axis.type = xAxisCfg.type;
      axis.titleText = xAxisCfg.title?.text;
      if (xAxisCfg.title?.text?.style?.fill) {
        if (xAxisCfg.title.text.style.fill.startsWith('#')) {
          axis.titleColor = xAxisCfg.title.text.style.fill;
        } else {
          axis.titleColor = htmlColors.hex(xAxisCfg.title.text.style.fill);
        }
      }
      axis.labelFormat = xAxisCfg.label?.content;
      axis.min = xAxisCfg.min;
      axis.max = xAxisCfg.max;
      axis.tickCount = xAxisCfg.tickCount;
      axis.tickInterval = xAxisCfg.tickInterval;

      if (xAxisCfg.grid) {
        axis.grid = true;
        if (xAxisCfg.grid.line?.style?.stroke) {
          if (xAxisCfg.grid.line.style.stroke.startsWith('#')) {
            axis.gridColor = xAxisCfg.grid.line.style.stroke;
          } else {
            axis.gridColor = htmlColors.hex(xAxisCfg.grid.line.style.stroke);
          }
        }
        if (xAxisCfg.grid.line?.style?.lineDash) {
          const lineDash = xAxisCfg.grid.line.style.lineDash;
          if (lineDash[0] != lineDash[1]) {
            axis.gridStyle = 'dashed';
          } else if (lineDash[0] == lineDash[1] && lineDash[0] == 0) {
            axis.gridStyle = 'solid';
          } else {
            axis.gridStyle = 'dotted';
          }
        }
      }
    }

    setXAxisFields(unref(customConfig.xAxis));
  };

  // Y axis config
  const parseYAxis = async (yAxisCfg: any) => {
    // reset customConfig and form
    customConfig.yAxis = { ...unref(initYAxis) };
    await resetYAxisFields();
    const axis = customConfig.yAxis;

    if (yAxisCfg == undefined) {
      // default config
      return;
    } else if (yAxisCfg == false) {
      // disabled
      axis.position = undefined;
    } else {
      if (yAxisCfg.position) {
        axis.position = yAxisCfg.position;
      }

      axis.type = yAxisCfg.type;
      axis.titleText = yAxisCfg.title?.text;
      if (yAxisCfg.title?.text?.style?.fill) {
        if (yAxisCfg.title.text.style.fill.startsWith('#')) {
          axis.titleColor = yAxisCfg.title.text.style.fill;
        } else {
          axis.titleColor = htmlColors.hex(yAxisCfg.title.text.style.fill);
        }
      }
      axis.labelFormat = yAxisCfg.label?.content;
      axis.min = yAxisCfg.min;
      axis.max = yAxisCfg.max;
      axis.tickCount = yAxisCfg.tickCount;
      axis.tickInterval = yAxisCfg.tickInterval;

      if (yAxisCfg.grid) {
        axis.grid = true;
        if (yAxisCfg.grid.line?.style?.stroke) {
          if (yAxisCfg.grid.line.style.stroke.startsWith('#')) {
            axis.gridColor = yAxisCfg.grid.line.style.stroke;
          } else {
            axis.gridColor = htmlColors.hex(yAxisCfg.grid.line.style.stroke);
          }
        }
        if (yAxisCfg.grid.line?.style?.lineDash) {
          const lineDash = yAxisCfg.grid.line.style.lineDash;
          if (lineDash[0] != lineDash[1]) {
            axis.gridStyle = 'dashed';
          } else if (lineDash[0] == lineDash[1] && lineDash[0] == 0) {
            axis.gridStyle = 'solid';
          } else {
            axis.gridStyle = 'dotted';
          }
        }
      }
    }

    setYAxisFields(unref(customConfig.yAxis));
  };

  // tooltip config
  const parseTooltip = async (tooltipCfg: any) => {
    // reset customConfig and form
    customConfig.tooltip = { ...unref(initTooltip) };
    await resetTooltipFields();

    if (tooltipCfg == undefined) {
      // default
      return;
    } else if (tooltipCfg == false) {
      // disabled
      customConfig.tooltip.enabled = false;
    } else {
      customConfig.tooltip.enterable = tooltipCfg.enterable;
      customConfig.tooltip.showNil = tooltipCfg.showNil;
      customConfig.tooltip.showMarkers = tooltipCfg.showMarkers != false; // default: true
      if (customConfig.tooltip.showMarkers && tooltipCfg.marker?.symbol) {
        customConfig.tooltip.markerSymbol = tooltipCfg.marker.symbol;
      }

      customConfig.tooltip.showTitle = tooltipCfg.showTitle != false; // default: true
      customConfig.tooltip.title = tooltipCfg.title; // custom title

      if (tooltipCfg.showCrosshairs == false) {
        // disabled
        customConfig.tooltip.hairType = 'none';
        customConfig.tooltip.hairStyle = undefined;
        customConfig.tooltip.hairColor = undefined;
      }

      if (tooltipCfg.crosshairs) {
        if (tooltipCfg.crosshairs.type) {
          customConfig.tooltip.hairType = tooltipCfg.crosshairs.type;
        }

        if (tooltipCfg.crosshairs.line?.style?.lineDash) {
          if (tooltipCfg.crosshairs.line.lineDash[0] != tooltipCfg.crosshairs.line.lineDash[1]) {
            customConfig.tooltip.hairStyle = 'dashed';
          } else if (
            tooltipCfg.crosshairs.line.lineDash[0] == tooltipCfg.crosshairs.line.lineDash[1] &&
            tooltipCfg.crosshairs.line.lineDash[0] == 0
          ) {
            customConfig.tooltip.hairStyle = 'solid';
          } else {
            customConfig.tooltip.hairStyle = 'dotted';
          }
        }

        if (tooltipCfg.crosshairs.line?.style?.stroke) {
          if (tooltipCfg.crosshairs.line.style.stroke.startsWith('#')) {
            customConfig.tooltip.hairColor = tooltipCfg.crosshairs.line.style.stroke;
          } else {
            customConfig.tooltip.hairColor = htmlColors.hex(
              tooltipCfg.crosshairs.line.style.stroke,
            );
          }
        }
      }
    }

    setTooltipFields(unref(customConfig.tooltip));
  };

  // legend config
  const parseLegend = async (legendCfg: any) => {
    // reset customConfig and form
    customConfig.legend = { ...unref(initLegend) };
    await resetLegendFields();

    if (legendCfg == undefined) {
      // default
      return;
    } else if (legendCfg == false) {
      //disabled
      customConfig.legend.enabled = false;
    } else {
      customConfig.legend.position = legendCfg.position;
      customConfig.legend.titleText = legendCfg.title?.text; // custom title text
      if (legendCfg.marker?.symbol) {
        customConfig.legend.markerSymbol = legendCfg.marker?.symbol;
      }

      // enhance it later ???
      customConfig.legend.labelFormat = legendCfg.itemValue?.formatter; // formatter is a function

      customConfig.legend.maxWidth = legendCfg.maxWidth;
      customConfig.legend.maxHeight = legendCfg.maxHeight;

      customConfig.legend.flipPage = legendCfg.flipPage;
      customConfig.legend.maxRow = legendCfg.maxRow;

      customConfig.legend.slidable = legendCfg.slidable;
      customConfig.legend.min = legendCfg.min;
      customConfig.legend.max = legendCfg.max;
    }

    setLegendFields(unref(customConfig.legend));
  };

  // axu config
  const parseAux = async (auxCfg: any) => {
    customConfig.aux = { ...cloneDeep(unref(initAux)) };
    await resetAuxFields();
    if (!auxCfg) {
      return;
    }

    for (let i in auxCfg) {
      let annotation = auxCfg[i];
      let item: any = { id: i }; // set index as default id
      if (annotation.id != undefined) {
        // get real id if defined
        item.id = annotation.id;
      }

      if (annotation.type == 'text') {
        item.labelText = annotation.content;
        item.labelPos = annotation.position;
        item.labelSize = annotation.style?.fontSize;
        if (annotation.style?.fill) {
          if (annotation.style.fill.startsWith('#')) {
            item.labelColor = annotation.style.fill;
          } else {
            item.labelColor = htmlColors.hex(annotation.style.fill);
          }
        }
        customConfig.aux.label.push(item);
      } else if (annotation.type == 'line') {
        // line with/without text
        if (annotation.start && annotation.end) {
          if (annotation.start.length > 1) {
            item.linePos = annotation.start[1];
          }
        }

        if (annotation.style?.lineDash) {
          const lineDash = annotation.style.lineDash;
          if (lineDash[0] != lineDash[1]) {
            item.lineStyle = 'dashed';
          } else if (lineDash[0] == lineDash[1] && lineDash[0] == 0) {
            item.lineStyle = 'solid';
          } else {
            item.lineStyle = 'dotted';
          }
        }

        if (annotation.style?.stroke) {
          if (annotation.style.stroke.startsWith('#')) {
            item.lineColor = annotation.style.stroke;
          } else {
            item.lineColor = htmlColors.hex(annotation.style.stroke);
          }
        }
        item.lineText = annotation.text?.content;
        if (annotation.text?.style?.textAlign) {
          item.lineTextPos = annotation.text.style.textAlign;
        } else if (annotation.text?.position) {
          item.lineTextPos = annotation.text?.position;
        }
        if (annotation.text?.style?.fill) {
          if (annotation.text.style.fill.startsWith('#')) {
            item.lineTextColor = annotation.text.style.fill;
          } else {
            item.lineTextColor = htmlColors.hex(annotation.text.style.fill);
          }
        }
        customConfig.aux.line.push(item);
      } else if (annotation.type == 'regionFilter') {
        if (annotation.start && annotation.end) {
          if (annotation.start.length > 0) {
            item.segStart = annotation.start[1];
          }
          if (annotation.end.length > 0) {
            item.segEnd = annotation.end[1];
          }
        }

        if (annotation.color) {
          if (annotation.color.startsWith('#')) {
            item.segColor = annotation.color;
          } else {
            item.segColor = htmlColors.hex(annotation.color);
          }
        }
        customConfig.aux.segment.push(item);
      } else if (annotation.type == 'region') {
        item.regionStart = annotation.start;
        item.regionEnd = annotation.end;
        if (annotation.style?.fill) {
          if (annotation.style.fill.startsWith('#')) {
            item.regionColor = annotation.style.fill;
          } else {
            item.regionColor = htmlColors.hex(annotation.style.fill);
          }
        }
        customConfig.aux.region.push(item);
      } else if (annotation.type == 'dataMarker') {
        item.pointText = annotation.text?.content;
        item.pointPos = annotation.position;
        if (annotation.point?.style?.fill) {
          if (annotation.point.style.fill.startsWith('#')) {
            item.pointColor = annotation.point.style.fill;
          } else {
            item.pointColor = htmlColors.hex(annotation.point.style.fill);
          }
        } else if (annotation.point?.style?.stroke) {
          if (annotation.point.style.stroke.startsWith('#')) {
            item.pointColor = annotation.point.style.stroke;
          } else {
            item.pointColor = htmlColors.hex(annotation.point.style.stroke);
          }
        }
        customConfig.aux.shape.push(item);
      }
    }

    if (customConfig.aux.label.length > 0) {
      setAuxFields(customConfig.aux.label[0]);
    }
    if (customConfig.aux.line.length > 0) {
      setAuxFields(customConfig.aux.line[0]);
    }
    if (customConfig.aux.segment.length > 0) {
      setAuxFields(customConfig.aux.segment[0]);
    }
    if (customConfig.aux.region.length > 0) {
      setAuxFields(customConfig.aux.region[0]);
    }
    if (customConfig.aux.point.length > 0) {
      setAuxFields(customConfig.aux.point[0]);
    }
  };

  /*
   * notify parent to update chart config
   */
  const updateConfig = (key: string | undefined, param: any) => {
    if (!key || !adapterActive) {
      return;
    }

    if (key == 'locale') {
      // only locale/chartType are under libCfg directly
      rawData.libCfg[key] = param[key];
    } else if (key == 'annotations') {
      if (rawData.libCfg.config[key]) {
        let idx = rawData.libCfg.config[key].findIndex((item) => item.id == param[key].id);
        if (idx >= 0) {
          // find annotation
          if (param.action == 'add') {
            // update existing annotation
            rawData.libCfg.config[key][idx] = { ...param[key] };
          } else {
            // delete existing annotation
            delete rawData.libCfg.config[key][idx];
          }
        } else {
          if (param.action == 'add') {
            //param[key].id = rawData.libCfg.config[key].length;
            rawData.libCfg.config[key].push(param[key]);
          }
        }
      } else {
        // annotation is undefined
        rawData.libCfg.config[key] = [];
        if (param.action == 'add') {
          rawData.libCfg.config[key].push(param[key]);
        }
      }
    } else if (param[key] == undefined && rawData.libCfg.config[key] != undefined) {
      // delete undefined parameter
      delete rawData.libCfg.config[key];
    } else if (rawData.libCfg.config[key] != param[key]) {
      // update config
      if (rawData.libCfg.config[key] == undefined) {
        rawData.libCfg.config[key] = param[key];
      } else if (param[key] instanceof Array) {
        // handle array
        rawData.libCfg.config[key] = param[key];
      } else if (
        param[key] instanceof Object &&
        Object.keys(rawData.libCfg.config[key]).length > 0
      ) {
        // handle object
        if (Object.keys(param[key]).length > 0) {
          const mergedObj = { ...rawData.libCfg.config[key], ...param[key] };
          rawData.libCfg.config[key] = mergedObj;
        } else {
          rawData.libCfg.config[key] = param[key];
        }
      } else {
        rawData.libCfg.config[key] = param[key];
      }
    }
    // notify parent with params
    emit('change', key, param);
  };

  /*
   * handle the change of common style
   */
  async function handleStyleCommonChange() {
    const values = await valStyleCommonFields();
    // compare with lineStyle to detect the changed object
    let pkey: string | undefined;
    let param: any = {};

    for (const key in values) {
      if (customConfig.styleCommon[key] != values[key]) {
        // find the changed parameter
        customConfig.styleCommon[key] = values[key];
        let occPtr: any = null;

        // animation change
        if (key == 'occasion' || key == 'effect' || key == 'duration') {
          pkey = 'animation';
          if (customConfig.styleCommon.occasion == 'appear') {
            param.animation = { appear: {} };
            occPtr = param.animation.appear;
          } else if (customConfig.styleCommon.occasion == 'enter') {
            param.animation = { enter: {} };
            occPtr = param.animation.enter;
          } else if (customConfig.styleCommon.occasion == 'update') {
            param.animation = { update: {} };
            occPtr = param.animation.update;
          } else {
            // occasion is empty
            if (customConfig.styleCommon.duration == 0) {
              // disable all animations when  duration is 0
              param.animation = false;
            } else {
              // default animation when duration is NOT 0
              param.animation = undefined;
            }
            break;
          }

          // occasion is not empty
          if (!customConfig.styleCommon.effect && customConfig.styleCommon.duration == undefined) {
            // default animation when both effect and duration are empty
            param.animation = undefined;
          }

          if (customConfig.styleCommon.effect) {
            // add animation
            occPtr.animation = customConfig.styleCommon.effect;
          }
          if (customConfig.styleCommon.duration != undefined) {
            // add duration
            occPtr.duration = customConfig.styleCommon.duration;
          }
        } else if (key == 'interactions') {
          pkey = 'interactions';
          param.interactions = []; // clean up first
          for (const action of customConfig.styleCommon.interactions) {
            param.interactions.push({ type: action });
          }
        } else if (key == 'scrollbar') {
          pkey = 'scrollbar';
          if (customConfig.styleCommon.scrollbar) {
            param = { scrollbar: { type: customConfig.styleCommon.scrollbar } };
          } else {
            param = { scrollbar: undefined };
          }
        } else if (key == 'pattern') {
          pkey = 'pattern';
          if (customConfig.styleCommon.pattern) {
            param = { pattern: { type: customConfig.styleCommon.pattern } };
          } else {
            param = { pattern: undefined };
          }
        } else {
          pkey = key;
          param[key] = values[key];
        }
        break;
      }
    }
    updateConfig(pkey, param);
  }

  /*
   * handle the change of line style
   */
  async function handleStyleLineChange() {
    const values = await valStyleLineFields();
    // compare with lineStyle to detect the changed object
    let pkey: string | undefined;
    let param: any = {};
    for (const key in values) {
      if (customConfig.styleLine[key] != values[key]) {
        customConfig.styleLine[key] = values[key];

        if (key == 'pointShape' || key == 'pointSize' || key == 'pointColor') {
          pkey = 'point';
          if (customConfig.styleLine.pointShape) {
            param.point = {
              shape: customConfig.styleLine.pointShape,
              size: customConfig.styleLine.pointSize,
              style: { fill: customConfig.styleLine.pointColor },
            };
            if (customConfig.styleLine.pointSize) {
              param.point.size = customConfig.styleLine.pointSize;
            }
            if (customConfig.styleLine.pointColor) {
              param.point.style = { fill: customConfig.styleLine.pointColor };
            }
          } else {
            // no point
            param.point = undefined;
          }
        } else if (key == 'sliderStyle') {
          pkey = 'slider';
          if (customConfig.styleLine[key] == 'area') {
            param.slider = { trendCfg: { isArea: true } };
          } else if (customConfig.styleLine[key] == 'line') {
            param.slider = { trendCfg: { isArea: false } };
          } else {
            // no slider
            param.slider = undefined;
          }
        } else {
          pkey = key;
          param[key] = values[key];
        }
        break;
      }
    }
    updateConfig(pkey, param);
  }

  /*
   * handle the change of area style
   */
  async function handleStyleAreaChange() {
    const values = await valStyleAreaFields();
    // compare with lineStyle to detect the changed object
    let pkey: string | undefined;
    let param: any = {};
    for (const key in values) {
      if (customConfig.styleArea[key] != values[key]) {
        customConfig.styleArea[key] = values[key];

        if (key == 'areaFillColor' || key == 'areaFillOpacity') {
          pkey = 'areaStyle';
          if (
            !customConfig.styleArea.areaFillColor &&
            customConfig.styleArea.areaFillOpacity == undefined
          ) {
            // default area
            param.areaStyle = undefined;
          } else if (
            customConfig.styleArea.areaFillColor &&
            customConfig.styleArea.areaFillOpacity != undefined
          ) {
            param.areaStyle = {
              fill: customConfig.styleArea.areaFillColor,
              fillOpacity: customConfig.styleArea.areaFillOpacity,
            };
          } else if (customConfig.styleArea.areaFillColor) {
            param.areaStyle = { fill: customConfig.styleArea.areaFillColor };
          } else {
            param.areaStyle = { fillOpacity: customConfig.styleArea.areaFillOpacity };
          }
        } else if (key == 'sliderStyle') {
          pkey = 'slider';
          if (customConfig.styleArea[key] == 'area') {
            param.slider = { trendCfg: { isArea: true } };
          } else if (customConfig.styleArea[key] == 'line') {
            param.slider = { trendCfg: { isArea: false } };
          } else {
            // no slider
            param.slider = undefined;
          }
        } else {
          pkey = key;
          param[key] = values[key];
        }
        break;
      }
    }
    updateConfig(pkey, param);
  }

  /*
   * handle the change of column style
   */
  async function handleStyleColumnChange() {
    const values = await valStyleColumnFields();
    // compare with lineStyle to detect the changed object
    let pkey: string | undefined;
    let param: any = {};
    for (const key in values) {
      if (customConfig.styleColumn[key] != values[key]) {
        customConfig.styleColumn[key] = values[key];

        if (key == 'labelPos' || key == 'labelSize' || key == 'labelColor') {
          pkey = 'label';
          if (customConfig.styleColumn.labelPos) {
            param.label = { position: customConfig.styleColumn.labelPos };
            if (customConfig.styleColumn.labelSize != undefined) {
              param.label.style = { fontSize: customConfig.styleColumn.labelSize };
            }
            if (customConfig.styleColumn.labelColor) {
              if (!param.label.style) {
                param.label.style = {};
              }
              param.label.style.fill = customConfig.styleColumn.labelColor;
            }
          } else {
            // no label
            param.label = undefined;
          }
        } else {
          pkey = key;
          param[key] = values[key];
        }
        break;
      }
    }
    updateConfig(pkey, param);
  }

  /*
   * handle the change of pie style
   */
  async function handleStylePieChange() {
    const values = await valStylePieFields();
    // compare with lineStyle to detect the changed object
    let pkey: string | undefined;
    let param: any = {};
    for (const key in values) {
      if (customConfig.stylePie[key] != values[key]) {
        customConfig.stylePie[key] = values[key];

        if (key == 'startAngle') {
          pkey = key;
          if (values[key] != undefined) {
            // convert 0~360 degrade to 0~2PI
            param.startAngle = Math.PI * (values[key] / 180);
          } else {
            param.startAngle = undefined;
          }
        } else if (key == 'endAngle') {
          pkey = key;
          if (values[key] != undefined) {
            // convert 0~360 degrade to 0~2PI
            param.endAngle = Math.PI * (values[key] / 180);
          } else {
            param.endAngle = undefined;
          }
        } else if (key == 'labelType' || key == 'labelContent') {
          pkey = 'label';
          if (!customConfig.stylePie.labelType && !customConfig.stylePie.labelContent) {
            param.label = undefined;
          } else if (customConfig.stylePie.labelType && customConfig.stylePie.labelContent) {
            param.label = {
              type: customConfig.stylePie.labelType,
              content: customConfig.stylePie.labelContent,
            };
          } else if (customConfig.stylePie.labelType) {
            param.label = { type: customConfig.stylePie.labelType };
          } else {
            param.label = { content: customConfig.stylePie.labelContent };
          }
        } else if (key == 'statTitle' || key == 'statContent') {
          pkey = 'statistic';
          if (!customConfig.stylePie.statTitle && !customConfig.stylePie.statContent) {
            param.statistic = undefined;
          } else if (customConfig.stylePie.statTitle && customConfig.stylePie.statContent) {
            param.statistic = {
              title: { content: customConfig.stylePie.statTitle },
              content: { content: customConfig.stylePie.statContent },
            };
          } else if (customConfig.stylePie.statTitle) {
            param.statistic = { title: { content: customConfig.stylePie.statTitle } };
          } else {
            param.statistic = { content: { content: customConfig.stylePie.statContent } };
          }
        } else {
          pkey = key;
          param[key] = values[key];
        }
        break;
      }
    }
    updateConfig(pkey, param);
  }

  /*
   * handle the change of scatter style
   */
  async function handleStyleScatterChange() {
    const values = await valStyleScatterFields();
    // compare with lineStyle to detect the changed object
    let pkey: string | undefined;
    let param: any = {};
    for (const key in values) {
      if (customConfig.styleScatter[key] != values[key]) {
        customConfig.styleScatter[key] = values[key];

        if (key == 'regLineType') {
          pkey = 'regressionLine';
          if (customConfig.styleScatter.regLineType) {
            param.regressionLine = { type: customConfig.styleScatter.regLineType };
          } else {
            param.regressionLine = undefined;
          }
        } else {
          pkey = key;
          param[key] = values[key];
        }
        break;
      }
    }
    updateConfig(pkey, param);
  }

  /*
   * handle the change of X axes
   */
  async function handleXAxisChange() {
    const values = await valXAxisFields();
    // compare with lineStyle to detect the changed object
    let pkey: string | undefined = 'xAxis';
    let param: any = { xAxis: {} };
    const axis = customConfig.xAxis;
    for (const key in values) {
      if (axis[key] != values[key]) {
        axis[key] = values[key];

        if (!axis.position) {
          // disable X axis when position is empty
          param.xAxis = false;
          break;
        } else {
          param.xAxis.position = axis.position;
        }

        if (axis.showTitle) {
          if (axis.titleText) {
            // custom title
            param.xAxis.title = { text: axis.titleText };
          } else {
            // default title
            param.xAxis.title = {};
          }
          if (axis.titleSize != undefined) {
            param.xAxis.title.style = { fontSize: axis.titleSize };
          }
          if (axis.titleColor) {
            if (param.xAxis.title.style) {
              param.xAxis.title.style.fill = axis.titleColor;
            } else {
              param.xAxis.title.style = { fill: axis.titleColor };
            }
          }
        }

        if (axis.labelFormat) {
          param.xAxis.label = { formatter: axis.labelFormat };
        }

        if (axis.gridStyle) {
          let lineDash: any[] = [0, 0];
          if (values[key] == 'dotted') {
            lineDash = [2, 5];
          } else if (axis.gridStyle == 'dashed') {
            lineDash = [8, 5];
          }
          param.xAxis.grid = { line: { style: { lineDash: lineDash } } };
          if (axis.gridColor) {
            param.xAxis.grid.line.style.stroke = axis.gridColor;
          }
        }

        if (axis.min) {
          param.xAxis.min = axis.min;
        }
        if (axis.max) {
          param.xAxis.max = axis.max;
        }
        break;
      }
    }

    if (param.xAxis && Object.keys(param.xAxis).length == 0) {
      pkey = undefined;
    }
    updateConfig(pkey, param);
  }

  /*
   * handle the change of Y axes
   */
  async function handleYAxisChange() {
    const values = await valYAxisFields();
    // compare with lineStyle to detect the changed object
    let pkey: string | undefined = 'yAxis';
    let param: any = { yAxis: {} };
    const axis = customConfig.yAxis;
    for (const key in values) {
      if (axis[key] != values[key]) {
        axis[key] = values[key];

        if (!axis.position) {
          // disable X axis
          param.yAxis = false;
          break;
        } else {
          param.yAxis.position = axis.position;
        }

        if (axis.showTitle) {
          if (axis.titleText) {
            // custom title
            param.yAxis.title = { text: axis.titleText };
          } else {
            // default title
            param.yAxis.title = {};
          }
          if (axis.titleSize != undefined) {
            param.yAxis.title.style = { fontSize: axis.titleSize };
          }
          if (axis.titleColor) {
            if (param.yAxis.title.style) {
              param.yAxis.title.style.fill = axis.titleColor;
            } else {
              param.yAxis.title.style = { fill: axis.titleColor };
            }
          }
        }

        if (axis.labelFormat) {
          param.yAxis.label = { formatter: axis.labelFormat };
        }

        if (axis.gridStyle) {
          let lineDash: any[] = [0, 0];
          if (values[key] == 'dotted') {
            lineDash = [2, 5];
          } else if (axis.gridStyle == 'dashed') {
            lineDash = [8, 5];
          }
          param.yAxis.grid = { line: { style: { lineDash: lineDash } } };
          if (axis.gridColor) {
            param.yAxis.grid.line.style.stroke = axis.gridColor;
          }
        }

        if (axis.min) {
          param.yAxis.min = axis.min;
        }
        if (axis.max) {
          param.yAxis.max = axis.max;
        }
        break;
      }
    }
    if (param.yAxis && Object.keys(param.yAxis).length == 0) {
      pkey = undefined;
    }
    updateConfig(pkey, param);
  }

  /*
   * handle the change of tooltip
   */
  async function handleTooltipChange() {
    const values = await valTooltipFields();
    // compare with lineStyle to detect the changed object
    let pkey: string | undefined = 'tooltip';
    let param: any = { tooltip: {} };
    for (const key in values) {
      if (customConfig.tooltip[key] != values[key]) {
        customConfig.tooltip[key] = values[key];

        if (!customConfig.tooltip.enabled) {
          // tooltip is disabled
          param.tooltip = false;
          break;
        }

        if (key == 'enabled') {
          // in order to trigger the change
          param.tooltip.showTitle = true;
        } else if (key == 'enterable') {
          param.tooltip.enterable = customConfig.tooltip.enterable;
        } else if (key == 'showNil') {
          param.tooltip.showNil = customConfig.tooltip.showNil;
        } else if (key == 'showTitle') {
          param.tooltip.showTitle = customConfig.tooltip.showTitle;
        } else if (key == 'showMarkers') {
          param.tooltip.showMarkers = customConfig.tooltip.showMarkers;
        } else if (key == 'markerSymbol') {
          if (customConfig.tooltip.showMarkers) {
            param.tooltip.marker = { symbol: customConfig.tooltip.markerSymbol };
          }
        } else if (key == 'valueFields') {
          param.tooltip.fields = customConfig.tooltip.valueFields;
        } else if (key == 'hairType' || key == 'hairStyle' || key == 'hairColor') {
          if (!customConfig.tooltip.hairType) {
            // disable cross hairs
            param.tooltip.crosshairs = { type: false, line: undefined };
          } else {
            param.tooltip.crosshairs = { type: customConfig.tooltip.hairType };
            if (customConfig.tooltip.hairStyle) {
              let lineDash: any[] = [0, 0];
              if (customConfig.tooltip.hairStyle == 'dotted') {
                lineDash = [2, 5];
              } else if (customConfig.tooltip.hairStyle == 'dashed') {
                lineDash = [8, 5];
              }
              param.tooltip.crosshairs.line = { style: { lineDash: lineDash } };
            }
            if (customConfig.tooltip.hairColor) {
              if (param.tooltip.crosshairs.line) {
                param.tooltip.crosshairs.line.style.stroke = customConfig.tooltip.hairColor;
              } else {
                param.tooltip.crosshairs.line = {
                  style: { stroke: customConfig.tooltip.hairColor },
                };
              }
            }
          }
        } else {
          param.tooltip[key] = values[key];
        }
        break;
      }
    }

    if (param.tooltip && Object.keys(param.tooltip).length == 0) {
      pkey = undefined;
    }
    updateConfig(pkey, param);
  }
  /*
   * handle the change of legend
   */
  async function handleLegendChange() {
    const values = await valLegendFields();
    // compare with lineStyle to detect the changed object
    let pkey: string | undefined = 'legend';
    let param: any = { legend: {} };

    for (const key in values) {
      if (customConfig.legend[key] != values[key]) {
        customConfig.legend[key] = values[key];

        if (!customConfig.legend.enabled) {
          // tooltip is disabled
          param.legend = false;
          break;
        }

        if (key == 'enabled') {
          param.legend.position = 'top';
        } else if (key == 'position') {
          if (values[key]) {
            param.legend.position = values[key];
          } else {
            // legend is disabled
            param.legend = false;
          }
        } else if (key == 'titleText') {
          param.legend.title = { text: customConfig.legend.titleText };
        } else if (key == 'markerSymbol') {
          param.legend.marker = { symbol: customConfig.legend.markerSymbol };
        } else if (key == 'valueFormat') {
          param.legend.itemValue = { formatter: customConfig.legend.valueFormat };
        } else if (key == 'flipPage') {
          param.legend.flipPage = values[key];
          if (customConfig.legend.flipPage && customConfig.legend.maxRow) {
            param.legend.maxRow = customConfig.legend.maxRow;
          }
        } else if (key == 'maxRow') {
          if (customConfig.legend.flipPage) {
            param.legend.maxRow = values[key];
          }
        } else {
          param.legend[key] = values[key];
        }
        break;
      }
    }

    if (param.legend && Object.keys(param.legend).length == 0) {
      // nothing need to be updated
      pkey = undefined;
    }
    updateConfig(pkey, param);
  }
  /*
   * handle the change of Aux
   */
  async function handleAuxChange() {
    const values = await valAuxFields();
    // compare with lineStyle to detect the changed object
    let pkey: string | undefined = 'annotations';
    let param: any = { action: 'add', annotations: {} };
    for (const key in values) {
      let customAux;
      const newId =
        customConfig.aux.label.length +
        customConfig.aux.line.length +
        customConfig.aux.segment.length +
        customConfig.aux.region.length +
        customConfig.aux.point.length;
      if (key.startsWith('label')) {
        if (customConfig.aux.label.length == 0) {
          customConfig.aux.label.push({ id: newId });
        }
        customAux = customConfig.aux.label[customConfig.aux.labelIdx];
      } else if (key.startsWith('line')) {
        if (customConfig.aux.line.length == 0) {
          customConfig.aux.line.push({ id: newId });
        }
        customAux = customConfig.aux.line[customConfig.aux.lineIdx];
      } else if (key.startsWith('seg')) {
        if (customConfig.aux.segment.length == 0) {
          customConfig.aux.segment.push({ id: newId });
        }
        customAux = customConfig.aux.segment[customConfig.aux.segmentIdx];
      } else if (key.startsWith('region')) {
        if (customConfig.aux.region.length == 0) {
          customConfig.aux.region.push({ id: newId });
        }
        customAux = customConfig.aux.region[customConfig.aux.regionIdx];
      } else if (key.startsWith('point')) {
        if (customConfig.aux.point.length == 0) {
          customConfig.aux.point.push({ id: newId });
        }
        customAux = customConfig.aux.point[customConfig.aux.pointIdx];
      }

      if (customAux[key] != values[key]) {
        // convert position string to json object or array
        // like [10%, 30%], [min, median] or {date:2012,value:10}
        if (key == 'labelPos' || key == 'regionStart' || key == 'regionEnd' || key == 'pointPos') {
          if (values[key] == '') {
            customAux[key] = undefined;
          } else if (values[key].startsWith('{') || values[key].indexOf(':') > 0) {
            // convert string to json object
            let objStr: string = values[key];
            // JSON.parse requires that every key has "
            //objStr = objStr.replaceAll("'", '"');
            //customAux[key] = JSON.parse(objStr);
            try {
              customAux[key] = eval('(' + objStr + ')');
            } catch (err) {
              // format error
              return;
            }
          } else {
            let posStr: string = values[key].trim();
            // remove '[' and ']'
            if (posStr.startsWith('[')) {
              posStr = posStr.substring(1, 100);
            }
            if (posStr.endsWith(']')) {
              posStr = posStr.substring(0, posStr.length - 2);
            }
            const posArray: string[] = posStr.split(',');
            if (posArray.length < 2) {
              // not complete
              return;
            } else {
              // get array
              customAux[key] = posArray;
            }
          }
        } else {
          // no need for format conversion
          customAux[key] = values[key];
        }

        if (key == 'labelText' || key == 'labelPos' || key == 'labelSize' || key == 'labelColor') {
          if (customAux.labelText && customAux.labelPos && customAux.labelSize != 0) {
            param.annotations = {
              id: customAux.id,
              type: 'text',
              content: customAux.labelText,
              position: customAux.labelPos,
            };
            if (customAux.labelSize > 0) {
              param.annotations.style = { fontSize: customAux.labelSize };
            }
            if (customAux.labelColor) {
              if (!param.annotations.style) {
                param.annotations.style = {};
              }
              param.annotations.style.fill = customAux.labelColor;
            }
          } else {
            // delete a annotation
            param.action = 'remove';
            param.annotations = { id: customAux.id };
          }
        } else if (
          key == 'linePos' ||
          key == 'lineStyle' ||
          key == 'lineColor' ||
          key == 'lineText' ||
          key == 'lineTextPos' ||
          key == 'lineTextSize' ||
          key == 'lineTextColor'
        ) {
          if (customAux.linePos) {
            param.annotations = {
              id: customAux.id,
              type: 'line',
              start: ['min', customAux.linePos],
              end: ['max', customAux.linePos],
            };
            if (customAux.lineStyle) {
              let lineDash: any[] = [0, 0];
              if (customAux.lineStyle == 'dotted') {
                lineDash = [2, 5];
              } else if (customAux.lineStyle == 'dashed') {
                lineDash = [8, 5];
              }
              param.annotations.style = { lineDash: lineDash };
            }

            if (customAux.lineColor) {
              if (!customAux.lineStyle) {
                // new style if style doesn't exist
                param.annotations.style = {};
              }
              param.annotations.style.stroke = customAux.lineColor;
            }
            if (customAux.lineText && customAux.lineTextSize != 0) {
              param.annotations.text = {
                content: customAux.lineText,
                position: 0, // this is confused
              };
              if (customAux.lineTextPos) {
                param.annotations.text.style = { textAlign: customAux.lineTextPos };
              }
              if (customAux.lineTextSize > 0) {
                if (!param.annotations.text.style) {
                  param.annotations.text.style = {};
                }
                param.annotations.text.style.fontSize = customAux.lineTextSize;
              }
              if (customAux.lineTextColor) {
                if (!param.annotations.text.style) {
                  param.annotations.text.style = {};
                }
                param.annotations.text.style.fill = customAux.lineTextColor;
              }
            }
          } else if (key == 'linePos') {
            // delete a annotation
            param.action = 'remove';
            param.annotations = { id: customAux.id };
          }
        } else if (key == 'segStart' || key == 'segEnd' || key == 'segColor') {
          if (customAux.segStart && customAux.segEnd && customAux.segColor) {
            param.annotations = {
              id: customAux.id,
              type: 'regionFilter',
              start: ['min', customAux.segStart],
              end: ['max', customAux.segEnd],
              color: customAux.segColor,
            };
          } else if ((!customAux.segStart && !customAux.segEnd) || !customAux.segColor) {
            // delete a annotation
            param.action = 'remove';
            param.annotations = { id: customAux.id };
          }
        } else if (key == 'regionStart' || key == 'regionEnd' || key == 'regionColor') {
          if (customAux.regionStart && customAux.regionEnd && customAux.regionColor) {
            param.annotations = {
              id: customAux.id,
              type: 'region',
              start: customAux.regionStart,
              end: customAux.regionEnd,
              style: { fill: customAux.regionColor },
            };
          } else if ((!customAux.regionStart && !customAux.regionEnd) || !customAux.regionColor) {
            // delete a annotation
            param.action = 'remove';
            param.annotations = { id: customAux.id };
          }
        } else if (key == 'pointText' || key == 'pointPos' || key == 'pointColor') {
          if (customAux.pointText && customAux.pointPos) {
            param.annotations = {
              id: customAux.id,
              type: 'dataMarker',
              position: customAux.pointPos,
              autoAdjust: true,
              text: { content: customAux.pointText, style: { textAlign: 'center' } },
            };
            if (customAux.pointColor) {
              param.annotations.point = {
                style: { fill: customAux.pointColor, stroke: customAux.pointColor },
              };
            }
          } else {
            // delete a annotation
            param.action = 'remove';
            param.annotations = { id: customAux.id };
          }
        }
        break;
      }
    }

    if (param.annotations && Object.keys(param.annotations).length == 0) {
      // nothing need to be updated
      pkey = undefined;
    }
    updateConfig(pkey, param);
  }

  // expose these methods to parent
  defineExpose({ setConfigData });
</script>
