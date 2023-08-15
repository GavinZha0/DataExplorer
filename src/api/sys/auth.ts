import { defHttp } from '/@/utils/http/axios';
import { AuthLoginParams, AuthUserInfoResult, RegisterParamsType } from './model/auth';
import { AxiosResponse } from 'axios';
import { ErrorMessageMode } from '/#/axios';

enum API {
  AUTH_LOGIN = '/auth/login',
  AUTH_INFO = '/auth/info',
  AUTH_CODE = '/auth/code',
  AUTH_CAPTCHA = '/auth/captcha',
  AUTH_PERMIT = '/auth/permit',
  AUTH_MSG = '/auth/msg',
  AUTH_REGISTER = '/auth/register',
  API_AUTH_LANGUAGE = '/auth/language',
  AUTH_LOGOUT = '/auth/logout',
}

/**
 * @description: login with local time zone and selected language
 */
export function API_AUTH_LOGIN(
  params: AuthLoginParams,
  lang = 'en-US', // default
  mode: ErrorMessageMode = 'modal',
) {
  // get default time zone for data time display
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return defHttp.post<AxiosResponse>(
    {
      url: API.AUTH_LOGIN,
      params,
      headers: { 'Zone-Id': localTimeZone, 'Lang-Id': lang },
    },
    {
      errorMessageMode: mode,
      // token in header
      isReturnNativeResponse: false,
    },
  );
}

/**
 * get user info
 */
export function API_AUTH_INFO() {
  return defHttp.post<AuthUserInfoResult>({ url: API.AUTH_INFO });
}

/**
 * get auth code
 * username: username, mobile phone or email
 */
export function API_AUTH_CODE(id: string) {
  return defHttp.post({
    url: API.AUTH_CODE,
    params: { id: id },
  });
}

/**
 * get captcha
 */
export function API_AUTH_CAPTCHA() {
  return defHttp.get({ url: API.AUTH_CAPTCHA }, { isTransformResponse: false });
}

/**
 * get user authorized menus
 */
export function API_AUTH_PERMIT(id: number) {
  return defHttp.post<string[]>({ url: API.AUTH_PERMIT, data: { id: id } });
}

/**
 * user logout
 */
export function API_AUTH_LOGOUT() {
  return defHttp.post({
    url: API.AUTH_LOGOUT,
    headers: { 'Zone-Id': Intl.DateTimeFormat().resolvedOptions().timeZone },
  });
}

/**
 * user register
 */
export function API_AUTH_REG(params: RegisterParamsType): Promise<any> {
  return defHttp.post({
    url: API.AUTH_REGISTER,
    data: { ...params, email: params.mobile },
  });
}

/**
 * set user language
 */
export function API_AUTH_LANGUAGE(lang: string): Promise<any> {
  return defHttp.post({
    url: API.API_AUTH_LANGUAGE,
    data: { lang: lang },
  });
}

