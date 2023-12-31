import { ApiListReqType, ApiPublicReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiModelDataType } from '/@/api/ml/model/model';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  ML_MODEL_LIST: '/mlmodel/list',
  ML_MODEL_TREE: '/mlmodel/tree',
  ML_MODEL_CREATE: '/mlmodel/create',
  ML_MODEL_UPDATE: '/mlmodel/update',
  ML_MODEL_PUBLIC: '/mlmodel/public',
  ML_MODEL_CLONE: 'mlmodel/clone',
  ML_MODEL_DELETE: '/mlmodel/delete',
  ML_MODEL_EXECUTE: '/mlmodel/execute',
  ML_MODEL_EXECUTE_SCRIPT: '/mlmodel/execute_script',
  ML_MODEL_CATEGORY: '/mlmodel/category',
  ML_MODEL_GROUPS: '/mlmodel/groups',
  ML_MODEL_ONE: '/mlmodel/getone'
}

/* get all algo as list
 * params: ApiListReqType
 */
export function API_ML_MODEL_LIST(params?: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_MODEL_LIST,
    params,
  });
}

/* get specific dataset
 * id: dataset id
 */
export function API_ML_MODEL_ONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_MODEL_ONE,
    data: { id: id },
  });
}

/* create a new dataset
 * params: ApiDatasetDataType without id
 */
export function API_ML_MODEL_CREATE(params: Omit<ApiModelDataType, 'id'>) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_MODEL_CREATE,
    params,
  });
}

/* update dataset info
 * params: ApiDatasetDataType
 */
export function API_ML_MODEL_UPDATE(params: ApiModelDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_MODEL_UPDATE,
    params,
  });
}

/* set dataset to public
 * id: dataset id
 * pub: public flag
 */
export function API_ML_MODEL_PUBLIC(id: number, pub: boolean) {
  const params: ApiPublicReqType = {
    id: id,
    pub: pub,
  };
  return defHttp.post<AxiosResponse>({
    url: API.ML_MODEL_PUBLIC,
    params,
  });
}

/* clone a dataset
 * id: dataset id
 */
export function API_ML_MODEL_CLONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_MODEL_CLONE,
    data: { id: id },
  });
}

/* delete a dataset
 * id: dataset id
 */
export function API_ML_MODEL_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.ML_MODEL_DELETE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_ML_MODEL_EXECUTE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_MODEL_EXECUTE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_ML_MODEL_EXECUTE_SCRIPT(params: ApiModelDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_MODEL_EXECUTE_SCRIPT,
    method: 'POST',
    data: params,
  });
}

/* get all groups
 *
 */
export function API_ML_MODEL_CATEGORY() {
  return defHttp.post<AxiosResponse>({
    url: API.ML_MODEL_CATEGORY,
  });
}

/* get all groups
 *
 */
export function API_ML_MODEL_GROUPS() {
  return defHttp.post<AxiosResponse>({
    url: API.ML_MODEL_GROUPS,
  });
}