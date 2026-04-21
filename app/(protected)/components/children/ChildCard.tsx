"use client";

import { Child } from "@/app/types/api/child.types";

interface ChildCardProps {
  child: Child;
  onEditClick: (child: Child) => void;
}

export default function ChildCard({ child, onEditClick }: ChildCardProps) {
const genderLabel = child.gender === "MALE" ? "Male" : "Female";
const genderIcon = child.gender === "MALE" ? "👦" : "👧";

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 flex flex-col gap-3 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{genderIcon}</span>
          <div>
            <h3 className="font-semibold text-lg">
              {child.firstName} {child.lastName}
            </h3>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                child.gender
                  ? "bg-blue-100 text-blue-600"
                  : "bg-pink-100 text-pink-600"
              }`}
            >
              {genderLabel}
            </span>
          </div>
        </div>
        <button
          onClick={() => onEditClick(child)}
          className="text-sm px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          ✏️ Edit
        </button>
      </div>

      <div className="text-sm text-gray-500">
        <span className="font-medium text-gray-700">DOB:</span> {child.dob}
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 mb-1.5">Hobbies</p>
        <div className="flex flex-wrap gap-1.5">
          {child.hobbies.length > 0 ? (
            child.hobbies.map((hobby) => (
              <span
                key={hobby}
                className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full"
              >
                {hobby}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-400">No hobbies listed</span>
          )}
        </div>
      </div>
    </div>
  );
}
