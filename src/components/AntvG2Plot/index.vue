<template>
  <div
    ref="containerRef"
    id="g2Container"
    style="height: 700px; width: 100%; padding: 5px 5px 5px 5px; text-align: center"
  ></div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue';
  import { G2ModelType } from './type';
  import { g2plotRender } from '@antv/antv-spec';

  export default defineComponent({
    name: 'AntvG2Plot',
    props: {
      config: {
        type: Object,
        required: true,
      },
      option: {
        type: Object,
        required: true,
      },
      data: {
        type: Array as PropType<any[]>,
        required: true,
      },
    },
    setup(props, { slots }) {
      const modelRef = reactive<G2ModelType>({ ...props, inst: null, version: '2.4.10' });
      const containerRef = ref();
      let g2Data;

      // watch change of dim/metrics
      watch(modelRef.config, (newVal, oldVal) => {
        if (modelRef.config.cfg != null) {
          containerRef.value.innerHTML = '';
          g2plotRender(
            {
              chartType: modelRef.config.type,
              config: { ...modelRef.config.cfg, data: modelRef.data },
            },
            containerRef.value,
          );
        }
      });

      // watch change of dim/metrics
      watch(modelRef.data, (newVal, oldVal) => {
        g2Data = modelRef.data;
        if (modelRef.config.cfg != null) {
          containerRef.value.innerHTML = '';
          g2plotRender(
            {
              chartType: modelRef.config.type,
              config: { ...modelRef.config.cfg, data: modelRef.data },
            },
            containerRef.value,
          );
        }
      });

      onMounted(() => {
        if (modelRef.config.cfg != null && modelRef.data) {
          modelRef.inst = g2plotRender(
            {
              chartType: modelRef.config.type,
              config: { ...modelRef.config.cfg, data: modelRef.data },
            },
            containerRef.value,
          );
        }
      });

      return {
        modelRef,
        containerRef,
      };
    },
  });
</script>

<style lang="less" scoped></style>
