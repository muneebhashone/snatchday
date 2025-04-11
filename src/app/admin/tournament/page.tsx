import AdminLayout from '@/components/admin/AdminLayout'
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import AllTournaments from '@/components/admin/AllTournaments'
import React from 'react'

const page = () => {
  return (
   <AdminLayout>
    <AdminBreadcrumb title="Tournaments" />
    <AllTournaments />
   </AdminLayout>
  )
}

export default page