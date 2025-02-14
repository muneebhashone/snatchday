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

import React from "react";
import { Separator } from "@/components/ui/separator";
import Search from "@/components/Search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid3x3, ListIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import VisitTournament from "@/components/VisitTournament";


const ProductListingPage = () => {
  const products = [
    {
      image: laptop,
      title: "Dicota SmartSkin Laptop Sleeve 14.1 - Notebook-Tasche - 35.8",
      price: "29,32",
      rating: 5,
      isNew: true,
      isSale: false,
    },

    {
      image: laptop,
      title: "HP ENVY Laptop 15-ep1074ng - Intel Core i7 11800H / 2.3 GHz",
      price: "2.152,76",
      rating: 5,
      isSale: true,
      isNew: false,
    },

    {
      image: laptop,
      title: "HP ENVY Laptop 15-ep1077ng - Intel Core i7 11800H / 2.3 GHz",
      price: "2.382,92",
      rating: 5,
      isNew: true,
      isSale: false,
    },

    {
      image: laptop,
      title: "HP Laptop 15-dw3424ng - Intel Pentium Gold 7505 - FreeDOS 3.0",
      price: "468,06",
      rating: 5,
      isNew: true,
      isSale: false,
    },
    {
      image: laptop,
      title: "Dicota SmartSkin Laptop Sleeve 14.1 - Notebook-Tasche - 35.8",
      price: "29,32",
      rating: 5,
      isNew: true,
      isSale: false,
    },

    {
      image: laptop,
      title: "HP ENVY Laptop 15-ep1074ng - Intel Core i7 11800H / 2.3 GHz",
      price: "2.152,76",
      rating: 5,
      isSale: true,
      isNew: false,
    },

    {
      image: laptop,
      title: "HP ENVY Laptop 15-ep1077ng - Intel Core i7 11800H / 2.3 GHz",
      price: "2.382,92",
      rating: 5,
      isNew: true,
      isSale: false,
    },

    {
      image: laptop,
      title: "HP Laptop 15-dw3424ng - Intel Pentium Gold 7505 - FreeDOS 3.0",
      price: "468,06",
      rating: 5,
      isNew: true,
      isSale: false,
    },
    {
      image: laptop,
      title: "Dicota SmartSkin Laptop Sleeve 14.1 - Notebook-Tasche - 35.8",
      price: "29,32",
      rating: 5,
      isNew: true,
      isSale: false,
    },

    {
      image: laptop,
      title: "HP ENVY Laptop 15-ep1074ng - Intel Core i7 11800H / 2.3 GHz",
      price: "2.152,76",
      rating: 5,
      isSale: true,
      isNew: false,
    },

    {
      image: laptop,
      title: "HP ENVY Laptop 15-ep1077ng - Intel Core i7 11800H / 2.3 GHz",
      price: "2.382,92",
      rating: 5,
      isNew: true,
      isSale: false,
    },

    {
      image: laptop,
      title: "HP Laptop 15-dw3424ng - Intel Pentium Gold 7505 - FreeDOS 3.0",
      price: "468,06",
      rating: 5,
      isNew: true,
      isSale: false,
    },
    {
      image: laptop,
      title: "Dicota SmartSkin Laptop Sleeve 14.1 - Notebook-Tasche - 35.8",
      price: "29,32",
      rating: 5,
      isNew: true,
      isSale: false,
    },

    {
      image: laptop,
      title: "HP ENVY Laptop 15-ep1074ng - Intel Core i7 11800H / 2.3 GHz",
      price: "2.152,76",
      rating: 5,
      isSale: true,
      isNew: false,
    },

    {
      image: laptop,
      title: "HP ENVY Laptop 15-ep1077ng - Intel Core i7 11800H / 2.3 GHz",
      price: "2.382,92",
      rating: 5,
      isNew: true,
      isSale: false,
    },

    {
      image: laptop,
      title: "HP Laptop 15-dw3424ng - Intel Pentium Gold 7505 - FreeDOS 3.0",
      price: "468,06",
      rating: 5,
      isNew: true,
      isSale: false,
    },
  ];

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
              <Search />
            </div>
            <ProductCategoryFilter />
            <VisitTournament
              title="January Tournament"
              date="January 30, 2025 at 3:00 p.m."
            />
          </div>
          <div className="col-span-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[48px] font-extrabold mb-4">Laptops</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <p className="text-foreground">Show</p>
                  <Select>
                    <SelectTrigger className="w-[100px] rounded-full">
                      <SelectValue placeholder="5" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">5</SelectItem>
                      <SelectItem value="2">10</SelectItem>
                      <SelectItem value="3">15</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-foreground">Sort by</p>
                  <Select>
                    <SelectTrigger className="w-[100px] rounded-full">
                      <SelectValue placeholder="Newest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Best Selling</SelectItem>
                      <SelectItem value="2">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Button className="rounded-full bg-gray-100 text-gray-700">
                    <ListIcon />
                  </Button>
                  <Button className="rounded-full bg-gray-100 text-gray-700">
                    <Grid3x3 />
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
              <div className="mt-10 col-span-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {[1, 2, 3].map((pageNum) => (
                    <button
                      key={pageNum}
                      className={`w-9 h-9 flex items-center justify-center rounded-sm ${
                        pageNum === 1
                          ? "text-gray-700 font-medium"
                          : "text-gray-400 hover:text-gray-700"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button className="w-20 h-9 flex items-center justify-center rounded-full bg-gray-100">
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
                </div>
                <div className="text-sm text-gray-500 mt-4">
                  Showing 1 to 15 of 97 (7 pages)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ProductListingPage;
