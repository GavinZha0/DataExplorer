import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();
export const indexColumns: BasicColumn[] = [
  {
    title: t('common.table.title.type'),
    dataIndex: 'type',
    width: 80,
    filters: [
      { text: 'MySQL', value: 'MySQL' },
      { text: 'MariaDB', value: 'MariaDB' },
      { text: 'Vertica', value: 'Vertica' },
      { text: 'SQLite', value: 'SQLite' },
      { text: 'PostgreSQL', value: 'PostgreSQL' },
      { text: 'CSV', value: 'CSV' },
      { text: 'JSON', value: 'JSON' },
    ],
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
    width: 400,
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
    title: t('datamgr.datasource.table.title.url'),
    dataIndex: 'url',
    align: 'left',
    resizable: true,
  },
  {
    title: t('datamgr.datasource.table.title.version'),
    dataIndex: 'version',
    width: 100,
    align: 'left',
    resizable: true,
  },
  {
    title: t('datamgr.datasource.table.title.usage'),
    dataIndex: 'usage',
    width: 80,
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

export const infoFormSchema: FormSchema[] = [
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
    required: true,
    component: 'Select',
    labelWidth: 80,
    colProps: { span: 24 },
    componentProps: {
      options: [
        { label: 'MySQL', value: 'mysql' },
        { text: 'MariaDB', value: 'mariadb' },
        { text: 'Vertica', value: 'vertica' },
        { text: 'SQLite', value: 'sqlite' },
        { text: 'PostgreSQL', value: 'postgresql' },
        { label: 'S3 Bucket', value: 's3bucket' },
        { label: 'BuildIn', value: 'buildin' },
      ],
    },
  },
  {
    field: 'url',
    label: t('datamgr.datasource.table.title.url'),
    required: true,
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
    componentProps: {
      placeholder: t('datamgr.datasource.form.placeholder.url'),
    },
  },
  {
    field: 'username',
    label: t('datamgr.datasource.table.title.username'),
    component: 'Input',
    required: true,
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'password',
    label: t('datamgr.datasource.table.title.password'),
    component: 'InputPassword',
    required: true,
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'version',
    label: t('datamgr.datasource.table.title.version'),
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'params',
    label: '', //t('datamgr.datasource.table.title.params'),
    component: 'Input',
    slot: 'params',
    colProps: { span: 24 },
  },
  {
    field: 'pubFlag',
    label: t('common.table.title.public'),
    component: 'Input',
    show: false,
  },
  {
    field: 'locked',
    label: t('datamgr.datasource.table.action.lock'),
    component: 'Input',
    show: false,
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

export const paramColumns: BasicColumn[] = [
  {
    title: t('datamgr.datasource.table.title.param'),
    dataIndex: 'name',
    width: 100,
    align: 'left',
    edit: true,
  },
  {
    title: t('datamgr.datasource.table.title.value'),
    dataIndex: 'value',
    width: 60,
    align: 'left',
    edit: true,
  },
];

export const lockFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: t('common.table.title.id'),
    component: 'Input',
    show: false,
  },
  {
    field: 'locked',
    label: '', // keep empty
    slot: 'locked',
    component: 'Input',
  },
];
