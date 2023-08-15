import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import {ApiActiveReqType} from "/@/api/admin/model/user";

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  MSG_LIST: '/msg/list',
  MSG_GET: '/msg/get',
  MSG_READ: '/msg/read',
  MSG_CREATE: '/msg/create',
  MSG_DELETE: '/msg/delete',
  USER_OPTIONS: '/user/options',
  HISTORY_ONE: '/history/one',
};

export function API_HISTORY_ONE(id: number): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.HISTORY_ONE,
    data: { id: id },
  });
}

export function API_MSG_LIST(inbox = true, userId = undefined): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.MSG_LIST,
    data: { inbox: inbox, id: userId },
  });
}

export function API_MSG_CREATE(params: any): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.MSG_CREATE,
    params,
  });
}

export function API_MSG_READ(id: number): Promise<any> {
  const params: ApiActiveReqType = {
    id: id,
    active: true,
  };
  return defHttp.post<AxiosResponse>({
    url: API.MSG_READ,
    params,
  });
}

export function API_MSG_DEL(id: number): Promise<any> {
  return defHttp.delete<AxiosResponse>({
    url: API.MSG_DELETE,
    params: { id: id },
  });
}


