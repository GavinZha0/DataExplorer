import { ApiListReqType, ApiPublicReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiMlEdaDataType } from '/@/api/ml/model/eda';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  ML_EDA_LIST: '/ml/eda/list',
  ML_EDA_TREE: '/ml/eda/tree',
  ML_EDA_CREATE: '/ml/eda/create',
  ML_EDA_UPDATE: '/ml/eda/update',
  ML_EDA_PUBLIC: '/ml/eda/public',
  ML_EDA_CLONE: '/ml/eda/clone',
  ML_EDA_DELETE: '/ml/eda/delete',
  ML_EDA_BUILD: '/py/ml/eda/build',
  ML_EDA_SELECT: '/ml/eda/select',
  ML_EDA_EXECUTE: '/ml/eda/execute',
  ML_EDA_EXECUTE_SCRIPT: '/ml/eda/execute_script',
  ML_EDA_GROUPS: '/ml/eda/groups',
  ML_EDA_ONE: '/ml/eda/getone',
}

/* get all algo as list
 * params: ApiListReqType
 */
export function API_ML_EDA_LIST(params?: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_EDA_LIST,
    params,
  });
}

/* get group->dataset tree
 *
 */
export function API_ML_EDA_TREE() {
  return defHttp.post<AxiosResponse>({
    url: API.ML_EDA_TREE,
  });
}

/* get specific dataset
 * id: dataset id
 */
export function API_ML_EDA_ONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_EDA_ONE,
    data: { id: id },
  });
}

/* create a new dataset
 * params: ApiDatasetDataType without id
 */
export function API_ML_EDA_CREATE(params: Omit<ApiMlEdaDataType, 'id'>) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_EDA_CREATE,
    params,
  });
}

/* update dataset info
 * params: ApiDatasetDataType
 */
export function API_ML_EDA_UPDATE(params: ApiMlEdaDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_EDA_UPDATE,
    params,
  });
}

/* set dataset to public
 * id: dataset id
 * pub: public flag
 */
export function API_ML_EDA_PUBLIC(id: number, pub: boolean) {
  const params: ApiPublicReqType = {
    id: id,
    pub: pub,
  };
  return defHttp.post<AxiosResponse>({
    url: API.ML_EDA_PUBLIC,
    params,
  });
}

/* clone a dataset
 * id: dataset id
 */
export function API_ML_EDA_CLONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_EDA_CLONE,
    data: { id: id },
  });
}

/* delete a dataset
 * id: dataset id
 */
export function API_ML_EDA_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.ML_EDA_DELETE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_ML_EDA_BUILD(id: number, tier: string, kind: string, config: any) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_EDA_BUILD,
    params: { dataset_id: id, tier: tier, kind: kind, config: config },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_ML_FEATURE_SELECT(id: number, config: any[]) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_EDA_SELECT,
    params: { dataset_id: id, config: config },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_ML_EDA_EXECUTE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_EDA_EXECUTE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_ML_EDA_EXECUTE_SCRIPT(params: ApiMlEdaDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_EDA_EXECUTE_SCRIPT,
    method: 'POST',
    data: params,
  });
}

/* get all groups
 *
 */
export function API_ML_EDA_GROUPS() {
  return defHttp.post<AxiosResponse>({
    url: API.ML_EDA_GROUPS,
  });
}
