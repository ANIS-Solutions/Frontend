import axiosInstance from "../lib/api/auth.api";
import { ApiResponse } from "../types/api/auth.types";

import {
  AddLocationPayload,
  UpdateLocationPayload,
  GetLocationsResponse,
  GetLocationResponse,
  AddLocationResponse,
  UpdateLocationResponse,
} from "../types/api/location.types";

export const locationService = {
  getLocations(childId: string) {
    return axiosInstance.get<GetLocationsResponse>(`/locations/${childId}`);
  },

  getLocation(childId: string, locId: string) {
    return axiosInstance.get<GetLocationResponse>(
      `/locations/${childId}/${locId}`,
    );
  },

  addLocation(childId: string, data: AddLocationPayload) {
    return axiosInstance.post<AddLocationResponse>(
      `/locations/${childId}`,
      data,
    );
  },

  updateLocation(childId: string, locId: string, data: UpdateLocationPayload) {
    return axiosInstance.patch<UpdateLocationResponse>(
      `/locations/${childId}/${locId}`,
      data,
    );
  },

  deleteLocation(childId: string, locId: string) {
    return axiosInstance.delete<ApiResponse>(`/locations/${childId}/${locId}`);
  },

  streamLocation(childId: string) {
    const token = localStorage.getItem("accessToken");
    return new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/locations/stream/${childId}?token=${token}`,
    );
  },
};
