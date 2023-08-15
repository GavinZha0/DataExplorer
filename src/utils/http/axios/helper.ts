import { isObject, isString } from '/@/utils/is';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useLocaleStoreWithOut } from '/@/store/modules/locale';
dayjs.extend(utc);

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const localeStore = useLocaleStoreWithOut();
const locale = localeStore.getLocale;

export function joinTimestamp<T extends boolean>(
  join: boolean,
  restful: T,
): T extends true ? string : object;

export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {};
  }
  const now = new Date().getTime();
  if (restful) {
    return `?_t=${now}`;
  }
  return { _t: now };
}

/**
 * @description: Format request parameter time
 */
export function formatRequestDate(params: any) {
  if (Object.prototype.toString.call(params) == '[object Array]') {
    for (const item of params) {
      formatTimestamps(item);
    }
  }

  if (Object.prototype.toString.call(params) == '[object Object]') {
    formatTimestamps(params);
  }
}

function formatTimestamps(params: Recordable) {
  if (Object.prototype.toString.call(params) !== '[object Object]') {
    return;
  }

  for (const key in params) {
    const format = params[key]?.format ?? null;
    if (format && typeof format === 'function') {
      params[key] = params[key].format(DATE_TIME_FORMAT);
    }
    if (isString(key)) {
      const value = params[key];
      if (value) {
        try {
          if (
            value.indexOf('-') > 0 &&
            value.indexOf(' ') > 0 &&
            value.indexOf(':') > 0 &&
            !isNaN(Date.parse(value)) &&
            dayjs(value).isValid()
          ) {

            // convert UTC time to local time based on different formats
            //const localTss = new Date(value); // value format should be '2020-10-20T20:00:00+0000'
            const localTs = dayjs.utc(value).local(); // value format: '2020-10-10 20:00:00'


            // convert it ot friendly format based on locale. Gavin!!!
            const formatedTs = new Intl.DateTimeFormat(new Intl.Locale(locale), {
              dateStyle: 'medium',
              timeStyle: 'medium',
            }).format(localTs);

            // update it
            params[key] = formatedTs;
          } else {
            params[key] = isString(value) ? value.trim() : value;
          }
        } catch (error: any) {
          // do nothing
          //throw new Error(error);
        }
      }
    }
    if (isObject(params[key])) {
      formatTimestamps(params[key]);
    }
  }
}
