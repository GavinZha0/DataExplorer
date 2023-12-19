export default {
  tab: {
    statistics: {
      title: '统计信息',
      count: '数据量',
      distinct: '唯一值',
      dataType: '数据类型',
      max: '最大值',
      pct75: 'Q3(75%)',
      pct25: 'Q1(25%)',
      min: '最小值',
      mean: '均值',
      median: '中位值',
      std: '标准差',
      variance: '方差',
      missing: '缺失值',
      zeros: '零值',
    },
    distribution: '分布图表',
    interaction: '关联图表',
    correlation: '相关性图表',
    python: 'Python图表',
  },
  toolbar: {
    search: 'name, category or description',
  },
  table: {
    title: {
      feature: '特征',
      target: '目标',
      source: '数据源',
      dataset: '数据集',
      chart: '图表',
      yes: '是',
      no: '否',
    },
    action: {
      detail: 'Detail',
      edit: 'Edit',
      share: 'Share',
      unshare: 'Unshare',
      delete: 'Delete',
    },
    field: {
      distribution: '分布'
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
      source: '数据源',
      dataset: '数据集'
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
