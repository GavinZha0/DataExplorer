
export interface ApiAiModelDataType {
  id?: number;
  name?: string;
  desc?: string;
  area?: string;
  tags?: string[];
  rate?: number;
  price?: string;
  pubFlag?: boolean;
  status?: number;
  algoId?: number;
  deployTo?: string;
  endpoint?: string;
  eval?: string;
  trainedBy?: string;
  trainedAt?: string;
  createdBy?: string;
  createdAt?: string;
  deployedBy?: string;
  deployedAt?: string;
}

export interface mapType {
  name: string;
  value: any;
}

//initial value of dataset
export const initStoreData: ApiAiModelDataType = {
  id: 0,
  name: '',
  desc: '',
  area: 'data',
  tags: [],
  rate: 0,
  algoId: 0,
  deployTo: '',
  endpoint: '',
  pubFlag: false,
  status: 0,
  eval: '',
  trainedBy: '',
  trainedAt: '',
  createdBy: '',
  createdAt: '',
  deployedBy: '',
  deployedAt: ''
};


export const iniModelOptions = {
  category: ['Data', 'Image', 'Video', 'Text', 'Voice', 'Security'],
  type: ['Object detection', 'Object identification', 'Noise reduction', 'Image matting', 'Stylizing'],
  network: ['AlexNet', 'VGG', 'GoogleNet', 'ResNet', 'Inception v3', 'SqueezeNet', 'DenseNet', 'Xception', 'ShuffleNet v2', 'MnasNet', 'ResNeXt', 'MobileNetv3', 'EfficientNet', 'EfficientNet v2'],
  framework: ['Sklearn', 'PyTorch', 'Tensorflow', 'Paddle', 'DL4J', 'DJL'],
  frameVer: {Sklearn: ['1.0, 2.0, 3.0'], PyTorch: ['1.0', '2.0'], Tensorflow: ['1.1', '2.2'], DL4J:['M1', 'M2'], DJL: ['0.16']}
};
