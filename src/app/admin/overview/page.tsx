import AdminLayout from "@/components/admin/AdminLayout";
import React from "react";
import NewOverview from "@/components/admin/NewOverview";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon } from "lucide-react";
const page = () => {
  return (
    <AdminLayout>
      <Breadcrumb className="flex items-center gap-4 mb-4">
        <BreadcrumbItem>
          <BreadcrumbPage>
            <HomeIcon size={20} className="text-primary font-bold" />
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="list-none" />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold text-sm">Admin</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumb>
      <NewOverview />
    </AdminLayout>
  );
};

export default page;
