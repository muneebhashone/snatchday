"use client";

import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

type AdminCheckProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export default function AdminCheck({ children, fallback }: AdminCheckProps) {
  const { isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    if (fallback) {
      return <>{fallback}</>;
    }
    redirect("/");
  }

  return <>{children}</>;
} 