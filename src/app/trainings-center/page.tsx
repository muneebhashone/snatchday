import ClientLayout from "@/components/landing-page/ClientLayout";
import SecondaryHeroSection from "@/components/SecondaryHeroSection";

import React from "react";
import SectionCenter from "@/components/SectionCenter";
import GameCards from "@/components/GameCards";
import FeaturedProductsCard from "@/components/FeaturedProductsCard";
import graphiccard from "@/app/images/graphiccard.png";
import trainingbg from "@/app/images/trainingBg.png";
import trainingbgc from "@/app/images/trainingbgc.png";
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
        <SecondaryHeroSection
          title="Training Center"
          bg={trainingbg}
          rightimage={trainingbgc}
        />
        <SectionCenter
          title="Training"
          titlebg="Center"
          description="Hier kannst du alle Spiele vorab kostenlos spielen und testen, dabei ist keine Einzahlung erforderlich. Nutze die Chance, um die Spiele zu üben und deine Gewinnchancen zu maximieren. Wir bieten eine Vielzahl von Spielen und garantieren ein unterhaltsames Spielerlebnis."
        />
        <GameCards />
        <div className="px-0 md:px-6 pb-60">
          <div className="text-3xl lg:text-5xl font-extrabold my-5 text-center capitalize">
            <h2>
              <span className=" bg-[#FF6B3D] text-white px-4 py-1 rounded-lg mr-1">
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
