"use client";
import { Child } from "@/app/types/api/child.types";
import { Smartphone, SmartphoneNfc, Calendar, Pencil } from "lucide-react";

interface ChildCardProps {
  child: Child;
  onEdit: (child: Child) => void;
}

export default function ChildCard({ child, onEdit }: ChildCardProps) {
  const isMale = child.gender === "MALE";

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{ background: "white", border: "0.5px solid #e5e7eb" }}
    >
      {/* Color bar */}
      {/* <div style={{ height: 5, background: isMale ? "#1E73BE" : "#993556" }} /> */}

      <div className="p-4 flex flex-col gap-3 flex-1" >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0"
              style={{ background: isMale ? "#E6F1FB" : "#FBEAF0" }}
            >
              {isMale ? "🧒" : "👧"}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{child.firstName}</p>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: isMale ? "#E6F1FB" : "#FBEAF0",
                  color: isMale ? "#0C447C" : "#72243E",
                }}
              >
                {isMale ? "Boy" : "Girl"}
              </span>
            </div>
          </div>

          <button
            onClick={() => onEdit(child)}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ border: "0.5px solid #e5e7eb", background: "transparent", cursor: "pointer" }}
          >
            <Pencil size={14} className="text-gray-400" />
          </button>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar size={13} />
            <span>{new Date(child.dob).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {child.deviceName ? (
              <>
                <Smartphone size={13} className="text-green-500" />
                <span className="text-gray-600">{child.deviceName}</span>
              </>
            ) : (
              <>
                <SmartphoneNfc size={13} className="text-gray-300" />
                <span className="text-gray-400">No device paired</span>
              </>
            )}
          </div>
        </div>

        {/* Hobbies */}
        {child.hobbies.length > 0 && (
          <div>
            <p className="text-xs text-gray-400 mb-1.5">Hobbies</p>
            <div className="flex flex-wrap gap-1.5">
              {child.hobbies.map((h) => (
                <span
                  key={h}
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    background: isMale ? "#E6F1FB" : "#FBEAF0",
                    color: isMale ? "#0C447C" : "#72243E",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Status */}
        <div
          className="flex items-center gap-1.5 pt-2 mt-auto"
          style={{ borderTop: "0.5px solid #f3f4f6" }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: child.isActive ? "#22c55e" : "#9ca3af" }}
          />
          <span className="text-xs text-gray-400">
            {child.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    </div>
  );
}