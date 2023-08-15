import type { ValidationRule } from 'ant-design-vue/lib/form/Form';
import type { RuleObject } from 'ant-design-vue/lib/form/interface';
import { ref, computed, unref, Ref } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import validator from 'validator';

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  QR_CODE,
}

const currentState = ref(LoginStateEnum.LOGIN);

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state;
  }

  const getLoginState = computed(() => currentState.value);

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN);
  }

  return { setLoginState, getLoginState, handleBackLogin };
}

export function useFormValid<T extends Object = any>(formRef: Ref<any>) {
  async function validForm() {
    const form = unref(formRef);
    if (!form) return;
    const data = await form.validate();
    return data as T;
  }

  return { validForm };
}

export function useFormRules(formData?: Recordable) {
  const { t } = useI18n();

  // validate username
  const validateUsername = async (_: RuleObject, value: string) => {
    const dt = value.trim();
    const reg = /^[a-zA-Z]{3,16}$/;

    if (dt.length == 0) {
      return Promise.reject(t('auth.login.tip.username'));
    } else if (reg.test(dt)) {
      return Promise.resolve();
    } else {
      return Promise.reject(t('auth.login.tip.usernameWeek'));
    }
  };

  // validate phone number and email address
  const validateMobile = async (_: RuleObject, value: string) => {
    const dt = value.trim();
    //const phoneReg = /^\d{9,}$/;
    //const emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    /*
    if (dt.length == 0) {
      return Promise.reject(t('auth.login.tip.mobile'));
    } else if (phoneReg.test(dt) || emailReg.test(dt)) {
      return Promise.resolve();
    } else {
      return Promise.reject(t('auth.login.tip.format'));
    }
    */

    if (dt.length == 0) {
      return Promise.reject(t('auth.login.tip.mobile'));
    } else if (validator.isMobilePhone(dt) || validator.isEmail(dt)) {
      return Promise.resolve();
    } else {
      return Promise.reject(t('auth.login.tip.format'));
    }

  };

  // validate password
  const validatePassword = async (_: RuleObject, value: string) => {
    const dt = value.trim();
    let modes = 0;

    /*
    if (dt.length > 6) modes++; // 6 chars at least
    if (/\d/.test(dt)) modes++; // include number
    if (/[a-z]/.test(dt)) modes++; // include low case char
    if (/[A-Z]/.test(dt)) modes++; // include upper case char
    if (/\W/.test(dt)) modes++; // include specific char

    if (dt.length == 0) {
      return Promise.reject(t('auth.login.tip.password'));
    } else if (modes == 5) {
      return Promise.resolve();
    } else {
      return Promise.reject(t('auth.login.tip.passwordWeek'));
    }
    */

    if (dt.length == 0) {
      return Promise.reject(t('auth.login.tip.password'));
    } else if (validator.isStrongPassword(dt)) {
      return Promise.resolve();
    } else {
      return Promise.reject(t('auth.login.tip.passwordWeek'));
    }
  };

  // validate confirmed password
  const validateConfirm = (password: string) => {
    return async (_: RuleObject, value: string) => {
      if (!value) {
        return Promise.reject(t('auth.login.tip.password'));
      }
      if (value !== password) {
        return Promise.reject(t('auth.login.tip.diffPwd'));
      }
      return Promise.resolve();
    };
  };

  // validate security code
  const validateCode = async (_: RuleObject, value: string) => {
    return value.length == 6 ? Promise.resolve() : Promise.reject(t('auth.login.tip.code'));
  };

  // validate policy
  const validatePolicy = async (_: RuleObject, value: boolean) => {
    return !value ? Promise.reject(t('auth.login.tip.policy')) : Promise.resolve();
  };

  const getFormRules = computed((): { [k: string]: ValidationRule | ValidationRule[] } => {
    switch (unref(currentState)) {
      // register form rules
      case LoginStateEnum.REGISTER:
        return {
          username: [{ required: true, validator: validateUsername, trigger: 'blur' }],
          password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
          confirm: [{ required: true, validator: validateConfirm(formData?.password), trigger: 'change' }],
          contact: [{ required: true, validator: validateMobile, trigger: 'blur' }],
          policy: [{ required: true, validator: validatePolicy, trigger: 'change' }],
        };

      // reset password form rules
      case LoginStateEnum.RESET_PASSWORD:
        return {
          username: [{ required: true, validator: validateUsername, trigger: 'blur' }],
          contact: [{ required: true, validator: validateMobile, trigger: 'change' }],
          code: [{ required: true, validator: validateCode, trigger: 'change' }],
        };

      // login form rules
      default:
        return {
          username: [{ required: true, validator: validateUsername, trigger: 'blur' }],
        };
    }
  });
  return { getFormRules };
}
