"use client";
import React, { useState } from "react";
import FeaturedProductsCard from "../FeaturedProductsCard";
import Link from "next/link";
import graphiccard from "@/app/images/graphiccard.png";
import { StaticImageData } from "next/image";
import f1 from "@/app/images/featured1.png";
import f3 from "@/app/images/featured3.png";
import f5 from "@/app/images/featured5.png";
import f6 from "@/app/images/featured6.png";
import { FeaturedStarIcon } from "../icons/icon";

interface Product {
  title: string;
  price: string;
  oldPrice: string;
  rating: number;
  reviews: number;
  image: StaticImageData;
  isSale: boolean;
  isNew?: boolean;
  discount: string;
  category: string;
}

interface ProductCategories {
  all: Product[];
  audio: Product[];
  computer: Product[];
  displays: Product[];
  elektro: Product[];
}

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "Alle" },
    { id: "audio", label: "Audio, Video & Hifi" },
    { id: "computer", label: "Computer & Hardware" },
    { id: "displays", label: "Displays & Projektoren" },
    { id: "elektro", label: "Elektro & Installation" },
  ];

  const allProducts: ProductCategories = {
    all: [
      {
        title: "SanDisk Extreme - Flash-Speicherkarte (microSDXC)",
        price: "31,40",
        oldPrice: "31,40",
        rating: 5,
        reviews: 5,
        image: f3,
        isSale: true,
        discount: "€99",
        category: "computer",
      },
      {
        title: "Razer Blade 14 - AMD Ryzen 9 6900HX / 3.3 GHz - Win 11",
        price: "2.644",
        oldPrice: "2.694",
        rating: 5,
        reviews: 5,
        image: f1,
        isSale: false,
        isNew: true,
        discount: "€99",
        category: "computer",
      },
      {
        title: "Canon CLI-551 C/M/Y/BK Multipack - 4er-Pack - Schwarz",
        price: "52,44",
        oldPrice: "64,44",
        rating: 5,
        reviews: 5,
        image: f5,
        isSale: true,
        discount: "€99",
        category: "elektro",
      },
      {
        title: "Canon CLI-551 C/M/Y/BK Multipack - 4er-Pack - Schwarz",
        price: "52,44",
        oldPrice: "64,44",
        rating: 5,
        reviews: 5,
        image: f6,
        isSale: true,
        discount: "€99",
        category: "elektro",
      },
      {
        title: "Canon CLI-551 C/M/Y/BK Multipack - 4er-Pack - Schwarz",
        price: "52,44",
        oldPrice: "64,44",
        rating: 5,
        reviews: 5,
        image: f3,
        isSale: true,
        discount: "€99",
        category: "elektro",
      },
    ],
    audio: [
      {
        title: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
        price: "299,99",
        oldPrice: "349,99",
        rating: 5,
        reviews: 5,
        image: f6,
        isSale: true,
        discount: "€50",
        category: "audio",
      },
      {
        title: "Galaxy S22 Ultra",
        price: "52,44",
        oldPrice: "64,44",
        rating: 5,
        reviews: 5,
        image: f5,
        isSale: true,
        discount: "€99",
        category: "audio",
      },
    ],
    computer: [
      {
        title: "14 - AMD Ryzen 9 3 GHz - Win 11",
        price: "2.644",
        oldPrice: "2.694",
        rating: 5,
        reviews: 5,
        image: graphiccard,
        isSale: true,
        isNew: false,
        discount: "€99",
        category: "computer",
      },
      {
        title: "ZOTAC GAMING GeForce RTX 3050 AMP - Grafikkarten",
        price: "319,80",
        oldPrice: "334,80",
        rating: 5,
        reviews: 5,
        image: graphiccard,
        isSale: false,
        isNew: true,
        discount: "€99",
        category: "computer",
      },
    ],
    displays: [
      {
        title: "LG 27GP850-B 27 Inch Gaming Monitor",
        price: "449,99",
        oldPrice: "499,99",
        rating: 5,
        reviews: 5,
        image: graphiccard,
        isSale: true,
        discount: "€50",
        category: "displays",
      },
    ],
    elektro: [
      {
        title: "Canon CLI-551 C/M/Y/BK Multipack - 4er-Pack - Schwarz",
        price: "52,44",
        oldPrice: "64,44",
        rating: 5,
        reviews: 5,
        image: graphiccard,
        isSale: true,
        discount: "€99",
        category: "elektro",
      },
    ],
  };

  const displayProducts =
    allProducts[activeTab as keyof ProductCategories] || allProducts.all;

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white">
      <div className="container max-w-[1920px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center lg:px-8 justify-between gap-6 mb-8 lg:mb-10">
          <h3 className="text-2xl md:text-3xl lg:text-[48px] font-extrabold flex flex-wrap items-center gap-2">
            <FeaturedStarIcon/>
            Featured{" "}
            <span className="bg-primary text-white px-4 py-2 rounded">
              Products
            </span>
          </h3>

          {/* Tabs Section - Scrollable on mobile */}
          <div className="w-full lg:w-auto overflow-x-auto pb-4 lg:pb-0">
            <div className="flex items-center space-x-10 min-w-max border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 relative text-sm md:text-lg font-normal text-foreground whitespace-nowrap transition-colors
                    ${
                      activeTab === tab.id
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }
                  `}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <>
                      <div className="w-[6px] h-[6px] bg-primary rounded-full absolute top-6 -translate-y-1/21/2 -translate-y-1/2 -right-2"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                    </>
                  )}
                </button>
              ))}
              <Link
                href="/product-listing"
                className="hidden lg:flex lg:text-lg text-foreground hover:text-primary font-normal items-center whitespace-nowrap"
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

        {/* Product Grid */}
        <div className="px-0 md:px-6">
          {/* <div className="overflow-x-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-5 gap-8"> */}
          <div className="max-w-[1920px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-5 gap-8">
            {displayProducts.map((product, index) => (
              <FeaturedProductsCard key={index} {...product} />
            ))}
          </div>
        </div>

        {/* Mobile View All Link */}
        <div className="flex lg:hidden justify-center mt-8">
          <Link
            href="/all-products"
            className="text-[#FF6B3D] font-medium flex items-center"
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
    </section>
  );
};

export default FeaturedProducts;
