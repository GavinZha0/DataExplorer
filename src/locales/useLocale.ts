/**
 * Multi-language related operations
 */
import type { LocaleType } from '/#/config';

import { i18n } from './setupI18n';
import { useLocaleStoreWithOut } from '/@/store/modules/locale';
import { unref, computed } from 'vue';
import { loadLocalePool, setHtmlPageLang } from './helper';
import { API_AUTH_LANGUAGE } from '/@/api/sys/auth';
import { useUserStoreWithOut } from '/@/store/modules/user';

interface LangModule {
  message: Recordable;
  dateLocale: Recordable;
  dateLocaleName: string;
}

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStoreWithOut();

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }
  localeStore.setLocaleInfo({ locale });
  setHtmlPageLang(locale);
}

export function useLocale() {
  const localeStore = useLocaleStoreWithOut();
  const getLocale = computed(() => localeStore.getLocale);
  const getShowLocalePicker = computed(() => localeStore.getShowPicker);

  const getAntdLocale = computed((): any => {
    return i18n.global.getLocaleMessage(unref(getLocale))?.antdLocale ?? {};
  });

  // Switching the language will change the locale of useI18n
  // And submit to configuration modification
  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global;
    const currentLocale = unref(globalI18n.locale);
    if (currentLocale === locale) {
      // return if no change
      return locale;
    }

    if (!loadLocalePool.includes(locale)) {
      // load lang resource
      const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule;
      if (!langModule) return;

      const { message } = langModule;
      globalI18n.setLocaleMessage(locale, message);
      // add it to language pool
      loadLocalePool.push(locale);
    }

    // set vue i18n
    setI18nLanguage(locale);

    const userStore = useUserStoreWithOut();
    if (userStore.getUserInfo && userStore.getUserInfo.id) {
      //inform backend if user has logined
      API_AUTH_LANGUAGE(locale);
    }

    return locale;
  }

  return {
    getLocale,
    getShowLocalePicker,
    changeLocale,
    getAntdLocale,
  };
}
