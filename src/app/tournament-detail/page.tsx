import ClientLayout from "@/components/landing-page/ClientLayout";
import TrainingCenter from "@/components/landing-page/TrainingCenter";

import TournamentDetailHero from "@/components/TournamentDetailHero";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import bg from "@/app/images/productDetailSecondSecBg.png";
import bg3 from "@/app/images/productDetailSecThreeBg.png";
import ProductDetailSecFour from "@/components/ProductDetailSecFour";
import ProductDetailTheorySec from "@/components/ProductDetailTheorySec";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import NextTournamentCard from "@/components/NextTournamentCard";
import laptop from "@/app/images/laptopv1.png";
import laptop2 from "@/app/images/laptopv2.png";

import graphiccard from "@/app/images/graphiccard.png";

const page = () => {
    const nextTournaments = [
        {
          productImage: laptop,
          gameIcon: graphiccard,
          title: "Acer Aspi  re 3 A315-35- Intel Pentium Silver N6000",
          rating: 5,
          reviews: 5,
          gameName: "Push It",
          duration: "3:00 minutes",
          currentPrice: "2.50",
          participationPoints: 250,
          participationFee: "2.50",
          countdown: {
            hours: 20,
            minutes: 48,
            seconds: 37,
            milliseconds: 19,
          },
        },
        {
          productImage: laptop2,
          gameIcon: graphiccard,
          title: "Acer Aspi  re 3 A315-35- Intel Pentium Silver N6000",
          rating: 5,
          reviews: 5,
          gameName: "Push It",
          duration: "3:00 minutes",
          currentPrice: "2.50",
          participationPoints: 250,
          participationFee: "2.50",
          countdown: {
            hours: 20,
            minutes: 48,
            seconds: 37,
            milliseconds: 19,
          },
        },
        {
          productImage: laptop,
          gameIcon: graphiccard,
          title: "Acer Aspi  re 3 A315-35- Intel Pentium Silver N6000",
          rating: 5,
          reviews: 5,
          gameName: "Push It",
          duration: "3:00 minutes",
          currentPrice: "2.50",
          participationPoints: 250,
          participationFee: "2.50",
          countdown: {
            hours: 20,
            minutes: 48,
            seconds: 37,
            milliseconds: 19,
          },
        },
        {
            productImage: laptop2,
          gameIcon: graphiccard,
          title: "Acer Aspi  re 3 A315-35- Intel Pentium Silver N6000",
          rating: 5,
          reviews: 5,
          gameName: "Push It",
          duration: "3:00 minutes",
          currentPrice: "2.50",
          participationPoints: 250,
          participationFee: "2.50",
          countdown: {
            hours: 20,
            minutes: 48,
            seconds: 37,
            milliseconds: 19,
          },
        },
      ];
  return (
    <ClientLayout>
      <main className="mb-56">
        <div className="h-11 w-full mt-[115px] flex flex-col pb-1 text-sm">
          <Separator className="mb-5" />
          <Breadcrumb className="ml-10 pb-2 bg-white">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  Computer & Hardware Displays & Projectors
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  Acer B277 Dbmiprczx - LED monitor - 68.6 cm (27`) -
                  (4710886045649)
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Separator className="" />
        </div>
        <TournamentDetailHero />
        {/* <div className="relative py-16 h-[1113px] border-b">
          <Image className="absolute top-0 left-0 z-[-1] object-contain object-center opacity-100" alt="" src={bg} />
          <ProductDetailTheorySec />
        </div> */}
        <div
          style={{ backgroundImage: `url(${bg.src})` }}
          className="bg-cover bg-center relative py-16 pb-20 h-max border-b"
        >
          <ProductDetailTheorySec />
        </div>
        <div className="bg-cover bg-center relative h-[900px] w-[100%]">
          <Image
            className="absolute -top-[23px] right-0 z-[-1] w-[100%] object-contain"
            src={bg3}
            alt="bg3"
          />
          <ProductDetailSecFour />
        </div>
        {/* <div
          style={{ backgroundImage: `url(${bg3.src})` }}
          className="bg-cover bg-center relative h-[900px] z-100"
        >
          <ProductDetailSecFour/>
        </div> */}
         <div className="container max-w-[1920px] mx-auto py-20 px-10">
          <h2 className="text-[48px] font-extrabold text-center capitalize mb-10">
            <span className=" bg-[#FF6B3D] text-white px-4 py-1 rounded-lg">
              Next
            </span>

            <span className="bg-transparent ml-2">Tournaments</span>
          </h2>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {nextTournaments.map((tournament, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2">
                  <NextTournamentCard
                    productImage={tournament.productImage}
                    gameIcon={tournament.gameIcon}
                    title={tournament.title}
                    rating={tournament.rating}
                    reviews={tournament.reviews}
                    gameName={tournament.gameName}
                    duration={tournament.duration}
                    currentPrice={tournament.currentPrice}
                    participationPoints={tournament.participationPoints}
                    participationFee={tournament.participationFee}
                    countdown={tournament.countdown}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="w-12 h-12 md:w-16 md:h-16 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary hover:text-white -left-8" />
            <CarouselNext className="w-12 h-12 md:w-16 md:h-16 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary hover:text-white -right-8" />
          </Carousel>
        </div>
        <TrainingCenter />
      </main>
    </ClientLayout>
  );
};

export default page;