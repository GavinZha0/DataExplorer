<template>
  <a-tabs default-active-key="layer" hide-add size="small" centered style="height: 850px">
    <a-tab-pane key="layer" :forceRender="true" :closable="false">
      <template #tab>
        <Tooltip>
          <template #title>{{ t('dataviz.dataview.form.custom.layer.title') }}</template>
          <GlobalOutlined />
        </Tooltip>
      </template>
      <Row>
        <Col :span="12">
          <div>{{ t('dataviz.dataview.form.custom.layer.baselayer') }}</div>
          <div style="border-right-width: 2px; height: 640px; overflow-y: auto">
            <div v-for="(item, index) in baseLayerLib" :key="item.name" class="preview_img">
              <img
                :src="item.preview"
                alt="Not available"
                @click="handleBaselayerCheck(index, item.name, false)"
              />
              <Checkbox
                :id="index"
                v-model:checked="customConfig.layers.baselayer[index]"
                @change="handleBaselayerCheck(index, item.name, true)"
                style="position: absolute; left: 5px; top: 5px; color: green"
              >
                {{ item.name }}
              </Checkbox>
            </div>
          </div>
        </Col>
        <Col :span="12">
          <div>{{ t('dataviz.dataview.form.custom.layer.overlayer') }}</div>
          <Form
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
          >
            <FormItem label="Type" name="type">
              <Select v-model:value="overlayerType">
                <SelectOption value="overlayer">Service layer</SelectOption>
                <SelectOption value="Geojson">Geojson layer</SelectOption>
              </Select>
            </FormItem>
          </Form>
          <div style="margin-left: 5px; height: 640px; overflow-y: auto">
            <div v-for="(item, index) in overLayerLib" :key="item.name" class="preview_img">
              <img
                :src="item.preview"
                alt="Not available"
                @click="handleOverlayerCheck(index, item.name, false)"
              />
              <Checkbox
                :id="index"
                v-model:checked="customConfig.layers.overlayer[index]"
                @change="handleOverlayerCheck(index, item.name, true)"
                style="position: absolute; left: 5px; top: 5px; color: green"
              >
                {{ item.name }}
              </Checkbox>
            </div>
          </div>
        </Col>
      </Row>
    </a-tab-pane>
    <a-tab-pane key="toolkit" :forceRender="true" :closable="false">
      <template #tab>
        <Tooltip>
          <template #title>{{ t('dataviz.dataview.form.custom.toolkit.title') }}</template>
          <ToolOutlined />
        </Tooltip>
      </template>
      <Row>
        <Col :span="12">
          <div style="height: 700px; padding-right: 5px; border-right-width: 2px">
            <BasicForm @register="registerToolkitForm" />
          </div>
        </Col>
        <Col :span="12">
          <BasicForm v-if="rawData.chartType == 'Timeline'" @register="registerTimelineForm" />
          <BasicForm v-else-if="rawData.chartType == 'Heatmap'" @register="registerHeatmapForm" />
          <BasicForm
            v-else-if="rawData.chartType == 'Migration'"
            @register="registerMigrationForm"
          />
          <BasicForm v-else-if="rawData.chartType == 'Choropleth'" @register="registerChoroplethForm">
            <template #colorMap="{ model, field }">
              <fieldset class="filesets">
                <legend style="width: auto; font-size: 15px; font-weight: bold">
                  {{ t('dataviz.dataview.form.custom.marker.colorMap') }}
                  <PlusSquareTwoTone
                    class="ml-2"
                    :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                    @click="openMapModal(true, { target: 'markerColor' })"
                  />
                </legend>
                <BasicTree
                  :treeData="colorMapList"
                  :actionList="mapActions"
                  @dblclick="openMapModal"
                />
              </fieldset>
            </template>
          </BasicForm>
        </Col>
      </Row>
    </a-tab-pane>
    <a-tab-pane key="marker" :forceRender="true" :closable="false">
      <template #tab>
        <Tooltip>
          <template #title>{{ t('dataviz.dataview.form.custom.marker.title') }}</template>
          <EnvironmentOutlined />
        </Tooltip>
      </template>
      <Row>
        <Col :span="12">
          <div style="height: 700px; padding-right: 5px; border-right-width: 2px">
            <BasicForm @register="registerMarkerForm">
              <template #shapeMap="{ model, field }">
                <fieldset class="filesets">
                  <legend style="width: auto; font-size: 15px; font-weight: bold">
                    {{ t('dataviz.dataview.form.custom.marker.shapeMap') }}
                    <PlusSquareTwoTone
                      class="ml-2"
                      :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                      @click="openMapModal(true, { target: 'markerShape' })"
                    />
                  </legend>
                  <BasicTree
                    :treeData="shapeMapList"
                    :actionList="mapActions"
                    @dblclick="openMapModal"
                  />
                </fieldset>
              </template>
              <template #colorMap="{ model, field }">
                <fieldset class="filesets">
                  <legend style="width: auto; font-size: 15px; font-weight: bold">
                    {{ t('dataviz.dataview.form.custom.marker.colorMap') }}
                    <PlusSquareTwoTone
                      class="ml-2"
                      :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                      @click="openMapModal(true, { target: 'markerColor' })"
                    />
                  </legend>
                  <BasicTree
                    :treeData="colorMapList"
                    :actionList="mapActions"
                    @dblclick="openMapModal"
                  />
                </fieldset>
              </template>
              <template #markerColor="{ model, field }">
                <color-picker v-model:pureColor="model[field]" format="hex" disable-history disable-alpha shape="circle" />
              </template>
            </BasicForm>
          </div>
        </Col>
        <Col :span="12">
          <BasicForm @register="registerClusterForm">
            <template #colorMap="{ model, field }">
              <fieldset class="filesets">
                <legend style="width: auto; font-size: 15px; font-weight: bold">
                  {{ t('dataviz.dataview.form.custom.cluster.colorMap') }}
                  <PlusSquareTwoTone
                    class="ml-2"
                    :style="{ fontSize: '16px', color: '#08c', cursor: 'pointer' }"
                    @click="openMapModal(true, { target: 'clusterColor' })"
                  />
                </legend>
                <BasicTree
                  :treeData="clusterMapList"
                  :actionList="mapActions"
                  @dblclick="openMapModal"
                />
              </fieldset>
            </template>
          </BasicForm>
        </Col>
      </Row>
    </a-tab-pane>
  </a-tabs>
  <MapModal @register="registerMapModal" @success="handleMapSuccess" />
</template>
<script lang="ts" setup name="LeafletAdapter">
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import {
    Tooltip,
    Tabs as ATabs,
    TabPane as ATabPane,
    Row,
    Col,
    Checkbox,
    Switch,
    message,
    Form,
    FormItem,
    Select,
    SelectOption,
  } from 'ant-design-vue';
  import {
    formCustomToolkit,
    formCustomCluster,
    formCustomHeatmap,
    initCluster,
    initHeatmap,
    initChoropleth,
    baseLayerLib,
    overLayerLib,
    formCustomMarker,
    formCustomMigration,
    initLayers,
    initToolkit,
    initMarker,
    initMigration,
    initTimeline,
    formCustomTimeline,
    formCustomChoropleth,
  } from './leafletData';
  import {
    FireOutlined,
    GlobalOutlined,
    EnvironmentOutlined,
    ToolOutlined,
    PlusSquareTwoTone,
    DeleteOutlined,
  } from '@ant-design/icons-vue';
  import { BasicTree, TreeActionItem } from '/@/components/Tree';
  import {computed, h, nextTick, reactive, ref, unref} from 'vue';
  import htmlColors from 'html-colors';
  import { useModal } from '/@/components/Modal';
  import MapModal from './mapModal.vue';

  const { t } = useI18n();
  const emit = defineEmits(['change']);
  let adapterActive = false;
  const overlayerType = ref<string>('Service layer');
  const rawData = reactive({
    chartType: '',
    libVer: '',
    libCfg: { chartType: '', config: {} },
  });

  // Variable modal definition
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
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: formCustomToolkit,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleToolkitChange,
  });

  // marker form
  const [
    registerMarkerForm,
    { setFieldsValue: setMarkerFields, resetFields: resetMarkerFields, validate: valMarkerFields },
  ] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: formCustomMarker,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleMarkerChange,
  });

  // Cluster form
  const [
    registerClusterForm,
    {
      setFieldsValue: setClusterFields,
      resetFields: resetClusterFields,
      validate: valClusterFields,
    },
  ] = useForm({
    labelWidth: 120,
    layout: 'vertical',
    baseColProps: { span: 24 },
    schemas: formCustomCluster,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleClusterChange,
  });

  // migration form
  const [
    registerMigrationForm,
    {
      setFieldsValue: setMigrationFields,
      resetFields: resetMigrationFields,
      validate: valMigrationFields,
    },
  ] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formCustomMigration,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleClusterChange,
  });

  // timeline form
  const [
    registerTimelineForm,
    {
      setFieldsValue: setTimelineFields,
      resetFields: resetTimelineFields,
      validate: valTimelineFields,
    },
  ] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formCustomTimeline,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleClusterChange,
  });

  // Heatmap form
  const [
    registerHeatmapForm,
    {
      setFieldsValue: setHeatmapFields,
      resetFields: resetHeatmapFields,
      validate: valHeatmapFields,
    },
  ] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formCustomHeatmap,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleHeatmapChange,
  });

  // Choropleth form
  const [
    registerChoroplethForm,
    {
      setFieldsValue: setChoroplethFields,
      resetFields: resetChoroplethFields,
      validate: valChoroplethFields,
    },
  ] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formCustomChoropleth,
    showActionButtonGroup: false,
    submitOnChange: true,
    submitFunc: handleClusterChange,
  });

  // show delete icon in variable tree
  const mapActions: TreeActionItem[] = [
    {
      render: (node) => {
        return h(DeleteOutlined, {
          class: 'ml-2',
          onClick: () => {
            if (node.target == 'markerShape') {
              const idx = customConfig.marker?.shapeMap.findIndex((v) => {
                // find item
                return v.shape == node.shape;
              });
              // delete shape
              customConfig.marker.shapeMap.splice(idx, 1);
            } else if (node.target == 'markerColor') {
              const idx = customConfig.marker?.colorMap.findIndex((v) => {
                // find item
                return v.color == node.color;
              });
              // delete color
              customConfig.marker.colorMap.splice(idx, 1);
            } else {
              const idx = customConfig.marker?.cluster?.colorMap.findIndex((v) => {
                // find item
                return v.color == node.color;
              });
              // delete color
              customConfig.marker.cluster.colorMap.splice(idx, 1);
            }
          },
        });
      },
    },
  ];

  const shapeMapList = computed(() => {
    if (customConfig.marker?.shapeMap == undefined) {
      return [];
    }
    let mapRet: any[] = [];
    for (const item of customConfig.marker.shapeMap) {
      let mapClone = JSON.parse(JSON.stringify(item));
      // combine variable name and value into title for displaying
      if (Array.isArray(item.value)){
        mapClone.title = item.shape + ': [' + item.value + ')';
      } else {
        mapClone.title = item.shape + ': ' + item.value;
      }

      mapClone.target = 'markerShape';
      mapRet.push(mapClone);
    }

    return mapRet;
  });

  const colorMapList = computed(() => {
    if (customConfig.marker?.colorMap == undefined) {
      return [];
    }
    let mapRet: any[] = [];
    for (const item of customConfig.marker.colorMap) {
      let mapClone = JSON.parse(JSON.stringify(item));
      // combine variable name and value into title for displaying
      if (Array.isArray(item.value)) {
        mapClone.title = item.color + ': [' + item.value + ')';
      } else {
        mapClone.title = item.color + ': ' + item.value;
      }

      mapClone.target = 'markerColor';
      mapRet.push(mapClone);
    }

    return mapRet;
  });

  const clusterMapList = computed(() => {
    if (customConfig.marker?.cluster?.colorMap == undefined) {
      return [];
    }
    let mapRet: any[] = [];
    for (const item of customConfig.marker.cluster.colorMap) {
      let mapClone = JSON.parse(JSON.stringify(item));
      // combine variable name and value into title for displaying
      if (Array.isArray(item.value)) {
        mapClone.title = item.color + ': [' + item.value + ')';
      } else {
        mapClone.title = item.color + ': ' + item.value;
      }

      mapClone.target = 'clusterColor';
      mapRet.push(mapClone);
    }

    return mapRet;
  });

  const customConfig = reactive<any>({
    layers: { ...initLayers },
    toolkit: { ...initToolkit },
    marker: { ...initMarker },
    timeline: { ...initTimeline },
    migration: { ...initMigration },
    heatmap: { ...initHeatmap },
    choropleth: { ...initChoropleth },
  });

  /*
   * parent invokes this method to pass the config data
   */
  const setConfigData = (libCfg, libVer) => {
    if (!libCfg || libCfg == '') {
      return;
    }

    adapterActive = false;
    rawData.libVer = libVer;
    rawData.libCfg = libCfg;
    rawData.chartType = libCfg.chartType;

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
    parseLayers(libCfg);
    parseToolkit(libCfg);
    parseMarker(libCfg);
    parse4Others(libCfg);

    // wait for specific form being rendered (v-if)
    await nextTick();
  };

  // baselayer and overlayer
  const parseLayers = async (cfg: any) => {
    if (cfg.baselayer && Array.isArray(cfg.baselayer)) {
      for (const layerName of cfg.baselayer) {
        // find specific layer from predefined layer lib
        const idx = baseLayerLib.findIndex((ele) => {
          return ele.name == layerName;
        });
        if (idx != undefined) {
          customConfig.layers.baselayer[idx] = true;
        }
      }
    }

    if (cfg.overlayer && Array.isArray(cfg.overlayer)) {
      for (const layerName of cfg.overlayer) {
        // find specific layer from predefined layer lib
        const idx = overLayerLib.findIndex((ele) => {
          return ele.name == layerName;
        });
        if (idx != undefined) {
          customConfig.layers.overlayer[idx] = true;
        } else if (layerName.indexOf('.json') > 0 || layerName.indexOf('.geojson') > 0) {
          // geojson file
          let fileLayer = customConfig.layers?.overFile?.find((ele) => {
            return ele.name == layerName;
          });
          if (fileLayer) {
            fileLayer.checked = true;
          }
        }
      }
    }
  };

  // toolkit config
  const parseToolkit = async (cfg: any) => {
    // reset customConfig and form
    customConfig.toolkit = { ...initToolkit };
    if (cfg.toolkit) {
      customConfig.toolkit = { ...initToolkit, ...cfg.toolkit };
    }
    await setToolkitFields(unref(customConfig.toolkit));
  };

  // marker config
  const parseMarker = async (cfg: any) => {
    // reset customConfig and form
    customConfig.marker = { ...initMarker };
    if (cfg.marker) {
      customConfig.marker = { ...initMarker, ...cfg.marker };
    }

    setMarkerFields(unref(customConfig.marker));
    await setClusterFields({
      ...unref(customConfig.marker.cluster),
      titleField: customConfig.marker.titleField,
      popup: customConfig.marker.popup,
      tooltip: customConfig.marker.tooltip,
    });
  };

  // heatmap, Choropleth, migration and timeline config
  const parse4Others = async (cfg: any) => {
    // reset customConfig and form
    customConfig.migration = { ...initMigration };
    if (cfg.migration) {
      customConfig.migration = { ...initMigration, ...cfg.migration };
    }

    customConfig.heatmap = { ...initHeatmap };
    if (cfg.heatmap) {
      customConfig.heatmap = { ...initHeatmap, ...cfg.heatmap };
    }

    customConfig.timeline = { ...initTimeline };
    if (cfg.timeline) {
      customConfig.timeline = { ...initTimeline, ...cfg.timeline };
    }

    customConfig.choropleth = { ...initChoropleth };
    if (cfg.choropleth) {
      customConfig.choropleth = { ...initChoropleth, ...cfg.choropleth };
    }

    //setMigrationFields(unref(customConfig.migration));
    //setTimelineFields(unref(customConfig.timeline));
    //setChoroplethFields(unref(customConfig.choropleth));
    //await setHeatmapFields(unref(customConfig.heatmap));
  };

  /*
   * notify parent to update chart config
   */
  const updateConfig = (category: string, key: string | undefined, value: any) => {
    if (!key || !adapterActive) {
      return;
    }

    if (category == 'baselayer') {
      if (value) {
        rawData.libCfg.config.baselayer.push(key);
      } else {
        const idx = rawData.libCfg.config.baselayer.findIndex((ele) => {
          return ele == key;
        });
        if (idx != undefined) {
          rawData.libCfg.config.baselayer.splice(idx, 1);
        }
      }
    } else if (category == 'overlayer') {
      if (key == 'type') {
        return;
      } else {
        if (value) {
          rawData.libCfg.config.overlayer.push(key);
        } else {
          const idx = rawData.libCfg.config.overlayer.findIndex((ele) => {
            return ele == key;
          });
          if (idx != undefined) {
            rawData.libCfg.config.overlayer.splice(idx, 1);
          }
        }
      }
    } else if (category == 'toolkit') {
      rawData.libCfg.config.toolkit[key] = value;
    } else if (category == 'cluster') {
      // update config
      if (key == 'enabled') {
        rawData.libCfg.config.marker.cluster[key] = value;
      }
    } else if (category == 'marker') {
      rawData.libCfg.config.marker[key] = value;
    }
    // notify parent with params
    emit('change', category, key, value);
  };

  /*
   * handle baselayer selection
   */
  function handleBaselayerCheck(index: number, name: string, done: boolean) {
    if (done) {
      const checkedBase = customConfig.layers.baselayer.filter((ele) => {
        return ele;
      });
      if (checkedBase.length > 3) {
        customConfig.layers.baselayer[index] = false;
        // only 3 can be selected at most
        message.warning(t('dataviz.dataview.error.maxSelection'));
      } else {
        updateConfig('baselayer', name, customConfig.layers.baselayer[index]);
      }
    } else {
      if (customConfig.layers.baselayer[index]) {
        customConfig.layers.baselayer[index] = false;
        updateConfig('baselayer', name, customConfig.layers.baselayer[index]);
      } else {
        const checkedBase = customConfig.layers.baselayer.filter((ele) => {
          return ele;
        });
        if (checkedBase.length < 3) {
          customConfig.layers.baselayer[index] = !customConfig.layers.baselayer[index];
          updateConfig('baselayer', name, customConfig.layers.baselayer[index]);
        } else {
          // only 3 can be selected at most
          message.warning(t('dataviz.dataview.error.maxSelection'));
        }
      }
    }
  }

  /*
   * handle overlayer selection
   */
  function handleOverlayerCheck(index: number, name: string, done: boolean) {
    if (!done) {
      customConfig.layers.overlayer[index] = !customConfig.layers.overlayer[index];
    }
    updateConfig('overlayer', name, customConfig.layers.overlayer[index]);
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
   * handle the change of marker
   */
  async function handleMarkerChange() {
    const values = await valMarkerFields();
    // compare with customConfig.marker to detect the changed object
    let pkey: string;
    for (const key in values) {
      if (customConfig.marker[key] != values[key]) {
        if (key == 'colorField' || key == 'colorMap') {
          customConfig.marker[key] = values[key];
        } else {
          customConfig.marker[key] = values[key];
        }
        pkey = key;
        break;
      }
    }

    updateConfig('marker', pkey, values[pkey]);
  }

  /*
   * handle the change of cluster
   */
  async function handleClusterChange() {
    const values = await valClusterFields();
    // compare with lineStyle to detect the changed object
    let category = 'marker';
    let pkey: string;
    for (const key in values) {
      if (key == 'titleField' || key == 'popup' || key == 'tooltip'){
        if (customConfig.marker[key] != values[key]) {
          customConfig.marker[key] == values[key];
          pkey = key;
          break;
        }
      } else {
        if (customConfig.marker.cluster[key] != values[key]) {
          customConfig.marker.cluster[key] = values[key];
          pkey = key;
          category = 'cluster';
          break;
        }
      }
    }

    updateConfig(category, pkey, values[pkey]);
  }

  /*
   * handle the change of tooltip
   */
  async function handleHeatmapChange() {
    const values = await valHeatmapFields();
    // compare with lineStyle to detect the changed object
    let pkey: string | undefined = 'tooltip';
    let param: any = { tooltip: {} };
    for (const key in values) {
      if (customConfig.tooltip[key] != values[key]) {
        customConfig.tooltip[key] = values[key];

        if (!customConfig.tooltip.enabled) {
          // tooltip is disabled
          param.tooltip = false;
          break;
        }

        if (key == 'enabled') {
          // in order to trigger the change
          param.tooltip.showTitle = true;
        } else {
          param.tooltip[key] = values[key];
        }
        break;
      }
    }

    if (param.tooltip && Object.keys(param.tooltip).length == 0) {
      pkey = undefined;
    }
    updateConfig(pkey, param);
  }

  /*
   * update shapeMap or colorMap
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

    if (data.target == 'markerShape') {
      let updatedShape = customConfig.marker.shapeMap.find((ele)=>{return ele.shape == data.shape});
      if (updatedShape) {
        updatedShape.label = data.label;
        updatedShape.value = realValue;
      } else {
        customConfig.marker.shapeMap.push({
          shape: data.shape,
          label: data.label,
          value: realValue,
        });
      }
    } else if (data.target == 'markerColor') {
      let updatedColor = customConfig.marker.colorMap.find((ele)=>{return ele.color == data.color});
      if (updatedColor) {
        updatedColor.label = data.label;
        updatedColor.value = realValue;
      } else {
        customConfig.marker.colorMap.push({
          color: data.color,
          label: data.label,
          value: realValue,
        });
      }
    } else {
      let updatedColor = customConfig.marker.cluster.colorMap.find((ele)=>{return ele.color == data.color});
      if (updatedColor) {
        updatedColor.label = data.label;
        updatedColor.value = realValue;
      } else {
        customConfig.marker.cluster.colorMap.push({
          color: data.color,
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
    height: 100px;
    margin-top: 5px;
    position: relative;
    color: green;
    font-weight: bold;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .preview_img:hover {
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
