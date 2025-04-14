"use client";
import { useGetCustomerOrdersData } from "@/hooks/api";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader, LucideEye, ReceiptEuroIcon } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const CustomerOrdersDataList = () => {
  const params = useParams();
  const paramsId = params.id;
  const [page, setPage] = useState(0);
  const user = paramsId;
  const date = "";
  const status = "";
  const { data: orders, isLoading } = useGetCustomerOrdersData(
    page,
    status,
    user,
    date
  );
  console.log(orders);
  return isLoading ? (
    <div className="flex items-center justify-center w-full mt-10">
      <Loader size={25} className="animate-spin text-primary mb-5" />
    </div>
  ) : !orders?.data.orders.length ? (
    <div className="text-center w-full text-red-500 font-bold">
      *No Order Data Of This Customer*
    </div>
  ) : (
    <div>
      <Table className="border border-primary">
        <TableHeader>
          <TableRow className="border border-primary">
            <TableHead className="text-primary font-bold ">Number</TableHead>
            <TableHead className="text-primary font-bold">Order No.</TableHead>
            <TableHead className="text-primary font-bold">Date</TableHead>
            <TableHead className="text-primary font-bold">Article</TableHead>
            <TableHead className="text-primary font-bold">
              Total Amount
            </TableHead>
            <TableHead className="text-primary font-bold">Sub Total</TableHead>
            <TableHead className="text-primary font-bold">Status</TableHead>
            <TableHead className="text-primary font-bold">View Order</TableHead>
            <TableHead className="text-primary font-bold">Invoice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.data.orders.map((order, i) => (
            <TableRow className="" key={order?.orderNumber}>
              <TableCell>
                <span className="font-bold">{i + 1}</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">{order?.orderNumber || "N/A"}</span>
              </TableCell>
              <TableCell className="">
                {order?.createdAt?.split("T")[0] || "N/A"}
              </TableCell>
              <TableCell className="">
                {order?.cartObject?.cart?.map((cart, i) => (
                  <span key={i}>{cart?.product?.article || "N/A"}</span>
                ))}
              </TableCell>
              <TableCell>{formatCurrency(order?.cartObject?.total)}</TableCell>
              <TableCell>{formatCurrency(order?.cartObject?.subTotal)}</TableCell>
              <TableCell className="capitalize">
                <span
                  className={`px-4 py-2 rounded-full ${order?.status === "pending"
                      ? "bg-primary text-white"
                      : order?.status === "paid"
                        ? "bg-green-800 text-white"
                        : order?.status === "cancelled"
                          ? "bg-red-600 text-white"
                          : "border border-gray-300 shadow-sm text-foreground"
                    }`}
                >
                  {order?.status}
                </span>
              </TableCell>
              <TableCell className="">
                <Link href={`/admin/orders/${order?._id}`} className="w-7 h-7 p-[5px] rounded-md bg-primary text-white flex items-center justify-center">
                  <LucideEye />
                </Link>
              </TableCell>
              <TableCell className="">
                <div className="w-7 h-7 p-[5px] rounded-md bg-primary text-white flex items-center justify-center">
                  <ReceiptEuroIcon />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="w-full">
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              <button
                disabled={page === 0}
                className={`m-1 px-4 py-2 rounded ${page === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary hover:text-white'}`}
                onClick={() => setPage((prev) => Math.max(0, prev - 5))}
              >
                Previous
              </button>
              {Array.from(
                {
                  length: Math.ceil((orders?.data.total || 0) / 5),
                },
                (_, index) => {
                  return (
                    <button
                      key={index}
                      className={`page-indicator m-1 px-4 py-2 rounded ${
                        index === page / 5 ? "bg-primary text-white" : "hover:bg-primary/10"
                      }`}
                      onClick={() => setPage(index * 5)}
                    >
                      {index + 1}
                    </button>
                  );
                }
              )}
              <button
                disabled={page >= (orders?.data.total || 0) - 5}
                className={`m-1 px-4 py-2 rounded ${
                  page >= (orders?.data.total || 0) - 5 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-primary hover:text-white'
                }`}
                onClick={() => {
                  setPage((prev) =>
                    Math.min(prev + 5, (orders?.data.total || 0) - 5)
                  );
                }}
              >
                Next
              </button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default CustomerOrdersDataList;
