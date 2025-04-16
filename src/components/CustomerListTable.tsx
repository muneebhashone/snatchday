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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { DynamicPagination } from "@/components/ui/dynamic-pagination";

interface CustomerResponse {
  data: {
    customers: {
      data: Customer[];
      total: { total: number }[];
    }[];
  };
}

interface Customer {
  _id: string;
  name: string;
  email: string;
  group: string;
  approved: boolean;
  spendings?: string;
  createdAt: string;
  wallet: {
    snapPoints: number;
  };
}

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
  ) as { data: CustomerResponse | undefined; isLoading: boolean };

  const totalItems = customers?.data?.customers[0]?.total[0]?.total || 0;
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
            Name
          </TableHead>
          <TableHead className="text-primary font-bold">E-mail</TableHead>
          <TableHead className="text-primary font-bold">
            Customer group
          </TableHead>
          <TableHead className="text-primary font-bold">Approve</TableHead>
          <TableHead className="text-primary font-bold">Spendings</TableHead>
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
            <TableCell className="">{customer?.spendings || "N/A"}</TableCell>
            <TableCell className="">
              {customer.createdAt.split("T")[0]}
            </TableCell>
            <TableCell className="">{customer.wallet.snapPoints}</TableCell>
            <TableCell className="text-right flex gap-2 items-center justify-end">
              <Link href={`/admin/customers/${customer._id}`}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit Customer</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
