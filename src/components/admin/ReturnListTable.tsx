import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMyReturns } from "@/hooks/api";
import { formatDate } from "date-fns";
import { Edit2, Eye, Loader } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import InvoiceButton from "../InvoiceButton ";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DynamicPagination } from "@/components/ui/dynamic-pagination";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ReturnResponse {
  data: {
    returns: ReturnItem[];
    total: number;
  };
}

interface ReturnItem {
  _id: string;
  orderNumber: string;
  returnNumber: string;
  status: string;
  createdAt: string;
  productsData: {
    product: {
      article: string;
    };
  }[];
}

export function ReturnListTable() {
  const [pagination, setPagination] = useState({
    pageSize: 10,
    currentPage: 1,
  });
  const [filters, setFilters] = useState({
    status: "",
    orderNumber: "",
    articleId: "",
  });

  const debouncedFilters = useDebounce(filters, 300);
  const debouncedOrderNumber = useDebounce(filters.orderNumber, 500);

  useEffect(() => {
    setPagination({ pageSize: 10, currentPage: 1 });
  }, [debouncedFilters]);

  const { data: returns, isLoading } = useGetMyReturns({
    limit: pagination.pageSize,
    offset: (pagination.currentPage - 1) * pagination.pageSize,
    ...debouncedFilters,
    orderNumber: debouncedOrderNumber,
  }) as { data: ReturnResponse | undefined; isLoading: boolean };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
  };

  const totalItems = returns?.data?.total || 0;

  return isLoading ? (
    <div className="flex items-center justify-center">
      <Loader size={25} className="animate-spin text-primary" />
    </div>
  ) : (
    <div className="">
      <div className="space-y-4">
        <div className="mb-4 flex justify-start gap-5">
          <div>
            <Input
              type="text"
              name="orderNumber"
              placeholder="Search by Order Number"
              value={filters.orderNumber}
              onChange={handleFilterChange}
              className="border p-2 rounded-md w-[400px]"
            />
          </div>

          <div className="flex gap-2">
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="border p-2 rounded-md w-[400px] pr-10"
            >
              <option value="">Select Status</option>
              <option value="waiting">Waiting</option>
              <option value="complete">Complete</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          <Button
            variant={"outline"}
            onClick={() => {
              setFilters({
                status: "",
                orderNumber: "",
                articleId: "",
              });
            }}
          >
            Clear
          </Button>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>ARTICLE</TableHead>
                <TableHead>ORDER NO.</TableHead>
                <TableHead>RETURN NUMBER</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>CREATED</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : returns?.data?.returns?.length > 0 ? (
                returns?.data?.returns?.map((returnItem, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {returnItem?.productsData?.map((product, i) => (
                        <ul key={i}>
                          <li>{product?.product?.article || "N/A"}</li>
                        </ul>
                      )) || "N/A"}
                    </TableCell>
                    <TableCell>{returnItem.orderNumber || "N/A"}</TableCell>
                    <TableCell>{returnItem.returnNumber || "N/A"}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs capitalize ${
                          returnItem.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : returnItem.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : returnItem.status === "waiting"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {returnItem.status || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {formatDate(returnItem.createdAt || "", "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                href={`/admin/orders/returns/update/${returnItem._id}`}
                              >
                                <button className="hover:bg-gray-100 p-1 rounded">
                                  <Eye className="h-4 w-4" />
                                </button>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View Return Details</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No returns found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between py-4">
          <p className="text-sm text-gray-500">
            Showing {(pagination.currentPage - 1) * pagination.pageSize + 1} to{" "}
            {Math.min(pagination.currentPage * pagination.pageSize, totalItems)}{" "}
            of {totalItems} entries
          </p>
          <DynamicPagination
            totalItems={totalItems}
            itemsPerPage={pagination.pageSize}
            currentPage={pagination.currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
