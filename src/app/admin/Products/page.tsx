

import AdminLayout from '@/components/admin/AdminLayout'
import { Product } from '@/components/admin/Product'


export default function ProductsPage() {
  return (
<AdminLayout>    
        <h1 className="text-3xl font-bold">Products</h1>
    
      <div className="bg-card rounded-lg shadow-sm">
        <Product />
      </div>
    </AdminLayout>
    
  )
}