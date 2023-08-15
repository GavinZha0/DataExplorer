/**
 * @description: Login request parameters
 */
export interface AuthLoginParams {
  identity: string;
  passcode: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Get user information return value
 */
export interface AuthUserInfoResult {
  id: number;
  name: string;
  realname: string;
  avatar: string;
  desc?: string;
  orgId: number;
  orgName: string;
  roleId: number[];
  roleName: string[];
}

/**
 * @description: Get user information return value
 */
export interface AuthPermitResult {
  id: number;
  name: string;
  title: string;
  icon: string;
  path: string;
  redirect: string;
  component: string;
  subRpt: boolean;
  pos: number;
  roleId: number[];
  roleName: string[];
}

export interface RegisterParamsType {
  username: string;
  password: string;
  confirm: string;
  mobile: string; // phone number or email address
  code: string;
}
