//Page of quests
"use client";
import { useState } from "react";
import { useQuests } from "@/app/hooks/quests/useQuests";
import { Quest, QuestStatus } from "@/app/types/api/quest.types";
import QuestCard from "./QuestCard";
import QuestModal from "./QuestModel";
import { Trophy } from "lucide-react";

type Filter = "ALL" | QuestStatus;

const filters: { id: Filter; label: string }[] = [
  { id: "ALL", label: "All" },
  { id: "NOT_STARTED", label: "Not Started" },
  { id: "IN_PROGRESS", label: "In Progress" },
  { id: "COMPLETED", label: "Completed" },
  { id: "CANCELED", label: "Cancelled" },
  { id: "PENDING", label: "Stopped" },
];

interface QuestsListProps {
  childId: string;
}

export default function QuestsList({ childId }: QuestsListProps) {
  const { quests, isLoading, error, refetch } = useQuests(childId);
  const [filter, setFilter] = useState<Filter>("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editQuest, setEditQuest] = useState<Quest | null>(null);

  const filtered =
    filter === "ALL" ? quests : quests.filter((q) => q.status === filter);

  const stats = {
    total: quests.length,
    inProgress: quests.filter((q) => q.status === "IN_PROGRESS").length,
    completed: quests.filter((q) => q.status === "COMPLETED").length,
    totalPoints: quests
      .filter((q) => q.status === "COMPLETED")
      .reduce((sum, q) => sum + q.points, 0),
  };

  const handleEdit = (quest: Quest) => {
    setEditQuest(quest);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditQuest(null);
    setModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl h-16 animate-pulse"
            style={{ background: "#f3f4f6" }}
          />
        ))}
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
        <button onClick={refetch} className="ml-2 underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Total Quests", value: stats.total, color: "#111827" },
          { label: "In Progress", value: stats.inProgress, color: "#1E73BE" },
          { label: "Completed", value: stats.completed, color: "#3B6D11" },
          {
            label: "Points Earned",
            value: stats.totalPoints,
            color: "#854F0B",
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-2xl p-4"
            style={{ background: "white", border: "0.5px solid #e5e7eb" }}
          >
            <p className="text-xs mb-1.5" style={{ color: "#6b7280" }}>
              {label}
            </p>
            <p className="text-2xl font-bold" style={{ color }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Filter + Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        {/* Filter - scrollable على موبايل */}
        <div className="w-full sm:w-auto overflow-x-auto">
          <div
            className="flex gap-1 p-1 rounded-xl min-w-max"
            style={{ background: "#f3f4f6" }}
          >
            {filters.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className="px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap"
                style={{
                  background: filter === id ? "white" : "transparent",
                  color: filter === id ? "#111827" : "#6b7280",
                  fontWeight: filter === id ? 500 : 400,
                  border: "none",
                  cursor: "pointer",
                  boxShadow:
                    filter === id ? "0 1px 2px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="w-full sm:w-auto px-4 py-2 rounded-xl text-sm font-medium text-white shrink-0"
          style={{ background: "#1E73BE", border: "none", cursor: "pointer" }}
        >
          + Add Quest
        </button>
      </div>

      {/* Quests */}
      {filtered.length === 0 ? (
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: "#f9fafb", border: "0.5px dashed #d1d5db" }}
        >
          <Trophy
            size={32}
            className="mx-auto mb-2"
            style={{ color: "#d1d5db" }}
          />
          <p className="text-sm font-medium mb-1" style={{ color: "#9ca3af" }}>
            {quests.length === 0
              ? "No quests yet"
              : "No quests match this filter"}
          </p>
          <p className="text-xs" style={{ color: "#9ca3af" }}>
            {quests.length === 0
              ? "Add a quest to get started"
              : "Try a different filter"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((quest) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              onEdit={handleEdit}
              onRefetch={refetch}
            />
          ))}
        </div>
      )}

      <QuestModal
        key={editQuest?.id || "new"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={refetch}
        childId={childId}
        editQuest={editQuest}
      />
    </>
  );
}
