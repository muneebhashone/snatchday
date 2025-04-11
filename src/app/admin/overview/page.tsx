import AdminLayout from "@/components/admin/AdminLayout"
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb"
import Overview from "@/components/admin/Overview"
import React from 'react'

const page = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb title="Overview" />
      <Overview />
    </AdminLayout>
  )
}

export default page 
