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
      tags: 'Tags',
      algo_name: 'Reference Algo',
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
      category: {
        sklearn: 'Scikit-Learn',
        classic: 'Classic',
        pytorch: 'PyTorch',
        ann: 'ANN',
        som: 'SOM',
        minisom: 'MiniSOM',
        boost: 'Boosting',
        xgboost: 'XGBoost',
        catboost: 'CatBoost',
        lightgbm: 'LightGBM',
        classifier: 'Classifier',
        regressor: 'Regressor',
        cluster: 'Cluster',
        transformer: 'Transformer',
        vision: 'Vison',
        audio: 'Audio',
        custom: 'Custom'
      },
      algo_name: 'Algorithm'
    },
    data: {
      dataset: 'Dataset',
      eval_ratio: 'Eval ratio',
      shuffle: 'Shuffle',
      batch_size: 'Batch size'
    },
    train: {
      gpu: 'GPU',
      strategy: 'Strategy',
      trials: 'Trials',
      epochs: 'Epochs',
      timeout: 'Trail timeout',
      metrics: 'Eval metric',
      params: {
        name: 'Param',
        value: 'Search space'
      },
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
