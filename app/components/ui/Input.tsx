"use client";

import { COLORS } from "@/app/constants/colors";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="mb-4">
      <label
        className="block text-sm font-medium mb-1"
        style={{ color: COLORS.color_primary }}
      >
        {label}
      </label>

      <input
        className={`w-full px-3 py-2 border rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${error ? "border-red-500" : "border-[#1C1C1E]"}
          placeholder:text-[#FBFBFB]`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
