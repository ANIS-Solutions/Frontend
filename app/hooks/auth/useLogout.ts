"use client";
import { useAuth } from "../../context/AuthContext";

export function useLogout() {
  const { logout } = useAuth();

  return { logout };
}
