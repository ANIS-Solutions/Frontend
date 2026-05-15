"use client";

//Add + Update Form quest
import { useState, FormEvent } from "react";
import {
  Quest,
  QuestType,
  UpdateQuestPayload,
} from "@/app/types/api/quest.types";
import { useAddQuest } from "@/app/hooks/quests/useAddQuest";
import { useUpdateQuest } from "@/app/hooks/quests/useUpdateQuest";
import { X } from "lucide-react";

const QUEST_TYPES: QuestType[] = [
  "Education",
  "Health",
  "Home",
  "Music",
  "Sports",
  "Other",
];

interface QuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  childId: string;
  editQuest?: Quest | null;
}

export default function QuestModal({
  isOpen,
  onClose,
  onSuccess,
  childId,
  editQuest,
}: QuestModalProps) {
  const {
    mutate: addQuest,
    isLoading: addLoading,
    error: addError,
    fieldErrors,
  } = useAddQuest();
  const {
    mutate: updateQuest,
    isLoading: updateLoading,
    error: updateError,
  } = useUpdateQuest();

  const isEdit = !!editQuest;
  const isLoading = isEdit ? updateLoading : addLoading;
  const error = isEdit ? updateError : addError;

  const [formData, setFormData] = useState({
    title: editQuest?.title || "",
    description: editQuest?.description || "",
    type: editQuest?.type || "Education",
    points: editQuest?.points?.toString() || "",
    deadline: editQuest?.deadline
      ? new Date(editQuest.deadline).toISOString().split("T")[0]
      : "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      description: formData.description,
      type: formData.type as QuestType,
      points: parseInt(formData.points),
      deadline: new Date(formData.deadline).toISOString(),
    };

    if (isEdit && editQuest) {
      const result = await updateQuest(
        childId,
        editQuest.id,
        payload as UpdateQuestPayload,
      );
      if (result) {
        onSuccess();
        onClose();
      }
    } else {
      const result = await addQuest(childId, {
        ...payload,
        status: "NOT_STARTED",
      });
      if (result) {
        onSuccess();
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full"
        style={{
          maxWidth: 500,
          border: "0.5px solid #e5e7eb",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-semibold " style={{ color: "#111827" }}>
            {isEdit ? "Edit Quest" : "Add New Quest"}
          </p>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <X size={18} style={{ color: "#6b7280" }} />
          </button>
        </div>

        {error && (
          <div
            className="mb-3 p-3 rounded-xl text-xs"
            style={{ background: "#FCEBEB", color: "#A32D2D" }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "#1E73BE" }}
            >
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Read 2 chapters..."
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] ${fieldErrors?.title ? "border-red-400" : "border-gray-200"}`}
              required
            />
            {fieldErrors?.title && (
              <p className="text-xs mt-1 text-red-500">{fieldErrors.title}</p>
            )}
          </div>

          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "#1E73BE" }}
            >
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Quest details..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className="block text-xs font-medium mb-1.5"
                style={{ color: "#1E73BE" }}
              >
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE]"
              >
                {QUEST_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block text-xs font-medium mb-1.5"
                style={{ color: "#1E73BE" }}
              >
                Points
              </label>
              <input
                type="number"
                name="points"
                value={formData.points}
                onChange={handleChange}
                placeholder="42"
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] ${fieldErrors?.points ? "border-red-400" : "border-gray-200"}`}
                required
              />
              {fieldErrors?.points && (
                <p className="text-xs mt-1 text-red-500">
                  {fieldErrors.points}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "#1E73BE" }}
            >
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] ${fieldErrors?.deadline ? "border-red-400" : "border-gray-200"}`}
              required
            />
            {fieldErrors?.deadline && (
              <p className="text-xs mt-1 text-red-500">
                {fieldErrors.deadline}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm"
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
              {isLoading ? "Saving..." : isEdit ? "Save Changes" : "Add Quest"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
