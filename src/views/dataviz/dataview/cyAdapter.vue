<template>
  <a-tabs default-active-key="layer" hide-add size="small" centered style="height: 830px">
    <a-tab-pane
      key="layer"
      :forceRender="true"
      :closable="false"
      :tab="t('dataviz.dataview.form.custom.cy.layout.title')"
    >
      <Row>
        <Col :span="9">
          <div style="border-right-width: 2px; height: 700px; overflow-y: auto">
            <div v-for="(item, index) in cyLayoutLib" :key="item.alias" class="preview_img">
              <img
                :src="'/resource/img/layout-' + item.alias.toLowerCase() + '.png'"
                alt="Not available"
                @click="handleLayoutSelect(index, item.alias)"
              />
              <Checkbox
                :id="index"
                v-model:checked="customConfig.layout[index].checked"
                @change="handleLayoutCheck(index, item.alias)"
                style="position: absolute; left: 5px; top: 5px; color: green"
              >
                {{ item.alias }}
              </Checkbox>
            </div>
          </div>
        </Col>
        <Col :span="15">
          <BasicForm v-if="customConfig.selectedLayout == 'Grid'" @register="registerLayoutGridForm" />
          <BasicForm v-else-if="customConfig.selectedLayout == 'Circle'" @register="registerLayoutCircleForm" />
          <BasicForm v-else-if="customConfig.selectedLayout == 'Concentric'" @register="registerLayoutConcentricForm" />
          <BasicForm v-else-if="customConfig.selectedLayout == 'Breadthfirst'" @register="registerLayoutBreadthfirstForm" />
          <BasicForm v-else-if="customConfig.selectedLayout == 'Fcose'" @register="registerLayoutFcoseForm" />
          <BasicForm v-else-if="customConfig.selectedLayout == 'Cise'" @register="registerLayoutCiseForm" />
          <BasicForm v-else-if="customConfig.selectedLayout == 'Cola'" @register="registerLayoutColaForm" />
          <BasicForm v-else-if="customConfig.selectedLayout == 'Spread'" @register="registerLayoutSpreadForm" />
          <BasicForm v-else-if="customConfig.selectedLayout == 'Dagre'" @register="registerLayoutDagreForm" />
          <BasicForm v-else-if="customConfig.selectedLayout == 'Klay'" @register="registerLayoutKlayForm" />
          <BasicForm v-else-if="customConfig.selectedLayout == 'Layered'" @register="registerLayoutElkLayeredForm" />
          <BasicForm v-else-if="customConfig.selectedLayout == 'Mrtree'" @register="registerLayoutElkMrtreeForm" />
          <BasicForm v-else-if="customConfig.selectedLayout == 'Radial'" @register="registerLayoutElkRadialForm" />
        </Col>
      </Row>
    </a-tab-pane>
    <a-tab-pane
      key="toolkit"
      :forceRender="true"
      :closable="false"
      :tab="t('dataviz.dataview.form.custom.cy.toolkit.title')">
      <Row>
        <Col :span="9">
          <div style="height: 700px; padding-right: 5px; border-right-width: 2px">
            <BasicForm @register="registerToolkitForm" />
          </div>
        </Col>
        <Col :span="15">
          <BasicForm @register="registerAuxForm">
            <template #rankField="{ model, field }">
              <Select
                v-model:value="model[field]"
                :options="rawData.fields"
                :field-names="{ key: 'id', label: 'name', value: 'name' }"
              >
                <template #option="{ metrics, title }">
                  <b v-if="metrics"><FundOutlined />&nbsp;{{ title }}</b>
                  <template v-else><RadarChartOutlined />&nbsp;{{ title }}</template>
                </template>
              </Select>
            </template>
            <template #nodeField="{ model, field }">
              <Select
                mode="multiple"
                v-model:value="model[field]"
                :options="rawData.fields"
                :field-names="{ key: 'id', label: 'name', value: 'name' }"
              >
                <template #option="{ metrics, title }">
                  <b v-if="metrics"><FundOutlined />&nbsp;{{ title }}</b>
                  <template v-else><RadarChartOutlined />&nbsp;{{ title }}</template>
                </template>
              </Select>
            </template>
          </BasicForm>
        </Col>
      </Row>
    </a-tab-pane>
    <a-tab-pane
      key="node"
      :forceRender="true"
      :closable="false"
      :tab="t('dataviz.dataview.form.custom.cy.node.title')"
    >
      <Row>
        <Col :span="12">
          <div style="height: 700px; padding-right: 5px; border-right-width: 2px">
            <BasicForm @register="registerNodeIconForm">
              <template #shapeField="{ model, field }">
                <Select
                  allow-clear
                  v-model:value="model[field]"
                  :options="rawData.fields"
                  :field-names="{ key: 'id', label: 'name', value: 'name' }"
                >
                  <template #option="{ metrics, title }">
                    <b v-if="metrics"><FundOutlined />&nbsp;{{ title }}</b>
                    <template v-else><RadarChartOutlined />&nbsp;{{ title }}</template>
                  </template>
                </Select>
              </template>
              <template #shapeMap="{ model, field }">
                <div style="width: 85%; float: left">
                  <BasicTree
                    :treeData="iconShapeMap"
                    :renderIcon="(node) => 'fa-solid fa-' + node.shape"
                    :actionList="mapActions"
                    @dblclick="handleMapTitleDoubleClick"
                  />
                </div>
                <div style="float: left; display: inline; margin-top: 5px">
                  <PlusSquareTwoTone
                    class="ml-2"
                    :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                    @click="openMapModal(true, { target: 'iconShapeMap' })"
                  />
                </div>
              </template>
              <template #colorField="{ model, field }">
                <Select
                  allow-clear
                  v-model:value="model[field]"
                  :options="rawData.fields"
                  :field-names="{ key: 'id', label: 'name', value: 'name' }"
                >
                  <template #option="{ metrics, title }">
                    <b v-if="metrics"><FundOutlined />&nbsp;{{ title }}</b>
                    <template v-else><RadarChartOutlined />&nbsp;{{ title }}</template>
                  </template>
                </Select>
              </template>
              <template #colorMap="{ model, field }">
                <div style="width: 85%; float: left">
                  <BasicTree
                    :treeData="iconColorMap"
                    :renderIcon="(node) => node.color"
                    :actionList="mapActions"
                    @dblclick="handleMapTitleDoubleClick"
                  />
                </div>
                <div style="float: left; display: inline; margin-top: 5px">
                  <PlusSquareTwoTone
                    class="ml-2"
                    :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                    @click="openMapModal(true, { target: 'iconColorMap' })"
                  />
                </div>
              </template>
              <template #labelField="{ model, field }">
                <Select
                  allow-clear
                  v-model:value="model[field]"
                  :options="rawData.fields"
                  :field-names="{ key: 'id', label: 'name', value: 'name' }"
                >
                  <template #option="{ metrics, title }">
                    <b v-if="metrics"><FundOutlined />&nbsp;{{ title }}</b>
                    <template v-else><RadarChartOutlined />&nbsp;{{ title }}</template>
                  </template>
                </Select>
              </template>
              <template #iconColor="{ model, field }">
                <el-color-picker v-model="model[field]" />
              </template>
              <template #labelColor="{ model, field }">
                <el-color-picker v-model="model[field]" />
              </template>
            </BasicForm>
          </div>
        </Col>
        <Col :span="12">
          <BasicForm @register="registerNodeBodyForm">
            <template #shapeField="{ model, field }">
              <Select
                allow-clear
                v-model:value="model[field]"
                :options="rawData.fields"
                :field-names="{ key: 'id', label: 'name', value: 'name' }"
              >
                <template #option="{ metrics, title }">
                  <b v-if="metrics"><FundOutlined />&nbsp;{{ title }}</b>
                  <template v-else><RadarChartOutlined />&nbsp;{{ title }}</template>
                </template>
              </Select>
            </template>
            <template #shapeMap="{ model, field }">
              <div style="width: 85%; float: left">
                <BasicTree
                  :treeData="bodyShapeMap"
                  :renderIcon="(node) => 'fa-solid fa-' + nodeBodyMap[node.shape]"
                  :actionList="mapActions"
                  @dblclick="handleMapTitleDoubleClick"
                />
              </div>
              <div style="float: left; display: inline; margin-top: 5px">
                <PlusSquareTwoTone
                  class="ml-2"
                  :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                  @click="openMapModal(true, { target: 'bodyShapeMap' })"
                />
              </div>
            </template>
            <template #colorField="{ model, field }">
              <Select
                allow-clear
                v-model:value="model[field]"
                :options="rawData.fields"
                :field-names="{ key: 'id', label: 'name', value: 'name' }"
              >
                <template #option="{ metrics, title }">
                  <b v-if="metrics"><FundOutlined />&nbsp;{{ title }}</b>
                  <template v-else><RadarChartOutlined />&nbsp;{{ title }}</template>
                </template>
              </Select>
            </template>
            <template #colorMap="{ model, field }">
              <div style="width: 85%; float: left">
                <BasicTree
                  :treeData="bodyColorMap"
                  :renderIcon="(node) => node.color"
                  :actionList="mapActions"
                  @dblclick="handleMapTitleDoubleClick"
                />
              </div>
              <div style="float: left; display: inline; margin-top: 5px">
                <PlusSquareTwoTone
                  class="ml-2"
                  :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                  @click="openMapModal(true, { target: 'bodyColorMap' })"
                />
              </div>
            </template>
            <template #sizeField="{ model, field }">
              <Select
                allow-clear
                v-model:value="model[field]"
                :options="rawData.fields"
                :field-names="{ key: 'id', label: 'name', value: 'name' }"
              >
                <template #option="{ metrics, title }">
                  <b v-if="metrics"><FundOutlined />&nbsp;{{ title }}</b>
                  <template v-else><RadarChartOutlined />&nbsp;{{ title }}</template>
                </template>
              </Select>
            </template>
            <template #sizeMap="{ model, field }">
              <div style="width: 85%; float: left">
                <BasicTree
                  :treeData="bodySizeMap"
                  :actionList="mapActions"
                  @dblclick="handleMapTitleDoubleClick"
                />
              </div>
              <div style="float: left; display: inline; margin-top: 5px">
                <PlusSquareTwoTone
                  class="ml-2"
                  :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                  @click="openMapModal(true, { target: 'bodySizeMap' })"
                />
              </div>
            </template>
            <template #bodyColor="{ model, field }">
              <el-color-picker v-model="model[field]" />
            </template>
          </BasicForm>
        </Col>
      </Row>
    </a-tab-pane>
    <a-tab-pane
      key="edge"
      :forceRender="true"
      :closable="false"
      :tab="t('dataviz.dataview.form.custom.cy.edge.title')"
    >
      <Row>
        <Col :span="12">
          <div style="height: 700px; padding-right: 5px; border-right-width: 2px">
            <BasicForm @register="registerEdgeLineForm">
              <template #styleField="{ model, field }">
                <Select
                  allow-clear
                  v-model:value="model[field]"
                  :options="rawData.fields"
                  :field-names="{ key: 'id', label: 'name', value: 'name' }"
                >
                  <template #option="{ metrics, title }">
                    <b v-if="metrics"><FundOutlined />&nbsp;{{ title }}</b>
                    <template v-else><RadarChartOutlined />&nbsp;{{ title }}</template>
                  </template>
                </Select>
              </template>
              <template #styleMap="{ model, field }">
                <div style="width: 85%; float: left">
                  <BasicTree
                    :treeData="edgeStyleMap"
                    :actionList="mapActions"
                    @dblclick="handleMapTitleDoubleClick"
                  />
                </div>
                <div style="float: left; display: inline; margin-top: 5px">
                  <PlusSquareTwoTone
                    class="ml-2"
                    :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                    @click="openMapModal(true, { target: 'edgeStyleMap' })"
                  />
                </div>
              </template>
              <template #colorField="{ model, field }">
                <Select
                  allow-clear
                  v-model:value="model[field]"
                  :options="rawData.fields"
                  :field-names="{ key: 'id', label: 'name', value: 'name' }"
                >
                  <template #option="{ metrics, title }">
                    <b v-if="metrics"><FundOutlined />&nbsp;{{ title }}</b>
                    <template v-else><RadarChartOutlined />&nbsp;{{ title }}</template>
                  </template>
                </Select>
              </template>
              <template #colorMap="{ model, field }">
                <div style="width: 85%; float: left">
                  <BasicTree
                    :treeData="edgeColorMap"
                    :renderIcon="(node) => node.color"
                    :actionList="mapActions"
                    @dblclick="handleMapTitleDoubleClick"
                  />
                </div>
                <div style="float: left; display: inline; margin-top: 5px">
                  <PlusSquareTwoTone
                    class="ml-2"
                    :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                    @click="openMapModal(true, { target: 'edgeColorMap' })"
                  />
                </div>
              </template>
              <template #labelField="{ model, field }">
                <Select
                  allow-clear
                  v-model:value="model[field]"
                  :options="rawData.fields"
                  :field-names="{ key: 'id', label: 'name', value: 'name' }"
                >
                  <template #option="{ metrics, title }">
                    <b v-if="metrics"><FundOutlined />&nbsp;{{ title }}</b>
                    <template v-else><RadarChartOutlined />&nbsp;{{ title }}</template>
                  </template>
                </Select>
              </template>
              <template #edgeColor="{ model, field }">
                <el-color-picker v-model="model[field]" />
              </template>
              <template #labelColor="{ model, field }">
                <el-color-picker v-model="model[field]" />
              </template>
            </BasicForm>
          </div>
        </Col>
        <Col :span="12">
          <BasicForm @register="registerEdgeMarkerForm">
            <template #markerField="{ model, field }">
              <Select
                allow-clear
                v-model:value="model[field]"
                :options="rawData.fields"
                :field-names="{ key: 'id', label: 'name', value: 'name' }"
              >
                <template #option="{ metrics, title }">
                  <b v-if="metrics"><FundOutlined />&nbsp;{{ title }}</b>
                  <template v-else><RadarChartOutlined />&nbsp;{{ title }}</template>
                </template>
              </Select>
            </template>
            <template #markerMap="{ model, field }">
              <div style="width: 85%; float: left">
                <BasicTree
                  :treeData="edgeMarkerMap"
                  :renderIcon="(node) => node.marker"
                  :actionList="mapActions"
                  @dblclick="handleMapTitleDoubleClick"
                />
              </div>
              <div style="float: left; display: inline; margin-top: 5px">
                <PlusSquareTwoTone
                  class="ml-2"
                  :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                  @click="openMapModal(true, { target: 'edgeMarkerMap' })"
                />
              </div>
            </template>
            <template #widthField="{ model, field }">
              <Select
                allow-clear
                v-model:value="model[field]"
                :options="rawData.fields"
                :field-names="{ key: 'id', label: 'name', value: 'name' }"
              >
                <template #option="{ metrics, title }">
                  <b v-if="metrics"><FundOutlined />&nbsp;{{ title }}</b>
                  <template v-else><RadarChartOutlined />&nbsp;{{ title }}</template>
                </template>
              </Select>
            </template>
            <template #widthMap="{ model, field }">
              <div style="width: 85%; float: left">
                <BasicTree
                  :treeData="edgeWidthMap"
                  :actionList="mapActions"
                  @dblclick="handleMapTitleDoubleClick"
                />
              </div>
              <div style="float: left; display: inline; margin-top: 5px">
                <PlusSquareTwoTone
                  class="ml-2"
                  :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                  @click="openMapModal(true, { target: 'edgeWidthMap' })"
                />
              </div>
            </template>
          </BasicForm>
        </Col>
      </Row>
    </a-tab-pane>
  </a-tabs>
  <MapModal @register="registerMapModal" @success="handleMapSuccess" />
</template>
<script lang="ts" setup name="CyAdapter">
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import {
    Tabs as ATabs,
    TabPane as ATabPane,
    Row,
    Col,
    Checkbox,
    message,
    Select,
  } from 'ant-design-vue';
  import {
    formCustomToolkit,
    initToolkit,
    formCustomAux,
    initCyLayout,
    initNode,
    cyLayoutLib,
    initEdge,
    formLayoutGrid,
    formLayoutCircle,
    formLayoutConcentric,
    formLayoutFcose,
    formLayoutCise,
    formLayoutDagre,
    formLayoutCola,
    formLayoutBreadthfirst,
    formLayoutD3Force,
    formLayoutKlay,
    formCustomNodeIcon,
    formCustomNodeBody,
    formCustomEdgeLine,
    formCustomEdgeMarker,
    initAux,
    formLayoutElkMrtree,
    formLayoutElkRadial,
    formLayoutElkLayered,
    nodeBodyMap, formLayoutSpread,
  } from './cyData';
  import {
    FundOutlined,
    RadarChartOutlined,
    PlusSquareTwoTone,
    DeleteOutlined,
  } from '@ant-design/icons-vue';
  import { BasicTree, TreeActionItem } from '/@/components/Tree';
  import { computed, h, nextTick, reactive, ref, unref } from 'vue';
  import htmlColors from 'html-colors';
  //import { JsonTreeView } from '/@/components/Json-tree-view';
  import { useModal } from '/@/components/Modal';
  import MapModal from './mapModal.vue';

  const { t } = useI18n();
  const emit = defineEmits(['change']);
  let adapterActive = false;
  const rawData = reactive({
    chartType: '',
    libVer: '',
    libCfg: { chartType: '', config: {} },
    fields: [],
  });

  // map modal definition
  const [registerMapModal, { openModal: openMapModal }] = useModal();

  // Toolkit form
  const [
    registerToolkitForm,
    {
      setFieldsValue: setToolkitFields,
      resetFields: resetToolkitFields,
      validate: valToolkitFields,
    },
  ] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: formCustomToolkit,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleToolkitChange,
  });

  // node form
  const [
    registerNodeIconForm,
    { setFieldsValue: setNodeIconFields, resetFields: resetNodeIconFields, validate: valNodeIconFields },
  ] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: formCustomNodeIcon,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleNodeIconChange,
  });

  // node form
  const [
    registerNodeBodyForm,
    { setFieldsValue: setNodeBodyFields, resetFields: resetNodeBodyFields, validate: valNodeBodyFields },
  ] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: formCustomNodeBody,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleNodeBodyChange,
  });

  // Aux form
  const [
    registerAuxForm,
    {
      setFieldsValue: setAuxFields,
      resetFields: resetAuxFields,
      validate: valAuxFields,
    },
  ] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: formCustomAux,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleAuxChange,
  });

  // edge line form
  const [
    registerEdgeLineForm,
    {
      setFieldsValue: setEdgeLineFields,
      resetFields: resetEdgeLineFields,
      validate: valEdgeLineFields,
    },
  ] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formCustomEdgeLine,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleEdgeLineChange,
  });

  // edge marker form
  const [
    registerEdgeMarkerForm,
    {
      setFieldsValue: setEdgeMarkerFields,
      resetFields: resetEdgeMarkerFields,
      validate: valEdgeMarkerFields,
    },
  ] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formCustomEdgeMarker,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleEdgeMarkerChange,
  });

  // layout grid options
  const [
    registerLayoutGridForm,
    {
      setFieldsValue: setGridFields,
      resetFields: resetGridFields,
      validate: valGridFields,
    },
  ] = useForm({
    labelWidth: 130,
    baseColProps: { span: 24 },
    schemas: formLayoutGrid,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleGridChange,
  });

  // layout circle options
  const [
    registerLayoutCircleForm,
    {
      setFieldsValue: setCircleFields,
      resetFields: resetCircleFields,
      validate: valCircleFields,
    },
  ] = useForm({
    labelWidth: 130,
    baseColProps: { span: 24 },
    schemas: formLayoutCircle,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleCircleChange,
  });

  // layout concentric options
  const [
    registerLayoutConcentricForm,
    {
      setFieldsValue: setConcentricFields,
      resetFields: resetConcentricFields,
      validate: valConcentricFields,
    },
  ] = useForm({
    labelWidth: 130,
    baseColProps: { span: 24 },
    schemas: formLayoutConcentric,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleConcentricChange,
  });

  // layout breadthfirst options
  const [
    registerLayoutBreadthfirstForm,
    {
      setFieldsValue: setBreadthfirstFields,
      resetFields: resetBreadthfirstFields,
      validate: valBreadthfirstFields,
    },
  ] = useForm({
    labelWidth: 130,
    baseColProps: { span: 24 },
    schemas: formLayoutBreadthfirst,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleBreadthfirstChange,
  });

  // layout fcose options
  const [
    registerLayoutFcoseForm,
    {
      setFieldsValue: setFcoseFields,
      resetFields: resetFcoseFields,
      validate: valFcoseFields,
    },
  ] = useForm({
    labelWidth: 130,
    baseColProps: { span: 24 },
    schemas: formLayoutFcose,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleFcoseChange,
  });

  // layout Cise options
  const [
    registerLayoutCiseForm,
    {
      setFieldsValue: setCiseFields,
      resetFields: resetCiseFields,
      validate: valCiseFields,
    },
  ] = useForm({
    labelWidth: 130,
    baseColProps: { span: 24 },
    schemas: formLayoutCise,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleCiseChange,
  });

  // layout d3-force options
  const [
    registerLayoutD3ForceForm,
    {
      setFieldsValue: setD3ForceFields,
      resetFields: resetD3ForceFields,
      validate: valD3ForceFields,
    },
  ] = useForm({
    labelWidth: 130,
    baseColProps: { span: 24 },
    schemas: formLayoutD3Force,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleD3ForceChange,
  });

  // layout cola options
  const [
    registerLayoutColaForm,
    {
      setFieldsValue: setColaFields,
      resetFields: resetColaFields,
      validate: valColaFields,
    },
  ] = useForm({
    labelWidth: 130,
    baseColProps: { span: 24 },
    schemas: formLayoutCola,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleColaChange,
  });

  // layout Spread options
  const [
    registerLayoutSpreadForm,
    {
      setFieldsValue: setSpreadFields,
      resetFields: resetSpreadFields,
      validate: valSpreadFields,
    },
  ] = useForm({
    labelWidth: 130,
    baseColProps: { span: 24 },
    schemas: formLayoutSpread,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleSpreadChange,
  });

  // layout DAGs options
  const [
    registerLayoutDagreForm,
    {
      setFieldsValue: setDagreFields,
      resetFields: resetDagreFields,
      validate: valDagreFields,
    },
  ] = useForm({
    labelWidth: 130,
    baseColProps: { span: 24 },
    schemas: formLayoutDagre,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleDagreChange,
  });

  // layout Klay options
  const [
    registerLayoutKlayForm,
    {
      setFieldsValue: setKlayFields,
      resetFields: resetKlayFields,
      validate: valKlayFields,
    },
  ] = useForm({
    labelWidth: 130,
    baseColProps: { span: 24 },
    schemas: formLayoutKlay,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleKlayChange,
  });

  // layout ELK Layered options
  const [
    registerLayoutElkLayeredForm,
    {
      setFieldsValue: setElkLayeredFields,
      resetFields: resetElkLayeredFields,
      validate: valElkLayeredFields,
    },
  ] = useForm({
    labelWidth: 130,
    baseColProps: { span: 24 },
    schemas: formLayoutElkLayered,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleElkLayeredChange,
  });

  // layout ELK Mrtree options
  const [
    registerLayoutElkMrtreeForm,
    {
      setFieldsValue: setElkMrtreeFields,
      resetFields: resetElkMrtreeFields,
      validate: valElkMrtreeFields,
    },
  ] = useForm({
    labelWidth: 130,
    baseColProps: { span: 24 },
    schemas: formLayoutElkMrtree,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleElkMrtreeChange,
  });

  // layout ELK Radial options
  const [
    registerLayoutElkRadialForm,
    {
      setFieldsValue: setElkRadialFields,
      resetFields: resetElkRadialFields,
      validate: valElkRadialFields,
    },
  ] = useForm({
    labelWidth: 130,
    baseColProps: { span: 24 },
    schemas: formLayoutElkRadial,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleElkRadialChange,
  });

  // show delete icon in variable tree
  const mapActions: TreeActionItem[] = [
    {
      render: (node) => {
        if (node.children) { return undefined; }
        return h(DeleteOutlined, {
          class: 'ml-2',
          onClick: () => {
            if (node.target == 'iconShapeMap') {
              const idx = customConfig.node?.icon?.shapeMap.findIndex((v) => {
                // find item
                return v.shape == node.shape;
              });
              // delete shape
              customConfig.node.icon.shapeMap.splice(idx, 1);
            } else if (node.target == 'iconColorMap') {
              const idx = customConfig.node?.icon.colorMap.findIndex((v) => {
                // find item
                return v.color == node.color;
              });
              // delete color
              customConfig.node.icon.colorMap.splice(idx, 1);
            } else if (node.target == 'bodyShapeMap') {
              const idx = customConfig.node?.body?.shapeMap.findIndex((v) => {
                // find item
                return v.shape == node.shape;
              });
              // delete shape
              customConfig.node.body.shapeMap.splice(idx, 1);
            } else if (node.target == 'bodyColorMap') {
              const idx = customConfig.node?.body?.colorMap.findIndex((v) => {
                // find item
                return v.color == node.color;
              });
              // delete color
              customConfig.node.body.colorMap.splice(idx, 1);
            } else if (node.target == 'bodySizeMap') {
              const idx = customConfig.node?.body?.sizeMap.findIndex((v) => {
                // find item
                return v.size == node.size;
              });
              // delete shape
              customConfig.node.body.sizeMap.splice(idx, 1);
            } else if (node.target == 'edgeStyleMap') {
              const idx = customConfig.edge?.line?.styleMap.findIndex((v) => {
                // find item
                return v.style == node.style;
              });
              // delete color
              customConfig.edge.line.styleMap.splice(idx, 1);
            } else if (node.target == 'edgeColorMap') {
              const idx = customConfig.edge?.line?.colorMap.findIndex((v) => {
                // find item
                return v.color == node.color;
              });
              // delete color
              customConfig.edge.line.colorMap.splice(idx, 1);
            } else if (node.target == 'edgeMarkerMap') {
              const idx = customConfig.edge?.marker?.markerMap.findIndex((v) => {
                // find item
                return v.marker == node.marker;
              });
              // delete color
              customConfig.edge.marker.markerMap.splice(idx, 1);
            } else if (node.target == 'edgeWidthMap') {
              const idx = customConfig.edge?.marker?.widthMap.findIndex((v) => {
                // find item
                return v.width == node.width;
              });
              // delete color
              customConfig.edge.marker.widthMap.splice(idx, 1);
            }
          },
        });
      },
    },
  ];

  /*
   * icon shape map list
   */
  const handleMapTitleDoubleClick = ((event: any, node: any) => {
    if (!node.children) {
      openMapModal(true, node.dataRef);
    }
  });

  /*
   * icon shape map list
   */
  const iconShapeMap = computed(() => {
    if (customConfig.node?.icon?.shapeMap == undefined) {
      return [{ title: 'Icon Map', children: [] }];
    }
    let mapRet: any[] = [];
    for (const item of customConfig.node.icon.shapeMap) {
      let mapClone = JSON.parse(JSON.stringify(item));
      // combine variable name and value into title for displaying
      if (Array.isArray(item.value)) {
        mapClone.title = item.label + ':  [' + item.value + ')';
      } else {
        mapClone.title = item.label + ': ' + item.value;
      }

      mapClone.target = 'iconShapeMap';
      mapRet.push(mapClone);
    }

    return [{ title: 'Icon Map', children: mapRet }];
  });

  /*
   * icon color map list
   */
  const iconColorMap = computed(() => {
    if (customConfig.node?.icon?.colorMap == undefined) {
      return [{ title: 'Color Map', children: [] }];
    }
    let mapRet: any[] = [];
    for (const item of customConfig.node.icon.colorMap) {
      let mapClone = JSON.parse(JSON.stringify(item));
      // combine variable name and value into title for displaying
      if (Array.isArray(item.value)) {
        mapClone.title = item.label + ':  [' + item.value + ')';
      } else {
        mapClone.title = item.label + ': ' + item.value;
      }

      mapClone.target = 'iconColorMap';
      mapRet.push(mapClone);
    }

    return [{ title: 'Color Map', children: mapRet }];
  });

  /*
   * node body shape map list
   */
  const bodyShapeMap = computed(() => {
    if (customConfig.node?.body?.shapeMap == undefined) {
      return [{ title: 'Body Map', children: [] }];
    }
    let mapRet: any[] = [];
    for (const item of customConfig.node.body.shapeMap) {
      let mapClone = JSON.parse(JSON.stringify(item));
      // combine variable name and value into title for displaying
      if (Array.isArray(item.value)) {
        mapClone.title = item.label + ':  [' + item.value + ')';
      } else {
        mapClone.title = item.label + ': ' + item.value;
      }

      mapClone.target = 'bodyShapeMap';
      mapRet.push(mapClone);
    }

    return [{ title: 'Body Map', children: mapRet }];
  });

  /*
   * node body color map list
   */
  const bodyColorMap = computed(() => {
    if (customConfig.node?.body?.colorMap == undefined) {
      return [{ title: 'Color Map', children: [] }];
    }
    let mapRet: any[] = [];
    for (const item of customConfig.node.body.colorMap) {
      let mapClone = JSON.parse(JSON.stringify(item));
      // combine variable name and value into title for displaying
      if (Array.isArray(item.value)) {
        mapClone.title = item.label + ':  [' + item.value + ')';
      } else {
        mapClone.title = item.label + ': ' + item.value;
      }

      mapClone.target = 'bodyColorMap';
      mapRet.push(mapClone);
    }

    return [{ title: 'Color Map', children: mapRet }];
  });

  /*
   * node body size map list
   */
  const bodySizeMap = computed(() => {
    if (customConfig.node?.body?.sizeMap == undefined) {
      return [{ title: 'Size Map', children: [] }];
    }
    let mapRet: any[] = [];
    for (const item of customConfig.node.body.sizeMap) {
      let mapClone = JSON.parse(JSON.stringify(item));
      // combine variable name and value into title for displaying
      if (Array.isArray(item.value)) {
        mapClone.title = item.label + ':  [' + item.value + ')';
      } else {
        mapClone.title = item.label + ': ' + item.value;
      }

      mapClone.target = 'bodySizeMap';
      mapRet.push(mapClone);
    }

    return [{ title: 'Size Map', children: mapRet }];
  });

  /*
   * Edge style map list
   */
  const edgeStyleMap = computed(() => {
    if (customConfig.edge?.line?.styleMap == undefined) {
      return [{ title: 'Style Map', children: [] }];
    }
    let mapRet: any[] = [];
    for (const item of customConfig.edge.line.styleMap) {
      let mapClone = JSON.parse(JSON.stringify(item));
      // combine variable name and value into title for displaying
      if (Array.isArray(item.value)) {
        mapClone.title = item.label + ':  [' + item.value + ')';
      } else {
        mapClone.title = item.label + ': ' + item.value;
      }

      mapClone.target = 'edgeStyleMap';
      mapRet.push(mapClone);
    }

    return [{ title: 'Style Map', children: mapRet }];
  });

  /*
   * Edge style map list
   */
  const edgeColorMap = computed(() => {
    if (customConfig.edge?.line?.colorMap == undefined) {
      return [{ title: 'Color Map', children: [] }];
    }
    let mapRet: any[] = [];
    for (const item of customConfig.edge.line.colorMap) {
      let mapClone = JSON.parse(JSON.stringify(item));
      // combine variable name and value into title for displaying
      if (Array.isArray(item.value)) {
        mapClone.title = item.label + ':  [' + item.value + ')';
      } else {
        mapClone.title = item.label + ': ' + item.value;
      }

      mapClone.target = 'edgeColorMap';
      mapRet.push(mapClone);
    }

    return [{ title: 'Color Map', children: mapRet }];
  });

  /*
   * Edge marker map list
   */
  const edgeMarkerMap = computed(() => {
    if (customConfig.edge?.marker?.markerMap == undefined) {
      return [{ title: 'Marker Map', children: [] }];
    }
    let mapRet: any[] = [];
    for (const item of customConfig.edge.marker.markerMap) {
      let mapClone = JSON.parse(JSON.stringify(item));
      // combine variable name and value into title for displaying
      if (Array.isArray(item.value)) {
        mapClone.title = item.label + ':  [' + item.value + ')';
      } else {
        mapClone.title = item.label + ': ' + item.value;
      }

      mapClone.target = 'edgeMarkerMap';
      mapRet.push(mapClone);
    }

    return [{ title: 'Marker Map', children: mapRet }];
  });

  /*
   * Edge width map list
   */
  const edgeWidthMap = computed(() => {
    if (customConfig.edge?.marker?.widthMap == undefined) {
      return [{ title: 'Width Map', children: [] }];
    }
    let mapRet: any[] = [];
    for (const item of customConfig.edge.marker.widthMap) {
      let mapClone = JSON.parse(JSON.stringify(item));
      // combine variable name and value into title for displaying
      if (Array.isArray(item.value)) {
        mapClone.title = item.label + ':  [' + item.value + ')';
      } else {
        mapClone.title = item.label + ': ' + item.value;
      }

      mapClone.target = 'edgeWidthMap';
      mapRet.push(mapClone);
    }

    return [{ title: 'Width Map', children: mapRet }];
  });

  const customConfig = reactive<any>({
    selectedLayout: '',
    layout: [...initCyLayout],
    toolkit: { ...initToolkit },
    node: { ...initNode },
    edge: { ...initEdge },
    aux: { ...initAux },
  });

  /*
   * parent invokes this method to pass the config data
   */
  const setConfigData = (libCfg: any, libVer: string, fields: any[]) => {
    if (!libCfg || libCfg == '') {
      return;
    }

    adapterActive = false;
    rawData.libVer = libVer;
    rawData.libCfg = libCfg;
    rawData.chartType = libCfg.chartType;
    rawData.fields = fields; // dim and metrics

    // parse config based on version
    parseConfig(rawData.libCfg.config, rawData.chartType);
    adapterActive = true;
  };

  /*
   * parse chart config and convert to custom fields
   */
  const parseConfig = async (libCfg: any) => {
    if (!libCfg) {
      return;
    }
    parseLayout(libCfg);
    parseToolkit(libCfg);
    parseNode(libCfg);
    parseEdge(libCfg);

    // wait for specific form being rendered (v-if)
    await nextTick();
  };

  /*
   * parse layout config
   */
  const parseLayout = (cfg: any) => {
    // reset layout config
    for (const lay of customConfig.layout) {
      lay.checked = false;
    }

    if (cfg.layout && Array.isArray(cfg.layout)) {
      for (const layout of cfg.layout) {
        // find specific layout from customConfig
        const customLayout = customConfig.layout.find((ele) => {
          return ele.alias == layout.alias;
        });
        if (customLayout) {
          // set to checked and update options
          customLayout.checked = true;
          // merge default options and user selected options
          customLayout.options = { ...customLayout.options, ...cfg.options };
        }
      }
    }
  };

  /*
   * parse toolkit config
   */
  const parseToolkit = (cfg: any) => {
    // reset customConfig
    customConfig.toolkit = { ...initToolkit };
    customConfig.aux = { ...initAux };
    if (cfg.toolkit) {
      customConfig.toolkit = { ...initToolkit, ...cfg.toolkit };
    }

    if (cfg.aux) {
      customConfig.aux = { ...initAux, ...cfg.aux };
    }

    setToolkitFields(unref(customConfig.toolkit));
    setAuxFields(unref(customConfig.aux));
  };

  /*
   * parse node config
   */
  const parseNode = (cfg: any) => {
    // reset customConfig and form
    customConfig.node = { ...initNode };
    if (cfg.node) {
      customConfig.node = { ...initNode, ...cfg.node };
    }

    setNodeIconFields(unref(customConfig.node.icon));
    setNodeBodyFields(unref(customConfig.node.body));
  };

  /*
   * parse edge config
   */
  const parseEdge = async (cfg: any) => {
    // reset customConfig and form
    customConfig.edge = {...initEdge};
    if (cfg.edge) {
      customConfig.edge = {...initEdge, ...cfg.edge};
    }

    setEdgeLineFields(unref(customConfig.edge.line));
    await setEdgeMarkerFields(unref(customConfig.edge.marker));
  };

  /*
   * notify parent to update chart config
   */
  const updateConfig = (category: string, key: string | undefined, value: any) => {
    if (!key || !adapterActive) {
      return;
    }

    if (category == 'layout') {
      if (value.checked) {
        let existedLayout = rawData.libCfg.config.layout.find((ele)=>{return ele.alias == key;});
        if (existedLayout) {
          existedLayout = value;
        } else {
          rawData.libCfg.config.layout.push(value);
        }
      } else {
        const idx = rawData.libCfg.config.layout.findIndex((ele) => {
          return ele.alias == key;
        });
        if (idx != undefined) {
          rawData.libCfg.config.layout.splice(idx, 1);
        }
      }
    } else if (category == 'toolkit') {
      rawData.libCfg.config.toolkit[key] = value;
    } else if (category == 'cluster') {
      // update config
      if (key == 'enabled') {
        rawData.libCfg.config.node.cluster[key] = value;
      }
    } else if (category == 'nodeIcon') {
      rawData.libCfg.config.node.icon[key] = value;
    } else if (category == 'nodeBody') {
      rawData.libCfg.config.node.body[key] = value;
    } else if (category == 'edgeLine') {
      rawData.libCfg.config.edge[key] = value;
    } else if (category == 'edgeMarker') {
      rawData.libCfg.config.edge[key] = value;
    } else if (category == 'aux') {
      if (key == 'animate') {
        for (const layout of rawData.libCfg.config.layout) {
          layout.options.animate = value;
        }
      }
      rawData.libCfg.config.aux[key] = value;
    }
    // notify parent with params
    emit('change', category, key, value);
  };

  /*
   * handle layout selection
   */
  function handleLayoutSelect(index: number, alias: string) {
    customConfig.selectedLayout = alias;
  }

  /*
   * handle layout check
   */
  function handleLayoutCheck(index: number, alias: string) {
    const checkedLayout = customConfig.layout.filter((ele) => {
      return ele.checked; // true
    });

    // get here when you triggered the checkbox, the status was changed
    if (checkedLayout.length > 3) {
      customConfig.layout[index].checked = false;
      // only 3 can be selected at most
      message.warning(t('dataviz.dataview.error.maxSelection'));
    } else {
      updateConfig('layout', alias, customConfig.layout[index]);
    }
  }

  /*
   * handle the change of toolkit
   */
  async function handleToolkitChange() {
    const values = await valToolkitFields();
    // compare with toolkit to detect the changed object
    let pkey: string;

    for (const key in values) {
      if (customConfig.toolkit[key] != values[key]) {
        // find the changed parameter
        customConfig.toolkit[key] = values[key];
        pkey = key;
        break;
      }
    }
    updateConfig('toolkit', pkey, values[pkey]);
  }

  /*
   * handle the change of node
   */
  async function handleNodeIconChange() {
    const values = await valNodeIconFields();
    // compare with customConfig.node to detect the changed object
    let pkey: string;
    for (const key in values) {
      if (customConfig.node.icon[key] != values[key]) {
        if (key == 'colorField' || key == 'colorMap') {
          customConfig.node.icon[key] = values[key];
        } else {
          customConfig.node.icon[key] = values[key];
        }
        pkey = key;
        break;
      }
    }

    updateConfig('nodeIcon', pkey, values[pkey]);
  }

  /*
   * handle the change of node
   */
  async function handleNodeBodyChange() {
    const values = await valNodeBodyFields();
    // compare with customConfig.node to detect the changed object
    let pkey: string;
    for (const key in values) {
      if (customConfig.node[key] != values[key]) {
        if (key == 'colorField' || key == 'colorMap') {
          customConfig.node[key] = values[key];
        } else {
          customConfig.node[key] = values[key];
        }
        pkey = key;
        break;
      }
    }

    updateConfig('nodeBody', pkey, values[pkey]);
  }

  /*
   * handle the change of cluster
   */
  async function handleAuxChange() {
    const values = await valAuxFields();
    // compare with lineStyle to detect the changed object
    let category = 'aux';
    let pkey: string;
    for (const key in values) {
      if (key == 'animate') {
        for (const layout of customConfig.layout) {
          if (layout.options.animate == values[key]) {
            break;
          } else {
            layout.options.animate = values[key];
            pkey = 'animate';
          }
        }
      } else {
        if (customConfig.aux[key] != values[key]) {
          customConfig.aux[key] = values[key];
          pkey = key;
          break;
        }
      }
    }

    updateConfig(category, pkey, values[pkey]);
  }

  /*
   * handle the change of edge line
   */
  async function handleEdgeLineChange() {
    const values = await valEdgeLineFields();
    // compare with customConfig.node to detect the changed object
    let pkey: string;
    for (const key in values) {
      if (customConfig.edge.line[key] != values[key]) {
        if (key == 'colorField' || key == 'colorMap') {
          customConfig.edge.line[key] = values[key];
        } else {
          customConfig.edge.line[key] = values[key];
        }
        pkey = key;
        break;
      }
    }
    updateConfig('edgeLine', pkey, values[pkey]);
  }

  /*
  * handle the change of edge marker
  */
  async function handleEdgeMarkerChange() {
    const values = await valEdgeMarkerFields();
    // compare with customConfig.node to detect the changed object
    let pkey: string;
    for (const key in values) {
      if (customConfig.edge.marker[key] != values[key]) {
        if (key == 'colorField' || key == 'colorMap') {
          customConfig.edge.marker[key] = values[key];
        } else {
          customConfig.edge.marker[key] = values[key];
        }
        pkey = key;
        break;
      }
    }
    updateConfig('edgeMarker', pkey, values[pkey]);
  }



  /*
 * handle the change of layout grid
 */
  async function handleGridChange() {
    const values = await valGridFields();
    const customLayout = customConfig.layout.find((ele)=>{return ele.alias == 'Grid';});
    // compare with customConfig to detect the changed object
    for (const key in values) {
      if (customLayout.options[key] != values[key]) {
        customLayout.options[key] = values[key];
        break;
      }
    }

    if (customLayout.checked) {
      // update libCfg if it is checked
      updateConfig('layout', customLayout.alias, customLayout);
    }
  }

  /*
* handle the change of layout circle
*/
  async function handleCircleChange() {
    const values = await valCircleFields();
    const customLayout = customConfig.layout.find((ele)=>{return ele.alias == 'Circle';});
    // compare with customConfig to detect the changed object
    for (const key in values) {
      if (customLayout.options[key] != values[key]) {
        customLayout.options[key] = values[key];
        break;
      }
    }

    if (customLayout.checked) {
      // update libCfg if it is checked
      updateConfig('layout', customLayout.alias, customLayout);
    }
  }

  /*
* handle the change of layout Concentric
*/
  async function handleConcentricChange() {
    const values = await valConcentricFields();
    const customLayout = customConfig.layout.find((ele)=>{return ele.alias == 'Concentric';});
    // compare with customConfig to detect the changed object
    for (const key in values) {
      if (customLayout.options[key] != values[key]) {
        customLayout.options[key] = values[key];
        break;
      }
    }

    if (customLayout.checked) {
      // update libCfg if it is checked
      updateConfig('layout', customLayout.alias, customLayout);
    }
  }

  /*
* handle the change of layout breadthfirst
*/
  async function handleBreadthfirstChange() {
    const values = await valBreadthfirstFields();
    const customLayout = customConfig.layout.find((ele)=>{return ele.alias == 'Breadthfirst';});
    // compare with customConfig to detect the changed object
    for (const key in values) {
      if (customLayout.options[key] != values[key]) {
        customLayout.options[key] = values[key];
        break;
      }
    }

    if (customLayout.checked) {
      // update libCfg if it is checked
      updateConfig('layout', customLayout.alias, customLayout);
    }
  }

  /*
* handle the change of layout fcose
*/
  async function handleFcoseChange() {
    const values = await valFcoseFields();
    const customLayout = customConfig.layout.find((ele)=>{return ele.alias == 'Fcose';});
    // compare with customConfig to detect the changed object
    for (const key in values) {
      if (customLayout.options[key] != values[key]) {
        customLayout.options[key] = values[key];
        break;
      }
    }

    if (customLayout.checked) {
      // update libCfg if it is checked
      updateConfig('layout', customLayout.alias, customLayout);
    }
  }

  /*
* handle the change of layout cise
*/
  async function handleCiseChange() {
    const values = await valCiseFields();
    const customLayout = customConfig.layout.find((ele)=>{return ele.alias == 'Cise';});
    // compare with customConfig to detect the changed object
    for (const key in values) {
      if (customLayout.options[key] != values[key]) {
        customLayout.options[key] = values[key];
        break;
      }
    }

    if (customLayout.checked) {
      // update libCfg if it is checked
      updateConfig('layout', customLayout.alias, customLayout);
    }
  }

  /*
* handle the change of layout d3force
*/
  async function handleD3ForceChange() {
    const values = await valD3ForceFields();
    const customLayout = customConfig.layout.find((ele)=>{return ele.alias == 'D3Force';});
    // compare with customConfig to detect the changed object
    for (const key in values) {
      if (customLayout.options[key] != values[key]) {
        customLayout.options[key] = values[key];
        break;
      }
    }

    if (customLayout.checked) {
      // update libCfg if it is checked
      updateConfig('layout', customLayout.alias, customLayout);
    }
  }

  /*
* handle the change of layout cola
*/
  async function handleColaChange() {
    const values = await valColaFields();
    const customLayout = customConfig.layout.find((ele)=>{return ele.alias == 'Cola';});
    // compare with customConfig to detect the changed object
    for (const key in values) {
      if (customLayout.options[key] != values[key]) {
        customLayout.options[key] = values[key];
        break;
      }
    }

    if (customLayout.checked) {
      // update libCfg if it is checked
      updateConfig('layout', customLayout.alias, customLayout);
    }
  }

  /*
* handle the change of layout spread
*/
  async function handleSpreadChange() {
    const values = await valSpreadFields();
    const customLayout = customConfig.layout.find((ele)=>{return ele.alias == 'Spread';});
    // compare with customConfig to detect the changed object
    for (const key in values) {
      if (customLayout.options[key] != values[key]) {
        customLayout.options[key] = values[key];
        break;
      }
    }

    if (customLayout.checked) {
      // update libCfg if it is checked
      updateConfig('layout', customLayout.alias, customLayout);
    }
  }

  /*
* handle the change of layout dagre
*/
  async function handleDagreChange() {
    const values = await valDagreFields();
    const customLayout = customConfig.layout.find((ele)=>{return ele.alias == 'Dagre';});
    // compare with customConfig to detect the changed object
    for (const key in values) {
      if (customLayout.options[key] != values[key]) {
        customLayout.options[key] = values[key];
        break;
      }
    }

    if (customLayout.checked) {
      // update libCfg if it is checked
      updateConfig('layout', customLayout.alias, customLayout);
    }
  }


  /*
* handle the change of layout klay
*/
  async function handleKlayChange() {
    const values = await valKlayFields();
    const customLayout = customConfig.layout.find((ele)=>{return ele.alias == 'Klay';});
    // compare with customConfig to detect the changed object
    for (const key in values) {
      if (customLayout.options.klay[key] != values[key]) {
        customLayout.options.klay[key] = values[key]==undefined?false:values[key];
        break;
      }
    }

    if (customLayout.checked) {
      // update libCfg if it is checked
      updateConfig('layout', customLayout.alias, customLayout);
    }
  }

  /*
   * handle the change of layout elk layered
   */
  async function handleElkLayeredChange() {
    const values = await valElkLayeredFields();
    const customLayout = customConfig.layout.find((ele)=>{return ele.alias == 'Layered';});
    // compare with customConfig to detect the changed object
    for (const key in values) {
      if (customLayout.options.elk[key] != values[key]) {
        customLayout.options.elk[key] = values[key];
        break;
      }
    }

    if (customLayout.checked) {
      // update libCfg if it is checked
      updateConfig('layout', customLayout.alias, customLayout);
    }
  }

  /*
   * handle the change of layout elk mrtree
   */
  async function handleElkMrtreeChange() {
    const values = await valElkMrtreeFields();
    const customLayout = customConfig.layout.find((ele)=>{return ele.alias == 'Mrtree';});
    // compare with customConfig to detect the changed object
    for (const key in values) {
      if (customLayout.options.elk[key] != values[key]) {
        customLayout.options.elk[key] = values[key];
        break;
      }
    }

    if (customLayout.checked) {
      // update libCfg if it is checked
      updateConfig('layout', customLayout.alias, customLayout);
    }
  }

  /*
   * handle the change of layout elk mrtree
   */
  async function handleElkRadialChange() {
    const values = await valElkRadialFields();
    const customLayout = customConfig.layout.find((ele)=>{return ele.alias == 'Radial';});
    // compare with customConfig to detect the changed object
    for (const key in values) {
      if (customLayout.options.elk[key] != values[key]) {
        customLayout.options.elk[key] = values[key];
        break;
      }
    }

    if (customLayout.checked) {
      // update libCfg if it is checked
      updateConfig('layout', customLayout.alias, customLayout);
    }
  }

  /*
   * update iconShapeMap/iconColorMap/bodyShapeMap/bodyColorMap/bodySizeMap/edgeStyleMap/edgeColorMap/edgeWidthMap/edgeMarkerMap
   */
  function handleMapSuccess(data) {
    let realValue = data.value;
    if (data.value && data.value.startsWith('[')) {
      realValue = [];
      let tmp = data.value.substring(1,data.value.length-1);
      let tmpArray = tmp.split(',');
      realValue[0] = Number(tmpArray[0]);
      realValue[1] = Number(tmpArray[1]);
    }

    if (data.target == 'iconShapeMap') {
      if (!customConfig.node.icon.shapeMap) {
        // create one
        customConfig.node.icon.shapeMap = [];
      }
      let updatedShape = customConfig.node.icon.shapeMap.find((ele)=>{return ele.shape == data.shape});
      if (updatedShape) {
        // find existing one
        updatedShape.label = data.label;
        updatedShape.value = realValue;
      } else {
        // doesn't exist
        customConfig.node.icon.shapeMap.push({
          shape: data.shape,
          label: data.label,
          value: realValue,
        });
      }
    } else if (data.target == 'iconColorMap') {
      if (!customConfig.node.icon.colorMap) {
        // create one
        customConfig.node.icon.colorMap = [];
      }
      let updatedColor = customConfig.node.icon.colorMap.find((ele)=>{return ele.color == data.color});
      if (updatedColor) {
        // find existing one
        updatedColor.label = data.label;
        updatedColor.value = realValue;
      } else {
        // doesn't exist
        customConfig.node.icon.colorMap.push({
          color: data.color,
          label: data.label,
          value: realValue,
        });
      }
    } else if (data.target == 'bodyShapeMap') {
      if (!customConfig.node.body.shapeMap) {
        // create one
        customConfig.node.body.shapeMap = [];
      }
      let updatedShape = customConfig.node.body.shapeMap.find((ele)=>{return ele.shape == data.shape});
      if (updatedShape) {
        // find existing one
        updatedShape.label = data.label;
        updatedShape.value = realValue;
      } else {
        // doesn't exist
        customConfig.node.body.shapeMap.push({
          shape: data.shape,
          label: data.label,
          value: realValue,
        });
      }
    } else if (data.target == 'bodyColorMap') {
      if (!customConfig.node.body.colorMap) {
        // create one
        customConfig.node.body.colorMap = [];
      }
      let updatedColor = customConfig.node.body.colorMap.find((ele)=>{return ele.color == data.color});
      if (updatedColor) {
        // find existing one
        updatedColor.label = data.label;
        updatedColor.value = realValue;
      } else {
        // doesn't exist
        customConfig.node.body.colorMap.push({
          color: data.color,
          label: data.label,
          value: realValue,
        });
      }
    } else if (data.target == 'bodySizeMap') {
      if (!customConfig.node.body.sizeMap) {
        // create one
        customConfig.node.body.sizeMap = [];
      }
      let updatedShape = customConfig.node.body.sizeMap.find((ele)=>{return ele.size == data.size});
      if (updatedShape) {
        // find existing one
        updatedShape.label = data.label;
        updatedShape.value = realValue;
      } else {
        // doesn't exist
        customConfig.node.body.sizeMap.push({
          size: data.size,
          label: data.label,
          value: realValue,
        });
      }
    } else if (data.target == 'edgeStyleMap') {
      if (!customConfig.edge.line.styleMap) {
        // create one
        customConfig.edge.line.styleMap = [];
      }
      let updatedColor = customConfig.edge.line.styleMap.find((ele)=>{return ele.style == data.style});
      if (updatedColor) {
        // find existing one
        updatedColor.label = data.label;
        updatedColor.value = realValue;
      } else {
        // doesn't exist
        customConfig.edge.line.styleMap.push({
          style: data.style,
          label: data.label,
          value: realValue,
        });
      }
    } else if (data.target == 'edgeColorMap') {
      if (!customConfig.edge.line.colorMap) {
        // create one
        customConfig.edge.line.colorMap = [];
      }
      let updatedColor = customConfig.edge.line.colorMap.find((ele)=>{return ele.color == data.color});
      if (updatedColor) {
        // find existing one
        updatedColor.label = data.label;
        updatedColor.value = realValue;
      } else {
        // doesn't exist
        customConfig.edge.line.colorMap.push({
          color: data.color,
          label: data.label,
          value: realValue,
        });
      }
    } else if (data.target == 'edgeMarkerMap') {
      if (!customConfig.edge.marker.markerMap) {
        // create one
        customConfig.edge.marker.markerMap = [];
      }
      let updatedColor = customConfig.edge.marker.markerMap.find((ele)=>{return ele.marker == data.marker});
      if (updatedColor) {
        // find existing one
        updatedColor.label = data.label;
        updatedColor.value = realValue;
      } else {
        // doesn't exist
        customConfig.edge.marker.markerMap.push({
          marker: data.marker,
          label: data.label,
          value: realValue,
        });
      }
    } else if (data.target == 'edgeWidthMap') {
      if (!customConfig.edge.marker.widthMap) {
        // create one
        customConfig.edge.marker.widthMap = [];
      }
      let updatedColor = customConfig.edge.marker.widthMap.find((ele)=>{return ele.width == data.width});
      if (updatedColor) {
        // find existing one
        updatedColor.label = data.label;
        updatedColor.value = realValue;
      } else {
        // doesn't exist
        customConfig.edge.marker.widthMap.push({
          width: data.width,
          label: data.label,
          value: realValue,
        });
      }
    }
  }

  // expose these methods to parent
  defineExpose({ setConfigData });
</script>

<style lang="less" scoped>
  .card-item {
    background-color: #fdfdfd;
    cursor: move;
  }

  .card-item:hover {
    background-color: #f1f1f1;
    cursor: move;
  }

  .preview_img {
    cursor: pointer;
    width: 98%;
    border: 1px solid;
    height: 60px;
    margin-top: 5px;
    position: relative;
    color: green;
    font-weight: bold;
    text-wrap: normal;
    img {
      height: 100%;
      object-fit: cover;
      float: right;
      margin-right: 5px;
    }
  }
  .preview_img:hover {
    border: 2px solid;
    color: orange;
  }

  .preview_img:focus {
    border: 2px solid;
    color: orange;
  }

  ::v-deep(.filesets) {
    border: 1px solid silver;
    padding: 0px 10px 5px 10px;
  }

  ::v-deep(.fieldsetlegend) {
    padding: 2px 5px 2px 5px;
    width: auto;
    font-size: 15px;
  }

  ::v-deep(.ant-form legend) {
    color: rgba(0, 0, 0, 0.45);
    border-bottom: 0;
    margin-bottom: 0;
  }

  ::v-deep(.ant-tree-switcher) {
    width: 10px;
  }

  .fielditem {
    padding: 2px;
    margin: 2px 2px 2px 2px;
    border: solid 1px #eee;
    background-color: #f1f1f1;
    width: 100%;
    font-size: 12px;
  }

  .fielditem:hover {
    background-color: #fdfdfd;
    cursor: move;
  }
</style>
