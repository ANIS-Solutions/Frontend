// page add , update
"use client";
import { useState, FormEvent } from "react";
import { Prompt, AddPromptPayload, StrictnessLevel, PromptAction } from "@/app/types/api/prompt.types";
import { useAddPrompt } from "@/app/hooks/prompt/useAddPrompt";
import { useUpdatePrompt } from "@/app/hooks/prompt/useUpdatePrompt";
import { X } from "lucide-react";

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  childId: string;
  editPrompt?: Prompt | null;
}

const STRICTNESS_LEVELS: StrictnessLevel[] = ["NORMAL", "HIGH_RISK", "RISK"];
const ACTIONS: PromptAction[] = ["BLUR", "BLOCK", "SKIP"];

export default function PromptModal({
  isOpen,
  onClose,
  onSuccess,
  childId,
  editPrompt,
}: PromptModalProps) {
  const { mutate: addPrompt, isLoading: addLoading, error: addError, fieldErrors } = useAddPrompt();
  const { mutate: updatePrompt, isLoading: updateLoading, error: updateError } = useUpdatePrompt();

  const isEdit = !!editPrompt;
  const isLoading = isEdit ? updateLoading : addLoading;
  const error = isEdit ? updateError : addError;

  const [formData, setFormData] = useState({
    title: editPrompt?.title || "",
    key: editPrompt?.key || "",
    description: editPrompt?.description || "",
    LevelOfStrictness: editPrompt?.LevelOfStrictness || "NORMAL" as StrictnessLevel,
    threat: editPrompt?.threat ?? true,
    action: editPrompt?.action || "BLUR" as PromptAction,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload: AddPromptPayload = {
      title: formData.title,
      key: formData.key,
      description: formData.description,
      LevelOfStrictness: formData.LevelOfStrictness,
      threat: formData.threat,
      action: formData.action,
    };

    if (isEdit && editPrompt) {
      const result = await updatePrompt(childId, editPrompt.id, payload);
      if (result) { onSuccess(); onClose(); }
    } else {
      const result = await addPrompt(childId, payload);
      if (result) { onSuccess(); onClose(); }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)" }}
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl w-full overflow-y-auto border-[0.5px] border-gray-200 dark:border-gray-700"
        style={{ maxWidth: 480, maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            {isEdit ? "Edit Filter" : "Add Content Filter"}
          </p>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <X size={18} className="text-gray-400 dark:text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          {error && (
            <div className="p-3 rounded-xl text-xs" style={{ background: "#FCEBEB", color: "#A32D2D" }}>
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#1E73BE" }}>Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Adult Content"
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] dark:bg-gray-700 dark:text-gray-100 ${fieldErrors?.title ? "border-red-400" : "border-gray-200 dark:border-gray-600"}`}
              required
            />
            {fieldErrors?.title && <p className="text-xs mt-1 text-red-500">{fieldErrors.title}</p>}
          </div>

          {/* Key */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#1E73BE" }}>Key</label>
            <input
              name="key"
              value={formData.key}
              onChange={handleChange}
              placeholder="e.g. Adult"
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] dark:bg-gray-700 dark:text-gray-100 ${fieldErrors?.key ? "border-red-400" : "border-gray-200 dark:border-gray-600"}`}
              required
            />
            {fieldErrors?.key && <p className="text-xs mt-1 text-red-500">{fieldErrors.key}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#1E73BE" }}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what content to filter..."
              rows={3}
              className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] resize-none"
              required
            />
          </div>

          {/* Strictness + Action */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#1E73BE" }}>
                Level of Strictness
              </label>
              <select
                name="LevelOfStrictness"
                value={formData.LevelOfStrictness}
                onChange={handleChange}
                className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE]"
              >
                {STRICTNESS_LEVELS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#1E73BE" }}>Action</label>
              <select
                name="action"
                value={formData.action}
                onChange={handleChange}
                className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE]"
              >
                {ACTIONS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Threat */}
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: "#1E73BE" }}>
              Is this a Threat?
            </label>
            <div className="flex gap-3">
              {[
                { value: true, label: "Threat", activeColor: "#A32D2D", activeBg: "#FCEBEB" },
                { value: false, label: "Safe", activeColor: "#3B6D11", activeBg: "#EAF3DE" },
              ].map(({ value, label, activeColor, activeBg }) => (
                <label
                  key={String(value)}
                  className="flex-1 flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all"
                  style={{
                    border: formData.threat === value ? `2px solid ${activeColor}` : "0.5px solid #e5e7eb",
                    background: formData.threat === value ? activeBg : "transparent",
                  }}
                >
                  <input
                    type="radio"
                    name="threat"
                    checked={formData.threat === value}
                    onChange={() => setFormData((prev) => ({ ...prev, threat: value }))}
                    className="sr-only"
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: formData.threat === value ? activeColor : "#6b7280" }}
                  >
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm text-gray-600 dark:text-gray-300 border-[0.5px] border-gray-200 dark:border-gray-700"
              style={{ background: "transparent", cursor: "pointer" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 rounded-xl text-sm font-medium text-white"
              style={{
                background: "#1E73BE",
                border: "none",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              {isLoading ? "Saving..." : isEdit ? "Save Changes" : "Add Filter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}