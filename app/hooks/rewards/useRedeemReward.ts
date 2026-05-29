"use client";
import { useState } from "react";
import { rewardService } from "../../services/reward.service";
import axios from "axios";

export function useRedeemReward() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (childId: string, rewardId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await rewardService.redeemReward(childId, rewardId);
      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to redeem reward");
      } else {
        setError("Something went wrong");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}