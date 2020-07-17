/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TaskData
// ====================================================

export interface TaskData_taskType {
  __typename: 'TaskType';
  id: number;
  name: string;
  title: string;
  description: string;
  averageCost: number;
}

export interface TaskData_instagramCommentTask_post {
  __typename: 'InstagramPost';
  id: number;
  displayUrl: string;
  description: string | null;
}

export interface TaskData_instagramCommentTask {
  __typename: 'InstagramCommentTask';
  id: number;
  postUrl: string;
  post: TaskData_instagramCommentTask_post | null;
}

export interface TaskData {
  __typename: 'Task';
  id: number;
  description: string;
  verified: boolean;
  expiredAt: any;
  totalBudget: number;
  currentBudget: number;
  bonusRate: number;
  taskType: TaskData_taskType | null;
  instagramCommentTask: TaskData_instagramCommentTask | null;
}
