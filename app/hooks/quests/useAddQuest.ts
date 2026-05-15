"use client";
import { useState } from "react";
import { questService } from "../../services/quest.service";
import { AddQuestPayload } from "../../types/api/quest.types";
import axios from "axios";

export function useAddQuest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const mutate = async (childId: string, data: AddQuestPayload) => {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});
    try {
      const res = await questService.addQuest(childId, data);
      return res.data.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverErrors = err.response?.data?.errors;
        if (serverErrors && serverErrors.length > 0) {
          const mapped: Record<string, string> = {};
          serverErrors.forEach((e: { field: string; message: string }) => {
            const key = e.field.replace("body.", "");
            mapped[key] = e.message;
          });
          setFieldErrors(mapped);
        } else {
          setError(err.response?.data?.message || "Failed to add quest");
        }
      } else {
        setError("Something went wrong");
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error, fieldErrors };
}