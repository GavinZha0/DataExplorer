import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { ApiAlgoHistoryDataType, ApiListReqType } from '/@/api/ml/model/algoHistory';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  ML_ALGO_HISTORY_LIST: '/ml/algo/history/list',
  ML_ALGO_HISTORY_CREATE: '/ml/algo/history/create',
  ML_ALGO_HISTORY_DELETE: '/ml/algo/history/delete',
  ML_ALGO_HISTORY_ONE: '/ml/algo/history/getone',
}

/* get all algo as list
 * params: ApiListReqType
 */
export function API_ML_ALGO_HISTORY_LIST(params?: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_ALGO_HISTORY_LIST,
    params,
  });
}


/* get specific dataset
 * id: dataset id
 */
export function API_ML_ALGO_HISTORY_ONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_ALGO_HISTORY_ONE,
    data: { id: id },
  });
}

/* create a new dataset
 * params: ApiDatasetDataType without id
 */
export function API_ML_ALGO_HISTORY_CREATE(params: Omit<ApiAlgoHistoryDataType, 'id'>) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_ALGO_HISTORY_CREATE,
    params,
  });
}

/* delete a dataset
 * id: dataset id
 */
export function API_ML_ALGO_HISTORY_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.ML_ALGO_HISTORY_DELETE,
    params: { id: id },
  });
}
