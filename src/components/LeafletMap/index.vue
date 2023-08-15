<template>
  <div class="main-content-screen">
    <div id="mapContainer" ref="mapRef" class="leafletmap"></div>
  </div>
</template>
<script lang="ts" setup name="LeafletMap">
  import { nextTick, ref } from 'vue';
  import '/@/thirdparty/leaflet/css/leaflet.css';
  import L from 'leaflet';
  import 'leaflet.wmts';
  import PanelLayers from 'leaflet-panel-layers';
  import { TILE_LAYER_GROUP, TILE_LAYER_TYPE } from '/@/components/LeafletMap/type';
  import './leaflet-panel-layers.css';
  import './leaflet-locate.css';
  import './leaflet-geosearch.css';
  import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
  //import 'leaflet.zoombar';
  //import 'leaflet.zoomhome';
  import Locate from 'leaflet.locatecontrol';

  const mapRef = ref();
  let mapMap = null;
  let scatterLayerGroup = L.featureGroup();

  //获取当前可是方位随机点位的经纬度
  const getRandomLatLng = (map) => {
    let bounds = map.getBounds(),
      southWest = bounds.getSouthWest(),
      northEast = bounds.getNorthEast(),
      lngSpan = northEast.lng - southWest.lng,
      latSpan = northEast.lat - southWest.lat;

    return L.latLng(
      southWest.lat + latSpan * Math.random(),
      southWest.lng + lngSpan * Math.random(),
    );
  };

  const tileLayerConfig = [
    {
      group: 'Baselayer',
      type: TILE_LAYER_GROUP.BASELAYER,
      layers: [
        {
          active: true,
          name: 'OSM-Mapnik',
          type: TILE_LAYER_TYPE.OSM,
          layer: {
            type: 'tileLayer',
            args: ['http://{s}.tile.osm.org/{z}/{x}/{y}.png'],
          },
          options: { attribution: '' },
        },
        {
          active: false,
          name: 'OSM-Black/White',
          type: TILE_LAYER_TYPE.OSM,
          layer: {
            type: 'tileLayer',
            args: ['https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'],
          },
          options: { attribution: '' },
        },
        {
          active: false,
          name: 'WMS-Layer-1',
          type: TILE_LAYER_TYPE.WMS,
          layer: {
            type: 'tileLayer.wms',
            args: [
              'http://ows.mundialis.de/services/service?',
              { layers: 'TOPO-WMS,OSM-Overlay-WMS' },
            ],
          },
        },
        {
          active: false,
          name: 'WMTS-Layer-1',
          type: TILE_LAYER_TYPE.WMTS,
          layer: {
            type: 'tileLayer.wmts',
            args: [
              'https://mapy.geoportal.gov.pl/wss/service/WMTS/guest/wmts/ORTO',
              {
                format: 'image/png',
                tileSize: 512,
                version: '1.0.0',
                transparent: true,
                origin: [850000.0, 100000.0],
                scales: [
                  30238155.714285716, 15119077.857142858, 7559538.928571429, 3779769.4642857146,
                  1889884.7321428573, 944942.3660714286, 472471.1830357143, 236235.59151785716,
                  94494.23660714286, 47247.11830357143, 23623.559151785714, 9449.423660714287,
                  4724.711830357143, 1889.8847321428573, 944.9423660714286, 472.4711830357143,
                ],
                tilematrixSet: 'EPSG:2180',
                opacity: 1.0,
                crossOrigin: true,
                minZoom: 5,
              },
            ],
          },
        },
      ],
    },
    {
      group: 'Overlayer',
      type: TILE_LAYER_GROUP.OVERLAYER,
      layers: [
        {
          active: false,
          name: 'OSM-Black/White',
          type: TILE_LAYER_TYPE.OSM,
          layer: {
            type: 'tileLayer',
            args: ['http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png'],
          },
          options: { attribution: '' },
        },
      ],
    },
  ];

  const initMap = async () => {
    const map1 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {});

    await nextTick();
    let myCenter = [31.95723698714103, 104.29901249999988];
    mapMap = L.map(mapRef.value, {
      layers: [map1],
      zoomControl: false,
    }).setView(myCenter, 4);

    // this is zoomPanel, not zoomBar
    //set zoomControl to false
    //const zoom_bar = new L.zoomBar({position: 'topleft'}).addTo(mapMap);

    //const zoomHome = L.Control.zoomHome({ position: 'topleft' }).addTo(mapMap);

    const locateCtrl = new Locate({position: 'topleft'}).addTo(mapMap);

    const provider = new OpenStreetMapProvider();
    const searchControl = GeoSearchControl({
      provider: provider,
      style: 'button',
    }).addTo(mapMap);

    let baseLayers: any[] = [];
    let overLayers: any[] = [];

    //create layer panel to manage baselyaers and overlayers
    for (let i = 0; i < tileLayerConfig.length; i++) {
      //clone the groups in order to avoid being rewritten
      let tileGroup = JSON.parse(JSON.stringify(tileLayerConfig[i]));
      //add to layer groups
      if (tileGroup.type == TILE_LAYER_GROUP.BASELAYER) {
        baseLayers.push(tileGroup);
      } else {
        overLayers.push(tileGroup);
      }
    }

    var marker = L.marker([31.5, 104]).bindPopup('This is Beijing!').addTo(mapMap);

    let layerPanel = new PanelLayers(baseLayers, overLayers);
    layerPanel.addTo(mapMap); //active layers on map
  };

  initMap();
</script>

<style lang="less" scoped>
  .leafletmap {
    width: 100%;
    height: 700px;
  }

  .main-content-screen {
    display: flex;
    flex-direction: column;
    height: calc(100% - 35px);
    border-radius: 4px;
    background-color: #fff;
    .screen-header {
      padding: 2px;
      min-height: 20px;
    }
    .screen-footer {
      padding: 2px;
      min-height: 20px;
      text-align: right;
      margin-right: 10px;
    }
    .screen-content {
      flex: 2;
      padding: 5px;
      overflow: hidden;
    }
    .screen-padding {
      padding-top: 5px;
    }
    ::v-deep(.ant-table.ant-table-bordered) > .ant-table-content {
      border-bottom: 1px solid #f0f0f0;
    }
    .ant-table-striped ::v-deep(.active-yes) {
      background-color: #ffffff;
    }
    .ant-table-striped ::v-deep(.active-no) {
      background-color: #ffffff;
    }
  }
</style>
