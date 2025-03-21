"use client";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ClientLayout from "@/components/landing-page/ClientLayout";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { GitCompareArrowsIcon, HomeIcon, Loader, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCompareProducts, useGetCompareProducts } from "@/hooks/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";

const comparisonAttributes = [
  { key: "name", label: "Product Name" },
  { key: "article", label: "Article number" },
  { key: "barcodeEAN", label: "barcodeEAN" },
  { key: "discounts", label: "Discount" },
  { key: "company", label: "Manufacturer" },
  { key: "description", label: "Description" },
  { key: "metaDescription", label: "Meta Description" },
  { key: "price", label: "Price" },
  { key: "metaKeywords", label: "Product features" },
  { key: "colors", label: "Colors" },
  { key: "type", label: "Type" },
  { key: "metaTitle", label: "Meta Title" },
  { key: "stock", label: "Stock" },
];

const ComparisonPage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useGetCompareProducts();
  const compareProducts = data?.data?.products;

  const [isRemove, setIsRemove] = useState("");
  const { mutate: removeProduct } = useCompareProducts();
  const handleRemoveFromComparison = (productId: string) => {
    setIsRemove(productId);
    removeProduct(productId, {
      onSuccess: () => {
        toast.success("Product has been removed");
        queryClient.invalidateQueries({ queryKey: ["compareProducts"] });
        setIsRemove("");
      },
      onError: (error) => {
        toast.error("Failed to remove product");
        console.error(error);
        setIsRemove("");
      },
    });
    // console.log(`Removing product ${productId} from comparison`);
  };

  const pathName = usePathname();
  const path1 = pathName.split("/");
  const path = path1[1].split("-");
  // console.log(path, "path");
  return (
    <ClientLayout>
      <main className="container mx-auto mt-40 mb-52 p-4">
        <Breadcrumb className="mb-5 flex items-center justify-center">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <HomeIcon size={20} className="text-primary font-bold" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground text-[17px]">
                {path[0] + " " + path[1]}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center justify-center w-full gap-2 mb-8">
          <h1 className="text-primary font-extrabold text-4xl text-center ">
            Compare Products
          </h1>
          <GitCompareArrowsIcon className="text-primary" size={30} />
        </div>
        <div className="mb-10 flex items-center justify-end">
          <Link
            className="border border-primary hover:bg-white hover:text-primary rounded-lg px-4 py-2 bg-primary text-white"
            href="/product-listing"
          >
            Add Another Product
          </Link>
        </div>
        <>
          {isLoading ? (
            <div className="w-full flex items-center justify-center">
              <Loader className="animate-spin" size={30} />
            </div>
          ) : isError ? (
            <div>{`Error: ${error}`}</div>
          ) : compareProducts.length < 1 ? (
            <div className="w-full text-center text-xl text-red-500 font-bold italic">
              *Products are not selected to compare*
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="">
                <TableBody className="border-primary rounded-l-xl">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[200px] bg-primary text-white text-center border-t border-t-primary text-md font-semibold">
                      Products
                    </TableHead>
                    {compareProducts &&
                      compareProducts?.map((product) => (
                        <TableCell
                          key={product.id}
                          className="text-center w-[200px] border-r border-t border-primary"
                        >
                          <div className="w-24 h-24 mx-auto flex items-center justify-center">
                            <Image
                              src={product.images[0]}
                              alt={`Product ${product.id}`}
                              width={96}
                              height={96}
                              className="object-contain"
                            />
                          </div>
                        </TableCell>
                      ))}
                  </TableRow>

                  {comparisonAttributes.map((attr) => (
                    <TableRow key={attr.key} className="hover:bg-[#f1c8a6b0]">
                      <TableHead className="bg-primary text-white whitespace-normal w-1/6 text-center text-md font-semibold">
                        {attr.label}
                      </TableHead>
                      {compareProducts &&
                        compareProducts?.map((product, index) => (
                          <TableCell
                            className="text-center border-y border-primary border-r"
                            key={`${product.id}-${attr.key}`}
                          >
                            {attr.key === "colors" ? (
                              Array.isArray(product[attr.key]) ? (
                                product[attr.key].join(", ")
                              ) : (
                                String(product[attr.key])
                              )
                            ) : attr.key === "discounts" ? (
                              <div>{`${product[attr.key][0]?.price}`}</div>
                            ) : (
                              String(product[attr.key] || "-")
                            )}
                          </TableCell>
                        ))}
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableHead className="bg-primary text-white text-center text-md font-semibold">
                      Actions
                    </TableHead>
                    {compareProducts &&
                      compareProducts.map((product) => (
                        <TableCell
                          className="border border-primary"
                          key={`${product._id}-actions`}
                        >
                          <div className="flex flex-col items-center justify-center">
                            <Button
                              className="mb-2 w-max px-10 bg-primary hover:bg-[#f0a365b0]"
                              onClick={() => handleAddToCart(product._id)}
                            >
                              Add to Cart
                            </Button>
                            <Button
                              variant="outline"
                              className="w-max px-12 border-primary text-primary hover:bg-[#f0a365b0] hover:text-primary"
                              onClick={() =>
                                handleRemoveFromComparison(product._id)
                              }
                            >
                              {isRemove !== product._id ? (
                                "Remove"
                              ) : (
                                <Loader className="animate-spin" size={20} />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </>
      </main>
    </ClientLayout>
  );
};

export default ComparisonPage;

const handleAddToCart = (productId: number) => {
  console.log(`Adding product ${productId} to cart`);
};
