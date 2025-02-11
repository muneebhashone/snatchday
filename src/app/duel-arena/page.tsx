import ClientLayout from "@/components/landing-page/ClientLayout";
import SecondaryHeroSection from "@/components/SecondaryHeroSection";
import duellingimage from "@/app/images/duellingimage.png";
import React from "react";

import SectionCenter from "@/components/SectionCenter";
import TrainingCenter from "@/components/landing-page/TrainingCenter";
import FeaturedProductsCard from "@/components/FeaturedProductsCard";
import graphiccard from "@/app/images/graphiccard.png";
import { Button } from "@/components/ui/button";
const page = () => {
  const displayProducts = [
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
    {
      title: "SanDisk Extreme - Flash-Speicherkarte (microSDXC)",
      price: "31,40",
      oldPrice: "31,40",
      rating: 5,
      reviews: 5,
      image: graphiccard,
      isSale: true,
      discount: "€99",
      category: "computer",
    },
    {
      title: "Razer Blade 14 - AMD Ryzen 9 6900HX / 3.3 GHz - Win 11",
      price: "2.644",
      oldPrice: "2.694",
      rating: 5,
      reviews: 5,
      image: graphiccard,
      isSale: false,
      isNew: true,
      discount: "€99",
      category: "computer",
    },
    {
      title: "Canon CLI-551 C/M/Y/BK Multipack - 4er-Pack - Schwarz",
      price: "52,44",
      oldPrice: "64,44",
      rating: 5,
      reviews: 5,
      image: graphiccard,
      isSale: true,
      discount: "€99",
      category: "elektro",
    },
    {
      title: "Galaxy S22 Ultra",
      price: "52,44",
      oldPrice: "64,44",
      rating: 5,
      reviews: 5,
      image: graphiccard,
      isSale: true,
      discount: "€99",
      category: "audio",
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
            <Button className="text-primary bg-white rounded-full py-5 mt-12 px-12">
              Create a Duel
            </Button>
          </div>
        </div>
        <div className="">
          <TrainingCenter />
        </div>
        <div className="px-0 md:px-6 py-60">
          <div className="text-6xl font-bold my-5 text-center capitalize">
            <h2>
              <span className=" bg-[#FF6B3D] text-white px-6 py-2 rounded-lg ml-1">
                highlights
              </span>

              <span className="bg-transparent">of the week</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 mt-10">
            {displayProducts.map((product, index) => (
              <FeaturedProductsCard key={index} {...product} />
            ))}
          </div>
        </div>
      </main>
    </ClientLayout>
  );
};

export default page;
