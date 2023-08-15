export interface ApiUserDataType {
  id?: number;
  name?: string;
  password?: string;
  realname?: string;
  email?: string;
  phone?: string;
  social?: string;
  department?: string;
  avatar?: string;
  orgName?: string;
  roles?: string[];
  active?: boolean;
  expDate?: string;
  deleted?: boolean;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface ApiActiveReqType {
  id: number;
  active: boolean;
}

export interface ApiPwdReqType {
  id: number;
  oldPwd: string;
  newPwd: string;
}
