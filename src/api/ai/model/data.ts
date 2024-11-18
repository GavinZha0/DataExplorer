
export interface ApiDataDataType {
  id?: number;
  name?: string;
  desc?: string;
  group?: string;
  modelId: number;
  modelName: string;
  fields?: any;
  orgId?: number;
  pubFlag?: boolean;
  createdBy?: string;
  createTime?: string;
  updatedBy?: string;
  updateTime?: string;
}

//initial value of dataset
export const initDataData: ApiDataDataType = {
  id: 0,
  name: '',
  desc: '',
  group: '',
  modelId: 0,
  fields: {},
  modelName: '',
  orgId: 0,
  pubFlag: false,
  createdBy: '',
  createTime: '',
  updatedBy: '',
  updateTime: ''
};

