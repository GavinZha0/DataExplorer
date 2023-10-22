
export interface ApiModelDataType {
  id?: number;
  name?: string;
  description?: string;
  category?: string;
  type?: string;
  framework?: string;
  frameVer?: string;
  content: string;
  config?: ExeConfigType|null;
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
  expandedTables: string[]
}

export const initSourceFiled: SourceFieldType = {
  sources: [],
  sourceId: null,
  dbType: undefined,
  tables: [],
  selectedTables: [],
  expandedTables: []
};

//initial value of dataset
export const initModelData: ApiModelDataType = {
  id: 0,
  name: '',
  description: '',
  category: '',
  type: '',
  framework: 'Pytorch',
  frameVer: '2.0',
  content: '',
  config: null,
  pubFlag: false,
  sourceId: 0,
  sourceName: '',
  createdBy: '',
  createTime: '',
  updatedBy: '',
  updateTime: ''
};

export const initModelConfig: ExeConfigType = {
  type: '',
  id: 0,
  table: '',
  fields: [],
  limit: 100,
  assert: []
};

export interface TrainEpochIndType {
  epoch: number;
  numEpoch: number;
  startAt: any;
  elapse: number;
  iterator: number;
  numIterator: number;
  trainProgress: number;
  evalProgress: number;
  trainMeasures: TrainMeasureType[];
  evalMeasures: TrainMeasureType[];
}

export interface TrainMeasureType {
  accuracy?: number[];
  score?: number[];
}

export const initTrainEpochInd: TrainEpochIndType = {
  epoch: 0,
  numEpoch: 0,
  startAt: new Date(),
  elapse: 0,
  iterator: 0,
  numIterator: 0,
  trainProgress: 0,
  evalProgress: 0,
  trainMeasures: [{accuracy:[], score:[]}],
  evalMeasures: [{accuracy:[], score:[]}]
};

export const iniModelOptions = {
  modelType: ['Classification', 'Regression', 'Clustering', 'Detection', 'Identification'],
  modelFramework: ['Sklearn', 'PyTorch', 'Tensorflow', 'Paddle', 'DL4J', 'DJL'],
  modelFrameVer: {Sklearn: ['1.0, 2.0, 3.0'], PyTorch: ['1.0', '2.0'], Tensorflow: ['1.1', '2.2'], DL4J:['M1', 'M2'], DJL: ['0.16']},
  modelSourceType: ['Datasource', 'Dataset', 'File'],
  modelFileFormat: ['Ml', 'Keras,', 'H5', 'Pkl', 'mlmodel', 'Pmml']
};





//ONNX (.onnx, .pb, .pbtxt), Keras (.h5, .keras), Core ML (.mlmodel), Caffe (.caffemodel, .prototxt), Caffe2 (predict_net.pb, predict_net.pbtxt), MXNet (.model, -symbol.json), TorchScript (.pt, .pth), NCNN (.param) and TensorFlow Lite (.tflite).
// PyTorch (.pt, .pth), Torch (.t7), CNTK (.model, .cntk), Deeplearning4j (.zip), PaddlePaddle (.zip, __model__), Darknet (.cfg), scikit-learn (.pkl), TensorFlow.js (model.json, .pb) and TensorFlow (.pb, .meta, .pbtxt).
