"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import monthlybg from "@/app/images/monthlycompetition.png";
import monthlyimage from "@/app/images/monthlyimage.png";

const MonthlyTournament = () => {
  const tournament = {
    countdown: {
      days: 10,
      hours: 23,
      minutes: 59,
      seconds: 59,
    },
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="">
          <h2 className="py-2 px-6 text-3xl bg-primary text-white font-bold w-fit rounded-lg">
            Competition In &quot;January&quot;
          </h2>

          <h2 className="text-6xl font-extrabold mt-2 text-[#1C1B1D]">
            Hisense 32A4BG - 80 cm (32&quot;)
          </h2>
          <p className="text-card-foreground text-2xl mt-2">
            diagonal class LCD TV with LED backlight - (6942147474150)
          </p>
          <h2 className="text-3xl font-extrabold mt-4 text-[#1C1B1D]">
            201,65<span className="text-primary text-3xl">€</span>
          </h2>
          <Button className="mt-6 gradient-primary text-lg font-bold hover:gradient-primary/90 text-white rounded-full px-6 py-1 drop-shadow-lg w-[244px] h-[57px]">
            <Link href="/tournament-detail">Kostenlos Registrieren</Link>
          </Button>
          <p className="text-card-foreground text-lg mt-4">
            Participation fee 50 snap points /{" "}
            <span className="font-bold">0.50€</span>
          </p>

          <div className="flex items-center justify-start 2xl:gap-1 gap-2 mt-3 xl:mt-7">
            <div className="text-center text-[#1C1B1D]">
              <div className="border bg-white border-gray-200 text-[18px] xl:text-[30px] px-3 xl:px-7">
                {tournament.countdown.days}
              </div>
              <p className="text-xs hidden xl:block">Days</p>
              <p className="xl:hidden block text-xs">Dys</p>
            </div>
            <div className="text-center text-[#1C1B1D]">
              <div className="border bg-white border-gray-200 text-[18px] xl:text-[30px] px-3 xl:px-7">
                {tournament.countdown.hours}
              </div>
              <p className="text-xs hidden xl:block">Hours</p>
              <p className="xl:hidden block text-xs">Hrs</p>
            </div>
            <div className="text-center text-[#1C1B1D]">
              <div className="border bg-white border-gray-200 text-[18px] xl:text-[30px] px-3 xl:px-7">
                {tournament.countdown.minutes}
              </div>
              <p className="text-xs hidden xl:block">Minutes</p>
              <p className="text-xs xl:hidden block">Min</p>
            </div>
            <div className="text-center text-[#1C1B1D]">
              <div className="border bg-white border-gray-200 text-[18px] xl:text-[30px] px-3 xl:px-7">
                {tournament.countdown.seconds}
              </div>
              <p className="text-xs hidden xl:block">Seconds</p>
              <p className="text-xs xl:hidden block">Sec</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="relative">
            <div className="">
              <Image
                src={monthlybg}
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
                alt="Tournament Image"
              />
            </div>
            <div className="absolute top-20 -right-48 w-full h-full">
              <Image
                src={monthlyimage}
                width={500}
                height={500}
                alt="Tournament Image"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyTournament;
