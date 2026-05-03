import { Child } from "@/app/types/api/child.types";

interface ChildTabsProps {
  items: Child[];  
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ChildTabs({ items, selectedId, onSelect }: ChildTabsProps) {
  return (
    <div style={{ borderBottom: "0.5px solid var(--color-border-tertiary)" }} className="flex gap-0 mb-4">
      {items.map((child) => ( 
        <button
          key={child.id}
          onClick={() => onSelect(child.id)}
          className="px-4 py-2 text-sm transition-all"
          style={{
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderBottom: selectedId === child.id ? "2px solid #1E73BE" : "2px solid transparent",
            color: selectedId === child.id ? "#1E73BE" : "var(--color-text-secondary)",
            fontWeight: selectedId === child.id ? 500 : 400,
            background: "transparent",
            cursor: "pointer",
          }}
        >
          {child.firstName}
        </button>
      ))}
    </div>
  );
}