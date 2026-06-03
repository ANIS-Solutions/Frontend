// "use client";
// import ChildrenGrid from "@/app/components/dashboard/children/ChildrenGrid";

// export default function ChildrenPage() {
//   return (
//     <div className="py-6 px-4">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">My Children</h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Manage your children&apos;s profiles and devices
//           </p>
//         </div>
//       </div>

//       <ChildrenGrid modalOpen={modalOpen} setModalOpen={setModalOpen} />
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import ChildrenGrid from "@/app/components/dashboard/children/ChildrenGrid";

export default function ChildrenPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "#1C1C1E" }}>
            My Children
          </h1>
          <p className="text-sm mt-1" style={{ color: "#ABABAF" }}>
            Manage your children&apos;s profiles and devices
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white"
          style={{ background: "#1E71BB", cursor: "pointer" }}
        >
          <Plus size={16} />
          Add Child
        </button>
      </div>

      <ChildrenGrid modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}