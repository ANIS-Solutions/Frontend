"use client";
import { Child } from "@/app/types/api/child.types";

interface ChildTabsProps {
  items: Child[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ChildTabs({ items, selectedId, onSelect }: ChildTabsProps) {
  return (
    <div
      className="mb-4 overflow-x-auto border-b-[0.5px] border-gray-200 dark:border-gray-700"
    >
      <div className="flex gap-0 min-w-max">
        {items.map((child) => (
          <button
            key={child.id}
            onClick={() => onSelect(child.id)}
            className="px-4 py-2 text-sm transition-all whitespace-nowrap"
            style={{
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: selectedId === child.id
                ? "2px solid #1E73BE"
                : "2px solid transparent",
              color: selectedId === child.id ? "#1E73BE" : "#6b7280",
              fontWeight: selectedId === child.id ? 500 : 400,
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {child.firstName}
          </button>
        ))}
      </div>
    </div>
  );
}