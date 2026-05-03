"use client";
import { useState } from "react";
import PersonalInfoForm from "@/app/components/dashboard/profile/PersonalInfoForm";
import ChangePasswordForm from "@/app/components/dashboard/profile/ChangePasswordForm";
import DangerZone from "@/app/components/dashboard/profile/DangerZone";
import { UserRound, Lock, AlertTriangle } from "lucide-react";

type Tab = "account" | "security" | "danger";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "account", label: "Account", icon: <UserRound size={15} /> },
  { id: "security", label: "Privacy & Security", icon: <Lock size={15} /> },
  { id: "danger", label: "Danger Zone", icon: <AlertTriangle size={15} /> },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("account");

  return (
    <div className="py-6 px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 p-1 rounded-xl w-fit mb-6"
        style={{ background: "var(--color-background-secondary)" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all"
            style={{
              background: activeTab === tab.id ? "white" : "transparent",
              color:
                activeTab === tab.id
                  ? tab.id === "danger"
                    ? "#A32D2D"
                    : "#1E73BE"
                  : "var(--color-text-secondary)",
              fontWeight: activeTab === tab.id ? 500 : 400,
              border: "none",
              cursor: "pointer",
              boxShadow:
                activeTab === tab.id ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {activeTab === "account" && <PersonalInfoForm />}
        {activeTab === "security" && <ChangePasswordForm />}
        {activeTab === "danger" && <DangerZone />}
      </div>
    </div>
  );
}
