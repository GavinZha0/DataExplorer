<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="identity" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.identity"
        :placeholder="t('auth.login.label.identity')"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem
      name="passcode"
      class="enter-x"
      :rules="[{ required: true, message: 'Please input Passcode!' }]"
    >
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.passcode"
        :placeholder="t('auth.login.label.passcode')"
      />
    </FormItem>
    <Row class="enter-x">
      <Col :span="12">
        <FormItem>
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('auth.login.label.rememberMe') }}
          </Checkbox>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('auth.login.label.forgetPassword') }}
          </Button>
        </FormItem>
      </Col>
    </Row>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ t('auth.login.label.login') }}
      </Button>
    </FormItem>
    <Row class="enter-x">
      <Col :md="7" :xs="24">
        <CountButton @click="handleAuthCodeGet" />
      </Col>
      <Col :md="7" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mx-2">
        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('auth.login.label.qrCode') }}
        </Button>
      </Col>
      <Col :md="7" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mx-2">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('auth.login.label.register') }}
        </Button>
      </Col>
    </Row>

    <Divider class="enter-x">{{ t('auth.login.label.info') }}</Divider>
    <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`">
      <GithubFilled @click="openWindow('https://github.com/GavinZha0')" />
      <WechatFilled />
      <AlipayCircleFilled />
      <FacebookOutlined />
      <TwitterCircleFilled />
    </div>
  </Form>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';
  import {
    Checkbox,
    Form,
    FormItem,
    Input,
    InputPassword,
    Row,
    Col,
    Button,
    Divider,
  } from 'ant-design-vue';
  import {
    GithubFilled,
    WechatFilled,
    AlipayCircleFilled,
    FacebookOutlined,
    TwitterCircleFilled,
  } from '@ant-design/icons-vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import CountButton from '/@/components/CountDown/src/CountButton.vue';
  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { API_AUTH_CODE } from '/@/api/sys/auth';
  import { onKeyStroke } from '@vueuse/core';
  import { openWindow } from '/@/utils';

  const { t } = useI18n();
  const { notification, createErrorModal } = useMessage();
  const { prefixCls } = useDesign('login');
  const userStore = useUserStore();

  const { setLoginState, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);
  const rememberMe = ref(false);

  const formData = reactive({
    identity: '',
    passcode: '',
  });

  const { validForm } = useFormValid(formRef);
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

  /*
   * get auth code
   * the code will be sent to phone or email
   */
  const handleAuthCodeGet = () => {
    API_AUTH_CODE(formData.identity);
  };

  /*
   * login
   */
  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    try {
      loading.value = true;
      const userInfo = await userStore.login({
        username: data.identity, // identity
        password: data.passcode, // passcode
        mode: 'none', //no default error
      });
      if (userInfo) {
        // show message when login
        notification.success({
          message: t('auth.login.tip.loginSuccessTitle'),
          description: `${t('auth.login.tip.loginSuccessDesc')}: ${userInfo.realname}`,
          duration: 3,
        });
        
      }
    } catch (error) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      });
    } finally {
      loading.value = false;
    }
  }
</script>

<style lang="less">
  .ant-input-group-addon {
    width: 100px;
    background-color: transparent;
  }
</style>
