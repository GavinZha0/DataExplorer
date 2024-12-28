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
        <SaveTwoTone class="toolbar-button" @click="saveDataApp" />
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
                :columns="columnFields"
                :data-source="dataPreview.data"
                :show-index-column="false"
                :use-search-form="false"
                :pagination="false"
                :scroll="{ x: 500, y: 700 }"
                @resizeColumn="(w, col) => { col.width = w; }"
              >
                <template #headerCell="{ column }">
                  <template v-if="column.key === '999'">
                    <div style="color: green;">{{ column.customTitle }}</div>
                  </template>
                  <template v-else>
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
                            :loading="item.id==rawData.modelId? executing: false"
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
  import type { UploadProps } from 'ant-design-vue';
  import { BasicTable } from '/@/components/Table';
  import Papa from 'papaparse';
  import { API_AI_MODEL_LIST } from '../../../api/ai/model';
  import { API_AI_DATA_GROUPS, API_AI_DATA_CREATE, API_AI_DATA_UPDATE, API_AI_DATA_EXECUTE } from '/@/api/ai/data';
  import HeaderCell from '/@/components/Table/src/components/HeaderCell.vue';
  import { cloneDeep } from 'lodash-es';

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
  const dataPreview = reactive<any>({rows: 0, data: []});
  let modelList = ref<any>([]);
  const executing = ref<Boolean>(false);
  const inputFields = ref<any[]>([]);
  const columnFields = ref<any[]>([]);

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

    modelList.value = [];
    dataPreview.rows = 0;
    dataPreview.data = [];
    executing.value = false;
    inputFields.value = [];

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
      rawData.value = cloneDeep(initDataData);
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
        modelList.value.length = 0;
        for(let rec of response.records){
          rec.loading = false;
          modelList.value.push(rec);
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
    const selModel = modelList.value.find((it)=>it.id==modelId);

    // schema like [{name: 'a', required: true, type: 'double'}]
    if(selModel.schema) {
      inputFields.value = selModel.schema;
    } else if (rawData.value.fields){
      inputFields.value = [];
      for(let field in rawData.value.fields){
        inputFields.value.push({name: field, required: true});
      }
    } else {
      inputFields.value = [];
    }
    
    if(inputFields.value){
      for(let field of columnFields.value){
        // update column alias if column name matches with one of schema
        const matchField = inputFields.value.find((it)=>it.name==field.title);
        if(matchField){
          field.alias = field.title;
        } else {
          field.alias = '???';
        }
      }
    }

    // add default name and desc for new app
    if(rawData.value.id == 0 && rawData.value.name == ''){
      rawData.value.name = selModel.name;
      rawData.value.desc = selModel.desc;
      if(infoFormRef){
        infoFormRef.value.setFieldsValue({name: selModel.name, desc: selModel.desc});
      }
    }
  };


  /*
  * assign a field to a schema
  */
  const handleFieldChange = (e: Event, column: any) => {
    if (columnFields.value[column.key]) {
      // find if it was assgned
      const idx = columnFields.value?.findIndex((it)=>it.alias==e.key);
      if(idx >= 0){
        // remove previous assign
        columnFields.value[idx].alias = '???';
      }
      // new assign
      columnFields.value[column.key].alias = e.key;
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
          let colFields: any[] = [];


          // find model and schema
          const selModel = modelList.value.find((it)=>it.id==rawData.value.modelId);

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

            if(selModel){
              // update alias if model was selected
              const matchField = selModel.schema.find((it)=>it.name==columnField.dataIndex);
              if(matchField){
                columnField.alias = columnField.dataIndex;
              }
            }

            colFields.push(columnField);
          }

          colFields.push({
            key: '999',
            title: 'RESULT',
            dataIndex: 'predictions',
            type: 'Varchar',
            width: 200,
            resizeable: true,
            alias: null
          });
          columnFields.value = colFields;
          dataPreview.rows = 0;
          dataPreview.data = [];
        }

        // save preview data
        dataPreview.rows++;
        if (dataPreview.rows < 100) {
          dataPreview.data?.push(row.data);
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
          let colFields: any[] = [];
          // get column names and add column config
          let keyIdx = 0;
          for (let key in jsonData[0]) {
            const cField = {
              key: keyIdx,
              title: key,
              type: 'Varchar',
              dataIndex: key,
              width: 200,
              resizable: true,
              alias: key
            };
            colFields.push(cField);
            keyIdx++;
          }

          if (columnFields.value?.length == 0) {
            // the first file to parse
            columnFields.value = colFields;
            // select it to show
            selectedFile.value = file.name;
            let tpFile = fileList.value.find((it) => {
              return it.name == file.name;
            });
            tpFile.status = 'selected';
          } else {
            // compare with existing column fields
            if (JSON.stringify(columnFields.value) != JSON.stringify(colFields)) {
              // invalid file because format is different
              let tpFile = fileList.value.find((it) => {
                return it.name == file.name;
              });
              tpFile.status = 'error';
              return;
            }
          }
          // put preview data under file name in dataPreview
          dataPreview.rows = jsonData.length; 
          dataPreview.data = [];
          dataPreview.data = jsonData.slice(
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
   * do prediction with loaded data and selected model
   */
  const execute = () => {
    if(rawData.value.modelId){
      
      const selModel = modelList.value.find((it)=>it.id==rawData.value.modelId);
      
      const dataFrame = jsonToDataFrame(dataPreview.data, selModel);
      if(dataFrame == null){
        message.error(t('common.error.data.incorrect'));
        return;
      }
      
      if(selModel.status == 1){
        executing.value = true;
        API_AI_DATA_EXECUTE(selModel.endpoint, dataFrame).then((response) => {
            executing.value = false;
            const backData = cloneDeep(dataPreview.data);
            dataPreview.data = [];
            for(let i=0; i<response.predictions.length; i++){
              let pred = response.predictions[i]; 
              if(pred instanceof Object){
                // like {0: 7, 1: 3, 2: -2}
                let labelIdx = 0;
                let labelProb = 0;
                for(const key in pred){
                  if(pred[key] > labelProb){
                    labelProb = pred[key];
                    labelIdx = key;
                  }
                }
                backData[i]['predictions'] = labelIdx + ' (' + labelProb.toFixed(2) + ')';
              } else {
                backData[i]['predictions'] = pred;
              }
            }
            // table will be udpated due to data change
            dataPreview.data = backData;
          })
          .catch((err) => {
            executing.value = false;
            message.warning(t('common.exception.execute'), err);
          });

        /* CORS issue -- Gavin ??
        axios.post(selModel.endpoint, dataFrame).then(function (response) {
          executing.value = false;
          console.log(response);
        })
        .catch(function (error) {
          executing.value = false;
          console.log(error);
        });
        */

      } else {
        message.error(t('common.error.service.unavailable'));
      }
    }
  };

  /*
   * convert json data to data frame
   */
  const jsonToDataFrame = (data: any[], model: any) =>{
    const columns = [];
    let mappedColumns = {};
    const arrayData = [];

    // fields is a map like {a: 'aaa', b: 'bbb'}
    if(rawData.value.fields){
      mappedColumns = rawData.value.fields;
      for(const name in mappedColumns){
        columns.push(name);
      }
    } else {
      for(const sch of model.schema){
        columns.push(sch.name);
        const field = columnFields.value?.find((it)=>it.alias==sch.name);
        if(field){
          mappedColumns[sch.name] = field.dataIndex;
        }
      }

      rawData.value.fields = mappedColumns;
    }

    if(Object.keys(mappedColumns).length > 0){
      for(const dt of data){
        const record = [];
        for(const name in mappedColumns){
          record.push(dt[mappedColumns[name]]);
        }
        arrayData.push(record);
      }
    }

    // example: {"dataframe_split": {"columns": ["petal_length", "sepal_width", "petal_width", "sepal_length"], "data": [[4.5,2.3,1.3,0.3],[6.3,2.9,5.6,1.8],[5.0,3.4,1.5,0.2]]}};
    if(arrayData.length > 0){
      return {dataframe_split: {columns: columns, data: arrayData}};
    } else {
      return null;
    }
    
  };

  /*
   * submit after data is updated
   */
  async function saveDataApp() {
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
        API_AI_DATA_UPDATE(unref(rawData.value))
          .then(() => {
            // notify parent
            emit('success', unref(rawData.value));
          })
          .catch((err) => {
            message.warning(t('common.exception.update'), err);
          });
      } else {
        API_AI_DATA_CREATE(unref(rawData.value))
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
