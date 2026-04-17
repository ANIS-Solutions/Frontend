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

export interface User {
  id: string;
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
  refreshToken?: string;
}

export interface AuthResponse {
  success: boolean;
   status: string;
  message: string;
  data: {
    user: User;
  };
  accessToken: string;
}

export interface ForgetPasswordData {
  email: string;
}

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}

export type OtpReason =
  | "REGISTER"
  | "DEACTIVATE"
  | "VERIFY_EMAIL"
  | "VERIFY_OTP"
  | "RESET_PASSWORD"
  | "REACTIVATE";

export interface GenerateOtpData {
  email: string;
  reason: OtpReason;
}

export interface VerifyOtpData {
  email: string;
  otp: string;
  reason: OtpReason;
}
