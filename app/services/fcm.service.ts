import axiosInstance from "../lib/api/auth.api";


export async function registerFcmToken(fcmToken: string) {
  return axiosInstance.patch("/auth/fcm-token", { fcmToken, platform: "web" });
}