//All Functions that Deals with Backend auth endpoints

import { apiRequest } from "../lib/api/auth.api";
import {
  AuthResponse,
  ForgetPasswordData,
  GenerateOtpData,
  LoginData,
  RegisterData,
  ResetPasswordData,
  VerifyOtpData,
} from "../types/auth.types";

export const authService = {
  register(data: RegisterData) {
    return apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: data,
    });
  },

  login(data: LoginData) {
    return apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: data,
    });
  },

  logout(token: string) {
    return apiRequest("/auth/logout", {
      method: "POST",
      token,
    });
  },

  // generateOtp(data: GenerateOtpData, token: string) {
  //   // const params = new URLSearchParams({
  //   //   email: data.email,
  //   //   reason: data.reason,
  //   // });
  //   return apiRequest("/auth/otp", {
  //     method: "GET",
  //     body: data,
  //     token,
  //   });
  // },

  generateOtp(data: GenerateOtpData, token: string) {
    return apiRequest("/auth/otp", {
      method: "GET",
      params: {
        email: data.email,
        reason: data.reason,
      },
      token,
    });
  },



  getMe: async (token: string) => {
    const res = await fetch("/parents/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch user");

    return res.json();
  },

  verifyOtp(data: VerifyOtpData) {
    return apiRequest("/auth/otp", {
      method: "POST",
      body: data,
    });
  },

  forgotPassword(data: ForgetPasswordData) {
    return apiRequest("/auth/password/forgot", {
      method: "POST",
      body: data,
    });
  },

  resetPassword(token: string, data: ResetPasswordData) {
    return apiRequest(`/auth/password/reset/${token}`, {
      method: "PATCH",
      body: data,
    });
  },

  refreshToken() {
    return apiRequest<{ accessToken: string }>("/auth/refresh-token", {
      method: "POST",
    });
  },
};
