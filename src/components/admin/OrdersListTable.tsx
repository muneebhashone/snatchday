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
}: {
  status: string;
  date: string;
}) {
  const [page, setPage] = useState(0);
  const skip = 10;
  const { data: customers, isLoading } = useGetOrders(page, status, date) as { data: OrderResponse | undefined; isLoading: boolean };

  const totalItems = customers?.data?.total || 0;
  const currentPage = Math.floor(page / skip) + 1;

  const handlePageChange = (newPage: number) => {
    setPage((newPage - 1) * skip);
  };

  return isLoading ? (
    <div className="flex items-center justify-center">
      <Loader size={25} className="animate-spin text-primary" />
    </div>
  ) : (
    <Table className="border border-primary">
      <TableHeader>
        <TableRow className="border border-primary">
          <TableHead className="text-primary font-bold w-[100px]">
            Order No.
          </TableHead>
          <TableHead className="text-primary font-bold">Customer</TableHead>
          <TableHead className="text-primary font-bold">Status</TableHead>
          <TableHead className="text-primary font-bold">Sums</TableHead>
          <TableHead className="text-primary font-bold">Created</TableHead>
          <TableHead className="text-primary font-bold">Last Update</TableHead>
          <TableHead className="text-primary font-bold text-right">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers?.data?.orders?.map((order) => (
          <TableRow className="" key={order.orderNumber}>
            <TableCell className="font-bold">{order.orderNumber}</TableCell>
            <TableCell className="">{order.billingDetails.firstName}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>{formatCurrency(order.cartObject.total)}</TableCell>
            <TableCell className="">{order.createdAt.split("T")[0]}</TableCell>
            <TableCell className="">{order.updatedAt?.split("T")[0]}</TableCell>
            <TableCell className="text-right flex gap-2 items-center justify-end">
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
              {/* <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={`#`}>
                      <Delete className="h-4 w-4 text-red-500" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete Order</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="w-full">
        <TableRow>
          <TableCell colSpan={8} className="text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="text-sm text-gray-500">
                Showing {page + 1} to {Math.min(page + skip, totalItems)} of {totalItems} entries
              </div>
              <DynamicPagination
                totalItems={totalItems}
                itemsPerPage={skip}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
