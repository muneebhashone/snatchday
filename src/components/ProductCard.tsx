import React from "react";
import Image, { StaticImageData } from "next/image";
import { Heart } from "lucide-react";

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
  return (
    <div className="bg-white rounded-3xl border border-gray-200 hover:border-primary p-6 relative group hover:shadow-lg transition-all duration-300">
      {/* VAT Badge */}
      <div className="absolute right-6 top-6 bg-gray-100 rounded-full px-3 py-1">
        <span className="text-sm text-gray-500">19% VAT</span>
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
        <h3 className="text-lg font-medium text-gray-800 line-clamp-2">
          {title}
        </h3>
        <button className="rounded-full p-2 hover:bg-gray-100 transition-colors">
            <Heart className="w-6 h-6 text-gray-400 hover:text-orange-500" />
          </button>
        </div>

        {/* Rating */}
        

        {/* Price and Wishlist */}
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="flex text-orange-400">
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
          </div>
          <span className="text-sm text-gray-500">({rating})</span>
        </div>
          <span className="text-2xl font-semibold">{price}€</span>
         
        </div>

        {/* Add to Cart Button */}

        <div className="pt-2 flex justify-between items-center">
          <button className="bg-gradient-to-r from-orange-400 to-purple-500 text-white py-3 px-8 rounded-full font-medium hover:opacity-90 transition-opacity">
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
