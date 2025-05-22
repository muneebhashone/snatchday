"use client";
import React, { useEffect, useRef, useState } from "react";
import FeaturedProductsCard from "../FeaturedProductsCard";
import Link from "next/link";
import { FeaturedStarIcon } from "../icons/icon";
import { useGetCategories, useGetProducts } from "@/hooks/api";
import { Loader } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("");
  const [categoryId, getCategoryId] = useState(``);
  const [parentCategories, setparentCategories] = useState<Array<any>>([]);
  const { data } = useGetCategories();
  const { data: filterProducts, isLoading } = useGetProducts({
    category: categoryId,
  });
  const [api, setApi] = useState<any>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = data?.data.categories.filter(
      (cat: any) => cat.parentCategory === null
    );
    setparentCategories(filtered);
    // console.log(filtered, "filtered");
    if (filtered?.length) {
      setActiveTab(filtered[0].name);
      getCategoryId(filtered[0]._id);
    }
  }, [data]);

  // Auto-play functionality
  useEffect(() => {
    if (!api) return;

    let autoplayInterval: NodeJS.Timeout;

    const startAutoplay = () => {
      autoplayInterval = setInterval(() => {
        if (api.canScrollNext()) {
          api.scrollNext();
        } else {
          api.scrollTo(0);
        }
      }, 5000);
    };

    const stopAutoplay = () => {
      clearInterval(autoplayInterval);
    };

    startAutoplay();

    // Handle pointer events from the carousel API
    api.on("pointerDown", stopAutoplay);
    api.on("pointerUp", startAutoplay);

    // Get the carousel container element for hover events
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener("mouseenter", stopAutoplay);
      carouselElement.addEventListener("mouseleave", startAutoplay);
    }

    return () => {
      clearInterval(autoplayInterval);
      if (carouselElement) {
        carouselElement.removeEventListener("mouseenter", stopAutoplay);
        carouselElement.removeEventListener("mouseleave", startAutoplay);
      }
    };
  }, [api]);

  const handleCategory = (categoryName: string, categoryId: string) => {
    setActiveTab(categoryName);
    getCategoryId(categoryId);
  };

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white overflow-hidden">
      <div className="container max-w-[1920px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center lg:px-8 justify-between gap-6 mb-8 lg:mb-10">
          <h3 className="text-2xl md:text-3xl lg:text-[48px] font-extrabold flex flex-wrap items-center gap-2">
            <FeaturedStarIcon />
            Featured{" "}
            <span className="bg-primary text-white px-4 py-2 rounded">
              Products
            </span>
          </h3>

          {/* Tabs Section - Scrollable on mobile */}
          <div className="w-full lg:w-auto overflow-x-auto pb-4 lg:pb-0 custom-scroll-for-navitems">
            <div className="flex items-center space-x-10 min-w-max border-b border-gray-200 px-2 md:px-0">
              {parentCategories?.map((tab, index) => {
                // console.log(tab, "check tab");
                return (
                  <>
                    <button
                      key={`${index}`}
                      onClick={() => {
                        handleCategory(tab.name, tab._id);
                      }}
                      className={` py-4 relative text-sm md:text-lg font-normal text-foreground whitespace-nowrap transition-colors
                    ${
                      activeTab === tab.name
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }
                    ${index < 6 ? "block" : "hidden"}
                  `}
                    >
                      {tab.name}
                      {activeTab === tab.name && (
                        <>
                          <div className="w-[6px] h-[6px] bg-primary rounded-full absolute top-6 -translate-y-1/21/2 -translate-y-1/2 -right-2"></div>
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        </>
                      )}
                    </button>
                  </>
                );
              })}
              <Link
                href="/product-listing"
                className=" flex text-sm lg:text-lg text-foreground hover:text-primary font-normal items-center whitespace-nowrap"
              >
                View All
                <svg
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Product Carousel */}
        <div className="px-0 md:px-6 min-w-full ">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader className="animate-spin" size={30} />
            </div>
          ) : !filterProducts?.data.products.length ? (
            <div className="flex items-center justify-center py-10">
              <h1>Products not available</h1>
            </div>
          ) : (
            <div ref={carouselRef} className="min-w-full ">
              <Carousel
                opts={{
                  align: "center",
                  loop: true,
                  skipSnaps: false,
                  slidesToScroll: 1,
                }}
                setApi={setApi}
                className="mx-auto relative "
              >
                <CarouselContent className="w-full mx-auto">
                  {filterProducts?.data.products.map((product, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-1/1 sm:basis-1/2 md:basis-1/3 xl:basis-1/4 2xl:basis-1/5 flex items-center gap-4 justify-center pl-0 mx-auto"
                    >
                      <div className="p-2">
                        <FeaturedProductsCard key={index} {...product} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex w-14 lg:w-20 h-14 lg:h-20 bg-primary text-white hover:bg-primary left-2 md:-left-8 border border-primary" />
                <CarouselNext className="hidden sm:flex w-14 lg:w-20 h-14 lg:h-20 bg-primary text-white hover:bg-primary right-2 md:-right-8 border border-primary" />
              </Carousel>
            </div>
          )}
        </div>

        {/* Mobile View All Link */}
        <div className="flex justify-center mt-8">
          <Link
            href={`/product-listing?category=${categoryId}`}
            className="text-[#FF6B3D] font-medium flex items-center"
          >
            View All Products
            <svg
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
