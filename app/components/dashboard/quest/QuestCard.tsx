//quest Card

//Card of quests

"use client";
import { Quest, QuestStatus } from "@/app/types/api/quest.types";
import { useQuestAction } from "@/app/hooks/quests/useQuestAction";
import {
  BookOpen,
  Dumbbell,
  Heart,
  Home,
  Music,
  Pencil,
  Star,
} from "lucide-react";

interface QuestCardProps {
  quest: Quest;
  onEdit: (quest: Quest) => void;
  onRefetch: () => void;
}

const statusConfig: Record<
  QuestStatus,
  { label: string; bg: string; color: string }
> = {
  NOT_STARTED: { label: "Not Started", bg: "#f3f4f6", color: "#6b7280" },
  IN_PROGRESS: { label: "In Progress", bg: "#E6F1FB", color: "#1E73BE" },
  COMPLETED: { label: "Completed", bg: "#EAF3DE", color: "#3B6D11" },
  CANCELED: { label: "Cancelled", bg: "#fee2e2", color: "#A32D2D" },
  PENDING: { label: "Stopped", bg: "#FEF3C7", color: "#854F0B" },
};

const typeIcons: Record<string, React.ReactNode> = {
  Education: <BookOpen size={20} style={{ color: "#1E73BE" }} />,
  Health: <Heart size={20} style={{ color: "#A32D2D" }} />,
  Home: <Home size={20} style={{ color: "#854F0B" }} />,
  Music: <Music size={20} style={{ color: "#993556" }} />,
  Sports: <Dumbbell size={20} style={{ color: "#3B6D11" }} />,
  Other: <Star size={20} style={{ color: "#6b7280" }} />,
};

export default function QuestCard({
  quest,
  onEdit,
  onRefetch,
}: QuestCardProps) {
  const { mutate: action, isLoading } = useQuestAction();

  const status = statusConfig[quest.status] ?? {
    label: quest.status,
    bg: "#f3f4f6",
    color: "#6b7280",
  };
  const icon = typeIcons[quest.type] || "⭐";
  const isFinished =
    quest.status === "COMPLETED" ||
    quest.status === "CANCELED" ||
    quest.status === "PENDING";

  const handleAction = async (
    act: "start" | "cancel" | "complete" | "stop",
  ) => {
    const ok = await action(act, quest.childId, quest.id);
    if (ok) onRefetch();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

  const isOverdue = !isFinished && new Date(quest.deadline) < new Date();

  return (
    <div
      className="rounded-2xl p-4 flex items-center gap-4 transition-all"
      style={{
        background:
          quest.status === "CANCELED"
            ? "#fff8f8"
            : quest.status === "COMPLETED"
              ? "#f9fafb"
              : "white",
        border: `0.5px solid ${quest.status === "CANCELED" ? "#fecaca" : "#e5e7eb"}`,
        opacity: isFinished ? 0.85 : 1,
      }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: status.bg }}
      >
        {typeIcons[quest.type] ?? (
          <Star size={20} style={{ color: "#6b7280" }} />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p
            className="text-sm font-semibold truncate"
            style={{
              color: isFinished ? "#9ca3af" : "#111827",
              textDecoration: isFinished ? "line-through" : "none",
            }}
          >
            {quest.title}
          </p>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
            style={{ background: status.bg, color: status.color }}
          >
            {status.label}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: "#6b7280" }}>
            {quest.type} · ⭐ {quest.points} pts
          </span>
          {!isFinished && (
            <span
              className="text-xs font-medium"
              style={{ color: isOverdue ? "#A32D2D" : "#854F0B" }}
            >
              📅 {isOverdue ? "Overdue · " : "Due: "}
              {formatDate(quest.deadline)}
            </span>
          )}
          {quest.status === "COMPLETED" && (
            <span className="text-xs font-medium" style={{ color: "#3B6D11" }}>
              +{quest.points} pts earned ✓
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      {!isFinished && (
        <div className="flex gap-2 shrink-0">
          {quest.status === "NOT_STARTED" && (
            <button
              onClick={() => handleAction("start")}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{
                border: "0.5px solid #1E73BE",
                background: "#E6F1FB",
                color: "#1E73BE",
                cursor: "pointer",
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              Start
            </button>
          )}

          {quest.status === "IN_PROGRESS" && (
            <>
              <button
                onClick={() => handleAction("complete")}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{
                  border: "0.5px solid #22c55e",
                  background: "#EAF3DE",
                  color: "#3B6D11",
                  cursor: "pointer",
                  opacity: isLoading ? 0.5 : 1,
                }}
              >
                Complete
              </button>
              <button
                onClick={() => handleAction("stop")}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{
                  border: "0.5px solid #FEF3C7",
                  background: "#FEF3C7",
                  color: "#854F0B",
                  cursor: "pointer",
                  opacity: isLoading ? 0.5 : 1,
                }}
              >
                Stop
              </button>
            </>
          )}

          <button
            onClick={() => handleAction("cancel")}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{
              border: "0.5px solid #e5e7eb",
              background: "transparent",
              color: "#A32D2D",
              cursor: "pointer",
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            Cancel
          </button>

          <button
            onClick={() => onEdit(quest)}
            className="p-1.5 rounded-lg"
            style={{
              border: "0.5px solid #e5e7eb",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            <Pencil size={13} style={{ color: "#6b7280" }} />
          </button>
        </div>
      )}
    </div>
  );
}
