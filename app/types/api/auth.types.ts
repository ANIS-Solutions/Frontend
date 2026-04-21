export enum OtpReason {
  REGISTER = "REGISTER",
  DEACTIVATE = "DEACTIVATE",
  VERIFY_EMAIL = "VERIFY_EMAIL",
  VERIFY_OTP = "VERIFY_OTP",
  RESET_PASSWORD = "RESET_PASSWORD",
  REACTIVATE = "REACTIVATE",
}

export interface User {
  _id?: string;
  id?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  isVerified: boolean;
  isActive: boolean;
  birthDate: string;
  createdAt: string;
  updatedAt?: string;
  passwordChangedAt?: string;
}

export interface ApiResponse<T = undefined> {
  success: boolean;
  status: string;
  message: string;
  data?: T;
  accessToken?: string;
}

export interface AuthData {
  user: User;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgetPasswordData {
  email: string;
}

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}

export interface GenerateOtpData {
  email: string;
  reason: OtpReason;
}

export interface VerifyOtpData {
  email: string;
  otp: string;
  reason: OtpReason;
}
