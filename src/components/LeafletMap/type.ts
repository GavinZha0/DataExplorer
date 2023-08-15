
export interface PaginationConfig {
  total: number;
  current: number;
  pageSize: number;
  showSizeChanger: boolean;
  showQuickJumper: boolean;
  onChange: (page: number, pageSize: number) => void;
}

export const TILE_LAYER_GROUP: any = {
  BASELAYER: 0,
  OVERLAYER: 1,
}

export const TILE_LAYER_TYPE = {
  OSM: 0, //Open Street Map
  TMS: 1, //Tiled Map Service
  WMS: 2, //Web Map Service
  WCS: 3, // Web Coverage Service
  WMTS: 4, //Web Map Tile Service
  GEOJSON: 5, //a format for encoding a variety of geographic data structures
  TOPOJSON: 6, //an extension of GeoJSON that encodes topology
  MARKER: 7,
}

export const JSON_SHAPE_TYPE = {
  POINT: 'point',
  POLYGON: 'polygon',
};

export const MAP_TYPE = {
  MARKER: 'marker',
  HEAT: 'heat',
};
