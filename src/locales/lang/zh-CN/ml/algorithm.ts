export default {
  tab: {
    manage: 'Manage',
    editor: 'Editor',
    view: 'View',
  },
  toolbar: {
    search: 'name, category or description',
  },
  table: {
    title: {
      language: '语言',
      lang_ver: '语言版本',
      version: '版本',
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
        clf: '分类',
        reg: '回归',
        cluster: '聚类',
        vision: '影像',
        audio: '语音'
      },
      algo_name: '算法'
    },
    data: {
      dataset: '数据集',
      eval_ratio: '分割比例',
      shuffle: '洗牌'
    },
    train: {
      gpu: 'GPU',
      strategy: '策略',
      trials: 'Trials',
      epochs: 'Epochs',
      timeout: '超时',
      metrics: '指标',
      params: {
        name: '参数',
        value: '搜索空间'
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
