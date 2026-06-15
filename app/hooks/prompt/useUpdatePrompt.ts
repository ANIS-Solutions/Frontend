"use client";
import { useState } from "react";
import { promptService } from "../../services/prompt.service";
import { UpdatePromptPayload } from "../../types/api/prompt.types";
import axios from "axios";

export function useUpdatePrompt() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (
    childId: string,
    promptId: string,
    data: UpdatePromptPayload
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await promptService.updatePrompt(childId, promptId, data);
      return res.data.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to update filter");
      } else {
        setError("Something went wrong");
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}