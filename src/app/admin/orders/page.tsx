"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import OrdersList from "@/components/admin/OredersList";
import React from "react";
import { useGetOrdersStats } from "@/hooks/api";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CheckCircle, FileWarning, RefreshCw, Truck, PackageX, Clock } from "lucide-react";

const Page = () => {
  const { data: ordersStats } = useGetOrdersStats();
  console.log(ordersStats, "ordersStats");
  return (
    <AdminLayout>
      <AdminBreadcrumb title="Orders" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 mb-6">
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Pending Payment
                </p>
                <h3 className="text-2xl font-semibold">
                  {ordersStats?.data?.paymentPending}
                </h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending</p>
                <h3 className="text-2xl font-semibold">
                  {ordersStats?.data?.pending}
                </h3>
              </div>
              <div className="bg-gray-100 p-3 rounded-full">
                <Clock className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Dispatched</p>
                <h3 className="text-2xl font-semibold">
                  {ordersStats?.data?.dispatched}
                </h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Truck className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Completed</p>
                <h3 className="text-2xl font-semibold">
                  {ordersStats?.data?.completed}
                </h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Returned</p>
                <h3 className="text-2xl font-semibold">
                  {ordersStats?.data?.returned}
                </h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <PackageX className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Refunded</p>
                <h3 className="text-2xl font-semibold">
                  {ordersStats?.data?.refunded}
                </h3>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <RefreshCw className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Cancelled</p>
                <h3 className="text-2xl font-semibold">
                  {ordersStats?.data?.cancelled}
                </h3>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FileWarning className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <OrdersList />
    </AdminLayout>
  );
};

export default Page;
