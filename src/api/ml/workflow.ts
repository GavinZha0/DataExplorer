import { ApiListReqType, ApiPublicReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiWorkflowDataType } from '/@/api/ml/model/workflow';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  ML_WORKFLOW_LIST: '/mlworkflow/list',
  ML_WORKFLOW_TREE: '/mlworkflow/tree',
  ML_WORKFLOW_CREATE: '/mlworkflow/create',
  ML_WORKFLOW_UPDATE: '/mlworkflow/update',
  ML_WORKFLOW_PUBLIC: '/mlworkflow/public',
  ML_WORKFLOW_CLONE: '/mlworkflow/clone',
  ML_WORKFLOW_DELETE: '/mlworkflow/delete',
  ML_WORKFLOW_EXECUTE: '/mlworkflow/execute',
  ML_WORKFLOW_EXECUTE_SQL: '/mlworkflow/execute_sql',
  ML_WORKFLOW_CATEGORY: '/mlworkflow/category',
  ML_WORKFLOW_GROUPS: '/mlworkflow/groups',
  ML_WORKFLOW_ONE: '/mlworkflow/getone'
}

/* get all algo as list
 * params: ApiListReqType
 */
export function API_ML_WORKFLOW_LIST(params?: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_WORKFLOW_LIST,
    params,
  });
}

/* get specific dataset
 * id: dataset id
 */
export function API_ML_WORKFLOW_ONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_WORKFLOW_ONE,
    data: { id: id },
  });
}

/* create a new dataset
 * params: ApiDatasetDataType without id
 */
export function API_ML_WORKFLOW_CREATE(params: Omit<ApiWorkflowDataType, 'id'>) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_WORKFLOW_CREATE,
    params,
  });
}

/* update dataset info
 * params: ApiDatasetDataType
 */
export function API_ML_WORKFLOW_UPDATE(params: ApiWorkflowDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_WORKFLOW_UPDATE,
    params,
  });
}

/* set dataset to public
 * id: dataset id
 * pub: public flag
 */
export function API_ML_WORKFLOW_PUBLIC(id: number, pub: boolean) {
  const params: ApiPublicReqType = {
    id: id,
    pub: pub,
  };
  return defHttp.post<AxiosResponse>({
    url: API.ML_WORKFLOW_PUBLIC,
    params,
  });
}

/* clone a dataset
 * id: dataset id
 */
export function API_ML_WORKFLOW_CLONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_WORKFLOW_CLONE,
    data: { id: id },
  });
}

/* delete a dataset
 * id: dataset id
 */
export function API_ML_WORKFLOW_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.ML_WORKFLOW_DELETE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_ML_WORKFLOW_EXECUTE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_WORKFLOW_EXECUTE,
    params: { id: id },
  });
}

/* get all groups
 *
 */
export function API_ML_WORKFLOW_CATEGORY() {
  return defHttp.post<AxiosResponse>({
    url: API.ML_WORKFLOW_CATEGORY,
  });
}

/* get all groups
 *
 */
export function API_ML_WORKFLOW_GROUPS() {
  return defHttp.post<AxiosResponse>({
    url: API.ML_WORKFLOW_GROUPS,
  });
}