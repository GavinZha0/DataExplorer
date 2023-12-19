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
<script lang="ts" setup name="FilterModal">
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { filterModalSchemas } from '/@/views/dataviz/dataset/data';

  const { t } = useI18n();
  const emit = defineEmits(['success', 'register']);
  const modalTitle = ref<string>(t('dataviz.dataset.form.filter.new'));

  const [registerForm, { setFieldsValue, validate }] = useForm({
    labelWidth: 80,
    schemas: filterModalSchemas,
    showActionButtonGroup: false,
    actionColOptions: { span: 24 },
  });

  const [registerModal, { closeModal }] = useModalInner((data) => {
    let operator, value;
    if (data.dataRef) {
      if (data.dataRef.filter.startsWith('>=')) {
        operator = '>=';
        value = data.dataRef.filter.substring(2, 20);
      } else if (data.dataRef.filter.startsWith('<=')) {
        operator = '<=';
        value = data.dataRef.filter.substring(2, 20);
      } else if (data.dataRef.filter.startsWith('!=')) {
        operator = '!=';
        value = data.dataRef.filter.substring(2, 20);
      } else if (data.dataRef.filter.startsWith('>')) {
        operator = '>';
        value = data.dataRef.filter.substring(1, 20);
      } else if (data.dataRef.filter.startsWith('<')) {
        operator = '<';
        value = data.dataRef.filter.substring(1, 20);
      } else if (data.dataRef.filter.startsWith('=')) {
        operator = '=';
        value = data.dataRef.filter.substring(1, 20);
      } else if (data.dataRef.filter.startsWith('in')) {
        operator = 'in';
        value = data.dataRef.filter.substring(2, 20);
      } else if (data.dataRef.filter.startsWith('like')) {
        operator = 'like';
        value = data.dataRef.filter.substring(4, 20);
      }
    }

    data && setFieldsValue({ key: data.dataRef.key, operator: operator, value: value });
    // get modal title
    if (data.name) {
      modalTitle.value = '[' + data.name + ']';
    } else {
      modalTitle.value = t('dataviz.dataset.form.filter.new');
    }
  });

  async function handleOk() {
    try {
      // validate form data
      let values = await validate();
      values.key = Number(values.key);
      emit('success', values);
      closeModal();
    } finally {
      //
    }
  }
</script>
