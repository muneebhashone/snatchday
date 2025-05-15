"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import OrderHistory from "@/components/admin/OrderHistory";
import { ProfileIcon } from "@/components/icons/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetOrderById } from "@/hooks/api";
import Image from "next/image";
import {
  Calendar,
  CarrotIcon,
  CircleEllipsis,
  CreditCard,
  Edit2,
  Ellipsis,
  Info,
  Plus,
  RefreshCcw,
  ShoppingCart,
  Truck,
  User,
} from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { formatCurrency } from "@/lib/utils";

const Page = () => {
  const params = useParams();
  const paramsId = params.id;
  const { data: order } = useGetOrderById(paramsId as string);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      case "dispatch":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <AdminLayout>
      <div>
        <AdminBreadcrumb
          title={`Order #${paramsId}`}
          items={[
            {
              title: "Orders",
              href: "/admin/orders",
            },
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Order details card */}
          <Card className="lg:col-span-2 shadow-sm">
            <div className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Order details</h2>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <ShoppingCart className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Order number</p>
                      <p className="font-medium">{order?.data.orderNumber}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      variant="outline"
                      className={`capitalize ${getStatusColor(
                        order?.data.status
                      )}`}
                    >
                      {order?.data.status}
                    </Badge>
                    <p className="text-sm text-gray-500">
                      {new Date(order?.data.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>PRODUCTS</TableHead>
                    <TableHead className="text-right">PRICE</TableHead>
                    <TableHead className="text-center">QTY</TableHead>
                    <TableHead className="text-right">TOTAL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {order?.data?.cartObject?.rewardCart.map((item) => (
                    <TableRow
                      key={item.product._id}
                      className="hover:bg-transparent"
                    >
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <div className="relative h-20 w-20 rounded-md overflow-hidden">
                            <Image
                              src={item.product.images[0] || "/placeholder.png"}
                              alt={item.product.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <p className="font-medium line-clamp-2">{item.product.name}</p>
                            {/* {item.product.attributes?.material && (
                              <p className="text-sm text-gray-500">
                                Material: {item.product.attributes.material}
                              </p>
                            )}
                            {item.product.attributes?.storage && (
                              <p className="text-sm text-gray-500">
                                Storage: {item.product.attributes.storage}
                              </p>
                            )} */}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.unitPrice)}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.totalPrice)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {order?.data.cartObject.cart.map((item) => (
                    <TableRow
                      key={item.product._id}
                      className="hover:bg-transparent"
                    >
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-16 rounded-md overflow-hidden">
                            <Image
                              src={item.product.images[0] || "/placeholder.png"}
                              alt={item.product.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            {item.product.attributes?.material && (
                              <p className="text-sm text-gray-500">
                                Material: {item.product.attributes.material}
                              </p>
                            )}
                            {item.product.attributes?.storage && (
                              <p className="text-sm text-gray-500">
                                Storage: {item.product.attributes.storage}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.unitPrice)}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.totalPrice)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableBody>
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={3} className="text-right font-medium">
                      Subtotal:
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(order?.data.cartObject.subTotal)}
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={3} className="text-right font-medium">
                      Discount:
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(order?.data.cartObject.voucherDiscount) ||
                        "00.00"}
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={3} className="text-right font-medium">
                      Tax:
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(order?.data.cartObject.vat)}
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={3} className="text-right font-medium">
                      Total:
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(order?.data.cartObject.total)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Right side cards */}
          <div className="space-y-4">
            {/* Customer details card */}
            <Card className="p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Customer details</h2>
                {/* <Button variant="ghost" size="sm" className="text-blue-600">
                  Edit
                </Button> */}
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                    {order?.data?.user?.image ? (
                      <Image
                        src={order?.data?.user?.image}
                        alt="Profile"
                        width={48}
                        height={48}
                        className="object-contain w-12 h-12 rounded-full"
                      />
                    ) : (
                      <User className="h-6 w-6 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{`${order?.data.billingDetails.firstName} ${order?.data.billingDetails.lastName}`}</p>
                    <p className="text-sm text-gray-600">
                      Customer ID: #
                      {order?.data?.user?.customerNumber
                        ? order?.data?.user?.customerNumber
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">12 Orders</span>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Contact info</h3>
                  <div className="space-y-1">
                    <p className="text-sm">
                      Email:{" "}
                      {order?.data?.user?.email ||
                        order?.data.billingDetails.email}
                    </p>
                    {/* <p className="text-sm">
                      Mobile: {order?.data.billingDetails.vatId}
                    </p> */}
                  </div>
                </div>
              </div>
            </Card>

            {/* Billing address card */}
            <Card className="p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Billing address</h2>
                {/* <Button variant="ghost" size="sm" className="text-blue-600">
                  Edit
                </Button> */}
              </div>
              <div className="space-y-2">
                <p>{order?.data.billingDetails?.email}</p>
                <p>{order?.data.billingDetails.street}</p>
                <p>{order?.data.billingDetails.city}</p>
                <p>{`${order?.data.billingDetails.zip}, ${order?.data.billingDetails.federalState}`}</p>
                <p>{order?.data.billingDetails.country}</p>
              </div>
            </Card>

            {/* Shipping address card */}
            <Card className="p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Shipping address</h2>
                {/* <Button variant="ghost" size="sm" className="text-blue-600">
                  Edit
                </Button> */}
              </div>
              <div className="space-y-2">
                <p>{order?.data.shippingDetails.street}</p>
                <p>{order?.data.shippingDetails.city}</p>
                <p>{`${order?.data.shippingDetails.zip}, ${order?.data.shippingDetails.federalState}`}</p>
                <p>{order?.data.shippingDetails.country}</p>
              </div>
            </Card>
          </div>
        </div>
        <OrderHistory />
      </div>
    </AdminLayout>
  );
};

export default Page;
