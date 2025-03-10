import AdminLayout from '@/components/admin/AdminLayout'
import AllTournaments from '@/components/admin/AllTournaments'
import React from 'react'

const page = () => {
  return (
   <AdminLayout>
    <AllTournaments />
   </AdminLayout>
  )
}

export default page