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
    <section className="min-h-[100vh] container max-w-[1920px] mx-auto w-full relative bg-white/80">
      {/* Background Image */}
      <Image
        src={heroImage}
        alt="hero-image"
        width={1920}
        height={1080}
        priority
        className="object-cover opacity-50"
      />
      <div className="absolute top-0 left-0 right-0 bottom-0">
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
                absolute animate-float cursor-pointer
                ${getRandomPosition(index)}
              `}
            />
          ))}
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0">
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
            <div className="mt-10">
              <GredientButton buttonText="Join Tournament" />
            </div>
          </div>
          <div className="content-center">
            <Image
              src={iphone}
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
