export interface ApiAlgorithmDataType {
  id?: number;
  name?: string;
  description?: string;
  category?: string;
  type?: string;
  language?: string;
  langVer?: string;
  content: string;
  config?: ExeConfigType|null;
  version?: string;
  pubFlag?: boolean;
  sourceId?: number;
  sourceName?: string;
  status?: number;
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
export const initAlgorithm: ApiAlgorithmDataType = {
  id: 0,
  name: '',
  description: '',
  category: '',
  type: '',
  language: 'Python',
  langVer: '3.7',
  version: '',
  content: '',
  config: null,
  pubFlag: false,
  sourceId: 0,
  sourceName: '',
  createdBy: '',
  createTime: '',
  updatedBy: '',
  updateTime: '',
  status: 0,
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
