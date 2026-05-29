"use client";
import { useState } from "react";
import { rewardService } from "../../services/reward.service";
import axios from "axios";

export function useDeleteReward() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (childId: string, rewardId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await rewardService.deleteReward(childId, rewardId);
      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to delete reward");
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