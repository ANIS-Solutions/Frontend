import {
  UpdateProfilePayload,
  ChangePasswordPayload,
  UpdateProfileResponse,
  ChangePasswordResponse,
  DeactivateResponse,
} from "../types/api/profile.types";
import { ApiResponse } from "../types/api/auth.types";
import axiosInstance from "../lib/api/auth.api";

export const profileService = {
  updateProfile(data: UpdateProfilePayload) {
    return axiosInstance.patch<UpdateProfileResponse>("/parents/me", data);
  },

  changePassword(data: ChangePasswordPayload) {
    return axiosInstance.patch<ChangePasswordResponse>(
      "/parents/me/password",
      data,
    );
  },

  deactivate(data: { otp: string; reason: string }) {
    return axiosInstance.delete<DeactivateResponse>("/parents/deactivate", {
      data,
    });
  },

  confirmReactivation(token: string) {
    return axiosInstance.post<ApiResponse>(`/parents/reactivate/${token}`);
  },

  requestReactivation(email: string) {
    return axiosInstance.post<ApiResponse>("/parents/reactivate", { email });
  },
  // requestReactivation(email: string) {
  //   return axiosInstance.get<ApiResponse>("/parents/reactivate", {
  //     params: { email },
  //   });
  // },
};
