<template>
  <div class="worklayout-main-content">
    <a-tabs
      default-active-key="0"
      v-model:activeKey="activeKey"
      hide-add
      tab-position="top"
      size="small"
      @change="onChange"
    >
      <a-tab-pane key="knife4j" :closable="false" :tab="t('monitor.restfulApi.tab.knife4j')">
        <iframe
          src="http://localhost:9527/doc.html"
          ref="swaggerRef"
          id="swagger"
          style="height: 800px; width: 100%"
        ></iframe>
      </a-tab-pane>
      <a-tab-pane key="fastapi" :closable="false" :tab="t('monitor.restfulApi.tab.fastapi')">
        <iframe
          src="http://localhost:9538/fastapi/docs"
          ref="fastapiRef"
          id="fastapi"
          style="height: 800px; width: 100%"
        ></iframe>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup name="RestfulApi">
  import { nextTick, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Tabs as ATabs, TabPane as ATabPane } from 'ant-design-vue';

  const { t } = useI18n();
  const activeKey = ref('knife4j');
  const swaggerRef = ref();
  const fastapiRef = ref();

  const onChange = () => {
    nextTick(() => {
      changeMobsfIframe();
    });
  };

  /**
   * iframe-fit width and height
   */
  function changeMobsfIframe() {
    const deviceWidth = document.body.clientWidth;
    const deviceHeight = document.body.clientHeight;
    if (swaggerRef.value && activeKey.value == 'knife4j') {
      swaggerRef.value.style.width = Number(deviceWidth) - 240 + 'px'; 
      swaggerRef.value.style.height = Number(deviceHeight) - 160 + 'px'; 
    }
    if (fastapiRef.value && activeKey.value == 'fastapi') {
      fastapiRef.value.style.width = Number(deviceWidth) - 240 + 'px'; 
      fastapiRef.value.style.height = Number(deviceHeight) - 160 + 'px'; 
    }
  }

  nextTick(() => {
    changeMobsfIframe();
  });
</script>
