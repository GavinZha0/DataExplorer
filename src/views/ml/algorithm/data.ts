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
    title: t('common.table.title.desc'),
    dataIndex: 'desc',
    resizable: true,
    align: 'left'
  },
  {
    title: t('common.table.title.group'),
    dataIndex: 'group',
    key: 'group',
    width: 150,
    sorter: true,
    resizable: true,
    align: 'left',
  },
  {
    title: t('ml.algorithm.table.title.tags'),
    dataIndex: 'tags',
    align: 'left'
  },
  {
    title: t('ml.algorithm.table.title.algo_name'),
    dataIndex: 'algoName',
    width: 300,
    sorter: true,
    align: 'left'
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
    field: 'tags',
    label: t('ml.algorithm.table.title.tags'),
    component: 'Select',
    labelWidth: 200,
    colProps: { span: 24 },
    componentProps: {
      mode: "tags"
    }
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
    field: 'category',
    label: t('common.table.title.category'),
    required: true,
    labelWidth: 80,
    colProps: { span: 24 },
    component: 'TreeSelect',
    componentProps: {
      treeData: [
        {
          label: t('ml.algorithm.form.algo.category.ann'),
          value: 'ann',
          selectable: false,
          children: [
            {
              label: t('ml.algorithm.form.algo.category.som'),
              value: 'ann.som'
            },
          ] 
        },
        {
          label: t('ml.algorithm.form.algo.category.boost'),
          value: 'boost',
          selectable: false,
          children: [
            {
              label: t('ml.algorithm.form.algo.category.xgboost'),
              value: 'boost.xgboost'
            },
            {
              label: t('ml.algorithm.form.algo.category.lightgbm'),
              value: 'boost.lightgbm'
            },
            {
              label: t('ml.algorithm.form.algo.category.catboost'),
              value: 'boost.catboost'
            }
          ] 
        },
        {
          label: t('ml.algorithm.form.algo.category.sklearn'),
          value: 'sklearn',
          selectable: false,
          children: [
            {
              label: t('ml.algorithm.form.algo.category.classifier'),
              value: 'sklearn.classifier'
            },
            {
              label: t('ml.algorithm.form.algo.category.regressor'),
              value: 'sklearn.regressor'
            },
            {
              label: t('ml.algorithm.form.algo.category.cluster'),
              value: 'sklearn.cluster'
            },
            {
              label: t('ml.algorithm.form.algo.category.transformer'),
              value: 'sklearn.transformer'
            }
          ]
        },
        {
          label: t('ml.algorithm.form.algo.category.pytorch'),
          value: 'pytorch',
          selectable: false,
          children: [
            {
              label: t('ml.algorithm.form.algo.category.vision'),
              value: 'pytorch.vision'
            },
            {
              label: t('ml.algorithm.form.algo.category.audio'),
              value: 'pytorch.audio'
            },
            {
              label: t('ml.algorithm.form.algo.category.custom'),
              value: 'pytorch.custom'
            }
          ]
        },
      ],
    },
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
    colProps: { span: 12 }
  },
  {
    field: 'batchSize',
    label: t('ml.algorithm.form.data.batch_size'),
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
    field: 'metrics',
    label: t('ml.algorithm.form.train.metrics'),
    component: 'Input',
    slot: 'metrics',
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

// algo template of sklearn
export const algoTplSklearn = `
# python version: {PYTHON_VER}, sklearn version: {SKLEARN_VER}
import ray
from sklearn import metrics
from sklearn.{MODULE} import {ALGORITHM}

class CustomTrain:
  def train(config: dict, data: dict):
    train_y = val_x = val_y = None
    train_x = data.get('train').to_pandas()
    if config['targets']:
      train_y = train_x[config['targets']]
      train_x = train_x.drop(columns=config['targets'])

    if data.get('validation'):
      val_x = data.get('validation').to_pandas()
      if config['targets']:
        val_y = val_x[config['targets']]
        val_x = val_x.drop(columns=config['targets'])
    else:
      val_x = train_x
      val_y = train_y

    estimator = {ALGORITHM}({PARAMS})
    estimator.fit(train_x, train_y)
    val_pred = estimator.predict(val_x)
    metrics_fn = metrics.get_scorer('{METRIC_NAME}')
    metrics_value = metrics_fn(estimator, val_x, val_y)
    ray.train.report({"{METRIC_NAME}": metrics_value})
`;

// algo template of lightning for data
export const algoTplPytorch = `
# pytorch version: {PYTORCH_VER}, lightning version: {LIGHTNING_VER}
import torch.nn as nn
import torch.nn.functional as F
import lightning.pytorch as pl
from {MODULE}.models import {ALGORITHM}

class CustomModel(pl.LightningModule):
    def __init__(self,config: dict):
        super().__init__()
        self.config = config
        self.model = {ALGORITHM}({PARAMS})
        # update base model
        self.model.conv1 = nn.Conv2d(
          1, 64, kernel_size=(7, 7), stride=(2, 2), padding=(3, 3), bias=False
        )

    def forward(self, x):
        return self.model(x)

    def training_step(self, batch, batch_idx):
        x, y = batch
        y_hat = self(x)
        loss = F.cross_entropy(y_hat, y)
        self.log('train_loss', loss)
        return loss

    def validation_step(self, batch, batch_idx):
        x, y = batch
        y_hat = self(x)
        loss = F.cross_entropy(y_hat, y)
        self.log('val_loss', loss)
        return loss

    def configure_optimizers(self):
        optimizer = torch.optim.Adam(self.parameters(), lr=self.config.get('lr', 0.001))
        return optimizer
`;

// algo template of MLP(FNN)
export const algoTplPytorchMLP = `
# pytorch version: {PYTORCH_VER}, lightning version: {LIGHTNING_VER}
import torch.nn as nn
import torch.nn.functional as F
import lightning.pytorch as pl

class CustomMlpModel(pl.LightningModule):
    def __init__(self,config: dict):
        super().__init__()
        self.config = config
        # define model
        self.model = nn.Sequential(
            nn.Linear(config.get('input_size'), 128),
            nn.ReLU(),
            nn.Linear(128, 256)
            nn.ReLU(),
            nn.Linear(256, config.get('output_size'))
          )

    def forward(self, x):
        return self.model(x)

    def training_step(self, batch, batch_idx):
        x, y = batch
        y_hat = self(x)
        loss = F.cross_entropy(y_hat, y)
        self.log('train_loss', loss)
        return loss

    def validation_step(self, batch, batch_idx):
        x, y = batch
        y_hat = self(x)
        loss = F.cross_entropy(y_hat, y)
        self.log('val_loss', loss)
        return loss

    def configure_optimizers(self):
        optimizer = torch.optim.Adam(self.parameters(), lr=self.config.get('lr', 0.001))
        return optimizer
`;


// algo template of FNN
export const algoTplPytorchRNN = `
# pytorch version: {PYTORCH_VER}, lightning version: {LIGHTNING_VER}
import torch.nn as nn
import torch.nn.functional as F
import lightning.pytorch as pl

class CustomRnnModel(pl.LightningModule):
    def __init__(self,config: dict):
        super().__init__()
        self.config = config
        # define model
        self.rnn = nn.RNN(
            input_size=config.get('input_size'),
            hidden_size=config.get('hidden_size'),
            num_layers=config.get('num_layers'),
            batch_first=config.get('batch_first')
        )
        self.fc = nn.Linear(config.get('hidden_size'), config.get('output_size'))
        self.criteria = nn.MSELoss()

    def forward(self, x):
        h0 = torch.zeros(1, x.size(0), hidden_size).to(x.device)
        out, _ = self.rnn(x, h0)
        out = self.fc(out)
        return out

    def training_step(self, batch, batch_idx):
        x, y = batch
        y_hat = self(x)
        loss = self.criteria(y_hat, y)
        self.log('train_loss', loss)
        return loss

    def validation_step(self, batch, batch_idx):
        x, y = batch
        y_hat = self(x)
        loss = self.criteria(y_hat, y)
        self.log('val_loss', loss)
        return loss

    def configure_optimizers(self):
        optimizer = torch.optim.Adam(self.parameters(), lr=self.config.get('lr', 0.001))
        return optimizer
`;

// algo template of CNN
export const algoTplPytorchCNN = `
# pytorch version: {PYTORCH_VER}, lightning version: {LIGHTNING_VER}
import torch.nn as nn
import torch.nn.functional as F
import lightning.pytorch as pl

class CustomCnnModel(pl.LightningModule):
    def __init__(self,config: dict):
        super().__init__()
        self.config = config
        # define model
        self.model = nn.Sequential(
            nn.Conv2d(3,32,5,padding=2),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, 5, padding=2),
            nn.MaxPool2d(2),
            nn.Flatten(),
            nn.Linear(1024, 64),
            nn.Linear(64, config.get('output_size'))
        ）

    def forward(self, x):
        return self.model(x)

    def training_step(self, batch, batch_idx):
        x, y = batch
        y_hat = self(x)
        loss = F.mse_loss(y_hat, y)
        self.log('train_loss', loss)
        return loss

    def validation_step(self, batch, batch_idx):
        x, y = batch
        y_hat = self(x)
        loss = F.mse_loss(y_hat, y)
        self.log('val_loss', loss)
        return loss

    def configure_optimizers(self):
        optimizer = torch.optim.Adam(self.parameters(), lr=self.config.get('lr', 0.001))
        return optimizer
`;

// algo template of CNN
export const algoTplPytorchLSTM = `
# pytorch version: {PYTORCH_VER}, lightning version: {LIGHTNING_VER}
import torch.nn as nn
import torch.nn.functional as F
import lightning.pytorch as pl
from torchmetrics.regression import MeanSquaredError

class CustomLstmModel(pl.LightningModule):
    def __init__(self,config: dict):
        super().__init__()
        self.config = config
        # batch_first is for input shape (batch_size, seq_len, input_size)
        self.lstm = torch.nn.LSTM(input_size=config.get('input_size', 1), hidden_size=config.get('hidden_size', 10),
                            num_layers=config.get('num_layers', 1), batch_first=True)
        self.fc = torch.nn.Linear(config.get('hidden_size', 10), config.get('output_size', 1))
        self.eval_func = MeanSquaredError()

    def forward(self, x):
        # x's shape: (batch_size, seq_len, input_size)
        # lstm's output: out, (hidden_out, cell_out)
        _, (hidden_out, _) = self.lstm(x)
        # when batch_first is Ture, out shape: (batch_size, seq_len, num_directions * hidden_size)
        # hidden_out's shape: (num_layers*num_directions, batch_size, hidden_size)
        # For bidirectional LSTMs, forward and backward are directions 0 and 1 respectively.
        # put last hidden_out(batch_size, hidden_size) into linear()
        # return shape: (batch_size, output_size)
        return self.fc(hidden_out[-1])

    def training_step(self, batch, batch_idx):
        # x's shape (batch_size, seq_len, input_size)
        x, y = batch
        y_hat = self(x)
        loss = F.mse_loss(y_hat, y)
        self.log('train_loss', loss)
        return loss

    def validation_step(self, batch, batch_idx):
        x, y = batch
        y_hat = self(x)
        loss = self.eval_func(y_hat, y)
        self.log('val_loss', loss)
        return loss

    def configure_optimizers(self):
        optimizer = torch.optim.Adam(self.parameters(), lr=self.config.get('lr', 0.001))
        return optimizer
`;

// algo template of xgboost
export const algoTplXGBoost = `
# python version: {PYTHON_VER}, XGBoost version: {XGBOOST_VER}
import ray
from ray.tune.integration.xgboost import TuneReportCheckpointCallback
import xgboost as xgb

class CustomXGBoostTrain:
  def train(config: dict, data: dict):
    train_y = val_x = val_y = None
    dataset = data.get('train').to_pandas()
    train_x = dataset.drop(columns=config['targets'])
    train_y = dataset[config['targets']]

    if data.get('validation'):
      dataset = data.get('validation').to_pandas()
      val_x = dataset.drop(columns=config['targets'])
      val_y = dataset[config['targets']]
    else:
      val_x = train_x
      val_y = train_y

    train_set = xgb.DMatrix(train_x, label=train_y)
    val_set = xgb.DMatrix(val_x, label=val_y)
    xgb.train(
      config,
      train_set,
      evals=[(val_set, 'eval')],
      callbacks=[TuneReportCheckpointCallback()])
`;

// algo template of xgboost
export const algoTplXGBoost1 = `
# python version: {PYTHON_VER}, XGBoost version: {XGBOOST_VER}
import ray
from ray.tune.integration.xgboost import TuneReportCheckpointCallback
import xgboost as xgb

class CustomXGBoostTrain:
  def train(config: dict, data: dict):
    train_y = val_x = val_y = None
    train_x = data.get('train').to_pandas()
    if config['targets']:
      train_y = train_x[config['targets']]
      train_x = train_x.drop(columns=config['targets'])

    if data.get('validation'):
      val_x = data.get('validation').to_pandas()
      if config['targets']:
        val_y = val_x[config['targets']]
        val_x = val_x.drop(columns=config['targets'])
    else:
      val_x = train_x
      val_y = train_y

    estimator = xgb.{ALGORITHM}({PARAMS})
    estimator.fit(train_x, train_y, eval_set=[(val_x, val_y)])
`;

// algo template of LightGBM
export const algoTplLightGBM = `
# python version: {PYTHON_VER}, XGBoost version: {LIGHTGBM_VER}
import ray
from ray.tune.integration.lightgbm import TuneReportCheckpointCallback
import lightgbm as lgb
# from sklearn import metrics

class CustomLightGbmTrain:
  def train(config: dict, data: dict):
    train_y = val_x = val_y = None
    dataset = data.get('train').to_pandas()
    train_x = dataset.drop(columns=config['targets'])
    train_y = dataset[config['targets']]

    if data.get('validation'):
      dataset = data.get('validation').to_pandas()
      val_x = dataset.drop(columns=config['targets'])
      val_y = dataset[config['targets']]
    else:
      val_x = train_x
      val_y = train_y

    train_set = lgb.Dataset(train_x, label=train_y)
    val_set = lgb.Dataset(val_x, label=val_y)
    lgb.train(
      config,
      train_set,
      valid_sets=[val_set],
      valid_names=['eval'],
      callbacks=[TuneReportCheckpointCallback()])
`;


