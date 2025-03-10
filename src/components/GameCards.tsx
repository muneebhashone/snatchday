"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ArrowDown} from "lucide-react";
import { trainingGameCards } from "@/dummydata";

const GameCards = () => {

    const [visibleCards, setVisibleCards] = useState(4);

  return (
    <div className="px-10 pb-28">
  
      {/* <div className="grid grid-cols-4 gap-12"> */}
      <div className="flex w-full flex-wrap items-center justify-between gap-5">
        {trainingGameCards.slice(0, visibleCards).map((card, index) => (
          <div
          key={index}
          className="group p-5 md:px-10 lg:px-20 md:py-7 lg:py-20 shadow-xl rounded-lg hover:border-2 hover:border-primary"
        >
          <div className="aspect-square rounded-full h-28 lg:h-64 w-28 lg:w-64 shadow-lg border border-gray-200 flex items-center justify-center transition-transform transform group-hover:scale-105">
            <Image className="w-[50px] h-[50px] md:w-[120px] lg:w-[140px] md:h-[120px] lg:h-[140px]" src={card.icon} alt={card.label} width={141} height={141} />
          </div>
          <h3 className="text-center text-2xl font-bold mt-10 mb-4">{card.label}</h3>
          <Button className="w-full text-xs sm:text-l w-20gmd: shadow-lg bg-white text-black rounded-full hover:gradient-primary py-6 hover:text-white">
            Zum Spiel
          </Button>
        </div>
      ))}
    </div>
    {visibleCards < trainingGameCards.length && (
      <Button 
        onClick={() => setVisibleCards(prev => Math.min(prev + 4, trainingGameCards.length))}
        className="block mx-auto rounded-full w-24 md:w-32 h-24 md:h-32 bg-white shadow-lg my-10"
      >
        <p className="text-xs md:text-lg text-card-foreground font-normal">
          View More
        </p>
        <ArrowDown className="w-4 h-5 mx-auto text-card-foreground mt-2" />
      </Button>
    )}
    </div>
  );
};

export default GameCards;
