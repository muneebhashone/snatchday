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
      <div className="container mx-auto max-w-[1920px] my-40 px-20">
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-lg col-span-1 border border-gray-200">
               <ProductCategoryFilter />
            </div>
            <div className="col-span-4">
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
