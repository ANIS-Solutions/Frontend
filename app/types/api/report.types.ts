import { ApiResponse } from "./auth.types";

export interface ActivityDistribution {
  tag: string;
  percentage: number;
}

export interface Report {
  _id: string;
  childId: string;
  parentId: string;
  sessionDocId: string;
  reportDate: string;
  totalSessions: number;
  reportText: string | null;
  generationStatus: "completed" | "processing" | "pending" | "failed";
  activityDistribution: ActivityDistribution[];
}

export interface ReportsData {
  reports: Report[];
}

export type GetReportsResponse = ApiResponse<ReportsData>;
export type GetReportResponse = ApiResponse<Report>;
