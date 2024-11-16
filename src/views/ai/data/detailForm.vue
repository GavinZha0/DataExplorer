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
      <Upload 
        v-model:file-list="fileList" 
        :before-upload="handleBeforeUpload" 
        accept=".csv,.json"
        :showUploadList="false">
        <Tooltip>
        <template #title>{{ t('common.toolbar.open') }}</template>
        <FolderOpenTwoTone class="toolbar-button" />
      </Tooltip>
      </Upload>
      <Tooltip>
        <template #title>{{ t('common.toolbar.save') }}</template>
        <SaveTwoTone class="toolbar-button" @click="saveData" />
      </Tooltip>
      <Tooltip>
        <template #title>{{ t('common.toolbar.execute') }}</template>
        <PlaySquareTwoTone class="toolbar-button" @click="execute" />
      </Tooltip>
    </template>
    <div style="width: 98%; float: left">
      <Row type="flex" :gutter="4">
        <Col :md="24 - rightPanelSize" :sm="24">
          <div style="height: 800px">
            <div style="height:100%; border: solid 1px gray;">
              <BasicTable
                size="small"
                :bordered="true"
                :canResize="true"
                :show-table-setting="false"
                :columns="rawData.fields"
                :data-source="filePreview.data"
                :show-index-column="false"
                :use-search-form="false"
                :pagination="false"
                :scroll="{ x: 500, y: 700 }"
                @resizeColumn="(w, col) => { col.width = w; }"
              >
                <template #headerCell="{ column }">
                  <HeaderCell :column="column" />
                  <br />
                  <Tooltip>
                    <template #title>{{ t('ai.data.table.action.feature') }}</template>
                    <Dropdown placement="bottom" :trigger="['click']">
                      <Button type="link">{{ column.alias }}<DownOutlined /></Button>
                      <template #overlay>
                        <Menu @click="handleFieldChange($event, column)">
                          <MenuItem v-for="item in inputFields" :key="item.name">
                          <span>{{ item.name }}</span>
                          </MenuItem>
                        </Menu>
                      </template>
                    </Dropdown>
                  </Tooltip>
                </template>
              </BasicTable>
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
                  :api="API_AI_DATA_GROUPS"
                  mode="tags"
                  v-model:value="model[field]"
                  resultField="records"
                  @change="handleGroupChange"
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
              :autoSubmitOnEnter="true"
              :submitFunc="handleModelSearch"
            >
              <template #modelList="{ model, field }">
                <List item-layout="vertical" size="small" :data-source="modelList" :pagination="pagination" style="width: 350px;">
                  <template #renderItem="{ item }">
                    <ListItem key="item.id">
                      <ListItemMeta :description="item.desc">
                        <template #title>
                          <Button
                            size="small"
                            :loading="executing"
                            style="font-size: 16px;"
                            :type="item.id==rawData.modelId? 'primary': 'link'"
                            @click="handleModelSelection(item.id)">
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
                      </template>
                    </ListItem>
                  </template>
                </List>
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
                  display: rightPanelKey == 'history' ? 'block' : 'none',
                }"
            >
              <BasicForm
                ref="historyFormRef"
                :schemas="formHistorySchema"
                :showActionButtonGroup="false"
                >
                <template #trials="{ model, field }">
                  <BasicTree
                    :height="650"
                    :treeData="historyData"
                    v-model:value="model[field]"
                    :fieldNames="{ key: 'run_uuid' }"
                  />
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
      <MenuItem key="history">
        <template #icon>
          <HistoryOutlined
            :style="{
              fontSize: '24px',
              color: 'green',
            }"
          />
        </template>
        <span>History</span>
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
    formHistorySchema
  } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import {
    FolderOpenTwoTone,
    SaveTwoTone,
    ExperimentOutlined,
    HistoryOutlined,
    StarOutlined,
    DollarOutlined,
    PlaySquareTwoTone,
    InfoCircleFilled,
    EyeInvisibleOutlined,
    DownOutlined
  } from '@ant-design/icons-vue';
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
    Button,
    Upload,
    Dropdown
  } from 'ant-design-vue';
  import {
    ApiDataDataType,
    initDataData
  } from '/@/api/ai/model/data';
  import {
    API_DATAVIEW_CREATE,
    API_DATAVIEW_UPDATE,
  } from '/@/api/dataviz/dataview';
  import type { UploadProps } from 'ant-design-vue';
  import { BasicTable } from '/@/components/Table';
  import Papa from 'papaparse';
  import { API_AI_MODEL_LIST } from '../../../api/ai/model';
  import { API_AI_DATA_GROUPS } from '/@/api/ai/data';
  import HeaderCell from '/@/components/Table/src/components/HeaderCell.vue';

  const { t } = useI18n();
  const drawerTitle = ref<string>(t('common.form.new'));
  const emit = defineEmits(['success', 'register']);
  const rawData = ref<ApiDataDataType>(initDataData);
  const rightPanelSize = ref<number>(4);
  const rightPanelKey = ref<string>('model');
  const selectedPanelKeys = ref<string[]>(['model']);
  const infoFormRef = ref<Nullable<FormActionType>>(null);
  const modelFormRef = ref<Nullable<FormActionType>>(null);
  const historyFormRef = ref<Nullable<FormActionType>>(null);
  const historyData = ref<any[]>([]);
  const fileList = ref<any[]>([]);
  const selectedFile = ref<any>();
  const filePreview = ref<any>({rows: 0, data: []});
  let modelList = reactive<any>([]);
  const executing = ref<Boolean>(false);
  const inputFields = ref<any[]>([]);

  // model pages
  const pagination = {
    onChange: (page: number) => {
      console.log(page);
    },
    pageSize: 5
  };

  // drawer data initialization
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    // remove old data of info form
    if (infoFormRef.value) {
      infoFormRef.value.resetFields();
    }

    if (modelFormRef.value) {
      await modelFormRef.value.resetFields();
    }

    setDrawerProps({ confirmLoading: false });

    // get drawer title
    if (data && data.id) {
      drawerTitle.value = '[' + data.name + ']';
      // pass received data to info form
      if (infoFormRef.value) {
        infoFormRef.value.setFieldsValue(data);
      }

      // initialize dataset id of model form
      if (modelFormRef.value) {
        modelFormRef.value.setFieldsValue(data);
      }

      // save received data
      rawData.value = data;
    } else {
      drawerTitle.value = t('common.form.new');
      rawData.value = initDataData;
    }

    handleModelSearch();

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
   * only pick up the latest one as selected field when selecting change
   * select component accepts user defined item when it is tags mode
   * so you can select existing group name or create a new group
   */
  const handleGroupChange = (value: string[]) => {
    if (infoFormRef.value && value.length > 1) {
      // get the latest one when there are multiple selections
      infoFormRef.value.setFieldsValue({ group: value[value.length - 1] });
    }
  };

  /*
   * model search
   */
   async function handleModelSearch() {
    const formData = await modelFormRef.value?.validate();
    // filter by area(data) and status(1:serving)
    // search by name or tag
    API_AI_MODEL_LIST({page: {current: 1, pageSize: 5}, sorter: null, filter: {fields: ["area", "status"], values: [["data"], ["1"]]}, search: {fields: ["name", "tags"], value: formData?.search}}).then(response => {
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
  * select a model
  */
  const handleModelSelection = (modelId: number) => {
    rawData.value.modelId = modelId;
    // find model and schema
    const selModel = modelList.find((it)=>it.id==modelId);
    inputFields.value = selModel.schema;
    for(let field of rawData.value.fields){
      // update column alias if column name matches with one of schema
      const matchField = inputFields.value.find((it)=>it.name==field.title);
      if(matchField){
        field.alias = field.title;
      }
    }
  };


  /*
  * assign a field to a schema
  */
  const handleFieldChange = (e: Event, column: any) => {
    if (rawData.value.fields[column.key]) {
      // find if it was assgned
      const idx = rawData.value.fields?.findIndex((it)=>it.alias==e.key);
      if(idx >= 0){
        // remove previous assign
        rawData.value.fields[idx].alias = '???';
      }
      // new assign
      rawData.value.fields[column.key].alias = e.key;
    }
  };


  /*
   * load and preview file before upload
   */
   const handleBeforeUpload: UploadProps['beforeUpload'] = (file: any, fileList: any[]) => {
    if (file.type == 'text/csv') {
      loadCsvFiles(file);
    } else if (file.type == 'application/json') {
      loadJsonFiles(file);
    } else {
      // unsupported file type
      let invalidFile = fileList.find((it) => {
        return it.name == file.name;
      });
      invalidFile.status = 'error';
    }
    return false;
  };

  /*
   * load and parse CSV files
   */
  const loadCsvFiles = (file: any) => {
    let firstRow = true;
    let fields: any[] = [];
    let inconsistent = false;

    Papa.parse(file, {
      header: true,
      encoding: 'UTF-8',
      delimiter: ',',
      //preview: rawData.value.limit, // we can't get total records if preview is set
      skipEmptyLines: true,
      dynamicTyping: true,
      //fastMode: true, // fastMode will not remove quoteChar(' or ") from column name and data, so we should do it my ourselves
      worker: true,

      step: function (row) {
        // come here for every record
        // using function step will fast when the file is big
        if (inconsistent) {
          return;
        }
        if (firstRow) {
          firstRow = false;
          fields = row.meta.fields;
          let columnFields: any[] = [];
          // get column names and add column config
          for (let field of fields) {
            const columnField = {
              // column key should NOT be number 0 !!! - Gavin
              key: String(fields.indexOf(field)),
              title: field,
              dataIndex: field,
              type: 'Varchar',
              width: 200,
              resizable: true,
              alias: '???'
            };
            columnFields.push(columnField);
          }

          rawData.value.fields = columnFields;
          filePreview.value = { rows: 0, data: [] };
        }

        // save preview data
        filePreview.value.rows++;
        if (filePreview.value.rows < 100) {
          filePreview.value.data?.push(row.data);
        }
      },
    });
  };

  /*
   * load and parse JSON files
   */
  const loadJsonFiles = async (file: any) => {
    // read file and detect encoding
    const fileReader = new FileReader();
    fileReader.onload = () => {
      try {
        if (fileReader.result.length > 0) {
          let jsonData = JSON.parse(fileReader.result);
          let columnFields: any[] = [];
          // get column names and add column config
          let keyIdx = 0;
          for (let key in jsonData[0]) {
            const columnField = {
              key: keyIdx,
              title: key,
              type: 'Varchar',
              dataIndex: key,
              width: 200,
              resizable: true,
              alias: key
            };
            columnFields.push(columnField);
            keyIdx++;
          }

          if (rawData.value.fields?.length == 0) {
            // the first file to parse
            rawData.value.fields = columnFields;
            // select it to show
            selectedFile.value = file.name;
            let tpFile = fileList.value.find((it) => {
              return it.name == file.name;
            });
            tpFile.status = 'selected';
          } else {
            // compare with existing column fields
            if (JSON.stringify(rawData.value.fields) != JSON.stringify(columnFields)) {
              // invalid file because format is different
              let tpFile = fileList.value.find((it) => {
                return it.name == file.name;
              });
              tpFile.status = 'error';
              return;
            }
          }
          // put preview data under file name in filePreview
          filePreview.value = { rows: jsonData.length, data: [] };
          filePreview.value.data = jsonData.slice(
            0,
            Math.min(100, jsonData.length),
          );
        }
      } catch (error) {
        console.log('failure');
      } finally {
        console.log('finally');
      }
    };

    fileReader.onerror = (event) => {
      console.log(event);
    };
    fileReader.readAsText(file);
  };

  /*
   * run model
   */
  const execute = () => {
    executing.value = true;
    const aaa = 66;


  };

  /*
   * submit after data is updated
   */
  async function saveData() {
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

</style>
