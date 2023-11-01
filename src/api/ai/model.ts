import { ApiListReqType, ApiPublicReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiImageDataType } from '/@/api/ai/model/image';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  AI_MODEL_LIST: '/aimodel/list',
  AI_MODEL_TREE: '/aimodel/tree',
  AI_MODEL_CREATE: '/aimodel/create',
  AI_MODEL_UPDATE: '/aimodel/update',
  AI_MODEL_UPLOAD: '/aimodel/upload',
  AI_MODEL_PUBLIC: '/aimodel/public',
  AI_MODEL_CLONE: 'model/clone',
  AI_MODEL_DELETE: '/aimodel/delete',
  AI_MODEL_EXECUTE: '/aimodel/execute',
  AI_MODEL_EXECUTE_SCRIPT: '/aimodel/execute_script',
  AI_MODEL_CATEGORY: '/aimodel/category',
  AI_MODEL_GROUPS: '/aimodel/groups',
  AI_MODEL_TYPES: '/aimodel/types',
  AI_MODEL_ONE: '/aimodel/getone'
}

/* get all algo as list
 * params: ApiListReqType
 */
export function API_AI_MODEL_LIST(params?: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_MODEL_LIST,
    params,
  });
}

/* get group->dataset tree
 *
 */
export function API_AI_MODEL_TREE() {
  return defHttp.post<AxiosResponse>({
    url: API.AI_MODEL_TREE,
  });
}

/* get specific dataset
 * id: dataset id
 */
export function API_AI_MODEL_ONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_MODEL_ONE,
    data: { id: id },
  });
}

/* create a new dataset
 * params: ApiDatasetDataType without id
 */
export function API_AI_MODEL_CREATE(params: Omit<ApiImageDataType, 'id'>) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_MODEL_CREATE,
    params,
  });
}

/* update dataset info
 * params: ApiDatasetDataType
 */
export function API_AI_MODEL_UPDATE(params: ApiImageDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_MODEL_UPDATE,
    params,
  });
}

export function API_AI_MODEL_UPLOAD(formData: FormData, progressFunc: any): Promise<any> {
  return defHttp.post<AxiosResponse>({
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: progressFunc,
    url: API.AI_MODEL_UPLOAD,
    data: formData
  });
}

/* set dataset to public
 * id: dataset id
 * pub: public flag
 */
export function API_AI_MODEL_PUBLIC(id: number, pub: boolean) {
  const params: ApiPublicReqType = {
    id: id,
    pub: pub,
  };
  return defHttp.post<AxiosResponse>({
    url: API.AI_MODEL_PUBLIC,
    params,
  });
}

/* clone a dataset
 * id: dataset id
 */
export function API_AI_MODEL_CLONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_MODEL_CLONE,
    data: { id: id },
  });
}

/* delete a dataset
 * id: dataset id
 */
export function API_AI_MODEL_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.AI_MODEL_DELETE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_AI_MODEL_EXECUTE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_MODEL_EXECUTE,
    params: { id: id },
  });
}

/* get all groups
 *
 */
export function API_AI_MODEL_CATEGORY() {
  return defHttp.post<AxiosResponse>({
    url: API.AI_MODEL_CATEGORY,
  });
}

/* get all groups
 *
 */
export function API_AI_MODEL_GROUPS() {
  return defHttp.post<AxiosResponse>({
    url: API.AI_MODEL_GROUPS,
  });
}

/* get all types
 *
 */
export function API_AI_MODEL_TYPES() {
  return defHttp.post<AxiosResponse>({
    url: API.AI_MODEL_TYPES,
  });
}