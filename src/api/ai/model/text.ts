
export interface ApiImageDataType {
  id?: number;
  name?: string;
  description?: string;
  category?: string;
  type?: string;
  modelId: number;
  platform?: string;
  platformVer?: string;
  content: any[];
  pubFlag?: boolean;
  status?: number;
  createdBy?: string;
  createTime?: string;
  updatedBy?: string;
  updateTime?: string;
}

//initial value of dataset
export const initImageData: ApiImageDataType = {
  id: 0,
  name: '',
  description: '',
  category: '',
  type: 'Classification',
  modelId: 0,
  platform: 'DJL',
  platformVer: '2.0',
  content: [],
  pubFlag: false,
  status: 0,
  createdBy: '',
  createTime: '',
  updatedBy: '',
  updateTime: ''
};

export const iniImageOptions = {
  field: ['auto drive'],
  type: ['Classification', 'Object Detection', 'Semantic Segmentation', 'Pose Estimation', 'Action Recognition', 'Image Enhancement', 'Image To Text', 'Style Transfer'],
  platform: ['DL4J', 'DJL', 'Python'],
  platformVer: {DL4J:['M1', 'M2'], DJL: ['0.17.0'], Python: ['3.8']}
};

export const customTheme = {
  // image 左上角度图片
  'common.bi.image': '', // 在这里换上你喜欢的logo图片
  'common.bisize.width': '0px',
  'common.bisize.height': '0px',
  'common.backgroundImage': 'none',
  'common.backgroundColor': 'black',
  'common.border': '1px solid #444',

  // header
  'header.backgroundImage': 'none',
  'header.backgroundColor': '#f3f4f6',
  'header.border': '0px',
  'header.display': 'none',

  // load/download button
  'loadButton.display': 'none', // 可以直接隐藏掉
  'downloadButton.display': 'none', // 可以直接隐藏掉

  // icons default
  'menu.normalIcon.color': 'green',
  'menu.activeIcon.color': 'blue',
  'menu.disabledIcon.color': 'gray',
  'menu.hoverIcon.color': 'orange',
  'submenu.normalIcon.color': '#8a8a8a',
  'submenu.activeIcon.color': '#e9e9e9',

  'menu.iconSize.width': '24px',
  'menu.iconSize.height': '24px',
  'submenu.iconSize.width': '32px',
  'submenu.iconSize.height': '32px',

  // submenu primary color
  'submenu.backgroundColor': '#1e1e1e',
  'submenu.partition.color': '#858585',

  // submenu labels
  'submenu.normalLabel.color': '#858585',
  'submenu.normalLabel.fontWeight': 'lighter',
  'submenu.activeLabel.color': '#fff',
  'submenu.activeLabel.fontWeight': 'lighter',

  // checkbox style
  'checkbox.border': '1px solid #ccc',
  'checkbox.backgroundColor': '#fff',

  // rango style
  'range.pointer.color': '#fff',
  'range.bar.color': '#666',
  'range.subbar.color': '#d1d1d1',

  'range.disabledPointer.color': '#414141',
  'range.disabledBar.color': '#282828',
  'range.disabledSubbar.color': '#414141',

  'range.value.color': '#fff',
  'range.value.fontWeight': 'lighter',
  'range.value.fontSize': '11px',
  'range.value.border': '1px solid #353535',
  'range.value.backgroundColor': '#151515',
  'range.title.color': '#fff',
  'range.title.fontWeight': 'lighter',

  // colorpicker style
  'colorpicker.button.border': '1px solid #1e1e1e',
  'colorpicker.title.color': '#fff'
};

export const localeZh = {
  // override default English locale to your custom
  Crop: '裁剪',
  ZoomIn: '放大',
  ZoomOut: '缩小',
  Hand: '拖拽',
  History: '历史记录',
  DeleteAll: '全部删除',
  Delete: '删除',
  Undo: '撤销',
  Redo: '反撤销',
  Reset: '重置',
  Flip: '镜像',
  Rotate: '旋转',
  Draw: '画',
  Shape: '形状标注',
  Icon: '图标标注',
  Text: '文字标注',
  Mask: '遮罩',
  Filter: '滤镜',
  Bold: '加粗',
  Italic: '斜体',
  Underline: '下划线',
  Left: '左对齐',
  Center: '居中',
  Right: '右对齐',
  Color: '颜色',
  'Text size': '字体大小',
  Custom: '自定义',
  Square: '正方形',
  Apply: '应用',
  Cancel: '取消',
  'Flip X': 'X 轴',
  'Flip Y': 'Y 轴',
  Range: '区间',
  Stroke: '描边',
  Fill: '填充',
  Circle: '圆',
  Triangle: '三角',
  Rectangle: '矩形',
  Free: '曲线',
  Straight: '直线',
  Arrow: '箭头',
  'Arrow-2': '箭头2',
  'Arrow-3': '箭头3',
  'Star-1': '星星1',
  'Star-2': '星星2',
  Polygon: '多边形',
  Location: '定位',
  Heart: '心形',
  Bubble: '气泡',
  'Custom icon': '自定义图标',
  'Load Mask Image': '加载蒙层图片',
  Grayscale: '灰度',
  Blur: '模糊',
  Sharpen: '锐化',
  Emboss: '浮雕',
  'Remove White': '除去白色',
  Distance: '距离',
  Brightness: '亮度',
  Noise: '噪音',
  'Color Filter': '彩色滤镜',
  Sepia: '棕色',
  Sepia2: '棕色2',
  Invert: '负片',
  Pixelate: '像素化',
  Threshold: '阈值',
  Tint: '色调',
  Multiply: '正片叠底',
  Blend: '混合色'
  // etc...
};
