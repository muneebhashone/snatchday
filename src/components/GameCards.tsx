"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useTrainingCenter } from "@/hooks/api";
const GameCards = () => {
  const { data: trainingCenter } = useTrainingCenter();
  console.log(trainingCenter);
  return (
    <div className="px-10 pb-28">
      <div className="flex w-full flex-wrap items-center justify-start gap-5">
        {trainingCenter?.data?.map((center, index) => (
          <div
            key={index}
            className="group p-5 md:px-10 lg:px-20 md:py-7 lg:py-20 shadow-xl rounded-lg hover:border-2 hover:border-primary"
          >
            <div className="aspect-square rounded-full h-28 lg:h-64 w-28 lg:w-64 shadow-lg border border-gray-200 flex items-center justify-center transition-transform transform group-hover:scale-105">
              <Image
                className="w-[50px] h-[50px] md:w-[120px] lg:w-[140px] md:h-[120px] lg:h-[140px]"
                src={center.logo}
                alt={center.title}
                width={141}
                height={141}
              />
            </div>
            <h3 className="text-center text-2xl font-bold mt-10 mb-4">
              {center.title}
            </h3>
            <Button
              onClick={() =>
                (window.location.href = `/trainings-center/${center._id}`)
              }
              className="w-full text-xs sm:text-l w-20gmd: shadow-lg bg-white text-black rounded-full hover:gradient-primary py-6 hover:text-white"
            >
              Play
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameCards;
