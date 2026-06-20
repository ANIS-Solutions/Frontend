"use client";
import { AppUsage } from "@/app/types/api/usage.types";
import { Monitor } from "lucide-react";

interface AppBreakdownProps {
  apps: AppUsage[];
}

const barColors = ["#1E73BE", "#854F0B", "#3B6D11", "#993556", "#6b7280"];
const iconBgs = ["#E6F1FB", "#FEF3C7", "#EAF3DE", "#FBEAF0", "#f3f4f6"];

function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

function getAppName(app: AppUsage): string {
  if (app.appName) return app.appName;
  const parts = app.packageName.split(".");
  return parts[parts.length - 1] || app.packageName;
}

export default function AppBreakdown({ apps }: AppBreakdownProps) {
  if (apps.length === 0) {
    return (
      <div className="rounded-2xl p-8 text-center" style={{ background: "#f9fafb", border: "0.5px dashed #d1d5db" }}>
        <Monitor size={28} className="mx-auto mb-2" style={{ color: "#d1d5db" }} />
        <p className="text-sm" style={{ color: "#9ca3af" }}>No app usage data for today</p>
      </div>
    );
  }

  const maxTime = Math.max(...apps.map((a) => a.totalAppTimeMinutes));
  const sorted = [...apps].sort((a, b) => b.totalAppTimeMinutes - a.totalAppTimeMinutes);

  return (
    <div className="rounded-2xl p-5" style={{ background: "white", border: "0.5px solid #e5e7eb" }}>
      <p className="text-sm font-semibold mb-4" style={{ color: "#111827" }}>App Breakdown</p>

      <div className="flex flex-col gap-3.5">
        {sorted.map((app, i) => {
          const color = barColors[i % barColors.length];
          const iconBg = iconBgs[i % iconBgs.length];
          const widthPercent = maxTime > 0 ? (app.totalAppTimeMinutes / maxTime) * 100 : 0;

          return (
            <div key={`${app.packageName}-${i}`}>
              <div className="flex items-center gap-2.5 mb-1.5">
                {/*  Icon */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 overflow-hidden"
                  style={{ background: iconBg }}
                >
                  {app.iconUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={app.iconUrl}
                      alt={getAppName(app)}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-sm">📱</span>
                  )}
                </div>
                <p className="text-sm font-medium flex-1 min-w-0 truncate" style={{ color: "#111827" }}>
                  {getAppName(app)}
                </p>
                <span className="text-sm font-semibold shrink-0" style={{ color }}>
                  {formatTime(app.totalAppTimeMinutes)}
                </span>
              </div>
              <div className="rounded-full h-1.5 ml-10.5" style={{ background: "#f3f4f6" }}>
                <div
                  className="rounded-full h-1.5 transition-all"
                  style={{ background: color, width: `${widthPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}