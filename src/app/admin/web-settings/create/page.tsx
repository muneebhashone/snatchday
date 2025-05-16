import AdminLayout from "@/components/admin/AdminLayout";
import WebSettingForm from "@/components/admin/WebSettingForm";
import React from "react";

const page = () => {
  return (
    <AdminLayout>
      <WebSettingForm />
    </AdminLayout>
  );
};

export default page;
