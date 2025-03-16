import AdminLayout from "@/components/admin/AdminLayout"

import Overview from "@/components/admin/Overview"

export default function OverviewPage() {
  return (
    <AdminLayout>
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-primary">Dashboard Overview</h2>
     <Overview />
    </div>
    </AdminLayout>
  )
} 
