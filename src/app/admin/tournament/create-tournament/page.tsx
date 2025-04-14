import AdminLayout from '@/components/admin/AdminLayout'
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import TournamentCreateForm from '@/components/admin/TournamentCreateForm'
import React from 'react'

const page = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb 
        title="Create Tournament"
        items={[
          {
            title: "Tournaments",
            href: "/admin/tournament"
          }
        ]}
      />
      <TournamentCreateForm />
    </AdminLayout>
  )
}

export default page