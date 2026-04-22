"use client";
import { useState } from "react";
import { childService } from "../../services/child.service";
import { AddChildPayload } from "../../types/api/child.types";
import axios from "axios";

export function useAddChild() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const mutate = async (data: AddChildPayload) => {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});
    try {
      const res = await childService.addChild(data);
      return {
        ...res.data.data,
        qrcode: res.data.qrcode,
        pairToken: res.data.devInfo?.pairToken,
      };
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
          setError(err.response?.data?.message || "Failed to add child");
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