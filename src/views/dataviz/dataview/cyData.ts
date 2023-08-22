import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { cloneDeep } from 'lodash-es';
import { getAwesomeSvgIcon } from '/@/views/dataviz/dataview/cyFunc';
const { t } = useI18n();

export const cyLayoutLib = [
  {
    alias: 'Grid',
    name: 'grid',
    options: {
      fit: true,
      avoidOverlap: true,
      animate: true,
    },
  },
  {
    alias: 'Circle',
    name: 'circle',
    options: {
      fit: true,
      avoidOverlap: true,
      animate: true,
    },
  },
  {
    alias: 'Concentric',
    name: 'concentric',
    options: {
      fit: true,
      avoidOverlap: true,
      animate: true,
    },
  },
  {
    alias: 'Breadthfirst',
    name: 'breadthfirst',
    options: {
      directed: false,
      avoidOverlap: true,
    },
  },
  {
    alias: 'Fcose',
    name: 'fcose',
    options: {
      fit: true,
      animate: true,
    },
  },
  {
    alias: 'Cise',
    name: 'cise',
    options: {
      fit: true,
      animate: true,
    },
  },
  {
    alias: 'Cola',
    name: 'cola',
    options: {
      fit: true,
      avoidOverlap: true,
      animate: true,
    },
  },
  {
    alias: 'Spread',
    name: 'spread',
    options: {
      fit: true,
      animate: true,
    },
  },
  {
    alias: 'Dagre',
    name: 'dagre',
    options: {
      fit: true,
      animate: true,
    },
  },
  {
    alias: 'Klay',
    name: 'klay',
    options: {
      fit: true,
      animate: true,
      klay: {
        direction: 'DOWN',
        edgeRouting: 'POLYLINE',
        fixedAlignment: 'BALANCED',
        nodeLayering: 'NETWORK_SIMPLEX',
        nodePlacement: 'SIMPLE',
        edgeSpacingFactor: 0.5,
        inLayerSpacingFactor: 1,
        spacing: 20,
      },
    },
  },
  {
    alias: 'Layered',
    name: 'elk',
    options: {
      fit: true,
      animate: true,
      elk: {
        algorithm: 'layered',
        edgeRouting: 'ORTHOGONAL',
        hierarchyHandling: 'INHERIT',
        'layering.strategy': 'NETWORK_SIMPLEX',
        'nodePlacement.strategy': 'SIMPLE',
        aspectRatio: 1.6,
        nodeNode: 20,
        nodeNodeBetweenLayers: 20,
      },
    },
  },
  {
    alias: 'Mrtree',
    name: 'elk',
    options: {
      fit: true,
      animate: true,
      elk: {
        algorithm: 'mrtree',
        edgeRoutingMode: 'AVOID_OVERLAP',
        aspectRatio: 0,
        nodeNode: 20,
      },
    },
  },
  {
    alias: 'Radial',
    name: 'elk',
    options: {
      fit: true,
      animate: true,
      elk: {
        algorithm: 'radial',
        compactor: 'NONE',
        wedgeCriteria: 'NODE_SIZE',
        optimizationCriteria: 'NONE',
        radius: 0,
      },
    },
  },
  {
    alias: 'DoubleTree',
    name: 'DoubleTree',
    gojs: true,
    options: {
      widget: 'gojs',
      balance: true,
      dirField: '',
    },
  },
  {
    alias: 'Spiral',
    name: 'Spiral',
    gojs: true,
    options: {
      widget: 'gojs',
    },
  },
  {
    alias: 'Fishbone',
    name: 'Fishbone',
    gojs: true,
    options: {
      widget: 'gojs',
    },
  },
];

// custom toolkit
export const formCustomToolkit: FormSchema[] = [
  {
    field: 'fullscreen',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.cy.toolkit.fullscreen'),
    colProps: { span: 24 },
  },
  {
    field: 'export',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.cy.toolkit.export'),
    colProps: { span: 24 },
  },
  {
    field: 'open',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.cy.toolkit.open'),
    colProps: { span: 24 },
  },
  {
    field: 'lasso',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.cy.toolkit.lasso'),
    colProps: { span: 24 },
  },
  {
    field: 'search',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.cy.toolkit.search'),
    colProps: { span: 24 },
  },
];

// custom node icon
export const formCustomNodeIcon: FormSchema[] = [
  {
    field: 'shape',
    component: 'Input',
    label: t('dataviz.dataview.form.custom.cy.node.icon.shape'),
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Awesome icon',
    },
  },
  {
    field: 'shapeField',
    component: 'Input',
    label: t('dataviz.dataview.form.custom.cy.node.icon.shapeField'),
    colProps: { span: 24 },
    slot: 'shapeField',
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
    label: t('dataviz.dataview.form.custom.cy.node.icon.color'),
    slot: 'iconColor',
    colProps: { span: 24 },
  },
  {
    field: 'colorField',
    label: t('dataviz.dataview.form.custom.cy.node.icon.colorField'),
    component: 'Input',
    colProps: { span: 24 },
    slot: 'colorField',
  },
  {
    field: 'colorMap',
    label: '',
    component: 'Input',
    slot: 'colorMap',
    colProps: { span: 24 },
  },
  {
    field: 'labelField',
    component: 'Input',
    label: t('dataviz.dataview.form.custom.cy.node.labelField'),
    colProps: { span: 24 },
    slot: 'labelField',
  },
  {
    field: 'labelSize',
    component: 'InputNumber',
    defaultValue: 6,
    label: t('dataviz.dataview.form.custom.cy.node.labelSize'),
    colProps: { span: 20 },
    componentProps: {
      min: 0,
      max: 20,
    },
  },
  {
    field: 'labelColor',
    component: 'Input',
    label: '',
    colProps: { span: 4 },
    slot: 'labelColor',
  },
  {
    field: 'tooltip',
    component: 'InputTextArea',
    label: t('dataviz.dataview.form.custom.cy.node.tooltip'),
    colProps: { span: 24 },
    componentProps: {
      maxlength: 128,
      autoSize: { minRows: 2, maxRows: 4 },
    },
  },
];

// custom node body
export const formCustomNodeBody: FormSchema[] = [
  {
    field: 'shape',
    component: 'Select',
    label: t('dataviz.dataview.form.custom.cy.node.body.shape'),
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Body Shape',
      options: [
        {
          label: 'Circle',
          value: 'ellipse',
        },
        {
          label: 'Triangle',
          value: 'triangle',
        },
        {
          label: 'Rectangle',
          value: 'rectangle',
        },
        {
          label: 'Barrel',
          value: 'barrel',
        },
        {
          label: 'Diamond',
          value: 'diamond',
        },
        {
          label: 'Star',
          value: 'star',
        },
        {
          label: 'Pentagon',
          value: 'pentagon',
        },
        {
          label: 'Hexagon',
          value: 'hexagon',
        },
        {
          label: 'Heptagon',
          value: 'heptagon',
        },
        {
          label: 'Octagon',
          value: 'octagon',
        },
        {
          label: 'Tag',
          value: 'tag',
        },
        {
          label: 'Vee',
          value: 'vee',
        },
      ],
    },
  },
  {
    field: 'shapeField',
    component: 'Select',
    label: t('dataviz.dataview.form.custom.cy.node.body.shapeField'),
    colProps: { span: 24 },
    slot: 'shapeField',
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
    label: t('dataviz.dataview.form.custom.cy.node.body.color'),
    slot: 'bodyColor',
    colProps: { span: 24 },
  },
  {
    field: 'colorField',
    label: t('dataviz.dataview.form.custom.cy.node.body.colorField'),
    component: 'Input',
    colProps: { span: 24 },
    slot: 'colorField',
  },
  {
    field: 'colorMap',
    label: '',
    component: 'Input',
    slot: 'colorMap',
    colProps: { span: 24 },
  },
  {
    field: 'sizeField',
    label: t('dataviz.dataview.form.custom.cy.node.sizeField'),
    component: 'Input',
    colProps: { span: 24 },
    slot: 'sizeField',
  },
  {
    field: 'sizeMap',
    label: '',
    component: 'Input',
    slot: 'sizeMap',
    colProps: { span: 24 },
  },
];

// custom edge line
export const formCustomEdgeLine: FormSchema[] = [
  {
    field: 'style',
    component: 'Select',
    label: t('dataviz.dataview.form.custom.cy.edge.style'),
    defaultValue: 'solid',
    colProps: { span: 24 },
    componentProps: {
      allowClear: false,
      options: [
        {
          label: 'Solid',
          value: 'solid',
        },
        {
          label: 'Dashed',
          value: 'dashed',
        },
        {
          label: 'Dotted',
          value: 'dotted',
        },
      ],
    },
  },
  {
    field: 'styleField',
    component: 'Input',
    label: t('dataviz.dataview.form.custom.cy.edge.styleField'),
    colProps: { span: 24 },
    slot: 'styleField',
  },
  {
    field: 'styleMap',
    label: '',
    component: 'Input',
    slot: 'styleMap',
    colProps: { span: 24 },
  },
  {
    field: 'color',
    component: 'Input',
    label: t('dataviz.dataview.form.custom.cy.edge.color'),
    slot: 'edgeColor',
    colProps: { span: 24 },
  },
  {
    field: 'colorField',
    label: t('dataviz.dataview.form.custom.cy.edge.colorField'),
    component: 'Input',
    colProps: { span: 24 },
    slot: 'colorField',
  },
  {
    field: 'colorMap',
    label: '',
    component: 'Input',
    slot: 'colorMap',
    colProps: { span: 24 },
  },
  {
    field: 'labelField',
    component: 'Input',
    label: t('dataviz.dataview.form.custom.cy.edge.labelField'),
    colProps: { span: 24 },
    slot: 'labelField',
  },
  {
    field: 'labelSize',
    component: 'InputNumber',
    label: t('dataviz.dataview.form.custom.cy.edge.labelSize'),
    colProps: { span: 20 },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'labelColor',
    component: 'Input',
    label: '',
    colProps: { span: 4 },
    slot: 'labelColor',
  },
];

// custom edge marker
export const formCustomEdgeMarker: FormSchema[] = [
  {
    field: 'width',
    component: 'InputNumber',
    defaultValue: 1,
    label: t('dataviz.dataview.form.custom.cy.edge.width'),
    colProps: { span: 24 },
    componentProps: {
      min: 1,
      max: 10,
    },
  },
  {
    field: 'widthField',
    component: 'Input',
    label: t('dataviz.dataview.form.custom.cy.edge.widthField'),
    colProps: { span: 24 },
    slot: 'widthField',
  },
  {
    field: 'widthMap',
    label: '',
    component: 'Input',
    slot: 'widthMap',
    colProps: { span: 24 },
  },
  {
    field: 'marker',
    component: 'Select',
    label: t('dataviz.dataview.form.custom.cy.edge.marker'),
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Edge marker',
      options: [
        {
          label: 'Triangle',
          value: 'triangle',
        },
        {
          label: 'Tee',
          value: 'tee',
        },
        {
          label: 'Square',
          value: 'square',
        },
        {
          label: 'Circle',
          value: 'circle',
        },
        {
          label: 'Diamond',
          value: 'diamond',
        },
        {
          label: 'Chevron',
          value: 'chevron',
        },
      ],
    },
  },
  {
    field: 'markerField',
    component: 'Input',
    label: t('dataviz.dataview.form.custom.cy.edge.markerField'),
    colProps: { span: 24 },
    slot: 'markerField',
  },
  {
    field: 'markerMap',
    label: '',
    component: 'Input',
    slot: 'markerMap',
    colProps: { span: 24 },
  },
  {
    field: 'type',
    component: 'Select',
    defaultValue: 'haystack',
    label: t('dataviz.dataview.form.custom.cy.edge.type'),
    colProps: { span: 24 },
    componentProps: {
      allowClear: false,
      options: [
        {
          label: 'Straight',
          value: 'straight',
        },
        {
          label: 'Haystack',
          value: 'haystack',
        },
        {
          label: 'Bezier',
          value: 'bezier',
        },
        {
          label: 'Unbundled Bezier',
          value: 'unbundled-bezier',
        },
        {
          label: 'Segments',
          value: 'segments',
        },
        {
          label: 'Taxi',
          value: 'taxi',
        },
      ],
    },
  },
  {
    field: 'tooltip',
    component: 'InputTextArea',
    label: t('dataviz.dataview.form.custom.cy.edge.tooltip'),
    colProps: { span: 24 },
    componentProps: {
      maxlength: 128,
      autoSize: { minRows: 2, maxRows: 4 },
    },
  },
];

// custom cluster
export const formCustomAux: FormSchema[] = [
  {
    field: 'animate',
    component: 'Switch',
    defaultValue: true,
    label: t('dataviz.dataview.form.custom.cy.aux.animate'),
    colProps: { span: 24 },
  },
  {
    field: 'collapse',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.cy.aux.collapse'),
    colProps: { span: 24 },
  },
  {
    field: 'cluster',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.cy.aux.cluster'),
    colProps: { span: 24 },
  },
  {
    field: 'cumsum',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.cy.aux.cumsum'),
    colProps: { span: 24 },
  },
  {
    field: 'highlight',
    component: 'Select',
    label: t('dataviz.dataview.form.custom.cy.aux.highlight'),
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'highlight algo',
      options: [
        {
          label: 'Neighbors',
          value: 'neighbors',
        },
        {
          label: 'Family Tree',
          value: 'family',
        },
      ],
    },
  },
  {
    field: 'panel',
    component: 'Select',
    label: t('dataviz.dataview.form.custom.cy.aux.panel'),
    colProps: { span: 24 },
    componentProps: {
      placeholder: 'Panel Type',
      options: [
        {
          label: 'Rank Nodes',
          value: 'rank',
        },
        {
          label: 'Node detail',
          value: 'single',
        },
      ],
    },
  },
  {
    field: 'rankField',
    component: 'Input',
    label: t('dataviz.dataview.form.custom.cy.aux.rankField'),
    colProps: { span: 18 },
    slot: 'rankField',
    ifShow: ({ values }) => values.panel == 'rank',
  },
  {
    field: 'rankOrder',
    component: 'Select',
    defaultValue: 'asc',
    label: '',
    colProps: { span: 6 },
    ifShow: ({ values }) => values.panel == 'rank',
    componentProps: {
      placeholder: 'Order',
      allowClear: false,
      options: [
        {
          label: 'Asc',
          value: 'asc',
        },
        {
          label: 'Desc',
          value: 'desc',
        },
      ],
    },
  },
  {
    field: 'nodeField',
    component: 'Select',
    label: t('dataviz.dataview.form.custom.cy.aux.nodeField'),
    colProps: { span: 24 },
    slot: 'nodeField',
    ifShow: ({ values }) => values.panel == 'single',
  },
];

// layout grid options
export const formLayoutGrid: FormSchema[] = [
  {
    field: 'nodeDimensionsIncludeLabels',
    label: t('dataviz.dataview.form.custom.cy.layout.grid.nodeDimensionsIncludeLabels'),
    component: 'Switch',
    colProps: { span: 24 },
  },
  {
    field: 'condense',
    label: t('dataviz.dataview.form.custom.cy.layout.grid.condense'),
    component: 'Switch',
    colProps: { span: 24 },
  },
  {
    field: 'spacingFactor',
    label: t('dataviz.dataview.form.custom.cy.layout.grid.spacingFactor'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'rows',
    label: t('dataviz.dataview.form.custom.cy.layout.grid.rows'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 1,
    },
  },
  {
    field: 'cols',
    label: t('dataviz.dataview.form.custom.cy.layout.grid.cols'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 1,
    },
  },
  {
    field: 'sort',
    label: t('dataviz.dataview.form.custom.cy.layout.grid.sort'),
    component: 'Input',
    colProps: { span: 24 },
  },
];

// layout circle options
export const formLayoutCircle: FormSchema[] = [
  {
    field: 'nodeDimensionsIncludeLabels',
    label: t('dataviz.dataview.form.custom.cy.layout.circle.nodeDimensionsIncludeLabels'),
    component: 'Switch',
    colProps: { span: 24 },
  },
  {
    field: 'clockwise',
    label: t('dataviz.dataview.form.custom.cy.layout.circle.clockwise'),
    component: 'Switch',
    colProps: { span: 24 },
  },
  {
    field: 'radius',
    label: t('dataviz.dataview.form.custom.cy.layout.circle.radius'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'spacingFactor',
    label: t('dataviz.dataview.form.custom.cy.layout.circle.spacingFactor'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'sort',
    label: t('dataviz.dataview.form.custom.cy.layout.circle.sort'),
    component: 'Input',
    colProps: { span: 24 },
  },
];

// layout concentric options
export const formLayoutConcentric: FormSchema[] = [
  {
    field: 'nodeDimensionsIncludeLabels',
    label: t('dataviz.dataview.form.custom.cy.layout.concentric.nodeDimensionsIncludeLabels'),
    component: 'Switch',
    colProps: { span: 24 },
  },
  {
    field: 'clockwise',
    label: t('dataviz.dataview.form.custom.cy.layout.concentric.clockwise'),
    component: 'Switch',
    colProps: { span: 24 },
  },
  {
    field: 'equidistant',
    label: t('dataviz.dataview.form.custom.cy.layout.concentric.equidistant'),
    component: 'Switch',
    colProps: { span: 24 },
  },
  {
    field: 'spacingFactor',
    label: t('dataviz.dataview.form.custom.cy.layout.concentric.spacingFactor'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'levelWidth',
    label: t('dataviz.dataview.form.custom.cy.layout.concentric.levelWidth'),
    component: 'Input',
    colProps: { span: 24 },
  },
];

// layout Breadthfirst options
export const formLayoutBreadthfirst: FormSchema[] = [
  {
    field: 'nodeDimensionsIncludeLabels',
    label: t('dataviz.dataview.form.custom.cy.layout.breadthfirst.nodeDimensionsIncludeLabels'),
    component: 'Switch',
    colProps: { span: 24 },
  },
  {
    field: 'circle',
    label: t('dataviz.dataview.form.custom.cy.layout.breadthfirst.circle'),
    component: 'Switch',
    colProps: { span: 24 },
  },
  {
    field: 'grid',
    label: t('dataviz.dataview.form.custom.cy.layout.breadthfirst.grid'),
    component: 'Switch',
    colProps: { span: 24 },
  },
  {
    field: 'spacingFactor',
    label: t('dataviz.dataview.form.custom.cy.layout.breadthfirst.spacingFactor'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'roots',
    label: t('dataviz.dataview.form.custom.cy.layout.breadthfirst.roots'),
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'depthSort',
    label: t('dataviz.dataview.form.custom.cy.layout.breadthfirst.depthSort'),
    component: 'Input',
    colProps: { span: 24 },
  },
];

// layout fcose options
export const formLayoutFcose: FormSchema[] = [
  {
    field: 'nodeDimensionsIncludeLabels',
    label: t('dataviz.dataview.form.custom.cy.layout.fcose.nodeDimensionsIncludeLabels'),
    component: 'Switch',
    colProps: { span: 24 },
  },
  {
    field: 'step',
    label: t('dataviz.dataview.form.custom.cy.layout.fcose.step'),
    component: 'Select',
    colProps: { span: 24 },
    componentProps: {
      options: [
        {
          label: 'All',
          value: 'all',
        },
        {
          label: 'Transformed',
          value: 'transformed',
        },
        {
          label: 'Enforced',
          value: 'enforced',
        },
        {
          label: 'Cose',
          value: 'cose',
        },
      ],
    },
  },
  {
    field: 'nestingFactor',
    label: t('dataviz.dataview.form.custom.cy.layout.fcose.nestingFactor'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'gravity',
    label: t('dataviz.dataview.form.custom.cy.layout.fcose.gravity'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'gravityRange',
    label: t('dataviz.dataview.form.custom.cy.layout.fcose.gravityRange'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
];

// layout cise options
export const formLayoutCise: FormSchema[] = [
  {
    field: 'idealInterClusterEdgeLengthCoefficient',
    label: t('dataviz.dataview.form.custom.cy.layout.cise.idealInterClusterEdgeLengthCoefficient'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'springCoeff',
    label: t('dataviz.dataview.form.custom.cy.layout.cise.springCoeff'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'nodeRepulsion',
    label: t('dataviz.dataview.form.custom.cy.layout.cise.nodeRepulsion'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'gravity',
    label: t('dataviz.dataview.form.custom.cy.layout.cise.gravity'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'gravityRange',
    label: t('dataviz.dataview.form.custom.cy.layout.cise.gravityRange'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
];

// layout d3-force options
export const formLayoutD3Force: FormSchema[] = [
  {
    field: 'collideRadius',
    label: t('dataviz.dataview.form.custom.cy.layout.d3force.collideRadius'),
    component: 'Switch',
    colProps: { span: 24 },
  },
  {
    field: 'collideStrength',
    label: t('dataviz.dataview.form.custom.cy.layout.d3force.collideStrength'),
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'linkDistance',
    label: t('dataviz.dataview.form.custom.cy.layout.d3force.linkDistance'),
    component: 'Select',
    colProps: { span: 24 },
    componentProps: {
      options: [
        {
          label: 'Connected Nodes',
          value: 'connected nodes',
        },
        {
          label: 'Related Family',
          value: 'related family',
        },
      ],
    },
  },
  {
    field: 'manyBodyStrength',
    label: t('dataviz.dataview.form.custom.cy.layout.d3force.manyBodyStrength'),
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'xStrength',
    label: t('dataviz.dataview.form.custom.cy.layout.d3force.xStrength'),
    component: 'InputNumber',
    colProps: { span: 24 },
  },
  {
    field: 'yStrength',
    label: t('dataviz.dataview.form.custom.cy.layout.d3force.yStrength'),
    component: 'InputNumber',
    colProps: { span: 24 },
  },
  {
    field: 'radialStrength',
    label: t('dataviz.dataview.form.custom.cy.layout.d3force.radialStrength'),
    component: 'InputNumber',
    colProps: { span: 24 },
  },
  {
    field: 'radialRadius',
    label: t('dataviz.dataview.form.custom.cy.layout.d3force.radialRadius'),
    component: 'InputNumber',
    colProps: { span: 24 },
  },
];

// layout cola options
export const formLayoutCola: FormSchema[] = [
  {
    field: 'nodeDimensionsIncludeLabels',
    label: t('dataviz.dataview.form.custom.cy.layout.cola.nodeDimensionsIncludeLabels'),
    component: 'Switch',
    colProps: { span: 24 },
  },
  {
    field: 'flow',
    label: t('dataviz.dataview.form.custom.cy.layout.cola.flow'),
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'alignment',
    label: t('dataviz.dataview.form.custom.cy.layout.cola.alignment'),
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'edgeLength',
    label: t('dataviz.dataview.form.custom.cy.layout.cola.edgeLength'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'edgeSymDiffLength',
    label: t('dataviz.dataview.form.custom.cy.layout.cola.edgeSymDiffLength'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'edgeJaccardLength',
    label: t('dataviz.dataview.form.custom.cy.layout.cola.edgeJaccardLength'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
];

// layout spread options
export const formLayoutSpread: FormSchema[] = [
  {
    field: 'minDist',
    label: t('dataviz.dataview.form.custom.cy.layout.spread.minDist'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'expandingFactor',
    label: t('dataviz.dataview.form.custom.cy.layout.spread.expandingFactor'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
];

// layout dagre options
export const formLayoutDagre: FormSchema[] = [
  {
    field: 'nodeDimensionsIncludeLabels',
    label: t('dataviz.dataview.form.custom.cy.layout.dagre.nodeDimensionsIncludeLabels'),
    component: 'Switch',
    colProps: { span: 24 },
  },
  {
    field: 'rankSep',
    label: t('dataviz.dataview.form.custom.cy.layout.dagre.rankSep'),
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'rankDir',
    label: t('dataviz.dataview.form.custom.cy.layout.dagre.rankDir'),
    component: 'Select',
    colProps: { span: 24 },
    componentProps: {
      options: [
        {
          label: 'Top to Bottom',
          value: 'TB',
        },
        {
          label: 'Left to Right',
          value: 'LR',
        },
      ],
    },
  },
  {
    field: 'align',
    label: t('dataviz.dataview.form.custom.cy.layout.dagre.align'),
    component: 'Select',
    colProps: { span: 24 },
    componentProps: {
      options: [
        {
          label: 'Top Left',
          value: 'UL',
        },
        {
          label: 'Top Right',
          value: 'UR',
        },
        {
          label: 'Bottom Left',
          value: 'DL',
        },
        {
          label: 'Bottom Right',
          value: 'DR',
        },
      ],
    },
  },
  {
    field: 'ranker',
    label: t('dataviz.dataview.form.custom.cy.layout.dagre.ranker'),
    component: 'Select',
    colProps: { span: 24 },
    componentProps: {
      options: [
        {
          label: 'Simplex',
          value: 'network-simplex',
        },
        {
          label: 'Tight tree',
          value: 'tight-tree',
        },
        {
          label: 'Longest path',
          value: 'longest-path',
        },
      ],
    },
  },
  {
    field: 'spacingFactor',
    label: t('dataviz.dataview.form.custom.cy.layout.dagre.spacingFactor'),
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
];

// layout Klay options
export const formLayoutKlay: FormSchema[] = [
  {
    field: 'layoutHierarchy',
    label: t('dataviz.dataview.form.custom.cy.layout.klay.layoutHierarchy'),
    component: 'Switch',
    colProps: { span: 24 },
  },
  {
    field: 'compactComponents',
    label: t('dataviz.dataview.form.custom.cy.layout.klay.compactComponents'),
    component: 'Switch',
    colProps: { span: 24 },
  },
  {
    field: 'separateConnectedComponents',
    label: t('dataviz.dataview.form.custom.cy.layout.klay.separateConnectedComponents'),
    component: 'Switch',
    colProps: { span: 24 },
  },
  {
    field: 'direction',
    label: t('dataviz.dataview.form.custom.cy.layout.klay.direction'),
    component: 'Select',
    defaultValue: 'DOWN',
    colProps: { span: 24 },
    componentProps: {
      allowClear: false,
      options: [
        {
          label: 'Undefined',
          value: 'UNDEFINED',
        },
        {
          label: 'Top to Bottom',
          value: 'DOWN',
        },
        {
          label: 'Bottom to Top',
          value: 'UP',
        },
        {
          label: 'Left to Right',
          value: 'RIGHT',
        },
        {
          label: 'Right to Left',
          value: 'LEFT',
        },
      ],
    },
  },
  {
    field: 'edgeRouting',
    label: t('dataviz.dataview.form.custom.cy.layout.klay.edgeRouting'),
    component: 'Select',
    defaultValue: 'POLYLINE',
    colProps: { span: 24 },
    componentProps: {
      allowClear: false,
      options: [
        {
          label: 'Orthogonal',
          value: 'ORTHOGONAL',
        },
        {
          label: 'Polyline',
          value: 'POLYLINE',
        },
        {
          label: 'Splines',
          value: 'SPLINES',
        },
      ],
    },
  },
  {
    field: 'fixedAlignment',
    label: t('dataviz.dataview.form.custom.cy.layout.klay.fixedAlignment'),
    component: 'Select',
    defaultValue: 'BALANCED',
    colProps: { span: 24 },
    componentProps: {
      allowClear: false,
      options: [
        {
          label: 'None',
          value: 'NONE',
        },
        {
          label: 'Top Left',
          value: 'LEFTUP',
        },
        {
          label: 'Top Right',
          value: 'RIGHTUP',
        },
        {
          label: 'Bottom Left',
          value: 'LEFTDOWN',
        },
        {
          label: 'Bottom Right',
          value: 'RIGHTDOWN',
        },
        {
          label: 'Balanced',
          value: 'BALANCED',
        },
      ],
    },
  },

  {
    field: 'nodeLayering',
    label: t('dataviz.dataview.form.custom.cy.layout.klay.nodeLayering'),
    component: 'Select',
    defaultValue: 'NETWORK_SIMPLEX',
    colProps: { span: 24 },
    componentProps: {
      allowClear: false,
      options: [
        {
          label: 'Simplex',
          value: 'NETWORK_SIMPLEX',
        },
        {
          label: 'Longest Path',
          value: 'LONGEST_PATH',
        },
        {
          label: 'Interactive',
          value: 'INTERACTIVE',
        },
      ],
    },
  },
  {
    field: 'nodePlacement',
    label: t('dataviz.dataview.form.custom.cy.layout.klay.nodePlacement'),
    component: 'Select',
    defaultValue: 'SIMPLE',
    colProps: { span: 24 },
    componentProps: {
      allowClear: false,
      options: [
        {
          label: 'Brandes Koepf',
          value: 'BRANDES_KOEPF',
        },
        {
          label: 'Linear Segments',
          value: 'LINEAR_SEGMENTS',
        },
        {
          label: 'Interactive',
          value: 'INTERACTIVE',
        },
        {
          label: 'Simple',
          value: 'SIMPLE',
        },
      ],
    },
  },
  {
    field: 'edgeSpacingFactor',
    label: t('dataviz.dataview.form.custom.cy.layout.klay.edgeSpacingFactor'),
    component: 'InputNumber',
    defaultValue: 0.5,
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'inLayerSpacingFactor',
    label: t('dataviz.dataview.form.custom.cy.layout.klay.inLayerSpacingFactor'),
    component: 'InputNumber',
    defaultValue: 1,
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'spacing',
    label: t('dataviz.dataview.form.custom.cy.layout.klay.spacing'),
    component: 'InputNumber',
    defaultValue: 20,
    colProps: { span: 24 },
    componentProps: {
      min: 1,
    },
  },
];

// layout ELK layered options
export const formLayoutElkLayered: FormSchema[] = [
  {
    field: 'edgeRouting',
    label: t('dataviz.dataview.form.custom.cy.layout.klay.edgeRouting'),
    component: 'Select',
    defaultValue: 'ORTHOGONAL',
    colProps: { span: 24 },
    componentProps: {
      allowClear: false,
      options: [
        {
          label: 'Orthogonal',
          value: 'ORTHOGONAL',
        },
        {
          label: 'Polyline',
          value: 'POLYLINE',
        },
        {
          label: 'Splines',
          value: 'SPLINES',
        },
      ],
    },
  },
  {
    field: 'hierarchyHandling',
    label: t('dataviz.dataview.form.custom.cy.layout.elk.hierarchyHandling'),
    defaultValue: 'INHERIT',
    component: 'Select',
    colProps: { span: 24 },
    componentProps: {
      allowClear: false,
      options: [
        {
          label: 'Inherit',
          value: 'INHERIT',
        },
        {
          label: 'Include Children',
          value: 'INCLUDE_CHILDREN',
        },
        {
          label: 'Separate Children',
          value: 'SEPARATE_CHILDREN',
        },
      ],
    },
  },
  {
    field: 'layering.strategy',
    label: t('dataviz.dataview.form.custom.cy.layout.elk.layeringStrategy'),
    component: 'Select',
    defaultValue: 'NETWORK_SIMPLEX',
    colProps: { span: 24 },
    componentProps: {
      allowClear: false,
      options: [
        {
          label: 'Network Simplex',
          value: 'NETWORK_SIMPLEX',
        },
        {
          label: 'Longest Path',
          value: 'LONGEST_PATH',
        },
        {
          label: 'Stretch Width',
          value: 'STRETCH_WIDTH',
        },
        {
          label: 'Min Width',
          value: 'MIN_WIDTH',
        },
      ],
    },
  },
  {
    field: 'nodePlacement.strategy',
    label: t('dataviz.dataview.form.custom.cy.layout.elk.nodePlacementStrategy'),
    component: 'Select',
    defaultValue: 'SIMPLE',
    colProps: { span: 24 },
    componentProps: {
      allowClear: false,
      options: [
        {
          label: 'Simple',
          value: 'SIMPLE',
        },
        {
          label: 'Linear Segments',
          value: 'LINEAR_SEGMENTS',
        },
        {
          label: 'Brandes Koepf',
          value: 'BRANDES_KOEPF',
        },
        {
          label: 'Network Simplex',
          value: 'NETWORK_SIMPLEX',
        },
      ],
    },
  },
  {
    field: 'aspectRatio',
    label: t('dataviz.dataview.form.custom.cy.layout.elk.aspectRatio'),
    component: 'InputNumber',
    defaultValue: 1.6,
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'nodeNode',
    label: t('dataviz.dataview.form.custom.cy.layout.elk.nodeNode'),
    component: 'InputNumber',
    defaultValue: 20,
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'nodeNodeBetweenLayers',
    label: t('dataviz.dataview.form.custom.cy.layout.elk.nodeNodeBetweenLayers'),
    defaultValue: 20,
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
];

// layout ELK mrtree options
export const formLayoutElkMrtree: FormSchema[] = [
  {
    field: 'edgeRoutingMode',
    label: t('dataviz.dataview.form.custom.cy.layout.elk.edgeRoutingMode'),
    component: 'Select',
    defaultValue: 'AVOID_OVERLAP',
    colProps: { span: 24 },
    componentProps: {
      allowClear: false,
      options: [
        {
          label: 'None',
          value: 'NONE',
        },
        {
          label: 'Middle to Middle',
          value: 'MIDDLE_TO_MIDDLE',
        },
        {
          label: 'Avoid Overlap',
          value: 'AVOID_OVERLAP',
        },
      ],
    },
  },
  {
    field: 'aspectRatio',
    label: t('dataviz.dataview.form.custom.cy.layout.elk.aspectRatio'),
    component: 'InputNumber',
    defaultValue: 1.6,
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'nodeNode',
    label: t('dataviz.dataview.form.custom.cy.layout.elk.nodeNode'),
    component: 'InputNumber',
    defaultValue: 20,
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
];

// layout ELK radial options
export const formLayoutElkRadial: FormSchema[] = [
  {
    field: 'compactor',
    label: t('dataviz.dataview.form.custom.cy.layout.elk.compactor'),
    defaultValue: 'NONE',
    component: 'Select',
    colProps: { span: 24 },
    componentProps: {
      allowClear: false,
      options: [
        {
          label: 'None',
          value: 'NONE',
        },
        {
          label: 'Radial Compaction',
          value: 'RADIAL_COMPACTION',
        },
        {
          label: 'Wedge Compaction',
          value: 'WEDGE_COMPACTION',
        },
      ],
    },
  },
  {
    field: 'wedgeCriteria',
    label: t('dataviz.dataview.form.custom.cy.layout.elk.wedgeCriteria'),
    component: 'Select',
    defaultValue: 'NODE_SIZE',
    colProps: { span: 24 },
    componentProps: {
      allowClear: false,
      options: [
        {
          label: 'Node Size',
          value: 'NODE_SIZE',
        },
        {
          label: 'Leaf Number',
          value: 'LEAF_NUMBER',
        },
      ],
    },
  },
  {
    field: 'optimizationCriteria',
    label: t('dataviz.dataview.form.custom.cy.layout.elk.optimizationCriteria'),
    component: 'Select',
    defaultValue: 'NONE',
    colProps: { span: 24 },
    componentProps: {
      allowClear: false,
      options: [
        {
          label: 'None',
          value: 'NONE',
        },
        {
          label: 'Edge Length',
          value: 'EDGE_LENGTH',
        },
      ],
    },
  },
  {
    field: 'radius',
    label: t('dataviz.dataview.form.custom.cy.layout.elk.radius'),
    defaultValue: 0,
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
    },
  },
];

// layout Double Tree options
export const formLayoutDoubleTree: FormSchema[] = [
  {
    field: 'balance',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.cy.layout.doubletree.balance'),
    colProps: { span: 24 },
  },
  {
    field: 'dirField',
    label: t('dataviz.dataview.form.custom.cy.layout.doubletree.dirField'),
    component: 'Input',
    colProps: { span: 24 },
  },
];

// layout Double Tree options
export const formLayoutSpiral: FormSchema[] = [
  {
    field: 'balance',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.cy.layout.doubletree.balance'),
    colProps: { span: 24 },
  },
  {
    field: 'dirField',
    label: t('dataviz.dataview.form.custom.cy.layout.doubletree.dirField'),
    component: 'Input',
    colProps: { span: 24 },
  },
];

// layout Double Tree options
export const formLayoutFishbone: FormSchema[] = [
  {
    field: 'balance',
    component: 'Switch',
    label: t('dataviz.dataview.form.custom.cy.layout.doubletree.balance'),
    colProps: { span: 24 },
  },
  {
    field: 'dirField',
    label: t('dataviz.dataview.form.custom.cy.layout.doubletree.dirField'),
    component: 'Input',
    colProps: { span: 24 },
  },
];

export const initCyLayout = cloneDeep(cyLayoutLib);

export const initToolkit = {
  fullscreen: true,
  search: undefined,
  open: undefined,
  panel: undefined,
  export: undefined,
  player: undefined,
};

export const initNode = {
  icon: {
    icon: undefined,
    iconField: undefined,
    iconMap: undefined,
    color: undefined,
    colorField: undefined,
    colorMap: undefined,
    labelSize: 6,
    labelColor: '#cccccc',
  },
  body: {
    shape: 'ellipse',
    shapeField: undefined,
    shapeMap: undefined,
    color: '#cccccc',
    colorField: undefined,
    colorMap: undefined,
    sizeField: undefined,
    sizeMap: undefined,
  },
};

export const initEdge = {
  line: {
    style: 'solid',
    styleField: undefined,
    styleMap: undefined,
    color: '#cccccc',
    colorField: undefined,
    colorMap: undefined,
    labelField: undefined,
    labelSize: 8,
    labelColor: '#000000',
  },
  marker: {
    width: 1,
    widthField: undefined,
    widthMap: undefined,
    marker: undefined,
    markerField: undefined,
    markerMap: undefined,
    type: 'haystack',
    tooltip: undefined,
  },
};

export const initAux = {
  animation: true,
  collapse: undefined,
  cluster: undefined,
  compound: undefined,
  cumsum: undefined,
  colorMap: undefined,
};

export const initTreeNetCfg = {
  chartType: 'Tree',
  config: {
    nameField: [],
    toolkit: {
      fullscreen: true,
      export: true,
    },
    layout: [],
    node: {
      icon: {
        shapeField: undefined,
        shapeMap: [],
        color: '#20B2AA',
        colorField: undefined,
        colorMap: [],
        labelField: undefined,
        tooltip: undefined,
      },
      body: {
        shape: 'ellipse',
        color: '#cccccc',
      },
    },
    edge: {
      line: {
        style: 'solid',
        color: '#cccccc',
      },
      marker: {
        width: 1,
        type: 'haystack',
        tooltip: undefined,
      },
    },
    aux: {
      animation: true,
      collapse: false,
      cluster: false,
      compound: false,
      cumsum: false,
      highlight: 'neighbors',
    },
  },
};


export const initStarNetCfg = {
  chartType: 'Star',
  config: {
    nameField: [],
    toolkit: {
      fullscreen: true,
      export: true,
    },
    layout: [],
    node: {
      icon: {
        tooltip: undefined,
      },
      body: {
        shapeField: undefined,
        shapeMap: [],
        color: '#20B2AA',
        colorField: undefined,
        colorMap: [],
      },
    },
    edge: {
      line: {
        style: 'solid',
        color: 'gray',
      },
      marker: {
        width: 1,
        type: 'haystack',
        tooltip: undefined,
      },
    },
    aux: {
      animation: true,
      collapse: false,
      cluster: false,
      compound: false,
      cumsum: false,
      highlight: undefined,
    },
  },
};

export const initNestNetCfg = {
  chartType: 'Nest',
  config: {
    nameField: [],
    toolkit: {
      fullscreen: true,
      export: true,
    },
    layout: [],
    node: {
      icon: {
        tooltip: undefined,
      },
      body: {
        shape: 'ellipse',
        color: '#20B2AA',
        colorField: undefined,
        colorMap: [],
      },
    },
    edge: {
      line: {
        style: 'solid',
        color: 'gray',
      },
      marker: {
        width: 1,
        type: 'haystack',
        tooltip: undefined,
      },
    },
    aux: {
      animation: true,
      collapse: false,
      cluster: false,
      compound: false,
      cumsum: false,
      highlight: undefined,
    },
  },
};

export const defaultMarkerShapes: string[] = [
  'circle',
  'square',
  'star',
  'heart',
  'tree',
  'diamond',
  'bolt',
  'sun',
  'bullseye',
  'certificate',
  'crosshairs',
  'paw',
];

export const defaultNodeBody: string[] = [
  'ellipse',
  'triangle',
  'rectangle',
  'barrel',
  'diamond',
  'star',
  'pentagon',
  'hexagon',
  'heptagon',
  'octagon',
  'tag',
  'vee',
];

export const nodeBodyMap: any = {
  ellipse: 'circle',
  triangle: 'play',
  rectangle: 'square-full',
  barrel: 'square',
  diamond: 'diamond',
  star: 'star',
  pentagon: 'pentagon',
  hexagon: 'hexagon',
  heptagon: 'heptagon',
  octagon: 'octagon',
  tag: 'tag',
  vee: 'vee',
};

export const defaultNodeIcon: string[] = [
  'star',
  'heart',
  'bell',
  'bolt',
  'tree',
  'snowflake',
  'flag',
  'sun',
  'trophy',
  'crown',
  'bullseye',
  'dragon',
  'croshairs',
  'spa',
  'paw',
  'fan',
  'gem',
];

export const defaultCyStyle: any[] = [
  {
    selector: 'node',
    style: {
      label: 'data(label)',
      'text-wrap': 'wrap',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'background-image': function (ele) {
        return getAwesomeSvgIcon(ele.data().iconShape, ele.data().iconColor);
      },
    },
  },
  {
    selector: 'edge',
    style: {
      label: 'data(label)',
      'text-wrap': 'wrap',
      'text-valign': 'bottom',
      'text-halign': 'center',
    },
  },
];
