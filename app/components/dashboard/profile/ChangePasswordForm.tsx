"use client";
import { useState, FormEvent } from "react";
import { useChangePassword } from "@/app/hooks/profile/useChangePassword";

const fields = [
  { label: "Current Password", name: "oldPassword" },
  { label: "New Password", name: "password" },
  { label: "Confirm New Password", name: "confirmPassword" },
];

export default function ChangePasswordForm() {
  const { mutate, isLoading, error, success, fieldErrors } =
    useChangePassword();

  const [formData, setFormData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const ok = await mutate(formData);
    if (ok) {
      setFormData({ oldPassword: "", password: "", confirmPassword: "" });
    }
  };

  return (
    <div
      className="rounded-2xl p-6 bg-white dark:bg-gray-800 border-[0.5px] border-gray-200 dark:border-gray-700"
    >
      <p className="text-sm font-semibold mb-1 text-gray-900 dark:text-gray-100">
        Change Password
      </p>
      <p className="text-xs mb-5 text-gray-500 dark:text-gray-400">
        Choose a strong password to keep your account secure
      </p>

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
          className="mb-4 p-3 rounded-xl text-xs"
          style={{ background: "#EAF3DE", color: "#3B6D11" }}
        >
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {fields.map(({ label, name }) => (
          <div key={name}>
            <label
              className="block text-xs font-medium mb-1.5 text-gray-500 dark:text-gray-400"
            >
              {label}
            </label>
            <input
              type="password"
              name={name}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] placeholder:text-gray-300 dark:bg-gray-700 dark:text-gray-100 ${
                fieldErrors[name] ? "border-red-400" : "border-gray-200 dark:border-gray-600"
              }`}
              required
            />
            {fieldErrors[name] && (
              <p className="text-xs mt-1" style={{ color: "#A32D2D" }}>
                {fieldErrors[name]}
              </p>
            )}
          </div>
        ))}

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-white"
            style={{
              background: "#1E73BE",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
