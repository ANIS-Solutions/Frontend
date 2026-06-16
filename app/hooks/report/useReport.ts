"use client";
import { useState, useEffect, useCallback } from "react";
import { reportService } from "../../services/report.service";
import { Report } from "../../types/api/report.types";
import axios from "axios";

export function useReport(childId: string, reportId: string) {
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!childId || !reportId) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await reportService.getReport(childId, reportId);
      setReport(res.data.data || null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch report");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }, [childId, reportId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { report, isLoading, error };
}