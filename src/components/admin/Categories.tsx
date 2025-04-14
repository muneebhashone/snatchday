"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash, Search, X } from "lucide-react";
import { useDeleteCategory, useGetCategories } from "@/hooks/api";
import { CreateCategoryDialog } from "./CreateCategoryDialog";
import { EditCategoryDialog } from "./EditCategoryDialog";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useState, useEffect } from "react";

interface CategoryType {
  _id: string;
  name: string;
  description: string;
  displayName: string;
  image: string;
  parentCategory: string | null;
  shop: boolean;
  above: boolean;
  filters: string[];
  subCategories: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    limit: "10",
    offset: "0",
    name: "",
  });
  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 1000);

  // Update filters when debounced search term changes
  useEffect(() => {
    setFilters((prev) => ({ ...prev, name: debouncedSearchTerm }));
  }, [debouncedSearchTerm]);

  // Fetch categories using the hook with filters
  const { data: getCategories, isLoading, isError } = useGetCategories(filters);
  const categories = getCategories?.data?.categories;
  const totalCount =
    getCategories?.data?.total || getCategories?.data?.categories?.length || 0;
  const totalPages = Math.ceil(totalCount / parseInt(filters.limit));
  const currentPage =
    Math.floor(parseInt(filters.offset) / parseInt(filters.limit)) + 1;

  const { mutate: deleteCategory } = useDeleteCategory();
  const queryClient = useQueryClient();

  const handleDelete = (id: string) => {
    deleteCategory(id, {
      onSuccess: () => {
        toast.success("Category deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
      onError: (error) => {
        toast.error("Failed to delete category");
        console.error(error);
      },
    });
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      offset: ((page - 1) * parseInt(filters.limit)).toString(),
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <div className="flex gap-2">
          <div className="relative w-64">
            {searchTerm ? (
              <X
                className="absolute right-2 top-3 h-4 w-4 text-muted-foreground"
                onClick={() => setSearchTerm("")}
              />
            ) : (
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            )}
            <Input
              placeholder="Search by name "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <CreateCategoryDialog />
        </div>
      </div>

      <div className="bg-white rounded-md shadow-sm">
        {isLoading ? (
          <div className="p-8 text-center">Loading categories...</div>
        ) : isError ? (
          <div className="p-8 text-center text-red-500">
            Error loading categories
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="border border-primary">
              <TableHeader>
                <TableRow className="border-b border-primary">
                  {/* <TableHead className="w-[40px]">
                  <input type="checkbox" className="rounded border-gray-300" />
                  </TableHead> */}
                  <TableHead className="text-primary font-bold">Name</TableHead>
                  <TableHead className="text-primary font-bold">Display Name</TableHead>
                  <TableHead className="text-primary font-bold">Description</TableHead>
                  <TableHead className="text-primary font-bold">Status</TableHead>
                  <TableHead className="text-primary font-bold">Created At</TableHead>
                  <TableHead className="text-right text-primary font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories?.map((category: CategoryType) => (
                  <TableRow key={category._id} className="hover:bg-gray-50">
                    {/* <TableCell>
                      <input type="checkbox" className="rounded border-gray-300" />
                    </TableCell> */}
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.displayName}</TableCell>
                    <TableCell className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {category.description}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          category.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(category.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <EditCategoryDialog categoryId={category._id} />
                      <Button
                        onClick={() => handleDelete(category._id)}
                        variant="ghost"
                        size="icon"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {!categories?.length && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-gray-500"
                    >
                      No categories found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {totalCount > 0 && (
              <div className="flex items-center justify-between px-4 py-4 border-t">
                <div className="text-sm text-gray-500">
                  Showing {parseInt(filters.offset) + 1} to{" "}
                  {Math.min(
                    parseInt(filters.offset) + parseInt(filters.limit),
                    totalCount
                  )}{" "}
                  of {totalCount} entries
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    )
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
