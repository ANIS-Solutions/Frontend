//All Functions that Deals with Backend auth endpoints
import axiosInstance from "../lib/api/auth.api";
import {
  ApiResponse,
  AuthData,
  ForgetPasswordData,
  GenerateOtpData,
  LoginData,
  RegisterData,
  ResetPasswordData,
  User,
  VerifyOtpData,
} from "../types/api/auth.types";

export const authService = {
  register(data: RegisterData) {
    return axiosInstance.post<ApiResponse<AuthData>>("/auth/register", data);
  },

  login(data: LoginData) {
    return axiosInstance.post<ApiResponse<AuthData>>("/auth/login", data);
  },

  logout() {
    return axiosInstance.post<ApiResponse>("/auth/logout");
  },

  generateOtp(data: GenerateOtpData) {
    return axiosInstance.post<ApiResponse>("/auth/generate-otp", data);
  },

  verifyOtp(data: VerifyOtpData) {
    return axiosInstance.post<ApiResponse>("/auth/verify-otp", data);
  },

  forgotPassword(data: ForgetPasswordData) {
    return axiosInstance.post<ApiResponse>("/auth/password/forgot", data);
  },

  resetPassword(token: string, data: ResetPasswordData) {
    return axiosInstance.patch<ApiResponse>(
      `/auth/password/reset/${token}`,
      data,
    );
  },

  refreshToken() {
    return axiosInstance.post<ApiResponse<{ accessToken: string }>>(
      "/auth/refresh-token",
    );
  },

  getMe(token?: string) {
    return axiosInstance.get<ApiResponse<User>>("/parents/me", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
};
