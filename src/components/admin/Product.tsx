"use client";
import {
  useGetProducts,
  useGetCategories,
  useDeleteProduct,
} from "@/hooks/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Trophy, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { DynamicPagination } from "@/components/ui/dynamic-pagination";
import { formatCurrency } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { DualRangeSlider } from "../tournaments/dualSlider";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

interface FilterParams {
  price?: string;
  type?: string;
  limit?: string;
  offset?: string;
  sort_attr?: string;
  sort?: string;
  name?: string;
  category?: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  images: string[];
  categoryIds: Category[];
  type: "NEW" | "SALE";
  sku?: string;
}

interface Category {
  _id: string;
  name: string;
  displayName: string;
}

interface ProductResponse {
  data: {
    products: Product[];
    total: number;
  };
}

interface CategoryResponse {
  data: {
    categories: Category[];
  };
}

export function Product() {
  const [filters, setFilters] = useState<FilterParams>({
    limit: "7",
    offset: "0",
  });
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const debouncedFilters = useDebounce(filters, 1000);

  const [priceRange, setPriceRange] = useState([10, 100000]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setFilters((prev) => ({ 
      ...prev, 
      name: debouncedSearchTerm,
      offset: "0"
    }));
  }, [debouncedSearchTerm]);

  const { data: productsData, isLoading: isProductsLoading } = useGetProducts(
    debouncedFilters
  ) as { data: ProductResponse | undefined; isLoading: boolean };

  const { data: categoriesData } = useGetCategories() as {
    data: CategoryResponse | undefined;
  };

  const { mutate: deleteProduct } = useDeleteProduct();
  const handleDelete = (id: string) => {
    setSelectedProductId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProductId) {
      setIsDeleting(true);
      deleteProduct(selectedProductId, {
        onSuccess: () => {
          toast.success("Product deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["products"] });
          setShowDeleteModal(false);
          setSelectedProductId(null);
          setIsDeleting(false);
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Failed to delete product");
          console.error(error);
          setShowDeleteModal(false);
          setSelectedProductId(null);
          setIsDeleting(false);
        },
      });
    }
  };

  const handleFilterChange = (key: keyof FilterParams, value: string) => {
    let updatedValue: string[] | string = value;

    if (key === "price") {
      updatedValue = value.split(",").map((v) => v.trim());
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: updatedValue,
      offset: "0",
    }));
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: `[${value.join(",")}]`,
      offset: "0",
    }));
  };

  const clearFilters = () => {
    setPriceRange([10, 100000]);
    setSearchTerm("");
    setFilters({
      limit: "7",
      offset: "0",
      name: "",
      category: "",
      type: "",
      sort_attr: "",
      sort: "",
      price: "",
    });
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
  const totalItems = productsData?.data?.total || 0;
  const itemsPerPage = parseInt(filters.limit || "7");

  return (
    <div className="p-6">
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
              <SelectItem value="NEW">New</SelectItem>
              <SelectItem value="SALE">Sale</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.category}
            onValueChange={(value) => handleFilterChange("category", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categoriesData?.data?.categories?.map((category: Category) => (
                <SelectItem key={category?._id} value={category?._id}>
                  {category?.displayName || category?.name}
                </SelectItem>
              ))}
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
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="createdAt">Created Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Price Range
            </label>
            <DualRangeSlider
              label={(value) => value}
              value={priceRange}
              onValueChange={handlePriceRangeChange}
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
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=""
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="border border-primary text-primary"
            >
              Clear Filters
            </Button>
          </div>

          <div className="flex items-center gap-4">
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
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>PRODUCT</TableHead>
                <TableHead>CATEGORY</TableHead>
                <TableHead>STOCK</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>PRICE</TableHead>
                <TableHead>QTY</TableHead>
                <TableHead>TYPE</TableHead>
                <TableHead>ACTIONS</TableHead>
                <TableHead>TOURNAMENT</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isProductsLoading ? (
                <TableRow className="h-44">
                  <TableCell colSpan={9} className="text-center">
                    <div className="flex items-center justify-center w-full">
                      <Loader className="h-4 w-4 animate-spin text-primary" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : productsData?.data?.products?.length > 0 ? (
                productsData?.data?.products?.map((product: Product) => (
                  <TableRow key={product?._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {product?.images && product?.images[0] && (
                          <div className="relative h-12 w-12">
                            <Image
                              src={product?.images[0]}
                              alt={product?.name}
                              className="rounded-md object-contain"
                              fill
                              unoptimized
                            />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {product?.description && product?.name?.length > 30
                              ? `${product?.name?.substring(0, 30)}...`
                              : product?.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {product?.description &&
                            product?.description?.length > 30
                              ? `${product?.description?.substring(0, 30)}...`
                              : product?.description}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="flex flex-col gap-2">
                      {product?.categoryIds?.map((category) => (
                        <p key={category._id}>{category.name}</p>
                      ))}
                    </TableCell>
                    <TableCell>
                      <div
                        className={`w-12 h-6 rounded-full flex items-center justify-center text-sm ${
                          product?.stock > 0
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product?.stock}
                      </div>
                    </TableCell>
                    <TableCell>{product?.sku || "N/A"}</TableCell>
                    <TableCell>{formatCurrency(product?.price)}</TableCell>
                    <TableCell>{product?.stock}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          product?.type === "NEW"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {product?.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" asChild>
                                <Link
                                  href={`/admin/products/update/${product._id}`}
                                >
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit Product</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(product._id)}
                                disabled={isDeleting && selectedProductId === product._id}
                              >
                                {isDeleting && selectedProductId === product._id ? (
                                  <Loader className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete Product</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Link
                                href={`/admin/tournament/create/${product?._id}`}
                              >
                                <Trophy className="h-4 w-4" />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Create Tournament</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="text-center">
                    No products found
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
          setSelectedProductId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Product?"
        description="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete Product"
        cancelText="Keep Product"
        isLoading={isDeleting}
      />
    </div>
  );
}
