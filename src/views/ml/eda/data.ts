import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description/index';
import { useI18n } from '/@/hooks/web/useI18n';

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


// EDA vis options
// two level tree
export const edaVisTree = [
  {
    title: 'Statistics',
    key: 'stat',
    selectable: false,
    children: [
      {
        title: 'Overview',
        key: 'overview'
      },
      {
        title: 'Box Plot',
        key: 'box'
      },
      {
        title: 'Violin Plot',
        key: 'violin'
      },
      {
        title: 'Variance Analysis',
        key: 'anova'
      },
      {
        title: 'Outlier',
        key: 'outlier'
      }
    ]
  },
  {
    title: 'Distribution',
    key: 'dist',
    selectable: false,
    children: [
      {
        title: 'Histogram',
        key: 'hist'
      },
      {
        title: 'Kernel Density',
        key: 'kde'
      },
      {
        title: 'Ridge Plot',
        key: 'ridge'
      },
      {
        title: 'Data Volume',
        key: 'volume'
      }
    ]
  },
  {
    title: 'Correlation',
    key: 'corr',
    selectable: false,
    children: [
      {
        title: 'CORR Matrix',
        key: 'ccm'
      },
      {
        title: 'COV Matrix',
        key: 'cov'
      },
      {
        title: 'Scatter Matrix',
        key: 'scatters'
      },
      {
        title: 'Scatter Plot',
        key: 'scatter'
      },
      {
        title: 'Pairwise Plot',
        key: 'pair'
      },
      {
        title: 'Corr Curves',
        key: 'curve'
      }      
    ]
  },
  {
    title: 'Clustering',
    key: 'clustering',
    selectable: false,
    children: [
      {
        title: 'K-Means',
        key: 'kmeans'
      },
      {
        title: 'BIRCH',
        key: 'birch'
      },
      {
        title: 'DBSCAN',
        key: 'dbscan'
      },
      {
        title: 'CLIQUE',
        key: 'clique'
      }
    ]
  },
  {
    title: 'Feature Selection',
    key: 'selection',
    selectable: false,
    children: [
      {
        title: 'Corr Filter',
        key: 'corrfilter'
      },
      {
        title: 'Model Evaluation',
        key: 'modeleval'
      },
      {
        title: 'Iterative Search',
        key: 'itersearch'
      },
      {
        title: 'Auto Detection',
        key: 'autodetect'
      }
    ]
  },
  {
    title: 'Dim Reduction',
    key: 'reduction',
    selectable: false,
    children: [
      {
        title: 'PCA',
        key: 'pca'
      },
      {
        title: 'SVD',
        key: 'svd'
      },
      {
        title: 'LDA',
        key: 'lda'
      },
      {
        title: 'LLE',
        key: 'lle'
      },
      {
        title: 't-SNE',
        key: 'tsne'
      },
      {
        title: 'ISOMAP',
        key: 'isomap'
      }
    ]
  },
  {
    title: 'Time Series',
    key: 'ts',
    selectable: false,
    children: [
      {
        title: 'Series',
        key: 'series'
      },
      {
        title: 'Frequency',
        key: 'tsfreq'
      },
      {
        title: 'Trending',
        key: 'trend'
      },
      {
        title: 'Moving average',
        key: 'mavg'
      },
      {
        title: 'Quantile',
        key: 'quantile'
      },
      {
        title: 'Differencing',
        key: 'diff'
      },
      {
        title: 'Comparison',
        key: 'compare'
      },
      {
        title: 'Stationarity',
        key: 'autocorr'
      },
      {
        title: 'Periodicity',
        key: 'cycle'
      },
      {
        title: 'Decomposition',
        key: 'decomp'
      },
      {
        title: 'Prediction',
        key: 'predict'
      },
      {
        title: 'Anomaly detection',
        key: 'anomaly'
      },
      {
        title: 'Similarity detection',
        key: 'similarity'
      },
      {
        title: 'Noise Reduction',
        key: 'anc'
      }
    ]
  }
];


// stat box options
export const boxOptionSchema: FormSchema[] = [
  {
    field: 'cf',
    component: 'Select',
    label: t('ml.eda.form.vis.box.cat'),
    componentProps: {
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'sd',
    component: 'Switch',
    label: t('ml.eda.form.vis.box.sd'),
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'outlier',
    component: 'Switch',
    label: t('ml.eda.form.vis.box.outlier'),
    defaultValue: true,
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'box',
    component: 'Switch',
    label: t('ml.eda.form.vis.violin.box'),
    defaultValue: true,
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'outlier',
    component: 'Switch',
    label: t('ml.eda.form.vis.violin.outlier'),
    defaultValue: true,
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'order',
    component: 'Select',
    label: t('ml.eda.form.vis.anova.order'),
    componentProps: {
      allowClear: true,
      options: [
        { label: 'Mean', value: 'mean' },
        { label: 'StdDev', value: 'std' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'style',
    component: 'Select',
    label: t('ml.eda.form.vis.anova.style'),
    defaultValue: 'bar',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Bar', value: 'bar' },
        { label: 'Line', value: 'line' },
        { label: 'Scatter', value: 'scatter' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  }
];

// Outlier Quantile options
export const outlierQtMethodSchema: FormSchema[] = [
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
        { label: 'DBSCAN', value: 'dbscan' },
        { label: 'SVM', value: 'svm' },
        { label: 'KNN', value: 'knn' },
        { label: 'LOF', value: 'lof' },
        { label: 'COF', value: 'cof' },
        { label: 'iForest', value: 'iforest' },
        { label: 'SOM', value: 'som' },
        { label: 'AutoEncoder', value: 'vae' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  }
];

// Outlier Quantile options
export const outlierQtOptionSchema: FormSchema[] = [
  {
    field: 'threshold',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.outlier.iqr'),
    defaultValue: 1.6,
    componentProps: {
      allowClear: false,
      min: 1,
      max: 10,
      step: 0.1
    },
    labelWidth: 100,
    colProps: { span: 24 }
  }
];

// Outlier Z-score options
export const outlierZsOptionSchema: FormSchema[] = [
  {
    field: 'threshold',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.outlier.sigma'),
    defaultValue: 3,
    componentProps: {
      allowClear: false,
      min: 1,
      max: 5,
      step: 0.1
    },
    labelWidth: 100,
    colProps: { span: 24 }
  }
];

// DBSCAN options
export const outlierDbscanOptionSchema: FormSchema[] = [
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
        { label: 'Cosine', value: 'cosine'},
        { label: 'Euclidean', value: 'euclidean' },
        { label: 'Hamming', value: 'hamming' },
        { label: 'Jaccard', value: 'jaccard' },
        { label: 'Manhattan', value: 'manhattan'},
        { label: 'Minkowski', value: 'minkowski' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'threshold',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.outlier.radius'),
    defaultValue: 0.5,
    componentProps: {
      allowClear: false,
      min: 0.1,
      max: 50,
      step: 0.1
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'min_samples',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.outlier.min_samples'),
    defaultValue: 5,
    componentProps: {
      allowClear: false,
      min: 1,
      max: 50,
      step: 1
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'disp',
    component: 'Select',
    label: t('ml.eda.form.vis.outlier.disp'),
    defaultValue: 'pca',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'PCA', value: 'pca' },
        { label: 't-SNE', value: 'tsne' },
        { label: 'UMAP', value: 'umap' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'dim',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.outlier.dim'),
    defaultValue: 2,
    componentProps: {
      allowClear: false,
      min: 1,
      max: 8,
      step: 1
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'label',
    component: 'Select',
    label: t('ml.eda.form.vis.outlier.label'),
    componentProps: {
      allowClear: true,
      options: [
        { label: 'Index', value: 'index' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  }
];


// Outlier SVM options
export const outlierSvmOptionSchema: FormSchema[] = [
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'threshold',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.outlier.cont_ratio'),
    defaultValue: 0.03,
    componentProps: {
      allowClear: false,
      min: 0.0002,
      max: 0.5,
      step: 0.0002
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'disp',
    component: 'Select',
    label: t('ml.eda.form.vis.outlier.disp'),
    defaultValue: 'pca',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'PCA', value: 'pca' },
        { label: 't-SNE', value: 'tsne' },
        { label: 'UMAP', value: 'umap' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'dim',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.outlier.dim'),
    defaultValue: 2,
    componentProps: {
      allowClear: false,
      min: 1,
      max: 8,
      step: 1
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'label',
    component: 'Select',
    label: t('ml.eda.form.vis.outlier.label'),
    componentProps: {
      allowClear: true,
      options: [
        { label: 'Index', value: 'index' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  }
];

// Outlier Knn/LOF options
export const outlierKnnOptionSchema: FormSchema[] = [
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
        { label: 'Cosine', value: 'cosine'},
        { label: 'Euclidean', value: 'euclidean' },
        { label: 'Hamming', value: 'hamming' },
        { label: 'Jaccard', value: 'jaccard' },
        { label: 'Manhattan', value: 'manhattan'},
        { label: 'Minkowski', value: 'minkowski' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'threshold',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.outlier.cont_ratio'),
    defaultValue: 0.03,
    componentProps: {
      allowClear: false,
      min: 0.0002,
      max: 0.5,
      step: 0.0002
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'disp',
    component: 'Select',
    label: t('ml.eda.form.vis.outlier.disp'),
    defaultValue: 'pca',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'PCA', value: 'pca' },
        { label: 't-SNE', value: 'tsne' },
        { label: 'UMAP', value: 'umap' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'dim',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.outlier.dim'),
    defaultValue: 2,
    componentProps: {
      allowClear: false,
      min: 1,
      max: 8,
      step: 1
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'label',
    component: 'Select',
    label: t('ml.eda.form.vis.outlier.label'),
    componentProps: {
      allowClear: true,
      options: [
        { label: 'Index', value: 'index' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  }
];

// Outlier VAE options
export const outlierVaeOptionSchema: FormSchema[] = [
  {
    field: 'threshold',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.outlier.cont_ratio'),
    defaultValue: 0.03,
    componentProps: {
      allowClear: false,
      min: 0.0002,
      max: 0.5,
      step: 0.0002
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'batch',
    component: 'Select',
    label: t('ml.eda.form.vis.outlier.batch'),
    defaultValue: 16,
    componentProps: {
      allowClear: false,
      min: 2,
      max: 128,
      step: 4
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'epoch',
    component: 'Select',
    label: t('ml.eda.form.vis.outlier.epoch'),
    defaultValue: 10,
    componentProps: {
      allowClear: false,
      min: 2,
      max: 100,
      step: 1
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'disp',
    component: 'Select',
    label: t('ml.eda.form.vis.outlier.disp'),
    defaultValue: 'pca',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'PCA', value: 'pca' },
        { label: 't-SNE', value: 'tsne' },
        { label: 'UMAP', value: 'umap' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'dim',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.outlier.dim'),
    defaultValue: 2,
    componentProps: {
      allowClear: false,
      min: 1,
      max: 8,
      step: 1
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'label',
    component: 'Select',
    label: t('ml.eda.form.vis.outlier.label'),
    componentProps: {
      allowClear: true,
      options: [
        { label: 'Index', value: 'index' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  }
];

// Outlier COF/iForest/SOM
export const outlierCofOptionSchema: FormSchema[] = [
  {
    field: 'threshold',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.outlier.cont_ratio'),
    defaultValue: 0.03,
    componentProps: {
      allowClear: false,
      min: 0.0002,
      max: 0.5,
      step: 0.0002
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
        { label: 'Cosine', value: 'cosine'},
        { label: 'Euclidean', value: 'euclidean' },
        { label: 'Hamming', value: 'hamming' },
        { label: 'Jaccard', value: 'jaccard' },
        { label: 'Manhattan', value: 'manhattan'},
        { label: 'Minkowski', value: 'minkowski' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'disp',
    component: 'Select',
    label: t('ml.eda.form.vis.outlier.disp'),
    defaultValue: 'pca',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'PCA', value: 'pca' },
        { label: 't-SNE', value: 'tsne' },
        { label: 'UMAP', value: 'umap' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'dim',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.outlier.dim'),
    defaultValue: 2,
    componentProps: {
      allowClear: false,
      min: 1,
      max: 8,
      step: 1
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'label',
    component: 'Select',
    label: t('ml.eda.form.vis.outlier.label'),
    componentProps: {
      allowClear: true,
      options: [
        { label: 'Index', value: 'index' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'bins',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.hist.bins'),
    defaultValue: 30,
    componentProps: {
      allowClear: false,
      min: 5,
      max: 100,
      step: 5
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'kde',
    component: 'Switch',
    label: t('ml.eda.form.vis.hist.kde'),
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'combine',
    component: 'Switch',
    label: t('ml.eda.form.vis.kde.combine'),
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'rug',
    component: 'Switch',
    label: t('ml.eda.form.vis.kde.rug'),
    labelWidth: 100,
    colProps: { span: 24 }
  }
];

// data volume options
export const volumeOptionSchema: FormSchema[] = [
  {
    field: 'pct',
    component: 'Switch',
    label: t('ml.eda.form.vis.volume.pct'),
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'funnel',
    component: 'Switch',
    label: t('ml.eda.form.vis.volume.funnel'),
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'yf',
    component: 'Select',
    label: t('ml.eda.form.vis.scatter.yfield'),
    componentProps: {
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'cf',
    component: 'Select',
    label: t('ml.eda.form.vis.scatter.cat'),
    componentProps: {
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'frac',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.scatter.frac'),
    componentProps: {
      min: 0,
      max: 1,
      step: 0.1
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'xerror',
    component: 'Select',
    label: t('ml.eda.form.vis.scatter.xerror'),
    componentProps: {
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'yerror',
    component: 'Select',
    label: t('ml.eda.form.vis.scatter.yerror'),
    componentProps: {
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
];

// pair plot options
export const pairOptionSchema: FormSchema[] = [
  {
    field: 'cf',
    component: 'Select',
    label: t('ml.eda.form.vis.pair.cat'),
    componentProps: {
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'box',
    component: 'Switch',
    label: t('ml.eda.form.vis.pair.box'),
    labelWidth: 100,
    colProps: { span: 24 }
  }
];


// ccm (Correlation Coefficient Matrix) options
//Pearson, Spearman (连续型 vs 连续型)
//Chi-squared Test, Mutual Info (类别型 vs 类别型)
//ANOVA(Analysis of variance, F Test), Kendall  (连续型 vs 类别型)
// F = MSB / MSW (组间均方 / 组内均方)
export const ccmOptionSchema: FormSchema[] = [
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'num',
    component: 'Switch',
    label: t('ml.eda.form.vis.ccm.num'),
    defaultValue: true,
    labelWidth: 100,
    colProps: { span: 24 }
  }
];

// cov (Covariance Matrix) options
export const covOptionSchema: FormSchema[] = [
  {
    field: 'num',
    component: 'Switch',
    label: t('ml.eda.form.vis.ccm.num'),
    defaultValue: true,
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'andrews',
    component: 'Switch',
    label: t('ml.eda.form.vis.curve.andrews'),
    labelWidth: 100,
    colProps: { span: 24 }
  }
];

// Clustering K-Means options
export const clusKmeansOptionSchema: FormSchema[] = [
  {
    field: 'clusters',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.kmeans.clusters'),
    defaultValue: 2,
    componentProps: {
      allowClear: false,
      min: 1,
      max: 50,
      step: 1
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'iterations',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.kmeans.iterations'),
    defaultValue: 300,
    componentProps: {
      allowClear: false,
      min: 100,
      max: 1000,
      step: 50
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'tol',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.kmeans.tol'),
    defaultValue: 0.0001,
    componentProps: {
      allowClear: false,
      min: 0.00001,
      max: 0.1,
      step: 0.0001
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'disp',
    component: 'Select',
    label: t('ml.eda.form.vis.kmeans.disp'),
    defaultValue: 'pca',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'PCA', value: 'pca' },
        { label: 't-SNE', value: 'tsne' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'label',
    component: 'Select',
    label: t('ml.eda.form.vis.kmeans.label'),
    componentProps: {
      allowClear: true,
      options: [
        { label: 'Index', value: 'index' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'cluster',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.kmeans.cluster'),
    componentProps: {
      allowClear: true,
      min: 0,
      max: 50,
      step: 1
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'threshold',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.pca.threshold'),
    defaultValue: 0.95,
    componentProps: {
      allowClear: true,
      min: 0.5,
      max: 1,
      step: 0.001
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'label',
    component: 'Select',
    label: t('ml.eda.form.vis.pca.label'),
    defaultValue: 'index',
    componentProps: {
      allowClear: true,
      options: [
        { label: 'Index', value: 'index' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'metric',
    component: 'Select',
    label: t('ml.eda.form.vis.tsne.metric'),
    defaultValue: 'euclidean',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Chebyshev', value: 'chebyshev' },
        { label: 'Correlation', value: 'correlation' },
        { label: 'Euclidean', value: 'euclidean' },
        { label: 'Hamming', value: 'hamming' },
        { label: 'Jaccard', value: 'jaccard' },
        { label: 'Manhattan', value: 'manhattan'},
        { label: 'Minkowski', value: 'minkowski' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  }
];

// UMAP options
export const umapOptionSchema: FormSchema[] = [
  {
    field: 'dim',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.umap.dim'),
    defaultValue: 2,
    componentProps: {
      allowClear: false,
      min: 0,
      max: 50,
      step: 1
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'metric',
    component: 'Select',
    label: t('ml.eda.form.vis.umap.metric'),
    defaultValue: 'euclidean',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Chebyshev', value: 'chebyshev' },
        { label: 'Correlation', value: 'correlation' },
        { label: 'Euclidean', value: 'euclidean' },
        { label: 'Hamming', value: 'hamming' },
        { label: 'Jaccard', value: 'jaccard' },
        { label: 'Manhattan', value: 'manhattan'},
        { label: 'Minkowski', value: 'minkowski' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'neighbor',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.umap.neighbor'),
    defaultValue: 15,
    componentProps: {
      allowClear: false,
      min: 5,
      max: 50,
      step: 1
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'metric',
    component: 'Select',
    label: t('ml.eda.form.vis.isomap.metric'),
    defaultValue: 'minkowski',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Chebyshev', value: 'chebyshev' },
        { label: 'Correlation', value: 'correlation' },
        { label: 'Euclidean', value: 'euclidean' },
        { label: 'Hamming', value: 'hamming' },
        { label: 'Jaccard', value: 'jaccard' },
        { label: 'Manhattan', value: 'manhattan'},
        { label: 'Minkowski', value: 'minkowski' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
      allowClear: false,
      options: [
        { label: 'Deep Synthesis', value: 'dfs' },
        { label: 'TsFresh', value: 'tsfresh' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'period',
    component: 'Select',
    label: t('ml.eda.form.vis.tsseries.period'),
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsseries.vf'),
    componentProps: {
      allowClear: true,
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'cat',
    component: 'Select',
    label: t('ml.eda.form.vis.tsseries.cat'),
    componentProps: {
      allowClear: true,
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'page',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.tsseries.page'),
    defaultValue: 0,
    componentProps: {
      allowClear: false,
      min: 0,
      max: 100,
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'connected',
    component: 'Switch',
    defaultValue: true,
    label: t('ml.eda.form.vis.tsseries.connected'),
    labelWidth: 100,
    colProps: { span: 12 }
  },
  {
    field: 'solo',
    component: 'Switch',
    label: t('ml.eda.form.vis.tsseries.solo'),
    labelWidth: 100,
    colProps: { span: 12 }
  },
  {
    field: 'gap',
    component: 'Switch',
    label: t('ml.eda.form.vis.tsseries.gap'),
    labelWidth: 100,
    colProps: { span: 12 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tstrend.vf'),
    componentProps: {
      allowClear: false,
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'connected',
    component: 'Switch',
    label: t('ml.eda.form.vis.tsseries.connected'),
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsdiff.vf'),
    componentProps: {
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'step',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.tsdiff.step'),
    defaultValue: 1,
    componentProps: {
      allowClear: false,
      min: 1,
      max: 20,
      step: 1
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'solo',
    component: 'Switch',
    label: t('ml.eda.form.vis.tsdiff.solo'),
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsfreq.vf'),
    componentProps: {
      allowClear: false,
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tscompare.vf'),
    componentProps: {
      allowClear: false,
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsacf.vf'),
    componentProps: {
      allowClear: false,
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'period',
    component: 'Select',
    label: t('ml.eda.form.vis.tsma.period'),
    componentProps: {
      allowClear: true,
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsma.vf'),
    componentProps: {
      allowClear: false,
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
        { label: 'Week', value: 'W' },
        { label: 'Day', value: 'D' },
        { label: 'Hour', value: 'H' },
        { label: 'Minute', value: 'min' },
        { label: 'Second', value: 's' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsbox.vf'),
    componentProps: {
      allowClear: false,
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'violin',
    component: 'Switch',
    label: t('ml.eda.form.vis.tsbox.violin'),
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'period',
    component: 'Select',
    label: t('ml.eda.form.vis.tscycle.period'),
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tscycle.vf'),
    componentProps: {
      allowClear: false,
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    // doesn't support 'min' and 's'
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
        { label: 'Hour', value: 'h' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsdecomp.vf'),
    componentProps: {
      allowClear: false,
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'robust',
    component: 'Switch',
    label: t('ml.eda.form.vis.tsdecomp.robust'),
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tspredict.vf'),
    componentProps: {
      allowClear: false,
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'algo',
    component: 'Select',
    label: t('ml.eda.form.vis.tspredict.algo'),
    defaultValue: 'ets',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Holt Linear Trend', value: 'holt' },
        { label: 'Holt-Winter(ETS)', value: 'ets' },
        { label: 'ARIMA', value: 'arima' },
        { label: 'auto ETS', value: 'autoets' },
        { label: 'Prophet', value: 'prophet' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  }
];

// ts anomaly detection options
export const tsAnomalyOptionSchema: FormSchema[] = [
  {
    field: 'tf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsanomaly.tf'),
    componentProps: {
      allowClear: false,
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'period',
    component: 'Select',
    label: t('ml.eda.form.vis.tsanomaly.period'),
    componentProps: {
      allowClear: true,
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tsanomaly.vf'),
    componentProps: {
      allowClear: false,
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'agg',
    component: 'Select',
    label: t('ml.eda.form.vis.tsanomaly.agg'),
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'cat',
    component: 'Select',
    label: t('ml.eda.form.vis.tsanomaly.cat'),
    componentProps: {
      allowClear: true,
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'method',
    component: 'Select',
    label: t('ml.eda.form.vis.tsanomaly.algo'),
    defaultValue: 'zscore',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'Quantile', value: 'quantile' },
        { label: 'Zscore', value: 'zscore' },
        { label: 'Gaps', value: 'gaps' },
        { label: 'Difference', value: 'diff' },
        { label: 'Rolling StdD', value: 'rolling' },
        { label: 'DBSCAN', value: 'dbscan' },
        { label: 'COF', value: 'cof' },
        { label: 'AutoEncoder', value: 'vae' },
        { label: 'Deep iForest', value: 'dif' },
        { label: 'ECOD', value: 'ecod' },
        { label: 'Deep SVDD', value: 'dsvdd' },
        { label: 'AE1SVM', value: 'ae1svm' },
        { label: 'Ruptures', value: 'ruptures' },
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'threshold',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.tsanomaly.threshold'),
    defaultValue: 3,
    componentProps: {
      allowClear: false,
      min: 0.0,
      max: 10,
      step: 0.01
    },
    labelWidth: 100,
    colProps: { span: 24 }
  }
];

// Similarity detection
export const tsSimilarityOptionSchema: FormSchema[] = [
  {
    field: 'tf',
    component: 'Select',
    label: t('ml.eda.form.vis.tssim.tf'),
    componentProps: {
      allowClear: false,
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'period',
    component: 'Select',
    label: t('ml.eda.form.vis.tssim.period'),
    componentProps: {
      allowClear: true,
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tssim.vf'),
    componentProps: {
      allowClear: false,
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'agg',
    component: 'Select',
    label: t('ml.eda.form.vis.tssim.agg'),
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'cat',
    component: 'Select',
    label: t('ml.eda.form.vis.tsseries.cat'),
    componentProps: {
      allowClear: true,
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'method',
    component: 'Select',
    label: t('ml.eda.form.vis.tssim.algo'),
    defaultValue: 'kmeans',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'K-Means', value: 'kmeans' },
        { label: 'DBSCAN', value: 'dbscan' },
        { label: 'HDBSCAN', value: 'hdbscan' },
        { label: 'DWT', value: 'dwt' },
        { label: 'K-Shape', value: 'kshape' },
        { label: 'AutoEncoder', value: 'ae' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'clusters',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.tssim.clusters'),
    defaultValue: 2,
    componentProps: {
      allowClear: false,
      min: 2,
      max: 50,
      step: 1
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'page',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.tssim.page'),
    defaultValue: 0,
    componentProps: {
      allowClear: false,
      min: 0,
      max: 100,
    },
    labelWidth: 100,
    colProps: { span: 24 }
  }
];

// ts active noice reduction(ANC) options
export const tsAncOptionSchema: FormSchema[] = [
  {
    field: 'tf',
    component: 'Select',
    label: t('ml.eda.form.vis.tspredict.tf'),
    componentProps: {
      allowClear: false,
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'period',
    component: 'Select',
    label: t('ml.eda.form.vis.tspredict.period'),
    componentProps: {
      allowClear: true,
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'vf',
    component: 'Select',
    label: t('ml.eda.form.vis.tspredict.vf'),
    componentProps: {
      allowClear: false,
      options: []
    },
    labelWidth: 100,
    colProps: { span: 24 }
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
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'method',
    component: 'Select',
    label: t('ml.eda.form.vis.tspredict.algo'),
    defaultValue: 'fft',
    componentProps: {
      allowClear: false,
      options: [
        { label: 'FFT', value: 'fft' }
      ]
    },
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'threshold',
    component: 'InputNumber',
    label: t('ml.eda.form.vis.outlier.threshold'),
    defaultValue: 3,
    componentProps: {
      allowClear: false,
      min: 0.0,
      max: 10,
      step: 0.01
    },
    labelWidth: 100,
    colProps: { span: 24 }
  }
];



export const eda_cfg_default = {
  overview: { pid: 'stat' },
  box: { pid: 'stat', outlier: 'outliers' },
  violin: { pid: 'stat', box: true, outlier: 'outliers' },
  anova: { pid: 'stat' },
  outlier: { pid: 'stat', method: 'quantile' },

  hist: { pid: 'dist' },
  kde: { pid: 'dist', ref: 'norm' },
  ridge: { pid: 'dist' },
  volume: { pid: 'dist' },
  
  scatter: { pid: 'corr', marg: 'histogram' },
  scatters: { pid: 'corr' },
  pair: { pid: 'corr' },
  ccm: { pid: 'corr', num: true },
  cov: { pid: 'corr', num: true },
  curve: { pid: 'corr' },

  kmeans: { pid: 'clustering' },
  dbscan: { pid: 'clustering' },

  pca: { pid: 'dim', threshold: 0.95 },
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

  series: { pid: 'ts', agg: 'mean' },
  trend: { pid: 'ts', period: 'D', agg: 'mean' },
  diff: { pid: 'ts', period: 'D', agg: 'mean' },
  compare: { pid: 'ts', period: 'd', agg: 'mean', groupby: 'm'},
  mavg: { pid: 'ts', agg: 'mean'},
  tsfreq: { pid: 'ts', agg: 'mean' },
  autocorr: { pid: 'ts', period: 'D', agg: 'mean' },
  cycle: { pid: 'ts', agg: 'mean', algo: 'psd' },
  decomp: { pid: 'ts', period: 'D', agg: 'mean', algo: 'stl' },
  predict: { pid: 'ts', period: 'D', agg: 'mean', algo: 'ets' },
  anomaly: { pid: 'ts', agg: 'mean', method: 'zscore' },
  similarity: { pid: 'ts', agg: 'mean', method: 'kmeans' },
  anc: { pid: 'ts', agg: 'mean', method: 'fft' },
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

