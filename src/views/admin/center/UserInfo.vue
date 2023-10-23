<template>
  <CollapseContainer :title="t('admin.center.user.title')" :border="true" :canExpan="false">
    <template #action>
      <Button type="primary" @click="handleBaseUpdate">{{ t('admin.center.toolbar.update') }}</Button>
    </template>
    <a-row :gutter="24">
      <a-col :md="2" :sm="24">
        <div class="change-avatar">
          <CropperAvatar
            :uploadApi="API_USER_UPLOAD"
            :value="avatar"
            :showBtn="false"
            @change="updateAvatar"
            width="100"
          />
        </div>
        <div style="font-weight: bold; font-size: 16px; color: green; text-align: center">{{ userinfo.name }}</div>
      </a-col>
      <a-col :md="22" :sm="24">
        <BasicForm
          :forceRender="true"
          ref="baseFormRef"
          :schemas="baseSchema"
          :labelWidth="100"
          :baseColProps="{ span: 6 }"
          :showActionButtonGroup="false"
        />
      </a-col>
    </a-row>
  </CollapseContainer>
  <div style="width: 100%; height: 20px; background-color: whitesmoke"></div>
  <CollapseContainer :title="t('admin.center.user.contact.title')" :canExpan="false">
    <template #action>
      <Button type="primary" @click="handleContactUpdate">{{ t('admin.center.toolbar.update') }}</Button>
    </template>
    <a-row :gutter="24">
      <a-col :md="24" :sm="24">
        <BasicForm
          ref="contactFormRef"
          :schemas="contactSchema"
          :labelWidth="100"
          :baseColProps="{ span: 6 }"
          :showActionButtonGroup="false"
        />
      </a-col>
    </a-row>
  </CollapseContainer>
  <div style="width: 100%; height: 20px; background-color: whitesmoke"></div>
  <CollapseContainer :title="t('admin.center.user.security.title')" :canExpan="false">
    <template #action>
      <Button type="primary" @click="handleSecurityUpdate">{{ t('admin.center.toolbar.update') }}</Button>
    </template>
    <a-row :gutter="24">
      <a-col :md="24" :sm="24">
        <BasicForm
          ref="securityFormRef"
          :schemas="securitySchema"
          :labelWidth="150"
          :baseColProps="{ span: 6 }"
          :showActionButtonGroup="false"
        />
      </a-col>
    </a-row>
  </CollapseContainer>
  <div style="width: 100%; height: 20px; background-color: whitesmoke"></div>
  <CollapseContainer :title="t('admin.center.user.license.title')" :canExpan="false">
    <template #action>
      <Button type="primary" @click="handleFeatureUpdate">{{ t('admin.center.toolbar.update') }}</Button>
    </template>
    <a-row :gutter="24">
      <a-col :md="24" :sm="24">
        <BasicTable @register="registerTable" />
      </a-col>
    </a-row>
  </CollapseContainer>
</template>
<script lang="ts" setup name="UserInfo">
  import { Button, Row as ARow, Col as ACol, message } from 'ant-design-vue';
  import { computed, ref } from 'vue';
  import { BasicForm, FormActionType } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { CropperAvatar } from '/@/components/Cropper';
  import headerImg from '/@/assets/images/cowboy.png';
  import { BasicTable, useTable } from '/@/components/Table';
  import { baseSchema, contactSchema, securitySchema, featureColumns } from './data';
  import { useUserStore } from '/@/store/modules/user';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { API_ORG_OPTIONS } from '/@/api/admin/org';
  import { API_LOG_ACC_LATEST } from '/@/api/system/log';
  import { API_USER_ONE, API_USER_PWD, API_USER_UPDATE, API_USER_UPLOAD } from '/@/api/admin/user';

  const { t } = useI18n();
  const userStore = useUserStore();
  const userData = ref<any>();
  const userinfo = ref<any>(userStore.getUserInfo);
  const baseFormRef = ref<Nullable<FormActionType>>(null);
  const contactFormRef = ref<Nullable<FormActionType>>(null);
  const securityFormRef = ref<Nullable<FormActionType>>(null);

  const avatar = computed(() => {
    const { avatar } = userStore.getUserInfo;
    return avatar || headerImg;
  });

  function updateAvatar({ src, data }) {
    userinfo.value.avatar = src;
    userStore.setUserInfo(userinfo);
    console.log('data', data);
  }

  // table definition
  const [registerTable] = useTable({
    api:  API_ORG_OPTIONS,
    rowKey: 'id',
    columns: featureColumns,
    isTreeTable: false,
    pagination: false,
    striped: true,
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
  });

  // get user list from backend
  API_USER_ONE(userinfo.value.id)
    .then((response) => {
      userData.value = response;
      baseFormRef.value.setFieldsValue(response);
      contactFormRef.value.setFieldsValue(response);
      securityFormRef.value.setFieldsValue(response);
    })
    .catch((err) => {
      message.warning(t('common.exception.load'), err);
    });

  // get user list from backend
  API_LOG_ACC_LATEST(userinfo.value.id)
    .then((response) => {
      userData.value = response;
      baseFormRef.value.setFieldsValue({lastLogin: response.tsUtc});
    })
    .catch((err) => {
      message.warning(t('common.exception.load'), err);
    });

  /*
   * update basic info
   */
  const handleBaseUpdate = () => {
    let values = baseFormRef.value.getFieldsValue();
    values.part = 0;
    API_USER_UPDATE(values)
      .then(() => {
        message.success(t('common.tip.update'));
      })
      .catch((err) => {
        message.warning(t('common.exception.update'), err);
      });
  };

  /*
   * update contact info
   */
  const handleContactUpdate = () => {
    const values = contactFormRef.value.getFieldsValue();
    values.part = 1;
    API_USER_UPDATE(values)
      .then(() => {
        message.success(t('common.tip.update'));
      })
      .catch((err) => {
        message.warning(t('common.exception.update'), err);
      });
  };

  /*
   * update security info
   */
  const handleSecurityUpdate = async () => {
    let values = await securityFormRef.value.validate();
    if (values.newPwd != values.confirm) {
      message.warning(t('admin.center.exception.invalidPwd'));
      return;
    }
    if (values.newPwd == values.oldPwd) {
      message.warning(t('admin.center.exception.samePwd'));
      return;
    }

    API_USER_PWD(values)
      .then(() => {
        message.success(t('common.tip.update'));
      })
      .catch((err) => {
        message.warning(t('common.exception.update'), err);
      });
  };

  /*
   * update feature info
   */
  const handleFeatureUpdate = () => {
    const values = baseFormRef.value.getFieldsValue();
    values.part = 3;
    API_USER_UPDATE(values)
      .then(() => {
        message.success(t('common.tip.update'));
      })
      .catch((err) => {
        message.warning(t('common.exception.update'), err);
      });
  };
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
