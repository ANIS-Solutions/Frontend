// content filter card
"use client";

import { Prompt } from "@/app/types/api/prompt.types";
import { useDeletePrompt } from "@/app/hooks/prompt/useDeletePrompt";
import { Pencil, Trash2 } from "lucide-react";

interface PromptCardProps {
  prompt: Prompt;
  onEdit: (prompt: Prompt) => void;
  onRefetch: () => void;
}

const strictnessConfig = {
  NORMAL: { label: "Normal", bg: "#f3f4f6", color: "#6b7280" },
  RISK: { label: "Risk", bg: "#FEF3C7", color: "#854F0B" },
  HIGH_RISK: { label: "High Risk", bg: "#FCEBEB", color: "#A32D2D" },
};


const actionConfig = {
  BLUR: { label: "Blur", bg: "#FEF3C7", color: "#854F0B" },
  BLOCK: { label: "Block", bg: "#FCEBEB", color: "#A32D2D" },
  SKIP: { label: "Skip", bg: "#f3f4f6", color: "#6b7280" },
};

const categoryEmojis: Record<string, string> = {
  Adult: "🔞",
  Violence: "⚔️",
  Gambling: "🎰",
  Drugs: "💊",
  Alcohol: "🍺",
  Horror: "👻",
  Dance: "💃",
};

export default function PromptCard({
  prompt,
  onEdit,
  onRefetch,
}: PromptCardProps) {
  const { mutate: deletePrompt, isLoading } = useDeletePrompt();

  const handleDelete = async () => {
    const ok = await deletePrompt(prompt.childId, prompt.id);
    if (ok) onRefetch();
  };

  const strictness = strictnessConfig[prompt.LevelOfStrictness];
  const action = actionConfig[prompt.action];
  const emoji = categoryEmojis[prompt.key] || "🛡️";

  return (
    <div
      className="rounded-2xl p-4 flex items-center gap-4 bg-white dark:bg-gray-800 border-[0.5px] border-gray-200 dark:border-gray-700"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
        style={{ background: prompt.threat ? "#FCEBEB" : "#EAF3DE" }}
      >
        {emoji}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{prompt.title}</p>

          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={
              prompt.threat
                ? { background: "#FCEBEB", color: "#A32D2D" }
                : { background: "#EAF3DE", color: "#3B6D11" }
            }
          >
            {prompt.threat ? " Threat" : " Safe"}
          </span>

          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: action.bg, color: action.color }}
          >
            {action.label}
          </span>

          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: strictness.bg, color: strictness.color }}
          >
            {strictness.label}
          </span>
        </div>

        <p className="text-xs truncate text-gray-500 dark:text-gray-400">
          {prompt.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onEdit(prompt)}
          className="p-1.5 rounded-lg border-[0.5px] border-gray-200 dark:border-gray-700"
          style={{
            background: "transparent",
            cursor: "pointer",
          }}
        >
          <Pencil size={13} className="text-gray-400 dark:text-gray-500" />
        </button>
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="p-1.5 rounded-lg"
          style={{
            border: "0.5px solid #fecaca",
            background: "#fff8f8",
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
