"use client";
import ChildrenGrid from "@/app/components/dashboard/children/ChildrenGrid";

export default function ChildrenPage() {
  return (
    <div className="py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Children</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your children&apos;s profiles and devices
          </p>
        </div>
      </div>

      <ChildrenGrid />
    </div>
  );
}
