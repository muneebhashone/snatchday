import ProductsForm from '@/components/admin/ProductsForm'
import AdminLayout from '@/components/admin/AdminLayout'
import React from 'react'

const page = () => {
  return (
    <AdminLayout>
        <h1 className="text-3xl font-bold">Create Product</h1>
        <ProductsForm />
    </AdminLayout>
  )
}

export default page