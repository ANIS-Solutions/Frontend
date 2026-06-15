"use client";
import { useState } from "react";
import { promptService } from "../../services/prompt.service";
import { AddPromptPayload } from "../../types/api/prompt.types";
import axios from "axios";

export function useAddPrompt() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const mutate = async (childId: string, data: AddPromptPayload) => {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});
    try {
      const res = await promptService.addPrompt(childId, data);
      return res.data.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverErrors = err.response?.data?.errors;
        if (serverErrors?.length > 0) {
          const mapped: Record<string, string> = {};
          serverErrors.forEach((e: { field: string; message: string }) => {
            mapped[e.field.replace("body.", "")] = e.message;
          });
          setFieldErrors(mapped);
        } else {
          setError(err.response?.data?.message || "Failed to add filter");
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