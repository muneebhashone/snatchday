"use client";
import React, { useState } from "react";
import heroImage from "@/app/images/hero-bg.png";
import Image from "next/image";
import one from "@/app/images/one.svg";
import crown from "@/app/images/crown.png";
import three from "@/app/images/three.svg";
import four from "@/app/images/four.svg";
import five from "@/app/images/five.svg";
import six from "@/app/images/six.svg";
import iphone from "@/app/images/iphone1.png";
import PermotionalSection from "./PermotionalSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import graphiccard from "@/app/images/graphiccard.png";
import laptop2 from "@/app/images/promoitonModalImage.png";
import imgbottom from "@/app/images/imagebottom.png";
import { LiveIcon } from "../icons/icon";
import laptop from "@/app/images/detailimage.png";
import { motion, AnimatePresence } from "framer-motion"; // Corrected import from "motion/react" to "framer-motion"
import { Swiper as SwiperType } from "swiper";

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
    rating: 5,
    reviews: 123,
    gameIcon: graphiccard,
    gameName: "Push It",
    participationPoints: 250,
    currentPriceValue: 535.0,
    countdown: {
      days: 19,
      hours: 20,
      minutes: 48,
      seconds: 37,
    },
    status: "pending",
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
    image: laptop,
    alt: "Laptop",
    rating: 5, // Changed alt text to "Laptop" for clarity
    reviews: 123,
    gameIcon: graphiccard,
    gameName: "Push It",
    participationPoints: 250,
    currentPriceValue: 535.0,
    countdown: {
      days: 21,
      hours: 20,
      minutes: 48,
      seconds: 37,
    },
    status: "pending",
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
    image: laptop2,
    alt: "Laptop Promotion", // Changed alt text for clarity
    rating: 5,
    reviews: 123,
    gameIcon: graphiccard,
    gameName: "Push It",
    participationPoints: 250,
    currentPriceValue: 535.0,
    countdown: {
      days: 23,
      hours: 20,
      minutes: 48,
      seconds: 37,
    },
    status: "live",
  },
];

const HeroSection = () => {
  const [, setActiveIndex] = useState(0);
  const [key, setKey] = useState(0);

  // Handle slide change
  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
    setKey((prev) => prev + 1);
  };

  const images = [
    { src: one, alt: "Featured product one" },
    { src: crown, alt: "Featured product two" },
    { src: three, alt: "Featured product three" },
    { src: four, alt: "Featured product four" },
    { src: five, alt: "Featured product five" },
    { src: six, alt: "Featured product six" },
  ];

  // Text animation variants (from left)
  const textVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        type: "spring",
        delay: 0.5,
      },
    },
  };

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
      <div className="container h-full mx-auto relative z-10">
        <Swiper
          effect="fade"
          grabCursor={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          className="h-full"
          onSlideChange={handleSlideChange}
        >
          {tournaments.map((tournament, index) => (
            <SwiperSlide key={index}>
              <div className="mt-20 grid grid-cols-1 lg:grid-cols-7 items-center">
                {/* Left Content */}
                <div className="col-span-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={key}
                      className="pt-5 xl:pt-10 pb-5 xl:pb-12 px-5 sm:px-7 relative"
                      initial="hidden"
                      animate="visible"
                      variants={textVariants}
                    >
                      {/* Tournament Badge */}
                      <div className="mb-3 flex items-center">
                        <h2 className="text-card-foreground font-semibold text-xs sm:text-sm xl:text-2xl">
                          Tournament ID :
                          <span className="text-primary"> 1234567890</span>
                        </h2>
                      </div>
                      <div className="flex gap-2 items-center text-red-600">
                        <div className="inline-block bg-primary text-white text-xs xl:text-xl px-2 sm:px-3 py-1 rounded-full ">
                          {tournament.title}
                        </div>
                        <div className="flex items-center text-lg font-bold">
                          {tournament.status === "live" ? (
                            <div className="flex flex-col text-xs items-center justify-center leading-[3px]">
                              <LiveIcon />
                              Live
                            </div>
                          ) : (
                            <Image
                              src={crown}
                              alt="crown"
                              width={40}
                              height={40}
                            />
                          )}
                        </div>
                      </div>

                      {/* Product Title */}
                      <p className="text-lg xl:text-6xl font-extrabold text-[#2F190D] mt-6">
                        {tournament.productName}
                      </p>

                      {/* Game Info */}
                      <div className="flex flex-col justify-center gap-2 mt-2 xl:mt-5">
                        <div className="flex items-center justify-start gap-2 w-max">
                          <div className="w-12 xl:w-24 h-12 xl:h-24 bg-[#FFFFFF] rounded-full flex items-center justify-center drop-shadow-lg">
                            <Image
                              className=""
                              src={tournament.gameIcon}
                              alt="Game Icon"
                              width={70}
                              height={65}
                            />
                          </div>
                          <div className="">
                            <div className="flex items-center gap-1">
                              <p className="text-lg xl:text-xl font-bold">
                                Game:
                              </p>
                              <p className="text-primary text-lg xl:text-xl font-bold">
                                {tournament.gameName}
                              </p>
                            </div>
                            <div className="flex w-max items-center gap-1 text-card-foreground ">
                              <p className="text-lg font-semibold">Duration:</p>
                              <p className="text-lg font-semibold">
                                {tournament.duration}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-sm sm:text-2xl font-bold">
                            {" "}
                            Participants:
                          </p>
                          <p className="text-sm sm:text-xl text-primary font-semibold">
                            {tournament.participants}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex flex-col w-full gap-2">
                          {/* Price Info */}
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-card-foreground text-2xl font-semibold">
                                Current price:
                              </p>
                              <p className="text-2xl font-medium text-primary">
                                {tournament.currentPriceValue}€
                              </p>
                            </div>
                            <p className="text-xs sm:text-lg mt-4 text-card-foreground">
                              incl. 19% VAT, plus shipping costs
                            </p>
                          </div>

                          {/* Participation Fee */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 xl:justify-center">
                              <p className="text-sm sm:text-2xl text-card-foreground font-bold">
                                Participation fee:
                              </p>
                              <p className="text-card-foreground font-medium text-xl">
                                {tournament.participationPoints} points /{" "}
                                {tournament.participationFee}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap 3xl:gap-0 gap-4 items-start xl:items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button className="mt-6 gradient-primary text-lg font-bold hover:gradient-primary/90 text-white rounded-full px-6 py-1 drop-shadow-lg w-[244px] h-[57px]">
                            <Link href="/tournament-detail">
                              To The Tournament
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right Content - Product Image with Animation */}
                <div className="col-span-3">
                  <div className="">
                    <Image
                      src={imgbottom}
                      alt="Bottom Image"
                      className="relative"
                    />{" "}
                    {/* Added alt text for accessibility */}
                    <Image
                      src={tournament.image}
                      alt={tournament.alt}
                      width={525}
                      height={500}
                      className="lg:w-full lg:h-[400px] object-contain absolute top-44 left-[29%]"
                      priority
                      unoptimized
                    />
                  </div>
                  <div className="flex items-center justify-center 2xl:gap-1 gap-2 mt-3 xl:mt-12">
                    <div className="text-center text-[#1C1B1D]">
                      <div className="border bg-white border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
                        {tournament.countdown.days}
                      </div>
                      <p className="text-xs hidden xl:block">Days</p>
                      <p className="xl:hidden block text-xs">Dys</p>
                    </div>
                    <div className="text-center text-[#1C1B1D]">
                      <div className="border bg-white border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
                        {tournament.countdown.hours}
                      </div>
                      <p className="text-xs hidden xl:block">Hours</p>
                      <p className="xl:hidden block text-xs">Hrs</p>
                    </div>
                    <div className="text-center text-[#1C1B1D]">
                      <div className="border bg-white border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
                        {tournament.countdown.minutes}
                      </div>
                      <p className="text-xs hidden xl:block">Minutes</p>
                      <p className="text-xs xl:hidden block">Min</p>
                    </div>
                    <div className="text-center text-[#1C1B1D]">
                      <div className="border bg-white border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
                        {tournament.countdown.seconds}
                      </div>
                      <p className="text-xs hidden xl:block">Seconds</p>
                      <p className="text-xs xl:hidden block">Sec</p>
                    </div>
                  </div>
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
