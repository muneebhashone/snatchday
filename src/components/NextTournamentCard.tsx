import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { StaticImageData } from "next/image";
import { Separator } from "./ui/separator";

interface NextTournamentCardProps {
  productImage: StaticImageData;
  gameIcon: StaticImageData;
  title: string;
  rating: number;
  reviews: number;
  gameName: string;
  duration: string;
  currentPrice: string;
  participationPoints: number;
  participationFee: string;
  countdown: {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
  };
}

const NextTournamentCard = ({
  productImage,
  gameIcon,
  title,
  rating,
  reviews,
  gameName,
  duration,
  currentPrice,
  participationPoints,
  participationFee,
  countdown,
}: NextTournamentCardProps) => {
  return (
    
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-primary transition-all duration-300">
        {/* Left Column - Product Image */}
        <div className="space-y-4 border-r border-gray-200 pt-10 px-10">
          <div className="flex items-end justify-center">
            {/* Countdown Timer */}
            

            <Image
              src={productImage}
              alt="Tournament Product"
              width={349}
              height={200}
              
            />
          </div>
        
          <div className="flex items-center justify-between">
              <div className="text-center border border-gray-200 px-4">
                <div className="text-xl font-bold">{countdown.hours}</div>
                <div className="text-xs text-gray-500">Hours</div>
              </div>
              <div className="text-center border border-gray-200 px-4">
                <div className="text-xl font-bold">{countdown.minutes}</div>
                <div className="text-xs text-gray-500">Minutes</div>
              </div>
              <div className="text-center border border-gray-200 px-4">
                <div className="text-xl font-bold">{countdown.seconds}</div>
                <div className="text-xs text-gray-500">Seconds</div>
              </div>
              <div className="text-center border border-gray-200 px-4">
                <div className="text-xl font-bold">
                  {countdown.milliseconds}
                </div>
                <div className="text-xs text-gray-500">Mili Seconds</div>
              </div>
            </div>
            
        </div>


        {/* Right Column - Tournament Info */}
        
        
        <div className="py-6 pl-4">
          {/* Tournament Badge */}
          <div className="inline-block bg-[#FF6B3D] text-white text-sm px-4 py-1 rounded-full">
            Bargain or Discount Tournament
          </div>

          {/* Product Title */}
          <p className="text-2xl font-semibold">{title}</p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex text-[#FF6B3D]">{"★".repeat(rating)}</div>
            <span className="text-sm text-gray-500">({reviews})</span>
          </div>

          {/* Game Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#F4F1FA] rounded-lg flex items-center justify-center">
                <Image src={gameIcon} alt="Game Icon" width={32} height={32} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Game:</p>
                <p className="text-sm text-primary">{gameName}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Duration:</p>
              <p className="font-medium">{duration}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* Price Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Current price:</p>
                <p className="text-xl font-bold">{currentPrice}€</p>
              </div>
              <div className="text-sm text-gray-500">
                incl. 19% VAT, plus shipping costs
              </div>
            </div>

            {/* Participation Fee */}
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Participation fee:</p>
                <p className="font-medium">
                  {participationPoints} points / {participationFee}€
                </p>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <Button className="gradient-primary hover:gradient-primary/90 text-white rounded-full px-6">
              Register Now
            </Button>

            <Button
              variant="ghost"
              className="text-gray-600 bg-gray-50 rounded-full px-6"
            >
              Share tournament
            </Button>
          </div>
        </div>
      </div>
   
  );
};

export default NextTournamentCard;
