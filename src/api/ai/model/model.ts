
export interface ApiModelDataType {
  id?: number;
  name?: string;
  description?: string;
  category?: string;
  type?: string;
  tags?: string[];
  framework?: string;
  frameVer?: string;
  files: string[];
  input?: mapType[];
  output?: mapType[];
  evaluation?: mapType[];
  score?: number;
  network?: string;
  pubFlag?: boolean;
  weblink?: string;
  createdBy?: string;
  createTime?: string;
  updatedBy?: string;
  updateTime?: string;
}

export interface mapType {
  name: string;
  value: any;
}

//initial value of dataset
export const initModelData: ApiModelDataType = {
  id: 0,
  name: '',
  description: '',
  category: 'Image',
  type: 'Classification',
  framework: 'Pytorch',
  frameVer: '2.0',
  network: '',
  files: [],
  tags: [],
  input: [],
  output: [],
  evaluation: [],
  score: 5,
  weblink: '',
  pubFlag: false,
  createdBy: '',
  createTime: '',
  updatedBy: '',
  updateTime: ''
};


export const iniModelOptions = {
  category: ['Data', 'Image', 'Video', 'Text', 'Voice', 'Security'],
  type: ['Object detection', 'Object identification', 'Noise reduction', 'Image matting', 'Stylizing'],
  network: ['AlexNet', 'VGG', 'GoogleNet', 'ResNet', 'Inception v3', 'SqueezeNet', 'DenseNet', 'Xception', 'ShuffleNet v2', 'MnasNet', 'ResNeXt', 'MobileNetv3', 'EfficientNet', 'EfficientNet v2'],
  framework: ['Sklearn', 'PyTorch', 'Tensorflow', 'Paddle', 'DL4J', 'DJL'],
  frameVer: {Sklearn: ['1.0, 2.0, 3.0'], PyTorch: ['1.0', '2.0'], Tensorflow: ['1.1', '2.2'], DL4J:['M1', 'M2'], DJL: ['0.16']}
};
