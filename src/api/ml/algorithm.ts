import { ApiListReqType, ApiPublicReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiAlgorithmDataType } from '/@/api/ml/model/algorithm';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  ALGORITHM_LIST: '/algorithm/list',
  ALGORITHM_TREE: 'algorithm/tree',
  ALGORITHM_CREATE: '/algorithm/create',
  ALGORITHM_UPDATE: '/algorithm/update',
  ALGORITHM_PUBLIC: '/algorithm/public',
  ALGORITHM_CLONE: 'algorithm/clone',
  ALGORITHM_DELETE: '/algorithm/delete',
  ALGORITHM_EXECUTE: '/algorithm/execute',
  ALGORITHM_EXECUTE_SCRIPT: '/algorithm/execute_script',
  ALGORITHM_CATEGORY: '/algorithm/category',
  ALGORITHM_ONE: '/algorithm/getone',
}

/* get all algo as list
 * params: ApiListReqType
 */
export function API_ALGORITHM_LIST(params?: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.ALGORITHM_LIST,
    params,
  });
}

/* get group->dataset tree
 *
 */
export function API_ALGORITHM_TREE() {
  return defHttp.post<AxiosResponse>({
    url: API.ALGORITHM_TREE,
  });
}

/* get specific dataset
 * id: dataset id
 */
export function API_ALGORITHM_ONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ALGORITHM_ONE,
    data: { id: id },
  });
}

/* create a new dataset
 * params: ApiDatasetDataType without id
 */
export function API_ALGORITHM_CREATE(params: Omit<ApiAlgorithmDataType, 'id'>) {
  return defHttp.post<AxiosResponse>({
    url: API.ALGORITHM_CREATE,
    params,
  });
}

/* update dataset info
 * params: ApiDatasetDataType
 */
export function API_ALGORITHM_UPDATE(params: ApiAlgorithmDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.ALGORITHM_UPDATE,
    params,
  });
}

/* set dataset to public
 * id: dataset id
 * pub: public flag
 */
export function API_ALGORITHM_PUBLIC(id: number, pub: boolean) {
  const params: ApiPublicReqType = {
    id: id,
    pub: pub,
  };
  return defHttp.post<AxiosResponse>({
    url: API.ALGORITHM_PUBLIC,
    params,
  });
}

/* clone a dataset
 * id: dataset id
 */
export function API_ALGORITHM_CLONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ALGORITHM_CLONE,
    data: { id: id },
  });
}

/* delete a dataset
 * id: dataset id
 */
export function API_ALGORITHM_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.ALGORITHM_DELETE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_ALGORITHM_EXECUTE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ALGORITHM_EXECUTE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_ALGORITHM_EXECUTE_SCRIPT(params: ApiAlgorithmDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.ALGORITHM_EXECUTE_SCRIPT,
    method: 'POST',
    data: params,
  });
}

/* get all groups
 *
 */
export function API_ALGORITHM_CATEGORY() {
  return defHttp.post<AxiosResponse>({
    url: API.ALGORITHM_CATEGORY,
  });
}
