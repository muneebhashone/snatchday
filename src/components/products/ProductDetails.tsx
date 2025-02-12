"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import {
  AlertCircleIcon,
  GitCompareIcon,
  Heart,
  MessageCircleQuestionIcon,
  ShoppingCartIcon,
  ThumbsUpIcon,
  TruckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { VatIcon } from "@/components/icons/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


interface ProductDetailsProps {
  title: string;
  images: StaticImageData[];
  price: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  specifications: {
    leftColumn: string[];
    rightColumn: string[];
  };
}

const ProductDetails = ({
  title,
  images,
  price,
  rating,
  reviews,
  isNew = false,
  specifications,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(4);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="container max-w-[1920px] mx-auto px-4 relative">
       
      <div className="bg-white rounded-3xl p-8 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <Image
                src={images[selectedImage]}
                alt="Product"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl border p-2 cursor-pointer transition-all duration-300 ${
                    selectedImage === index
                      ? "border-primary ring-2 ring-primary ring-opacity-50"
                      : "border-gray-200 hover:border-primary"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-4">
            {/* New Badge */}
            <div className="flex items-center justify-between">
              {isNew && (
                <div className="inline-block bg-[#4CAF50] text-white text-xs px-2 py-0.5 rounded-full uppercase">
                  New
                </div>
              )}
              <Button className="p-2 bg-transparent hover:bg-gray-100 rounded-full">
                <Heart className="w-6 h-6 text-gray-400 hover:text-primary" />
              </Button>
            </div>

            {/* Product Title */}
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-4xl font-bold text-foreground">{title}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex text-[#FF6B3D]">{"★".repeat(rating)}</div>
              <span className="text-sm text-gray-500">({reviews})</span>
            </div>

            {/* Price */}
            <div>
              <div>
                <h2 className="text-2xl text-primary font-bold">
                  <span className="text-foreground">{price}</span>€
                </h2>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <VatIcon />{" "}
                  <span className="text-foreground">incl. 19% VAT</span>, plus
                  shipping costs
                </span>
              </div>
            </div>

            {/* Availability */}
            <div>
              <p className="text-sm">
                <span className="text-gray-600">Availability:</span> Order item
              </p>
            </div>

            {/* Quantity Selector */}
            <div>
              <p className="text-sm mb-2">Quantity:</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 h-8 text-center border border-gray-300 rounded"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Discount Points */}
            <div>
              <p className="text-sm mb-3">
                <span className="text-[#3A672B] font-bold">10.00€ </span>
                discount possible{" "}
                <span className="text-[#FF6B3D] cursor-help">?</span>
              </p>
              <span className="text-sm bg-orange-100 text-primary rounded-full px-2 py-2">
                With discount points only:{" "}
                <span className="text-white bg-primary font-medium rounded-full px-2 py-1">
                  238.35€
                </span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <Button className="gradient-primary text-white rounded-full w-64 h-14 hover:opacity-90">
                <ShoppingCartIcon className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button className="w-64 h-14 bg-white text-[#FF6B3D] text-foreground rounded-full border border-gray-200 hover:bg-gray-50">
                <Heart className="w-4 h-4 mr-2" />
                Add to Wishlist
              </Button>
            </div>

            {/* Shipping Method */}
            <div>
              <p className="text-sm inline-flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1">
                <span className="text-gray-600 flex items-center gap-1">
                  <TruckIcon color="#FF6B3D" /> Shipping method:
                </span>{" "}
                <span className="text-foreground">Standard shipping</span>
              </p>
            </div>

            {/* Additional Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button className="text-gray-600 hover:text-[#FF6B3D] text-sm flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                <GitCompareIcon color="#FF6B3D" /> Compare
              </button>
              <button className="text-gray-600 hover:text-[#FF6B3D] text-sm flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                <ThumbsUpIcon color="#FF6B3D" /> Recommend Product
              </button>
              <button className="text-gray-600 hover:text-[#FF6B3D] text-sm flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                <AlertCircleIcon color="#FF6B3D" /> Report a bug
              </button>
              <button className="text-gray-600 hover:text-[#FF6B3D] text-sm flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                <MessageCircleQuestionIcon color="#FF6B3D" /> Ask a Product
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description Tabs Section */}
      <div className="bg-white rounded-3xl p-8 mt-8 max-w-[1440px] mx-auto">
        <Tabs defaultValue="description1" className="w-full">
          <TabsList className="border-b border-gray-200 w-full justify-start h-auto p-0 bg-transparent">
            <TabsTrigger
              value="description1"
              className="text-sm font-medium px-6 py-2 rounded-lg data-[state=active]:bg-[#FF6B3D] data-[state=active]:text-white data-[state=active]:shadow-none"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="description2"
              className="text-sm font-medium px-6 py-2 rounded-lg data-[state=active]:bg-[#FF6B3D] data-[state=active]:text-white data-[state=active]:shadow-none"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="description3"
              className="text-sm font-medium px-6 py-2 rounded-lg data-[state=active]:bg-[#FF6B3D] data-[state=active]:text-white data-[state=active]:shadow-none"
            >
              Description
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description1" className="py-8">
            <div className="grid grid-cols-2 gap-x-32">
              <ul className="space-y-4 text-sm">
                {specifications.leftColumn.map((spec, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>

              <ul className="space-y-4 text-sm">
                {specifications.rightColumn.map((spec, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="description2" className="py-8">
            <div className="grid grid-cols-2 gap-x-32">
              <div className="text-sm text-gray-600">
                Second description tab content
              </div>
            </div>
          </TabsContent>

          <TabsContent value="description3" className="py-8">
            <div className="grid grid-cols-2 gap-x-32">
              <div className="text-sm text-gray-600">
                Third description tab content
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetails;
