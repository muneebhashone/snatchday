"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import NewOverview from "@/components/admin/NewOverview";
import { useUserContext } from "@/context/userContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { user } = useUserContext();
  const path = usePathname();
  useEffect(() => {
    if (user && path === "/admin" && user.role !== "admin") {
      window.location.href = "/admin/overview";
    }
  }, [path, user]);
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h2>
        <NewOverview />
      </div>
    </AdminLayout>
  );
}
