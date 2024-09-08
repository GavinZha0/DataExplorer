// PATH definition
export enum  MSG_CODE {
  ML_STEP_REPORT = 1,
  ML_EPOCH_REPORT,
  ML_TRIAL_REPORT,
  ML_EXPERIMENT_REPORT,
  ML_JOB_EXCEPTION = 5,
}

export interface WsMsg {
    uid: number;
    code: number;
    msg: string;
    data: string;
  }

    // ML_JOB_EXCEPTION
export interface MlJobException {
  name: string;
  algoId: number,
  experId: number,
  detail: string
};

  // ML_STEP_REPORT
export interface MlStepReport {
  algoId: number,
  experId: number,
  trialId: string,
  epoch: number,
  step: number,
  progress: number,
  params: any,
  eval: any,
  duration: number
};

// ML_EPOCH_REPORT
export interface MlEpochReport {
  name: string;
  algoId: number,
  experId: number,
  trialId: string,
  epoch: number,
  progress: number,
  params: any,
  eval: any,
  duration: number
};
 
// ML_TRIAL_REPORT
export interface MlTrialReport {
  name: string;
  algoId: number,
  experId: number,
  trialId: string,
  progress: number,
  params: any,
  eval: any,
  duration: number
};

// ML_EXPERIMENT_REPORT
export interface MlExperReport {
  name: string;
  algoId: number,
  experId: number,
  progress: number,
  trials: trailInfo[]
};

interface trailInfo {
  id: string,
  params: any,
  eval: any
}