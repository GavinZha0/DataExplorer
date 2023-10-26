import { ApiListReqType, ApiPublicReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiImageDataType } from '/@/api/ai/model/image';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  AI_VIDEO_LIST: '/aivideo/list',
  AI_VIDEO_TREE: 'aivideo/tree',
  AI_VIDEO_CREATE: '/aivideo/create',
  AI_VIDEO_UPDATE: '/aivideo/update',
  AI_VIDEO_UPLOAD: '/aivideo/upload',
  AI_VIDEO_PUBLIC: '/aivideo/public',
  AI_VIDEO_CLONE: 'aivideo/clone',
  AI_VIDEO_DELETE: '/aivideo/delete',
  AI_VIDEO_EXECUTE: '/aivideo/execute',
  AI_VIDEO_CATEGORY: '/aivideo/category',
  AI_VIDEO_ONE: '/aivideo/getone',
}

/* get all algo as list
 * params: ApiListReqType
 */
export function API_AI_VIDEO_LIST(params?: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_VIDEO_LIST,
    params,
  });
}

/* get group->dataset tree
 *
 */
export function API_AI_VIDEO_TREE() {
  return defHttp.post<AxiosResponse>({
    url: API.AI_VIDEO_TREE,
  });
}

/* get specific dataset
 * id: dataset id
 */
export function API_AI_VIDEO_ONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_VIDEO_ONE,
    data: { id: id },
  });
}

/* create a new dataset
 * params: ApiDatasetDataType without id
 */
export function API_AI_VIDEO_CREATE(params: Omit<ApiImageDataType, 'id'>) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_VIDEO_CREATE,
    params,
  });
}

/* update dataset info
 * params: ApiDatasetDataType
 */
export function API_AI_VIDEO_UPDATE(params: ApiImageDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_VIDEO_UPDATE,
    params,
  });
}

export function API_AI_VIDEO_UPLOAD(formData: FormData, progressFunc: any): Promise<any> {
  return defHttp.post<AxiosResponse>({
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: progressFunc,
    url: API.AI_VIDEO_UPLOAD,
    data: formData
  });
}

/* set dataset to public
 * id: dataset id
 * pub: public flag
 */
export function API_AI_VIDEO_PUBLIC(id: number, pub: boolean) {
  const params: ApiPublicReqType = {
    id: id,
    pub: pub,
  };
  return defHttp.post<AxiosResponse>({
    url: API.AI_VIDEO_PUBLIC,
    params,
  });
}

/* clone a dataset
 * id: dataset id
 */
export function API_AI_VIDEO_CLONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_VIDEO_CLONE,
    data: { id: id },
  });
}

/* delete a dataset
 * id: dataset id
 */
export function API_AI_VIDEO_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.AI_VIDEO_DELETE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_AI_VIDEO_EXECUTE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.AI_VIDEO_EXECUTE,
    params: { id: id },
  });
}

/* get all groups
 *
 */
export function API_AI_VIDEO_CATEGORY() {
  return defHttp.post<AxiosResponse>({
    url: API.AI_VIDEO_CATEGORY,
  });
}
