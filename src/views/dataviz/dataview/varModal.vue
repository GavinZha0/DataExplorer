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
      <BasicForm @register="registerForm" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup name="VarModal">
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { varModalSchemas } from '/@/views/dataviz/dataset/data';

  const { t } = useI18n();
  const emit = defineEmits(['success', 'register']);
  const modalTitle = ref<string>(t('dataviz.dataset.form.var.new'));

  const [registerForm, { setFieldsValue, validate }] = useForm({
    labelWidth: 80,
    schemas: varModalSchemas,
    showActionButtonGroup: false,
    actionColOptions: { span: 24 },
  });

  const [registerModal, { closeModal }] = useModalInner((data) => {
    data && setFieldsValue(data);
    // get modal title
    if (data.name) {
      modalTitle.value = '[' + data?.name + ']';
    } else {
      modalTitle.value = t('dataviz.dataset.form.var.new');
    }
  });

  async function handleOk() {
    try {
      // validate form data
      let data = await validate();
      data.key = 'var';
      emit('success', data);
      closeModal();
    } finally {
      //
    }
  }
</script>
