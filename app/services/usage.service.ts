import axiosInstance from "../lib/api/auth.api";
import { GetDailyUsageResponse, GetWeeklyUsageResponse } from "../types/api/usage.types";

export const usageService = {
  getDailyUsage(childId: string) {
    return axiosInstance.get<GetDailyUsageResponse>(
      `/apps/children/${childId}/daily-usage`
    );
  },

  getWeeklyUsage(childId: string) {
    return axiosInstance.get<GetWeeklyUsageResponse>(
      `/apps/children/${childId}/daily-usage/last-week`
    );
  },
};