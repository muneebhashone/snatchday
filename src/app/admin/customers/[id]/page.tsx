import AdminLayout from "@/components/admin/AdminLayout";
import { CustomerdEdit } from "@/components/admin/CustomersEdit";
import React from "react";

const Page = () => {
  return (
    <AdminLayout>
      <CustomerdEdit />
    </AdminLayout>
  );
};

export default Page;
