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
            <TableRow className="" key={order.orderNumber}>
              <TableCell>
                <span className="font-bold">{i + 1}</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">{order.orderNumber}</span>
              </TableCell>
              <TableCell className="">
                {order.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="">
                {order?.cartObject.cart.map((cart, i) => (
                  <span key={i}>{cart.product.article}</span>
                ))}
              </TableCell>
              <TableCell>{order?.cartObject.total}</TableCell>
              <TableCell>{order?.cartObject.subTotal}</TableCell>
              <TableCell>
                <span
                  className={`px-4 py-2 rounded-full ${
                    order?.status === "pending"
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
                <div className="w-7 h-7 p-[5px] rounded-md bg-primary text-white flex items-center justify-center">
                  <LucideEye />
                </div>
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
                onClick={() => {
                  setPage((prev) => Math.max(prev - 5, 0)); // negative value nhi jaegi
                }}
              >
                Prev
              </button>
              {Array.from(
                {
                  length: Math.ceil((orders?.data.total || 0) / 5),
                },
                (_, index) => {
                  console.log(index);
                  return (
                    <button
                      key={index}
                      className={`page-indicator m-1 ${
                        index === page / 5 ? "bg-primary px-2 text-white" : ""
                      }`}
                      onClick={() => setPage(index * 5)}
                    >
                      {index + 1}
                    </button>
                  );
                }
              )}
              <button
                onClick={() => {
                  setPage((prev) =>
                    Math.min(prev + 5, (orders?.data.total || 0) - page)
                  ); // last page ke bad api hit nhi krega
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
