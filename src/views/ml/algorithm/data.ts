import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

// index form columns
export const indexColumns: BasicColumn[] = [
  {
    title: t('common.table.title.category'),
    dataIndex: 'category',
    key: 'category',
    width: 100,
    sorter: true,
  },
  {
    title: t('common.table.title.name'),
    dataIndex: 'name',
    key: 'name',
    width: 200,
    sorter: true,
    resizable: true,
    align: 'left',
  },
  {
    title: t('common.table.title.group'),
    dataIndex: 'group',
    key: 'group',
    width: 100,
    sorter: true,
    resizable: true,
    align: 'left',
  },
  {
    title: t('common.table.title.desc'),
    dataIndex: 'desc',
    resizable: true,
    align: 'left',
  },
  {
    title: t('ml.algorithm.table.title.algo_name'),
    dataIndex: 'algoName',
    width: 200,
    sorter: true,
    align: 'left'
  },
  {
    title: t('ml.algorithm.table.title.framework'),
    dataIndex: 'framework',
    width: 120,
    sorter: true
  },
  {
    title: t('ml.algorithm.table.title.frame_ver'),
    dataIndex: 'frameVer',
    width: 120,
    sorter: true,
  },
  {
    title: t('ml.algorithm.table.title.dataset'),
    dataIndex: 'datasetName',
    width: 200,
    align: 'left'
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

// info form schema
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
    labelWidth: 200,
    colProps: { span: 24 },
  },
  {
    field: 'desc',
    label: t('common.table.title.desc'),
    component: 'InputTextArea',
    labelWidth: 200,
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
    labelWidth: 200,
    colProps: { span: 24 },
  },
  {
    field: 'createdBy',
    label: t('common.table.title.created_by'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 200,
    colProps: { span: 24 },
  },
  {
    field: 'createdAt',
    label: t('common.table.title.create_time'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 200,
    colProps: { span: 24 },
  },
  {
    field: 'updatedBy',
    label: t('common.table.title.updated_by'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 200,
    colProps: { span: 24 },
  },
  {
    field: 'updatedAt',
    label: t('common.table.title.update_time'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 200,
    colProps: { span: 24 },
  }
];

// algo form schema
export const formAlgoSchema: FormSchema[] = [
  {
    field: 'framework',
    label: t('ml.algorithm.table.title.framework'),
    required: true,
    defaultValue: 'sklearn',
    component: 'Select',
    componentProps: ({ formModel, formActionType }) => {
      return {
        allowClear: false,
        options: [
          { label: t('ml.algorithm.form.algo.framework.python'), value: 'python' },
          { label: t('ml.algorithm.form.algo.framework.sklearn'), value: 'sklearn' },
          { label: t('ml.algorithm.form.algo.framework.xgboost'), value: 'xgboost' },
          { label: t('ml.algorithm.form.algo.framework.lightgbm'), value: 'lightgbm' },
          { label: t('ml.algorithm.form.algo.framework.pytorch'), value: 'pytorch' },
          { label: t('ml.algorithm.form.algo.framework.tensorflow'), value: 'tensorflow' },
          { label: t('ml.algorithm.form.algo.framework.java'), value: 'java' },
          { label: t('ml.algorithm.form.algo.framework.js'), value: 'js' }
        ],
        onChange: (frame: any) => {
          let catOptions = [];
          if (frame == 'sklearn') {
            catOptions = [
              { label: t('ml.algorithm.form.algo.category.clf'), value: 'clf' },
              { label: t('ml.algorithm.form.algo.category.reg'), value: 'reg' },
              { label: t('ml.algorithm.form.algo.category.cluster'), value: 'cluster' }
            ];
          } else if (frame == 'pytorch') {
            catOptions = [
              { label: t('ml.algorithm.form.algo.category.vision'), value: 'vision' },
              { label: t('ml.algorithm.form.algo.category.audio'), value: 'audio' },
            ];
          }
          formModel.category = undefined; //  reset category value
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'category',
            componentProps: {
              options: catOptions
            },
          });
        }
      }
    },
    labelWidth: 80,
    colProps: { span: 24 }
  },
  {
    field: 'category',
    label: t('common.table.title.category'),
    required: true,
    component: 'Select',
    defaultValue: 'clf',
    componentProps: {
      allowClear: true,
      options: [
        { label: t('ml.algorithm.form.algo.category.clf'), value: 'clf' },
        { label: t('ml.algorithm.form.algo.category.reg'), value: 'reg' },
        { label: t('ml.algorithm.form.algo.category.cluster'), value: 'cluster' },
        { label: t('ml.algorithm.form.algo.category.vision'), value: 'vision' },
        { label: t('ml.algorithm.form.algo.category.audio'), value: 'audio' }
      ],
    },
    labelWidth: 80,
    colProps: { span: 24 }
  },
  {
    field: 'div-label',
    label: t('ml.algorithm.form.algo.algo_name'),
    component: 'Divider',
    componentProps: {
      style: {
        fontWeight: 'bold',
        borderColor: '#7cb305',
      }
    },
    colProps: { span: 24 }
  },
  {
    field: 'algoName',
    label: '',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'algoName'
  }
];

// data form schema
export const formDataSchema: FormSchema[] = [
  {
    field: 'shuffle',
    label: t('ml.algorithm.form.data.shuffle'),
    component: 'Switch',
    defaultValue: false,
    labelWidth: 70,
    colProps: { span: 24 }
  },
  {
    field: 'evalRatio',
    label: t('ml.algorithm.form.data.eval_ratio'),
    component: 'InputNumber',
    defaultValue: 0.2,
    componentProps: {
      min: 0,
      max: 0.5,
      step: 0.1,
    },
    labelWidth: 70,
    colProps: { span: 24 }
  },
  {
    field: 'div-label',
    label: t('ml.algorithm.form.data.dataset'),
    component: 'Divider',
    componentProps: {
      style: {
        fontWeight: 'bold',
        borderColor: '#7cb305',
      }
    },
    colProps: { span: 24 }
  },
  {
    field: 'dataset',
    label: '',
    component: 'Input',
    slot: 'dataset',
    labelWidth: 70,
    colProps: { span: 24 },
  }
];

// train & eval form schema
export const formTrainSchema: FormSchema[] = [
  {
    field: 'gpu',
    label: t('ml.algorithm.form.train.gpu'),
    component: 'Switch',
    defaultValue: false,
    labelWidth: 70,
    colProps: { span: 24 }
  },
  {
    field: 'trials',
    label: t('ml.algorithm.form.train.trials'),
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      min: 1,
      max: 20
    },
    labelWidth: 80,
    colProps: { span: 12 },
  },
  {
    field: 'epochs',
    label: t('ml.algorithm.form.train.epochs'),
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      min: 1,
      max: 100
    },
    labelWidth: 80,
    colProps: { span: 12 },
  },
  {
    field: 'timeout',
    label: t('ml.algorithm.form.train.timeout'),
    defaultValue: 5,
    component: 'InputNumber',
    componentProps: {
      min: 0,
      max: 60,
      addonAfter: 'min'
    },
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'score',
    label: t('ml.algorithm.form.train.metrics'),
    component: 'Input',
    slot: 'score',
    componentProps: {
      options: [
        { label: t('ml.algorithm.form.train.metrics.acc'), value: 'acc' },
        { label: t('ml.algorithm.form.train.metrics.r2'), value: 'r2' },
        { label: t('ml.algorithm.form.train.metrics.mape'), value: 'mape' },
        { label: t('ml.algorithm.form.train.metrics.auc'), value: 'auc' },
        { label: t('ml.algorithm.form.train.metrics.recall'), value: 'recall' },
        { label: t('ml.algorithm.form.train.metrics.prec'), value: 'prec' },
        { label: t('ml.algorithm.form.train.metrics.f1'), value: 'f1' },
        { label: t('ml.algorithm.form.train.metrics.kappa'), value: 'kappa' },
        { label: t('ml.algorithm.form.train.metrics.mcc'), value: 'mcc' },
        { label: t('ml.algorithm.form.train.metrics.mae'), value: 'mae' },
        { label: t('ml.algorithm.form.train.metrics.mse'), value: 'mse' },
        { label: t('ml.algorithm.form.train.metrics.rmse'), value: 'rmse' },
        { label: t('ml.algorithm.form.train.metrics.rmsle'), value: 'rmsle' }
      ],
    },
    labelWidth: 80,
    colProps: { span: 18 }
  },
  {
    field: 'threshold',
    label: '',
    component: 'InputNumber',
    colProps: { span: 6 },
  },
  {
    field: 'strategy',
    label: t('ml.algorithm.form.train.strategy'),
    component: 'Select',
    defaultValue: 'BasicVariantGenerator',
    componentProps: {
      options: [
        { label: 'BasicVariantGenerator', value: 'BasicVariantGenerator' },
        { label: 'AxSearch', value: 'AxSearch' },
        { label: 'BayesOptSearch', value: 'BayesOptSearch' },
        { label: 'TuneBOHB', value: 'TuneBOHB' },
        { label: 'HEBOSearch', value: 'HEBOSearch' },
        { label: 'HEBOSearch', value: 'HyperOptSearch' },
        { label: 'NevergradSearch', value: 'NevergradSearch' },
        { label: 'OptunaSearch', value: 'OptunaSearch' },
        { label: 'ZOOptSearch', value: 'ZOOptSearch' }
      ],
    },
    labelWidth: 80,
    colProps: { span: 24 }
  },
  {
    field: 'params',
    label: '',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'params'
  }
];

// chart form schema
export const formChartSchema: FormSchema[] = [
  {
    field: 'progress',
    label: t('ml.algorithm.form.chart.progress'),
    component: 'Input',
    slot: 'progress',
    labelWidth: 200,
    colProps: { span: 12 }
  },
  {
    field: 'accuracy',
    label: t('ml.algorithm.form.chart.accuracy'),
    component: 'Input',
    slot: 'accuracy',
    labelWidth: 200,
    colProps: { span: 12 }
  }
];

// chart form schema
export const formExperSchema: FormSchema[] = [
  {
    field: 'succOnly',
    label: t('ml.algorithm.form.experiment.succOnly'),
    defaultValue: true,
    component: 'Switch',
    labelWidth: 100,
    colProps: { span: 24 }
  },
  {
    field: 'trials',
    label: '',
    component: 'Input',
    slot: 'trials',
    labelWidth: 100,
    colProps: { span: 24 }
  }
];

export const paramColumns: BasicColumn[] = [
  {
    title: t('ml.algorithm.form.train.params.name'),
    dataIndex: 'name',
    width: 150,
    resizable: true,
    align: 'left',
    edit: false
  },
  {
    title: t('ml.algorithm.form.train.params.value'),
    dataIndex: 'value',
    resizable: true,
    align: 'left',
    edit: true
  }
];


// algo template
export const algoTplPython = `
from sklearn.{MODULE} import {TEMPLATE}
from mlflow.pyfunc import PythonModel

class MySklearnModel(PythonModel):
  
  def load_context(self, context):
        self.model = {TEMPLATE}()
        
  def fit(config):
    model = self.model({PARAMS}).fit({X}, {Y})
    
  def predict(self, context, model_input, params=None):
        if self.model is not None:
          return self.model.predict(model_input)
        else: 
          return None
`;

// algo template (for MLflowLoggerCallback())
export const algoTplSklearn = `
# python version: {PYTHON_VER}, sklearn version: {SKLEARN_VER}
import ray
import mlflow
import matplotlib
from mlflow.utils.mlflow_tags import MLFLOW_RUN_NAME, MLFLOW_USER
from sklearn.{MODULE} import {ALGORITHM}
from sklearn import metrics

class CustomTrain:
  def train(config: dict, data: dict):
    setup_mlflow()

    estimator = {ALGORITHM}({PARAMS})
    for epoch in range(config.get("epochs", {EPOCHS})):
      estimator.fit(data['x'], data['y'])
      metrics_fn = metrics.get_scorer('{SCORE_NAME}')
      metrics_value = metrics_fn(estimator, data['x'], data['y'])
      ray.train.report({"{SCORE_NAME}": metrics_value})
`;

// algo template (for setup_mlflow())
export const algoTplSklearn_backup = `
import mlflow
import ray
import matplotlib
from ray.air.integrations.mlflow import setup_mlflow
from sklearn.{MODULE} import {ALGORITHM}
from sklearn.metrics import *

class CustomAlgo:
  def train(config: dict, data: dict):
    setup_mlflow(
      config,
      experiment_id=config.get("exper_id", None),
      experiment_name=config.get("exper_name", None),
      tracking_uri=config.get("tracking_uri", None),
      artifact_location=config.get("artifact_location", None),
      create_experiment_if_not_exists=True,
      run_name=config.get("run_name", None),
      tags=config.get("exper_tags", None)
    )
    mlflow.set_tracking_uri(config.get("tracking_url"))
    mlflow.set_experiment(experiment_id=config.get("exper_id"))
    # mlflow.set_tag(MLFLOW_RUN_NAME, ray.train.get_context().get_trial_id())
    # mlflow.set_tag(MLFLOW_USER, f'{config.get("org_id")}_{config.get("user_id")}_{config.get("user_name")}')
    matplotlib.use('agg')
    mlflow.autolog()

    model = {ALGORITHM}({PARAMS})
    for epoch in range(config.get("epochs", 1)):
      model.fit(data['x'], data['y'])
      y_predict = model.predict(data['x'])
      {METRIC_FUNC}
      ray.train.report({{METRICS}})
`;
