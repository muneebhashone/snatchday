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
    <div className="grid grid-cols-1 xl:grid-cols-2 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-primary transition-all duration-300 items-center">
      {/* Left Column - Product Image */}
      <div className="relative border-gray-200 pt-10 xl:pt-16 px-8 flex flex-col items-center">
        <div>
          <Image
            src={productImage}
            alt="Tournament Product"
            width={349}
            height={200}
            objectFit="cover"
          />
        </div>
        <Button className="flex items-center justify-center xl:hidden absolute top-3 right-3 w-10 xl:w-12 h-10 xl:h-12 bg-[#F5F5F5] hover:bg-gray-100 rounded-full">
          <Heart className="w-4 xl:w-6 h-4 xl:h-6 text-[#A5A5A5] " />
        </Button>
        {/* <div className="flex items-center justify-between mt-3 xl:mt-12">
          <div className="text-center text-[#1C1B1D]">
            <div className="border border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
              {countdown.hours}
            </div>
            <p className="text-xs hidden xl:block">Hours</p>
            <p className="xl:hidden block text-xs">Hrs</p>
          </div>
          <div className="text-center text-[#1C1B1D]">
            <div className="border border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
              {countdown.minutes}
            </div>
            <p className="text-xs hidden xl:block">Minutes</p>
            <p className="text-xs xl:hidden block">Min</p>
          </div>
          <div className="text-center text-[#1C1B1D]">
            <div className="border border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
              {countdown.seconds}
            </div>
            <p className="text-xs hidden xl:block">Seconds</p>
            <p className="text-xs xl:hidden block">Sec</p>
          </div>
          <div className="text-center text-[#1C1B1D]">
            <div className="border border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
              {countdown.milliseconds}
            </div>
            <p className="text-xs hidden xl:block">Mili Seconds</p>
            <p className="text-xs xl:hidden block">Mili Sec</p>
          </div>
        </div> */}
        <div className="flex flex-wrap items-center justify-center 2xl:gap-1 gap-2 2xl:justify-between mt-3 xl:mt-12">
          <div className="text-center text-[#1C1B1D]">
            <div className="border border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
              {countdown.hours}
            </div>
            <p className="text-xs hidden xl:block">Hours</p>
            <p className="xl:hidden block text-xs">Hrs</p>
          </div>
          <div className="text-center text-[#1C1B1D]">
            <div className="border border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
              {countdown.minutes}
            </div>
            <p className="text-xs hidden xl:block">Minutes</p>
            <p className="text-xs xl:hidden block">Min</p>
          </div>
          <div className="text-center text-[#1C1B1D]">
            <div className="border border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
              {countdown.seconds}
            </div>
            <p className="text-xs hidden xl:block">Seconds</p>
            <p className="text-xs xl:hidden block">Sec</p>
          </div>
          <div className="text-center text-[#1C1B1D]">
            <div className="border border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
              {countdown.milliseconds}
            </div>
            <p className="text-xs hidden xl:block">Mili Seconds</p>
            <p className="text-xs xl:hidden block">Mili Sec</p>
          </div>
        </div>
      </div>

      {/* Right Column - Tournament Info */}

      <div className="xl:border-l pt-5 xl:pt-10 pb-5 xl:pb-12 px-5 sm:px-7 relative">
        <Button className="xl:block hidden absolute top-8 xl:top-5 right-5 w-10 xl:w-12 h-10 xl:h-12 bg-[#F5F5F5] hover:bg-gray-100 rounded-full">
          <Heart className="w-4 xl:w-6 h-4 xl:h-6 text-[#A5A5A5] " />
        </Button>
        {/* Tournament Badge */}
        <div className="mb-3">
          <h2 className="text-card-foreground font-semibold text-xs sm:text-sm xl:text-normal">
            Tournament ID :
            <span className="text-primary"> 1234567890</span>
          </h2>
        </div>
        <div className="inline-block bg-primary text-white text-xs xl:text-sm px-2 sm:px-3 py-1 rounded-full ">
          Bargain or Discount Tournament
        </div>

        {/* Product Title */}
        <p className="text-lg xl:text-2xl font-semibold mt-2 text-[#2F190D]">{title}</p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex text-primary text-lg xl:text-2xl">
            {"★".repeat(rating)}
          </div>
          <span className="text-sm text-gray-500">({reviews})</span>
        </div>

        {/* Game Info */}
        {/* <div className="flex 2xl:flex-row flex-col 2xl:items-center justify-start gap-2 2xl:gap-12 mt-2 xl:mt-5"> */}
        <div className="flex flex-wrap 2xl:items-center justify-between gap-2 mt-2 xl:mt-5">
          <div className="flex items-center justify-start gap-2 w-max">
            <div className="w-12 xl:w-16 h-12 xl:h-16 bg-[#FFFFFF] rounded-full flex items-center justify-center drop-shadow-lg">
              <Image className="" src={gameIcon} alt="Game Icon" width={40} height={37} />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="text-lg xl:text-lg font-bold">Game:</p>
                <p className="text-primary text-lg xl:text-lg font-bold">{gameName}</p>
              </div>
              <div className="flex w-max items-center gap-1 text-card-foreground ">
                <p className="text-sm">Duration:</p>
                <p className="text-sm">{duration}</p>
              </div>
            </div>
          </div>
          {/* <div className="flex w-max xl:w-full justify-start xl:flex-col xl:gap-0 gap-3 xl:w-max"> */}
          <div className="flex w-max justify-start items-center xl:flex-col xl:gap-0 gap-3 ">
            <p className="text-sm sm:text-lg"> Participants</p>
            <p className="text-sm sm:text-normal">0 To 200</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-5">
          {/* <div className="flex xl:flex-row flex-col justify-between w-full xl:items-center gap-2"> */}
          <div className="flex flex-wrap justify-between w-full xl:items-center gap-2">
            {/* Price Info */}
            <div >
              <div className="flex items-center gap-1">
                <p className="text-card-foreground text-lg font-semibold">
                  Current price:
                </p>
                <p className="text-primary text-xl font-bold">
                  {currentPrice}€
                </p>
              </div>
              <p className="text-xs sm:text-sm text-card-foreground">
                incl. 19% VAT, plus shipping costs
              </p>
            </div>

            {/* Participation Fee */}
            <div className="flex items-center justify-between">
              {/* <div className=""> */}
              <div className="flex items-center xl:flex-col gap-4 xl:gap-0 xl:justify-center">
                <p className="text-sm sm:text-lg text-card-foreground font-normal">
                  Participation fee:
                </p>
                <p className="text-card-foreground font-normal text-sm xl:text-normal">
                  {participationPoints} points / {participationFee}€
                </p>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-wrap 3xl:gap-0 gap-4 items-start xl:items-center justify-between">
          <div className="flex items-center gap-2">
            <Button className="gradient-primary text-sm hover:gradient-primary/90 text-white rounded-full px-6 py-1 drop-shadow-lg max-h-[27px]">
              <Link href="/tournament-detail">To The Tournament</Link>
            </Button>
            <div className="bg-orange-200 rounded-full h-6 w-6 flex items-center justify-center">
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.02709 0.949951C3.03829 0.949951 2.09 1.34275 1.39081 2.04193C0.691626 2.74112 0.298828 3.68942 0.298828 4.67821C0.298828 4.87597 0.377388 5.06563 0.517225 5.20547C0.657062 5.3453 0.846721 5.42386 1.04448 5.42386C1.24224 5.42386 1.4319 5.3453 1.57174 5.20547C1.71157 5.06563 1.79013 4.87597 1.79013 4.67821C1.79013 3.44192 2.7908 2.44126 4.02709 2.44126C5.26338 2.44126 6.26405 3.44192 6.26405 4.67821C6.26405 5.28666 6.11566 5.64309 5.93745 5.89288C5.74209 6.16504 5.47142 6.36861 5.09635 6.62735L5.00986 6.68551C4.67655 6.91368 4.24706 7.20672 3.9145 7.61534C3.52154 8.09852 3.28144 8.70921 3.28144 9.52495V9.89778C3.28144 10.0955 3.36 10.2852 3.49983 10.425C3.63967 10.5649 3.82933 10.6434 4.02709 10.6434C4.22485 10.6434 4.41451 10.5649 4.55435 10.425C4.69418 10.2852 4.77274 10.0955 4.77274 9.89778V9.52495C4.77274 9.0358 4.90547 8.7614 5.071 8.55635C5.26263 8.32221 5.52063 8.14475 5.90166 7.88303L5.94118 7.85544C6.31102 7.60191 6.786 7.26935 7.14914 6.76082C7.53166 6.22991 7.75535 5.56032 7.75535 4.67821C7.75535 3.68942 7.36255 2.74112 6.66337 2.04193C5.96418 1.34275 5.01589 0.949951 4.02709 0.949951ZM4.02709 13.8125C4.27429 13.8125 4.51136 13.7143 4.68616 13.5395C4.86096 13.3647 4.95915 13.1276 4.95915 12.8804C4.95915 12.6332 4.86096 12.3961 4.68616 12.2213C4.51136 12.0465 4.27429 11.9483 4.02709 11.9483C3.77989 11.9483 3.54282 12.0465 3.36802 12.2213C3.19322 12.3961 3.09502 12.6332 3.09502 12.8804C3.09502 13.1276 3.19322 13.3647 3.36802 13.5395C3.54282 13.7143 3.77989 13.8125 4.02709 13.8125Z"
                  fill="#F37835"
                />
              </svg>
            </div>
          </div>
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
