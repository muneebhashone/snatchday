"use client";
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
import { useUpComingTournament } from "@/hooks/api";

const Page = () => {
  const { data: nextTournament } = useUpComingTournament();

  return (
    <ClientLayout>
      <div className="mt-10">
        <SecondaryHeroSection
          title="Next tournaments"
          rightimage={tournamenttrophy}
          bg={headerbg}
        />

        <div className="container mx-auto max-w-[1920px] py-10 md:py-20 px-12">
          {/* Top Bar */}
          <div className="flex md:flex-row flex-col items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <Button className="gradient-primary text-white rounded-full px-4 sm:px-6 py-1 sm:py-2">
                ONLY WEEKLY TOURNAMENTS
              </Button>
              <p className="text-gray-600">Showing WEEKLY tournaments</p>
            </div>
            <div className="flex items-center gap-4">
              <select className="h-12 px-2 sm:px-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary">
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
          <div className="py-5 sm:py-10 md:py-20 rounded-3xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {nextTournament?.data?.map((tournament, index) => (
              <NextTournamentCard key={index} {...tournament} />
            ))}
          </div>
        </div>

        <div className="pb-60 pt-10">
          <TrainingCenter />
        </div>
      </div>
    </ClientLayout>
  );
};

export default Page;
