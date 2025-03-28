import AdminLayout from "@/components/admin/AdminLayout";
import OrdersList from "@/components/admin/OredersList";
import React from "react";

const Page = () => {
  return (
    <AdminLayout>
      <OrdersList />
    </AdminLayout>
  );
};

export default Page;
