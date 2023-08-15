import type { DropMenu } from '../components/Dropdown';
import type { LocaleSetting, LocaleType } from '/#/config';

// locale definition
export const LOCALE: { [key: string]: LocaleType } = {
  en_US: 'en-US',
  zh_CN: 'zh-CN',
};

export const localeSetting: LocaleSetting = {
  showPicker: true,
  // selected Locale
  locale: LOCALE.en_US,
  // Default locale
  fallback: LOCALE.en_US,
  // available Locales
  availableLocales: [LOCALE.en_US, LOCALE.zh_CN],
};

// locale list in menu
export const localeList: DropMenu[] = [
  {
    text: 'English',
    event: LOCALE.en_US,
  },
  {
    text: '简体中文',
    event: LOCALE.zh_CN,
  },
];
