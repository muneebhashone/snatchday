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
import { Loader, LucideEye, ReceiptEuroIcon, ShoppingCart } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { DynamicPagination } from "@/components/ui/dynamic-pagination";

const CustomerOrdersDataList = ({
  orderlength,
}: {
  orderlength: (data: number) => void;
}) => {
  const params = useParams();
  const paramsId = params.id;
  const [page, setPage] = useState(0);
  const pageSize = 5; // Define page size
  const user = paramsId;
  const date = "";
  const status = "";
  const limit = 5;
  const { data: orders, isLoading } = useGetCustomerOrdersData(
    page * pageSize,
    status,
    user,
    date,
    limit
  );
  orderlength(orders?.data.total);

  const handlePageChange = (newPage: number) => {
    setPage(newPage - 1);
  };

  const currentPage = page + 1;
  const totalPages = Math.ceil((orders?.data.total || 0) / pageSize);
  const startItem = page * pageSize + 1;
  const endItem = Math.min((page + 1) * pageSize, orders?.data.total || 0);

  return isLoading ? (
    <div className="flex items-center justify-center w-full mt-10">
      <Loader size={25} className="animate-spin text-primary mb-5" />
    </div>
  ) : !orders?.data.orders.length ? (
    <div className="flex items-center justify-center min-h-[200px] text-gray-500">
      <div className="text-center">
        <ShoppingCart size={40} className="mx-auto mb-4 text-gray-400" />
        <p className="text-lg font-medium">No orders found</p>
        <p className="text-sm mt-2">This customer has no order records yet</p>
      </div>
    </div>
  ) : (
    <div className="p-6">
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Number</TableHead>
              <TableHead>Order No.</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Article</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Sub Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.data.orders.map((order, i) => (
              <TableRow key={order?.orderNumber}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{order?.orderNumber || "N/A"}</TableCell>
                <TableCell>
                  {order?.createdAt?.split("T")[0] || "N/A"}
                </TableCell>
                <TableCell>
                  {order?.cartObject?.cart?.map((cart, i) => (
                    <span key={i}>{cart?.product?.article || "N/A"}</span>
                  ))}
                </TableCell>
                <TableCell>
                  {formatCurrency(order?.cartObject?.total)}
                </TableCell>
                <TableCell>
                  {formatCurrency(order?.cartObject?.subTotal)}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order?.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order?.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : order?.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order?.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/orders/${order?._id}`}
                      className="p-2 rounded-md"
                    >
                      <LucideEye className="h-4 w-4" />
                    </Link>
                    <button className="p-2 rounded-md ">
                      <ReceiptEuroIcon className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <p className="text-sm text-gray-500">
          Displaying {startItem} to {endItem} of {orders?.data.total || 0}{" "}
          entries
        </p>
        <DynamicPagination
          totalItems={orders?.data.total || 0}
          itemsPerPage={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CustomerOrdersDataList;
