"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 rounded-xl transition-all border-[0.5px] border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 cursor-pointer"
    >
      {theme === "dark" ? (
        <Sun size={18} className="text-gray-400 dark:text-gray-300" />
      ) : (
        <Moon size={18} className="text-gray-500" />
      )}
    </button>
  );
}
