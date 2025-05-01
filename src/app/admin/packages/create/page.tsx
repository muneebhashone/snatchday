import AdminLayout from '@/components/admin/AdminLayout'
import React from 'react'
import PackagesForm from '@/components/admin/PackagesForm'

const page = () => {
  return (
    <AdminLayout>
      <PackagesForm/>
    </AdminLayout>
  )
}

export default page