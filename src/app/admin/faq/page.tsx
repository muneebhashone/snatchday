import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import AdminLayout from "@/components/admin/AdminLayout";
import FaqTable from "@/components/admin/FaqTable";
import React from "react";

const page = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb title="FAQ" />
      <FaqTable />
    </AdminLayout>
  );
};

export default page;
