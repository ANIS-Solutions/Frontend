"use client";
import { useState, useEffect, useCallback } from "react";
import { childService } from "../../services/child.service";
import { Child } from "../../types/api/child.types";
import axios from "axios";

export function useChildren() {
  const [children, setChildren] = useState<Child[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await childService.getChildren();
      setChildren(res.data.data || []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch children");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { children, isLoading, error, refetch: fetch };
}
