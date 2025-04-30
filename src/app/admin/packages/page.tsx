import AdminLayout from '@/components/admin/AdminLayout'
import PackageTable from '@/components/admin/PackageTable'
import React from 'react'

const page = () => {
  return (
    <AdminLayout>
    <PackageTable/>
    </AdminLayout>
  )
}

export default page