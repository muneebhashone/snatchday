import React from "react";
import heroImage from "@/app/images/hero-bg.png";
import Image from "next/image";
import one from "@/app/images/one.svg";
import two from "@/app/images/two.svg";
import three from "@/app/images/three.svg";
import four from "@/app/images/four.svg";
import five from "@/app/images/five.svg";
import six from "@/app/images/six.svg";
import eight from "@/app/images/eight.svg";
import nine from "@/app/images/nine.svg";
import PrimaryHeading from "../PrimaryHeading";
import GredientButton from "../GredientButton";
import iphone from "@/app/images/iphone.png";

const HeroSection = () => {
  const images = [
    { src: one, alt: "Featured product one" },
    { src: two, alt: "Featured product two" },
    { src: three, alt: "Featured product three" },
    { src: four, alt: "Featured product four" },
    { src: five, alt: "Featured product five" },
    { src: six, alt: "Featured product six" },
    { src: eight, alt: "Featured product eight" },
    { src: nine, alt: "Featured product nine" },
  ];

  return (
    <section className="min-h-screen w-full relative bg-white/80 pt-20 lg:pt-40">
      {/* Background Image */}
      <Image
        src={heroImage}
        alt="hero-image"
        width={1920}
        height={1080}
        priority
        className="object-cover opacity-50 absolute inset-0 w-full h-full"
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
      <div className="container max-w-[1600px] mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left pt-8 lg:pt-0">
            <PrimaryHeading
              highlightText="Discover"
              remainingText="the new way of "
              remainingHeading="Online Shopping"
            />
            <p className="text-card-foreground text-base lg:text-lg mt-4 lg:mt-6 max-w-xl mx-auto lg:mx-0">
              Unsere Vision für Snatch Day war lange Zeit in unseren Köpfen
              gereift, denn wir sind kein gewöhnlicher Onlineshop.
            </p>
            <div className="mt-6 lg:mt-10">
              <GredientButton buttonText="Join Tournament" />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative lg:w-full">
              <Image
                src={iphone}
                alt="hero-image"
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

// Helper function to get random positions
const getRandomPosition = (index: number) => {
  const positions = [
    "left-[10%] top-[20%]",
    "right-[5%] top-[15%]",
    "left-[40%] top-[60%]",
    "left-[20%] top-[70%]",
    "right-[30%] top-[40%]",
    "left-[30%] top-[30%]",
    "left-[60%] top-[70%]",
    "right-[10%] top-[65%]",
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
