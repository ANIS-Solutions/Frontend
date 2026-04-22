import ChildrenGrid from "@/app/components/dashboard/children/ChildrenGrid";
import Link from "next/link";

export default function ChildrenPage() {
  return (
    <div className="py-6 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Children</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your children&apos;s profiles
          </p>
        </div>
        <Link
          href="/dashboard/children/add"
          className="bg-[#1E71BB] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#185d9e] transition"
        >
          + Add Child
        </Link>
      </div>

      <ChildrenGrid />
    </div>
  );
}
