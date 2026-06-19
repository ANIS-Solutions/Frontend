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

function getAppName(packageName: string): string {
  const parts = packageName.split(".");
  return parts[parts.length - 1] || packageName;
}

export default function AppBreakdown({ apps }: AppBreakdownProps) {
  if (apps.length === 0) {
    return (
      <div className="rounded-2xl p-8 text-center border-[0.5px] border-dashed bg-gray-50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600">
        <Monitor
          size={28}
          className="mx-auto mb-2 text-gray-300 dark:text-gray-600"
        />
        <p className="text-sm text-gray-400 dark:text-gray-500">
          No app usage data for today
        </p>
      </div>
    );
  }

  const maxTime = Math.max(...apps.map((a) => a.totalAppTimeMinutes));
  const sorted = [...apps].sort(
    (a, b) => b.totalAppTimeMinutes - a.totalAppTimeMinutes,
  );

  return (
    <div className="rounded-2xl p-5 border-[0.5px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <p className="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">
        App Breakdown
      </p>

      <div className="flex flex-col gap-3.5">
        {sorted.map((app, i) => {
          const color = barColors[i % barColors.length];
          const iconBg = iconBgs[i % iconBgs.length];
          const widthPercent =
            maxTime > 0 ? (app.totalAppTimeMinutes / maxTime) * 100 : 0;

          return (
            <div key={`${app.packageName}-${i}`}>
              <div className="flex items-center gap-2.5 mb-1.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm"
                  style={{ background: iconBg }}
                >
                  📱
                </div>
                <p className="text-sm font-medium flex-1 min-w-0 truncate text-gray-900 dark:text-gray-100">
                  {getAppName(app.packageName)}
                </p>
                <span
                  className="text-sm font-semibold shrink-0"
                  style={{ color }}
                >
                  {formatTime(app.totalAppTimeMinutes)}
                </span>
              </div>
              <div className="rounded-full h-1.5 ml-10.5 bg-gray-100 dark:bg-gray-700">
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
