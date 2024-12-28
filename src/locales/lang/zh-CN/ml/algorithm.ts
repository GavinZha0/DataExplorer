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
