import React from "react";
import GredientButton from "../GredientButton";
import PrimaryHeading from "../PrimaryHeading";
import Image from "next/image";
import registersectionimage from "@/app/images/registersectionimage.png";

const RegisterSection = () => {
  return (
    <section className="px-4 bg-[radial-gradient(ellipse_at_center,_#FDF9F7,_#F9F2EE)]">
      <div className="container max-w-[1920px] ml-auto">
        <div className="flex items-center justify-between">
          {/* Left Content */}
          <div className="w-[55%] h-full pl-40 pt-28 pb-10">
            <PrimaryHeading
              highlightText="Discover"
              remainingText="The New Way Of "
              remainingHeading="Online Shopping"
            />
            <p className="text-card-foreground text-[24px] mt-8 lg:mt-6 mx-auto lg:mx-0">
              Unsere Vision für Snatch Day war lange Zeit in unseren Köpfen
              gereift, denn wir sind kein gewöhnlicher Onlineshop.
            </p>
            <p className="text-card-foreground text-[24px] mt-8 mx-auto lg:mx-0">
              Du hast genug davon, dem Zufall die Entscheidung zu überlassen,
              und möchtest dich nicht nur auf dein Glück verlassen?
              <span className="text-primary">Read More</span>
            </p>
            <div className="mt-10">
              <GredientButton buttonText="Register For Free" />
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="w-[45%] h-full">
            <Image
              src={registersectionimage}
              alt="Register section image"
              width={700}
              height={1000}
              className="w-full h-[650px] object-cover ml-auto mt-16"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
