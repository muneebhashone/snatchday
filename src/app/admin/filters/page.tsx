import AdminLayout from '@/components/admin/AdminLayout'
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import React from 'react'
import Filter from '@/components/admin/Filter'

const page = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb title="Filters" />
      <Filter />
    </AdminLayout>
  )
}

export default page