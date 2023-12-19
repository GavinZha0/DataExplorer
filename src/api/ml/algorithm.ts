import { ApiListReqType, ApiPublicReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiAlgorithmDataType } from '/@/api/ml/model/algorithm';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  ML_ALGO_LIST: '/mlalgo/list',
  ML_ALGO_TREE: '/mlalgo/tree',
  ML_ALGO_CREATE: '/mlalgo/create',
  ML_ALGO_UPDATE: '/mlalgo/update',
  ML_ALGO_PUBLIC: '/mlalgo/public',
  ML_ALGO_CLONE: 'algorithm/clone',
  ML_ALGO_DELETE: '/mlalgo/delete',
  ML_ALGO_EXECUTE: '/mlalgo/execute',
  ML_ALGO_EXECUTE_SCRIPT: '/mlalgo/execute_script',
  ML_ALGO_CATEGORY: '/mlalgo/category',
  ML_ALGO_ONE: '/mlalgo/getone',
}

/* get all algo as list
 * params: ApiListReqType
 */
export function API_ML_ALGO_LIST(params?: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_ALGO_LIST,
    params,
  });
}

/* get group->dataset tree
 *
 */
export function API_ML_ALGO_TREE() {
  return defHttp.post<AxiosResponse>({
    url: API.ML_ALGO_TREE,
  });
}

/* get specific dataset
 * id: dataset id
 */
export function API_ML_ALGO_ONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_ALGO_ONE,
    data: { id: id },
  });
}

/* create a new dataset
 * params: ApiDatasetDataType without id
 */
export function API_ML_ALGO_CREATE(params: Omit<ApiAlgorithmDataType, 'id'>) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_ALGO_CREATE,
    params,
  });
}

/* update dataset info
 * params: ApiDatasetDataType
 */
export function API_ML_ALGO_UPDATE(params: ApiAlgorithmDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_ALGO_UPDATE,
    params,
  });
}

/* set dataset to public
 * id: dataset id
 * pub: public flag
 */
export function API_ML_ALGO_PUBLIC(id: number, pub: boolean) {
  const params: ApiPublicReqType = {
    id: id,
    pub: pub,
  };
  return defHttp.post<AxiosResponse>({
    url: API.ML_ALGO_PUBLIC,
    params,
  });
}

/* clone a dataset
 * id: dataset id
 */
export function API_ML_ALGO_CLONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_ALGO_CLONE,
    data: { id: id },
  });
}

/* delete a dataset
 * id: dataset id
 */
export function API_ML_ALGO_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.ML_ALGO_DELETE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_ML_ALGO_EXECUTE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_ALGO_EXECUTE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_ML_ALGO_EXECUTE_SCRIPT(params: ApiAlgorithmDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_ALGO_EXECUTE_SCRIPT,
    method: 'POST',
    data: params,
  });
}

/* get all groups
 *
 */
export function API_ML_ALGO_CATEGORY() {
  return defHttp.post<AxiosResponse>({
    url: API.ML_ALGO_CATEGORY,
  });
}
