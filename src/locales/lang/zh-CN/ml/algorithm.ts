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
      tags: '标签',
      algo_name: '参考算法',
      dataset: 'Dataset',
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
      category: {
        sklearn: 'Scikit-Learn',
        classic: '经典算法',
        ann: '人工神经网络',
        som: '自组织映射',
        minisom: 'MiniSOM',
        boost: '提升树',
        xgboost: 'XGBoost',
        lightgbm: 'LightGBM',
        catboost: 'CatBoost',
        pytorch: 'PyTorch',
        classifier: '分类算法',
        regressor: '回归算法',
        cluster: '聚类算法',
        transformer: 'Transformer',
        vision: '影像算法',
        audio: '语音算法',
        custom: '自定义算法'
      },
      algo_name: '算法'
    },
    data: {
      dataset: '数据集',
      eval_ratio: '分割比例',
      shuffle: '洗牌',
      batch_size: '批数据大小'
    },
    train: {
      gpu: 'GPU',
      strategy: '策略',
      trials: '训练次数',
      epochs: '迭代次数',
      timeout: '超时',
      metrics: '评估指标',
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
