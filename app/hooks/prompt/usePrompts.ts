"use client";
import { useState, useEffect, useCallback } from "react";
import { promptService } from "../../services/prompt.service";
import { Prompt } from "../../types/api/prompt.types";
import axios from "axios";

export function usePrompts(childId: string) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // setPrompts((res.data.data as unknown as Prompt[]) || []);
  const fetch = useCallback(async () => {
    if (!childId) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await promptService.getPrompts(childId);
      setPrompts((res.data.data as unknown as Prompt[]) || []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch filters");
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

  return { prompts, isLoading, error, refetch: fetch };
}
