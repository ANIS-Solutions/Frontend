"use client";
import { useState, useEffect } from "react";
import { locationService } from "../../services/location.service";
import { LiveLocation } from "../../types/api/location.types";

export function useLiveLocation(childId: string) {
  const [liveLocation, setLiveLocation] = useState<LiveLocation | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!childId) return;

    const eventSource = locationService.streamLocation(childId);

    eventSource.onopen = () => setIsConnected(true);

    eventSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.message) return;
        if (data.lat !== undefined && data.lng !== undefined) {
          setLiveLocation({ lat: data.lat, lng: data.lng });
        }
      } catch {
        console.error("Failed to parse location data");
      }
    };

    eventSource.onerror = () => {
      setIsConnected(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
      setIsConnected(false);
    };
  }, [childId]);

  return { liveLocation, isConnected };
}
