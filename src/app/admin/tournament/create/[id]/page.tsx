"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import TournamentCreateForm from "@/components/admin/TournamentCreateForm";
import { useParams } from "next/navigation";
import React from "react";

const CreateTournamentPage = () => {
  const params = useParams();
  const id = params.id as string;
  console.log(id, "id");

  return (
    <AdminLayout>
      <TournamentCreateForm productId={id} />
    </AdminLayout>
  );
};

export default CreateTournamentPage;
