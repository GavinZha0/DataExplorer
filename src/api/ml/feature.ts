import { ApiListReqType, ApiPublicReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiMlFeatureDataType } from '/@/api/ml/model/feature';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  ML_FEATURE_LIST: '/mlfeature/list',
  ML_FEATURE_TREE: '/mlfeature/tree',
  ML_FEATURE_CREATE: '/mlfeature/create',
  ML_FEATURE_UPDATE: '/mlfeature/update',
  ML_FEATURE_PUBLIC: '/mlfeature/public',
  ML_FEATURE_CLONE: 'algorithm/clone',
  ML_FEATURE_DELETE: '/mlfeature/delete',
  ML_FEATURE_EXECUTE: '/mlfeature/execute',
  ML_FEATURE_EXECUTE_SCRIPT: '/mlfeature/execute_script',
  ML_FEATURE_GROUPS: '/mlfeature/groups',
  ML_FEATURE_ONE: '/mlfeature/getone',
}

/* get all algo as list
 * params: ApiListReqType
 */
export function API_ML_FEATURE_LIST(params?: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_FEATURE_LIST,
    params,
  });
}

/* get group->dataset tree
 *
 */
export function API_ML_FEATURE_TREE() {
  return defHttp.post<AxiosResponse>({
    url: API.ML_FEATURE_TREE,
  });
}

/* get specific dataset
 * id: dataset id
 */
export function API_ML_FEATURE_ONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_FEATURE_ONE,
    data: { id: id },
  });
}

/* create a new dataset
 * params: ApiDatasetDataType without id
 */
export function API_ML_FEATURE_CREATE(params: Omit<ApiMlFeatureDataType, 'id'>) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_FEATURE_CREATE,
    params,
  });
}

/* update dataset info
 * params: ApiDatasetDataType
 */
export function API_ML_FEATURE_UPDATE(params: ApiMlFeatureDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_FEATURE_UPDATE,
    params,
  });
}

/* set dataset to public
 * id: dataset id
 * pub: public flag
 */
export function API_ML_FEATURE_PUBLIC(id: number, pub: boolean) {
  const params: ApiPublicReqType = {
    id: id,
    pub: pub,
  };
  return defHttp.post<AxiosResponse>({
    url: API.ML_FEATURE_PUBLIC,
    params,
  });
}

/* clone a dataset
 * id: dataset id
 */
export function API_ML_FEATURE_CLONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_FEATURE_CLONE,
    data: { id: id },
  });
}

/* delete a dataset
 * id: dataset id
 */
export function API_ML_FEATURE_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.ML_FEATURE_DELETE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_ML_FEATURE_EXECUTE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_FEATURE_EXECUTE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_ML_FEATURE_EXECUTE_SCRIPT(params: ApiMlFeatureDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_FEATURE_EXECUTE_SCRIPT,
    method: 'POST',
    data: params,
  });
}

/* get all groups
 *
 */
export function API_ML_FEATURE_GROUPS() {
  return defHttp.post<AxiosResponse>({
    url: API.ML_FEATURE_GROUPS,
  });
}
