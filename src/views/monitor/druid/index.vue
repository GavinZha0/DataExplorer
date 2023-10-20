<template>
  <div class="worklayout-main-content">
    <iframe
      id="druid"
      ref="druidRef"
      src="http://localhost:9527/druid/index.html"
      style="height: 800px; width: 100%"
    ></iframe>
  </div>
</template>

<script lang="ts" setup name="Druid">
  import { nextTick, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const druidRef = ref();

  /**
   * iframe-fit width and height
   */
  function changeMobsfIframe() {
    const deviceWidth = document.body.clientWidth;
    const deviceHeight = document.body.clientHeight;
    if (druidRef.value) {
      druidRef.value.style.width = Number(deviceWidth) - 240 + 'px'; 
      druidRef.value.style.height = Number(deviceHeight) - 160 + 'px'; 
    }
  }

  nextTick(() => {
    changeMobsfIframe();
  });
</script>
