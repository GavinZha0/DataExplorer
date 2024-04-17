import {ColumnFieldType, NameValueType, VarFieldType} from '/@/api/model/baseModel';

export interface ApiDsDataType {
  id?: number;
  name: string;
  desc?: string;
  group?: string;
  type: string;
  url: string;
  username?: string;
  password?: string;
  version?: string;
  pubFlag?: boolean;
  params?: NameValueType[];
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}

//initial value of datasource
export const initSource: ApiDsDataType = {
  id: 0,
  name: '',
  desc: '',
  group: '',
  type: '',
  url: '',
  username: '',
  password: '',
  version: '',
  pubFlag: false,
  params: [],
  createdBy: '',
  createdAt: '',
  updatedBy: '',
  updatedAt: '',
};

export interface ApiExeSqlReqType {
  id: number;
  sql: string;
  variable: VarFieldType[] | null;
  fields: ColumnFieldType[] | null;
  limit: number;
}
