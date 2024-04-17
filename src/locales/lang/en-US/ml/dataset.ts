export default {
  toolbar: {
    search: 'name, description or group',
  },
  table: {
    title: {
      features: 'Features',
      target: 'Target',
      variable: 'Variable',
      query: 'Query',
      field: 'Field Name',
      source: 'Datasource'
    },
  },
  tab: {
    stats: {
      title: 'Statistics',
      count: 'Count',
      unique: 'Unique',
      dataType: 'Type',
      max: 'Max',
      pct75: 'Q3(75%)',
      pct25: 'Q1(25%)',
      min: 'Min',
      mean: 'Mean',
      median: 'Median',
      std: 'StdDev',
      variance: 'Variance',
      missing: 'Missing',
      zeros: 'Zeros',
    },
  },
  form: {
    info: {
      title: 'Info',
    },
    datasource: {
      title: 'Source',
    },
    config: {
      title: 'Config',
      var: 'Variable',
      omit: 'Omitted Fields',
      group: 'Group',
      sorter: 'Sorter',
      filter: 'Filter',
    },
    var: {
      new: 'Create Variable',
      edit: 'Edit Variable',
      type: 'Type',
      name: 'Name',
      value: 'Value',
      cat: {
        number: 'Number',
        string: 'String',
        bool: 'Bool',
        ts: 'Timestamp',
        arrayN: '[Number]',
        arrayS: '[String]',
      },
    },
    filter: {
      new: 'Create Filter',
      operator: 'Operator',
      value: 'Value',
    },
  },
  detail: {
    toolbar: {
      limit: 'Preview limit',
    },
    table: {
      action: {
        omit: 'Omit',
        target: 'Target',
        attr: 'Attribute',
        encode: 'Encoding',
        scale: 'Scaling',
        miss: 'Missing'
      },
    },
  },
  error: {
    sourceMiss: 'Datasource is not found!',
    wrongFilter: 'Filter expression is incorrect!',
  },
};
