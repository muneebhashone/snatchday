import ClientLayout from "@/components/landing-page/ClientLayout";
import SecondaryHeroSection from "@/components/SecondaryHeroSection";
import tournamenttrophy from "@/app/images/tournamenttrophy.png";
import headerbg from "@/app/images/headerbg.png";
import React from "react";
import TrainingCenter from "@/components/landing-page/TrainingCenter";
import TournamentFilter from "@/components/tournaments/TournamentFilter";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <ClientLayout>
      <div>
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
          <div className="bg-[#F9F9F9] py-20 rounded-3xl flex items-center justify-center text-center">
            <h3 className="text-3xl font-extrabold">
              No tournaments found in the next 24 HOURS
            </h3>
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
