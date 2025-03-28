"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { formatDate } from "date-fns";
// import InvoiceButton from "../InvoiceButton";
import { useGetMyReturns } from "@/hooks/api";

const ReturnOrdersTable = () => {
  const [pagination, setPagination] = useState({ limit: 10, offset: 0 });
  const [filters, setFilters] = useState({
    status: "",
    orderNumber: "",
    articleId: "",
  });


  const { data: returns, isLoading } = useGetMyReturns({
    limit: pagination.limit,
    offset: pagination.offset,
    ...filters,
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPagination((prev) => ({ ...prev, offset: 0 })); // Reset offset on filter change
  };

  const handleNextPage = () => {
    setPagination((prev) => ({
      ...prev,
      offset: prev.offset + prev.limit,
    }));
  };

  const handlePreviousPage = () => {
    setPagination((prev) => ({
      ...prev,
      offset: Math.max(prev.offset - prev.limit, 0),
    }));
  };

  return (
    <div className="p-20">
      <h2 className="text-2xl font-bold mb-10">My Returns</h2>
      <div className="mb-4 flex justify-between">
        <div>
          <input
            type="text"
            name="orderNumber"
            placeholder="Search by Order Number"
            value={filters.orderNumber}
            onChange={handleFilterChange}
            className="border p-2"
          />
        </div>

        <div className="flex gap-2">
        
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border p-2 ml-2"
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      <Table className="border">
        <TableHeader className="rounded-t-3xl">
          <TableRow className="rounded-t-3xl">
            <TableHead>Article</TableHead>
            <TableHead className="w-[100px]">Order No</TableHead>
            <TableHead>Return Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={10} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            returns?.data?.returns?.map((returnItem, index) => (
              <TableRow key={index}>
                <TableCell>{returnItem?.productsData?.map((product) => <ul>
                  <li>{product?.product?.article}</li>
                  
                </ul>) || "N/A"}</TableCell>
                <TableCell>{returnItem.orderNumber || "N/A"}</TableCell>
                <TableCell>{returnItem.returnNumber || "N/A"}</TableCell>
                <TableCell>
                  <div
                    className={`text-center capitalize rounded-md py-1 px-2 ${
                      returnItem.status === "pending"
                        ? "bg-yellow-500 text-white"
                        : "bg-green-700 text-white"
                    }`}
                  >
                    {returnItem.status === "waiting" ? "waiting for product" : returnItem.status || "N/A"}
                  </div>
                </TableCell>
                <TableCell>
                  {formatDate(returnItem.createdAt || "", "dd/MM/yyyy")}
                </TableCell>
                <TableCell className="text-center">
                  <Link href={`/my-account/returns/${returnItem._id}`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-gray-100"
                    >
                      <Eye className="h-5 w-5 text-foreground" />
                    </Button>
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  {/* <InvoiceButton orderDetails={returnItem} /> */}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="p-4 border-t flex items-center justify-between">
        <Button onClick={handlePreviousPage} disabled={pagination.offset === 0}>
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={returns?.data?.returns.length < pagination.limit}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ReturnOrdersTable;
