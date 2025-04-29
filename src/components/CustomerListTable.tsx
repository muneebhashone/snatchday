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
import { useEffect, useState } from "react";
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

interface CustomeListTableProps {
  search: string;
  group: string;
  date: string;
  isActive: string;
}

export function CustomeListTable({
  search,
  group,
  date,
  isActive,
}: CustomeListTableProps) {
  const [page, setPage] = useState(0);
  const skip = 10;

  // Reset page when filters change
  useEffect(() => {
    setPage(0);
  }, [search, group, date, isActive]);

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

  return (
    <div className="p-4 bg-white">
      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-gray-500">Customer ID</TableHead>
              <TableHead className="text-gray-500">NAME</TableHead>
              <TableHead className="text-gray-500">E-MAIL</TableHead>
              <TableHead className="text-gray-500">CUSTOMER GROUP</TableHead>
              <TableHead className="text-gray-500">APPROVE</TableHead>
              <TableHead className="text-gray-500">SPENDINGS</TableHead>
              <TableHead className="text-gray-500">CREATED</TableHead>
              <TableHead className="text-gray-500">POINTS</TableHead>
              <TableHead className="text-gray-500 text-right">
                ACTIONS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow className="h-44">
                <TableCell colSpan={8} className="text-center">
                  <div className="flex items-center justify-center w-full">
                    <Loader className="h-4 w-4 animate-spin text-primary" />
                  </div>
                </TableCell>
              </TableRow>
            ) : customers?.data?.customers[0].data?.length > 0 ? (
              customers.data.customers[0].data.map((customer) => (
                <TableRow key={customer.name} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900">
                    {customer.customerNumber}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {customer.name}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {customer.email}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {customer.group}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        customer.approved
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {customer.approved ? "Approved" : "Not Approved"}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {customer?.spendings || "N/A"}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {customer.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {customer?.wallet?.snapPoints || "0"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={`/admin/customers/${customer._id}`}>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-gray-100"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit Customer</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-gray-500">
                  No customers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <p className="text-sm text-gray-500">
          Displaying {page + 1} to {Math.min(page + skip, totalItems)} of{" "}
          {totalItems} entries
        </p>
        <DynamicPagination
          totalItems={totalItems}
          itemsPerPage={skip}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
