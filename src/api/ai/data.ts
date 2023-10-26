import { ApiListReqType, ApiPublicReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiImageDataType } from '/@/api/ai/model/image';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  AI_DATA_LIST: '/aidata/list',
  AI_DATA_TREE: 'aidata/tree',
  AI_DATA_CREATE: '/aidata/create',
  AI_DATA_UPDATE: '/aidata/update',
  AI_DATA_UPLOAD: '/aidata/upload',
  AI_DATA_PUBLIC: '/aidata/public',
  AI_DATA_CLONE: 'aidata/clone',
  AI_DATA_DELETE: '/aidata/delete',
  AI_DATA_EXECUTE: '/aidata/execute',
  AI_DATA_CATEGORY: '/aidata/category',
  AI_DATA_ONE: '/aidata/getone',
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
export function API_AI_DATA_CREATE(params: Omit<ApiImageDataType, 'id'>) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_DATA_CREATE,
    params,
  });
}

/* update dataset info
 * params: ApiDatasetDataType
 */
export function API_AI_DATA_UPDATE(params: ApiImageDataType) {
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
export function API_AI_DATA_EXECUTE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_DATA_EXECUTE,
    params: { id: id },
  });
}

/* get all groups
 *
 */
export function API_AI_DATA_CATEGORY() {
  return defHttp.post<AxiosResponse>({
    url: API.AI_DATA_CATEGORY,
  });
}
