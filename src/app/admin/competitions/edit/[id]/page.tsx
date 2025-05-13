"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { CompetitionForm } from "@/components/admin/CompetitionForm";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

const EditCompetitionPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  return (
    <AdminLayout>
      <AdminBreadcrumb
        title="Edit Competition"
        items={[{ title: "Competitions", href: "/admin/competitions" }]}
      />
      <div className="max-w-full px-6 mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Competition</h1>
        <CompetitionForm
          id={id}
          mode="edit"
          onSuccess={() => router.push("/admin/competitions")}
        />
      </div>
    </AdminLayout>
  );
};

export default EditCompetitionPage;
