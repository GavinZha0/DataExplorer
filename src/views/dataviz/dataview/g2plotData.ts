import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

// custom form - common style
export const formCustomCommonStyle: FormSchema[] = [
  {
    field: 'locale',
    component: 'Select',
    label: t('dataviz.dataview.form.custom.style.locale.title'),
    defaultValue: 'en-US',
    componentProps: {
      placeholder: 'Language',
      allowClear: false,
      options: [
        {
          label: t('dataviz.dataview.form.custom.style.locale.en'),
          value: 'en-US',
        },
        {
          label: t('dataviz.dataview.form.custom.style.locale.zh'),
          value: 'zh-CN',
        },
      ],
    },
  },
  {
    field: 'theme',
    label: t('dataviz.dataview.form.custom.style.theme.title'),
    component: 'Select',
    defaultValue: 'default',
    componentProps: {
      placeholder: 'Theme',
      allowClear: false,
      options: [
        {
          label: t('dataviz.dataview.form.custom.style.theme.light'),
          value: 'default',
        },
        {
          label: t('dataviz.dataview.form.custom.style.theme.dark'),
          value: 'dark',
        },
      ],
    },
  },
  {
    field: 'occasion',
    component: 'Select',
    label: t('dataviz.dataview.form.custom.style.animation.occasion'),
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Occasion',
      options: [
        {
          label: t('dataviz.dataview.form.custom.style.animation.appear'),
          value: 'appear',
        },
        {
          label: t('dataviz.dataview.form.custom.style.animation.enter'),
          value: 'enter',
        },
        {
          label: t('dataviz.dataview.form.custom.style.animation.update'),
          value: 'update',
        },
      ],
    },
  },
  {
    field: 'effect',
    component: 'Select',
    label: t('dataviz.dataview.form.custom.style.animation.title'),
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Effect',
      options: [
        {
          label: t('dataviz.dataview.form.custom.style.animation.fadeIn'),
          value: 'fade-in',
        },
        {
          label: t('dataviz.dataview.form.custom.style.animation.fadeOut'),
          value: 'fade-out',
        },
        {
          label: t('dataviz.dataview.form.custom.style.animation.growX'),
          value: 'grow-in-x',
        },
        {
          label: t('dataviz.dataview.form.custom.style.animation.growY'),
          value: 'grow-in-y',
        },
        {
          label: t('dataviz.dataview.form.custom.style.animation.growXY'),
          value: 'grow-in-xy',
          key: '4',
        },
        {
          label: t('dataviz.dataview.form.custom.style.animation.zoomIn'),
          value: 'zoom-in',
          key: '5',
        },
        {
          label: t('dataviz.dataview.form.custom.style.animation.zoomOut'),
          value: 'zoom-out',
        },
        {
          label: t('dataviz.dataview.form.custom.style.animation.pathIn'),
          value: 'path-in',
        },
      ],
    },
  },
  {
    field: 'duration',
    label: t('dataviz.dataview.form.custom.style.animation.duration'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      addonAfter: 'ms',
      placeholder: 'Duration',
      min: 0,
      max: 10000,
      step: 100,
    },
  },
  {
    field: 'interactions',
    component: 'Select',
    label: t('dataviz.dataview.form.custom.style.interact.title'),
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Interactions',
      mode: 'multiple',
      options: [
        {
          label: t('dataviz.dataview.form.custom.style.interact.elementActive'),
          value: 'element-active',
        },
        {
          label: t('dataviz.dataview.form.custom.style.interact.elementSelected'),
          value: 'element-selected',
        },
        {
          label: t('dataviz.dataview.form.custom.style.interact.elementSingleSelected'),
          value: 'element-single-selected',
        },
        {
          label: t('dataviz.dataview.form.custom.style.interact.elementHighlight'),
          value: 'element-highlight',
        },
        {
          label: t('dataviz.dataview.form.custom.style.interact.elementHighlightByColor'),
          value: 'element-highlight-by-color',
        },
        {
          label: t('dataviz.dataview.form.custom.style.interact.elementHighlightByX'),
          value: 'element-highlight-by-x',
        },
        {
          label: t('dataviz.dataview.form.custom.style.interact.legendHighlight'),
          value: 'legend-highlight',
        },
        {
          label: t('dataviz.dataview.form.custom.style.interact.axisLabelHighlight'),
          value: 'axis-label-highlight',
        },
        {
          label: t('dataviz.dataview.form.custom.style.interact.elementHighlightByColor'),
          value: 'element-link-by-color',
        },
        {
          label: t('dataviz.dataview.form.custom.style.interact.elementHighlightByX'),
          value: 'element-single-highlight',
        },
        {
          label: t('dataviz.dataview.form.custom.style.interact.legendHighlight'),
          value: 'element-filter',
        },
      ],
    },
  },
  {
    field: 'pattern',
    label: t('dataviz.dataview.form.custom.style.pattern.title'),
    component: 'Select',
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Pattern',
      options: [
        {
          label: t('dataviz.dataview.form.custom.style.pattern.dot'),
          value: 'dot',
        },
        {
          label: t('dataviz.dataview.form.custom.style.pattern.line'),
          value: 'line',
        },
        {
          label: t('dataviz.dataview.form.custom.style.pattern.square'),
          value: 'square',
        },
      ],
    },
  },
  {
    field: 'scrollbar',
    label: t('dataviz.dataview.form.custom.style.scrollbar.title'),
    component: 'Select',
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Scrollbar',
      options: [
        {
          label: t('dataviz.dataview.form.custom.style.scrollbar.horizontal'),
          value: 'horizontal',
        },
        {
          label: t('dataviz.dataview.form.custom.style.scrollbar.vertical'),
          value: 'vertical',
        },
      ],
    },
  },
];

// custom form - line style
export const formCustomLineStyle: FormSchema[] = [
  {
    field: 'area',
    label: t('dataviz.dataview.form.custom.style.graph.line.area'),
    component: 'Switch',
  },
  {
    field: 'isStack',
    label: t('dataviz.dataview.form.custom.style.graph.line.stack'),
    component: 'Switch',
  },
  {
    field: 'smooth',
    label: t('dataviz.dataview.form.custom.style.graph.line.smooth'),
    component: 'Switch',
  },
  {
    field: 'connectNulls',
    label: t('dataviz.dataview.form.custom.style.graph.line.connectNulls'),
    component: 'Switch',
  },
  {
    field: 'stepType',
    label: t('dataviz.dataview.form.custom.style.graph.line.step'),
    component: 'Select',
    componentProps: {
      placeholder: 'Type',
      options: [
        {
          label: t('dataviz.dataview.form.custom.style.graph.line.vh'),
          value: 'vh',
        },
        {
          label: t('dataviz.dataview.form.custom.style.graph.line.hv'),
          value: 'hv',
        },
        {
          label: t('dataviz.dataview.form.custom.style.graph.line.vhv'),
          value: 'vhv',
        },
        {
          label: t('dataviz.dataview.form.custom.style.graph.line.hvh'),
          value: 'hvh',
        },
      ],
    },
  },
  {
    field: 'pointShape',
    label: t('dataviz.dataview.form.custom.style.graph.line.point'),
    component: 'Select',
    componentProps: {
      placeholder: 'Shape',
      options: [
        {
          label: t('dataviz.dataview.form.custom.legend.marker.circle'),
          value: 'circle',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.marker.square'),
          value: 'square',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.marker.diamond'),
          value: 'diamond',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.marker.triangle'),
          value: 'triangle',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.marker.triangleDown'),
          value: 'triangleDown',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.marker.hexagon'),
          value: 'hexagon',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.marker.bowtie'),
          value: 'bowtie',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.marker.cross'),
          value: 'cross',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.marker.tick'),
          value: 'tick',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.marker.plus'),
          value: 'plus',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.marker.hyphen'),
          value: 'hyphen',
        },
      ],
    },
  },
  {
    field: 'pointSize',
    label: t('dataviz.dataview.form.custom.style.graph.line.pointSize'),
    component: 'Slider',
    colProps: { span: 21 },
    componentProps: {
      placeholder: 'Size',
      min: 0,
      max: 20,
      step: 0.5,
    },
  },
  {
    field: 'pointColor',
    label: '',
    component: 'Input',
    slot: 'pointColor',
    colProps: { span: 3 },
    defaultValue: undefined,
    componentProps: {
      placeholder: 'Color',
    },
  },
  {
    field: 'sliderStyle',
    label: t('dataviz.dataview.form.custom.style.graph.line.slider'),
    component: 'Select',
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Style',
      options: [
        {
          label: t('dataviz.dataview.form.custom.style.graph.line.line'),
          value: 'line',
        },
        {
          label: t('dataviz.dataview.form.custom.style.graph.line.area'),
          value: 'area',
        },
      ],
    },
  },
];

// custom form - area style
export const formCustomAreaStyle: FormSchema[] = [
  {
    field: 'startOnZero',
    label: t('dataviz.dataview.form.custom.style.graph.area.startOnZero'),
    component: 'Switch',
    colProps: { span: 12 },
    labelWidth: 80,
  },
  {
    field: 'isStack',
    label: t('dataviz.dataview.form.custom.style.graph.area.stack'),
    component: 'Switch',
    colProps: { span: 12 },
    labelWidth: 80,
  },
  {
    field: 'isPercent',
    label: t('dataviz.dataview.form.custom.style.graph.area.percent'),
    component: 'Switch',
    colProps: { span: 12 },
    labelWidth: 80,
  },
  {
    field: 'smooth',
    label: t('dataviz.dataview.form.custom.style.graph.area.smooth'),
    component: 'Switch',
    colProps: { span: 12 },
    labelWidth: 80,
  },
  {
    field: 'areaFillOpacity',
    label: t('dataviz.dataview.form.custom.style.graph.area.opacity'),
    component: 'Slider',
    colProps: { span: 20 },
    labelWidth: 80,
    componentProps: {
      placeholder: 'Opacity',
      min: 0,
      max: 1,
      step: 0.1,
    },
  },
  {
    field: 'areaFillColor',
    label: '',
    component: 'Input',
    slot: 'areaFillColor',
    colProps: { span: 2 },
    labelWidth: 80,
  },
  {
    field: 'sliderStyle',
    label: t('dataviz.dataview.form.custom.style.graph.area.slider'),
    component: 'Select',
    colProps: { span: 24 },
    labelWidth: 80,
    componentProps: {
      placeholder: 'Style',
      options: [
        {
          label: t('dataviz.dataview.form.custom.style.graph.area.line'),
          value: 'line',
        },
        {
          label: t('dataviz.dataview.form.custom.style.graph.area.area'),
          value: 'area',
        },
      ],
    },
  },
];

// custom form - column/bar style
export const formCustomColumnStyle: FormSchema[] = [
  {
    field: 'isGroup',
    label: t('dataviz.dataview.form.custom.style.graph.column.group'),
    component: 'Switch',
    colProps: { span: 12 },
    labelWidth: 80,
  },
  {
    field: 'isStack',
    label: t('dataviz.dataview.form.custom.style.graph.column.stack'),
    component: 'Switch',
    colProps: { span: 12 },
    labelWidth: 80,
  },
  {
    field: 'isPercent',
    label: t('dataviz.dataview.form.custom.style.graph.column.percent'),
    component: 'Switch',
    colProps: { span: 12 },
    labelWidth: 80,
  },
  {
    field: 'isRange',
    label: t('dataviz.dataview.form.custom.style.graph.column.range'),
    component: 'Switch',
    colProps: { span: 12 },
    labelWidth: 80,
  },
  {
    field: 'conversionTag',
    label: t('dataviz.dataview.form.custom.style.graph.column.conversionTag'),
    component: 'Switch',
    colProps: { span: 24 },
    labelWidth: 80,
  },
  {
    field: 'labelPos',
    label: t('dataviz.dataview.form.custom.style.graph.column.labelPos'),
    component: 'Select',
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Label Position',
      options: [
        {
          label: t('dataviz.dataview.form.custom.style.graph.column.auto'),
          value: 'auto',
        },
        {
          label: t('dataviz.dataview.form.custom.style.graph.column.top'),
          value: 'top',
        },
        {
          label: t('dataviz.dataview.form.custom.style.graph.column.middle'),
          value: 'middle',
        },
        {
          label: t('dataviz.dataview.form.custom.style.graph.column.bottom'),
          value: 'bottom',
        },
        {
          label: t('dataviz.dataview.form.custom.style.graph.column.left'),
          value: 'left',
        },
        {
          label: t('dataviz.dataview.form.custom.style.graph.column.right'),
          value: 'right',
        },
      ],
    },
  },
  {
    field: 'labelSize',
    label: t('dataviz.dataview.form.custom.style.graph.column.labelSize'),
    component: 'Slider',
    colProps: { span: 21 },
    componentProps: {
      placeholder: 'Label Size',
      min: 0,
      max: 30,
      step: 1,
    },
  },
  {
    field: 'labelColor',
    label: '',
    component: 'Input',
    slot: 'labelColor',
    colProps: { span: 2 },
  },
];

// custom form - pie/donut/gauge/radar style
export const formCustomPieStyle: FormSchema[] = [
  {
    field: 'radius',
    component: 'Slider',
    label: t('dataviz.dataview.form.custom.style.graph.pie.radius'),
    colProps: { span: 24 },
    labelWidth: 80,
    defaultValue: 1,
    componentProps: {
      placeholder: 'Radius',
      min: 0,
      max: 1,
      step: 0.1,
    },
  },
  {
    field: 'innerRadius',
    component: 'Slider',
    label: t('dataviz.dataview.form.custom.style.graph.pie.innerRadius'),
    colProps: { span: 24 },
    labelWidth: 80,
    defaultValue: 0,
    componentProps: {
      placeholder: 'Inner Radius',
      min: 0,
      max: 1,
      step: 0.1,
    },
  },
  {
    field: 'startAngle',
    component: 'InputNumber',
    label: t('dataviz.dataview.form.custom.style.graph.pie.startAngle'),
    colProps: { span: 24 },
    labelWidth: 80,
    componentProps: {
      placeholder: 'Start Angle',
      min: 0,
      max: 360,
      step: 1,
    },
  },
  {
    field: 'endAngle',
    component: 'InputNumber',
    label: t('dataviz.dataview.form.custom.style.graph.pie.endAngle'),
    colProps: { span: 24 },
    labelWidth: 80,
    componentProps: {
      placeholder: 'End Angle',
      min: 0,
      max: 360,
      step: 1,
    },
  },
  {
    field: 'isPercent',
    label: t('dataviz.dataview.form.custom.style.graph.pie.percent'),
    component: 'Switch',
    colProps: { span: 12 },
    labelWidth: 80,
  },
  {
    field: 'isMeter',
    label: t('dataviz.dataview.form.custom.style.graph.pie.meter'),
    component: 'Switch',
    colProps: { span: 12 },
    labelWidth: 80,
  },
  {
    field: 'labelType',
    label: t('dataviz.dataview.form.custom.style.graph.pie.labelType'),
    component: 'Select',
    colProps: { span: 24 },
    labelWidth: 80,
    defaultValue: 'outer',
    componentProps: {
      placeholder: 'Label Type',
      options: [
        {
          label: t('dataviz.dataview.form.custom.style.graph.pie.outer'),
          value: 'outer',
        },
        {
          label: t('dataviz.dataview.form.custom.style.graph.pie.inner'),
          value: 'inner',
        },
        {
          label: t('dataviz.dataview.form.custom.style.graph.pie.spider'),
          value: 'spider',
        },
      ],
    },
  },
  {
    field: 'labelContent',
    label: t('dataviz.dataview.form.custom.style.graph.pie.labelContent'),
    component: 'Input',
    colProps: { span: 24 },
    componentProps: {
      placeholder: '{name}:{value}({percentage})',
    },
  },
  {
    field: 'statTitle',
    component: 'Input',
    label: t('dataviz.dataview.form.custom.style.graph.pie.statTitle'),
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Statistic Title',
    },
  },
  {
    field: 'statContent',
    component: 'Input',
    label: t('dataviz.dataview.form.custom.style.graph.pie.statContent'),
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Statistic Content',
    },
  },
];

// custom form - scatter style
export const formCustomScatterStyle: FormSchema[] = [
  {
    field: 'regLineType',
    component: 'Select',
    label: t('dataviz.dataview.form.custom.style.graph.scatter.regression.title'),
    colProps: { span: 24 },
    labelWidth: 80,
    componentProps: {
      placeholder: 'Regression Type',
      options: [
        {
          label: t('dataviz.dataview.form.custom.style.graph.scatter.regression.quad'),
          value: 'quad',
        },
        {
          label: t('dataviz.dataview.form.custom.style.graph.scatter.regression.linear'),
          value: 'linear',
        },
        {
          label: t('dataviz.dataview.form.custom.style.graph.scatter.regression.exp'),
          value: 'exp',
        },
        {
          label: t('dataviz.dataview.form.custom.style.graph.scatter.regression.loess'),
          value: 'loess',
        },
        {
          label: t('dataviz.dataview.form.custom.style.graph.scatter.regression.log'),
          value: 'log',
        },
        {
          label: t('dataviz.dataview.form.custom.style.graph.scatter.regression.poly'),
          value: 'poly',
        },
        {
          label: t('dataviz.dataview.form.custom.style.graph.scatter.regression.pow'),
          value: 'pow',
        },
      ],
    },
  },
];

// custom form - X axes
export const formCustomXAxis: FormSchema[] = [
  {
    field: 'type',
    component: 'Select',
    label: t('dataviz.dataview.form.custom.xaxes.type'),
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Axis Type',
      options: [
        {
          label: t('dataviz.dataview.form.custom.xaxes.category'),
          value: 'category',
        },
        {
          label: t('dataviz.dataview.form.custom.xaxes.datetime'),
          value: 'datetime',
        },
      ],
    },
  },
  {
    field: 'position',
    component: 'Select',
    label: t('dataviz.dataview.form.custom.xaxes.pos'),
    colProps: { span: 24 },
    defaultValue: 'bottom',
    componentProps: {
      placeholder: 'Axis Position',
      options: [
        {
          label: t('dataviz.dataview.form.custom.xaxes.bottom'),
          value: 'bottom',
        },
        {
          label: t('dataviz.dataview.form.custom.xaxes.top'),
          value: 'top',
        },
      ],
    },
  },
  {
    field: 'showTitle',
    label: t('dataviz.dataview.form.custom.xaxes.showTitle'),
    component: 'Switch',
    colProps: { span: 8 },
  },
  {
    field: 'titleText',
    component: 'Input',
    label: '',
    colProps: { span: 7 },
    componentProps: {
      placeholder: 'Title Text',
    },
  },
  {
    field: 'titleSize',
    label: '',
    component: 'InputNumber',
    colProps: { span: 7 },
    componentProps: {
      placeholder: 'Title Size',
      min: 0,
      max: 30,
      step: 1,
    },
  },
  {
    field: 'titleColor',
    component: 'Input',
    label: '',
    slot: 'titleColor',
    colProps: { span: 2 },
    componentProps: {
      placeholder: 'Title Color',
    },
  },
  {
    field: 'labelFormat',
    component: 'Input',
    label: t('dataviz.dataview.form.custom.xaxes.labelFormat'),
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Label Format',
    },
  },
  {
    field: 'min',
    label: t('dataviz.dataview.form.custom.xaxes.minMax'),
    component: 'InputNumber',
    componentProps: {
      placeholder: 'Min Value',
    },
    colProps: { span: 14 },
  },
  {
    field: 'max',
    label: '',
    component: 'InputNumber',
    componentProps: {
      placeholder: 'Max Value',
    },
    colProps: { span: 10 },
  },
  {
    field: 'tickCount',
    label: t('dataviz.dataview.form.custom.xaxes.tick'),
    component: 'InputNumber',
    componentProps: {
      placeholder: 'Tick Count',
      min: 0,
      max: 100,
      step: 1,
    },
    colProps: { span: 14 },
  },
  {
    field: 'tickInterval',
    label: '',
    component: 'InputNumber',
    componentProps: {
      placeholder: 'Tick Interval',
      min: 0,
      max: 100,
      step: 1,
    },
    colProps: { span: 10 },
  },
  {
    field: 'gridStyle',
    label: t('dataviz.dataview.form.custom.xaxes.grid'),
    component: 'Select',
    colProps: { span: 22 },
    componentProps: {
      placeholder: 'Grid Style',
      options: [
        {
          label: t('dataviz.dataview.form.custom.xaxes.solid'),
          value: 'solid',
        },
        {
          label: t('dataviz.dataview.form.custom.xaxes.dotted'),
          value: 'dotted',
        },
        {
          label: t('dataviz.dataview.form.custom.xaxes.dashed'),
          value: 'dashed',
        },
      ],
    },
  },
  {
    field: 'gridColor',
    label: '',
    component: 'Input',
    slot: 'gridColor',
    colProps: { span: 2 },
  },
];

// custom form - Y axes
export const formCustomYAxis: FormSchema[] = [
  {
    field: 'type',
    component: 'Select',
    label: t('dataviz.dataview.form.custom.yaxes.type'),
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Axis Type',
      options: [
        {
          label: t('dataviz.dataview.form.custom.yaxes.category'),
          value: 'category',
        },
        {
          label: t('dataviz.dataview.form.custom.yaxes.datetime'),
          value: 'datetime',
        },
      ],
    },
  },
  {
    field: 'position',
    component: 'Select',
    label: t('dataviz.dataview.form.custom.yaxes.pos'),
    colProps: { span: 24 },
    defaultValue: 'left',
    componentProps: {
      placeholder: 'Axis Position',
      options: [
        {
          label: t('dataviz.dataview.form.custom.yaxes.left'),
          value: 'left',
        },
        {
          label: t('dataviz.dataview.form.custom.yaxes.right'),
          value: 'right',
        },
      ],
    },
  },
  {
    field: 'showTitle',
    label: t('dataviz.dataview.form.custom.yaxes.showTitle'),
    component: 'Switch',
    colProps: { span: 8 },
  },
  {
    field: 'titleText',
    component: 'Input',
    label: '',
    colProps: { span: 7 },
    componentProps: {
      placeholder: 'Title Text',
    },
  },
  {
    field: 'titleSize',
    label: '',
    component: 'InputNumber',
    colProps: { span: 7 },
    componentProps: {
      placeholder: 'Title Size',
      min: 0,
      max: 30,
      step: 1,
    },
  },
  {
    field: 'titleColor',
    component: 'Input',
    label: '',
    slot: 'titleColor',
    colProps: { span: 2 },
  },
  {
    field: 'labelFormat',
    component: 'Input',
    label: t('dataviz.dataview.form.custom.yaxes.labelFormat'),
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Label Format',
    },
  },
  {
    field: 'min',
    label: t('dataviz.dataview.form.custom.yaxes.minMax'),
    component: 'InputNumber',
    componentProps: {
      placeholder: 'Min Value',
    },
    colProps: { span: 14 },
  },
  {
    field: 'max',
    label: '',
    component: 'InputNumber',
    componentProps: {
      placeholder: 'Max Value',
    },
    colProps: { span: 10 },
  },
  {
    field: 'tickCount',
    label: t('dataviz.dataview.form.custom.yaxes.tick'),
    component: 'Input',
    componentProps: {
      placeholder: 'Tick Count',
      min: 0,
      max: 100,
      step: 1,
    },
    colProps: { span: 14 },
  },
  {
    field: 'tickInterval',
    label: '',
    component: 'Input',
    componentProps: {
      placeholder: 'Tick Interval',
      min: 0,
      max: 100,
      step: 1,
    },
    colProps: { span: 10 },
  },
  {
    field: 'gridStyle',
    label: t('dataviz.dataview.form.custom.yaxes.grid'),
    component: 'Select',
    colProps: { span: 22 },
    componentProps: {
      placeholder: 'Grid Style',
      options: [
        {
          label: t('dataviz.dataview.form.custom.yaxes.solid'),
          value: 'solid',
        },
        {
          label: t('dataviz.dataview.form.custom.yaxes.dotted'),
          value: 'dotted',
        },
        {
          label: t('dataviz.dataview.form.custom.yaxes.dashed'),
          value: 'dashed',
        },
      ],
    },
  },
  {
    field: 'gridColor',
    label: '',
    component: 'Input',
    slot: 'gridColor',
    colProps: { span: 2 },
  },
];

// custom form - tooltip
export const formCustomTooltip: FormSchema[] = [
  {
    field: 'enabled',
    label: t('dataviz.dataview.form.custom.tooltip.enabled'),
    component: 'Switch',
    defaultValue: true,
    colProps: { span: 8 },
    componentProps: ({ formModel, formActionType }) => {
      return {
        onChange: (e: any) => {
          formModel.showTitle = e;
          formModel.showMarkers = e;
        },
      };
    },
  },
  {
    field: 'showNil',
    label: t('dataviz.dataview.form.custom.tooltip.showNil'),
    component: 'Switch',
    colProps: { span: 8 },
  },
  {
    field: 'enterable',
    label: t('dataviz.dataview.form.custom.tooltip.enterable'),
    component: 'Switch',
    colProps: { span: 8 },
  },
  {
    field: 'showTitle',
    label: t('dataviz.dataview.form.custom.tooltip.showTitle'),
    component: 'Switch',
    defaultValue: true,
    colProps: { span: 8 },
  },
  {
    field: 'title',
    label: '',
    component: 'Input',
    componentProps: {
      placeholder: 'Custom Field or Text',
    },
    colProps: { span: 16 },
  },
  {
    field: 'showMarkers',
    label: t('dataviz.dataview.form.custom.tooltip.showMarkers'),
    component: 'Switch',
    defaultValue: true,
    colProps: { span: 8 },
  },
  {
    field: 'markerSymbol',
    label: '',
    component: 'Select',
    colProps: { span: 16 },
    componentProps: {
      placeholder: 'Marker Shape',
      options: [
        {
          label: t('dataviz.dataview.form.custom.tooltip.marker.default'),
          value: 'default',
        },
        {
          label: t('dataviz.dataview.form.custom.tooltip.marker.circle'),
          value: 'circle',
        },
        {
          label: t('dataviz.dataview.form.custom.tooltip.marker.square'),
          value: 'square',
        },
        {
          label: t('dataviz.dataview.form.custom.tooltip.marker.diamond'),
          value: 'diamond',
        },
        {
          label: t('dataviz.dataview.form.custom.tooltip.marker.triangle'),
          value: 'triangle',
        },
        {
          label: t('dataviz.dataview.form.custom.tooltip.marker.triangleDown'),
          value: 'triangleDown',
        },
        {
          label: t('dataviz.dataview.form.custom.tooltip.marker.hexagon'),
          value: 'hexagon',
        },
        {
          label: t('dataviz.dataview.form.custom.tooltip.marker.bowtie'),
          value: 'bowtie',
        },
        {
          label: t('dataviz.dataview.form.custom.tooltip.marker.cross'),
          value: 'cross',
        },
        {
          label: t('dataviz.dataview.form.custom.tooltip.marker.tick'),
          value: 'tick',
        },
        {
          label: t('dataviz.dataview.form.custom.tooltip.marker.plus'),
          value: 'plus',
        },
        {
          label: t('dataviz.dataview.form.custom.tooltip.marker.hyphen'),
          value: 'hyphen',
        },
      ],
    },
  },
  {
    field: 'valueFields',
    label: t('dataviz.dataview.form.custom.tooltip.fields'),
    component: 'Select',
    componentProps: {
      placeholder: 'Value Fields',
      mode: 'multiple',
    },
    colProps: { span: 24 },
  },
  {
    field: 'hairType',
    label: t('dataviz.dataview.form.custom.tooltip.hair'),
    component: 'Select',
    colProps: { span: 13 },
    componentProps: {
      placeholder: 'Crosshair Type',
      options: [
        {
          label: t('dataviz.dataview.form.custom.tooltip.x'),
          value: 'x',
        },
        {
          label: t('dataviz.dataview.form.custom.tooltip.y'),
          value: 'y',
        },
        {
          label: t('dataviz.dataview.form.custom.tooltip.xy'),
          value: 'xy',
        },
      ],
    },
  },
  {
    field: 'hairStyle',
    label: '',
    component: 'Select',
    colProps: { span: 9 },
    componentProps: {
      placeholder: 'Style',
      options: [
        {
          label: t('dataviz.dataview.form.custom.tooltip.solid'),
          value: 'solid',
        },
        {
          label: t('dataviz.dataview.form.custom.tooltip.dotted'),
          value: 'dotted',
        },
        {
          label: t('dataviz.dataview.form.custom.tooltip.dashed'),
          value: 'dashed',
        },
      ],
    },
  },
  {
    field: 'hairColor',
    label: '',
    component: 'Input',
    slot: 'hairColor',
    colProps: { span: 2 },
  },
];

// custom form - legend
export const formCustomLegend: FormSchema[] = [
  {
    field: 'enabled',
    label: t('dataviz.dataview.form.custom.legend.enabled'),
    component: 'Switch',
    defaultValue: true,
    colProps: { span: 8 },
    componentProps: ({ formModel, formActionType }) => {
      return {
        onChange: (e: any) => {
          if (!e) {
            formModel.position = undefined;
          } else {
            formModel.position = 'top';
          }
        },
      };
    },
  },
  {
    field: 'position',
    component: 'Select',
    label: '',
    colProps: { span: 16 },
    componentProps: {
      placeholder: 'Legend Position',
      options: [
        {
          label: t('dataviz.dataview.form.custom.legend.pos.topLeft'),
          value: 'top-left',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.pos.top'),
          value: 'top',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.pos.topRight'),
          value: 'top-right',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.pos.bottomLeft'),
          value: 'bottom-left',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.pos.bottom'),
          value: 'bottom',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.pos.bottomRight'),
          value: 'bottom-right',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.pos.leftTop'),
          value: 'left-top',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.pos.left'),
          value: 'left',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.pos.leftBottom'),
          value: 'left-bottom',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.pos.rightTop'),
          value: 'right-top',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.pos.right'),
          value: 'right',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.pos.rightBottom'),
          value: 'right-bottom',
        },
      ],
    },
  },
  {
    field: 'titleText',
    component: 'Input',
    label: t('dataviz.dataview.form.custom.legend.legendTitle'),
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Custom Title Text',
    },
  },
  {
    field: 'markerSymbol',
    component: 'Select',
    label: t('dataviz.dataview.form.custom.legend.marker.title'),
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Marker Shape',
      options: [
        {
          label: t('dataviz.dataview.form.custom.legend.marker.circle'),
          value: 'circle',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.marker.square'),
          value: 'square',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.marker.diamond'),
          value: 'diamond',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.marker.triangle'),
          value: 'triangle',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.marker.triangleDown'),
          value: 'triangleDown',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.marker.hexagon'),
          value: 'hexagon',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.marker.bowtie'),
          value: 'bowtie',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.marker.cross'),
          value: 'cross',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.marker.tick'),
          value: 'tick',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.marker.plus'),
          value: 'plus',
        },
        {
          label: t('dataviz.dataview.form.custom.legend.marker.hyphen'),
          value: 'hyphen',
        },
      ],
    },
  },
  {
    field: 'valueFormat',
    component: 'Input',
    label: t('dataviz.dataview.form.custom.legend.valueFormat'),
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Value Format',
    },
  },
  {
    field: 'maxWidth',
    label: t('dataviz.dataview.form.custom.legend.maxWidth'),
    component: 'InputNumber',
    componentProps: {
      placeholder: 'Max Width',
    },
    colProps: { span: 14 },
  },
  {
    field: 'maxHeight',
    label: '',
    component: 'InputNumber',
    componentProps: {
      placeholder: 'Max Height',
    },
    colProps: { span: 10 },
  },
  {
    field: 'flipPage',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.legend.flipPage'),
    colProps: { span: 8 },
  },
  {
    field: 'maxRow',
    label: '',
    component: 'InputNumber',
    componentProps: {
      placeholder: 'Max Rows',
      min: 1,
      max: 10,
    },
    colProps: { span: 16 },
  },
  {
    field: 'slidable',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.legend.slidable'),
    colProps: { span: 8 },
  },
  {
    field: 'min',
    label: '',
    component: 'InputNumber',
    componentProps: {
      placeholder: 'Min Value',
    },
    colProps: { span: 8 },
  },
  {
    field: 'max',
    label: '',
    component: 'InputNumber',
    componentProps: {
      placeholder: 'Max Value',
    },
    colProps: { span: 8 },
  },
];

// custom form - aux
export const formCustomAux: FormSchema[] = [
  {
    field: 'divider-label',
    component: 'Divider',
    label: t('dataviz.dataview.form.custom.aux.label'),
    componentProps: {
      style: {
        fontWeight: 'bold',
        borderColor: '#7cb305',
      },
    },
  },
  {
    field: 'labelText',
    component: 'Input',
    label: '',
    colProps: { span: 16 },
    componentProps: {
      placeholder: t('dataviz.dataview.form.custom.aux.labelText'),
    },
  },
  {
    field: 'labelSize',
    component: 'InputNumber',
    label: '',
    colProps: { span: 6 },
    componentProps: {
      min: 0,
      max: 100,
      placeholder: t('dataviz.dataview.form.custom.aux.labelSize'),
    },
  },
  {
    field: 'labelColor',
    component: 'Input',
    label: '',
    colProps: { span: 2 },
    slot: 'labelColor',
  },
  {
    field: 'labelPos',
    component: 'Input',
    label: '',
    colProps: { span: 24 },
  },
  {
    field: 'divider-line',
    component: 'Divider',
    label: t('dataviz.dataview.form.custom.aux.line'),
    componentProps: {
      style: {
        fontWeight: 'bold',
        borderColor: '#7cb305',
      },
    },
  },
  {
    field: 'linePos',
    component: 'Input',
    label: '',
    colProps: { span: 10 },
    componentProps: {
      placeholder: t('dataviz.dataview.form.custom.aux.linePos'),
    },
  },
  {
    field: 'lineStyle',
    component: 'Select',
    label: '',
    colProps: { span: 12 },
    componentProps: {
      placeholder: t('dataviz.dataview.form.custom.aux.lineStyle'),
      options: [
        {
          label: t('dataviz.dataview.form.custom.aux.lineSolid'),
          value: 'solid',
        },
        {
          label: t('dataviz.dataview.form.custom.aux.lineDotted'),
          value: 'dotted',
        },
        {
          label: t('dataviz.dataview.form.custom.aux.lineDashed'),
          value: 'dashed',
        },
      ],
    },
  },
  {
    field: 'lineColor',
    component: 'Input',
    label: '',
    colProps: { span: 2 },
    slot: 'lineColor',
  },
  {
    field: 'lineText',
    component: 'Input',
    label: '',
    colProps: { span: 10 },
    componentProps: {
      placeholder: t('dataviz.dataview.form.custom.aux.lineText'),
    },
  },
  {
    field: 'lineTextPos',
    component: 'Select',
    label: '',
    colProps: { span: 6 },
    componentProps: {
      placeholder: t('dataviz.dataview.form.custom.aux.lineTextPos'),
      options: [
        {
          label: t('dataviz.dataview.form.custom.aux.pos.left'),
          value: 'left',
        },
        {
          label: t('dataviz.dataview.form.custom.aux.pos.right'),
          value: 'right',
        },
      ],
    },
  },
  {
    field: 'lineTextSize',
    component: 'InputNumber',
    label: '',
    colProps: { span: 6 },
    componentProps: {
      min: 0,
      max: 100,
      placeholder: t('dataviz.dataview.form.custom.aux.lineTextSize'),
    },
  },
  {
    field: 'lineTextColor',
    component: 'Input',
    label: '',
    colProps: { span: 2 },
    slot: 'lineTextColor',
  },
  {
    field: 'divider-segment',
    component: 'Divider',
    label: t('dataviz.dataview.form.custom.aux.segment'),
    componentProps: {
      style: {
        fontWeight: 'bold',
        borderColor: '#7cb305',
      },
    },
  },
  {
    field: 'segStart',
    component: 'Input',
    label: '',
    colProps: { span: 10 },
    componentProps: {
      placeholder: t('dataviz.dataview.form.custom.aux.segStart'),
    },
  },
  {
    field: 'segEnd',
    component: 'Input',
    label: '',
    colProps: { span: 12 },
    componentProps: {
      placeholder: t('dataviz.dataview.form.custom.aux.segEnd'),
    },
  },
  {
    field: 'segColor',
    component: 'Input',
    label: '',
    colProps: { span: 2 },
    slot: 'segColor',
  },
  {
    field: 'divider-region',
    component: 'Divider',
    label: t('dataviz.dataview.form.custom.aux.region'),
    componentProps: {
      style: {
        fontWeight: 'bold',
        borderColor: '#7cb305',
      },
    },
  },
  {
    field: 'regionStart',
    component: 'Input',
    label: '',
    colProps: { span: 10 },
    componentProps: {
      placeholder: t('dataviz.dataview.form.custom.aux.regionStart'),
    },
  },
  {
    field: 'regionEnd',
    component: 'Input',
    label: '',
    colProps: { span: 12 },
    componentProps: {
      placeholder: t('dataviz.dataview.form.custom.aux.regionEnd'),
    },
  },
  {
    field: 'regionColor',
    component: 'Input',
    label: '',
    slot: 'regionColor',
    colProps: { span: 2 },
  },
  {
    field: 'divider-point',
    component: 'Divider',
    label: t('dataviz.dataview.form.custom.aux.point'),
    componentProps: {
      style: {
        fontWeight: 'bold',
        borderColor: '#7cb305',
      },
    },
  },
  {
    field: 'pointText',
    component: 'Input',
    label: '',
    colProps: { span: 10 },
    componentProps: {
      placeholder: t('dataviz.dataview.form.custom.aux.pointText'),
    },
  },
  {
    field: 'pointPos',
    component: 'Input',
    label: '',
    colProps: { span: 12 },
    componentProps: {
      placeholder: t('dataviz.dataview.form.custom.aux.pointPos'),
    },
  },
  {
    field: 'pointColor',
    component: 'Input',
    label: '',
    slot: 'pointColor',
    colProps: { span: 2 },
  },
];

export const initStyleCommon = {
  locale: 'en-US',
  theme: 'default',
  occasion: undefined,
  effect: undefined,
  duration: undefined,
  interactions: undefined,
};

export const initStyleLine = {
  area: undefined,
  isStack: undefined,
  smooth: undefined,
  connectNulls: undefined,
  stepType: undefined,
  pointShape: undefined,
  pointSize: undefined,
  pointColor: undefined,
  sliderStyle: undefined,
};

export const initStyleArea = {
  startOnZero: undefined,
  isStack: undefined,
  isPercent: undefined,
  smooth: undefined,
  areaFillOpacity: undefined,
  areaFillColor: undefined,
  sliderStyle: undefined,
};

export const initStyleColumn = {
  isGroup: undefined,
  isStack: undefined,
  isPercent: undefined,
  isRange: undefined,
  conversionTag: undefined,
  labelPos: undefined,
  labelSize: undefined,
  labelColor: undefined,
};

export const initStylePie = {
  isPercent: undefined,
  isMeter: undefined,
  radius: 1,
  innerRadius: undefined,
  startAngle: undefined,
  endAngle: undefined,
  labelType: 'outer',
  labelContent: undefined,
  statTitle: undefined,
  statContent: undefined,
};

export const initStyleScatter = {
  regLineType: undefined,
};

export const initXAxis = {
  type: undefined,
  position: 'bottom',
  showTitle: undefined,
  titleText: undefined,
  titleSize: undefined,
  titleColor: undefined,
  labelFormat: undefined,
  min: undefined,
  max: undefined,
  gridStyle: undefined,
  gridColor: undefined,
  scrollbar: undefined,
};

export const initYAxis = {
  type: undefined,
  position: 'left',
  showTitle: undefined,
  titleText: undefined,
  titleSize: undefined,
  titleColor: undefined,
  labelFormat: undefined,
  min: undefined,
  max: undefined,
  tickCount: undefined,
  tickInterval: undefined,
  gridStyle: undefined,
  gridColor: undefined,
  scrollbar: undefined,
};

export const initTooltip = {
  enabled: true,
  enterable: undefined,
  showNil: undefined,
  showMarkers: true,
  markerSymbol: undefined,
  showTitle: true,
  title: undefined,
  valueFields: undefined,
  hairType: undefined,
  hairStyle: undefined,
  hairColor: undefined,
};

export const initLegend = {
  enabled: true,
  position: undefined,
  titleText: undefined,
  markerSymbol: undefined,
  labelFormat: undefined,
  maxWidth: undefined,
  maxHeight: undefined,
  flipPage: undefined,
  maxRow: undefined,
  slidable: undefined,
  min: undefined,
  max: undefined,
};

export const initAux = {
  label: [],
  line: [],
  segment: [],
  region: [],
  point: [],
  labelIdx: 0,
  lineIdx: 0,
  segmentIdx: 0,
  regionIdx: 0,
  pointIdx: 0,
};
