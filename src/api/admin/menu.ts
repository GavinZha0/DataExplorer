import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiMenuDataType } from './model/menu';
import { ApiListReqType } from '/@/api/model/baseModel';
import { ApiActiveReqType } from './model/user';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  MENU_LIST: '/menu/list',
  MENU_TREE: '/menu/tree',
  MENU_CREATE: '/menu/create',
  MENU_UPDATE: '/menu/update',
  MENU_ACTIVE: '/menu/active',
  MENU_DELETE: '/menu/delete',
};

export function API_MENU_LIST(params?: ApiListReqType): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.MENU_LIST,
    params,
  });
}

export function API_MENU_TREE(name: string): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.MENU_TREE,
    data: { name: name },
  });
}

export function API_MENU_CREATE(params: Omit<ApiMenuDataType, 'id'>): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.MENU_CREATE,
    params,
  });
}

export function API_MENU_UPDATE(params: ApiMenuDataType): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.MENU_UPDATE,
    params,
  });
}

export function API_MENU_ACTIVE(id: number, active: boolean): Promise<any> {
  const params: ApiActiveReqType = {
    id: id,
    active: active,
  };
  return defHttp.post<AxiosResponse>({
    url: API.MENU_ACTIVE,
    params,
  });
}

export function API_MENU_DEL(id: number): Promise<any> {
  return defHttp.delete<AxiosResponse>({
    url: API.MENU_DELETE,
    params: { id: id },
  });
}
