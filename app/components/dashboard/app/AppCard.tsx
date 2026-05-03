"use client";
import { App } from "@/app/types/api/app.types";
import { useBlockApp } from "@/app/hooks/apps/useBlockApp";
import { useDeleteApp } from "@/app/hooks/apps/useDeleteApp";
import { Trash2 } from "lucide-react";

interface AppCardProps {
  app: App;
  onSetLimit: (app: App) => void;
  onRefetch: () => void;
}

export default function AppCard({ app, onSetLimit, onRefetch }: AppCardProps) {
  const { mutate: blockApp, isLoading: blockLoading } = useBlockApp();
  const { mutate: deleteApp, isLoading: deleteLoading } = useDeleteApp();

  const isBlocked = app.settings.isBlocked;
  const hasLimit = app.settings.dailyLimit > 0;
  const totalUsage = app.stats.totalUsage;

  const usagePercent = hasLimit
    ? Math.min((totalUsage / app.settings.dailyLimit) * 100, 100)
    : 0;

  const handleBlock = async () => {
    const ok = await blockApp(app.packageId, app.childId, !isBlocked);
    if (ok) onRefetch();
  };

  const handleDelete = async () => {
    const ok = await deleteApp(app.packageId, app.childId);
    if (ok) onRefetch();
  };

  const getStatus = () => {
    if (isBlocked) return { label: "Blocked", bg: "#fee2e2", color: "#F72B35" };
    if (hasLimit) return { label: `Limited · ${app.settings.dailyLimit}min/day`, bg: "#FEF3C7", color: "#854F0B" };
    return { label: "Active", bg: "#EAF3DE", color: "#3B6D11" };
  };

  const status = getStatus();

  const getIconBg = () => {
    if (isBlocked) return { bg: "#fee2e2", stroke: "#F72B35" };
    if (hasLimit) return { bg: "#FEF3C7", stroke: "#854F0B" };
    return { bg: "#E6F1FB", stroke: "#1E73BE" };
  };

  const icon = getIconBg();

  return (
    <div
      className="rounded-2xl p-4 flex items-center gap-4"
      style={{
        background: isBlocked ? "#fff8f8" : "white",
        border: `0.5px solid ${isBlocked ? "#fecaca" : "#e5e7eb"}`,
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: icon.bg }}
      >
        <svg width="22" height="22" fill="none" stroke={icon.stroke} strokeWidth="1.5" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p
            className="text-sm font-semibold truncate"
            style={{ color: "#111827", fontFamily: "monospace" }}
          >
            {app.packageId}
          </p>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
            style={{ background: status.bg, color: status.color }}
          >
            {status.label}
          </span>
        </div>

        {hasLimit && !isBlocked ? (
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-full h-1" style={{ background: "#f3f4f6" }}>
              <div
                className="rounded-full h-1 transition-all"
                style={{
                  background: usagePercent >= 90 ? "#F72B35" : "#854F0B",
                  width: `${usagePercent}%`,
                }}
              />
            </div>
            <span className="text-xs shrink-0" style={{ color: "#854F0B", fontWeight: 500 }}>
              {totalUsage} / {app.settings.dailyLimit} min
            </span>
          </div>
        ) : (
          <p className="text-xs" style={{ color: "#6b7280" }}>
            Total usage: {totalUsage} min · Daily limit: {hasLimit ? `${app.settings.dailyLimit} min` : "None"}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 shrink-0">
        <button
          onClick={handleBlock}
          disabled={blockLoading}
          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{
            border: isBlocked ? "0.5px solid #22c55e" : "0.5px solid #e5e7eb",
            background: isBlocked ? "#EAF3DE" : "transparent",
            color: isBlocked ? "#3B6D11" : "#F72B35",
            cursor: blockLoading ? "not-allowed" : "pointer",
            opacity: blockLoading ? 0.5 : 1,
          }}
        >
          {blockLoading ? "..." : isBlocked ? "Unblock" : "Block"}
        </button>

        <button
          onClick={() => onSetLimit(app)}
          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{
            border: hasLimit ? "0.5px solid #1E73BE" : "0.5px solid #e5e7eb",
            background: hasLimit ? "#E6F1FB" : "transparent",
            color: hasLimit ? "#1E73BE" : "#854F0B",
            cursor: "pointer",
          }}
        >
          {hasLimit ? "Edit Limit" : "Set Limit"}
        </button>

        <button
          onClick={handleDelete}
          disabled={deleteLoading}
          className="p-1.5 rounded-lg transition-all"
          style={{
            border: "0.5px solid #e5e7eb",
            background: "transparent",
            cursor: deleteLoading ? "not-allowed" : "pointer",
            opacity: deleteLoading ? 0.5 : 1,
          }}
        >
          <Trash2 size={13} style={{ color: "#F72B35" }} />
        </button>
      </div>
    </div>
  );
}