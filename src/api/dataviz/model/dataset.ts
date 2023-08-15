import { ColumnFieldType, VarFieldType } from '/@/api/model/baseModel';

export interface ApiDatasetDataType {
  id?: number;
  name: string;
  desc?: string;
  group?: string;
  variable?: VarFieldType[] | null;
  query: string;
  fields: ColumnFieldType[];
  graph?: any;
  graphVer?: string;
  sourceId: number;
  sourceName?: string;
  pubFlag?: boolean;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
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
export const initDataset: ApiDatasetDataType = {
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
