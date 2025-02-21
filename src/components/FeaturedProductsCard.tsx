import React from "react";
import Image from "next/image";

import { StaticImageData } from "next/image";
interface FeaturedProductCardProps {
  title: string;
  price: string;
  oldPrice: string;
  rating: number;
  reviews: number;
  image: StaticImageData;
  isSale?: boolean;
  isNew?: boolean;
  discount: string;
}

const FeaturedProductsCard = ({
  title,
  price,
  oldPrice,
  rating,
  reviews,
  image,
  isSale,
  isNew,
  discount,
}: FeaturedProductCardProps) => {
  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl p-4 border border-gray-200 hover:border-primary relative group hover:shadow-lg transition-all duration-300 w-[337px] h-[439px]">
      {/* VAT Badge */}
      <div className="absolute right-0 top-0 bg-gray-100 rounded-tr-2xl px-2 py-1">
        <p className="text-xs text-gray-500">19%</p>
        <p className="text-xs text-gray-500">VAT</p>
      </div>

      {/* Product Image */}
      <div className="mb-5 mt-7 pt-2">
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className="w-full h-[140px] object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-1 md:space-y-2">
        {/* Title */}
        <p className="text-card-foreground text-md md:text-[20px]">{title}</p>

        {/* Rating */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex text-primary items-center gap-1 text-[22px]">
            {"★".repeat(rating)}{" "}
            <span className="text-sm text-gray-500">({reviews})</span>{" "}
          </div>
          {/* <span className="text-xs text-gray-500">({reviews})</span> */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-lg lg:text-[21px] font-bold">
                €{price}{" "}
                <span className=" text-gray-400 line-through font-normal">€{oldPrice}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Price */}

        {/* Save Amount */}
      </div>
      <div className="flex justify-between items-center border-t border-gray-200 pt-5 ">
        {discount && (
          <div className="text-green-900">Save - <span className="text-foreground">{discount}</span></div>
        )}
        {/* Badges */}
        <div className="">
          {isSale && (
            <span className="bg-orange-500 text-white text-[13px] font-medium px-4 py-[2px] rounded-full">
              SALE
            </span>
          )}
          {isNew && (
            <span className="bg-purple-600 text-white text-[13px] font-medium px-4 py-[2px] rounded-full">
              NEW
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductsCard;
