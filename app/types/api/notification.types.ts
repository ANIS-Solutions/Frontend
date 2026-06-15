import { ApiResponse } from "./auth.types";

export interface NotificationData {
  childId?: string;
  childName?: string;
  deviceName?: string;
  [key: string]: string | undefined;
}

export interface Notification {
  _id: string;
  recipientId: string;
  type: string;
  title: string;
  body: string;
  data?: NotificationData;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationsData {
  notifications: Notification[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
  unreadCount: number;
}

export type GetNotificationsResponse = ApiResponse<NotificationsData>;
export type DeleteNotificationResponse = ApiResponse;
export type ClearNotificationsResponse = ApiResponse;
