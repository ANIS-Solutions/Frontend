"use client";
import { Report } from "@/app/types/api/report.types";
import ReactMarkdown from "react-markdown";
import { useTheme } from "@/app/context/ThemeContext";

interface ReportContentProps {
  report: Report;
}

const sectionConfig = [
  {
    border: "#1E73BE",
    bg: "transparent",
    numBg: "#E6F1FB",
    color: "#1E73BE",
    lightBg: "#F0F7FF",
  },
  {
    border: "#3B6D11",
    bg: "transparent",
    numBg: "#EAF3DE",
    color: "#3B6D11",
    lightBg: "#F0F8EA",
  },
  {
    border: "#3B6D11",
    bg: "#f9fafb",
    numBg: "#EAF3DE",
    color: "#3B6D11",
    lightBg: "#F0F8EA",
  },
  {
    border: "#854F0B",
    bg: "transparent",
    numBg: "#FEF3C7",
    color: "#854F0B",
    lightBg: "#FFFBEB",
  },
  {
    border: "#993556",
    bg: "transparent",
    numBg: "#FBEAF0",
    color: "#993556",
    lightBg: "#FFF0F5",
  },
  {
    border: "#1E73BE",
    bg: "transparent",
    numBg: "#E6F1FB",
    color: "#1E73BE",
    lightBg: "#F0F7FF",
  },
  {
    border: "#1E73BE",
    bg: "#E6F1FB",
    numBg: "white",
    color: "#1E73BE",
    lightBg: "#E6F1FB",
  },
];

const sectionConfigDark = [
  {
    border: "#3B82F6",
    bg: "transparent",
    numBg: "rgba(96,165,250,0.15)",
    color: "#60A5FA",
    lightBg: "rgba(96,165,250,0.1)",
  },
  {
    border: "#65A30D",
    bg: "transparent",
    numBg: "rgba(155,203,90,0.15)",
    color: "#9BCB5A",
    lightBg: "rgba(155,203,90,0.1)",
  },
  {
    border: "#65A30D",
    bg: "rgba(255,255,255,0.03)",
    numBg: "rgba(155,203,90,0.15)",
    color: "#9BCB5A",
    lightBg: "rgba(155,203,90,0.1)",
  },
  {
    border: "#D97706",
    bg: "transparent",
    numBg: "rgba(224,169,60,0.15)",
    color: "#E0A93C",
    lightBg: "rgba(224,169,60,0.1)",
  },
  {
    border: "#DB6E91",
    bg: "transparent",
    numBg: "rgba(224,138,165,0.15)",
    color: "#E08AA5",
    lightBg: "rgba(224,138,165,0.1)",
  },
  {
    border: "#3B82F6",
    bg: "transparent",
    numBg: "rgba(96,165,250,0.15)",
    color: "#60A5FA",
    lightBg: "rgba(96,165,250,0.1)",
  },
  {
    border: "#3B82F6",
    bg: "rgba(96,165,250,0.12)",
    numBg: "#1f2937",
    color: "#60A5FA",
    lightBg: "rgba(96,165,250,0.12)",
  },
];

const sectionTitles = [
  "نظرة عامة",
  "الاهتمامات",
  "ملاحظات السلامة",
  "عادات الاستخدام",
  "الأثر التنموي",
  "توصيات",
  "خلاصة",
];

const arabicNumbers = ["١", "٢", "٣", "٤", "٥", "٦", "٧"];

const barColors = [
  "#1E73BE",
  "#3B6D11",
  "#854F0B",
  "#993556",
  "#1E71BB",
  "#3B6D11",
  "#854F0B",
  "#993556",
  "#1E73BE",
  "#3B6D11",
];

function parseReportSections(text: string | null): string[] {
  if (!text) return [];
  return text
    .split(/(?=##\s)/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export default function ReportContent({ report }: ReportContentProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const configs = isDark ? sectionConfigDark : sectionConfig;
  const sections = parseReportSections(report.reportText);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: isDark ? "#1f2937" : "white",
        border: `0.5px solid ${isDark ? "#374151" : "#e5e7eb"}`,
      }}
    >
      {/* Header */}
      <div
        className="p-5 sm:p-7"
        style={{
          borderBottom: `0.5px solid ${isDark ? "#374151" : "#f3f4f6"}`,
          background: isDark
            ? "linear-gradient(135deg, #1e293b 0%, #1f2937 100%)"
            : "linear-gradient(135deg, #F0F7FF 0%, #ffffff 100%)",
        }}
      >
        <div className="flex items-center gap-3">
          <div>
            <p
              className="text-base sm:text-lg font-bold mb-1"
              style={{ color: isDark ? "#f3f4f6" : "#111827" }}
            >
              تقرير النشاط الرقمي
            </p>
            <p
              className="text-xs sm:text-sm"
              style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
            >
              {new Date(report.reportDate).toLocaleDateString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {" · "}
              {report.totalSessions} جلسات
            </p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div
        className="p-5 sm:p-7 flex flex-col gap-5"
        style={{ direction: "rtl", textAlign: "right" }}
      >
        {sections.map((section, i) => {
          const config = configs[i % configs.length];
          const isLast = i === sections.length - 1;
          const content = section.replace(/^##\s.*\n/, "").trim();

          return (
            <div
              key={i}
              className="rounded-lg sm:rounded-xl"
              style={{
                borderRight: `4px solid ${config.border}`,
                background: isLast ? config.lightBg : config.bg,
                padding: isLast ? "16px 18px" : "4px 16px 4px 0",
              }}
            >
              {/* Section Header */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    background: config.numBg,
                    width: 24,
                    height: 24,
                    color: config.color,
                  }}
                >
                  {arabicNumbers[i] || i + 1}
                </span>
                <p
                  className="text-sm sm:text-base font-bold m-0"
                  style={{ color: config.color }}
                >
                  {sectionTitles[i] || `قسم ${i + 1}`}
                </p>
              </div>

              {/* Content */}
              <div
                style={{
                  color: isLast
                    ? isDark
                      ? "#93C5FD"
                      : "#0C447C"
                    : isDark
                    ? "#d1d5db"
                    : "#374151",
                }}
              >
                <ReactMarkdown
                  components={{
                    h1: () => null,
                    h2: () => null,
                    h3: ({ children }) => (
                      <p
                        className="text-sm sm:text-base font-bold mb-2 mt-3"
                        style={{ color: isDark ? "#f3f4f6" : "#111827" }}
                      >
                        {children}
                      </p>
                    ),
                    p: ({ children }) => (
                      <p
                        className="text-sm sm:text-base mb-2"
                        style={{ lineHeight: 2 }}
                      >
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul
                        className="text-sm sm:text-base my-2"
                        style={{ paddingRight: 20, paddingLeft: 0 }}
                      >
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol
                        className="text-sm sm:text-base my-2"
                        style={{ paddingRight: 20, paddingLeft: 0 }}
                      >
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li
                        className="text-sm sm:text-base mb-1.5"
                        style={{ lineHeight: 2 }}
                      >
                        {children}
                      </li>
                    ),
                    strong: ({ children }) => (
                      <strong
                        className="font-bold"
                        style={{ color: config.color }}
                      >
                        {children}
                      </strong>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Distribution */}
      {report.activityDistribution?.length > 0 && (
        <div
          className="p-5 sm:p-7"
          style={{
            borderBottom: `0.5px solid ${isDark ? "#374151" : "#f3f4f6"}`,
            background: isDark ? "#111827" : "#fafafa",
          }}
        >
          <p
            className="text-xs sm:text-sm font-bold mb-4"
            style={{
              color: isDark ? "#d1d5db" : "#374151",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            توزيع الأنشطة
          </p>
          <div className="flex flex-col gap-3">
            {report.activityDistribution.map((activity, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1.5">
                  <span
                    className="text-xs sm:text-sm font-medium capitalize"
                    style={{ color: isDark ? "#d1d5db" : "#374151" }}
                  >
                    {activity.tag}
                  </span>
                  <span
                    className="text-xs sm:text-sm font-semibold"
                    style={{ color: barColors[i % barColors.length] }}
                  >
                    {activity.percentage}%
                  </span>
                </div>
                <div
                  className="rounded-full h-2"
                  style={{ background: isDark ? "#374151" : "#e5e7eb" }}
                >
                  <div
                    className="rounded-full h-2 transition-all duration-500"
                    style={{
                      background: barColors[i % barColors.length],
                      width: `${activity.percentage}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
