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
    width: 200,
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
    title: t('ai.model.table.title.area'),
    dataIndex: 'area',
    key: 'area',
    width: 70,
    sorter: true,
    align: 'left',
  },
  {
    title: t('ai.model.table.title.tags'),
    dataIndex: 'tags',
    key: 'tags',
    width: 200,
    align: 'left',
  },
  {
    title: t('ai.model.table.title.algo'),
    dataIndex: 'algoName',
    key: 'algo',
    width: 180,
    sorter: true,
    align: 'left'
  },
  {
    title: t('common.table.title.version'),
    dataIndex: 'version',
    key: 'version',
    width: 80
  },
  {
    title: t('ai.model.table.title.eval'),
    dataIndex: 'eval',
    key: 'eval',
    align: 'left',
    width: 110,
  },
  {
    title: t('ai.model.table.title.deployTo'),
    dataIndex: 'deployTo',
    key: 'deployTo',
    align: 'left',
    width: 90,
  },
  {
    title: t('ai.model.table.title.endpoint'),
    dataIndex: 'endpoint',
    key: 'endpoint',
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
  },
  {
    field: 'desc',
    label: t('common.table.title.desc'),
    component: 'InputTextArea',
    componentProps: {
      maxlength: 128,
      autoSize: { minRows: 1, maxRows: 4 },
    },
  },
  {
    field: 'area',
    label: t('ai.model.table.title.area'),
    component: 'Select',
    labelWidth: 100,
    colProps: { span: 24 },
    required: true,
    componentProps: {
      options: [
        { label: 'Data', value: 'data' },
        { label: 'Image', value: 'image' },
        { label: 'Audio', value: 'audio' },
        { label: 'Video', value: 'video' },
        { label: 'Text', value: 'text' },
        { label: 'Security', value: 'security' }
      ],
    },
  },
  {
    field: 'tags',
    label: t('ai.model.table.title.tags'),
    component: 'Select',
    labelWidth: 100,
    colProps: { span: 24 },
    componentProps: {
      mode: "tags"
    }
  },
  {
    field: 'deployTo',
    label: t('ai.model.table.title.deployTo'),
    component: 'Select',
    defaultValue: 'MlFlow',
    labelWidth: 100,
    colProps: { span: 24 },
    componentProps: {
      options: [
        { label: 'MLflow', value: 'MLflow' },
        { label: 'Ray', value: 'Ray' },
        { label: 'Docker', value: 'Docker' },
        { label: 'K8s', value: 'K8s' },
        { label: 'Databricks', value: 'Databricks' },
        { label: 'Segemaker', value: 'Segemaker' },
      ],
    },
  },
  {
    field: 'endpoint',
    label: t('ai.model.table.title.endpoint'),
    defaultValue: 'http://127.0.0.1:7788/invocations',
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'rate',
    label: t('ai.model.table.title.rate'),
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'price',
    label: t('ai.model.table.title.price'),
    component: 'Input',
    labelWidth: 100,
    colProps: { span: 24 },
  },
  {
    field: 'input',
    label: t('ai.model.table.title.input'),
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
    dynamicDisabled: () => true,
  },
  {
    field: 'output',
    label: t('ai.model.table.title.output'),
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
    dynamicDisabled: () => true,
  },
  {
    field: 'evaluation',
    label: t('ai.model.table.title.eval'),
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
    dynamicDisabled: () => true,
  },
  {
    field: 'trainedBy',
    label: t('ai.model.table.title.trained_by'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 100,
    colProps: { span: 24 },
  },
  {
    field: 'trainedAt',
    label: t('ai.model.table.title.trained_at'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 100,
    colProps: { span: 24 },
  },
  {
    field: 'createdBy',
    label: t('ai.model.table.title.created_by'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 100,
    colProps: { span: 24 },
  },
  {
    field: 'createdAt',
    label: t('ai.model.table.title.created_at'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 100,
    colProps: { span: 24 },
  },
  {
    field: 'deployedBy',
    label: t('ai.model.table.title.deployed_by'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 100,
    colProps: { span: 24 },
  },
  {
    field: 'deployedAt',
    label: t('ai.model.table.title.deployed_at'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 100,
    colProps: { span: 24 },
  }
];

