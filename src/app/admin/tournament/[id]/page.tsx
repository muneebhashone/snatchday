"use client"
import AdminLayout from '@/components/admin/AdminLayout'
import { useGetParticipants } from '@/hooks/api'
import { useParams } from 'next/navigation'
import React from 'react'
import Participants from '@/components/admin/Participants'
const page = () => {
     const {id} = useParams()
     const {data:participants,isLoading} = useGetParticipants(id as string)
  return (
   <AdminLayout>
    <Participants data={participants?.data} isLoading={isLoading} />
   </AdminLayout>
  )
}

export default page