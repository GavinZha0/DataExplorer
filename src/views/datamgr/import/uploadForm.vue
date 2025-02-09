<template>
  <BasicDrawer
    v-bind="$attrs"
    :isDetail="true"
    @register="registerDrawer"
    :title="drawerTitle"
    :closable="false"
    :showDetailBack="true"
    :keyboard="false"
  >
    <template #titleToolbar>
      <Tooltip>
        <template #title>{{ t('datamgr.importer.detail.toolbar.limit') }}</template>
        <InputNumber
          :min="0"
          :max="1000"
          :step="100"
          size="small"
          v-model:value="rawData.limit"
          class="toolbar-input"
          :placeholder="t('datamgr.importer.form.attr.limit')"
          :addonAfter="selectedFile ? filePreview[selectedFile].rows.toLocaleString() : 0"
        />
      </Tooltip>
      <Tooltip>
        <template #title>{{ t('common.toolbar.upload') }}</template>
        <CloudUploadOutlined class="toolbar-button" @click="handleSubmit" />
      </Tooltip>
    </template>
    <a-row type="flex" :gutter="4">
      <a-col :md="24 - configFormSize" :sm="24">
        <a-row type="flex" :gutter="4">
          <a-col :md="8" :sm="24">
            <fieldset class="filesets" style="height: 350px; border: solid 1px; margin-top: 5px">
              <legend style="padding: 0.5em; width: auto; font-size: 15px; font-weight: bold">
                {{ t('datamgr.importer.detail.form.attr.csvAttr') }}
              </legend>
              <BasicForm
                :forceRender="true"
                ref="attrCsvFormRef"
                :schemas="formCsvAttrSchema"
                :showActionButtonGroup="false"
                @fieldValueChange="handleAttrChange"
              />
            </fieldset>
          </a-col>
          <a-col :md="8" :sm="24">
            <fieldset class="filesets" style="height: 350px; border: solid 1px; margin-top: 5px">
              <legend style="padding: 0.5em; width: auto; font-size: 15px; font-weight: bold">
                {{ t('datamgr.importer.detail.form.attr.tsAttr') }}
              </legend>
              <BasicForm
                :forceRender="true"
                ref="attrTsFormRef"
                :schemas="formTsAttrSchema"
                :showActionButtonGroup="false"
                @fieldValueChange="handleAttrChange"
              />
            </fieldset>
          </a-col>
          <a-col :md="8" :sm="24">
            <fieldset class="filesets" style="height: 350px; border: solid 1px; margin-top: 5px">
              <legend style="padding: 0.5em; width: auto; font-size: 15px; font-weight: bold">
                {{ t('datamgr.importer.detail.form.attr.fileList') }}
              </legend>
              <div>
                <Upload.Dragger
                  v-model:file-list="fileList"
                  :multiple="true"
                  accept=".csv,.json,.xlsx"
                  :remove="handleFileRemove"
                  :before-upload="handleBeforeUpload"
                >
                  <p class="ant-upload-drag-icon"><FileAddOutlined /></p>
                  <p class="ant-upload-text">
                    {{ t('datamgr.importer.detail.form.attr.uploadTip') }}
                  </p>
                  <p class="ant-upload-hint">
                    {{ t('datamgr.importer.detail.form.attr.uploadHint1') }}
                    <br />
                    {{ t('datamgr.importer.detail.form.attr.uploadHint2') }}
                  </p>
                  <template #itemRender="{ file, actions }">
                    <div :style="{ backgroundColor: file.status == 'selected' ? 'wheat' : '' }">
                      <span v-if="file.status == 'done'" style="color: gray">
                        {{ file.name }}
                      </span>
                      <span
                        v-else
                        :style="{
                          color: file.status == 'error' ? 'red' : undefined,
                          cursor: 'pointer',
                        }"
                        @click="handleFilePreview(file.name)"
                      >
                        {{ file.name }}
                      </span>
                      <DeleteOutlined @click="actions.remove" style="float: right" />
                    </div>
                  </template>
                </Upload.Dragger>
              </div>
            </fieldset>
          </a-col>
        </a-row>
        <a-row type="flex" :gutter="4">
          <a-col :md="24" :sm="24">
            <div
              class="mr-2 overflow-hidden bg-white"
              style="height: 400px; border: solid 1px; margin-top: 5px"
            >
              <BasicTable
                size="small"
                :bordered="true"
                :canResize="true"
                :show-table-setting="false"
                :columns="rawData.fields"
                :data-source="selectedFile ? filePreview[selectedFile].data : []"
                :show-index-column="false"
                :use-search-form="false"
                :pagination="false"
                :scroll="{ x: 500, y: 300 }"
                @resizeColumn="
                  (w, col) => {
                    col.width = w;
                  }
                "
              >
                <template #headerCell="{ column }">
                  <HeaderCell :column="column" />
                  <br />
                  <Tooltip>
                    <template #title>{{t('datamgr.importer.detail.table.action.ignore')}}</template>
                    <EyeInvisibleOutlined
                      class="ml-2"
                      :style="{fontSize: '16px', color: column.ignore ? '#08c' : 'gray', cursor: 'pointer'}"
                      @click="handleColumnIgnore(column.key)"
                    />
                  </Tooltip>
                  <Tooltip>
                    <template #title>
                      {{ t('datamgr.importer.detail.table.action.formula') }}
                    </template>
                    <Dropdown placement="bottom" :trigger="['click']">
                      <CalculatorOutlined
                        class="ml-2"
                        :style="{
                          fontSize: '16px',
                          color: column.formula ? '#08c' : 'gray',
                          cursor: 'pointer',
                        }"
                      />
                      <template #overlay>
                        <Menu>
                          <MenuItem key="formula">
                            <AInput
                              :id="column.key"
                              allowClear
                              placeholder="Formula"
                              v-model="rawData.fields[column.key].formula"
                              @pressEnter="handleColumnFormula"
                            />
                          </MenuItem>
                        </Menu>
                      </template>
                    </Dropdown>
                  </Tooltip>
                  <Tooltip>
                    <template #title>{{
                      t('datamgr.importer.detail.table.action.type.title')
                    }}</template>
                    <Dropdown placement="bottom" :trigger="['click']">
                      <FieldBinaryOutlined
                        v-if="column.type == 'Bit' || column.type == 'Boolean'"
                        class="ml-2"
                        :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                      />
                      <NumberOutlined
                        v-else-if="column.type == 'Integer' || column.type == 'Bigint'"
                        class="ml-2"
                        :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                      />
                      <NodeIndexOutlined
                        v-else-if="column.type == 'Float' || column.type == 'Double'"
                        class="ml-2"
                        :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                      />
                      <NodeIndexOutlined
                        v-else-if="column.type == 'Binary' || column.type == 'Blob'"
                        class="ml-2"
                        :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                      />
                      <HistoryOutlined
                        v-else-if="column.type == 'Time' || column.type == 'Date'"
                        class="ml-2"
                        :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                      />
                      <FieldTimeOutlined
                        v-else-if="column.type == 'Datetime' || column.type == 'Timestamp'"
                        class="ml-2"
                        :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                      />
                      <FieldStringOutlined
                        v-else
                        class="ml-2"
                        :style="{ fontSize: '16px', color: 'gray', cursor: 'pointer' }"
                      />
                      <template #overlay>
                        <Menu>
                          <MenuItem key="type">
                          <Radio.Group v-model:value="column.type" size="small" button-style="solid" @change="handleColumnType(column.key, column.type)">
                            <Radio.Button value="String" :style="radioStyle">String</Radio.Button>
                            <Radio.Button value="Integer" :style="radioStyle">Integer</Radio.Button>
                            <Radio.Button value="Long" :style="radioStyle">Long</Radio.Button>
                            <Radio.Button value="Float" :style="radioStyle">Float</Radio.Button>
                            <Radio.Button value="Double" :style="radioStyle">Double</Radio.Button>
                            <Radio.Button value="Boolean" :style="radioStyle">Boolean</Radio.Button>
                            <Radio.Button value="Date" :style="radioStyle">Date</Radio.Button>
                            <Radio.Button value="Time" :style="radioStyle">Time</Radio.Button>
                            <Radio.Button value="Datetime" :style="radioStyle">Datetime</Radio.Button>
                            <Radio.Button value="Timestamp" :style="radioStyle">Timestamp</Radio.Button>
                            <Radio.Button value="Text" :style="radioStyle">Text</Radio.Button>
                            <Radio.Button value="Bit" :style="radioStyle">Bit</Radio.Button>
                            <Radio.Button value="Binary" :style="radioStyle">Binary</Radio.Button>
                            <Radio.Button value="Blob" :style="radioStyle">Blob</Radio.Button>
                          </Radio.Group>
                        </MenuItem>
                        </Menu>
                      </template>
                    </Dropdown>
                  </Tooltip>
                  <Tooltip>
                    <template #title>
                      {{ t('datamgr.importer.detail.table.action.precision') }}
                    </template>
                    <Dropdown placement="bottom" :trigger="['click']">
                      <AimOutlined
                        class="ml-2"
                        :style="{
                          fontSize: '16px',
                          color: column.precision ? '#08c' : 'gray',
                          cursor: 'pointer',
                        }"
                      />
                      <template #overlay>
                        <Menu>
                          <MenuItem key="precision">
                            <AInput
                              :id="column.key"
                              allowClear
                              placeholder="Length or Precision"
                              v-model="rawData.fields[column.key].precision"
                              @pressEnter="handleColumnPrecision"
                            />
                          </MenuItem>
                        </Menu>
                      </template>
                    </Dropdown>
                  </Tooltip>
                  <br />
                  <Dropdown placement="bottom" :trigger="['click']">
                    <a>{{ column.alias }}</a>
                    <template #overlay>
                      <Menu>
                        <MenuItem key="alias">
                          <AInput
                            allowClear
                            :id="column.key"
                            :placeholder="column.alias"
                            v-model="rawData.fields[column.key].alias"
                            @pressEnter="handleColumnAlias"
                          />
                        </MenuItem>
                      </Menu>
                    </template>
                  </Dropdown>
                </template>
              </BasicTable>
            </div>
          </a-col>
        </a-row>
      </a-col>
      <div class="layout-area">
        <div
          @click="
            () => {
              configFormSize = 4 - configFormSize;
            }
          "
        >
          <span v-if="configFormSize == 0" class="expand"><LeftOutlined /></span>
          <span v-else class="collapse"><RightOutlined /></span>
        </div>
      </div>
      <a-col :md="configFormSize" :sm="24">
        <div class="ml-2 overflow-hidden bg-white">
          <a-tabs
            v-model:activeKey="activeTabKey"
            default-active-key="config"
            hide-add
            style="height: 750px"
          >
            <a-tab-pane
              key="config"
              :forceRender="true"
              :closable="false"
              :tab="t('datamgr.importer.detail.form.config.title')"
            >
              <BasicForm
                :forceRender="true"
                ref="configFormRef"
                layout="vertical"
                :schemas="formConfigSchemas"
                :showActionButtonGroup="false"
              >
                <template #datasource="{ model, field }">
                  <ApiTreeSelect
                    :api="API_DATASOURCE_TREE"
                    :immediate="true"
                    v-model:value="model[field]"
                    resultField="records"
                    :fieldNames="{ key: 'id', label: 'name', value: 'id' }"
                    style="width: 100%"
                  />
                </template>
              </BasicForm>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
    </a-row>
    <FieldModal @register="registerFieldModal" @success="handleFieldSuccess" />
  </BasicDrawer>
</template>

<script lang="ts" setup name="UploadForm">
  import { ref, unref } from 'vue';
  import { BasicForm, FormActionType } from '/@/components/Form/index';
  import { formCsvAttrSchema, formTsAttrSchema, formConfigSchemas } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTable } from '/@/components/Table';
  import HeaderCell from '/@/components/Table/src/components/HeaderCell.vue';
  import {
    LeftOutlined,
    RightOutlined,
    CloudUploadOutlined,
    EyeInvisibleOutlined,
    FileAddOutlined,
    AimOutlined,
    FieldTimeOutlined,
    FieldStringOutlined,
    FieldBinaryOutlined,
    DeleteOutlined,
    CalculatorOutlined,
    NumberOutlined,
    HistoryOutlined,
    NodeIndexOutlined,
  } from '@ant-design/icons-vue';

  import 'splitpanes/dist/splitpanes.css';
  import { useI18n } from '/@/hooks/web/useI18n';
  import {
    InputNumber,
    message,
    Tooltip,
    Menu,
    MenuItem,
    Radio,
    Dropdown,
    Row as ARow,
    Col as ACol,
    Tabs as ATabs,
    TabPane as ATabPane,
    Input as AInput,
    Upload,
    SelectProps,
    UploadProps,
  } from 'ant-design-vue';
  import { ApiTreeSelect } from '/@/components/Form';
  import Papa from 'papaparse';
  import { API_DATASOURCE_TREE } from '/@/api/datamgr/datasource';
  import { API_IMPORTER_UPLOAD } from '/@/api/datamgr/importer';
  import ExcelJS from 'exceljs';
  import dayjs from 'dayjs';
  import { ApiImporterDataType, initImporter } from '/@/api/datamgr/Model/importer';
  import { useModal } from '/@/components/Modal';
  import FieldModal from './fieldModal.vue';
  import { cloneDeep } from 'lodash-es';
  import { DataFrame } from '@antv/ava';

  const { t } = useI18n();
  const drawerTitle = ref<string>(t('common.form.new'));
  const emit = defineEmits(['success', 'progress']);
  const rawData = ref<ApiImporterDataType>(initImporter);
  const configFormSize = ref<number>(4);
  const attrCsvFormRef = ref<Nullable<FormActionType>>();
  const attrTsFormRef = ref<Nullable<FormActionType>>();
  const configFormRef = ref<Nullable<FormActionType>>();
  const activeTabKey = ref();
  const filePreview = ref<any>({});
  const fileList = ref<UploadProps['fileList']>([]);
  const selectedFile = ref<string>();
  const radioStyle = {display: 'flex', height: '30px', lineHeight: '30px'};
  const fieldTypeOptions = ref<SelectProps['options']>([
    { value: 'Varchar', label: 'String' },
    { value: 'Integer', label: 'Integer' },
    { value: 'Bigint', label: 'Long' },
    { value: 'Float', label: 'Float' },
    { value: 'Double', label: 'Double' },
    { value: 'Boolean', label: 'Boolean' },
    { value: 'Timestamp', label: 'Timestamp' },
    { value: 'Time', label: 'Time' },
    { value: 'Date', label: 'Date' },
    { value: 'Datetime', label: 'Datetime' },
    { value: 'Text', label: 'Text' },
    { value: 'Bit', label: 'Bit' },
    { value: 'Binary', label: 'Binary' },
    { value: 'Blob', label: 'Blob' },
  ]);

  // Variable modal definition
  const [registerFieldModal, { openModal: openFieldModal }] = useModal();

  // drawer data initialization
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    // reset forms
    if (attrTsFormRef.value) {
      attrTsFormRef.value.resetFields();
    }
    if (attrCsvFormRef.value) {
      attrCsvFormRef.value.resetFields();
    }
    if (configFormRef.value) {
      await configFormRef.value.resetFields();
    }

    setDrawerProps({ confirmLoading: false });

    // get drawer title
    if (data && data.id) {
      drawerTitle.value = '[' + data.name + ']';
      //build file list
      fileList.value = data.files.map((it) => ({ name: it.name, status: 'done' }));
      // pass received data to info form
      if (attrTsFormRef.value && data.attrs) {
        attrTsFormRef.value.setFieldsValue(data.attrs);
      }
      if (attrCsvFormRef.value && data.attrs) {
        attrCsvFormRef.value.setFieldsValue(data.attrs);
      }
      if (configFormRef.value && data.config) {
        await configFormRef.value.setFieldsValue(data.config);
      }
    } else {
      drawerTitle.value = t('common.form.new');
      data = { ...initImporter };
      fileList.value = [];
    }

    // clean up
    selectedFile.value = undefined;
    filePreview.value = {};

    // save received data
    rawData.value = data;
  });

  /*
   * delete file from list
   */
  function handleFileRemove(file: any) {
    if (file.status == 'done') {
      return;
    }

    if (selectedFile.value == file.name) {
      // update selected file
      let foundNew = false;
      for (let tpFile of fileList.value) {
        if (tpFile.name != file.name) {
          // select the first different file
          selectedFile.value = tpFile.name;
          foundNew = true;
          break;
        }
      }

      if (!foundNew) {
        // last one file was removed
        selectedFile.value = undefined;
        rawData.value.fields = [];
      }
    }

    // remove preview data
    delete filePreview.value[file.name];
  }

  /*
   * switch file to preview
   */
  const handleFilePreview = (fileName: string) => {
    let tpFile = fileList.value.find((it) => {
      return it.name == fileName;
    });
    if (tpFile.status == 'error' || tpFile.status == 'done') {
      // the file with error can't be previewed
      // the file which had been uploaded can't be previewed
      return;
    }

    for (let file of fileList.value) {
      if (file.status != 'error') {
        if (file.name == fileName) {
          // select to preview
          file.status = 'selected';
          selectedFile.value = fileName;
        } else {
          // ready to upload
          delete file.status;
        }
      }
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
    } else if (file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      loadXlsxFiles(file);
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
      header: rawData.value.attrs?.header,
      encoding: rawData.value.attrs?.encoding,
      quoteChar: rawData.value.attrs?.quote,
      delimiter: rawData.value.attrs?.delimiter,
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
        if (rawData.value.attrs?.header && firstRow) {
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
              alias: buildNameForDb(field),
            };
            columnFields.push(columnField);
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

            //build table name for file name
            rawData.value.tableName = buildNameForDb(file.name, 'TABLE');
            configFormRef.value?.setFieldsValue({ table: rawData.value.tableName });
          } else {
            // compare with existing column fields
            if (JSON.stringify(rawData.value.fields) != JSON.stringify(columnFields)) {
              // invalid file because format is different
              let tpFile = fileList.value.find((it) => {
                return it.name == file.name;
              });
              tpFile.status = 'error';
              inconsistent = true;
            }
          }
          filePreview.value[file.name] = { size: file.size, rows: 0, data: [] };
        }

        // save preview data
        filePreview.value[file.name].rows++;
        if (filePreview.value[file.name].rows < rawData.value.limit) {
          filePreview.value[file.name].data?.push(row.data);
        } else if (filePreview.value[file.name].rows == rawData.value.limit) {
          const dataFrame = new DataFrame(filePreview.value[file.name].data);
          const dataInfo = dataFrame.info();
          for (let idx in dataInfo) {
            switch (dataInfo[idx].recommendation) {
              case 'boolean': {
                rawData.value.fields[idx].type = 'Boolean';
                break;
              }
              case 'integer': {
                rawData.value.fields[idx].type = 'Integer';
                break;
              }
              case 'float': {
                rawData.value.fields[idx].type = 'Float';
                break;
              }
              case 'date': {
                if(dataInfo[idx].levelOfMeasurements && dataInfo[idx].levelOfMeasurements?.length>0 && dataInfo[idx].levelOfMeasurements[0]=='Time'){
                  rawData.value.fields[idx].type = 'Timestamp';
                } else{
                  rawData.value.fields[idx].type = 'Date';
                }
                break;
              }
              case 'string': {
                if (dataInfo[idx].containsDigit && !dataInfo[idx].containsChar) {
                  rawData.value.fields[idx].type = 'Float';
                }
                break;
              }
            }
          }
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
              alias: buildNameForDb(key),
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

            //build table name for file name
            rawData.value.tableName = buildNameForDb(file.name, 'TABLE');
            configFormRef.value?.setFieldsValue({ table: rawData.value.tableName });
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
          filePreview.value[file.name] = { size: file.size, rows: jsonData.length, data: [] };
          filePreview.value[file.name].data = jsonData.slice(
            0,
            Math.min(rawData.value.limit, jsonData.length),
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
   * load and parse XLSX files
   */
  const loadXlsxFiles = (file: any) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      try {
        const workbook = new ExcelJS.Workbook();
        workbook.xlsx.load(fileReader.result).then(function (workbook) {
          for (const worksheet of workbook.worksheets) {
            if (worksheet.state != 'hidden') {
              // get the first sheet which is not hidden
              const rows = worksheet.getRows(1, rawData.value.limit);
              let columnFields: any[] = [];
              if (rows && rows.length > 0) {
                for (let rowIdx = 0; rowIdx < rows.length; rowIdx++) {
                  const row = rows[rowIdx];
                  let jsonData = {};
                  row.eachCell((cell, cellIdx) => {
                    // cellIdx start from 1
                    if (rowIdx == 0) {
                      // get column names and add column config based first row(header)
                      const columnField = {
                        key: cellIdx - 1,
                        title: cell.value,
                        type: 'Varchar',
                        dataIndex: cell.value,
                        width: 200,
                        resizable: true,
                        alias: buildNameForDb(cell.value),
                      };
                      columnFields.push(columnField);
                    } else {
                      // get row data
                      const filed = rawData.value.fields[cellIdx - 1].title;
                      const value = cell.value;
                      // convert value based on type
                      if (typeof value == 'boolean') {
                        jsonData[filed] = value.toString();
                      } else if (value instanceof Date) {
                        jsonData[filed] = dayjs(value)
                          .utc()
                          .format(rawData.value.attrs?.dateFormat);
                      } else if (value instanceof Object) {
                        if (value.text) {
                          jsonData[filed] = value.text;
                        } else if (value.richText && Array.isArray(value.richText)) {
                          jsonData[filed] = '';
                          for (let txt of value.richText) {
                            jsonData[filed] += txt.text;
                          }
                        } else if (value.result) {
                          if (value.result instanceof Date) {
                            jsonData[filed] = dayjs(value.result)
                              .utc()
                              .format(rawData.value.attrs?.dateFormat);
                          } else {
                            jsonData[filed] = value.result;
                          }
                        } else {
                          jsonData[filed] = value.toString();
                        }
                      } else {
                        jsonData[filed] = value;
                      }
                    }
                  });

                  if (rowIdx == 0) {
                    if (rawData.value.fields?.length == 0) {
                      // get column fields when this is the first file to parse
                      rawData.value.fields = columnFields;
                      // select it to show
                      selectedFile.value = file.name;
                      let tpFile = fileList.value.find((it) => {
                        return it.name == file.name;
                      });
                      tpFile.status = 'selected';

                      //build table name for file name
                      rawData.value.tableName = buildNameForDb(file.name, 'TABLE');
                      configFormRef.value?.setFieldsValue({ table: rawData.value.tableName });
                    } else {
                      // compare with existing column fields
                      if (JSON.stringify(rawData.value.fields) != JSON.stringify(columnFields)) {
                        // invalid file because format is different
                        let tpFile = fileList.value.find((it) => {
                          return it.name == file.name;
                        });
                        tpFile.status = 'error';
                        break;
                      }
                    }
                    filePreview.value[file.name] = {
                      sheet: worksheet.name,
                      size: file.size,
                      rows: worksheet.rowCount,
                      data: [],
                    };
                  } else if (Object.keys(jsonData).length > 0) {
                    // put preview data under file name in filePreview
                    filePreview.value[file.name].data?.push(jsonData);
                  }
                }
              }
              // only get the first non-hidden sheet
              break;
            }
          }
        });
      } catch (error) {
        console.log('failure');
      } finally {
        console.log('finally');
      }
    };

    fileReader.onerror = (event) => {
      console.log(event);
    };
    fileReader.readAsArrayBuffer(file);
  };

  /*
   * convert file name to table name for db
   * convert field title to column name for db
   */
  const buildNameForDb = (name: string, type = 'COLUMN') => {
    let tpName = name.toLowerCase().trim();
    if (type == 'TABLE') {
      // remove extension name(.csv, .json or .xlsx)
      const dotIdx = tpName.lastIndexOf('.');
      if (dotIdx > 0) {
        // get file type
        const fileType = tpName.substring(dotIdx + 1);
        rawData.value.type = fileType.toUpperCase().trim();
        tpName = tpName.substring(0, dotIdx);
      }
    }

    // replace space/- with underscore
    tpName = tpName.replaceAll(' ', '_');
    tpName = tpName.replaceAll('-', '_');

    let pattern = /[a-zA-Z0-9_]{1}/;
    let nameForDb = '';
    for (const char of tpName) {
      if (char.match(pattern)) {
        // only include characters, numbers and underscore
        nameForDb = nameForDb + char;
      }
    }
    return nameForDb;
  };

  /*
   * Date&Time attributes change
   */
  const handleAttrChange = (key: string, value: any) => {
    if(key == 'timezone'){
      rawData.value.attrs[key] = value
    } else {
      // Date/Time/TS format
      // only one option can be selected
      if(value.length>1){
        value.shift(); // delete first one
        attrCsvFormRef.value.setFieldsValue({tsFormat: value});
      }
      rawData.value.attrs[key] = value[0];
    }
  };

  /*
   * ignore a column when import
   */
  function handleColumnIgnore(key: number) {
    let rawField = rawData.value.fields[key];
    if (rawField.ignore == undefined) {
      rawField.ignore = true;
    } else {
      delete rawField.ignore; // delete unnecessary field for saving
    }
  }

  /*
   * column formula
   */
  const handleColumnFormula = (event: any) => {
    let rawField = rawData.value.fields[event.target.id];
    if (event.target.value) {
      rawField.formula = event.target.value;
    } else {
      delete rawField.formula;
    }
  };

  /*
   * column precision
   */
  const handleColumnPrecision = (event: any) => {
    let rawField = rawData.value.fields[event.target.id];
    if (event.target.value) {
      rawField.precision = event.target.value;
    } else {
      delete rawField.precision;
    }
  };

  /*
   * rename column
   */
  const handleColumnAlias = (event: any) => {
    let rawField = rawData.value.fields[event.target.id];
    if (event.target.value) {
      rawField.alias = event.target.value; // new name
    } else {
      rawField.alias = rawField.title; // original name
    }
  };

  /*
   * column type
   */
  const handleColumnType = (key: any, type: string) => {
    let rawField = rawData.value.fields[key];
    if (type) {
      rawField.type = type;
    } else {
      delete rawField.type;
    }
  };

  /*
   * receive upload progress event
   */
  function uploadProgrss(event) {
    // calculate upload percent
    const percent = (event.loaded / event.total) * 100;
    // notify parent
    emit('progress', Math.round(percent));
  }

  /*
   * upload files to server
   */
  async function handleSubmit() {
    try {
      // validate form data
      const values = await configFormRef.value.validate();
      rawData.value.config = unref(values);
      setDrawerProps({ confirmLoading: true });

      let config = {
        rows: 0,
        source: values.source,
        table: values.table,
        overwrite: values.overwrite,
        type: rawData.value.type,
        fileNames: [],
        fileAttrs: rawData.value.attrs,
        colFields: [],
        dbConfig: rawData.value.config,
      };

      let colFields = cloneDeep(unref(rawData.value.fields));
      for (let colField of colFields) {
        delete colField.width;
        delete colField.resizable;
        delete colField.dataIndex;
      }
      config.colFields = colFields;

      // count total records of all valid files
      Object.keys(filePreview.value).forEach((key) => {
        config.fileNames.push({
          name: key,
          size: filePreview.value[key].size,
          rows: filePreview.value[key].rows,
        });
        config.rows += filePreview.value[key].rows;
      });
      rawData.value.rows = config.rows;

      // build form data
      let formData = new FormData();
      formData.append('config', JSON.stringify(config));
      for (const file of fileList.value) {
        formData.append('files', file['originFileObj'] as any);
      }

      API_IMPORTER_UPLOAD(formData, uploadProgrss).then((response) => {
        closeDrawer();
        message.success(t('common.tip.upload'));
        // notify parent to update list table
        emit('success', config);
      });
    } catch (e) {
      if (e.errorFields.length) {
        message.warning(t('common.exception.validation'));
      }
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>

<style lang="less" scoped>
  .upload-list-inline {
    width: 100%;
    font-size: 18px;
    margin-top: 2px;
  }

  .upload-list-inline:hover {
    background-color: lightgray;
  }

  .toolbar-input {
    width: 180px !important;
    top: -5px;
    margin-right: 8px;
    color: darkred;
    outline-color: red;
    background-color: #cc0000;
  }

  .toolbar-button {
    font-size: 28px;
    color: green;
  }

  .toolbar-button:hover {
    background-color: gray;
    cursor: pointer;
  }

  ::v-deep(.filesets) {
    border: 1px solid silver;
    padding: 0px 10px 5px 10px;
  }

  ::v-deep(.fieldsetlegend) {
    padding: 2px 5px 2px 5px;
    width: auto;
    font-size: 15px;
  }

  .fielditem {
    padding: 2px;
    margin: 2px 0px 2px 0px;
    border: solid 1px #eee;
    background-color: #f1f1f1;
    width: 100%;
    font-size: 12px;
  }

  .fielditem:hover {
    background-color: #fdfdfd;
    cursor: move;
  }

  /* 伸缩按钮部分 */
  .layout-area {
    width: 10px;
    height: 100%;
    float: left;
    color: green;
    position: absolute;
    top: 3px;
    right: 0px;
    z-index: 999;
  }

  /* 伸缩按钮居中 */
  .layout-area .collapse {
    border: 1px solid #f0f000;
    border-radius: 0px 10px 10px 0px;
    position: absolute;
    right: 0px;
    top: 3px;
    background-color: #f0f000;
    height: 50px;
    padding-top: 15px;
    cursor: pointer;
    z-index: 999;
  }

  /* 伸缩按钮居中 */
  .layout-area .expand {
    border: 1px solid #f0f000;
    border-radius: 10px 0px 0px 10px;
    position: absolute;
    right: 0px;
    top: 3px;
    background-color: #f0f000;
    height: 50px;
    padding-top: 15px;
    cursor: pointer;
    z-index: 999;
  }
</style>
