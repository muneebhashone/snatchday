import AdminLayout from '@/components/admin/AdminLayout'
import TournamentCreateForm from '@/components/admin/TournamentCreateForm'
import React from 'react'

const page = () => {
  return (
    <AdminLayout>
        <TournamentCreateForm />
    </AdminLayout>
  )
}

export default page