"use client";

import ClientLayout from "@/components/landing-page/ClientLayout";
import ProductCard from "@/components/ProductCard";
import ProductCategoryFilter from "@/components/products/ProductCategoryFilter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import laptop from "@/app/images/laptop.png";

import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import Search from "@/components/Search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid3x3, ListIcon, LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import VisitTournament from "@/components/VisitTournament";
import { useSearchParams } from "next/navigation";
import {
  useGetCategoryById,
  useGetProducts,
  useGetFilterById,
} from "@/hooks/api";
import { useDebounce } from "@/hooks/useDebounce";

interface FilterParams {
  price?: string;
  limit?: string;
  offset?: string;
  sort_attr?: string;
  sort?: string;
  name?: string;
  category?: string;
  type?: string;
  filters?: string;
}

const ProductListingPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [filters, setFilters] = useState<FilterParams>({
    limit: "10",
    offset: "0",
    category: category as string,
  });

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [priceRange, setPriceRange] = useState<number[]>([]);
  const debouncedPriceRange = useDebounce(priceRange, 500);

  const handleFilterChange = (filterName: string, value: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };

      if (newFilters[filterName]?.includes(value)) {
        // Remove the value if it's already selected
        newFilters[filterName] = newFilters[filterName].filter(
          (v) => v !== value
        );
        if (newFilters[filterName].length === 0) {
          delete newFilters[filterName]; // Remove the filter if no values are left
        }
      } else {
        // Add the value to the filter
        newFilters[filterName] = [...(newFilters[filterName] || []), value];
      }

      return newFilters;
    });
  };

  const handlePriceChange = (range: number[]) => {
    setPriceRange(range);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms delay

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const attributesArray = Object.entries(selectedFilters).flatMap(
    ([key, values]) => values.map((value) => ({ [key]: value }))
  );

  const { data: productsData, isLoading } = useGetProducts({
    ...filters,
    ...(attributesArray.length > 0 && {
      attributes: JSON.stringify(attributesArray),
    }),
    ...(debouncedPriceRange.length === 2 && {
      price: `[${debouncedPriceRange[0]},${debouncedPriceRange[1]}]`,
    }),
    ...(debouncedSearchTerm && { name: debouncedSearchTerm }),
  });

  const { data: categoryData } = useGetCategoryById(category as string);

  // Extract and organize filters from categoryData
  const availableFilters =
    categoryData?.data?.filters?.map((filter) => ({
      name: filter.name,
      values: filter.value || [],
      id: filter._id,
    })) || [];

  return (
    <ClientLayout>
      <div className="container mx-auto max-w-[1920px] my-40 px-12">
        <Separator className="my-5" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Laptop</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Separator className="my-5" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
          <div className="col-span-1">
            <div className="mb-5 mt-4">
              <Search
                placeholder="Search by name"
                onSearch={handleSearch}
                value={searchTerm}
              />
            </div>
            <ProductCategoryFilter
              filters={availableFilters}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onPriceChange={handlePriceChange}
              isLoading={isLoading}
            />
            <VisitTournament
              title="January Tournament"
              date="January 30, 2025 at 3:00 p.m."
            />
          </div>
          <div className="col-span-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[20px] font-semibold mb-4">
                  {categoryData?.data?.displayName}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <p className="text-card-foreground font-medium">Show</p>
                  <Select
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, limit: value }))
                    }
                  >
                    <SelectTrigger className="w-[100px] rounded-full">
                      <SelectValue placeholder={filters.limit} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="15">15</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-card-foreground font-medium">Sort by</p>
                  <Select
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, sort: value }))
                    }
                  >
                    <SelectTrigger className="w-[250px] rounded-full">
                      <SelectValue placeholder="Newest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Best Selling</SelectItem>
                      <SelectItem value="aesc">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Button className="rounded-full bg-gray-100 text-gray-700 h-9 w-9">
                    <ListIcon />
                  </Button>
                  <Button className="rounded-full bg-primary text-white h-9 w-9">
                    <Grid3x3 />
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-screen col-span-3">
                  <LoaderIcon className="animate-spin size-10" />
                </div>
              ) : !productsData?.data?.products?.length ? (
                <div className="flex flex-col items-center justify-center h-[400px] col-span-3">
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Not found
                  </h3>
                </div>
              ) : (
                <>
                  {productsData.data.products.map((product, index) => (
                    <ProductCard key={index} {...product} id={product._id} />
                  ))}
                  {productsData.data.products.length > 0 && (
                    <div className="mt-10 col-span-3 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {Array.from(
                          { length: Math.ceil(productsData.data.total / 10) },
                          (_, i) => i + 1
                        )
                          .slice(0, 5)
                          .map((pageNum) => (
                            <button
                              key={pageNum}
                              className={`w-9 h-9 flex items-center justify-center rounded-sm ${
                                pageNum === Number(filters.offset) / 10 + 1
                                  ? "bg-primary text-white"
                                  : "text-gray-400 hover:text-gray-700"
                              }`}
                              onClick={() =>
                                setFilters((prev) => ({
                                  ...prev,
                                  offset: String((pageNum - 1) * 10),
                                }))
                              }
                            >
                              {pageNum}
                            </button>
                          ))}
                        {productsData.data.total >
                          Number(filters.offset) + Number(filters.limit) && (
                          <button
                            className="w-20 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                            onClick={() =>
                              setFilters((prev) => ({
                                ...prev,
                                offset: String(
                                  Number(prev.offset) + Number(prev.limit)
                                ),
                              }))
                            }
                          >
                            <svg
                              width="26"
                              height="12"
                              viewBox="0 0 26 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.63281 5.3C1.24621 5.3 0.932813 5.6134 0.932813 6C0.932812 6.3866 1.24621 6.7 1.63281 6.7L1.63281 5.3ZM24.8622 6.49498C25.1355 6.22161 25.1355 5.77839 24.8622 5.50503L20.4074 1.05025C20.134 0.776887 19.6908 0.776887 19.4174 1.05025C19.1441 1.32362 19.1441 1.76684 19.4174 2.0402L23.3772 6L19.4174 9.9598C19.1441 10.2332 19.1441 10.6764 19.4174 10.9497C19.6908 11.2231 20.134 11.2231 20.4074 10.9497L24.8622 6.49498ZM1.63281 6.7L24.3672 6.7L24.3672 5.3L1.63281 5.3L1.63281 6.7Z"
                                fill="#A5A5A5"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 mt-4">
                        Showing {Number(filters.offset) + 1} to{" "}
                        {Math.min(
                          Number(filters.offset) + Number(filters.limit),
                          productsData.data.total
                        )}{" "}
                        of {productsData.data.total} (
                        {Math.ceil(
                          productsData.data.total / Number(filters.limit)
                        )}{" "}
                        pages)
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ProductListingPage;
