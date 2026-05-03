import { ApiResponse } from "./auth.types";

export interface GeoPoint {
  type: "Point";
  coordinates: [number, number];
}

export interface SafeZone {
  id: string;
  childId: string;
  title: string;
  address: string;
  location: GeoPoint;
  safeRadius: number;
}

export interface AddLocationPayload {
  title: string;
  address: string;
  location: GeoPoint;
  safeRadius: number;
}

export interface UpdateLocationPayload {
  title?: string;
  address?: string;
  location?: GeoPoint;
  safeRadius?: number;
}

export interface LiveLocation {
  lat: number;
  lng: number;
}

export type GetLocationsResponse = ApiResponse<SafeZone[]>;
export type GetLocationResponse = ApiResponse<SafeZone>;
export type AddLocationResponse = ApiResponse<SafeZone>;
export type UpdateLocationResponse = ApiResponse<SafeZone>;