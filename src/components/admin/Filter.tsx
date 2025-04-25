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
import { Button } from "@/components/ui/button";
import { Trash, Loader } from "lucide-react";
import { useDeleteFilter, useGetFilters, useGetCategories } from "@/hooks/api";
import { CreateFilterDialog } from "./CreateFilterDialog";
import { EditFilterDialog } from "./EditFilterDialog";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { DynamicPagination } from "@/components/ui/dynamic-pagination";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

interface Category {
  _id: string;
  name: string;
  displayName: string;
}

interface Filter {
  _id: string;
  name: string;
  value: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface FilterResponse {
  data: {
    filters: Filter[];
    total: number;
  };
}

const Filter = () => {
  const [page, setPage] = useState(0);
  const skip = 10;
  const queryClient = useQueryClient();
  const {
    data: getFilters,
    isLoading,
    isError,
  } = useGetFilters({
    limit: skip.toString(),
    offset: page.toString(),
  }) as {
    data: FilterResponse | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  const { data: getCategories } = useGetCategories();
  const { mutate: deleteFilter } = useDeleteFilter();

  const filters = getFilters?.data?.filters || [];
  const categories = getCategories?.data?.categories || [];
  const totalItems = getFilters?.data?.total || 0;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFilterId, setSelectedFilterId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (id: string) => {
    setSelectedFilterId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedFilterId) {
      setIsDeleting(true);
      deleteFilter(selectedFilterId, {
        onSuccess: () => {
          toast.success("Filter deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["filters"] });
          setShowDeleteModal(false);
          setSelectedFilterId(null);
          setIsDeleting(false);
        },
        onError: (error) => {
          toast.error("Failed to delete filter");
          console.error(error);
          setShowDeleteModal(false);
          setSelectedFilterId(null);
          setIsDeleting(false);
        },
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage((newPage - 1) * skip);
  };

  return (
    <div className="p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Filters</h1>
      <div className="space-y-4">
        <div className="flex justify-end items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CreateFilterDialog />
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new filter</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="border rounded-md bg-white">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="flex items-center justify-center w-full">
                <Loader className="h-4 w-4 animate-spin text-primary" />
              </div>
            </div>
          ) : isError ? (
            <div className="p-8 text-center text-red-500">
              Error loading filters
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-gray-500">NAME</TableHead>
                    <TableHead className="text-gray-500">VALUES</TableHead>
                    <TableHead className="text-gray-500">CREATED AT</TableHead>
                    <TableHead className="text-right text-gray-500">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filters
                    ?.sort(
                      (a: Filter, b: Filter) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                    .map((filter: Filter) => (
                      <TableRow key={filter._id} className="hover:bg-gray-50">
                        <TableCell className="text-gray-900">{filter.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {filter.value.map((value, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                              >
                                {value}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-500">
                          {new Date(filter.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <EditFilterDialog filter={filter} />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => handleDelete(filter._id)}
                                  variant="ghost"
                                  size="icon"
                                  disabled={isDeleting && selectedFilterId === filter._id}
                                  className="hover:bg-gray-100"
                                >
                                  {isDeleting && selectedFilterId === filter._id ? (
                                    <Loader className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Trash className="h-4 w-4" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete Filter</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    ))}
                  {!filters?.length && (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center py-8 text-gray-500"
                      >
                        No filters found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter className="w-full">
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      <div className="flex justify-between items-center gap-4">
                        <div className="text-sm text-gray-500">
                          Showing {page + 1} to{" "}
                          {Math.min(page + skip, totalItems)} of {totalItems}{" "}
                          entries
                        </div>
                        <DynamicPagination
                          totalItems={totalItems}
                          itemsPerPage={skip}
                          currentPage={Math.floor(page / skip) + 1}
                          onPageChange={handlePageChange}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedFilterId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Filter?"
        description="Are you sure you want to delete this filter? This action cannot be undone."
        confirmText="Delete Filter"
        cancelText="Keep Filter"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default Filter;
