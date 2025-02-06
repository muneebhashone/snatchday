import React from "react";
import GredientButton from "../GredientButton";
import PrimaryHeading from "../PrimaryHeading";
import Image from "next/image";
import registersectionimage from "@/app/images/registersectionimage.png";
const RegisterSection = () => {
  return (
    <section className="px-4 py-16 bg-[#FDF9F7]">
      <div className="relative grid grid-cols-2 gap-4 w-full h-full z-30 container max-w-8xl mx-auto">
        <div className="content-center">
          <PrimaryHeading
            highlightText="Discover"
            remainingText="the new way of "
            remainingHeading="Online Shopping"
          />
          <p className="text-card-foreground text-lg mt-6">
            Unsere Vision für Snatch Day war lange Zeit in unseren Köpfen
            gereift, denn wir sind kein gewöhnlicher Onlineshop.
          </p>
          <p className="text-card-foreground text-lg mt-6">
            Du hast genug davon, dem Zufall die Entscheidung zu überlassen, und
            möchtest dich nicht nur auf dein Glück verlassen? Read More
          </p>
          <div className="mt-10">
            <GredientButton buttonText="Register For Free" />
          </div>
        </div>
        <div className="content-center">
          <Image
            src={registersectionimage}
            alt="hero-image"
            width={500}
            height={500}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              objectPosition: "center",
              marginLeft: "auto",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
