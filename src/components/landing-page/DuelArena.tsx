"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import supersale from "@/app/images/supersale.png";
import supersale1 from "@/app/images/supersale1.png";
import TrainingCenter from "./TrainingCenter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative, Navigation, Pagination } from "swiper/modules";
import 'swiper/css/effect-creative';
import { duelArenaSlides, howToEnterSteps, floatingImages } from "@/dummydata";
import { useGetBanners } from "@/hooks/api";
import Link from "next/link";
const DuelArena = () => {

  const { data: duelArena } = useGetBanners();
  const { data: banners } = useGetBanners();
  const bannerList = banners?.data || [];
  console.log(duelArena);
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
                {duelArenaSlides[0].description}
              </p>
              <p className="text-[16px] md:text-[24px] font-normal">
                {duelArenaSlides[0].subText}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-8 my-20">
       
              <Link href={bannerList[5]?.link || ""}>
                <Image
                  // className="w-[100%] md:w-[50%]"
                  src={bannerList[5]?.image}
                  alt="supersale"
                  width={894}
                  height={462}
                  unoptimized={true}
                />
              </Link>
           
         
              <Link href={bannerList[6]?.link || ""}>
                <Image
                  // className="w-[100%] md:w-[50%]"
                  src={bannerList[6]?.image}
                  alt="supersale"
                  width={894}
                  height={462}
                  unoptimized={true}
                />
              </Link>
         
        </div>
      </div>
    </section>
  );
};

export default DuelArena;