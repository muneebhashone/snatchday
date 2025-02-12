"use client";
import React from "react";
import ClientLayout from "@/components/landing-page/ClientLayout";
import ProductDetails from "@/components/products/ProductDetails";
import graphiccard from "@/app/images/graphiccard.png";
import NextTournamentCard from "@/components/NextTournamentCard";
import FeaturedProductsCard from "@/components/FeaturedProductsCard";
import TrainingCenter from "@/components/landing-page/TrainingCenter";

const ProductDetailsPage = ({ params }: { params: { title: string } }) => {
  const productData = {
    title: decodeURIComponent(params.title).split("-").join(" "),
    images: [graphiccard, graphiccard, graphiccard, graphiccard],
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
      productImage: graphiccard,
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
      productImage: graphiccard,
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
  ];

  return (
    <ClientLayout>
      <ProductDetails {...productData} />
      <div className="py-20 max-w-[1920px] bg-[#F9F9F9] mx-auto px-8">
        <div className="text-6xl font-bold text-center capitalize mb-10">
          <h2>
            <span className=" bg-[#FF6B3D] text-white px-6 py-2 rounded-lg">
              Next
            </span>

            <span className="bg-transparent ml-2">Tournaments</span>
          </h2>
        </div>
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
        <div className="px-0 md:px-6 py-20">
        <div className="text-6xl font-bold text-center capitalize mb-10">
          <h2>
            <span className="bg-transparent">Similar</span>
            <span className="bg-[#FF6B3D] text-white px-6 py-2 rounded-lg ml-2">
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
