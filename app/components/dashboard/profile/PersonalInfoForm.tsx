"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useUpdateProfile } from "@/app/hooks/profile/useUpdateProfile";
import { FormEvent, useState } from "react";

export default function PersonalInfoForm() {
  const { user } = useAuth();
  const { mutate, isLoading, error, success, fieldErrors } = useUpdateProfile();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    birthDate: user?.birthDate
      ? new Date(user.birthDate).toISOString().split("T")[0]
      : "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await mutate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      birthDate: formData.birthDate
        ? new Date(formData.birthDate)
            .toLocaleDateString("en-GB")
            .split("/")
            .reverse()
            .join("/")
        : undefined,
    });
  };

  const initials = user
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase()
    : "?";

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-tertiary)",
      }}
    >
      <p
        className="text-sm font-semibold mb-5"
        style={{ color: "var(--color-text-primary)" }}
      >
        Profile Information
      </p>

      <div
        className="flex items-center gap-4 mb-6 pb-5"
        style={{ borderBottom: "0.5px solid var(--color-border-tertiary)" }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white shrink-0"
          style={{ background: "#1E73BE" }}
        >
          {initials}
        </div>

        {/* Initial */}
        <div>
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--color-text-primary)" }}
          >
            {user?.fullName}
          </p>
          <p
            className="text-xs mb-1"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {user?.email}
          </p>
          <div
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ background: "#EAF3DE", color: "#3B6D11" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            {user?.isVerified ? "Verified" : "Not Verified"}
          </div>
        </div>
      </div>

      {/* Alert */}
      {error && (
        <div
          className="mb-4 p-3 rounded-xl text-xs"
          style={{ background: "#FCEBEB", color: "#A32D2D" }}
        >
          {error}
        </div>
      )}
      {success && (
        <div
          className="mb-4 p-3 rounded-[5px] text-xs"
          style={{ background: "#EAF3DE", color: "#3B6D11" }}
        >
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "var(--color-text-secondary)" }}
            >
              First Name
            </label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] placeholder:text-gray-300 dark:bg-gray-700 dark:text-gray-100 ${
                fieldErrors.firstName ? "border-red-400" : "border-gray-200 dark:border-gray-600"
              }`}
            />
            {fieldErrors.firstName && (
              <p className="text-xs mt-1" style={{ color: "#A32D2D" }}>
                {fieldErrors.firstName}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Last Name
            </label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] placeholder:text-gray-300 dark:bg-gray-700 dark:text-gray-100 ${
                fieldErrors.lastName ? "border-red-400" : "border-gray-200 dark:border-gray-600"
              }`}
            />
            {fieldErrors.lastName && (
              <p className="text-xs mt-1" style={{ color: "#A32D2D" }}>
                {fieldErrors.lastName}
              </p>
            )}
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Email Address (read only)
            </label>
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2.5"
              style={{
                border: "0.5px solid var(--color-border-tertiary)",
                background: "var(--color-background-secondary)",
              }}
            >
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span
                className="text-sm"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {user?.email}
              </span>
            </div>
          </div>

          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Phone Number
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] placeholder:text-gray-300 dark:bg-gray-700 dark:text-gray-100 ${
                fieldErrors.phone ? "border-red-400" : "border-gray-200 dark:border-gray-600"
              }`}
            />
            {fieldErrors.phone && (
              <p className="text-xs mt-1" style={{ color: "#A32D2D" }}>
                {fieldErrors.phone}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Birth Date
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] placeholder:text-gray-300 dark:bg-gray-700 dark:text-gray-100 ${
                fieldErrors.birthDate ? "border-red-400" : "border-gray-200 dark:border-gray-600"
              }`}
            />
            {fieldErrors.birthDate && (
              <p className="text-xs mt-1" style={{ color: "#A32D2D" }}>
                {fieldErrors.birthDate}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div
          className="flex flex-col sm:flex-row justify-end gap-3 pt-4"
          style={{ borderTop: "0.5px solid var(--color-border-tertiary)" }}
        >
          <button
            type="button"
            onClick={() =>
              setFormData({
                firstName: user?.firstName || "",
                lastName: user?.lastName || "",
                phone: user?.phone || "",
                birthDate: user?.birthDate
                  ? new Date(user.birthDate).toISOString().split("T")[0]
                  : "",
              })
            }
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm"
            style={{
              border: "0.5px solid var(--color-border-secondary)",
              background: "transparent",
              cursor: "pointer",
              color: "var(--color-text-secondary)",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-medium text-white"
            style={{
              background: "#1E73BE",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
