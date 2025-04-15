import AdminTicketTable from '@/components/admin/AdminTicketTable'
import AdminLayout from '@/components/admin/AdminLayout'
import React from 'react'

const page = () => {
  return (
    <AdminLayout>
        <AdminTicketTable />
    </AdminLayout>
  )
}

export default page