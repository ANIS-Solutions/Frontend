"use client";
import { useState } from "react";
import { Report } from "@/app/types/api/report.types";
import ReportContent from "./ReportContent";
import { FileText } from "lucide-react";
import { useReports } from "@/app/hooks/report/useReports";

interface ReportsListProps {
  childId: string;
}

export default function ReportsList({ childId }: ReportsListProps) {
  const { reports, isLoading, error } = useReports(childId);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const effectiveReport = selectedReport || reports[0] || null;

  if (isLoading) {
    return (
      <div className="grid gap-4" style={{ gridTemplateColumns: "260px 1fr" }}>
        <div className="flex flex-col gap-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl h-16 animate-pulse"
              style={{ background: "#f3f4f6" }}
            />
          ))}
        </div>
        <div
          className="rounded-2xl h-96 animate-pulse"
          style={{ background: "#f3f4f6" }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="p-4 rounded-xl text-sm"
        style={{ background: "#FCEBEB", color: "#A32D2D" }}
      >
        {error}
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{ background: "#f9fafb", border: "0.5px dashed #d1d5db" }}
      >
        <FileText
          size={32}
          className="mx-auto mb-2"
          style={{ color: "#d1d5db" }}
        />
        <p className="text-sm font-medium mb-1" style={{ color: "#9ca3af" }}>
          No reports yet
        </p>
        <p className="text-xs" style={{ color: "#9ca3af" }}>
          Reports will appear here after weekly sessions
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: "260px 1fr" }}>
      {/* Left: Reports List */}
      <div className="flex flex-col gap-2">
        <p
          className="text-xs font-medium mb-1"
          style={{
            color: "#9ca3af",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Previous Reports
        </p>
        {reports.map((report) => {
          const isActive = effectiveReport?._id === report._id;
          return (
            <button
              key={report._id}
              onClick={() => setSelectedReport(report)}
              className="text-right rounded-xl p-3 transition-all w-full"
              style={{
                background: isActive ? "#E6F1FB" : "white",
                border: `0.5px solid ${isActive ? "#1E73BE" : "#e5e7eb"}`,
                cursor: "pointer",
              }}
            >
              <p
                className="text-sm font-medium mb-1"
                style={{ color: isActive ? "#1E73BE" : "#111827" }}
              >
                {new Date(report.reportDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p className="text-xs" style={{ color: "#6b7280" }}>
                {report.totalSessions} sessions
              </p>
            </button>
          );
        })}
      </div>

      {/* Right: Report Content */}
      <div>{effectiveReport && <ReportContent report={effectiveReport} />}</div>
    </div>
  );
}
