import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { API_ROLE_OPTIONS } from '/@/api/admin/role';
import {API_ORG_LIST, API_ORG_OPTIONS} from '/@/api/admin/org';
import validator from 'validator';
import dayjs, { Dayjs } from 'dayjs';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('admin.user.table.title.avatar'),
    dataIndex: 'avatar',
    width: 60,
  },
  {
    title: t('admin.user.table.title.name'),
    dataIndex: 'name',
    align: 'left',
    width: 120,
    sorter: true,
    resizable: true
  },
  {
    title: t('admin.user.table.title.realname'),
    dataIndex: 'realname',
    align: 'left',
    sorter: true,
    resizable: true
  },
  {
    title: t('admin.user.table.title.email'),
    dataIndex: 'email',
    align: 'left',
    sorter: true,
    resizable: true
  },
  {
    title: t('admin.user.table.title.phone'),
    dataIndex: 'phone',
    align: 'left',
    width: 130,
    sorter: true,
    resizable: true
  },
  {
    title: t('admin.user.table.title.role'),
    dataIndex: 'roleNames',
    align: 'left',
    resizable: true
  },
  {
    title: t('common.table.title.exp_date'),
    dataIndex: 'expDate',
    width: 120,
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

export const detailSchema: FormSchema[] = [
  {
    field: 'id',
    label: t('common.table.title.id'),
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: t('admin.user.table.title.name'),
    component: 'Input',
    dynamicDisabled: ({ values }) => values.id,
    rules: [
      {
        required: true,
        trigger: 'blur',
        validator: async (_rule, value) => {
          const dt = value.trim();
          const reg = /^[a-zA-Z]{3,16}$/;

          if (dt.length == 0) {
            return Promise.reject();
          } else if (reg.test(dt)) {
            return Promise.resolve();
          } else {
            return Promise.reject(t('auth.login.tip.usernameWeek'));
          }
        },
      },
    ],
  },
  {
    field: 'realname',
    label: t('admin.user.table.title.realname'),
    required: true,
    component: 'Input',
  },
  {
    field: 'email',
    label: t('admin.user.table.title.email'),
    component: 'Input',
    rules: [
      {
        required: true,
        trigger: 'blur',
        validator: async (_rule, value) => {
          if (!value) {
            return Promise.reject();
          }
          if (!validator.isEmail(value)) {
            return Promise.reject(t('auth.login.tip.format'));
          }
          return Promise.resolve();
        },
      },
    ],
  },
  {
    field: 'phone',
    label: t('admin.user.table.title.phone'),
    component: 'Input',
    rules: [
      {
        required: false,
        trigger: 'blur',
        validator: async (_rule, value) => {
          if (!value) {
            return Promise.reject();
          }
          if (!validator.isMobilePhone(value, false)) {
            return Promise.reject(t('auth.login.tip.format'));
          }
          return Promise.resolve();
        },
      },
    ],
  },
  {
    field: 'roleNames',
    label: t('admin.user.table.title.role'),
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: API_ROLE_OPTIONS,
      resultField: 'records',
      labelField: 'name',
      valueField: 'name',
      mode: 'multiple',
    },
  },
  {
    field: 'orgName',
    component: 'ApiTreeSelect',
    label: t('admin.user.panel.org'),
    required: true,
    componentProps: {
      api: API_ORG_OPTIONS,
      resultField: 'records',
      fieldNames: {
        key: 'id',
        label: 'name',
        value: 'name',
      },
    },
  },
  {
    field: 'expDate',
    label: t('common.table.title.exp_date'),
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
      disabledDate: (current: Dayjs) => {
        return current && current < dayjs().endOf('day');
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
