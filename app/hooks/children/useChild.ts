"use client";
import { useState, useEffect } from "react";
import { childService } from "../../services/child.service";
import { Child } from "../../types/api/child.types";
import axios from "axios";

export function useChild(childId: string) {
  const [child, setChild] = useState<Child | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!childId) return;

    const fetch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await childService.getChild(childId);
        setChild(res.data.data || null);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch child");
        } else {
          setError("Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [childId]);

  return { child, isLoading, error };
}