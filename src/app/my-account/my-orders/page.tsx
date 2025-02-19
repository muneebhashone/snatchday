import MyAccountLayout from "@/components/my-account/MyAccountLayout";
import OrdersTable from "@/components/my-account/OrdersTable";
import React from "react";

const page = () => {
  return (
    <MyAccountLayout>
      <OrdersTable />
    </MyAccountLayout>
  );
};

export default page;
