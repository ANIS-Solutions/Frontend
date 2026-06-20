"use client";
import { useTheme } from "@/app/context/ThemeContext";

interface UsageStatCardProps {
  totalMinutes: number;
  date: string;
}

function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

export default function UsageStatCard({
  totalMinutes,
  date,
}: UsageStatCardProps) {
  const { theme } = useTheme();
//   const percent = Math.min(Math.round((totalMinutes / 240) * 100), 100);

  const trackColor = theme === "dark" ? "#374151" : "#f3f4f6";
  const innerCircleBg = theme === "dark" ? "#1f2937" : "white";

  return (
    <div className="rounded-2xl p-5 border-[0.5px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs mb-1 text-gray-500 dark:text-gray-400">
            Today&apos;s Total Screen Time
          </p>
          <p
            className="text-2xl sm:text-3xl font-bold"
            style={{ color: "#1E73BE" }}
          >
            {formatTime(totalMinutes)}
          </p>
        </div>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500">
        {new Date(date).toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
    </div>
  );
}
