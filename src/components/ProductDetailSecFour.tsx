import React from "react";
import { ArrowIcon, TaxIcon } from "./icons/icon";
import Image from "next/image";
import { Button } from "./ui/button";
import crown from "@/app/images/crown.png";
import Link from "next/link";
import sideImg from "@/app/images/productDetailSecFourSideImage.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const winners = [
  {
    month: "December",
    product: "Razer Blade 14 - AMD Ryzen 9 6900HX / 3.3 GHz",
    participationFee: { points: 250, price: "2.50" },
    price: "2694.98",
    image: sideImg,
  },
  {
    month: "November",
    product: "Alienware x14 Gaming Laptop",
    participationFee: { points: 200, price: "2.00" },
    price: "2199.99",
    image: sideImg,
  },
  {
    month: "October",
    product: "ASUS ROG Zephyrus G14",
    participationFee: { points: 300, price: "3.00" },
    price: "1899.99",
    image: sideImg,
  },
];

const ProductDetailSecFour = () => {
  return (
    <div className="flex flex-col items-center gap-12 py-10 px-52">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {winners.map((winner, index) => (
            <CarouselItem key={index}>
              <div className="flex flex-col items-center">
                <h1 className="text-white flex flex-col text-[84px] font-extrabold leading-[80px] text-center">
                  {winner.month}
                  <span className="text-[60px]">
                    Tournament{" "}
                    <span className="bg-primary px-5 rounded-xl">Winner</span>
                  </span>
                </h1>
                <div className="grid grid-cols-2 mt-12">
                  <div className="flex flex-col items-start gap-5">
                    <h1 className="text-white text-[50px] font-bold leading-[55px]">
                      {winner.product}
                    </h1>
                    <p className="bg-white bg-opacity-10 rounded-full px-8 py-1 text-[21px] text-white">
                      Participation fee:{" "}
                      <span className="text-primary">
                        {winner.participationFee.points}
                      </span>{" "}
                      points /{" "}
                      <span className="text-primary">
                        {winner.participationFee.price}€
                      </span>
                    </p>
                    <div className="flex flex-col text-white">
                      <h1 className="text-white text-[44px] font-semibold">
                        {winner.price}€
                      </h1>
                      <div className="flex text-sm gap-1 items-center">
                        <TaxIcon /> <p>incl. 19% VAT, plus shipping costs</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-5">
                        <Button
                          style={{
                            background: `
                              linear-gradient(#330542, #330542) padding-box,
                              linear-gradient(116.76deg, #E4BD83 13.91%, #9C6727 28.84%, #FDF6AE 32.04%, #A06B2A 50.53%, #FDF6AE 53.15%, #BD8D42 71.14%) border-box
                            `,
                            border: "8px solid transparent",
                            borderRadius: "9999px",
                          }}
                          className="mt-4 w-[420px] h-[98px] text-[24px] font-semibold flex items-center justify-center"
                        >
                          <Image
                            src={crown}
                            width={45}
                            height={45}
                            alt="crown"
                          />
                          Register Tournament
                        </Button>
                        <div className="flex gap-2 text-white items-center text-[21px] font-light mt-6">
                          <Link
                            className="underline decoration-1 underline-offset-4"
                            href="#"
                          >
                            Visit Tournament
                          </Link>
                          <ArrowIcon />
                        </div>
                      </div>
                      <p className="text-white text-xl">
                        Complete your{" "}
                        <span className="text-primary font-semibold">
                          ViP membership
                        </span>{" "}
                        now!
                      </p>
                    </div>
                  </div>
                  <Image src={winner.image} alt="Tournament winner product" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-40 top-1/2 -translate-y-1/2 w-20 h-20 bg-[#D4D4D4]  shadow-lg border-0 text-white hover:bg-primary hover:text-white" />
        <CarouselNext className="absolute -right-40 top-1/2 -translate-y-1/2 w-20 h-20 bg-[#D4D4D4] shadow-lg border-0 text-white hover:bg-primary hover:text-white" />
      </Carousel>
    </div>
  );
};

export default ProductDetailSecFour;
