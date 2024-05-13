import { defaultCanvasAttrs } from "/@/components/X6Graph/type";

export interface ApiWorkflowDataType {
  id?: number;
  pid: number;
  name?: string;
  description?: string;
  category?: string;
  workflow?: any;
  canvas?: any;
  flowVer?: string;
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

//initial value of dataset
export const initWorkflow: ApiWorkflowDataType = {
  id: 0,
  pid: 0,
  name: '',
  description: '',
  category: '',
  workflow: null,
  flowVer: '1.31',
  canvas: defaultCanvasAttrs,
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


