"use client";

import { useState } from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute/protect-route";
import Sidebar from "@/app/components/ui/Sidebar";
import NotificationBell from "@/app/components/dashboard/notification/NotificationBell";

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
          className="transition-all duration-300"
          style={{ marginLeft: open ? "260px" : "0px" }}
        >
          <div
            className="sticky top-0 z-40 flex items-center justify-end px-6 pt-5 bg-white"
            // style={{ borderBottom: "0.5px solid #e5e7eb" }}
          >
            <NotificationBell />
          </div>
          <div className="p-2">{children}</div>
        </main>
      </ProtectedRoute>
    </div>
  );
}
