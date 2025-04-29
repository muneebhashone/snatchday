"use client";
import React, { useState, useEffect } from "react";
import heroImage from "@/app/images/hero-bg.png";
import Image from "next/image";
import one from "@/app/images/one.svg";
import crown from "@/app/images/crown.png";
import three from "@/app/images/three.svg";
import four from "@/app/images/four.svg";
import five from "@/app/images/five.svg";
import six from "@/app/images/six.svg";
import PermotionalSection from "./PermotionalSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import graphiccard from "@/app/images/graphiccard.png";
import imgbottom from "@/app/images/imagebottom.png";
import { LiveIcon } from "../icons/icon";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper as SwiperType } from "swiper";
import { useUpComingTournament } from "@/hooks/api";
import CountdownDisplay from "../CountdownProps";
import { calculateCountdown } from "@/lib/utils";
import { Loader2, User } from "lucide-react";
import UserIcon from "@/app/images/R.png";

interface HeroSectionProps {
  upComingTournament: any;
}

const HeroSection = () => {
  const [, setActiveIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { data: upComingTournament, isLoading: isUpComingTournamentLoading } =
    useUpComingTournament();

  console.log(upComingTournament, "upComingTournament");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  upComingTournament?.data?.map((tournament) => {
    console.log(new Date(tournament?.start) < new Date(), "tournament");
  });

  // console.log(upComingTournament,"upComingTournament")

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
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.2,
      },
    },
  };

  // Enhanced page entrance animation
  const pageEntranceVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  // Staggered text animation for children elements
  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const staggerItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.4,
      },
    },
  };

  // Reveal animation for the product image
  const revealVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };

  // Grid cell reveal animation
  const cellRevealVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Grid effect animation for images
  const gridImageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  // Grid cells animation
  const gridCellVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  // Simple fade-in animation for product image
  const fadeInVariants = {
    hidden: {
      y: -50,
      opacity: 0,
      scale: 0.95,
      filter: "blur(8px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return isUpComingTournamentLoading ? (
    <div className="my-40  flex items-center justify-center">
      <Loader2 className="animate-spin size-18" />
    </div>
  ) : (
    <motion.section
      className="min-h-screen w-full relative bg-white pt-28 lg:pt-20 p-10"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={pageEntranceVariants}
    >
      {/* Background Image with animation */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={heroImage}
          alt="hero-image"
          width={1920}
          height={969}
          priority
          className="object-cover absolute inset-0 w-full h-[130vh] grayscale"
        />
      </motion.div>

      {/* Floating Images */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full">
          {images?.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.8 + index * 0.1,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              className={`absolute ${getRandomPosition(index)}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={63}
                height={63}
                className="transform hover:scale-105 transition-transform duration-300 hidden md:block animate-float"
              />
            </motion.div>
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
          {upComingTournament?.data?.map((tournament, index) => {
            const countdown = calculateCountdown(tournament.start);
            const endDate = calculateCountdown(tournament.end);

            return (
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
                        variants={staggerContainerVariants}
                      >
                        {/* Tournament Badge */}
                        <motion.div
                          variants={staggerItemVariants}
                          className="mb-3 flex items-center"
                        >
                          <h2 className="text-card-foreground font-semibold text-xs sm:text-sm xl:text-2xl">
                            Tournament ID :
                            <span className="text-primary">
                              {tournament.tournamentId}
                            </span>
                          </h2>
                          {new Date(tournament?.start) < new Date() ? (
                            // <div className="flex flex-col text-xs items-center justify-center leading-[3px]">
                            //   <LiveIcon />
                            //   Live
                            // </div>
                            <span className="text-green-500 font-bold ml-4 bg-green-500/20 px-2 rounded-full">
                              LIVE
                            </span>
                          ) : (
                            <span className="text-red-500 font-bold ml-4 bg-red-500/20 px-2 rounded-full">
                              UPCOMING
                            </span>
                          )}
                        </motion.div>
                        <motion.div
                          variants={staggerItemVariants}
                          className="flex gap-2 items-center text-red-600"
                        >
                          <div className="inline-block bg-primary text-white text-xs xl:text-xl px-2 sm:px-3 py-1 rounded-full ">
                            {/* {tournament?.title} */}
                            Bargain or Discount Tournament
                          </div>
                          <div className="flex items-center text-lg font-bold">
                            {tournament?.vip === true ? (
                              <Image
                                src={crown}
                                alt="crown"
                                width={40}
                                height={40}
                              />
                            ) : (
                              <Image
                                src={UserIcon}
                                alt="User"
                                width={40}
                                height={40}
                              />
                            )}
                          </div>
                        </motion.div>

                        {/* Product Title */}
                        <motion.p
                          variants={staggerItemVariants}
                          className="text-lg xl:text-6xl font-extrabold text-[#2F190D] mt-6"
                        >
                          {tournament?.name}
                        </motion.p>

                        {/* Game Info */}
                        <motion.div
                          variants={staggerItemVariants}
                          className="flex flex-col justify-center gap-2 mt-2 xl:mt-5"
                        >
                          <div className="flex items-center justify-start gap-2 w-max">
                            <div className="w-12 xl:w-24 h-12 xl:h-24 bg-[#FFFFFF] rounded-full flex items-center justify-center drop-shadow-lg">
                              <Image
                                className=""
                                src={tournament?.game?.image}
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
                                  {tournament?.game?.title}
                                </p>
                              </div>
                              <div className="flex w-max items-center gap-1 text-card-foreground ">
                                <p className="text-lg font-semibold">
                                  Duration:
                                </p>
                                <p className="text-lg font-semibold">
                                  {tournament.length + " minutes"}
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
                              {`0 to ${tournament.numberOfParticipants}`}
                            </p>
                          </div>
                        </motion.div>

                        <motion.div
                          variants={staggerItemVariants}
                          className="flex items-center justify-between mt-2"
                        >
                          <div className="flex flex-col w-full gap-2">
                            {/* Price Info */}
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-card-foreground text-2xl font-semibold">
                                  Current price:
                                </p>
                                <p className="text-2xl font-medium text-primary">
                                  {tournament.startingPrice}€
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
                                  {tournament.fee} points /{" "}
                                  {(tournament.fee * 0.01).toFixed(2)}€
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                        <motion.div
                          variants={staggerItemVariants}
                          className="flex flex-wrap 3xl:gap-0 gap-4 items-start xl:items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Button className="mt-6 gradient-primary text-lg font-bold hover:gradient-primary/90 text-white rounded-full px-6 py-1 drop-shadow-lg w-[244px] h-[57px]">
                              <Link
                                href={`/tournament-detail?id=${tournament._id}`}
                              >
                                To The Tournament
                              </Link>
                            </Button>
                          </div>
                        </motion.div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Right Content - Product Image with Animation */}
                  <div className="col-span-3 relative">
                    <div className="w-full">
                      <Image
                        src={imgbottom}
                        alt="Bottom Image"
                        className="w-full h-auto"
                        priority
                      />
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={key}
                        initial="hidden"
                        animate="visible"
                        variants={fadeInVariants}
                        className="absolute top-20 left-[0%] w-full h-[400px]"
                      >
                        <Image
                          src={tournament.image}
                          alt={tournament.alt}
                          width={525}
                          height={500}
                          className="w-full h-full object-contain"
                          priority
                          unoptimized
                        />
                      </motion.div>
                    </AnimatePresence>
                    <CountdownDisplay countdown={countdown} endDate={endDate} />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <PermotionalSection />
    </motion.section>
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
