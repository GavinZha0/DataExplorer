import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

// index form columns
export const indexColumns: BasicColumn[] = [
  {
    title: t('collection.importer.table.title.ts'),
    dataIndex: 'updatedAt',
    width: 200,
    resizable: true
  },
  {
    title: t('collection.importer.table.title.files'),
    dataIndex: 'files',
    align: 'left',
    resizable: true
  },
  {
    title: t('collection.importer.table.title.type'),
    dataIndex: 'type',
    width: 100,
    align: 'left',
    filters: [
      { text: 'CSV', value: 'CSV' },
      { text: 'JSON', value: 'JSON' },
      { text: 'XLSX', value: 'XLSX' },
    ],
  },
  {
    title: t('collection.importer.table.title.total'),
    dataIndex: 'rows',
    align: 'left',
    width: 120,
  },
  {
    title: t('collection.importer.table.title.records'),
    dataIndex: 'records',
    align: 'left',
    width: 120,
  },
  {
    title: t('collection.importer.table.title.source'),
    dataIndex: 'sourceName',
    align: 'left',
    width: 200,
    resizable: true
  },
  {
    title: t('collection.importer.table.title.table'),
    dataIndex: 'tableName',
    align: 'left',
    resizable: true
  },
  {
    title: t('collection.importer.table.title.overwrite'),
    dataIndex: 'overwrite',
    width: 100,
    filters: [
      { text: 'true', value: 'true' },
      { text: 'false', value: 'false' },
    ],
  },
  {
    title: t('collection.importer.table.title.status'),
    dataIndex: 'status',
    width: 120,
    filters: [
      { text: 'success', value: 'success' },
      { text: 'processing', value: 'processing' },
      { text: 'waiting', value: 'waiting' },
      { text: 'error', value: 'error' },
      { text: 'warning', value: 'warning' },
    ],
  },
];

// common attribute
export const formTsAttrSchema: FormSchema[] = [
  {
    field: 'timezone',
    label: t('collection.importer.detail.form.attr.timezone'),
    component: 'Select',
    labelWidth: 80,
    defaultValue: Intl.DateTimeFormat().resolvedOptions().timeZone,
    colProps: { span: 24 },
    componentProps: () => {
      return {
        'show-search': true,
        options: Intl.supportedValuesOf('timeZone').map((item) => ({ label: item, value: item })),
      };
    },
  },
  {
    field: 'timeFormat',
    label: t('collection.importer.detail.form.attr.timeFormat'),
    component: 'Select',
    labelWidth: 80,
    componentProps: {
      mode: 'tags',
      maxTagCount: 1,
      options: [
        { label: 'HH:mm:ss', value: 'HH:mm:ss' },
        { label: 'hh:mm a', value: 'hh:mm a' }, // 6:30 AM
        { label: 'HHmmss', value: 'HHmmss' },
        { label: 'HH:mm:ss.SSS', value: 'HH:mm:ss.SSS' } // 06:30:15.520
      ],
    },
    colProps: { span: 24 },
  },
  {
    field: 'dateFormat',
    label: t('collection.importer.detail.form.attr.dateFormat'),
    component: 'Select',
    labelWidth: 80,
    componentProps: {
      mode: 'tags',
      maxTagCount: 1,
      options: [
        { label: 'MM/dd/yyyy', value: 'MM/dd/yyyy' }, // 03/15/2023
        { label: 'yyyy/MM/dd', value: 'yyyy/MM/dd' }, // 2023/03/15

        { label: 'yyyy-MM-dd', value: 'yyyy-MM-dd' }, // 2023-03-15
        { label: 'MMM-dd-yyyy', value: 'MMM-dd-yyyy' }, // Mar-15-2022

        { label: 'yyyy.MM.dd', value: 'yyyy.MM.dd' }, // 2023.03.15
        { label: 'MM.dd.yyyy', value: 'MM.dd.yyyy' }, // 03.15.2023

        { label: 'yyyyMMdd', value: 'yyyyMMdd' }, // 20230315
        { label: 'MMddyyyy', value: 'MMddyyyy' }, // 03152023

        { label: 'EEE, MMM dd yyyy', value: 'EEE, MMM dd yyyy' }, // Tue, Mar 15 2023
      ],
    },
    colProps: { span: 24 },
  },
  {
    field: 'tsFormat',
    label: t('collection.importer.detail.form.attr.tsFormat'),
    component: 'Select',
    labelWidth: 80,
    componentProps: {
      mode: 'tags',
      maxTagCount: 1,
      options: [
        { label: 'MM/dd/yyyy HH:mm:ss', value: 'MM/dd/yyyy HH:mm:ss' }, // 03/15/2023 06:30:15;
        { label: 'MM/dd/yyyy hh:mm a', value: 'MM/dd/yyyy hh:mm a' }, // 03/15/2023 06:30 AM
        { label: 'MM/dd/yyyy HH:mm:ssX', value: 'MM/dd/yyyy HH:mm:ssX' }, // 03/15/2023 06:30:15+08
        { label: 'MM/dd/yyyy HH:mm:ss.SSS', value: 'MM/dd/yyyy HH:mm:ss.SSS' }, // 03/15/2023 06:30:15.526

        { label: 'yyyy-MM-dd HH:mm:ss', value: 'yyyy-MM-dd HH:mm:ss' }, // 2023-03-15 06:30:15;
        { label: 'yyyy-MM-dd hh:mm a', value: 'yyyy-MM-dd hh:mm a' }, // 2023-03-15 06:30 AM
        { label: 'yyyy-MM-dd HH:mm:ssX', value: 'yyyy-MM-dd HH:mm:ssX' }, // 2023-03-15 06:30:15+08; RFC 3339
        { label: 'yyyy-MM-dd HH:mm:ss z', value: 'yyyy-MM-dd HH:mm:ss z' }, // 2015-05-05 10:15:30 PDT; 2015-05-05 10:15:30 Europe/Paris
        { label: "yyyy-MM-dd HH:mm:ss 'UTC'X", value: "yyyy-MM-dd HH:mm:ss 'UTC'X" }, // 2015-05-05 10:15:30 UTC+08:00
        { label: 'yyyy-MM-dd HH:mm:ss O', value: 'yyyy-MM-dd HH:mm:ss O' }, // 2015-05-05 10:15:30 GMT+8
        { label: 'yyyy-MM-dd HH:mm:ss.SSS', value: 'yyyy-MM-dd HH:mm:ss.SSS' }, // 2023-03-15 06:30:15.358;
        { label: "yyyy-MM-dd, HH:mm:ssXXX '['VV']'", value: "yyyy-MM-dd, HH:mm:ssXXX '['VV']'" }, // 2023-03-15, 06:30:15+08:00 [Asia/Shanghai],

        { label: "yyyy-MM-dd'T'HH:mm:ss", value: "yyyy-MM-dd'T'HH:mm:ss" }, // 2023-03-15T06:30:15, ISO 8601
        { label: "yyyy-MM-dd'T'HH:mm:ssX", value: "yyyy-MM-dd'T'HH:mm:ssX" }, // 2023-03-15T06:30:15+08; 2023-03-15T06:30:15+0800; 2023-03-15T06:30:15+08:00
        { label: "yyyy-MM-dd'T'HH:mm:ss.SSS", value: "yyyy-MM-dd'T'HH:mm:ss.SSS" }, // 2023-03-15T06:30:15.635

        { label: 'dd.MM.yyyy HH:mm:ss', value: 'dd.MM.yyyy HH:mm:ss' }, // 15.03.2023 06:30:15
        { label: 'yyyyMMddHHmmss', value: 'yyyyMMddHHmmss' },

        { label: 'MMM d yyyy HH:mm:ss', value: 'MMM d yyyy HH:mm:ss' }, // Mar 15 2023 06:30:15
        { label: 'd MMM yyyy HH:mm:ss z', value: 'd MMM yyyy HH:mm:ss z' }, // 4 Jul 2022 12:30:56 GMT, 4 Jul 2022 12:30:56 GMT+08:00, RFC 822

        { label: 'EEE, d MMM yyyy HH:mm:ss', value: 'EEE, d MMM yyyy HH:mm:ss' }, // Sat, 4 Mar 2023 15:08:20, RFC 822
        { label: 'EEE, dd MMM yyyy HH:mm:ss X', value: 'EEE, dd MMM yyyy HH:mm:ss X' } // Sat, 04 Mar 2023 15:08:20 +0800, RFC 1123Z
      ],
    },
    colProps: { span: 24 },
  },
];

// csv file attributes
export const formCsvAttrSchema: FormSchema[] = [
  {
    field: 'header',
    label: t('collection.importer.detail.form.attr.header'),
    defaultValue: true,
    component: 'Switch',
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'quote',
    label: t('collection.importer.detail.form.attr.quote'),
    component: 'Select',
    defaultValue: '"',
    labelWidth: 80,
    colProps: { span: 24 },
    componentProps: {
      options: [
        { label: t('collection.importer.detail.form.attr.singleQuote'), value: "'" },
        { label: t('collection.importer.detail.form.attr.doubleQuote'), value: '"' },
      ],
    },
  },
  {
    field: 'encoding',
    label: t('collection.importer.detail.form.attr.encoding'),
    component: 'Select',
    defaultValue: 'UTF-8',
    labelWidth: 80,
    colProps: { span: 24 },
    componentProps: {
      options: [
        { label: 'UTF-8', value: 'UTF-8' },
        { label: 'UTF-16', value: 'UTF-16' },
        { label: 'Unicode', value: 'Unicode' },
        { label: 'GB2312', value: 'GB2312' },
        { label: 'GBK', value: 'GBK' },
      ],
    },
  },
  {
    field: 'delimiter',
    label: t('collection.importer.detail.form.attr.delimiter'),
    component: 'Select',
    defaultValue: ',',
    labelWidth: 80,
    colProps: { span: 24 },
    componentProps: {
      allowClear: false,
      options: [
        { label: t('collection.importer.detail.form.attr.comma'), value: ',' },
        { label: t('collection.importer.detail.form.attr.colon'), value: ':' },
        { label: t('collection.importer.detail.form.attr.tab'), value: '\t' },
      ],
    },
  },
];

// destination config
export const formConfigSchemas: FormSchema[] = [
  {
    field: 'overwrite',
    label: t('collection.importer.detail.form.config.overwrite'),
    component: 'Switch',
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'source',
    label: t('collection.importer.detail.form.config.source'),
    required: true,
    component: 'Input',
    slot: 'datasource',
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'table',
    label: t('collection.importer.detail.form.config.table'),
    required: true,
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'nullMap',
    label: t('collection.importer.detail.form.config.null'),
    component: 'Select',
    defaultValue: ['null', '(null)', 'n/a', 'Blank'],
    labelWidth: 80,
    componentProps: {
      mode: 'multiple',
      options: [
        { label: 'NULL', value: 'null' },
        { label: '(NULL)', value: '(null)' },
        { label: '<NULL>', value: '<null>' },
        { label: 'Blank', value: 'Blank' },
        { label: 'NA', value: 'na' },
        { label: 'N/A', value: 'n/a' },
      ],
    },
    colProps: { span: 24 },
  },
  {
    field: 'trueMap',
    label: t('collection.importer.detail.form.config.true'),
    component: 'Select',
    defaultValue: ['true', 'yes', 'on', '1'],
    labelWidth: 80,
    componentProps: {
      mode: 'multiple',
      options: [
        { label: 'True', value: 'true' },
        { label: 'Yes', value: 'yes' },
        { label: 'On', value: 'on' },
        { label: '1', value: '1' },
        { label: 'success', value: 'success' },
        { label: 'Blank', value: 'blank' },
      ],
    },
    colProps: { span: 24 },
  },
  {
    field: 'falseMap',
    label: t('collection.importer.detail.form.config.false'),
    component: 'Select',
    defaultValue: ['false', 'no', 'off', '0'],
    labelWidth: 80,
    componentProps: {
      mode: 'multiple',
      options: [
        { label: 'False', value: 'false' },
        { label: 'No', value: 'no' },
        { label: 'Off', value: 'of' },
        { label: '0', value: '0' },
        { label: 'failure', value: 'failure' },
        { label: 'Blank', value: 'blank' },
      ],
    },
    colProps: { span: 24 },
  },
];

export const FieldModalSchemas: FormSchema[] = [
  {
    field: 'ignore',
    label: t('collection.importer.detail.table.action.ignore'),
    component: 'Switch',
    colProps: { span: 24 },
  },
  {
    field: 'alias',
    component: 'Input',
    label: t('collection.importer.detail.table.action.alias'),
    colProps: { span: 24 },
  },
  {
    field: 'type',
    label: t('collection.importer.detail.table.action.type.title'),
    component: 'Select',
    defaultValue: 'String',
    componentProps: {
      options: [
        { label: t('collection.importer.detail.table.action.type.varchar'), value: 'Varchar' },
        { label: t('collection.importer.detail.table.action.type.text'), value: 'Text' },
        { label: t('collection.importer.detail.table.action.type.integer'), value: 'Integer' },
        { label: t('collection.importer.detail.table.action.type.bigint'), value: 'Bigint' },
        { label: t('collection.importer.detail.table.action.type.float'), value: 'Float' },
        { label: t('collection.importer.detail.table.action.type.double'), value: 'Double' },
        { label: t('collection.importer.detail.table.action.type.boolean'), value: 'Boolean' },
        { label: t('collection.importer.detail.table.action.type.time'), value: 'Time' },
        { label: t('collection.importer.detail.table.action.type.date'), value: 'Date' },
        { label: t('collection.importer.detail.table.action.type.dt'), value: 'Datetime' },
        { label: t('collection.importer.detail.table.action.type.ts'), value: 'Timestamp' },
        { label: t('collection.importer.detail.table.action.type.bit'), value: 'Bit' },
        { label: t('collection.importer.detail.table.action.type.binary'), value: 'Binary' },
        { label: t('collection.importer.detail.table.action.type.blob'), value: 'Blob' },
      ],
    },
    colProps: { span: 12 },
  },
  {
    field: 'precision',
    component: 'InputNumber',
    label: t('collection.importer.detail.table.action.precision'),
    colProps: { span: 12 },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'formula',
    label: t('collection.importer.detail.table.action.formula'),
    component: 'Select',
    componentProps: {
      options: [
        { label: 'round', value: 'round' },
        { label: 'format(%.2f)', value: 'format(%.2f)' },
        { label: 'remove(%)', value: 'remove(%)' },
        { label: 'replace(a,b)', value: 'replace(a,b)' },
        { label: 'truncate(255)', value: 'truncate(255)' },
      ],
    },
    colProps: { span: 24 },
  },
];
