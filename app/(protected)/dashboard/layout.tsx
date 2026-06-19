"use client";

import { useState } from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute/protect-route";
import Sidebar from "@/app/components/ui/Sidebar";
import NotificationBell from "@/app/components/dashboard/notification/NotificationBell";
import ThemeToggle from "@/app/components/ui/ThemeToggle";
import { ThemeProvider } from "@/app/context/ThemeContext";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <ProtectedRoute>
          <Sidebar open={open} setOpen={setOpen} />

          {/* Mobile top bar */}
          <div className="md:hidden fixed top-0 left-0 right-0 z-30 h-14 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between px-4">
            <button
              onClick={() => setOpen(true)}
              className="p-2 rounded-lg bg-[#1E71BB] text-white"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-1">
              <ThemeToggle />
              <NotificationBell />
            </div>
          </div>

          <main className="md:ml-64 transition-all duration-300">
            {/* Desktop icons */}
            <div className="hidden md:flex sticky top-0 z-40 items-center justify-end gap-3 px-6 pt-5 bg-white dark:bg-gray-900">
              <ThemeToggle />
              <NotificationBell />
            </div>

            <div className="p-4 pt-14 md:pt-2">{children}</div>
          </main>
        </ProtectedRoute>
      </div>
    </ThemeProvider>
  );
}