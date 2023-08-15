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
<script lang="ts" setup name="CalcModal">
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { calcModalSchemas } from '/@/views/dataviz/dataview/data';

  const { t } = useI18n();
  const emit = defineEmits(['success', 'register']);
  const modalTitle = ref<string>(t('dataviz.dataview.form.calc.new'));

  const [registerForm, { setFieldsValue, validate }] = useForm({
    labelWidth: 80,
    schemas: calcModalSchemas,
    showActionButtonGroup: false,
    actionColOptions: { span: 24 },
  });

  const [registerModal, { closeModal }] = useModalInner((data) => {
    data && setFieldsValue(data);
    // get modal title
    if (data.name) {
      modalTitle.value = t('dataviz.dataview.form.calc.edit') + ' - ' + data?.name;
    } else {
      modalTitle.value = t('dataviz.dataview.form.calc.new');
    }
  });

  async function handleOk() {
    try {
      // validate form data
      let data = await validate();
      data.key = 'calc';
      emit('success', data);
      closeModal();
    } finally {
      //
    }
  }
</script>
