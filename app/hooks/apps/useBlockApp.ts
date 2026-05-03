"use client";
import { useState } from "react";
import { appService } from "../../services/app.service";
import axios from "axios";

export function useBlockApp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (
    packageId: string,
    childId: string,
    isBlocked: boolean
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      await appService.blockApp(packageId, childId, { isBlocked });
      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to block app");
      } else {
        setError("Something went wrong");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}