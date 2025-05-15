import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import vipbanner from "@/app/images/VIP-Studio.png";
import { vipProducts } from "@/dummydata";
import VIPProductCard from "./VIPProductCard";

const VIPShop = () => {
  return (
    <div className="bg-black -mt-20 pt-44 pb-52">
      <div className="min-h-screen bg-black text-white flex flex-col items-center px-4">
        {/* VIP Club Banner with Crown */}
        <div className="w-full max-w-md flex justify-center">
          <Image
            src={vipbanner}
            alt="VIP CLUB"
            width={500}
            height={120}
            priority
          />
        </div>

        {/* Main Headings */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-3">
          EXKLUSIVE ANGEBOTE FÜR VIP-MITGLIEDER
        </h1>
        <p className="text-xl text-center mb-12">
          Nutze deine Chance auf ein ganz besonderes Schnäppchen
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          {vipProducts.map((product) => (
            <VIPProductCard key={product._id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VIPShop;
