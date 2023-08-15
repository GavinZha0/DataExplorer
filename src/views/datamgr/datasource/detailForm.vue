<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :title="drawerTitle"
    showFooter
    @ok="handleSubmit"
  >
    <BasicForm ref="infoFormRef" :schemas="infoFormSchema" :showActionButtonGroup="false">
      <template #group="{ model, field }">
        <ApiSelect
          :api="API_DATASOURCE_GROUPS"
          mode="tags"
          v-model:value="model[field]"
          resultField="records"
          @change="handleDatasourceGroupChange"
        />
      </template>
      <template #params>
        <BasicTable @register="registerParamTable" @edit-end="handleParamEditEnd">
          <template #headerCell="{ column }">
            <template v-if="column.key === 'name'">
              {{ t('dataviz.datasource.table.title.param') }}
              <PlusSquareTwoTone
                class="ml-2"
                :style="{ fontSize: '20px', marginLeft: '8px', cursor: 'pointer' }"
                @click="handleParamAdd"
              />
            </template>
            <template v-else>
              {{ t('dataviz.datasource.table.title.value') }}
            </template>
          </template>
        </BasicTable>
      </template>
    </BasicForm>
    <template #insertFooter>
      <a-button type="primary" @click="handleUrlTest" style="right: 250px">{{
        t('dataviz.datasource.form.test')
      }}</a-button>
    </template>
  </BasicDrawer>
</template>

<script lang="ts" setup name="DetailForm">
  import { ref } from 'vue';
  import { BasicForm, FormActionType } from '/@/components/Form/index';
  import { BasicTable, useTable } from '/@/components/Table';
  import { infoFormSchema, paramColumns } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { message } from 'ant-design-vue';
  import { PlusSquareTwoTone } from '@ant-design/icons-vue';
  import {
    API_DATASOURCE_CREATE,
    API_DATASOURCE_TEST,
    API_DATASOURCE_UPDATE,
    API_DATASOURCE_GROUPS,
  } from '/@/api/dataviz/datasource';
  import { ApiDsDataType, initSource } from '/@/api/dataviz/model/datasource';
  import { NameValueType } from '/@/api/model/baseModel';
  import { ApiSelect } from '/@/components/Form';

  const { t } = useI18n();
  const rawData = ref<ApiDsDataType>(initSource);
  const urlParams = ref<NameValueType[]>([]);
  const drawerTitle = ref<string>(t('common.form.new'));
  const emit = defineEmits(['success', 'register']);
  const infoFormRef = ref<Nullable<FormActionType>>(null);

  // parameter table definition
  const [registerParamTable, { insertTableDataRecord, setTableData }] = useTable({
    bordered: true,
    columns: paramColumns,
    dataSource: urlParams,
    pagination: false,
    canResize: false,
    scroll: { y: 200 },
    showIndexColumn: false,
  });

  // drawer initialization
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    // remove old data
    if (infoFormRef.value) {
      await infoFormRef.value.resetFields();
    }

    setTableData([]);

    // save received data
    rawData.value = data;
    urlParams.value = data.params ? data.params : [];
    setDrawerProps({ confirmLoading: false });

    // set received data to form
    if (infoFormRef.value) {
      await infoFormRef.value.setFieldsValue({ ...data });
    }
    // get drawer title
    if (data && data.id) {
      drawerTitle.value = '[' + data.name + ']';
    } else {
      drawerTitle.value = t('common.form.new');
    }
  });

  /*
   * only pick up the latest one as selected field when selecting change
   * selection component accepts user defined item when it is tags mode
   * so you can select existing group name or create a new group
   */
  const handleDatasourceGroupChange = (value: string[]) => {
    if (infoFormRef.value) {
      if (value.length > 0) {
        // get the latest one when there are multiple selections
        infoFormRef.value.setFieldsValue({ group: value[value.length - 1] });
      } else {
        // set to undefined when it is empty to avoid []
        infoFormRef.value.setFieldsValue({ group: undefined });
      }
    }
  };

  /*
   * add parameter
   */
  async function handleParamAdd() {
    // add an empty parameter to table
    if (urlParams.value) {
      insertTableDataRecord({ name: '', value: '' }, urlParams.value.length);
    } else {
      insertTableDataRecord({ name: '', value: '' }, 0);
    }
  }

  /*
   * update parameter
   */
  async function handleParamEditEnd({ index, key, value }: Recordable) {
    if (urlParams.value.length <= index) {
      // add a new one
      urlParams.value.push({ name: '', value: '' });
    }
    urlParams.value[index][key] = value;

    // update form values
    if (infoFormRef.value) {
      await infoFormRef.value.setFieldsValue({ params: urlParams.value });
    }
  }

  /*
   * test database url
   */
  async function handleUrlTest() {
    try {
      let values = {};
      if (infoFormRef.value) {
        values = await infoFormRef.value.validate();
      }
      values.id = Number(values.id);
      setDrawerProps({ confirmLoading: true });
      API_DATASOURCE_TEST(values)
        .then((response) => {
          // get db version from test response and set to form
          if (infoFormRef.value) {
            infoFormRef.value.setFieldsValue({ version: response });
          }
          message.success(t('common.success.test'));
        })
        .catch((err) => {
          message.error(t('common.exception.test'), err);
        });
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }

  /*
   * submit after data is updated
   */
  async function handleSubmit() {
    try {
      // validate form data
      // detail form has all data fields which are defined by ApiDsDataType
      let values = await infoFormRef.value.validate();
      setDrawerProps({ confirmLoading: true });
      if (values.id) {
        values.id = rawData.value.id;
        API_DATASOURCE_UPDATE(values).then(() => {
          message.success(t('common.tip.update'));
          closeDrawer();
          // notify parent
          emit('success', values);
        });
      } else {
        // create new data when id is null
        API_DATASOURCE_CREATE(values).then(() => {
          message.success(t('common.tip.new'));
          closeDrawer();
          // notify parent to update list table
          emit('success', values);
        });
      }
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
