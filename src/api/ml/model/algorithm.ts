export interface ApiAlgorithmDataType {
  id?: number;
  pid?: number;
  name?: string;
  desc?: string;
  group?: string;
  type?: string;
  framework?: string;
  frameVer?: string;
  content: string;
  config?: ExeConfigType|null;
  version?: string;
  pubFlag?: boolean;
  status?: number;
  createdBy?: string;
  createTime?: string;
  updatedBy?: string;
  updateTime?: string;
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
export const initAlgorithm: ApiAlgorithmDataType = {
  id: 0,
  name: '',
  desc: '',
  group: '',
  type: '',
  framework: 'Python',
  frameVer: '3.11',
  version: '',
  content: '',
  config: initExeConfig,
  pubFlag: false,
  createdBy: '',
  createTime: '',
  updatedBy: '',
  updateTime: '',
  status: 0,
};

export const iniAlgOptions = {
  algType: ['Classification', 'Regression', 'Clustering', 'Reduction'],
  algFramework: ['Python', 'Java'],
  algFreamVer: { Python: ['3.7', '3.8'], Java: ['2.2.1', '2.5.4'] }
};
