import React from "react";
import Image from "next/image";

// Import training card images
import game1 from "@/app/images/game1.png";
import game2 from "@/app/images/game2.png";
import game3 from "@/app/images/game3.png";
import game4 from "@/app/images/game4.png";
import game5 from "@/app/images/game5.png";

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
];

const TrainingCenter = () => {
  return (
    <div className="mt-20">
      <h3 className="text-3xl font-bold text-center mb-12">Training Center</h3>
      <div className="flex flex-wrap items-center justify-center lg:justify-around gap-8">
        {trainingCards.map((card, index) => (
          <div key={index} className="relative group cursor-pointer ">
            <div className="aspect-square p-10 rounded-full shadow-lg border h-full w-full border-gray-200 hover:border-primary items-center justify-center transition-transform transform group-hover:scale-105">
              <Image
              className="w-[80px] lg:w-[120px]"
                src={card.icon}
                alt={card.label}
                width={122}
                height={122}
              />
            </div>
            {card.notification && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#FF6B3D] rounded-full border-4 border-white" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingCenter;
