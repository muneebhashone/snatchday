"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import NewOverview from "@/components/admin/NewOverview";
import { useUserContext } from "@/context/userContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { user } = useUserContext();
  const path = usePathname();
  console.log(user);
  useEffect(() => {
    if (user && path === "/admin" && user?.user?.role === "admin") {
      window.location.href = "/admin/overview";
    } else {
      window.location.href = "/";
    }
  }, [path, user]);
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <NewOverview />
      </div>
    </AdminLayout>
  );
}
