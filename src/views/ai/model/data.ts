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
    align: 'left',
  },
  {
    title: t('common.table.title.category'),
    dataIndex: 'category',
    key: 'category',
    width: 150,
    sorter: true,
    align: 'left',
  },
  {
    title: t('ai.model.table.title.tags'),
    dataIndex: 'tags',
    key: 'tags',
    align: 'left',
  },
  {
    title: t('common.table.title.framework'),
    dataIndex: 'framework',
    key: 'framework',
    width: 120,
    sorter: true,
  },
  {
    title: t('ai.model.table.title.network'),
    dataIndex: 'network',
    key: 'network',
    width: 100,
    sorter: true,
  },
  {
    title: t('ai.model.table.title.evaluation'),
    dataIndex: 'evaluation',
    key: 'evaluation',
    align: 'left',
  },
  {
    title: t('common.table.title.rate'),
    dataIndex: 'rate',
    key: 'rate',
    width: 150,
    sorter: true,
  },
  {
    title: t('common.table.title.usage'),
    dataIndex: 'usage',
    key: 'usage',
    width: 80,
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
    field: 'category',
    label: t('common.table.title.category'),
    component: 'Select',
    labelWidth: 80,
    colProps: { span: 24 },
    componentProps: {
      options: [
        { label: 'image', value: 'Image' },
        { label: 'audio', value: 'Audio' },
        { label: 'video', value: 'Video' },
        { label: 'text', value: 'Text' },
        { label: 'data', value: 'Data' },
        { label: 'security', value: 'Security' }
      ],
    },
  },
  {
    field: 'tags',
    label: t('ai.model.table.title.tags'),
    required: true,
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'version',
    label: t('common.table.title.version'),
    required: true,
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'price',
    label: t('ai.model.table.title.price'),
    required: true,
    component: 'Input',
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
    field: 'framework',
    label: t('ai.model.table.title.framework'),
    required: true,
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'frameVer',
    label: t('ai.model.table.title.frame_ver'),
    required: true,
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'trainset',
    label: t('ai.model.table.title.trainset'),
    required: true,
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'input',
    label: t('ai.model.table.title.input'),
    required: true,
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'output',
    label: t('ai.model.table.title.output'),
    required: true,
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'evaluation',
    label: t('ai.model.table.title.evaluation'),
    required: true,
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'score',
    label: t('ai.model.table.title.score'),
    required: true,
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'files',
    label: t('ai.model.table.title.files'),
    required: true,
    slot: 'files',
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
  },
];
