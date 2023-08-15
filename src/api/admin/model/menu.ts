export interface MenuApiQueryType {
  role?: number;
  current?: number;
  pageSize?: number;
}

export interface ApiMenuDataType {
  id?: number;
  pid?: number;
  name?: string;
  title?: string;
  icon?: string;
  type?: string;
  path?: string;
  redirect?: string;
  component?: string;
  subRpt?: boolean;
  pos?: number;
  active?: boolean;
  obsolete?: boolean;
  comment?: string;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
  children?: any;
}
