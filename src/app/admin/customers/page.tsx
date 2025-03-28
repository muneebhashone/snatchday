import AdminLayout from "@/components/admin/AdminLayout";
import CustomersList from "@/components/admin/CustomersList";
import React from "react";

const Page = () => {
  return (
    <AdminLayout>
      <CustomersList />
    </AdminLayout>
  );
};

export default Page;
