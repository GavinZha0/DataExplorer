import { ApiListReqType, ApiPublicReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiDataDataType } from '/@/api/ai/model/data';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  AI_DATA_LIST: '/ai/data/list',
  AI_DATA_TREE: 'ai/data/tree',
  AI_DATA_CREATE: '/ai/data/create',
  AI_DATA_UPDATE: '/ai/data/update',
  AI_DATA_UPLOAD: '/ai/data/upload',
  AI_DATA_PUBLIC: '/ai/data/public',
  AI_DATA_CLONE: 'ai/data/clone',
  AI_DATA_DELETE: '/ai/data/delete',
  AI_DATA_EXECUTE: '/py/ai/data/execute',
  AI_DATA_GROUPS: '/ai/data/groups',
  AI_DATA_ONE: '/ai/data/getone',
}

/* get all algo as list
 * params: ApiListReqType
 */
export function API_AI_DATA_LIST(params?: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_DATA_LIST,
    params,
  });
}

/* get group->dataset tree
 *
 */
export function API_AI_DATA_TREE() {
  return defHttp.post<AxiosResponse>({
    url: API.AI_DATA_TREE,
  });
}

/* get specific dataset
 * id: dataset id
 */
export function API_AI_DATA_ONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_DATA_ONE,
    data: { id: id },
  });
}

/* create a new dataset
 * params: ApiDatasetDataType without id
 */
export function API_AI_DATA_CREATE(params: Omit<ApiDataDataType, 'id'>) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_DATA_CREATE,
    params,
  });
}

/* update dataset info
 * params: ApiDatasetDataType
 */
export function API_AI_DATA_UPDATE(params: ApiDataDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_DATA_UPDATE,
    params,
  });
}

export function API_AI_DATA_UPLOAD(formData: FormData, progressFunc: any): Promise<any> {
  return defHttp.post<AxiosResponse>({
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: progressFunc,
    url: API.AI_DATA_UPLOAD,
    data: formData
  });
}

/* set dataset to public
 * id: dataset id
 * pub: public flag
 */
export function API_AI_DATA_PUBLIC(id: number, pub: boolean) {
  const params: ApiPublicReqType = {
    id: id,
    pub: pub,
  };
  return defHttp.post<AxiosResponse>({
    url: API.AI_DATA_PUBLIC,
    params,
  });
}

/* clone a dataset
 * id: dataset id
 */
export function API_AI_DATA_CLONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_DATA_CLONE,
    data: { id: id },
  });
}

/* delete a dataset
 * id: dataset id
 */
export function API_AI_DATA_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.AI_DATA_DELETE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_AI_DATA_EXECUTE(endpoint: string, data: any) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_DATA_EXECUTE,
    data: { endpoint: endpoint, data: data },
  });
}

/* get all groups
 *
 */
export function API_AI_DATA_GROUPS() {
  return defHttp.post<AxiosResponse>({
    url: API.AI_DATA_GROUPS,
  });
}
