"use client";

import Image from "next/image";
import React, { useState } from "react";
import game1 from "@/app/images/game1.png";
import game2 from "@/app/images/game2.png";
import game3 from "@/app/images/game3.png";
import game4 from "@/app/images/game4.png";
import game5 from "@/app/images/game5.png";

import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

const GameCards = () => {

    const [visibleCards, setVisibleCards] = useState(4);
  const trainingCards = [
    {
      icon: game1,
      label: "Memorized - TC",
    },
    {
      icon: game2,
      label: "Fill - TC",
      notification: true,
    },
    {
      icon: game3,
      label: "Sporos - TC",
    },
    {
      icon: game4,
      label: "Puzzle Color - TC",
    },
    {
      icon: game5,
      label: "Reorder - TC",
    },
    {
      icon: game1,
      label: "Push It - TC",
    },
    {
      icon: game5,
      label: "Reorder - TC",
    },
    {
      icon: game1,
      label: "Push It - TC",
    },
    {
      icon: game5,
      label: "Reorder - TC",
    },
    {
      icon: game1,
      label: "Push It - TC",
    },
    {
      icon: game1,
      label: "Memorized - TC",
    },
    {
      icon: game2,
      label: "Fill - TC",
      notification: true,
    },
    {
      icon: game3,
      label: "Sporos - TC",
    },
    {
      icon: game4,
      label: "Puzzle Color - TC",
    },
    {
      icon: game5,
      label: "Reorder - TC",
    },
    {
      icon: game1,
      label: "Push It - TC",
    },
    {
      icon: game5,
      label: "Reorder - TC",
    },
    {
      icon: game1,
      label: "Push It - TC",
    },
    {
      icon: game5,
      label: "Reorder - TC",
    },
    {
      icon: game1,
      label: "Push It - TC",
    },
  ];

  return (
    <div className="px-20 pb-28">
  
      <div className="grid grid-cols-4 gap-12">
        {trainingCards.slice(0, visibleCards).map((card, index) => (
          <div
          key={index}
          className="group px-20 py-14 shadow-2xl rounded-lg border border-gray-200 hover:border-primary hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]"
        >
          <div className="aspect-square rounded-full h-64 w-64 shadow-lg border border-gray-200 flex items-center justify-center transition-transform transform group-hover:scale-105">
            <Image src={card.icon} alt={card.label} width={141} height={141} />
          </div>
          <h3 className="text-center  font-semibold py-10">{card.label}</h3>
          <Button className="w-full shadow-lg bg-white text-black rounded-full hover:gradient-primary py-6 hover:text-white">
            Zum Spiel
          </Button>
        </div>
      ))}
    </div>
    {visibleCards < trainingCards.length && (
      <Button 
        onClick={() => setVisibleCards(prev => Math.min(prev + 4, trainingCards.length))}
        className="block mx-auto rounded-full w-32 h-32 bg-white shadow-lg my-10"
      >
        <p className="text-black font-semibold">
          View More
        </p>
        <ChevronDown className="w-4 h-4 mx-auto text-black" />
      </Button>
    )}
    </div>
  );
};

export default GameCards;
