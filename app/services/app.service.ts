import axiosInstance from "../lib/api/auth.api";
import {
  GetChildAppsResponse,
  GetChildAppResponse,
  BlockAppPayload,
  LimitAppPayload,
  BlockAppResponse,
  LimitAppResponse,
  DeleteAppResponse,
} from "../types/api/app.types";

export const appService = {
  getChildApps(childId: string) {
    return axiosInstance.get<GetChildAppsResponse>(
      `/apps/children/${childId}`
    );
  },

  getChildApp(packageId: string, childId: string) {
    return axiosInstance.get<GetChildAppResponse>(
      `/apps/${packageId}/children/${childId}`
    );
  },

  blockApp(packageId: string, childId: string, data: BlockAppPayload) {
    return axiosInstance.patch<BlockAppResponse>(
      `/apps/${packageId}/children/${childId}/block`,
      data
    );
  },

  limitApp(packageId: string, childId: string, data: LimitAppPayload) {
    return axiosInstance.patch<LimitAppResponse>(
      `/apps/${packageId}/children/${childId}/limit`,
      data
    );
  },

  deleteApp(packageId: string, childId: string) {
    return axiosInstance.delete<DeleteAppResponse>(
      `/apps/${packageId}/children/${childId}`
    );
  },
};