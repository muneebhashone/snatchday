import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "../ui/button";
import game1 from "@/app/images/game1.png";
import game2 from "@/app/images/game2.png";
import game3 from "@/app/images/game3.png";
import game4 from "@/app/images/game4.png";
import game5 from "@/app/images/game5.png";
import supersale from "@/app/images/supersale.png";
import supersale1 from "@/app/images/supersale1.png";
import TrainingCenter from "./TrainingCenter";

const DuelArena = () => {
  const slides = [
    {
      title: "Duel Arena",
      description:
        "You can have exciting duels in the duel arena. To start or accept a duel, you need 25 snap points, which is worth 25 cents. There are no additional fees. VIP members are exempt from this fee (see VIP membership). A duel consists of two players.",
      subText:
        "Create a duel with a game you have the most experience with and set your own stake.",
    },
    {
      subTitle: "Choose your prize",
      description:
        "The power is in your hands, chose from our number of exciting prizes that catch your eye the most.",
      subText: "",
      number: "01",
    },
    {
      subTitle: "Choose your amount of tickets",
      description:
        "Chose how many tickets you would like to enter. The more tickets you select the more chance you have of winning.",
      subText: "",
      number: "02",
    },
    {
      subTitle: "Answer the question",
      description:
        "Answer the question with the correct answer to be entered in the competition.",
      subText: "",
      number: "03",
    },
    {
      subTitle: "Watch our live draw",
      description:
        "Channel into the live draw on our Facebook page as we reveal the winner of our competitions.",
      subText: "",
      number: "04",
    },
  ];

  const floatingImages = [
    {
      src: game1,
      alt: "game1",
      className: "animate-float-1 absolute top-20 left-[10%]",
    },
    {
      src: game2,
      alt: "game2",
      className: "animate-float-2 absolute bottom-40 right-[10%]",
    },
    {
      src: game3,
      alt: "game3",
      className: "animate-float-3 absolute top-40 right-[30%]",
    },
    {
      src: game4,
      alt: "game4",
      className: "animate-float-4 absolute bottom-20 left-[30%]",
    },
    {
      src: game5,
      alt: "game5",
      className: "animate-float-5 absolute top-60 right-[20%]",
    },

    {
      src: game2,
      alt: "game2",
      className: "animate-float-2 absolute top-32 right-[40%]",
    },
    {
      src: game3,
      alt: "game3",
      className: "animate-float-3 absolute bottom-32 right-[35%]",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 w-full h-full">
        {floatingImages.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            width={80}
            height={80}
            className={`${image.className} opacity-10 hover:opacity-20 transition-opacity duration-300`}
          />
        ))}
      </div>

      <div className="container max-w-[1920px] mx-auto px-12 relative z-10">
        {/* Carousel Section */}
        <Carousel className="relative" opts={{ loop: true }}>
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="text-center w-full h-full mx-auto max-w-6xl">
                  {index === 0 ? (
                    <h2 className="text-3xl md:text-[48px] font-extrabold my-12 text-center">
                      How To Play
                      <span className="bg-primary text-white px-6 rounded-lg ml-2">
                        {slide.title}
                      </span>
                    </h2>
                  ) : (
                    <div className="space-y-6">
                      <h2 className="text-3xl md:text-5xl font-bold text-center">
                        How To Enter
                      </h2>
                      <div className="flex items-center justify-center gap-4">
                        <div className="inline-flex items-center justify-center border-2 border-[#FF6B3D] text-[#FF6B3D] font-bold text-xl px-4 py-2">
                          {slide.number}
                        </div>
                        <h3 className="text-2xl font-bold">{slide.subTitle}</h3>
                      </div>
                    </div>
                  )}

                  <p className="text-md text-2xl text-card-foreground mt-5 mb-6 leading-relaxed">
                    {slide.description}
                  </p>
                  {slide.subText && (
                    <p className="text-md text-2xl text-card-foreground mb-10">
                      {slide.subText}
                    </p>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg border-0 text-gray-700 hover:bg-gray-50" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg border-0 text-gray-700 hover:bg-gray-50" />
        </Carousel>
        <div className="flex justify-center items-center gap-8 mb-10">
          <Button className="gradient-primary text-white px-8 py-6 rounded-full text-lg font-medium hover:opacity-90 transition-opacity">
            Create a Duel
          </Button>
        </div>

        {/* Training Center Section */}
        {/* <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12">
            Training Center
          </h3>
          <div className="grid grid-cols-6 gap-12">
            {trainingCards.map((card, index) => (
              <div key={index} className="relative group cursor-pointer">
                <div className="aspect-square rounded-full shadow-lg flex items-center justify-center transition-transform transform group-hover:scale-105">
                  <Image
                    src={card.icon}
                    alt={card.label}
                    width={122}
                    height={122}
                  />
                </div>
                {card.notification && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#FF6B3D] rounded-full border-4 border-white" />
                )}
              </div>
            ))}
          </div>
        </div> */}

        <TrainingCenter />
        <div className="flex md:flex-row flex-col justify-center items-center gap-8 my-20">
          {/* <Image className="xl:w-[930px] xl:h-[550px] md:w-[570px] md:h-[360px]" src={supersale} alt="supersale" width={894} height={462} /> */}
          <Image
            className="w-[100%] md:w-[50%]"
            src={supersale}
            alt="supersale"
            width={894}
            height={462}
          />
          <Image
            className="w-[100%] md:w-[50%]"
            src={supersale1}
            alt="supersale"
            width={894}
            height={462}
          />
          {/* <Image className="xl:w-[930px] xl:h-[550px] md:w-[570px] md:h-[360px]" src={supersale} alt="supersale" width={894} height={462} /> */}
        </div>
      </div>
    </section>
  );
};

export default DuelArena;
