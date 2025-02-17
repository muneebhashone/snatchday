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
  ];

  const howToEnterSteps = [
    {
      subTitle: "Choose your prize",
      description:
        "The power is in your hands, chose from our number of exciting prizes that catch your eye the most.",
      number: "01",
    },
    {
      subTitle: "Choose your amount of tickets",
      description:
        "Chose how many tickets you would like to enter. The more tickets you select the more chance you have of winning.",
      number: "02",
    },
    {
      subTitle: "Answer the question",
      description:
        "Answer the question with the correct answer to be entered in the competition.",
      number: "03",
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
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {/* First Slide - Duel Arena */}
            <CarouselItem>
              <div className="flex flex-col items-center justify-center text-center px-4 md:px-20">
                <h2 className="text-[48px] font-extrabold mb-6">
                  How to Play{" "}
                  <span className="bg-primary text-white px-4 py-1 rounded-lg">
                    Duel Arena
                  </span>
                </h2>
                <p className="text-xl text-card-foreground max-w-4xl mb-8">
                  {slides[0].description}
                </p>
                <p className="text-xl text-primary font-medium">
                  {slides[0].subText}
                </p>
              </div>
            </CarouselItem>

            {/* Second Slide - How to Enter Grid */}
            <CarouselItem>
              <div className="px-4 md:px-20">
                <h2 className="text-[48px] font-extrabold text-center mb-12">
                  How to Enter{" "}
                  <span className="bg-primary text-white px-4 py-1 rounded-lg">
                    Duel Arena
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {howToEnterSteps.map((step, index) => (
                    <div
                      key={index}
                      className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="text-primary text-4xl font-bold mb-4">
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-bold mb-4">
                        {step.subTitle}
                      </h3>
                      <p className="text-card-foreground">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary hover:text-white" />
          <CarouselNext className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary hover:text-white" />
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
