export interface ApiWorkflowDataType {
  id?: number;
  pid: number;
  name?: string;
  description?: string;
  category?: string;
  graph?: any[];
  grid?: any;
  graphVer?: string;
  config?: any;
  lastRun?: string;
  duration?: number;
  status?: string;
  error?: string;
  pubFlag?: boolean;
  createdBy?: string;
  createTime?: string;
  updatedBy?: string;
  updateTime?: string;
}

export const initGridAttr = {
  type: 'mesh',
  size: 20,
  color: '#E7E8EA',
  thickness: 1,
  color2: '#CBCED3',
  thickness2: 2,
  factor: 4,
  bgColor: '#FFFFFF',

  showImage: false,
  image: 'http://localhost:8000/img/doc/login.png',
  repeat: 'no-repeat',
  angle: 30,
  position: 'center',
  bgSize: 'contain',
  opacity: 0.2
}

//initial value of dataset
export const initWorkflow: ApiWorkflowDataType = {
  id: 0,
  pid: 0,
  name: '',
  description: '',
  category: '',
  graph: null,
  graphVer: '1.31',
  grid: initGridAttr,
  config: [],
  lastRun: '',
  duration: 0,
  status: 'succ',
  error: '',
  pubFlag: false,
  createdBy: '',
  createTime: '',
  updatedBy: '',
  updateTime: ''
};


