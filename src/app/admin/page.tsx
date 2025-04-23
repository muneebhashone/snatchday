"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import NewOverview from "@/components/admin/NewOverview";


export default function Page() {
 
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <NewOverview />
      </div>
    </AdminLayout>
  );
}
