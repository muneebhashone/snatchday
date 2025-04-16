"use client";
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
import { Eye, Loader } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useParams } from "next/navigation";
import { DynamicPagination } from "@/components/ui/dynamic-pagination";

const CustomerReturns = () => {
  const { id } = useParams();
  const [pagination, setPagination] = useState({
    pageSize: 10,
    currentPage: 1,
  });
  const [filters, setFilters] = useState({
    status: "",
    orderNumber: "",
    articleId: "",
    customerId: id,
  });

  const debouncedFilters = useDebounce(filters, 300);

  useEffect(() => {
    setPagination({ pageSize: 10, currentPage: 1 });
  }, [debouncedFilters]);

  const { data: returns, isLoading } = useGetMyReturns({
    limit: pagination.pageSize,
    offset: (pagination.currentPage - 1) * pagination.pageSize,
    ...debouncedFilters,
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  return isLoading ? (
    <div className="flex items-center justify-center w-full mt-10">
      <Loader size={25} className="animate-spin text-primary" />
    </div>
  ) : (
    <div className="p-6">
      <div className="mb-4 flex justify-between">
        <div>
          <input
            type="text"
            name="orderNumber"
            placeholder="Search by Order Number"
            value={filters.orderNumber}
            onChange={handleFilterChange}
            className="border p-2 rounded-md"
          />
        </div>

        <div className="flex gap-2">
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border p-2 rounded-md"
          >
            <option value="">Select Status</option>
            <option value="waiting">Waiting for product</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Article</TableHead>
              <TableHead>Order No.</TableHead>
              <TableHead>Return Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {returns?.data?.returns?.length > 0 ? (
              returns?.data?.returns?.map((returnItem, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {returnItem?.productsData?.map((product, i) => (
                      <span key={i} className="block">
                        {product?.product?.article || "N/A"}
                      </span>
                    )) || "N/A"}
                  </TableCell>
                  <TableCell>{returnItem.orderNumber || "N/A"}</TableCell>
                  <TableCell>{returnItem.returnNumber || "N/A"}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        returnItem.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : returnItem.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : returnItem.status === "canceled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {returnItem.status || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {formatDate(returnItem.createdAt || "", "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/admin/orders/returns/update/${returnItem._id}`}>
                        <button className="p-2 rounded-md ">
                          <Eye className="h-4 w-4" />
                        </button>
                      </Link>
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
          Displaying {(pagination.currentPage - 1) * pagination.pageSize + 1} to{" "}
          {Math.min(pagination.currentPage * pagination.pageSize, returns?.data?.total || 0)} of{" "}
          {returns?.data?.total || 0} entries
        </p>
        <DynamicPagination
          totalItems={returns?.data?.total || 0}
          itemsPerPage={pagination.pageSize}
          currentPage={pagination.currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CustomerReturns;
