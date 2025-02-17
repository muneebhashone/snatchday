import ClientLayout from "@/components/landing-page/ClientLayout";
import SecondaryHeroSection from "@/components/SecondaryHeroSection";
import React from "react";
import SectionCenter from "@/components/SectionCenter";
import GameCards from "@/components/GameCards";
import FeaturedProductsCard from "@/components/FeaturedProductsCard";
import graphiccard from "@/app/images/graphiccard.png";
import trainingbg from "@/app/images/trainingBg.png";
import trainingbgc from "@/app/images/trainingbgc.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

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
      <main className="mt-10">
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
              <span className=" bg-[#FF6B3D] text-white px-4 py-1 rounded-lg mr-2">
                highlights
              </span>

              <span className="bg-transparent">of the week</span>
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
              className="w-full relative"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {displayProducts.map((product, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/6"
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

export default page;
