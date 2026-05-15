"use client";

import { useState, useEffect, useCallback } from "react";
import { questService } from "../../services/quest.service";
import { Quest } from "../../types/api/quest.types";
import axios from "axios";

export function useQuests(childId: string) {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!childId) return;
    setIsLoading(true);
    setError(null);

    try {
      const res = await questService.getQuests(childId);
      setQuests(res.data.data || []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch Quests");
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

  return { quests, isLoading, error, refetch: fetch };
}
