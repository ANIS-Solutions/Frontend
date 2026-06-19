"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { usageService } from "../../services/usage.service";
import { DailyUsage } from "../../types/api/usage.types";
import axios from "axios";

export function useDailyUsage(childId: string) {
  const [usage, setUsage] = useState<DailyUsage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  const fetch = useCallback(async () => {
    if (!childId) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await usageService.getDailyUsage(childId);
      const list = res.data.data?.data || [];
      const today = new Date().toISOString().split("T")[0];
      const todayUsage = list.find((d) => d.date === today) || list[0] || null;

      if (isMounted.current) {
        setUsage(todayUsage);
      }
    } catch (err) {
      if (!isMounted.current) return;
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch usage");
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

  return { usage, isLoading, error, refetch: fetch };
}