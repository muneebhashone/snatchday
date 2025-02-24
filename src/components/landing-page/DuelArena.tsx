// import React from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import Image from "next/image";
// import { Button } from "../ui/button";
// import game1 from "@/app/images/game1.png";
// import game2 from "@/app/images/game2.png";
// import game3 from "@/app/images/game3.png";
// import game4 from "@/app/images/game4.png";
// import game5 from "@/app/images/game5.png";
// import supersale from "@/app/images/supersale.png";
// import supersale1 from "@/app/images/supersale1.png";
// import TrainingCenter from "./TrainingCenter";

// const DuelArena = () => {
//   const slides = [
//     {
//       title: "Duel Arena",
//       description:
//         "You can have exciting duels in the duel arena. To start or accept a duel, you need 25 snap points, which is worth 25 cents. There are no additional fees. VIP members are exempt from this fee (see VIP membership). A duel consists of two players.",
//       subText:
//         "Create a duel with a game you have the most experience with and set your own stake.",
//     },
//   ];

//   const howToEnterSteps = [
//     {
//       subTitle: "Choose your prize",
//       description:
//         "The power is in your hands, chose from our number of exciting prizes that catch your eye the most.",
//       number: "01",
//     },
//     {
//       subTitle: "Choose your amount of tickets",
//       description:
//         "Chose how many tickets you would like to enter. The more tickets you select the more chance you have of winning.",
//       number: "02",
//     },
//     {
//       subTitle: "Answer the question",
//       description:
//         "Answer the question with the correct answer to be entered in the competition.",
//       number: "03",
//     },
//     {
//       subTitle: "Answer the question",
//       description:
//         "Answer the question with the correct answer to be entered in the competition.",
//       number: "04",
//     },
//   ];

//   const floatingImages = [
//     {
//       src: game1,
//       alt: "game1",
//       className: "animate-float-1 absolute top-20 left-[10%]",
//     },
//     {
//       src: game2,
//       alt: "game2",
//       className: "animate-float-2 absolute bottom-40 right-[10%]",
//     },
//     {
//       src: game3,
//       alt: "game3",
//       className: "animate-float-3 absolute top-40 right-[30%]",
//     },
//     {
//       src: game4,
//       alt: "game4",
//       className: "animate-float-4 absolute bottom-20 left-[30%]",
//     },
//     {
//       src: game5,
//       alt: "game5",
//       className: "animate-float-5 absolute top-60 right-[20%]",
//     },
//     {
//       src: game2,
//       alt: "game2",
//       className: "animate-float-2 absolute top-32 right-[40%]",
//     },
//     {
//       src: game3,
//       alt: "game3",
//       className: "animate-float-3 absolute bottom-32 right-[35%]",
//     },
//   ];

//   return (
//     <section className="relative overflow-hidden ">
//       {/* Background Elements */}
//       <div className="absolute inset-0 w-full h-full">
//         {floatingImages.map((image, index) => (
//           <Image
//             key={index}
//             src={image.src}
//             alt={image.alt}
//             width={80}
//             height={80}
//             className={`${image.className} opacity-10 hover:opacity-20 transition-opacity duration-300`}
//           />
//         ))}
//       </div>

//       <div className="container max-w-[1920px] mx-auto px-12 relative z-10 h-max lg:mt-10">
//         <Carousel
//           opts={{
//             align: "start",
//             loop: true,
//           }}
//           className="w-full h-max"
//         >
//           <CarouselContent className="">
//             {/* First Slide - Duel Arena */}
//             <CarouselItem className="min-h-max self-center">
//               <div className="flex flex-col items-center justify-center text-center px-4 md:px-20 h-max max-w-[1440px] mx-auto">
//                 <h2 className="text-foreground flex flex-wrap items-center justify-center text-[24px] sm:text-[30px] lg:text-[48px] font-bold lg:font-extrabold text-center mb-12 md:mt-0 mt-3">
//                   How to Play{" "}
//                   <span className="ml-3 bg-primary text-white px-1 sm:px-4 py-1 rounded-lg">
//                     Duel Arena
//                   </span>
//                 </h2>
//                 <p className="text-[16px] md:text-[24px] text-card-foreground mb-8">
//                   {slides[0].description}
//                 </p>
//                 <p className="text-[16px] md:text-[24px] font-normal">
//                   {slides[0].subText}
//                 </p>
//               </div>
//               <div className="flex justify-center items-center gap-8 my-10">
//                 <Button className={`gradient-primary text-white px-14 py-7 rounded-full text-lg font-medium hover:opacity-90 transition-opacity `}>
//                   Create a Duel
//                 </Button>
//               </div>
//             </CarouselItem>

//             {/* Second Slide - How to Enter Grid */}
//             <CarouselItem>
//               <div className="px-0 md:px-20 mb-10 max-w-[1440px] mx-auto">
//                 <h2 className="text-foreground flex flex-wrap items-center justify-center text-[24px] sm:text-[30px] lg:text-[48px] font-bold lg:font-extrabold text-center mb-12 md:mt-0 mt-3">
//                   How to Enter{" "}
//                   <span className="ml-2 bg-primary text-white px-1 sm:px-4 rounded-lg">
//                     Tournement
//                   </span>
//                 </h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-2 sm:gap-8 ">
//                   {howToEnterSteps.map((step, index) => (
//                     <div
//                       key={index}
//                       className="bg-white p-4 lg:py-8  lg:px-16 rounded-xl shadow-md hover:shadow-lg transition-shadow"
//                     >
//                       <div className="text-primary text-2xl lg:text-3xl font-bold mb-4 border-2 border-primary w-max p-1">
//                         {step.number}
//                       </div>
//                       <h3 className="text-xl lg:text-2xl font-bold mb-4 border-b mt-7 text-foreground">
//                         {step.subTitle}
//                       </h3>
//                       <p className="text-card-foreground text-sm sm:text-lg w-[75%]">{step.description}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </CarouselItem>
//           </CarouselContent>
//           <CarouselPrevious className="text-black absolute sm:-left-4 lg:-left-8 top-1/2 sm:top-[59%] md:top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white shadow-lg border-0 hover:bg-primary hover:text-white" />
//           <CarouselNext className="absolute sm:-right-4 lg:-right-2 top-1/2 sm:top-[59%] md:top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary hover:text-white" />
//         </Carousel>

//         {/* Training Center Section */}
//         <div className="mt-20">
//           <TrainingCenter />
//         </div>
//         <div className="flex md:flex-row flex-col justify-center items-center gap-8 my-20">
//           <Image
//             className="w-[100%] md:w-[50%]"
//             src={supersale}
//             alt="supersale"
//             width={894}
//             height={462}
//           />
//           <Image
//             className="w-[100%] md:w-[50%]"
//             src={supersale1}
//             alt="supersale"
//             width={894}
//             height={462}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DuelArena;
"use client"
import React from "react";
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
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative, Navigation, Pagination } from "swiper/modules";
import 'swiper/css/effect-creative';
import image2 from '@/app/images/traingame.png'
import image from '@/app/images/choosetournament.png'
import image3 from '@/app/images/participateintournament.png'
import image4 from '@/app/images/win.png'
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
    <section className="relative ">
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

      <div className="container max-w-[1920px] mx-auto px-12 relative z-10 h-max lg:mt-10">
        <Swiper
          effect={'creative'}
          creativeEffect={{
            prev: {
              translate: [0, 0, -400],
              scale: 0.5,
              opacity: 0
            },
            next: {
              translate: [0, 0, -400],
              scale: 0.5,
              opacity: 0
            },
          }}
          navigation={true}
          loop={true}
          modules={[EffectCreative, Navigation, Pagination, Autoplay]}
          className="w-full mySwiper h-max"
          wrapperClass="items-center"
        >
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center text-center px-4 md:px-20 h-max max-w-[1440px] mx-auto">
              <h2 className="text-foreground flex flex-wrap items-center justify-center text-[24px] sm:text-[30px] lg:text-[48px] font-bold lg:font-extrabold text-center mb-12 md:mt-0 mt-3">
                How to Play{" "}
                <span className="ml-3 bg-primary text-white px-1 sm:px-4 py-1 rounded-lg">
                  Duel Arena
                </span>
              </h2>
              <p className="text-[16px] md:text-[24px] text-card-foreground mb-8">
                {slides[0].description}
              </p>
              <p className="text-[16px] md:text-[24px] font-normal">
                {slides[0].subText}
              </p>
            </div>
            <div className="flex justify-center items-center gap-8 my-10">
              <Button className={`gradient-primary text-white px-14 py-7 rounded-full text-lg font-medium hover:opacity-90 transition-opacity `}>
                Create a Duel
              </Button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="px-0 md:px-20 mb-10 max-w-[1440px] mx-auto">
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
                    <p className="text-card-foreground text-sm sm:text-lg w-[75%]">{step.description}</p>
                    <Image unoptimized className="absolute top-0 right-0 w-40 h-40 object-contain object-center" src={step.image} alt={step.subTitle} />
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Training Center Section */}
        <div className="mt-20">
          <TrainingCenter />
        </div>
        <div className="flex md:flex-row flex-col justify-center items-center gap-8 my-20">
          <Image
            className="w-[100%] md:w-[50%]"
            src={supersale}
            alt="supersale"
            width={894}
            height={462}
            unoptimized={true}
          />
          <Image
            className="w-[100%] md:w-[50%]"
            src={supersale1}
            alt="supersale"
            width={894}
            height={462}
            unoptimized={true}
          />
        </div>
      </div>
    </section>
  );
};

export default DuelArena;