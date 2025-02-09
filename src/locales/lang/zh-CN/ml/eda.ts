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
      features: '特征',
      target: '目标',
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
    vis: {
      box: {
        sd: '标准差',
        outlier: '异常点',
        cat: '分类域'
      },
      violin: {
        box: '箱型图',
        outlier: '异常点',
        cat: '分类域'
      },
      anova: {
        line: '折线图',
        field: '数据域'
      },
      outlier: {
        method: '算法',
        irq: 'IQR系数',
        sigma: 'Sigma系数',
        cont_ratio: '污染率',
        distance: '最大距离',
        metric: '度量标准',
        kernel: '核方法',
        umap: 'UMAP',
        d3: '3D'
      },
      hist: {
        kde: '核密度',
        bins: '分箱数',
        cat: '分类域'
      },
      kde: {
        combine: '合并',
        rug: '分布棒',
        ref: '参考线',
      },
      freq: {
        pct: '百分比',
        funnel: '漏斗图'
      },
      scatter: {
        xfield: 'X域',
        yfield: 'Y域',
        cat: '分类域',
        marg: '边图',
        frac: '趋势平滑'
      },
      scatters: {
        cat: '分类域'
      },
      pair: {
        box: '箱型图',
        cat: '分类域'
      },
      ccm: {
        num: '唯数值域',
        coeff: '系数'
      },
      curve: {
        andrews: '安德鲁斯曲线',
        cat: '分类域'
      },
      ffilter: {
        method: '算法',
        mode: '模式'
      },
      fmodel: {
        model: '模型'
      },
      fsearch: {
        method: '算法'
      },
      fdetect: {
        method: '算法'
      },
      pca: {
        dim: '维数',
        kernel: '核方法'
      },
      lda: {
        dim: '维数'
      },
      svd: {
        dim: '维数'
      },
      tsne: {
        dim: '维数',
        perplex: '困惑度'
      },
      isomap: {
        dim: '维数',
        neighbor: '近邻数'
      },
      lle: {
        dim: '维数',
        neighbor: '近邻数',
        method: '算法'
      },
      ica: {
        dim: '维数',
        algo: '算法'
      },
      tsseries: {
        tf: '时间域',
        period: '周期',
        agg: '聚合',
        solo: '分开显示',
        connected: '断点连续'
      },
      tstrend: {
        tf: '时间域',
        period: '周期',
        agg: '聚合',
        vf: '值域',
        frac: '平滑系数',
        connected: '断点连续'
      },
      tsdiff: {
        tf: '时间域',
        period: '周期',
        agg: '聚合',
        vf: '值域',
        diff: '比较间隔',
        solo: '分开显示'
      },
      tsfreq: {
        tf: '时间域',
        period: '周期',
        agg: '聚合',
        vf: '值域',
      },
      tscompare: {
        tf: '时间域',
        period: '周期',
        agg: '聚合',
        vf: '值域',
        groupby: '分组'
      },
      tsacf: {
        tf: '时间域',
        period: '周期',
        agg: '聚合',
        vf: '值域',
        lag: 'Lag'
      },
      tsma: {
        tf: '时间域',
        period: '周期',
        agg: '聚合',
        vf: '值域',
        win: '比较窗口'
      },
      tsbox: {
        tf: '时间域',
        period: '周期',
        agg: '聚合',
        vf: '值域',
        violin: '小提琴图'
      },
      tscycle: {
        tf: '时间域',
        period: '周期',
        agg: '聚合',
        vf: '值域',
        algo: '算法'
      },
      tsdecomp: {
        tf: '时间域',
        period: '周期',
        agg: '聚合',
        vf: '值域',
        algo: '算法',
        robust: 'Robust'
      },
      tspredict: {
        tf: '时间域',
        period: '周期',
        agg: '聚合',
        vf: '值域',
        algo: '算法',
        trend: '周期性',
        season: '季节性',
        damped: '趋势衰减'
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
