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
import {  Eye, Loader } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useParams } from "next/navigation";

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
    setPagination((prev) => ({ ...prev, currentPage: 1 })); // Reset currentPage on filter change
  };

  const handleNextPage = () => {
    setPagination((prev) => ({
      ...prev,
      currentPage: prev.currentPage + 1,
    }));
  };

  const handlePreviousPage = () => {
    setPagination((prev) => ({
      ...prev,
      currentPage: Math.max(prev.currentPage - 1, 1),
    }));
  };

  return isLoading ? (
    <div className="flex items-center justify-center">
      <Loader size={25} className="animate-spin text-primary" />
    </div>
  ) : (
    <>
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
            <option value="waiting">Waiting for product</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>
      <Table className="border border-primary">
        <TableHeader>
          <TableRow className="border border-primary">
            <TableHead className="text-primary font-bold w-[100px]">
              Article
            </TableHead>
            <TableHead className="text-primary font-bold">Order No.</TableHead>
            <TableHead className="text-primary font-bold">
              Return Number{" "}
            </TableHead>
            <TableHead className="text-primary font-bold">Status</TableHead>
            <TableHead className="text-primary font-bold">
              Date Created
            </TableHead>
            <TableHead className="text-primary  font-bold text-center">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={10} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : returns?.data?.returns?.length > 0 ? (
            returns?.data?.returns?.map((returnItem, index) => (
              <TableRow key={index}>
                <TableCell className="min-w-[150px]">
                  {returnItem?.productsData?.map((product, i) => (
                    <ul key={i}>
                      <li>{product?.product?.article || "N/A"}</li>
                    </ul>
                  )) || "N/A"}
                </TableCell>
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
                    <p className="capitalize">{returnItem.status || "N/A"}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {formatDate(returnItem.createdAt || "", "dd/MM/yyyy")}
                </TableCell>
                <TableCell className="text-center flex gap-2 justify-center items-center">
                  <Link href={`/admin/orders/returns/update/${returnItem._id}`}>
                    <button className="hover:bg-gray-100 flex items-end">
                      <Eye className="h-5 w-5 text-foreground" />
                    </button>
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  {/* <InvoiceButton orderDetails={returnItem} /> */}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="text-center">
                No returns found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {returns?.data?.total > 10 && (
          <TableFooter className="w-full">
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                <button
                  className={`${
                  pagination.currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : ""
                }`}
                disabled={pagination.currentPage === 1}
                onClick={handlePreviousPage}
              >
                Prev
              </button>
              {Array.from(
                {
                  length: Math.ceil(
                    (returns?.data?.total || 0) / pagination.pageSize
                  ),
                },
                (_, index) => {
                  return (
                    <button
                      key={index}
                      className={`page-indicator m-1 ${
                        index + 1 === pagination.currentPage
                          ? "bg-primary px-2 text-white"
                          : ""
                      }`}
                      onClick={() =>
                        setPagination({ ...pagination, currentPage: index + 1 })
                      }
                    >
                      {index + 1}
                    </button>
                  );
                }
              )}
              <button
                className={`${
                  pagination.currentPage ===
                  Math.ceil((returns?.data?.total || 0) / pagination.pageSize)
                    ? "text-gray-300 cursor-not-allowed"
                    : ""
                }`}
                disabled={
                  pagination.currentPage ===
                  Math.ceil((returns?.data?.total || 0) / pagination.pageSize)
                }
                onClick={handleNextPage}
              >
                Next
              </button>
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
        </Table>
    </>
  );
}

export default CustomerReturns;
