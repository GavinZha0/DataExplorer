import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  HOME_GET: '/home'
};


export function API_HOME_GET() {
  return defHttp.post<AxiosResponse>({
    url: API.HOME_GET,
  });
}