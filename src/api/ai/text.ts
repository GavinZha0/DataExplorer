import { ApiListReqType, ApiPublicReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiImageDataType } from '/@/api/ai/model/image';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  AI_TEXT_LIST: '/aitext/list',
  AI_TEXT_TREE: 'aitext/tree',
  AI_TEXT_CREATE: '/aitext/create',
  AI_TEXT_UPDATE: '/aitext/update',
  AI_TEXT_UPLOAD: '/aitext/upload',
  AI_TEXT_PUBLIC: '/aitext/public',
  AI_TEXT_CLONE: 'aitext/clone',
  AI_TEXT_DELETE: '/aitext/delete',
  AI_TEXT_EXECUTE: '/aitext/execute',
  AI_TEXT_CATEGORY: '/aitext/category',
  AI_TEXT_ONE: '/aitext/getone',
}

/* get all algo as list
 * params: ApiListReqType
 */
export function API_AI_TEXT_LIST(params?: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_TEXT_LIST,
    params,
  });
}

/* get group->dataset tree
 *
 */
export function API_AI_TEXT_TREE() {
  return defHttp.post<AxiosResponse>({
    url: API.AI_TEXT_TREE,
  });
}

/* get specific dataset
 * id: dataset id
 */
export function API_AI_TEXT_ONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_TEXT_ONE,
    data: { id: id },
  });
}

/* create a new dataset
 * params: ApiDatasetDataType without id
 */
export function API_AI_TEXT_CREATE(params: Omit<ApiImageDataType, 'id'>) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_TEXT_CREATE,
    params,
  });
}

/* update dataset info
 * params: ApiDatasetDataType
 */
export function API_AI_TEXT_UPDATE(params: ApiImageDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_TEXT_UPDATE,
    params,
  });
}

export function API_AI_TEXT_UPLOAD(formData: FormData, progressFunc: any): Promise<any> {
  return defHttp.post<AxiosResponse>({
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: progressFunc,
    url: API.AI_TEXT_UPLOAD,
    data: formData
  });
}

/* set dataset to public
 * id: dataset id
 * pub: public flag
 */
export function API_AI_TEXT_PUBLIC(id: number, pub: boolean) {
  const params: ApiPublicReqType = {
    id: id,
    pub: pub,
  };
  return defHttp.post<AxiosResponse>({
    url: API.AI_TEXT_PUBLIC,
    params,
  });
}

/* clone a dataset
 * id: dataset id
 */
export function API_AI_TEXT_CLONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_TEXT_CLONE,
    data: { id: id },
  });
}

/* delete a dataset
 * id: dataset id
 */
export function API_AI_TEXT_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.AI_TEXT_DELETE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_AI_TEXT_EXECUTE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_TEXT_EXECUTE,
    params: { id: id },
  });
}

/* get all groups
 *
 */
export function API_AI_TEXT_CATEGORY() {
  return defHttp.post<AxiosResponse>({
    url: API.AI_TEXT_CATEGORY,
  });
}
