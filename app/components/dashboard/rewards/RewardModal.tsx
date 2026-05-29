"use client";
import { useState, FormEvent } from "react";
import {
  Reward,
  RedemptionType,
  UpdateRewardPayload,
} from "@/app/types/api/reward.types";
import { useAddReward } from "@/app/hooks/rewards/useAddReward";
import { useUpdateReward } from "@/app/hooks/rewards/useUpdateReward";
import { X } from "lucide-react";

const REDEMPTION_TYPES: { value: RedemptionType; label: string }[] = [
  { value: "ONCE", label: "One-time" },
  { value: "MULTIPLE", label: "Multiple" },
];

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  childId: string;
  editReward?: Reward | null;
}

export default function RewardModal({
  isOpen,
  onClose,
  onSuccess,
  childId,
  editReward,
}: RewardModalProps) {
  const {
    mutate: addReward,
    isLoading: addLoading,
    error: addError,
    fieldErrors,
  } = useAddReward();
  const {
    mutate: updateReward,
    isLoading: updateLoading,
    error: updateError,
  } = useUpdateReward();

  const isEdit = !!editReward;
  const isLoading = isEdit ? updateLoading : addLoading;
  const error = isEdit ? updateError : addError;

  const [formData, setFormData] = useState({
    name: editReward?.name || "",
    description: editReward?.description || "",
    pointsCost: editReward?.pointsCost?.toString() || "",
    redemptionType: editReward?.redemptionType || "ONCE",
    maxRedemptions: editReward?.maxRedemptions?.toString() || "",
    deadline: editReward?.deadline
      ? new Date(editReward.deadline).toISOString().split("T")[0]
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

    const parsed = parseInt(formData.maxRedemptions);

    const payload = {
      name: formData.name,
      description: formData.description,
      pointsCost: parseInt(formData.pointsCost),
      redemptionType: formData.redemptionType as RedemptionType,
      deadline: new Date(formData.deadline).toISOString(),
      ...(formData.maxRedemptions !== "" && parsed > 0
        ? { maxRedemptions: parsed }
        : {}),
    };

    if (isEdit && editReward) {
      const result = await updateReward(
        childId,
        editReward.id,
        payload as UpdateRewardPayload,
      );
      if (result) {
        onSuccess();
        onClose();
      }
    } else {
      const result = await addReward(childId, payload);
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
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-semibold" style={{ color: "#111827" }}>
            {isEdit ? "Edit Reward" : "Add New Reward"}
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
          {/* Name */}
          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "#1E73BE" }}
            >
              Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Extra screen time..."
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] ${fieldErrors?.name ? "border-red-400" : "border-gray-200"}`}
              required
            />
            {fieldErrors?.name && (
              <p className="text-xs mt-1 text-red-500">{fieldErrors.name}</p>
            )}
          </div>

          {/* Description */}
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
              placeholder="Reward details..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] resize-none"
              required
            />
          </div>

          {/* Points + Redemption Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className="block text-xs font-medium mb-1.5"
                style={{ color: "#1E73BE" }}
              >
                Points Cost
              </label>
              <input
                type="number"
                name="pointsCost"
                value={formData.pointsCost}
                onChange={handleChange}
                placeholder="32"
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] ${fieldErrors?.pointsCost ? "border-red-400" : "border-gray-200"}`}
                required
              />
              {fieldErrors?.pointsCost && (
                <p className="text-xs mt-1 text-red-500">
                  {fieldErrors.pointsCost}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-xs font-medium mb-1.5"
                style={{ color: "#1E73BE" }}
              >
                Redemption Type
              </label>
              <select
                name="redemptionType"
                value={formData.redemptionType}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE]"
              >
                {REDEMPTION_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {formData.redemptionType === "MULTIPLE" && (
            <div>
              <label
                className="block text-xs font-medium mb-1.5"
                style={{ color: "#1E73BE" }}
              >
                Max Redemptions{" "}
                <span style={{ color: "#9ca3af" }}>(optional)</span>
              </label>
              <input
                type="number"
                name="maxRedemptions"
                value={formData.maxRedemptions}
                onChange={handleChange}
                placeholder="Leave empty for unlimited"
                min={1}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE]"
              />
            </div>
          )}

          {/* Deadline */}
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

          {/* Buttons */}
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
              {isLoading ? "Saving..." : isEdit ? "Save Changes" : "Add Reward"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
