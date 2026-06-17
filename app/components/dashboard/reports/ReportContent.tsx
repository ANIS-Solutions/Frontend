"use client";
import { Report } from "@/app/types/api/report.types";
import ReactMarkdown from "react-markdown";

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
  const sections = parseReportSections(report.reportText);

  // if (report.generationStatus !== "completed" || !report.reportText) {
  //   return (
  //     <div
  //       className="rounded-2xl p-8 sm:p-16 text-center"
  //       style={{ background: "white", border: "0.5px solid #e5e7eb" }}
  //     >
  //       <div
  //         className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-5"
  //         style={{ borderColor: "#1E73BE", borderTopColor: "transparent" }}
  //       />
  //       <p
  //         className="text-base font-semibold mb-2"
  //         style={{ color: "#111827" }}
  //       >
  //         جاري إنشاء التقرير...
  //       </p>
  //       <p className="text-sm" style={{ color: "#9ca3af" }}>
  //         قد يستغرق هذا بضع دقائق، يرجى المحاولة لاحقاً.
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "white", border: "0.5px solid #e5e7eb" }}
    >
      {/* Header */}
      <div
        className="p-5 sm:p-7"
        style={{
          borderBottom: "0.5px solid #f3f4f6",
          background: "linear-gradient(135deg, #F0F7FF 0%, #ffffff 100%)",
        }}
      >
        <div className="flex items-center gap-3">
          <div>
            <p
              className="text-base sm:text-lg font-bold mb-1"
              style={{ color: "#111827" }}
            >
              تقرير النشاط الرقمي
            </p>
            <p className="text-xs sm:text-sm" style={{ color: "#6b7280" }}>
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
          const config = sectionConfig[i % sectionConfig.length];
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
              <div style={{ color: isLast ? "#0C447C" : "#374151" }}>
                <ReactMarkdown
                  components={{
                    h1: () => null,
                    h2: () => null,
                    h3: ({ children }) => (
                      <p
                        className="text-sm sm:text-base font-bold mb-2 mt-3"
                        style={{ color: "#111827" }}
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
          style={{ borderBottom: "0.5px solid #f3f4f6", background: "#fafafa" }}
        >
          <p
            className="text-xs sm:text-sm font-bold mb-4"
            style={{
              color: "#374151",
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
                    style={{ color: "#374151" }}
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
                  style={{ background: "#e5e7eb" }}
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
