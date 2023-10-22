import { ApiListReqType, ApiPublicReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiModelDataType } from '/@/api/ml/model/model';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  MODEL_LIST: '/model/list',
  MODEL_TREE: 'model/tree',
  MODEL_CREATE: '/model/create',
  MODEL_UPDATE: '/model/update',
  MODEL_PUBLIC: '/model/public',
  MODEL_CLONE: 'model/clone',
  MODEL_DELETE: '/model/delete',
  MODEL_EXECUTE: '/model/execute',
  MODEL_EXECUTE_SCRIPT: '/model/execute_script',
  MODEL_CATEGORY: '/model/category',
  MODEL_ONE: '/model/getone'
}

/* get all algo as list
 * params: ApiListReqType
 */
export function API_MODEL_LIST(params?: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.MODEL_LIST,
    params,
  });
}

/* get specific dataset
 * id: dataset id
 */
export function API_MODEL_ONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.MODEL_ONE,
    data: { id: id },
  });
}

/* create a new dataset
 * params: ApiDatasetDataType without id
 */
export function API_MODEL_CREATE(params: Omit<ApiModelDataType, 'id'>) {
  return defHttp.post<AxiosResponse>({
    url: API.MODEL_CREATE,
    params,
  });
}

/* update dataset info
 * params: ApiDatasetDataType
 */
export function API_MODEL_UPDATE(params: ApiModelDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.MODEL_UPDATE,
    params,
  });
}

/* set dataset to public
 * id: dataset id
 * pub: public flag
 */
export function API_MODEL_PUBLIC(id: number, pub: boolean) {
  const params: ApiPublicReqType = {
    id: id,
    pub: pub,
  };
  return defHttp.post<AxiosResponse>({
    url: API.MODEL_PUBLIC,
    params,
  });
}

/* clone a dataset
 * id: dataset id
 */
export function API_MODEL_CLONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.MODEL_CLONE,
    data: { id: id },
  });
}

/* delete a dataset
 * id: dataset id
 */
export function API_MODEL_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.MODEL_DELETE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_MODEL_EXECUTE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.MODEL_EXECUTE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_MODEL_EXECUTE_SCRIPT(params: ApiModelDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.MODEL_EXECUTE_SCRIPT,
    method: 'POST',
    data: params,
  });
}

/* get all groups
 *
 */
export function API_MODEL_CATEGORY() {
  return defHttp.post<AxiosResponse>({
    url: API.MODEL_CATEGORY,
  });
}