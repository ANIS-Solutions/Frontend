"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { CommonQuestionProps } from "@/app/types/faq";

function CollapsibleItem({ title, description }: CommonQuestionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200 last:border-none">
      <button
        className="flex justify-between items-center w-full px-6 py-5 text-left hover:bg-gray-50 transition"
        onClick={toggleCollapse}
      >
        <span className="text-slate-600 font-semibold">{title}</span>

        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">
          {description}
        </div>
      )}
    </div>
  );
}

export default CollapsibleItem;