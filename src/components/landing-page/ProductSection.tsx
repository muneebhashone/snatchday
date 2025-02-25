import React from "react";
import ProductCard from "../ProductCard";
import laptop from "@/app/images/laptop.png";
import { ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import MonthlyTournament from "./MonthlyTournament";

const ProductSection = () => {
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
  ];

  return (
    <section className="py-10">
      <div className="container max-w-[1920px] mx-auto px-5 md:px-20">
        <Carousel opts={{ loop: true, align:"start" }}>
          <CarouselContent>
            <CarouselItem>
              {/* Section Header */}
              <div className="flex justify-between gap-2 items-center mb-12 mt-10">
                <h3 className="text-2xl md:text-[48px] font-extrabold flex items-center gap-3">
                  Current{" "}
                  <span className="bg-primary text-white px-2 md:px-4 py-1 md:py-3 rounded-lg">
                    Offers
                  </span>
                </h3>

                <button className="text-gray-600 hover:text-primary font-medium flex items-center gap-2">
                  <span>View All</span>
                  <span className="text-primary">
                    {" "}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </span>
                </button>
              </div>
              {/* Products Grid */}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product, index) => (
                  <ProductCard key={index} {...product} />
                ))}
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="pt-20">
                <MonthlyTournament />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="hover:bg-primary hover:text-white p-2 rounded-full w-10 h-10" />
          <CarouselNext className="hover:bg-primary hover:text-white p-2 rounded-full w-10 h-10" />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductSection;
