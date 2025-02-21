"use client";
import React from "react";
import heroImage from "@/app/images/hero-bg.png";
import Image from "next/image";
import one from "@/app/images/one.svg";
import crown from "@/app/images/crown.png";
import three from "@/app/images/three.svg";
import four from "@/app/images/four.svg";
import five from "@/app/images/five.svg";
import six from "@/app/images/six.svg";
import iphone from "@/app/images/iphone.png";
import PermotionalSection from "./PermotionalSection";
import PrimaryHeading from "../PrimaryHeading";
import GredientButton from "../GredientButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCards, EffectFade, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const tournaments = [
  {
    title: "Bargain or Discount Tournament",
    productName: "Acer Aspire 3 A315-35 - Intel Pentium Silver N6000",
    startDate: "21.02.2025 at 18:31",
    checkoutTime: "18:21",
    game: "Push It",
    duration: "3:00 minutes",
    rrp: "535,00€",
    currentPrice: "535,00€ incl. 19% VAT, plus shipping",
    priceDrop: "5.00€",
    participationFee: "250 Snap Points / 2.50€",
    participants: "0 of 200",
    image: iphone,
    alt: "iPhone",
  },
  {
    title: "Bargain or Discount Tournament",
    productName: "Acer Aspire 3 A315-35 - Intel Pentium Silver N6000",
    startDate: "21.02.2025 at 18:31",
    checkoutTime: "18:21",
    game: "Push It",
    duration: "3:00 minutes",
    rrp: "535,00€",
    currentPrice: "535,00€ incl. 19% VAT, plus shipping",
    priceDrop: "5.00€",
    participationFee: "250 Snap Points / 2.50€",
    participants: "0 of 200",
    image: iphone,
    alt: "iPhone",
  },
  {
    title: "Bargain Tournament",
    productName: "Acer Aspire 3 A315-35 - Intel Pentium Silver N6000",
    startDate: "21.02.2025 at 18:31",
    checkoutTime: "18:21",
    game: "Push It",
    duration: "3:00 minutes",
    rrp: "535,00€",
    currentPrice: "535,00€ incl. 19% VAT, plus shipping",
    priceDrop: "5.00€",
    participationFee: "250 Snap Points / 2.50€",
    participants: "0 of 200",
    image: iphone,
    alt: "iPhone",
  },
  // Add more tournament objects as needed
];

const HeroSection = () => {
  const images = [
    { src: one, alt: "Featured product one" },
    { src: crown, alt: "Featured product two" },
    { src: three, alt: "Featured product three" },
    { src: four, alt: "Featured product four" },
    { src: five, alt: "Featured product five" },
    { src: six, alt: "Featured product six" },
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
      <div className="container max-w-[1600px] mx-auto relative z-10">
        <Swiper
          // navigation
          effect="creative"
          creativeEffect={{
            prev: {
              translate: [0, 0, -400],
              scale: 0.5,
              opacity: 0
            },
            next: {
              translate: ["100%", 0, 0],
              scale: 0.5,
              opacity: 0
            }
          }}
          grabCursor={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          modules={[Navigation, Pagination, Autoplay, EffectCreative]}
          className="h-full"
        >
          {tournaments.map((tournament, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-1 lg:grid-cols-7 items-center">
                {/* Left Content */}
                <div className="text-center lg:text-left pt-8 lg:pt-0 col-span-4">
                  <div className="mt-6 lg:mt-10 lg:mb-0 mb-10">
                    <h2 className="text-2xl font-bold bg-primary text-white px-4 py-2 rounded-full w-max mb-5">
                      {tournament.title}
                    </h2>
                    <h3 className="text-6xl font-extrabold mb-5">
                      {tournament.productName}
                    </h3>
                    <p className="text-lg font-medium text-card-foreground mb-1">
                      Tournament starts on{" "}
                      <span className="font-bold text-primary">
                        {tournament.startDate}
                      </span>{" "}
                      Check-out time:{" "}
                      <span className="font-bold text-primary">
                        {tournament.checkoutTime}
                      </span>
                    </p>
                    <p className="text-lg font-medium text-card-foreground mb-1">
                      Game:{" "}
                      <span className="font-bold text-primary">
                        {tournament.game}
                      </span>{" "}
                      Duration:{" "}
                      <span className="font-bold text-primary">
                        {tournament.duration}
                      </span>
                    </p>
                    <p className="text-lg font-medium text-card-foreground mb-1">
                      RRP:{" "}
                      <span className="font-bold text-primary">
                        {tournament.rrp}
                      </span>{" "}
                      Current price:{" "}
                      <span className="font-bold text-primary">
                        {tournament.currentPrice}
                      </span>
                    </p>
                    <p className="text-lg font-medium text-card-foreground mb-1">
                      For each additional participant the price drops by{" "}
                      <span className="font-bold text-primary">
                        {tournament.priceDrop}
                      </span>
                    </p>
                    <p className="text-lg font-medium text-card-foreground mb-1">
                      Participation fee:{" "}
                      <span className="font-bold text-primary">
                        {tournament.participationFee}
                      </span>
                    </p>
                    <p className="text-lg font-medium text-card-foreground mb-5">
                      Participants:{" "}
                      <span className="font-bold text-primary">
                        {tournament.participants}
                      </span>
                    </p>
                    <GredientButton buttonText="TO THE TOURNAMENT" />
                  </div>
                </div>

                {/* Right Content - Swiper Slider */}
                <div className="col-span-3 lg:-ml-20">
                  <Image
                    src={tournament.image}
                    alt={tournament.alt}
                    width={525}
                    height={545}
                    className="lg:w-full lg:h-full object-cover"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
