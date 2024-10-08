import { ApiDsDataType } from './model/datasource';
import {
  ApiFieldReqType,
  ApiListReqType,
  ApiPublicReqType,
  ColumnFieldType,
  VarFieldType,
} from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { AxiosResponse } from 'axios';
import { btoa } from 'js-base64';
import { ApiExeSqlReqType } from '/@/api/datamgr/model/datasource';
import { API_PARAM_GET } from '../admin/param';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  DATASOURCE_LIST: '/src/datasource/list',
  DATASOURCE_TREE: '/src/datasource/tree',
  DATASOURCE_GROUPS: '/src/datasource/groups',
  DATASOURCE_TEST: '/src/datasource/test',
  DATASOURCE_CREATE: '/src/datasource/create',
  DATASOURCE_UPDATE: '/src/datasource/update',
  DATASOURCE_PUBLIC: '/src/datasource/public',
  DATASOURCE_LOCK: '/src/datasource/lock',
  DATASOURCE_CLONE: '/src/datasource/clone',
  DATASOURCE_DELETE: '/src/datasource/delete',
  DATASOURCE_DATABASES: '/src/datasource/databases',
  DATASOURCE_DB_SETS: '/src/datasource/sets',
  DATASOURCE_TABLE_FIELDS: '/src/datasource/fields',
  DATASOURCE_EXECUTE: '/src/datasource/execute',
};

/* get all datasources as list
 * params: ApiListReqType
 */
export function API_DATASOURCE_LIST(params: ApiListReqType) {
  return defHttp.post<AxiosResponse>({
    url: API.DATASOURCE_LIST,
    params,
  });
}

/* get group->datasource tree
 *
 */
export function API_DATASOURCE_TREE() {
  return defHttp.post<AxiosResponse>({
    url: API.DATASOURCE_TREE,
  });
}

/* get all groups
 *
 */
export function API_DATASOURCE_GROUPS() {
  return defHttp.post<AxiosResponse>({
    url: API.DATASOURCE_GROUPS,
  });
}

/* create a new datasource with encoded password
 * params: ApiDsDataType without id
 */
export function API_DATASOURCE_CREATE(params: Omit<ApiDsDataType, 'id'>) {
  // encode password before transmission
  return defHttp.post<AxiosResponse>({
    url: API.DATASOURCE_CREATE,
    params: { ...params, password: btoa(params.password) },
  });
}

/* test datasource url
 * params: ApiDsDataType without id
 */
export function API_DATASOURCE_TEST(params: Omit<ApiDsDataType, 'id'>) {
  // encode password before transmission
  return defHttp.post<AxiosResponse>({
    url: API.DATASOURCE_TEST,
    params: { ...params, password: btoa(params.password) },
  });
}

/* update datasource info with encoded password
 * params: ApiDsDataType
 */
export function API_DATASOURCE_UPDATE(params: ApiDsDataType) {
  // encode password before transmission
  return defHttp.post<AxiosResponse>({
    url: API.DATASOURCE_UPDATE,
    params: { ...params, password: btoa(params.password) },
  });
}

/* set datasource to public
 * id: datasource id
 * pub: public flag
 */
export function API_DATASOURCE_PUBLIC(id: number, pub: boolean) {
  const params: ApiPublicReqType = {
    id: id,
    pub: pub,
  };
  return defHttp.post<AxiosResponse>({
    url: API.DATASOURCE_PUBLIC,
    params,
  });
}

/* lock some tables
 * id: datasource id
 * tables: table name list
 */
export function API_DATASOURCE_LOCK(id: number, tables: string[]) {
  return defHttp.post<AxiosResponse>({
    url: API.DATASOURCE_LOCK,
    data: { id: id, names: tables },
  });
}

/* clone a datasource
 * id: datasource id
 */
export function API_DATASOURCE_CLONE(id: number) {
  return defHttp.post<AxiosResponse>({
    url: API.DATASOURCE_CLONE,
    data: { id: id },
  });
}

/* delete a datasource
 * id: datasource id
 */
export function API_DATASOURCE_DEL(id: number) {
  return defHttp.delete<AxiosResponse>({
    url: API.DATASOURCE_DELETE,
    params: { id: id },
  });
}

// get datasource tables without looked tables
/* params: {id: number(datasource id), locked: bool(include locked tables or not)}
 */
export function API_DATASOURCE_SETS(params: object) {
  if (params && params.id!=undefined && params.id!=0) {
    let url = API.DATASOURCE_DB_SETS;
    if(params.id < 0){
      url = '/py' + url;
    } 
    return defHttp.post<AxiosResponse>({
      url: url,
      data: params,
    });
  }
}

/* get table fields of a datasource
 * id: datasource id
 * table: table name
 */
export function API_DATASOURCE_FIELDS(id: number, table: string) {
  const params: ApiFieldReqType = {
    id: id,
    name: table,
  };
  return defHttp.post<AxiosResponse>({
    url: API.DATASOURCE_TABLE_FIELDS,
    params,
  });
}

/* get table fields of a datasource
 * id: datasource id
 * table: table name
 */
export function API_DATASOURCE_FIELDSS(params: object) {
  if (params && params.id!=undefined && params.id > 0 && params.name && params.name.length>0) {
    return defHttp.post<AxiosResponse>({
      url: API.DATASOURCE_TABLE_FIELDS,
      params,
    });
  }
}

/* execute sql query
 * id: datasource id
 * sql: sql string with/without variables
 * variable: variable list
 * fields: fields config
 * limit: preview limit
 */
export function API_DATASOURCE_EXECUTE(
  id: number,
  sql: string,
  variable: VarFieldType[] | null | undefined,
  fields: ColumnFieldType[] | null,
  limit: number,
) {
  const params: ApiExeSqlReqType = {
    id,
    sql,
    limit,
    variable: variable == undefined ? null : variable,
    fields: fields,
  };
  return defHttp.post<AxiosResponse>({
    url: API.DATASOURCE_EXECUTE,
    params,
  });
}
