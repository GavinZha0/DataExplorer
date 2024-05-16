import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

// index form columns
export const indexColumns: BasicColumn[] = [
  {
    title: t('common.table.title.type'),
    dataIndex: 'type',
    key: 'type',
    width: 80,
    sorter: true,
  },
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
    title: t('ml.algorithm.table.title.framework'),
    dataIndex: 'framework',
    width: 150,
    sorter: true,
  },
  {
    title: t('ml.algorithm.table.title.frame_ver'),
    dataIndex: 'frameVer',
    width: 180,
    sorter: true,
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

// info form schema
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
    labelWidth: 200,
    colProps: { span: 24 },
  },
  {
    field: 'desc',
    label: t('common.table.title.desc'),
    component: 'InputTextArea',
    labelWidth: 200,
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
    labelWidth: 200,
    colProps: { span: 24 },
  },
  {
    field: 'type',
    label: t('common.table.title.type'),
    required: true,
    component: 'Select',
    defaultValue: 'clf',
    componentProps: {
      allowClear: false,
      options: [
        { label: t('ml.algorithm.form.info.type.clf'), value: 'clf' },
        { label: t('ml.algorithm.form.info.type.reg'), value: 'reg' },
        { label: t('ml.algorithm.form.info.type.cluster'), value: 'cluster' }
      ],
    },
    labelWidth: 200,
    colProps: { span: 24 }
  },
  {
    field: 'framework',
    label: t('ml.algorithm.table.title.framework'),
    required: true,
    defaultValue: 'python',
    component: 'Select',
    componentProps: {
      allowClear: false,
      options: [
        { label: t('ml.algorithm.form.info.framework.python'), value: 'python' },
        { label: t('ml.algorithm.form.info.framework.sklearn'), value: 'sklearn' },
        { label: t('ml.algorithm.form.info.framework.pytorch'), value: 'pytorch' },
        { label: t('ml.algorithm.form.info.framework.tensorflow'), value: 'tensorflow' },
        { label: t('ml.algorithm.form.info.framework.java'), value: 'java' },
        { label: t('ml.algorithm.form.info.framework.js'), value: 'js' }
      ],
    },
    labelWidth: 200,
    colProps: { span: 24 }
  },
  {
    field: 'frameVer',
    component: 'Input',
    label: t('ml.algorithm.table.title.frame_ver'),
    labelWidth: 200,
    colProps: { span: 24 },
  },
  {
    field: 'createdBy',
    label: t('common.table.title.created_by'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 200,
    colProps: { span: 24 },
  },
  {
    field: 'createdAt',
    label: t('common.table.title.create_time'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 200,
    colProps: { span: 24 },
  },
  {
    field: 'updatedBy',
    label: t('common.table.title.updated_by'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 200,
    colProps: { span: 24 },
  },
  {
    field: 'updatedAt',
    label: t('common.table.title.update_time'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 200,
    colProps: { span: 24 },
  }
];

// config form schema
export const formConfigSchema: FormSchema[] = [
  {
    field: 'trainFunc',
    label: t('ml.algorithm.form.config.train'),
    defaultValue: 'fit',
    component: 'Input',
    labelWidth: 200,
    colProps: { span: 24 },
  },
  {
    field: 'predictFunc',
    label: t('ml.algorithm.form.config.predict'),
    defaultValue: 'predict',
    component: 'Input',
    labelWidth: 200,
    colProps: { span: 24 },
  },
  {
    field: 'dataset',
    label: t('ml.algorithm.form.config.dataset'),
    required: true,
    component: 'Input',
    slot: 'dataset',
    labelWidth: 200,
    colProps: { span: 24 },
  },
  {
    field: 'testRatio',
    label: t('ml.algorithm.form.config.test_ratio'),
    component: 'InputNumber',
    defaultValue: 0.3,
    componentProps: {
      min: 0,
      max: 1,
      step: 0.1,
    },
    labelWidth: 200,
    colProps: { span: 24 }
  },
  {
    field: 'timeout',
    label: t('ml.algorithm.form.config.timeout'),
    defaultValue: 1,
    component: 'InputNumber',
    componentProps: {
      min: 0,
      max: 60
    },
    labelWidth: 200,
    colProps: { span: 24 },
  },
  {
    field: 'metric',
    label: t('ml.algorithm.form.config.metric.title'),
    component: 'Select',
    defaultValue: 'accuracy',
    componentProps: {
      options: [
        { label: t('ml.algorithm.form.config.metric.accuracy'), value: 'accuracy' },
        { label: t('ml.algorithm.form.config.metric.auc'), value: 'auc' },
        { label: t('ml.algorithm.form.config.metric.mse'), value: 'mse' }
      ],
    },
    labelWidth: 200,
    colProps: { span: 24 }
  },
  {
    field: 'initParms',
    label: t('ml.algorithm.form.config.init'),
    component: 'InputTextArea',
    componentProps: {
      maxlength: 255,
      autoSize: { minRows: 4, maxRows: 8 },
    },
    labelWidth: 200,
    colProps: { span: 24 }
  }
];

// chart form schema
export const formChartSchema: FormSchema[] = [
  {
    field: 'progress',
    label: t('ml.algorithm.form.chart.progress'),
    component: 'Input',
    slot: 'progress',
    labelWidth: 200,
    colProps: { span: 12 }
  },
  {
    field: 'accuracy',
    label: t('ml.algorithm.form.chart.accuracy'),
    component: 'Input',
    slot: 'accuracy',
    labelWidth: 200,
    colProps: { span: 12 }
  }
];

// chart form schema
export const formHistorySchema: FormSchema[] = [
  {
    field: 'succOnly',
    label: t('ml.algorithm.form.history.succOnly'),
    defaultValue: true,
    component: 'Switch',
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'experment',
    label: '',
    component: 'Input',
    slot: 'experment',
    labelWidth: 100,
    colProps: { span: 24 }
  }
];