import AdminLayout from '@/components/admin/AdminLayout'
import ProductPerformanceTable from '@/components/admin/ProductPerformanceTable';

import React from 'react'

const page = () => {
  return (
    <AdminLayout>
      <ProductPerformanceTable />
    </AdminLayout>
  );
};

export default page