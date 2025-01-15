import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { API_ORG_OPTIONS } from '/@/api/admin/org';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('common.table.title.name'),
    dataIndex: 'name',
    align: 'left',
    resizable: true
  },
  {
    title: t('common.table.title.desc'),
    dataIndex: 'desc',
    align: 'left',
    resizable: true
  },
  {
    title: t('admin.org.table.title.logo'),
    dataIndex: 'logo',
    width: 100,
    resizable: true
  },
  {
    title: t('admin.org.table.title.users'),
    width: 100,
    dataIndex: 'userCount',
    resizable: true
  },
  {
    title: t('common.table.title.exp_date'),
    dataIndex: 'expDate',
    width: 150,
    resizable: true
  },
  {
    title: t('common.table.title.active'),
    dataIndex: 'active',
    width: 80,
    filters: [
      { text: 'true', value: 'true' },
      { text: 'false', value: 'false' },
    ],
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
    field: 'logo',
    label: t('admin.org.table.title.logo'),
    component: 'IconPicker',
  },
  {
    field: 'name',
    label: t('common.table.title.name'),
    component: 'Input',
    required: true,
  },
  {
    label: t('common.table.title.desc'),
    field: 'desc',
    component: 'Input',
  },
  {
    field: 'pid',
    component: 'ApiTreeSelect',
    label: t('admin.org.table.title.parent'),
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
    field: 'expDate',
    label: t('common.table.title.exp_date'),
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
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
