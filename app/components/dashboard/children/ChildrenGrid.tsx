"use client";
import { useChildren } from "@/app/hooks/children/useChildren";
import ChildCard from "./ChildCard";
import { Users } from "lucide-react";

export default function ChildrenGrid() {
  const { children, isLoading, error, refetch } = useChildren();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border p-5 h-48 animate-pulse">
            <div className="flex gap-3 mb-4">
              <div className="w-11 h-11 bg-gray-200 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm">
        {error}
        <button onClick={refetch} className="ml-2 underline hover:no-underline">
          Retry
        </button>
      </div>
    );
  }

  if (children.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users size={28} className="text-gray-300" />
        </div>
        <p className="text-lg font-medium text-gray-500">No children added yet</p>
        <p className="text-sm mt-1">Click &quot;Add Child&quot; to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {children.map((child) => (
        <ChildCard key={child.id} child={child} />
      ))}
    </div>
  );
}