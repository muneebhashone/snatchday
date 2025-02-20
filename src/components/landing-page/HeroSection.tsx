import React from "react";
import heroImage from "@/app/images/hero-bg.png";
import Image from "next/image";
import one from "@/app/images/one.svg";
import crown from "@/app/images/crown.png";
import three from "@/app/images/three.svg";
import four from "@/app/images/four.svg";
import five from "@/app/images/five.svg";
import six from "@/app/images/six.svg";

import eight from "@/app/images/eight.svg";
import nine from "@/app/images/nine.svg";
import PrimaryHeading from "../PrimaryHeading";
import GredientButton from "../GredientButton";
import iphone from "@/app/images/iphone.png";
import PermotionalSection from "./PermotionalSection";

const HeroSection = () => {
  const images = [
    { src: one, alt: "Featured product one" },
    { src: crown, alt: "Featured product two" },
    { src: three, alt: "Featured product three" },
    { src: four, alt: "Featured product four" },
    { src: five, alt: "Featured product five" },
    { src: six, alt: "Featured product six" },
    { src: eight, alt: "Featured product eight" },
    { src: nine, alt: "Featured product nine" },
  ];

  return (
    <section className="min-h-screen w-full relative bg-white pt-28 lg:pt-20 p-10">
      {/* Background Image */}
      <Image
        src={heroImage}
        alt="hero-image"
        width={1920}
        height={969}
        priority
        className="object-cover absolute inset-0 w-full h-[130vh] grayscale"
      />

      {/* Floating Images */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              width={63}
              height={63}
              className={`
                transform hover:scale-105 transition-transform duration-300 
                absolute animate-float hidden md:block
                ${getRandomPosition(index)}
              `}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-[1600px] mx-auto relative z-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-7 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left pt-8 lg:pt-0 col-span-4">
            <PrimaryHeading
              highlightText="Discover"
              remainingText="the new way of "
              remainingHeading="Online Shopping"
            />
            <p className="text-card-foreground text-base lg:text-xl mt-4 lg:mt-6 max-w-xl mx-auto lg:mx-0">
              Unsere Vision für Snatch Day war lange Zeit in unseren Köpfen
              gereift, denn wir sind kein gewöhnlicher Onlineshop.
            </p>
            <div className="mt-6 lg:mt-10 lg:mb-0 mb-10 ">
              <GredientButton buttonText="Join Tournament" />
            </div>
          </div>

          {/* Right Content */}
          {/* <div className="flex justify-center lg:justify-end mt-8 lg:mt-0"> */}
          <div className="flex xl:w-[826px] xl:h-[856px] relative col-span-3 lg:-ml-20">
            <Image
              src={iphone}
              alt="hero-image"
              width={525}
              height={545}
              className="lg:w-full lg:h-full object-cover"
              priority
            />
          </div>
          {/* </div> */}
        </div>
      </div>
      <PermotionalSection />
    </section>
  );
};

// Helper function to get random positions
const getRandomPosition = (index: number) => {
  const positions = [
    "left-[5%] top-[30%]",
    "right-[8%] top-[8%]",
    "left-[40%] top-[40%]",
    "left-[20%] top-[50%]",
    "right-[55%] top-[10%]",
    "left-[30%] top-[10%]",
    "left-[50%] top-[50%]",
    "left-[0%] top-[8%]",
  ];
  return positions[index % positions.length];
};

export default HeroSection;

// Add this to your global CSS file (e.g., globals.css)
/*
@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(10px, -10px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
*/
