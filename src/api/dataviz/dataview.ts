import { ApiListReqType, ApiPublicReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiDataviewDataType } from '/@/api/dataviz/model/dataview';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  DATAVIEW_LIST: '/dataview/list',
  DATAVIEW_BY_GROUP: '/dataview/cat_views',
  DATAVIEW_CREATE: '/dataview/create',
  DATAVIEW_UPDATE: '/dataview/update',
  DATAVIEW_PUBLIC: '/dataview/public',
  DATAVIEW_CLONE: '/dataview/clone',
  DATAVIEW_DELETE: '/dataview/delete',
  DATAVIEW_EXECUTE: '/dataview/execute',
  DATAVIEW_GROUPS: '/dataview/groups',
};

/* get all dataviews as list
 * params: ApiListReqType
 */
export function API_DATAVIEW_LIST(params: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.DATAVIEW_LIST,
    params,
  });
}

/* get all groups
 *
 */
export function API_DATAVIEW_BY_GROUP(group: string) {
  return defHttp.post<AxiosResponse>({
    url: API.DATAVIEW_BY_GROUP,
    data: { group: group },
  });
}

/* create a new dataview
 * params: ApiDataviewDataType without id
 */
export function API_DATAVIEW_CREATE(params: Omit<ApiDataviewDataType, 'id'>) {
  return defHttp.post<AxiosResponse>({
    url: API.DATAVIEW_CREATE,
    params,
  });
}

/* update dataview info
 * params: ApiDataviewDataType
 */
export function API_DATAVIEW_UPDATE(params: ApiDataviewDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.DATAVIEW_UPDATE,
    params,
  });
}

/* set dataview to public
 * id: dataview id
 * pub: public flag
 */
export function API_DATAVIEW_PUBLIC(id: number, pub: boolean) {
  const params: ApiPublicReqType = {
    id: id,
    pub: pub,
  };
  return defHttp.post<AxiosResponse>({
    url: API.DATAVIEW_PUBLIC,
    params,
  });
}

/* clone a dataview
 * id: dataview id
 */
export function API_DATAVIEW_CLONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.DATAVIEW_CLONE,
    data: { id: id },
  });
}

/* delete a dataview
 * id: dataset id
 */
export function API_DATAVIEW_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.DATAVIEW_DELETE,
    params: { id: id },
  });
}

/* execute dataview to query data
 * id: dataview id
 */
export function API_DATAVIEW_EXECUTE(id: number, limit: number) {
  return defHttp.post<AxiosResponse>({
    url: API.DATAVIEW_EXECUTE,
    params: { id: id, limit: limit },
  });
}

export function API_DATAVIEW_GROUPS() {
  return defHttp.post<AxiosResponse>({
    url: API.DATAVIEW_GROUPS,
  });
}
