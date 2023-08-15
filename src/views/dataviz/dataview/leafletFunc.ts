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
  let layer = e.target;
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
