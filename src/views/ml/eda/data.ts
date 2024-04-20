import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description/index';
import { useI18n } from '/@/hooks/web/useI18n';
import * as echarts from 'echarts';

const { t } = useI18n();

// index form columns
export const indexColumns: BasicColumn[] = [
  {
    title: t('common.table.title.name'),
    dataIndex: 'name',
    width: 180,
    align: 'left',
    sorter: true,
    resizable: true,
  },
  {
    title: t('common.table.title.desc'),
    dataIndex: 'desc',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: t('common.table.title.group'),
    dataIndex: 'group',
    width: 100,
    align: 'left',
    sorter: true,
    resizable: true,
  },
  {
    title: t('ml.eda.table.title.dataset'),
    dataIndex: 'datasetName',
    align: 'left',
    resizable: true,
    width: 150,
  },
  {
    title: t('common.table.title.public'),
    dataIndex: 'pubFlag',
    width: 80,
    filters: [
      { text: 'true', value: 'true' },
      { text: 'false', value: 'false' },
    ],
  },
];

// Table fields
export const fieldColumns: BasicColumn[] = [
  {
    title: t('common.table.title.type'),
    dataIndex: 'type',
    width: 50,
    resizable: true,
  },
  {
    title: t('dataviz.dataset.table.title.field'),
    dataIndex: 'name',
    width: 120,
    align: 'left',
    resizable: true,
  },
  {
    title: t('ml.feature.table.field.distribution'),
    dataIndex: 'size',
    width: 100,
    align: 'left',
    resizable: true,
  },
];

// info form schema include all fields but some are hidden
export const formInfoSchema: FormSchema[] = [
  {
    field: 'id',
    label: t('common.table.title.id'),
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: t('common.table.title.name'),
    required: true,
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'desc',
    label: t('common.table.title.desc'),
    component: 'InputTextArea',
    labelWidth: 80,
    colProps: { span: 24 },
    componentProps: {
      maxlength: 128,
      autoSize: { minRows: 1, maxRows: 4 },
    },
  },
  {
    field: 'group',
    label: t('common.table.title.group'),
    component: 'Input',
    slot: 'group',
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'type',
    label: t('common.table.title.type'),
    component: 'Select',
    componentProps: {
      options: [
        { label: 'classification', value: 'Classification' },
        { label: 'regression', value: 'Regression' },
        { label: 'clustering', value: 'Clustering' },
        { label: 'reduction', value: 'Reduction' },
      ],
    },
    colProps: { span: 24 },
  },
  {
    field: 'createdBy',
    label: t('common.table.title.created_by'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'createdAt',
    label: t('common.table.title.create_time'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'updatedBy',
    label: t('common.table.title.updated_by'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'updatedAt',
    label: t('common.table.title.update_time'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 80,
    colProps: { span: 24 },
  },
];

// stat box options
export const boxOptionSchema: FormSchema[] = [
  {
    field: 'cf',
    component: 'Select',
    label: t('ml.eda.form.vis.box.cat'),
    componentProps: {
      options: []
    }
  },
  {
    field: 'sd',
    component: 'Switch',
    label: t('ml.eda.form.vis.box.sd')
  },
  {
    field: 'outlier',
    component: 'Switch',
    label: t('ml.eda.form.vis.box.outlier'),
    defaultValue: true
  }
];


// stat violin options
export const violinOptionSchema: FormSchema[] = [
  {
    field: 'cf',
    component: 'Select',
    label: t('ml.eda.form.vis.violin.cat'),
    componentProps: {
      options: []
    }
  },
  {
    field: 'box',
    component: 'Switch',
    label: t('ml.eda.form.vis.violin.box'),
    defaultValue: true
  },
  {
    field: 'outlier',
    component: 'Switch',
    label: t('ml.eda.form.vis.violin.outlier'),
    defaultValue: true
  }
];

// ANOVA options
// 单因素方差分析(One-way ANOVA)：一个分类变量(自变量)与一个连续变量(因变量)间的关系
// p<0.05, 二者存在因果影响
// 多因素方差分析(Multi-factor ANOVA): 检验多个分类变量(自变量)与一个连续变量(因变量)的关系
export const anovaOptionSchema: FormSchema[] = [
  {
    field: 'field',
    component: 'Select',
    label: t('ml.eda.form.vis.anova.field'),
    componentProps: {
      allowClear: false,
      options: []
    }
  },
  {
    field: 'line',
    component: 'Switch',
    label: t('ml.eda.form.vis.anova.line')
  }
];

// Outlier Quantile options
export const outlierQtOptionSchema: FormSchema[] = [
  {
    field: 'method',
    component: 'Select',
    label: t('ml.eda.form.vis.outlier.method'),
    defaultValue: 'quantile',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Quantile', value: 'quantile' },
        { label: 'Zscore', value: 'zscore' },
        { label: 'COF', value: 'cof' },
        { label: 'iForest', value: 'iforest' },
        { label: 'KNN', value: 'knn' },
        { label: 'DBSCAN', value: 'dbscan' },
        { label: 'LOF', value: 'lof' },
        { label: 'SVM', value: 'svm' }
      ]
    }
  },
  {
    field: 'iqr',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.outlier.iqr'),
    defaultValue: 1.6,
    componentProps: {
      allowClear: false,
      min: 1.2,
      max: 2.5,
      step: 0.1
    }
  }
];

// Outlier Z-score options
export const outlierZsOptionSchema: FormSchema[] = [
  {
    field: 'method',
    component: 'Select',
    label: t('ml.eda.form.vis.outlier.method'),
    defaultValue: 'zscore',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Quantile', value: 'quantile' },
        { label: 'Zscore', value: 'zscore' },
        { label: 'COF', value: 'cof' },
        { label: 'iForest', value: 'iforest' },
        { label: 'KNN', value: 'knn' },
        { label: 'DBSCAN', value: 'dbscan' },
        { label: 'LOF', value: 'lof' },
        { label: 'SVM', value: 'svm' }
      ]
    }
  },
  {
    field: 'sigma',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.outlier.sigma'),
    defaultValue: 3,
    componentProps: {
      allowClear: false,
      min: 2,
      max: 4,
      step: 0.1
    }
  }
];

// Outlier Knn/LOF/DBSCAN options
export const outlierKnnOptionSchema: FormSchema[] = [
  {
    field: 'method',
    component: 'Select',
    label: t('ml.eda.form.vis.outlier.method'),
    defaultValue: 'lof',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Quantile', value: 'quantile' },
        { label: 'Zscore', value: 'zscore' },
        { label: 'COF', value: 'cof' },
        { label: 'iForest', value: 'iforest' },
        { label: 'KNN', value: 'knn' },
        { label: 'DBSCAN', value: 'dbscan' },
        { label: 'LOF', value: 'lof' },
        { label: 'SVM', value: 'svm' }
      ]
    }
  },
  {
    field: 'metric',
    component: 'Select',
    label: t('ml.eda.form.vis.outlier.metric'),
    defaultValue: 'euclidean',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Chebyshev', value: 'chebyshev' },
        { label: 'Correlation', value: 'correlation' },
        { label: 'Euclidean', value: 'euclidean' },
        { label: 'Hamming', value: 'hamming' },
        { label: 'Jaccard', value: 'jaccard' },
        { label: 'Minkowski', value: 'minkowski' }
      ]
    }
  },
  {
    field: 'umap',
    component: 'Switch',
    label: t('ml.eda.form.vis.outlier.umap')
  },
  {
    field: 'd3',
    component: 'Switch',
    label: t('ml.eda.form.vis.outlier.d3')
  },
];

// Outlier SVM options
export const outlierSvmOptionSchema: FormSchema[] = [
  {
    field: 'method',
    component: 'Select',
    label: t('ml.eda.form.vis.outlier.method'),
    defaultValue: 'svm',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Quantile', value: 'quantile' },
        { label: 'Zscore', value: 'zscore' },
        { label: 'COF', value: 'cof' },
        { label: 'iForest', value: 'iforest' },
        { label: 'KNN', value: 'knn' },
        { label: 'DBSCAN', value: 'dbscan' },
        { label: 'LOF', value: 'lof' },
        { label: 'SVM', value: 'svm' }
      ]
    }
  },
  {
    field: 'kernel',
    component: 'Select',
    label: t('ml.eda.form.vis.outlier.kernel'),
    defaultValue: 'rbf',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Linear', value: 'linear' },
        { label: 'Poly', value: 'poly' },
        { label: 'Rbf', value: 'rbf' },
        { label: 'Sigmoid', value: 'sigmoid' }
      ]
    }
  },
  {
    field: 'umap',
    component: 'Switch',
    label: t('ml.eda.form.vis.outlier.umap')
  },
  {
    field: 'd3',
    component: 'Switch',
    label: t('ml.eda.form.vis.outlier.d3')
  }
];

// histogram options
export const histOptionSchema: FormSchema[] = [
  {
    field: 'cf',
    component: 'Select',
    label: t('ml.eda.form.vis.hist.cat'),
    componentProps: {
      options: []
    }
  },
  {
    field: 'kde',
    component: 'Switch',
    label: t('ml.eda.form.vis.hist.kde')
  },
  {
    field: 'bins',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.hist.bins'),
    defaultValue: 30,
    componentProps: {
      allowClear: false,
      min: 10,
      max: 60,
      step: 10
    }
  }
];

// kde options

/*连续分布: 
正态分布（Normal ~, norm）
指数分布（Exponential ~, expon）
伽马分布（Gamma ~, gamma）
贝塔分布（Beta ~, beta）
卡方分布（Chi-Square ~, chi2）
t 分布（Student's ~, t）
F 分布（F ~, f）
威布尔分布（Weibull ~, weibull）
对数正太分布（Lognormal ~, lognorm）
均匀分布（Uniform ~, uniform）

离散分布
二项分布（Binomial ~, binom）
泊松分布（Poisson ~, poisson）
几何分布（Geometric ~, geom）
超几何分布（Hypergeometric ~, hypergeom）
负二项分布（Negative Binomial ~, nbinom）
多项分布（Multinomial ~, multinomial）
伯努利分布(Bernoulli DIstribition)
*/
export const kdeOptionSchema: FormSchema[] = [
  {
    field: 'combine',
    component: 'Switch',
    label: t('ml.eda.form.vis.kde.combine')
  },
  {
    field: 'rug',
    component: 'Switch',
    label: t('ml.eda.form.vis.kde.rug')
  },
  {
    field: 'ref',
    component: 'Select',
    label: t('ml.eda.form.vis.kde.ref'),
    defaultValue: 'norm',
    componentProps: {
      options: [
        { label: 'Normal', value: 'norm' },
        { label: 'Laplace', value: 'lap' },
        { label: 'Lognormal', value: 'log' },
        { label: 'Exponential', value: 'exp' },
        { label: 'Bernoulli', value: 'ber' },
        { label: 'Poisson', value: 'poisson' },
        { label: 'Binomial', value: 'bin' }
      ]
    }
  }
];

// frequency options
export const freqOptionSchema: FormSchema[] = [
  {
    field: 'pct',
    component: 'Switch',
    label: t('ml.eda.form.vis.freq.pct')
  },
  {
    field: 'funnel',
    component: 'Switch',
    label: t('ml.eda.form.vis.freq.funnel')
  }
];

// Scatter Matrix options
export const scatterMatrixOptionSchema: FormSchema[] = [
  {
    field: 'cf',
    component: 'Select',
    label: t('ml.eda.form.vis.scatters.cat'),
    componentProps: {
      options: []
    }
  }
];

// Single Scatter options
export const singleScatterOptionSchema: FormSchema[] = [
  {
    field: 'xf',
    component: 'Select',
    label: t('ml.eda.form.vis.scatter.xfield'),
    componentProps: {
      options: []
    }
  },
  {
    field: 'yf',
    component: 'Select',
    label: t('ml.eda.form.vis.scatter.yfield'),
    componentProps: {
      options: []
    }
  },
  {
    field: 'cf',
    component: 'Select',
    label: t('ml.eda.form.vis.scatter.cat'),
    componentProps: {
      options: []
    }
  },
  {
    field: 'marg',
    component: 'Select',
    label: t('ml.eda.form.vis.scatter.marg'),
    defaultValue: 'histogram',
    componentProps: {
      options: [
        { label: 'Histogram', value: 'histogram' },
        { label: 'Box', value: 'box' },
        { label: 'Violin', value: 'violin' },
        { label: 'Rug', value: 'rug' }
      ]
    }
  },
  {
    field: 'frac',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.scatter.frac'),
    componentProps: {
      min: 0,
      max: 1,
      step: 0.1
    }
  }
];

// pair plot options
export const pairOptionSchema: FormSchema[] = [
  {
    field: 'cf',
    component: 'Select',
    label: t('ml.eda.form.vis.pair.cat'),
    componentProps: {
      options: []
    }
  },
  {
    field: 'box',
    component: 'Switch',
    label: t('ml.eda.form.vis.pair.box')
  }
];


// ccm (Correlation Coefficient Matrix) options
//Pearson, Spearman (连续型 vs 连续型)
//Chi-squared Test, Mutual Info (类别型 vs 类别型)
//ANOVA(Analysis of variance, F Test), Kendall  (连续型 vs 类别型)
// F = MSB / MSW (组间均方 / 组内均方)
export const ccmOptionSchema: FormSchema[] = [
  {
    field: 'num',
    component: 'Switch',
    label: t('ml.eda.form.vis.ccm.num')
  },
  {
    field: 'coeff',
    component: 'Select',
    label: t('ml.eda.form.vis.ccm.coeff'),
    defaultValue: 'pearson',
    componentProps: {
      options: [
        { label: 'Pearson', value: 'pearson' },
        { label: 'Kendall', value: 'kendall' },
        { label: 'Spearman', value: 'spearman' }
      ]
    }
  }
];

// Parallel and Andrews curve options
export const curveOptionSchema: FormSchema[] = [
  {
    field: 'cf',
    component: 'Select',
    label: t('ml.eda.form.vis.curve.cat'),
    componentProps: {
      options: []
    }
  },
  {
    field: 'andrews',
    component: 'Switch',
    label: t('ml.eda.form.vis.curve.andrews')
  }
];

// PCA options
export const pcaOptionSchema: FormSchema[] = [
  {
    field: 'dim',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.pca.dim'),
    defaultValue: 2,
    componentProps: {
      allowClear: false,
      min: 0,
      max: 50,
      step: 1
    }
  },
  {
    field: 'kernel',
    component: 'Select',
    label: t('ml.eda.form.vis.pca.kernel'),
    defaultValue: 'linear',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'linear', value: 'linear' },
        { label: 'poly', value: 'poly' },
        { label: 'rbf', value: 'rbf' },
        { label: 'sigmoid', value: 'sigmoid' },
        { label: 'cosine', value: 'cosine' }
      ]
    }
  }
];

// LDA options
export const ldaOptionSchema: FormSchema[] = [
  {
    field: 'dim',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.lda.dim'),
    defaultValue: 2,
    componentProps: {
      allowClear: false,
      min: 0,
      max: 50,
      step: 1
    }
  }
];

// SVD options
export const svdOptionSchema: FormSchema[] = [
  {
    field: 'dim',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.svd.dim'),
    defaultValue: 2,
    componentProps: {
      allowClear: false,
      min: 0,
      max: 50,
      step: 1
    }
  }
];

// t-SNE options
export const tsneOptionSchema: FormSchema[] = [
  {
    field: 'dim',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.tsne.dim'),
    defaultValue: 2,
    componentProps: {
      allowClear: false,
      min: 0,
      max: 50,
      step: 1
    }
  },
  {
    field: 'perplex',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.tsne.perplex'),
    defaultValue: 30,
    componentProps: {
      allowClear: false,
      min: 5,
      max: 50,
      step: 1
    }
  }
];

// ISOMAP options
export const isomapOptionSchema: FormSchema[] = [
  {
    field: 'dim',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.isomap.dim'),
    defaultValue: 2,
    componentProps: {
      allowClear: false,
      min: 0,
      max: 50,
      step: 1
    }
  },
  {
    field: 'neighbor',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.isomap.neighbor'),
    defaultValue: 30,
    componentProps: {
      allowClear: false,
      min: 5,
      max: 50,
      step: 1
    }
  }
];

// LLE options
export const lleOptionSchema: FormSchema[] = [
  {
    field: 'dim',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.lle.dim'),
    defaultValue: 2,
    componentProps: {
      allowClear: false,
      min: 0,
      max: 50,
      step: 1
    }
  },
  {
    field: 'neighbor',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.lle.neighbor'),
    defaultValue: 30,
    componentProps: {
      allowClear: false,
      min: 5,
      max: 50,
      step: 1
    }
  },
  {
    field: 'method',
    component: 'Select',
    label: t('ml.eda.form.vis.lle.method'),
    defaultValue: 'standard',
    componentProps: {
      options: [
        { label: 'standard', value: 'standard' },
        { label: 'hessian', value: 'hessian' },
        { label: 'modified', value: 'modified' },
        { label: 'ltsa', value: 'ltsa' },
      ]
    }
  }
];

// feature corr filter options
export const featureFilterOptionSchema: FormSchema[] = [
  {
    field: 'method',
    component: 'Select',
    label: t('ml.eda.form.vis.ffilter.method'),
    defaultValue: 'f_test',
    componentProps: {
      options: [
        { label: 'Univariate F_test', value: 'f_test' },
        { label: 'Univariate Mutual Info', value: 'm_info' },
        { label: 'Univariate Chi2', value: 'chi2' }
      ]
    }
  },/*
  {
    field: 'mode',
    component: 'Select',
    label: t('ml.eda.form.vis.fimp.mode'),
    defaultValue: 'percentile',
    componentProps: {
      options: [
        { label: 'Percentile', value: 'percentile' },
        { label: 'K_best', value: 'k_best' },
        { label: 'Fpr', value: 'fpr' },
        { label: 'Fdr', value: 'fdr' },
        { label: 'Fwe', value: 'fwe' }
      ]
    }
  }*/
];

// feature model eval options
export const featureModelOptionSchema: FormSchema[] = [
  {
    field: 'model',
    component: 'Select',
    label: t('ml.eda.form.vis.fmodel.model'),
    defaultValue: 'linear',
    componentProps: {
      options: [
        { label: 'Linear', value: 'linear' },
        { label: 'Lasso', value: 'lasso' },
        { label: 'Random Forest', value: 'randomf' },
        { label: 'XGBoost', value: 'xgboost' }
      ]
    }
  },/*
  {
    field: 'mode',
    component: 'Select',
    label: t('ml.eda.form.vis.fimp.mode'),
    defaultValue: 'percentile',
    componentProps: {
      options: [
        { label: 'Percentile', value: 'percentile' },
        { label: 'K_best', value: 'k_best' },
        { label: 'Fpr', value: 'fpr' },
        { label: 'Fdr', value: 'fdr' },
        { label: 'Fwe', value: 'fwe' }
      ]
    }
  }*/
];

// feature Iterative Search options
export const featureSearchOptionSchema: FormSchema[] = [
  {
    field: 'method',
    component: 'Select',
    label: t('ml.eda.form.vis.fsearch.method'),
    defaultValue: 'rfe',
    componentProps: {
      options: [
        { label: 'Recursive ExtraTrees', value: 'rfe' },
        { label: 'Permuted HGBoost', value: 'permute' },
        { label: 'Null LightGBM', value: 'nullimp' },
      ]
    }
  },/*
  {
    field: 'mode',
    component: 'Select',
    label: t('ml.eda.form.vis.fimp.mode'),
    defaultValue: 'percentile',
    componentProps: {
      options: [
        { label: 'Percentile', value: 'percentile' },
        { label: 'K_best', value: 'k_best' },
        { label: 'Fpr', value: 'fpr' },
        { label: 'Fdr', value: 'fdr' },
        { label: 'Fwe', value: 'fwe' }
      ]
    }
  }*/
];

// Feature Auto Detection options
export const featureDetectOptionSchema: FormSchema[] = [
  {
    field: 'method',
    component: 'Select',
    label: t('ml.eda.form.vis.fdetect.method'),
    defaultValue: 'dfs',
    componentProps: {
      options: [
        { label: 'Deep Synthesis', value: 'dfs' },
        { label: 'SVM', value: 'svm' }
      ]
    }
  }
];

// ts Series options
export const tsSeriesOptionSchema: FormSchema[] = [
  {
    field: 'tf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsseries.tf'),
    componentProps: {
      allowClear: false,
      options: []
    }
  },
  {
    field: 'period',
    component: 'Select',
    label: t('ml.eda.form.vis.tsseries.period'),
    defaultValue: 'D',
    componentProps: {
      options: [
        { label: 'Year', value: 'YS' },
        { label: 'Quarater', value: 'QS' },
        { label: 'Month', value: 'MS' },
        { label: 'Week', value: 'W' },
        { label: 'Day', value: 'D' },
        { label: 'Hour', value: 'h' },
        { label: 'Minute', value: 'min' },
        { label: 'Second', value: 's' }
      ]
    }
  },
  {
    field: 'agg',
    component: 'Select',
    label: t('ml.eda.form.vis.tsseries.agg'),
    defaultValue: 'mean',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Mean', value: 'mean' },
        { label: 'Median', value: 'median' },
        { label: 'Sum', value: 'sum' },
        { label: 'Min', value: 'min' },
        { label: 'Max', value: 'max' },
        { label: 'Std Dev', value: 'std' },
        { label: 'Count', value: 'count' }
      ]
    }
  },
  {
    field: 'connected',
    component: 'Switch',
    label: t('ml.eda.form.vis.tsseries.connected')
  },
  {
    field: 'solo',
    component: 'Switch',
    label: t('ml.eda.form.vis.tsseries.solo')
  }
];

// ts Trend options
export const tsTrendOptionSchema: FormSchema[] = [
  {
    field: 'tf',
    component: 'Select',
    label: t('ml.eda.form.vis.tstrend.tf'),
    componentProps: {
      allowClear: false,
      options: []
    }
  },
  {
    field: 'period',
    component: 'Select',
    label: t('ml.eda.form.vis.tstrend.period'),
    defaultValue: 'D',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Year', value: 'YS' },
        { label: 'Quarater', value: 'QS' },
        { label: 'Month', value: 'MS' },
        { label: 'Week', value: 'W' },
        { label: 'Day', value: 'D' },
        { label: 'Hour', value: 'h' },
        { label: 'Minute', value: 'min' },
        { label: 'Second', value: 's' }
      ]
    }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tstrend.vf'),
    componentProps: {
      allowClear: false,
      options: []
    }
  },
  {
    field: 'agg',
    component: 'Select',
    label: t('ml.eda.form.vis.tstrend.agg'),
    defaultValue: 'mean',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Mean', value: 'mean' },
        { label: 'Median', value: 'median' },
        { label: 'Sum', value: 'sum' },
        { label: 'Min', value: 'min' },
        { label: 'Max', value: 'max' },
        { label: 'Std Dev', value: 'std' },
        { label: 'Count', value: 'count' }
      ]
    }
  },
  {
    field: 'frac',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.tstrend.frac'),
    defaultValue: 0.65,
    componentProps: {
      allowClear: false,
      min: 0,
      max: 1,
      step: 0.05
    }
  },
  {
    field: 'connected',
    component: 'Switch',
    label: t('ml.eda.form.vis.tsseries.connected')
  }
];

// ts Difference options
export const tsDiffOptionSchema: FormSchema[] = [
  {
    field: 'tf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsdiff.tf'),
    componentProps: {
      allowClear: false,
      options: []
    }
  },
  {
    field: 'period',
    component: 'Select',
    label: t('ml.eda.form.vis.tsdiff.period'),
    defaultValue: 'D',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Year', value: 'YS' },
        { label: 'Quarater', value: 'QS' },
        { label: 'Month', value: 'MS' },
        { label: 'Week', value: 'W' },
        { label: 'Day', value: 'D' },
        { label: 'Hour', value: 'h' },
        { label: 'Minute', value: 'min' },
        { label: 'Second', value: 's' }
      ]
    }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsdiff.vf'),
    componentProps: {
      options: []
    }
  },
  {
    field: 'agg',
    component: 'Select',
    label: t('ml.eda.form.vis.tsdiff.agg'),
    defaultValue: 'mean',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Mean', value: 'mean' },
        { label: 'Median', value: 'median' },
        { label: 'Sum', value: 'sum' },
        { label: 'Min', value: 'min' },
        { label: 'Max', value: 'max' },
        { label: 'Std Dev', value: 'std' },
        { label: 'Count', value: 'count' }
      ]
    }
  },
  {
    field: 'diff',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.tsdiff.diff'),
    defaultValue: 1,
    componentProps: {
      allowClear: false,
      min: 1,
      max: 100,
      step: 1
    }
  },
  {
    field: 'solo',
    component: 'Switch',
    label: t('ml.eda.form.vis.tsdiff.solo')
  }
];

// ts Freqence options
export const tsFreqOptionSchema: FormSchema[] = [
  {
    field: 'tf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsfreq.tf'),
    componentProps: {
      allowClear: false,
      options: []
    }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsfreq.vf'),
    componentProps: {
      allowClear: false,
      options: []
    }
  },
  {
    field: 'agg',
    component: 'Select',
    label: t('ml.eda.form.vis.tsfreq.agg'),
    defaultValue: 'mean',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Mean', value: 'mean' },
        { label: 'Median', value: 'median' },
        { label: 'Sum', value: 'sum' },
        { label: 'Min', value: 'min' },
        { label: 'Max', value: 'max' },
        { label: 'Std Dev', value: 'std' },
        { label: 'Count', value: 'count' }
      ]
    }
  }
];

// ts compare options
export const tsCompareOptionSchema: FormSchema[] = [
  {
    field: 'tf',
    component: 'Select',
    label: t('ml.eda.form.vis.tscompare.tf'),
    componentProps: {
      allowClear: false,
      options: []
    }
  },
  {
    field: 'period',
    component: 'Select',
    label: t('ml.eda.form.vis.tscompare.period'),
    defaultValue: 'd',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Year', value: 'Y' },
        { label: 'Quarater', value: 'q' },
        { label: 'Month', value: 'm' },
        { label: 'Week', value: 'w' },
        { label: 'Day', value: 'd' },
        { label: 'Hour', value: 'H' },
        { label: 'Minute', value: 'M' },
        { label: 'Second', value: 'S' }
      ]
    }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tscompare.vf'),
    componentProps: {
      allowClear: false,
      options: []
    }
  },
  {
    field: 'agg',
    component: 'Select',
    label: t('ml.eda.form.vis.tscompare.agg'),
    defaultValue: 'mean',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Mean', value: 'mean' },
        { label: 'Median', value: 'median' },
        { label: 'Sum', value: 'sum' },
        { label: 'Min', value: 'min' },
        { label: 'Max', value: 'max' },
        { label: 'Std Dev', value: 'std' },
        { label: 'Count', value: 'count' }
      ]
    }
  },
  {
    field: 'groupby',
    component: 'Select',
    label: t('ml.eda.form.vis.tscompare.groupby'),
    defaultValue: 'm',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Year', value: 'Y' },
        { label: 'Quarater', value: 'q' },
        { label: 'Month', value: 'm' },
        { label: 'Week', value: 'w' },
        { label: 'Day', value: 'd' },
        { label: 'Hour', value: 'H' },
        { label: 'Minute', value: 'M' },
        { label: 'Second', value: 'S' }
      ]
    }
  }
];

// ts ACF/PACF options
export const tsAcfOptionSchema: FormSchema[] = [
  {
    field: 'tf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsacf.tf'),
    componentProps: {
      allowClear: false,
      options: []
    }
  },
  {
    field: 'period',
    component: 'Select',
    label: t('ml.eda.form.vis.tsacf.period'),
    defaultValue: 'D',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Year', value: 'YS' },
        { label: 'Quarater', value: 'QS' },
        { label: 'Month', value: 'MS' },
        { label: 'Week', value: 'W' },
        { label: 'Day', value: 'D' },
        { label: 'Hour', value: 'h' },
        { label: 'Minute', value: 'min' },
        { label: 'Second', value: 's' }
      ]
    }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsacf.vf'),
    componentProps: {
      allowClear: false,
      options: []
    }
  },
  {
    field: 'agg',
    component: 'Select',
    label: t('ml.eda.form.vis.tsacf.agg'),
    defaultValue: 'mean',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Mean', value: 'mean' },
        { label: 'Median', value: 'median' },
        { label: 'Sum', value: 'sum' },
        { label: 'Min', value: 'min' },
        { label: 'Max', value: 'max' },
        { label: 'Std Dev', value: 'std' },
        { label: 'Count', value: 'count' }
      ]
    }
  },
  {
    field: 'lag',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.tsacf.lag'),
    defaultValue: 10,
    componentProps: {
      allowClear: false,
      min: 10,
      max: 100,
      step: 1
    }
  }
];

// ts Moving Average options
export const tsMavgOptionSchema: FormSchema[] = [
  {
    field: 'tf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsma.tf'),
    componentProps: {
      allowClear: false,
      options: []
    }
  },
  {
    field: 'period',
    component: 'Select',
    label: t('ml.eda.form.vis.tsma.period'),
    defaultValue: 'D',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Year', value: 'YS' },
        { label: 'Quarater', value: 'QS' },
        { label: 'Month', value: 'MS' },
        { label: 'Week', value: 'W' },
        { label: 'Day', value: 'D' },
        { label: 'Hour', value: 'h' },
        { label: 'Minute', value: 'min' },
        { label: 'Second', value: 's' }
      ]
    }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsma.vf'),
    componentProps: {
      allowClear: false,
      options: []
    }
  },
  {
    field: 'agg',
    component: 'Select',
    label: t('ml.eda.form.vis.tsma.agg'),
    defaultValue: 'mean',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Mean', value: 'mean' },
        { label: 'Median', value: 'median' },
        { label: 'Sum', value: 'sum' },
        { label: 'Min', value: 'min' },
        { label: 'Max', value: 'max' },
        { label: 'Std Dev', value: 'std' },
        { label: 'Count', value: 'count' }
      ]
    }
  },
  {
    field: 'win',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.tsma.win'),
    defaultValue: 3,
    componentProps: {
      allowClear: false,
      min: 1,
      max: 100,
      step: 1
    }
  }
];

// ts Box/Violin options
export const tsQuantileOptionSchema: FormSchema[] = [
  {
    field: 'tf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsbox.tf'),
    componentProps: {
      allowClear: false,
      options: []
    }
  },
  {
    field: 'period',
    component: 'Select',
    label: t('ml.eda.form.vis.tsbox.period'),
    defaultValue: 'D',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Year', value: 'Y' },
        { label: 'Quarater', value: 'Q' },
        { label: 'Month', value: 'M' },
        { label: 'Week', value: 'us' },
        { label: 'Day', value: 'D' },
        { label: 'Hour', value: 'H' },
        { label: 'Minute', value: 'min' },
        { label: 'Second', value: 's' }
      ]
    }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsbox.vf'),
    componentProps: {
      allowClear: false,
      options: []
    }
  },
  {
    field: 'violin',
    component: 'Switch',
    label: t('ml.eda.form.vis.tsbox.violin')
  }
];

// ts Cycle options
export const tsCycleOptionSchema: FormSchema[] = [
  {
    field: 'tf',
    component: 'Select',
    label: t('ml.eda.form.vis.tscycle.tf'),
    componentProps: {
      allowClear: false,
      options: []
    }
  },
  {
    field: 'period',
    component: 'Select',
    label: t('ml.eda.form.vis.tscycle.period'),
    defaultValue: 'D',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Year', value: 'YS' },
        { label: 'Quarater', value: 'QS' },
        { label: 'Month', value: 'MS' },
        { label: 'Week', value: 'W' },
        { label: 'Day', value: 'D' },
        { label: 'Hour', value: 'h' },
        { label: 'Minute', value: 'min' },
        { label: 'Second', value: 's' }
      ]
    }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tscycle.vf'),
    componentProps: {
      allowClear: false,
      options: []
    }
  },
  {
    field: 'agg',
    component: 'Select',
    label: t('ml.eda.form.vis.tscycle.agg'),
    defaultValue: 'mean',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Mean', value: 'mean' },
        { label: 'Median', value: 'median' },
        { label: 'Sum', value: 'sum' },
        { label: 'Min', value: 'min' },
        { label: 'Max', value: 'max' },
        { label: 'Std Dev', value: 'std' },
        { label: 'Count', value: 'count' }
      ]
    }
  },
  {
    field: 'algo',
    component: 'Select',
    label: t('ml.eda.form.vis.tscycle.algo'),
    defaultValue: 'psd',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Power spectral density', value: 'psd' },
      ]
    }
  }
];


// ts Decomposition options
export const tsDecompOptionSchema: FormSchema[] = [
  {
    field: 'tf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsdecomp.tf'),
    componentProps: {
      allowClear: false,
      options: []
    }
  },
  {
    field: 'period',
    component: 'Select',
    label: t('ml.eda.form.vis.tsdecomp.period'),
    defaultValue: 'D',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Year', value: 'YS' },
        { label: 'Quarater', value: 'QS' },
        { label: 'Month', value: 'MS' },
        { label: 'Week', value: 'W' },
        { label: 'Day', value: 'D' },
        { label: 'Hour', value: 'h' },
        { label: 'Minute', value: 'min' },
        { label: 'Second', value: 's' }
      ]
    }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsdecomp.vf'),
    componentProps: {
      allowClear: false,
      options: []
    }
  },
  {
    field: 'agg',
    component: 'Select',
    label: t('ml.eda.form.vis.tsdecomp.agg'),
    defaultValue: 'mean',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Mean', value: 'mean' },
        { label: 'Median', value: 'median' },
        { label: 'Sum', value: 'sum' },
        { label: 'Min', value: 'min' },
        { label: 'Max', value: 'max' },
        { label: 'Std Dev', value: 'std' },
        { label: 'Count', value: 'count' }
      ]
    }
  },
  {
    field: 'algo',
    component: 'Select',
    label: t('ml.eda.form.vis.tsdecomp.algo'),
    defaultValue: 'stl',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Seasonal-Trend decomp', value: 'stl' },
        { label: 'Additive', value: 'add' },
        { label: 'Multiplicative', value: 'multi' }
      ]
    }
  },
  {
    field: 'robust',
    component: 'Switch',
    label: t('ml.eda.form.vis.tsdecomp.robust')
  }
];

// ts prediction options
export const tsPredictOptionSchema: FormSchema[] = [
  {
    field: 'tf',
    component: 'Select',
    label: t('ml.eda.form.vis.tspredict.tf'),
    componentProps: {
      allowClear: false,
      options: []
    }
  },
  {
    field: 'period',
    component: 'Select',
    label: t('ml.eda.form.vis.tspredict.period'),
    defaultValue: 'D',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Year', value: 'YS' },
        { label: 'Quarater', value: 'QS' },
        { label: 'Month', value: 'MS' },
        { label: 'Week', value: 'W' },
        { label: 'Day', value: 'D' },
        { label: 'Hour', value: 'h' },
        { label: 'Minute', value: 'min' },
        { label: 'Second', value: 's' }
      ]
    }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tspredict.vf'),
    componentProps: {
      allowClear: false,
      options: []
    }
  },
  {
    field: 'agg',
    component: 'Select',
    label: t('ml.eda.form.vis.tspredict.agg'),
    defaultValue: 'mean',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Mean', value: 'mean' },
        { label: 'Median', value: 'median' },
        { label: 'Sum', value: 'sum' },
        { label: 'Min', value: 'min' },
        { label: 'Max', value: 'max' },
        { label: 'Std Dev', value: 'std' },
        { label: 'Count', value: 'count' }
      ]
    }
  },
  {
    field: 'algo',
    component: 'Select',
    label: t('ml.eda.form.vis.tspredict.algo'),
    defaultValue: 'ets',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Simple Exponential Smoothing', value: 'ses' },
        { label: 'Holt Linear Trend', value: 'holt' },
        { label: 'Holt-Winter', value: 'ets' },
        { label: 'Autoregressive Moving Average', value: 'arima' },
        { label: 'Auto ARIMA', value: 'autoarima' },
        { label: 'auto ETS', value: 'autoets' },
        { label: 'FB Prophet', value: 'fb' }
      ]
    }
  },
  {
    field: 'trend',
    component: 'Select',
    label: t('ml.eda.form.vis.tspredict.trend'),
    componentProps: {
      options: [
        { label: 'Additive', value: 'add' },
        { label: 'Multiplicative', value: 'mul' }
      ]
    }
  },
  {
    field: 'season',
    component: 'Select',
    label: t('ml.eda.form.vis.tspredict.season'),
    componentProps: {
      options: [
        { label: 'Additive', value: 'additive' },
        { label: 'Multiplicative', value: 'multiplicative' }
      ]
    }
  },
  {
    field: 'damped',
    component: 'Switch',
    label: t('ml.eda.form.vis.tspredict.damped')
  }
];


export const eda_cfg_default = {
  overall: { pid: 'stat' },
  box: { pid: 'stat', outlier: 'outliers' },
  violin: { pid: 'stat', box: true, outlier: 'outliers' },
  anova: { pid: 'stat' },
  outlier: { pid: 'stat', method: 'quantile' },

  hist: { pid: 'dist' },
  kde: { pid: 'dist', ref: 'norm' },
  ridge: { pid: 'dist' },
  freq: { pid: 'dist' },
  
  scatter: { pid: 'corr', marg: 'histogram' },
  scatters: { pid: 'corr' },
  pair: { pid: 'corr' },
  ccm: { pid: 'corr' },
  curve: { pid: 'corr' },

  pca: { pid: 'dim' },
  ica: { pid: 'dim' },
  svd: { pid: 'dim' },
  lda: { pid: 'dim' },
  isomap: { pid: 'dim' },
  tsne: { pid: 'dim' },
  lle: { pid: 'dim' },

  corrfilter: { pid: 'feature', method: 'f_test' },
  modeleval: { pid: 'feature', method: 'tree' },
  itersearch: { pid: 'feature', method: 'rfe' },
  autodetect: { pid: 'feature', method: 'dfs' },

  series: { pid: 'ts', period: 'D', agg: 'mean' },
  trend: { pid: 'ts', period: 'D', agg: 'mean' },
  diff: { pid: 'ts', period: 'D', agg: 'mean' },
  compare: { pid: 'ts', period: 'd', agg: 'mean', groupby: 'm'},
  mavg: { pid: 'ts', period: 'D', agg: 'mean'},
  tsfreq: { pid: 'ts', agg: 'mean' },
  autocorr: { pid: 'ts', period: 'D', agg: 'mean' },
  cycle: { pid: 'ts', period: 'D', agg: 'mean', algo: 'psd' },
  decomp: { pid: 'ts', period: 'D', agg: 'mean', algo: 'stl' },
  predict: { pid: 'ts', period: 'D', agg: 'mean', algo: 'ets' },
  quantile: { pid: 'ts', period: 'D', agg: 'mean' }
};

export const statSchemas: DescItem[] = [
  {
    field: 'max',
    label: t('ml.feature.tab.stat.max'),
  },
  {
    field: 'pct75',
    label: t('ml.feature.tab.stat.pct75'),
  },
  {
    field: 'mean',
    label: t('ml.feature.tab.stat.mean'),
  },
  {
    field: 'median',
    label: t('ml.feature.tab.stat.median'),
  },
  {
    field: 'pct25',
    label: t('ml.feature.tab.stat.pct25'),
  },
  {
    field: 'min',
    label: t('ml.feature.tab.stat.min'),
  },
  {
    field: 'std',
    label: t('ml.feature.tab.stat.std'),
  },
  {
    field: 'variance',
    label: t('ml.feature.tab.stat.variance'),
  },
];

export const filterModalSchemas: FormSchema[] = [
  {
    field: 'key',
    component: 'Input',
    required: true,
    label: '',
    colProps: { span: 24 },
    show: false,
  },
  {
    field: 'operator',
    label: t('dataviz.dataset.form.filter.operator'),
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: '>', value: '>' },
        { label: '>=', value: '>=' },
        { label: '<', value: '<' },
        { label: '<=', value: '<=' },
        { label: '=', value: '=' },
        { label: '!=', value: '!=' },
        { label: 'in', value: 'in' },
        { label: 'like', value: 'like' },
      ],
    },
    colProps: { span: 24 },
  },
  {
    field: 'value',
    component: 'Input',
    required: true,
    label: t('dataviz.dataset.form.filter.value'),
    colProps: { span: 24 },
  },
];


export const visCategories = [{
  id: 0,
  name: 'Statistics',
  icon: '/resource/img/ml-feature-stats.png'
}, {
  id: 1,
  name: 'Distribution',
  icon: '/resource/img/ml-feature-dists.png'
}, {
  id: 2,
  name: 'Comparation',
  icon: '/resource/img/ml-feature-comp.png'
}, {
  id: 3,
  name: 'Interation',
  icon: '/resource/img/ml-feature-inters.png'
}, {
  id: 4,
  name: 'Correlation',
  icon: '/resource/img/ml-feature-corr.png'
}, {
  id: 5,
  name: 'Feature Detection',
  icon: '/resource/img/ml-feature-curves.png'
}, {
  id: 6,
  name: 'Dim Reduction',
  icon: '/resource/img/ml-feature-reduction.png'
}, {
  id: 7,
  name: 'Time Series',
  icon: '/resource/img/ml-feature-trend.png'
}, {
  id: 8,
  name: 'One-One Scatter',
  icon: '/resource/img/ml-feature-scatter.png'
}];
