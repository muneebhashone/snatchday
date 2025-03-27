"use client";
import MyAccountLayout from "@/components/my-account/MyAccountLayout";
import OrdersTable from "@/components/my-account/OrdersTable";
import { useGetMyOrders } from "@/hooks/api";
import React from "react";

const page = () => {
  const { data: orders, isLoading } = useGetMyOrders();
  console.log(orders, "orders");
  return (
    <MyAccountLayout>
      <OrdersTable orders={orders} isLoading={isLoading} />
    </MyAccountLayout>
  );
};

export default page;
