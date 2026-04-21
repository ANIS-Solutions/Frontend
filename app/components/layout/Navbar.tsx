"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import LogoAnis from "@/public/imgs/Logo.jpeg";
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-works" },
  { label: "For Parents", href: "/for-parents" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, token, logout, isLoading } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/home" className="flex items-center gap-2">
              <Image
                src={LogoAnis}
                style={{ width: "50px", height: "50px" }}
                alt="logo"
              />
              <span className="text-xl font-bold text-gray-800 tracking-tight">
                ANIS
              </span>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  const isLoggedIn = !!token;
  const userInitial = user?.email?.charAt(0).toUpperCase() || "?";

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/home" className="flex items-center gap-2">
            <Image
              src={LogoAnis}
              style={{ width: "50px", height: "50px" }}
              alt="logo"
            />
            <span className="text-xl font-bold text-gray-800 tracking-tight">
              ANIS
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setDropdownOpen(false)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-[#1E71BB] bg-[#1E71BB]/10"
                    : "text-gray-600 hover:text-[#1E71BB] hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={logout}
                  className="text-sm font-medium text-gray-600 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-9 h-9 rounded-full bg-[#1E71BB] text-white flex items-center justify-center text-sm font-bold hover:bg-[#185d9e] transition-colors"
                  >
                    {userInitial}
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                          />
                        </svg>
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Settings
                      </Link>
                      <div className="border-t border-gray-100 my-1" />
                      <button
                        onClick={logout}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium bg-[#7DC027] px-5 py-2 rounded-[7px] hover:bg-[#4c7218d7] transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium bg-[#2fa1dd] text-white px-5 py-2 rounded-[7px] hover:bg-[#216184e0] transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-[#1E71BB] bg-[#1E71BB]/10"
                    : "text-gray-600 hover:text-[#1E71BB] hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-gray-100 pt-3 mt-3">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2.5 mb-2">
                    <div className="w-9 h-9 rounded-full bg-[#1E71BB] text-white flex items-center justify-center text-sm font-bold">
                      {userInitial}
                    </div>
                    <span className="text-sm text-gray-700 font-medium">
                      {user?.email}
                    </span>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    className="block text-center px-3 py-2.5 rounded-[7px] text-sm  font-medium  bg-[#7DC027] hover:bg-[#4c7218d7]"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block text-center px-5 py-2.5 rounded-[7px] text-sm font-medium bg-[#2fa1dd] text-white hover:bg-[#216184e0]"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
