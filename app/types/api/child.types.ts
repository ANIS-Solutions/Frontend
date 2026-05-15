import { ApiResponse } from "./auth.types";
export type Gender = "MALE" | "FEMALE";

export interface Child {
  id: string;
  firstName: string;
  gender: "MALE" | "FEMALE";
  hobbies: string[];
  dob: string;
  isActive: boolean;
  deviceId?: string;
  deviceName?: string;
  qrcode?: string;
}

export interface AddChildPayload {
  firstName: string;
  lastName?: string;
  gender: "MALE" | "FEMALE";
  hobbies: string[];
  dob: string;
}

export interface UpdateChildPayload {
  firstName?: string;
  lastName?: string;
  gender?: "MALE" | "FEMALE";
  hobbies?: string[];
  dob?: string;
}

export interface AddChildResponse {
  child: Child;
  qrcode: string;
  pairToken: string;
}

export type GetChildrenResponse = ApiResponse<Child[]>;
export type GetChildResponse = ApiResponse<Child>;
export type AddChildApiResponse = ApiResponse<Child> & {
  qrcode: string;
  devInfo: { pairToken: string };
};

export type UpdateChildResponse = ApiResponse<Child>;
