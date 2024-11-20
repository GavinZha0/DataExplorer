import { ApiListReqType, ApiPublicReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiAiModelDataType } from '/@/api/ai/model/model';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  AI_MODEL_LIST: '/ai/model/list',
  AI_MODEL_TREE: '/ai/model/tree',
  AI_MODEL_CREATE: '/ai/model/create',
  AI_MODEL_UPDATE: '/ai/model/update',
  AI_MODEL_UPLOAD: '/ai/model/upload',
  AI_MODEL_PUBLIC: '/ai/model/public',
  AI_MODEL_CLONE: '/ai/model/clone',
  AI_MODEL_DELETE: '/ai/model/delete',
  AI_MODEL_REMOVE: '/ai/model/remove',
  AI_MODEL_DEPLOY: '/py/ai/model/deploy',
  AI_MODEL_CATEGORY: '/ai/model/category',
  AI_MODEL_GROUPS: '/ai/model/groups',
  AI_MODEL_TYPES: '/ai/model/types',
  AI_MODEL_ONE: '/ai/model/getone'
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
export function API_AI_MODEL_CREATE(params: Omit<ApiAiModelDataType, 'id'>) {
  // default values
  if(!params.deployTo){
    params.deployTo = 'MlFlow';
  }
  if(!params.endpoint){
    params.endpoint = 'http://127.0.0.1:7788/invocations';
  }
  if(!params.price){
    params.price = '0';
  }

  return defHttp.post<AxiosResponse>({
    url: API.AI_MODEL_CREATE,
    params,
  });
}

/* update dataset info
 * params: ApiDatasetDataType
 */
export function API_AI_MODEL_UPDATE(params: ApiAiModelDataType) {
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

/* delete a AI model
 * id: model id
 */
export function API_AI_MODEL_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.AI_MODEL_DELETE,
    params: { id: id },
  });
}

/* delete a AI model
 * id: algo id
* version: registered version
 */
export function API_AI_MODEL_REMOVE(algoId: number, version: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_MODEL_REMOVE,
    data: { algoId: algoId, version: version },
  });
}

/* deploy model to a platform
 * id: store id
 */
export function API_AI_MODEL_DEPLOY(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_MODEL_DEPLOY,
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