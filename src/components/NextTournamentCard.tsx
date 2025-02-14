import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { StaticImageData } from "next/image";
import { Separator } from "./ui/separator";
import { Heart } from "lucide-react";
import Link from "next/link";

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
      <div className="border-r border-gray-200 pt-16 px-8">
        <div>
          <Image
            src={productImage}
            alt="Tournament Product"
            width={349}
            height={200}
            objectFit="cover"
          />
        </div>

        <div className="flex items-center justify-between mt-12">
          <div className="text-center text-[#1C1B1D]">
            <div className="border border-gray-200 text-[30px] font-normal px-7">
              {countdown.hours}
            </div>
            <p className="text-xs">Hours</p>
          </div>
          <div className="text-center text-[#1C1B1D]">
            <div className="border border-gray-200 text-[30px] px-7">
              {countdown.minutes}
            </div>
            <p className="text-xs">Minutes</p>
          </div>
          <div className="text-center text-[#1C1B1D]">
            <div className="border border-gray-200 text-[30px] px-7">
              {countdown.seconds}
            </div>
            <p className="text-xs">Seconds</p>
          </div>
          <div className="text-center text-[#1C1B1D]">
            <div className="border border-gray-200 text-[30px] px-7">
              {countdown.milliseconds}
            </div>
            <p className="text-xs">Mili Seconds</p>
          </div>
        </div>
      </div>

      {/* Right Column - Tournament Info */}

      <div className="pt-16 pb-12 px-7 relative">
        <Button className="absolute top-5 right-5 w-12 h-12 bg-[#F5F5F5] hover:bg-gray-100 rounded-full">
          <Heart className="w-6 h-6 text-[#A5A5A5] " />
        </Button>
        {/* Tournament Badge */}
        <div className="inline-block bg-primary text-white text-sm px-3 py-1 rounded-full">
          Bargain or Discount Tournament
        </div>

        {/* Product Title */}
        <p className="text-2xl font-semibold mt-2 text-[#2F190D]">{title}</p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex text-[#FF6B3D] text-2xl">
            {"★".repeat(rating)}
          </div>
          <span className="text-sm text-gray-500">({reviews})</span>
        </div>

        {/* Game Info */}
        <div className="flex items-center justify-start gap-2">
          <div className="w-16 h-16 bg-[#FFFFFF] rounded-full flex items-center justify-center drop-shadow-lg">
            <Image src={gameIcon} alt="Game Icon" width={40} height={37} />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <p className="text-lg font-bold">Game:</p>
              <p className="text-primary text-lg font-bold">{gameName}</p>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-lg font-normal">Duration:</p>
              <p className="text-lg font-normal">{duration}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-5">
          {/* Price Info */}
          <div>
            <div className="flex items-center gap-1">
              <p className="text-foreground text-lg font-normal">
                Current price:
              </p>
              <p className="text-xl font-bold text-foreground">
                {currentPrice}€
              </p>
            </div>
            <p className="text-sm text-foreground">
              incl. 19% VAT, plus shipping costs
            </p>
          </div>

          {/* Participation Fee */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg text-foreground font-normal">
                Participation fee:
              </p>
              <p className="text-foreground font-normal">
                {participationPoints} points / {participationFee}€
              </p>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex items-center justify-between">
          <Button className="gradient-primary text-sm hover:gradient-primary/90 text-white rounded-full px-6 py-1 drop-shadow-lg max-h-[27px]">
            <Link href="/tournament-detail">Register Now</Link>
          </Button>

          <Button
            variant="ghost"
            className="text-gray-600 bg-gray-50 rounded-full px-6 py-1 drop-shadow-lg max-h-[27px]"
          >
            Share tournament
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NextTournamentCard;
