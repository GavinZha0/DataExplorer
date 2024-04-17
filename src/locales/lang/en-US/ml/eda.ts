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
      features: 'Features',
      target: 'Target',
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
    vis: {
      box: {
        sd: 'StdDev',
        outlier: 'Outlier',
        cat: 'Category'
      },
      violin: {
        box: 'Box',
        outlier: 'Outlier',
        cat: 'Category'
      },
      anova: {
        line: 'Line style',
        field: 'Field'
      },
      outlier: {
        method: 'Method',
        iqr: 'IQR coff',
        sigma: 'Sigma coff',
        metric: 'Metric',
        kernel: 'Kernel',
        umap: 'UMAP',
        d3: '3D'
      },
      hist: {
        kde: 'KDE',
        bins: 'Bins',
        cat: 'Category'
      },
      kde: {
        combine: 'Combine',
        rug: 'Rug',
        ref: 'Reference',
      },
      freq: {
        pct: 'Percentage',
        funnel: 'Funnel'
      },
      scatter: {
        xfield: 'X field',
        yfield: 'Y field',
        cat: 'Category',
        marg: 'Margin',
        frac: 'Fraction'
      },
      scatters: {
        cat: 'Category'
      },
      pair: {
        box: 'Box',
        cat: 'Category'
      },
      ccm: {
        num: 'Numeric only',
        coeff: 'Coeff'
      },
      curve: {
        andrews: 'Andrews',
        cat: 'Category'
      },
      ffilter: {
        method: 'Method',
        mode: 'Mode'
      },
      fmodel: {
        model: 'Model'
      },
      fsearch: {
        method: 'Method'
      },
      fdetect: {
        method: 'Method'
      },
      pca: {
        dim: 'Dim',
        kernel: 'Kernel'
      },
      lda: {
        dim: 'Dim'
      },
      svd: {
        dim: 'Dim'
      },
      tsne: {
        dim: 'Dim',
        perplex: 'Perplexity'
      },
      isomap: {
        dim: 'Dim',
        neighbor: 'Neighbors'
      },
      lle: {
        dim: 'Dim',
        neighbor: 'Neighbors',
        method: 'Method'
      },
      ica: {
        dim: 'Dim',
        algo: 'Algo'
      },
      tsseries: {
        tf: 'Time field',
        period: 'Period',
        agg: 'Aggregation',
        solo: 'Solo',
        connected: 'Connected'
      },
      tstrend: {
        tf: 'Time field',
        period: 'Period',
        agg: 'Aggregation',
        vf: 'Value field',
        frac: 'Fraction',
        connected: 'Connected'
      },
      tsdiff: {
        tf: 'Time field',
        period: 'Period',
        agg: 'Aggregation',
        vf: 'Value field',
        diff: 'Diff gap',
        solo: 'Solo'
      },
      tsfreq: {
        tf: 'Time field',
        agg: 'Aggregation',
        vf: 'Value field'
      },
      tscompare: {
        tf: 'Time field',
        period: 'Period',
        agg: 'Aggregation',
        vf: 'Value field',
        groupby: 'Group by'
      },
      tsacf: {
        tf: 'Time field',
        period: 'Period',
        agg: 'Aggregation',
        vf: 'Value field',
        lag: 'Lag'
      },
      tsma: {
        tf: 'Time field',
        period: 'Period',
        agg: 'Aggregation',
        vf: 'Value field',
        win: 'Win'
      },
      tsbox: {
        tf: 'Time field',
        period: 'Period',
        agg: 'Aggregation',
        vf: 'Value field',
        violin: 'Violin'
      },
      tscycle: {
        tf: 'Time field',
        period: 'Period',
        agg: 'Aggregation',
        vf: 'Value field',
        algo: 'Algo'
      },
      tsdecomp: {
        tf: 'Time field',
        period: 'Period',
        agg: 'Aggregation',
        vf: 'Value field',
        algo: 'Algo',
        robust: 'Robust'
      },
      tspredict: {
        tf: 'Time field',
        period: 'Period',
        agg: 'Aggregation',
        vf: 'Value field',
        algo: 'Algo',
        trend: 'Trend',
        season: 'Season',
        damped: 'Damped Trend'
      },
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
