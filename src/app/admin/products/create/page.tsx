import ProductsForm from '@/components/admin/ProductsForm'
import AdminLayout from '@/components/admin/AdminLayout'
import React from 'react'
import MainProduct from '@/components/admin/MainProduct'
import AdminBreadcrumb from '@/components/admin/AdminBreadcrumb'

const page = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb
        title="Create Product"
        items={[
          {
            title: "Products",
            href: "/admin/products",
          },
        ]}
      />
      <MainProduct />
    </AdminLayout>
  )
}

export default page