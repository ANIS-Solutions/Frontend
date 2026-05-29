"use client";
import { useState, useEffect, useCallback } from "react";
import { rewardService } from "../../services/reward.service";
import { Reward } from "../../types/api/reward.types";
import axios from "axios";

export function useRewards(childId: string) {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!childId) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await rewardService.getRewards(childId);
      setRewards(res.data.data || []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch rewards");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }, [childId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { rewards, isLoading, error, refetch: fetch };
}