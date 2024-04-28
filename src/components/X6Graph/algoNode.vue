<template>
  <div class="node">
    <div class="main">
      <Avatar shape="square" :size="26" :src='"/resource/img/ml/" + nodeData.type + ".png"' />
      <span class="title">{{nodeData.title}}</span>
      <span class="progress">
        <Progress type="circle" :percent="nodeData.progress" :width="26" :status="nodeData.status" :format="(pct) => pct==0?'':pct" />
      </span>
    </div>
    <div class="ext">
      <span class="text">{{nodeData.info}}</span>
    </div>
  </div>
</template>

<script lang="ts" setup name="AlgoNode">
  import { ref, onMounted, inject } from 'vue';
  import { Avatar, Progress } from 'ant-design-vue';
  import { Graph, Node } from '@antv/x6';

  interface nodeDataType {
    type: String, // source, algo, eval...
    title: String, // SVM, DTree, LinearRegression, KNN...
    progress: Number, // [0, 100]
    status: String | undefined, // "success" | "normal" | "active" | "exception" | undefined
    info: String | undefined
  }

  const emit = defineEmits(['change']);
  const getGraph: Function | undefined = inject<Function>('getGraph');
  const getNode: Function | undefined = inject<Function>('getNode');
  const nodeData = ref<nodeDataType>({type: 'ml', title: 'Algo', progress: 0, status: undefined, info: undefined});

  onMounted((): void => {
    if(getNode != undefined){
      const node: Node = getNode();
      // get initial data of node
      nodeData.value = node.getData();
      if(nodeData.value.info && nodeData.value.info.length>0){
        node.prop('size/height', 60);
      } else {
        node.prop('size/height', 30);
      }
      
      node.on('change:data', ({current}) => {
        // get updated data
        if(current){
          nodeData.value = {...nodeData.value, ...current};
          if(nodeData.value.info && nodeData.value.info.length>0){
            const node: Node = getNode();
            node.prop('size/height', 60);
          } else {
            const node: Node = getNode();
            node.prop('size/height', 30);
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
  width: 120px;
  font-size: 12px;
  font-weight: bold;
}

.node .main .progress {
  animation: spin 5s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes running {
  to {
    stroke-dashoffset: -1000;
  }
}

.node .ext {
  align-items: center;
}

.node .ext .text {
  align-items: center;
  text-align: left;
  margin-left: 3px;
  color: #666;
  font-size: 10px;
}


.x6-node-selected .node {
  border-color: #1890ff;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #d4e8fe;
}

.x6-edge:hover {
  stroke: #1890ff;
  stroke-width: 1px;
}

.x6-edge-selected .edge {
  stroke: #1890ff;
  stroke-width: 1.5px !important;
}
</style>