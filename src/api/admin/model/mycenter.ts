import {ApiDataviewDataType} from "/@/views/dataviz/dataview/type";

export interface ApiUserDataType {
  id?: number;
  name?: string;
  password?: string;
  realname?: string;
  email?: string;
  phone?: string;
  department?: string;
  avatar?: string;
  orgName?: string;
  roles?: string[];
  active?: boolean;
  expDate?: string;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface ApiActiveReqType {
  id: number;
  active: boolean;
}

export interface ApiUserMsgType {
  id: number;
  userId: number;
  happenTime: string;
  type: string;
  fromId: number;
  toId: number;
  content: string;
  relatedId: number;
}

export interface  ApiHistoryType{
  id: number;
  userId: number;
  happenTime: string;
  webpage: string;
  action: string;
  target: string;
  succeeded: boolean;
}

//initial value of dataset
export const initUserData: ApiUserDataType = {
  id: 0,
  name: '',
  password: '',
  realname: '',
  email: '',
  phone: '',
  department: '',
  avatar: '',
  orgName: '',
  roles: [],
  active: false,
  expDate: '',
  createdBy: '',
  createdAt: '',
  updatedBy: '',
  updatedAt: ''
};
