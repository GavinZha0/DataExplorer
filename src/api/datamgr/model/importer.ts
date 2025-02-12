export interface ApiImporterDataType {
  id?: number;
  type?: string;
  files?: string[];
  total?: number;
  records?: number;
  attrs?: FileAttrType;
  fields?: ColumnFieldType[];
  config?: DbConfigType;
  sourceId?: number;
  tableName?: string;
  overwrite?: boolean;
  status?: string;
  detail?: string;
  limit?: number;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface ColumnFieldType {
  title?: string;
  alias?: string;
  ignore?: boolean;
  type?: string;
  formula?: string;
}

export interface DbConfigType {
  ts?: string;
  nullMap?: string;
  trueMap?: string;
  falseMap?: string;
}

export interface FileAttrType {
  limit?: number;
  header?: boolean;
  encoding?: string;
  quote?: string;
  delimiter?: string;
  timezone?: string;
  timeFormat?: string;
  dateFormat?: string;
  tsFormat?: string;
}

export const initFileAttrs: FileAttrType = {
  header: true,
  quote: '"',
  encoding: 'UTF-8',
  delimiter: ',',
  timeFormat: undefined,
  dateFormat: undefined,
  tsFormat: undefined,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

export const initDbConfig: DbConfigType = {
  ts: 'utc',
};

export const initColumnField: ColumnFieldType = {
  title: undefined,
  ignore: undefined,
  alias: undefined,
  type: 'String',
  formula: undefined,
};

export const initImporter: ApiImporterDataType = {
  id: 0,
  type: undefined,
  files: [],
  total: 0,
  records: undefined,
  limit: 5,
  attrs: { ...initFileAttrs },
  fields: [],
  config: { ...initDbConfig },
  sourceId: undefined,
  tableName: undefined,
  overwrite: undefined,
  status: undefined,
  detail: undefined,
};
