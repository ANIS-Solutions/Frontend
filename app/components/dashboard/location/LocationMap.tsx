"use client";
import { useEffect, useRef } from "react";
import { SafeZone, LiveLocation } from "@/app/types/api/location.types";
import type { Map, Marker, Circle } from "leaflet";

interface LocationMapProps {
  safeZones: SafeZone[];
  liveLocation: LiveLocation | null;
  isConnected: boolean;
}

const ZONE_COLORS = ["#1E73BE", "#3B6D11", "#854F0B", "#993556"];

export default function LocationMap({
  safeZones,
  isConnected,
}: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const liveMarkerRef = useRef<Marker | null>(null);
  const circlesRef = useRef<Circle[]>([]);
  const markersRef = useRef<Marker[]>([]);

  const drawZones = (L: typeof import("leaflet"), map: Map) => {
    circlesRef.current.forEach((c) => c.remove());
    markersRef.current.forEach((m) => m.remove());
    circlesRef.current = [];
    markersRef.current = [];

    safeZones.forEach((zone, i) => {
      const color = ZONE_COLORS[i % ZONE_COLORS.length];
      const [lng, lat] = zone.location.coordinates;

      const circle = L.circle([lat, lng], {
        radius: zone.safeRadius,
        color,
        fillColor: color,
        fillOpacity: 0.1,
        weight: 1.5,
        dashArray: "5, 5",
      }).addTo(map);

      circle.bindPopup(`
        <div style="font-family:sans-serif;min-width:140px;">
          <p style="font-weight:500;margin:0 0 4px;font-size:13px;">${zone.title}</p>
          <p style="font-size:11px;color:#666;margin:0;">${zone.address}</p>
          <p style="font-size:11px;color:#666;margin:4px 0 0;">Radius: ${zone.safeRadius}m</p>
        </div>
      `);

      const marker = L.marker([lat, lng], {
        icon: L.divIcon({
          html: `<div style="background:${color};width:10px;height:10px;border-radius:50%;border:2px solid white;box-shadow:0 0 4px rgba(0,0,0,0.3)"></div>`,
          className: "",
          iconSize: [10, 10],
          iconAnchor: [5, 5],
        }),
      }).addTo(map);

      circlesRef.current.push(circle);
      markersRef.current.push(marker);
    });
  };

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;

    let map: Map | null = null;

    const initMap = async () => {
      const L = await import("leaflet");

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const defaultCenter: [number, number] =
        safeZones.length > 0
          ? [
              safeZones[0].location.coordinates[1],
              safeZones[0].location.coordinates[0],
            ]
          : [30.0444, 31.2357];

      map = L.map(mapRef.current!).setView(defaultCenter, 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      mapInstanceRef.current = map;
      drawZones(L, map);
    };

    initMap();

    return () => {
      map?.remove();
      mapInstanceRef.current = null;
      liveMarkerRef.current = null;
      circlesRef.current = [];
      markersRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    const redraw = async () => {
      const L = await import("leaflet");
      drawZones(L, map);
    };

    redraw();
  }, [safeZones]);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: "0.5px solid #e5e7eb",
        minHeight: 520,
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100%", minHeight: 520 }}
      />

      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 1000,
          background: "white",
          borderRadius: 8,
          padding: "5px 10px",
          border: "0.5px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: isConnected ? "#22c55e" : "#9ca3af",
          }}
        />
        <span style={{ fontSize: 12, color: "#111827" }}>
          {isConnected ? "Tracking live" : "No live data"}
        </span>
      </div>
    </div>
  );
}