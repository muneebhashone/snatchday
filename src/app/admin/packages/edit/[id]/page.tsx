import AdminLayout from '@/components/admin/AdminLayout'
import PackagesForm from '@/components/admin/PackagesForm'
import React from 'react'

const page = () => {
  return (
    <AdminLayout>
        <PackagesForm/>
    </AdminLayout>
  )
}

export default page