import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Icon } from '/@/components/Icon';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('common.table.title.name'),
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: t('admin.menu.table.title.title'),
    dataIndex: 'title',
    width: 200,
    align: 'left',
  },
  {
    title: t('admin.menu.table.title.icon'),
    dataIndex: 'icon',
    width: 80,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: t('admin.menu.table.title.component'),
    dataIndex: 'component',
    align: 'left',
  },
  {
    title: t('admin.menu.table.title.path'),
    dataIndex: 'path',
    align: 'left',
  },
  {
    title: t('admin.menu.table.title.redirect'),
    dataIndex: 'redirect',
    align: 'left',
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

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: t('common.table.title.id'),
    component: 'Input',
    show: false,
  },
  {
    field: 'pid',
    label: t('admin.menu.table.title.parent'),
    component: 'Input',
    show: false,
  },
  {
    field: 'pname',
    label: t('admin.menu.table.title.parent'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => !values.id,
  },
  {
    field: 'name',
    label: t('common.table.title.name'),
    component: 'Input',
    required: true,
  },
  {
    field: 'title',
    label: t('admin.menu.table.title.title'),
    component: 'Input',
    required: true,
  },
  {
    field: 'icon',
    label: t('admin.menu.table.title.icon'),
    component: 'IconPicker',
  },
  {
    field: 'pos',
    label: t('admin.menu.table.title.pos'),
    component: 'InputNumber',
  },
  {
    field: 'component',
    label: t('admin.menu.table.title.component'),
    component: 'Input',
    required: true,
  },
  {
    field: 'path',
    label: t('admin.menu.table.title.path'),
    component: 'Input',
    required: true,
  },
  {
    field: 'redirect',
    label: t('admin.menu.table.title.redirect'),
    component: 'Input',
  },
  {
    field: 'isExt',
    label: '是否外链',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
    },
  },

  {
    field: 'keepalive',
    label: '是否缓存',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
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
