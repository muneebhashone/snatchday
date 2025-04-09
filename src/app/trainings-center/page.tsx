"use client";
import ClientLayout from "@/components/landing-page/ClientLayout";
import SecondaryHeroSection from "@/components/SecondaryHeroSection";
import React from "react";
import SectionCenter from "@/components/SectionCenter";
import GameCards from "@/components/GameCards";
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
import { useCurrentOffers } from "@/hooks/api";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";

const TrainingCenterPage = () => {
  const { data: currentOffers, isLoading } = useCurrentOffers();
  const products = currentOffers?.data.products;

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
              <CarouselContent>
                {products?.length > 0 && products !== null ? (
                  products?.map((product, index) => (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/2 lg:basis-1/4"
                    >
                      <div className="p-1">
                        <Card className="border-transparent">
                          <CardContent className="flex aspect-square items-center justify-center p-0 ">
                            <ProductCard key={index} {...product} />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))
                ) : (
                  <div className="flex items-center justify-center   w-full">
                    <p className="text-gray-600">
                      {" "}
                      Current offers not available
                    </p>
                  </div>
                )}
              </CarouselContent>
              <CarouselPrevious className="bg-primary p-10 text-xl hover:border-2 hover:border-primary hover:bg-primary -left-24" />
              <CarouselNext className="bg-primary p-10 text-xl hover:border-2 hover:border-primary hover:bg-primary -right-24" />
            </Carousel>
          </div>
        </div>
      </main>
    </ClientLayout>
  );
};

export default TrainingCenterPage;
