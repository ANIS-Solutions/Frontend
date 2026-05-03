import { ApiResponse } from "./auth.types";

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  birthDate?: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  isActive: boolean;
}

export interface UpdateProfileData {
  updatedUser: UpdateUser;
}

export type UpdateProfileResponse = ApiResponse<UpdateProfileData>;
export type ChangePasswordResponse = ApiResponse;
export type DeactivateResponse = ApiResponse;
