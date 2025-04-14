"use client"
import AdminLayout from '@/components/admin/AdminLayout'
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import WebSettingEditForm from '@/components/admin/WebSettingEditForm'
import React from 'react'
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const settingId = params.id;

  return (
    <AdminLayout>
      <AdminBreadcrumb
        title={`Edit Setting #${settingId}`}
        items={[
          {
            title: "Web Settings",
            href: "/admin/web-settings"
          }
        ]}
      />
      <WebSettingEditForm />
    </AdminLayout>
  )
}

export default page