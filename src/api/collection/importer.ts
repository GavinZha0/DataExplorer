import { ApiListReqType } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  IMPORTER_LIST: '/importer/list',
  IMPORTER_UPLOAD: '/importer/upload',
  IMPORTER_DOWNLOAD: '/importer/download',
  IMPORTER_DELETE: '/importer/delete',
};

/* get all datasets as list
 * params: ApiListReqType
 */
export function API_IMPORTER_LIST(params: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.IMPORTER_LIST,
    params,
  });
}

/* create a new dataset
 * params: ApiDatasetDataType without id
 */
export function API_IMPORTER_UPLOAD(formData: FormData, progressCallback: any) {
  return defHttp.post<AxiosResponse>({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: API.IMPORTER_UPLOAD,
    params: formData,
    onUploadProgress: progressCallback,
  });
}

/* update dataset info
 * params: ApiDatasetDataType
 */
export function API_IMPORTER_DOWNLOAD(params: any) {
  return defHttp.post<AxiosResponse>({
    url: API.IMPORTER_DOWNLOAD,
    params,
  });
}

/* delete a dataset
 * id: dataset id
 */
export function API_IMPORTER_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.IMPORTER_DELETE,
    params: { id: id },
  });
}
