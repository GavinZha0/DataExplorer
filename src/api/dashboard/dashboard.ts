import { ApiListReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiDashboardDataType } from '/@/api/dashboard/model/dashboard';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  DASHBOARD_GET: '/dashboard/:id',
  DASHBOARD_LIST: '/dashboard/list',
  DASHBOARD_TREE: '/dashboard/tree',
  DASHBOARD_CREATE: '/dashboard/create',
  DASHBOARD_UPDATE: '/dashboard/update',
  DASHBOARD_PUBLIC: '/dashboard/public',
  DASHBOARD_CLONE: 'datareport/clone',
  DASHBOARD_DELETE: '/dashboard/delete',
  DASHBOARD_EXECUTE: '/dashboard/execute',
  DASHBOARD_CATEGORY: '/dashboard/category',
  DASHBOARD_SHARE: '/dashobard/share',
  DASHBOARD_SUBSCRIBE: '/dashboard/subscribe',

};

export function API_DASHBOARD_LIST(params: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.DASHBOARD_LIST,
    params,
  });
}

export function API_DASHBOARD_GET(path: string) {
  return defHttp.post<AxiosResponse>({
    url: path,
  });
}

export function API_DASHBOARD_SHARE(params: ApiDashboardDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.DASHBOARD_SHARE,
    params,
  });
}

export function API_DASHBOARD_SUBSCRIBE(params: ApiDashboardDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.DASHBOARD_SUBSCRIBE,
    params,
  });
}
