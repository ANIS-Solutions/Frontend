"use client";
import { useParams } from "next/navigation";
import { useChild } from "@/app/hooks/children/useChild";
import EditChildForm from "@/app/components/dashboard/children/EditChildForm";

export default function EditChildPage() {
  const { childId } = useParams<{ childId: string }>();
  const { child, isLoading, error } = useChild(childId);

  if (isLoading) {
    return (
      <div className="py-6 px-4 flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-[#1E71BB] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !child) {
    return (
      <div className="py-6 px-4">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
          {error || "Child not found"}
        </div>
      </div>
    );
  }

  return (
    <div>
      <EditChildForm child={child} />
    </div>
  );
}
