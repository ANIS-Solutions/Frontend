"use client";
import { SafeZone, LiveLocation } from "@/app/types/api/location.types";
import { MapPin } from "lucide-react";

interface LiveLocationCardProps {
  liveLocation: LiveLocation | null;
  isConnected: boolean;
  safeZones: SafeZone[];
}

function isInsideZone(live: LiveLocation, zone: SafeZone): boolean {
  const [lng, lat] = zone.location.coordinates;
  const R = 6371000;
  const dLat = ((live.lat - lat) * Math.PI) / 180;
  const dLng = ((live.lng - lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat * Math.PI) / 180) *
      Math.cos((live.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return distance <= zone.safeRadius;
}

export default function LiveLocationCard({
  liveLocation,
  isConnected,
  safeZones,
}: LiveLocationCardProps) {
  const currentZone = liveLocation
    ? safeZones.find((z) => isInsideZone(liveLocation, z))
    : null;

  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-tertiary)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: isConnected ? "#22c55e" : "#9ca3af" }}
          />
          <p
            className="text-sm font-medium"
            style={{ color: "var(--color-text-primary)" }}
          >
            Live Location
          </p>
        </div>
        <span
          className="text-xs"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          {isConnected ? "Connected" : "Disconnected"}
        </span>
      </div>

      {liveLocation ? (
        <>
          <div
            className="rounded-xl p-3 mb-3"
            style={{
              background: currentZone ? "#EAF3DE" : "#FCEBEB",
              border: `0.5px solid ${currentZone ? "#C0DD97" : "#F7C1C1"}`,
            }}
          >
            <div className="flex items-center gap-2">
              <MapPin
                size={14}
                style={{ color: currentZone ? "#3B6D11" : "#A32D2D" }}
              />
              <p
                className="text-xs font-medium"
                style={{ color: currentZone ? "#27500A" : "#791F1F" }}
              >
                {currentZone
                  ? `Inside "${currentZone.title}" zone`
                  : "Outside safe zones"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div
              className="rounded-xl p-2 text-center"
              style={{ background: "var(--color-background-secondary)" }}
            >
              <p
                className="text-xs mb-0.5"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Lat
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: "var(--color-text-primary)" }}
              >
                {liveLocation.lat.toFixed(4)}
              </p>
            </div>
            <div
              className="rounded-xl p-2 text-center"
              style={{ background: "var(--color-background-secondary)" }}
            >
              <p
                className="text-xs mb-0.5"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Lng
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: "var(--color-text-primary)" }}
              >
                {liveLocation.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div
          className="rounded-xl p-4 text-center"
          style={{ background: "var(--color-background-secondary)" }}
        >
          <MapPin
            size={20}
            className="mx-auto mb-2"
            style={{ color: "var(--color-text-tertiary)" }}
          />
          <p
            className="text-xs"
            style={{ color: "var(--color-text-secondary)" }}
          >
            No location data yet
          </p>
        </div>
      )}
    </div>
  );
}
