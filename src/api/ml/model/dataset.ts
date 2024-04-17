import { ColumnFieldType, VarFieldType } from '/@/api/model/baseModel';

export interface ApiMlDatasetDataType {
  id?: number;
  name: string;
  desc?: string;
  group?: string;
  sourceId: number;
  sourceName?: string;
  datasetId?: number;
  datasetName?: string;
  fields: ColumnFieldType[];
  stat?: Statistics[];
  corr?: Correlation[];
  query: string;
  pubFlag?: boolean;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface Statistics {
  id?: number;
  chartType?: string;
  fieldName?: string;
  fieldType?: string;
  container?: any;
  instance?: any;
}

export interface Correlation {
  id?: number;
  chartType?: string;
  fieldNames?: string[];
  fieldTypes?: string[];
  container?: any;
  instance?: any;
}

export interface SourceFieldType {
  treeData: any[];
  selectedSource: any;
  selectedTable: any;
}

export const initSourceFiled: SourceFieldType = {
  treeData: [],
  selectedSource: { id: -1 },
  selectedTable: '',
};

//initial value of dataset
export const initDataset: ApiMlDatasetDataType = {
  id: 0,
  name: '',
  desc: '',
  group: '',
  variable: [],
  query: '',
  fields: [],
  sourceId: 0,
  sourceName: '',
  pubFlag: false,
  createdBy: '',
  createdAt: '',
  updatedBy: '',
  updatedAt: '',
};
