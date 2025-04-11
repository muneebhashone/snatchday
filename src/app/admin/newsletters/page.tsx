import AdminLayout from "@/components/admin/AdminLayout";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import React from "react";
import Newsletter from "@/components/admin/Newsletter";

const page = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb title="Newsletters" />
      <Newsletter />
    </AdminLayout>
  );
};

export default page;
