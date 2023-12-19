import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description/index';
import { useI18n } from '/@/hooks/web/useI18n';
import * as echarts from 'echarts';

const { t } = useI18n();

// index form columns
export const indexColumns: BasicColumn[] = [
  {
    title: t('common.table.title.name'),
    dataIndex: 'name',
    width: 180,
    align: 'left',
    sorter: true,
    resizable: true,
  },
  {
    title: t('common.table.title.desc'),
    dataIndex: 'desc',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: t('common.table.title.group'),
    dataIndex: 'group',
    width: 100,
    align: 'left',
    sorter: true,
    resizable: true,
  },
  {
    title: t('common.table.title.type'),
    dataIndex: 'type',
    width: 100,
    align: 'left',
    sorter: true,
    resizable: true,
  },
  {
    title: t('ml.feature.table.title.feature'),
    dataIndex: 'features',
    align: 'left',
    width: 80,
    resizable: true,
  },
  {
    title: t('ml.feature.table.title.target'),
    dataIndex: 'target',
    align: 'left',
    resizable: true,
  },
  {
    title: t('ml.feature.table.title.source'),
    dataIndex: 'sourceName',
    align: 'left',
    resizable: true,
  },
  {
    title: t('ml.feature.table.title.dataset'),
    dataIndex: 'datasetName',
    align: 'left',
    resizable: true,
  },
  {
    title: t('common.table.title.public'),
    dataIndex: 'pubFlag',
    width: 80,
    filters: [
      { text: 'true', value: 'true' },
      { text: 'false', value: 'false' },
    ],
  },
];

// stat form columns
export const statColumns: BasicColumn[] = [
  {
    title: t('common.table.title.name'),
    dataIndex: 'name',
    key: 'name',
    resizable: true,
    align: 'left',
  },
  {
    title: t('ml.feature.tab.statistics.dataType'),
    dataIndex: 'type',
    width: 100,
    align: 'left',
  },
  {
    title: t('ml.feature.tab.statistics.count'),
    dataIndex: 'count',
    width: 80,
    align: 'left',
  },
  {
    title: t('ml.feature.tab.statistics.distinct'),
    dataIndex: 'distinct',
    width: 80,
    align: 'left',
  },
  {
    title: t('ml.feature.tab.statistics.missing'),
    dataIndex: 'missing',
    width: 90,
    sorter: true,
    align: 'left',
    customRender111111:({ record }) => {
      if(record && record.missing>0){
        return {style: {backgroundColor: 'yellow'}};
      }      
    },
  },
  {
    title: t('ml.feature.tab.statistics.zeros'),
    dataIndex: 'zeros',
    width: 80,
    sorter: true,
    align: 'left',
  },
  {
    title: t('ml.feature.tab.statistics.min'),
    dataIndex: 'min',
    width: 90,
    sorter: true,
    align: 'left',
  },
  {
    title: t('ml.feature.tab.statistics.pct25'),
    dataIndex: 'pct25',
    width: 90,
    sorter: true,
    align: 'left',
  },
  {
    title: t('ml.feature.tab.statistics.median'),
    dataIndex: 'median',
    width: 90,
    sorter: true,
    align: 'left',
  },
  {
    title: t('ml.feature.tab.statistics.mean'),
    dataIndex: 'mean',
    width: 90,
    sorter: true,
    align: 'left',
  },
  {
    title: t('ml.feature.tab.statistics.pct75'),
    dataIndex: 'pct75',
    width: 90,
    sorter: true,
    align: 'left',
  },
  {
    title: t('ml.feature.tab.statistics.max'),
    dataIndex: 'max',
    width: 90,
    sorter: true,
    align: 'left',
  },
  {
    title: t('ml.feature.tab.statistics.std'),
    dataIndex: 'stdDev',
    width: 90,
    sorter: true,
    align: 'left',
  },
  {
    title: t('ml.feature.tab.statistics.variance'),
    dataIndex: 'variance',
    width: 90,
    sorter: true,
    align: 'left',
    customCell:({ record }) => {
      if(record && record.variance==0){
        return {style: {backgroundColor: 'yellow'}};
      }      
    },
  },
];

// Table fields
export const fieldColumns: BasicColumn[] = [
  {
    title: t('common.table.title.type'),
    dataIndex: 'type',
    width: 50,
    resizable: true,
  },
  {
    title: t('dataviz.dataset.table.title.field'),
    dataIndex: 'name',
    width: 120,
    align: 'left',
    resizable: true,
  },
  {
    title: t('ml.feature.table.field.distribution'),
    dataIndex: 'size',
    width: 100,
    align: 'left',
    resizable: true,
  },
];

// info form schema include all fields but some are hidden
export const formInfoSchema: FormSchema[] = [
  {
    field: 'id',
    label: t('common.table.title.id'),
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: t('common.table.title.name'),
    required: true,
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'desc',
    label: t('common.table.title.desc'),
    component: 'InputTextArea',
    labelWidth: 80,
    colProps: { span: 24 },
    componentProps: {
      maxlength: 128,
      autoSize: { minRows: 1, maxRows: 4 },
    },
  },
  {
    field: 'group',
    label: t('common.table.title.group'),
    component: 'Input',
    slot: 'group',
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'type',
    label: t('common.table.title.type'),
    component: 'Select',
    componentProps: {
      options: [
        { label: 'classification', value: 'Classification' },
        { label: 'regression', value: 'Regression' },
        { label: 'clustering', value: 'Clustering' },
        { label: 'reduction', value: 'Reduction' },
      ],
    },
    colProps: { span: 24 },
  },
  {
    field: 'createdBy',
    label: t('common.table.title.created_by'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'createdAt',
    label: t('common.table.title.create_time'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'updatedBy',
    label: t('common.table.title.updated_by'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'updatedAt',
    label: t('common.table.title.update_time'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 80,
    colProps: { span: 24 },
  },
];

// source form schema
export const formConfigSchema: FormSchema[] = [
  {
    field: 'variable',
    component: 'ApiTree',
    label: '',
    slot: 'sourceSelectTree',
  },
  {
    field: 'hidden',
    component: 'Input',
    label: '',
    slot: 'fieldTree',
  },
  {
    field: 'sorter',
    component: 'Input',
    label: '',
    slot: 'fieldTree',
  },
];

export const statSchemas: DescItem[] = [
  {
    field: 'max',
    label: t('ml.feature.tab.stat.max'),
  },
  {
    field: 'pct75',
    label: t('ml.feature.tab.stat.pct75'),
  },
  {
    field: 'mean',
    label: t('ml.feature.tab.stat.mean'),
  },
  {
    field: 'median',
    label: t('ml.feature.tab.stat.median'),
  },
  {
    field: 'pct25',
    label: t('ml.feature.tab.stat.pct25'),
  },
  {
    field: 'min',
    label: t('ml.feature.tab.stat.min'),
  },
  {
    field: 'std',
    label: t('ml.feature.tab.stat.std'),
  },
  {
    field: 'variance',
    label: t('ml.feature.tab.stat.variance'),
  },
];

export const filterModalSchemas: FormSchema[] = [
  {
    field: 'key',
    component: 'Input',
    required: true,
    label: '',
    colProps: { span: 24 },
    show: false,
  },
  {
    field: 'operator',
    label: t('dataviz.dataset.form.filter.operator'),
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: '>', value: '>' },
        { label: '>=', value: '>=' },
        { label: '<', value: '<' },
        { label: '<=', value: '<=' },
        { label: '=', value: '=' },
        { label: '!=', value: '!=' },
        { label: 'in', value: 'in' },
        { label: 'like', value: 'like' },
      ],
    },
    colProps: { span: 24 },
  },
  {
    field: 'value',
    component: 'Input',
    required: true,
    label: t('dataviz.dataset.form.filter.value'),
    colProps: { span: 24 },
  },
];

// single kde for continuous fields
export const sKdePlotCfg = {
  xAxis: {
    type: 'value',
    scale: true,
  },
  yAxis: {
    type: 'value',
  },
  dataset:{
    source: []
  },
  grid: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 5,
    containLabel: true
  },
  series: [
    {
      type: 'line',
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 1
      },
      areaStyle: {},  
    }
  ],
  animation: false
};

// classified kdes (single continuous field is categoried by target)
export const cKdePlotCfg = {
  xAxis: {
    type: 'value',
    scale: true
  },
  yAxis: {
    type: 'value'
  },
  grid: {
    left: 10,
    right: 10,
    top: 30,
    bottom: 5,
    containLabel: true
  },
  dataset:[{
    source: []
  }],
  series: [],
  legend: {},
  animation: false
};

export const cKdeTransTpl = {
  transform: [
    {
      type: 'filter',
      config: { dimension: 2, value: '' }
    },
    {
      type: 'sort',
      config: { dimension: 0, order: 'asc' }
    }
  ]
};

export const cKdeSeriesTpl = {
  type: 'line',
  name: '',
  datasetIndex: 1,
  smooth: true,
  showSymbol: false,
  lineStyle: {
    width: 1
  },
  areaStyle: {},  
};

// bar chart for discrete fields
export const barPlotCfg = {
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    axisLabel: { rotate: 30 },
  },
  grid: {
    left: 10,
    right: 50,
    top: 10,
    bottom: 5,
    containLabel: true
  },
  dataZoom: [
    {
      show: true,
      yAxisIndex: 0,
      width: 20,
      showDataShadow: false
    }
  ],
  dataset:[{
    source: []
  },{
    transform: {
      type: 'sort',
      config: { dimension: 1, order: 'asc' }
    }
  }],
  series: [
    {
      type: 'bar',
      datasetIndex: 1,
      label: {
        show: true,
        position: 'right'
      }
    }
  ],
  animation: false
};

// stacked bar (categoried by target)
export const stackedBarCfg = {
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    axisLabel: { rotate: 30 },
  },
  grid: {
    left: 10,
    right: 50,
    top: 30,
    bottom: 5,
    containLabel: true
  },
  dataset:[{
    source: []
  },{
    transform: {
      type: 'sort',
      config: { dimension: 1, order: 'desc' }
    }
  }],
  dataZoom: [
    {
      show: true,
      yAxisIndex: 0,
      width: 20,
      showDataShadow: false,
    }
  ],
  series: [],
  animation: false
};

export const stackedBarSeriesTpl = {
  type: 'bar',
  stack: 'total',
  datasetIndex: 1,
  label: {
    show: false,
    position: 'right'
  },
  encode: {
    x: 2,
    y: 0,
  }
}

// combined kdes (all continuous kde lines in one chart)
export const allKdePlotCfg = {
  xAxis: {
    type: 'value',
    scale: true
  },
  yAxis: {
    type: 'value'
  },
  grid: {
    left: 10,
    right: 10,
    top: 50,
    bottom: 0,
    containLabel: true
  },
  dataset:[{
    source: []
  }],
  series: [],
  legend: {},
  tooltip: {trigger: 'axis'},
  animation: false
};

export const allKdeTransTpl = {
  transform: [
    {
      type: 'filter',
      config: { dimension: 2, value: '' }
    },
    {
      type: 'sort',
      config: { dimension: 0, order: 'asc' }
    }
  ]
};

export const allKdeSeriesTpl = {
  type: 'line',
  name: '',
  datasetIndex: 1,
  smooth: true,
  showSymbol: false,
  lineStyle: {
    width: 2
  }
};

// timeseries chart
export const trendCurveCfg = {
  xAxis: {
    name: 'timestamp',
    type: 'category',
    boundaryGap: true,
    axisLabel: {
      rotate: 30,
      //formatter: function(value, index) {
      //  return echarts.format.formatTime('MM/dd/yyyy hh:00', value, true);
      //}
    }
  },
  yAxis: {
    type: 'value',
    scale: true
  },
  grid: {
    left: 10,
    right: 10,
    top: 50,
    bottom: 20,
    containLabel: true
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      myToolAgg: {
        show: true,
        title: 'AGG',
        icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
        onclick: function (){}
      },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  dataZoom: [
    {
      show: true,
      type: 'slider',
      bottom: 0
    }
  ],
  dataset:[{
    source: []
  }],
  series: [],
  legend: {},
  tooltip: {trigger: 'axis'},
  animation: false
};

export const trendTransTpl = {
  transform: [
    {
      type: 'filter',
      config: { dimension: 2, value: '' }
    },
    {
      type: 'sort',
      config: { dimension: 0, order: 'asc' }
    }
  ]
};

export const trendSeriesTpl = {
  type: 'line',
  smooth: true,
  showSymbol: false,
  seriesLayoutBy: 'row'
};

export const tsBarPlotCfg = {
  legend: {},
  tooltip: {},
  dataZoom: [
    {
      show: true,
      type: 'slider',
      bottom: 0
    }
  ],
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  dataset: [{
    source: []
  }],
  xAxis: { 
    type: 'category',
    axisLabel: {interval: 0, rotate: 30 }
 },
  yAxis: { type: 'value' },
  grid: {
    left: 10,
    right: 10,
    top: 50,
    bottom: 20,
    containLabel: true
  },
  series: [],
  animation: false
};

export const tsBarSeriesTpl = {
  type: 'bar',
  seriesLayoutBy: 'row'
};

// box plot for continuous fields
export const boxPlotCfg = {
  dataset: [
    {
      source: []
    },
    {
      // has two results(box and outlier)
      transform: {
        type: 'boxplot',
        print: true
      }
    },
    {
      // for outlier
      fromDatasetIndex: 1,
      fromTransformResult: 1
    }
  ],
  xAxis: {
    type: 'category',
    splitLine: {
      show: true
    },
    splitArea: {
      show: true
    },
    axisLabel: { rotate: 30 }
  },
  yAxis: {
    type: 'value',
    scale: true
  },
  legend: {},
  tooltip: {
    trigger: 'item'
  },
  grid: {
    left: 10,
    right: 10,
    top: 50,
    bottom: 20,
    containLabel: true
  },
  dataZoom: [
    {
      show: true,
      type: 'slider',
      bottom: 1
    }
  ],
  series: [
    {
      name: 'Outlier',
      type: 'scatter',
      datasetIndex: 2,
      symbolSize: 5
    }
  ],
  animation: false
};

export const boxTransformTpl = {
  fromDatasetIndex: 1,
  fromTransformResult: 0,
  transform: {
    type: 'filter',
    config: { dimension: 0, value: 0 }
  }
};

export const boxSeriesTpl = {
  name: '',
  type: 'boxplot',
  datasetIndex: 3,
  tooltip: {
    formatter: function (param) {
        return [
            'max: ' + param.data[5],
            'Q3: ' + param.data[4],
            'Q2: ' + param.data[3],
            'Q1: ' + param.data[2],
            'min: ' + param.data[1]
        ].join('<br/>')
    }
  }
};

// Scatter plot
export const scatterPlotCfg = {
  xAxis: {
    name: '',
    nameLocation: 'middle',
    type: 'value',
    scale: true
  },
  yAxis: {
    name: '',
    nameLocation: 'middle',
    type: 'value',
    scale: true
  },
  legend: {},
  dataset:[{
    source: []
  }],
  grid: {
    left: 10,
    right: 10,
    top: 30,
    bottom: 10,
    containLabel: true
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name:'',
      type: 'scatter',
      symbolSize: 5
    }
  ],
  animation: false
};

export const scatterTransTpl = {
  transform: {
    type: 'filter',
    config: { dimension: 2, value: '' }
  }
};

export const scatterSeriesTpl = {
  name: '',
  type: 'scatter',
  datasetIndex: 1,
  symbolSize: 5
};

// Pariwise plot (scatter and histogram)
export const pairPlotCfg = {
  appendPadding: [0, 0, 16, 0],
  padding: [10, 0, 16, 30],
  type: 'matrix',
  fields: [],
  data: [],
  tooltip: false,
  legend: {position: 'top'},
  eachView: (view, facet) => {},
};

// pearson matrix
export const pearsonMatrxiCfg = {
  xAxis: {
    type: 'category',
    inverse: true,
    axisLabel: {interval: 0, rotate: 30 },
    data: []

  },
  yAxis: {
    type: 'category',
    axisLabel: {interval: 0, rotate: 30 },
    data: []
  },
  legend: {},
  dataset:{
    source: []
  },
  grid: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
    containLabel: true
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  visualMap: {
    min: -1,
    max: 1,
    show: true,
    calculable: true,
    orient: 'horizontal',
    right: 'right',
    top: '3%'
  },
  series: [
    {
      type: 'heatmap',
      label: {
        show: true
      }
    }
  ],
  animation: false
};

export const andrewsCurveCfg2 = {
  chartType: 'Line',
  config: {
    data: [],
    smooth: true,
    xField: 'x',
    yField: 'y',
    seriesField: 'name',
    color: 'orange',
    legend: false,
    tooltip: false,
    xAxis: {
      grid: {
        line: {
          style: {
            stroke: '#ddd',
            lineDash: [4, 2]
          }
        }
      }
    }
  }
};

export const pcaPctCfg = {
  chartType: "Column",
  config: {
    xField: 'name',
    yField: 'value',
    label: {
      position: 'top'
    },
    scrollbar: {
      type: 'horizontal',
    },
    data: []
  }
};

// PCA inportance
export const pcaImpCfg = {
  xAxis: {
    type: 'category'
  },
  yAxis: {
    type: 'value'
  },
  dataset:{
    source: []
  },
  grid: {
    left: 10,
    right: 10,
    top: 20,
    bottom: 10,
    containLabel: true
  },
  series: [
    {
      type: 'bar',
      label: {
        show: true,
        position: 'top'
      }
    }
  ],
  animation: false
};

// PCA scatter of 2D
export const pcaD2Cfg = {
  toolbox: {
    show: true,
    feature: {
      dataView: { readOnly: true },
      restore: {},
      myToolD2D3: {
        show: true,
        title: '2D/3D',
        icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
        onclick: function (){}
      },
    }
  },
  xAxis: {
    type: 'value',
    name: 'PC0',
    nameLocation: 'middle',
    scale: true,
  },
  yAxis: {
    type: 'value',
    name: 'PC1',
    nameLocation: 'middle',
    axisLabel: { rotate: 90 },
    scale: true,
  },
  legend: {},
  dataset:[{
    source: []
  }],
  grid: {
    left: 10,
    right: 10,
    top: 50,
    bottom: 10,
    containLabel: true
  },
  series: [
    {
      type: 'scatter',
      symbolSize: 3
    }
  ],
  animation: false
};

export const d2d3TransTpl = {
  transform: {
    type: 'filter',
    config: { dimension: 3, value: '' }
  }
};

export const d2d3SeriesTpl = {
  type: 'scatter',
  name: '',
  datasetIndex: 1,
  symbolSize: 3
};

// PCA scatter of 3D
export const pcaD3Cfg = {
  toolbox: {
    show: true,
    feature: {
      dataView: { readOnly: true },
      restore: {},
      myToolD2D3: {
        show: true,
        title: '2D/3D',
        icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
        onclick: function (){}
      },
    }
  },
  grid3D: {},
  xAxis3D: {
    type: 'value',
    name: 'PC0',
    scale: true
  },
  yAxis3D: {
    type: 'value',
    name: 'PC1',
    scale: true
  },
  zAxis3D: {
    type: 'value',
    name: 'PC2',
    scale: true
  },
  dataset:[{
    source: []
  }],
  legend: {},
  series: [
    {
      type: 'scatter3D',
      symbolSize: 3
    }
  ],
  animation: false
};

// Parallel Coordinate Plot
export const parallelCfg = {
  dataset: [{
    source:[]
  }],
  parallelAxis: [],
  grid: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
    containLabel: true
  },
  series: {
    type: 'parallel'
  },
  legend: {},
  animation: false
};

export const parallelTransTpl = {
  transform: {
    type: 'filter',
    config: { dimension: '', value: '' }
  }
};

export const parallelSeriesTpl = {
  type: 'parallel',
  name: '',
  datasetIndex: 1
};

// combined kdes (all continuous kdes in one chart)
export const andrewsCurveCfg = {
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'value'
  },
  grid: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 0,
    containLabel: true
  },
  dataset:[{
    source: []
  }],
  series: [
    {
      type: 'line',
      smooth: false,
      showSymbol: false,
      lineStyle: {
        width: 1
      }
    }
  ],
  legend: {},
  animation: false
};

export const andrewsTransTpl = {
  transform: [
    {
      type: 'filter',
      config: { dimension: 2, value: '' }
    },
    {
      type: 'sort',
      config: { dimension: 0, order: 'asc' }
    }
  ]
};

export const andrewsSeriesTpl = {
  type: 'line',
  name: '',
  datasetIndex: 1,
  smooth: true,
  showSymbol: false,
  lineStyle: {
    width: 1
  }
};

export const visCategories = [{
  id: 0,
  name: 'Statistics',
  icon: '/resource/img/ml-feature-stats.png'
}, {
  id: 1,
  name: 'Distribution',
  icon: '/resource/img/ml-feature-dists.png'
}, {
  id: 2,
  name: 'Comparation',
  icon: '/resource/img/ml-feature-comp.png'
}, {
  id: 3,
  name: 'Interation',
  icon: '/resource/img/ml-feature-inters.png'
}, {
  id: 4,
  name: 'Correlation',
  icon: '/resource/img/ml-feature-corr.png'
}, {
  id: 5,
  name: 'Feature Detection',
  icon: '/resource/img/ml-feature-curves.png'
}, {
  id: 6,
  name: 'Dim Reduction',
  icon: '/resource/img/ml-feature-reduction.png'
}, {
  id: 7,
  name: 'Time Series',
  icon: '/resource/img/ml-feature-trend.png'
}, {
  id: 8,
  name: 'One-One Scatter',
  icon: '/resource/img/ml-feature-scatter.png'
}];
