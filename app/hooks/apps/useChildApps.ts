"use client";
import { useState, useEffect, useCallback } from "react";
import { appService } from "../../services/app.service";
import { App } from "../../types/api/app.types";
import axios from "axios";

export function useChildApps(childId: string) {
  const [apps, setApps] = useState<App[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!childId) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await appService.getChildApps(childId);
      setApps(res.data.data?.apps || []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch apps");
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

  return { apps, isLoading, error, refetch: fetch };
}