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
import { Trash, Search, X, Loader } from "lucide-react";
import { useDeleteCategory, useGetCategories } from "@/hooks/api";
import { CreateCategoryDialog } from "./CreateCategoryDialog";
import { EditCategoryDialog } from "./EditCategoryDialog";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useState, useEffect } from "react";
import { TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Tooltip } from "../ui/tooltip";
import { DynamicPagination } from "@/components/ui/dynamic-pagination";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { TooltipProvider } from "@/components/ui/tooltip";

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

interface CategoryResponse {
  data: {
    categories: CategoryType[];
    total: number;
  };
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
  const {
    data: getCategories,
    isLoading,
    isError,
  } = useGetCategories(filters) as {
    data: CategoryResponse | undefined;
    isLoading: boolean;
    isError: boolean;
  };
  const categories = getCategories?.data?.categories;
  const totalCount = getCategories?.data?.total || 0;
  const currentPage =
    Math.floor(parseInt(filters.offset) / parseInt(filters.limit)) + 1;

  const { mutate: deleteCategory } = useDeleteCategory();
  const queryClient = useQueryClient();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (id: string) => {
    setSelectedCategoryId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCategoryId) {
      setIsDeleting(true);
      deleteCategory(selectedCategoryId, {
        onSuccess: () => {
          toast.success("Category deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["categories"] });
          setShowDeleteModal(false);
          setSelectedCategoryId(null);
          setIsDeleting(false);
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Failed to delete category");
          console.error(error);
          setShowDeleteModal(false);
          setSelectedCategoryId(null);
          setIsDeleting(false);
        },
      });
    }
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      offset: ((page - 1) * parseInt(filters.limit)).toString(),
    }));
  };

  return (
    <div className="p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Search by Name
            </label>
            <div className="relative">
              {searchTerm ? (
                <X
                  className="absolute right-2 top-3 h-4 w-4 text-muted-foreground cursor-pointer"
                  onClick={() => setSearchTerm("")}
                />
              ) : (
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              )}
              <Input
                placeholder="Category name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 bg-white w-[300px]"
              />
            </div>
          </div>
          <div className="flex justify-end items-center mt-5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <CreateCategoryDialog />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create a new category</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="border rounded-md bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-500">NAME</TableHead>
                <TableHead className="text-gray-500">DISPLAY NAME</TableHead>
                <TableHead className="text-gray-500">DESCRIPTION</TableHead>
                <TableHead className="text-gray-500">STATUS</TableHead>
                <TableHead className="text-gray-500">CREATED AT</TableHead>
                <TableHead className="text-gray-500">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow className="h-44">
                  <TableCell colSpan={6} className="text-center">
                    <div className="flex items-center justify-center w-full">
                      <Loader className="h-4 w-4 animate-spin text-primary" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : categories?.length > 0 ? (
                categories.map((category: CategoryType) => (
                  <TableRow key={category._id} className="hover:bg-gray-50">
                    <TableCell className="text-gray-900">{category.name}</TableCell>
                    <TableCell className="text-gray-900">{category.displayName}</TableCell>
                    <TableCell className="text-gray-500 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
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
                    <TableCell className="text-gray-500">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <EditCategoryDialog categoryId={category._id} />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit category details</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(category._id)}
                                className="hover:bg-gray-100"
                                disabled={isDeleting && selectedCategoryId === category._id}
                              >
                                {isDeleting && selectedCategoryId === category._id ? (
                                  <Loader className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete category</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No categories found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between py-4">
          <p className="text-sm text-gray-500">
            Displaying {parseInt(filters.offset) + 1} to{" "}
            {Math.min(
              parseInt(filters.offset) + parseInt(filters.limit),
              totalCount
            )}{" "}
            of {totalCount} entries
          </p>
          <DynamicPagination
            totalItems={totalCount}
            itemsPerPage={parseInt(filters.limit)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedCategoryId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Category?"
        description="Are you sure you want to delete this category? This action cannot be undone."
        confirmText="Delete Category"
        cancelText="Keep Category"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default Categories;
