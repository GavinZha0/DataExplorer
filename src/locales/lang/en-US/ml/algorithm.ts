export default {
  tab: {
    development: 'Development',
    experiment: 'Experiment',
  },
  toolbar: {
    search: 'name, group or description',
  },
  table: {
    title: {
      framework: 'Framework',
      frame_ver: 'Frame Ver',
      algo_name: 'Algo Name',
      dataset: 'Dataset',
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
    algo: {
      framework: {
        python: 'Python',
        sklearn: 'Sk-Learn',
        pytorch: 'PyTorch',
        tensorflow: 'Tensorflow',
        java: 'Java',
        js: 'Javascript'
      },
      category: {
        clf: 'Classification',
        reg: 'Regression',
        cluster: 'Clustering',
        vision: 'Vison',
        audio: 'Audio'
      },
      algo_name: 'Algorithm',
      params: {
        name: 'Training param',
        value: 'Values'
      }
    },
    data: {
      dataset: 'Dataset',
      eval_ratio: 'Eval ratio',
      shuffle: 'Shuffle'
    },
    train: {
      gpu: 'GPU',
      strategy: 'Strategy',
      trials: 'Trials',
      epochs: 'Epochs',
      timeout: 'Timeout',
      early_stop: {
        title: 'Early stop',
        name: 'Evaluation metric',
        value: 'Target',
        acc: 'Accuracy',
        r2: 'R2',
        mape: 'MAPE',
        auc: 'AUC',
        recall: 'Recall',
        prec: 'Precision',
        f1: 'F1',
        kappa: 'Kappa',
        mcc: 'MCC',
        mae: 'MAE',
        mse: 'MSE',
        rmse: 'RMSE',
        rmsle: 'RMSLE'
      }
    },
    chart: {
      progress: 'Progress',
      accuracy: 'Accuracy'
    },
    experiment: {
      succOnly: 'Success Only',
      trials: 'Trials'
    },
  },
  error: {
    nameMiss: "Name shouldn't be empty!",
    sourceMiss: "Datasource shouldn't be empty!",
    queryMiss: "Query shouldn't be empty!",
    varMiss: "Some variable doesn't exist!",
  },
};
