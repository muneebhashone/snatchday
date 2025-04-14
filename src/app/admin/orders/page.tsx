import AdminLayout from "@/components/admin/AdminLayout";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import OrdersList from "@/components/admin/OredersList";
import React from "react";

const Page = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb title="Orders" />
      <OrdersList />
    </AdminLayout>
  );
};

export default Page;
