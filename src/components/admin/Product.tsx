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
import { Edit, Trash, Trophy } from "lucide-react";
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
import { Pagination } from "@/components/ui/pagination";

interface FilterParams {
  price?: string[];
  limit?: string;
  offset?: string;
  sort_attr?: string;
  sort?: string;
  name?: string;
  category?: string;
  type?: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  images: string[];
  categoryIds: string[];
  type: "NEW" | "SALE";
}

interface Category {
  _id: string;
  name: string;
  displayName: string;
}

export function Product() {
  const [filters, setFilters] = useState<FilterParams>({
    limit: "10",
    offset: "0",
  });
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms delay

  // Update filters when debounced search term changes
  useEffect(() => {
    setFilters((prev) => ({ ...prev, name: debouncedSearchTerm }));
  }, [debouncedSearchTerm]);

  const { data: productsData, isLoading: isProductsLoading } =
    useGetProducts(filters);
  const { data: categoriesData } = useGetCategories();
  
  const { mutate: deleteProduct } = useDeleteProduct();

  const handleDelete = (id: string) => {
    deleteProduct(id, {
      onSuccess: () => {
        toast.success("Product deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
      onError: (error) => {
        toast.error("Failed to delete product");
        console.error(error);
      },
    });
  };

  const handleFilterChange = (key: keyof FilterParams, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: key === "price" ? value.split(",") : value,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      offset: ((page - 1) * parseInt(filters.limit || "10")).toString(),
    }));
  };

  return (
    <div className="py-10">
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Price Range</label>
          <Input
            placeholder="min,max (e.g., 10,100)"
            value={Array.isArray(filters.price) ? filters.price.join(",") : ""}
            onChange={(e) => handleFilterChange("price", e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Sort By</label>
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

        <div>
          <label className="text-sm font-medium mb-2 block">Sort Order</label>
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
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Search by Name
          </label>
          <Input
            placeholder="Product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Category</label>
          <Select
            value={filters.category}
            onValueChange={(value) => handleFilterChange("category", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categoriesData?.data?.categories?.map((category: Category) => (
                <SelectItem key={category?._id} value={category?._id}>
                  {category?.displayName || category?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Type</label>
          <Select
            value={filters.type}
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NEW">New</SelectItem>
              <SelectItem value="SALE">Sale</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Tournament</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isProductsLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              productsData?.data?.products?.map((product: Product) => (
                <TableRow key={product?._id}>
                  <TableCell>
                    {product?.images && product?.images[0] && (
                      <div className="relative h-16 w-16">
                        <Image
                          src={product?.images[0]}
                          alt={product?.name}
                          className="rounded-md object-contain w-full h-full"
                          width={20}
                          height={20}
                          unoptimized
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{product?.name || "N/A"}</TableCell>
                  <TableCell>{product?.price || "N/A"}</TableCell>
                  <TableCell>{product?.stock || "N/A"}</TableCell>
                  <TableCell>
                    {categoriesData?.data?.categories?.find(
                      (category: Category) => category._id === product.categoryIds[0]
                    )?.displayName || "N/A"}
                  </TableCell>
                  <TableCell>{product?.type}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/products/update/${product._id}`}>
                          <Edit className="h-4 w-4 text-primary" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(product._id)}
                      >
                        <Trash className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Link href={`/admin/tournament/create/${product?._id}`}>
                        <Trophy className="h-4 w-4 text-blue-600" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          totalItems={productsData?.data?.total || 0}
          itemsPerPage={parseInt(filters.limit || "10")}
          onPageChange={handlePageChange}
          currentPage={
            Math.floor(
              parseInt(filters.offset || "0") / parseInt(filters.limit || "10")
            ) + 1
          }
        />
      </div>
    </div>
  );
}
