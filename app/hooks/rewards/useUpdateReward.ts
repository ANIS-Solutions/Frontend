"use client";
import { useState } from "react";
import { rewardService } from "../../services/reward.service";
import { UpdateRewardPayload } from "../../types/api/reward.types";
import axios from "axios";

export function useUpdateReward() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (
    childId: string,
    rewardId: string,
    data: UpdateRewardPayload,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await rewardService.updateReward(childId, rewardId, data);
      return res.data.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to update reward");
      } else {
        setError("Something went wrong");
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}