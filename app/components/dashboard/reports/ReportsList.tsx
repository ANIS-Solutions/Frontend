"use client";
import { useState } from "react";
import { Report } from "@/app/types/api/report.types";
import ReportContent from "./ReportContent";
import { FileText, ChevronRight } from "lucide-react";
import { useReports } from "@/app/hooks/report/useReports";

interface ReportsListProps {
  childId: string;
}

export default function ReportsList({ childId }: ReportsListProps) {
  const { reports, isLoading, error } = useReports(childId);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showContent, setShowContent] = useState(false); // موبايل بس

  const effectiveReport = selectedReport || reports[0] || null;

  const handleSelectReport = (report: Report) => {
    setSelectedReport(report);
    setShowContent(true);
  };

  const handleBack = () => {
    setShowContent(false);
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-[260px_1fr]">
        <div className="flex flex-col gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-xl h-16 animate-pulse bg-gray-100 dark:bg-gray-700" />
          ))}
        </div>
        <div className="hidden md:block rounded-2xl h-96 animate-pulse bg-gray-100 dark:bg-gray-700" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-xl text-sm" style={{ background: "#FCEBEB", color: "#A32D2D" }}>
        {error}
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="rounded-2xl p-8 text-center bg-gray-50 dark:bg-gray-900 border-[0.5px] border-dashed border-gray-300 dark:border-gray-700">
        <FileText size={32} className="mx-auto mb-2 text-gray-300 dark:text-gray-600" />
        <p className="text-sm font-medium mb-1 text-gray-400 dark:text-gray-500">No reports yet</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">Reports will appear here after weekly sessions</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop layout */}
      <div className="hidden md:grid gap-4" style={{ gridTemplateColumns: "260px 1fr" }}>
        {/* List */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium mb-1 text-gray-400 dark:text-gray-500 uppercase tracking-wide">
            Previous Reports
          </p>
          {reports.map((report) => {
            const isActive = effectiveReport?._id === report._id;
            return (
              <button
                key={report._id}
                onClick={() => setSelectedReport(report)}
                className={`text-right rounded-xl p-3 transition-all w-full border-[0.5px] ${
                  isActive
                    ? "bg-[#E6F1FB] dark:bg-blue-950/40 border-[#1E73BE] dark:border-blue-700"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                }`}
              >
                <p className={`text-sm font-medium mb-1 ${isActive ? "text-[#1E73BE] dark:text-blue-400" : "text-gray-900 dark:text-gray-100"}`}>
                  {new Date(report.reportDate).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{report.totalSessions} sessions</p>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div>{effectiveReport && <ReportContent report={effectiveReport} />}</div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden">
        {/* List view */}
        {!showContent && (
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium mb-1 text-gray-400 dark:text-gray-500 uppercase tracking-wide">
              Previous Reports
            </p>
            {reports.map((report) => {
              const isActive = effectiveReport?._id === report._id;
              return (
                <button
                  key={report._id}
                  onClick={() => handleSelectReport(report)}
                  className={`flex items-center justify-between rounded-xl p-4 transition-all w-full border-[0.5px] ${
                    isActive
                      ? "bg-[#E6F1FB] dark:bg-blue-950/40 border-[#1E73BE] dark:border-blue-700"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="text-right">
                    <p className={`text-sm font-medium mb-0.5 ${isActive ? "text-[#1E73BE] dark:text-blue-400" : "text-gray-900 dark:text-gray-100"}`}>
                      {new Date(report.reportDate).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{report.totalSessions} sessions</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 shrink-0" />
                </button>
              );
            })}
          </div>
        )}

        {/* Report content view */}
        {showContent && effectiveReport && (
          <div>
            {/* Back button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 mb-4 text-sm font-medium text-[#1E73BE]"
            >
              <ChevronRight size={16} className="rotate-180" />
              Back to reports
            </button>
            <ReportContent report={effectiveReport} />
          </div>
        )}
      </div>
    </>
  );
}