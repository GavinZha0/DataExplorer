<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="drawerTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-if="lang == 'zh-CN'"
          v-model:value="model[field]"
          v-model:checkedKeys="checkedMenus"
          v-model:selectedKeys="selectedMenus"
          v-model:expandedKeys="expandedKeys"
          :treeData="menuTreeData"
          :fieldNames="{ title: 'title', key: 'id' }"
          autoExpandParent
          defaultExpandAll
          checkable
          :title="t('dataviz.datareport.publish.menu')"
          @select="handleMenuSelection"
          @check="handleMenuCheck"
        />
        <BasicTree
          v-else
          v-model:value="model[field]"
          v-model:checkedKeys="checkedMenus"
          v-model:selectedKeys="selectedMenus"
          v-model:expandedKeys="expandedKeys"
          :treeData="menuTreeData"
          :fieldNames="{ title: 'name', key: 'id' }"
          autoExpandParent
          defaultExpandAll
          checkable
          :title="t('dataviz.datareport.publish.menu')"
          @select="handleMenuSelection"
          @check="handleMenuCheck"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup name="PublishForm">
  import { computed, ref, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { publishFormSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { API_MENU_TREE } from '/@/api/admin/menu';
  import { message } from 'ant-design-vue';
  import { API_DATAREPORT_PUBLISH } from '/@/api/dataviz/datareport';
  import { useLocale } from '/@/locales/useLocale';

  const { t } = useI18n();
  const rawData = ref<any>();
  const menuTreeData = ref<TreeItem[]>([]);
  const emit = defineEmits(['success', 'register']);
  const checkedMenus = ref<number[]>([]);
  const selectedMenus = ref<number[]>([]);
  const expandedKeys = ref<number[]>([]);
  const lang = ref<string>(useLocale().getLocale.value);

  // get drawer title
  const drawerTitle = computed(() => {
    if (rawData.value && rawData.value.id) {
      return t('dataviz.datareport.publish.title') + ' - ' + rawData.value.name;
    }
  });

  // form definition
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: publishFormSchema,
    showActionButtonGroup: false,
  });

  // data initialization
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    // remove old data of info form
    await resetFields();
    setDrawerProps({ confirmLoading: false });

    if (unref(menuTreeData).length === 0) {
      // get menu tree from backend
      API_MENU_TREE('publish')
        .then((response) => {
          response.checkable = false;
          menuTreeData.value = response.records as any as TreeItem[];
          expandedKeys.value.length = 0;
          for (const item of response) {
            // expand all
            expandedKeys.value.push(item.id);
          }
        })
        .catch((err) => {
          message.warning(t('common.exception.load'), err);
        });
    }

    // pass received data to info form
    await setFieldsValue({publishPub: data.publishPub, publishPages: data.pages.length, menuId: [data.menuId]});
    checkedMenus.value[0] = data.menuId;

    // save received data
    rawData.value = data;
  });

  /*
   * menu check
   */
  const handleMenuCheck = (checkList: any[], event: any) => {
    if (checkList.length > 1) {
      // only one menu can be checked
      checkList.splice(0, 1);
    }
    // sync up between checked keys and selected keys
    selectedMenus.value = checkList;
  };

  /*
   * menu selection
   */
  const handleMenuSelection = (selectedList: any[], event: any) => {
    // sync up between checked keys and selected keys
    checkedMenus.value = selectedList;
  };

  /*
   * find item in a tree
   */
  const findTreeItem = (tree: any, id: number) => {
    if(Array.isArray(tree)){
      for(let subItem of tree){
        let found = findTreeItem(subItem, id);
        if(found && found != null){
          return found;
        }
      }
    } else if(tree.id == id){
      return tree;
    }

    if(tree.children != undefined && tree.children.length > 0){
      for(let subTree of tree.children){
        let found = findTreeItem(subTree, id);
        if(found && found != null){
          return found;
        }
      }
    } else {
      return null;
    }
  };


  /*
   * submit after data is updated
   */
  async function handleSubmit() {
    try {
      // validate form data
      let values = await validate();
      rawData.value.publishPub = values.publishPub;
      if (values.menuId.length>0) {
        rawData.value.menuId = values.menuId[0];
        const selectedMenu = findTreeItem(menuTreeData.value, rawData.value.menuId);
        rawData.value.menuName = selectedMenu.title;
      } else {
        rawData.value.menuId = undefined;
        rawData.value.menuName = undefined;
      }

      setDrawerProps({ confirmLoading: true });
      // merge data and send to backend
      API_DATAREPORT_PUBLISH(rawData.value.id, rawData.value.menuId, values.publishPub)
        .then(() => {
          closeDrawer();
          emit('success', rawData.value);
          message.success(t('common.tip.publish'));
        })
        .catch((err) => {
          message.warning(t('common.exception.publish'), err);
        });
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
