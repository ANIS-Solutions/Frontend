"use client";
import { useState } from "react";
import { useChildren } from "@/app/hooks/children/useChildren";
import { Child } from "@/app/types/api/child.types";
import ChildCard from "./ChildCard";
import ChildModal from "./ChildModel";
import { Users, Plus } from "lucide-react";

interface Props {
  modalOpen: boolean;
  setModalOpen: (v: boolean) => void;
}

export default function ChildrenGrid({ modalOpen, setModalOpen }: Props) {
  const { children, isLoading, error, refetch } = useChildren();
  const [editChild, setEditChild] = useState<Child | null>(null);

  const handleEdit = (child: Child) => {
    setEditChild(child);
    setModalOpen(true);
  };

  const stats = {
    total: children.length,
    paired: children.filter((c) => c.deviceId).length,
    notPaired: children.filter((c) => !c.deviceId).length,
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border h-48 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-xl text-sm" style={{ background: "#FCEBEB", color: "#A32D2D" }}>
        {error}
        <button onClick={refetch} className="ml-2 underline">Retry</button>
      </div>
    );
  }

  return (
    <>
      {/* Stats */}
      {children.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Total", value: stats.total, color: "#111827" },
            { label: "Paired", value: stats.paired, color: "#3B6D11" },
            { label: "Not Paired", value: stats.notPaired, color: "#854F0B" },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-2xl p-4" style={{ background: "white", border: "0.5px solid #e5e7eb" }}>
              <p className="text-xs mb-1.5 text-gray-500">{label}</p>
              <p className="text-2xl font-bold" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Grid */}
      {children.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={28} className="text-gray-300" />
          </div>
          <p className="text-base font-medium text-gray-500 mb-1">No children added yet</p>
          <p className="text-sm text-gray-400">Add your first child to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {children.map((child) => (
            <ChildCard key={child.id} child={child} onEdit={handleEdit} />
          ))}

          {/* Add Card */}
      
        </div>
      )}

      <ChildModal
        key={editChild?.id || "new"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={refetch}
        editChild={editChild}
      />
    </>
  );
}
// "use client";
// import { useState } from "react";
// import { useChildren } from "@/app/hooks/children/useChildren";
// import { Child } from "@/app/types/api/child.types";
// import ChildCard from "./ChildCard";
// import ChildModal from "./ChildModel";
// import { Users, Plus } from "lucide-react";

// export default function ChildrenGrid() {
//   const { children, isLoading, error, refetch } = useChildren();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editChild, setEditChild] = useState<Child | null>(null);

//   const handleAdd = () => {
//     setEditChild(null);
//     setModalOpen(true);
//   };

//   const handleEdit = (child: Child) => {
//     setEditChild(child);
//     setModalOpen(true);
//   };

//   const stats = {
//     total: children.length,
//     paired: children.filter((c) => c.deviceId).length,
//     notPaired: children.filter((c) => !c.deviceId).length,
//   };

//   if (isLoading) {
//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {[...Array(3)].map((_, i) => (
//           <div key={i} className="bg-white rounded-2xl border h-48 animate-pulse" />
//         ))}
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 rounded-xl text-sm" style={{ background: "#FCEBEB", color: "#A32D2D" }}>
//         {error}
//         <button onClick={refetch} className="ml-2 underline">Retry</button>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Stats */}
//       {children.length > 0 && (
//         <div className="grid grid-cols-3 gap-3 mb-5">
//           {[
//             { label: "Total", value: stats.total, color: "#111827" },
//             { label: "Paired", value: stats.paired, color: "#3B6D11" },
//             { label: "Not Paired", value: stats.notPaired, color: "#854F0B" },
//           ].map(({ label, value, color }) => (
//             <div key={label} className="rounded-2xl p-4" style={{ background: "white", border: "0.5px solid #e5e7eb" }}>
//               <p className="text-xs mb-1.5 text-gray-500">{label}</p>
//               <p className="text-2xl font-bold" style={{ color }}>{value}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Grid */}
//       {children.length === 0 ? (
//         <div className="text-center py-16">
//           <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Users size={28} className="text-gray-300" />
//           </div>
//           <p className="text-base font-medium text-gray-500 mb-1">No children added yet</p>
//           <p className="text-sm text-gray-400 mb-5">Add your first child to get started</p>
//           <button
//             onClick={handleAdd}
//             className="px-5 py-2.5 rounded-xl text-sm font-medium text-white"
//             style={{ background: "#1E73BE", border: "none", cursor: "pointer" }}
//           >
//             + Add Child
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {children.map((child) => (
//             <ChildCard key={child.id} child={child} onEdit={handleEdit} />
//           ))}

//           {/* Add Card */}
//           <button
//             onClick={handleAdd}
//             className="rounded-2xl flex flex-col items-center justify-center gap-3 min-h-45 transition-all hover:border-[#1E73BE]"
//             style={{
//               background: "#f9fafb",
//               border: "0.5px dashed #d1d5db",
//               cursor: "pointer",
//             }}
//           >
//             <div
//               className="w-10 h-10 rounded-full flex items-center justify-center"
//               style={{ background: "white", border: "0.5px solid #e5e7eb" }}
//             >
//               <Plus size={18} className="text-gray-400" />
//             </div>
//             <p className="text-sm text-gray-400">Add Child</p>
//           </button>
//         </div>
//       )}

//       <ChildModal
//         key={editChild?.id || "new"}
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         onSuccess={refetch}
//         editChild={editChild}
//       />
//     </>
//   );
// }