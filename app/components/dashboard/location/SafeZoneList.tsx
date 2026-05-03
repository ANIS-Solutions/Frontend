"use client";
import { SafeZone } from "@/app/types/api/location.types";
import { Home, Trash2, Pencil } from "lucide-react";

const zoneColors = [
  { border: "#1E73BE", bg: "#E6F1FB", icon: "#1E73BE" },
  { border: "#3B6D11", bg: "#EAF3DE", icon: "#3B6D11" },
  { border: "#854F0B", bg: "#FAEEDA", icon: "#854F0B" },
  { border: "#993556", bg: "#FBEAF0", icon: "#993556" },
];

interface SafeZoneListProps {
  zones: SafeZone[];
  isLoading: boolean;
  onAdd: () => void;
  onEdit: (zone: SafeZone) => void;
  onDelete: (locId: string) => void;
}

export default function SafeZoneList({
  zones,
  isLoading,
  onAdd,
  onEdit,
  onDelete,
}: SafeZoneListProps) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-tertiary)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <p
          className="text-sm font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          Safe Zones{" "}
          <span
            className="text-xs font-normal"
            style={{ color: "var(--color-text-secondary)" }}
          >
            ({zones.length})
          </span>
        </p>
        <button
          onClick={onAdd}
          className="text-xs px-3 py-1.5 rounded-lg text-white"
          style={{ background: "#1E73BE", border: "none", cursor: "pointer" }}
        >
          + Add
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-2">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl h-14 animate-pulse"
              style={{ background: "var(--color-background-secondary)" }}
            />
          ))}
        </div>
      ) : zones.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
            No safe zones added yet
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {zones.map((zone, i) => {
            const color = zoneColors[i % zoneColors.length];
            return (
              <div
                key={zone.id}
                className="rounded-xl p-3"
                style={{
                  background: "var(--color-background-secondary)",
                  borderLeft: `3px solid ${color.border}`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: color.bg }}
                    >
                      <Home size={14} style={{ color: color.icon }} />
                    </div>
                    <div>
                      <p
                        className="text-xs font-medium"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {zone.title}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {zone.safeRadius}m radius
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => onEdit(zone)}
                      className="p-1.5 rounded-lg"
                      style={{
                        background: "transparent",
                        border: "0.5px solid var(--color-border-tertiary)",
                        cursor: "pointer",
                      }}
                    >
                      <Pencil
                        size={12}
                        style={{ color: "var(--color-text-secondary)" }}
                      />
                    </button>
                    <button
                      onClick={() => onDelete(zone.id)}
                      className="p-1.5 rounded-lg"
                      style={{
                        background: "transparent",
                        border: "0.5px solid var(--color-border-tertiary)",
                        cursor: "pointer",
                      }}
                    >
                      <Trash2
                        size={12}
                        style={{ color: "var(--color-text-danger)" }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}