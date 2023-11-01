<template>
  <BasicDrawer
    v-bind="$attrs"
    :isDetail="true"
    @register="registerDrawer"
    :title="drawerTitle"
    :closable="false"
    :showDetailBack="true"
    :keyboard="false"
    @close="handleFormClose"
  >
    <template #titleToolbar>
      <Tooltip>
        <template #title>{{ t('common.toolbar.save') }}</template>
        <SaveTwoTone class="toolbar-button" @click="saveDataview" />
      </Tooltip>
    </template>
    <div style="width: 98%; float: left">
      <Row type="flex" :gutter="4">
        <Col :md="24 - rightPanelSize" :sm="24">
          <div>
            <div style="height:30px; border: solid 1px gray;">
              <CheckableTag v-for="(item, index) in exeRspInfo.image"
                :key="index"
                :style="{float: 'left', marginTop: '3px', color: item.color}"
                v-model:checked="item.checked"
                @change="handleTagChange(index, item.id)">
                {{item.className}} ({{item.probability}}%)
              </CheckableTag>
            </div>
            <div style="width: 100%; border: solid 1px gray; height: 650px">
              <div id="tui-image-editor" ref="imageRef"></div>
            </div>
            <div style="width: 100%; border: solid 1px gray; height: 100px">
              <UploadDragger
                v-model:file-list="fileList"
                :multiple="true"
                list-type="picture-card"
                class="upload-list-inline"
                accept=".bmp,.jpg,.jpeg,.png,.gif,.svg"
                @change="handleImageChange"
                @preview="handlePreview"
                >
                  <p class="ant-upload-drag-icon" style="padding: 0px 15px;"><PlusOutlined :style="{fontSize: '32px'}"/></p>
              </UploadDragger>
            </div>
          </div>
        </Col>
        <Col :md="rightPanelSize" :sm="24" :forceRender="true">
          <div
            :style="{
              borderWidth: '1px',
              borderColor: 'black',
              height: '100%',
              width: '100%',
              paddingLeft: '5px',
              paddingRight: '5px',
              paddingTop: '5px',
              paddingBottom: '5px',
              display: rightPanelKey == 'info' ? 'block' : 'none',
            }"
          >
            <BasicForm
              ref="infoFormRef"
              :forceRender="true"
              :schemas="formInfoSchema"
              :showActionButtonGroup="false"
              layout="vertical"
            >
              <template #group="{ model, field }">
                <ApiSelect
                  :api="API_AI_IMAGE_GROUPS"
                  mode="tags"
                  v-model:value="model[field]"
                  resultField="records"
                  @change="handleImageGroupChange"
                />
              </template>
            </BasicForm>
          </div>
          <div
            :style="{
              borderWidth: '1px',
              borderColor: 'black',
              height: '100%',
              width: '100%',
              paddingLeft: '5px',
              paddingRight: '5px',
              paddingTop: '5px',
              paddingBottom: '5px',
              display: rightPanelKey == 'model' ? 'block' : 'none'
            }"
          >
            <BasicForm
              ref="modelFormRef"
              layout="vertical"
              :forceRender="true"
              :schemas="formModelSchema"
              :showActionButtonGroup="false"
              @fieldValueChange="handleModelChange"
            >
              <template #modelTypes="{ model, field }">
                <ApiSelect
                  placeholder="Select model type"
                  :api="API_AI_MODEL_TYPES"
                  v-model:value="model[field]"
                  :immediate="true"
                  resultField="records"
                  :fieldNames="{ key: 'id', label: 'name', value: 'name' }"
                  @change="handleCategoryChange"
                />
              </template>
              <template #modelList="{ model, field }">
                <List item-layout="vertical" size="small" :data-source="modelList" :pagination="pagination">
                  <template #renderItem="{ item }">
                    <ListItem key="item.id">
                      <ListItemMeta :description="item.description">
                        <template #title>
                          <Button
                            type="link"
                            size="small"
                            :loading="item.loading"
                            style="font-size: 16px; font-weight: bold;"
                            @click="execute(item.id)">
                            <CheckOutlined v-if="selectedFile!=undefined && item.id==selectedFile.model" />
                            {{ item.name }}
                          </Button>
                        </template>
                        </ListItemMeta>
                        <template #actions>
                          <span>
                            <StarOutlined />
                            {{ item.rate }}
                          </span>
                          <span>
                            <DollarOutlined />
                            {{ item.price }}
                          </span>
                          <span>
                            <GoldOutlined />
                            {{ item.framework }}
                          </span>
                      </template>
                    </ListItem>
                  </template>
                </List>
              </template>
            </BasicForm>
          </div>
        </Col>
      </Row>
    </div>
    <Menu
      mode="inline"
      theme="light"
      :multiple="false"
      :selectable="true"
      :inlineCollapsed="true"
      v-model:selectedKeys="selectedPanelKeys"
      style="float: left; width: 2%"
      @click="handleMenuSwitch"
    >
      <MenuItem key="info">
        <template #icon>
          <InfoCircleFilled
            :style="{
              fontSize: '24px',
              color: 'green',
            }"
          />
        </template>
        <span>Info</span>
      </MenuItem>
      <MenuItem key="model">
        <template #icon>
          <ExperimentOutlined
            :style="{
              fontSize: '24px',
              color: 'green',
            }"
          />
        </template>
        <span>Model</span>
      </MenuItem>
    </Menu>
  </BasicDrawer>
</template>

<script lang="ts" setup name="DetailForm">
  import { reactive, ref, unref } from 'vue';
  import { BasicForm, FormActionType } from '/@/components/Form/index';
  import {
    formInfoSchema,
    formModelSchema,
  } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import {
    SaveTwoTone,
    PlusOutlined,
    ExperimentOutlined,
    StarOutlined,
    DollarOutlined,
    GoldOutlined,
    InfoCircleFilled,
  } from '@ant-design/icons-vue';
  import 'splitpanes/dist/splitpanes.css';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ApiSelect } from '/@/components/Form';
  import {
    message,
    Tooltip,
    List,
    ListItem,
    ListItemMeta,
    Row,
    Col,
    Menu,
    MenuItem,
    CheckableTag,
    Button,
    UploadDragger
  } from 'ant-design-vue';
  import {
    ApiImageDataType,
    iniImageOptions,
    customTheme
  } from '/@/api/ai/model/image';
  import {
    API_DATAVIEW_CREATE,
    API_DATAVIEW_UPDATE,
  } from '/@/api/dataviz/dataview';
  import { API_AI_MODEL_TYPES, API_AI_MODEL_LIST } from '/@/api/ai/model';
  import { API_AI_IMAGE_GROUPS, API_AI_IMAGE_UPLOAD, API_AI_IMAGE_EXECUTE } from '/@/api/ai/image';
  import "tui-image-editor/dist/tui-image-editor.css";
  import "tui-color-picker/dist/tui-color-picker.css";
  import ImageEditor from "tui-image-editor";
  import aiImage from "/@/assets/images/ai-image.png";

  const { t } = useI18n();
  const drawerTitle = ref<string>(t('common.form.new'));
  const emit = defineEmits(['success', 'register']);
  const rawData = ref<ApiImageDataType>();
  const rightPanelSize = ref<number>(4);
  const rightPanelKey = ref<string>('model');
  const selectedPanelKeys = ref<string[]>(['model']);
  const infoFormRef = ref<Nullable<FormActionType>>(null);
  const modelFormRef = ref<Nullable<FormActionType>>(null);
  const imageRef = ref();
  const editorRef = ref();
  let imageEditor:any = null;
  const fileList = ref<any[]>([]);
  const selectedFile = ref<any>();
  const imageOptions = ref({...iniImageOptions});
  const uploading = ref<boolean>(false);

      // reference input/fields of table menu
      const exeRspInfo = reactive<any>({
        logs: [],
        image: []
      });
  const colorOption: string[] = ['red', 'orange', 'green', 'purple', 'cyan', 'brown', 'salmon', 'maroon', 'yellow', 'black'];
  // model pages
  const pagination = {
    onChange: (page: number) => {
      console.log(page);
    },
    pageSize: 5
  };
  let modelList = reactive<any>([]);

  // drawer data initialization
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    // remove old data of info form
    if (infoFormRef.value) {
      await infoFormRef.value.resetFields();
    }

    setDrawerProps({ confirmLoading: false });

    // save received data
    rawData.value = data;

    // get drawer title
    if (data && data.id) {
      drawerTitle.value = '[' + data.name + ']';
    } else {
      drawerTitle.value = t('common.form.new');
    }

    // pass received data to info form
    if (infoFormRef.value) {
      infoFormRef.value.setFieldsValue(data);
    }

    // initialize dataset id of model form
    if (modelFormRef.value) {
      modelFormRef.value.setFieldsValue(data);
    }

    //build file list
    fileList.value = data.content.map((it) => ({ name: it.file, status: 'done' }));

    rawData.value.status = 0; // not run....
    if(imageRef.value!=null){
      imageEditor = new ImageEditor(
        imageRef.value,
        {
          includeUI: {
            loadImage: {
              // without this, the toolbar will not work
              name: 'sample', // a default image
              path: aiImage
            },
            menuBarPosition: "right",
            //locale: localeZh,
            theme: customTheme,
            menu: [
              'crop', 
              'draw', 
              'text',
              'rotate',
              'flip', 
              'shape', 
              'icon',
              'mask',
              'filter'
            ]
          },
          cssMaxWidth: 800,
          cssMaxHeight: 600
        }   
      );

      imageEditor.on('objectActivated', function(props) {
        console.log(props);
      });
    }
  });

  /*
  * switch panel - info/model
  */
  const handleMenuSwitch = async (menu: any) => {
    if (rightPanelKey.value == menu.key && rightPanelSize.value > 0) {
      rightPanelSize.value = 0;
      return;
    }

    rightPanelKey.value = menu.key;
    rightPanelSize.value = 4;
  };

  /*
  * switch image
  */
  const handleImageChange = (info: any) => {
    const status = info.file.status;
    if (status === 'done') {
      if (info.file.originFileObj) {
        imageEditor.loadImageFromFile(info.file.originFileObj).then(function (result) {
          imageEditor.clearUndoStack();
        });
        rawData.value.content?.push({title:info.file.name,file:info.file.name});
        if(rawData.value.content){
          selectedFile.value = rawData.value.content[rawData.value.content.length-1];
        }
      }
  }
    else if (status === 'removed' && rawData.value.content) {
      for(let i=0; i<rawData.value.content.length; i++){
        if(rawData.value.content[i].file==info.file.name){
          rawData.value.content.splice(i, 1);
          break;
        }
      }
    }
  };

  /*
  * switch image
  */
  const handlePreview = async (file: any) => {
    if (file.originFileObj) {
      imageEditor.loadImageFromFile(file.originFileObj).then(function (result) {
              imageEditor.clearUndoStack();
      });
      if(rawData.value.content){
        for(let i=0; i<rawData.value.content.length; i++){
          if(rawData.value.content[i].file==file.name){
            selectedFile.value = rawData.value.content[i];
            break;
          }
        }
      }
    }
  };


  // classification tags
  const handleTagChange = (index: number, tagId: number) => {
    const item = exeRspInfo.image[index];
    if(item.boundingBox==undefined){return;}

    if(item.checked){
      const imgSize = imageEditor.getCanvasSize();
      const boxLeft = imgSize.width * item.boundingBox.corners[0].x;
      const boxTop = imgSize.height * item.boundingBox.corners[0].y;
      const boxWidth = imgSize.width * item.boundingBox.width;
      const boxHeight = imgSize.height * item.boundingBox.height;
      imageEditor.addShape('rect', {
        fill: 'transparent',
        stroke: item.color,
        strokeWidth: 3,
        left: boxLeft,
        top: boxTop,
        width: boxWidth,
        height: boxHeight,
        isRegular: true
      }).then(objectProps => {
        item.id = objectProps.id;
        imageEditor.setObjectPosition(objectProps.id, {
          x: boxLeft,
          y: boxTop,
          originX: 'left',
          originY: 'top'
        });
        imageEditor.stopDrawingMode();
      });
      imageEditor.deactivateAll();
      imageEditor.stopDrawingMode();
    }
    else if(tagId){
      imageEditor.removeObject(tagId);
    }
  };

  /*
   * only pick up the latest one as selected field when selecting change
   * select component accepts user defined item when it is tags mode
   * so you can select existing group name or create a new group
   */
  const handleImageGroupChange = (value: string[]) => {
    if (infoFormRef.value && value.length > 1) {
      // get the latest one when there are multiple selections
      infoFormRef.value.setFieldsValue({ group: value[value.length - 1] });
    }
  };

  /*
   * load indicated dataset when it is changed
   */
  const handleCategoryChange = (key: any) => {
    if(key==null || key==0){return;}
      API_AI_MODEL_LIST({page: {current: 1, pageSize: 5}, sorter: null, filter: null, search: {fields: ["type"], value: key}}).then(response => {
        modelList.length = 0;
        for(let rec of response.records){
          rec.loading = false;
          modelList.push(rec);
        }
      }).catch((err) => {
        message.error(t('common.tip.load.data.exception'));
      });
  };

  /*
   * model change
   */
  const handleModelChange = (key: string, operation: string) => {

  };


  /*
   * run model
   */
  const execute = (modelId) => {
    //runTensorFlow();
    //if(modelId){return;}

    if(imageEditor!=undefined && imageEditor != null){
      const fileName: any = imageEditor.getImageName();
      const arr = imageEditor.toDataURL().split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const file = new File([u8arr], fileName, {type: mime});
      let formData = new FormData();
      formData.append('files', file as any);
      uploading.value = true;

      selectedFile.value.model = modelId;
      for(let item of marketModels){
        if(item.id == modelId){
          item.loading = true;
          break;
        }
      }

      // upload select image first
      API_AI_IMAGE_UPLOAD(formData, onUploadProgress).then(response => {
        uploading.value = false;
        API_AI_IMAGE_EXECUTE({id: rawData.value.id, modelId: modelId, fileName: fileName}).then(response => {
          //code must be 0 when we get here
          const jsonData = JSON.parse(response.data);
        }).catch((err) => {
          rawData.value.status = 1; // error......
          message.error(t('common.tip.execute.exception'));
        });
      }).catch((err) => {
        uploading.value = false;
        message.error(t('dataviz.datasource.tip.file.import.exception'));
      });
    }
  };

  /*
   * submit after data is updated
   */
  async function saveDataview() {
    try {
      let values;
      if (infoFormRef.value) {
        // validate form data
        values = await infoFormRef.value.validate();


      // id should be a number, but we get string from form.
      // so convert it to number
      // otherwise updateTableDataRecord() will not work because string id can not be found in data
      setDrawerProps({ confirmLoading: true });
      if (values.id) {
        values.id = Number(values.id);
        API_DATAVIEW_UPDATE(unref(rawData.value))
          .then(() => {
            // notify parent
            emit('success', unref(rawData.value));
          })
          .catch((err) => {
            message.warning(t('common.exception.update'), err);
          });
      } else {
        API_DATAVIEW_CREATE(unref(rawData.value))
          .then(() => {
            // notify parent
            emit('success', unref(rawData.value));
          })
          .catch((err) => {
            message.warning(t('common.exception.new'), err);
          });
      }
    } 
  }finally {
      setDrawerProps({ confirmLoading: false });
    }
  }

  /*
   * close current form
   */
  function handleFormClose() {
    console.log("aaa");
  }
</script>

<style scoped>
  .toolbar-button {
    font-size: 28px;
    margin-right: 8px;
  }

  .toolbar-button:hover {
    background-color: gold;
    cursor: pointer;
  }
  
#tui-image-editor{
  height: 650px !important;
}
.tui-image-editor-container .tui-image-editor-submenu {
  height: auto !important;
}

/* tile uploaded pictures */
::v-deep(.ant-upload-list-item) {
  float: left;
  width: 80px;
  height: 80px;
  margin-right: 2px;
}
::v-deep(.ant-upload-animate-enter) {
  animation-name: uploadAnimateInlineIn;
}
::v-deep(.ant-upload-animate-leave) {
  animation-name: uploadAnimateInlineOut;
}

::v-deep(.ant-upload-select) {
  float: right;
  padding: 20px 25px;
  border: dotted orange 2px;
}

::v-deep(.ant-upload.ant-upload-drag) {
  float: right;
  top: 10px;
  width: 70px;
  height: 70px;
  border: dotted orange 2px;
}
</style>
