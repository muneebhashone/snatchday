import AdminBreadcrumb from '@/components/admin/AdminBreadcrumb'
import AdminLayout from '@/components/admin/AdminLayout'
import CreateFaqForm from '@/components/admin/CreateFaqForm'
import React from 'react'

const page = () => {
  return (
    <AdminLayout>
     
       <CreateFaqForm/>
    </AdminLayout>
  )
}

export default page