export default {
  toolbar: {
    search: 'name, description or group',
  },
  table: {
    title: {
      dim: 'Dim',
      metrics: 'Metrics',
      variable: 'Variable',
      query: 'Query',
      field: 'Field Name',
      graph: 'Graph',
      source: 'Datasource',
      graph_ver: 'Graph Version',
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
      hidden: 'Hidden',
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
        hidden: 'Hide',
        rename: 'Rename',
        metrics: 'Metrics',
        group: 'Group',
        sorter: 'Sorter',
        filter: 'Filter',
      },
    },
  },
  error: {
    sourceMiss: 'Datasource is not found!',
    wrongFilter: 'Filter expression is incorrect!',
  },
};
