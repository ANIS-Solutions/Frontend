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
            className="rounded-2xl h-20 animate-pulse bg-gray-100 dark:bg-gray-700"
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
          {
            label: "Total Apps",
            value: stats.total,
            color: "var(--stat-neutral)",
          },
          {
            label: "Blocked",
            value: stats.blocked,
            color: "var(--stat-alert)",
          },
          {
            label: "With Limit",
            value: stats.limited,
            color: "var(--stat-warning)",
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-2xl p-4 bg-white dark:bg-gray-800 border-[0.5px] border-gray-200 dark:border-gray-700"
          >
            <p className="text-xs mb-1.5 text-gray-500 dark:text-gray-400">
              {label}
            </p>
            <p className="text-xl sm:text-2xl font-bold" style={{ color }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full overflow-x-auto mb-4">
        <div className="flex gap-1 p-1 rounded-xl min-w-max bg-gray-100 dark:bg-gray-700">
          {filters.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap ${
                filter === id
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium"
                  : "bg-transparent text-gray-500 dark:text-gray-400"
              }`}
              style={{
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
        <div className="rounded-2xl p-8 text-center bg-gray-50 dark:bg-gray-900 border-[0.5px] border-dashed border-gray-300 dark:border-gray-700">
          <Monitor
            size={32}
            className="mx-auto mb-2 text-gray-300 dark:text-gray-600"
          />
          <p className="text-sm font-medium mb-1 text-gray-400 dark:text-gray-500">
            {apps.length === 0
              ? "No apps installed yet"
              : "No apps match this filter"}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {apps.length === 0
              ? "Apps will appear here once the child's device is paired"
              : "Try selecting a different filter"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((app, index) => (
            <AppCard
              key={`${app.packageId}-${index}`}
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
