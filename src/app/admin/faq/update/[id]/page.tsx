'use client'
import AdminLayout from '@/components/admin/AdminLayout'
import CreateFaqForm from '@/components/admin/CreateFaqForm'
import { useParams } from 'next/navigation';
import React from 'react'

const UpdateFaqPage = () => {
  const {id} = useParams();
  return (
    <AdminLayout>
        <CreateFaqForm faqId={id as string}/>
    </AdminLayout>
  )
}

export default UpdateFaqPage