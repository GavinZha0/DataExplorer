import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

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
    title: t('ml.dataset.table.title.features'),
    dataIndex: 'fields',
    align: 'left',
    resizable: true,
  },
  {
    title: t('ml.dataset.table.title.target'),
    dataIndex: 'target',
    align: 'left',
    width: 100,
    resizable: true,
  },
  {
    title: t('ml.dataset.table.title.source'),
    dataIndex: 'sourceName',
    align: 'left',
    sorter: true,
    width: 200,
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
    width: 150,
    resizable: true,
    align: 'left'
  },
  {
    title: t('ml.dataset.tab.stats.dataType'),
    dataIndex: 'type',
    width: 80,
    align: 'left',
    resizable: true
  },
  {
    title: t('ml.dataset.tab.stats.unique'),
    dataIndex: 'unique',
    width: 80,
    align: 'left',
    resizable: true
  },
  {
    title: t('ml.dataset.tab.stats.missing'),
    dataIndex: 'missing',
    width: 90,
    sorter: true,
    align: 'left',
    customRender11: ({ record }) => {
      if (record && record.missing >= 0) {
        return { style: { backgroundColor: 'yellow' } };
      }
    },
    resizable: true
  },
  {
    title: t('ml.dataset.tab.stats.min'),
    dataIndex: 'min',
    width: 90,
    sorter: true,
    align: 'left',
    resizable: true
  },
  {
    title: t('ml.dataset.tab.stats.pct25'),
    dataIndex: 'pct25',
    width: 90,
    sorter: true,
    align: 'left',
    resizable: true
  },
  {
    title: t('ml.dataset.tab.stats.median'),
    dataIndex: 'median',
    width: 90,
    sorter: true,
    align: 'left',
    resizable: true
  },
  {
    title: t('ml.dataset.tab.stats.mean'),
    dataIndex: 'mean',
    width: 90,
    sorter: true,
    align: 'left',
    resizable: true
  },
  {
    title: t('ml.dataset.tab.stats.pct75'),
    dataIndex: 'pct75',
    width: 90,
    sorter: true,
    align: 'left',
    resizable: true
  },
  {
    title: t('ml.dataset.tab.stats.max'),
    dataIndex: 'max',
    width: 90,
    sorter: true,
    align: 'left',
    resizable: true
  },
  {
    title: t('ml.dataset.tab.stats.std'),
    dataIndex: 'std',
    width: 90,
    sorter: true,
    align: 'left',
    resizable: true
  },
  {
    title: t('ml.dataset.tab.stats.variance'),
    dataIndex: 'variance',
    width: 90,
    sorter: true,
    align: 'left',
    customCell: ({ record }) => {
      if (record && record.variance == 0) {
        return { style: { backgroundColor: 'yellow' } };
      }
    },
    resizable: true
  },
];

// Table fields
export const tableColumns: BasicColumn[] = [
  {
    title: t('dataviz.dataset.table.title.field'),
    dataIndex: 'name',
    width: 120,
    align: 'left',
    resizable: true,
  },
  {
    title: t('common.table.title.type'),
    dataIndex: 'type',
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

export const varModalSchemas: FormSchema[] = [
  {
    field: 'type',
    label: t('dataviz.dataset.form.var.type'),
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: t('dataviz.dataset.form.var.cat.number'), value: 'number' },
        { label: t('dataviz.dataset.form.var.cat.string'), value: 'string' },
        { label: t('dataviz.dataset.form.var.cat.bool'), value: 'bool' },
        { label: t('dataviz.dataset.form.var.cat.ts'), value: 'timestamp' },
        { label: t('dataviz.dataset.form.var.cat.arrayN'), value: '[number]' },
        { label: t('dataviz.dataset.form.var.cat.arrayS'), value: '[string]' },
      ],
    },
    colProps: { span: 24 },
  },
  {
    field: 'name',
    component: 'Input',
    required: true,
    label: t('dataviz.dataset.form.var.name'),
    colProps: { span: 24 },
  },
  {
    field: 'value',
    component: 'Input',
    required: true,
    label: t('dataviz.dataset.form.var.value'),
    colProps: { span: 24 },
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
