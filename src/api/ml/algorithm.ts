import { ApiListReqType, ApiPublicReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiAlgorithmDataType } from '/@/api/ml/model/algorithm';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  ML_ALGO_LIST: '/ml/algo/list',
  ML_ALGO_TREE: '/ml/algo/tree',
  ML_ALGO_CREATE: '/ml/algo/create',
  ML_ALGO_UPDATE: '/ml/algo/update',
  ML_ALGO_PUBLIC: '/ml/algo/public',
  ML_ALGO_CLONE: '/ml/algo/clone',
  ML_ALGO_DELETE: '/ml/algo/delete',
  ML_ALGO_EXECUTE: '/ml/algo/execute',
  ML_ALGO_EXECUTE_SCRIPT: '/ml/algo/execute_script',
  ML_ALGO_GROUPS: '/ml/algo/groups',
  ML_ALGO_ONE: '/ml/algo/getone',
  ML_ALGO_ALGOS: '/ml/algo/algos',
  ML_ALGO_VERS: '/py/ml/algo/vers',
  ML_ALGO_ARGS: '/ml/algo/args',
  ML_ALGO_SCORES: '/ml/algo/scores'
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
 * id: algo id
 */
export function API_ML_ALGO_EXECUTE(id: number, framework: string) {
  const pyFrames = ['python', 'sklearn', 'pytorch', 'tensorflow'];
  let url = API.ML_ALGO_EXECUTE;
  if(pyFrames.includes(framework)){
    // send to python server
    url = '/py' + url;
  }
  return defHttp.post<AxiosResponse>({
    url: url,
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
export function API_ML_ALGO_GROUPS() {
  return defHttp.post<AxiosResponse>({
    url: API.ML_ALGO_GROUPS,
  });
}

/* get existing algos
 *
 */
export function API_ML_ALGO_ALGOS(params: any) {
  if(params.framework && params.category){
    const pyFrames = ['python', 'sklearn', 'pytorch', 'tensorflow'];
    let url = API.ML_ALGO_ALGOS;
    if(pyFrames.includes(params.framework)){
      // send to python server
      url = '/py' + url;
    }

    return defHttp.post<AxiosResponse>({
      url: url,
      data: params
    });
  }
}

/* get framework versions
 *
 */
export function API_ML_ALGO_VERS() {
  return defHttp.post<AxiosResponse>({
    url: API.ML_ALGO_VERS
  });
}

/* get arguments of algo
 *
 */
export function API_ML_ALGO_ARGS(params: any) {
  if(params.framework && params.category){
    const pyFrames = ['python', 'sklearn', 'pytorch', 'tensorflow'];
    let url = API.ML_ALGO_ARGS;
    if(pyFrames.includes(params.framework)){
      // send to python server
      url = '/py' + url;
    }

    return defHttp.post<AxiosResponse>({
      url: url,
      data: params
    });
  }
}

/* get eval scores of algo
 *
 */
export function API_ML_ALGO_SCORES(params: any) {
  if(params.framework && params.category){
    const pyFrames = ['python', 'sklearn', 'pytorch', 'tensorflow'];
    let url = API.ML_ALGO_SCORES;
    if(pyFrames.includes(params.framework)){
      // send to python server
      url = '/py' + url;
    }

    return defHttp.post<AxiosResponse>({
      url: url,
      data: params
    });
  }
}