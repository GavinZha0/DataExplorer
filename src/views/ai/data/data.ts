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
    title: t('common.table.title.status'),
    dataIndex: 'status',
    width: 180,
    filters: [
      { text: 'Serving', value: '1' },
      { text: 'Unavailable', value: '0' },
    ],
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


// model form schema
export const formModelSchema: FormSchema[] = [
  {
    field: 'transform',
    label: t('ai.data.form.model.transform'),
    component: 'Switch',
    defaultValue: false,
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'search',
    component: 'Input',
    componentProps: {
      placeholder: t('ai.data.form.model.search'),
    },
    label: '',
    colProps: { span: 24 }
  },
  {
    field: 'models',
    component: 'Input',
    label: '',
    slot: 'modelList',
  }
];

// chart form schema
export const formHistorySchema: FormSchema[] = [
  {
    field: 'trials',
    label: '',
    component: 'Input',
    slot: 'trials',
    labelWidth: 100,
    colProps: { span: 24 }
  }
];