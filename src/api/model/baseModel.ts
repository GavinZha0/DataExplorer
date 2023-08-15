export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}

export interface ApiListReqType {
  page: PageType | null;
  sorter?: sorterType | null;
  filter?: filterType | null;
  search?: searchType | null;
}

export interface PageType {
  current: number;
  pageSize: number;
  total?: number;
  size?: string;
  defaultPageSize?: number;
  showSizeChanger?: boolean;
  showTotal?: any;
}

// support to sort multiple fields
export interface sorterType {
  fields: string[];
  orders: string[];
}

// support to filter multiple fields
export interface filterType {
  fields: string[];
  values: string[][];
}

// support to fuzzily search value in multiple fields
export interface searchType {
  value: string;
  fields: string[];
}

//initial value of Pagination
export const initPagination: PageType = {
  current: 1,
  pageSize: 20,
  total: 0,
  defaultPageSize: 20,
  size: 'small',
  showSizeChanger: true,
  showTotal: (total) => `Total: ${total}`
};

export interface ApiFieldReqType {
  id: number;
  name: string;
}

export interface ApiPublicReqType {
  id: number;
  pub: boolean;
}

export interface optionType {
  id: number;
  name: string;
}

export interface KeyValueType {
  id: number;
  name: string;
}

export interface NameValueType {
  name: string;
  value: string;
}

export interface VarFieldType {
  name: string;
  type: string;
  value: string;
}

export interface ColumnFieldType {
  name: string;
  type: string;
  hidden?: boolean;
  metrics?: boolean;
  group?: number;
  filter?: string;
  order?: number;
}
