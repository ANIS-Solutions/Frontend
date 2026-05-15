"use client";
import { useState } from "react";
import { questService } from "../../services/quest.service";
import axios from "axios";

export function useQuestAction() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (
    action: "start" | "cancel" | "complete" | "stop",
    childId: string,
    questId: string,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const actions = {
        start: () => questService.startQuest(childId, questId),
        cancel: () => questService.cancelQuest(childId, questId),
        complete: () => questService.completeQuest(childId, questId),
        stop: () => questService.stopQuest(childId, questId),
      };
      await actions[action]();
      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Action failed");
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
