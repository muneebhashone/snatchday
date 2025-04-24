"use client";
import ClientLayout from "@/components/landing-page/ClientLayout";
import SecondaryHeroSection from "@/components/SecondaryHeroSection";
import duellingimage from "@/app/images/duellingimage.png";
import React from "react";

import SectionCenter from "@/components/SectionCenter";
import TrainingCenter from "@/components/landing-page/TrainingCenter";
import FeaturedProductsCard from "@/components/FeaturedProductsCard";
import graphiccard from "@/app/images/graphiccard.png";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCurrentOffers } from "@/hooks/api";
import Link from "next/link";

const DuelArenaPage = () => {
  const { data: currentOffers, isLoading } = useCurrentOffers();
  const displayProducts = currentOffers?.data.products;
  const displayProducts2 = [
    {
      title: "14 - AMD Ryzen 9 3 GHz - Win 11",
      price: "2.644",
      oldPrice: "2.694",
      rating: 5,
      reviews: 5,
      image: graphiccard,
      isSale: true,
      isNew: false,
      discount: "€99",
      category: "computer",
    },
    {
      title: "ZOTAC GAMING GeForce RTX 3050 AMP - Grafikkarten",
      price: "319,80",
      oldPrice: "334,80",
      rating: 5,
      reviews: 5,
      image: graphiccard,
      isSale: false,
      isNew: true,
      discount: "€99",
      category: "computer",
    },
  ];
  return (
    <ClientLayout>
      <main>
        <SecondaryHeroSection title="Duelling" bg={duellingimage} />
        <SectionCenter
          title="How To Play"
          titlebg="Duel Arena"
          description="You can have exciting duels in the duel arena. To start or accept a duel, you need 25 snap points, which is worth 25 cents. There are no additional fees. VIP members are exempt from this fee (see VIP membership). A duel consists of two players. The person who starts the duel determines the stake of the snap or discount points, the game selection and the number of rounds. You can choose up to 5 rounds, with your points, attempts and the time of all rounds being added together. Read More"
        />
        <div className="gradient-primary text-3xl text-center py-16">
          <div className="max-w-[1440px] mx-auto">
            <p className="text-white">
              Create a duel with a game you have the most experience with and
              set your own stake.
            </p>
            <Button className="text-primary bg-white text-lg rounded-full py-5 min-h-14 mt-12 px-12 hover:bg-primary hover:text-white drop-shadow-[0_20px_35px_rgba(255,255,255,0.5)] shadow-[0_12px_24px_rgba(255,255,255,0.5)]">
              <Link href="/duel-arena/create">Create a Duel</Link>
            </Button>
          </div>
        </div>
        <div className="pt-20">
          <TrainingCenter />
        </div>
        <div className="px-4 md:px-12 pb-60 pt-20 mt-20 bg-[#F9F9F9]">
          <div className="text-[48px] font-extrabold my-5 text-center capitalize">
            <h2>
              <span className="bg-primary text-white px-6 py-1 rounded-lg">
                highlights
              </span>
              <span className="text-foreground ml-2">of the week</span>
            </h2>
          </div>

          <div className="max-w-[1920px] mx-auto mt-10">
            <Carousel
              opts={{
                align: "start",
                loop: true,
                skipSnaps: false,
                slidesToScroll: 1,
              }}
              className="w-full relative max-w-[100%] mx-auto"
            >
              <CarouselContent className="-ml-2 md:ml-6 max-w-[100%] mx-auto">
                {displayProducts?.map((product, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
                  >
                    <FeaturedProductsCard {...product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary hover:text-white transition-all duration-300" />
              <CarouselNext className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary hover:text-white transition-all duration-300" />
            </Carousel>
          </div>
        </div>
      </main>
    </ClientLayout>
  );
};

export default DuelArenaPage;
