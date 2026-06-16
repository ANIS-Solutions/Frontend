"use client";
import { useState } from "react";
import { useChildren } from "@/app/hooks/children/useChildren";
import ChildTabs from "@/app/components/dashboard/location/ChildTabs";
import ReportsList from "@/app/components/dashboard/reports/ReportsList";

export default function ReportsPage() {
  const { children, isLoading: childrenLoading } = useChildren();
  const [selectedChildId, setSelectedChildId] = useState("");

  const effectiveChildId = selectedChildId || children[0]?.id || "";

  if (childrenLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div
          className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: "#1E73BE", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  return (
    <div className="py-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500 mt-1">
          Weekly activity reports for your children
        </p>
      </div>

      <ChildTabs
        items={children}
        selectedId={effectiveChildId}
        onSelect={setSelectedChildId}
      />

      {effectiveChildId ? (
        <ReportsList childId={effectiveChildId} />
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p>No children found. Add a child first.</p>
        </div>
      )}
    </div>
  );
}
