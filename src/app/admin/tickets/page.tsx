import AdminTicketTable from "@/components/admin/AdminTicketTable";
import AdminLayout from "@/components/admin/AdminLayout";
import React from "react";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

const page = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb title="Tickets" />
      <AdminTicketTable />
    </AdminLayout>
  );
};

export default page;
