"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";
import { LoginData, User } from "../../types/api/auth.types";
import axios from "axios";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const router = useRouter();

  const mutate = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authService.login(data);
      const token = res.data.accessToken;

      if (!token) {
        setError("Something went wrong, please try again");
        return;
      }

      const meRes = await authService.getMe(token);
      const user = meRes.data.data as User;

      if (!user) {
        setError("Something went wrong, please try again");
        return;
      }

      login(user, token);
      router.push("/dashboard/children");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Login failed");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { mutate, isLoading, error };
}
