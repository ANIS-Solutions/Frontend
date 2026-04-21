"use client";

import { useState } from "react";
import Sidebar from "../components/ui/sidebar";
import ProtectedRoute from "@/app/components/ProtectedRoute/protect-route";

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
          className="p-6 transition-all duration-300"
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
