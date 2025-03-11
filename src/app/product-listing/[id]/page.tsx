"use client";
import React, { useState, Suspense } from "react";
import ClientLayout from "@/components/landing-page/ClientLayout";
import ProductDetails from "@/components/products/ProductDetails";
import graphiccard from "@/app/images/graphiccard.png";
import NextTournamentCard from "@/components/NextTournamentCard";
import FeaturedProductsCard from "@/components/FeaturedProductsCard";
import TrainingCenter from "@/components/landing-page/TrainingCenter";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import laptop from "@/app/images/laptopv1.png";
import laptop2 from "@/app/images/laptopv2.png";
import detailimage from "@/app/images/detailimage.png";
import {
  BubblesIcon1,
  BubblesIcon,
  TournamentCupIcon,
} from "@/components/icons/icon";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { VisitTournamentModal } from "@/components/VisitTournamentModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Loader from "@/components/Loader";
import { useGetProductById } from "@/hooks/api";
import { useParams } from "next/navigation";

const ProductContent = () => {
  const params = useParams();
  const id = params.id 
  const {data: productData, isLoading} = useGetProductById(id as string);

  const productData1  = {
    title: `Acer B277 Dbmiprczx - LED monitor - 68.6 cm (27) - 4710886045649`,
    images: [
      detailimage,
      laptop,
      laptop2,
      detailimage,
      detailimage,
      laptop,
      laptop2,
      detailimage,
    ],
    price: "201,65",
    rating: 5,
    reviews: 5,
    isNew: true,
    specifications: {
      leftColumn: [
        "Acer B277 Dbmiprczx",
        "LED Monitor",
        '68.6 cm (27")',
        "1920 x 1080 Full HD (1080p) @ 75 Hz",
        "IPS - 250 cd/m²",
      ],
      rightColumn: ["4 ms", "HDMI, VGA, DisplayPort", "Speakers", "Black"],
    },
  };

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

  const displayProducts = [
    {
      title: "Acer Aspi  re 3 A315-35- Intel Pentium Silver N6000",
      price: "201,65",
      rating: 5,
      reviews: 5,
      image: graphiccard,
      isSale: true,
      discount: "10%",
      category: "Computer",
      oldPrice: "201,65",
    },
    {
      title: "Acer Aspi  re 3 A315-35- Intel Pentium Silver N6000",
      price: "201,65",
      rating: 5,
      reviews: 5,
      image: graphiccard,
      isSale: true,
      discount: "10%",
      category: "Computer",
      oldPrice: "201,65",
    },
    {
      title: "Acer Aspi  re 3 A315-35- Intel Pentium Silver N6000",
      price: "201,65",
      rating: 5,
      reviews: 5,
      image: graphiccard,
      isSale: true,
      discount: "10%",
      category: "Computer",
      oldPrice: "201,65",
    },
    {
      title: "Acer Aspi  re 3 A315-35- Intel Pentium Silver N6000",
      price: "201,65",
      rating: 5,
      reviews: 5,
      image: graphiccard,
      isSale: true,
      discount: "10%",
      category: "Computer",
      oldPrice: "201,65",
    },
    {
      title: "Acer Aspi  re 3 A315-35- Intel Pentium Silver N6000",
      price: "201,65",
      rating: 5,
      reviews: 5,
      image: graphiccard,
      isSale: true,
      discount: "10%",
      category: "Computer",
      oldPrice: "201,65",
    },
    {
      title: "Acer Aspi  re 3 A315-35- Intel Pentium Silver N6000",
      price: "201,65",
      rating: 5,
      reviews: 5,
      image: graphiccard,
      isSale: true,
      discount: "10%",
      category: "Computer",
      oldPrice: "201,65",
    },
    {
      title: "Acer Aspi  re 3 A315-35- Intel Pentium Silver N6000",
      price: "201,65",
      rating: 5,
      reviews: 5,
      image: graphiccard,
      isSale: true,
      discount: "10%",
      category: "Computer",
      oldPrice: "201,65",
    },
  ];
  const [openModal, setopenModal] = useState(false);

  // <div className="relative">
  {
    /* <div className="text-lg font-semibold absolute top-[60vh] right-0 mr-2">
      <div className="-rotate-90 flex flex-row items-center p-3 gap-2 rounded-t-3xl gradient-primary">
        <div className="rotate-90">
          <TournamentCup />
        </div>
        <h1 className="text-white">Visit Tournament</h1>
      </div>
    </div> */
  }
  return (
    <ClientLayout>
      <div className="py-24 max-w-[1920px] mx-auto relative">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <BubblesIcon className="absolute top-[10%] left-[0%] animate-bubble-1" />
          <BubblesIcon1 className="absolute top-[10%] right-[0%] animate-bubble-2" />
          {/* <BubblesIcon className="absolute top-[25%] left-[15%] animate-bubble-3" /> */}
          <BubblesIcon1 className="absolute top-[35%] right-[0%] animate-bubble-4" />
          <BubblesIcon className="absolute top-[45%] left-[0%] animate-bubble-1" />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <div
              onClick={() => {
                setopenModal(true);
              }}
              className=" text-lg font-semibold cursor-pointer"
            >
              <div className="absolute -right-[85px] top-[55vh] rotate-90 flex flex-row items-center p-3 gap-2 rounded-b-3xl gradient-primary">
                <h1 className="text-white -rotate-180">Visit Tournament</h1>
                <div className="-rotate-90">
                  <TournamentCupIcon />
                </div>
              </div>
            </div>
          </DialogTrigger>
          <VisitTournamentModal
            closeModal={() => {
              setopenModal(false);
            }}
            openModal={openModal}
            title="January Tournament"
            date="January 30, 2025 at 3:00 p.m."
          />
        </Dialog>
        <Separator className="my-5" />
        <Breadcrumb className="px-0 md:px-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/product-listing">
                Product Listing
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Product Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Separator className="my-5" />

        <ProductDetails {...productData?.data} isLoading={isLoading} />
        <div className="bg-[#F9F9F9] container max-w-[1920px] mx-auto py-20 px-10">
          <h2 className="text-[48px] font-extrabold text-center capitalize mb-10">
            <span className=" bg-primary text-white px-4 py-1 rounded-lg">
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
        <div className="py-10 bg-[#F9F9F9]">
          <div className="text-[48px] font-extrabold text-center capitalize mb-10">
            <h2>
              <span className="bg-transparent">Similar</span>
              <span className="bg-primary text-white px-4 py-1 rounded-lg ml-2">
                Products
              </span>
            </h2>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-[1920px] mx-auto px-12"
          >
            <CarouselContent>
              {displayProducts.map((product, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/4 xl:basis-1/5"
                >
                  <FeaturedProductsCard {...product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="w-16 h-16 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary hover:text-white left-0" />
            <CarouselNext className="w-16 h-16 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary hover:text-white right-0" />
          </Carousel>
        </div>
      </div>
      <div className="pb-60">
        <TrainingCenter />
      </div>
    </ClientLayout>
    // </div>
  );
};

const ProductDetailsPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ProductContent />
    </Suspense>
  );
};

export default ProductDetailsPage;
