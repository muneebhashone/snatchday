import AdminLayout from "@/components/admin/AdminLayout";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import ReturnsList from "@/components/admin/ReturnList";
import React from "react";

const Page = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb 
        title="Returns"
        items={[
          {
            title: "Orders",
            href: "/admin/orders"
          }
        ]}
      />
      <ReturnsList />
    </AdminLayout>
  );
};

export default Page;
