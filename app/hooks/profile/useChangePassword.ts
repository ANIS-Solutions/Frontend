"use client";
import { useState } from "react";
import { profileService } from "../../services/profile.service";
import { ChangePasswordPayload } from "../../types/api/profile.types";
import axios from "axios";

export function useChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const mutate = async (data: ChangePasswordPayload) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    setFieldErrors({});
    try {
      const res = await profileService.changePassword(data);
      setSuccess(res.data.message || "Password changed successfully!");
      return true;
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
          setError(err.response?.data?.message || "Failed to change password");
        }
      } else {
        setError("Something went wrong");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error, success, fieldErrors };
}