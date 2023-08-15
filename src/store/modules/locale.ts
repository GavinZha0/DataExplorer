import type { LocaleSetting, LocaleType } from '/#/config';

import { defineStore } from 'pinia';
import { store } from '/@/store';
import { LOCALE_KEY } from '/@/enums/cacheEnum';
import { getWebStorage, setWebStorage } from '/@/utils/cache';
import { localeSetting } from '/@/settings/localeSetting';

// get locale info from storage
// default localeSetting will be applied if there is no locale info in storage
const lsLocaleSetting = (getWebStorage(LOCALE_KEY) || localeSetting) as LocaleSetting;

interface LocaleState {
  localInfo: LocaleSetting;
}

export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: (): LocaleState => ({
    localInfo: lsLocaleSetting,
  }),
  getters: {
    getShowPicker(): boolean {
      return !!this.localInfo?.showPicker;
    },
    getLocale(): LocaleType {
      return this.localInfo.locale;
    },
  },
  actions: {
    /**
     * Set up multilingual information and cache
     * @param info multilingual info
     */
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info };
      setWebStorage(LOCALE_KEY, this.localInfo);
    },
    /**
     * Initialize multilingual information and load the existing configuration from the local cache
     */
    initLocale() {
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localInfo,
      });
    },
  },
});

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useLocaleStore(store);
}
