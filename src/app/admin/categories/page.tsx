import AdminLayout from "@/components/admin/AdminLayout";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import Categories from "@/components/admin/Categories";
import React from "react";

const page = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb title="Categories" />
      <Categories />
    </AdminLayout>
  );
};

export default page;
