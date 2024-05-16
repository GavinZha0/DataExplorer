export interface ApiAlgoHistoryDataType {
  id?: number;
  algoId?: number;
  framework?: string;
  frameVer?: string;
  content: string;
  attr?: any;
  config?: ExeConfigType|null;
  duration?: number;
  status?: number;
  result?: any;
  createdBy?: string;
  createTime?: string;
}

export interface ExeConfigType {
  datasetId: number; 
  testRatio: number;
  initParams: any;
  timeout: number;
}

const initExeConfig: ExeConfigType = {
  datasetId: 0,
  testRatio: 0.3,
  initParams: {},
  timeout: 1
};

//initial value of dataset
export const initAlgoHistory: ApiAlgoHistoryDataType = {
  id: 0,
  algoId: 0,
  framework: 'Python',
  frameVer: '3.11',
  content: '',
  attr: {},
  config: initExeConfig,
  status: 5,
  result: {},
  createdBy: '',
  createTime: ''
};

export interface ApiListReqType {
  algoId: number,
  succOnly: boolean
}