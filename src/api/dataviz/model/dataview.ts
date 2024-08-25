export interface ApiDataviewDataType {
  id?: number;
  name?: string;
  desc?: string;
  group?: string;
  type?: string;
  relation?: string[];
  location?: string[];
  dim?: string[];
  metrics?: string[];
  agg?: string;
  filter?: any;
  sorter?: any[];
  variable?: VarFieldType[] | null;
  modelType?: string;
  model?: any;
  libName: string;
  libVer: string;
  libCfg: any;
  interval?: number;
  datasetId?: number;
  datasetName?: string;
  autoInterval?: number;
  previewLimit?: number;
  pubFlag?: boolean;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface ColumnFieldType {
  id: number | undefined;
  title: string | undefined;
  name: string;
  type: string | undefined;
  hidden: boolean;
  dim: boolean;
  metrics: boolean;
  filter: string;
  orderPri: number | undefined;
  orderDir: string | undefined;
}

export interface DatasetFieldsType {
  datasets: any[];
  datasetId: number|null;
  dim: FieldValueType[];
  metrics: FieldValueType[];
  variable: VarFieldType[] | undefined;
}

export interface DatasetItemType {
  id: number;
  variable: VarFieldType[];
  columns: any[];
  data: any[]; // json array[json]
  total: number;
}

export interface DatasetInfoType {
  index: number;
  dataset: DatasetItemType[] | any[];
  viewData: any[];
  dataInfo: any[];
  limit: number;
}

export interface ChartModelType {
  type: string;
  title: string | undefined;
  dimField: FieldValueType[];
  metricsField: FieldValueType[];
  shapeField: FieldValueType[];
  seriesField: FieldValueType[];
  colorField: FieldValueType[];
  sizeField: FieldValueType[];
  groupField: FieldValueType[];
  filterField: FieldValueType[];
  theme: string;
  interactions: any[];
  animation: string | undefined;
  axis: any;
  style: any;
  legend: any;
  tooltip: any;
  label: any;
  auxiliary: any;
  advance: any;
  data: any|[];
}

export const initChartModel: ChartModelType = {
  type: 'com',
  title: '',
  dimField: [],
  metricsField: [],
  shapeField: [],
  seriesField: [],
  colorField: [],
  sizeField: [],
  groupField: [],
  filterField: [],
  theme: 'light',
  interactions: [],
  animation: undefined,
  axis: {},
  style: {},
  legend: { enabled: true },
  tooltip: { marker: true },
  label: {},
  auxiliary: {},
  advance: { readonly: true },
  data: [],
};

export interface chartModelOptionType {
  theme: string[];
  appear: string[];
  animation: string[];
  interaction: string[];
  scrollbar: string[];
  grid: string[];
  xPos: string[];
  yPos: string[];
  step: string[];
  point: string[];
  legend: string[];
  labelType: string[];
  labelPosition: string[];
  annotationType: string[];
  regressionLineType: string[];
  chartLib: string[];
}

export const initChartModelOption: chartModelOptionType = {
  theme: ['light', 'dark'],
  appear: ['smooth', 'connectedLine', 'area', 'stack', 'group', 'conversion', 'connectedArea'],
  animation: [
    'fade-in',
    'fade-out',
    'grow-in-x',
    'grow-in-y',
    'grow-in-xy',
    'wave-in',
    'zoom-in',
    'zoom-out',
    'path-in',
  ],
  interaction: [
    'marker-active',
    'element-active',
    'element-selected',
    'brush',
    'pie-legend-active',
    'active-region',
  ],
  scrollbar: ['horizontal', 'vertical'],
  grid: ['X-Axis', 'Y-Axis', 'Both'],
  xPos: ['top', 'bottom'],
  yPos: ['left', 'right'],
  step: ['hv', 'vh', 'hvh', 'vhv'],
  point: ['circle', 'square', 'triangle', 'hexagon', 'diamond', 'bowtie'],
  legend: [
    'top',
    'top-left',
    'top-right',
    'left',
    'left-top',
    'left-bottom',
    'right',
    'right-top',
    'right-bottom',
    'bottom',
    'bottom-left',
    'bottom-right',
  ],
  labelType: ['inner', 'outer', 'spider'],
  labelPosition: ['top', 'bottom', 'left', 'middle', 'right'],
  annotationType: [
    'text',
    'line',
    'region',
    'regionFilter',
    'arc',
    'image',
    'dataMarker',
    'dataRegion',
    'html',
    'shape',
  ],
  regressionLineType: ['linear', 'exp', 'loess', 'log', 'poly', 'pow', 'quad'],
  chartLib: ['antvG2Plot', 'antvG6', 'antvL7Plot', 'ECharts']
};

export interface FieldValueType {
  id: number;
  name: string;
  type?: string;
}

export const initDatasetFields: DatasetFieldsType = {
  datasets: [],
  datasetId: null,
  dim: [],
  metrics: [],
  variable: [],
};

export interface ChartType {
  type: string;
  name: string;
  geom: string;
  shape?: string;
  coord?: string;
  adjust?: string;
  posLimit?: number;
}

export interface AntAvaType {
  advices: any[];
  current: number;
  libCfg: any[];
  inst: any;
}

export interface VarFieldType {
  name: string;
  type: string;
  value: string;
}

export interface AnnFieldType {
  name?: string;
  type?: string;
  start?: string|undefined;
  end?: string|undefined;
  color?: string|undefined;
  opacity?: number|undefined;
  text?: any|undefined;
}

export interface AnnTextFieldType {
  content: string|undefined;
  position: string|undefined;
  fontSize: number|undefined;
  rotate: number|undefined;
}

export const initAva: AntAvaType = {
  advices: [],
  current: 0,
  libCfg: [],
  inst: '',
};

export const initAnnotation: AnnFieldType = {
  name: '',
  type: '',
  start: undefined,
  end: undefined,
  color: undefined,
  opacity: undefined,
  text: {},
};

//initial value of dataset
export const initDataview: ApiDataviewDataType = {
  id: 0,
  name: '',
  desc: '',
  group: '',
  type: '',
  relation: [],
  location: [],
  dim: [],
  metrics: [],
  variable: [],
  modelType: '',
  model: {},
  datasetId: 0,
  datasetName: '',
  interval: undefined,
  previewLimit: 500,
  pubFlag: false,
  createdBy: '',
  createdAt: '',
  updatedBy: '',
  updatedAt: '',
};

export const advCfgPlaceholder: string = "yAxis: {\n" +
  "  min: 100,\n" +
  "  max: 3000,\n" +
  "  title: {\n" +
  "    text: 'power',\n" +
  "    style: {fontSize: 16}\n" +
  "  }\n" +
  "},\n" +
  "legend: {\n" +
  "  layout: 'horizontal',\n" +
  "  position: 'right'\n" +
  "},\n" +
  "tooltip: {\n" +
  "  formatter: (datum: Datum) => {\n" +
  "    return { name: datum.x, value: datum.y + '%' };\n" +
  "  }\n" +
  "},\n" +
  "label: {\n" +
  "  type: 'spider',\n" +
  "  layout: [\n" +
  "    { type: 'interval-adjust-position' },\n" +
  "    { type: 'interval-hide-overlap' },\n" +
  "    { type: 'adjust-color' }\n" +
  "  ],\n" +
  "  content: '{name}\\n{percentage}',\n" +
  "  style: {fill: '#fff'}\n" +
  "},\n" +
  "animation: {\n" +
  "  appear: {\n" +
  "    animation: 'appear-interval'\n" +
  "  },\n" +
  "  update: {\n" +
  "    animation: 'blink-interval'\n" +
  "  },\n" +
  "},\n" +
  "annotations: [\n" +
  "  {\n" +
  "    type: 'regionFilter',\n" +
  "    start: ['min', 'median'],\n" +
  "    end: ['max', '0'],\n" +
  "    color: 'red'\n" +
  "  },\n" +
  "  {\n" +
  "    type: 'line',\n" +
  "    start: ['min', 'median'],\n" +
  "    end: ['max', 'median'],\n" +
  "    style: {\n" +
  "      stroke: 'orange',\n" +
  "      lineDash: [2, 2]\n" +
  "    }\n" +
  "  }\n" +
  "]";
