"use client";
import Login from "@/components/auth/Login";
import ClientLayout from "@/components/landing-page/ClientLayout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useUserContext } from "@/context/userContext";
import {
  useAddToCart,
  useAddToWishList,
  useGetCart,
  useUpdateCart,
  useGetWishList,
} from "@/hooks/api";
import { QueryClient } from "@tanstack/react-query";
import {
  Heart,
  Home,
  LucideHeartCrack,
  MinusCircle,
  PlusCircle,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const Page = () => {
  const { data: addToCartData, refetch: cartRefetch } = useGetCart();
  const { mutateAsync: updateCart } = useUpdateCart();
  const { data: wishlist, refetch } = useGetWishList();
  const { mutate: addToWishList } = useAddToWishList();
  const { mutate: addToCart, isPending: isAddToCartPending } = useAddToCart();
  const { user } = useUserContext();
  const { setCartCount } = useCart();
  const queryClient = new QueryClient();
  const handleWishList = (id: string) => {
    addToWishList(id, {
      onSuccess: (res) => {
        console.log(res.data.message);
        toast.success(
          `${
            res.data.message ? res.data.message : " product added to wishlist"
          }`
        );
        refetch();
      },
      onError: (error) => {
        toast.error("Failed to add to wishlist");
        console.error(error);
      },
    });
  };
  const wishlistData = wishlist?.data.products;
  console.log(wishlistData,"wishlistData");

  const handleAddToCart = (_id) => {
    addToCart(_id as string, {
      onSuccess: () => {
        toast.success("product added to cart");
        setCartCount((prevCount) => prevCount + 1);
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
          cartRefetch();
        },
        onError: (error) => {
          toast.error("Failed to remove from cart");
          console.error(error);
        },
      }
    );
  };
  return (
    <ClientLayout>
      <div className="container mx-auto px-4 mt-40 mb-56">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/" className="flex items-center hover:text-[#F47B42]">
            <Home className="h-4 w-4 mr-1" />
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-[#F47B42]">Wishlist</span>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#F47B42] flex items-center">
            <Heart className="mr-2 h-7 w-7 bg-primary text-white fill-white p-[5px] rounded-full" />{" "}
            Wishlist
          </h1>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr] bg-[#F47B42] text-white font-medium">
            <div className="p-4">Product</div>
            <div className="p-4">Details</div>
            <div className="p-4 hidden md:block">Price</div>
            <div className="p-4 hidden md:block">Actions</div>
          </div>
          {wishlistData?.length > 0 ? (
            wishlistData.map((whishlistItem, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr] items-center"
              >
                <div className="p-4 flex justify-center">
                  <Image
                    src={whishlistItem.images[0]}
                    alt={whishlistItem.name}
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-1">
                    {whishlistItem.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {whishlistItem.article}
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-gray-100 px-2 py-1 rounded">NEW</span>
                  </div>
                </div>
                <div className="p-4 text-center md:text-left">
                  <span className="font-bold text-lg">
                    {whishlistItem.price}€
                  </span>
                </div>
                <div className="p-4 flex flex-col sm:flex-row md:flex-col gap-2 justify-center md:justify-start">
                  <div className="flex gap-4 items-center">
                    <div>
                      {addToCartData?.data?.cart?.find(
                        (pro) => pro.product._id === whishlistItem._id
                      ) ? (
                        <div className="flex gap-2">
                          <PlusCircle
                            className="text-green-800 cursor-pointer"
                            onClick={() =>
                              updateQuantity(
                                whishlistItem._id,
                                addToCartData?.data?.cart?.find(
                                  (pro) => pro.product._id === whishlistItem._id
                                ).quantity + 1
                              )
                            }
                          />
                          {
                            addToCartData?.data?.cart?.find(
                              (pro) => pro.product._id === whishlistItem._id
                            ).quantity
                          }
                          <MinusCircle
                            className="text-red-600 cursor-pointer"
                            onClick={() =>
                              updateQuantity(
                                whishlistItem._id,
                                addToCartData?.data?.cart?.find(
                                  (pro) => pro.product._id === whishlistItem._id
                                ).quantity - 1
                              )
                            }
                          />
                        </div>
                      ) : 
                      <>
                        <button
                          onClick={() => handleAddToCart(whishlistItem._id)}
                          disabled={isAddToCartPending}
                          className="gradient-primary text-white text-sm py-1 px-7 rounded-full hover:opacity-90 transition-opacity"
                        >
                          {isAddToCartPending ? "adding..." : "Add to Cart"}
                        </button>
                         
                        
                        </>
                      }
                    </div>
                  </div>
                  <Button
                    onClick={() => handleWishList(whishlistItem._id as string)}
                    variant="outline"
                    className="border-[#F47B42] text-[#F47B42] hover:bg-[#F47B42] hover:text-white w-max rounded-full h-7 px-6"
                  >
                    <LucideHeartCrack />
                    Remove
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center">
              <p className="text-muted-foreground">No items in wishlist</p>
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default Page;
