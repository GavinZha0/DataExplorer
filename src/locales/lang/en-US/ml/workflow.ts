export default {
  tab: {
    flow: 'Flow',
    chart: 'Chart'
  },
  toolbar: {
    search: 'name, group or description',
    layout: 'Layout'
  },
  table: {
    title: {
      last_run: 'Last run',
      duration: 'Druation',
      error: 'Error',
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
  },
  form: {
    config: {
      timeout: 'Timeout',
    },
    canvas: {
      grid: {
        type: 'Grid Type',
        size: 'Grid Size',
        color: 'Grid Color',
        thick: 'Grid Thick'
      },
      bg: {
        color: 'Bg Color',
        opacity: 'Bg Opacity'
      },
      edge: {
        color: 'Edge Color',
        router: 'Edge Router',
        connector: 'Edge Corner'
      }
    },
    source: {
      dataset: {
        pub: 'Public',
        dataset: 'Dataset'
      }
    },
    proc: {
      clean: {
        miss: {
          title: 'Missing Value',
          drop: 'Drop',
          fillmean: 'Fill mean',
          fillmedian: 'Fill median',
          fillprev: 'Fill prev',
          fillnext: 'Fill next'
        },
        duplicate: {
          title: 'Duplicatd Record',
          drop: 'Drop'
        },
        outlier: {
          title: 'Outlier',
          drop: 'Drop',
          fillmean: 'Fill mean',
          fillmedian: 'Fill median'
        }
      },
      transform: {
        trans: 'Transformations',
        method: {
          title: 'Method',
          math: 'Math',
          bin: 'Binning',
          split: 'Split',
          datetime: 'Datetime'
        },
        sourcefield: 'Source Field',
        targetfield: 'Target Field',
        param: 'Params'
      },
      encode: {
        sourcefield: 'Source Field',
        method: {
          title: 'Method',
          onehot: 'One-Hot',
          ordinal: 'Ordinal',
          cardinality: 'Cardinality',
          binary: 'Binary',
          hash: 'Hash',
          mean: 'Mean',
          cycle: 'Cycle',
          woe: 'WOE',
          loo: 'Loo',
          gs: 'GS',
          ts: 'TS'
        },
        param: 'Parameter',
        targetfield: 'Target Field'
      },
      scale: {
        sourcefield: 'Source Field',
        method: {
          title: 'Method',
          minmax: 'MinMax',
          std: 'STD',
          l1: 'L1',
          l2: 'L2',
          robust: 'Robust'
        },
        param: 'Parameter',
        targetfield: 'Target Field'
      }
    },
    fe: {
      extract: {
        method: {
          title: 'Method',
          dfs: 'DFS',
          pycaret: 'pyCaret',
          openfe: 'OpenFE',
          tsfresh: 'tsFresh'
        },
        caret: {
          feature_ratio: 'Feature Ratio',
          polynomial_degree: 'Polynomial Degree',
          polynomial_threshold: 'Polynomial Threshold',
          group_names: 'Group Names',
          bin_numeric_features: 'Bin Numeric Features',
          combine_rare_levels: 'Combine Rare Levels',
          rare_level_threshold: 'Rare Level Threshold'
        },
        dfs: {
          max_depth: 'Max Depth',
          aggprim: {
            title: 'Agg Primitives',
            fist_last: 'First Last',
            min_max: 'Min Max',
            mean: 'Mean',
            sum: 'Sum',
            stat: 'Stat',
            bool: 'Boolean',
            num_true: 'Num True',
            entropy: 'Entropy',
            num_unique: 'nNum Unique'
          },
          transprim: {
            title: 'Trans Primitives',
            arithmetic: 'Arithmetic',
            cumulative: 'Cumulative',
            trigonometric: 'Trigonometric',
            bool: 'Boolean',
            adv_math: 'Adv Math',
            negitive: 'Negitive',
            diff: 'Diff',
            timeseries: 'Time Series',
            rolling: 'Rolling',
            all: 'All'
          }
        },
        openfe: {
          boosting: 'Boosting',
          seed: 'Seed',
          metric: {
            title: 'Metric',
            binary_logloss: 'binary_logloss',
            multi_logloss: 'multi_logloss',
            auc: 'auc',
            rmse: 'rmse'
          },
          metric1: {
            title: 'Stage 1 Metric',
            predictive: 'predictive',
            corr: 'corr',
            mi: 'mi'
          },
          metric2: {
            title: 'Stage 2 Metric',
            gain_importance: 'gain_importance',
            permutation: 'permutation'
          }
        },
        fresh: {
          level: {
            title: 'Level',
            low: 'Low',
            middle: 'Middle',
            high: 'High'
          }
        }
      },
      select: {
        method: {
          title: 'Method',
          pycaret: 'pyCaret',
          rfe: 'RFE',
          permute: 'Permutation',
          boruta: 'Boruta',
          feengine: 'feature Engine'
        },
        pycaret: {
          feature_selection_threshold: 'FE Threshold',
          multicollinearity_threshold: 'Multicollinearity Threshold',
          pca_method: 'Pca Method',
          pca_components: 'Pca Components',
          ignore_low_variance: 'Ignore Low Variance',
          cluster_iter: 'Cluster Iter'
        },
        autofs: {
          seed: 'Seed',
          metric: {
            title: 'Metric',
            gain: 'Gain',
            gg1: 'GG1',
            gg2: 'GG2'

          }
        }
      },
      reduce: {
        method: {
          title: 'Method',
          pca: 'PCA',
          lle: 'LLE',
          umap: 'UMAP',
          isomap: 'IsoMap',
          ae: 'Auto Encoder'
        },
        param: 'Parameter'
      }
    },
    ml: {
      method: {
        title: 'Method',
        pycaret: 'pyCaret',
        tpot: 'TPOT',
        h2o: 'H2O',
        autogluon: 'AutoGluon',
        autots: 'AutoTS'
      },
      pycaret: {
        param: {
          tsize: 'Train Size',
          fold: 'Fold',
          seed: 'Seed',
          ext: 'Extra Params'
        }
      },
      clf: {
        algo: {
          title: 'Excluding',
          lr: 'Logistic Regression',
          knn: 'K Neighbors',
          nb: 'Naive Bayes',
          dt: 'Decision Tree',
          svm: 'SVM',
          ridge: 'Ridge Classfier',
          rf: 'Random Forest',
          qda: 'Quadratic Discriminant Analysis',
          ada: 'Ada Boost',
          gbc: 'Gradient Boosting',
          lda: 'LDA',
          et: 'Extra Tree',
          xgboost: 'XGBoost',
          lightgbm: 'Light Gradient Boosting',
          catboost: 'CatBoost'
        },
        metric: {
          title: 'Evaluation Metric',
          accuracy: 'Accuracy',
          r2: 'R2',
          mape: 'MAPE',
          auc: 'AUC',
          recall: 'Recall',
          prec: 'Precision',
          f1: 'F1',
          kappa: 'Kappa',
          mcc: 'MCC'
        },
      },
      reg: {
        algo: {
          title: 'Excluding',
          lr: 'Linear Regression',
          lasso: 'Lasso Regression',
          ridge: 'Ridge Regression',
          en: 'Elastic Net',
          lar: 'Least Angle',
          llar: 'Lasso Least Angle',
          omp: 'Orthogonal Matching Pursuit',
          br: 'Bayesian Ridge',
          par: 'Passive Aggressive',
          huber: 'Huber',
          knn: 'K Neighbors',
          dt: 'Decision Tree',
          rf: 'Random Forest',
          et: 'Extra Tree'
        },
        metric: {
          title: 'Evaluation Metric',
          mae: 'MAE',
          mse: 'MSE',
          rmse: 'RMSE',
          r2: 'R2',
          rmsle: 'RMSLE',
          mape: 'MAPE'
        }
      },
      cluster: {
        algo: {
          title: 'Algorithm',
          kmeans: 'K-Means',
          ap: 'Affinity Propagation',
          meanshift: 'Mean Shift',
          sc: 'Spectral',
          hclust: 'Agglomerative',
          dbscan: 'DBSCAN',
          optics: 'OPTICS',
          birch: 'Birch',
          kmodes: 'K-Modes'
        }
      },
      anomaly: {
        algo: {
          title: 'Algorithm',
          abod: ' Angle-base Detection',
          cluster: 'Clustering-Based Detection',
          cof: 'Connectivity-Based Detection',
          histogram: 'Histogram-based Detection',
          iforest: 'Isolation Forest',
          knn: 'k-Nearest Neighbors',
          lof: 'Local Outlier Factor',
          svm: 'One-class SVM',
          pca: 'Principal Component Analysis',
          mcd: 'Minimum Covariance Determinant',
          sod: 'Subspace Detection',
          sos: 'Stochastic Detection'
        },
      },
    },
    deepl: {
      ann: {
        algo: {
          title: 'ALgorithm',
          rbm: 'BernoulliRBM',
          mlp: 'Multi-Layer Perceptron'
        },
        layers: 'Hidden Layers',
        activation: {
          title: 'Activation Function',
          relu: 'Relu',
          tanh: 'Tanh',
          logistic: 'Logistic',
          identity: 'Identity'
        },
        solver: 'Solver',
        alpha: 'Alpha'
      },
      rnn: {
        algo: {
          brn: 'Basic RNN',
          birnn: 'Bi RNN',
          lstm: 'Long/Short Term Memory',
          gru: 'Gated Recurrent Units'
        },
        insize: 'Input Size',
        hiddensize: 'Hidden Layer Size',
        layers: 'Layers',
        param: "Parameter",
        activation: {
          title: 'Activation Function',
          relu: 'Relu',
          tanh: 'Tanh',
          logistic: 'Logistic',
          identity: 'Identity'
        },
      },
      cnn: {
        algo: {
          lenet: 'LeNet',
          alexnet: 'AlexNet',
          vggnet: 'VggNet',
          resnet: 'ResNet',

          googlenet: 'GoogLeNet',

          mobilev1: 'MobileNetV1',
          mobilev2: 'MobileNetV2',
          mobilev3: 'MobileNetV3',
          ghostnet: 'GhostNet',

          triplet: 'TripletNet',

          yolov1: 'YOLOv1',
          yolov2: 'YOLOv2',
          yolov3: 'YOLOv3',

          fcn: 'FCN',
          fastsc: 'FastSCNN',
          lednet: 'LEDNet',
          lrnnet: 'LRNNET',

          polar: 'PolarMask',
          facebox: 'FaceBox',
          varg: 'VarGFaceNet',

          hourg: 'Stacked Hourglass',
          lpn: 'LPN',
          
          senet: 'SE Net',
          scse: 'scSE',
          nlnet: 'NL Net',
          gcnet: 'GCNet',
          cbam: 'CBAM',

          sinet: 'SINet'
        },
        param: "Parameter"
      }
    }
  },
  error: {
    nameMiss: "Name shouldn't be empty!",
    sourceMiss: "Datasource shouldn't be empty!",
    queryMiss: "Query shouldn't be empty!",
    varMiss: "Some variable doesn't exist!",
  },
};
