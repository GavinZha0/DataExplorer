import { ApiListReqType, ApiPublicReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiImageDataType } from '/@/api/ai/model/image';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  AI_AUDIO_LIST: '/aiaudio/list',
  AI_AUDIO_TREE: 'aiaudio/tree',
  AI_AUDIO_CREATE: '/aiaudio/create',
  AI_AUDIO_UPDATE: '/aiaudio/update',
  AI_AUDIO_UPLOAD: '/aiaudio/upload',
  AI_AUDIO_PUBLIC: '/aiaudio/public',
  AI_AUDIO_CLONE: 'aiaudio/clone',
  AI_AUDIO_DELETE: '/aiaudio/delete',
  AI_AUDIO_EXECUTE: '/aiaudio/execute',
  AI_AUDIO_CATEGORY: '/aiaudio/category',
  AI_AUDIO_ONE: '/aiaudio/getone',
}

/* get all algo as list
 * params: ApiListReqType
 */
export function API_AI_AUDIO_LIST(params?: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_AUDIO_LIST,
    params,
  });
}

/* get group->dataset tree
 *
 */
export function API_AI_AUDIO_TREE() {
  return defHttp.post<AxiosResponse>({
    url: API.AI_AUDIO_TREE,
  });
}

/* get specific dataset
 * id: dataset id
 */
export function API_AI_AUDIO_ONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_AUDIO_ONE,
    data: { id: id },
  });
}

/* create a new dataset
 * params: ApiDatasetDataType without id
 */
export function API_AI_AUDIO_CREATE(params: Omit<ApiImageDataType, 'id'>) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_AUDIO_CREATE,
    params,
  });
}

/* update dataset info
 * params: ApiDatasetDataType
 */
export function API_AI_AUDIO_UPDATE(params: ApiImageDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_AUDIO_UPDATE,
    params,
  });
}

export function API_AI_AUDIO_UPLOAD(formData: FormData, progressFunc: any): Promise<any> {
  return defHttp.post<AxiosResponse>({
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: progressFunc,
    url: API.AI_AUDIO_UPLOAD,
    data: formData
  });
}

/* set dataset to public
 * id: dataset id
 * pub: public flag
 */
export function API_AI_AUDIO_PUBLIC(id: number, pub: boolean) {
  const params: ApiPublicReqType = {
    id: id,
    pub: pub,
  };
  return defHttp.post<AxiosResponse>({
    url: API.AI_AUDIO_PUBLIC,
    params,
  });
}

/* clone a dataset
 * id: dataset id
 */
export function API_AI_AUDIO_CLONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_AUDIO_CLONE,
    data: { id: id },
  });
}

/* delete a dataset
 * id: dataset id
 */
export function API_AI_AUDIO_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.AI_AUDIO_DELETE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_AI_AUDIO_EXECUTE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_AUDIO_EXECUTE,
    params: { id: id },
  });
}

/* get all groups
 *
 */
export function API_AI_AUDIO_CATEGORY() {
  return defHttp.post<AxiosResponse>({
    url: API.AI_AUDIO_CATEGORY,
  });
}
