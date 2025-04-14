import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCustomersPagination } from "@/hooks/api";
import { Delete, Edit, Loader } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

export function CustomeListTable({
  search,
  group,
  date,
  isActive,
}: {
  search: string;
  group: string;
  date: string;
  isActive: string;
}) {
  const [page, setPage] = useState(0);
  const skip = 10;
  const { data: customers, isLoading } = useCustomersPagination(
    page,
    search,
    group,
    date,
    isActive
  );
  return isLoading ? (
    <div className="flex items-center justify-center">
      <Loader size={25} className="animate-spin text-primary" />
    </div>
  ) : (
    <Table className="border border-primary">
      <TableHeader>
        <TableRow className="border border-primary">
          <TableHead className="text-primary font-bold w-[100px]">
            Name
          </TableHead>
          <TableHead className="text-primary font-bold">E-mail</TableHead>
          <TableHead className="text-primary font-bold">
            Customer group
          </TableHead>
          <TableHead className="text-primary font-bold">Approve</TableHead>
          <TableHead className="text-primary font-bold">IP</TableHead>
          <TableHead className="text-primary font-bold">Created</TableHead>
          <TableHead className="text-primary font-bold">Points</TableHead>
          <TableHead className="text-primary font-bold text-right">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers?.data?.customers[0].data?.map((customer) => (
          <TableRow className="" key={customer.name}>
            <TableCell className="font-bold">{customer.name}</TableCell>
            <TableCell className="">{customer.email}</TableCell>
            <TableCell>{customer.group}</TableCell>
            <TableCell>
              {customer.approved ? "Approved" : "Not Approve"}
            </TableCell>
            <TableCell className="">{customer.ip}</TableCell>
            <TableCell className="">
              {customer.createdAt.split("T")[0]}
            </TableCell>
            <TableCell className="">{customer.wallet.snapPoints}</TableCell>
            <TableCell className="text-right flex gap-2 items-center justify-end">
              <Link href={`/admin/customers/${customer._id}`}>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
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
              className={`border px-2 py-1 mr-2 ${
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
                length: Math.ceil(
                  (customers?.data?.customers[0]?.total[0]?.total || 0) / skip
                ),
              },
              (_, index) => {
                return (
                  <button
                    key={index}
                    className={`page-indicator m-1 mr-2 ${
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
              className={`border px-2 py-1 ml-2 ${
                page + skip >=
                  (customers?.data?.customers[0]?.total[0]?.total || 0) &&
                "text-gray-300"
              }`}
              disabled={
                page + skip >=
                (customers?.data?.customers[0]?.total[0]?.total || 0)
              }
              onClick={() => {
                setPage((prev) =>
                  Math.min(
                    prev + skip,
                    (customers?.data?.customers[0]?.total[0]?.total || 0) - page
                  )
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
