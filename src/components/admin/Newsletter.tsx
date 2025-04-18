"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetNewsletters } from "@/hooks/api";
import { NewsletterTypes } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Loader } from "lucide-react";
import { DynamicPagination } from "@/components/ui/dynamic-pagination";

interface FilterParams {
  limit?: string;
  offset?: string;
}

interface NewsletterResponse {
  success: boolean;
  data: {
    subscribers: NewsletterTypes[];
  };
  total: number;
}

const Newsletter = () => {
  const [filters, setFilters] = useState<FilterParams>({
    limit: "7",
    offset: "0",
  });

  const { data: newsletters, isLoading, isError } = useGetNewsletters(filters) as {
    data: NewsletterResponse | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  const handleFilterChange = (key: keyof FilterParams, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
      offset: key === "limit" ? "0" : value,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      offset: ((page - 1) * parseInt(filters.limit || "7")).toString(),
    }));
  };

  const currentPage =
    Math.floor(
      parseInt(filters.offset || "0") / parseInt(filters.limit || "7")
    ) + 1;
  const totalItems = newsletters?.data?.total || 0;
  const itemsPerPage = parseInt(filters.limit || "7");

  return (
    <div className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Newsletters</h1>
          <Select
            value={filters.limit}
            onValueChange={(value) => handleFilterChange("limit", value)}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="7" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>EMAIL</TableHead>
                <TableHead>CREATED AT</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow className="h-44">
                  <TableCell colSpan={2} className="text-center">
                    <div className="flex items-center justify-center w-full">
                      <Loader className="h-4 w-4 animate-spin text-primary" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-red-500">
                    Error loading newsletters
                  </TableCell>
                </TableRow>
              ) : newsletters?.data?.subscribers?.length > 0 ? (
                newsletters.data.subscribers.map((newsletter: NewsletterTypes) => (
                  <TableRow key={newsletter._id}>
                    <TableCell>{newsletter.email || "N/A"}</TableCell>
                    <TableCell>
                      {new Date(newsletter.createdAt).toLocaleDateString() || "N/A"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    No newsletters found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between py-4">
          <p className="text-sm text-gray-500">
            Displaying {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
            entries
          </p>
          <DynamicPagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
