import { ApiListReqType, ApiPublicReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiImageDataType } from '/@/api/ai/model/image';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  AI_SECURITY_LIST: '/aisecurity/list',
  AI_SECURITY_TREE: 'aisecurity/tree',
  AI_SECURITY_CREATE: '/aisecurity/create',
  AI_SECURITY_UPDATE: '/aisecurity/update',
  AI_SECURITY_UPLOAD: '/aisecurity/upload',
  AI_SECURITY_PUBLIC: '/aisecurity/public',
  AI_SECURITY_CLONE: 'aisecurity/clone',
  AI_SECURITY_DELETE: '/aisecurity/delete',
  AI_SECURITY_EXECUTE: '/aisecurity/execute',
  AI_SECURITY_CATEGORY: '/aisecurity/category',
  AI_SECURITY_ONE: '/aisecurity/getone',
}

/* get all algo as list
 * params: ApiListReqType
 */
export function API_AI_SECURITY_LIST(params?: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_SECURITY_LIST,
    params,
  });
}

/* get group->dataset tree
 *
 */
export function API_AI_SECURITY_TREE() {
  return defHttp.post<AxiosResponse>({
    url: API.AI_SECURITY_TREE,
  });
}

/* get specific dataset
 * id: dataset id
 */
export function API_AI_SECURITY_ONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_SECURITY_ONE,
    data: { id: id },
  });
}

/* create a new dataset
 * params: ApiDatasetDataType without id
 */
export function API_AI_SECURITY_CREATE(params: Omit<ApiImageDataType, 'id'>) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_SECURITY_CREATE,
    params,
  });
}

/* update dataset info
 * params: ApiDatasetDataType
 */
export function API_AI_SECURITY_UPDATE(params: ApiImageDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_SECURITY_UPDATE,
    params,
  });
}

export function API_AI_SECURITY_UPLOAD(formData: FormData, progressFunc: any): Promise<any> {
  return defHttp.post<AxiosResponse>({
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: progressFunc,
    url: API.AI_SECURITY_UPLOAD,
    data: formData
  });
}

/* set dataset to public
 * id: dataset id
 * pub: public flag
 */
export function API_AI_SECURITY_PUBLIC(id: number, pub: boolean) {
  const params: ApiPublicReqType = {
    id: id,
    pub: pub,
  };
  return defHttp.post<AxiosResponse>({
    url: API.AI_SECURITY_PUBLIC,
    params,
  });
}

/* clone a dataset
 * id: dataset id
 */
export function API_AI_SECURITY_CLONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_SECURITY_CLONE,
    data: { id: id },
  });
}

/* delete a dataset
 * id: dataset id
 */
export function API_AI_SECURITY_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.AI_SECURITY_DELETE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_AI_SECURITY_EXECUTE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_SECURITY_EXECUTE,
    params: { id: id },
  });
}

/* get all groups
 *
 */
export function API_AI_SECURITY_CATEGORY() {
  return defHttp.post<AxiosResponse>({
    url: API.AI_SECURITY_CATEGORY,
  });
}
