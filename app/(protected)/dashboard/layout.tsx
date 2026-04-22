"use client";

import { useState } from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute/protect-route";
import Sidebar from "@/app/components/ui/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen">
      <ProtectedRoute>
        <Sidebar open={open} setOpen={setOpen} />

        <main
          className="p-6 transition-all duration-300 bg-[#FBFBFB]"
          style={{
            marginLeft: open ? "260px" : "0px",
          }}
        >
          {children}
        </main>
      </ProtectedRoute>
    </div>
  );
}
