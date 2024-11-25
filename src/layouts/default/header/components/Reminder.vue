<template>
  <div style="height: 100%; width: 100%;" :forceRender="true">
    <Alert v-if="data.msg && data.avatar" :message="data.msg" :type="data.type" show-icon closable style="font-size: medium;">
      <template #icon>
        <Avatar v-if="data.avatar" :src="data.avatar" size="small"/>
      </template>
  </Alert>
  <Alert v-else-if="data.msg" :message="data.msg" :type="data.type" show-icon closable style="font-size: medium;">
  </Alert>
  </div>
</template>

<script lang="ts" setup name="Reminder">
  import { Alert, Avatar } from 'ant-design-vue';
  import { ref, onMounted } from 'vue';
  import { emitter } from '/@/utils/event';
  import { useUserStore } from '/@/store/modules/user';
  import { createWebSocket } from "/@/utils/http/ws/webstomp";
  import { MSG_CODE, WsMsg, MlJobReport, MlStepReport, MlEpochReport, MlTrialReport, MlExperReport } from '/@/api/ws/model/message';

  const userStore = useUserStore();
  const userId = userStore.getUserInfo?.id;
  const data = ref<any>({type: '', msg:'', avatar: ''});

  /*
  * handle websocket message
  */
  const wsMsgHandler = (msg) => {
    const wsMsg: WsMsg = JSON.parse(msg.body);
    if(wsMsg.data['algoId']){
      data.value.avatar = '/resource/img/ml/ml-avatar.png';
    } else {
      data.value.avatar = null;
    }
    switch (wsMsg.code){
      case MSG_CODE.ML_JOB_REPORT:
        let reportJ: MlJobReport = wsMsg.data;
        if(reportJ.detail){
          data.value.type = 'error';
          data.value.msg = reportJ.name + ': error!';
        } else {
          if(reportJ.progress && reportJ.progress==1){
            data.value.type = 'success';
            data.value.msg = reportJ.name + ': job started!';
          } else if(reportJ.progress && reportJ.progress==100){
            // data.value.type = 'success';
            // data.value.msg = reportJ.name + ': job completed!';
          }
        }
        break;
      case MSG_CODE.ML_STEP_REPORT:
        let reportS: MlStepReport = wsMsg.data;
        break;
      case MSG_CODE.ML_EPOCH_REPORT:
        let reportP: MlEpochReport = wsMsg.data;
        data.value.type = 'info';
        data.value.msg = reportP.name + ': progress ' + reportP.progress + '%';
        break;
      case MSG_CODE.ML_TRIAL_REPORT:
        let reportT: MlTrialReport = wsMsg.data;
        data.value.type = 'info';
        data.value.msg = reportT.name + ': progress ' + reportT.progress + '%';
        break;
      case MSG_CODE.ML_EXPERIMENT_REPORT:
        let reportM: MlExperReport = wsMsg.data;
        
        if(reportM.progress == 1){
          // new job started
          data.value.type = 'success';
          data.value.msg = reportM.name + ': training started!';
        } else if (reportM.progress == 100) {
          if(reportM.rate == 100){
            // job completed
            data.value.type = 'success';
          } else {
            // job completed with failure
            data.value.type = 'error';
          }
          data.value.msg = reportM.name + ': training completed! Success rate ' + reportM.rate + '%';
        }
        break;
      default:
        break;
    }
  };

  onMounted(() => {
    emitter.on('INFO', (evt) => {
      data.value.type = 'info';
      data.value.avatar = null;
      data.value.msg = evt;
    });

    emitter.on('WARNING', (evt) => {
      data.value.type = 'warning';
      data.value.avatar = null;
      data.value.msg = evt;
    });

    emitter.on('ERROR', (evt) => {
      data.value.type = 'error';
      data.value.avatar = null;
      data.value.msg = evt;
    });

    emitter.on('SUCCESS', (evt) => {
      data.value.type = 'success';
      data.value.avatar = null;
      data.value.msg = evt;
    });

    emitter.on('EXCEPTION', (evt) => {
      data.value.type = 'error';
      data.value.avatar = null;
      data.value.msg = evt;
    });
    
    if(userId){
      const channel = '/user/' + userId + '/wsReport';
      createWebSocket(userId, channel, wsMsgHandler);
    }
  });
</script>

<style lang="less" scoped>

</style>