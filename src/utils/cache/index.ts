import { createWebStorage } from '/@/utils/cache/storage';
import { pick } from 'lodash-es';
import { BasicKeys } from '/@/utils/cache/data';
import {
  SHADOW_TOKEN_KEY,
  USER_INFO_KEY,
  LOCK_INFO_KEY,
  APP_LOCAL_CACHE_KEY,
  APP_SESSION_CACHE_KEY,
  CacheTypeEnum,
  PROJ_CFG_KEY,
  APP_THEME_MODE_KEY, LOCALE_KEY,
} from '/@/enums/cacheEnum';
import projectSetting from '/@/settings/projectSetting';
import {DEFAULT_CACHE_TIME} from "/@/settings/encryptionSetting";

const { permissionCacheType } = projectSetting;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

// create local storage and session storage
const ls = createWebStorage(localStorage);
const ss = createWebStorage(sessionStorage);

window.addEventListener('beforeunload', function () {
  // don't understand Gavin ???
  // SHADOW_TOKEN_KEY 在登录或注销时已经写入到storage了，此处为了解决同时打开多个窗口时token不同步的问题
  // LOCK_INFO_KEY 在锁屏和解锁时写入，此处也不应修改
  ls.set(APP_LOCAL_CACHE_KEY, {
    ...pick(ls.get(SHADOW_TOKEN_KEY), ls.get(USER_INFO_KEY), ls.get(LOCK_INFO_KEY)),
  });
  ss.set(APP_SESSION_CACHE_KEY, {
    ...pick(ss.get(SHADOW_TOKEN_KEY), ss.get(USER_INFO_KEY), ss.get(LOCK_INFO_KEY)),
  });
});

// Gavin ???
// how do I do when storage is changing
function storageChange(e: any) {
  const { key, newValue, oldValue } = e;

  if (!key) {
    clearWebStorage();
    return;
  }

  if (!!newValue && !!oldValue) {
    // Gavin ???
    //clearWebStorage();
  }
}

// register event for storage change
window.addEventListener('storage', storageChange);

// get value from local or session storage directly
export function getWebStorage<T>(key: BasicKeys, local = true) {
  if (local && isLocal) {
    return ls.get(key) as T;
  } else {
    return ss.get(key) as T;
  }
}

// save info to local or session storage immediately
export function setWebStorage(key: BasicKeys, value, local = true, expire: number | null | undefined = DEFAULT_CACHE_TIME) {
  // session data will always be put into session storage
  // local data will be put into session storage when isLocal is false
  if (local && isLocal) {
    return ls.set(key, value, expire);
  } else {
    return ss.set(key, value, expire);
  }
}

// remove a specific item
export function removeWebStorage(key: BasicKeys, local = true) {
  if (local && isLocal) {
    return ls.remove(key);
  } else {
    return ss.remove(key);
  }
}

// don't remove proj config and dark mode by default
export function clearWebStorage(expect: BasicKeys[] = [PROJ_CFG_KEY, APP_THEME_MODE_KEY, LOCALE_KEY]) {
  const lsTmp = {};
  for (const key of expect) {
    lsTmp[key] = ls.get(key);
  }
  ls.clear();
  for (const key of expect) {
    ls.set(key, lsTmp[key]);
  }

  const ssTmp = {};
  for (const key of expect) {
    ssTmp[key] = ss.get(key);
  }
  ss.clear();
  for (const key of expect) {
    ss.set(key, ssTmp[key]);
  }
}
