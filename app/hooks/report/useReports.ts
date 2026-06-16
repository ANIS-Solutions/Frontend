"use client";
import { useState, useEffect, useCallback } from "react";
import { reportService } from "../../services/report.service";
import { Report } from "../../types/api/report.types";
import axios from "axios";

export function useReports(childId: string) {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!childId) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await reportService.getReports(childId);
      setReports(res.data.data?.reports || []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch reports");
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

  return { reports, isLoading, error, refetch: fetch };
}