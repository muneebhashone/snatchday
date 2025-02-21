"use client";
import Image from "next/image";
import React, { useState } from "react";
import bg from "@/app/images/tournamentdetailhero1.png";
import powerBlock from "@/app/images/powerBlock.png";
import { Button } from "./ui/button";
import crown from "@/app/images/crown.png";
import questionmark from "@/app/images/qustionmark.png";
import { ShareArrowIcon, TaxIcon } from "./icons/icon";
import image1 from "@/app/images/lastSectionImage1.png";
import image2 from "@/app/images/lastSectionImage2.png";
import image3 from "@/app/images/lastSectionImage3.png";

const TournamentDetailHero = () => {
  //   const [selectedImage, setSelectedImage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const images = [image2, image1, image3];
  const time = [
    {
      timer: "24",
      timerText: "Days",
    },
    {
      timer: "48",
      timerText: "Hours",
    },
    {
      timer: "37",
      timerText: "Minutes",
    },
    {
      timer: "19",
      timerText: "Seconds",
    },
  ];
  return (
    <div className="relative h-max">
      <Image
        className="absolute top-0 z-[-1]"
        src={bg}
        alt="tournamentdetailhero"
      />
      {/* {/ left side /} */}
      <div className="px-48 pt-28 pb-6 grid grid-cols-7 z-100 border-b border-b-[#e9f0ff]">
        <div className="col-span-4 flex gap-2 flex-col">
          <button className="py-[6px] bg-primary rounded-full px-5 text-white font-semibold w-max">
            Tournament ID: 1641
          </button>
          <h1 className="text-[48px] text-[#1C1B1D] font-extrabold leading-[70px]">
            Acer Aspire 3 A315-35 - Intel Pentium Silver N6000
          </h1>
          <p className="text-[24px]">
            Tournament starts on{" "}
            <span className="text-primary font-extrabold text-[25px]">01.02.2025 at 18:31.</span> Check-out
            time: <span className="text-primary font-extrabold text-[25px]">18:21</span>
          </p>
          <div className="flex gap-5 w-max mt-7">
            <div className=" p-2 rounded-full flex gap-3 items-center">
              <div className="bg-white shadow-[2px_2px_10px_#d1d5db] h-[98px] w-[98px] rounded-full flex items-center justify-center">
                <Image className="object-contain" src={powerBlock} alt="" />
              </div>
              <div className="mr-14 flex flex-col justify-center">
                <h1 className="text-xl font-bold leading-7">Game</h1>
                <h1 className="text-3xl text-primary font-bold leading-7">PowerBlocks</h1>
                <p className="text-lg">Duration: 3:00 minutes</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-primary py-3 px-10 text-center rounded-full text-white text-[24px] leading-8 shadow-[0px_4px_10px_#F37835] cursor-pointer">
                <p>
                  Aktueller Preis{" "}
                  <h2 className="text-white text-[34px] font-extrabold">
                    201,65€
                  </h2>
                </p>
              </div>
              <div className="flex gap-1">
                <TaxIcon />
                <p className="text-[14px]">incl. <span className="font-bold">19% VAT</span>, plus shipping costs</p>
              </div>
            </div>
          </div>
          <div className="flex gap-6 mt-3">
            <p className=" rounded-full px-8 py-1 text-[21px] ">
              Participation fee: <span className="text-primary">250</span>{" "}
              points / <span className="text-primary">2 .50€</span>
            </p>
            <h3 className=" rounded-full px-8 py-1 text-[21px] font-extrabold">
              50<span className="text-primary">€</span> Gunstiger
            </h3>
          </div>
          <div className="flex gap-3 items-center justify-start">
            <div className=" rounded-full w-max py-3 flex gap-5 my-7 px-2">
              <div className=" flex flex-col border-r border-r-gray-300 px-5 text-[16px]">
                <p>RRP:</p>
                <p className="text-[21px]">
                  535,00
                  <span className="text-primary">€</span>
                </p>
              </div>
              <div className=" flex flex-col border-r border-r-gray-300 px-5 ">
                <p>Participants:</p>
                <p className="text-[21px]">
                  0 of <span className="text-primary">200</span>
                </p>
              </div>
              <div className=" flex flex-col px-5">
                <p className="w-max">Number of products:</p>
                <span className="text-primary text-[21px]">1</span>
              </div>
            </div>
            <div className=" w-[300px] py-3 px-6 rounded-full flex items-center">
              <p className="text-[18px] font-normal">
                For each additional participant the price drops by{" "}
                <span className="text-primary font-bold border-b-2 border-b-primary ">5.00€</span>{" "}
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start mt-5">
            <Button
              style={{
                background: `
                  linear-gradient(to right,#F37835, #8D4CC4) padding-box,
                  linear-gradient(
                    to right, 
                    #E4BD83 13.91%, 
                    #9C6727 28.84%, 
                    #FDF6AE 32.04%, 
                    #A06B2A 50.53%, 
                    #FDF6AE 53.15%, 
                    #BD8D42 71.14%
                  ) border-box
                `,
                border: "8px solid transparent",
                borderRadius: "9999px",
              }}
              className=" w-[285px] h-[83px] text-2xl font-bold flex items-center justify-between"
            >
              <div className="ml-8 flex items-center gap-4">
                <Image
                  src={crown}
                  width={45}
                  height={45}
                  alt="crown"
                  className=""
                />
                Register
              </div>
              <Image src={questionmark} alt="" />
            </Button>
            <div className="text-gray-300 py-7 px-6 rounded-full shadow-[3px_3px_8px_#BFB3CA]">
              <ShareArrowIcon />
            </div>
          </div>
        </div>
        {/* {/ right side /} */}
        <div className="col-span-3 ml-10">
          <div className="flex flex-col">
            <div className="bg-transparent p-8 h-[550px] w-[550px]">
              <Image
                src={images[selectedImage]}
                alt="Product"
                width={500}
                height={500}
                className="w-full h-full object-contain object-center bg-transparent"
              />
            </div>
            <div className="flex gap-7 items-center justify-center">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center p-2 rounded-xl border w-[100px] h-[92px] cursor-pointer transition-all duration-300 ${selectedImage === index
                    ? "border-primary ring-[0.5px] ring-primary ring-opacity-50"
                    : "border-gray-200 hover:border-primary"
                    }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-auto object-contain bg-transparent"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-1 md:gap-4 relative z-10 mt-10">
            {time?.map((item) => {
              return (
                <div
                  key={item.timer}
                  className="text-center flex flex-col items-center text-xs lg:text-lg "
                >
                  <div
                    className={`bg-opacity-50 text-md sm:w-max lg:text-[45px] border px-2 lg:px-6 py-1 lg:py-4 mb-2 ${item.timerText === "Days" &&
                      "border border-primary"
                      }`}
                  >
                    <h1 className={`${item.timerText === "Days" &&
                      "text-primary"}`}>{item.timer}</h1>
                  </div>

                  <p className="text-sm">{item.timerText}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default TournamentDetailHero;