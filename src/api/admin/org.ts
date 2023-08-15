import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiParamDataType } from './model/param';
import { ApiListReqType } from '/@/api/model/baseModel';
import { ApiActiveReqType } from '/@/api/admin/model/user';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  ORG_LIST: '/org/list',
  ORG_OPTIONS: '/org/options',
  ORG_CREATE: '/org/create',
  ORG_UPDATE: '/org/update',
  ORG_DELETE: '/org/delete',
  ORG_ACTIVE: '/org/active',
};

export function API_ORG_LIST(params: ApiListReqType): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.ORG_LIST,
    params,
  });
}

export function API_ORG_OPTIONS(): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.ORG_OPTIONS,
  });
}

export function API_ORG_CREATE(params: Omit<ApiParamDataType, 'id'>): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.ORG_CREATE,
    params,
  });
}

export function API_ORG_UPDATE(params: ApiParamDataType): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.ORG_UPDATE,
    params,
  });
}

export function API_ORG_DEL(id: number): Promise<any> {
  return defHttp.delete<AxiosResponse>({
    url: API.ORG_DELETE,
    params: { id: id },
  });
}

export function API_ORG_ACTIVE(id: number, active: boolean): Promise<any> {
  const params: ApiActiveReqType = {
    id: id,
    active: active,
  };
  return defHttp.post<AxiosResponse>({
    url: API.ORG_ACTIVE,
    params,
  });
}
