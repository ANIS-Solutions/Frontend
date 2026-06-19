"use client";
import { useState, useEffect,  FormEvent, useRef } from "react";
import { SafeZone, AddLocationPayload } from "@/app/types/api/location.types";
import { X, MapPin } from "lucide-react";
import type { LeafletMouseEvent, Map, Marker } from "leaflet";

interface SafeZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddLocationPayload) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  editZone?: SafeZone | null;
}

const getInitialData = (editZone?: SafeZone | null) => ({
  title: editZone?.title ?? "",
  address: editZone?.address ?? "",
  lat: editZone ? String(editZone.location.coordinates[1]) : "",
  lng: editZone ? String(editZone.location.coordinates[0]) : "",
  safeRadius: editZone ? String(editZone.safeRadius) : "500",
});

export default function SafeZoneModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  error,
  editZone,
}: SafeZoneModalProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);

  const [formData, setFormData] = useState(() => getInitialData(editZone));


  useEffect(() => {
    if (!isOpen) {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
      return;
    }

    const initMap = async () => {
      if (!mapRef.current || mapInstanceRef.current) return;

      const L = (await import("leaflet")).default;

      const defaultCenter: [number, number] = editZone
        ? [editZone.location.coordinates[1], editZone.location.coordinates[0]]
        : [30.0444, 31.2357];

      const map = L.map(mapRef.current).setView(defaultCenter, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);

      map.on("click", (e: LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        setFormData((prev) => ({
          ...prev,
          lat: lat.toFixed(6),
          lng: lng.toFixed(6),
        }));

        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
        } else {
          markerRef.current = L.marker([lat, lng], {
            icon: L.divIcon({
              html: `<div style="background:#1E73BE;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 0 6px rgba(0,0,0,0.3)"></div>`,
              className: "",
              iconSize: [14, 14],
              iconAnchor: [7, 7],
            }),
          }).addTo(map);
        }
      });

      if (editZone) {
        const [lng, lat] = editZone.location.coordinates;
        markerRef.current = L.marker([lat, lng], {
          icon: L.divIcon({
            html: `<div style="background:#1E73BE;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 0 6px rgba(0,0,0,0.3)"></div>`,
            className: "",
            iconSize: [14, 14],
            iconAnchor: [7, 7],
          }),
        }).addTo(map);
      }

      mapInstanceRef.current = map;
    };

    setTimeout(initMap, 100);
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.lat || !formData.lng) return;

    await onSubmit({
      title: formData.title,
      address: formData.address,
      location: {
        type: "Point",
        coordinates: [parseFloat(formData.lng), parseFloat(formData.lat)],
      },
      safeRadius: parseInt(formData.safeRadius),
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full"
        style={{
          maxWidth: 580,
          border: "0.5px solid var(--color-border-tertiary)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-medium" style={{ color: "var(--color-text-primary)" }}>
            {editZone ? "Edit Safe Zone" : "Add Safe Zone"}
          </p>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <X size={18} style={{ color: "var(--color-text-secondary)" }} />
          </button>
        </div>

        {error && (
          <div className="mb-3 p-3 rounded-xl text-xs" style={{ background: "#FCEBEB", color: "#A32D2D" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#1E73BE" }}>Title</label>
              <input
                value={formData.title}
                onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                placeholder="e.g. Home, School..."
                className="w-full rounded-xl px-3 py-2.5 text-sm dark:bg-gray-700 dark:text-gray-100"
                style={{ border: "0.5px solid var(--color-border-secondary)" }}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#1E73BE" }}>Address</label>
              <input
                value={formData.address}
                onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
                placeholder="62, Maadi sq. Cairo"
                className="w-full rounded-xl px-3 py-2.5 text-sm dark:bg-gray-700 dark:text-gray-100"
                style={{ border: "0.5px solid var(--color-border-secondary)" }}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "#1E73BE" }}>Safe Radius (meters)</label>
            <input
              type="number"
              value={formData.safeRadius}
              onChange={(e) => setFormData((p) => ({ ...p, safeRadius: e.target.value }))}
              placeholder="500"
              className="w-full rounded-xl px-3 py-2.5 text-sm dark:bg-gray-700 dark:text-gray-100"
              style={{ border: "0.5px solid var(--color-border-secondary)" }}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "#1E73BE" }}>Pick Location on Map</label>

            {formData.lat && formData.lng ? (
              <div className="flex items-center gap-2 mb-2 p-2 rounded-xl" style={{ background: "#EAF3DE", border: "0.5px solid #C0DD97" }}>
                <MapPin size={13} style={{ color: "#3B6D11" }} />
                <span className="text-xs font-medium" style={{ color: "#27500A" }}>
                  {parseFloat(formData.lat).toFixed(4)}, {parseFloat(formData.lng).toFixed(4)}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-2 p-2 rounded-xl" style={{ background: "var(--color-background-secondary)" }}>
                <MapPin size={13} style={{ color: "var(--color-text-tertiary)" }} />
                <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                  Click on the map to pick a location
                </span>
              </div>
            )}

            <div
              ref={mapRef}
              style={{ height: 240, borderRadius: 12, overflow: "hidden", border: "0.5px solid var(--color-border-secondary)", cursor: "crosshair" }}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm dark:text-gray-300"
              style={{ border: "0.5px solid var(--color-border-secondary)", background: "transparent", cursor: "pointer" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !formData.lat || !formData.lng}
              className="flex-1 py-3 rounded-xl text-sm text-white"
              style={{
                background: formData.lat && formData.lng ? "#1E73BE" : "#93c5fd",
                border: "none",
                cursor: formData.lat && formData.lng ? "pointer" : "not-allowed",
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              {isLoading ? "Saving..." : "Save Zone"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}