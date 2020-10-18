/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskTypeName, PayoutType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetTaskTypes
// ====================================================

export interface GetTaskTypes_taskTypes {
  __typename: "TaskType";
  id: number;
  name: string;
  title: string;
  description: string;
  averageCost: number;
  companyCommission: number;
  type: TaskTypeName;
  ready: boolean;
  /**
   * Minutes that implementor has to complete the task
   */
  implementationPeriod: number;
  payoutType: PayoutType;
}

export interface GetTaskTypes {
  taskTypes: GetTaskTypes_taskTypes[];
}
