"use client";
import { useState } from "react";
import { promptService } from "../../services/prompt.service";
import axios from "axios";

export function useDeletePrompt() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (childId: string, promptId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await promptService.deletePrompt(childId, promptId);
      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to delete filter");
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