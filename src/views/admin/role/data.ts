import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { API_ORG_OPTIONS } from '/@/api/admin/org';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('common.table.title.name'),
    dataIndex: 'name',
    sorter: true,
    align: 'left',
    width: 200,
  },
  {
    title: t('common.table.title.desc'),
    dataIndex: 'desc',
    align: 'left',
  },
  {
    title: t('common.table.title.org'),
    dataIndex: 'orgName',
    align: 'left',
    sorter: true,
  },
  {
    title: t('admin.role.table.title.users'),
    dataIndex: 'userCount',
    sorter: true,
    width: 100,
  },
  {
    title: t('common.table.title.active'),
    dataIndex: 'active',
    width: 80,
    //slots: { customRender: 'active' },
    filters: [
      { text: 'true', value: 'true' },
      { text: 'false', value: 'false' },
    ],
  },
];

export const roleFormSchema: FormSchema[] = [
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
    field: 'orgId',
    component: 'ApiTreeSelect',
    label: t('admin.user.panel.org'),
    required: true,
    componentProps: {
      api: API_ORG_OPTIONS,
      resultField: 'records',
      fieldNames: {
        key: 'id',
        label: 'name',
        value: 'id',
      },
    },
  },
  {
    field: 'active',
    label: t('common.table.title.active'),
    component: 'Input',
    show: false,
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

export const userFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: t('common.table.title.id'),
    component: 'Input',
    show: false,
  },
  {
    field: 'user',
    label: '', // keep empty
    slot: 'user',
    component: 'Input',
  },
];

export const menuFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: t('common.table.title.id'),
    component: 'Input',
    show: false,
  },
  {
    field: 'menu',
    label: '', // keep empty
    slot: 'menu',
    component: 'Input',
  },
];
