"use client";
import React, { useContext, useState } from "react";
import Image, { StaticImageData } from "next/image";
import {
  Heart,
  ShoppingCartIcon,
  TruckIcon,
  Loader2,
  List,
  Loader,
  PlusCircle,
  MinusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { VatIcon } from "@/components/icons/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  useCompareProducts,
  useGetCart,
  useGetCompareProducts,
  useUpdateCart,
} from "@/hooks/api";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Dialog, DialogTrigger } from "../ui/dialog";
import RecommendProductModal from "../RecommendProductModal";
import { useAddToCart } from "@/hooks/api";
import { useUserContext } from "@/context/userContext";
import { useCart } from "@/context/CartContext";
import Login from "../auth/Login";

// interface ProductDetailsProps {
//   title: string;
//   images: StaticImageData[];
//   price: string;
//   rating: number;
//   reviews: number;
//   isNew?: boolean;
//   specifications: {
//     leftColumn: string[];
//     rightColumn: string[];
//   };
// }

interface ProductDetailsProps {
  _id?: string;
  title: string;
  price: string;
  rating: number;
  isNew?: boolean;
  isSale?: boolean;
  article: string;
  attributes: Record<string, unknown>;
  barcodeEAN: string;
  categoryIds: Array<Record<string, unknown>>;
  colors: string[];
  company: string;
  createdAt: string;
  discounts: Array<Record<string, unknown>>;
  description: string;
  images: Array<string | StaticImageData>;
  isActive: boolean;
  isFeatured: boolean;
  liscenseKey: string;
  metaDescription: string;
  metaKeywords: string;
  metaTitle: string;
  name: string;
  noStockMessage: string;
  relatedProducts: string[];
  requireShipping: boolean;
  sku: string;
  stock: number;
  type: string;
}

const ProductDetails = ({
  article,
  attributes,
  barcodeEAN,
  categoryIds,
  colors,
  company,
  createdAt,
  discounts,
  description,
  images,
  isActive,
  name,
  stock,
  liscenseKey,
  isNew,
  price,
  isLoading,
  noStockMessage,
}: ProductDetailsProps & { isLoading?: boolean }) => {
  const { data: addToCartData, refetch } = useGetCart();
  const { mutateAsync: updateCart } = useUpdateCart();
  const [isOpen, setIsOpen] = useState(false);
  const { setCartCount } = useCart();

  const params = useParams();
  const queryClient = useQueryClient();
  const { data: compareProducts } = useGetCompareProducts();
  const { mutate: productIdForCompare, isPending } = useCompareProducts();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { mutate: addToCart, isPending: isAddToCartPending } = useAddToCart();

  const { user } = useUserContext();
  // const handleIncrement = () => {
  //   setQuantity((prev) => prev + 1);
  // };

  // const handleDecrement = () => {
  //   if (quantity > 1) {
  //     setQuantity((prev) => prev - 1);
  //   }
  // };

  if (isLoading) {
    return (
      <div className="container max-w-[1600px] mx-auto relative z-10 min-h-[500px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }
  const roundToTwoDecimals = (value: number): number => {
    return Math.round(value * 100) / 100;
  };
  const productExist = compareProducts?.data?.products?.some(
    (pro) => pro._id === params.id
  );

  // const handleClick = () => {
  //   productIdForCompare(params.id as string, {
  //     onSuccess: () => {
  //       toast.success("product added for compare");
  //       queryClient.invalidateQueries({ queryKey: ["compareProducts"] });
  //     },
  //     onError: (error) => {
  //       toast.error("Failed to add for compare");
  //       console.error(error);
  //     },
  //   });
  //   console.log(compareProducts.data.products, "compareProducts");
  // };
  const handleClick = () => {
    if (compareProducts.data.products.length > 3) {
      productIdForCompare(compareProducts.data.products[0]._id);
      productIdForCompare(params.id as string, {
        onSuccess: () => {
          toast.success("product added for compare");
          queryClient.invalidateQueries({ queryKey: ["compareProducts"] });
        },
        onError: (error) => {
          toast.error("Failed to add for compare");
          console.error(error);
        },
      });
    } else {
      productIdForCompare(params.id as string, {
        onSuccess: () => {
          toast.success("product added for compare");

          queryClient.invalidateQueries({ queryKey: ["compareProducts"] });
        },
        onError: (error) => {
          toast.error("Failed to add for compare");
          console.error(error);
        },
      });
    }
    console.log(compareProducts.data.products, "compareProducts");
  };

  const handleAddToCart = () => {
    addToCart(params.id as string, {
      onSuccess: () => {
        toast.success("product added to cart");
        setCartCount((prevCount) => prevCount + 1);
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
      onError: (error) => {
        toast.error("Failed to add to cart");
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
    <div className="container max-w-[1600px] mx-auto relative z-10">
      <div className="rounded-3xl p-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Product Images */}
          <div className="space-y-4">
            <div className="p-16">
              <Image
                src={images[selectedImage]}
                alt="Product"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>
            <Separator className="my-5" />
            <div className="grid grid-cols-8 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`rounded border p-2 cursor-pointer transition-all duration-300 ${
                    selectedImage === index
                      ? "border-primary ring-2 ring-primary ring-opacity-50"
                      : "border-gray-200 hover:border-primary"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={92}
                    height={86}
                    className=""
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div>
            {/* New Badge */}
            <div className="flex items-center justify-between">
              {isNew && (
                <p className="inline-block bg-[#3A672B] text-white text-xs px-3 py-1 rounded-full uppercase">
                  New
                </p>
              )}
              <Button className="w-12 h-12 bg-[#F5F5F5] hover:bg-gray-100 rounded-full">
                <Heart className="w-6 h-6 text-[#A5A5A5] " />
              </Button>
            </div>

            {/* Product Title */}

            <h1 className="text-[48px] font-extrabold text-[#1C1B1D] leading-[56px] mt-4">
              {name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex text-primary text-2xl">{"★".repeat(4)}</div>
              <span className="text-sm text-gray-500">({4})</span>
            </div>

            {/* Price */}

            <div className="mt-3">
              {discounts?.length > 0 ? (
                <div className="flex items-center gap-2">
                  <h2 className="text-3xl text-primary font-extrabold text-[#1C1B1D] ">
                    <span className="text-foreground">{price}</span>€
                  </h2>
                  {/* <h2 className="text-3xl text-primary font-extrabold text-[#1C1B1D]">
                    {discounts.map((discount, i) => (
                      <span key={i} className="text-foreground">
                        {Number(price) - Number(discount?.price) > 0 
                          ? (Number(price) - Number(discount?.price)).toFixed() 
                          : "0.00"}
                      </span>
                    ))}€
                  </h2> */}
                </div>
              ) : (
                <h2 className="text-3xl text-primary font-extrabold text-[#1C1B1D]">
                  <span className="text-foreground">{price}</span>€
                </h2>
              )}
              {/* <h2 className="text-3xl text-primary font-extrabold text-[#1C1B1D]">
                <span className="text-foreground">{price}</span>€
              </h2> */}
              <span className="text-sm text-card-foreground flex items-center gap-1">
                <VatIcon /> incl.
                <span className="text-[#444444] font-bold">19% VAT</span>, plus
                shipping costs
              </span>
            </div>

            {/* Availability */}
            <div className="mt-3">
              <p className="">
                <span className="text-[#444444] font-bold">Availability:</span>{" "}
                {stock > 0 ? "In Stock" : noStockMessage || "Out of Stock"}
              </p>
            </div>

            {/* <div className="flex items-center gap-3 mt-4">
              <span className="text-[#444444] font-bold">Quantity:</span>
              <div className="relative flex items-center">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-[70px] h-[40px] pl-4 pr-8 text-base bg-white border border-[#E5E7EB] rounded-full focus:outline-none focus:ring-1 focus:ring-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <div className="absolute right-0 top-0 bottom-0 w-8 flex flex-col border-l border-[#E5E7EB]">
                  <button
                    onClick={handleIncrement}
                    className="flex-1 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 7.5L6 4L9.5 7.5"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div className="w-full h-[1px] bg-[#E5E7EB]"></div>
                  <button
                    onClick={handleDecrement}
                    className="flex-1 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5 4.5L6 8L2.5 4.5"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div> */}

            {/* Discount Points */}
            <div className="mt-3">
              <p className="text-lg mb-3 text-[#444444] font-bold">
                <span className="text-[#3A672B] font-bold">
                  {(discounts?.length > 0 ? discounts[0].price : 0) as number} €{" "}
                </span>
                discount possible{" "}
                <span className="text-primary cursor-help">?</span>
              </p>
              <span className="bg-orange-100 text-primary rounded-full pl-3 pr-1 py-2">
                With discount points only:{" "}
                <span className="text-white bg-primary font-medium rounded-full px-2 py-1">
                  {discounts?.length > 0
                    ? roundToTwoDecimals(
                        Number(price) -
                          (Number(price) * Number(discounts[0].price)) / 100
                      )
                    : price}
                  €
                </span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6 items-center">
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <div>
                      {addToCartData?.data?.cart?.find(
                        (pro) => pro.product._id === params.id
                      ) ? (
                        <div className="flex gap-2 text-xl items-center">
                          <PlusCircle
                            size={35}
                            className="text-green-800 cursor-pointer"
                            onClick={() =>
                              updateQuantity(
                                params.id,
                                addToCartData?.data?.cart?.find(
                                  (pro) => pro.product._id === params.id
                                ).quantity + 1
                              )
                            }
                          />
                          {
                            addToCartData?.data?.cart?.find(
                              (pro) => pro.product._id === params.id
                            ).quantity
                          }
                          <MinusCircle
                            size={35}
                            className="text-red-600 cursor-pointer"
                            onClick={() =>
                              updateQuantity(
                                params.id,
                                addToCartData?.data?.cart?.find(
                                  (pro) => pro.product._id === params.id
                                ).quantity - 1
                              )
                            }
                          />
                        </div>
                      ) : user ? (
                        <button
                          onClick={handleAddToCart}
                          disabled={isAddToCartPending}
                          className={`gradient-primary flex items-center shadow-xl justify-center text-white text-lg rounded-full w-64 h-14 hover:opacity-90`}
                        >
                          <ShoppingCartIcon size={28} className="mr-2" />
                          {isAddToCartPending ? "adding..." : "Add to Cart"}
                        </button>
                      ) : (
                        <Button className="bg-transparent">
                          <Login addToCart={true} />
                        </Button>
                      )}
                    </div>
                  </TooltipTrigger>
                  {!user && (
                    <TooltipContent className="bg-gray-700 text-white">
                      <p>Please login first to add items to cart</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
              <button className="w-64 h-14 bg-white text-card-foreground shadow-xl flex items-center justify-center text-lg rounded-full hover:bg-gray-50">
                {/* <Heart size={28} className="mr-2" /> */}
                Play For It
              </button>
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Button
                      className="bg-primary h-8 w-8 rounded-full text-[24px] text-white flex items-center justify-center"
                      variant="outline"
                    >
                      ?
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-700 text-white text-center">
                    <p className="w-48 h-max text-xs">
                      Play for it here you have the ooportunity to vote for a
                      product for which there is no tournament yet. If several
                      users choose a product, a corresponding tournament will be
                      created.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Shipping Method */}
            <div className="mt-5">
              <p className="inline-flex items-center gap-1">
                <span className="text-card-foreground font-bold flex items-center gap-1">
                  <TruckIcon className="text-primary" /> Shipping method:
                </span>{" "}
                <span className="text-foreground">Standard shipping</span>
              </p>
            </div>

            {/* Additional Actions */}
            <div className="flex items-center justify-between pt-4 ">
              {isPending ? (
                <div className="bg-gray-100 rounded-full px-10 py-2">
                  <Loader size={15} className="animate-spin" />
                </div>
              ) : productExist ? (
                <Link
                  href="/compare-products"
                  className="text-foreground text-sm flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2"
                >
                  <List className="text-[#888888]" />
                  <button>Comparison List</button>
                </Link>
              ) : (
                <button
                  onClick={handleClick}
                  className="text-foreground text-sm flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2"
                >
                  <svg
                    width="24"
                    height="18"
                    viewBox="0 0 24 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.84934 13.2185H0.666676C0.477342 13.2185 0.318676 13.1553 0.190676 13.0289C0.0626757 12.9026 -0.000879693 12.7448 9.19542e-06 12.5557C0.000898084 12.3666 0.0644535 12.2089 0.190676 12.0825C0.316898 11.9561 0.475565 11.8929 0.666676 11.8929H9.84934L6.19601 8.26102C6.07067 8.13731 6.00401 7.9862 5.99601 7.80769C5.98712 7.63096 6.05378 7.46924 6.19601 7.32255C6.34267 7.17675 6.5009 7.10384 6.67067 7.10384C6.84045 7.10384 6.99912 7.17675 7.14667 7.32255L11.656 11.8068C11.7724 11.9217 11.8542 12.0396 11.9013 12.1607C11.9484 12.2818 11.972 12.4134 11.972 12.5557C11.972 12.698 11.9484 12.8296 11.9013 12.9507C11.8542 13.0718 11.7724 13.1897 11.656 13.3046L7.13867 17.7968C7.00889 17.9258 6.85601 17.9934 6.68001 17.9996C6.50312 18.0058 6.34134 17.9356 6.19467 17.7889C6.05245 17.6431 5.98045 17.4866 5.97867 17.3196C5.9769 17.1526 6.0489 16.9966 6.19467 16.8517L9.84934 13.2185ZM14.1507 6.10705L17.804 9.73898C17.9293 9.86269 17.996 10.0134 18.004 10.191C18.012 10.3686 17.9453 10.5308 17.804 10.6774C17.6582 10.8233 17.5 10.8962 17.3293 10.8962C17.1587 10.8962 17.0004 10.8233 16.8547 10.6774L12.344 6.19321C12.2276 6.07833 12.1458 5.96036 12.0987 5.83929C12.0516 5.71823 12.028 5.58656 12.028 5.44429C12.028 5.30202 12.0516 5.17035 12.0987 5.04928C12.1458 4.92822 12.2276 4.80981 12.344 4.69404L16.8613 0.20318C16.9911 0.0741626 17.1444 0.0065612 17.3213 0.000375437C17.4982 -0.00581033 17.6596 0.0644422 17.8053 0.211133C17.9476 0.35694 18.0196 0.51291 18.0213 0.679042C18.024 0.846057 17.952 1.00247 17.8053 1.14828L14.152 4.7802H23.3333C23.5236 4.7802 23.6822 4.84383 23.8093 4.97108C23.9364 5.09833 24 5.25606 24 5.44429C24 5.63251 23.9364 5.79025 23.8093 5.9175C23.6822 6.04475 23.5236 6.10793 23.3333 6.10705H14.1507Z"
                      fill="#888888"
                    />
                  </svg>
                  Compare
                </button>
              )}
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  asChild
                >
                  <button className="text-foreground flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.2905 7.78419L12.7447 7.6934C12.7315 7.77267 12.7358 7.85386 12.7571 7.93132C12.7785 8.00878 12.8164 8.08067 12.8684 8.14198C12.9203 8.2033 12.985 8.25257 13.0579 8.28638C13.1308 8.32018 13.2101 8.33771 13.2905 8.33775V7.78419ZM1.11216 7.78419V7.23063C0.965341 7.23063 0.824541 7.28895 0.720728 7.39276C0.616915 7.49657 0.558594 7.63737 0.558594 7.78419H1.11216ZM3.3264 19.409H15.9033V18.3019H3.3264V19.409ZM17.2319 7.23063H13.2905V8.33775H17.2319V7.23063ZM13.8363 7.87497L14.7287 2.52203L13.637 2.33936L12.7447 7.6934L13.8363 7.87497ZM13.0912 0.587891H12.8554V1.69501H13.0912V0.587891ZM9.63036 2.31389L6.84484 6.49107L7.76596 7.10552L10.5504 2.92724L9.63036 2.31389ZM5.46315 7.23063H1.11216V8.33775H5.46315V7.23063ZM0.558594 7.78419V16.6412H1.66572V7.78419H0.558594ZM18.618 17.1837L19.9465 10.5409L18.8615 10.3239L17.533 16.9667L18.618 17.1837ZM6.84484 6.49107C6.6932 6.71855 6.48775 6.90507 6.24672 7.03408C6.00569 7.16309 5.73653 7.23061 5.46315 7.23063V8.33775C5.91876 8.33776 6.36732 8.22529 6.76904 8.01034C7.17075 7.79538 7.51319 7.48458 7.76596 7.10552L6.84484 6.49107ZM14.7287 2.52203C14.7684 2.28415 14.7558 2.04047 14.6918 1.80794C14.6278 1.57541 14.5139 1.35961 14.3581 1.17554C14.2023 0.991474 14.0082 0.843556 13.7894 0.742072C13.5707 0.640588 13.3324 0.587975 13.0912 0.587891V1.69501C13.1717 1.69489 13.2512 1.7123 13.3242 1.74604C13.3972 1.77977 13.462 1.82902 13.5141 1.89036C13.5662 1.95169 13.6042 2.02363 13.6257 2.10118C13.6471 2.17872 13.6513 2.26 13.6381 2.33936L14.7287 2.52203ZM17.2319 8.33775C17.4776 8.33773 17.7202 8.39224 17.9423 8.49732C18.1644 8.60241 18.3604 8.75547 18.5161 8.94546C18.6719 9.13545 18.7836 9.35764 18.8432 9.59602C18.9027 9.83439 18.9097 10.083 18.8615 10.3239L19.9465 10.5409C20.0268 10.1395 20.0158 9.72534 19.9167 9.32818C19.8176 8.93103 19.6316 8.56081 19.3722 8.24419C19.1127 7.92758 18.7863 7.67244 18.4164 7.49718C18.0465 7.32191 17.6423 7.23087 17.233 7.23063L17.2319 8.33775ZM15.9033 19.409C16.5433 19.4091 17.1636 19.1874 17.6585 18.7817C18.1535 18.376 18.4925 17.8112 18.618 17.1837L17.533 16.9667C17.4577 17.3434 17.2541 17.6823 16.957 17.9258C16.6598 18.1692 16.2875 18.3021 15.9033 18.3019V19.409ZM12.8543 0.587891C12.2162 0.587795 11.5879 0.745294 11.0253 1.0464C10.4627 1.3475 9.98313 1.78289 9.62925 2.31389L10.5504 2.92724C10.8031 2.54818 11.1456 2.23738 11.5473 2.02243C11.949 1.80747 12.3976 1.69501 12.8532 1.69501L12.8543 0.587891ZM3.3264 18.3019C2.88596 18.3019 2.46356 18.1269 2.15212 17.8154C1.84068 17.504 1.66572 17.0816 1.66572 16.6412H0.558594C0.558594 17.0046 0.630185 17.3646 0.76928 17.7004C0.908376 18.0362 1.11225 18.3413 1.36927 18.5983C1.62628 18.8553 1.9314 19.0592 2.26721 19.1983C2.60301 19.3374 2.96293 19.409 3.3264 19.409V18.3019Z"
                        fill="#888888"
                      />
                      <path d="M5.54102 7.78516V18.8564" stroke="#888888" />
                    </svg>
                    Recommend Product
                  </button>
                </DialogTrigger>
                <RecommendProductModal setIsOpen={setIsOpen} />
              </Dialog>
              <button className="text-foreground flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.772 4.61572V3.84819C12.772 2.82759 12.3744 1.84879 11.6668 1.12711C10.9592 0.405434 9.99944 0 8.99871 0C7.99797 0 7.03822 0.405434 6.3306 1.12711C5.62297 1.84879 5.22543 2.82759 5.22543 3.84819V4.61572H4.14828L1.99784 2.41204L1.23103 3.19012L3.31422 5.32523L3.28965 5.38985C2.85353 6.58406 2.63316 7.84897 2.63922 9.12331C2.63922 9.38267 2.64785 9.63763 2.66509 9.8882L2.66897 9.94754H0V11.05H2.80474L2.8125 11.0949C3.03491 12.3358 3.46422 13.4713 4.04612 14.4327L4.09009 14.5052L1.55172 17.094L2.31724 17.8747L4.73664 15.406L4.81164 15.493C5.93405 16.8012 7.40043 17.5885 8.99871 17.5885C10.5737 17.5885 12.0194 16.825 13.1353 15.5523L13.2091 15.4679L15.6789 18L16.4457 17.2206L13.8647 14.5751L13.9099 14.5013C14.5138 13.5254 14.9573 12.3662 15.1849 11.0949L15.1927 11.05H18V9.94754H15.3297L15.3336 9.88951C15.3513 9.63495 15.3599 9.37982 15.3595 9.12462C15.3653 7.83365 15.1387 6.55255 14.6909 5.34501L14.6664 5.27907L16.6966 3.20859L15.931 2.43051L13.7871 4.61572H12.772ZM6.30647 4.61572V3.84819C6.30647 3.11999 6.59011 2.42161 7.095 1.90669C7.5999 1.39178 8.28468 1.1025 8.99871 1.1025C9.71273 1.1025 10.3975 1.39178 10.9024 1.90669C11.4073 2.42161 11.6909 3.11999 11.6909 3.84819V4.61572H6.30647ZM13.6733 5.71954L13.6991 5.78943C14.0651 6.78247 14.2772 7.91267 14.2772 9.12331C14.2772 11.2465 13.6267 13.1245 12.6297 14.4472C11.6341 15.7673 10.3397 16.4847 8.99871 16.4847C7.65776 16.4847 6.36466 15.7673 5.36897 14.4472C4.37069 13.1245 3.72026 11.2465 3.72026 9.12331C3.72026 7.91267 3.93233 6.78247 4.29957 5.78943L4.32543 5.71954H13.6733Z"
                    fill="#888888"
                  />
                </svg>
                Report a bug
              </button>
              <button className="text-foreground flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="19"
                    height="19"
                    rx="9.5"
                    stroke="#888888"
                  />
                  <path
                    d="M9.55072 4C8.60901 4 7.70587 4.37409 7.03998 5.03998C6.37409 5.70587 6 6.60901 6 7.55072C6 7.73907 6.07482 7.91969 6.208 8.05287C6.34117 8.18605 6.5218 8.26087 6.71014 8.26087C6.89849 8.26087 7.07912 8.18605 7.21229 8.05287C7.34547 7.91969 7.42029 7.73907 7.42029 7.55072C7.42029 6.3733 8.3733 5.42029 9.55072 5.42029C10.7281 5.42029 11.6812 6.3733 11.6812 7.55072C11.6812 8.1302 11.5398 8.46965 11.3701 8.70755C11.1841 8.96675 10.9263 9.16062 10.5691 9.40704L10.4867 9.46244C10.1693 9.67974 9.76022 9.95883 9.44349 10.348C9.06925 10.8082 8.84058 11.3898 8.84058 12.1667V12.5217C8.84058 12.7101 8.9154 12.8907 9.04858 13.0239C9.18175 13.1571 9.36238 13.2319 9.55072 13.2319C9.73907 13.2319 9.9197 13.1571 10.0529 13.0239C10.1861 12.8907 10.2609 12.7101 10.2609 12.5217V12.1667C10.2609 11.7008 10.3873 11.4395 10.5449 11.2442C10.7274 11.0212 10.9731 10.8522 11.336 10.6029L11.3737 10.5767C11.7259 10.3352 12.1783 10.0185 12.5241 9.53416C12.8884 9.02854 13.1014 8.39083 13.1014 7.55072C13.1014 6.60901 12.7274 5.70587 12.0615 5.03998C11.3956 4.37409 10.4924 4 9.55072 4ZM9.55072 16.25C9.78615 16.25 10.0119 16.1565 10.1784 15.99C10.3449 15.8235 10.4384 15.5977 10.4384 15.3623C10.4384 15.1269 10.3449 14.9011 10.1784 14.7346C10.0119 14.5682 9.78615 14.4746 9.55072 14.4746C9.3153 14.4746 9.08951 14.5682 8.92304 14.7346C8.75657 14.9011 8.66304 15.1269 8.66304 15.3623C8.66304 15.5977 8.75657 15.8235 8.92304 15.99C9.08951 16.1565 9.3153 16.25 9.55072 16.25Z"
                    fill="#888888"
                  />
                </svg>
                Ask a Product Question
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description Tabs Section */}
      <div className="bg-white rounded-3xl p-8 mt-8 max-w-[1600px] mx-auto">
        <Tabs defaultValue="description1" className="w-full">
          <TabsList className="border-b border-gray-200 w-full justify-start h-auto p-0 bg-transparent">
            <TabsTrigger
              value="description1"
              className="font-medium px-6 py-2 data-[state=active]:bg-[#FF6B3D] data-[state=active]:text-white data-[state=active]:shadow-none"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="description2"
              className="font-medium px-6 py-2 data-[state=active]:bg-[#FF6B3D] data-[state=active]:text-white data-[state=active]:shadow-none"
            >
              Characteristics
            </TabsTrigger>
            {/* <TabsTrigger
              value="description3"
              className="font-medium px-6 py-2 data-[state=active]:bg-[#FF6B3D] data-[state=active]:text-white data-[state=active]:shadow-none"
            >
              Description
            </TabsTrigger>  */}
          </TabsList>

          <TabsContent value="description1" className="py-8 px-16 border mt-0">
            <div>
              {description || "discription not found"}
              {/* <ul className="space-y-4 text-sm">
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
              </ul> */}
            </div>
          </TabsContent>

          <TabsContent value="description2" className="py-8">
            <div className="grid grid-cols-2 gap-x-32">
              <div className="text-sm text-gray-600">
                {Object.keys(attributes).length === 0 ? (
                  <p>Not found</p>
                ) : (
                  <ul>
                    {Object.entries(attributes).map(([key, value]) => (
                      <li key={key} className="flex items-center gap-2">
                        <span>
                          {key}: {String(value)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </TabsContent>

          {/* <TabsContent value="description3" className="py-8">
            <div className="grid grid-cols-2 gap-x-32">
              <div className="text-sm text-gray-600">
                Third description tab content
              </div>
            </div>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetails;
