import type { UserInfo } from '/#/store';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { RoleEnum } from '/@/enums/roleEnum';
import { PageEnum } from '/@/enums/pageEnum';
import { USER_ROLES_KEY, SHADOW_TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import { getWebStorage, setWebStorage } from '/@/utils/cache';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
import { initUserState } from '/@/store/modules/dataDef';
import { h } from 'vue';
import { AuthLoginParams, AuthUserInfoResult } from '/@/api/sys/model/auth';
import { API_AUTH_INFO, API_AUTH_LOGIN, API_AUTH_LOGOUT } from '/@/api/sys/auth';
import {useLocaleStoreWithOut} from "/@/store/modules/locale";

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastupdatedAt: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  // init user state when create the store
  state: (): UserState => ({ ...initUserState }),

  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getWebStorage<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getWebStorage<string>(SHADOW_TOKEN_KEY);
    },
    getShadowToken(): string {
      return getWebStorage<string>(SHADOW_TOKEN_KEY);
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getWebStorage<RoleEnum[]>(USER_ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastupdatedAt(): number {
      return this.lastupdatedAt;
    }
  },

  actions: {
    // save tokens
    setToken(token: string | undefined, shadowToken: string | undefined) {
      // current token
      this.token = token ? token : shadowToken ? shadowToken : '';
      // save shadow token to cache
      // it is used to extend expiration time
      setWebStorage(SHADOW_TOKEN_KEY, shadowToken, true, 60 * 30);
    },

    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setWebStorage(USER_ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastupdatedAt = new Date().getTime();
      setWebStorage(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: login
     */
    async login(
      params: AuthLoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<AuthUserInfoResult | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const localeStore = useLocaleStoreWithOut();
        const locale = localeStore.getLocale;

        // invoke API to login
        // response header has two tokens. they are handled in axios
        // response body has user info
        const response = await API_AUTH_LOGIN(loginParams, locale, mode);
        const userInfo = response.data;

        // save user info
        if(userInfo){
          this.setUserInfo(userInfo);
        }

        return this.afterLoginAction(userInfo, goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(userInfo, goHome?: boolean): Promise<AuthUserInfoResult | null> {

      if(!userInfo || userInfo==null){
        if(!this.token){
          // get token from local storage
          this.setToken(this.getToken, this.getToken);
        }
        // get user info from backend
        userInfo = await this.getUserInfoAction();
      }

      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction();
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          permissionStore.setDynamicAddedRoute(true);
        }
        goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
      }
      return userInfo;
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if(!this.token){
        this.setToken(this.getToken, this.getToken);
      }

      // get user info based on token
      const response = await API_AUTH_INFO();
      this.setUserInfo(response.data);
      return response.data;
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await API_AUTH_LOGOUT();
        } catch {
          console.log('注销Token失败');
        }
      }
      this.setToken(undefined, undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
