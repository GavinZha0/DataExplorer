import template from 'template_js';
import L from 'leaflet';
import { MarkerClusterGroup } from '/@/thirdparty/leaflet/leaflet.markercluster-src';
import 'leaflet.featuregroup.subgroup/dist/leaflet.featuregroup.subgroup-src';
import 'leaflet-quadtree';
import '/@/thirdparty/leaflet/leaflet.geocsv-src';
import 'leaflet-layerjson';
import '/@/thirdparty/leaflet/leaflet-geojson-vt';
import '/@/thirdparty/leaflet/leaflet-beautify-marker-icon';
import '@ansur/leaflet-pulse-icon/dist/L.Icon.Pulse';
import 'heatmap.js/build/heatmap';
import * as HeatmapOverlay from 'heatmap.js/plugins/leaflet-heatmap';
import { AntPath } from 'leaflet-ant-path';
import { us_states } from '/@/assets/geojson/us-states';
import { initMapInfo, pointsData } from '/@/views/dataviz/dataview/data';
import { ZoomBar } from '/@/thirdparty/leaflet/L.Control.ZoomBar';
import { baseLayerLib, overLayerLib } from '/@/views/dataviz/dataview/leafletData';
import { cloneDeep } from 'lodash-es';
import { PanelLayers } from '/@/thirdparty/leaflet/leaflet-panel-layers.src';
import { GeoNames } from '/@/thirdparty/leaflet/L.Control.Geonames';
import { SlideMenu } from '/@/thirdparty/leaflet/L.Control.SlideMenu';
import { EasyPrint } from '/@/thirdparty/leaflet/easyPrint';
import Locate from 'leaflet.locatecontrol';
/*
 * build visible markers on current map
 */
export function getVisibleMarkers(quadtree: any, leaflet: any, rankField: string, order = 'asc') {
  if (!quadtree || !leaflet) {
    return null;
  }
  const anchors = [];
  const colliders = quadtree.getColliders(leaflet.getBounds());
  for (const marker of colliders) {
    const latLng = marker.getLatLng();
    anchors.push(
      '<a href="#" lat="' +
        latLng.lat +
        '" lon="' +
        latLng.lng +
        '">' +
        marker.options.title +
        ':&nbsp;&nbsp;&nbsp;' +
        marker.options.dataItem.sales +
        '</a>',
    );
  }

  return anchors.join('');
}

/*
 * build marker map
 */
export const buildMarkerMap = (data: any[], cfg: any) => {
  //mapInfo.quadtree = L.quadtree();
  const cluster = MarkerClusterGroup({
    showCoverageOnHover: false,
    // null: cluster; 0 disable cluster; 1~20: disable under this zoom level
    disableClusteringAtZoom: cfg.marker?.cluster?.enabled ? null : 0,
  });

  // shape groups and color groups for legend and filter
  const shapeCluster: any = {};
  const colorCluster: any = {};

  // build marker
  for (const item of data) {
    let markerIcon,
      legendColorLabel = 'default',
      legendShapeLabel = 'default',
      markerShape = 'star', // default
      markerColor = 'green'; // default

    // marker.shapeField has higher priority then marker.shape
    if (cfg.marker.shapeField && cfg.marker.shapeMap) {
      const dtValue = item[cfg.marker.shapeField];
      for (const ele of cfg.marker.shapeMap) {
        if (Array.isArray(ele.value) && dtValue >= ele.value[0] && dtValue < ele.value[1]) {
          // dtValue should be in range ele.value[]
          markerShape = ele.shape;
          legendShapeLabel = ele.label;
          break;
        } else if (typeof ele.value == 'string' && dtValue == ele.value) {
          // dtValue should be a string
          markerShape = ele.shape;
          legendShapeLabel = ele.label;
          break;
        }
      }
    } else if (cfg.marker.shape && cfg.marker.shape.length > 0) {
      // fixed shape
      markerShape = cfg.marker.shape;
    }

    // marker.colorField has higher priority then marker.color
    if (cfg.marker.colorField && cfg.marker.colorMap) {
      const dtValue = item[cfg.marker.colorField];
      for (const ele of cfg.marker.colorMap) {
        if (Array.isArray(ele.value) && dtValue >= ele.value[0] && dtValue < ele.value[1]) {
          // dtValue should be in range ele.value[]
          markerColor = ele.color;
          legendColorLabel = ele.label;
          break;
        } else if (typeof ele.value == 'string' && dtValue == ele.value) {
          // dtValue should be a string
          markerColor = ele.color;
          legendColorLabel = ele.label;
          break;
        }
      }
    } else if (cfg.marker.color && cfg.marker.color.length > 0) {
      // fixed color
      markerColor = cfg.marker.color;
    }

    // BeautifyIcon is better than ExtraMarker
    // it is based on font awesome icon
    markerIcon = L.BeautifyIcon.icon({
      prefix: 'fas',
      icon: markerShape + ' fa-lg',
      textColor: markerColor,
      borderColor: markerColor,
      iconShape: 'marker',
      backgroundColor: 'white', //'transparent',
    });

    if (cfg.marker?.style?.pulse) {
      markerIcon = L.icon.pulse({ iconSize: [10, 10], color: 'red', fillColor: 'red' });
    }

    // build marker
    const m = L.marker(new L.latLng([item[cfg.latField], item[cfg.lngField]]), {
      title: cfg.titleField ? item[cfg.titleField] : undefined,
      icon: markerIcon,
      dataItem: item,
    });

    if (cfg.popup) {
      // bind popup template
      const popStr = template(cfg.popup, item);
      m.bindPopup(popStr);
    }

    if (cfg.tooltip) {
      // bind tooltip template
      let tipStr = template(cfg.tooltip, item);
      tipStr = '<div style="text-align: left">' + tipStr + '</div>';
      m.bindTooltip(tipStr);
    }

    // add marker to cluster
    cluster.addLayer(m);
    // add marker to sub cluster for legend
    if (!shapeCluster[legendShapeLabel]) {
      shapeCluster[legendShapeLabel] = L.featureGroup.subGroup(cluster);
    }
    shapeCluster[legendShapeLabel].addLayer(m);

    if (!colorCluster[legendColorLabel]) {
      colorCluster[legendColorLabel] = L.featureGroup.subGroup(cluster);
    }
    colorCluster[legendColorLabel].addLayer(m);

    // used to show visible markers
    //mapInfo.quadtree.add(m);
  }

  return { all: cluster, shape: shapeCluster, color: colorCluster };
};

/*
 * build bubble map
 */
export const buildBubbleMap = (data: any[], cfg: any, dataFrame) => {
  const cluster = MarkerClusterGroup({
    showCoverageOnHover: false,
    // disable cluster for bubble map
    disableClusteringAtZoom: 0,
  });

  // shape groups and color groups for legend and filter
  const shapeCluster: any = {};
  const colorCluster: any = {};

  // get statistics info of sizeField
  const fieldInfo = dataFrame.find((el) => {
    return el.name == cfg.bubble.sizeField;
  });
  // the min, gap are for size map
  const fieldMin = fieldInfo.minimum;
  const fieldGap = fieldInfo.maximum - fieldInfo.minimum;
  const mapGap = cfg.bubble.sizeScale[1] - cfg.bubble.sizeScale[0];

  // build bubble
  for (const item of data) {
    let legendColorLabel = 'default',
      legendShapeLabel = 'default',
      markerShape = 'circle', // default
      markerColor = 'green'; // default
    if (cfg.bubble.shape && cfg.bubble.shape.length > 0) {
      // fixed shape
      markerShape = cfg.bubble.shape;
    }

    // bubble.colorField has higher priority then bubble.color
    if (cfg.bubble.colorField && cfg.bubble.colorMap) {
      const dtValue = item[cfg.bubble.colorField];
      for (const ele of cfg.bubble.colorMap) {
        if (Array.isArray(ele.value) && dtValue >= ele.value[0] && dtValue < ele.value[1]) {
          markerColor = ele.color;
          legendColorLabel = ele.label;
          break;
        } else if (!Array.isArray(ele.value) && dtValue == ele.value) {
          markerColor = ele.color;
          legendColorLabel = ele.label;
          break;
        }
      }
    } else if (cfg.bubble.color && cfg.bubble.color.length > 0) {
      // user defined color
      markerColor = cfg.bubble.color;
    }

    const m = L.circleMarker(new L.latLng([item[cfg.latField], item[cfg.lngField]]), {
      title: cfg.titleField ? item[cfg.titleField] : undefined,
      radius:
        cfg.bubble.sizeScale[0] + ((item[cfg.bubble.sizeField] - fieldMin) * mapGap) / fieldGap,
      color: markerColor,
      fillColor: markerColor,
      weight: 1,
      dataItem: item,
    });

    if (cfg.popup) {
      // bind popup template
      const popStr = template(cfg.popup, item);
      m.bindPopup(popStr);
    }

    if (cfg.tooltip) {
      // bind tooltip template
      let tipStr = template(cfg.tooltip, item);
      tipStr = '<div style="text-align: left">' + tipStr + '</div>';
      m.bindTooltip(tipStr);
    }

    // add bubble to cluster
    cluster.addLayer(m);
    // add bubble to sub cluster for legend
    if (!shapeCluster[legendShapeLabel]) {
      shapeCluster[legendShapeLabel] = L.featureGroup.subGroup(cluster);
    }
    shapeCluster[legendShapeLabel].addLayer(m);

    if (!colorCluster[legendColorLabel]) {
      colorCluster[legendColorLabel] = L.featureGroup.subGroup(cluster);
    }
    colorCluster[legendColorLabel].addLayer(m);
  }

  return { all: cluster, shape: shapeCluster, color: colorCluster };
};

/*
 * build heat map
 */
export const buildHeatMap = (data: any[], cfg: any) => {
  const heatCfg = {
    radius: cfg.heat.scaleRadius ? 2 : 15,
    maxOpacity: cfg.heat.maxOpacity,
    scaleRadius: cfg.heat.scaleRadius,
    useLocalExtrema: true,
    latField: cfg.latField,
    lngField: cfg.lngField,
    valueField: cfg.heat.valueField,
  };

  const heatmapLayer = new HeatmapOverlay(heatCfg);
  heatmapLayer.setData({ data: data });

  const cluster = MarkerClusterGroup({
    showCoverageOnHover: false,
    // disable cluster for bubble map
    disableClusteringAtZoom: 0,
  });

  // build marker
  for (const item of data) {
    const markerIcon = L.icon.pulse({ iconSize: [10, 10], color: 'red', fillColor: 'red' });
    const m = L.marker(new L.latLng([item[cfg.latField], item[cfg.lngField]]), {
      title: cfg.titleField ? item[cfg.titleField] : undefined,
      icon: markerIcon,
      dataItem: item,
    });

    if (cfg.tooltip) {
      // bind tooltip template
      let tipStr = template(cfg.tooltip, item);
      tipStr = '<div style="text-align: left">' + tipStr + '</div>';
      m.bindTooltip(tipStr);
    }

    // add marker to cluster
    cluster.addLayer(m);
  }

  return { all: cluster, heatmapLayer: heatmapLayer };
};

/*
 * build movement map
 */
export const buildMovementMap = (data: any[], cfg: any) => {
  const cluster = MarkerClusterGroup({
    showCoverageOnHover: false,
    // disable cluster for bubble map
    disableClusteringAtZoom: 0,
  });
  const colorCluster: any = {};
  const latlngs = [];
  let markerIdx = 0;

  // build marker
  for (const item of data) {
    let legendColorLabel = 'default',
      markerColor = 'green'; // default
    latlngs.push([item[cfg.latField], item[cfg.lngField]]);

    // bubble.colorField has higher priority then bubble.color
    if (cfg.movement.colorField && cfg.movement.colorMap) {
      const dtValue = item[cfg.movement.colorField];
      for (const ele of cfg.movement.colorMap) {
        if (Array.isArray(ele.value) && dtValue >= ele.value[0] && dtValue < ele.value[1]) {
          markerColor = ele.color;
          legendColorLabel = ele.label;
          break;
        } else if (!Array.isArray(ele.value) && dtValue == ele.value) {
          markerColor = ele.color;
          legendColorLabel = ele.label;
          break;
        }
      }
    } else if (cfg.movement.color && cfg.movement.color.length > 0) {
      // user defined color
      markerColor = cfg.movement.color;
    }

    // BeautifyIcon is better than ExtraMarker
    // it is based on font awesome icon
    markerIdx++;
    const markerIcon = L.BeautifyIcon.icon({
      isAlphaNumericIcon: true,
      text: markerIdx,
      textColor: markerColor,
      borderColor: markerColor,
      iconShape: 'circle',
      iconSize: [20, 20],
      //innerIconStyle: 'margin-top:10;',
      backgroundColor: 'white', //'transparent',
    });
    const m = L.marker(new L.latLng([item[cfg.latField], item[cfg.lngField]]), {
      title: cfg.titleField ? item[cfg.titleField] : undefined,
      icon: markerIcon,
      dataItem: item,
    });

    if (cfg.tooltip) {
      // bind tooltip template
      let tipStr = template(cfg.tooltip, item);
      tipStr = '<div style="text-align: left">' + tipStr + '</div>';
      m.bindTooltip(tipStr);
    }

    // add marker to cluster
    cluster.addLayer(m);

    if (!colorCluster[legendColorLabel]) {
      colorCluster[legendColorLabel] = L.featureGroup.subGroup(cluster);
    }
    colorCluster[legendColorLabel].addLayer(m);
  }

  const options = {
    weight: cfg.movement.weight,
    delay: cfg.movement.delay,
    color: cfg.movement.color,
    pulseColor: cfg.movement.pulseColor,
    dashArray: cfg.movement.dash,
  };
  const antPath = new AntPath(latlngs, options);

  return { all: cluster, color: colorCluster, antPath: antPath };
};

/*
 * build choropleth map
 */
export const buildChoroplethMap = (data: any[], cfg: any, map: any) => {
  if (cfg.choropleth?.refJoin?.length < 2) {
    return;
  }

  const geojson = us_states;
  const refField = cfg.choropleth.refJoin[0];
  const joinField = cfg.choropleth.refJoin[1];
  const valueField = cfg.choropleth.colorField;

  // Create hash table for easy reference
  const dataHash = data.reduce(function (hash, item) {
    if (item[joinField]) {
      hash[item[joinField]] = isNaN(item[valueField]) ? null : item[valueField];
    }
    return hash;
  }, {});

  // Add value from hash table to geojson properties
  geojson.features.forEach(function (item) {
    item.properties[valueField] = dataHash[item.properties[refField]] || null;
  });

  const choroplethLayer = L.choropleth(geojson, {
    valueProperty: valueField,
    scale: cfg.choropleth.colorScale,
    steps: cfg.choropleth.colorSteps,
    mode: 'q',
    style: {
      weight: 1,
      color: cfg.choropleth.borderColor,
      fillOpacity: cfg.choropleth.fillOpacity,
    },
    onEachFeature: function (feature, layer) {
      const popStr = template(cfg.popup, feature.properties);
      layer.bindPopup(popStr);
    },
  });

  return { choroplethLayer: choroplethLayer };
};

/*
 * build timeline map
 */
export const buildTimelineMap = (data: any[], cfg: any, inst: any) => {};

/*
 * build migration map
 */
export const buildMigrationMap = (data: any[], cfg: any, inst) => {
  const cluster = MarkerClusterGroup({
    showCoverageOnHover: false,
    // disable cluster for bubble map
    disableClusteringAtZoom: 0,
  });
  const colorCluster: any = {};

  // build migration data
  let markerIdx = 0;
  const migrationData: any[] = [];
  for (const item of data) {
    let legendColorLabel = 'default',
      lineColor = 'green'; // default
    // bubble.colorField has higher priority then bubble.color
    if (cfg.line.colorField && cfg.line.colorMap) {
      const dtValue = item[cfg.line.colorField];
      for (const ele of cfg.line.colorMap) {
        if (Array.isArray(ele.value) && dtValue >= ele.value[0] && dtValue < ele.value[1]) {
          lineColor = ele.color;
          legendColorLabel = ele.label;
          break;
        } else if (!Array.isArray(ele.value) && dtValue == ele.value) {
          lineColor = ele.color;
          legendColorLabel = ele.label;
          break;
        }
      }
    } else if (cfg.line.color && cfg.line.color.length > 0) {
      // user defined color
      lineColor = cfg.line.color;
    }

    const dt = {
      labels: [item[cfg.labelFields[0]], item[cfg.labelFields[1]]],
      from: [-84.8, 39.8],
      to: [item[cfg.latLngField[1]], item[cfg.latLngField[0]]],
      value: item[cfg.line.colorField],
      color: lineColor,
    };

    migrationData.push(dt);
    markerIdx++;
    const markerIcon = L.BeautifyIcon.icon({
      isAlphaNumericIcon: true,
      text: markerIdx,
      textColor: 'green',
      borderColor: 'white',
      iconShape: 'circle',
      iconSize: [16, 16],
      backgroundColor: 'transparent',
    });
    const m = L.marker(new L.latLng([item[cfg.latLngField[0]], item[cfg.latLngField[1]]]), {
      icon: markerIcon,
      dataItem: item,
    });

    // add marker to cluster
    cluster.addLayer(m);

    if (!colorCluster[legendColorLabel]) {
      colorCluster[legendColorLabel] = L.featureGroup.subGroup(cluster);
    }
    colorCluster[legendColorLabel].addLayer(m);
  }

  /*
  const options = {
    minZoom: 2,
    marker: {
      radius: [2, 8],
      pulse: cfg.marker.pulse,
      textVisible: cfg.marker.textVisible,
    },
    line: {
      width: cfg.line.width,
      order: false,
      icon: {
        type: 'arrow',
        size: cfg.line.arrowSize,
      },
    },
  };
*/
  // this use leaflet.migration, the width of lines is fixed
  //mapInfo.migrationLayer = L.migrationLayer(migrationData, options);

  // this use leaflet.migrationLayer, width is changeable with valueField
  const migrationLayer = L.migrationLayer({
    data: migrationData,
    map: inst,
    pulseRadius: cfg.marker.pulseRadius,
    pulseBorderWidth: 2,
    arcWidth: 0,
    arcLabel: cfg.marker.textVisible,
    arcLabelFont: '15px sans-serif',
    maxWidth: 5,
  });

  return { all: cluster, color: colorCluster, migrationLayer: migrationLayer };
};

/*
 * render file layer
 */
export const renderFileLayer = (data: any, fileType: string) => {
  if (!data || data.length == 0) {
    return;
  }

  let fileLayer: any = undefined;
  if (fileType == 'text/csv') {
    const csvData = data;
    fileLayer = L.geoCsv(null, {
      firstLineTitles: true,
      fieldSeparator: ',',
      lineSeparator: '\n',
      deleteDobleQuotes: true,
      onEachFeature: function (feature, layer) {
        let popup = '';
        for (const clave in feature.properties) {
          const title = fileLayer.getPropertyTitle(clave);
          popup += '<b>' + title + '</b><br />' + feature.properties[clave] + '<br /><br />';
        }
        layer.bindPopup(popup);
      },
    });
    // add csv data to the new layer
    fileLayer.addData(csvData);
  } else if (fileType == 'application/geojson') {
    const geoJsonData = JSON.parse(data);
    const options = {
      maxZoom: 16,
      tolerance: 3,
      style: style,
      onEachFeature: onEachFeature,
    };
    fileLayer = L.geoJson.vt(geoJsonData, options);
  } else if (fileType == 'application/jsonarray') {
    const jsonData = JSON.parse(data);
    // add json layer to map
    fileLayer = L.layerJSON({
      caching: false,
      propertyLoc: ['lat', 'lon'],
      propertyTitle: 'title',
      callData: function (bbox, callback) {
        callback(jsonData);
      },
      dataToMarker: function (dt, latlng) {
        return L.marker(latlng);
      },
    });
  }

  return fileLayer;
};

function getColor(d) {
  return d > 1000
    ? '#800026'
    : d > 500
    ? '#BD0026'
    : d > 200
    ? '#E31A1C'
    : d > 100
    ? '#FC4E2A'
    : d > 50
    ? '#FD8D3C'
    : d > 20
    ? '#FEB24C'
    : d > 10
    ? '#FED976'
    : '#FFEDA0';
}

function style(feature) {
  return {
    fillColor: getColor(feature.density),
    weight: 2,
    opacity: 1,
    color: 'gray',
    dashArray: '3',
    fillOpacity: 0.7,
  };
}

function highlightFeature(e) {
  const layer = e.target;
  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7,
  });

  layer.bringToFront();
}

function resetHighlight(e) {
  //mapInfo.file.layer.resetStyle(e.target);
}

function zoomToFeature(e) {
  //antAvaInfo.inst.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature,
  });
}

/*
 * render leaflet map
 */
const mapInfo = { ...initMapInfo };
export const renderLeafletMap2 = (
  container: any,
  datasetInfo: any,
  data: any[],
  libCfg: any,
  libVer = '1.7',
  upLoadRef: any,
) => {
  // create basic map
  const inst = L.map(container, {
    zoom: 5,
    minZoom: 2,
    maxZoom: 18,
    zoomControl: false,
    center: [40, 100],
    attributionControl: false,
  });

  // add zoom bar by default
  ZoomBar({ position: 'topleft' }).addTo(inst);

  switch (libCfg.chartType) {
    case 'Marker': {
      // build markers and add them to map
      const clusteredMarkers = buildMarkerMap(data, libCfg.config);
      if (clusteredMarkers) {
        mapInfo.cluster.all = clusteredMarkers.all;
        mapInfo.cluster.shape = clusteredMarkers.shape;
        mapInfo.cluster.color = clusteredMarkers.color;
        if (mapInfo.cluster.all) {
          mapInfo.cluster.all.addTo(inst);
          inst.fitBounds(mapInfo.cluster.all.getBounds());
        }
      }
      break;
    }
    case 'Bubble': {
      // build markers and add them to map
      if(datasetInfo!=null){
        const clusteredMarkers = buildBubbleMap(data, libCfg.config, datasetInfo.dataInfo);
        if (clusteredMarkers) {
          mapInfo.cluster.all = clusteredMarkers.all;
          mapInfo.cluster.shape = clusteredMarkers.shape;
          mapInfo.cluster.color = clusteredMarkers.color;
          if (mapInfo.cluster.all) {
            mapInfo.cluster.all.addTo(inst);
            inst.fitBounds(mapInfo.cluster.all.getBounds());
          }
        }
      }
      break;
    }
    case 'Choropleth': {
      const choropletMap: any = buildChoroplethMap(data, libCfg.config, inst);
      if (choropletMap) {
        mapInfo.choroplethLayer = choropletMap.choroplethLayer;
        mapInfo.choroplethLayer.addTo(inst);
        inst.fitBounds(mapInfo.choroplethLayer.getBounds());
      }
      break;
    }
    case 'Heat': {
      const heatMap: any = buildHeatMap(data, libCfg.config);
      if (heatMap) {
        mapInfo.cluster.all = heatMap.all;
        mapInfo.heatmapLayer = heatMap.heatmapLayer;
        mapInfo.heatmapLayer.addTo(inst);
        inst.fitBounds(mapInfo.cluster.all.getBounds());
        // the widget has a bug which need to be fixed
        // Cannot assign to read only property 'data' of object '#<ImageData>'
        // img.data = imgData;
        // this should be comment out
      }
      break;
    }
    case 'Timeline': {
      buildTimelineMap(data, libCfg.config);
      break;
    }
    case 'Movement': {
      const movementMap: any = buildMovementMap(data, libCfg.config);
      if (movementMap) {
        mapInfo.cluster.all = movementMap.all;
        mapInfo.cluster.color = movementMap.color;
        mapInfo.antPath = movementMap.antPath;
        mapInfo.antPath.addTo(inst);
        mapInfo.cluster.all.addTo(inst);
        inst.fitBounds(mapInfo.cluster.all.getBounds());
      }
      break;
    }
    case 'Migration': {
      const migrationMap: any = buildMigrationMap(data, libCfg.config, inst);
      if (migrationMap) {
        mapInfo.cluster.all = migrationMap.all;
        mapInfo.cluster.color = migrationMap.color;
        mapInfo.migrationLayer = migrationMap.migrationLayer;
        mapInfo.migrationLayer.addTo(inst);
        //mapInfo.cluster.all.addTo(inst);
        inst.fitBounds(mapInfo.cluster.all.getBounds());
      }
      break;
    }
  }

  buildPanelBar2(libCfg.config, inst, libCfg.chartType, upLoadRef);

  return inst;
};

/*
 * build panel and toolbar
 */
const buildPanelBar2 = async (cfg: any, map: any, type, uploadRef) => {
  const baseLayerCfg = { group: 'Map', collapsed: true, layers: [] };
  const overLayerCfg = { group: 'Overlayer', collapsed: true, layers: [] };
  const markerLayerCfg = { group: 'Marker', layers: [] };

  // build base layer options
  if (cfg.baselayer && Array.isArray(cfg.baselayer)) {
    for (const layerName of cfg.baselayer) {
      // get base layer config based on layer name
      const selectedLayer = baseLayerLib.find((item) => {
        return item.name == layerName;
      });
      if (selectedLayer) {
        baseLayerCfg.layers.push(cloneDeep(selectedLayer));
      }
    }
  }
  // activate the first one by default
  baseLayerCfg.layers[0].active = true;

  // build over layer options
  if (cfg.overlayer && Array.isArray(cfg.overlayer?.layers)) {
    for (const layerName of cfg.overlayer?.layers) {
      // get over layer config based on layer name
      const selectedLayer = overLayerLib.find((item) => {
        return item.name == layerName;
      });
      if (selectedLayer) {
        // activate all overlayers by default
        selectedLayer.active = true;
        overLayerCfg.layers.push(cloneDeep(selectedLayer));
      }
    }
  }

  let overPanel = [];
  if (overLayerCfg.layers.length > 0) {
    // add overlayer options to panel
    overPanel.push(overLayerCfg);
  }

  // build marker layer for legend
  const legendLayers: any = [];
  // shape first
  if (mapInfo.cluster.shape && !mapInfo.cluster.shape.default && cfg.marker) {
    for (const key of Object.keys(mapInfo.cluster.shape)) {
      const cfgShape = cfg.marker?.shapeMap?.find((v) => {
        return v.label == key;
      });
      legendLayers.push({
        name: key,
        active: true,
        icon: '<i class="fas fa-' + cfgShape.shape + '" style="color:skyblue"></i>',
        filter: true,
        layer: mapInfo.cluster.shape[key],
      });
    }
  }

  // color after shape
  let colorMap = cfg.marker ? cfg.marker.colorMap : undefined;
  if (cfg.bubble && cfg.bubble.colorMap) {
    colorMap = cfg.bubble.colorMap;
  } else if (cfg.movement && cfg.movement.colorMap) {
    colorMap = cfg.movement.colorMap;
  } else if (cfg.line && cfg.line.colorMap) {
    colorMap = cfg.line.colorMap;
  }

  if (mapInfo.cluster.color && !mapInfo.cluster.color.default && colorMap) {
    for (const cfgColor of colorMap) {
      legendLayers.push({
        name: cfgColor.label,
        active: true,
        icon: '<i class="fas fa-square" style="color:' + cfgColor.color + '"></i>',
        filter: true,
        layer: mapInfo.cluster.color[cfgColor.label],
      });
    }
  }

  if (type == 'Choropleth') {
    for (const it of cfg.choropleth?.colorMap) {
      legendLayers.push({
        name: it.label,
        active: true,
        icon: '<i class="fas fa-square" style="color:' + it.color + '"></i>',
        filter: false,
        layer: {
          type: 'geoJson',
          args: [
            {
              type: 'Feature',
              geometry: null,
            },
          ],
        },
      });
    }
  }

  markerLayerCfg.layers = legendLayers;
  mapInfo.cluster.legend = legendLayers;
  if (legendLayers.length > 0) {
    // add legend to over layer panel
    overPanel.push(markerLayerCfg);
  }

  if (overPanel.length == 0) {
    // set it to null if no overlayer option and legend
    overPanel = null;
  }

  mapInfo.ctrlPanel = PanelLayers([baseLayerCfg], overPanel, {
    position: 'topright',
    title: '',
    collapsibleGroups: true,
    collapsed: false,
    compact: false,
    hideSingleBase: true,
    autoZIndex: false,
  }).addTo(map);

  if (cfg.toolkit?.search) {
    // button is shown on map but except when click. Gavin !!!
    mapInfo.toolkit.search = GeoNames({
      position: 'topcenter',
      username: 'Mr_DataPie',
      enablePostalCodes: false,
    }).addTo(map);
  }

  if (cfg.toolkit?.fullscreen) {
    mapInfo.toolkit.fullscreen = L.fullScreen({
      position: 'topleft',
      forceSeparateButton: true,
    }).addTo(map);
  }

  if (cfg.panel?.rank || cfg.panel?.info) {
    mapInfo.quadtree = L.quadtree();
    for (const mk of mapInfo.cluster.all.getLayers()) {
      mapInfo.quadtree.add(mk);
    }
    mapInfo.infoPanel = SlideMenu('<p>test</p>', {
      position: 'topleft',
      menuposition: 'topleft',
      width: '15%',
      height: '100%',
      icon: 'fa-solid fa-user-secret',
    }).addTo(map);
    map.on('zoomend moveend resize', () => {
      const htmlText = getVisibleMarkers(mapInfo.quadtree, map, 'sales', 'asc');
      mapInfo.infoPanel.setContents(htmlText);
    });
  }

  if (cfg.toolkit?.open) {
    // file load button
    mapInfo.toolkit.open = L.easyButton(
      '<img src="/resource/img/open-folder.png">',
      function (btn, map) {
        if(uploadRef){
          uploadRef.value.click();
        }
      },
    ).addTo(map);
  }

  if (cfg.toolkit?.seek) {
    mapInfo.toolkit.seek = new L.Control.Search({ layer: mapInfo.cluster.all });
    map.addControl(mapInfo.toolkit.seek);
  }

  if (cfg.toolkit?.export) {
    // it works when replace domtoimage with html2canvas
    mapInfo.toolkit.export = EasyPrint({
      title: 'Export',
      position: 'topleft',
      exportOnly: true,
      hideControlContainer: true,
    }).addTo(map);
  }

  if (cfg.toolkit?.locator) {
    mapInfo.toolkit.locator = new Locate({
      position: 'topleft',
      strings: {
        title: 'Locator',
      },
    }).addTo(map);
  }

  if (cfg.toolkit?.player) {
    // add timeline player to map
    mapInfo.toolkit.timeline = L.timeline(pointsData).addTo(map);
    mapInfo.toolkit.player = L.timelineSliderControl({
      formatOutput: function (date) {
        return new Date(date).toLocaleDateString();
      },
    }).addTo(map);
    mapInfo.toolkit.player.addTimelines(mapInfo.toolkit.timeline);
  }

  if (cfg.toolkit?.coordinator) {
    // coordinator
    mapInfo.toolkit.coordinator = L.control
      .coordinates({
        position: 'bottomleft',
        decimals: 2,
        useDMS: false,
        labelTemplateLat: '{y},',
        labelTemplateLng: '{x}',
        useLatLngOrder: true, //ordering of labels, default false-> lng-lat
        markerType: L.marker,
        enableUserInput: true,
      })
      .addTo(map);
  }

  if (cfg.toolkit?.scale) {
    mapInfo.toolkit.scale = L.control
      .scale({ position: 'bottomright', imperial: false })
      .addTo(map);
  }
};
