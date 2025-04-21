"use client";
import React from "react";
import Image from "next/image";
import {
  Heart,
  MinusCircle,
  MinusSquare,
  PlusCircle,
  PlusSquare,
} from "lucide-react";
import { Product } from "@/types";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import Login from "./auth/Login";
import { useAddToCart, useGetCart, useUpdateCart, useAddToWishList, useGetWishList } from "@/hooks/api";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { QueryClient } from "@tanstack/react-query";
import { useUserContext } from "@/context/userContext";

const roundToTwoDecimals = (value: number): number => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

const ProductCard = ({
  discounts,
  images,
  name,
  price,
  type,
  _id,
}: Product) => {
  const { data: addToCartData, refetch } = useGetCart();
  const { mutate: addToCart, isPending: isAddToCartPending } = useAddToCart();
  const { mutateAsync: updateCart } = useUpdateCart();
  const { refetch: refetchWishlist } = useGetWishList();
  const { mutate: addToWishList } = useAddToWishList();
  const queryClient = new QueryClient();
  const { user } = useUserContext();
  const { data: wishlist } = useGetWishList();



  const isWishListed = (productId: string) => {
    return wishlist?.data?.products?.some((item) => item._id === productId);
  };


  const handleWishList = (id: string) => {
    addToWishList(id, {
      onSuccess: () => {
        toast.success(isWishListed(id) ? "Product removed from wishlist" : "Product added to wishlist");
        refetchWishlist()
      },
      onError: (error) => {
        toast.error(error.response.data.message || "Failed to add to wishlist");
      },
    });
  };

  const prooo = addToCartData?.data?.cart?.filter(
    (pro) => pro.product._id === _id
  );


  const handleAddToCart = () => {
    addToCart(_id as string, {
      onSuccess: () => {
        toast.success("product added to cart");
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        refetch();
      },
      onError: (error) => {
        toast.error(error.response.data.message || "Failed to add to cart");
        console.error(error);
      },
    });
  };
  const updateQuantity = (item, quantity) => {
    updateCart(
      { id: item as string, quantity: quantity },
      {
        onSuccess: () => {
          toast.success("Cart Updated");
          queryClient.invalidateQueries({ queryKey: ["cart"] });
          refetch();
        },
        onError: (error) => {
          toast.error("Failed to remove from cart");
          console.error(error);
        },
      }
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 hover:border-primary p-6 relative group hover:shadow-lg transition-all duration-300 min-w-full h-[450px]">
      {/* VAT Badge */}
      <div className="absolute right-0 top-0 bg-gray-100 rounded rounded-tr-3xl px-3 py-1">
        <p className="text-sm text-gray-500">19%</p>
        <p className="text-sm text-gray-500">VAT</p>
      </div>

      {/* Product Image */}
      <div className="mb-6 pt-4">
        {images?.length > 0 && (
          <Link href={`/product-listing/${_id}`}>
            <Image
              src={images[0]}
              alt={name}
              width={300}
              height={200}
              className="w-full h-[200px] object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        )}
      </div>
      {/* Product Info */}
      <div className="space-y-4">
        {/* Title */}
        <div className="flex justify-between items-start gap-10">
          <p className="text-xl text-card-foreground font-light line-clamp-1 overflow-hidden text-ellipsis">
            {name}
          </p>
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <button onClick={() => handleWishList(_id)} className={`rounded-full ${isWishListed(_id) ? "bg-[#FF6B3D]" : "bg-[#F5F5F5]"} p-4 hover:bg-gray-100 transition-colors`}>
                  {isWishListed(_id) ? (
                    <Heart className="w-6 h-6 text-white" />
                  ) : (
                    <Heart className="w-6 h-6 text-gray-400 hover:text-orange-500" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-700 text-white">
                {isWishListed(_id) ? (
                  <p>Remove from wishlist</p>
                ) : (
                  <p>Add to wishlist</p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex text-orange-400 text-2xl">
              {"★".repeat(3)}
              {"☆".repeat(5 - 3)}
            </div>
            {/* <span className="text-sm text-gray-500">({rating || 4})</span> */}
            <span className="text-sm text-gray-500">({4})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl  text-gray-400 font-semibold line-through">
              {price}€
            </span>
            <span className="text-2xl font-semibold text-card-foreground">
              {discounts?.length > 0
                ? roundToTwoDecimals(price - (price * discounts[0].price) / 100)
                : price}
              €
            </span>
          </div>
        </div>
        {/* Add to Cart Button */}
        <div className="pt-2 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <div>
                    {addToCartData?.data?.cart?.find(
                      (pro) => pro.product._id === _id
                    ) ? (
                      <div className="flex gap-2">
                        <PlusCircle
                          className="text-green-800 cursor-pointer"
                          onClick={() =>
                            updateQuantity(
                              _id,
                              addToCartData?.data?.cart?.find(
                                (pro) => pro.product._id === _id
                              ).quantity + 1
                            )
                          }
                        />
                        {
                          addToCartData?.data?.cart?.find(
                            (pro) => pro.product._id === _id
                          ).quantity
                        }
                        <MinusCircle
                          className="text-red-600 cursor-pointer"
                          onClick={() =>
                            updateQuantity(
                              _id,
                              addToCartData?.data?.cart?.find(
                                (pro) => pro.product._id === _id
                              ).quantity - 1
                            )
                          }
                        />
                      </div>
                    ) :  (
                      <button
                        onClick={handleAddToCart}
                        disabled={isAddToCartPending}
                        className="gradient-primary text-white text-sm py-1 px-7 rounded-full hover:opacity-90 transition-opacity"
                      >
                        {isAddToCartPending ? "adding..." : "Add to Cart"}
                      </button>
                    )}
                  </div>
                </TooltipTrigger>
                
                  <TooltipContent className="bg-gray-700 text-white">
                    <p> Click here  add to cart </p>
                  </TooltipContent>
                
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Sale Badge */}
          {type === "SALE" && (
            <div>
              <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm">
                SALE
              </span>
            </div>
          )}

          {/* New Badge */}
          {type === "NEW" && (
            <div>
              <span className="bg-[#8D4CC4] text-white px-4 py-1 rounded-full text-sm">
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
