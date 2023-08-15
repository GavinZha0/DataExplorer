import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import {ApiActiveReqType, ApiPwdReqType, ApiUserDataType} from './model/user';
import { ApiListReqType } from '/@/api/model/baseModel';
import { UploadFileParams } from '/#/axios';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  USER_ONE: '/user/one',
  USER_LIST: '/user/list',
  USER_CREATE: '/user/create',
  USER_UPDATE: '/user/update',
  USER_PWD: '/user/password',
  USER_UPLOAD: '/user/upload',
  USER_ACTIVATE: '/user/active',
  USER_DELETE: '/user/delete',
  USER_OPTIONS: '/user/options',
  STATUS_OPTIONS: '/status/user/options',
};

export function API_USER_LIST(params?: ApiListReqType): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.USER_LIST,
    params,
  });
}

export function API_USER_ONE(id: number): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.USER_ONE,
    data: { id: id },
  });
}

export function API_USER_CREATE(params: Omit<ApiUserDataType, 'id'>): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.USER_CREATE,
    params,
  });
}

export function API_USER_UPDATE(params: ApiUserDataType): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.USER_UPDATE,
    params,
  });
}

export function API_USER_PWD(params: ApiPwdReqType): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.USER_PWD,
    params,
  });
}

export function API_USER_UPLOAD(params: UploadFileParams): Promise<any> {
  const formData = new FormData();

  formData.append('file', params.file);
  return defHttp.post<AxiosResponse>({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: API.USER_UPLOAD,
    params: formData,
  });
}

export function API_USER_ACTIVATE(id: number, active: boolean): Promise<any> {
  const params: ApiActiveReqType = {
    id: id,
    active: active,
  };
  return defHttp.post<AxiosResponse>({
    url: API.USER_ACTIVATE,
    params,
  });
}

export function API_USER_DEL(id: number): Promise<any> {
  return defHttp.delete<AxiosResponse>({
    url: API.USER_DELETE,
    params: { id: id },
  });
}

export function API_USER_OPTIONS(): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.USER_OPTIONS,
  });
}

export function API_USER_STATUS_OPTIONS(): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.STATUS_OPTIONS,
  });
}
