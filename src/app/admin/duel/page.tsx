"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DuelTable from "@/components/admin/DuelTable";
import { useGetDuels } from "@/hooks/api";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import { Loader2, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DynamicPagination } from "@/components/ui/dynamic-pagination";
import { formatCurrency } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DualRangeSlider } from "@/components/tournaments/dualSlider";
import { useDebounce } from "@/hooks/useDebounce";

const DUEL_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "waiting-for-opponent", label: "Waiting for Opponent" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const DuelPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(7);
  const [offset, setOffset] = useState(0);
  const [status, setStatus] = useState<string>("");
  const [priceRange, setPriceRange] = useState([10, 100000]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const { data, isLoading, isError, refetch } = useGetDuels({
    search: debouncedSearchQuery || undefined,
    limit,
    offset,
    status: status || undefined,
    priceRange:
      minPrice || maxPrice
        ? `[${minPrice || 10},${maxPrice || 100000}]`
        : undefined,
  });

  const duels = data?.data?.duels || [];
  const total = data?.data?.total || 0;

  const handlePageChange = (page: number) => {
    setOffset((page - 1) * limit);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setStatus("");
    setMinPrice("");
    setMaxPrice("");
    setPriceRange([10, 100000]);
    setOffset(0);
  };

  const hasActiveFilters = searchQuery || status || minPrice || maxPrice;

  const currentPage = Math.floor(offset / limit) + 1;
  const itemsPerPage = limit;

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <AdminBreadcrumb
          title="Duel Management"
          items={[{ title: "Dashboard", href: "/admin" }]}
        />

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={undefined}>All Statuses</SelectItem>
                {DUEL_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Price Range
              </label>
              <DualRangeSlider
                label={(value) => value}
                value={priceRange}
                onValueChange={(value) => {
                  setPriceRange(value);
                  setMinPrice(value[0].toString());
                  setMaxPrice(value[1].toString());
                }}
                min={10}
                max={100000}
                step={50}
              />
              {priceRange && (
                <div className="flex items-center justify-between mt-1 text-sm text-gray-500">
                  <span>{priceRange[0].toFixed(2)}€</span>
                  <span>{priceRange[1].toFixed(2)}€</span>
                </div>
              )}
            </div>

            <Input
              placeholder="Search duels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={resetFilters}
                className="border border-primary text-primary"
              >
                Clear Filters
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Select
                value={limit.toString()}
                onValueChange={(value) => setLimit(parseInt(value))}
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
          </div>

          {isError ? (
            <div className="text-center p-8 text-red-500">
              Error loading duels. Please try again.
            </div>
          ) : (
            !duels.length && (
              <div className="border rounded-md p-8 text-center text-gray-500">
                No duels found.
              </div>
            )
          )}
          <>
            <div className="border rounded-md">
              <DuelTable duels={duels} isLoading={isLoading} />
            </div>

            <div className="flex items-center justify-between py-4">
              <p className="text-sm text-gray-500">
                Displaying {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, total)} of {total} entries
              </p>
              <DynamicPagination
                totalItems={total}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DuelPage;
