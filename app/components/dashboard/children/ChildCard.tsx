"use client";
import { Child } from "@/app/types/api/child.types";
import { useRouter } from "next/navigation";
import { Pencil, Smartphone, SmartphoneNfc,UserRound } from "lucide-react";

interface ChildCardProps {
  child: Child;
}

export default function ChildCard({ child }: ChildCardProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 flex flex-col gap-3 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-full flex items-center justify-center ${
            child.gender === "MALE"
              ? "bg-blue-100 text-blue-500"
              : "bg-pink-100 text-pink-500"
          }`}>
            <UserRound size={22} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{child.firstName}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              child.gender === "MALE"
                ? "bg-blue-100 text-blue-600"
                : "bg-pink-100 text-pink-600"
            }`}>
              {child.gender === "MALE" ? "Boy" : "Girl"}
            </span>
          </div>
        </div>

        <button
          onClick={() => router.push(`/dashboard/children/${child.id}/edit`)}
          className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-gray-500 hover:text-[#1E73BE]"
        >
          <Pencil size={16} />
        </button>
      </div>

      <div className="text-sm text-gray-500">
        <span className="font-medium text-gray-700">DOB: </span>
        {new Date(child.dob).toLocaleDateString("en-GB")}
      </div>

      <div className="flex items-center gap-2 text-sm">
        {child.deviceName ? (
          <>
            <Smartphone size={15} className="text-green-500" />
            <span className="text-gray-600">{child.deviceName}</span>
          </>
        ) : (
          <>
          
            <SmartphoneNfc size={15} className="text-gray-300" />
            <span className="text-gray-400 text-xs">No device paired</span>
          </>
        )}
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 mb-1.5">Hobbies</p>
        <div className="flex flex-wrap gap-1.5">
          {child.hobbies.length > 0 ? (
            child.hobbies.map((hobby) => (
              <span
                key={hobby}
                className="bg-[#1E73BE]/10 text-[#1E73BE] text-xs px-2 py-1 rounded-full"
              >
                {hobby}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-400">No hobbies listed</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <div className={`w-2 h-2 rounded-full ${
          child.isActive ? "bg-green-400" : "bg-gray-300"
        }`} />
        <span className="text-xs text-gray-500">
          {child.isActive ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
}