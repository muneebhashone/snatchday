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
            <div className="mb-4">
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
                <h1 className="text-[48px] font-extrabold">Laptops</h1>
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
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ProductListingPage;
