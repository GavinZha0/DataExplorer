import { ApiListReqType, ApiPublicReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import {
  ApiDatareportDataType,
  ApiPublishReqType,
  ApiReportExeReqType,
} from '/@/api/dataviz/model/datareport';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  DATAREPORT_LIST: '/datareport/list',
  DATAREPORT_TREE: '/datareport/tree',
  DATAREPORT_CREATE: '/datareport/create',
  DATAREPORT_UPDATE: '/datareport/update',
  DATAREPORT_PUBLIC: '/datareport/public',
  DATAREPORT_PUBLISH: '/datareport/publish',
  DATAREPORT_CANCEL: '/datareport/cancel',
  DATAREPORT_CLONE: 'datareport/clone',
  DATAREPORT_DELETE: '/datareport/delete',
  DATAREPORT_EXECUTE: '/datareport/execute',
  DATAREPORT_GROUPS: '/datareport/groups',

};

export function API_DATAREPORT_LIST(params: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.DATAREPORT_LIST,
    params,
  });
}

export function API_DATAREPORT_CREATE(params: any) {
  return defHttp.post<AxiosResponse>({
    url: API.DATAREPORT_CREATE,
    params,
  });
}

export function API_DATAREPORT_UPDATE(params: ApiDatareportDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.DATAREPORT_UPDATE,
    params,
  });
}

export function API_DATAREPORT_PUBLIC(id: number, pub: boolean) {
  const params: ApiPublicReqType = {
    id: id,
    pub: pub,
  };
  return defHttp.post<AxiosResponse>({
    url: API.DATAREPORT_PUBLIC,
    params,
  });
}

export function API_DATAREPORT_CLONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.DATAREPORT_CLONE,
    data: { id: id },
  });
}

export function API_DATAREPORT_PUBLISH(
  id: number,
  menuId: number,
  publishPub: boolean,
) {
  const params: ApiPublishReqType = {
    id: id,
    menuId: menuId,
    publishPub: publishPub,
  };
  return defHttp.post<AxiosResponse>({
    url: API.DATAREPORT_PUBLISH,
    params,
  });
}

export function API_DATAREPORT_CANCEL(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.DATAREPORT_CANCEL,
    data: { id: id },
  });
}

export function API_DATAREPORT_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.DATAREPORT_DELETE,
    params: { id: id },
  });
}

export function API_DATAREPORT_EXECUTE(reportId: number, pageId: number) {
  const params: ApiReportExeReqType = {
    reportId: reportId,
    pageId: pageId,
  };
  return defHttp.post<AxiosResponse>({
    url: API.DATAREPORT_EXECUTE,
    params,
  });
}

export function API_DATAREPORT_GROUPS() {
  return defHttp.post<AxiosResponse>({
    url: API.DATAREPORT_GROUPS,
  });
}
