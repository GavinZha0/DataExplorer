<template>
  <div :class="prefixCls">
    <Popover title="" trigger="click" :overlayClassName="`${prefixCls}__overlay`">
      <Badge :dot="count" :numberStyle="numberStyle">
        <BellOutlined />
      </Badge>
      <template #content>
        <Tabs>
          <template v-for="item in listData" :key="item.key">
            <TabPane>
              <template #tab>
                {{ item.name }}
                <span v-if="item.list.length !== 0">({{ item.list.length }})</span>
              </template>
              <NoticeList :list="item.list" @title-click="onNoticeClick" />
            </TabPane>
          </template>
        </Tabs>
      </template>
    </Popover>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import { Popover, Tabs, Badge } from 'ant-design-vue';
  import { BellOutlined } from '@ant-design/icons-vue';
  import { tabListData, ListItem } from './data';
  import NoticeList from './NoticeList.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { createWebSocket } from "/@/utils/http/ws/webstomp";
  import { useUserStore } from '/@/store/modules/user';
  import { MSG_CODE, WsMsg, MlJobException, MlStepReport, MlEpochReport, MlTrialReport, MlExperReport } from '/@/api/ws/model/message';

  export default defineComponent({
    components: { Popover, BellOutlined, Tabs, TabPane: Tabs.TabPane, Badge, NoticeList },
    setup() {
      const { prefixCls } = useDesign('header-notify');
      const { createMessage } = useMessage();
      const listData = ref(tabListData);
      const newMsg = ref<Boolean>(false);
      const userStore = useUserStore();
      const userId = userStore.getUserInfo?.id;
      const dtFormatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', 
                                              year: 'numeric', hour: '2-digit', minute: '2-digit' });

      /*
      * handle websocket message
      */
      const wsMsgHandler = (msg) => {
        const wsMsg: WsMsg = JSON.parse(msg.body);
        switch (wsMsg.code){
          case MSG_CODE.ML_JOB_EXCEPTION:
            handleJobException(wsMsg.msg, wsMsg.data);
            break;
          case MSG_CODE.ML_STEP_REPORT:
            handleStepReport(wsMsg.data);
            break;
          case MSG_CODE.ML_EPOCH_REPORT:
            handleEpochReport(wsMsg.data);
            break;
          case MSG_CODE.ML_TRIAL_REPORT:
            handleTrialReport(wsMsg.data);
            break;
          case MSG_CODE.ML_EXPERIMENT_REPORT:
            handleExperReport(wsMsg.data);
            break;
          default:
            createMessage.success('Unknown ws msg: ' + wsMsg.code);
            break;
        }
      };

      if(userId){
        const channel = '/user/' + userId + '/wsReport';
        createWebSocket(userId, channel, wsMsgHandler);
      }

      const handleJobException= (msg: string, report: MlJobException) => {
        for(const cat of listData.value){
          if(cat.key == 'notice'){
            // new job started
            cat.list.unshift(
              {
                id: 'ML_ALGO_'+report.algoId+'_'+report.experId,
                avatar: '/resource/img/ml/ml-avatar.png',
                title: report.name,
                description: msg,
                color: 'red',
                datetime: dtFormatter.format(new Date())
              }
            );
            createMessage.error('ML ' + report.name + ': ' + msg, 5);
            break;
          }
        }
      };

      // include step progress
      const handleStepReport = (report: MlStepReport) => {
        const aa = report;
      };

      // update trainning progress based on epoch
      const handleEpochReport = (report: MlEpochReport) => {
        let found = false;
        for(const cat of listData.value){
          if(cat.key == 'notice'){
            for(const note of cat.list){
              if(note.id.endsWith('_' + report.experId)){
                found = true;
                note.extra = report.progress + '%';
                note.datetime = dtFormatter.format(new Date());
                break;
              }
            }
            if(!found){
              cat.list.unshift(
                {
                  id: 'ML_ALGO_'+report.algoId+'_'+report.experId,
                  avatar: '/resource/img/ml/ml-avatar.png',
                  title: report.name,
                  description: '',
                  extra: report.progress + '%',
                  color: 'blue',
                  datetime: dtFormatter.format(new Date())
                }
              );
            }
            break;
          }
        }
      };

      // include params and eval of a trial
      const handleTrialReport = (report: MlTrialReport) => {
        const aa = report;
      };

      // include all trials eval result
      const handleExperReport = (report: MlExperReport) => {
        let found = false;
        for(const cat of listData.value){
          if(cat.key == 'notice'){
            if(report.progress == 1){
              // new job started
              createMessage.success('ML ' + report.name + ' training started!', 5);
              // add a new one to notice list
              cat.list.unshift(
                {
                  // unique id
                  id: 'ML_ALGO_'+report.algoId+'_'+report.experId,
                  avatar: '/resource/img/ml/ml-avatar.png',
                  title: report.name,
                  description: '',
                  extra: '1%',
                  color: 'blue',
                  datetime: dtFormatter.format(new Date())
                }
              );
            } else if (report.progress == 100) {
              // job completed
              createMessage.success('ML ' + report.name + ' training completed!', 5);
              for(const note of cat.list){
                if(note.id.endsWith('_' + report.experId)){
                  found = true;
                  note.extra = '100%';
                  note.datetime = dtFormatter.format(new Date());
                  break;
                }
              }
              if (!found){
                // add a new one to notice list
                cat.list.unshift(
                  {
                    id: 'ML_ALGO_'+report.algoId+'_'+report.experId,
                    avatar: '/resource/img/ml/ml-avatar.png',
                    title: report.name,
                    description: '',
                    extra: '100%',
                    color: 'blue',
                    datetime: dtFormatter.format(new Date())
                  }
                );
              }
            }
            break;
          }
        }
      };


      const count = computed(() => {
        let count = 0;
        for (let i = 0; i < tabListData.length; i++) {
          count += tabListData[i].list.length;
        }
        return !!count;
      });

      function onNoticeClick(record: ListItem) {
        // markde as deleted after click
        record.titleDelete = !record.titleDelete;
        for(const cat of listData.value){
          const idx = cat.list.findIndex((ele)=>ele.id == record.id);
          if(idx>=0){
            cat.list.splice(idx, 1);
            break;
          }
        }
      }

      return {
        prefixCls,
        listData,
        count,
        onNoticeClick,
        numberStyle: {},
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-notify';

  .@{prefix-cls} {
    padding-top: 2px;

    &__overlay {
      max-width: 360px;
    }

    .ant-tabs-content {
      width: 300px;
    }

    .ant-badge {
      font-size: 18px;

      .ant-badge-multiple-words {
        padding: 0 4px;
      }

      svg {
        width: 0.9em;
      }
    }
  }
</style>
