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
        xgboost: 'XGBoost',
        lightgbm: 'LightGBM',
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
      algo_name: 'Algorithm'
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
      timeout: 'Trail timeout',
      metrics: 'Metrics',
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
