<template>
  <div class="node">
    <div class="main">
      <Avatar shape="square" :size="26" :src='"/resource/img/ml/" + nodeData.type + ".png"' />
      <span class="title">{{nodeData.title}}</span>
      <span class="progress">
        <Button shape="round" size="small" @click="handleChartExpand">
          {{ lastValue }}
        </Button>
      </span>
    </div>
    <div class="echart" id="echart">
    </div>
  </div>
</template>

<script lang="ts" setup name="ChartNode">
  import { ref, onMounted, inject } from 'vue';
  import { Avatar, Button } from 'ant-design-vue';
  import { Node } from '@antv/x6';
  import * as echarts from 'echarts';

  interface nodeDataType {
    type: String, // source, algo, eval...
    title: String, // SVM, DTree, LinearRegression, KNN...
    progress: Number, // [0, 100]
    status: String | undefined, // "success" | "normal" | "active" | "exception" | undefined
    data: any
  }

  const emit = defineEmits(['change']);
  const getGraph: Function | undefined = inject<Function>('getGraph');
  const getNode: Function | undefined = inject<Function>('getNode');
  const nodeData = ref<nodeDataType>({type: 'monitor', title: 'Metrics', data: {x: [], y:[]}});
  const lastValue = ref<Number|undefined>();
  let myChart = undefined;
  const myOption = ref<any>({xAxis: {type: 'category', data: []}, yAxis: {type: 'value'}, 
                              series: {type: 'line', smooth: true, showSymbol: false, data:[]},
                              grid: {left: 30, top: 10, right: 10, bottom: 30}});


   /*
   * show/hide chart
   */
  const handleChartExpand = () =>{
    // get node and current size
    const node: Node = getNode();
    const nodeSize = node.getProp('size');

    if(nodeSize?.height>40){
      // hide chart
      node.prop('size/height', 33);
      myChart.resize({width: nodeSize?.width, height: 1});
    } else if(nodeData.value.data && nodeData.value.data.y.length>0){
      // show chart
      node.prop('size/height', 120);
      myChart.resize({width: nodeSize?.width, height: 90});
    }
  };

  /*
   * initialize echarts
   */
  onMounted((): void => {
    if(getNode != undefined){
      const node: Node = getNode();
      // get initial data
      nodeData.value = node.getData();
      if(nodeData.value.data.y.length){
        lastValue.value = nodeData.value.data.y[nodeData.value.data.y.length-1];
      }

      if(!myChart){
        // init echarts
        myChart = echarts.init(document.getElementById('echart'));
      } 
          
      if(myChart){
        // build chart
        myOption.value.xAxis.data = nodeData.value.data.x;
        myOption.value.series.data = nodeData.value.data.y;
        myChart.setOption(myOption.value);

        // show chart when it has data
        const nodeSize = node.getProp('size');
        if(nodeData.value.data.y.length){
          node.prop('size/height', 120);
          myChart.resize({width: nodeSize?.width, height: 90});
        } else {
          node.prop('size/height', 31);
          myChart.resize({width: nodeSize?.width, height: 1});
        }
      }
          
      node.on('change:data', ({current}) => {
        // get updated data
        if(current && current.data){
          nodeData.value.data.x.push(current.data.x);
          nodeData.value.data.y.push(current.data.y);
          lastValue.value = current.data.y;

          if(!myChart){
            myChart = echarts.init(document.getElementById('echart'));
          } 
          
          if(myChart){
            myOption.value.xAxis.data = nodeData.value.data.x;
            myOption.value.series.data = nodeData.value.data.y;
            myChart.setOption(myOption.value);
          }
        }
      });

      
    }
  });

</script>

<style lang="less" scoped>
  .node {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #ced5c2;
  border-left: 4px solid #5F95FF;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.node .main {
  margin-top: 2px;
  height: 30px;
  border-bottom: gray 1px dotted;
}

.node .main .title {
  display: inline-block;
  align-items: center;
  text-align: center;
  width: 105px;
  font-size: 12px;
  font-weight: bold;
}

.node .echart {
  width: 100%;
  height: 90px;
}

.x6-node-selected .node {
  border-color: #1890ff;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #d4e8fe;
}
</style>