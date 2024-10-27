import { ApiMlDatasetDataType } from './model/dataset';
import { ApiListReqType, ApiPublicReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  ML_DATASET_LIST: '/ml/dataset/list',
  ML_DATASET_TREE: '/ml/dataset/tree',
  ML_DATASET_GET: '/ml/dataset/get',
  ML_DATASET_CREATE: '/ml/dataset/create',
  ML_DATASET_UPDATE: '/ml/dataset/update',
  ML_DATASET_PUBLIC: '/ml/dataset/public',
  ML_DATASET_CLONE: '/ml/dataset/clone',
  ML_DATASET_DELETE: '/ml/dataset/delete',
  ML_DATASET_EXECUTE: '/py/ml/dataset/execute',
  ML_DATASET_STAT: '/py/ml/dataset/stat',
  ML_DATASET_GROUPS: '/ml/dataset/groups',
  ML_DATASET_IN_GROUP: '/ml/dataset/subset',
  ML_DATASET_DETAIL: '/ml/dataset/getone',
  ML_DATASET_EXTRACT: '/py/ml/dataset/extract',
};

/* get all datasets as list
 * params: ApiListReqType
 */
export function API_ML_DATASET_LIST(params: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_DATASET_LIST,
    params,
  });
}

/* get group->dataset tree
 *
 */
export function API_ML_DATASET_TREE(pub: boolean) {
  let params = {pub: false}
  if(pub){
    params = {pub: true}
  } 
  return defHttp.post<AxiosResponse>({
    url: API.ML_DATASET_TREE,
    params
  });
}

/* get all groups
 *
 */
export function API_ML_DATASET_GROUPS() {
  return defHttp.post<AxiosResponse>({
    url: API.ML_DATASET_GROUPS
  });
}

/* get all groups
 *
 */
export function API_ML_DATASET_IN_GROUP(params: any) {
  if(params?.group == ''){return;}
  return defHttp.post<AxiosResponse>({
    url: API.ML_DATASET_IN_GROUP,
    params,
  });
}

/* get specific dataset
 * id: dataset id
 */
export function API_ML_DATASET_GET(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_DATASET_GET,
    params: { id: id },
  });
}

export function API_ML_DATASET_DETAIL(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_DATASET_DETAIL,
    data: { id: id },
  });
}

/* get specific dataset
 * id: dataset id
 */
export function API_ML_DATASET_EXTRACT() {
  return defHttp.post<AxiosResponse>({
    url: API.ML_DATASET_EXTRACT,
  });
}

/* create a new dataset
 * params: ApiDatasetDataType without id
 */
export function API_ML_DATASET_CREATE(params: Omit<ApiMlDatasetDataType, 'id'>) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_DATASET_CREATE,
    params,
  });
}

/* update dataset info
 * params: ApiDatasetDataType
 */
export function API_ML_DATASET_UPDATE(params: ApiMlDatasetDataType) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_DATASET_UPDATE,
    params,
  });
}

/* set dataset to public
 * id: dataset id
 * pub: public flag
 */
export function API_ML_DATASET_PUBLIC(id: number, pub: boolean) {
  const params: ApiPublicReqType = {
    id: id,
    pub: pub,
  };
  return defHttp.post<AxiosResponse>({
    url: API.ML_DATASET_PUBLIC,
    params,
  });
}

/* clone a dataset
 * id: dataset id
 */
export function API_ML_DATASET_CLONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_DATASET_CLONE,
    data: { id: id },
  });
}

/* delete a dataset
 * id: dataset id
 */
export function API_ML_DATASET_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.ML_DATASET_DELETE,
    params: { id: id },
  });
}

/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_ML_DATASET_EXECUTE(id: number, limit = 0) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_DATASET_EXECUTE,
    data: { id: id, limit: limit },
  });
}


/* execute dataset to query data
 * id: dataset id
 * update: merge config to query result or not
 */
export function API_ML_DATASET_STAT(id: number, content: string, type: string, variable: any, limit = 0) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_DATASET_STAT,
    params: { id: id, content: content, type: type, variable: variable, limit: limit },
  });
}
