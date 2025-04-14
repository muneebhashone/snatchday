import AdminLayout from '@/components/admin/AdminLayout'
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import { VoucherList } from '@/components/admin/VoucherList'
import React from 'react'

const page = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb title="Vouchers" />
      <VoucherList />
    </AdminLayout>
  )
}

export default page