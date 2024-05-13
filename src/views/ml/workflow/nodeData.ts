import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

// attribute form - source/dataset
export const formSourceDataset: FormSchema[] = [
  {
    field: 'pub',
    label: t('ml.workflow.form.source.dataset.pub'),
    component: 'Switch'
  },
  {
    field: 'dataset',
    label: '',
    component: 'Input',
    slot: 'dataset'
  }
];

// attribute form - processing/Clean(miss, outlier, duplication)
// PyCaret (numeric_imputation, categorical_imputation)
// feature_engine
// slik-wrangler
export const formProcClean: FormSchema[] = [
  {
    field: 'miss',
    label: t('ml.workflow.form.proc.clean.miss.title'),
    component: 'Select',
    defaultValue: 'drop',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.proc.clean.miss.drop'),
          value: 'drop'
        },
        {
          label: t('ml.workflow.form.proc.clean.miss.fillmean'),
          value: 'fillmean'
        },
        {
          label: t('ml.workflow.form.proc.clean.miss.fillmedian'),
          value: 'fillmedian'
        },
        {
          label: t('ml.workflow.form.proc.clean.miss.fillprev'),
          value: 'fillprev'
        },
        {
          label: t('ml.workflow.form.proc.clean.miss.fillnext'),
          value: 'fillnext'
        }
      ]
    }
  },
  {
    field: 'duplicate',
    label: t('ml.workflow.form.proc.clean.duplicate.title'),
    component: 'Select',
    defaultValue: 'drop',
    componentProps: {
      options: [
        {
          label: t('ml.workflow.form.proc.clean.duplicate.drop'),
          value: 'drop'
        }
      ]
    }
  },
  {
    field: 'outlier',
    label: t('ml.workflow.form.proc.clean.outlier.title'),
    component: 'Select',
    componentProps: {
      options: [
        {
          label: t('ml.workflow.form.proc.clean.outlier.drop'),
          value: 'drop'
        },
        {
          label: t('ml.workflow.form.proc.clean.outlier.fillmean'),
          value: 'fillmean'
        },
        {
          label: t('ml.workflow.form.proc.clean.outlier.fillmedian'),
          value: 'fillmedian'
        }
      ]
    }
  }
];

export const procCleanDefault = {
  miss: 'drop',
  duplicate: 'drop',
  outlier: undefined
};

// attribute form - processing/Transform(math, bin, split, date)
export const formProcTransform: FormSchema[] = [
  {
    field: 'trans',
    label: '',
    component: 'Input',
    slot: 'trans'
  },
  {
    field: 'sf',
    label: t('ml.workflow.form.proc.transform.sourcefield'),
    component: 'Input',
    required: true,
    componentProps: {
      allowClear: false
    }
  },
  {
    field: 'method',
    label: t('ml.workflow.form.proc.transform.method.title'),
    component: 'Select',
    defaultValue: 'split',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.proc.transform.method.math'),
          value: 'math'
        },
        {
          label: t('ml.workflow.form.proc.transform.method.bin'),
          value: 'bin'
        },
        {
          label: t('ml.workflow.form.proc.transform.method.split'),
          value: 'split'
        },
        {
          label: t('ml.workflow.form.proc.transform.method.datetime'),
          value: 'datetime'
        }
      ]
    }
  },
  {
    field: 'param',
    label: t('ml.workflow.form.proc.transform.param'),
    component: 'Input',
    required: true,
    componentProps: {
      allowClear: false
    }
  },
  {
    field: 'tf',
    label: t('ml.workflow.form.proc.transform.targetfield'),
    component: 'Input'
  }
];


// attribute form - processing/encode
// PyCaret(onehot:categorical_features; ordinal_features, high-cardinality-Features, high_cardinality_method)
export const formProcEncode: FormSchema[] = [
  {
    field: 'encode',
    label: '',
    component: 'Input',
    slot: 'encode'
  },
  {
    field: 'sf',
    label: t('ml.workflow.form.proc.encode.sourcefield'),
    required: true,
    component: 'Input'
  },
  {
    field: 'method',
    label: t('ml.workflow.form.proc.encode.method.title'),
    component: 'Select',
    defaultValue: 'ordinal',
    componentProps: {
      allowClear: false,
      options: [
        {
          // PyCaret/categorical_features
          // category to binary (如无序类别变量，国家，颜色，)
          // 对于决策树模型，并不推荐使用独热编码
          label: t('ml.workflow.form.proc.encode.method.onehot'),
          value: 'onehot'
        },
        {
          // PyCaret/ordinal_features
          // category to number(如有序类别变量，年级，职级)
          label: t('ml.workflow.form.proc.encode.method.ordinal'),
          value: 'ordinal'
        },
        {
          // PyCaret/high-cardinality-Features and high_cardinality_method
          // 定性特征的基数（cardinality）指的是这个定性特征所有可能的不同值的数量。
          // 高基数定性特征如，IP地址、电子邮件域名、城市名、家庭住址、街道、产品号码
          label: t('ml.workflow.form.proc.encode.method.cardinality'),
          value: 'cardinality'
        },
        {
          // 二进制编码，如性别
          label: t('ml.workflow.form.proc.encode.method.binary'),
          value: 'binary'
        },
        {
          label: t('ml.workflow.form.proc.encode.method.hash'),
          value: 'hash'
        },
        {
          // 目标编码（target encoding），亦称均值编码（mean encoding）
          // 是一种能够对高基数（high cardinality）自变量进行编码的方法
          label: t('ml.workflow.form.proc.encode.method.mean'),
          value: 'mean'
        },
        {
          // sin, cos
          label: t('ml.workflow.form.proc.encode.method.cycle'),
          value: 'cycle'
        },
        {
          // Weight of Evidence Encoding(证据权重,适用于二分类任务,逻辑回归)
          label: t('ml.workflow.form.proc.encode.method.woe'),
          value: 'woe'
        },
        {
          // Leave-one-out
          label: t('ml.workflow.form.proc.encode.method.loo'),
          value: 'loo'
        },
        {
          // GBDT模型中只有LGBM和CatBoost自带类别编码。LGBM采用的是GS编码（Gradient Statistics）
          // GS编码比独热编码快大概8倍速度
          label: t('ml.workflow.form.proc.encode.method.gs'),
          value: 'gs'
        },
        {
          // CatBoostEncoder(Ordered TS编码)
          // TS省空间和速度快
          label: t('ml.workflow.form.proc.encode.method.ts'),
          value: 'ts'
        }
      ]
    }
  },
  {
    field: 'param',
    label: t('ml.workflow.form.proc.encode.param'),
    component: 'Input'
  }
];

// attribute form - processing/scale
export const formProcScale: FormSchema[] = [
  {
    field: 'scale',
    label: '',
    component: 'Input',
    slot: 'scale'
  },
  {
    field: 'sf',
    label: t('ml.workflow.form.proc.scale.sourcefield'),
    component: 'Input'
  },
  {
    field: 'method',
    label: t('ml.workflow.form.proc.scale.method.title'),
    component: 'Select',
    defaultValue: 'minmax',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.proc.scale.method.minmax'),
          value: 'minmax'
        },
        {
          label: t('ml.workflow.form.proc.scale.method.std'),
          value: 'std'
        },
        {
          label: t('ml.workflow.form.proc.scale.method.l1'),
          value: 'l1'
        },
        {
          label: t('ml.workflow.form.proc.scale.method.l2'),
          value: 'l2'
        },
        {
          label: t('ml.workflow.form.proc.scale.method.robust'),
          value: 'robust'
        }
      ]
    }
  },
  {
    field: 'param',
    label: t('ml.workflow.form.proc.scale.param'),
    component: 'Input'
  }
];

// attribute form - feature/extraction
// generate new features from orginal features
export const formFeExtractCaret: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.fe.extract.method.title'),
    component: 'Select',
    defaultValue: 'pycaret',
    componentProps: {
      allowClear: false,
      options: [
        {
          // feature_interaction/feature_ratio 
          // polynomial_features/polynomial_degree/polynomial_threshold
          // trigonometry_features/polynomial_degree 
          // group_features/group_names
          // bin_numeric_features
          // combine_rare_levels/rare_level_threshold
          label: t('ml.workflow.form.fe.extract.method.pycaret'),
          value: 'pycaret'
        },
        {
          // featuretools/Deep Feature Synthesis
          label: t('ml.workflow.form.fe.extract.method.dfs'),
          value: 'dfs'
        },
        {
          // https://github.com/IIIS-Li-Group/OpenFE?tab=readme-ov-file
          label: t('ml.workflow.form.fe.extract.method.openfe'),
          value: 'openfe'
        },
        {
          // for time series
          label: t('ml.workflow.form.fe.extract.method.tsfresh'),
          value: 'tsfresh'
        }
      ]
    }
  },
  {
    field: 'feature_ratio',
    label: t('ml.workflow.form.fe.extract.caret.feature_ratio'),
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      min: 0,
      max: 5
    },
  },
  {
    field: 'polynomial_degree',
    label: t('ml.workflow.form.fe.extract.caret.polynomial_degree'),
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      min: 0,
      max: 5
    },
  },
  {
    field: 'polynomial_threshold',
    label: t('ml.workflow.form.fe.extract.caret.polynomial_threshold'),
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      min: 0,
      max: 5
    },
  },
  {
    field: 'group_names',
    label: t('ml.workflow.form.fe.extract.caret.group_names'),
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      min: 0,
      max: 5
    },
  },
  {
    field: 'bin_numeric_features',
    label: t('ml.workflow.form.fe.extract.caret.bin_numeric_features'),
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      min: 0,
      max: 5
    },
  },
  {
    field: 'combine_rare_levels',
    label: t('ml.workflow.form.fe.extract.caret.combine_rare_levels'),
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      min: 0,
      max: 5
    },
  },
  {
    field: 'rare_level_threshold',
    label: t('ml.workflow.form.fe.extract.caret.rare_level_threshold'),
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      min: 0,
      max: 5
    },
  }
];

const feExCaretDefault = {
  method: 'pycaret',
  feature_ratio: 1,
  polynomial_degree: 1,
  polynomial_threshold: 1,
  group_names: 1,
  bin_numeric_features: 1,
  combine_rare_levels: 1,
  rare_level_threshold: 1
};

// attribute form - feature/extraction
// generate new features from orginal features
export const formFeExtractDfs: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.fe.extract.method.title'),
    component: 'Select',
    defaultValue: 'dfs',
    componentProps: {
      allowClear: false,
      options: [
        {
          // feature_interaction/feature_ratio 
          // polynomial_features/polynomial_degree/polynomial_threshold
          // trigonometry_features/polynomial_degree 
          // group_features/group_names
          // bin_numeric_features
          // combine_rare_levels/rare_level_threshold
          label: t('ml.workflow.form.fe.extract.method.pycaret'),
          value: 'pycaret'
        },
        {
          // featuretools/Deep Feature Synthesis
          label: t('ml.workflow.form.fe.extract.method.dfs'),
          value: 'dfs'
        },
        {
          // https://github.com/IIIS-Li-Group/OpenFE?tab=readme-ov-file
          label: t('ml.workflow.form.fe.extract.method.openfe'),
          value: 'openfe'
        },
        {
          // for time series
          label: t('ml.workflow.form.fe.extract.method.tsfresh'),
          value: 'tsfresh'
        }
      ]
    }
  },
  {
    field: 'max_depth',
    label: t('ml.workflow.form.fe.extract.dfs.max_depth'),
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      min: 0,
      max: 5
    },
  },
  {
    field: 'agg_primitives',
    label: t('ml.workflow.form.fe.extract.dfs.aggprim.title'),
    component: 'Select',
    componentProps: {
      mode: 'multiple',
      options: [
        {
          // first, last
          label: t('ml.workflow.form.fe.extract.dfs.aggprim.fist_last'),
          value: 'fist_last'
        },
        {
          // min, max
          label: t('ml.workflow.form.fe.extract.dfs.aggprim.min_max'),
          value: 'min_max'
        },
        {
          // mean, median, mode
          label: t('ml.workflow.form.fe.extract.dfs.aggprim.mean'),
          value: 'mean'
        },
        {
          // count, sum
          label: t('ml.workflow.form.fe.extract.dfs.aggprim.sum'),
          value: 'sum'
        },
        {
          // std, skew
          label: t('ml.workflow.form.fe.extract.dfs.aggprim.stat'),
          value: 'stat'
        },
        {
          // any, all
          label: t('ml.workflow.form.fe.extract.dfs.aggprim.bool'),
          value: 'bool'
        },
        {
          // num_true, percent_true
          label: t('ml.workflow.form.fe.extract.dfs.aggprim.num_true'),
          value: 'num_true'
        },
        {
          label: t('ml.workflow.form.fe.extract.dfs.aggprim.entropy'),
          value: 'entropy'
        },
        {
          label: t('ml.workflow.form.fe.extract.dfs.aggprim.num_unique'),
          value: 'num_unique'
        }
      ]
    }
  },
  {
    field: 'trans_primitives',
    label: t('ml.workflow.form.fe.extract.dfs.transprim.title'),
    component: 'Select',
    componentProps: {
      mode: 'multiple',
      options: [
        {
          // add_numeric, subtract_numreic, multiply_numeric, divide_numeric
          label: t('ml.workflow.form.fe.extract.dfs.transprim.arithmetic'),
          value: 'arithmetic'
        },
        {
          // cum_min, cum_max, cum_count, cum_sum
          label: t('ml.workflow.form.fe.extract.dfs.transprim.cumulative'),
          value: 'cumulative'
        },
        {
          // sine, consine, tangent, 
          label: t('ml.workflow.form.fe.extract.dfs.transprim.trigonometric'),
          value: 'trigonometric'
        },
        {
          // and, or, not, equal, not_equal, multiply_boolean
          label: t('ml.workflow.form.fe.extract.dfs.transprim.bool'),
          value: 'divide_numeric'
        },
        {
          // square_root, natural_logarithm
          label: t('ml.workflow.form.fe.extract.dfs.transprim.adv_math'),
          value: 'adv_math'
        },
        {
          // negate, absolute,
          label: t('ml.workflow.form.fe.extract.dfs.transprim.negitive'),
          value: 'negitive'
        },
        {
          // diff
          label: t('ml.workflow.form.fe.extract.dfs.transprim.diff'),
          value: 'count'
        },
        {
          // is_weekend, date_to_holiday, time_since, is_federal_holiday
          label: t('ml.workflow.form.fe.extract.dfs.transprim.timeseries'),
          value: 'timeseries'
        },
        {
          // rolling_std, rolling_max, rolling_min
          label: t('ml.workflow.form.fe.extract.dfs.transprim.rolling'),
          value: 'rolling'
        },
        {
          label: t('ml.workflow.form.fe.extract.dfs.transprim.all'),
          value: 'all'
        }
      ]
    }
  }
];


const feExDfsDefault = {
  method: 'dfs',
  max_depth: 1,
  agg_primitives: [],
  trans_primitives: []
};

// attribute form - feature/extraction
// generate new features from orginal features
export const formFeExtractOpenfe: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.fe.extract.method.title'),
    component: 'Select',
    defaultValue: 'openfe',
    componentProps: {
      allowClear: false,
      options: [
        {
          // feature_interaction/feature_ratio 
          // polynomial_features/polynomial_degree/polynomial_threshold
          // trigonometry_features/polynomial_degree 
          // group_features/group_names
          // bin_numeric_features
          // combine_rare_levels/rare_level_threshold
          label: t('ml.workflow.form.fe.extract.method.pycaret'),
          value: 'pycaret'
        },
        {
          // featuretools/Deep Feature Synthesis
          label: t('ml.workflow.form.fe.extract.method.dfs'),
          value: 'dfs'
        },
        {
          // https://github.com/IIIS-Li-Group/OpenFE?tab=readme-ov-file
          label: t('ml.workflow.form.fe.extract.method.openfe'),
          value: 'openfe'
        },
        {
          // for time series
          label: t('ml.workflow.form.fe.extract.method.tsfresh'),
          value: 'tsfresh'
        }
      ]
    }
  },
  {
    field: 'feature_boosting',
    label: t('ml.workflow.form.fe.extract.openfe.boosting'),
    component: 'Switch'
  },
  {
    field: 'seed',
    label: t('ml.workflow.form.fe.extract.openfe.seed'),
    component: 'InputNumber',
    defaultValue: 123,
    componentProps: {
      min: 0,
      max: 255
    },
  },
  {
    field: 'stage1_metric',
    label: t('ml.workflow.form.fe.extract.openfe.metric1.title'),
    component: 'Select',
    defaultValue: 'predictive',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.fe.extract.openfe.metric1.predictive'),
          value: 'predictive'
        },
        {
          label: t('ml.workflow.form.fe.extract.openfe.metric1.corr'),
          value: 'corr'
        },
        {
          label: t('ml.workflow.form.fe.extract.openfe.metric1.mi'),
          value: 'mi'
        }
      ]
    }
  },
  {
    field: 'stage2_metric',
    label: t('ml.workflow.form.fe.extract.openfe.metric2.title'),
    component: 'Select',
    defaultValue: 'gain_importance',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.fe.extract.openfe.metric2.gain_importance'),
          value: 'gain_importance'
        },
        {
          label: t('ml.workflow.form.fe.extract.openfe.metric2.permutation'),
          value: 'permutation'
        }
      ]
    }
  },
  {
    field: 'metric',
    label: t('ml.workflow.form.fe.extract.openfe.metric.title'),
    component: 'Select',
    defaultValue: 'binary_logloss',
    componentProps: {
      allowClear: false,
      options: [
        {
          // for binary-classification
          label: t('ml.workflow.form.fe.extract.openfe.metric.binary_logloss'),
          value: 'binary_logloss'
        },
        {
          // for multi-classification
          label: t('ml.workflow.form.fe.extract.openfe.metric.multi_logloss'),
          value: 'multi_logloss'
        },
        {
          label: t('ml.workflow.form.fe.extract.openfe.metric.auc'),
          value: 'auc'
        },
        { // for regression
          label: t('ml.workflow.form.fe.extract.openfe.metric.rmse'),
          value: 'rmse'
        }
      ]
    }
  }
];

const feExFeDefault = {
  method: 'openfe',
  feature_boosting: false,
  seed: 123,
  stage1_metric: 'predictive',
  stage2_metric: 'gain_importance',
  metric: 'binary_logloss'
};

// attribute form - feature/extraction
// generate new features from orginal features
export const formFeExtractTsfresh: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.fe.extract.method.title'),
    component: 'Select',
    defaultValue: 'tsfresh',
    componentProps: {
      allowClear: false,
      options: [
        {
          // feature_interaction/feature_ratio 
          // polynomial_features/polynomial_degree/polynomial_threshold
          // trigonometry_features/polynomial_degree 
          // group_features/group_names
          // bin_numeric_features
          // combine_rare_levels/rare_level_threshold
          label: t('ml.workflow.form.fe.extract.method.pycaret'),
          value: 'pycaret'
        },
        {
          // featuretools/Deep Feature Synthesis
          label: t('ml.workflow.form.fe.extract.method.dfs'),
          value: 'dfs'
        },
        {
          // https://github.com/IIIS-Li-Group/OpenFE?tab=readme-ov-file
          label: t('ml.workflow.form.fe.extract.method.openfe'),
          value: 'openfe'
        },
        {
          // for time series
          label: t('ml.workflow.form.fe.extract.method.tsfresh'),
          value: 'tsfresh'
        }
      ]
    }
  },
  {
    field: 'level',
    label: t('ml.workflow.form.fe.extract.fresh.level.title'),
    component: 'Select',
    defaultValue: 'middle',
    componentProps: {
      allowClear: false,
      options: [
        {
          // MinimalFCParameters
          label: t('ml.workflow.form.fe.extract.fresh.level.low'),
          value: 'low'
        },
        {
          // EfficientFCParameters
          label: t('ml.workflow.form.fe.extract.fresh.level.middle'),
          value: 'middle'
        },
        {
          // ComprehensiveFCParameters
          label: t('ml.workflow.form.fe.extract.fresh.level.high'),
          value: 'high'
        }
      ]
    }
  }
];


const feExTsDefault = {
  method: 'openfe',
  level: 1
};


export const feExtractDefault = {
  pycaret: feExCaretDefault,
  dfs: feExDfsDefault,
  openfe: feExFeDefault,
  tsfresh: feExTsDefault
};

// attribute form - feature/Selection
// select most important sub features
// AutoFeatureSelect
// https://github.com/dorukcanga/AutoFeatSelect
// LightGBM Feature Importance Scores
// XGBoost Feature Importance Scores (with Target Encoding for Categorical Variables)
// Random Forest Feature Importance Scores (with Target Encoding for Categorical Variables)
// LassoCV Coefficients (with One Hot Encoding for Categorical Variables)
// Permutation Importance Scores (LightGBM as the estimator)
// RFECV Rankings (LightGBM as the estimator)
// Boruta Rankings (Random Forest as the estimator)
export const formFeSelectCaret: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.fe.select.method.title'),
    component: 'Select',
    defaultValue: 'pycaret',
    componentProps: {
      allowClear: false,
      options: [
        {
          // feature_selection/feature_selection_threshold
          // remove_multicollinearcity/multicollinearity_threshold
          // pca/pca_method(linear, kernel, incremental)/pca_components
          // ignore_low_variance
          // create_clusters/cluster_iter
          label: t('ml.workflow.form.fe.select.method.pycaret'),
          value: 'pycaret'
        },
        {
          // autofselect/Recursive Feature Elimination
          label: t('ml.workflow.form.fe.select.method.rfe'),
          value: 'rfe'
        },
        {
          // autofselect/permutation importance
          label: t('ml.workflow.form.fe.select.method.permute'),
          value: 'permute'
        },
        {
          // autofselect/Boruta Rankings
          label: t('ml.workflow.form.fe.select.method.boruta'),
          value: 'boruta'
        },
        {
          // Feature-engine
          // https://github.com/feature-engine/feature_engine
          label: t('ml.workflow.form.fe.select.method.feengine'),
          value: 'feengine'
        },
      ]
    }
  },
  {
    field: 'feature_selection_threshold',
    label: t('ml.workflow.form.fe.select.pycaret.feature_selection_threshold'),
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      min: 0,
      max: 5
    },
  },
  {
    field: 'multicollinearity_threshold',
    label: t('ml.workflow.form.fe.select.pycaret.multicollinearity_threshold'),
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      min: 0,
      max: 5
    },
  },
  {
    field: 'pca_method',
    label: t('ml.workflow.form.fe.select.pycaret.pca_method'),
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      min: 0,
      max: 5
    },
  },
  {
    field: 'pca_components',
    label: t('ml.workflow.form.fe.select.pycaret.pca_components'),
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      min: 0,
      max: 5
    },
  },
  {
    field: 'ignore_low_variance',
    label: t('ml.workflow.form.fe.select.pycaret.ignore_low_variance'),
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      min: 0,
      max: 5
    },
  },
  {
    field: 'cluster_iter',
    label: t('ml.workflow.form.fe.select.pycaret.cluster_iter'),
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      min: 0,
      max: 5
    },
  }
];

export const feSelCaretDefault = {
  feature_selection_threshold: 1,
  multicollinearity_threshold: 1,
  pca_method: 1,
  pca_components: 1,
  ignore_low_variance: 1,
  cluster_iter: 1
};

export const formFeSelectRfe: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.fe.select.method.title'),
    component: 'Select',
    defaultValue: 'rfe',
    componentProps: {
      allowClear: false,
      options: [
        {
          // feature_selection/feature_selection_threshold
          // remove_multicollinearcity/multicollinearity_threshold
          // pca/pca_method(linear, kernel, incremental)/pca_components
          // ignore_low_variance
          // create_clusters/cluster_iter
          label: t('ml.workflow.form.fe.select.method.pycaret'),
          value: 'pycaret'
        },
        {
          // autofselect/Recursive Feature Elimination
          label: t('ml.workflow.form.fe.select.method.rfe'),
          value: 'rfe'
        },
        {
          // autofselect/permutation importance
          label: t('ml.workflow.form.fe.select.method.permute'),
          value: 'permute'
        },
        {
          // autofselect/Boruta Rankings
          label: t('ml.workflow.form.fe.select.method.boruta'),
          value: 'boruta'
        },
        {
          // Feature-engine
          // https://github.com/feature-engine/feature_engine
          label: t('ml.workflow.form.fe.select.method.feengine'),
          value: 'feengine'
        },
      ]
    }
  },
  {
    field: 'seed',
    label: t('ml.workflow.form.fe.select.autofs.seed'),
    component: 'InputNumber',
    defaultValue: 123,
    componentProps: {
      min: 0,
      max: 255
    },
  },
  {
    field: 'metric',
    label: t('ml.workflow.form.fe.select.autofs.metric.title'),
    component: 'Select',
    defaultValue: 'gain',
    componentProps: {
      allowClear: false,
      options: [
        {
          // MinimalFCParameters
          label: t('ml.workflow.form.fe.select.autofs.metric.gain'),
          value: 'gain'
        },
        {
          // EfficientFCParameters
          label: t('ml.workflow.form.fe.select.autofs.metric.gg1'),
          value: 'gg1'
        },
        {
          // ComprehensiveFCParameters
          label: t('ml.workflow.form.fe.select.autofs.metric.gg2'),
          value: 'gg2'
        }
      ]
    }
  }
];

export const formFeSelectPermute: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.fe.select.method.title'),
    component: 'Select',
    defaultValue: 'permute',
    componentProps: {
      allowClear: false,
      options: [
        {
          // feature_selection/feature_selection_threshold
          // remove_multicollinearcity/multicollinearity_threshold
          // pca/pca_method(linear, kernel, incremental)/pca_components
          // ignore_low_variance
          // create_clusters/cluster_iter
          label: t('ml.workflow.form.fe.select.method.pycaret'),
          value: 'pycaret'
        },
        {
          // autofselect/Recursive Feature Elimination
          label: t('ml.workflow.form.fe.select.method.rfe'),
          value: 'rfe'
        },
        {
          // autofselect/permutation importance
          label: t('ml.workflow.form.fe.select.method.permute'),
          value: 'permute'
        },
        {
          // autofselect/Boruta Rankings
          label: t('ml.workflow.form.fe.select.method.boruta'),
          value: 'boruta'
        },
        {
          // Feature-engine
          // https://github.com/feature-engine/feature_engine
          label: t('ml.workflow.form.fe.select.method.feengine'),
          value: 'feengine'
        },
      ]
    }
  },
  {
    field: 'seed',
    label: t('ml.workflow.form.fe.select.autofs.seed'),
    component: 'InputNumber',
    defaultValue: 123,
    componentProps: {
      min: 0,
      max: 255
    },
  },
  {
    field: 'metric',
    label: t('ml.workflow.form.fe.select.autofs.metric.title'),
    component: 'Select',
    defaultValue: 'gain',
    componentProps: {
      allowClear: false,
      options: [
        {
          // MinimalFCParameters
          label: t('ml.workflow.form.fe.select.autofs.metric.gain'),
          value: 'gain'
        },
        {
          // EfficientFCParameters
          label: t('ml.workflow.form.fe.select.autofs.metric.gg1'),
          value: 'gg1'
        },
        {
          // ComprehensiveFCParameters
          label: t('ml.workflow.form.fe.select.autofs.metric.gg2'),
          value: 'gg2'
        }
      ]
    }
  }
];

export const formFeSelectBoruta: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.fe.select.method.title'),
    component: 'Select',
    defaultValue: 'boruta',
    componentProps: {
      allowClear: false,
      options: [
        {
          // feature_selection/feature_selection_threshold
          // remove_multicollinearcity/multicollinearity_threshold
          // pca/pca_method(linear, kernel, incremental)/pca_components
          // ignore_low_variance
          // create_clusters/cluster_iter
          label: t('ml.workflow.form.fe.select.method.pycaret'),
          value: 'pycaret'
        },
        {
          // autofselect/Recursive Feature Elimination
          label: t('ml.workflow.form.fe.select.method.rfe'),
          value: 'rfe'
        },
        {
          // autofselect/permutation importance
          label: t('ml.workflow.form.fe.select.method.permute'),
          value: 'permute'
        },
        {
          // autofselect/Boruta Rankings
          label: t('ml.workflow.form.fe.select.method.boruta'),
          value: 'boruta'
        },
        {
          // Feature-engine
          // https://github.com/feature-engine/feature_engine
          label: t('ml.workflow.form.fe.select.method.feengine'),
          value: 'feengine'
        },
      ]
    }
  },
  {
    field: 'seed',
    label: t('ml.workflow.form.fe.select.autofs.seed'),
    component: 'InputNumber',
    defaultValue: 123,
    componentProps: {
      min: 0,
      max: 255
    },
  },
  {
    field: 'metric',
    label: t('ml.workflow.form.fe.select.autofs.metric.title'),
    component: 'Select',
    defaultValue: 'gain',
    componentProps: {
      allowClear: false,
      options: [
        {
          // MinimalFCParameters
          label: t('ml.workflow.form.fe.select.autofs.metric.gain'),
          value: 'gain'
        },
        {
          // EfficientFCParameters
          label: t('ml.workflow.form.fe.select.autofs.metric.gg1'),
          value: 'gg1'
        },
        {
          // ComprehensiveFCParameters
          label: t('ml.workflow.form.fe.select.autofs.metric.gg2'),
          value: 'gg2'
        }
      ]
    }
  }
];


export const feSelAutofeDefault = {
  seed: 123,
  metric: 'gain'
};

export const formFeSelectEngine: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.fe.select.method.title'),
    component: 'Select',
    defaultValue: 'feengine',
    componentProps: {
      allowClear: false,
      options: [
        {
          // feature_selection/feature_selection_threshold
          // remove_multicollinearcity/multicollinearity_threshold
          // pca/pca_method(linear, kernel, incremental)/pca_components
          // ignore_low_variance
          // create_clusters/cluster_iter
          label: t('ml.workflow.form.fe.select.method.pycaret'),
          value: 'pycaret'
        },
        {
          // autofselect/Recursive Feature Elimination
          label: t('ml.workflow.form.fe.select.method.rfe'),
          value: 'rfe'
        },
        {
          // autofselect/permutation importance
          label: t('ml.workflow.form.fe.select.method.permute'),
          value: 'permute'
        },
        {
          // autofselect/Boruta Rankings
          label: t('ml.workflow.form.fe.select.method.boruta'),
          value: 'boruta'
        },
        {
          // Feature-engine
          // https://github.com/feature-engine/feature_engine
          label: t('ml.workflow.form.fe.select.method.feengine'),
          value: 'feengine'
        },
      ]
    }
  }
];


export const feSelectDefault = {
  pycaret: feSelCaretDefault,
  rfe: feSelAutofeDefault,
  permute: feSelAutofeDefault,
  boruta: feSelAutofeDefault,
  feengine: feSelAutofeDefault
};

// attribute form - feature/reduction
// reduce features
export const formFeReduce: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.fe.reduce.method.title'),
    component: 'Select',
    defaultValue: 'pca',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.fe.reduce.method.pca'),
          value: 'pca'
        },
        {
          label: t('ml.workflow.form.fe.reduce.method.lle'),
          value: 'lle'
        },
        {
          label: t('ml.workflow.form.fe.reduce.method.umap'),
          value: 'umap'
        },
        {
          label: t('ml.workflow.form.fe.reduce.method.isomap'),
          value: 'isomap'
        },
        {
          // H2OAutoEncoderEstimator
          label: t('ml.workflow.form.fe.reduce.method.ae'),
          value: 'ae'
        }
      ]
    }
  },
  {
    field: 'param',
    label: t('ml.workflow.form.fe.reduce.param'),
    component: 'Input'
  }
];

export const feReduceDefault = {
  method: 'pca'
};

const mlFrameOption: FormSchema = {
  field: 'framework',
  label: t('ml.workflow.form.ml.frame.title'),
  component: 'Select',
  defaultValue: 'pycaret',
  componentProps: {
    allowClear: false,
    options: [
      {
        label: t('ml.workflow.form.ml.frame.pycaret'),
        value: 'pycaret'
      },
      {
        label: t('ml.workflow.form.ml.frame.tpot'),
        value: 'tpot'
      },
      {
        label: t('ml.workflow.form.ml.frame.h2o'),
        value: 'h2o'
      },
      {
        label: t('ml.workflow.form.ml.frame.autogluon'),
        value: 'autogluon'
      },
      {
        // https://github.com/winedarksea/AutoTS
        label: t('ml.workflow.form.ml.frame.autots'),
        value: 'autots'
      }
    ]
  }
};



const mlPyCaretParam: FormSchema[] = [
  {
    field: 'train_size',
    label: t('ml.workflow.form.ml.pycaret.param.tsize'),
    component: 'InputNumber',
    defaultValue: 7,
    componentProps: {
      min: 5,
      max: 10
    },
  },
  {
    field: 'fold',
    label: t('ml.workflow.form.ml.pycaret.param.fold'),
    component: 'InputNumber',
    defaultValue: 10,
    componentProps: {
      min: 0,
      max: 10
    },
  },
  {
    field: 'session_id',
    label: t('ml.workflow.form.ml.pycaret.param.seed'),
    component: 'InputNumber',
    defaultValue: 123,
    componentProps: {
      min: 1,
      max: 255
    },
  },
  {
    field: 'ext',
    label: t('ml.workflow.form.ml.pycaret.param.ext'),
    component: 'InputTextArea',
    componentProps: {
      maxlength: 256,
      autoSize: { minRows: 5, maxRows: 8 }
    }
  }
];


const mlClfAlgoOption: FormSchema = {
  field: 'blacklist',
  label: t('ml.workflow.form.ml.clf.algo.title'),
  component: 'Select',
  componentProps: {
    mode: 'multiple',
    options: [
      {
        label: t('ml.workflow.form.ml.clf.algo.lr'),
        value: 'lr'
      },
      {
        label: t('ml.workflow.form.ml.clf.algo.knn'),
        value: 'knn'
      },
      {
        label: t('ml.workflow.form.ml.clf.algo.nb'),
        value: 'nb'
      },
      {
        label: t('ml.workflow.form.ml.clf.algo.dt'),
        value: 'dt'
      },
      {
        label: t('ml.workflow.form.ml.clf.algo.svm'),
        value: 'svm'
      },
      {
        label: t('ml.workflow.form.ml.clf.algo.ridge'),
        value: 'ridge'
      },
      {
        label: t('ml.workflow.form.ml.clf.algo.rf'),
        value: 'rf'
      },
      {
        label: t('ml.workflow.form.ml.clf.algo.qda'),
        value: 'qda'
      },
      {
        label: t('ml.workflow.form.ml.clf.algo.ada'),
        value: 'ada'
      },
      {
        label: t('ml.workflow.form.ml.clf.algo.gbc'),
        value: 'gbc'
      },
      {
        label: t('ml.workflow.form.ml.clf.algo.lda'),
        value: 'lda'
      },
      {
        label: t('ml.workflow.form.ml.clf.algo.et'),
        value: 'et'
      },
      {
        label: t('ml.workflow.form.ml.clf.algo.xgboost'),
        value: 'xgboost'
      },
      {
        label: t('ml.workflow.form.ml.clf.algo.lightgbm'),
        value: 'lightgbm'
      },
      {
        label: t('ml.workflow.form.ml.clf.algo.catboost'),
        value: 'catboost'
      }
    ]
  }
};

const mlClfMetricOption: FormSchema = {
  field: 'metric',
  label: t('ml.workflow.form.ml.clf.metric.title'),
  component: 'Select',
  defaultValue: 'accuracy',
  componentProps: {
    allowClear: false,
    options: [
      {
        label: t('ml.workflow.form.ml.clf.metric.accuracy'),
        value: 'accuracy'
      },
      {
        label: t('ml.workflow.form.ml.clf.metric.auc'),
        value: 'auc'
      },
      {
        label: t('ml.workflow.form.ml.clf.metric.recall'),
        value: 'recall'
      },
      {
        label: t('ml.workflow.form.ml.clf.metric.prec'),
        value: 'prec'
      },
      {
        label: t('ml.workflow.form.ml.clf.metric.f1'),
        value: 'f1'
      },
      {
        label: t('ml.workflow.form.ml.clf.metric.kappa'),
        value: 'kappa'
      },
      {
        label: t('ml.workflow.form.ml.clf.metric.mcc'),
        value: 'mcc'
      }
    ]
  }
};

// attribute form - ml/clf
export const formMlClfCaret: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.ml.method.title'),
    component: 'Select',
    defaultValue: 'pycaret',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.ml.method.pycaret'),
          value: 'pycaret'
        },
        {
          label: t('ml.workflow.form.ml.method.tpot'),
          value: 'tpot'
        },
        {
          label: t('ml.workflow.form.ml.method.h2o'),
          value: 'h2o'
        },
        {
          label: t('ml.workflow.form.ml.method.autogluon'),
          value: 'autogluon'
        },
        {
          // https://github.com/winedarksea/AutoTS
          label: t('ml.workflow.form.ml.method.autots'),
          value: 'autots'
        }
      ]
    }
  },
  mlClfAlgoOption,
  mlClfMetricOption,
  ...mlPyCaretParam
];

const mlClfCaretDefault = {
  method: 'pycaret',
  blacklist: [],
  metric: 'accuracy'
};

// attribute form - ml/clf
export const formMlClfTpot: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.ml.method.title'),
    component: 'Select',
    defaultValue: 'tpot',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.ml.method.pycaret'),
          value: 'pycaret'
        },
        {
          label: t('ml.workflow.form.ml.method.tpot'),
          value: 'tpot'
        },
        {
          label: t('ml.workflow.form.ml.method.h2o'),
          value: 'h2o'
        },
        {
          label: t('ml.workflow.form.ml.method.autogluon'),
          value: 'autogluon'
        },
        {
          // https://github.com/winedarksea/AutoTS
          label: t('ml.workflow.form.ml.method.autots'),
          value: 'autots'
        }
      ]
    }
  },
  mlClfAlgoOption,
  mlClfMetricOption
];

const mlClfTpotDefault = {
  method: 'tpot',
  blacklist: [],
  metric: 'accuracy'
};

// attribute form - ml/clf
export const formMlClfH2o: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.ml.method.title'),
    component: 'Select',
    defaultValue: 'h2o',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.ml.method.pycaret'),
          value: 'pycaret'
        },
        {
          label: t('ml.workflow.form.ml.method.tpot'),
          value: 'tpot'
        },
        {
          label: t('ml.workflow.form.ml.method.h2o'),
          value: 'h2o'
        },
        {
          label: t('ml.workflow.form.ml.method.autogluon'),
          value: 'autogluon'
        },
        {
          // https://github.com/winedarksea/AutoTS
          label: t('ml.workflow.form.ml.method.autots'),
          value: 'autots'
        }
      ]
    }
  },
  mlClfAlgoOption,
  mlClfMetricOption
];


// attribute form - ml/clf
export const formMlClfGluon: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.ml.method.title'),
    component: 'Select',
    defaultValue: 'autogluon',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.ml.method.pycaret'),
          value: 'pycaret'
        },
        {
          label: t('ml.workflow.form.ml.method.tpot'),
          value: 'tpot'
        },
        {
          label: t('ml.workflow.form.ml.method.h2o'),
          value: 'h2o'
        },
        {
          label: t('ml.workflow.form.ml.method.autogluon'),
          value: 'autogluon'
        },
        {
          // https://github.com/winedarksea/AutoTS
          label: t('ml.workflow.form.ml.method.autots'),
          value: 'autots'
        }
      ]
    }
  },
  mlClfAlgoOption,
  mlClfMetricOption
];

// attribute form - ml/clf
export const formMlClfTs: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.ml.method.title'),
    component: 'Select',
    defaultValue: 'autots',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.ml.method.pycaret'),
          value: 'pycaret'
        },
        {
          label: t('ml.workflow.form.ml.method.tpot'),
          value: 'tpot'
        },
        {
          label: t('ml.workflow.form.ml.method.h2o'),
          value: 'h2o'
        },
        {
          label: t('ml.workflow.form.ml.method.autogluon'),
          value: 'autogluon'
        },
        {
          // https://github.com/winedarksea/AutoTS
          label: t('ml.workflow.form.ml.method.autots'),
          value: 'autots'
        }
      ]
    }
  },
  mlClfAlgoOption,
  mlClfMetricOption
];

export const mlClfDefault = {
  pycaret: mlClfCaretDefault,
  tpot: mlClfTpotDefault,
  h2o: mlClfTpotDefault,
  autogluon: mlClfTpotDefault,
  autots: mlClfTpotDefault
};



const mlRegAlgoOption: FormSchema = {
  field: 'blacklist',
  label: t('ml.workflow.form.ml.reg.algo.title'),
  component: 'Select',
  componentProps: {
    mode: 'multiple',
    options: [
      {
        label: t('ml.workflow.form.ml.reg.algo.lr'),
        value: 'lr'
      },
      {
        label: t('ml.workflow.form.ml.reg.algo.lasso'),
        value: 'lasso'
      },
      {
        label: t('ml.workflow.form.ml.reg.algo.ridge'),
        value: 'ridge'
      },
      {
        label: t('ml.workflow.form.ml.reg.algo.en'),
        value: 'en'
      },
      {
        label: t('ml.workflow.form.ml.reg.algo.lar'),
        value: 'lar'
      },
      {
        label: t('ml.workflow.form.ml.reg.algo.llar'),
        value: 'llar'
      },
      {
        label: t('ml.workflow.form.ml.reg.algo.omp'),
        value: 'omp'
      },
      {
        label: t('ml.workflow.form.ml.reg.algo.br'),
        value: 'br'
      },
      {
        label: t('ml.workflow.form.ml.reg.algo.par'),
        value: 'par'
      },
      {
        label: t('ml.workflow.form.ml.reg.algo.huber'),
        value: 'huber'
      },
      {
        label: t('ml.workflow.form.ml.reg.algo.knn'),
        value: 'knn'
      },
      {
        label: t('ml.workflow.form.ml.reg.algo.dt'),
        value: 'dt'
      },
      {
        label: t('ml.workflow.form.ml.reg.algo.rf'),
        value: 'rf'
      },
      {
        label: t('ml.workflow.form.ml.reg.algo.et'),
        value: 'et'
      }
    ]
  }
};

const mlRegMetricOption: FormSchema = {
  field: 'metric',
  label: t('ml.workflow.form.ml.reg.metric.title'),
  component: 'Select',
  defaultValue: 'r2',
  componentProps: {
    allowClear: false,
    options: [
      {
        label: t('ml.workflow.form.ml.reg.metric.r2'),
        value: 'r2'
      },
      {
        label: t('ml.workflow.form.ml.reg.metric.mae'),
        value: 'mae'
      },
      {
        label: t('ml.workflow.form.ml.reg.metric.mse'),
        value: 'mse'
      },
      {
        label: t('ml.workflow.form.ml.reg.metric.rmse'),
        value: 'rmse'
      },
      {
        label: t('ml.workflow.form.ml.reg.metric.rmsle'),
        value: 'rmsle'
      },
      {
        label: t('ml.workflow.form.ml.reg.metric.mape'),
        value: 'mape'
      }
    ]
  }
};

// attribute form - algo/reg
export const formMlRegCaret: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.ml.method.title'),
    component: 'Select',
    defaultValue: 'pycaret',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.ml.method.pycaret'),
          value: 'pycaret'
        },
        {
          label: t('ml.workflow.form.ml.method.tpot'),
          value: 'tpot'
        },
        {
          label: t('ml.workflow.form.ml.method.h2o'),
          value: 'h2o'
        },
        {
          label: t('ml.workflow.form.ml.method.autogluon'),
          value: 'autogluon'
        },
        {
          // https://github.com/winedarksea/AutoTS
          label: t('ml.workflow.form.ml.method.autots'),
          value: 'autots'
        }
      ]
    }
  },
  mlRegAlgoOption,
  mlRegMetricOption,
  ...mlPyCaretParam
];

const mlRegCaretDefault = {
  method: 'pycaret',
  blacklist: [],
  metric: 'r2'
};

// attribute form - algo/reg
export const formMlRegTpot: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.ml.method.title'),
    component: 'Select',
    defaultValue: 'tpot',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.ml.method.pycaret'),
          value: 'pycaret'
        },
        {
          label: t('ml.workflow.form.ml.method.tpot'),
          value: 'tpot'
        },
        {
          label: t('ml.workflow.form.ml.method.h2o'),
          value: 'h2o'
        },
        {
          label: t('ml.workflow.form.ml.method.autogluon'),
          value: 'autogluon'
        },
        {
          // https://github.com/winedarksea/AutoTS
          label: t('ml.workflow.form.ml.method.autots'),
          value: 'autots'
        }
      ]
    }
  },
  mlRegAlgoOption,
  mlRegMetricOption,
  ...mlPyCaretParam
];

// attribute form - algo/reg
export const formMlRegH2o: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.ml.method.title'),
    component: 'Select',
    defaultValue: 'h2o',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.ml.method.pycaret'),
          value: 'pycaret'
        },
        {
          label: t('ml.workflow.form.ml.method.tpot'),
          value: 'tpot'
        },
        {
          label: t('ml.workflow.form.ml.method.h2o'),
          value: 'h2o'
        },
        {
          label: t('ml.workflow.form.ml.method.autogluon'),
          value: 'autogluon'
        },
        {
          // https://github.com/winedarksea/AutoTS
          label: t('ml.workflow.form.ml.method.autots'),
          value: 'autots'
        }
      ]
    }
  },
  mlRegAlgoOption,
  mlRegMetricOption,
  ...mlPyCaretParam
];

// attribute form - algo/reg
export const formMlRegGluon: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.ml.method.title'),
    component: 'Select',
    defaultValue: 'autogluon',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.ml.method.pycaret'),
          value: 'pycaret'
        },
        {
          label: t('ml.workflow.form.ml.method.tpot'),
          value: 'tpot'
        },
        {
          label: t('ml.workflow.form.ml.method.h2o'),
          value: 'h2o'
        },
        {
          label: t('ml.workflow.form.ml.method.autogluon'),
          value: 'autogluon'
        },
        {
          // https://github.com/winedarksea/AutoTS
          label: t('ml.workflow.form.ml.method.autots'),
          value: 'autots'
        }
      ]
    }
  },
  mlRegAlgoOption,
  mlRegMetricOption,
  ...mlPyCaretParam
];

// attribute form - algo/reg
export const formMlRegTs: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.ml.method.title'),
    component: 'Select',
    defaultValue: 'autots',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.ml.method.pycaret'),
          value: 'pycaret'
        },
        {
          label: t('ml.workflow.form.ml.method.tpot'),
          value: 'tpot'
        },
        {
          label: t('ml.workflow.form.ml.method.h2o'),
          value: 'h2o'
        },
        {
          label: t('ml.workflow.form.ml.method.autogluon'),
          value: 'autogluon'
        },
        {
          // https://github.com/winedarksea/AutoTS
          label: t('ml.workflow.form.ml.method.autots'),
          value: 'autots'
        }
      ]
    }
  },
  mlRegAlgoOption,
  mlRegMetricOption,
  ...mlPyCaretParam
];

export const mlRegDefault = {
  pycaret: mlRegCaretDefault,
  tpot: mlClfTpotDefault,
  h2o: mlClfTpotDefault,
  autogluon: mlClfTpotDefault,
  autots: mlClfTpotDefault
};

const mlClusterAlgoOption: FormSchema = {
  field: 'algo',
  label: t('ml.workflow.form.ml.cluster.algo.title'),
  component: 'Select',
  defaultValue: 'kmeans',
  componentProps: {
    allowClear: false,
    options: [
      {
        label: t('ml.workflow.form.ml.cluster.algo.kmeans'),
        value: 'kmeans'
      },
      {
        label: t('ml.workflow.form.ml.cluster.algo.ap'),
        value: 'ap'
      },
      {
        label: t('ml.workflow.form.ml.cluster.algo.meanshift'),
        value: 'meanshift'
      },
      {
        label: t('ml.workflow.form.ml.cluster.algo.sc'),
        value: 'sc'
      },
      {
        label: t('ml.workflow.form.ml.cluster.algo.hclust'),
        value: 'hclust'
      },
      {
        label: t('ml.workflow.form.ml.cluster.algo.dbscan'),
        value: 'dbscan'
      },
      {
        label: t('ml.workflow.form.ml.cluster.algo.optics'),
        value: 'optics'
      },
      {
        label: t('ml.workflow.form.ml.cluster.algo.birch'),
        value: 'birch'
      },
      {
        label: t('ml.workflow.form.ml.cluster.algo.kmodes'),
        value: 'kmodes'
      }
    ]
  }
};

// attribute form - ml/cluster/Caret
export const formMlClusterCaret: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.ml.method.title'),
    component: 'Select',
    defaultValue: 'pycaret',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.ml.method.pycaret'),
          value: 'pycaret'
        },
        {
          label: t('ml.workflow.form.ml.method.tpot'),
          value: 'tpot'
        },
        {
          label: t('ml.workflow.form.ml.method.h2o'),
          value: 'h2o'
        },
        {
          label: t('ml.workflow.form.ml.method.autogluon'),
          value: 'autogluon'
        },
        {
          // https://github.com/winedarksea/AutoTS
          label: t('ml.workflow.form.ml.method.autots'),
          value: 'autots'
        }
      ]
    }
  },
  mlClusterAlgoOption,
  ...mlPyCaretParam
];

const mlClusterCaretDefault = {
  method: 'pycaret',
  algo: 'kmeans'
};

// attribute form - ml/cluster/TPOT
export const formMlClusterTpot: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.ml.method.title'),
    component: 'Select',
    defaultValue: 'tpot',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.ml.method.pycaret'),
          value: 'pycaret'
        },
        {
          label: t('ml.workflow.form.ml.method.tpot'),
          value: 'tpot'
        },
        {
          label: t('ml.workflow.form.ml.method.h2o'),
          value: 'h2o'
        },
        {
          label: t('ml.workflow.form.ml.method.autogluon'),
          value: 'autogluon'
        },
        {
          // https://github.com/winedarksea/AutoTS
          label: t('ml.workflow.form.ml.method.autots'),
          value: 'autots'
        }
      ]
    }
  },
  mlClusterAlgoOption,
  ...mlPyCaretParam
];

// attribute form - ml/cluster/H2o
export const formMlClusterH2o: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.ml.method.title'),
    component: 'Select',
    defaultValue: 'h2o',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.ml.method.pycaret'),
          value: 'pycaret'
        },
        {
          label: t('ml.workflow.form.ml.method.tpot'),
          value: 'tpot'
        },
        {
          label: t('ml.workflow.form.ml.method.h2o'),
          value: 'h2o'
        },
        {
          label: t('ml.workflow.form.ml.method.autogluon'),
          value: 'autogluon'
        },
        {
          // https://github.com/winedarksea/AutoTS
          label: t('ml.workflow.form.ml.method.autots'),
          value: 'autots'
        }
      ]
    }
  },
  mlClusterAlgoOption,
  ...mlPyCaretParam
];

// attribute form - ml/cluster/autoGluon
export const formMlClusterGluon: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.ml.method.title'),
    component: 'Select',
    defaultValue: 'autogluon',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.ml.method.pycaret'),
          value: 'pycaret'
        },
        {
          label: t('ml.workflow.form.ml.method.tpot'),
          value: 'tpot'
        },
        {
          label: t('ml.workflow.form.ml.method.h2o'),
          value: 'h2o'
        },
        {
          label: t('ml.workflow.form.ml.method.autogluon'),
          value: 'autogluon'
        },
        {
          // https://github.com/winedarksea/AutoTS
          label: t('ml.workflow.form.ml.method.autots'),
          value: 'autots'
        }
      ]
    }
  },
  mlClusterAlgoOption,
  ...mlPyCaretParam
];

// attribute form - ml/cluster/autoTs
export const formMlClusterTs: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.ml.method.title'),
    component: 'Select',
    defaultValue: 'autots',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.ml.method.pycaret'),
          value: 'pycaret'
        },
        {
          label: t('ml.workflow.form.ml.method.tpot'),
          value: 'tpot'
        },
        {
          label: t('ml.workflow.form.ml.method.h2o'),
          value: 'h2o'
        },
        {
          label: t('ml.workflow.form.ml.method.autogluon'),
          value: 'autogluon'
        },
        {
          // https://github.com/winedarksea/AutoTS
          label: t('ml.workflow.form.ml.method.autots'),
          value: 'autots'
        }
      ]
    }
  },
  mlClusterAlgoOption,
  ...mlPyCaretParam
];

export const mlClusterDefault = {
  pycaret: mlClusterCaretDefault,
  tpot: mlClfTpotDefault,
  h2o: mlClfTpotDefault,
  autogluon: mlClfTpotDefault,
  autots: mlClfTpotDefault
};

const mlAnomalyAlgoOption: FormSchema = {
  field: 'algo',
  label: t('ml.workflow.form.ml.anomaly.algo.title'),
  component: 'Select',
  defaultValue: 'abod',
  componentProps: {
    allowClear: false,
    options: [
      {
        label: t('ml.workflow.form.ml.anomaly.algo.abod'),
        value: 'abod'
      },
      {
        label: t('ml.workflow.form.ml.anomaly.algo.cluster'),
        value: 'cluster'
      },
      {
        label: t('ml.workflow.form.ml.anomaly.algo.cof'),
        value: 'cof'
      },
      {
        label: t('ml.workflow.form.ml.anomaly.algo.histogram'),
        value: 'histogram'
      },
      {
        label: t('ml.workflow.form.ml.anomaly.algo.iforest'),
        value: 'iforest'
      },
      {
        label: t('ml.workflow.form.ml.anomaly.algo.knn'),
        value: 'knn'
      },
      {
        label: t('ml.workflow.form.ml.anomaly.algo.lof'),
        value: 'lof'
      },
      {
        label: t('ml.workflow.form.ml.anomaly.algo.svm'),
        value: 'svm'
      },
      {
        label: t('ml.workflow.form.ml.anomaly.algo.pca'),
        value: 'pca'
      },
      {
        label: t('ml.workflow.form.ml.anomaly.algo.mcd'),
        value: 'mcd'
      },
      {
        label: t('ml.workflow.form.ml.anomaly.algo.sod'),
        value: 'sod'
      },
      {
        label: t('ml.workflow.form.ml.anomaly.algo.sos'),
        value: 'sos'
      }
    ]
  }
};

// attribute form - ML/Anomaly
export const formMlAnomaly: FormSchema[] = [
  {
    field: 'method',
    label: t('ml.workflow.form.ml.method.title'),
    component: 'Select',
    defaultValue: 'pycaret',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.ml.method.pycaret'),
          value: 'pycaret'
        },
        {
          label: t('ml.workflow.form.ml.method.tpot'),
          value: 'tpot'
        },
        {
          label: t('ml.workflow.form.ml.method.h2o'),
          value: 'h2o'
        },
        {
          label: t('ml.workflow.form.ml.method.autogluon'),
          value: 'autogluon'
        },
        {
          // https://github.com/winedarksea/AutoTS
          label: t('ml.workflow.form.ml.method.autots'),
          value: 'autots'
        }
      ]
    }
  },
  mlAnomalyAlgoOption,
  ...mlPyCaretParam
];

export const mlAnomalyCaretDefault = {
  method: 'pycaret',
  algo: 'abod'
};

// attribute form - deeplearning/ANN
export const formDeeplAnn: FormSchema[] = [
  {
    field: 'algo',
    label: t('ml.workflow.form.deepl.ann.algo.title'),
    component: 'Select',
    defaultValue: 'mlp',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.deepl.ann.algo.mlp'),
          value: 'mlp'
        },
        {
          label: t('ml.workflow.form.deepl.ann.algo.rbm'),
          value: 'rbm'
        }
      ]
    }
  },
  {
    field: 'layers',
    label: t('ml.workflow.form.deepl.ann.layers'),
    component: 'Input'
  },
  {
    field: 'activation',
    label: t('ml.workflow.form.deepl.ann.activation.title'),
    component: 'Select',
    defaultValue: 'relu',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.deepl.ann.activation.relu'),
          value: 'relu'
        },
        {
          label: t('ml.workflow.form.deepl.ann.activation.tanh'),
          value: 'tanh'
        },
        {
          label: t('ml.workflow.form.deepl.ann.activation.logistic'),
          value: 'logistic'
        },
        {
          label: t('ml.workflow.form.deepl.ann.activation.identity'),
          value: 'identity'
        }
      ]
    }
  },
  {
    field: 'solver',
    label: t('ml.workflow.form.deepl.ann.solver.title'),
    component: 'Select',
    defaultValue: 'adam',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.deepl.ann.solver.adam'),
          value: 'adam'
        },
        {
          label: t('ml.workflow.form.deepl.ann.solver.sgd'),
          value: 'sgd'
        },
        {
          label: t('ml.workflow.form.deepl.ann.solver.lbfgs'),
          value: 'lbfgs'
        }
      ]
    }
  },
  {
    field: 'alpha',
    label: t('ml.workflow.form.deepl.ann.alpha'),
    component: 'InputNumber'
  }
];

// attribute form - deeplearning/rnn
export const formDeeplRnn: FormSchema[] = [
  {
    field: 'algo',
    label: t('ml.workflow.form.deepl.rnn.algo.title'),
    component: 'Select',
    defaultValue: 'mlp',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.deepl.rnn.algo.brn'),
          value: 'brn'
        },
        {
          label: t('ml.workflow.form.deepl.rnn.algo.birnn'),
          value: 'birnn'
        },
        {
          label: t('ml.workflow.form.deepl.rnn.algo.lstm'),
          value: 'lstm'
        },
        {
          label: t('ml.workflow.form.deepl.rnn.algo.gru'),
          value: 'gru'
        }
      ]
    }
  },
  {
    field: 'insize',
    label: t('ml.workflow.form.deepl.rnn.insize'),
    component: 'InputNumber'
  },
  {
    field: 'hiddensize',
    label: t('ml.workflow.form.deepl.rnn.hiddensize'),
    component: 'InputNumber'
  },
  {
    field: 'layers',
    label: t('ml.workflow.form.deepl.rnn.layers'),
    component: 'InputNumber'
  },
  {
    field: 'activation',
    label: t('ml.workflow.form.deepl.rnn.activation.title'),
    component: 'Select',
    defaultValue: 'relu',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.deepl.rnn.activation.relu'),
          value: 'relu'
        },
        {
          label: t('ml.workflow.form.deepl.rnn.activation.tanh'),
          value: 'tanh'
        },
        {
          label: t('ml.workflow.form.deepl.rnn.activation.logistic'),
          value: 'logistic'
        },
        {
          label: t('ml.workflow.form.deepl.rnn.activation.identity'),
          value: 'identity'
        }
      ]
    }
  },
  {
    field: 'param',
    label: t('ml.workflow.form.deepl.rnn.param'),
    component: 'Input'
  }
];

// attribute form - deeplearning/cnn
export const formDeeplCnn: FormSchema[] = [
  {
    field: 'algo',
    label: t('ml.workflow.form.deepl.cnn.algo.title'),
    component: 'Select',
    defaultValue: 'mlp',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.deepl.cnn.algo.lenet5'),
          value: 'lenet5'
        },
        {
          label: t('ml.workflow.form.deepl.cnn.algo.alexnet'),
          value: 'alexnet'
        },
        {
          label: t('ml.workflow.form.deepl.cnn.algo.vggnet'),
          value: 'vgg'
        },
        {
          label: t('ml.workflow.form.deepl.cnn.algo.resnet'),
          value: 'resnet'
        },
        {
          label: t('ml.workflow.form.deepl.cnn.algo.googlenet'),
          value: 'googlenet'
        },
        {
          label: t('ml.workflow.form.deepl.cnn.algo.mobilev1'),
          value: 'mobilev1'
        },
        {
          label: t('ml.workflow.form.deepl.cnn.algo.ghostnet'),
          value: 'ghostnet'
        },
        {
          label: t('ml.workflow.form.deepl.cnn.algo.triplet'),
          value: 'triplet'
        },
        {
          label: t('ml.workflow.form.deepl.cnn.algo.yolov1'),
          value: 'yolov1'
        }
      ]
    }
  },
  {
    field: 'insize',
    label: t('ml.workflow.form.deepl.cnn.insize'),
    component: 'InputNumber'
  },
  {
    field: 'hiddensize',
    label: t('ml.workflow.form.deepl.cnn.hiddensize'),
    component: 'InputNumber'
  },
  {
    field: 'layers',
    label: t('ml.workflow.form.deepl.cnn.layers'),
    component: 'InputNumber'
  },
  {
    field: 'activation',
    label: t('ml.workflow.form.deepl.cnn.activation.title'),
    component: 'Select',
    defaultValue: 'relu',
    componentProps: {
      allowClear: false,
      options: [
        {
          label: t('ml.workflow.form.deepl.cnn.activation.relu'),
          value: 'relu'
        },
        {
          label: t('ml.workflow.form.deepl.cnn.activation.tanh'),
          value: 'tanh'
        },
        {
          label: t('ml.workflow.form.deepl.cnn.activation.logistic'),
          value: 'logistic'
        },
        {
          label: t('ml.workflow.form.deepl.cnn.activation.identity'),
          value: 'identity'
        }
      ]
    }
  },
  {
    field: 'param',
    label: t('ml.workflow.form.deepl.cnn.param'),
    component: 'Input'
  }
];

export const initStyleCommon = {
  locale: 'en-US',
  theme: 'default',
  occasion: undefined,
  effect: undefined,
  duration: undefined,
  interactions: undefined,
};

export const initStyleLine = {
  area: undefined,
  isStack: undefined,
  smooth: undefined,
  connectNulls: undefined,
  stepType: undefined,
  pointShape: undefined,
  pointSize: undefined,
  pointColor: undefined,
  sliderStyle: undefined,
};

export const initStyleArea = {
  startOnZero: undefined,
  isStack: undefined,
  isPercent: undefined,
  smooth: undefined,
  areaFillOpacity: undefined,
  areaFillColor: undefined,
  sliderStyle: undefined,
};

export const initStyleColumn = {
  isGroup: undefined,
  isStack: undefined,
  isPercent: undefined,
  isRange: undefined,
  conversionTag: undefined,
  labelPos: undefined,
  labelSize: undefined,
  labelColor: undefined,
};

export const initStylePie = {
  isPercent: undefined,
  isMeter: undefined,
  radius: 1,
  innerRadius: undefined,
  startAngle: undefined,
  endAngle: undefined,
  labelType: 'outer',
  labelContent: undefined,
  statTitle: undefined,
  statContent: undefined,
};

export const initStyleScatter = {
  regLineType: undefined,
};

export const initXAxis = {
  type: undefined,
  position: 'bottom',
  showTitle: undefined,
  titleText: undefined,
  titleSize: undefined,
  titleColor: undefined,
  labelFormat: undefined,
  min: undefined,
  max: undefined,
  gridStyle: undefined,
  gridColor: undefined,
  scrollbar: undefined,
};

export const initYAxis = {
  type: undefined,
  position: 'left',
  showTitle: undefined,
  titleText: undefined,
  titleSize: undefined,
  titleColor: undefined,
  labelFormat: undefined,
  min: undefined,
  max: undefined,
  tickCount: undefined,
  tickInterval: undefined,
  gridStyle: undefined,
  gridColor: undefined,
  scrollbar: undefined,
};

export const initTooltip = {
  enabled: true,
  enterable: undefined,
  showNil: undefined,
  showMarkers: true,
  markerSymbol: undefined,
  showTitle: true,
  title: undefined,
  valueFields: undefined,
  hairType: undefined,
  hairStyle: undefined,
  hairColor: undefined,
};

export const initLegend = {
  enabled: true,
  position: undefined,
  titleText: undefined,
  markerSymbol: undefined,
  labelFormat: undefined,
  maxWidth: undefined,
  maxHeight: undefined,
  flipPage: undefined,
  maxRow: undefined,
  slidable: undefined,
  min: undefined,
  max: undefined,
};

export const initAux = {
  label: [],
  line: [],
  segment: [],
  region: [],
  point: [],
  labelIdx: 0,
  lineIdx: 0,
  segmentIdx: 0,
  regionIdx: 0,
  pointIdx: 0,
};
