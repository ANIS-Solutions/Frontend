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
  liveLocation,
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

  const drawLiveMarker = (L: typeof import("leaflet"), map: Map) => {
  if (!liveLocation) return;
  const { lat, lng } = liveLocation;

  if (liveMarkerRef.current) {
    liveMarkerRef.current.setLatLng([lat, lng]);
    map.panTo([lat, lng]);
  } else {
    liveMarkerRef.current = L.marker([lat, lng], {
      icon: L.divIcon({
        html: `
          <div style="position:relative;width:22px;height:22px;">
            <div style="
              position:absolute;inset:0;
              background:#22c55e;border-radius:50%;
              opacity:0.35;
              animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
            "></div>
            <div style="
              position:absolute;inset:4px;
              background:#22c55e;border-radius:50%;
              border:2px solid white;
              box-shadow:0 0 6px rgba(0,0,0,0.25);
            "></div>
          </div>
          <style>
            @keyframes ping {
              75%,100%{transform:scale(2.2);opacity:0}
            }
          </style>
        `,
        className: "",
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      }),
      zIndexOffset: 1000,
    }).addTo(map);

    liveMarkerRef.current.bindPopup(`
      <div style="font-family:sans-serif;min-width:140px;">
        <p style="font-weight:600;margin:0 0 6px;font-size:13px;color:#16a34a;">📍 Live Location</p>
        <p style="font-size:11px;color:#666;margin:0;">Lat: ${lat.toFixed(5)}</p>
        <p style="font-size:11px;color:#666;margin:3px 0 0;">Lng: ${lng.toFixed(5)}</p>
      </div>
    `);

    map.setView([lat, lng], 15);
  }
};

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;

    let map: Map | null = null;

    const initMap = async () => {
      const L = await import("leaflet");

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        liveMarkerRef.current = null;
      }

const defaultCenter: [number, number] = liveLocation
  ? [liveLocation.lat, liveLocation.lng] 
  : safeZones.length > 0
  ? [safeZones[0].location.coordinates[1], safeZones[0].location.coordinates[0]]
  : [30.0444, 31.2357];

      map = L.map(mapRef.current!).setView(defaultCenter, 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      mapInstanceRef.current = map;
      drawZones(L, map);
      drawLiveMarker(L, map);
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
    if (!mapInstanceRef.current || !liveLocation) return;
    const update = async () => {
      const L = await import("leaflet");
      drawLiveMarker(L, mapInstanceRef.current!);
    };
    update();
  }, [liveLocation]);

  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const redraw = async () => {
      const L = await import("leaflet");
      drawZones(L, mapInstanceRef.current!);
    };
    redraw();
  }, [safeZones]);

  return (
    <div
      className="rounded-2xl overflow-hidden border-[0.5px] border-gray-200 dark:border-gray-700"
      style={{ minHeight: 520, position: "relative", zIndex: 1 }}
    >
      <div ref={mapRef} className="w-full" style={{ height: "100%", minHeight: 520 }} />

      <div
        className="bg-white dark:bg-gray-800 border-[0.5px] border-gray-200 dark:border-gray-700"
        style={{
          position: "absolute", top: 12, left: 12, zIndex: 1000,
          borderRadius: 8, padding: "5px 10px",
          display: "flex", alignItems: "center", gap: 6,
        }}
      >
        <div style={{
          width: 7, height: 7, borderRadius: "50%",
          background: isConnected ? "#22c55e" : "#9ca3af",
        }} />
        <span className="text-gray-900 dark:text-gray-100" style={{ fontSize: 12 }}>
          {isConnected ? "Tracking live" : "No live data"}
        </span>
      </div>
    </div>
  );
}