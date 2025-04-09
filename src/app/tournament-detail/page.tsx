"use client";
import ClientLayout from "@/components/landing-page/ClientLayout";
import TrainingCenter from "@/components/landing-page/TrainingCenter";

import TournamentDetailHero from "@/components/TournamentDetailHero";

import React from "react";
import bg from "@/app/images/productDetailSecondSecBg.png";

import ProductDetailTheorySec from "@/components/ProductDetailTheorySec";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import NextTournamentCard from "@/components/NextTournamentCard";
import laptop from "@/app/images/laptopv1.png";
import laptop2 from "@/app/images/laptopv2.png";

import graphiccard from "@/app/images/graphiccard.png";
import FeaturedProductsCard from "@/components/FeaturedProductsCard";
import Image from "next/image";
import image2 from "@/app/images/traingame.png";
import image from "@/app/images/choosetournament.png";
import image3 from "@/app/images/participateintournament.png";
import image4 from "@/app/images/win.png";
import { useSearchParams } from "next/navigation";
import {
  useCurrentOffers,
  useGetTournamentById,
  useUpComingTournament,
} from "@/hooks/api";
import { CurrentOfferResponse } from "@/types";
import { useUserContext } from "@/context/userContext";
import { Loader2 } from "lucide-react";

const TournamentDetailPage = () => {
  const id = useSearchParams().get("id");
  const { user } = useUserContext();
  const {
    data: tournament,
    isLoading,
    refetch: refetchTournament,
  } = useGetTournamentById(id);

  const { data: currentOffers, isLoading: isLoadingCurrentOffers } =
    useCurrentOffers();

  const offerproducts: CurrentOfferResponse = currentOffers?.data.products;

  const { data: tournaments, isLoading: isUpComingTournamentLoading } =
    useUpComingTournament();

  const hasParticipated = tournament?.data?.participants?.includes(
    user?.user?._id
  );

  const howToEnterSteps = [
    {
      subTitle: "choose tournament",
      description:
        "The power is in your hands, chose from our number of exciting prizes that catch your eye the most.",
      number: "01",
      image: image,
    },
    {
      subTitle: "train game",
      description:
        "Chose how many tickets you would like to enter. The more tickets you select the more chance you have of winning.",
      number: "02",
      image: image2,
    },
    {
      subTitle: "participate in tournament",
      description:
        "Answer the question with the correct answer to be entered in the competition.",
      number: "03",
      image: image3,
    },
    {
      subTitle: "win or redeem discount",
      description:
        "Answer the question with the correct answer to be entered in the competition.",
      number: "04",
      image: image4,
    },
  ];

  // Filter out current tournament and past tournaments
  const filteredNextTournaments = tournaments?.data?.filter(
    (nextTournament) => {
      return nextTournament._id !== id; // Add ID check
    }
  );

  return (
    <ClientLayout>
      <main className="mb-56 overflow-hidden">
        <div className="mt-[115px]">
          <TournamentDetailHero
            isLoading={isLoading}
            tournamentData={tournament}
            hasParticipated={hasParticipated}
            refetchTournament={refetchTournament}
          />
        </div>
        <div
          style={{ backgroundImage: `url(${bg.src})` }}
          className="bg-cover bg-center bg-[##f9f9f9] relative py-16 pb-20 h-max border-b"
        >
          {/* <ProductDetailTheorySec /> */}
        </div>
        {/* <div className="bg-cover bg-center relative h-[900px] w-[100%]">
          <Image
            className="absolute -top-[23px] right-0 z-[-1] w-[100%] object-contain"
            src={bg3}
            alt="bg3"
          />
          <ProductDetailSecFour />
        </div> */}
        <div className="px-0 md:px-20 m-20 max-w-[1600px] mx-auto">
          <h2 className="text-foreground flex flex-wrap items-center justify-center text-[24px] sm:text-[30px] lg:text-[48px] font-bold lg:font-extrabold text-center mb-12 md:mt-0 mt-3">
            How to Enter{" "}
            <span className="ml-2 bg-primary text-white px-1 sm:px-4 rounded-lg">
              Tournament
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-2 sm:gap-8 ">
            {howToEnterSteps.map((step, index) => (
              <div
                key={index}
                className="relative bg-white p-4 lg:py-8  lg:px-16 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-primary text-2xl lg:text-3xl font-bold mb-4 border-2 border-primary w-max p-1">
                  {step.number}
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-4 border-b mt-7 text-foreground capitalize">
                  {step.subTitle}
                </h3>
                <p className="text-card-foreground text-sm sm:text-lg w-[75%]">
                  {step.description}
                </p>
                <Image
                  unoptimized
                  className="absolute top-0 right-0 w-40 h-40 object-contain object-center"
                  src={step.image}
                  alt={step.subTitle}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="container max-w-[1920px] mx-auto py-10 px-10">
          <h2 className="text-[48px] font-extrabold text-center capitalize mb-10">
            <span className="bg-transparent mr-4">Next</span>
            <span className=" bg-[#FF6B3D] text-white px-4 py-1 rounded-lg">
              Tournaments
            </span>
          </h2>
          {isUpComingTournamentLoading ? (
            <div className="text-center text-gray-500 flex justify-center items-center h-full">
              <Loader2 className="w-10 h-10 animate-spin" />
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full relative"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {filteredNextTournaments?.map((tournament, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 md:pl-4 md:basis-1/2"
                  >
                    <NextTournamentCard
                      end={tournament.end}
                      id={tournament._id}
                      image={tournament.image}
                      title={tournament.title}
                      name={tournament.name}
                      game={tournament.game}
                      length={tournament.length}
                      startingPrice={tournament.startingPrice}
                      fee={tournament.fee}
                      start={tournament.start}
                      numberOfParticipants={tournament.numberOfParticipants}
                      status={tournament.status}
                      textForBanner={tournament.textForBanner}
                      tournamentId={"23456722"}
                      updatedAt={tournament.updatedAt}
                      vip={tournament.vip}
                      _id={tournament._id}
                      __v={tournament.__v}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="w-12 h-12 md:w-16 md:h-16 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary hover:text-white -left-8" />
              <CarouselNext className="w-12 h-12 md:w-16 md:h-16 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary hover:text-white -right-8" />
            </Carousel>
          )}
        </div>
        <div>
          <div className="px-4 md:px-12 py-20 bg-[#F9F9F9]">
            <div className="text-[48px] font-extrabold my-5 text-center capitalize">
              <h2>
                <span className="text-foreground mr-3">Current</span>
                <span className="bg-primary text-white px-6 py-1 rounded-lg">
                  Offers
                </span>
              </h2>
            </div>

            <div className="max-w-[1920px] mx-auto mt-10">
              {isLoadingCurrentOffers ? (
                <div className="text-center text-gray-500 flex justify-center items-center h-full">
                  <Loader2 className="w-10 h-10 animate-spin" />
                </div>
              ) : (
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                    skipSnaps: false,
                    slidesToScroll: 1,
                  }}
                  className="w-full relative"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {offerproducts?.map((product, index) => (
                      <CarouselItem
                        key={index}
                        className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
                      >
                        <FeaturedProductsCard {...product} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary hover:text-white transition-all duration-300" />
                  <CarouselNext className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary hover:text-white transition-all duration-300" />
                </Carousel>
              )}
            </div>
          </div>
        </div>
        <div className="p-20">
          <TrainingCenter />
        </div>
      </main>
    </ClientLayout>
  );
};

export default TournamentDetailPage;
