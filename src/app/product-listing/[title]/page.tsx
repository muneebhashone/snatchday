"use client";
import React from "react";
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
import detailimage from "@/app/images/detailimage.png"

const ProductDetailsPage = ({ params }: { params: { title: string } }) => {
  const productData = {
    title: `Acer B277 Dbmiprczx - LED monitor - 68.6 cm (27) - 4710886045649`,
    images: [detailimage, laptop, laptop2, detailimage,detailimage, laptop, laptop2, detailimage],
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
  ];

  return (
    <ClientLayout>
      <div className="py-24 max-w-[1920px] mx-auto">
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

        <ProductDetails {...productData} />
        <div className="bg-[#F9F9F9] container max-w-[1920px] mx-auto py-20 px-10">
          <h2 className="text-6xl font-extrabold text-center capitalize mb-10">
            <span className=" bg-[#FF6B3D] text-white px-4 py-1 rounded-lg">
              Next
            </span>

            <span className="bg-transparent ml-2">Tournaments</span>
          </h2>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nextTournaments.map((tournament, index) => (
            <NextTournamentCard
              key={index}
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
          ))}
        </div>
        </div>
        <div className="py-10 bg-[#F9F9F9]">
          <div className="text-6xl font-extrabold text-center capitalize mb-10">
            <h2>
              <span className="bg-transparent">Similar</span>
              <span className="bg-[#FF6B3D] text-white px-4 py-1 rounded-lg ml-2">
                Products
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
            {displayProducts.map((product, index) => (
              <FeaturedProductsCard key={index} {...product} />
            ))}
          </div>
        </div>
      </div>
      <div className="pb-60">
        <TrainingCenter />
      </div>
    </ClientLayout>
  );
};

export default ProductDetailsPage;
