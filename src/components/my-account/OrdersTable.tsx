"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { formatDate } from "date-fns";
import InvoiceButton from "../InvoiceButton ";
import { Order } from "@/types";
import { useGetMyOrders } from "@/hooks/api";

const OrdersTable = () => {
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
  });
  const { data: orders, isLoading } = useGetMyOrders({
    limit: pagination.limit,
    offset: pagination.offset,
  });

  console.log(orders, "111111");

  const handleNextPage = () => {
    setPagination((prev) => ({
      ...prev,
      offset: prev.offset + prev.limit,
    }));
  };

  const handlePreviousPage = () => {
    setPagination((prev) => ({
      ...prev,
      offset: Math.max(prev.offset - prev.limit, 0),
    }));
  };

  return (
    <div className="p-20">
      <h2 className="text-2xl font-bold mb-10">My Orders</h2>

      <Table className="border border-primary rounded-md">
        <TableHeader className="rounded-t-3xl">
          <TableRow className="rounded-t-3xl border-b border-primary">
            <TableHead className="text-primary font-bold w-[100px]">
              Order No.
            </TableHead>
            <TableHead className="text-primary font-bold">Date</TableHead>
            <TableHead className="text-primary font-bold">Products</TableHead>
            <TableHead className="text-primary font-bold text-center">
              Number
            </TableHead>
            <TableHead className="text-primary font-bold text-right">
              Subtotal
            </TableHead>
            <TableHead className="text-primary font-bold text-right">
              Total amount
            </TableHead>
            <TableHead className="text-primary font-bold text-center">
              Status
            </TableHead>
            <TableHead className="text-primary font-bold text-center">
              View order
            </TableHead>
            <TableHead className="text-primary font-bold text-center">
              The invoice
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={10} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : orders?.data?.orders.length > 0 ? (
            orders?.data?.orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order?.orderNumber || "N/A"}</TableCell>
                <TableCell>
                  {formatDate(order?.createdAt || "", "dd/MM/yyyy")}
                </TableCell>
                <TableCell className="">
                  <ul className="p-0 m-0">
                    {order?.cartObject?.rewardCart?.map((item, index) => (
                      <li className="line-clamp-1" key={index}>
                        {item?.product?.name}
                      </li>
                    )) || "N/A"}
                    {order?.cartObject?.cart?.map((item, index) => (
                      <li className="line-clamp-1" key={index}>
                        {item?.product?.name}
                      </li>
                    )) || "N/A"}
                  </ul>
                </TableCell>
                <TableCell className="text-center">
                  {order?.orderNumber || "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  {`${order?.cartObject?.subTotal.toFixed(2)}€` || "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  {`${order?.cartObject?.total.toFixed(2)}€` || "N/A"}
                </TableCell>
                <TableCell>
                  <div
                    className={`text-center capitalize rounded-md py-1 px-2 ${
                      order.status === "Paid"
                        ? "bg-green-700 text-white"
                        : order.status === "Complete"
                        ? "bg-green-700 text-white"
                        : "bg-primary text-white"
                    }`}
                  >
                    {order.status === "pending"
                      ? "payment pending"
                      : order.status || "N/A"}
                  </div>
                </TableCell>
                <TableCell className="text-center flex items-center justify-center">
                  <Link href={`/orders/${order?._id}`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-gray-100 flex items-center"
                    >
                      <Eye className="h-5 w-5 text-foreground" />
                    </Button>
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  {order.status !== "pending" && (
                    <InvoiceButton orderDetails={order} />
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="text-center">
                <p className="text-center font-bold italic">
                  *No orders found*
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="p-4 border-t flex items-center justify-between">
        <Button onClick={handlePreviousPage} disabled={pagination.offset === 0}>
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={orders?.data?.orders.length < pagination.limit}
        >
          Next
        </Button>
      </div>
      <div className="p-4 border-t">
        <p className="text-sm text-foreground">
          Showing {pagination.offset + 1} to{" "}
          {Math.min(pagination.offset + pagination.limit, orders?.data?.total)}{" "}
          of {orders?.data?.total} (1 page(s))
        </p>
      </div>
    </div>
  );
};

export default OrdersTable;
