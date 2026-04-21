"use client";

import { useChildren } from "@/app/hooks/useChildren";
import { Child } from "@/app/types/api/child.types";
import { useState } from "react";
import ChildCard from "../../components/children/ChildCard";
import AddChildForm from "../../components/children/AddChildForm";
import UpdateChildForm from "../../components/children/UpdateChildForm";

type Mode = "list" | "add" | "edit";

export default function ChildrenPage() {
  const { children, loading, error, refetch } = useChildren();
  const [mode, setMode] = useState<Mode>("list");
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  function handleEditClick(child: Child) {
    setSelectedChild(child);
    setMode("edit");
  }

  function handleSuccess() {
    refetch();
    setMode("list");
    setSelectedChild(null);
  }

  return (
    <h1>Hi</h1>
    // <div className="min-h-screen bg-gray-50 py-8 px-4">
    //   <div className="max-w-4xl mx-auto">
    //     {/* Header */}
    //     <div className="flex items-center justify-between mb-8">
    //       <div>
    //         <h1 className="text-3xl font-bold text-gray-900">My Children</h1>
    //         <p className="text-gray-500 text-sm mt-1">
    //           Manage your children&apos;s profiles
    //         </p>
    //       </div>
    //       {mode === "list" ? (
    //         <button
    //           onClick={() => setMode("add")}
    //           className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
    //         >
    //           + Add Child
    //         </button>
    //       ) : (
    //         <button
    //           onClick={() => {
    //             setMode("list");
    //             setSelectedChild(null);
    //           }}
    //           className="text-sm text-gray-500 hover:text-gray-700 transition"
    //         >
    //           ← Back to list
    //         </button>
    //       )}
    //     </div>

    //     {/* Content */}
    //     {mode === "list" && (
    //       <>
    //         {loading && (
    //           <div className="text-center py-16 text-gray-400">
    //             Loading children...
    //           </div>
    //         )}
    //         {error && (
    //           <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
    //             {error}
    //             <button
    //               onClick={refetch}
    //               className="ml-2 underline hover:no-underline"
    //             >
    //               Retry
    //             </button>
    //           </div>
    //         )}
    //         {!loading && !error && children.length === 0 && (
    //           <div className="text-center py-16 text-gray-400">
    //             <p className="text-5xl mb-4">👶</p>
    //             <p className="text-lg font-medium">No children added yet</p>
    //             <p className="text-sm mt-1">Click &quot;Add Child&quot; to get started</p>
    //           </div>
    //         )}
    //         {!loading && children.length > 0 && (
    //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    //             {children.map((child) => (
    //               <ChildCard
    //                 key={child._id}
    //                 child={child}
    //                 onEditClick={handleEditClick}
    //               />
    //             ))}
    //           </div>
    //         )}
    //       </>
    //     )}

    //     {mode === "add" && (
    //       <div className="bg-white rounded-xl shadow-sm border p-6 max-w-lg mx-auto">
    //         <AddChildForm onSuccess={handleSuccess} />
    //       </div>
    //     )}

    //     {mode === "edit" && selectedChild && (
    //       <div className="bg-white rounded-xl shadow-sm border p-6 max-w-lg mx-auto">
    //         <UpdateChildForm child={selectedChild} onSuccess={handleSuccess} />
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
}
