"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Shield,
  MapPin,
  Menu,
  X,
  Settings,
  Trophy,
  Award,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { useLogout } from "@/app/hooks/auth/useLogout";
import LogoImage from "@/public/imgs/Logo.jpeg";
import NotificationBell from "@/app/components/dashboard/notification/NotificationBell";
import ThemeToggle from "@/app/components/ui/ThemeToggle";

const links = [
  { name: "Children", href: "/dashboard/children", icon: Users },
  { name: "App Control", href: "/dashboard/app-control", icon: Shield },
  { name: "Location", href: "/dashboard/location", icon: MapPin },
  { name: "Content Filter", href: "/dashboard/prompt", icon: ShieldCheck },
  { name: "Quests", href: "/dashboard/quests", icon: Trophy },
  { name: "Rewards", href: "/dashboard/rewards", icon: Award },
  { name: "Reports", href: "/dashboard/report", icon: FileText },
  { name: "Setting", href: "/dashboard/profile", icon: Settings },
];

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { logout } = useLogout();

  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : "?";

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#1E71BB] text-white shadow-md"
        >
          <Menu size={20} />
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800
          flex flex-col justify-between p-[20px_15px]
          shadow-[2px_0_10px_rgba(0,0,0,0.05)]
          transition-transform duration-300
          md:translate-x-0 md:z-30
          ${open ? "translate-x-0 z-50" : "-translate-x-full z-50"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2.5">
            <Image src={LogoImage} alt="Logo" width={32} height={32} />
            <h1 className="text-[20px] font-bold text-[#1E71BB]">
              <Link href="/">ANIS</Link>
            </h1>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden p-1 rounded-lg text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 p-3 flex flex-col gap-1.5 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[16px] transition-all
                  ${
                    active
                      ? "bg-[#1E71BB]/10 text-[#1E71BB] font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:text-[#1E71BB] hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
              >
                <Icon size={18} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3.5 w-full pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#1E71BB] text-white flex items-center justify-center font-semibold">
              {initials}
            </div>
            <div>
              <p className="text-[14px] font-medium dark:text-gray-100">
                {user?.fullName}
              </p>
              <p className="text-[12px] text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full py-2.5 bg-red-500 text-white rounded-lg text-[14px] transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
