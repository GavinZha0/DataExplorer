export interface ApiAlgorithmDataType {
  id?: number;
  name?: string;
  desc?: string;
  group?: string;
  category?: string;
  algoName?: string;
  framework?: string;
  frameVer?: string;
  srcCode?: string;
  datasetId?: number;
  datasetName?: string;
  attr?: TrainAttrType|null,
  config?: TrainConfigType|null;
  version?: string;
  pubFlag?: boolean;
  status?: number;
  createdBy?: string;
  createTime?: string;
  updatedBy?: string;
  updateTime?: string;
}

export interface TrainAttrType {
  datasetId: number; 
  testRatio: number;
  params: any[];
}

export interface TrainConfigType {
  searchAlgo: string; 
  trials: number;
  epochs: number;
  timeout: number;
  earlyStop: any[];
}

const initTrainAttr: TrainAttrType = {
  datasetId: 0,
  testRatio: 0.2,
  params: []
};

const initExeConfig: TrainConfigType = {
  searchAlgo: 'BasicVariantGenerator',
  trials: 1,
  epochs: 1,
  timeout: 5,
  earlyStop: []
};

//initial value of dataset
export const initAlgorithm: ApiAlgorithmDataType = {
  id: 0,
  name: '',
  desc: '',
  group: '',
  category: 'clf',
  algoName: '',
  framework: 'sklearn',
  frameVer: '3.10',
  srcCode: '',
  datasetId: 0,
  datasetName: '',
  attr: initTrainAttr,
  config: initExeConfig,
  pubFlag: false,
  createdBy: '',
  createTime: '',
  updatedBy: '',
  updateTime: ''
};

export const iniAlgOptions = {
  algCategory: ['Classification', 'Regression', 'Clustering', 'Reduction'],
  algFramework: ['Python', 'Java', 'Sklearn', 'PyTorch', 'Tensorflow'],
  algFreamVer: { Python: ['3.10', '3.11'], Java: ['2.2.1', '2.5.4'] }
};
