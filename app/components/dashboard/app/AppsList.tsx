"use client";
import { useState } from "react";
import { useChildApps } from "@/app/hooks/apps/useChildApps";
import { App } from "@/app/types/api/app.types";
import AppCard from "./AppCard";
import LimitModal from "./LimitModal";
import { Monitor } from "lucide-react";

type Filter = "all" | "blocked" | "limited" | "active";

interface AppsListProps {
  childId: string;
}

export default function AppsList({ childId }: AppsListProps) {
  const { apps, isLoading, error, refetch } = useChildApps(childId);
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedApp, setSelectedApp] = useState<App | null>(null);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "blocked", label: "Blocked" },
    { id: "limited", label: "Limited" },
    { id: "active", label: "Active" },
  ];

  const filtered = apps.filter((app) => {
    if (filter === "blocked") return app.settings.isBlocked;
    if (filter === "limited")
      return app.settings.dailyLimit > 0 && !app.settings.isBlocked;
    if (filter === "active")
      return !app.settings.isBlocked && app.settings.dailyLimit === 0;
    return true;
  });

  const stats = {
    total: apps.length,
    blocked: apps.filter((a) => a.settings.isBlocked).length,
    limited: apps.filter(
      (a) => a.settings.dailyLimit > 0 && !a.settings.isBlocked,
    ).length,
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl h-20 animate-pulse"
            style={{ background: "#f3f4f6" }}
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="p-4 rounded-xl text-sm"
        style={{ background: "#FCEBEB", color: "#F72B35" }}
      >
        {error}
        <button onClick={refetch} className="ml-2 underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 mb-5">
        {[
          { label: "Total Apps", value: stats.total, color: "#111827" },
          { label: "Blocked", value: stats.blocked, color: "#F72B35" },
          { label: "With Limit", value: stats.limited, color: "#854F0B" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-2xl p-4"
            style={{ background: "white", border: "0.5px solid #e5e7eb" }}
          >
            <p className="text-xs mb-1.5" style={{ color: "#6b7280" }}>
              {label}
            </p>
            <p className="text-xl sm:text-2xl font-bold" style={{ color }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full overflow-x-auto mb-4">
        <div
          className="flex gap-1 p-1 rounded-xl min-w-max"
          style={{ background: "#f3f4f6" }}
        >
          {filters.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className="px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap"
              style={{
                background: filter === id ? "white" : "transparent",
                color: filter === id ? "#111827" : "#6b7280",
                fontWeight: filter === id ? 500 : 400,
                border: "none",
                cursor: "pointer",
                boxShadow:
                  filter === id ? "0 1px 2px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Apps */}
      {filtered.length === 0 ? (
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: "#f9fafb", border: "0.5px dashed #d1d5db" }}
        >
          <Monitor
            size={32}
            className="mx-auto mb-2"
            style={{ color: "#d1d5db" }}
          />
          <p className="text-sm font-medium mb-1" style={{ color: "#9ca3af" }}>
            {apps.length === 0
              ? "No apps installed yet"
              : "No apps match this filter"}
          </p>
          <p className="text-xs" style={{ color: "#9ca3af" }}>
            {apps.length === 0
              ? "Apps will appear here once the child's device is paired"
              : "Try selecting a different filter"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((app) => (
            <AppCard
              key={app.packageId}
              app={app}
              onSetLimit={setSelectedApp}
              onRefetch={refetch}
            />
          ))}
        </div>
      )}

      <LimitModal
        app={selectedApp}
        onClose={() => setSelectedApp(null)}
        onSuccess={refetch}
      />
    </>
  );
}
