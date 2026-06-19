"use client";
import { useState } from "react";
import { useDailyUsage } from "@/app/hooks/usage/useDailyUsage";
import { useWeeklyUsage } from "@/app/hooks/usage/useWeeklyUsage";
import UsageStatCard from "./UsageStatCard";
import AppBreakdown from "./AppBreakdown";
import WeeklyChart from "./WeeklyChart";

type ViewMode = "today" | "week";

interface ScreenTimeViewProps {
  childId: string;
}

export default function ScreenTimeView({ childId }: ScreenTimeViewProps) {
  const [view, setView] = useState<ViewMode>("today");
  const { usage, isLoading: dailyLoading, error: dailyError } = useDailyUsage(childId);
  const { weekUsage, isLoading: weekLoading, error: weekError } = useWeeklyUsage(childId);

  const isLoading = view === "today" ? dailyLoading : weekLoading;
  const error = view === "today" ? dailyError : weekError;

  return (
    <>
      {/* View Toggle */}
      <div className="flex gap-1 p-1 rounded-xl w-fit mb-5 bg-gray-100 dark:bg-gray-800">
        {[
          { id: "today" as ViewMode, label: "Today" },
          { id: "week" as ViewMode, label: "Last 7 Days" },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all border-none cursor-pointer ${
              view === id
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                : "bg-transparent text-gray-500 dark:text-gray-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl h-28 animate-pulse bg-gray-100 dark:bg-gray-800" />
          <div className="rounded-2xl h-64 animate-pulse bg-gray-100 dark:bg-gray-800" />
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl text-sm bg-[#FCEBEB] dark:bg-red-950/40 text-[#A32D2D] dark:text-red-300">
          {error}
        </div>
      ) : view === "today" ? (
        usage ? (
          <div className="flex flex-col gap-4">
            <UsageStatCard totalMinutes={usage.totalScreenTimeMinutes} date={usage.date} />
            <AppBreakdown apps={usage.apps} />
          </div>
        ) : (
          <div className="rounded-2xl p-8 text-center border-[0.5px] border-dashed bg-gray-50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600">
            <p className="text-sm text-gray-400 dark:text-gray-500">No usage data available for today</p>
          </div>
        )
      ) : (
        <WeeklyChart weekUsage={weekUsage} />
      )}
    </>
  );
}