import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

// index form columns
export const indexColumns: BasicColumn[] = [
  {
    title: t('common.table.title.name'),
    dataIndex: 'name',
    key: 'name',
    width: 150,
    sorter: true,
    resizable: true,
    align: 'left',
  },
  {
    title: t('common.table.title.group'),
    dataIndex: 'group',
    key: 'group',
    width: 100,
    sorter: true,
    resizable: true,
    align: 'left',
  },
  {
    title: t('common.table.title.desc'),
    dataIndex: 'desc',
    resizable: true,
    align: 'left',
  },
  {
    title: t('ml.workflow.table.title.last_run'),
    dataIndex: 'lastRun',
    width: 200,
    resizable: true,
  },
  {
    title: t('ml.workflow.table.title.duration'),
    dataIndex: 'duration',
    width: 100,
  },
  {
    title: t('common.table.title.status'),
    dataIndex: 'status',
    key: 'tag',
    width: 100,
    sorter: true,
  },
  {
    title: t('ml.workflow.table.title.error'),
    dataIndex: 'error',
    width: 180,
    align: 'left',
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


// canvas form schema
export const formConfigSchema: FormSchema[] = [
  {
    field: 'timeout',
    component: 'InputNumber',
    label: t('ml.workflow.form.config.timeout'),
    defaultValue: 0,
    componentProps: {
      allowClear: false,
      min: 0,
      max: 24*60,
      step: 10
    }
  }
];

// canvas form schema
export const formCanvasSchema: FormSchema[] = [
  {
    field: 'type',
    component: 'Select',
    label: t('ml.workflow.form.canvas.grid.type'),
    labelWidth: 100,
    colProps: { span: 24 },
    defaultValue: 'dot',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Dot', value: 'dot' },
        { label: 'Mesh', value: 'mesh' }
      ]
    }
  },
  {
    field: 'thickness',
    label:  t('ml.workflow.form.canvas.grid.thick'),
    component: 'Slider',
    colProps: { span: 24 },
    labelWidth: 100,
    defaultValue: 1,
    componentProps: {
      min: 0,
      max: 5
    }
  },
  {
    field: 'size',
    label:  t('ml.workflow.form.canvas.grid.size'),
    component: 'Slider',
    colProps: { span: 24 },
    labelWidth: 100,
    defaultValue: 20,
    componentProps: {
      min: 10,
      max: 30
    }
  },
  {
    field: 'color',
    label:  t('ml.workflow.form.canvas.grid.color'),
    component: 'Input',
    slot: 'gridColor',
    colProps: { span: 24 },
    labelWidth: 100
  },
  {
    field: 'bgColor',
    label:  t('ml.workflow.form.canvas.bg.color'),
    component: 'Input',
    slot: 'bgColor',
    colProps: { span: 24 },
    labelWidth: 100
  },
  {
    field: 'eColor',
    label:  t('ml.workflow.form.canvas.edge.color'),
    component: 'Input',
    slot: 'edgeColor',
    colProps: { span: 24 },
    labelWidth: 100
  },
  {
    field: 'edgeRouter',
    component: 'Select',
    label: t('ml.workflow.form.canvas.edge.router'),
    labelWidth: 100,
    colProps: { span: 24 },
    defaultValue: 'smooth',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Smooth', value: 'smooth' },
        { label: 'Straight', value: 'straight' },
        { label: 'Metro', value: 'metro' }
      ]
    }
  }
];


// attribute form schema
export const formAttributeSchema: FormSchema[] = [
  {
    field: 'gridVisible',
    label:  t('ml.workflow.form.config.grid.visible'),
    component: 'Switch',
    colProps: { span: 24 },
    labelWidth: 100,
  },
  {
    field: 'gridColor',
    label:  t('ml.workflow.form.config.grid.color'),
    component: 'Input',
    slot: 'gridColor',
    colProps: { span: 24 },
    labelWidth: 100,
  },
  {
    field: 'gridSize',
    label:  t('ml.workflow.form.config.grid.size'),
    component: 'Slider',
    colProps: { span: 24 },
    labelWidth: 100,
  },
  {
    field: 'gridThickness',
    label:  t('ml.workflow.form.config.grid.thickness'),
    component: 'Slider',
    colProps: { span: 24 },
    labelWidth: 100,
  },
  {
    field: 'bgColor',
    label:  t('ml.workflow.form.config.background.color'),
    component: 'Input',
    slot: 'bgColor',
    colProps: { span: 24 },
    labelWidth: 100,
  },
  {
    field: 'bgImage',
    label:  t('ml.workflow.form.config.background.image'),
    component: 'Input',
    colProps: { span: 24 },
    labelWidth: 100,
  },
  {
    field: 'bgRepeat',
    label:  t('ml.workflow.form.config.background.repeat'),
    component: 'Select',
    colProps: { span: 24 },
    labelWidth: 100,
  },
  {
    field: 'bgOpacity',
    label:  t('ml.workflow.form.config.background.opacity'),
    component: 'Slider',
    colProps: { span: 24 },
    labelWidth: 100,
  },
];


export const dataQuality = {
  histogram_data: {
    id: 'grid_table',
    name: 'Grid',
    page: 1,
    svgCode: '<?xml version="1.0" encoding="iso-8859-1"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 209 209" xml:space="preserve"><path d="M201.5,112c4.143,0,7.5-3.357,7.5-7.5s-3.357-7.5-7.5-7.5H184V43.333h17.5c4.143,0,7.5-3.357,7.5-7.5s-3.357-7.5-7.5-7.5 H184V7.5c0-4.143-3.357-7.5-7.5-7.5S169,3.357,169,7.5v20.833h-53.666V7.5c0-4.143-3.357-7.5-7.5-7.5s-7.5,3.357-7.5,7.5v20.833 H46.667V7.5c0-4.143-3.357-7.5-7.5-7.5s-7.5,3.357-7.5,7.5v20.833H7.5c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h24.167V97H7.5 c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h24.167v53.666H7.5c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h24.167V201.5 c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5v-20.834h53.667V201.5c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5v-20.834H169V201.5 c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5v-20.834h17.5c4.143,0,7.5-3.357,7.5-7.5s-3.357-7.5-7.5-7.5H184V112H201.5z M169,43.333V97h-53.666V43.333H169z M46.667,43.333h53.667V97H46.667V43.333z M46.667,165.666V112h53.667v53.666H46.667z M169,165.666h-53.666V112H169V165.666z"/></svg>',
  },
  scatterMatrix_data: {
    id: 'scatterMatrix_data',
    name: 'ScatterMatrix',
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="#292D32"/><path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="#292D32"/><path d="M22 16.3008C21.96 19.8508 19.82 21.9808 16.25 22.0008V16.3008H22Z" fill="#292D32"/><path d="M7.75 16.3008V22.0008C4.18 21.9808 2.04 19.8508 2 16.3008H7.75Z" fill="#292D32"/><path d="M7.75 9.30078H2V14.8008H7.75V9.30078Z" fill="#292D32"/><path d="M22 9.30078H16.25V14.8008H22V9.30078Z" fill="#292D32"/><path d="M14.75 9.30078H9.25V14.8008H14.75V9.30078Z" fill="#292D32"/><path d="M14.75 2H9.25V7.8H14.75V2Z" fill="#292D32"/><path d="M14.75 16.3008H9.25V22.0008H14.75V16.3008Z" fill="#292D32"/></svg>',
  },
  pairMatrix_data: {
    id: 'pairMatrix_data',
    name: 'PairMatrix',
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="#292D32"/><path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="#292D32"/><path d="M22 16.3008C21.96 19.8508 19.82 21.9808 16.25 22.0008V16.3008H22Z" fill="#292D32"/><path d="M7.75 16.3008V22.0008C4.18 21.9808 2.04 19.8508 2 16.3008H7.75Z" fill="#292D32"/><path d="M7.75 9.30078H2V14.8008H7.75V9.30078Z" fill="#292D32"/><path d="M22 9.30078H16.25V14.8008H22V9.30078Z" fill="#292D32"/><path d="M14.75 9.30078H9.25V14.8008H14.75V9.30078Z" fill="#292D32"/><path d="M14.75 2H9.25V7.8H14.75V2Z" fill="#292D32"/><path d="M14.75 16.3008H9.25V22.0008H14.75V16.3008Z" fill="#292D32"/></svg>',
  },
  boxPlot_data: {
    id: 'boxPlot_data',
    name: 'BoxPlot',
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="#292D32"/><path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="#292D32"/><path d="M22 16.3008C21.96 19.8508 19.82 21.9808 16.25 22.0008V16.3008H22Z" fill="#292D32"/><path d="M7.75 16.3008V22.0008C4.18 21.9808 2.04 19.8508 2 16.3008H7.75Z" fill="#292D32"/><path d="M7.75 9.30078H2V14.8008H7.75V9.30078Z" fill="#292D32"/><path d="M22 9.30078H16.25V14.8008H22V9.30078Z" fill="#292D32"/><path d="M14.75 9.30078H9.25V14.8008H14.75V9.30078Z" fill="#292D32"/><path d="M14.75 2H9.25V7.8H14.75V2Z" fill="#292D32"/><path d="M14.75 16.3008H9.25V22.0008H14.75V16.3008Z" fill="#292D32"/></svg>',
  },
  ViolinPlot_data: {
    id: 'violinPlot_data',
    name: 'ViolinPlot',
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="#292D32"/><path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="#292D32"/><path d="M22 16.3008C21.96 19.8508 19.82 21.9808 16.25 22.0008V16.3008H22Z" fill="#292D32"/><path d="M7.75 16.3008V22.0008C4.18 21.9808 2.04 19.8508 2 16.3008H7.75Z" fill="#292D32"/><path d="M7.75 9.30078H2V14.8008H7.75V9.30078Z" fill="#292D32"/><path d="M22 9.30078H16.25V14.8008H22V9.30078Z" fill="#292D32"/><path d="M14.75 9.30078H9.25V14.8008H14.75V9.30078Z" fill="#292D32"/><path d="M14.75 2H9.25V7.8H14.75V2Z" fill="#292D32"/><path d="M14.75 16.3008H9.25V22.0008H14.75V16.3008Z" fill="#292D32"/></svg>',
  },
  radViz_data: {
    id: 'radViz_data',
    name: 'RadViz',
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="#292D32"/><path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="#292D32"/><path d="M22 16.3008C21.96 19.8508 19.82 21.9808 16.25 22.0008V16.3008H22Z" fill="#292D32"/><path d="M7.75 16.3008V22.0008C4.18 21.9808 2.04 19.8508 2 16.3008H7.75Z" fill="#292D32"/><path d="M7.75 9.30078H2V14.8008H7.75V9.30078Z" fill="#292D32"/><path d="M22 9.30078H16.25V14.8008H22V9.30078Z" fill="#292D32"/><path d="M14.75 9.30078H9.25V14.8008H14.75V9.30078Z" fill="#292D32"/><path d="M14.75 2H9.25V7.8H14.75V2Z" fill="#292D32"/><path d="M14.75 16.3008H9.25V22.0008H14.75V16.3008Z" fill="#292D32"/></svg>',
  },
  kde_data: {
    id: 'kde_data',
    name: 'KDE', // kernel density estimation
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="#292D32"/><path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="#292D32"/><path d="M22 16.3008C21.96 19.8508 19.82 21.9808 16.25 22.0008V16.3008H22Z" fill="#292D32"/><path d="M7.75 16.3008V22.0008C4.18 21.9808 2.04 19.8508 2 16.3008H7.75Z" fill="#292D32"/><path d="M7.75 9.30078H2V14.8008H7.75V9.30078Z" fill="#292D32"/><path d="M22 9.30078H16.25V14.8008H22V9.30078Z" fill="#292D32"/><path d="M14.75 9.30078H9.25V14.8008H14.75V9.30078Z" fill="#292D32"/><path d="M14.75 2H9.25V7.8H14.75V2Z" fill="#292D32"/><path d="M14.75 16.3008H9.25V22.0008H14.75V16.3008Z" fill="#292D32"/></svg>',
  },
  andrews_data: {
    id: 'andrews_data',
    name: 'Andrews',
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="#292D32"/><path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="#292D32"/><path d="M22 16.3008C21.96 19.8508 19.82 21.9808 16.25 22.0008V16.3008H22Z" fill="#292D32"/><path d="M7.75 16.3008V22.0008C4.18 21.9808 2.04 19.8508 2 16.3008H7.75Z" fill="#292D32"/><path d="M7.75 9.30078H2V14.8008H7.75V9.30078Z" fill="#292D32"/><path d="M22 9.30078H16.25V14.8008H22V9.30078Z" fill="#292D32"/><path d="M14.75 9.30078H9.25V14.8008H14.75V9.30078Z" fill="#292D32"/><path d="M14.75 2H9.25V7.8H14.75V2Z" fill="#292D32"/><path d="M14.75 16.3008H9.25V22.0008H14.75V16.3008Z" fill="#292D32"/></svg>',
  },
  parallelCoord_data: {
    id: 'parrallelCoord_data',
    name: 'Parallel Coordinates',
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="#292D32"/><path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="#292D32"/><path d="M22 16.3008C21.96 19.8508 19.82 21.9808 16.25 22.0008V16.3008H22Z" fill="#292D32"/><path d="M7.75 16.3008V22.0008C4.18 21.9808 2.04 19.8508 2 16.3008H7.75Z" fill="#292D32"/><path d="M7.75 9.30078H2V14.8008H7.75V9.30078Z" fill="#292D32"/><path d="M22 9.30078H16.25V14.8008H22V9.30078Z" fill="#292D32"/><path d="M14.75 9.30078H9.25V14.8008H14.75V9.30078Z" fill="#292D32"/><path d="M14.75 2H9.25V7.8H14.75V2Z" fill="#292D32"/><path d="M14.75 16.3008H9.25V22.0008H14.75V16.3008Z" fill="#292D32"/></svg>',
  },
  fa_data: {
    id: 'fa_data',
    name: 'FA', // Factor Analysis
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="#292D32"/><path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="#292D32"/><path d="M22 16.3008C21.96 19.8508 19.82 21.9808 16.25 22.0008V16.3008H22Z" fill="#292D32"/><path d="M7.75 16.3008V22.0008C4.18 21.9808 2.04 19.8508 2 16.3008H7.75Z" fill="#292D32"/><path d="M7.75 9.30078H2V14.8008H7.75V9.30078Z" fill="#292D32"/><path d="M22 9.30078H16.25V14.8008H22V9.30078Z" fill="#292D32"/><path d="M14.75 9.30078H9.25V14.8008H14.75V9.30078Z" fill="#292D32"/><path d="M14.75 2H9.25V7.8H14.75V2Z" fill="#292D32"/><path d="M14.75 16.3008H9.25V22.0008H14.75V16.3008Z" fill="#292D32"/></svg>',
  },
  pca_data: {
    id: 'pca_data',
    name: 'PCA', // Principal Component Analysis
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="#292D32"/><path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="#292D32"/><path d="M22 16.3008C21.96 19.8508 19.82 21.9808 16.25 22.0008V16.3008H22Z" fill="#292D32"/><path d="M7.75 16.3008V22.0008C4.18 21.9808 2.04 19.8508 2 16.3008H7.75Z" fill="#292D32"/><path d="M7.75 9.30078H2V14.8008H7.75V9.30078Z" fill="#292D32"/><path d="M22 9.30078H16.25V14.8008H22V9.30078Z" fill="#292D32"/><path d="M14.75 9.30078H9.25V14.8008H14.75V9.30078Z" fill="#292D32"/><path d="M14.75 2H9.25V7.8H14.75V2Z" fill="#292D32"/><path d="M14.75 16.3008H9.25V22.0008H14.75V16.3008Z" fill="#292D32"/></svg>',
  },
  ica_data: {
    id: 'ica_data',
    name: 'ICA', // 
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="#292D32"/><path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="#292D32"/><path d="M22 16.3008C21.96 19.8508 19.82 21.9808 16.25 22.0008V16.3008H22Z" fill="#292D32"/><path d="M7.75 16.3008V22.0008C4.18 21.9808 2.04 19.8508 2 16.3008H7.75Z" fill="#292D32"/><path d="M7.75 9.30078H2V14.8008H7.75V9.30078Z" fill="#292D32"/><path d="M22 9.30078H16.25V14.8008H22V9.30078Z" fill="#292D32"/><path d="M14.75 9.30078H9.25V14.8008H14.75V9.30078Z" fill="#292D32"/><path d="M14.75 2H9.25V7.8H14.75V2Z" fill="#292D32"/><path d="M14.75 16.3008H9.25V22.0008H14.75V16.3008Z" fill="#292D32"/></svg>',
  },
  mds_data: {
    id: 'mds_data',
    name: 'MDA', // Multi-dimensional scaling
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="#292D32"/><path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="#292D32"/><path d="M22 16.3008C21.96 19.8508 19.82 21.9808 16.25 22.0008V16.3008H22Z" fill="#292D32"/><path d="M7.75 16.3008V22.0008C4.18 21.9808 2.04 19.8508 2 16.3008H7.75Z" fill="#292D32"/><path d="M7.75 9.30078H2V14.8008H7.75V9.30078Z" fill="#292D32"/><path d="M22 9.30078H16.25V14.8008H22V9.30078Z" fill="#292D32"/><path d="M14.75 9.30078H9.25V14.8008H14.75V9.30078Z" fill="#292D32"/><path d="M14.75 2H9.25V7.8H14.75V2Z" fill="#292D32"/><path d="M14.75 16.3008H9.25V22.0008H14.75V16.3008Z" fill="#292D32"/></svg>',
  },
  lda_data: {
    id: 'lda_data',
    name: 'LDA', // Linear Discriminant Analysis
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="#292D32"/><path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="#292D32"/><path d="M22 16.3008C21.96 19.8508 19.82 21.9808 16.25 22.0008V16.3008H22Z" fill="#292D32"/><path d="M7.75 16.3008V22.0008C4.18 21.9808 2.04 19.8508 2 16.3008H7.75Z" fill="#292D32"/><path d="M7.75 9.30078H2V14.8008H7.75V9.30078Z" fill="#292D32"/><path d="M22 9.30078H16.25V14.8008H22V9.30078Z" fill="#292D32"/><path d="M14.75 9.30078H9.25V14.8008H14.75V9.30078Z" fill="#292D32"/><path d="M14.75 2H9.25V7.8H14.75V2Z" fill="#292D32"/><path d="M14.75 16.3008H9.25V22.0008H14.75V16.3008Z" fill="#292D32"/></svg>',
  },
  heatmap_data: {
    id: 'heatmap_data',
    name: 'Heatmap', // correlation matrix
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="#292D32"/><path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="#292D32"/><path d="M22 16.3008C21.96 19.8508 19.82 21.9808 16.25 22.0008V16.3008H22Z" fill="#292D32"/><path d="M7.75 16.3008V22.0008C4.18 21.9808 2.04 19.8508 2 16.3008H7.75Z" fill="#292D32"/><path d="M7.75 9.30078H2V14.8008H7.75V9.30078Z" fill="#292D32"/><path d="M22 9.30078H16.25V14.8008H22V9.30078Z" fill="#292D32"/><path d="M14.75 9.30078H9.25V14.8008H14.75V9.30078Z" fill="#292D32"/><path d="M14.75 2H9.25V7.8H14.75V2Z" fill="#292D32"/><path d="M14.75 16.3008H9.25V22.0008H14.75V16.3008Z" fill="#292D32"/></svg>',
  },
  fittingPlot_data: {
    id: 'fittingPlot_data',
    name: 'FittingPlot', //
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="#292D32"/><path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="#292D32"/><path d="M22 16.3008C21.96 19.8508 19.82 21.9808 16.25 22.0008V16.3008H22Z" fill="#292D32"/><path d="M7.75 16.3008V22.0008C4.18 21.9808 2.04 19.8508 2 16.3008H7.75Z" fill="#292D32"/><path d="M7.75 9.30078H2V14.8008H7.75V9.30078Z" fill="#292D32"/><path d="M22 9.30078H16.25V14.8008H22V9.30078Z" fill="#292D32"/><path d="M14.75 9.30078H9.25V14.8008H14.75V9.30078Z" fill="#292D32"/><path d="M14.75 2H9.25V7.8H14.75V2Z" fill="#292D32"/><path d="M14.75 16.3008H9.25V22.0008H14.75V16.3008Z" fill="#292D32"/></svg>',
  },
  coRank_data: {
    id: 'coRank_data',
    name: 'CoRank', // Covariance Ranking
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="#292D32"/><path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="#292D32"/><path d="M22 16.3008C21.96 19.8508 19.82 21.9808 16.25 22.0008V16.3008H22Z" fill="#292D32"/><path d="M7.75 16.3008V22.0008C4.18 21.9808 2.04 19.8508 2 16.3008H7.75Z" fill="#292D32"/><path d="M7.75 9.30078H2V14.8008H7.75V9.30078Z" fill="#292D32"/><path d="M22 9.30078H16.25V14.8008H22V9.30078Z" fill="#292D32"/><path d="M14.75 9.30078H9.25V14.8008H14.75V9.30078Z" fill="#292D32"/><path d="M14.75 2H9.25V7.8H14.75V2Z" fill="#292D32"/><path d="M14.75 16.3008H9.25V22.0008H14.75V16.3008Z" fill="#292D32"/></svg>',
  },
};

export const classAssess = {
  precisionAndRecall_class: {
    id: 'precisionAndRecall_class',
    name: 'PrecisionAndRecall',
    page: 1,
    svgCode: '<?xml version="1.0" encoding="iso-8859-1"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 209 209" xml:space="preserve"><path d="M201.5,112c4.143,0,7.5-3.357,7.5-7.5s-3.357-7.5-7.5-7.5H184V43.333h17.5c4.143,0,7.5-3.357,7.5-7.5s-3.357-7.5-7.5-7.5 H184V7.5c0-4.143-3.357-7.5-7.5-7.5S169,3.357,169,7.5v20.833h-53.666V7.5c0-4.143-3.357-7.5-7.5-7.5s-7.5,3.357-7.5,7.5v20.833 H46.667V7.5c0-4.143-3.357-7.5-7.5-7.5s-7.5,3.357-7.5,7.5v20.833H7.5c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h24.167V97H7.5 c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h24.167v53.666H7.5c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h24.167V201.5 c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5v-20.834h53.667V201.5c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5v-20.834H169V201.5 c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5v-20.834h17.5c4.143,0,7.5-3.357,7.5-7.5s-3.357-7.5-7.5-7.5H184V112H201.5z M169,43.333V97h-53.666V43.333H169z M46.667,43.333h53.667V97H46.667V43.333z M46.667,165.666V112h53.667v53.666H46.667z M169,165.666h-53.666V112H169V165.666z"/></svg>',
  },
  f1Score_class: {
    id: 'f1Score_class',
    name: 'F1Score',
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="#292D32"/><path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="#292D32"/><path d="M22 16.3008C21.96 19.8508 19.82 21.9808 16.25 22.0008V16.3008H22Z" fill="#292D32"/><path d="M7.75 16.3008V22.0008C4.18 21.9808 2.04 19.8508 2 16.3008H7.75Z" fill="#292D32"/><path d="M7.75 9.30078H2V14.8008H7.75V9.30078Z" fill="#292D32"/><path d="M22 9.30078H16.25V14.8008H22V9.30078Z" fill="#292D32"/><path d="M14.75 9.30078H9.25V14.8008H14.75V9.30078Z" fill="#292D32"/><path d="M14.75 2H9.25V7.8H14.75V2Z" fill="#292D32"/><path d="M14.75 16.3008H9.25V22.0008H14.75V16.3008Z" fill="#292D32"/></svg>',
  },
  prCurve_class: {
    id: 'prCurve_class',
    name: 'PrCurve',
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="#292D32"/><path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="#292D32"/><path d="M22 16.3008C21.96 19.8508 19.82 21.9808 16.25 22.0008V16.3008H22Z" fill="#292D32"/><path d="M7.75 16.3008V22.0008C4.18 21.9808 2.04 19.8508 2 16.3008H7.75Z" fill="#292D32"/><path d="M7.75 9.30078H2V14.8008H7.75V9.30078Z" fill="#292D32"/><path d="M22 9.30078H16.25V14.8008H22V9.30078Z" fill="#292D32"/><path d="M14.75 9.30078H9.25V14.8008H14.75V9.30078Z" fill="#292D32"/><path d="M14.75 2H9.25V7.8H14.75V2Z" fill="#292D32"/><path d="M14.75 16.3008H9.25V22.0008H14.75V16.3008Z" fill="#292D32"/></svg>',
  },
  rocCurve_class: {
    id: 'rocCurve_class',
    name: 'RocCurve',
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="#292D32"/><path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="#292D32"/><path d="M22 16.3008C21.96 19.8508 19.82 21.9808 16.25 22.0008V16.3008H22Z" fill="#292D32"/><path d="M7.75 16.3008V22.0008C4.18 21.9808 2.04 19.8508 2 16.3008H7.75Z" fill="#292D32"/><path d="M7.75 9.30078H2V14.8008H7.75V9.30078Z" fill="#292D32"/><path d="M22 9.30078H16.25V14.8008H22V9.30078Z" fill="#292D32"/><path d="M14.75 9.30078H9.25V14.8008H14.75V9.30078Z" fill="#292D32"/><path d="M14.75 2H9.25V7.8H14.75V2Z" fill="#292D32"/><path d="M14.75 16.3008H9.25V22.0008H14.75V16.3008Z" fill="#292D32"/></svg>',
  },
  auc_class: {
    id: 'auc_class',
    name: 'Auc', // Area under ROC curve
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="#292D32"/><path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="#292D32"/><path d="M22 16.3008C21.96 19.8508 19.82 21.9808 16.25 22.0008V16.3008H22Z" fill="#292D32"/><path d="M7.75 16.3008V22.0008C4.18 21.9808 2.04 19.8508 2 16.3008H7.75Z" fill="#292D32"/><path d="M7.75 9.30078H2V14.8008H7.75V9.30078Z" fill="#292D32"/><path d="M22 9.30078H16.25V14.8008H22V9.30078Z" fill="#292D32"/><path d="M14.75 9.30078H9.25V14.8008H14.75V9.30078Z" fill="#292D32"/><path d="M14.75 2H9.25V7.8H14.75V2Z" fill="#292D32"/><path d="M14.75 16.3008H9.25V22.0008H14.75V16.3008Z" fill="#292D32"/></svg>',
  },
  gauc_class: {
    id: 'gauc_class',
    name: 'Gauc', // 
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="#292D32"/><path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="#292D32"/><path d="M22 16.3008C21.96 19.8508 19.82 21.9808 16.25 22.0008V16.3008H22Z" fill="#292D32"/><path d="M7.75 16.3008V22.0008C4.18 21.9808 2.04 19.8508 2 16.3008H7.75Z" fill="#292D32"/><path d="M7.75 9.30078H2V14.8008H7.75V9.30078Z" fill="#292D32"/><path d="M22 9.30078H16.25V14.8008H22V9.30078Z" fill="#292D32"/><path d="M14.75 9.30078H9.25V14.8008H14.75V9.30078Z" fill="#292D32"/><path d="M14.75 2H9.25V7.8H14.75V2Z" fill="#292D32"/><path d="M14.75 16.3008H9.25V22.0008H14.75V16.3008Z" fill="#292D32"/></svg>',
  },
}