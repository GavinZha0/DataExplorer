import { ApiListReqType, ApiPublicReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiImageDataType } from '/@/api/ai/model/image';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  AI_IMAGE_LIST: '/aiimage/list',
  AI_IMAGE_TREE: 'aiimage/tree',
  AI_IMAGE_CREATE: '/aiimage/create',
  AI_IMAGE_UPDATE: '/aiimage/update',
  AI_IMAGE_UPLOAD: '/aiimage/upload',
  AI_IMAGE_PUBLIC: '/aiimage/public',
  AI_IMAGE_CLONE: 'aiimage/clone',
  AI_IMAGE_DELETE: '/aiimage/delete',
  AI_IMAGE_EXECUTE: '/aiimage/execute',
  AI_IMAGE_CATEGORY: '/aiimage/category',
  AI_IMAGE_ONE: '/aiimage/getone',
}

/* get all algo as list
 * params: ApiListReqType
 */
export function API_AI_IMAGE_LIST(params?: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_IMAGE_LIST,
    params,
  });
}

/* get group->dataset tree
 *
 */
export function API_AI_IMAGE_TREE() {
  return defHttp.post<AxiosResponse>({
    url: API.AI_IMAGE_TREE,
  });
}

/* get specific dataset
 * id: dataset id
 */
export function API_AI_IMAGE_ONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_IMAGE_ONE,
    data: { id: id },
  });
}

/* create a new dataset
 * params: ApiDatasetDataType without id
 */
export function API_AI_IMAGE_CREATE(params: Omit<ApiImageDataType, 'id'>) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_IMAGE_CREATE,
    params,
  });
}

/* update dataset info
 * params: ApiDatasetDataType
 */
export function API_AI_IMAGE_UPDATE(params: ApiImageDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_IMAGE_UPDATE,
    params,
  });
}

export function API_AI_IMAGE_UPLOAD(formData: FormData, progressFunc: any): Promise<any> {
  return defHttp.post<AxiosResponse>({
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: progressFunc,
    url: API.AI_IMAGE_UPLOAD,
    data: formData
  });
}

/* set dataset to public
 * id: dataset id
 * pub: public flag
 */
export function API_AI_IMAGE_PUBLIC(id: number, pub: boolean) {
  const params: ApiPublicReqType = {
    id: id,
    pub: pub,
  };
  return defHttp.post<AxiosResponse>({
    url: API.AI_IMAGE_PUBLIC,
    params,
  });
}

/* clone a dataset
 * id: dataset id
 */
export function API_AI_IMAGE_CLONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_IMAGE_CLONE,
    data: { id: id },
  });
}

/* delete a dataset
 * id: dataset id
 */
export function API_AI_IMAGE_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.AI_IMAGE_DELETE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_AI_IMAGE_EXECUTE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_IMAGE_EXECUTE,
    params: { id: id },
  });
}

/* get all groups
 *
 */
export function API_AI_IMAGE_CATEGORY() {
  return defHttp.post<AxiosResponse>({
    url: API.AI_IMAGE_CATEGORY,
  });
}
