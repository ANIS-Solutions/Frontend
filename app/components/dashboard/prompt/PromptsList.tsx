//page prompt

"use client";
import { useState } from "react";
import { usePrompts } from "@/app/hooks/prompt/usePrompts";
import { Prompt } from "@/app/types/api/prompt.types";
import PromptCard from "./promptCard";
import PromptModal from "./PromptModal";
import { ShieldCheck } from "lucide-react";

interface PromptsListProps {
  childId: string;
}

export default function PromptsList({ childId }: PromptsListProps) {
  const { prompts, isLoading, error, refetch } = usePrompts(childId);
  const [modalOpen, setModalOpen] = useState(false);
  const [editPrompt, setEditPrompt] = useState<Prompt | null>(null);

  const handleEdit = (prompt: Prompt) => {
    setEditPrompt(prompt);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditPrompt(null);
    setModalOpen(true);
  };

  const stats = {
    total: prompts.length,
    threats: prompts.filter((p) => p.threat).length,
    blur: prompts.filter((p) => p.action === "BLUR").length,
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-2xl h-16 animate-pulse bg-gray-100 dark:bg-gray-700" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-xl text-sm" style={{ background: "#FCEBEB", color: "#A32D2D" }}>
        {error}
        <button onClick={refetch} className="ml-2 underline">Retry</button>
      </div>
    );
  }

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Total Filters", value: stats.total, color: "var(--stat-neutral)" },
          { label: "Threats", value: stats.threats, color: "var(--stat-danger)" },
          { label: "Blur Action", value: stats.blur, color: "var(--stat-warning)" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl p-4 bg-white dark:bg-gray-800 border-[0.5px] border-gray-200 dark:border-gray-700">
            <p className="text-xs mb-1.5 text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-2xl font-bold" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-xl text-sm font-medium text-white"
          style={{ background: "#1E73BE", border: "none", cursor: "pointer" }}
        >
          + Add Filter
        </button>
      </div>

      {/* List */}
      {prompts.length === 0 ? (
        <div
          className="rounded-2xl p-8 text-center bg-gray-50 dark:bg-gray-900 border-[0.5px] border-dashed border-gray-300 dark:border-gray-700"
        >
          <ShieldCheck size={32} className="mx-auto mb-2 text-gray-300 dark:text-gray-600" />
          <p className="text-sm font-medium mb-1 text-gray-400 dark:text-gray-500">No filters added yet</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">Add a content filter to protect your child</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onEdit={handleEdit}
              onRefetch={refetch}
            />
          ))}
        </div>
      )}

      <PromptModal
        key={editPrompt?.id || "new"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={refetch}
        childId={childId}
        editPrompt={editPrompt}
      />
    </>
  );
}