<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :closable="false"
    destroyOnClose
    :canFullscreen="false"
    :title="modalTitle"
    @ok="handleOk"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm">
        <template #markerColor="{ model, field }">
          <color-picker v-model:pureColor="model[field]" format="hex" disable-history disable-alpha shape="circle" />
        </template>
      </BasicForm>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup name="MapModal">
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { mapModalSchemas } from '/@/views/dataviz/dataview/leafletData';
  import { message } from 'ant-design-vue';

  const { t } = useI18n();
  const emit = defineEmits(['success', 'register']);
  const modalTitle = ref<string>(t('dataviz.dataview.form.map.new'));
  const mapTarget = ref<string>();

  const [registerForm, { setFieldsValue, validate }] = useForm({
    labelWidth: 80,
    schemas: mapModalSchemas,
    showActionButtonGroup: false,
    actionColOptions: { span: 24 },
  });

  const [registerModal, { closeModal }] = useModalInner((data) => {
    data && setFieldsValue(data);
    mapTarget.value = data.target;
    if (data.shape) {
      modalTitle.value = '[' + data?.shape + ']';
    } else if (data.color) {
      modalTitle.value = '[' + data?.color + ']';
    } else {
      modalTitle.value = t('dataviz.dataview.form.map.new');
    }
  });

  async function handleOk() {
    try {
      // validate form data
      let data = await validate();
      if (mapTarget.value == 'markerShape' && (!data.shape || data.shape == '')) {
        message.error(t('dataviz.dataview.error.shapeEmpty'));
        return;
      }
      if (mapTarget.value == 'markerColor' && (!data.color || data.color == '')) {
        message.error(t('dataviz.dataview.error.colorEmpty'));
        return;
      }
      if (mapTarget.value == 'clusterColor' && (!data.color || data.color == '')) {
        message.error(t('dataviz.dataview.error.clusterColorEmpty'));
        return;
      }
      data.target = mapTarget.value;
      emit('success', data);
      closeModal();
    } finally {
      //
    }
  }
</script>
