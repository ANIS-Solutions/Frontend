"use client";
import { useState } from "react";
import { locationService } from "../../services/location.service";
import { UpdateLocationPayload } from "../../types/api/location.types";
import axios from "axios";

export function useUpdateLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (
    childId: string,
    locId: string,
    data: UpdateLocationPayload
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await locationService.updateLocation(childId, locId, data);
      return res.data.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to update location");
      } else {
        setError("Something went wrong");
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}