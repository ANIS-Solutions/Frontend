import axiosInstance from "../lib/api/auth.api";
import {
  AddRewardPayload,
  GetRewardsResponse,
  GetRewardResponse,
  AddRewardsResponse,
  DeleteRewardsResponse,
  UpdateRewardPayload,
  UpdateRewardsResponse,
} from "../types/api/reward.types";

export const rewardService = {
  // /children/{childId}/rewards
  getRewards(childId: string) {
    return axiosInstance.get<GetRewardsResponse>(
      `/children/${childId}/rewards`,
    );
  },

  // /children/{childId}/rewards/{rewardId}
  getReward(childId: string, rewardId: string) {
    return axiosInstance.get<GetRewardResponse>(
      `/children/${childId}/rewards/${rewardId}`,
    );
  },

  // /children/{childId}/rewards
  addReward(childId: string, data: AddRewardPayload) {
    return axiosInstance.post<AddRewardsResponse>(
      `/children/${childId}/rewards`,
      data,
    );
  },

  // /children/{childId}/rewards/{rewardId}
  updateReward(childId: string, rewardId: string, data: UpdateRewardPayload) {
    return axiosInstance.patch<UpdateRewardsResponse>(
      `/children/${childId}/rewards/${rewardId}`,
      data,
    );
  },

  // /children/{childId}/rewards/{rewardId}
  deleteReward(childId: string, rewardId: string) {
    return axiosInstance.delete<DeleteRewardsResponse>(
      `/children/${childId}/rewards/${rewardId}`,
    );
  },

};
