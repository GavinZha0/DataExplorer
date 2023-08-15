<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="drawerTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #lockedTable="{ model, field }">
        <BasicTree
          ref="tableTreeRef"
          v-model:value="model[field]"
          :treeData="treeTables"
          :fieldNames="{ key: 'id', title: 'name' }"
          checkable
          toolbar
          :checkedKeys="lockedKeys"
          :title="t('dataviz.datasource.table.action.lock')"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup name="LockForm">
  import { computed, ref, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { lockFormSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { API_DATASOURCE_LOCK, API_DATASOURCE_TABLES } from '/@/api/dataviz/datasource';
  import {message} from "ant-design-vue";

  const { t } = useI18n();
  const rawData = ref<any>();
  const treeTables = ref<TreeItem[]>([]);
  const tableTreeRef = ref();
  const drawerTitle = ref<string>(t('common.form.new'));
  const emit = defineEmits(['success', 'register']);

  // drawer initialization
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false });
    // remove old data
    await resetFields();

    if (unref(treeTables).length === 0 || data.id != unref(rawData).id) {
      // get table tree from backend
      API_DATASOURCE_TABLES({ id: data.id, locked: true }).then((response) => {
        // get and show all tables
        treeTables.value = response.records as any as TreeItem[];
      });
    } else {
      // Ideally this is not necessary.
      // this should be optimized
      let keys: any[] = [];
      for (const item of unref(treeTables)) {
        if (item.locked) {
          keys.push(item.id);
        }
      }
      tableTreeRef.value.setCheckedKeys(keys);
    }

    // save raw data for merging later
    // form has the fields of lockFormSchema only
    rawData.value = data;
    await setFieldsValue({ ...data });

    // get drawer title
    if (data && data.id) {
      drawerTitle.value = '[' + data.name + ']';
    }
  });

  // form definition
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: lockFormSchema,
    showActionButtonGroup: false,
  });

  /*
   * get initial locked tables when tables are loaded
   * don't use v-model:checkedKeys on <BasicTree>, it doesn't work for initial check
   */
  const lockedKeys = computed(() => {
    const keys: string[] = [];
    for (const item of unref(treeTables)) {
      if (item.locked) {
        keys.push(item.id);
      }
    }
    return keys;
  });

  /*
   * submit after data is updated
   */
  async function handleSubmit() {
    try {
      // validate form data
      let values = await validate();
      // id should be a number, but we get string from form.
      // so convert it to number
      values.id = Number(values.id);
      // get locked table names based on keys
      for (const key of values.lockedTable) {
        const table = unref(treeTables).find((ele) => {
          return ele.id == key;
        });
        if (!rawData.value.lockedTable) {
          rawData.value.lockedTable = [];
        }
        rawData.value.lockedTable.push(table.name);
      }

      setDrawerProps({ confirmLoading: true });
      // update locked tables
      API_DATASOURCE_LOCK(values.id, unref(rawData).lockedTable).then(() => {
        closeDrawer();
        emit('success', { ...values });
        message.success(t('common.tip.lock'));
      });
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
