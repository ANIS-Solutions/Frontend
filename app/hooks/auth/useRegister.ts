"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../../services/auth.service";
import { RegisterData } from "../../types/api/auth.types";
import { OtpReason } from "../../types/api/auth.types";
import axios from "axios";

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const mutate = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});
    try {
      await authService.register(data);

      await authService.generateOtp({
        email: data.email,
        reason: OtpReason.REGISTER,
      });

      router.push(`/verify-otp?email=${data.email}`);
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
          setError(err.response?.data?.message || "Registration failed");
        }
      } else {
        setError("Registration failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error, fieldErrors };
}