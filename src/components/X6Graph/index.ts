import {Graph, Shape} from '@antv/x6';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Dnd } from '@antv/x6-plugin-dnd';
import { Selection } from '@antv/x6-plugin-selection';
import { Clipboard } from '@antv/x6-plugin-clipboard';
import { History } from '@antv/x6-plugin-history';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { DagreLayout } from '@antv/layout';
import { register } from '@antv/x6-vue-shape';
import insertCss from 'insert-css';
import { defaultCanvasAttrs, nodePortCfg } from "./type";
import ExeNode from './exeNode.vue';
import ChartNode from './chartNode.vue';

export default class X6Graph {
  public static graph: Graph;
  public static dnd: any;

  // default values
  private static graphOption: any = {
    container: document.getElementById('x6-container')!,
    background: defaultCanvasAttrs.bg,
    grid: {
      visible: true,
      type: defaultCanvasAttrs.grid.type,
      size: defaultCanvasAttrs.grid.size,
      args: [
        {
          color: defaultCanvasAttrs.grid.color,
          thickness: defaultCanvasAttrs.grid.thickness
        }
      ]
    },
    autoResize: true,
    panning: true,
    mousewheel: {
      enabled: true,
      modifiers: 'ctrl',
      minScale: 0.5,
      maxScale: 2
    },
    selecting: {
      enabled: true,
      modifiers: 'shift',
      rubberband: true,
      showNodeSelectionBox: true
    },
    highlighting: {
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          attrs: {
            fill: '#5F95FF',
            stroke: '#5F95FF'
          }
        }
      }
    },
    connecting: {
      allowBlank: false,
      allowLoop: false,
      allowEdge: false,
      allowMulti: false,
      highlight: true,
      snap: true,
      anchor: 'midSide',
      router: 'normal',
      connector: 'smooth',
      connectionPoint: 'anchor',
      createEdge() {
        return new Shape.Edge({
          id: String(Math.round((new Date().getTime() - 1704067200000)/1000)),
          attrs: {
            line: {
              stroke: '#a9a9a9',
              strokeWidth: 1,
              strokeDasharray: '5 5'
            }
          },
          zIndex: 0
        })
      },
      validateConnection({sourceMagnet, targetMagnet}) {
        if (sourceMagnet == targetMagnet) {
          return false
        }
        return true
      }
    }
  };

  /*
   * initilize graph
   */
  public static init(canvasAttr: any, container: any, nodeSelEvent: Function) {
    if(container instanceof String){
      this.graphOption.container = document.getElementById(container)!;
    } else {
      this.graphOption.container = container;
    }
    
    if(canvasAttr){
      // canvas size
      if(canvasAttr.height){
        this.graphOption.height = canvasAttr.height;
      }
      if(canvasAttr.width){
        this.graphOption.width = canvasAttr.width;
      }

      // graph background
      this.graphOption.background = {...defaultCanvasAttrs.bg, ...canvasAttr.bg};

      // graph grid
      const gridAttributes = {...defaultCanvasAttrs.grid, ...canvasAttr.grid};
      this.graphOption.grid = {
        visible: true,
            size: gridAttributes.size,
            type: gridAttributes.type,
            args: [
          {
            color: gridAttributes.color,
            thickness: gridAttributes.thickness
          }
        ]
      };
    }
    
    // new graph
    this.graph = new Graph(this.graphOption);
    this.graph.use(new Snapline());
    this.graph.use(new Selection({rubberband: true, modifiers: 'shift'}));
    this.graph.use(new Clipboard());
    this.graph.use(new History());
    this.graph.use(new Keyboard({enabled: true, global: true}));
    this.dnd = new Dnd({target: this.graph});
    this.registerComponent();
    this.initEvent(this.graph, this.graphOption.container, nodeSelEvent);
    return this;
  }

  /*
   * layout graph
   */
  public static layout(dir: string) {
    // get data from current graph
    const flowJson = this.graph.toJSON();
    let flowData = {nodes: [], edges: []};
    for(const cell of flowJson.cells){
      if(cell.source && cell.target){
        flowData.edges.push(cell);
      } else {
        flowData.nodes.push(cell);
      }
    }

    // layout data
    if(dir == "LR"){
      const dagreLayout = new DagreLayout({type: 'dagre', rankdir: dir, ranksep: 40, nodesep: 20});
      const model = dagreLayout.layout(flowData);
      this.graph.fromJSON(model);
    } else {
      const dagreLayout = new DagreLayout({type: 'dagre', rankdir: dir, ranksep: 30, nodesep: 20});
      const model = dagreLayout.layout(flowData);
      this.graph.fromJSON(model);
    }
    
    this.graph.centerContent();
    this.graph.zoomToFit({padding: {left: 50,right: 50, top: 50, bottom: 50}});
  }


  /*
   * layout graph
   */
  public static updateCanvas(key: string, options: any) {
    // get data from current graph
    if(key == 'bg'){
      const opt = {...defaultCanvasAttrs.bg, ...options};
      this.graph.drawBackground(opt);
    } else if(key == 'edge'){
      const opt = {...defaultCanvasAttrs.edge, ...options};
      for(const edge of this.graph.getEdges()){
        edge.attr('line/stroke', opt.color);
        if(opt.router == 'straight'){
          edge.setRouter({name: 'normal'});
          edge.setConnector({name: 'normal'});
        } else if(opt.router == 'smooth'){
          edge.setRouter({name: 'normal'});
          edge.setConnector({name: 'smooth'});
        } else if(opt.router == 'metro'){
          edge.setRouter({name: 'metro'});
          edge.setConnector({name: 'rounded'});
        }
      }
    } else {
      const opt = {...defaultCanvasAttrs.grid, ...options};
      if(!opt.type || opt.type == ''){
        this.graph.hideGrid();
      } else {
        this.graph.setGridSize(opt.size);
        const attr = {
          type: opt.type,
          args: [{color: opt.color, thickness: opt.thickness}]
        };
        this.graph.drawGrid(attr);
        this.graph.showGrid();
      }
    }
  }


  /*
   * show/hide ports
   */
  private static showPorts(ports: NodeListOf<SVGAElement>, show: boolean) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden';
    }
  }

  /*
   * initilize events of graph/mouse
   */
  private static registerComponent() {
    register({shape: 'ExeNode', width: 180, height: 60, component: ExeNode, ports: nodePortCfg});
    register({shape: 'ChartNode', width: 180, height: 120, component: ChartNode, ports: nodePortCfg});
  }

  /*
   * initilize events of graph/mouse
   */
  private static initEvent(graph: any, container: any, nodeSelEvent: Function) {
    // show ports when mouse enter into node
    graph.on('node:added', ({ node }) => {
      if(node.id.length > 12){
        // base date(1704067200000) is 01/01/2024 00:00:00 UTC
        const tsId: number = Math.round((new Date().getTime() - 1704067200000)/1000);
        this.graph.updateCellId(node, String(tsId));
      }
    });

    // show ports when mouse enter into node
    graph.on('node:mouseenter', ({ node }) => {
      const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>;
      this.showPorts(ports, true);
    });

    // hide ports when mouse out of node
    graph.on('node:mouseleave', ({ node }) => {
      const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>;
      this.showPorts(ports, false);
    });

    // get attr of node
    graph.on('node:selected', ({ node }) => {
      nodeSelEvent(node);
    });

    // highlight edge when it is selected
    graph.on('edge:selected', ({ edge }) => {
      edge.attr('line/stroke', '#1890ff');
      edge.attr('line/strokeDasharray', 5);
      edge.attr('line/style', {animation: 'ant-line 30s infinite linear'});
      insertCss(`
        @keyframes ant-line {
          to {
              stroke-dashoffset: -1000
          }
        }
      `);
    });

    // remove highlighting from edge when it is unselected
    graph.on('edge:unselected', ({ edge }) => {
      edge.attr('line/stroke', '#a9a9a9');
      edge.attr('line/strokeDasharray', undefined);
      edge.attr('line/style', undefined);
    });

    // change dashed line to solid line when edge is connected
    graph.on('edge:connected', ({ edge }) => {
      // change dashed line to solid
      edge.attr('line/strokeDasharray', undefined);
      // chagne fixed port to free port (remove port attr from source and target)
      edge.prop('source', {cell: edge.getProp('source').cell});
      edge.prop('target', {cell: edge.getProp('target').cell});
    });

    // copy
    graph.bindKey('ctrl+c', () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.copy(cells);
      }
    });

    // past
    graph.bindKey('ctrl+v', () => {
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 })
        graph.cleanSelection();
        graph.select(cells);
      }
    });

    // cut
    graph.bindKey('ctrl+x', () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.cut(cells);
      }
    });

    // delete
    graph.bindKey(['backspace', 'delete'], () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.removeCells(cells);
      }
    });

    // undo
    graph.bindKey('ctrl+z', () => {
      if (graph.canUndo()) {
        graph.undo()
      }
    });
  }
}
