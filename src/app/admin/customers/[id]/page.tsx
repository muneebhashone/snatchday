"use client"
import AdminLayout from "@/components/admin/AdminLayout";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import { CustomerdEdit } from "@/components/admin/CustomersEdit";
import React from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const customerId = params.id;

  return (
    <AdminLayout>
      <AdminBreadcrumb
        title={`Edit Customer #${customerId}`}
        items={[
          {
            title: "Customers",
            href: "/admin/customers"
          }
        ]}
      />
      <CustomerdEdit />
    </AdminLayout>
  );
};

export default Page;
