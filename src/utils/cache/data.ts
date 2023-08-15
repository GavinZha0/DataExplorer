import { EncryptionParams } from '/@/utils/cipher';
import {
  APP_THEME_MODE_KEY,
  LOCALE_KEY,
  LOCK_INFO_KEY,
  MULTIPLE_TABS_KEY,
  PROJ_CFG_KEY,
  USER_ROLES_KEY,
  SHADOW_TOKEN_KEY,
  USER_INFO_KEY,
} from '/@/enums/cacheEnum';
import { LockInfo, UserInfo } from '/#/store';
import { LocaleSetting, ProjectConfig } from '/#/config';
import { RouteLocationNormalized } from 'vue-router';


export interface CreateStorageParams extends EncryptionParams {
  prefixKey: string;
  storage: Storage;
  hasEncrypt: boolean;
  timeout?: Nullable<number>;
}

// these will be saved into storage
export interface BasicStore {
  [LOCALE_KEY]: LocaleSetting | null | undefined;
  [SHADOW_TOKEN_KEY]: string | number | null | undefined;
  [USER_INFO_KEY]: UserInfo;
  [USER_ROLES_KEY]: string[];
  [LOCK_INFO_KEY]: LockInfo;
  [PROJ_CFG_KEY]: ProjectConfig;
  [MULTIPLE_TABS_KEY]: RouteLocationNormalized[];
  [APP_THEME_MODE_KEY]: string | null | undefined;
}

export type BasicKeys = keyof BasicStore;
