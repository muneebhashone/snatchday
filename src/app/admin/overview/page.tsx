import AdminLayout from "@/components/admin/AdminLayout"
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb"
import Overview from "@/components/admin/Overview"
import React from 'react'
import NewOverview from "@/components/admin/NewOverview"

const page = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb title="Overview" />
      <NewOverview />
    </AdminLayout>
  )
}

export default page 
