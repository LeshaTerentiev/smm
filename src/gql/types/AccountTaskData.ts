/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AccountTaskData
// ====================================================

export interface AccountTaskData_taskType {
  __typename: "TaskType";
  id: number;
  name: string;
  title: string;
  description: string;
  averageCost: number;
}

export interface AccountTaskData_instagramCommentTask_post {
  __typename: "InstagramPost";
  displayUrl: string;
  description: string | null;
  ownerUsername: string;
}

export interface AccountTaskData_instagramCommentTask {
  __typename: "AvailableInstagramCommentTask";
  postUrl: string;
  post: AccountTaskData_instagramCommentTask_post | null;
}

export interface AccountTaskData {
  __typename: "AccountTask";
  id: number;
  description: string;
  status: string;
  rating: number;
  reward: number;
  taskExpiredAt: any;
  /**
   * Date of deadline
   */
  accountTaskExpiredAt: any;
  bonusRate: number;
  bonus: number;
  taskType: AccountTaskData_taskType;
  instagramCommentTask: AccountTaskData_instagramCommentTask;
}
