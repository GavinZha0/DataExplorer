import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiParamDataType } from './model/param';
import { ApiListReqType } from '/@/api/model/baseModel';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  PARAM_LIST: '/param/list',
  PARAM_TREE: '/param/tree',
  PARAM_GET: '/param/get',
  PARAM_CREATE: '/param/create',
  PARAM_UPDATE: '/param/update',
  PARAM_DELETE: '/param/delete',
};

export function API_PARAM_LIST(params: ApiListReqType): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.PARAM_LIST,
    params,
  });
}

export function API_PARAM_TREE(): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.PARAM_TREE,
  });
}

export function API_PARAM_GET(name: string): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.PARAM_GET,
    data: { name: name },
  });
}

export function API_PARAM_CREATE(params: Omit<ApiParamDataType, 'id'>): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.PARAM_CREATE,
    params,
  });
}

export function API_PARAM_UPDATE(params: ApiParamDataType): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.PARAM_UPDATE,
    params,
  });
}

export function API_PARAM_DEL(id: number): Promise<any> {
  return defHttp.delete<AxiosResponse>({
    url: API.PARAM_DELETE,
    params: { id: id },
  });
}
