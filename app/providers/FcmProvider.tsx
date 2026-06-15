"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useFcmToken } from "../hooks/notifications/useFcmToken";

export default function FcmProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  useFcmToken(isAuthenticated);
  return <>{children}</>;
}