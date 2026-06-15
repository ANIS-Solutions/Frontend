import axiosInstance from "../lib/api/auth.api";
import {
  GetNotificationsResponse,
  DeleteNotificationResponse,
  ClearNotificationsResponse,
} from "../types/api/notification.types";

export const notificationService = {
  getNotifications() {
    return axiosInstance.get<GetNotificationsResponse>("/notifications");
  },

  deleteNotification(notificationId: string) {
    return axiosInstance.delete<DeleteNotificationResponse>(
      `/notifications/${notificationId}`
    );
  },

  clearAll() {
    return axiosInstance.delete<ClearNotificationsResponse>("/notifications");
  },
};