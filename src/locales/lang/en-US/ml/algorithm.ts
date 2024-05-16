export default {
  tab: {
    editor: 'Editor',
    history: 'History',
  },
  toolbar: {
    search: 'name, group or description',
  },
  table: {
    title: {
      framework: 'Framework',
      frame_ver: 'Frame Ver',
      version: 'Version',
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
    info: {
      type: {
        clf: 'Classification',
        reg: 'Regression',
        cluster: 'Clustering'
      },
      framework: {
        python: 'Python',
        sklearn: 'Sk-Learn',
        pytorch: 'PyTorch',
        tensorflow: 'Tensorflow',
        java: 'Java',
        js: 'Javascript'
      }
    },
    config: {
      train: 'Train Function',
      predict: 'Predict Function',
      dataset: 'Dataset',
      test_ratio: 'Test Ratio',
      init: 'Init Params',
      timeout: 'Timeout(min)',
      metric: {
        title: 'Validation Metric',
        accuracy: 'Accuracy',
        auc: 'AUC',
        mse: 'MSE'
      }
    },
    chart: {
      progress: 'Progress',
      accuracy: 'Accuracy'
    },
    history: {
      succOnly: 'Success Only',
      experment: 'Experment'
    },
  },
  error: {
    nameMiss: "Name shouldn't be empty!",
    sourceMiss: "Datasource shouldn't be empty!",
    queryMiss: "Query shouldn't be empty!",
    varMiss: "Some variable doesn't exist!",
  },
};
