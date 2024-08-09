import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  ML_EXPERIMENT_LIST: '/ml/experiment/list',
  ML_EXPERIMENT_TRIALS: '/ml/experiment/trials',
  ML_EXPERIMENT_TRIAL: '/ml/experiment/trial',
  ML_EXPERIMENT_DELETE: '/ml/experiment/delete',
  ML_EXPERIMENT_DEL_TRIAL: '/ml/experiment/del/trial',
}


/* get all trials as list
 * params: algo id
 */
export function API_ML_EXPERIMENT_TRIALS(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_EXPERIMENT_TRIALS,
    data: { id: id }
  });
}


/* get specific trials
 * id: trial id
 */
export function API_ML_EXPERIMENT_TRIAL(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_EXPERIMENT_TRIAL,
    data: { id: id }
  });
}


/* delete a trial
 * id: trial id
 */
export function API_ML_EXPERIMENT_DEL_TRIAL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.ML_EXPERIMENT_DEL_TRIAL,
    params: { id: id }
  });
}
