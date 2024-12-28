export interface ApiAlgorithmDataType {
  id?: number;
  name?: string;
  desc?: string;
  group?: string;
  category?: string;
  algoName?: string;
  tags?: any|null;
  srcCode?: string;
  dataCfg?: DataConfigType|null,
  trainCfg?: TrainConfigType|null;
  pubFlag?: boolean;
  createdBy?: string;
  createTime?: string;
  updatedBy?: string;
  updateTime?: string;
}

export interface DataConfigType {
  datasetId: number; 
  evalRatio: number;
  shuffle: boolean;
}

export interface TrainConfigType {
  gpu: boolean;
  strategy: string; 
  trials: number;
  epochs: number;
  timeout: number;
  params: any;
  score: string | null;
  threshold: number | null;
}

export const initDataCfg: DataConfigType = {
  datasetId: 0,
  evalRatio: 0.2,
  shuffle: false
};

const initTrainCfg: TrainConfigType = {
  gpu: false,
  strategy: 'BasicVariantGenerator',
  trials: 1,
  epochs: 1,
  timeout: 5,
  params: {},
  score: null,
  threshold: null
};

//initial value of dataset
export const initAlgorithm: ApiAlgorithmDataType = {
  id: 0,
  name: '',
  desc: '',
  group: '',
  tags: [],
  category: 'clf',
  algoName: '',
  srcCode: '',
  dataCfg: initDataCfg,
  trainCfg: initTrainCfg,
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
