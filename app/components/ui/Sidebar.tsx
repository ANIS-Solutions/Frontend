"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Shield, MapPin, Menu, Settings } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { useLogout } from "@/app/hooks/auth/useLogout";
import LogoImage from "@/public/imgs/Logo.jpeg";

const links = [
  { name: "Children", href: "/dashboard/children", icon: Users },
  { name: "App Control", href: "/dashboard/app-control", icon: Shield },
  { name: "Location", href: "/dashboard/location", icon: MapPin },
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
    <aside
      className={`fixed top-0 left-0 h-screen w-65 bg-white flex flex-col justify-between p-[20px_15px] shadow-[2px_0_10px_rgba(0,0,0,0.05)] z-[1000] transition-transform duration-300
      ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`absolute top-5 transition-all duration-300 p-2 rounded-lg shadow
        bg-[#1E71BB] text-white hover:bg-[#185d9e]
        ${open ? "right-4 top-10" : "-right-12 top-10"}`}
      >
        <Menu size={20} />
      </button>

      {/* Header */}
      <div className="flex items-center gap-2.5 p-5 border-b border-gray-200">
        <Image src={LogoImage} alt="Logo" width={32} height={32} />
        <h1 className="text-[20px] font-bold text-[#1E71BB]">
          <Link href="/">ANIS</Link>
        </h1>
      </div>

      <div className="flex-1 p-3 flex flex-col gap-1.5">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname.startsWith(link.href);

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[16px] transition-all
              ${
                active
                  ? "bg-[#1E71BB]/10 text-[#1E71BB] font-semibold"
                  : "text-gray-600 hover:text-[#1E71BB] hover:bg-gray-50"
              }`}
            >
              <Icon size={18} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="flex flex-col gap-3.5 w-full pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#1E71BB] text-white flex items-center justify-center font-semibold">
            {initials}
          </div>

          <div>
            <p className="text-[14px] font-medium">{user?.fullName}</p>
            <p className="text-[12px] text-gray-500">{user?.email}</p>
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
  );
}
