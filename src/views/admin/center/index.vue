<template>
  <ScrollContainer>
    <div ref="wrapperRef" class="account-setting">
      <Tabs active="user" tab-position="left" :tabBarStyle="{ width: '150px' }">
        <Tabs.TabPane key="user" :tab="t('admin.center.user.title')">
          <UserInfo />
        </Tabs.TabPane>
        <Tabs.TabPane key="msg" :tab="t('admin.center.msg.title')">
          <MsgNotify />
        </Tabs.TabPane>
        <Tabs.TabPane key="contribution" :tab="t('admin.center.contribution.title')">
          <div>hello</div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  </ScrollContainer>
</template>

<script lang="ts" setup name="Center">
  import { Tabs } from 'ant-design-vue';
  import { ScrollContainer } from '/@/components/Container/index';
  import UserInfo from './UserInfo.vue';
  import MsgNotify from './MsgNotify.vue';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();
</script>

<style lang="less">
  .account-setting {
    margin: 12px;
    background-color: @component-background;

    .base-title {
      padding-left: 0;
    }

    .ant-tabs-tab-active {
      background-color: @item-active-bg;
    }
  }
</style>
