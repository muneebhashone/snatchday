import AdminLayout from "@/components/admin/AdminLayout";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import CustomersList from "@/components/admin/CustomersList";
import React from "react";

const Page = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb title="Customers" />
      <CustomersList />
    </AdminLayout>
  );
};

export default Page;
