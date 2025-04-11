import AdminLayout from '@/components/admin/AdminLayout'
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import React from 'react'
import WebSettingList from '@/components/admin/WebSettingList'

const page = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb title="Web Settings" />
      <WebSettingList />
    </AdminLayout>
  )
}

export default page