import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();

export interface ListItem {
  id: string;
  avatar: string;
  title: string;
  titleDelete?: boolean;
  datetime: string;
  read?: boolean;
  description: string;
  clickClose?: boolean;
  extra?: string;
  color?: string;
}

export interface TabItem {
  key: string;
  name: string;
  list: ListItem[];
  unreadlist?: ListItem[];
}

export const tabListData: TabItem[] = [
  {
    key: 'notice',
    name: t('layout.header.notify.notice'),
    list: []
  },
  {
    key: 'message',
    name: t('layout.header.notify.message'),
    list: [
      {
        id: '000000006',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '曲丽丽 评论了你',
        description: '',
        datetime: '2017-08-07',
        clickClose: true
      }
    ]
  }
];
