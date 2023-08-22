import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();
export const indexColumns: BasicColumn[] = [
  {
    title: t('common.table.title.type'),
    dataIndex: 'type',
    width: 50,
    align: 'left',
    resizable: true,
  },
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
    title: t('dataviz.dataview.table.title.dim'),
    dataIndex: 'dim',
    align: 'left',
    resizable: true,
  },
  {
    title: t('dataviz.dataview.table.title.metrics'),
    dataIndex: 'metrics',
    align: 'left',
    resizable: true,
  },
  {
    title: t('dataviz.dataview.table.title.lib_name'),
    dataIndex: 'libName',
    align: 'left',
    width: 90,
  },
  {
    title: t('dataviz.datasource.table.title.usage'),
    dataIndex: 'usage',
    width: 90,
    sorter: true,
  },
  {
    title: t('dataviz.dataview.table.title.dataset'),
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
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'group',
    label: t('common.table.title.group'),
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
    slot: 'group',
  },
  {
    field: 'type',
    label: t('common.table.title.type'),
    component: 'Input',
    show: false,
  },
  {
    field: 'dim',
    label: t('common.table.title.dim'),
    component: 'Input',
    show: false,
  },
  {
    field: 'metrics',
    label: t('common.table.title.metrics'),
    component: 'Input',
    show: false,
  },
  {
    field: 'type',
    label: t('dataviz.dataview.table.title.variable'),
    component: 'Input',
    show: false,
  },
  {
    field: 'model',
    label: t('common.table.title.model'),
    component: 'Input',
    show: false,
  },
  {
    field: 'libName',
    label: t('common.table.title.lib_name'),
    component: 'Input',
    show: false,
  },
  {
    field: 'LibVer',
    label: t('common.table.title.lib_ver'),
    component: 'Input',
    show: false,
  },
  {
    field: 'libConfig',
    label: t('common.table.title.lib_config'),
    component: 'Input',
    show: false,
  },
  {
    field: 'interval',
    label: t('common.table.title.interval'),
    component: 'Input',
    show: false,
  },
  {
    field: 'datasetId',
    label: t('common.table.title.dataset'),
    component: 'Input',
    show: false,
  },
  {
    field: 'createdBy',
    label: t('common.table.title.created_by'),
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
  },
  {
    field: 'createdAt',
    label: t('common.table.title.create_time'),
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
  },
  {
    field: 'updatedBy',
    label: t('common.table.title.updated_by'),
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
  },
  {
    field: 'updatedAt',
    label: t('common.table.title.update_time'),
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
  },
];

// source form schema
export const formConfigSchema: FormSchema[] = [
  {
    field: 'datasetId',
    component: 'Input',
    label: t('dataviz.dataview.form.config.fields.dataset'),
    slot: 'datasetSelectTree',
    colProps: { span: 24 },
    labelWidth: 100,
  },
  {
    field: 'dim',
    component: 'Input',
    label: t('dataviz.dataview.form.config.fields.dim'),
    slot: 'dimSelect',
    colProps: { span: 24 },
    labelWidth: 100,
  },
  {
    field: 'loc',
    component: 'Input',
    label: t('dataviz.dataview.form.config.fields.loc'),
    slot: 'locSelect',
    colProps: { span: 24 },
    labelWidth: 100,
  },
  {
    field: 'relation',
    component: 'Input',
    label: t('dataviz.dataview.form.config.fields.relation'),
    slot: 'relSelect',
    colProps: { span: 24 },
    labelWidth: 100,
  },
  {
    field: 'metrics',
    component: 'Input',
    label: t('dataviz.dataview.form.config.fields.metrics'),
    slot: 'metricsSelect',
    colProps: { span: 24 },
    labelWidth: 100,
  },
  {
    field: 'agg',
    component: 'Select',
    label: t('dataviz.dataview.form.config.fields.aggregation'),
    colProps: { span: 24 },
    labelWidth: 100,
    componentProps: {
      placeholder: 'Aggregation',
      options: [
        {
          label: t('dataviz.dataview.form.config.fields.aggCount'),
          value: 'count',
        },
        {
          label: t('dataviz.dataview.form.config.fields.aggSum'),
          value: 'sum',
        },
        {
          label: t('dataviz.dataview.form.config.fields.aggMean'),
          value: 'mean',
        },
        {
          label: t('dataviz.dataview.form.config.fields.aggMed'),
          value: 'median',
        },
        {
          label: t('dataviz.dataview.form.config.fields.aggMin'),
          value: 'min',
        },
        {
          label: t('dataviz.dataview.form.config.fields.aggMax'),
          value: 'max',
        },
      ],
    },
  },
  {
    field: 'precision',
    component: 'InputNumber',
    label: t('dataviz.dataview.form.config.fields.precision'),
    colProps: { span: 24 },
    labelWidth: 100,
    componentProps: {
      placeholder: 'Agg Precision',
      min: 0,
      max: 5,
    },
  },
];

// calculation field schemas
export const calcModalSchemas: FormSchema[] = [
  {
    field: 'metrics',
    label: t('dataviz.dataview.form.calc.metrics'),
    component: 'Switch',
    colProps: { span: 24 },
  },
  {
    field: 'type',
    label: t('dataviz.dataview.form.calc.type'),
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: t('dataviz.dataview.form.calc.cat.number'), value: 'number' },
        { label: t('dataviz.dataview.form.calc.cat.string'), value: 'string' },
        { label: t('dataviz.dataview.form.calc.cat.bool'), value: 'bool' },
        { label: t('dataviz.dataview.form.calc.cat.ts'), value: 'timestamp' },
      ],
    },
    colProps: { span: 24 },
  },
  {
    field: 'name',
    component: 'Input',
    required: true,
    label: t('dataviz.dataview.form.calc.name'),
    colProps: { span: 24 },
  },
  {
    field: 'value',
    component: 'Input',
    required: true,
    label: t('dataviz.dataview.form.calc.value'),
    colProps: { span: 24 },
  },
];

export const mapTypes = {
  marker_map: {
    id: 'marker_map',
    name: 'Marker',
    page: 1,
    svgCode: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><defs><style>.cls-1{fill:#6fabe6;}.cls-2{fill:#9dcc6b;}.cls-3{fill:#fc6;}.cls-4{fill:#ffde76;}.cls-5{fill:#b5e08c;}.cls-6{fill:#82bcf4;}.cls-7{fill:#db5669;}.cls-8{fill:#f26674;}</style></defs><title>Map GPS</title><g id="Map_GPS" data-name="Map GPS"><path class="cls-1" d="M21,47H4.16a2,2,0,0,1-2-2.16L3.11,33H17C21,47.08,20.23,44.28,21,47Z"/><path class="cls-2" d="M28,9V27H3.58L4.85,10.84A2,2,0,0,1,6.85,9H8c0,4.42,8,14,8,14s8-9.58,8-14Z"/><path class="cls-2" d="M44.42,27H34V9h7.15a2,2,0,0,1,2,1.84Z"/><path class="cls-1" d="M45.84,45a2,2,0,0,1-2,2H27L23,33H44.89C46.13,48.64,45.84,44.05,45.84,45Z"/><path class="cls-1" d="M21,47H4.16a2,2,0,0,1-2-2.16L3.11,33H17C21,47.08,20.23,44.28,21,47Z"/><path class="cls-2" d="M28,9V27H3.58L4.85,10.84A2,2,0,0,1,6.85,9H8c0,4.42,8,14,8,14s8-9.58,8-14Z"/><path class="cls-2" d="M44.42,27H34V9h7.15a2,2,0,0,1,2,1.84Z"/><path class="cls-1" d="M45.84,45a2,2,0,0,1-2,2H27L23,33H44.89C46.13,48.64,45.84,44.05,45.84,45Z"/><path class="cls-3" d="M27,47H21L17,33H3.11l.47-6H28V9h6V27H44.42l.47,6H23C27,47.08,26.23,44.28,27,47Z"/><path class="cls-4" d="M23,33l3.43,12h-6L17,33H6c.2-2.52.1-1.19.47-6H28V9h6V27H44.42l.47,6Z"/><path class="cls-5" d="M28,9V27H6.42c.21-2.65,0-.38,1.06-13.48A64.84,64.84,0,0,0,14,23s.39-.47,1-1.25c.61.78,1,1.25,1,1.25s8-9.58,8-14Z"/><path class="cls-6" d="M20.43,45H7.16a2,2,0,0,1-2-2.16L6,33H17Z"/><path class="cls-6" d="M45.84,45H26.43L23,33H44.89C46.13,48.64,45.84,44.05,45.84,45Z"/><path class="cls-5" d="M44.42,27H34V9h7.15a2,2,0,0,1,2,1.84Z"/><path class="cls-7" d="M24,9c0,3.69-5.71,11.24-8,14,0,0-8-9.58-8-14A8,8,0,0,1,24,9Z"/><path class="cls-8" d="M24,9c0,3.07-3.87,8.64-6.22,11.74C16.52,19.19,10,11,10,7a7.87,7.87,0,0,1,1.44-4.56A8,8,0,0,1,24,9Z"/><circle class="cls-7" cx="16" cy="9" r="3"/></g></svg>',
  },
  bubble_map: {
    id: 'bubble_map',
    name: 'Bubble',
    page: 1,
    svgCode: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><defs><style>.cls-1{fill:#6fabe6;}.cls-2{fill:#9dcc6b;}.cls-3{fill:#fc6;}.cls-4{fill:#ffde76;}.cls-5{fill:#b5e08c;}.cls-6{fill:#82bcf4;}.cls-7{fill:#db5669;}.cls-8{fill:#f26674;}</style></defs><title>Map GPS</title><g id="Map_GPS" data-name="Map GPS"><path class="cls-1" d="M21,47H4.16a2,2,0,0,1-2-2.16L3.11,33H17C21,47.08,20.23,44.28,21,47Z"/><path class="cls-2" d="M28,9V27H3.58L4.85,10.84A2,2,0,0,1,6.85,9H8c0,4.42,8,14,8,14s8-9.58,8-14Z"/><path class="cls-2" d="M44.42,27H34V9h7.15a2,2,0,0,1,2,1.84Z"/><path class="cls-1" d="M45.84,45a2,2,0,0,1-2,2H27L23,33H44.89C46.13,48.64,45.84,44.05,45.84,45Z"/><path class="cls-1" d="M21,47H4.16a2,2,0,0,1-2-2.16L3.11,33H17C21,47.08,20.23,44.28,21,47Z"/><path class="cls-2" d="M28,9V27H3.58L4.85,10.84A2,2,0,0,1,6.85,9H8c0,4.42,8,14,8,14s8-9.58,8-14Z"/><path class="cls-2" d="M44.42,27H34V9h7.15a2,2,0,0,1,2,1.84Z"/><path class="cls-1" d="M45.84,45a2,2,0,0,1-2,2H27L23,33H44.89C46.13,48.64,45.84,44.05,45.84,45Z"/><path class="cls-3" d="M27,47H21L17,33H3.11l.47-6H28V9h6V27H44.42l.47,6H23C27,47.08,26.23,44.28,27,47Z"/><path class="cls-4" d="M23,33l3.43,12h-6L17,33H6c.2-2.52.1-1.19.47-6H28V9h6V27H44.42l.47,6Z"/><path class="cls-5" d="M28,9V27H6.42c.21-2.65,0-.38,1.06-13.48A64.84,64.84,0,0,0,14,23s.39-.47,1-1.25c.61.78,1,1.25,1,1.25s8-9.58,8-14Z"/><path class="cls-6" d="M20.43,45H7.16a2,2,0,0,1-2-2.16L6,33H17Z"/><path class="cls-6" d="M45.84,45H26.43L23,33H44.89C46.13,48.64,45.84,44.05,45.84,45Z"/><path class="cls-5" d="M44.42,27H34V9h7.15a2,2,0,0,1,2,1.84Z"/><path class="cls-7" d="M24,9c0,3.69-5.71,11.24-8,14,0,0-8-9.58-8-14A8,8,0,0,1,24,9Z"/><path class="cls-8" d="M24,9c0,3.07-3.87,8.64-6.22,11.74C16.52,19.19,10,11,10,7a7.87,7.87,0,0,1,1.44-4.56A8,8,0,0,1,24,9Z"/><circle class="cls-7" cx="16" cy="9" r="3"/></g></svg>',
  },
  migration_map: {
    id: 'migration_map',
    name: 'Migration',
    page: 1,
    svgCode: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-1{fill:#3eb38a;}.cls-2{fill:#141f38;}.cls-3{fill:#81c9ac;}.cls-4{fill:#ff5f6e;}.cls-5{fill:#fff;}</style></defs><title>map-filled</title><polygon class="cls-1" points="124.72 479.18 6.57 439.8 32.82 164.1 137.85 203.49 124.72 479.18"/><path class="cls-2" d="M124.72,485.74a6.61,6.61,0,0,1-2.08-.34L4.49,446A6.57,6.57,0,0,1,0,439.17L26.29,163.48A6.57,6.57,0,0,1,35.13,158l105,39.38a6.57,6.57,0,0,1,4.25,6.46L131.28,479.49a6.57,6.57,0,0,1-6.56,6.25ZM13.59,435.22l105,35L131.06,208l-92.52-34.7Z"/><polygon class="cls-3" points="256 439.8 124.72 479.18 137.85 203.49 256 164.1 256 439.8"/><path class="cls-2" d="M124.72,485.74a6.56,6.56,0,0,1-6.56-6.88l13.13-275.69a6.57,6.57,0,0,1,4.48-5.92l118.15-39.38a6.57,6.57,0,0,1,8.64,6.23V439.8a6.57,6.57,0,0,1-4.68,6.29L126.6,485.47A6.54,6.54,0,0,1,124.72,485.74Zm19.47-277.45L131.72,470.23l117.72-35.32V173.21ZM256,439.8h0Z"/><polygon class="cls-1" points="387.28 479.18 256 439.8 256 164.1 374.15 203.49 387.28 479.18"/><path class="cls-2" d="M387.28,485.74a6.51,6.51,0,0,1-1.88-.28L254.12,446.08a6.57,6.57,0,0,1-4.68-6.29V164.1a6.57,6.57,0,0,1,8.64-6.23l118.15,39.38a6.57,6.57,0,0,1,4.48,5.92l13.13,275.69a6.56,6.56,0,0,1-6.56,6.88ZM262.57,434.91l117.72,35.32L367.81,208.29,262.57,173.21Z"/><polygon class="cls-3" points="505.44 439.8 387.28 479.18 374.15 203.49 479.18 164.1 505.44 439.8"/><path class="cls-2" d="M387.28,485.74a6.57,6.57,0,0,1-6.56-6.25L367.6,203.8a6.57,6.57,0,0,1,4.25-6.46l105-39.38a6.56,6.56,0,0,1,8.84,5.53L512,439.17a6.56,6.56,0,0,1-4.46,6.85L389.36,485.41A6.61,6.61,0,0,1,387.28,485.74ZM380.94,208l12.49,262.26,105-35-24.95-262Z"/><path class="cls-4" d="M357.09,133.91C357.09,189.74,256,321.64,256,321.64S154.91,189.74,154.91,133.91a101.09,101.09,0,0,1,202.17,0Z"/><path class="cls-2" d="M256,332.43l-5.21-6.8c-4.18-5.46-102.44-134.33-102.44-191.73a107.65,107.65,0,1,1,215.3,0c0,57.4-98.26,186.27-102.44,191.73Zm0-293a94.63,94.63,0,0,0-94.52,94.52c0,45.88,74,149.07,94.52,176.79,20.51-27.72,94.52-130.92,94.52-176.79A94.63,94.63,0,0,0,256,39.38Z"/><circle class="cls-5" cx="256" cy="137.85" r="39.38"/><path class="cls-2" d="M256,183.79a45.95,45.95,0,1,1,45.95-45.95A46,46,0,0,1,256,183.79ZM256,105a32.82,32.82,0,1,0,32.82,32.82A32.86,32.86,0,0,0,256,105Z"/></svg>',
  },
  timeline_map: {
    id: 'timeline_map',
    name: 'Timeline',
    page: 1,
    svgCode: '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#1c9957" d="M42,39V9c0-1.657-1.343-3-3-3H9C7.343,6,6,7.343,6,9v30c0,1.657,1.343,3,3,3h30C40.657,42,42,40.657,42,39z"/><path fill="#3e7bf1" d="M9,42h30c1.657,0-15-16-15-16S7.343,42,9,42z"/><path fill="#cbccc9" d="M42,39V9c0-1.657-16,15-16,15S42,40.657,42,39z"/><path fill="#efefef" d="M39,42c1.657,0,3-1.343,3-3v-0.245L26.245,23L23,26.245L38.755,42H39z"/><path fill="#ffd73d" d="M42,9c0-1.657-1.343-3-3-3h-0.245L6,38.755V39c0,1.657,1.343,3,3,3h0.245L42,9.245V9z"/><path fill="#d73f35" d="M36,2c-5.523,0-10,4.477-10,10c0,6.813,7.666,9.295,9.333,19.851C35.44,32.531,35.448,33,36,33s0.56-0.469,0.667-1.149C38.334,21.295,46,18.813,46,12C46,6.477,41.523,2,36,2z"/><path fill="#752622" d="M36 8.5A3.5 3.5 0 1 0 36 15.5A3.5 3.5 0 1 0 36 8.5Z"/><path fill="#fff" d="M14.493,12.531v2.101h2.994c-0.392,1.274-1.455,2.185-2.994,2.185c-1.833,0-3.318-1.485-3.318-3.318s1.486-3.318,3.318-3.318c0.824,0,1.576,0.302,2.156,0.799l1.548-1.547C17.22,8.543,15.92,8,14.493,8c-3.038,0-5.501,2.463-5.501,5.5s2.463,5.5,5.501,5.5c4.81,0,5.637-4.317,5.184-6.461L14.493,12.531z"/></svg>',
  },
  heat_map: {
    id: 'heat_map',
    name: 'Heatmap',
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M789.504 678.4512l-0.0512 62.5152a23.04 23.04 0 0 1-32.6912 20.9408l-22.7328-10.4704c4.5312-4.8384 9.0112-9.8048 13.3888-14.848a381.824 381.824 0 0 0 42.0608-58.112zM190.2592 243.2a23.04 23.04 0 0 1 32.6912-20.9152l170.4448 78.6432 184.1664-78.8992a23.04 23.04 0 0 1 15.7184-0.896l3.0208 1.152 179.7376 82.944a23.04 23.04 0 0 1 13.3888 20.9408v186.2912a128.0768 128.0768 0 0 0-46.1056-33.6128v-137.9584l-157.056-72.4736-184.1408 78.9248a23.04 23.04 0 0 1-18.7136-0.256l-147.072-67.8912v364.0576l157.056 72.4992 176.896-75.8016c5.5296 15.3088 13.2608 30.848 22.9376 46.4896l-6.9632-3.2256-184.1408 78.9504a23.04 23.04 0 0 1-15.6928 0.8704l-3.0208-1.1264-179.7632-82.9696a23.04 23.04 0 0 1-13.3888-20.9152z" fill="#ED892D" /><path d="M563.584 616.6272c4.48 20.9408 13.44 42.4448 26.2912 64.2048a23.04 23.04 0 0 1-26.0608-19.9168l-0.1792-2.8928zM586.6752 220.16a23.04 23.04 0 0 1 22.8608 20.1472l0.1792 2.8928-0.0256 249.856c-22.784 16.5632-39.3984 40.1152-46.08 67.072V243.2a23.04 23.04 0 0 1 23.04-23.04zM393.088 303.104a23.04 23.04 0 0 1 22.8608 20.1728l0.1792 2.8928v414.7968a23.04 23.04 0 0 1-45.9008 2.8928l-0.1792-2.8928V326.1696a23.04 23.04 0 0 1 23.04-23.04z" fill="#F5C280" /><path d="M577.5872 222.0288a23.04 23.04 0 0 1 15.7184-0.896l3.0208 1.152 89.856 41.472a23.04 23.04 0 0 1-16.5888 42.88l-2.7136-1.024-80.5888-37.1968-184.1408 78.9248a23.04 23.04 0 0 1-15.6928 0.896l-3.0208-1.152-89.8816-41.472a23.04 23.04 0 0 1 16.6144-42.9056l2.688 1.0496 80.5632 37.1712 184.1664-78.8992zM570.3168 639.9488c5.5296 15.2832 13.2352 30.8224 22.912 46.4384l-6.912-3.1744-184.1664 78.9504a23.04 23.04 0 0 1-15.6928 0.8704l-3.0208-1.1264-89.8816-41.472a23.04 23.04 0 0 1 16.6144-42.9056l2.688 1.024 80.5632 37.1968z" fill="#ED892D" /><path d="M688.9984 421.632c-96.2048 0-174.7456 73.6512-174.7456 165.2736 0 60.6208 30.7712 121.216 81.4592 179.8144 17.3056 20.0192 35.7888 38.4 54.2976 54.784l9.3696 8.1152 8.6016 7.1168c3.328 2.688 5.7856 4.608 7.168 5.632a23.04 23.04 0 0 0 27.648 0l7.168-5.632 8.6272-7.1168c2.9952-2.56 6.144-5.248 9.3696-8.1408a582.9632 582.9632 0 0 0 54.2976-54.784c50.688-58.5728 81.4848-119.168 81.4848-179.7888 0-91.6224-78.592-165.2736-174.7456-165.2736z m0 46.08c71.3728 0 128.6656 53.7088 128.6656 119.1936 0 47.232-26.112 98.6368-70.2464 149.6576-15.872 18.3552-32.9472 35.328-49.9968 50.432l-4.3776 3.84-4.096 3.4304-8.3968-7.2704a537.3952 537.3952 0 0 1-49.9968-50.432c-44.1088-51.0208-70.2208-102.4-70.2208-149.6576 0-65.4848 57.2672-119.1936 128.6656-119.1936z" fill="#BE4BDB" /><path d="M688.9984 515.7888a82.944 82.944 0 1 1 0 165.9392 82.944 82.944 0 0 1 0-165.9392z m0 46.08a36.864 36.864 0 1 0 0 73.7792 36.864 36.864 0 0 0 0-73.7792z" fill="#BE4BDB" /></svg>',
  },
  choropleth_map: {
    id: 'choropleth_map',
    name: 'Choropleth',
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M789.504 678.4512l-0.0512 62.5152a23.04 23.04 0 0 1-32.6912 20.9408l-22.7328-10.4704c4.5312-4.8384 9.0112-9.8048 13.3888-14.848a381.824 381.824 0 0 0 42.0608-58.112zM190.2592 243.2a23.04 23.04 0 0 1 32.6912-20.9152l170.4448 78.6432 184.1664-78.8992a23.04 23.04 0 0 1 15.7184-0.896l3.0208 1.152 179.7376 82.944a23.04 23.04 0 0 1 13.3888 20.9408v186.2912a128.0768 128.0768 0 0 0-46.1056-33.6128v-137.9584l-157.056-72.4736-184.1408 78.9248a23.04 23.04 0 0 1-18.7136-0.256l-147.072-67.8912v364.0576l157.056 72.4992 176.896-75.8016c5.5296 15.3088 13.2608 30.848 22.9376 46.4896l-6.9632-3.2256-184.1408 78.9504a23.04 23.04 0 0 1-15.6928 0.8704l-3.0208-1.1264-179.7632-82.9696a23.04 23.04 0 0 1-13.3888-20.9152z" fill="#ED892D" /><path d="M563.584 616.6272c4.48 20.9408 13.44 42.4448 26.2912 64.2048a23.04 23.04 0 0 1-26.0608-19.9168l-0.1792-2.8928zM586.6752 220.16a23.04 23.04 0 0 1 22.8608 20.1472l0.1792 2.8928-0.0256 249.856c-22.784 16.5632-39.3984 40.1152-46.08 67.072V243.2a23.04 23.04 0 0 1 23.04-23.04zM393.088 303.104a23.04 23.04 0 0 1 22.8608 20.1728l0.1792 2.8928v414.7968a23.04 23.04 0 0 1-45.9008 2.8928l-0.1792-2.8928V326.1696a23.04 23.04 0 0 1 23.04-23.04z" fill="#F5C280" /><path d="M577.5872 222.0288a23.04 23.04 0 0 1 15.7184-0.896l3.0208 1.152 89.856 41.472a23.04 23.04 0 0 1-16.5888 42.88l-2.7136-1.024-80.5888-37.1968-184.1408 78.9248a23.04 23.04 0 0 1-15.6928 0.896l-3.0208-1.152-89.8816-41.472a23.04 23.04 0 0 1 16.6144-42.9056l2.688 1.0496 80.5632 37.1712 184.1664-78.8992zM570.3168 639.9488c5.5296 15.2832 13.2352 30.8224 22.912 46.4384l-6.912-3.1744-184.1664 78.9504a23.04 23.04 0 0 1-15.6928 0.8704l-3.0208-1.1264-89.8816-41.472a23.04 23.04 0 0 1 16.6144-42.9056l2.688 1.024 80.5632 37.1968z" fill="#ED892D" /><path d="M688.9984 421.632c-96.2048 0-174.7456 73.6512-174.7456 165.2736 0 60.6208 30.7712 121.216 81.4592 179.8144 17.3056 20.0192 35.7888 38.4 54.2976 54.784l9.3696 8.1152 8.6016 7.1168c3.328 2.688 5.7856 4.608 7.168 5.632a23.04 23.04 0 0 0 27.648 0l7.168-5.632 8.6272-7.1168c2.9952-2.56 6.144-5.248 9.3696-8.1408a582.9632 582.9632 0 0 0 54.2976-54.784c50.688-58.5728 81.4848-119.168 81.4848-179.7888 0-91.6224-78.592-165.2736-174.7456-165.2736z m0 46.08c71.3728 0 128.6656 53.7088 128.6656 119.1936 0 47.232-26.112 98.6368-70.2464 149.6576-15.872 18.3552-32.9472 35.328-49.9968 50.432l-4.3776 3.84-4.096 3.4304-8.3968-7.2704a537.3952 537.3952 0 0 1-49.9968-50.432c-44.1088-51.0208-70.2208-102.4-70.2208-149.6576 0-65.4848 57.2672-119.1936 128.6656-119.1936z" fill="#BE4BDB" /><path d="M688.9984 515.7888a82.944 82.944 0 1 1 0 165.9392 82.944 82.944 0 0 1 0-165.9392z m0 46.08a36.864 36.864 0 1 0 0 73.7792 36.864 36.864 0 0 0 0-73.7792z" fill="#BE4BDB" /></svg>',
  },
  movement_map: {
    id: 'movement_map',
    name: 'Movement',
    page: 1,
    svgCode: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-1{fill:#3eb38a;}.cls-2{fill:#141f38;}.cls-3{fill:#81c9ac;}.cls-4{fill:#ff5f6e;}.cls-5{fill:#fff;}</style></defs><title>map-filled</title><polygon class="cls-1" points="124.72 479.18 6.57 439.8 32.82 164.1 137.85 203.49 124.72 479.18"/><path class="cls-2" d="M124.72,485.74a6.61,6.61,0,0,1-2.08-.34L4.49,446A6.57,6.57,0,0,1,0,439.17L26.29,163.48A6.57,6.57,0,0,1,35.13,158l105,39.38a6.57,6.57,0,0,1,4.25,6.46L131.28,479.49a6.57,6.57,0,0,1-6.56,6.25ZM13.59,435.22l105,35L131.06,208l-92.52-34.7Z"/><polygon class="cls-3" points="256 439.8 124.72 479.18 137.85 203.49 256 164.1 256 439.8"/><path class="cls-2" d="M124.72,485.74a6.56,6.56,0,0,1-6.56-6.88l13.13-275.69a6.57,6.57,0,0,1,4.48-5.92l118.15-39.38a6.57,6.57,0,0,1,8.64,6.23V439.8a6.57,6.57,0,0,1-4.68,6.29L126.6,485.47A6.54,6.54,0,0,1,124.72,485.74Zm19.47-277.45L131.72,470.23l117.72-35.32V173.21ZM256,439.8h0Z"/><polygon class="cls-1" points="387.28 479.18 256 439.8 256 164.1 374.15 203.49 387.28 479.18"/><path class="cls-2" d="M387.28,485.74a6.51,6.51,0,0,1-1.88-.28L254.12,446.08a6.57,6.57,0,0,1-4.68-6.29V164.1a6.57,6.57,0,0,1,8.64-6.23l118.15,39.38a6.57,6.57,0,0,1,4.48,5.92l13.13,275.69a6.56,6.56,0,0,1-6.56,6.88ZM262.57,434.91l117.72,35.32L367.81,208.29,262.57,173.21Z"/><polygon class="cls-3" points="505.44 439.8 387.28 479.18 374.15 203.49 479.18 164.1 505.44 439.8"/><path class="cls-2" d="M387.28,485.74a6.57,6.57,0,0,1-6.56-6.25L367.6,203.8a6.57,6.57,0,0,1,4.25-6.46l105-39.38a6.56,6.56,0,0,1,8.84,5.53L512,439.17a6.56,6.56,0,0,1-4.46,6.85L389.36,485.41A6.61,6.61,0,0,1,387.28,485.74ZM380.94,208l12.49,262.26,105-35-24.95-262Z"/><path class="cls-4" d="M357.09,133.91C357.09,189.74,256,321.64,256,321.64S154.91,189.74,154.91,133.91a101.09,101.09,0,0,1,202.17,0Z"/><path class="cls-2" d="M256,332.43l-5.21-6.8c-4.18-5.46-102.44-134.33-102.44-191.73a107.65,107.65,0,1,1,215.3,0c0,57.4-98.26,186.27-102.44,191.73Zm0-293a94.63,94.63,0,0,0-94.52,94.52c0,45.88,74,149.07,94.52,176.79,20.51-27.72,94.52-130.92,94.52-176.79A94.63,94.63,0,0,0,256,39.38Z"/><circle class="cls-5" cx="256" cy="137.85" r="39.38"/><path class="cls-2" d="M256,183.79a45.95,45.95,0,1,1,45.95-45.95A46,46,0,0,1,256,183.79ZM256,105a32.82,32.82,0,1,0,32.82,32.82A32.86,32.86,0,0,0,256,105Z"/></svg>',
  },
};

export const netTypes = {
  tree_net: {
    id: 'tree_net',
    name: 'Tree',
    page: 1,
    svgCode: '<?xml version="1.0" encoding="iso-8859-1"?><svg height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 392.533 392.533" xml:space="preserve"><path style="fill:#FFC10D;" d="M44.25,325.883c-12.347,0-22.432,10.02-22.432,22.432c0,12.412,10.02,22.432,22.432,22.432s22.432-10.02,22.432-22.432C66.683,335.968,56.598,325.883,44.25,325.883z"/><path style="fill:#56ACE0;" d="M196.299,325.883c-12.347,0-22.432,10.02-22.432,22.432c0,12.412,10.02,22.432,22.432,22.432c12.412,0,22.432-10.02,22.432-22.432C218.731,335.968,208.646,325.883,196.299,325.883z"/><g><path style="fill:#FFC10D;" d="M348.347,325.883c-12.347,0-22.432,10.02-22.432,22.432c0,12.412,10.02,22.432,22.432,22.432s22.432-10.02,22.432-22.432C370.78,335.968,360.76,325.883,348.347,325.883z"/><path style="fill:#FFC10D;" d="M196.299,106.537c23.337,0,42.408-19.006,42.408-42.408c0-23.337-19.006-42.343-42.408-42.343c-23.337,0-42.343,19.006-42.343,42.343C153.955,87.531,172.962,106.537,196.299,106.537z"/></g><path style="fill:#194F82;" d="M359.273,305.519v-96.259c0-6.012-4.848-10.925-10.925-10.925H207.224v-70.982c30.19-5.172,53.333-31.547,53.333-63.224C260.557,28.832,231.725,0,196.364,0S132.17,28.832,132.17,64.194c0,31.677,23.079,58.053,53.333,63.224V198.4H44.25c-6.012,0-10.925,4.848-10.925,10.925v96.194c-19.071,4.848-33.293,22.174-33.293,42.796c0,24.372,19.846,44.218,44.218,44.218c24.436,0,44.218-19.846,44.218-44.218c0-20.622-14.222-37.947-33.293-42.796v-85.333h130.133v85.333c-19.071,4.848-33.293,22.174-33.293,42.796c0,24.436,19.846,44.218,44.218,44.218c24.436,0,44.218-19.846,44.218-44.218c0-20.622-14.222-37.947-33.293-42.796v-85.333h130.198v85.333c-19.071,4.848-33.293,22.174-33.293,42.796c0,24.436,19.846,44.218,44.218,44.218c24.436,0,44.218-19.846,44.218-44.218C392.566,327.693,378.343,310.368,359.273,305.519z M44.25,370.747c-12.347,0-22.432-10.02-22.432-22.432c0-12.412,10.02-22.432,22.432-22.432s22.432,10.02,22.432,22.432C66.683,360.727,56.598,370.747,44.25,370.747z M196.299,370.747c-12.347,0-22.432-10.02-22.432-22.432c0-12.412,10.02-22.432,22.432-22.432c12.412,0,22.432,10.02,22.432,22.432C218.731,360.727,208.646,370.747,196.299,370.747z M196.299,21.786c23.337,0,42.408,19.006,42.408,42.343s-19.006,42.408-42.408,42.408c-23.337,0-42.343-19.006-42.343-42.408C153.955,40.792,172.962,21.786,196.299,21.786z M348.347,370.747c-12.347,0-22.432-10.02-22.432-22.432c0-12.412,10.02-22.432,22.432-22.432s22.432,10.02,22.432,22.432C370.78,360.727,360.76,370.747,348.347,370.747z"/></svg>',
  },
  star_net: {
    id: 'star_net',
    name: 'Star',
    page: 1,
    svgCode: '<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 53 53" xml:space="preserve"><rect x="27" y="28" style="fill:#424A60;" width="2" height="18"/><rect x="37.5" y="2.893" transform="matrix(0.7071 0.7071 -0.7071 0.7071 20.8223 -23.2696)" style="fill:#424A60;" width="2" height="21.213"/><rect x="15" y="21.858" transform="matrix(0.7071 0.7071 -0.7071 0.7071 30.1421 -0.7696)" style="fill:#424A60;" width="2" height="28.284"/><rect x="10.722" y="13.5" transform="matrix(0.7071 0.7071 -0.7071 0.7071 15.6716 -8.8345)" style="fill:#424A60;" width="15.556" height="2"/><rect x="26.893" y="32.5" transform="matrix(0.7071 0.7071 -0.7071 0.7071 34.6716 -16.7046)" style="fill:#424A60;" width="21.213" height="2"/><circle style="fill:#43B05C;" cx="48" cy="5" r="5"/><circle style="fill:#7383BF;" cx="28" cy="48" r="5"/><circle style="fill:#57D8AB;" cx="5" cy="46" r="5"/><circle style="fill:#D75A4A;" cx="12" cy="8" r="3"/><circle style="fill:#EBBA16;" cx="44" cy="40" r="3"/><circle style="fill:#4B6DAA;" cx="28" cy="24" r="7"/></svg>',
  },
  nest_net: {
    id: 'nest_net',
    name: 'Nest',
    page: 1,
    svgCode: '<?xml version="1.0" encoding="iso-8859-1"?><svg height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 392.533 392.533" xml:space="preserve"><path style="fill:#FFC10D;" d="M44.25,325.883c-12.347,0-22.432,10.02-22.432,22.432c0,12.412,10.02,22.432,22.432,22.432s22.432-10.02,22.432-22.432C66.683,335.968,56.598,325.883,44.25,325.883z"/><path style="fill:#56ACE0;" d="M196.299,325.883c-12.347,0-22.432,10.02-22.432,22.432c0,12.412,10.02,22.432,22.432,22.432c12.412,0,22.432-10.02,22.432-22.432C218.731,335.968,208.646,325.883,196.299,325.883z"/><g><path style="fill:#FFC10D;" d="M348.347,325.883c-12.347,0-22.432,10.02-22.432,22.432c0,12.412,10.02,22.432,22.432,22.432s22.432-10.02,22.432-22.432C370.78,335.968,360.76,325.883,348.347,325.883z"/><path style="fill:#FFC10D;" d="M196.299,106.537c23.337,0,42.408-19.006,42.408-42.408c0-23.337-19.006-42.343-42.408-42.343c-23.337,0-42.343,19.006-42.343,42.343C153.955,87.531,172.962,106.537,196.299,106.537z"/></g><path style="fill:#194F82;" d="M359.273,305.519v-96.259c0-6.012-4.848-10.925-10.925-10.925H207.224v-70.982c30.19-5.172,53.333-31.547,53.333-63.224C260.557,28.832,231.725,0,196.364,0S132.17,28.832,132.17,64.194c0,31.677,23.079,58.053,53.333,63.224V198.4H44.25c-6.012,0-10.925,4.848-10.925,10.925v96.194c-19.071,4.848-33.293,22.174-33.293,42.796c0,24.372,19.846,44.218,44.218,44.218c24.436,0,44.218-19.846,44.218-44.218c0-20.622-14.222-37.947-33.293-42.796v-85.333h130.133v85.333c-19.071,4.848-33.293,22.174-33.293,42.796c0,24.436,19.846,44.218,44.218,44.218c24.436,0,44.218-19.846,44.218-44.218c0-20.622-14.222-37.947-33.293-42.796v-85.333h130.198v85.333c-19.071,4.848-33.293,22.174-33.293,42.796c0,24.436,19.846,44.218,44.218,44.218c24.436,0,44.218-19.846,44.218-44.218C392.566,327.693,378.343,310.368,359.273,305.519z M44.25,370.747c-12.347,0-22.432-10.02-22.432-22.432c0-12.412,10.02-22.432,22.432-22.432s22.432,10.02,22.432,22.432C66.683,360.727,56.598,370.747,44.25,370.747z M196.299,370.747c-12.347,0-22.432-10.02-22.432-22.432c0-12.412,10.02-22.432,22.432-22.432c12.412,0,22.432,10.02,22.432,22.432C218.731,360.727,208.646,370.747,196.299,370.747z M196.299,21.786c23.337,0,42.408,19.006,42.408,42.343s-19.006,42.408-42.408,42.408c-23.337,0-42.343-19.006-42.343-42.408C153.955,40.792,172.962,21.786,196.299,21.786z M348.347,370.747c-12.347,0-22.432-10.02-22.432-22.432c0-12.412,10.02-22.432,22.432-22.432s22.432,10.02,22.432,22.432C370.78,360.727,360.76,370.747,348.347,370.747z"/></svg>',
  },
  mesh_net: {
    id: 'mesh_net',
    name: 'Mesh',
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M13.8244559,16.2626034 L14.7806078,17.2183397 C14.8650802,17.2024656 14.9522235,17.1941628 15.041306,17.1941628 C15.8161165,17.1941628 16.4442246,17.8222708 16.4442246,18.5970814 C16.4442246,19.3718919 15.8161165,20 15.041306,20 C14.2664954,20 13.6383873,19.3718919 13.6383873,18.5970814 C13.6383873,18.5083626 13.6466225,18.4215673 13.6623702,18.3374181 L12.7060508,17.3810086 L13.8244559,16.2626034 Z M15.041306,4 C15.8161165,4 16.4442246,4.62810806 16.4442246,5.40291862 C16.4442246,6.17772919 15.8161165,6.80583725 15.041306,6.80583725 C14.9522235,6.80583725 14.8650802,6.79753438 14.7806078,6.7816603 L9.56220628,12 L11.9584467,14.3962404 L13.6080468,12.7472999 L14.7260285,13.8659411 L10.3236557,18.2688085 C10.3489017,18.3741132 10.3622722,18.4840358 10.3622722,18.5970814 C10.3622722,19.3718919 9.73416418,20 8.95935362,20 C8.18454305,20 7.55643499,19.3718919 7.55643499,18.5970814 C7.55643499,17.8222708 8.18454305,17.1941628 8.95935362,17.1941628 C9.02337029,17.1941628 9.08638551,17.1984505 9.14812776,17.2067545 L10.840465,15.5148817 L5.66357177,10.3374442 C5.57911344,10.3533127 5.49198531,10.3616127 5.40291862,10.3616127 C4.62810806,10.3616127 4,9.7335046 4,8.95869404 C4,8.18388348 4.62810806,7.55577541 5.40291862,7.55577541 C6.17772919,7.55577541 6.80583725,8.18388348 6.80583725,8.95869404 C6.80583725,9.04777654 6.79753438,9.1349198 6.7816603,9.21939217 L8.44356501,10.8813587 L10.840465,8.48511831 L9.14812776,6.79324552 C9.08638551,6.8015495 9.02337029,6.80583725 8.95935362,6.80583725 C8.18454305,6.80583725 7.55643499,6.17772919 7.55643499,5.40291862 C7.55643499,4.62810806 8.18454305,4 8.95935362,4 C9.73416418,4 10.3622722,4.62810806 10.3622722,5.40291862 C10.3622722,5.51596417 10.3489017,5.62588684 10.3236557,5.73119151 L11.9584467,7.36647704 L13.6623702,5.6625819 C13.6466225,5.57843272 13.6383873,5.49163739 13.6383873,5.40291862 C13.6383873,4.62810806 14.2664954,4 15.041306,4 Z M18.5970814,7.55577541 C19.3718919,7.55577541 20,8.18388348 20,8.95869404 C20,9.7335046 19.3718919,10.3616127 18.5970814,10.3616127 C18.4840358,10.3616127 18.3741132,10.3482421 18.2688085,10.3229961 L16.5919697,12 L18.2688085,13.6770039 C18.3741132,13.6517579 18.4840358,13.6383873 18.5970814,13.6383873 C19.3718919,13.6383873 20,14.2664954 20,15.041306 C20,15.8161165 19.3718919,16.4442246 18.5970814,16.4442246 C17.8222708,16.4442246 17.1941628,15.8161165 17.1941628,15.041306 C17.1941628,14.977429 17.1984318,14.9145491 17.2067002,14.852936 L12.7057466,10.3510594 L13.8243878,9.23241817 L15.4733284,10.8813587 L17.2067002,9.14706397 C17.1984318,9.08545092 17.1941628,9.02257102 17.1941628,8.95869404 C17.1941628,8.18388348 17.8222708,7.55577541 18.5970814,7.55577541 Z M6.57790131,12.7469213 L7.6963065,13.8653265 L6.7816603,14.7806078 C6.79753438,14.8650802 6.80583725,14.9522235 6.80583725,15.041306 C6.80583725,15.8161165 6.17772919,16.4442246 5.40291862,16.4442246 C4.62810806,16.4442246 4,15.8161165 4,15.041306 C4,14.2664954 4.62810806,13.6383873 5.40291862,13.6383873 C5.49163739,13.6383873 5.57843272,13.6466225 5.6625819,13.6623702 L6.57790131,12.7469213 Z" fill="#4285F4" fill-rule="nonzero"></path></g></svg>',
  },
  cloud_net: {
    id: 'cloud_net',
    name: 'Cloud',
    page: 1,
    svgCode: '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:#669df6;fill-rule:evenodd;}.cls-2{fill:#4285f4;}.cls-3{fill:#aecbfa;}</style></defs><g data-name="Product Icons"><g><polygon class="cls-1" points="4.94 13.7 11.53 20.22 12.62 19.07 6.3 12.93 4.94 13.7"/><polygon class="cls-1" points="12.57 4.06 11.48 5.22 17.69 11.44 19.47 11.06 12.57 4.06"/><rect class="cls-2" x="11.38" y="5.13" width="1.25" height="5"/><rect class="cls-2" x="11.38" y="14.5" width="1.25" height="5"/><circle id="Oval" class="cls-3" cx="12" cy="4.5" r="1.88"/><circle class="cls-3" cx="12" cy="19.5" r="1.88"/><polygon class="cls-1" points="2.66 11.38 17.73 11.38 21.37 13.25 6.3 13.25 2.66 11.38"/><circle class="cls-3" cx="4.5" cy="12.31" r="2.5"/><circle class="cls-3" cx="19.5" cy="12.31" r="2.5"/></g></g></svg>',
  },
};

export const initMarkerMapCfg = {
  chartType: 'Marker',
  config: {
    baselayer: ['OSM.Mapnik'],
    overlayer: [],
    latField: 'lat',
    lngField: 'lng',
    toolkit: {
      fullscreen: false,
      seek: false,
      search: false,
      export: false,
      open: false,
      locator: false,
      coordinator: true,
      scale: false,
      player: false,
    },
    marker: {
      cluster: {
        enabled: true,
      },
    },
  },
};

export const initBubbleMapCfg = {
  chartType: 'Bubble',
  config: {
    baselayer: ['OSM.Mapnik'],
    overlayer: [],
    latField: 'lat',
    lngField: 'lng',
    toolkit: {
      fullscreen: false,
      seek: false,
      search: false,
      export: false,
      open: false,
      locator: false,
      coordinator: true,
      scale: false,
      player: false,
    },
    bubble: {
      shape: 'circle',
      sizeScale: [3, 25],
    },
  },
};

export const initHeatMapCfg = {
  chartType: 'Heat',
  config: {
    baselayer: ['OSM.Mapnik'],
    overlayer: [],
    latField: 'lat',
    lngField: 'lng',
    toolkit: {
      fullscreen: false,
      seek: false,
      search: false,
      export: false,
      open: false,
      locator: false,
      coordinator: true,
      scale: false,
      player: false,
    },
    heat: {
      valueField: '',
      scaleRadius: true,
      maxOpacity: 0.8,
    },
  },
};

export const initMovementMapCfg = {
  chartType: 'Movement',
  config: {
    baselayer: ['OSM.Mapnik'],
    overlayer: [],
    latField: 'lat',
    lngField: 'lng',
    toolkit: {
      fullscreen: false,
      seek: false,
      search: false,
      export: false,
      open: false,
      locator: false,
      coordinator: true,
      scale: false,
      player: false,
    },
    movement: {
      color: '#00ffff',
      pulseColor: 'purple',
      weight: 3,
      delay: 600,
      dash: [5, 50],
    },
  },
};


export const initChoroplethMapCfg = {
  chartType: 'Choropleth',
  config: {
    baselayer: ['Stamen.TonerBackground'],
    overlayer: [],
    toolkit: {
      fullscreen: false,
      seek: false,
      search: false,
      export: false,
      open: false,
      locator: false,
      coordinator: true,
      scale: false,
      player: false,
    },
    choropleth: {
      refLayer: 'us-stats.geojson',
      refJoin: ['abbr'],
      colorField: undefined,
      colorSteps: 4,
      colorScale: [],
      fillOpacity: 0.3,
      borderColor: 'gray',
      popup: '{=name}: {=sales}',
    },
  },
};

export const initMigrationMapCfg = {
  chartType: 'Migration',
  config: {
    baselayer: ['OSM.Mapnik'],
    overlayer: [],
    latLngField: ['lat', 'lng'],
    toField: ['toLat', 'toLng'],
    labelFields: ['country', 'store'],
    toolkit: {
      fullscreen: false,
      seek: false,
      search: false,
      export: false,
      open: false,
      locator: false,
      coordinator: true,
      scale: false,
      player: false,
    },
    marker: {
      pulse: true,
      textVisible: false,
      pulseRadius: 20,
    },
    line: {
      width: 2,
      arrowSize: 10,
      colorField: '',
      colorMap: [],
    },
  },
};

export const initTreeNetCfg1 = {
  chartType: 'Tree',
  config: {
    nameField: [],
    relationField: [],
    toolkit: {
      fullscreen: false,
      search: false,
      export: false,
      open: false,
      layout: false,
      player: false,
    },
    cluster: {
      groupable: true,
      collapsible: false,
      compound: false,
    },
    layout: [],
    node: {
      border: {
        width: 1,
        shape: 'circle',
        shapeField: 'relationField',
        shapeMap: [{shape:'circle', value:'country', label:'Country'},{shape:'round-rectangle', value:'region', label:'Region'},{shape:'diamond', value:'store', label:'Store'}],
        color: 'gray',
        colorField: 'sales',
        colorMap: [{color: 'red', value:[0,100], label: 'bad'},{color: 'green', value:[100,10000], label: 'good'},{color: 'blue', value:[10000,999999], label: 'perfect'}],
      },
      icon: {
        size: 24,
        shape: 'user',
        shapeField: 'relationField',
        shapeMap: [],
        color: 'orange',
        colorField: 'sales',
        colorMap: [{color: 'red', value:[0,100], label: 'bad'},{color: 'green', value:[100,10000], label: 'good'},{color: 'blue', value:[10000,999999], label: 'perfect'}],
      },
      background: {
        color: 'white',
        colorField: 'sales',
        colorMap: [],
      },
      label: {
        pos: null,
        size: 10,
        color: 'black',
        wrap: true,
        truncate: false,
      },
      tooltip: undefined,
    },
    edge: {
      outline: {
        width: 2,
        shape: 'solod', // dotted, dashed
        shapeField: 'relationField',
        shapeMap: [{shape:'circle', value:'country', label:'Country'},{shape:'round-rectangle', value:'region', label:'Region'},{shape:'diamond', value:'store', label:'Store'}],
      },
      marker: {
        size: 6,
        shape: 'triangle', // square, circle, diamond, chevron, vee,
        shapeField: 'relationField',
        shapeMap: [{shape:'circle', value:'country', label:'Country'},{shape:'round-rectangle', value:'region', label:'Region'},{shape:'diamond', value:'store', label:'Store'}],
      },
      color: {
        color: 'red',
        colorField: 'sales',
        colorMap: [{color: 'red', value:[0,100], label: 'bad'},{color: 'green', value:[100,10000], label: 'good'},{color: 'blue', value:[10000,999999], label: 'perfect'}],
      },
      arrow: true,
      width: 2,
      widthField: '',
      shape: 'line',
      shapeField: '',
      shapeMap: [],
      colorField: '',
      colorMap: [],
      label: {
        pos: null,
        size: 10,
        color: 'black',
        wrap: true,
        truncate: false,
      },
      tooltip: '{=name}: {=sales}',
    },
    panel: {
      legend: { filterable: false },
      info: { visiable: false },
    },
    interaction: {
      hover: 'tooltip', // tooltip
      selection: 'single', // single, neighbors, zoomed neighbors,
      ctrlSelection: 'shortpath', //show the shortest path (start, via, end), neighbors, zoomed neighbors
      shiftSelection: 'multiple', // mult-selection
      doubleClick: 'collapse/expand', // neighbors, zoomed neighbors,
    },
  },
};

export const initMapInfo = {
  map: undefined,
  cluster: { all: undefined, shape: undefined, color: undefined, legend: undefined },
  heatmapLayer: undefined,
  antPath: undefined,
  choroplethLayer: undefined,
  migrationLayer: undefined,
  ctrlPanel: undefined,
  infoPanel: undefined,
  quadtree: undefined,
  toolkit: {
    fullscreen: undefined,
    seek: undefined,
    search: undefined,
    export: undefined,
    open: undefined,
    locator: undefined,
    scale: undefined,
    coordinator: undefined,
    player: undefined,
    timeline: undefined,
  },
  file: {
    name: undefined,
    type: undefined,
    data: undefined,
    layer: undefined,
  },
};

export const initNetInfo = {
  element: { nodes: [], edges: [] },
  goDiagram: undefined,
  goModel: undefined,
  layout: undefined,
  panzoom: undefined,
  dataFile: undefined,
};

export const pointsData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        start: "1981-01-01",
        end: "1983-12-31",
      },
      geometry: {
        type: "Point",
        coordinates: [122.34374999999999, 68.13885164925573],
      },
    },
    {
      type: "Feature",
      properties: {
        start: "1981-01-01",
        end: "1984-12-31",
      },
      geometry: {
        type: "Point",
        coordinates: [132.1875, 49.15296965617039],
      },
    },
    {
      type: "Feature",
      properties: {
        start: "1988-01-01",
        end: "1989-12-31",
      },
      geometry: {
        type: "Point",
        coordinates: [90, 65.5129625532949],
      },
    },
    {
      type: "Feature",
      properties: {
        start: "1990-01-01",
        end: "1991-12-31",
      },
      geometry: {
        type: "Point",
        coordinates: [79.98046875, 53.4357192066942],
      },
    },
    {
      type: "Feature",
      properties: {
        start: "1991-01-01",
        end: "1992-12-31",
      },
      geometry: {
        type: "Point",
        coordinates: [-24.609375, 49.61070993807422],
      },
    },
    {
      type: "Feature",
      properties: {
        start: "1993-01-01",
        end: "1993-07-01",
      },
      geometry: {
        type: "Point",
        coordinates: [-94.21875, 24.5271348225978],
      },
    },
    {
      type: "Feature",
      properties: {
        start: "1994-01-01",
        end: "1994-12-31",
      },
      geometry: {
        type: "Point",
        coordinates: [35.15625, 43.58039085560786],
      },
    },
    {
      type: "Feature",
      properties: {
        start: "1996-01-01",
        end: "1997-01-01",
      },
      geometry: {
        type: "Point",
        coordinates: [39.375, -33.7243396617476],
      },
    },
    {
      type: "Feature",
      properties: {
        start: "1997-01-01",
        end: "1997-12-31",
      },
      geometry: {
        type: "Point",
        coordinates: [-31.640625, -13.2399454992863],
      },
    },
    {
      type: "Feature",
      properties: {
        start: "1999-01-01",
        end: "2000-01-01",
      },
      geometry: {
        type: "Point",
        coordinates: [122.34374999999999, -34.88593094075315],
      },
    },
  ],
};
