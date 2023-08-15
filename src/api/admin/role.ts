import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiRoleDataType } from './model/role';
import { ApiListReqType } from '/@/api/model/baseModel';
import { ApiActiveReqType } from './model/user';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  ROLE_LIST: '/role/list',
  ROLE_CREATE: '/role/create',
  ROLE_UPDATE: '/role/update',
  ROLE_ACTIVE: '/role/active',
  ROLE_DELETE: '/role/delete',
  ROLE_OPTIONS: '/role/options',
  ROLE_USER_UPDATE: '/role/user_update',
  ROLE_PERMITS: '/role/permit',
  PERMIT_LIST: '/permit/list',
  ROLE_USER_LIST: '/role/user/list',
};

export function API_ROLE_LIST(params?: ApiListReqType): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.ROLE_LIST,
    params,
  });
}

export function API_ROLE_USER_LIST(id: number): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.ROLE_USER_LIST,
    params: { id: id },
  });
}

export function API_ROLE_CREATE(params: Omit<ApiRoleDataType, 'id'>): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.ROLE_CREATE,
    params,
  });
}

export function API_ROLE_UPDATE(params: ApiRoleDataType): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.ROLE_UPDATE,
    params,
  });
}

export function API_ROLE_USER_UPDATE(params: ApiRoleDataType): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.ROLE_USER_UPDATE,
    params,
  });
}

export function API_ROLE_ACTIVE(id: number, active: boolean): Promise<any> {
  const params: ApiActiveReqType = {
    id: id,
    active: active,
  };
  return defHttp.post<AxiosResponse>({
    url: API.ROLE_ACTIVE,
    params,
  });
}

export function API_ROLE_DEL(id: number): Promise<any> {
  return defHttp.delete<AxiosResponse>({
    url: API.ROLE_DELETE,
    params: { id: id },
  });
}

export function API_ROLE_OPTIONS(): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.ROLE_OPTIONS,
  });
}

export function API_PERMIT_LIST(id: number): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.PERMIT_LIST,
    params: { id: id },
  });
}
