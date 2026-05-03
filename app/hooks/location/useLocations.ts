"use client";
import { useState, useEffect, useCallback } from "react";
import { locationService } from "../../services/location.service";
import { SafeZone } from "../../types/api/location.types";
import axios from "axios";

export function useLocations(childId: string) {
  const [locations, setLocations] = useState<SafeZone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!childId) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await locationService.getLocations(childId);
      setLocations(res.data.data || []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch locations");
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

  return { locations, isLoading, error, refetch: fetch };
}