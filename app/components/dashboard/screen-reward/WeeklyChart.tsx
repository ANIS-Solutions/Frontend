"use client";
import { useState } from "react";
import { DailyUsage } from "@/app/types/api/usage.types";

interface WeeklyChartProps {
  weekUsage: DailyUsage[];
}

const HIGH_USAGE_THRESHOLD = 180;

function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

function getAppName(packageName: string): string {
  const parts = packageName.split(".");
  return parts[parts.length - 1] || packageName;
}

export default function WeeklyChart({ weekUsage }: WeeklyChartProps) {
  const [selectedDay, setSelectedDay] = useState<DailyUsage | null>(null);

  if (weekUsage.length === 0) {
    return (
      <div className="rounded-2xl p-8 text-center border-[0.5px] border-dashed bg-gray-50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600">
        <p className="text-sm text-gray-400 dark:text-gray-500">No data for the last 7 days</p>
      </div>
    );
  }

  const maxMinutes = Math.max(...weekUsage.map((d) => d.totalScreenTimeMinutes), 1);
  const today = new Date().toISOString().split("T")[0];
  const sorted = [...weekUsage].sort((a, b) => a.date.localeCompare(b.date));
  const effectiveSelected = selectedDay || sorted[sorted.length - 1]; 

  return (
    <div className="rounded-2xl p-5 border-[0.5px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <p className="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">Last 7 Days Trend</p>

      {/* Chart */}
      <div className="flex items-end gap-3 px-1 justify-start" style={{ height: 140 }}>
        {sorted.map((day) => {
          const isToday = day.date === today;
          const isSelected = effectiveSelected.id === day.id;
          const isHigh = day.totalScreenTimeMinutes >= HIGH_USAGE_THRESHOLD;
          const barColor = isHigh ? "#854F0B" : "#1E73BE";
          const heightPercent = (day.totalScreenTimeMinutes / maxMinutes) * 100;
          const dayLabel = new Date(day.date).toLocaleDateString("en-GB", { weekday: "short" });

          return (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day)}
              className="flex flex-col items-center gap-1.5 group relative"
              style={{ width: 48, flexShrink: 0, background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-all px-2 py-1 rounded-lg text-xs font-medium text-white whitespace-nowrap pointer-events-none bg-gray-900 dark:bg-gray-700">
                {formatTime(day.totalScreenTimeMinutes)}
              </div>

              <div
                className="rounded-t-md relative bg-gray-100 dark:bg-gray-700"
                style={{
                  height: 100,
                  width: "100%",
                  border: isSelected ? `2px solid ${barColor}` : isToday ? `2px solid ${barColor}66` : "none",
                }}
              >
                <div
                  className="absolute bottom-0 w-full rounded-t-md transition-all"
                  style={{
                    background: barColor,
                    height: `${Math.max(heightPercent, 3)}%`,
                    opacity: isSelected ? 1 : 0.7,
                  }}
                />
              </div>
              <span
                className="text-xs"
                style={{
                  color: isSelected ? barColor : "#9ca3af",
                  fontWeight: isSelected ? 600 : 400,
                }}
              >
                {dayLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pb-4 border-b-[0.5px] border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded" style={{ background: "#1E73BE" }} />
          <span className="text-xs text-gray-500 dark:text-gray-400">Normal usage</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded" style={{ background: "#854F0B" }} />
          <span className="text-xs text-gray-500 dark:text-gray-400">High usage</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Apps —{" "}
            {new Date(effectiveSelected.date).toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "short",
            })}
          </p>
          <span className="text-sm font-semibold" style={{ color: "#1E73BE" }}>
            {formatTime(effectiveSelected.totalScreenTimeMinutes)}
          </span>
        </div>

        {effectiveSelected.apps.length === 0 ? (
          <p className="text-sm text-center py-4 text-gray-400 dark:text-gray-500">
            No app usage data for this day
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {[...effectiveSelected.apps]
              .sort((a, b) => b.totalAppTimeMinutes - a.totalAppTimeMinutes)
              .map((app, i) => {
                const maxAppTime = Math.max(...effectiveSelected.apps.map((a) => a.totalAppTimeMinutes));
                const widthPercent = maxAppTime > 0 ? (app.totalAppTimeMinutes / maxAppTime) * 100 : 0;
                const colors = ["#1E73BE", "#854F0B", "#3B6D11", "#993556", "#6b7280"];
                const color = colors[i % colors.length];

                return (
                  <div key={`${app.packageName}-${i}`}>
                  {/* <div key={app.packageName}> */}
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium truncate text-gray-700 dark:text-gray-300">
                        {getAppName(app.packageName)}
                      </p>
                      <span className="text-xs font-semibold shrink-0" style={{ color }}>
                        {formatTime(app.totalAppTimeMinutes)}
                      </span>
                    </div>
                    <div className="rounded-full h-1.5 bg-gray-100 dark:bg-gray-700">
                      <div
                        className="rounded-full h-1.5 transition-all"
                        style={{ background: color, width: `${widthPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}