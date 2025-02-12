<template>
  <BasicModal
    v-bind="$attrs"
    centered
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
<script lang="ts" setup name="FieldModal">
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { FieldModalSchemas } from './data';

  const emit = defineEmits(['success', 'register']);
  const modalTitle = ref<string>();

  const [registerForm, { setFieldsValue, validate }] = useForm({
    labelWidth: 80,
    schemas: FieldModalSchemas,
    showActionButtonGroup: false,
    actionColOptions: { span: 24 },
  });

  const [registerModal, { closeModal }] = useModalInner((data) => {
    data && setFieldsValue(data);
    // get modal title
    modalTitle.value = '[' + data?.dataIndex + ']';
  });

  async function handleOk() {
    try {
      // validate form data
      let data = await validate();
      emit('success', data);
      closeModal();
    } finally {
      //
    }
  }
</script>
