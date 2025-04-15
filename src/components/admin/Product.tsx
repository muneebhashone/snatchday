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
  TableFooter,
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
import { DynamicPagination } from "@/components/ui/dynamic-pagination";
import { formatCurrency } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DualRangeSlider } from "../tournaments/dualSlider";

interface FilterParams {
  price?: string;
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
    limit: "10",
    offset: "0",
  });
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const debouncedFilters = useDebounce(filters, 1000);

  const [priceRange, setPriceRange] = useState([10, 100000]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, name: debouncedSearchTerm }));
  }, [debouncedSearchTerm]);

  const { data: productsData, isLoading: isProductsLoading } = useGetProducts(
    debouncedFilters
  ) as { data: ProductResponse | undefined; isLoading: boolean };

  const { data: categoriesData } = useGetCategories() as {
    data: CategoryResponse | undefined;
  };

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
    let updatedValue: string[] | string = value;

    if (key === "price") {
      updatedValue = value.split(",").map((v) => v.trim());
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: updatedValue,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      offset: ((page - 1) * parseInt(filters.limit || "10")).toString(),
    }));
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: `[${value.join(",")}]`,
    }));
  };

  const currentPage =
    Math.floor(
      parseInt(filters.offset || "0") / parseInt(filters.limit || "10")
    ) + 1;
  const totalItems = productsData?.data?.total || 0;
  const itemsPerPage = parseInt(filters.limit || "10");

  return (
    <div className="py-10">
      <div className="mb-6 grid grid-cols-3 gap-8">
        <div>
          <label className="text-sm font-medium mb-8 block">Price Range</label>
          {/* <Input
            placeholder="min,max (e.g., 10,100)"
            value={Array.isArray(filters.price) ? filters.price.join(",") : ""}
            onChange={(e) => handleFilterChange("price", e.target.value)}
          /> */}

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

      <div className="border border-primary">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-primary">
              <TableHead className="text-primary font-bold">SKU</TableHead>
              <TableHead className="text-primary font-bold">Image</TableHead>
              <TableHead className="text-primary font-bold">Name</TableHead>
              <TableHead className="text-primary font-bold">Price</TableHead>
              <TableHead className="text-primary font-bold">Stock</TableHead>
              <TableHead className="text-primary font-bold">Category</TableHead>
              <TableHead className="text-primary font-bold">Type</TableHead>
              <TableHead className="text-primary font-bold">Actions</TableHead>
              <TableHead className="text-primary font-bold">
                Tournament
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isProductsLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : productsData?.data?.products?.length > 0 ? (
              productsData?.data?.products?.map((product: Product) => (
                <TableRow key={product?._id}>
                  <TableCell>{product?.sku || "N/A"}</TableCell>
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
                  <TableCell>
                    {product?.name
                      ? product.name.length > 30
                        ? `${product.name.substring(0, 30)}...`
                        : product.name
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {formatCurrency(product?.price) || "N/A"}
                  </TableCell>
                  <TableCell>{product?.stock || "N/A"}</TableCell>
                  <TableCell>
                    {product?.categoryIds.map((categoryId) => {
                      return (
                        <div key={categoryId._id}>
                          {categoryId?.displayName || "N/A"}
                        </div>
                      );
                    })}
                  </TableCell>
                  <TableCell>{product?.type}</TableCell>
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
                            >
                              <Trash className="h-4 w-4" />
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
                <TableCell colSpan={8} className="text-center">
                  Products not found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                <div className="flex flex-col items-center gap-4 mt-4">
                  <div className="text-sm text-gray-500">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
                    {totalItems} entries
                  </div>
                  {productsData?.data?.products && (
                    <DynamicPagination
                      totalItems={totalItems}
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  )}
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
