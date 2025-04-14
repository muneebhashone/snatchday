import AdminLayout from "@/components/admin/AdminLayout";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import VoucherForm from "@/components/admin/VoucherForm";
import React from "react";

const page = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb 
        title="Create Voucher"
        items={[
          {
            title: "Vouchers",
            href: "/admin/voucher"
          }
        ]}
      />
      <VoucherForm />
    </AdminLayout>
  );
};

export default page;
