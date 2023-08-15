import {
  cacheCipher,
  DEFAULT_CACHE_TIME,
  enableStorageEncryption,
} from '/@/settings/encryptionSetting';
import { AesEncryption } from '/@/utils/cipher';
import { isNullOrUnDef } from '/@/utils/is';
import { CreateStorageParams } from '/@/utils/cache/data';
import { getStoragePrefix } from '/@/utils/env';

export const createStorage = ({
  prefixKey = '',
  storage = localStorage,
  key = cacheCipher.key,
  iv = cacheCipher.iv,
  timeout = null,
  hasEncrypt = true, // default value
}: Partial<CreateStorageParams> = {}) => {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!');
  }

  const encryption = new AesEncryption({ key, iv });

  // web storage class
  const WebStorage = class WebStorage {
    private storage: Storage;
    private prefixKey?: string;
    private encryption: AesEncryption;
    private hasEncrypt: boolean;

    constructor() {
      this.storage = storage;
      this.prefixKey = prefixKey;
      this.encryption = encryption;
      this.hasEncrypt = hasEncrypt;
    }

    // get complete key with prefix
    private getKey(key: string) {
      return `${this.prefixKey}${key}`;
    }

    // convert data to json string with expiration time then save the json into storage
    // data is not encrypted when is development mode
    set(key: string, value: any, expire: number | null = timeout) {
      // add expiration time for every storage item
      const stringData = JSON.stringify({
        value,
        expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : undefined,
      });
      // storage item can be encrypted
      const stringifyValue = this.hasEncrypt
        ? this.encryption.encryptByAES(stringData)
        : stringData;
      this.storage.setItem(this.getKey(key), stringifyValue);
    }

    // read data from storage
    get(key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key));
      if (!val) return def;

      try {
        // decode data
        const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val;
        const data = JSON.parse(decVal);
        const { value, expire } = data;

        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
          // return value when it doesn't expire
          return value;
        }
        // remove it if it expired
        this.remove(key);
      } catch (e) {
        return def;
      }
    }

    // remove data from storage
    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }

    // delete all caches of this instance
    clear(): void {
      this.storage.clear();
    }
  };
  return new WebStorage();
};

type Options = Partial<CreateStorageParams>;

// create web storage
export const createWebStorage = (storage: Storage = localStorage, options: Options = {}) => {
  // every key has a prefix which is based on your system config (VITE_GLOB_APP_SHORT_NAME, package version...)
  // prefixKey example: 'DATAPIE__DEVELOPMENT__0.5.0__'
  const storageOptions = {
    storage,
    prefixKey: getStoragePrefix(),
    hasEncrypt: enableStorageEncryption, // No encryption in debug mode
    timeout: DEFAULT_CACHE_TIME,
    ...options, // this will override other options like timeout
  };
  return createStorage(storageOptions);
};
