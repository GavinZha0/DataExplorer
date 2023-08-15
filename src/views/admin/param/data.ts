import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('common.table.title.name'),
    dataIndex: 'name',
    width: 200,
    sorter: true,
  },
  {
    title: t('common.table.title.desc'),
    dataIndex: 'desc',
  },
  {
    title: t('common.table.title.group'),
    dataIndex: 'group',
    width: 200,
    sorter: true,
  },
  {
    title: t('admin.param.table.title.module'),
    dataIndex: 'module',
    width: 200,
    sorter: true,
  },
  {
    title: t('common.table.title.type'),
    dataIndex: 'type',
    width: 150,
    //slots: { customRender: 'roles' },
  },
  {
    title: t('admin.param.table.title.value'),
    dataIndex: 'value',
    //slots: { customRender: 'roles' },
  },
  {
    title: t('admin.param.table.title.previous'),
    dataIndex: 'previous',
  },
];

export const formSchema: FormSchema[] = [
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
    component: 'Input',
  },
  {
    field: 'group',
    label: t('common.table.title.group'),
    component: 'Input',
  },
  {
    field: 'module',
    label: t('admin.param.table.title.module'),
    required: true,
    component: 'Input',
  },
  {
    field: 'type',
    label: t('common.table.title.type'),
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: 'Number', value: '0' },
        { label: 'String', value: '1' },
        { label: 'Bool', value: '2' },
        { label: '[Number]', value: '3' },
        { label: '[String]', value: '4' },
        { label: '[Bool]', value: '5' },
        { label: 'JSON', value: '6' },
        { label: '[JSON]', value: '7' },
      ],
    },
  },
  {
    field: 'value',
    label: t('admin.param.table.title.value'),
    component: 'Input',
    required: true,
  },
  {
    field: 'previous',
    label: t('admin.param.table.title.previous'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
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
