export default {
  tab: {
    statistics: {
      title: 'Statistics',
      count: 'Count',
      distinct: 'Distinct',
      dataType: 'Data Type',
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
    distribution: 'Distribution',
    interaction: 'Interaction',
    correlation: 'Correlation',
    python: 'Python',
  },
  toolbar: {
    search: 'name, group or description',
  },
  table: {
    title: {
      feature: 'Feature',
      target: 'Target',
      source: 'Datasource',
      dataset: 'Dataset',
      chart: 'Chart',
      yes: 'Yes',
      no: 'No',
    },
    action: {
      detail: 'Detail',
      edit: 'Edit',
      share: 'Share',
      unshare: 'Unshare',
      delete: 'Delete',
    },
    field: {
      distribution: 'Distribution'
    }
  },
  form: {
    config: {
      input: 'Input',
      limit: 'Limit',
      type: 'Type',
      source: 'Source',
      expect: 'Expectation',
    },
    datasource: {
      source: 'Datasource',
      dataset: 'Dataset'
    },
    create: {
      info: 'Info',
      title: 'Create new algo',
      edit: 'Update algo',
      toolbar: {
        format: 'Format',
        run: 'Run',
        stop: 'Stop',
        config: 'Config',
        save: 'Save',
        saveas: 'Save As',
      },
      config: {
        dim: 'Dimension',
        metrics: 'Metrics',
        variable: 'Variable',
        filter: 'Filter',
        hidecol: 'Hidden Column',
        order: 'Order By',
        limit: 'Limit',
      },
    },
    result: {
      log: 'Log',
      plot: 'pyPlot',
      chart: 'Chart',
      steamlit: 'Steamlit',
      dl4jui: 'DL4J',
    },
  },
  error: {
    nameMiss: "Name shouldn't be empty!",
    sourceMiss: "Datasource shouldn't be empty!",
    queryMiss: "Query shouldn't be empty!",
    varMiss: "Some variable doesn't exist!",
  },
};
