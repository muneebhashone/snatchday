"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Heart,
  MinusCircle,
  MinusSquare,
  PlusCircle,
  PlusSquare,
  Clock,
  Loader,
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
import {
  useAddToCart,
  useGetCart,
  useUpdateCart,
  useAddToWishList,
  useGetWishList,
} from "@/hooks/api";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { QueryClient } from "@tanstack/react-query";
import { useUserContext } from "@/context/userContext";
import { formatCurrency } from "@/lib/utils";

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
  calculatedPrice,
  ratings,
  stock,
  description,
}: Product) => {
  const { data: addToCartData, refetch } = useGetCart();
  const { mutate: addToCart, isPending: isAddToCartPending } = useAddToCart();
  const { mutateAsync: updateCart } = useUpdateCart();
  const { refetch: refetchWishlist } = useGetWishList();
  const { mutate: addToWishList } = useAddToWishList();
  const queryClient = new QueryClient();
  const { user } = useUserContext();
  const { data: wishlist } = useGetWishList();
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  // const discount = discounts?.find(
  //   (item) => item.customerGroup === user?.user?.group || "BASIC"
  // )?.price;

  let discount = 0;

  if (discounts?.length) {
    const userGroup = user && user?.user?.group ? user?.user?.group : "BASIC";
    const discount1 = discounts.find((d) => d.customerGroup === userGroup);
    if (discount1) {
      const now = new Date();
      if (
        (!discount1?.away || new Date(discount1?.away) <= now) &&
        (!discount1?.until || new Date(discount1?.until) >= now)
      ) {
        discount = discount1.price;
      }
    }
  }

  const isWishListed = (productId: string) => {
    return wishlist?.data?.products?.some((item) => item._id === productId);
  };

  const handleWishList = (id: string) => {
    addToWishList(id, {
      onSuccess: () => {
        toast.success(
          isWishListed(id)
            ? "Product removed from wishlist"
            : "Product added to wishlist"
        );
        refetchWishlist();
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "Failed to add to wishlist"
        );
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
        toast.error(error?.response?.data?.message || "Failed to add to cart");
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
          toast.error(
            error?.response?.data?.message || "Failed to update cart"
          );
          // console.error(error);
        },
      }
    );
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const calculateTimeRemaining = () => {
      if (discounts?.length) {
        const userGroup =
          user && user?.user?.group ? user?.user?.group : "BASIC";
        const discount1 = discounts.find((d) => d.customerGroup === userGroup);
        if (discount1?.until) {
          const now = new Date();
          const endTime = new Date(discount1.until);
          const timeDiff = endTime.getTime() - now.getTime();

          if (timeDiff > 0) {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
              (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
          } else {
            setTimeRemaining("");
          }
        }
      }
    };

    if (discounts?.length) {
      calculateTimeRemaining();
      interval = setInterval(calculateTimeRemaining, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [discounts, user]);
  return (
    <div className="flex flex-col lg:flex-row bg-black text-white gap-5 md:gap-10 items-center lg:gap-40 xl:px-20 2xl:px-40 border-b-2 lg:border-b-0 border-b-[#b27315] pb-4 lg:pb-0">
      <div className="flex flex-col">
        {/* Product image with border */}
        <div className="border-4 md:border-2 border-[#b27315] p-3 md:p-1 w-max md:w-[340px] h-max md:h-[340px] flex items-center justify-center bg-white mb-4 ">
          <div className="relative w-[200px] sm:w-[300px] lg:w-[400px] h-[200px] sm:h-[300px] lg:h-[400px]">
            {images?.length > 0 && (
              <Link href={`/product-listing/${_id}`}>
                <Image
                  src={images[0]}
                  alt={name}
                  fill
                  className="object-contain"
                />
              </Link>
            )}
          </div>
        </div>

        {/* Offer text and timer */}
        <div className="text-center">
          <p className="uppercase text-xs tracking-wider mb-2 font-bold">
            ANGEBOT GÜLTIG NOCH
          </p>

          {/* Timer */}
          {timeRemaining.split(" ").map((unit, index) => {
            const value = unit.slice(0, -1);
            const label = unit.slice(-1);
            return (
              <div className="border-2 border-[#9d6c2c] rounded p-1 inline-block">
                <div className="flex">
                  <div className="bg-gradient-to-b from-[#9d6c2c] to-[#edcb6b]/80 p-1 lg:p-2 w-10 lg:w-16 text-center">
                    <div className="sm:text-lg lg:text-xl sm:font-bold">{value}</div>
                    <div className="text-xs">{label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product details */}
      <div className="flex-1 text-center lg:text-start md:ml-8 mt-4 md:mt-0 h-full flex flex-col justify-between lg:items-start items-center py-0 md:py-4">
        {/* Product title */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold lg:mb-2 text-white line-clamp-2">
          {name}
        </h2>

        {/* Product subtitle */}
        <p className="text-xs sm:text-sm text-gray-400 mb-2 lg:mb-4 line-clamp-2">{description}</p>

        {/* Items left */}
        <div className="flex items-center mb-1 lg:mb-4">
          <p className="text-xs w-max  sm:text-sm text-[#f2a10b]">Bestl dich, es sind nur noch</p>
          <span className="inline-flex items-center justify-center bg-[#f2a10b] text-white rounded-full  mx-1 w-6 h-6 sm:mx-2 text-xs sm:font-bold">
            {stock || "N/A"}
          </span>
          <p className="text-sm text-[#f2a10b] w-max ">Stücke übrig!</p>
        </div>

        {/* Price */}
        <div className="mb-1 lg:mb-4">
          <span className="text-xl sm:text-2xl md:text-4xl font-bold text-primary">
            {formatCurrency(calculatedPrice - discount)}
          </span>
          <span className="text-gray-400 line-through ml-2 text-md sm:text-lg md:text-xl">
            {formatCurrency(calculatedPrice)}
          </span>
        </div>

        {/* Savings */}
        <p className="uppercase font-bold mb-4 sm:text-base text-xs">
          VERPASSE NICHT DIE CHANCE {formatCurrency(discount)} ZU SPAREN!
        </p>

        {/* Add to cart button */}
        <div className="pt-2 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <div>
                    {addToCartData?.data?.cart?.find(
                      (pro) => pro.product._id === _id
                    ) ? (
                      <div className="flex gap-2 border-2 border-white bg-[#fbab11] px-5 py-2 rounded-md font-bold">
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
                    ) : (
                      <button
                        onClick={handleAddToCart}
                        disabled={isAddToCartPending}
                        className="bg-[#fbab11] hover:bg-[#fbab11]/60 text-white font-bold py-3 px-6 w-full md:w-auto uppercase rounded-md"
                      >
                        {isAddToCartPending ? (
                          <Loader className="animate-spin h-6 w-6" />
                        ) : (
                          "IN DEN WARENKORB"
                        )}
                      </button>
                    )}
                  </div>
                </TooltipTrigger>

                <TooltipContent className="bg-gray-700 text-white">
                  <p> Click here add to cart </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

// return (
//   <div className="bg-white rounded-3xl border border-gray-200 hover:border-primary p-6 relative group hover:shadow-lg transition-all duration-300 min-w-full h-[550px] flex flex-col justify-between">
//     {/* VAT Badge */}
//     <div className="absolute right-0 top-0 bg-gray-100 rounded rounded-tr-3xl px-3 py-1">
//       <p className="text-sm text-gray-500">19%</p>
//       <p className="text-sm text-gray-500">VAT</p>
//     </div>

//     {/* Product Image */}
//     <div className="mb-6 pt-4">
//       {images?.length > 0 && (
//         <Link href={`/product-listing/${_id}`}>
//           <Image
//             src={images[0]}
//             alt={name}
//             width={300}
//             height={200}
//             className="w-full h-[200px] object-contain group-hover:scale-105 transition-transform duration-300"
//           />
//         </Link>
//       )}
//     </div>
//     {/* Product Info */}
//     <div className="space-y-4 flex flex-col justify-between h-full">
//       {/* Title */}
//       <div className="flex justify-between items-start gap-10">
//         <p className="text-xl text-card-foreground font-light line-clamp-2 overflow-hidden text-ellipsis">
//           {name}
//         </p>
//         <TooltipProvider>
//           <Tooltip delayDuration={100}>
//             <TooltipTrigger asChild>
//               <button
//                 onClick={() => handleWishList(_id)}
//                 className={`rounded-full ${
//                   isWishListed(_id) ? "bg-[#FF6B3D]" : "bg-[#F5F5F5]"
//                 } p-4 hover:bg-gray-100 transition-colors`}
//               >
//                 {isWishListed(_id) ? (
//                   <Heart className="w-6 h-6 text-white" />
//                 ) : (
//                   <Heart className="w-6 h-6 text-gray-400 hover:text-orange-500" />
//                 )}
//               </button>
//             </TooltipTrigger>
//             <TooltipContent className="bg-gray-700 text-white">
//               {isWishListed(_id) ? (
//                 <p>Remove from wishlist</p>
//               ) : (
//                 <p>Add to wishlist</p>
//               )}
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//       </div>

//       {/* Timer Display */}
//       {timeRemaining && (
//         <div className="flex flex-col gap-1">
//           <div className="flex items-center gap-1.5 text-orange-500">
//             <Clock className="w-4 h-4" />
//             <span className="text-xs font-medium">Flash Deal Ends In:</span>
//           </div>
//           <div className="flex items-center gap-2">
//             {timeRemaining.split(' ').map((unit, index) => {
//               const value = unit.slice(0, -1);
//               const label = unit.slice(-1);
//               return (
//                 <div key={index} className="flex items-center">
//                   <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 backdrop-blur-sm border border-orange-500/20 rounded-lg px-2 py-1">
//                     <span className="text-lg font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
//                       {value.padStart(2, '0')}
//                     </span>
//                     <span className="text-xs ml-1 text-orange-500">{label}</span>
//                   </div>
//                   {index < timeRemaining.split(' ').length - 1 && (
//                     <span className="mx-1 text-orange-500">:</span>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Rating */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-1">
//           <div className="flex text-orange-400 text-2xl">
//             {"★".repeat(Math.round(ratings || 0))}
//             {"☆".repeat(5 - Math.round(ratings || 0))}
//           </div>
//           {/* <span className="text-sm text-gray-500">({rating || 4})</span> */}
//           <span className="text-sm text-gray-500">({ratings || 0})</span>
//         </div>
//         <div className="flex lg:flex-row flex-wrap items-center gap-2 justify-between overflow-hidden w-full ml-5">
//           {discount > 0 ? (
//             <span className="text-2xl  text-gray-400 font-semibold line-through">
//               {formatCurrency(calculatedPrice)}
//             </span>
//           ) : (
//             <span className="text-2xl  text-gray-400 font-semibold line-through"></span>
//           )}
//           <span className="text-2xl font-semibold text-card-foreground">
//             {discount
//               ? formatCurrency(calculatedPrice - discount)
//               : formatCurrency(calculatedPrice)}
//           </span>
//         </div>
//       </div>
//       {/* Add to Cart Button */}
// <div className="pt-2 flex justify-between items-center">
//   <div className="flex gap-4 items-center">
//     <TooltipProvider>
//       <Tooltip delayDuration={100}>
//         <TooltipTrigger asChild>
//           <div>
//             {addToCartData?.data?.cart?.find(
//               (pro) => pro.product._id === _id
//             ) ? (
//               <div className="flex gap-2">
//                 <PlusCircle
//                   className="text-green-800 cursor-pointer"
//                   onClick={() =>
//                     updateQuantity(
//                       _id,
//                       addToCartData?.data?.cart?.find(
//                         (pro) => pro.product._id === _id
//                       ).quantity + 1
//                     )
//                   }
//                 />
//                 {
//                   addToCartData?.data?.cart?.find(
//                     (pro) => pro.product._id === _id
//                   ).quantity
//                 }
//                 <MinusCircle
//                   className="text-red-600 cursor-pointer"
//                   onClick={() =>
//                     updateQuantity(
//                       _id,
//                       addToCartData?.data?.cart?.find(
//                         (pro) => pro.product._id === _id
//                       ).quantity - 1
//                     )
//                   }
//                 />
//               </div>
//             ) : (
//               <button
//                 onClick={handleAddToCart}
//                 disabled={isAddToCartPending}
//                 className="gradient-primary text-white text-sm py-1 px-7 rounded-full hover:opacity-90 transition-opacity"
//               >
//                 {isAddToCartPending ? "adding..." : "Add to Cart"}
//               </button>
//             )}
//           </div>
//         </TooltipTrigger>

//         <TooltipContent className="bg-gray-700 text-white">
//           <p> Click here add to cart </p>
//         </TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   </div>

//         {/* Sale Badge */}
//         {type === "SALE" && (
//           <div>
//             <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm">
//               SALE
//             </span>
//           </div>
//         )}

//         {/* New Badge */}
//         {type === "NEW" && (
//           <div>
//             <span className="bg-[#8D4CC4] text-white px-4 py-1 rounded-full text-sm">
//               NEW
//             </span>
//           </div>
//         )}
//       </div>
//     </div>
//   </div>
// );
