<template>
  <div style="height: 100%;" :forceRender="true">
    <Row>
      <Col :span="24">
        <div ref="parallelContainer" style="border: 1px solid; height: 350px;">  
        </div>
      </Col>    
    </Row>
    <Row>
      <Col :span="12">
        <div ref="evalsContainer" style="border: 1px solid; height: 350px;">  
        </div>
      </Col>    
      <Col :span="12">
        <div ref="chartContainer" style="border: 1px solid; height: 350px;">  
        </div>
      </Col> 
    </Row>
  </div>
</template>
<script lang="ts" setup name="Experiment">
  import {
    Row,
    Col,
  } from 'ant-design-vue';
  import { ref, onMounted, watch } from 'vue';
  import * as echarts from 'echarts';
  import Plotly from 'plotly.js-dist';

  // properties definition of attribute panel
  // props.data is trials
  const props = defineProps({
    data: Array
  });

  const emit = defineEmits(['change']);
  const evalsContainer = ref<any>();
  const chartContainer = ref<any>(); 
  const parallelContainer = ref<any>(); 
  let chartInst: any[] = [null, null, null];

  /*
   * render all charts
   */
  const renderCharts = (data: any[]) =>{
    // reset all charts first
    chartInst.forEach((item)=>{if(item && item.dispose instanceof Function){item.dispose();}});

    
    renderEvals(data);
    renderParallel(data);

  };

   /*
   * render evals columns
   */
  const renderEvals = (data: any[]) =>{
    const mKeys = Object.keys(data[0].metrics);
    let evalCfg = {
      tooltip: {},
      legend: {right: 10},
      dataset:{
        source: Array.from(Array(mKeys.length), ()=>Array(0))
      },
      xAxis: [{type: 'category', axisLabel: { interval: 0, rotate: 30 }}],
      yAxis: [{type: 'value'}],
      series: []
    };

    
    for(const [row, trial] of data.entries()){
      evalCfg.series.push({name:row, type:'bar'});
    }
      
    for(const [row, mk] of mKeys.entries()){
      evalCfg.dataset.source[row].push(mk);
      for(const trial of data){
        evalCfg.dataset.source[row].push(Number(trial.metrics[mk]));
      }
    }

    // render chart
    chartInst[0] = echarts.init(evalsContainer.value);
    chartInst[0].setOption(evalCfg);
  };


  /*
   * render parallel cooridation
   */
  const renderParallel = (data: any[]) =>{
    let pKeys = Object.keys(data[0].params);
    const mKeys = Object.keys(data[0].metrics);

    if(data[0].args?.length>0){
      // user specified training parameters
      pKeys = data[0].args;
    }

    let dimIdx = 0;
    let dimKeys: String[] = [];
    const parallelCfg = {
      dataset:{
        source: Array.from(Array(data.length), ()=>Array(0))
      },
      legend: {
        data: mKeys,
        right: 10,
        selectedMode: 'single'
      },
      tooltip: {},
      parallelAxis: [],
      series: []
    };

    // build parallel config
    for(const key of pKeys){
      let isCategory = false;
      // add it as dim if this parameter has more than one unique value
      dimKeys.push(key);
      parallelCfg.parallelAxis.push({dim: dimIdx, name: key, nameLocation: 'start'});
      let pValues: any[] = [];
      for(const [row, trial] of data.entries()){
        // add values to data source
        if(isNaN(Number(trial.params[key]))){
          isCategory = true;
          parallelCfg.dataset.source[row].push(trial.params[key]);
          pValues.push(trial.params[key]);
        } else {
          parallelCfg.dataset.source[row].push(Number(trial.params[key]));
          pValues.push(Number(trial.params[key]));
        }
      }

      if(isCategory){
        parallelCfg.parallelAxis[dimIdx]['type'] = 'category';
        // unique values
        parallelCfg.parallelAxis[dimIdx]['data'] = [...new Set(pValues)];
      }
      dimIdx += 1;
    }

    // add metric as last column
    for(const [idx, key] of mKeys.entries()){
      dimKeys.push(key);
      for(const [row, trial] of data.entries()){
        parallelCfg.dataset.source[row].push(Number(trial.metrics[key]));
      }

      parallelCfg.series.push({name: key, type: 'parallel', lineStyle: {width: 2}});
      if(idx==0){
        parallelCfg.parallelAxis.push({dim: dimIdx, name: key, nameLocation: 'start'});
      }
    }
    parallelCfg.dataset.source.unshift(dimKeys);

    // render chart
    chartInst[2] = echarts.init(parallelContainer.value);
    chartInst[2].setOption(parallelCfg);
    chartInst[2].on('legendselectchanged', function(params) {
      // get current option and update it
      let parrelOpt = chartInst[2].getOption();
      //opt.legend[0].selected[params.name] = true;
      let header: [] = parrelOpt.dataset[0].source[0];
      let dimIdx = header.findIndex((ele)=>ele == params.name);
      // update last dim to use select column
      parrelOpt.parallelAxis[parrelOpt.parallelAxis.length-1].dim = dimIdx;
      parrelOpt.parallelAxis[parrelOpt.parallelAxis.length-1].name = params.name;
      chartInst[2].setOption(parrelOpt);

      /*
      // trigger other panels
      let evalOpt = chartInst[0].getOption();
      for(const it in evalOpt.legend[0].selected){
        evalOpt.legend[0].selected[it] = false;
      }
      evalOpt.legend[0].selected[params.name] = true;
      chartInst[0].setOption(evalOpt);
      */

      return chartInst[2];
    });
  };

  /*
   * plot evals columns
   */
   const plotEvals = (data: any[]) =>{
    const mKeys = Object.keys(data[0].metrics);
    let evalCfg = [];

    
    for(const [row, trial] of data.entries()){
      let trace = {
        name: row,
        type: 'bar',
        x: [],
        y: []
      };
      for(const mk of mKeys){
        trace.x.push(mk);
        trace.y.push(Number(trial.metrics[mk]));
      }
      evalCfg.push(trace);
    }

    // render chart
    Plotly.newPlot(evalsContainer.value, evalCfg, {}, {displayModeBar: false});
  };


  /*
   * plot parallel cooridation
   */
   const plotParallel = (data: any[]) =>{
    let pKeys = Object.keys(data[0].params);
    const mKeys = Object.keys(data[0].metrics);

    if(data[0].args?.length>0){
      // user specified training parameters
      pKeys = data[0].args;
    }

    let dimKeys: String[] = [];
    const parallelCfg = {
      type: 'parcoords',
      line: {
        color: 'blue'
      },
      dimensions: []
    };

    // build parallel config
    for(const key of pKeys){
      let isCategory = false;
      // add it as dim if this parameter has more than one unique value
      dimKeys.push(key);
      let dimItem = {label:key, values:[]};
      for(const trial of data){
        // add values to data source
        if(isNaN(Number(trial.params[key]))){
          isCategory = true;
          dimItem.values.push(trial.params[key]);
        } else {
          dimItem.values.push(Number(trial.params[key]));
        }
      }

      if(isCategory){
        // unique values
        dimItem.values = [...new Set(dimItem.values)];
        dimItem.tickvals = [...new Array(dimItem.values.length).keys()];
      }
      parallelCfg.dimensions.push(dimItem);
    }

    // add metric as last column
    for(const key of mKeys){
      dimKeys.push(key);
      let dimItem = {label:key, values:[]};
      for(const trial of data){
        dimItem.values.push(Number(trial.metrics[key]));
      }
      parallelCfg.dimensions.push(dimItem);
      
    }

    // render chart
    Plotly.newPlot(parallelContainer.value, [parallelCfg]);
  };


  // watch props change
  watch(props, (newVal) => {
    if(newVal.data){
      renderCharts(newVal.data);
    }
  },{immediate:true}) 

  onMounted(() => {
    // do nothing
  });

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
