import ProductsForm from '@/components/admin/ProductsForm'
import AdminLayout from '@/components/admin/AdminLayout'
import React from 'react'
import MainProduct from '@/components/admin/MainProduct'

const page = () => {
  return (
    <AdminLayout>
        {/* <h1 className="text-3xl font-bold">Create Product</h1> */}
        {/* <ProductsForm /> */}
        <MainProduct />
    </AdminLayout>
  )
}

export default page