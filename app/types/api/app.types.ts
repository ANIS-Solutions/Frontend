import { ApiResponse } from "./auth.types";

export interface AppSettings {
  isBlocked: boolean;
  dailyLimit: number;
}

export interface AppStats {
  totalUsage: number;
  dailyUsage: Record<string, number>;
}

export interface App {
  childId: string;
  packageId: string;
  settings: AppSettings;
  stats: AppStats;
}
export interface BlockAppPayload {
  isBlocked: boolean;
}

export interface LimitAppPayload {
  dailyLimit: number;
}

export interface AppsData {
  apps: App[];
}

export interface AppData {
  app: App;
}

export type GetChildAppsResponse = ApiResponse<AppsData>;
export type GetChildAppResponse = ApiResponse<AppData>;
export type BlockAppResponse = ApiResponse;
export type LimitAppResponse = ApiResponse;
export type DeleteAppResponse = ApiResponse;
