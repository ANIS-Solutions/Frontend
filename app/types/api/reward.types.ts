import { ApiResponse } from "./auth.types";

export type RedemptionType = "ONCE" | "MULTIPLE";

export interface Reward {
  id: string;
  childId: string;
  name: string;
  description: string;
  pointsCost: number;
  redemptionType: RedemptionType;
  maxRedemptions: number;
  timesRedeemed: number;
  deadline: string;
}

export interface AddRewardPayload {
  name: string;
  description: string;
  pointsCost: number;
  redemptionType: RedemptionType;
  maxRedemptions?: number;
  deadline: string;
}

export interface UpdateRewardPayload {
  name?: string;
  description?: string;
  pointsCost?: number;
  redemptionType?: RedemptionType;
  maxRedemptions?: number;
  deadline?: string;
}

export type GetRewardsResponse = ApiResponse<Reward[]>;
export type GetRewardResponse = ApiResponse<Reward>;
export type AddRewardsResponse = ApiResponse<Reward>;
export type UpdateRewardsResponse = ApiResponse<Reward>;
export type DeleteRewardsResponse = ApiResponse;
