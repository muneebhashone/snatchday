"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import OrderHistory from "@/components/admin/OrderHistory";
import OrderItemsTable from "@/components/admin/OrderItemTable";
import { ProfileIcon } from "@/components/icons/icon";
import { Card } from "@/components/ui/card";
import { useGetOrderById } from "@/hooks/api";
import {
  Calendar,
  CarrotIcon,
  CircleEllipsis,
  CreditCard,
  Ellipsis,
  Info,
  Plus,
  RefreshCcw,
  Truck,
  User,
} from "lucide-react";
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
        <AdminBreadcrumb 
          title={`Order #${paramsId}`}
          items={[
            {
              title: "Orders",
              href: "/admin/orders"
            }
          ]}
        />
        <div className="grid grid-cols-3 gap-4">
          {/* order details */}
          <Card className="py-2 px-4 flex flex-col gap-2 shadow-md">
            <div className="flex gap-4 items-center pb-1 border-b">
              <Info />
              <h1 className="font-bold text-primary">Order details</h1>
            </div>
            <div className="flex gap-4 items-center ">
              <div className="bg-primary p-2 rounded-sm">
                <CarrotIcon className="text-white" size={15} />
              </div>
              <p className="text-primary">Snatch Day</p>
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

          {/* cusotmer details */}
          <Card className="py-2 px-4 flex flex-col gap-2 shadow-md">
            <div className="flex gap-4 items-center pb-1 border-b">
              <User />
              <h1 className="font-bold text-primary">Customer details</h1>
            </div>
            <div className="flex gap-4 items-center ">
              <div className="bg-primary p-2 rounded-sm">
                <User className="text-white" size={15} />
              </div>
              <p className="text-primary">
                {order?.data.billingDetails.firstName}
              </p>
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
          <Card className="py-2 px-4 flex flex-col gap-2 shadow-md">
            <div className="flex gap-4 items-center pb-1 border-b">
              <CircleEllipsis />
              <h1 className="font-bold text-primary">Options</h1>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-primary p-2 rounded-sm">
                <RefreshCcw className="text-white" size={15} />
              </div>
              <p>Invoice</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-primary p-2 rounded-sm">
                <Plus className="text-white" size={15} />
              </div>
              <p>Bonus Points</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-primary p-2 rounded-sm">
                <Plus className="text-white" size={15} />
              </div>
              <p>Partner</p>
            </div>
          </Card>
        </div>
        <OrderItemsTable Order={order} />
        <OrderHistory />
      </div>
    </AdminLayout>
  );
};

export default Page;
