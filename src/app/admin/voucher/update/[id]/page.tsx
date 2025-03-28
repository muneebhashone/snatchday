"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { EditVoucherForm } from "@/components/admin/EditVoucherForm";
import AdminLayout from '@/components/admin/AdminLayout';
// import dynamic from 'next/dynamic';

// const AdminLayout = dynamic(() => import('@/components/admin/AdminLayout'), { ssr: false });

export default function Page() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Edit Voucher</h2>
        <EditVoucherForm voucherId={id} />
      </div>
    </AdminLayout>
  );
}