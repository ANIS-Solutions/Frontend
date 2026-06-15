"use client";
import { useState } from "react";
import { notificationService } from "../../services/notification.service";
import axios from "axios";

export function useClearNotifications() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await notificationService.clearAll();
      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to clear notifications");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}