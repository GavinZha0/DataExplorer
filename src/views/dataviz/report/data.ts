import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();
export const indexColumns: BasicColumn[] = [
  {
    title: t('common.table.title.name'),
    dataIndex: 'name',
    width: 200,
    align: 'left',
    sorter: true,
  },
  {
    title: t('common.table.title.desc'),
    dataIndex: 'desc',
    align: 'left',
  },
  {
    title: t('common.table.title.type'),
    dataIndex: 'type',
    width: 100,
    align: 'left',
  },
  {
    title: t('common.table.title.group'),
    dataIndex: 'group',
    width: 150,
    align: 'left',
    sorter: true,
  },
  {
    title: t('dataviz.datareport.table.title.pages'),
    dataIndex: 'pageCount',
    align: 'left',
    width: 100,
  },
  {
    title: t('dataviz.datareport.table.title.menu'),
    dataIndex: 'menuName',
    align: 'left',
  },
  {
    title: t('common.table.title.public'),
    dataIndex: 'pubFlag',
    width: 80,
    //slots: { customRender: 'active' },
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
    ifShow: false,
  },
  {
    field: 'name',
    label: t('common.table.title.name'),
    required: true,
    component: 'Input',
  },
  {
    field: 'desc',
    label: t('common.table.title.desc'),
    component: 'Input',
  },
  {
    field: 'group',
    label: t('common.table.title.group'),
    component: 'Input',
    slot: 'group',
  },
  {
    field: 'type',
    label: t('common.table.title.type'),
    component: 'Input',
  },
  {
    field: 'createdBy',
    label: t('common.table.title.created_by'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
  },
  {
    field: 'createdAt',
    label: t('common.table.title.create_time'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
  },
  {
    field: 'updatedBy',
    label: t('common.table.title.updated_by'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
  },
  {
    field: 'updatedAt',
    label: t('common.table.title.update_time'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
  },
];

// config form schema
export const formConfigSchema: FormSchema[] = [
  {
    field: 'ratio',
    component: 'Input',
    label: t('dataviz.datareport.form.config.ratio'),
    colProps: { span: 24 },
    labelWidth: 80,
    componentProps: {
      placeholder: 'Width x Height',
    },
  },
  {
    field: 'title',
    component: 'Input',
    label: t('dataviz.datareport.form.config.title'),
    colProps: { span: 24 },
    labelWidth: 80,
    componentProps: {
      placeholder: 'Page Title',
    },
  },
  {
    field: 'layout',
    component: 'Select',
    label: t('dataviz.datareport.form.config.layout'),
    colProps: { span: 24 },
    labelWidth: 80,
    componentProps: {
      placeholder: 'Views layout',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Zoom', value: 'zoom' },
        { label: 'Resizable', value: 'resizable' },
        { label: 'Thumbnail', value: 'thumbnail' },
      ],
    },
  },
  {
    field: 'border',
    component: 'Select',
    label: t('dataviz.datareport.form.config.border'),
    colProps: { span: 24 },
    labelWidth: 80,
    componentProps: {
      options: [
        { label: 'Dotted', value: 'dotted' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Solid', value: 'solid' },
      ],
    },
  },
  {
    field: 'label',
    component: 'Switch',
    label: t('dataviz.datareport.form.config.label'),
    colProps: { span: 14 },
    labelWidth: 80,
  },
  {
    field: 'toolbar',
    component: 'Switch',
    label: t('dataviz.datareport.form.config.toolbar'),
    colProps: { span: 10 },
    labelWidth: 80,
  },
  {
    field: 'interval',
    component: 'InputNumber',
    label: t('dataviz.datareport.form.config.interval'),
    colProps: { span: 24 },
    labelWidth: 80,
    componentProps: {
      addonAfter: 'min',
      placeholder: 'Refresh Interval',
      min: 0,
      max: 1440,
    },
  },
  {
    field: 'comment',
    label: t('dataviz.datareport.form.config.comment'),
    component: 'InputTextArea',
    labelWidth: 80,
    colProps: { span: 24 },
    componentProps: {
      maxlength: 128,
      autoSize: { minRows: 1, maxRows: 4 },
    },
  },
];

export const publishFormSchema: FormSchema[] = [
  {
    field: 'publishPub',
    component: 'Switch',
    label: t('dataviz.datareport.publish.pub'),
    colProps: { span: 8 },
    labelWidth: 60,
  },
  {
    field: 'publishPages',
    component: 'InputNumber',
    label: t('dataviz.datareport.publish.range'),
    colProps: { span: 16 },
    labelWidth: 80,
    componentProps: {
      placeholder: 'First x pages',
      min: 0,
      max: 99,
    },
  },
  {
    field: 'menuId',
    label: '',
    slot: 'menu',
    component: 'Input',
  },
];
