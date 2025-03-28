"use client";
import MyAccountLayout from "@/components/my-account/MyAccountLayout";
import ReturnOrdersTable from "@/components/my-account/ReturnOrdersTable";
import React from "react";

const page = () => {

  return (
    <MyAccountLayout>
      <ReturnOrdersTable />
    </MyAccountLayout>
  );
};

export default page;
