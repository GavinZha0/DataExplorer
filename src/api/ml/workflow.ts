import { ApiListReqType, ApiPublicReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiWorkflowDataType } from '/@/api/ml/model/workflow';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  WORKFLOW_LIST: '/workflow/list',
  WORKFLOW_TREE: '/workflow/tree',
  WORKFLOW_CREATE: '/workflow/create',
  WORKFLOW_UPDATE: '/workflow/update',
  WORKFLOW_PUBLIC: '/workflow/public',
  WORKFLOW_CLONE: '/workflow/clone',
  WORKFLOW_DELETE: '/workflow/delete',
  WORKFLOW_EXECUTE: '/workflow/execute',
  WORKFLOW_EXECUTE_SQL: '/workflow/execute_sql',
  WORKFLOW_CATEGORY: '/workflow/category',
  WORKFLOW_ONE: '/workflow/getone'
}

/* get all algo as list
 * params: ApiListReqType
 */
export function API_WORKFLOW_LIST(params?: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.WORKFLOW_LIST,
    params,
  });
}

/* get specific dataset
 * id: dataset id
 */
export function API_WORKFLOW_ONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.WORKFLOW_ONE,
    data: { id: id },
  });
}

/* create a new dataset
 * params: ApiDatasetDataType without id
 */
export function API_WORKFLOW_CREATE(params: Omit<ApiWorkflowDataType, 'id'>) {
  return defHttp.post<AxiosResponse>({
    url: API.WORKFLOW_CREATE,
    params,
  });
}

/* update dataset info
 * params: ApiDatasetDataType
 */
export function API_WORKFLOW_UPDATE(params: ApiWorkflowDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.WORKFLOW_UPDATE,
    params,
  });
}

/* set dataset to public
 * id: dataset id
 * pub: public flag
 */
export function API_WORKFLOW_PUBLIC(id: number, pub: boolean) {
  const params: ApiPublicReqType = {
    id: id,
    pub: pub,
  };
  return defHttp.post<AxiosResponse>({
    url: API.WORKFLOW_PUBLIC,
    params,
  });
}

/* clone a dataset
 * id: dataset id
 */
export function API_WORKFLOW_CLONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.WORKFLOW_CLONE,
    data: { id: id },
  });
}

/* delete a dataset
 * id: dataset id
 */
export function API_WORKFLOW_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.WORKFLOW_DELETE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_WORKFLOW_EXECUTE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.WORKFLOW_EXECUTE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_WORKFLOW_EXECUTE_SCRIPT(params: ApiWorkflowDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.WORKFLOW_EXECUTE_SCRIPT,
    method: 'POST',
    data: params,
  });
}

/* get all groups
 *
 */
export function API_WORKFLOW_CATEGORY() {
  return defHttp.post<AxiosResponse>({
    url: API.WORKFLOW_CATEGORY,
  });
}