<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="username" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.username"
          :placeholder="t('auth.login.label.username')"
        />
      </FormItem>
      <FormItem name="contact" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.contact"
          :placeholder="t('auth.login.label.contact')"
          class="fix-auto-fill"
        />
      </FormItem>
      <FormItem name="password" class="enter-x">
        <StrengthMeter
          size="large"
          v-model:value="formData.password"
          :placeholder="t('auth.login.label.password')"
        />
      </FormItem>
      <FormItem name="confirm" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.confirm"
          :placeholder="t('auth.login.label.confirm')"
        />
      </FormItem>

      <FormItem class="enter-x" name="policy">
        <Checkbox v-model:checked="formData.policy" size="small">
          {{ t('auth.login.tip.policy') }}
        </Checkbox>
      </FormItem>

      <Button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
      >
        {{ t('auth.login.label.register') }}
      </Button>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('auth.login.label.back') }}
      </Button>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button, Checkbox } from 'ant-design-vue';
  import { StrengthMeter } from '/@/components/StrengthMeter';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { API_AUTH_REG } from '/@/api/sys/auth';
  import { useMessage } from '/@/hooks/web/useMessage';

  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();
  const { notification } = useMessage();
  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    username: '',
    password: '',
    confirm: '',
    contact: '', // phone number or email address
    policy: false,
  });

  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);

  async function handleRegister() {
    const data = await validForm();
    if (!data) return;
    await API_AUTH_REG(data);
    notification.success({
      message: t('auth.login.tip.success'),
      description: `${t('auth.login.tip.success')}: ${data.username}`,
      duration: 1,
    });
  }
</script>
