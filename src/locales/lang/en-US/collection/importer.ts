export default {
  toolbar: {
    search: 'Datasource or Table Name',
  },
  table: {
    title: {
      files: 'File Name',
      total: 'File Rows',
      records: 'Imported Rows',
      source: 'Datasource',
      table: 'Table Name',
      type: 'File Type',
      config: 'Config',
      fields: 'Fields',
      ts: 'Import Time',
      overwrite: 'Overwrite',
      status: 'Status',
    },
  },
  detail: {
    toolbar: {
      limit: 'Preview limit',
    },
    table: {
      action: {
        ignore: 'Ignore',
        alias: 'Alias',
        formula: 'Formula',
        precision: 'Precision',
        type: {
          title: 'Data Type',
          varchar: 'Varchar',
          text: 'Text',
          integer: 'Integer',
          bigint: 'Bigint',
          float: 'Float',
          double: 'Double',
          boolean: 'Boolean',
          bit: 'Bit',
          binary: 'Binary',
          blob: 'Blob',
          time: 'Time',
          date: 'Date',
          dt: 'Datetime',
          ts: 'Timestamp',
        },
      },
    },
    form: {
      attr: {
        title: 'File Attributes',
        csvAttr: 'CSV Attributes',
        tsAttr: 'Datetime Attributes',
        fileList: 'File List',
        encoding: 'Encoding',
        header: 'Header',
        delimiter: 'Delimiter',
        quote: 'Quote',
        timezone: 'Time Zone',
        timeFormat: 'Time Format',
        dateFormat: 'Date Format',
        tsFormat: 'Timestamp',
        limit: 'Preview',
        singleQuote: "Single (')",
        doubleQuote: 'Double (")',
        comma: 'Comma (,)',
        colon: 'Colon (:)',
        tab: 'Tab (\\t)',
        uploadTip: 'Click or drag files here',
        uploadHint1: 'Support CSV, JSON and XLSX file.',
        uploadHint2: 'Multiple must have same type and format!',
      },
      config: {
        title: 'Target Config',
        source: 'Datasource',
        table: 'Table Name',
        overwrite: 'Overwrite',
        null: 'Null Map',
        true: 'True Map',
        false: 'False Map',
        ts: 'TS Solution',
      },
    },
  },
  error: {
    sourceMiss: 'datasource is not found!',
  },
};
