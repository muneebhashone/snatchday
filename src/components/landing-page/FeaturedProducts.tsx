"use client";
import React, { useState } from "react";
import FeaturedProductsCard from "../FeaturedProductsCard";
import { Star } from "lucide-react";
import Link from "next/link";
import graphiccard from "@/app/images/graphiccard.png";
const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("Alle");

  const tabs = [
    { id: "Alle", label: "Alle•" },
    { id: "audio", label: "Audio, Video & Hifi" },
    { id: "computer", label: "Computer & Hardware" },
    { id: "displays", label: "Displays & Projektoren" },
    { id: "elektro", label: "Elektro & Installation" },
  ];

  const products = [
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

    },
    {
      title: "SanDisk Extreme - Flash-Speicherkarte (microSDXC)",
      price: "31,40",
      oldPrice: "31,40",
      rating: 5,
      reviews: 5,
      image: graphiccard,
      isSale: true,
      discount: "€99",

    },
    {
      title: "Razer Blade 14 - AMD Ryzen 9 6900HX / 3.3 GHz - Win 11",
      price: "2.644",
      oldPrice: "2.694",
      rating: 5,
      reviews: 5,
      image: graphiccard,
      isSale: false,
      isNew: true,
      discount: "€99",

    },
    {
      title: "Canon CLI-551 C/M/Y/BK Multipack - 4er-Pack - Schwarz",
      price: "52,44",
      oldPrice: "64,44",
      rating: 5,
      reviews: 5,
      image: graphiccard,
      isSale: true,
      discount: "€99",

    },
    {
      title: "Galaxy S22 Ultra",
      price: "52,44",
      oldPrice: "64,44",
      rating: 5,
      reviews: 5,
      image: graphiccard,
      isSale: true,
      discount: "€99",

    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container max-w-[1920px] mx-auto">
        {/* Navigation */}
        <div className="mb-20">
          <div className="flex items-center justify-between px-6">
            <h3 className="text-4xl font-bold flex items-center gap-2">
              <Star className="text-orange-500 w-6 h-6 fill-orange-500" />

              Featured{" "}
              <span className="bg-primary text-white px-4 py-2 rounded">
                Products
              </span>
            </h3>
            {/* Left side tabs */}
            <div className="flex items-center space-x-8 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 relative text-base font-medium transition-colors
                    ${
                      activeTab === tab.id
                        ? "text-[#FF6B3D]"
                        : "text-gray-600 hover:text-[#FF6B3D]"
                    }
                  `}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B3D]" />
                  )}
                </button>
              ))}
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

            {/* View All link */}
          </div>
        </div>

        {/* Product Grid */}
        <div className="px-6 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {products.map((product, index) => (
              <FeaturedProductsCard key={index} {...product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
