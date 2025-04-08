import React from "react";
import { ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useCurrentOffers } from "@/hooks/api";
import { Card, CardContent } from "../ui/card";
import ProductCard from "../ProductCard";

const ProductSection = () => {
  const { data: currentOffers, isLoading } = useCurrentOffers();
  const products = currentOffers?.data.products;

  return (
    <section className="py-10">
      <div className="container max-w-[1920px] mx-auto px-5 md:px-20">
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

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full "
        >
          <CarouselContent>

            {
              products?.length > 0 && products !== null ? (
                products?.map((product, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                    <div className="p-1">
                      <Card className="border-transparent">
                        <CardContent className="flex aspect-square items-center justify-center p-0 ">
                      <ProductCard key={index} {...product} />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem> 
            ))
            ) : (
              <div className="flex items-center justify-center   w-full">
                <p className="text-gray-600"> Current offers not available</p>
              </div>
            )
            }
          </CarouselContent>
          <CarouselPrevious className="bg-primary p-10 text-xl hover:border-2 hover:border-primary hover:bg-primary -left-24" />
          <CarouselNext className="bg-primary p-10 text-xl hover:border-2 hover:border-primary hover:bg-primary -right-24" />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductSection;