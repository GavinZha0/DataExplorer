import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiListReqType } from '/@/api/model/baseModel';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  LOG_ACC_LIST: '/logaccess/list',
  LOG_ACC_LATEST: '/logaccess/latest',
  LOG_ACC_DELETE: '/logaccess/delete',
  LOG_ACT_LIST: '/logaction/list',
  LOG_ACT_DELETE: '/logaction/delete',
};

export function API_LOG_ACC_LIST(params: ApiListReqType): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.LOG_ACC_LIST,
    params,
  });
}

export function API_LOG_ACC_LATEST(id: number): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.LOG_ACC_LATEST,
    data: { id: id },
  });
}

export function API_LOG_ACC_DEL(id: number): Promise<any> {
  return defHttp.delete<AxiosResponse>({
    url: API.LOG_ACC_DELETE,
    params: { id: id },
  });
}

export function API_LOG_ACT_LIST(params: ApiListReqType): Promise<any> {
  return defHttp.post<AxiosResponse>({
    url: API.LOG_ACT_LIST,
    params,
  });
}

export function API_LOG_ACT_DEL(id: number): Promise<any> {
  return defHttp.delete<AxiosResponse>({
    url: API.LOG_ACT_DELETE,
    params: { id: id },
  });
}
