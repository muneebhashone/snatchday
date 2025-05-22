"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useUserContext } from "@/context/userContext";

interface FeaturedProductCardProps {
  _id?: string;
  title?: string;
  name?: string;
  price?: string;
  oldPrice?: string;
  rating?: number;
  reviews?: number;
  image?: StaticImageData;
  images?: string[];
  isSale?: boolean;
  isNew?: boolean;
  discounts?: [{ price: string }];
  discount?: string;
  description?: string;
  type?: string;
}

const FeaturedProductsCard = ({
  _id,
  title,
  name,
  discounts,
  price,
  rating,
  images,
  image,
  type,
  description,
  isNew,
  discount,
}: FeaturedProductCardProps) => {
  const { user } = useUserContext();
  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl p-4 border border-gray-200 hover:border-primary relative group hover:shadow-lg transition-all duration-300 w-[260px] md:w-[230px] lg:w-[300px] h-[360px] lg:h-[400px]">
      {/* VAT Badge */}
      <div className="absolute right-0 top-0 bg-gray-100 rounded-tr-2xl px-2 py-1">
        <p className="text-xs text-gray-500">19%</p>
        <p className="text-xs text-gray-500">VAT</p>
      </div>

      {/* Product Image */}
      <div className="mb-5 mt-7 pt-2">
        {images ? (
          <Link href={`/product-listing/${_id}`}>
            <Image
              src={images[0]}
              alt={title}
              width={200}
              height={200}
              className="w-full h-[100px] lg:h-[140px] object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        ) : (
          <Link href={`/product-listing/${_id}`}>
            <Image
              src={image}
              alt={title}
              width={200}
              height={200}
              className="w-full h-[100px] lg:h-[140px] object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-1 md:space-y-2">
        {/* Title */}
        <p className="text-card-foreground text-sm md:text-[20px] w-full truncate">
          {name || ""}
        </p>
        <p className="text-card-foreground text-sm md:text-[14px] w-full truncate">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex text-primary items-center xl:gap-0 text-[15px] lg:text-[22px]">
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={
                  index < rating?.average ? "text-primary" : "text-gray-300"
                }
              >
                {"★"}
              </span>
            ))}
            <span className="text-sm text-gray-500">
              ({rating?.count || 0})
            </span>{" "}
          </div>
          {/* <span className="text-xs text-gray-500">({reviews})</span> */}
          <div className="flex items-center justify-between w-max text-end">
            {discounts?.length && discounts.find((dis)=>dis.customerGroup === user?.user?.group) ? (
              <div className="space-y-1">
                <p className="text-sm lg:text-[18px] xl:text-[21px] font-bold">
                  €{discounts[0].price} 
                  <span className=" text-gray-400 line-through font-normal ml-1">
                    €{price}
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-sm lg:text-[18px] 2xl:text-[21px] font-bold">
                €{price}{" "}
              </p>
            )}
          </div>
        </div>

        {/* Price */}

        {/* Save Amount */}
      </div>
      <div className="flex justify-between items-center border-t border-gray-200 pt-5 ">
        {discounts && (
          <div className="text-green-900">
            Save -{" "}
            <span className="text-foreground">{discounts[0]?.price}</span>
          </div>
        )}
        {/* Badges */}
        <div className="">
          {type === "SALE" && (
            <span className="bg-orange-500 text-white text-[13px] font-medium px-4 py-[2px] rounded-full">
              SALE
            </span>
          )}
          {type === "NEW" && (
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
