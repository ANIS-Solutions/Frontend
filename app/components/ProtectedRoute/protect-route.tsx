"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#1E71BB] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ✅ لو مش authenticated → مش يعرض حاجة (الـ redirect شغال)
  if (!isAuthenticated) return null;

  // ✅ لو authenticated → يعرض الـ children
  return <>{children}</>;
}