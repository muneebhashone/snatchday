import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Import training card images
import game1 from "@/app/images/game1.png";
import game2 from "@/app/images/game2.png";
import game3 from "@/app/images/game3.png";
import game4 from "@/app/images/game4.png";
import game5 from "@/app/images/game5.png";
import { BubblesIcon } from "../icons/icon";
import { BubblesIcon1 } from "../icons/icon";

// Define training cards data
const trainingCards = [
  {
    icon: game1,
    label: "Training 1",
  },
  {
    icon: game2,
    label: "Training 2",
    notification: true,
  },
  {
    icon: game3,
    label: "Training 3",
  },
  {
    icon: game4,
    label: "Training 4",
  },
  {
    icon: game5,
    label: "Training 5",
  },
  {
    icon: game1,
    label: "Training 6",
  },
  {
    icon: game3,
    label: "Training 3",
  },
  {
    icon: game4,
    label: "Training 4",
  },
  {
    icon: game5,
    label: "Training 5",
  },
  {
    icon: game1,
    label: "Training 6",
  },
];

const TrainingCenter = () => {
  return (
    <div className="relative">
       <div className="absolute w-full h-full">
            <BubblesIcon className="absolute -top-10 -left-20 sm:left-10"/>
            <BubblesIcon1 className="absolute -top-10 -right-32 sm:right-10"/>
            <BubblesIcon className="absolute -bottom-20 -left-20 sm:left-40"/>
            <BubblesIcon1 className="absolute -bottom-20 -right-20 sm:right-40"/>
            
        </div>
      <h2 className="text-3xl font-bold text-center mb-6">Training Center</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="">
          {trainingCards.map((card, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/6"
            >
              <div className="relative group cursor-pointer">
                <div className="rounded-full my-6 shadow-lg border h-[278px] w-[278px] border-gray-200 hover:border-primary flex items-center justify-center transition-transform transform group-hover:scale-105">
                  <Image
                    className="w-[80px] lg:w-[120px]"
                    src={card.icon}
                    alt={card.label}
                    width={122}
                    height={122}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="w-14 sm:w-20 h-14 sm:h-20 md:w-24 md:h-24 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary hover:text-white -left-10" />
        <CarouselNext className="w-14 sm:w-20 h-14 sm:h-20 md:w-24 md:h-24 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary hover:text-white -right-5" />
      </Carousel>
    </div>
  );
};

export default TrainingCenter;
