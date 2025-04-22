"use client";

import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

type ProtectedContentProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export default function ProtectedContent({ children, fallback }: ProtectedContentProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }
    redirect("/login");
  }

  return <>{children}</>;
} 