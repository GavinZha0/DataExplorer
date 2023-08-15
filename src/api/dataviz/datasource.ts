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
import { ApiExeSqlReqType } from '/@/api/dataviz/model/datasource';

//----------------------------------------------------------------------------------------
// PATH definition
export const API = {
  DATASOURCE_LIST: '/datasource/list',
  DATASOURCE_TREE: '/datasource/tree',
  DATASOURCE_GROUPS: '/datasource/groups',
  DATASOURCE_TEST: '/datasource/test',
  DATASOURCE_CREATE: '/datasource/create',
  DATASOURCE_UPDATE: '/datasource/update',
  DATASOURCE_PUBLIC: '/datasource/public',
  DATASOURCE_LOCK: '/datasource/lock',
  DATASOURCE_CLONE: '/datasource/clone',
  DATASOURCE_DELETE: '/datasource/delete',
  DATASOURCE_DATABASES: '/datasource/databases',
  DATASOURCE_DB_TABLES: '/datasource/tables',
  DATASOURCE_TABLE_FIELDS: '/datasource/fields',
  DATASOURCE_EXECUTE: '/datasource/execute',
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
  return defHttp.post<AxiosResponse>({
    url: API.DATASOURCE_TEST,
    params,
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
export function API_DATASOURCE_TABLES(params: object) {
  if (typeof params !== 'object' || !params.id) {
    return;
  }

  return defHttp.post<AxiosResponse>({
    url: API.DATASOURCE_DB_TABLES,
    data: params,
  });
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
