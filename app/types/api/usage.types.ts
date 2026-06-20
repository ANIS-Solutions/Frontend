import { ApiResponse } from "./auth.types";

export interface AppUsage {
  packageName: string;
  appName: string | null;
  totalAppTimeMinutes: number;
  iconUrl: string | null;
}

export interface DailyUsage {
  id: string;
  date: string;
  totalScreenTimeMinutes: number;
  apps: AppUsage[];
}

export interface DailyUsageData {
  items: DailyUsage[];
  total: number;
  page: number;
  limit: number;
}

export type GetDailyUsageResponse = ApiResponse<DailyUsageData>;
export type GetWeeklyUsageResponse = ApiResponse<DailyUsage[]>;