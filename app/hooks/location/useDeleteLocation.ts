"use client";
import { useState } from "react";
import { locationService } from "../../services/location.service";
import axios from "axios";

export function useDeleteLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (childId: string, locId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await locationService.deleteLocation(childId, locId);
      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to delete location");
      } else {
        setError("Something went wrong");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}