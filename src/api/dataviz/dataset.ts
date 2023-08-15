import {ApiDatasetDataType, ApiExeSqlReqType, ColumnFieldType} from './model/dataset';
import { ApiListReqType, ApiPublicReqType, VarFieldType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  DATASET_LIST: '/dataset/list',
  DATASET_TREE: '/dataset/tree',
  DATASET_GET: '/dataset/get',
  DATASET_CREATE: '/dataset/create',
  DATASET_UPDATE: '/dataset/update',
  DATASET_PUBLIC: '/dataset/public',
  DATASET_CLONE: '/dataset/clone',
  DATASET_DELETE: '/dataset/delete',
  DATASET_EXECUTE: '/dataset/execute',
  DATASET_GROUPS: '/dataset/groups',
  DATASET_DETAIL: '/dataset/getone',
};

/* get all datasets as list
 * params: ApiListReqType
 */
export function API_DATASET_LIST(params: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.DATASET_LIST,
    params,
  });
}

/* get group->dataset tree
 *
 */
export function API_DATASET_TREE() {
  return defHttp.post<AxiosResponse>({
    url: API.DATASET_TREE,
  });
}

/* get all groups
 *
 */
export function API_DATASET_GROUPS() {
  return defHttp.post<AxiosResponse>({
    url: API.DATASET_GROUPS,
  });
}

/* get specific dataset
 * id: dataset id
 */
export function API_DATASET_GET(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.DATASET_GET,
    data: { id: id },
  });
}

export function API_DATASET_DETAIL(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.DATASET_DETAIL,
    data: { id: id },
  });
}

/* create a new dataset
 * params: ApiDatasetDataType without id
 */
export function API_DATASET_CREATE(params: Omit<ApiDatasetDataType, 'id'>) {
  return defHttp.post<AxiosResponse>({
    url: API.DATASET_CREATE,
    params,
  });
}

/* update dataset info
 * params: ApiDatasetDataType
 */
export function API_DATASET_UPDATE(params: ApiDatasetDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.DATASET_UPDATE,
    params,
  });
}

/* set dataset to public
 * id: dataset id
 * pub: public flag
 */
export function API_DATASET_PUBLIC(id: number, pub: boolean) {
  const params: ApiPublicReqType = {
    id: id,
    pub: pub,
  };
  return defHttp.post<AxiosResponse>({
    url: API.DATASET_PUBLIC,
    params,
  });
}

/* clone a dataset
 * id: dataset id
 */
export function API_DATASET_CLONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.DATASET_CLONE,
    data: { id: id },
  });
}

/* delete a dataset
 * id: dataset id
 */
export function API_DATASET_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.DATASET_DELETE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_DATASET_EXECUTE(id: number, limit = 0) {
  return defHttp.post<AxiosResponse>({
    url: API.DATASET_EXECUTE,
    params: { id: id, limit: limit },
  });
}
