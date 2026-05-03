"use client";
import { useState } from "react";
import { profileService } from "../../services/profile.service";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/auth.service";
import { OtpReason } from "../../types/api/auth.types";
import axios from "axios";

export function useDeactivate() {
  const [isLoading, setIsLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, logout } = useAuth();

  const sendOtp = async () => {
    if (!user?.email) return false;
    setOtpLoading(true);
    setError(null);
    try {
      await authService.generateOtp({
        email: user.email,
        reason: OtpReason.DEACTIVATE,
      });
      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to send OTP");
      } else {
        setError("Something went wrong");
      }
      return false;
    } finally {
      setOtpLoading(false);
    }
  };

  const mutate = async (otp: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await profileService.deactivate({ otp, reason: "DEACTIVATE" });
      logout();
      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to deactivate");
      } else {
        setError("Something went wrong");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendOtp, mutate, isLoading, otpLoading, error };
}