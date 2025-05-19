"use client";
import React, { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import vipbanner from "@/app/images/VIPSTUDIO.png";
import VIPProductCard from "./VIPProductCard";
import { Loader, Loader2 } from "lucide-react";
import { useGetVIPProducts } from "@/hooks/api";
import { DynamicPagination } from "./ui/dynamic-pagination";
const VIPShop = () => {
  const [offset, setOffset] = useState(0);
  const { data: VIPProducts, isLoading } = useGetVIPProducts({
    limit: "10",
    offset: offset.toString(),
  });

  const vipProducts = VIPProducts?.data?.products;
  const total = VIPProducts?.data?.pagination?.total;
  const limit = VIPProducts?.data?.pagination?.limit;
  const hasMore = VIPProducts?.data?.pagination?.hasMore;

  console.log(vipProducts);

  const handlePageChange = (page: number) => {
    setOffset((page - 1) * limit);
  };

  return (
    <div className="bg-black -mt-20 pt-44 pb-52">
      <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 overflow-y-auto">
        {/* VIP Club Banner with Crown */}
        <div className="w-full max-w-md flex justify-center mt-20 mb-12">
          <Image
            src={vipbanner}
            alt="VIP CLUB"
            width={500}
            height={120}
            priority
          />
        </div>

        {/* Main Headings */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 text-white">
          EXKLUSIVE ANGEBOTE FÜR VIP-MITGLIEDER
        </h1>
        <p className="text-3xl text-center mb-12">
          Nutze deine Chance auf ein ganz besonderes Schnäppchen
        </p>

        {/* Product Grid */}
        <div className="w-full px-10">
          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <Loader className="animate-spin" />
            </div>
          ) : vipProducts?.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 gap-12 w-full mt-10">
                {vipProducts.map((product) => (
                  <VIPProductCard key={product._id} {...product} />
                ))}
              </div>
              <div className="flex justify-between items-center px-10 mt-10 mb-10">
                <p className="text-sm text-gray-500">
                  {offset + 1} - {offset + limit} of {total}
                </p>
                <DynamicPagination
                  totalItems={total}
                  itemsPerPage={limit}
                  currentPage={offset / limit + 1}
                  onPageChange={handlePageChange}
                  isVIP={true}
                />
              </div>
            </div>
          ) : (
            <div className="text-center text-2xl">
              No products available for VIP Shop
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VIPShop;
