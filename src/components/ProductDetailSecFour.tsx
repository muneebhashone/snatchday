import React from "react";
import { ArrowIcon, TaxIcon } from "./icons/icon";
import Image from "next/image";
import { Button } from "./ui/button";
import crown from "@/app/images/crown.png";
import Link from "next/link";
import rank1 from "@/app/images/rank1.png";
import rank2 from "@/app/images/rank2.png";
import rank3 from "@/app/images/rank3.png";
import rank from "@/app/images/rank.png";
import winnerimg from '@/app/images/winnerimg.png'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const winners = [
  {
    ranking: '1st',
    name: "Sher gut",
    month: "December",
    product: "Razer Blade 14 - AMD Ryzen 9 6900HX / 3.3 GHz",
    participationFee: { points: 250, price: "2.50" },
    price: "2694.98",
    image: rank1,
    winnerimg: winnerimg
  },
  {
    ranking: '2nd',
    name: "Sher gut",
    month: "November",
    product: "Alienware x14 Gaming Laptop",
    participationFee: { points: 200, price: "2.00" },
    price: "2199.99",
    image: rank2,
    winnerimg: winnerimg
  },
  {
    ranking: '3rd',
    name: "Sher gut",
    month: "October",
    product: "ASUS ROG Zephyrus G14",
    participationFee: { points: 300, price: "3.00" },
    price: "1899.99",
    image: rank3,
    winnerimg: winnerimg
  },
  {
    ranking: '4th',
    name: "Sher gut",
    month: "October",
    product: "ASUS ROG Zephyrus G14",
    participationFee: { points: 300, price: "3.00" },
    price: "1899.99",
    image: rank3,
    winnerimg: winnerimg
  },
  {
    ranking: '5th',
    name: "Sher gut",
    month: "October",
    product: "ASUS ROG Zephyrus G14",
    participationFee: { points: 300, price: "3.00" },
    price: "1899.99",
    image: rank3,
    winnerimg: winnerimg
  },
  {
    ranking: '6th',
    name: "Sher gut",
    month: "October",
    product: "ASUS ROG Zephyrus G14",
    participationFee: { points: 300, price: "3.00" },
    price: "1899.99",
    image: rank3,
    winnerimg: winnerimg
  },
  {
    ranking: '7th',
    name: "Sher gut",
    month: "October",
    product: "ASUS ROG Zephyrus G14",
    participationFee: { points: 300, price: "3.00" },
    price: "1899.99",
    image: rank3,
    winnerimg: winnerimg
  },
  {
    ranking: '8th',
    name: "Sher gut",
    month: "October",
    product: "ASUS ROG Zephyrus G14",
    participationFee: { points: 300, price: "3.00" },
    price: "1899.99",
    image: rank3,
    winnerimg: winnerimg
  },
  {
    ranking: '9th',
    name: "Sher gut",
    month: "October",
    product: "ASUS ROG Zephyrus G14",
    participationFee: { points: 300, price: "3.00" },
    price: "1899.99",
    image: rank3,
    winnerimg: winnerimg
  },
  {
    ranking: '10th',
    name: "Sher gut",
    month: "October",
    product: "ASUS ROG Zephyrus G14",
    participationFee: { points: 300, price: "3.00" },
    price: "1899.99",
    image: rank3,
    winnerimg: winnerimg
  },
  {
    ranking: '11th',
    name: "Sher gut",
    month: "October",
    product: "ASUS ROG Zephyrus G14",
    participationFee: { points: 300, price: "3.00" },
    price: "1899.99",
    image: rank3,
    winnerimg: winnerimg
  },
  {
    ranking: '12th',
    name: "Sher gut",
    month: "October",
    product: "ASUS ROG Zephyrus G14",
    participationFee: { points: 300, price: "3.00" },
    price: "1899.99",
    image: rank3,
    winnerimg: winnerimg
  },
  {
    ranking: '13th',
    name: "Sher gut",
    month: "October",
    product: "ASUS ROG Zephyrus G14",
    participationFee: { points: 300, price: "3.00" },
    price: "1899.99",
    image: rank3,
    winnerimg: winnerimg
  },
  {
    ranking: '14th',
    name: "Sher gut",
    month: "October",
    product: "ASUS ROG Zephyrus G14",
    participationFee: { points: 300, price: "3.00" },
    price: "1899.99",
    image: rank3,
    winnerimg: winnerimg
  },
  {
    ranking: '15th',
    name: "Sher gut",
    month: "October",
    product: "ASUS ROG Zephyrus G14",
    participationFee: { points: 300, price: "3.00" },
    price: "1899.99",
    image: rank3,
    winnerimg: winnerimg
  },
  {
    ranking: '16th',
    name: "Sher gut",
    month: "October",
    product: "ASUS ROG Zephyrus G14",
    participationFee: { points: 300, price: "3.00" },
    price: "1899.99",
    image: rank3,
    winnerimg: winnerimg
  },
  {
    ranking: '17th',
    name: "Sher gut",
    month: "October",
    product: "ASUS ROG Zephyrus G14",
    participationFee: { points: 300, price: "3.00" },
    price: "1899.99",
    image: rank3,
    winnerimg: winnerimg
  },
  {
    ranking: '18th',
    name: "Sher gut",
    month: "October",
    product: "ASUS ROG Zephyrus G14",
    participationFee: { points: 300, price: "3.00" },
    price: "1899.99",
    image: rank3,
    winnerimg: winnerimg
  },
  {
    ranking: '19th',
    name: "Sher gut",
    month: "October",
    product: "ASUS ROG Zephyrus G14",
    participationFee: { points: 300, price: "3.00" },
    price: "1899.99",
    image: rank3,
    winnerimg: winnerimg
  },
  {
    ranking: '20th',
    name: "Sher gut",
    month: "October",
    product: "ASUS ROG Zephyrus G14",
    participationFee: { points: 300, price: "3.00" },
    price: "1899.99",
    image: rank3,
    winnerimg: winnerimg
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
                <div className="grid grid-cols-2 xl:gap-10 mt-12">
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
                  <div className="overflow-hidden w-[648px] h-[545px] bg-[#22002d] border-[#e67034] text-white border-2 rounded-3xl">
                    <div className="h-[60px] border-b-2 border-b-[#e67034] w-full grid grid-cols-7 items-center" >
                      <h2 className="col-span-2 font-bold text-center text-white">Ranking</h2>
                      <h2 className="col-span-3 font-bold text-start text-white">Participate Name</h2>
                      <h2 className="col-span-2 font-bold text-white text-center">Prizes</h2>
                    </div>
                    <div className="px-8 h-full overflow-y-auto custom-scrollbar pb-20">
                      {winners.map((winner, index) => (
                        <div
                          style={{
                            background: `
                            linear-gradient(#22002d, #22002d) padding-box,
                            linear-gradient(116.76deg, ${winner.ranking === '1st'
                                ? '#E4BD83 13.91%, #9C6727 28.84%, #FDF6AE 32.04%, #A06B2A 50.53%, #FDF6AE 53.15%, #BD8D42 71.14%'
                                : winner.ranking === '2nd'
                                  ? '#b1b6c4 13.91%, #8e939f 28.84%, #d4d8e1 32.04%, #8e939f 50.53%, #d4d8e1 53.15%, #b1b6c4 71.14%'
                                  : winner.ranking === '3rd'
                                    ? '#b97220 13.91%, #8e5718 28.84%, #cd8024 32.04%, #8e5718 50.53%, #cd8024 53.15%, #b97220 71.14%'
                                    : ''
                              }
                          `,
                            border: index <= 2 ? "5px solid transparent" : "4px solid rgba(255, 255, 255, 0.2)",
                          }}
                          key={index} className={`mb-2 px-6 ${index > 2 && "h-[65px]"} grid grid-cols-8 items-center rounded-3xl ${index === 0 && "mt-6"} `}>
                          <h1 className="col-span-2 text-white font-bold">{winner.ranking}</h1>
                          <div className="col-span-4 flex items-center justify-start gap-4 w-full text-xl">
                            <div className={`w-14 h-14  ${index > 2 && 'w-[45px] h-[45px]'} rounded-full flex items-center justify-center bg-white bg-opacity-15 ${winner.ranking === '1st' && "bg-[#f8c927] bg-opacity-95 shadow-[0px_0px_60px_#f8c927]"} ${winner.ranking === '2nd' && "bg-[#b1b6c4] bg-opacity-95 shadow-[0px_0px_60px_#b1b6c4]"} ${winner.ranking === '3rd' && "bg-[#b97220] bg-opacity-95 shadow-[0px_0px_60px_#b97220]"}`}>
                              <Image className={`w-10 h-10 ${index > 2 && 'w-8 h-8'}`} src={winner.winnerimg} alt={winner.name} />
                            </div>
                            <p>{winner.name}</p>
                          </div>
                          <div className="col-span-2 flex items-center justify-end "><Image className={`object-contain w-16 ${index > 2 && 'w-10 h-10'}`} src={index === 0 ? rank1 : index === 1 ? rank2 : index === 2 ? rank3 : rank} alt={winner.name} /></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-40 top-1/2 -translate-y-1/2 w-20 h-20 bg-white/20  shadow-lg border-0 text-white hover:bg-primary hover:text-white" />
        <CarouselNext className="absolute -right-40 top-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 shadow-lg border-0 text-white hover:bg-primary hover:text-white" />
      </Carousel>
    </div>
  );
};

export default ProductDetailSecFour;
