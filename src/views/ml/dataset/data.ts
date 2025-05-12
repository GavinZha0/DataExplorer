import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

// index form columns
export const indexColumns: BasicColumn[] = [
  {
    title: t('common.table.title.type'),
    dataIndex: 'type',
    key: 'type',
    width: 80,
    sorter: true
  },
  {
    title: t('common.table.title.name'),
    dataIndex: 'name',
    width: 180,
    align: 'left',
    sorter: true,
    resizable: true,
  },
  {
    title: t('common.table.title.desc'),
    dataIndex: 'desc',
    align: 'left',
    width: 250,
    resizable: true,
  },
  {
    title: t('common.table.title.group'),
    dataIndex: 'group',
    width: 100,
    align: 'left',
    sorter: true,
    resizable: true,
  },
  {
    title: t('ml.dataset.table.title.volume'),
    dataIndex: 'volume',
    align: 'left',
    width: 100,
    resizable: true,
  },
  {
    title: t('ml.dataset.table.title.features'),
    dataIndex: 'features',
    align: 'left',
    resizable: true,
  },
  {
    title: t('ml.dataset.table.title.target'),
    dataIndex: 'target',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: t('ml.dataset.table.title.source'),
    dataIndex: 'sourceName',
    align: 'left',
    sorter: true,
    width: 200,
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


// stat form columns
export const dataStatColumns: BasicColumn[] = [
  {
    title: t('common.table.title.name'),
    dataIndex: 'name',
    key: 'name',
    width: 150,
    resizable: true,
    align: 'left'
  },
  {
    title: t('ml.dataset.tab.stats.dataType'),
    dataIndex: 'type',
    width: 80,
    align: 'left',
    resizable: true
  },
  {
    title: t('ml.dataset.tab.stats.nunique'),
    dataIndex: 'nunique',
    width: 80,
    align: 'left',
    resizable: true
  },
  {
    title: t('ml.dataset.tab.stats.unique'),
    dataIndex: 'unique',
    align: 'left',
    resizable: true
  },
  {
    title: t('ml.dataset.tab.stats.missing'),
    dataIndex: 'missing',
    width: 90,
    sorter: true,
    align: 'left',
    resizable: true
  },
  {
    title: t('ml.dataset.tab.stats.min'),
    dataIndex: 'min',
    width: 100,
    sorter: true,
    align: 'left',
    resizable: true,
    ellipsis: false
  },
  {
    title: t('ml.dataset.tab.stats.pct25'),
    dataIndex: 'pct25',
    width: 100,
    sorter: true,
    align: 'left',
    resizable: true,
    ellipsis: false
  },
  {
    title: t('ml.dataset.tab.stats.median'),
    dataIndex: 'median',
    width: 100,
    sorter: true,
    align: 'left',
    resizable: true,
    ellipsis: false
  },
  {
    title: t('ml.dataset.tab.stats.mean'),
    dataIndex: 'mean',
    width: 100,
    sorter: true,
    align: 'left',
    resizable: true,
    ellipsis: false
  },
  {
    title: t('ml.dataset.tab.stats.pct75'),
    dataIndex: 'pct75',
    width: 100,
    sorter: true,
    align: 'left',
    resizable: true,
    ellipsis: false
  },
  {
    title: t('ml.dataset.tab.stats.max'),
    dataIndex: 'max',
    width: 100,
    sorter: true,
    align: 'left',
    resizable: true,
    ellipsis: false
  },
  {
    title: t('ml.dataset.tab.stats.std'),
    dataIndex: 'std',
    width: 90,
    sorter: true,
    align: 'left',
    resizable: true,
    ellipsis: false
  },
  {
    title: t('ml.dataset.tab.stats.variance'),
    dataIndex: 'variance',
    width: 90,
    sorter: true,
    align: 'left',
    ellipsis: false,
    resizable: true
  },
  {
    title: t('ml.dataset.tab.stats.min_gap'),
    dataIndex: 'gap',
    width: 60,
    ellipsis: false,
    resizable: true
  },
];

// image stat form columns
export const imgStatColumns: BasicColumn[] = [
  {
    title: t('common.table.title.name'),
    dataIndex: 'name',
    width: 60,
    align: 'left'
  },
  {
    title: t('ml.dataset.tab.stats.dataType'),
    dataIndex: 'type',
    width: 80,
    align: 'left'
  },
  {
    title: t('ml.dataset.tab.stats.mode'),
    dataIndex: 'mode',
    width: 60,
    align: 'left'
  },
  {
    title: t('ml.dataset.tab.stats.channel'),
    dataIndex: 'channel',
    width: 70,
    align: 'left'
  },
  {
    title: t('ml.dataset.tab.stats.size'),
    dataIndex: 'size',
    width: 70,
    align: 'left'
  },
  {
    title: t('ml.dataset.tab.stats.nunique'),
    dataIndex: 'nunique',
    width: 80,
    align: 'left',
    resizable: true
  },
  {
    title: t('ml.dataset.tab.stats.unique'),
    dataIndex: 'unique',
    align: 'left'
  },
];

// Table fields
export const tableColumns: BasicColumn[] = [
  {
    title: t('ml.dataset.table.title.field'),
    dataIndex: 'name',
    width: 120,
    align: 'left',
    resizable: true,
  },
  {
    title: t('common.table.title.type'),
    dataIndex: 'type',
    width: 100,
    align: 'left',
    resizable: true,
  },
];

// info form schema include all fields but some are hidden
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
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'desc',
    label: t('common.table.title.desc'),
    component: 'InputTextArea',
    labelWidth: 80,
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
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'createdBy',
    label: t('common.table.title.created_by'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'createdAt',
    label: t('common.table.title.create_time'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'updatedBy',
    label: t('common.table.title.updated_by'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 80,
    colProps: { span: 24 },
  },
  {
    field: 'updatedAt',
    label: t('common.table.title.update_time'),
    component: 'Input',
    dynamicDisabled: () => true,
    ifShow: ({ values }) => values.id,
    labelWidth: 80,
    colProps: { span: 24 },
  },
];

// csv form schema
export const formConfigCsvSchema: FormSchema[] = [
  {
    field: 'delimiter',
    label: t('ml.dataset.form.csv.delimiter'),
    component: 'Select',
    defaultValue: ',',
    labelWidth: 80,
    colProps: { span: 24 },
    componentProps: {
      allowClear: false,
      options: [
        { label: t('ml.dataset.form.csv.comma'), value: ',' },
        { label: t('ml.dataset.form.csv.colon'), value: ':' },
        { label: t('ml.dataset.form.csv.tab'), value: '\t' },
      ],
    },
  },
];

// transform form schema for image
export const formTransformSchema: FormSchema[] = [
  {
    field: 'operation',
    component: 'Select',
    label: t('ml.dataset.form.transform.operation'),
    componentProps: {
      options: [
        { label: t('ml.dataset.form.transform.operation.crop'), value: 'crop' }, // 剪裁
        { label: t('ml.dataset.form.transform.operation.resize'), value: 'resize' }, // 缩放
        { label: t('ml.dataset.form.transform.operation.pad'), value: 'pad' }, // 对图像边框进行填充
        { label: t('ml.dataset.form.transform.operation.brightness'), value: 'brightness' }, // 亮度
        { label: t('ml.dataset.form.transform.operation.contrast'), value: 'contrast' }, // 对比度
        { label: t('ml.dataset.form.transform.operation.saturation'), value: 'saturation' }, // 饱和度
        { label: t('ml.dataset.form.transform.operation.sharpness'), value: 'sharpness' }, // 锐度
        { label: t('ml.dataset.form.transform.operation.hue'), value: 'hue' }, // 色调
        { label: t('ml.dataset.form.transform.operation.rotate'), value: 'rotate' }, // 旋转角度
        { label: t('ml.dataset.form.transform.operation.blur'), value: 'blur' }, // 高斯模糊
        { label: t('ml.dataset.form.transform.operation.grayscale'), value: 'grayscale' }, // 将图像转换为灰度图像
        { label: t('ml.dataset.form.transform.operation.hflip'), value: 'hflip' }, // 水平翻转
        { label: t('ml.dataset.form.transform.operation.vflip'), value: 'vflip' }, // 垂直翻转
      ],
    },
    colProps: { span: 24 }
  },
  {
    field: 'param',
    component: 'Input',
    label: t('ml.dataset.form.transform.param')
  }
];

export const varModalSchemas: FormSchema[] = [
  {
    field: 'type',
    label: t('ml.dataset.form.var.type'),
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: t('ml.dataset.form.var.cat.number'), value: 'number' },
        { label: t('ml.dataset.form.var.cat.string'), value: 'string' },
        { label: t('ml.dataset.form.var.cat.bool'), value: 'bool' },
        { label: t('ml.dataset.form.var.cat.ts'), value: 'timestamp' },
        { label: t('ml.dataset.form.var.cat.arrayN'), value: '[number]' },
        { label: t('ml.dataset.form.var.cat.arrayS'), value: '[string]' },
      ],
    },
    colProps: { span: 24 },
  },
  {
    field: 'name',
    component: 'Input',
    required: true,
    label: t('ml.dataset.form.var.name'),
    colProps: { span: 24 },
  },
  {
    field: 'value',
    component: 'Input',
    required: true,
    label: t('ml.dataset.form.var.value'),
    colProps: { span: 24 },
  },
];

// transform form schema
export const formConfigTransformSchema: FormSchema[] = [
  {
    field: 'miss',
    label: t('ml.dataset.form.transform.miss'),
    component: 'Select',
    labelWidth: 80,
    colProps: { span: 24 },
    componentProps: {
      allowClear: true,
      options: [
        { label: 'Drop', value: 'drop' },
        { label: 'Fill min', value: 'min' },
        { label: 'Fill max', value: 'max' },
        { label: 'Fill mean', value: 'mean' },
        { label: 'Fill median', value: 'median' },
        { label: 'Fill prev', value: 'prev' },
        { label: 'Fill next', value: 'next' },
        { label: 'Fill zero', value: 'zero' }
      ],
    },
  },
  {
    field: 'encode',
    label: t('ml.dataset.form.transform.encode'),
    component: 'Select',
    labelWidth: 80,
    colProps: { span: 24 },
    componentProps: {
      allowClear: true,
      options: [
        { label: 'Ordinal', value: 'ordinal' },
        { label: 'One-Ho', value: 'onehot' },
        { label: 'Binary', value: 'binary' },
        { label: 'Hashing', value: 'hash' },
        { label: 'Count', value: 'count' },
        { label: 'Mean', value: 'mean' },
        { label: 'WOE', value: 'woe' },
        { label: 'Binning', value: 'bins' },
        { label: 'Leave One Out', value: 'loo' }
      ],
    },
  },
  {
    field: 'scale',
    label: t('ml.dataset.form.transform.scale'),
    component: 'Select',
    labelWidth: 80,
    colProps: { span: 24 },
    componentProps: {
      allowClear: true,
      options: [
        { label: 'Min-Max', value: 'minmax' },
        { label: 'Standardization', value: 'std' },
        { label: 'Normal-L1', value: 'l1' },
        { label: 'Normal-L2', value: 'l2' },
        { label: 'Normal-Max', value: 'max' },
        { label: 'MaxAbs', value: 'abs' },
        { label: 'Robust', value: 'robust' },
        { label: 'Logarithm', value: 'log' }
      ]
    }
  }
];


