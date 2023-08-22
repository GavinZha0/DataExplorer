import template from 'template_js';
import { go } from '/@/thirdparty/gojs/go';
import { SpiralLayout } from '/@/thirdparty/gojs/SpiralLayout';
import { PackedLayout } from '/@/thirdparty/gojs/PackedLayout';
import { ArrangingLayout } from '/@/thirdparty/gojs/ArrangingLayout';
import { DoubleTreeLayout } from '/@/thirdparty/gojs/DoubleTreeLayout';
import { FishboneLayout } from '/@/thirdparty/gojs/FishboneLayout';

const cySvgCache = { diagram: undefined };
const gojsInfo: any = {};
const $ = go.GraphObject.make;

/*
 * convert flat data to tree structure
 * data: flat data array
 * groupFields: like [country, state, city] with sequence from big to small
 * level: first level, default is 0
 * return: tree data which node has perproties nodeLabel, nodeLevel and children at least
 */
export const convertGroupToTree = (data: any[], groupFields: string[], level = 0) => {
  if (level == groupFields.length - 1) {
    for (const dt of data) {
      dt['nodeLevel'] = level;
      dt['nodeCategory'] = groupFields[level];
      dt['nodeLabel'] = dt[groupFields[level]];
    }
    return data;
  }

  const treeData = [];
  const groupName = groupFields[level];
  const gp = data.reduce((group, item) => {
    group[item[groupName]] = group[item[groupName]] ?? [];
    group[item[groupName]].push(item);
    return group;
  }, {});

  for (const key of Object.keys(gp)) {
    const treeNode = { nodeLabel: key, nodeCategory: groupName, nodeLevel: level, children: [] };
    treeNode[groupName] = key;
    treeNode.children = convertGroupToTree(gp[key], groupFields, level + 1);
    treeData.push(treeNode);
  }
  return treeData;
};

/*
 * convert flat data to tree structure
 * data: flat data array with id/pid and name
 * root: root node, default is null
 * labelField: indicate the node name
 * idField: id field, like 'id'
 * pidField: parent id, like 'pid'
 * level: root level, default is 0
 * return: tree data which node has perproties nodeLabel, nodeLevel and children at least
 */
export const convertArrayToTree = (
  data,
  root = null,
  labelField: string,
  idField = 'id',
  pidField = 'pid',
  level = 0,
) =>
  data
    .filter((item) => item[pidField] === root)
    .map((item) => ({
      ...item,
      nodeLabel: item[labelField],
      nodeLevel: level,
      children: convertArrayToTree(data, item[idField], labelField, idField, pidField, level + 1),
    }));

/*
 * get max depth of a tree
 * root is 0
 */
export const getMaxTreeDepth = (tree: any) => {
  let deep = 0;
  if (tree) {
    tree.forEach((item) => {
      if (item.children) {
        deep = Math.max(deep, getMaxTreeDepth(item.children) + 1);
      } else {
        deep = Math.max(deep, 1);
      }
    });
  }

  return deep;
};

/*
 * get svg icon from font awesome and save to cache if it is not in local cache
 * get svg icon from local cache and update color if it is in cache
 * both utf8 and base64 work well
 */
export function getAwesomeSvgIcon(name, color) {
  if (!name) {
    return null;
  }
  if (cySvgCache[name] == undefined) {
    cySvgCache[name] = ''; //assign a placeholder in order to download once only
    const url = 'https://site-assets.fontawesome.com/releases/v6.4.0/svgs/solid/' + name + '.svg';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          cySvgCache[name] = reader.result;
        }
      };
      reader.readAsText(xhr.response);
    };
    xhr.send();
  } else if (cySvgCache[name] != '') {
    // update size and color
    const domParser = new DOMParser();
    const svgObject = domParser.parseFromString(cySvgCache[name], 'image/svg+xml').documentElement;
    svgObject.setAttribute('fill', color);
    svgObject.setAttribute('width', '25');
    svgObject.setAttribute('height', '25');
    const imgData = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgObject.outerHTML);
    //let imgData = 'data:image/svg+xml;base64,' + btoa(svgData);
    return imgData;
  } else {
    return null;
  }
}

/*
 * build network style
 */
export const buildCyStyle = (cyInst: any, cfg: any) => {
  if (cfg.node) {
    cyInst
      .style()
      .selector('node')
      .style({
        color: cfg.node.icon?.labelColor ? cfg.node.icon.labelColor : '#cccccc',
        'font-size': cfg.node.icon?.labelSize ? cfg.node.icon.labelSize : 6,
        shape: cfg.node.body?.shapeField
          ? 'data(bodyShape)'
          : cfg.node.body.shape
          ? cfg.node.body.shape
          : '',
        'background-color': cfg.node.body?.colorField
          ? 'data(bodyColor)'
          : cfg.node.body?.shape && cfg.node.body?.color
          ? cfg.node.body.color
          : undefined,
        'background-opacity':
          (cfg.node.body?.shapeField || cfg.node.body?.shape) && cfg.node.body?.color ? 1 : 0,
      });
    cyInst
      .style()
      .selector('node[^bodyColor]')
      .style({
        'background-color': cfg.node.body?.color ? cfg.node.body.color : undefined,
        'background-opacity': cfg.node.body?.shape && cfg.node.body?.color ? 1 : 0.5,
      });

    cyInst.style().selector('node[?collapsed]').style({
      'border-color': 'green',
      'border-width': 3,
    });
  }
  if (cfg.edge) {
    cyInst
      .style()
      .selector('edge')
      .style({
        color: cfg.edge.line?.labelColor ? cfg.edge.line.labelColor : '#cccccc',
        'font-size': cfg.edge.line?.labelSize ? cfg.edge.line.labelSize : 6,
        'line-color': cfg.edge.line?.color ? cfg.edge.line.color : '#cccccc',
        'line-style': cfg.edge.line?.style ? cfg.edge.line.style : 'solid',
        'curve-style': cfg.edge.line?.type ? cfg.edge.line.type : 'haystack',
        'mid-target-arrow-shape': cfg.edge.marker?.marker ? cfg.edge.marker?.marker : '',
        width: cfg.edge.marker?.width ? cfg.edge.marker.width : 1,
      });
  }

  cyInst.style().selector(':selected').style({
    'overlay-color': '#0b9bcd',
    'overlay-padding': 2,
    'overlay-opacity': 0.5,
  });
};

/*
 * build tree network
 */
export const buildCyTreeNet = (treeData: any[], cfg: any) => {
  const nodes: any[] = [],
    edges: any[] = [];
  if (!treeData) {
    return;
  }

  const queue = treeData;
  let primaryNodeCfg = cfg.node.icon; // default is icon config
  const secondaryNodeCfg = cfg.node.body; // default is icon config
  let primary = 'icon';
  if ((!cfg.node.icon || !cfg.node.icon.shapeField) && cfg.node.body && cfg.node.body.shapeField) {
    // if icon is not defined or iconField is not defined but body has shapeField
    primaryNodeCfg = cfg.node.body;
    primary = 'body';
  }

  for (const pNode of queue) {
    let primaryColor = primaryNodeCfg.color;
    if (pNode.nodeLevel == 0) {
      // add parent node to nodes
      const primaryShape = primaryNodeCfg.shapeMap.find((ele) => {
        return pNode[primaryNodeCfg.shapeField] == ele.value;
      });
      if (
        primaryNodeCfg.colorField &&
        pNode[primaryNodeCfg.colorField] != undefined &&
        primaryNodeCfg.colorMap
      ) {
        // detect icon color if colorField exist in pNode
        const dtValue = pNode[primaryNodeCfg.colorField];
        for (const ele of primaryNodeCfg.colorMap) {
          if (Array.isArray(ele.value) && dtValue >= ele.value[0] && dtValue < ele.value[1]) {
            // dtValue should be in range ele.value[]
            primaryColor = ele.color;
            break;
          } else if (typeof ele.value == 'string' && dtValue == ele.value) {
            // dtValue should be a string
            primaryColor = ele.color;
            break;
          }
        }
      }

      let nodeData: any = undefined;
      if (primary == 'icon') {
        getAwesomeSvgIcon(primaryShape.shape, primaryColor);
        nodeData = {
          data: {
            id: pNode.nodeLabel,
            label: pNode.nodeLabel,
            nodeCategory: pNode.nodeCategory,
            labelSize: primaryNodeCfg.labelSize ? primaryNodeCfg.labelSize : 8,
            labelColor: primaryNodeCfg.labelColor ? primaryNodeCfg.labelColor : '#000000',
            nodeLevel: 0,
            iconShape: primaryShape.shape,
            iconColor: primaryColor,
            bodyShape: secondaryNodeCfg.shape,
            bodyColor: secondaryNodeCfg.color,
          },
        };
      } else {
        nodeData = {
          data: {
            id: pNode.nodeLabel,
            label: pNode.nodeLabel,
            nodeCategory: pNode.nodeCategory,
            labelSize: secondaryNodeCfg.labelSize ? secondaryNodeCfg.labelSize : 8,
            labelColor: secondaryNodeCfg.labelColor ? secondaryNodeCfg.labelColor : '#000000',
            nodeLevel: 0,
            bodyShape: primaryShape.shape,
            bodyColor: primaryColor,
          },
        };
      }

      if (pNode[primaryNodeCfg.colorField] != undefined) {
        // add tooltip if there is data
        let tipStr = template(cfg.node.icon.tooltip, pNode);
        tipStr = '<div style="text-align: left">' + tipStr + '</div>';
        nodeData.data['tooltip'] = tipStr;
      }
      nodes.push(nodeData);
    }
    if (pNode.children) {
      // add children nodes to nodes
      for (const cNode of pNode.children) {
        const primaryShape = primaryNodeCfg.shapeMap.find((ele) => {
          return cNode[primaryNodeCfg.shapeField] == ele.value;
        });
        if (
          primaryNodeCfg.colorField &&
          cNode[primaryNodeCfg.colorField] != undefined &&
          primaryNodeCfg.colorMap
        ) {
          // detect icon color if colorField exist in cNode
          const dtValue = cNode[primaryNodeCfg.colorField];
          for (const ele of primaryNodeCfg.colorMap) {
            if (Array.isArray(ele.value) && dtValue >= ele.value[0] && dtValue < ele.value[1]) {
              // dtValue should be in range ele.value[]
              primaryColor = ele.color;
              break;
            } else if (typeof ele.value == 'string' && dtValue == ele.value) {
              // dtValue should be a string
              primaryColor = ele.color;
              break;
            }
          }
        }

        let nodeData: any = undefined;
        if (primary == 'icon') {
          getAwesomeSvgIcon(primaryShape.shape, primaryColor);
          nodeData = {
            data: {
              id: cNode.nodeLabel,
              label: cNode.nodeLabel,
              nodeCategory: pNode.nodeCategory,
              labelSize: primaryNodeCfg.labelSize ? primaryNodeCfg.labelSize : 8,
              labelColor: primaryNodeCfg.labelColor ? primaryNodeCfg.labelColor : '#000000',
              nodeLevel: cNode.nodeLevel,
              iconShape: primaryShape.shape,
              iconColor: primaryColor,
              bodyShape: secondaryNodeCfg.shape,
              bodyColor: secondaryNodeCfg.color,
            },
          };
        } else {
          nodeData = {
            data: {
              id: cNode.nodeLabel,
              label: cNode.nodeLabel,
              nodeCategory: pNode.nodeCategory,
              labelSize: secondaryNodeCfg.labelSize ? secondaryNodeCfg.labelSize : 8,
              labelColor: secondaryNodeCfg.labelColor ? secondaryNodeCfg.labelColor : '#000000',
              nodeLevel: cNode.nodeLevel,
              bodyShape: primaryShape.shape,
              bodyColor: primaryColor,
            },
          };
        }

        if (
          cNode.nodeLevel == primaryNodeCfg.shapeMap.length - 1 &&
          cNode[primaryNodeCfg.colorField] != undefined
        ) {
          // add data to leaf node only for FieldLevel mode
          // the data is already here if IdPid mode
          nodeData.data['rec'] = {};
          for (const key of Object.keys(cNode)) {
            if (key != 'children') {
              nodeData.data.rec[key] = cNode[key];
            }
          }
        }

        // find record to build tooltip
        let record;
        if (cNode[primaryNodeCfg.colorField] != undefined) {
          record = cNode;
        } else if (cNode['rec'] != undefined) {
          record = cNode.rec;
        }
        if (record && record[primaryNodeCfg.colorField] != undefined) {
          // add tooltip if there is data
          let tipStr = template(cfg.node.icon.tooltip, record);
          tipStr = '<div style="text-align: left">' + tipStr + '</div>';
          nodeData.data['tooltip'] = tipStr;
        }
        nodes.push(nodeData);

        // add edges between pNode and cNode
        edges.push({
          data: {
            id: edges.length,
            source: pNode.nodeLabel,
            target: cNode.nodeLabel,
            tooltip: '',
          },
        });
        queue.push(cNode);
      }
    }
  }

  return { nodes, edges };
};

/*
 * build tree network
 */
export const buildCyNestNet = (treeData: any[], cfg: any) => {
  const nodes: any[] = [],
    edges: any[] = [];
  if (!treeData) {
    return;
  }

  const queue = treeData;
  const primaryNodeCfg = cfg.node.body; // default is body config
  const secondaryNodeCfg = cfg.node.icon; // default is icon config
  const primary = 'body';

  for (const pNode of queue) {
    let primaryColor = undefined;
    if (pNode.nodeLevel == 0) {
      // add parent node to nodes
      if (
        primaryNodeCfg.colorField &&
        pNode[primaryNodeCfg.colorField] != undefined &&
        primaryNodeCfg.colorMap
      ) {
        // detect icon color if colorField exist in pNode
        const dtValue = pNode[primaryNodeCfg.colorField];
        for (const ele of primaryNodeCfg.colorMap) {
          if (Array.isArray(ele.value) && dtValue >= ele.value[0] && dtValue < ele.value[1]) {
            // dtValue should be in range ele.value[]
            primaryColor = ele.color;
            break;
          } else if (typeof ele.value == 'string' && dtValue == ele.value) {
            // dtValue should be a string
            primaryColor = ele.color;
            break;
          }
        }
      }

      const nodeData = {
        data: {
          id: pNode.nodeLabel,
          label: pNode.nodeLabel,
          labelSize: secondaryNodeCfg.labelSize ? secondaryNodeCfg.labelSize : 8,
          labelColor: secondaryNodeCfg.labelColor ? secondaryNodeCfg.labelColor : '#000000',
          nodeLevel: 0,
          bodyShape: primaryNodeCfg.shape,
          bodyColor: primaryColor,
        },
      };

      if (pNode[primaryNodeCfg.colorField] != undefined) {
        // add tooltip if there is data
        let tipStr = template(cfg.node.icon.tooltip, pNode);
        tipStr = '<div style="text-align: left">' + tipStr + '</div>';
        nodeData.data['tooltip'] = tipStr;
      }
      nodes.push(nodeData);
    }
    if (pNode.children) {
      // add children nodes to nodes
      for (const cNode of pNode.children) {
        if (
          primaryNodeCfg.colorField &&
          cNode[primaryNodeCfg.colorField] != undefined &&
          primaryNodeCfg.colorMap
        ) {
          // detect icon color if colorField exist in cNode
          const dtValue = cNode[primaryNodeCfg.colorField];
          for (const ele of primaryNodeCfg.colorMap) {
            if (Array.isArray(ele.value) && dtValue >= ele.value[0] && dtValue < ele.value[1]) {
              // dtValue should be in range ele.value[]
              primaryColor = ele.color;
              break;
            } else if (typeof ele.value == 'string' && dtValue == ele.value) {
              // dtValue should be a string
              primaryColor = ele.color;
              break;
            }
          }
        }

        const nodeData = {
          data: {
            id: cNode.nodeLabel,
            parent: pNode.nodeLabel,
            label: cNode.nodeLabel,
            labelSize: secondaryNodeCfg.labelSize ? secondaryNodeCfg.labelSize : 8,
            labelColor: secondaryNodeCfg.labelColor ? secondaryNodeCfg.labelColor : '#000000',
            nodeLevel: cNode.nodeLevel,
            bodyShape: primaryNodeCfg.shape,
            bodyColor: primaryColor,
          },
        };

        if (cNode[primaryNodeCfg.colorField] == undefined) {
          // add data to leaf node only for FieldLevel mode
          // the data is already here if IdPid mode
          nodeData['rec'] = {};
          for (const key of Object.keys(cNode)) {
            if (key != 'children') {
              nodeData.rec[key] = cNode[key];
            }
          }
        }

        let record;
        if (cNode[primaryNodeCfg.colorField] != undefined) {
          record = cNode;
        } else if (cNode['rec'] != undefined) {
          record = cNode.rec;
        }
        if (record && record[primaryNodeCfg.colorField] != undefined) {
          // add tooltip if there is data
          let tipStr = template(cfg.node.icon.tooltip, record);
          tipStr = '<div style="text-align: left">' + tipStr + '</div>';
          nodeData.data['tooltip'] = tipStr;
        }
        nodes.push(nodeData);

        // add edges between pNode and cNode
        edges.push({
          data: {
            id: edges.length,
            source: pNode.nodeLabel,
            target: cNode.nodeLabel,
            tooltip: '',
          },
        });
        queue.push(cNode);
      }
    }
  }

  return { nodes, edges };
};

/*
 * build tooltip of node
 */
export const buildCyNetTooltip = (cy: any) => {
  cy.nodes().forEach((node) => {
    const tip = node.data().tooltip;
    if (!tip) {
      return;
    }

    const tipId = `popper-${node.id()}`;
    const existingTarget = document.getElementById(tipId);
    if (existingTarget && existingTarget.length !== 0) {
      existingTarget.remove();
    }

    const popper = node.popper({
      content: () => {
        // create div container
        const tipDiv = document.createElement('div');
        tipDiv.id = tipId;
        tipDiv.classList.add('target-popper');
        tipDiv.innerHTML = tip;
        document.body.appendChild(tipDiv);
        return tipDiv;
      },
    });

    node.on('position', () => {
      popper.update();
    });

    node.cy().on('pan zoom resize', () => {
      popper.update();
    });

    node.on('mouseover', () => {
      if (document.getElementById(tipId)) {
        document.getElementById(tipId).classList.add('active');
      }
    });

    node.on('mouseout', () => {
      if (document.getElementById(tipId)) {
        document.getElementById(tipId).classList.remove('active');
      }
    });
  });
};

/*
 * build tooltip of node
 */
export const buildCyNetEvents = (cy: any, aux: any, jQuery: any) => {
  if (cy == null) {
    return;
  }
  // remove events first
  try {
    cy.off('click', 'node');
  } catch (e) {
    //
  }

  try {
    cy.off('click', 'edge');
  } catch (e) {
    //
  }

  try {
    cy.off('unselect', 'element');
  } catch (e) {
    //
  }

  try {
    cy.off('dblclick', 'node');
  } catch (e) {
    //
  }

  try {
    cy.off('viewport');
  } catch (e) {
    //
  }

  try {
    cy.off('boxselect');
  } catch (e) {
    //
  }

  // highlight neighbors or tree family
  if (aux.highlight) {
    let clickTimer = undefined;
    cy.on('click', 'node', function (evt) {
      if (clickTimer) {
        // it is db click when timer was started
        // stop timer and return
        clearTimeout(clickTimer);
        clickTimer = undefined;
        return;
      }

      // single click
      clickTimer = setTimeout(function () {
        clickTimer = undefined;
        const tappedNode = evt.target;
        let highlightedNodes;
        cy.elements().style('opacity', 0.2);
        tappedNode.style('opacity', 1);
        if (aux.highlight == 'family') {
          highlightedNodes = tappedNode.successors().style('opacity', 1);
        } else {
          highlightedNodes = tappedNode.closedNeighborhood().style('opacity', 1);
          //cyUtil.highlightNeighbors(tappedNode);
        }

        // update style
        cy.style().update();

        if (aux.panel == 'rank' && aux.rankField && aux.rankOrder) {
          // find nodes with record
          const sortedNodes = highlightedNodes.filter('node[rec]').sort(function (a, b) {
            if (aux.rankOrder == 'asc') {
              return a.data('rec')[aux.rankField] - b.data('rec')[aux.rankField];
            } else {
              return b.data('rec')[aux.rankField] - a.data('rec')[aux.rankField];
            }
          });
          if (sortedNodes.length > 10) {
            // limit to top 10
            sortedNodes.length = 10;
          }

          // update panel with ranked nodes
          jQuery.fn.cyPanUpdate({ rankNodes: sortedNodes, rankField: aux.rankField });
        } else if (aux.panel == 'single') {
          // update panel with selected node info
          jQuery.fn.cyPanUpdate({ infoNode: tappedNode, infoFields: aux.nodeField });
        }
      }, cy.multiClickDebounceTime());
    });

    cy.on('click', 'edge', function (evt) {
      const tappedEdge = evt.target;
      cy.elements().style('opacity', 0.2);
      tappedEdge.style('opacity', 1);
      tappedEdge.connectedNodes().style('opacity', 1);
      if (aux.highlight == 'family') {
        // from the node to root
        const linkedNodes = tappedEdge.source().predecessors('node');
        linkedNodes.roots();
        const aStar = cy
          .elements()
          .aStar({ root: linkedNodes.roots(), goal: tappedEdge.source(), directed: true });
        if (aStar.path) {
          aStar.path.style('opacity', 1);
        }
      }
      cy.style().update();
    });

    cy.on('unselect', 'element', function (evt) {
      //cyUtil.removeHighlights();
      cy.elements().style('opacity', 1);
      cy.style().update();
    });
  } else if (aux.panel == 'single') {
    let clickTimer = undefined;
    cy.on('click', 'node', function (evt) {
      if (clickTimer) {
        // it is db click when timer was started
        // stop timer and return
        clearTimeout(clickTimer);
        clickTimer = undefined;
        return;
      }

      // single click
      clickTimer = setTimeout(function () {
        clickTimer = undefined;
        const tappedNode = evt.target;
        // update panel with selected node info
        jQuery.fn.cyPanUpdate({ infoNode: tappedNode, infoFields: aux.nodeField });
      }, cy.multiClickDebounceTime());
    });
  }

  // collapse and expand
  if (aux.collapse) {
    cy.on('dblclick', 'node', function (evt) {
      const tappedNode = evt.target;
      if (tappedNode.data()['collapsed']) {
        tappedNode.data()['collapsed'] = false;
        const subNodes = tappedNode.data()['subNodes'];
        const subEdges = tappedNode.data()['subEdges'];
        //cy.add(subNodes);
        //cy.add(subEdges);
        subNodes.restore();
        subEdges.restore();
        cy.layout(cy.userLayouts[cy.selectedLayout]).run();
      } else {
        const subNodes = tappedNode.successors('node');
        const subEdges = tappedNode.successors('edge');
        tappedNode.data()['collapsed'] = true;
        tappedNode.data()['subNodes'] = subNodes;
        tappedNode.data()['subEdges'] = subEdges;
        const duration = 500;
        subNodes.animate(
          {
            position: tappedNode.position(),
          },
          {
            duration: duration,
            complete: function () {
              subNodes.remove();
            },
          },
        );
      }
    });
  }

  if (aux.panel == 'rank') {
    //rank nodes when zoomin, zoomout or zoomfit
    cy.on('viewport', function (evt) {
      // rank nodes based on specific field
      const nodes = cy.nodes('[rec]').sort(function (a, b) {
        if (aux.rankOrder == 'asc') {
          return a.data('rec')[aux.rankField] - b.data('rec')[aux.rankField];
        } else {
          return b.data('rec')[aux.rankField] - a.data('rec')[aux.rankField];
        }
      });
      if (nodes.length > 10) {
        // limit to top 10
        nodes.length = 10;
      }
      // update info panel
      jQuery.fn.cyPanUpdate({ rankNodes: nodes, rankField: aux.rankField });
    });

    // rank selected nodes
    cy.on('boxselect', function (evt) {
      // rank nodes based on specific field
      const nodes = cy.nodes(':selected[rec]').sort(function (a, b) {
        if (aux.rankOrder == 'asc') {
          return a.data('rec')[aux.rankField] - b.data('rec')[aux.rankField];
        } else {
          return b.data('rec')[aux.rankField] - a.data('rec')[aux.rankField];
        }
      });
      if (nodes.length > 15) {
        // limit to top 10
        nodes.length = 15;
      }
      // update info panel
      jQuery.fn.cyPanUpdate({ rankNodes: nodes, rankField: aux.rankField });
    });
  }
};

/*
 * add vis root node
 */
export const addVirRootNode = (cy: any) => {
  const nodes: any[] = [],
    edges: any[] = [];
  const rootNodes = cy.nodes().roots();
  // add virtual root only if there are multiple root nodes
  if (rootNodes.length > 1) {
    nodes.push({
      data: { id: 'virRoot', label: 'Root', iconShape: 'house', iconColor: 'green' },
    });
    for (const nd of rootNodes) {
      edges.push({
        data: { id: -1 - edges.length, source: 'virRoot', target: nd.data().label },
      });
    }
    return { nodes, edges };
  }
  return null;
};

/*
 * build gojs network
 */
export const getGojsLayout = (cyElements: any, layout: any, gojsContainer: any, cyInst: any) => {
  const nodes: any[] = [],
    links: any[] = [];

  if (!cyElements) {
    return null;
  }

  const dirField = layout.options.dirField;
  const rootNodes = cyInst.nodes().roots();
  const keyNodes = rootNodes.connectedEdges().targets();
  for (const kNode of keyNodes) {
    if (kNode.data()[dirField]) {
      // the kNode is a leaf and has a value of dirField
      continue;
    }
    const kLeafNodes = kNode.outgoers().filter('node');
    if (kLeafNodes && kLeafNodes != null && kLeafNodes.length > 0) {
      const targetNode = cyElements.nodes.find((el) => {
        return el.data.id == kNode.id();
      });
      if (targetNode != null && kLeafNodes[0].data().rec && kLeafNodes[0].data().rec[dirField]){
        targetNode.data[dirField] = kLeafNodes[0].data().rec[dirField];
      }
    }
  }

  // build gojs data, nodes and edges from cy data
  for (const node of cyElements.nodes) {
    nodes.push({
      key: node.data['id'],
      text: node.data['nodeLabel'],
      dir: node.data[dirField],
    });
  }
  for (const edge of cyElements.edges) {
    links.push({
      from: edge.data['source'],
      to: edge.data['target'],
      text: edge.data['nodeLabel'],
    });
  }

  if (!gojsInfo.diagram) {
    // create new diagram with default layout
    gojsInfo.diagram = new go.Diagram(gojsContainer, {
      layout: new go.GridLayout({}),
      ModelChanged: (e) => {
        if (e.isTransactionFinished) {
          gojsInfo.goModel = JSON.parse(gojsInfo.diagram.model.toJson());
        }
      },
    });
  }

  // create graphlink model with data (nodes and edges)
  const goDiagram = gojsInfo.diagram;
  goDiagram.model = new go.GraphLinksModel(nodes, links);

  // node template bind location with output name 'loc'
  goDiagram.nodeTemplate = $(
    go.Node,
    'Auto',
    { locationSpot: go.Spot.Center },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    $(go.Shape, { figure: 'Rectangle' }),
  );

  // link template
  // curve: None, Bezier, JumpGap, or JumpOver
  // routing: Normal, Orthogonal, or AvoidsNodes
  goDiagram.linkTemplate = $(
    go.Link,
    { curve: go.Link.Bezier, routing: go.Link.AvoidsNodes },
    new go.Binding('points').makeTwoWay(),
    $(go.Shape, { strokeWidth: 1 }),
  );

  // update layout of diagram
  switch (layout.name) {
    case 'ForceDirected': {
      goDiagram.layout = new go.ForceDirectedLayout({ comparer: go.GridLayout.smartComparer });
      break;
    }
    case 'Tree': {
      goDiagram.layout = new go.TreeLayout({ angle: 90, nodeSpacing: 30, layerSpacing: 50 });
      break;
    }
    case 'Layered': {
      goDiagram.layout = new go.LayeredDigraphLayout({
        packOption: 3,
        layeringOption: go.LayeredDigraphLayout.LayerOptimalLinkLength,
        aggressiveOption: go.LayeredDigraphLayout.AggressiveLess,
      });
      break;
    }
    case 'Arranging': {
      goDiagram.layout = $(ArrangingLayout, { primaryLayout: new go.CircularLayout() });
      break;
    }
    case 'DoubleTree': {
      goDiagram.layout = $(DoubleTreeLayout, {
        directionFunction: (n) => n.data && n.data.dir !== 'left',
      });
      break;
    }
    case 'Packed': {
      goDiagram.layout = $(PackedLayout, {});
      break;
    }
    case 'Spiral': {
      goDiagram.layout = $(SpiralLayout, {});
      break;
    }
    case 'Fishbone': {
      goDiagram.layout = $(FishboneLayout, {
        angle: 180,
        layerSpacing: 10,
        nodeSpacing: 20,
        rowSpacing: 10,
      });
      break;
    }
    default: {
      return null;
    }
  }

  // trigger layout to run
  goDiagram.layoutDiagram();

  // return nodes with 'loc' and links with path
  return { nodes: goDiagram.model.nodeDataArray, links: goDiagram.model.linkDataArray };
};

/*
 * get distance and weight for cy network
 */
function getDistWeight(sX, sY, tX, tY, PointX, PointY) {
  let W, D;
  D =
    (PointY - sY + ((sX - PointX) * (sY - tY)) / (sX - tX)) /
    Math.sqrt(1 + Math.pow((sY - tY) / (sX - tX), 2));
  W = Math.sqrt(Math.pow(PointY - sY, 2) + Math.pow(PointX - sX, 2) - Math.pow(D, 2));

  const distAB = Math.sqrt(Math.pow(tX - sX, 2) + Math.pow(tY - sY, 2));
  W = W / distAB;

  // check whether the point (PointX, PointY) is on right or left of the line src to tgt.
  // for instance : a point C(X, Y) and line (AB).  d=(xB-xA)(yC-yA)-(yB-yA)(xC-xA). if d>0,
  // then C is on left of the line. if d<0, it is on right. if d=0, it is on the line.
  let delta1 = (tX - sX) * (PointY - sY) - (tY - sY) * (PointX - sX);
  switch (true) {
    case delta1 >= 0:
      delta1 = 1;
      break;
    case delta1 < 0:
      delta1 = -1;
      break;
  }
  //check whether the point (PointX, PointY) is "behind" the line src to tgt
  let delta2 = (tX - sX) * (PointX - sX) + (tY - sY) * (PointY - sY);
  switch (true) {
    case delta2 >= 0:
      delta2 = 1;
      break;
    case delta2 < 0:
      delta2 = -1;
      break;
  }

  //ensure that sign of D is same as sign of delta1. Hence we need to take absolute value of D and multiply by delta1
  D = Math.abs(D) * delta1;
  W = W * delta2;

  return { distance: D.toFixed(2), weight: W.toFixed(2) };
}

/*
 * map gojs layout to cy and render cy
 */
export const renderGoLayoutByCy = (cy: any, goElement: any) => {
  if (!gojsInfo.goModel) {
    return;
  }

  // batch modifications to avoid rendering during changes
  cy.startBatch();

  const nodes = cy.nodes();
  for (const node of nodes) {
    const goNode = goElement.nodes.find(function (ele) {
      return ele.key == node.id();
    });
    //split it to get location if it is string
    const loc = goNode.loc.split(' ');
    if (goNode) {
      // update node position based on location which is from goJs model
      // only integer is accepted by Cy
      node.position({ x: Math.round(loc[0]), y: Math.round(loc[1]) });
    }
  }

  // get all edges from the graph
  const edges = cy.edges();
  for (const edge of edges) {
    const edgeData = edge.data();
    if (!edgeData.category) {
      edge.style('segment-distances', 0);
      edge.style('segment-weights', 0.5);
      edge.style('control-point-distances', 0);
      edge.style('control-point-weights', 0.5);
    } else {
      const sNodePos = edge.source().position();
      const tNodePos = edge.target().position();

      // find link between source node and target node from goJs model
      const goLink = goElement.links.find(function (ele) {
        return ele.from == edge.data().source && ele.to == edge.data().target;
      });
      if (goLink) {
        const distances = [];
        const weights = [];
        const totalPoints = goLink.points.length / 2;

        // filter breakpoints without first and last one
        // ignore the first/last two points because they are close to source/target nodes too much
        // start from beginning point and end at ending point if only ignore the first/last points
        for (let k = 2; k < totalPoints - 2; k++) {
          const aX = Math.round(goLink.points[k * 2 - 2]);
          const aY = Math.round(goLink.points[k * 2 - 1]);
          const bX = Math.round(goLink.points[k * 2]);
          const bY = Math.round(goLink.points[k * 2 + 1]);
          const cX = Math.round(goLink.points[k * 2 + 2]);
          const cY = Math.round(goLink.points[k * 2 + 3]);
          const distAB = Math.sqrt(Math.pow(bX - aX, 2) + Math.pow(bY - aY, 2));

          if ((aX == bX && bX == cX) || (aY == bY && bY == cY)) {
            // get the first/last points when it is horizontal/vertical line
            continue;
          } else if (distAB > 10) {
            //ignore the point when they are too close
            //get distance and weight based on source/target nodes and breakpoint
            const distWeight = getDistWeight(
              sNodePos.x,
              sNodePos.y,
              tNodePos.x,
              tNodePos.y,
              bX,
              bY,
            );
            distances.push(distWeight.distance);
            weights.push(distWeight.weight);
          }
        }

        //update edge style
        if (distances.length != 0 && weights.length != 0) {
          //curve-style: segments
          edge.style('segment-distances', distances);
          edge.style('segment-weights', weights);

          //curve-style: unbundled-bezier
          edge.style('control-point-distances', distances);
          edge.style('control-point-weights', weights);
        }
      }
    }
  }
  cy.endBatch();
  cy.fit();
};
