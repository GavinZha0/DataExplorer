import { algo } from 'crypto-js';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  ML_EXPERIMENT_LIST: '/ml/experiment/list',
  ML_EXPERIMENT_TRIALS: '/ml/experiment/trials',
  ML_EXPERIMENT_TRIAL: '/ml/experiment/trial',
  ML_EXPERIMENT_DELETE: '/ml/experiment/delete',
  ML_EXPERIMENT_DEL_EXPER: '/ml/experiment/del',
  ML_EXPERIMENT_DEL_TRIAL: '/ml/experiment/del/trial',
  ML_EXPERIMENT_REG_TRIAL: '/py/ml/experiment/reg',
  ML_EXPERIMENT_UNREG_TRIAL: '/py/ml/experiment/unreg',
  ML_EXPERIMENT_PUBLISH_TRIAL: '/py/ml/experiment/publish',
  ML_EXPERIMENT_UNPUBLISH_TRIAL: '/py/ml/experiment/unpublish'
}


/* get all trials as list
 * params: algo id
 */
export function API_ML_EXPERIMENT_TRIALS1(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_EXPERIMENT_TRIALS,
    data: { id: id }
  });
}

export function API_ML_EXPERIMENT_TRIALS(param: any) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_EXPERIMENT_TRIALS,
    data: { id: param.id }
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


/* delete a experiment
 * id: experiment id
 */
export function API_ML_EXPERIMENT_DEL_EXPER(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.ML_EXPERIMENT_DEL_EXPER,
    params: { id: id }
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

/* register a trial
 * id: trial id (run_uuid)
 */
export function API_ML_EXPERIMENT_REG_TRIAL(trialId: string, algoName: string, algoId: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_EXPERIMENT_REG_TRIAL,
    params: { trialId: trialId, algoName: algoName, algoId: algoId }
  });
}

/* un-register a trial
 * id: trial id (run_uuid)
 */
export function API_ML_EXPERIMENT_UNREG_TRIAL(algoId: number, version: any) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_EXPERIMENT_UNREG_TRIAL,
    params: { algoId: algoId, version: Number(version) }
  });
}

/* register a trial
 * id: trial id (run_uuid)
 */
export function API_ML_EXPERIMENT_PUBLISH_TRIAL(trialId: string, algoName: string, algoId: number) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_EXPERIMENT_PUBLISH_TRIAL,
    params: { trialId: trialId, algoName: algoName, algoId: algoId }
  });
}

/* un-register a trial
 * id: trial id (run_uuid)
 */
export function API_ML_EXPERIMENT_UNPUBLISH_TRIAL(algoId: number, version: any) {
  return defHttp.post<AxiosResponse>({
    url: API.ML_EXPERIMENT_UNPUBLISH_TRIAL,
    params: { algoId: algoId, version: Number(version) }
  });
}