"use client";
import { Reward } from "@/app/types/api/reward.types";
import { useDeleteReward } from "@/app/hooks/rewards/useDeleteReward";
import {
  Gift,
  Pencil,
  Trash2,
} from "lucide-react";

interface RewardCardProps {
  reward: Reward;
  onEdit: (reward: Reward) => void;
  onRefetch: () => void;
}

export default function RewardCard({
  reward,
  onEdit,
  onRefetch,
}: RewardCardProps) {
  const { mutate: deleteReward, isLoading: deleteLoading } = useDeleteReward();

  const isLoading = deleteLoading;

  const isRedeemed =
    reward.redemptionType === "ONCE" && reward.timesRedeemed >= 1;

  const isExpired = !isRedeemed && new Date(reward.deadline) < new Date();

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });

  const handleDelete = async () => {
    const ok = await deleteReward(reward.childId, reward.id);
    if (ok) onRefetch();
  };


  return (
    <div
      className="rounded-2xl p-4 flex items-center gap-4 transition-all"
      style={{
        background: isRedeemed ? "#f9fafb" : "white",
        border: `0.5px solid ${isRedeemed ? "#d1d5db" : "#e5e7eb"}`,
        opacity: isRedeemed ? 0.85 : 1,
      }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: isRedeemed ? "#f3f4f6" : "#FEF3C7",
        }}
      >
        <Gift
          size={20}
          style={{ color: isRedeemed ? "#9ca3af" : "#1E73BE" }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p
            className="text-sm font-semibold truncate"
            style={{
              color: isRedeemed ? "#9ca3af" : "#111827",
              textDecoration: isRedeemed ? "line-through" : "none",
            }}
          >
            {reward.name}
          </p>

          {/* Status Badge */}
          {isRedeemed ? (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
              style={{ background: "#EAF3DE", color: "#3B6D11" }}
            >
              Redeemed ✓
            </span>
          ) : isExpired ? (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
              style={{ background: "#fee2e2", color: "#A32D2D" }}
            >
              Expired
            </span>
          ) : (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
              style={{ background: "#FEF3C7", color: "#1E73BE" }}
            >
              Active
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs" style={{ color: "#6b7280" }}>
            ⭐ {reward.pointsCost} pts
          </span>

          <span className="text-xs" style={{ color: "#6b7280" }}>
            {reward.redemptionType === "ONCE" ? "One-time" : "Multiple"} ·{" "}
            {reward.timesRedeemed}x redeemed
          </span>

          {!isRedeemed && (
            <span
              className="text-xs font-medium"
              style={{ color: isExpired ? "#A32D2D" : "#1E73BE" }}
            >
              📅 {isExpired ? "Expired · " : "Due: "}
              {formatDate(reward.deadline)}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 shrink-0">

        {!isRedeemed && (
          <button
            onClick={() => onEdit(reward)}
            disabled={isLoading}
            className="p-1.5 rounded-lg"
            style={{
              border: "0.5px solid #e5e7eb",
              background: "transparent",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            <Pencil size={13} style={{ color: "#6b7280" }} />
          </button>
        )}

        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="p-1.5 rounded-lg"
          style={{
            border: "0.5px solid #fecaca",
            background: "transparent",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.5 : 1,
          }}
        >
          <Trash2 size={13} style={{ color: "#A32D2D" }} />
        </button>
      </div>
    </div>
  );
}