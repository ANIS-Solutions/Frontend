import axiosInstance from "../lib/api/auth.api";
import { ApiResponse } from "../types/api/auth.types";
import {
  AddChildPayload,
  GetChildrenResponse,
  GetChildResponse,
  AddChildApiResponse,
  UpdateChildPayload,
  Child,
} from "../types/api/child.types";

export const childService = {
  getChildren() {
    return axiosInstance.get<GetChildrenResponse>("/children/");
  },

  getChild(childId: string) {
    return axiosInstance.get<GetChildResponse>(`/children/${childId}`);
  },

  addChild(data: AddChildPayload) {
    return axiosInstance.post<AddChildApiResponse>("/children/", data);
  },

updateChild(childId: string, data: UpdateChildPayload) {
  return axiosInstance.patch<ApiResponse<Child>>(
    `/children/${childId}`,
    data,
  );
},

};
