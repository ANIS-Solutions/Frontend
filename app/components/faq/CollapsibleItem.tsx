"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleItemProps {
  title: string;
  description: string;
  defaultOpen?: boolean;
}

function CollapsibleItem({ title, description, defaultOpen = false }: CollapsibleItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#E5E7EB] last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-5 text-left hover:bg-[#F9FAFB] transition-colors"
      >
        <span className="text-sm md:text-base font-medium text-[#2F3E4E] pr-4">
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#9CA3AF] flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-5 pb-4 text-sm text-[#6B7280] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default CollapsibleItem;