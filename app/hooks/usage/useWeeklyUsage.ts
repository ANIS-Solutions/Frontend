"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { usageService } from "../../services/usage.service";
import { DailyUsage } from "../../types/api/usage.types";
import axios from "axios";

export function useWeeklyUsage(childId: string) {
  const [weekUsage, setWeekUsage] = useState<DailyUsage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  const fetch = useCallback(async () => {
    if (!childId) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await usageService.getWeeklyUsage(childId);
      if (isMounted.current) {
        setWeekUsage(res.data.data || []);
      }
    } catch (err) {
      if (!isMounted.current) return;
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch weekly usage");
      } else {
        setError("Something went wrong");
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [childId]);

  useEffect(() => {
    isMounted.current = true;

    const timer = setTimeout(() => {
      fetch();
    }, 0);

    return () => {
      isMounted.current = false;
      clearTimeout(timer);
    };
  }, [fetch]);

  return { weekUsage, isLoading, error, refetch: fetch };
}