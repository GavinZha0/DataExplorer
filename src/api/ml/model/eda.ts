import { DataFieldType } from "../../model/baseModel";

export interface ApiMlEdaDataType {
  id?: number;
  name?: string;
  description?: string;
  group?: string;
  type?: string;
  sourceId?: number;
  sourceName?: string;
  datasetName?: string; // table name
  query?: string; // sql query
  limit?: number;
  fields?: DataFieldType[];
  features?: number;
  target?: string;
  relPair?: any[];
  pubFlag?: boolean;
  createdBy?: string;
  createTime?: string;
  updatedBy?: string;
  updateTime?: string;
}

export interface ExeConfigType {
  type: string; // datasource, dataset or csv/json file
  id: number; // datasource id, dataset id or file id
  table: string; // data table when type is datasource
  fields: string[]; //columns
  limit: number;
  assert: string[]; // ['a>10','b<7']
}

export interface VarFieldType {
  name: string;
  type: string;
  value: string;
}

export interface SourceFieldType {
  sources: any[];
  sourceId: number|null;
  dbType: string|undefined;
  tables: any[];
  selectedTables: string[];
  expandedTables: string[],
}

export const initSourceFiled: SourceFieldType = {
  sources: [],
  sourceId: null,
  dbType: undefined,
  tables: [],
  selectedTables: [],
  expandedTables: [],
};

//initial value of dataset
export const initMlEda: ApiMlEdaDataType = {
  id: 0,
  name: '',
  description: '',
  group: '',
  type: '',
  sourceId: -1,
  sourceName: '',
  datasetName: '',
  query: '',
  limit: 1000,
  fields: [],
  features: -1,
  target: '',
  relPair: [],
  pubFlag: false,
  createdBy: '',
  createTime: '',
  updatedBy: '',
  updateTime: '',
};

export const initExeConfig: ExeConfigType = {
  type: '',
  id: 0,
  table: '',
  fields: [],
  limit: 100,
  assert: [],
};

export const iniAlgOptions = {
  algType: ['Classification', 'Regression', 'Clustering', 'Reduction'],
  algLanguage: ['Python', 'Java'],
  algLangVer: { Python: ['3.7', '3.8'], Java: ['2.2.1', '2.5.4'] },
  algSourceType: ['Datasource', 'Dataset', 'File'],
};
