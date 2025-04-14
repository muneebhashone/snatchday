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

export function OrdersListTable({
  status,
  date,
}: {
  status: string;
  date: string;
}) {
  const [page, setPage] = useState(0);
  const skip = 10;
  const { data: customers, isLoading } = useGetOrders(page, status, date);

  customers?.data.orders.map((order) => console.log(order.orderNumber));
  console.log(customers?.data.total, "total");
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
              <Link href={`/admin/orders/${order._id}`}>
                <Edit className="h-4 w-4" />
              </Link>
              {/* <Link href={`#`}>
                <Delete className="text-red-500" />
              </Link> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="w-full">
        <TableRow>
          <TableCell colSpan={8} className="text-center">
            <button
              className={`${
                page === 0 ? "text-gray-300 cursor-not-allowed" : ""
              }`}
              disabled={page === 0}
              onClick={() => {
                setPage((prev) => Math.max(prev - skip, 0)); // Prevent going negative
              }}
            >
              Prev
            </button>
            {Array.from(
              {
                length: Math.ceil((customers?.data?.total || 0) / skip),
              },
              (_, index) => {
                return (
                  <button
                    key={index}
                    className={`page-indicator m-1 ${
                      index === page / skip ? "bg-primary px-2 text-white" : ""
                    }`}
                    onClick={() => setPage(index * skip)}
                  >
                    {index + 1}
                  </button>
                );
              }
            )}
            <button
              className={`${
                page + skip >= (customers?.data?.total || 0) && "text-gray-300"
              }`}
              disabled={page + skip >= (customers?.data?.total || 0)}
              onClick={() => {
                setPage((prev) =>
                  Math.min(prev + skip, customers?.data?.total - page)
                );
              }}
            >
              Next
            </button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
