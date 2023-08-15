
export interface ApiDashboardDataType {
  id?: number;
  name?: string;
  description?: string;
  style?: string;
  reportCount?: number;
  pageCount?: number;
  pages?: ReportPageType[];
  reports?: ReportType[];
  pubFlag?: boolean;
  publishPub?: boolean;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface ReportType {
  id: number;
  name?: string;
  pageCount?: number;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface ReportPageType {
  id: number;
  title?: string;
  portrait?: boolean;
  layout?: string;
  comment?: string;
  border?: string;
  label?: string;
  grid?: PageGridType[];
  filter?: ReportFilterType[];
}

export interface PageGridType {
  i: number;
  x: number;
  y: number;
  w: number;
  h: number;
  id: number;
  type: string;
  libName?: string;
  libCfg?: any;
  data?: any;
  instance?: any;
  container?: any;
  placeholder: string;
}

export interface ReportFilterType {
  component: string;
  label: string;
  field: string;
  defaultValue?: string;
  selectedValue?: string;
  componentProps?: any;
}

export const initReportPage: ReportPageType = {
  id: 0,
  title: '',
  portrait: false,
  layout: 'free',
  comment: '',
  border: 'dashed',
  label: 'left',
  grid: [],
  filter: [],
};

export interface ReportPageViewType {
  pageId: number;
  views: PageViewType[];
}

export interface PageViewType {
  viewId: number;
  type: string;
  libName: string
  libCfg: any;
  intervalMin: number;
  recordField: FieldValueType[];
  data: any[];
  records: any[];
  instance: any;
}

export interface FieldValueType {
  id: number;
  name: string;
  type?: string;
}
