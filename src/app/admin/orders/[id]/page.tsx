"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { useGetOrderById } from "@/hooks/api";
import { Calendar, CarrotIcon, CreditCard, Truck } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();
  const paramsId = params.id;
  const { data: order } = useGetOrderById(paramsId);
  console.log(order);
  return (
    <AdminLayout>
      <div>
        <div className="grid grid-cols-3 gap-4">
          <Card className="py-2 px-4 flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <CarrotIcon />
              <h1>Order details</h1>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-primary p-2 rounded-sm">
                <CarrotIcon className="text-white" size={15} />
              </div>
              <p>Snatch Day</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-primary p-2 rounded-sm">
                <Calendar className="text-white" size={15} />
              </div>
              <p>{order?.data.updatedAt.split("T")[0]}</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-primary p-2 rounded-sm">
                <CreditCard className="text-white" size={15} />
              </div>
              <p>payment coming soon...</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-primary p-2 rounded-sm">
                <Truck className="text-white" size={15} />
              </div>
              <p>Free Shipping</p>
            </div>
          </Card>
          <Card className="py-2 px-4 flex flex-col gap-2">hamza</Card>
          <Card className="py-2 px-4 flex flex-col gap-2">hamza</Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Page;
