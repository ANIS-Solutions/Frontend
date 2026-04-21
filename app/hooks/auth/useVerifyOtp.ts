"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../../services/auth.service";
import { OtpReason } from "../../types/api/auth.types";
import axios from "axios";

export function useVerifyOtp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const mutate = async (email: string, otp: string, reason: OtpReason) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.verifyOtp({ email, otp, reason });
      router.push("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Invalid OTP");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}