"use client";

import { useState, useEffect } from "react";
import { useGetVouchers, useDeleteVoucher } from "@/hooks/api";
import { VoucherData } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Edit, Loader, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import { useQueryClient } from "@tanstack/react-query";
import { DynamicPagination } from "@/components/ui/dynamic-pagination";

interface FilterParams {
  limit?: string;
  offset?: string;
  sort_attr?: string;
  sort?: string;
  name?: string;
  code?: string;
  type?: string;
  registered?: string;
  from?: string;
  until?: string;
  noShipping?: string;
  products?: string;
  categories?: string;
}

export function VoucherList() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<FilterParams>({
    limit: "7",
    offset: "0",
    sort_attr: "createdAt",
    sort: "desc",
  });

  const debouncedFilters = useDebounce(filters, 1000);

  const {
    data: vouchersResponse,
    isLoading,
    error,
  } = useGetVouchers(debouncedFilters);

  const { mutate: deleteVoucher } = useDeleteVoucher();
  const vouchers = vouchersResponse?.data || [];
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVoucherId, setSelectedVoucherId] = useState<string | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleFilterChange = (key: keyof FilterParams, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
      offset: "0",
    }));
  };

  const clearFilters = () => {
    setFilters({
      limit: "7",
      offset: "0",
      sort_attr: "createdAt",
      sort: "desc",
      name: "",
      code: "",
      type: "",
      registered: "",
      from: "",
      until: "",
      noShipping: "",
      products: "",
      categories: "",
    });
  };

  const handleDelete = (id: string) => {
    setSelectedVoucherId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedVoucherId) {
      setIsDeleting(true);
      deleteVoucher(selectedVoucherId, {
        onSuccess: () => {
          toast.success("Voucher deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["vouchers"] });
          setShowDeleteModal(false);
          setSelectedVoucherId(null);
          setIsDeleting(false);
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Failed to delete voucher");
          console.error(error);
          setShowDeleteModal(false);
          setSelectedVoucherId(null);
          setIsDeleting(false);
        },
      });
    }
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      offset: ((page - 1) * parseInt(filters.limit || "7")).toString(),
    }));
  };

  console.log(vouchersResponse?.data.length);

  const currentPage =
    Math.floor(
      parseInt(filters.offset || "0") / parseInt(filters.limit || "7")
    ) + 1;
  const totalItems = vouchers?.total || 0;
  const itemsPerPage = parseInt(filters.limit || "7");

  // if (isLoading) {
  //   return (
  //     <div className="flex h-[400px] w-full items-center justify-center">
  //       <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Error loading vouchers. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-md">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold ">Vouchers</h1>
        <Button>
          <Link href="/admin/voucher/create">Create Voucher</Link>
        </Button>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <Select
            value={filters.type}
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PERCENTAGE">Percentage</SelectItem>
              <SelectItem value="FIXED">Fixed Amount</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.registered}
            onValueChange={(value) => handleFilterChange("registered", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Registration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Registered Only</SelectItem>
              <SelectItem value="false">Non-Registered Only</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.sort_attr}
            onValueChange={(value) => handleFilterChange("sort_attr", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Created Date</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="code">Code</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Search by name"
              value={filters.name || ""}
              onChange={(e) => handleFilterChange("name", e.target.value)}
            />
            <Input
              placeholder="Search by code"
              value={filters.code || ""}
              onChange={(e) => handleFilterChange("code", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !filters.from && "text-muted-foreground"
                  )}
                >
                  {filters.from ? (
                    format(new Date(filters.from), "PPP")
                  ) : (
                    <span>Valid From</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.from ? new Date(filters.from) : undefined}
                  onSelect={(date) =>
                    handleFilterChange("from", date?.toISOString() || "")
                  }
                  disabled={(date) => date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !filters.until && "text-muted-foreground"
                  )}
                >
                  {filters.until ? (
                    format(new Date(filters.until), "PPP")
                  ) : (
                    <span>Valid Until</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.until ? new Date(filters.until) : undefined}
                  onSelect={(date) =>
                    handleFilterChange("until", date?.toISOString() || "")
                  }
                  disabled={(date) => date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-4">
            <Select
              value={filters.sort}
              onValueChange={(value) => handleFilterChange("sort", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.limit}
              onValueChange={(value) => handleFilterChange("limit", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Items per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={clearFilters}
            className="border border-primary text-primary"
          >
            Clear Filters
          </Button>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Valid From</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow className="h-[52px]">
                  <TableCell colSpan={8} className="text-center h-[52px]">
                    <div className="flex items-center justify-center w-full h-[52px]">
                      <Loader className="h-4 w-4 animate-spin text-primary" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                vouchers?.vouchers?.map((voucher) => (
                  <TableRow key={voucher._id}>
                    <TableCell className="font-medium">
                      {voucher.name}
                    </TableCell>
                    <TableCell>{voucher.code}</TableCell>
                    <TableCell className="capitalize">
                      {voucher.type.toLowerCase()}
                    </TableCell>
                    <TableCell>
                      {voucher.type === "PERCENTAGE"
                        ? `${voucher.value}%`
                        : `${formatCurrency(voucher.value)}`}
                    </TableCell>
                    <TableCell>
                      {format(new Date(voucher.from), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      {format(new Date(voucher.until), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          new Date(voucher.until) > new Date()
                            ? "success"
                            : "destructive"
                        }
                      >
                        {new Date(voucher.until) > new Date()
                          ? "Active"
                          : "Expired"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" asChild>
                                <Link
                                  href={`/admin/voucher/update/${voucher._id}`}
                                >
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit Voucher</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(voucher._id)}
                                disabled={
                                  isDeleting &&
                                  selectedVoucherId === voucher._id
                                }
                              >
                                {isDeleting &&
                                selectedVoucherId === voucher._id ? (
                                  <Loader className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete Voucher</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
              {(vouchers?.total) === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No vouchers found
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

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedVoucherId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Voucher?"
        description="Are you sure you want to delete this voucher? This action cannot be undone."
        confirmText="Delete Voucher"
        cancelText="Keep Voucher"
        isLoading={isDeleting}
      />
    </div>
  );
}
