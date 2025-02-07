import ClientLayout from "@/components/landing-page/ClientLayout";
import SecondaryHeroSection from "@/components/SecondaryHeroSection";
import tournamenttrophy from "@/app/images/tournamenttrophy.png";
import headerbg from "@/app/images/headerbg.png";
import React from "react";
import TrainingCenter from "@/components/landing-page/TrainingCenter";

const page = () => {
  return (
    <ClientLayout>
      <div>
        <SecondaryHeroSection
          title="Next tournaments"
          rightimage={tournamenttrophy}
          bg={headerbg}
        />

        <div className="container mx-auto max-w-[1920px] py-44 bg-[#F9F9F9] flex items-center justify-center">
          <h3 className="text-3xl font-bold">
            No tournaments found in the next 24 HOURS
          </h3>
        </div>
        <div className="pb-60">
          <TrainingCenter />
        </div>
      </div>

    </ClientLayout>

  );
};

export default page;
