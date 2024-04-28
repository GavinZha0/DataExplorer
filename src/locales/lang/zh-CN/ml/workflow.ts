export default {
  tab: {
    flow: '工作流',
    chart: '图表'
  },
  toolbar: {
    search: '名称，分类或描述',
    layout: '布局'
  },
  table: {
    title: {
      last_run: '最近执行',
      druation: '执行时长',
      error: '错误信息',
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
  },
  form: {
    config: {
      timeout: '时限',
    },
    canvas: {
      grid: {
        visible: '显示网格',
        size: '网格大小',
        color: '网格颜色',
        thick: '网格粗细'
      },
      bg: {
        color: '背景颜色'
      },
      edge: {
        color: '边颜色',
        router: '边路由',
        connector: '边衔接'
      }
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
