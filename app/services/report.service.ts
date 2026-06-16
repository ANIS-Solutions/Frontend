import axiosInstance from "../lib/api/auth.api";
import { GetReportsResponse, GetReportResponse } from "../types/api/report.types";

export const reportService = {
  getReports(childId: string) {
    return axiosInstance.get<GetReportsResponse>(
      `/children/${childId}/reports`
    );
  },

  getReport(childId: string, reportId: string) {
    return axiosInstance.get<GetReportResponse>(
      `/children/${childId}/reports/${reportId}`
    );
  },
};