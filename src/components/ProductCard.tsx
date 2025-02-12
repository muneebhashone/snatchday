"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  image: StaticImageData;
  title: string;
  price: string;
  rating: number;
  isNew?: boolean;
  isSale?: boolean;
}

const ProductCard = ({
  image,
  title,
  price,
  rating,
  isNew,
  isSale,
}: ProductCardProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const urlTitle = encodeURIComponent(
      title.toLowerCase().replace(/\s+/g, "-")
    );
    router.push(`/product-listing/${urlTitle}`);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 hover:border-primary p-6 relative group hover:shadow-lg transition-all duration-300">
      {/* VAT Badge */}
      <div className="absolute right-0 top-0 bg-gray-100 rounded rounded-tr-3xl px-3 py-1">
        <p className="text-sm text-gray-500">19%</p>
        <p className="text-sm text-gray-500">VAT</p>
      </div>

      {/* Product Image */}
      <div className="mb-6 pt-4">
        <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className="w-full h-[200px] object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        {/* Title */}
        <div className="flex justify-between items-start gap-10">
          <p className="text-xl text-foreground font-light line-clamp-2">
            {title}
          </p>
          <button className="rounded-full bg-[#F5F5F5] p-4 hover:bg-gray-100 transition-colors">
            <Heart className="w-6 h-6 text-gray-400 hover:text-orange-500" />
          </button>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex text-orange-400 text-2xl">
              {"★".repeat(rating)}
              {"☆".repeat(5 - rating)}
            </div>
            <span className="text-sm text-gray-500">({rating})</span>
          </div>
          <span className="text-2xl font-semibold">{price}€</span>
        </div>

        {/* Add to Cart Button */}
        <div className="pt-2 flex justify-between items-center">
          <button
            onClick={handleClick}
            className="gradient-primary text-white text-sm py-1 px-7 rounded-full hover:opacity-90 transition-opacity"
          >
            Add To Cart
          </button>

          {/* Sale Badge */}
          {isSale && (
            <div>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                SALE
              </span>
            </div>
          )}

          {/* New Badge */}
          {isNew && (
            <div>
              <span className="bg-[#8D4CC4] text-white px-3 py-1 rounded-full text-sm">
                NEW
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
