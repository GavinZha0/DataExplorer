export interface ApiDatareportDataType {
  id?: number;
  name?: string;
  desc?: string;
  group?: string;
  type?: string;
  pageCount?: number;
  pages?: ReportPageType[];
  viewIds?: any[];
  pubFlag?: boolean;
  menuId?: number;
  menuName?: string;
  publishPub?: boolean;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface ReportPageType {
  title?: string;
  portrait?: boolean;
  layout?: string;
  comment?: string;
  border?: string;
  label?: boolean;
  toolbar?: boolean;
  interval?: number;
  grid?: PageGridType[];
  filter?: ReportFilterType[];
}

export interface PageGridType {
  i: number;
  x: number;
  y: number;
  w: number;
  h: number;
  id: number; // view id
  type: string; // view or widget
  name?: string;
  group?: string;
  libName?: string;
  libCfg?: any;
  libVer?: string;
  data?: any;
  interval?: number;
  instance?: any;
  container?: any;
}

export interface ReportFilterType {
  enabled: boolean;
  component?: string;
  componentProps?: any;
  label: string;
  fieldName?: string;
  defaultValue?: string;
  selectedValue?: string;
  targetViews?: number[];
}

export const initReportPage: ReportPageType = {
  title: undefined,
  portrait: false,
  layout: 'free',
  comment: undefined,
  border: 'dashed',
  label: true,
  toolbar: true,
  interval: undefined,
  grid: [],
  filter: [],
};

export const initReportData: ApiDatareportDataType = {
  id: 0,
  name: undefined,
  desc: undefined,
  group: undefined,
  type: undefined,
  pageCount: 0,
  pages: [],
  viewIds: [],
  pubFlag: false,
  menuId: 0,
  menuName: undefined,
  publishPub: false,
};

export interface ReportPageViewType {
  pageId: number;
  views: PageViewType[];
}

export interface PageViewType {
  viewId: number;
  type: string;
  libName: string;
  libCfg: any;
  recordField: FieldValueType[];
  data: any[];
  intervalMin: number;
  records: any[];
  instance: any;
}

export interface FieldValueType {
  id: number;
  name: string;
  type?: string;
}

export interface ApiPublishReqType {
  id: number;
  menuId: number;
  menuName: string;
  publishPub: boolean;
}

export interface ApiReportExeReqType {
  reportId: number;
  pageId: number;
}

export interface MenuFieldType {
  parent?: string;
  title?: string;
  subRpt?: boolean;
}

export interface ReportOptionType {
  layout: string[];
  border: string[];
}

export const initReportOptions: ReportOptionType = {
  layout: ['Free', 'Grid', 'Thumbnail-Right', 'Thumbnail-Bottom'],
  border: ['solid', 'dashed'],
};
