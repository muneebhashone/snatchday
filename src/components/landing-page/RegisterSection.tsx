import React from "react";
import GredientButton from "../GredientButton";
import PrimaryHeading from "../PrimaryHeading";
import Image from "next/image";
import registersectionimage from "@/app/images/registersectionimage.png";

const RegisterSection = () => {
  return (
    <section className="px-4 py-8 md:py-12 lg:py-16 bg-[#FDF9F7]">
      <div className="container max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <PrimaryHeading
              highlightText="Discover"
              remainingText="the new way of "
              remainingHeading="Online Shopping"
            />
            <p className="text-card-foreground text-base lg:text-lg mt-4 lg:mt-6 max-w-xl mx-auto lg:mx-0">
              Unsere Vision für Snatch Day war lange Zeit in unseren Köpfen
              gereift, denn wir sind kein gewöhnlicher Onlineshop.
            </p>
            <p className="text-card-foreground text-base lg:text-lg mt-4 lg:mt-6 max-w-xl mx-auto lg:mx-0">
              Du hast genug davon, dem Zufall die Entscheidung zu überlassen,
              und möchtest dich nicht nur auf dein Glück verlassen? Read More
            </p>
            <div className="mt-6 lg:mt-10">
              <GredientButton buttonText="Register For Free" />
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-[80%] lg:w-full">
              <Image
                src={registersectionimage}
                alt="Register section image"
                width={500}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
