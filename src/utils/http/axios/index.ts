// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged

import type { AxiosResponse } from 'axios';
import { clone } from 'lodash-es';
import type { RequestOptions, Result } from '/#/axios';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import { VAxios } from './Axios';
import { checkStatus } from './checkStatus';
import { useGlobSetting } from '/@/hooks/setting';
import { useMessage } from '/@/hooks/web/useMessage';
import { RequestEnum, ResultEnum, ContentTypeEnum } from '/@/enums/httpEnum';
import { isString } from '/@/utils/is';
import { setObjToUrlParams, deepMerge } from '/@/utils';
import { useErrorLogStoreWithOut } from '/@/store/modules/errorLog';
import { useI18n } from '/@/hooks/web/useI18n';
import { joinTimestamp, formatRequestDate } from './helper';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { AxiosRetry } from '/@/utils/http/axios/axiosRetry';
import { SHADOW_TOKEN_KEY, ACCESS_TOKEN_KEY, AUTH_TOKEN_KEY } from '/@/enums/cacheEnum';
import {getWebStorage} from "/@/utils/cache";

const globSetting = useGlobSetting();
const urlPrefix = globSetting.urlPrefix;
const { createMessage, createErrorModal } = useMessage();

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理响应数据。如果数据不是预期格式，可直接抛出错误
   */
  transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { t } = useI18n();
    const { isTransformResponse, isReturnNativeResponse, formatDateRsp } = options;
    if (isReturnNativeResponse && res.data.code === ResultEnum.SUCCESS) {
      // return native response which includes http header
      return res;
    }
    if (!isTransformResponse) {
      // return complete data which include code, data and msg
      return res.data;
    }

    if (!res.data) {
      // return '[HTTP] Request has no return value';
      throw new Error(t('sys.api.apiRequestFailed'));
    }

    //  这里 code，data，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, data, msg } = res.data;
    if (code === ResultEnum.SUCCESS || code === ResultEnum.HTTP_200_OK) {
      formatDateRsp && data && !isString(data) && formatRequestDate(data.records);
      return data;
    }

    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    let timeoutMsg = '';
    switch (code) {
      case ResultEnum.TIMEOUT:
      case ResultEnum.TOKEN_EXPIRED:
        timeoutMsg = t('sys.api.timeoutMessage');
        const userStore = useUserStoreWithOut();
        userStore.logout(true);
        break;
      default:
        if (msg) {
          timeoutMsg = msg;
        }
    }

    // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    if (options.errorMessageMode === 'modal') {
      createErrorModal({ title: t('sys.api.errorTip'), content: timeoutMsg });
    } else if (options.errorMessageMode === 'message') {
      createMessage.error(timeoutMsg);
    }

    throw new Error(timeoutMsg || t('sys.api.apiRequestFailed'));
  },

  // handle parameters and data before the request is sent out
  beforeRequestHook: (config, options) => {
    const { apiUrl, pyUrl, joinPrefix, joinParamsToUrl, formatDateReq, joinTime = true, urlPrefix } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    
    let isPy = false;
    if(pyUrl && pyUrl.length>0){
      for (const py of pyUrl){
        if (config.url?.startsWith(py)) {
          // forward to python server
          config.url = `/py${config.url}`;
          isPy = true;
          break;
        }
      }
    }
    
    if (!isPy && apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;

    // convert date time in data before it is sent out
    formatDateReq && data && !isString(data) && formatRequestDate(data);

    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else if (config.method?.toUpperCase() != RequestEnum.DELETE) {
      if (!isString(params)) {
        formatDateReq && formatRequestDate(params);
        if (
          Reflect.has(config, 'data') &&
          config.data &&
          (Object.keys(config.data).length > 0 || config.data instanceof FormData)
        ) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          );
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    if ((config as Recordable)?.requestOptions?.withToken !== false) {
      // get jwt tokens
      const token = useUserStoreWithOut().getToken;
      const shadowToken = getWebStorage(SHADOW_TOKEN_KEY);
      // put tokens into request header
      if (options.authenticationScheme != undefined && options.authenticationScheme == 'Bearer ') {
        (config as Recordable).headers[AUTH_TOKEN_KEY] = options.authenticationScheme + token;
        // shadow token without options.authenticationScheme
        (config as Recordable).headers[SHADOW_TOKEN_KEY] = shadowToken;
      }
    }
    return config;
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    // token without options.authenticationScheme
    let newToken = res.headers[ACCESS_TOKEN_KEY];

    // check if there is token in response
    if (newToken != undefined) {
      const newShadowToken = res.headers[SHADOW_TOKEN_KEY];

      // get local tokens
      const localToken = useUserStoreWithOut().getToken;
      const localShadowToken = useUserStoreWithOut().getShadowToken;

      if (newToken != localToken || newShadowToken != localShadowToken) {
        //refresh local tokens when one of tokens is changed
        useUserStoreWithOut().setToken(newToken, newShadowToken);
      }
    }
    return res;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (axiosInstance: AxiosResponse, error: any) => {
    const { t } = useI18n();
    const errorLogStore = useErrorLogStoreWithOut();
    errorLogStore.addAjaxErrorInfo(error);
    const { response, code, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    const msg: string = response?.data?.error?.message ?? '';
    const err: string = error?.toString?.() ?? '';
    let errMessage = '';

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = t('sys.api.apiTimeoutMessage');
      }
      if (err?.includes('Network Error')) {
        errMessage = t('sys.api.networkExceptionMsg');
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          createErrorModal({ title: t('sys.api.errorTip'), content: errMessage });
        } else if (errorMessageMode === 'message') {
          createMessage.error(errMessage);
        }
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error as unknown as string);
    }

    // check network status
    checkStatus(error?.response?.status, msg, errorMessageMode);

    // 添加自动重试机制 保险起见 只针对GET请求
    const retryRequest = new AxiosRetry();
    const { isOpenRetry } = config.requestOptions.retryRequest;
    config.method?.toUpperCase() === RequestEnum.GET &&
      isOpenRetry &&
      // @ts-ignore
      retryRequest.retry(axiosInstance, error);
    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    // 深度合并
    deepMerge(
      {
        // authentication schemes，e.g: Bearer
        authenticationScheme: 'Bearer ',
        timeout: 60 * 1000,

        // 基础接口地址
        // baseURL: globSetting.apiUrl,

        // default data format - json
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 数据处理方式
        transform: clone(transform),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 统一格式化请求消息中的日期时间
          // 返回的消息是不是也可以做同样的处理，并进行时区转换 Gavin !!!
          formatDateReq: false,
          formatDateRsp: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: globSetting.apiUrl,
          // python server url
          pyUrl: JSON.parse(globSetting.pyUrl),
          // 接口拼接地址
          urlPrefix: urlPrefix,
          //  是否在请求消息中统一加入时间戳
          joinTime: false,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 请求消息中是否携带token
          withToken: true,
          retryRequest: {
            isOpenRetry: true,
            count: 5,
            waitTime: 100,
          },
          //responseType: 'json',
        },
      },
      opt || {},
    ),
  );
}
export const defHttp = createAxios();
