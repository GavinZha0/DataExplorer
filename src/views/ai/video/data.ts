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
    width: 180,
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
    title: t('common.table.title.type'),
    dataIndex: 'type',
    key: 'type',
    width: 150,
    sorter: true,
  },
  {
    title: t('common.table.title.platform'),
    dataIndex: 'platform',
    width: 150,
    sorter: true,
  },
  {
    title: t('common.table.title.area'),
    dataIndex: 'area',
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
