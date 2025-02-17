import ClientLayout from "@/components/landing-page/ClientLayout";
import SecondaryHeroSection from "@/components/SecondaryHeroSection";
import tournamenttrophy from "@/app/images/tournamenttrophy.png";

import React from "react";
import TrainingCenter from "@/components/landing-page/TrainingCenter";
import TournamentFilter from "@/components/tournaments/TournamentFilter";
import { Button } from "@/components/ui/button";
import NextTournamentCard from "@/components/NextTournamentCard";
import laptop from "@/app/images/laptopv1.png";
import laptop2 from "@/app/images/laptopv2.png";
import graphiccard from "@/app/images/graphiccard.png";
import headerbg from "@/app/images/tournamentbg.png";


const page = () => {
  const nextTournament = [
    {
      productImage: laptop,
      gameIcon: graphiccard,
      title: "Acer Aspi  re 3 A315-35- Intel Pentium Silver N6000",
      rating: 5,
      reviews: 5,
      gameName: "Push It",
      duration: "3:00 minutes",
      currentPrice: "2.50",
      participationPoints: 250,
      participationFee: "2.50",
      countdown: {
        hours: 20,
        minutes: 48,
        seconds: 37,
        milliseconds: 19,
      },
    },
    {
      productImage: laptop2,
      gameIcon: graphiccard,
      title: "Acer Aspi  re 3 A315-35- Intel Pentium Silver N6000",
      rating: 5,
      reviews: 5,
      gameName: "Push It",
      duration: "3:00 minutes",
      currentPrice: "2.50",
      participationPoints: 250,
      participationFee: "2.50",
      countdown: {
        hours: 20,
        minutes: 48,
        seconds: 37,
        milliseconds: 19,
      },
    },
    {
      productImage: laptop,
      gameIcon: graphiccard,
      title: "Acer Aspi  re 3 A315-35- Intel Pentium Silver N6000",
      rating: 5,
      reviews: 5,
      gameName: "Push It",
      duration: "3:00 minutes",
      currentPrice: "2.50",
      participationPoints: 250,
      participationFee: "2.50",
      countdown: {
        hours: 20,
        minutes: 48,
        seconds: 37,
        milliseconds: 19,
      },
    },
    {
      productImage: laptop2,
      gameIcon: graphiccard,
      title: "Acer Aspi  re 3 A315-35- Intel Pentium Silver N6000",
      rating: 5,
      reviews: 5,
      gameName: "Push It",
      duration: "3:00 minutes",
      currentPrice: "2.50",
      participationPoints: 250,
      participationFee: "2.50",
      countdown: {
        hours: 20,
        minutes: 48,
        seconds: 37,
        milliseconds: 19,
      },
    },
  ]


  return (
    <ClientLayout>
      <div className="mt-10">
        <SecondaryHeroSection
          title="Next tournaments"
          rightimage={tournamenttrophy}
          bg={headerbg}
        />

        <div className="container mx-auto max-w-[1920px] py-20 px-12">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button className="gradient-primary text-white rounded-full px-6 py-2">
                ONLY TODAY TOURNAMENTS
              </Button>
              <p className="text-gray-600">Showing 24 tournaments</p>
            </div>
            <div className="flex items-center gap-4">
              <select className="h-12 px-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Sort by: Latest</option>
                <option>Sort by: Price Low to High</option>
                <option>Sort by: Price High to Low</option>
                <option>Sort by: Most Popular</option>
              </select>
            </div>
          </div>

          {/* Filter Section */}
          <div className="mb-8">
            <TournamentFilter />
          </div>

          {/* Tournament Content */}
          <div className="py-20 rounded-3xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {/* <h2 className="text-[48px] font-extrabold text-center capitalize mb-10 col-span-2">
            <span className=" bg-[#FF6B3D] text-white px-4 py-1 rounded-lg">
              Next
            </span>

            <span className="bg-transparent ml-2">Tournaments</span>
          </h2> */}
            {nextTournament.map((tournament, index) => (
              <NextTournamentCard key={index} {...tournament} />
            ))}
            {/* <h3 className="text-3xl font-extrabold">
              No tournaments found in the next 24 HOURS
            </h3> */}
          </div>
        </div>

        <div className="pb-60 pt-10">
          <TrainingCenter />
        </div>
      </div>
    </ClientLayout>
  );
};

export default page;
