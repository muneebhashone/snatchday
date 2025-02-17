import React from "react";
import GredientButton from "../GredientButton";
import PrimaryHeading from "../PrimaryHeading";
import Image from "next/image";
import registersectionimage from "@/app/images/registersectionimage.png";

const RegisterSection = () => {
  return (
    <section className="px-4 bg-[radial-gradient(ellipse_at_center,_#FDF9F7,_#F9F2EE)]">
      <div className="container max-w-[1920px] ml-auto pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-9 items-center">
          {/* Left Content */}
          <div className="col-span-5 pl-20 py-28">
            <PrimaryHeading
              highlightText="Discover"
              remainingText="The New Way Of "
              remainingHeading="Online Shopping"
            />
            <p className="text-card-foreground text-base lg:text-lg mt-4 lg:mt-6 max-w-xl mx-auto lg:mx-0">
              Unsere Vision für Snatch Day war lange Zeit in unseren Köpfen
              gereift, denn wir sind kein gewöhnlicher Onlineshop.
            </p>
            <p className="text-card-foreground text-base lg:text-lg mt-4 lg:mt-6 max-w-xl mx-auto lg:mx-0">
              Du hast genug davon, dem Zufall die Entscheidung zu überlassen,
              und möchtest dich nicht nur auf dein Glück verlassen?<span className="text-primary">Read More</span> 
            </p>
            <div className="my-10">
              <GredientButton buttonText="Register For Free" />
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="col-span-4 w-full h-full">
           
              <Image
                src={registersectionimage}
                alt="Register section image"
                className="w-full h-full object-cover"
                priority
              />
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
