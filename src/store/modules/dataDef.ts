import {UserInfo} from "/#/store";
import {RoleEnum} from "/@/enums/roleEnum";

export interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastupdatedAt: number;
}

//initial UserState
export const initUserState: UserState = {
  userInfo: null,
  token: undefined,
  roleList: [],
  sessionTimeout: false,
  lastupdatedAt: 0,
};
