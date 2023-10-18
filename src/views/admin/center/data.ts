import { FormSchema } from '/@/components/Form/index';
import { useI18n } from '/@/hooks/web/useI18n';
import { BasicColumn } from '/@/components/Table';
import { API_USER_OPTIONS } from '/@/api/admin/user';

const { t } = useI18n();
export interface ListItem {
  key: string;
  title: string;
  description: string;
  extra?: string;
  avatar?: string;
  color?: string;
}

// base info
export const baseSchema: FormSchema[] = [
  {
    field: 'id',
    label: t('common.table.title.id'),
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: t('common.table.title.name'),
    component: 'Input',
    show: false,
  },
  {
    field: 'realname',
    label: t('admin.user.table.title.realname'),
    required: true,
    component: 'Input',
  },
  {
    field: 'orgName',
    component: 'Input',
    label: t('admin.user.table.title.org'),
    dynamicDisabled: () => true,
  },
  {
    field: 'expDate',
    component: 'Input',
    label: t('common.table.title.exp_date'),
    dynamicDisabled: () => true,
  },
  {
    field: 'createdAt',
    label: t('common.table.title.create_time'),
    component: 'Input',
    dynamicDisabled: () => true,
  },
  {
    field: 'desc',
    label: t('common.table.title.desc'),
    component: 'InputTextArea',
    componentProps: {
      maxlength: 128,
      autoSize: { minRows: 1, maxRows: 2 },
    },
  },
  {
    field: 'roleNames',
    component: 'Input',
    label: t('admin.user.table.title.role'),
    dynamicDisabled: () => true,
  },
  {
    field: 'lastLogin',
    label: t('admin.center.user.base.last_login'),
    component: 'Input',
    dynamicDisabled: () => true,
  },
  {
    field: 'updatedAt',
    label: t('common.table.title.update_time'),
    component: 'Input',
    dynamicDisabled: () => true,
  },
];

// contact info
export const contactSchema: FormSchema[] = [
  {
    field: 'id',
    label: t('common.table.title.id'),
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: t('common.table.title.name'),
    component: 'Input',
    show: false,
  },
  {
    field: 'email',
    component: 'Input',
    required: true,
    label: t('admin.user.table.title.email'),
  },
  {
    field: 'phone',
    component: 'Input',
    label: t('admin.user.table.title.phone'),
  },
  {
    field: 'wechat',
    component: 'Input',
    label: t('admin.center.user.contact.wechat'),
  },
  {
    field: 'dingding',
    component: 'Input',
    label: t('admin.center.user.contact.dingding'),
  },
  {
    field: 'teams',
    component: 'Input',
    label: t('admin.center.user.contact.teams'),
  },
  {
    field: 'slack',
    component: 'Input',
    label: t('admin.center.user.contact.slack'),
  },
];

// security info
export const securitySchema: FormSchema[] = [
  {
    field: 'id',
    label: t('common.table.title.id'),
    component: 'Input',
    show: false,
  },
  {
    field: 'oldPwd',
    component: 'InputPassword',
    required: true,
    label: t('admin.center.user.security.oldPwd'),
  },
  {
    field: 'newPwd',
    component: 'InputPassword',
    required: true,
    label: t('admin.center.user.security.newPwd'),
  },
  {
    field: 'confirm',
    component: 'InputPassword',
    required: true,
    label: t('admin.center.user.security.confirm'),
  },
];

// security info
export const featureColumns: BasicColumn[] = [
  {
    title: t('admin.center.user.license.feature'),
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: t('admin.center.user.license.fstatus'),
    dataIndex: 'status',
    width: 100,
    align: 'left',
  },
];

// message info
export const msgColumns: BasicColumn[] = [
  {
    title: t('admin.center.msg.ts'),
    dataIndex: 'tsUtc',
    align: 'left',
    width: 200,
  },
  {
    title: t('admin.center.msg.type'),
    dataIndex: 'type',
    align: 'left',
    width: 120,
  },
  {
    title: t('admin.center.msg.from'),
    dataIndex: 'from',
    align: 'left',
    width: 120,
  },
  {
    title: t('admin.center.msg.to'),
    dataIndex: 'to',
    align: 'left',
    width: 120,
  },
  {
    title: t('admin.center.msg.content'),
    dataIndex: 'msg',
    align: 'left',
  },
];

export const dialogFormSchema: FormSchema[] = [
  {
    field: 'to',
    label: t('admin.center.msg.to'),
    component: 'ApiSelect',
    componentProps: {
      api: API_USER_OPTIONS,
      resultField: 'records',
      fieldNames: {
        key: 'id',
        label: 'name',
        value: 'name',
      },
    },
  },
  {
    field: 'msg',
    label: '',
    component: 'InputTextArea',
    componentProps: {
      autoSize: { minRows: 10, maxRows: 10 },
    },
  },
  {
    field: 'sendButton',
    label: '',
    component: 'Input',
    slot: 'sendButton',
  },
];
