import { ApiResponse } from "./auth.types";

export interface AppUsage {
  packageName: string;
  totalAppTimeMinutes: number;
}

export interface DailyUsage {
  id: string;
  childId: string;
  date: string;
  totalScreenTimeMinutes: number;
  apps: AppUsage[];
}

export interface DailyUsageData {
  data: DailyUsage[];
  total: number;
  page: number;
  limit: number;
}

export type GetDailyUsageResponse = ApiResponse<DailyUsageData>;
export type GetWeeklyUsageResponse = ApiResponse<DailyUsage[]>;