import { BasicColumn } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('system.log.action.table.title.ts'),
    dataIndex: 'tsUtc',
    width: 200,
    sorter: true,
    sortOrder: 'descend',
    defaultSortOrder: 'descend',
    resizable: true
  },
  {
    title: t('system.log.action.table.title.username'),
    dataIndex: 'username',
    width: 150,
    sorter: true,
    align: 'left',
    resizable: true
  },
  {
    title: t('common.table.title.type'),
    dataIndex: 'type',
    width: 80,
    sorter: true
  },
  {
    title: t('system.log.action.table.title.url'),
    dataIndex: 'url',
    width: 150,
    align: 'left',
    resizable: true
  },
  {
    title: t('system.log.action.table.title.module'),
    dataIndex: 'module',
    align: 'left',
    resizable: true
  },
  {
    title: t('system.log.action.table.title.method'),
    dataIndex: 'method',
    width: 150,
    sorter: true,
    align: 'left',
    resizable: true
  },
  {
    title: t('system.log.action.table.title.tid'),
    dataIndex: 'tid',
    width: 100,
    sorter: true,
  },
  {
    title: t('system.log.action.table.title.param'),
    dataIndex: 'param',
    align: 'left',
    resizable: true
  },
  {
    title: t('system.log.action.table.title.result'),
    dataIndex: 'result',
    align: 'left',
    resizable: true
  },
];
