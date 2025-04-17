import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetOrders } from "@/hooks/api";
import { Delete, Edit, Loader } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DynamicPagination } from "@/components/ui/dynamic-pagination";

interface OrderResponse {
  data: {
    orders: Order[];
    total: number;
  };
}

interface Order {
  _id: string;
  orderNumber: string;
  billingDetails: {
    firstName: string;
  };
  status: string;
  cartObject: {
    total: number;
  };
  createdAt: string;
  updatedAt?: string;
}

export function OrdersListTable({
  status,
  date,
  user,
  page,
  onPageChange,
}: {
  status: string;
  date: string;
  user: string;
  page: number;
  onPageChange: (page: number) => void;
}) {
  const skip = 10;
  const { data: customers, isLoading } = useGetOrders((page - 1) * skip, status, date, user) as { data: OrderResponse | undefined; isLoading: boolean };

  const totalItems = customers?.data?.total || 0;
  const currentPage = page;

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };

  return isLoading ? (
    <div className="flex items-center justify-center">
      <Loader size={25} className="animate-spin text-primary" />
    </div>
  ) : (
    <div className="">
      <div className="space-y-4">
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>ORDER NO.</TableHead>
                <TableHead>CUSTOMER</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>SUMS</TableHead>
                <TableHead>CREATED</TableHead>
                <TableHead>LAST UPDATE</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers?.data?.orders?.map((order) => (
                <TableRow key={order.orderNumber}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>{order.billingDetails.firstName}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "COMPLETED" 
                        ? "bg-green-100 text-green-800"
                        : order.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>{formatCurrency(order.cartObject.total)}</TableCell>
                  <TableCell>{order.createdAt.split("T")[0]}</TableCell>
                  <TableCell>{order.updatedAt?.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={`/admin/orders/${order._id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit Order</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between py-4">
          <p className="text-sm text-gray-500">
            Showing {(currentPage - 1) * skip + 1} to {Math.min(currentPage * skip, totalItems)} of {totalItems} entries
          </p>
          <DynamicPagination
            totalItems={totalItems}
            itemsPerPage={skip}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
