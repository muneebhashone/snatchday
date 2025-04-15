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
import { Trash } from "lucide-react";
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
  });
  console.log(page)
  const { data: getCategories } = useGetCategories();
  const { mutate: deleteFilter } = useDeleteFilter();
  console.log(getFilters);
  const filters = getFilters?.data.filters || [];
  const categories = getCategories?.data.categories || [];

  const handleDelete = (id: string) => {
    deleteFilter(id, {
      onSuccess: () => {
        toast.success("Filter deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["filters"] });
      },
      onError: (error) => {
        toast.error("Failed to delete filter");
        console.error(error);
      },
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Filters</h1>
        <div className="flex gap-2">
          <CreateFilterDialog />
        </div>
      </div>

      <div className="bg-white rounded-md shadow-sm">
        {isLoading ? (
          <div className="p-8 text-center">Loading filters...</div>
        ) : isError ? (
          <div className="p-8 text-center text-red-500">
            Error loading filters
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="border border-primary">
              <TableHeader>
                <TableRow className="border-b border-primary">
                  <TableHead className="text-primary font-bold">Name</TableHead>
                  <TableHead className="text-primary font-bold">
                    Values
                  </TableHead>
                  <TableHead className="text-primary font-bold">
                    Created At
                  </TableHead>
                  <TableHead className="text-right text-primary font-bold">
                    Actions
                  </TableHead>
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
                      <TableCell>{filter.name}</TableCell>
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
                      {/* <TableCell>{getCategoryName(filter.category)}</TableCell> */}
                      <TableCell>
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
                                // className="text-red-500 hover:text-red-600 transition-colors"
                              >
                                <Trash className="h-4 w-4" />
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
                  <TableCell colSpan={8} className="text-center">
                    <button
                      className={`border px-2 py-1 mr-2 ${
                        page === 0 ? "text-gray-300 cursor-not-allowed" : ""
                      }`}
                      disabled={page === 0}
                      onClick={() => {
                        setPage((prev) => Math.max(prev - skip, 0)); // Prevent going negative
                      }}
                    >
                      Prev
                    </button>
                    {Array.from(
                      {
                        length: Math.ceil(
                          (getFilters?.data?.total || 0) / skip
                        ),
                      },
                      (_, index) => {
                        return (
                          <button
                            key={index}
                            className={`page-indicator m-1 mr-2 ${
                              index === page / skip
                                ? "bg-primary px-2 text-white"
                                : ""
                            }`}
                            onClick={() => setPage(index * skip)}
                          >
                            {index + 1}
                          </button>
                        );
                      }
                    )}
                    <button
                      className={`border px-2 py-1 ml-2 ${
                        page + skip >=
                          (getFilters?.data?.total || 0) && "text-gray-300"
                      }`}
                      disabled={
                        page + skip >= (getFilters?.data?.total || 0)
                      }
                      onClick={() => {
                        setPage((prev) =>
                          Math.min(
                            prev + skip,
                            (getFilters?.data?.total || 0) - page
                          )
                        );
                      }}
                    >
                      Next
                    </button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
