import { BasicColumn } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('system.log.access.table.title.ts'),
    dataIndex: 'tsUtc',
    width: 200,
    sorter: true,
    //sorter: (a, b) => a.ts - b.ts,
    sortOrder: 'descend',
    defaultSortOrder: 'descend',
  },
  {
    title: t('system.log.access.table.title.username'),
    dataIndex: 'username',
    width: 150,
    sorter: true,
    align: 'left',
  },
  {
    title: t('system.log.access.table.title.action'),
    dataIndex: 'login',
    width: 100,
    filters: [
      { text: t('system.log.access.table.title.login'), value: 'true' },
      { text: t('system.log.access.table.title.logout'), value: 'false' },
    ],
  },
  {
    title: t('system.log.access.table.title.ip'),
    dataIndex: 'ip',
    width: 120,
    sorter: true,
  },
  {
    title: t('system.log.access.table.title.browser'),
    dataIndex: 'browser',
    width: 120,
    sorter: true,
    align: 'left',
  },
  {
    title: t('system.log.access.table.title.os'),
    dataIndex: 'os',
    align: 'left',
  },
  {
    title: t('system.log.access.table.title.lang'),
    dataIndex: 'lang',
    width: 100,
    sorter: true,
  },
  {
    title: t('system.log.access.table.title.tz'),
    dataIndex: 'timeZone',
    sorter: true,
    align: 'left',
  },
  {
    title: t('system.log.access.table.title.location'),
    dataIndex: 'location',
    align: 'left',
  },
  {
    title: t('system.log.access.table.title.result'),
    dataIndex: 'result',
    align: 'left',
  },
];
