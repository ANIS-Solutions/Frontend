"use client";
import { useState } from "react";
import { App } from "@/app/types/api/app.types";
import { useLimitApp } from "@/app/hooks/apps/useLimitApp";
import { X } from "lucide-react";

interface LimitModalProps {
  app: App | null;
  onClose: () => void;
  onSuccess: () => void;
}

const QUICK_LIMITS = [
  { label: "30 min", value: 30 },
  { label: "1 hour", value: 60 },
  { label: "2 hours", value: 120 },
  { label: "3 hours", value: 180 },
];

export default function LimitModal({
  app,
  onClose,
  onSuccess,
}: LimitModalProps) {
  const { mutate, isLoading, error } = useLimitApp();

  const [limit, setLimit] = useState(
    app?.settings.dailyLimit ? String(app.settings.dailyLimit) : "",
  );

  const handleSubmit = async () => {
    if (!app || !limit) return;
    const ok = await mutate(app.packageId, app.childId, parseInt(limit));
    if (ok) {
      onSuccess();
      onClose();
    }
  };

  if (!app) return null;

  return (
    <div
    className="fixed inset-0 z-[9999] flex items-center justify-center"
      // className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full"
        style={{ maxWidth: 380, border: "0.5px solid #e5e7eb" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-semibold" style={{ color: "#111827" }}>
            Set Daily Limit
          </p>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <X size={16} style={{ color: "#6b7280" }} />
          </button>
        </div>
        <p
          className="text-xs mb-4"
          style={{ color: "#6b7280", fontFamily: "monospace" }}
        >
          {app.packageId}
        </p>

        {error && (
          <div
            className="mb-3 p-2.5 rounded-xl text-xs"
            style={{ background: "#FCEBEB", color: "#F72B35" }}
          >
            {error}
          </div>
        )}

        <label
          className="block text-xs font-medium mb-1.5"
          style={{ color: "#6b7280" }}
        >
          Daily Limit (minutes)
        </label>
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          placeholder="e.g. 120"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] mb-3"
        />

        {/* Quick buttons */}
        <div className="flex gap-2 flex-wrap mb-5">
          {QUICK_LIMITS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setLimit(String(value))}
              className="px-3 py-1.5 rounded-full text-xs transition-all"
              style={{
                border:
                  limit === String(value)
                    ? "0.5px solid #1E73BE"
                    : "0.5px solid #e5e7eb",
                background: limit === String(value) ? "#E6F1FB" : "transparent",
                color: limit === String(value) ? "#1E73BE" : "#6b7280",
                fontWeight: limit === String(value) ? 500 : 400,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm"
            style={{
              border: "0.5px solid #e5e7eb",
              background: "transparent",
              cursor: "pointer",
              color: "#6b7280",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !limit}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white"
            style={{
              background: limit ? "#1E73BE" : "#93c5fd",
              border: "none",
              cursor: isLoading || !limit ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            {isLoading ? "Saving..." : "Save Limit"}
          </button>
        </div>
      </div>
    </div>
  );
}
