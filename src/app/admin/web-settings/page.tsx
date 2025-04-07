import AdminLayout from '@/components/admin/AdminLayout'
import React from 'react'
import WebSettingList from '@/components/admin/WebSettingList'

const page = () => {
  return (
    <AdminLayout>
      <WebSettingList />
    </AdminLayout>
  )
}

export default page