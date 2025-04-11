"use client";
import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BubblesIcon } from "../icons/icon";
import { BubblesIcon1 } from "../icons/icon";
import { useTrainingCenter } from "@/hooks/api";
import { Loader } from "lucide-react";

const TrainingCenter = () => {
  const { data: trainingCenter, isLoading } = useTrainingCenter();
  return (
    <div className="relative">
      <div className="absolute w-full h-full">
        <BubblesIcon className="absolute -top-10 -left-20 sm:left-10" />
        <BubblesIcon1 className="absolute -top-10 -right-32 sm:right-10" />
        <BubblesIcon className="absolute -bottom-20 -left-20 sm:left-40" />
        <BubblesIcon1 className="absolute -bottom-20 -right-20 sm:right-40" />
      </div>
      <h3 className="text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-extrabold flex items-center justify-center gap-1 lg:gap-3">
        Training
        <span className="bg-primary text-white px-4 py-2 rounded-lg">
          Center
        </span>
      </h3>
      {isLoading ? (
        <div className="w-full flex items-center justify-center mt-10">
          <Loader className="animate-spin text-primary" size={25} />
        </div>
      ) : (
        <Carousel
          opts={{
            align: "start",
            loop: true,
            duration: 10,
          }}
          className="w-full"
        >
          <CarouselContent className="">
            {trainingCenter?.data?.map((card, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6 flex items-center justify-center"
              >
                <div className="relative group cursor-pointer">
                  <div className="rounded-full my-6 shadow-lg border h-[150px] md:h-[190px] w-[150px] xl:h-[278px] md:w-[190px] xl:w-[278px] border-gray-200 hover:border-primary flex  items-center justify-center transition-transform transform group-hover:scale-105">
                    <Image
                      className="w-[67px] sm:w-[60px] h-[67px] sm:h-[60px] md:w-[100px] md:h-[100px] xl:w-[200px] xl:h-[200px] object-contain"
                      unoptimized
                      src={card.logo}
                      alt={card.title}
                      width={122}
                      height={122}
                      onClick={() => {
                        window.location.href = `/trainings-center/${card._id}`;
                      }}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="w-14 sm:w-20 h-14 sm:h-20 md:w-20 xl:w-24 md:h-20 xl:h-24 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary hover:text-white -left-10" />
          <CarouselNext className="w-14 sm:w-20 h-14 sm:h-20 md:w-20 xl:w-24 md:h-20 xl:h-24 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary hover:text-white -right-10" />
        </Carousel>
      )}
    </div>
  );
};

export default TrainingCenter;
