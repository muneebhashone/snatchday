'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { CompetitionForm } from '@/components/admin/CompetitionForm'

const EditCompetitionPage = () => {
    
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Competition</h1>
        <CompetitionForm
          id={id}
          mode="edit"
          onSuccess={() => router.push('/admin/competitions')}
        />
      </div>
    </AdminLayout>
  )
}

export default EditCompetitionPage