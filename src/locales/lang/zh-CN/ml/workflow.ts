export default {
  tab: {
    flow: '工作流',
    chart: '图表'
  },
  toolbar: {
    search: 'name, category or description',
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
      grid: {
        visible: '显示网格',
        size: '网格大小',
        color: '网格颜色',
        thickness: '网格粗细',
      },
      background: {
        color: '背景颜色',
        image: '背景图片',
        repeat: '图片重复',
        opacity: '图片透明度',
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
