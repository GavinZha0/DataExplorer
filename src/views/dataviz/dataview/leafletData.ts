import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import L from 'leaflet';
import {TimedGeoJSON} from "leaflet.timeline/dist/Timeline";

const { t } = useI18n();

export const baseLayerLib = [
  {
    name: 'OSM.Mapnik',
    preview: 'http://b.tile.osm.org/1/0/0.png',
    layer: {
      type: 'tileLayer',
      args: ['http://{s}.tile.osm.org/{z}/{x}/{y}.png'],
    },
    options: { attribution: '' },
  },
  {
    name: 'OPNVKarte',
    preview: 'https://tileserver.memomaps.de/tilegen/5/8/11.png',
    options: {
      attribution:
        'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    layer: {
      type: 'tileLayer',
      args: ['https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png'],
    },
  },
  {
    name: 'OpenTopoMap',
    preview: 'https://tile.opentopomap.org/3/7/2.png',
    options: {
      attribution:
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    },
    layer: {
      type: 'tileLayer',
      args: ['https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'],
    },
  },
  {
    name: 'Stadia.Dark',
    preview: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/6/14/25.png',
    options: {
      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    },
    layer: {
      type: 'tileLayer',
      args: ['https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'],
    },
  },
  {
    name: 'Stadia.Outdoors',
    preview: 'https://tiles.stadiamaps.com/tiles/outdoors/8/77/94.png',
    options: {
      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    },
    layer: {
      type: 'tileLayer',
      args: ['https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png'],
    },
  },
  {
    name: 'CyclOSM',
    preview: 'https://c.tile.openstreetmap.fr/hot/6/17/24.png',
    options: {
      attribution:
        '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    layer: {
      type: 'tileLayer',
      args: ['https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png'],
    },
  },
  {
    name: 'Stamen.Toner',
    preview: 'https://stamen-tiles-b.a.ssl.fastly.net/toner/1/1/0.png',
    options: {
      subdomains: 'abcd',
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    layer: {
      type: 'tileLayer',
      args: ['https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png'],
    },
  },
  {
    name: 'Stamen.Watercolor',
    preview: 'https://stamen-tiles-a.a.ssl.fastly.net/watercolor/1/0/0.jpg',
    options: {
      subdomains: 'abcd',
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    layer: {
      type: 'tileLayer',
      args: ['https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'],
    },
  },
  {
    name: 'Stamen.Terrain',
    preview: 'https://stamen-tiles-d.a.ssl.fastly.net/terrain-background/2/2/1.png',
    options: {
      subdomains: 'abcd',
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    layer: {
      type: 'tileLayer',
      args: ['https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png'],
    },
  },
  {
    name: 'Stamen.TonerBackground',
    preview: 'https://stamen-tiles-d.a.ssl.fastly.net/toner-background/2/2/1.png',
    options: {
      subdomains: 'abcd',
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    layer: {
      type: 'tileLayer',
      args: ['https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png'],
    },
  },
  {
    name: 'Stamen.TerrainLabels',
    preview: 'https://stamen-tiles-b.a.ssl.fastly.net/terrain-labels/4/3/6.png',
    options: {
      subdomains: 'abcd',
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    layer: {
      type: 'tileLayer',
      args: ['https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-labels/{z}/{x}/{y}{r}.png'],
    },
  },
  {
    name: 'Esri.WorldStreetMap',
    preview: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/4/6/3',
    options: {
      attribution:
        'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
    },
    layer: {
      type: 'tileLayer',
      args: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      ],
    },
  },
  {
    name: 'Esri.WorldImagery',
    preview: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/8/94/77',
    options: { attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012' },
    layer: {
      type: 'tileLayer',
      args: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      ],
    },
  },
  {
    name: 'Esri.WorldGrayCanvas',
    preview: 'https://c.basemaps.cartocdn.com/light_all/8/74/96.png',
    options: { attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ' },
    layer: {
      type: 'tileLayer',
      args: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      ],
    },
  },
  {
    name: 'CartoDB.DarkMatter',
    preview: 'https://d.basemaps.cartocdn.com/dark_all/5/8/11.png',
    options: {
      subdomains: 'abcd',
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    },
    layer: {
      type: 'tileLayer',
      args: ['https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'],
    },
  },
  {
    name: 'WMS-Layer-1',
    preview: 'https://ows.mundialis.de/services/service?&service=WMS&request=GetMap&layers=TOPO-WMS%2COSM-Overlay-WMS&styles=&format=image%2Fjpeg&transparent=false&version=1.1.1&width=256&height=256&srs=EPSG%3A3857&bbox=11271098.44281895,1252344.2714243277,12523442.714243278,2504688.542848655',
    options: { attribution: '' },
    layer: {
      type: 'tileLayer',
      args: ['http://ows.mundialis.de/services/service?', { layers: 'TOPO-WMS,OSM-Overlay-WMS' }],
    },
  },
];

export const overLayerLib = [
  {
    name: 'OpenRailway',
    preview: 'https://a.tiles.openrailwaymap.org/standard/4/10/5.png',
    options: {
      attribution:
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    },
    layer: {
      type: 'tileLayer',
      args: ['https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png'],
    },
  },
  {
    name: 'Stamen.TonerHybrid',
    preview: 'https://stamen-tiles-a.a.ssl.fastly.net/toner-hybrid/4/3/5.png',
    options: {
      subdomains: 'abcd',
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    layer: {
      type: 'tileLayer',
      args: ['https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}{r}.png'],
    },
  },
  {
    name: 'Stamen.TonerLines',
    preview: 'https://stamen-tiles-a.a.ssl.fastly.net/toner-lines/4/3/5.png',
    options: {
      subdomains: 'abcd',
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    layer: {
      type: 'tileLayer',
      args: ['https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}{r}.png'],
    },
  },
  {
    name: 'Stamen.TonerLabels',
    preview: 'https://stamen-tiles-b.a.ssl.fastly.net/toner-labels/4/3/6.png',
    options: {
      subdomains: 'abcd',
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    layer: {
      type: 'tileLayer',
      args: ['https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png'],
    },
  },
  {
    name: 'Stamen.TopOSMFeatures',
    preview: 'https://stamen-tiles-c.a.ssl.fastly.net/toposm-features/6/16/25.png',
    options: {
      subdomains: 'abcd',
      opacity: 0.9,
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    layer: {
      type: 'tileLayer',
      args: ['https://stamen-tiles-{s}.a.ssl.fastly.net/toposm-features/{z}/{x}/{y}{r}.png'],
    },
  },
];

export const jsonLayerLib = [
  {
    name: 'Countries',
    file: 'countries.geojson',
  },
  {
    name: 'US States',
    file: 'us-states.geojson',
  },
  {
    name: 'US Cities',
    file: 'us-states-detail.geojson',
  },
];


// custom toolkit
export const formCustomToolkit: FormSchema[] = [
  {
    field: 'fullscreen',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.toolkit.fullscreen'),
    colProps: { span: 24 },
  },
  {
    field: 'panel',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.toolkit.panel'),
    colProps: { span: 24 },
  },
  {
    field: 'search',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.toolkit.search'),
    colProps: { span: 24 },
  },
  {
    field: 'open',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.toolkit.open'),
    colProps: { span: 24 },
  },
  {
    field: 'seek',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.toolkit.seek'),
    colProps: { span: 24 },
  },
  {
    field: 'export',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.toolkit.export'),
    colProps: { span: 24 },
  },
  {
    field: 'locator',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.toolkit.locator'),
    colProps: { span: 24 },
  },
  {
    field: 'coordinator',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.toolkit.coordinator'),
    colProps: { span: 24 },
  },
  {
    field: 'scale',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.toolkit.scale'),
    colProps: { span: 24 },
  },
  {
    field: 'player',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.timeline.player'),
    colProps: { span: 24 },
  },
];

// custom marker
export const formCustomMarker: FormSchema[] = [
  {
    field: 'shape',
    component: 'Input',
    label: t('dataviz.dataview.form.custom.marker.shape'),
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Awesome icon',
    },
  },
  {
    field: 'shapeField',
    component: 'Select',
    label: t('dataviz.dataview.form.custom.marker.shapeField'),
    colProps: { span: 24 },
  },
  {
    field: 'shapeMap',
    label: '',
    component: 'Input',
    slot: 'shapeMap',
    colProps: { span: 24 },
  },
  {
    field: 'color',
    component: 'Input',
    label: t('dataviz.dataview.form.custom.marker.color'),
    slot: 'markerColor',
    colProps: { span: 24 },
  },
  {
    field: 'colorField',
    label: t('dataviz.dataview.form.custom.marker.colorField'),
    component: 'Select',
    colProps: { span: 24 },
  },
  {
    field: 'colorMap',
    label: '',
    component: 'Input',
    slot: 'colorMap',
    colProps: { span: 24 },
  },
];

// custom cluster
export const formCustomCluster: FormSchema[] = [
  {
    field: 'titleField',
    component: 'Select',
    label: t('dataviz.dataview.form.custom.marker.titleField'),
    colProps: { span: 24 },
  },
  {
    field: 'popup',
    component: 'InputTextArea',
    label: t('dataviz.dataview.form.custom.marker.popup'),
    colProps: { span: 24 },
    componentProps: {
      maxlength: 128,
      autoSize: { minRows: 2, maxRows: 4 },
    },
  },
  {
    field: 'tooltip',
    component: 'InputTextArea',
    label: t('dataviz.dataview.form.custom.marker.tooltip'),
    colProps: { span: 24 },
    componentProps: {
      maxlength: 128,
      autoSize: { minRows: 2, maxRows: 4 },
    },
  },
  {
    field: 'enabled',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.cluster.title'),
    colProps: { span: 24 },
  },
  {
    field: 'colorField',
    label: t('dataviz.dataview.form.custom.cluster.colorField'),
    component: 'Select',
    colProps: { span: 24 },
  },
  {
    field: 'colorMap',
    label: '',
    component: 'Input',
    slot: 'colorMap',
    colProps: { span: 24 },
  },
];

// custom migration
export const formCustomMigration: FormSchema[] = [
  {
    field: 'dir',
    label: t('dataviz.dataview.form.custom.migration.dir'),
    component: 'Select',
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Direction',
      options: [
        {
          label: t('dataviz.dataview.form.custom.migration.leftRight'),
          value: 'x',
        },
        {
          label: t('dataviz.dataview.form.custom.migration.rightLeft'),
          value: 'y',
        },
        {
          label: t('dataviz.dataview.form.custom.migration.topBottom'),
          value: 'xy',
        },
        {
          label: t('dataviz.dataview.form.custom.migration.bottomTop'),
          value: 'xy',
        },
      ],
    },
  },
  {
    field: 'style',
    label: t('dataviz.dataview.form.custom.migration.style'),
    component: 'Select',
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Style',
      options: [
        {
          label: t('dataviz.dataview.form.custom.migration.solid'),
          value: 'solid',
        },
        {
          label: t('dataviz.dataview.form.custom.migration.dotted'),
          value: 'dotted',
        },
        {
          label: t('dataviz.dataview.form.custom.migration.dashed'),
          value: 'dashed',
        },
      ],
    },
  },
  {
    field: 'color',
    label: t('dataviz.dataview.form.custom.migration.color'),
    component: 'Input',
    slot: 'hairColor',
    colProps: { span: 24 },
  },
];


// custom heatmap
export const formCustomHeatmap: FormSchema[] = [
  {
    field: 'title',
    label: '',
    component: 'Input',
    componentProps: {
      placeholder: 'Custom Field or Text',
    },
    colProps: { span: 24 },
  },
];

// custom timeline
export const formCustomTimeline: FormSchema[] = [
  {
    field: 'title',
    label: '',
    component: 'Input',
    componentProps: {
      placeholder: 'Custom Field or Text',
    },
    colProps: { span: 24 },
  },
];

// custom Choropleth
export const formCustomChoropleth: FormSchema[] = [
  {
    field: 'refer',
    label: t('dataviz.dataview.form.custom.choropleth.refer'),
    component: 'Input',
    componentProps: {
      placeholder: 'Reference file',
    },
    colProps: { span: 24 },
  },
  {
    field: 'colorField',
    label: t('dataviz.dataview.form.custom.choropleth.colorField'),
    component: 'Select',
    colProps: { span: 24 },
  },
  {
    field: 'colorMap',
    label: '',
    component: 'Input',
    slot: 'colorMap',
    colProps: { span: 24 },
  },
];

export const mapModalSchemas: FormSchema[] = [
  {
    field: 'shape',
    component: 'Input',
    label: t('dataviz.dataview.form.map.shape'),
    colProps: { span: 12 },
    componentProps: {
      placeholder: 'Awesome icon',
    },
  },
  {
    field: 'color',
    component: 'Input',
    label: t('dataviz.dataview.form.map.color'),
    slot: 'markerColor',
    colProps: { span: 12 },
  },
  {
    field: 'label',
    component: 'Input',
    label: t('dataviz.dataview.form.map.label'),
    colProps: { span: 24 },
  },
  {
    field: 'value',
    component: 'Input',
    required: true,
    label: t('dataviz.dataview.form.map.value'),
    colProps: { span: 24 },
  },
];

export const initLayers = {
  baselayer: new Array(baseLayerLib.length).fill(false),
  overlayer: new Array(overLayerLib.length).fill(false),
  optional: false,
};

export const initToolkit = {
  fullscreen: false,
  seek: false,
  search: false,
  open: false,
  locator: false,
  export: false,
  coordinator: false,
  scale: false,
  player: false,
};

export const initMarker = {
  shape: undefined,
  shapeField: undefined,
  shapeMap: undefined,
  color: undefined,
  colorField: undefined,
  colorMap: undefined,
  cluster: {
    titleField: undefined,
    popup: undefined,
    tooltip: undefined,
    enabled: true,
    colorField: undefined,
    colorMap: undefined,
  },
};

export const initCluster = {
  titleField: undefined,
  popup: undefined,
  tooltip: undefined,
  enabled: true,
  colorField: undefined,
  colorMap: undefined,
};

export const initMigration = {
  dir: undefined,
  style: undefined,
  color: undefined,
  colorField: undefined,
  colorMap: undefined,
};

export const initTimeline = {
  dir: undefined,
  style: undefined,
  color: undefined,
  colorField: undefined,
  colorMap: undefined,
};

export const initHeatmap = {
  color: undefined,
  colorField: undefined,
  colorMap: undefined,
};

export const initChoropleth = {
  refFile: undefined,
  colorField: undefined,
  colorMap: undefined,
};
