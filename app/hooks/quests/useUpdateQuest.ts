"use client";
import { useState } from "react";
import { questService } from "../../services/quest.service";
import { UpdateQuestPayload } from "../../types/api/quest.types";
import axios from "axios";

export function useUpdateQuest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (
    childId: string,
    questId: string,
    data: UpdateQuestPayload
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await questService.updateQuest(childId, questId, data);
      return res.data.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to update quest");
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