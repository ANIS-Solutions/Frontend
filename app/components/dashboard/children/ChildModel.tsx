"use client";
import { useState, FormEvent } from "react";
import { useAddChild } from "@/app/hooks/children/useAddChild";
import { useUpdateChild } from "@/app/hooks/children/useUpdateChild";
import {
  Child,
  AddChildPayload,
  UpdateChildPayload,
} from "@/app/types/api/child.types";
import Image from "next/image";
import { X, Plus, ScanLine } from "lucide-react";

interface ChildModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editChild?: Child | null;
}

export default function ChildModal({
  isOpen,
  onClose,
  onSuccess,
  editChild,
}: ChildModalProps) {
  const {
    mutate: addChild,
    isLoading: addLoading,
    error: addError,
    fieldErrors,
  } = useAddChild();
  const {
    mutate: updateChild,
    isLoading: updateLoading,
    error: updateError,
  } = useUpdateChild();

  const isEdit = !!editChild;
  const isLoading = isEdit ? updateLoading : addLoading;
  const error = isEdit ? updateError : addError;

  const [formData, setFormData] = useState({
    firstName: editChild?.firstName || "",
    // lastName: editChild?.lastName || "",
    gender: editChild?.gender || "MALE",
    hobbies: editChild?.hobbies || [],
    dob: editChild?.dob
      ? new Date(editChild.dob).toISOString().split("T")[0]
      : "",
  });

  const [hobbyInput, setHobbyInput] = useState("");
  const [qrData, setQrData] = useState<{
    qrcode: string;
    pairToken: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addHobby = () => {
    const trimmed = hobbyInput.trim();
    if (trimmed && !formData.hobbies.includes(trimmed)) {
      setFormData((prev) => ({ ...prev, hobbies: [...prev.hobbies, trimmed] }));
    }
    setHobbyInput("");
  };

  const removeHobby = (hobby: string) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.filter((h) => h !== hobby),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isEdit && editChild) {
      const payload: UpdateChildPayload = {
        firstName: formData.firstName,
        gender: formData.gender as "MALE" | "FEMALE",
        hobbies: formData.hobbies,
        dob: formData.dob,
      };
      const result = await updateChild(editChild.id, payload);
      if (result) {
        onSuccess();
        onClose();
      }
    } else {
      const payload: AddChildPayload = {
        firstName: formData.firstName,
        // lastName: formData.lastName,
        gender: formData.gender as "MALE" | "FEMALE",
        hobbies: formData.hobbies,
        dob: formData.dob,
      };
      const result = await addChild(payload);
      if (result) {
        setQrData({ qrcode: result.qrcode, pairToken: result.pairToken });
      }
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
        style={{
          maxWidth: 480,
          maxHeight: "90vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* QR Screen */}
        {qrData ? (
          <div className="p-8 text-center">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
              {formData.firstName} added!
            </h2>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
              Scan the QR code on the child&apos;s device to pair
            </p>

            <div className="relative flex justify-center mb-6">
              <div className="relative">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[#1E73BE] rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-[#1E73BE] rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-[#1E73BE] rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[#1E73BE] rounded-br-lg" />
                <div className="p-4">
                  <Image
                    src={qrData.qrcode}
                    alt="QR Code"
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onSuccess();
                onClose();
              }}
              className="w-full py-3 bg-[#1E73BE] text-white rounded-xl text-sm font-semibold"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                {isEdit ? `Edit ${editChild?.firstName}` : "Add Child"}
              </p>
              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <X size={18} className="text-gray-400 dark:text-gray-500" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
              {error && (
                <div
                  className="p-3 rounded-xl text-xs"
                  style={{ background: "#FCEBEB", color: "#A32D2D" }}
                >
                  {error}
                </div>
              )}

              {/* Name */}
              <div className="grid gap-3">
                <div>
                  <label
                    className="block text-xs font-medium mb-1.5"
                    style={{ color: "#1E73BE" }}
                  >
                    First Name
                  </label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Ahmed"
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] placeholder:text-gray-300 dark:bg-gray-700 dark:text-gray-100 ${fieldErrors?.firstName ? "border-red-400" : "border-gray-200 dark:border-gray-600"}`}
                    required
                  />
                  {fieldErrors?.firstName && (
                    <p className="text-xs mt-1 text-red-500">
                      {fieldErrors.firstName}
                    </p>
                  )}
                </div>
              </div>

              {/* DOB */}
              <div>
                <label
                  className="block text-xs font-medium mb-1.5"
                  style={{ color: "#1E73BE" }}
                >
                  Birth Date
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] text-gray-600 dark:text-gray-300"
                  required
                />
                {fieldErrors?.dob && (
                  <p className="text-xs mt-1 text-red-500">{fieldErrors.dob}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label
                  className="block text-xs font-medium mb-2"
                  style={{ color: "#1E73BE" }}
                >
                  Gender
                </label>
                <div className="flex gap-3">
                  {[
                    {
                      value: "MALE",
                      label: "Boy",
                      emoji: "🧒",
                      activeColor: "#1E73BE",
                      activeBg: "#E6F1FB",
                    },
                    {
                      value: "FEMALE",
                      label: "Girl",
                      emoji: "👧",
                      activeColor: "#993556",
                      activeBg: "#FBEAF0",
                    },
                  ].map(({ value, label, emoji, activeColor, activeBg }) => (
                    <label
                      key={value}
                      className="flex-1 flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                      style={{
                        border:
                          formData.gender === value
                            ? `2px solid ${activeColor}`
                            : "0.5px solid #e5e7eb",
                        background:
                          formData.gender === value ? activeBg : "transparent",
                      }}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={value}
                        checked={formData.gender === value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="text-xl">{emoji}</span>
                      <span
                        className="text-sm font-medium"
                        style={{
                          color:
                            formData.gender === value ? activeColor : "#6b7280",
                        }}
                      >
                        {label}
                      </span>
                      <div
                        className="ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center"
                        style={{
                          borderColor:
                            formData.gender === value ? activeColor : "#d1d5db",
                        }}
                      >
                        {formData.gender === value && (
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ background: activeColor }}
                          />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Hobbies */}
              <div>
                <label
                  className="block text-xs font-medium mb-1.5"
                  style={{ color: "#1E73BE" }}
                >
                  Hobbies{" "}
                  <span className="font-normal text-gray-400 dark:text-gray-500">(optional)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    value={hobbyInput}
                    onChange={(e) => setHobbyInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addHobby())
                    }
                    placeholder="e.g. Swimming"
                    className="flex-1 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] placeholder:text-gray-300"
                  />
                  <button
                    type="button"
                    onClick={addHobby}
                    className="p-3 rounded-xl text-white"
                    style={{
                      background: "#1E73BE",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Plus size={18} />
                  </button>
                </div>
                {formData.hobbies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.hobbies.map((h) => (
                      <span
                        key={h}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full"
                        style={{ background: "#E6F1FB", color: "#0C447C" }}
                      >
                        {h}
                        <button
                          type="button"
                          onClick={() => removeHobby(h)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#0C447C",
                          }}
                        >
                          <X size={11} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Scan */}
              {!isEdit && (
                <div className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 text-center bg-gray-50 dark:bg-gray-900">
                  <ScanLine
                    size={22}
                    className="mx-auto mb-1.5"
                    style={{ color: "#1E73BE" }}
                  />
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#1E73BE" }}
                  >
                    Scan to connect
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    QR will appear after saving
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl text-sm text-gray-600 dark:text-gray-300 border-[0.5px] border-gray-200 dark:border-gray-700"
                  style={{
                    background: "transparent",
                    cursor: "pointer",
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
                  {isLoading
                    ? "Saving..."
                    : isEdit
                      ? "Save Changes"
                      : "Save Child"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
