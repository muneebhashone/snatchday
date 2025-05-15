"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import maintrophysection from "@/app/images/winnerbg.png";
import { useGetCompetitionRecentWinner } from "@/hooks/api";
import { formatCurrency } from "@/lib/utils";

const TournamentWinnerCardSlider = () => {
  const { data: recentWinner } = useGetCompetitionRecentWinner();
  const winners = recentWinner?.data;
  console.log(winners, "winners");

  return (
    <div className="relative xl:h-[400px] md:h-[350px] h-[300px] max-w-[1920px] mx-auto bg-gradient-to-bl from-primary to-gray-100 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-purple-500/5"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
      </div>

      <Swiper
        effect={"fade"}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="w-full h-full mySwiper relative z-10"
      >
        {winners?.map((winner, index) => (
          <SwiperSlide key={index}>
            <div className="h-full w-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-center gap-8 w-full ml-36">
                  {/* Left Section - Winner Info */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-4xl font-bold text-gray-900">
                        {new Date(winner?.month).toLocaleString("default", {
                          month: "long",
                        })}
                      </h3>
                      <div className="flex items-center gap-3 mt-2">
                        <h3 className="text-4xl font-bold text-gray-800">
                          Competition
                        </h3>
                        <div className="relative">
                          <span className="relative bg-gradient-to-r from-primary to-purple-500 px-3 py-1 rounded-full text-xl font-medium text-white shadow-sm">
                            Winner
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="border-l-2 border-primary/30 pl-3">
                        <p className="text-lg text-gray-600 line-clamp-2 w-[50%] font-bold">
                          {winner?.product?.name}
                        </p>
                        <p className="text-3xl font-bold text-primary">
                          <span className="text-gray-500">Winner Price:</span>{" "}
                          {formatCurrency(winner?.price)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                          <Image
                            src={winner?.winner?.image}
                            alt={winner?.winner?.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <span className="text-base font-semibold text-gray-900">
                          {winner?.winner?.firstName} {winner?.winner?.lastName}
                        </span>
                        <p className="text-sm text-gray-500">
                          Competiton Winner
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Product Display */}
                  <div className="relative max-w-sm mx-auto md:ml-auto ">
                    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden h-[380px]">
                      {/* Product Image Section */}
                      <div className="relative aspect-[3/2]">
                        <Image
                          src={winner?.product?.images[0]}
                          alt={winner?.product?.name}
                          width={300}
                          height={190}
                          className="w-full h-full object-contain"
                        />
                        {/* Floating Price Tag */}
                        <div className="absolute top-3 right-3">
                          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                            <p className="text-sm font-semibold text-gray-900">
                              {formatCurrency(winner?.product?.price)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Product Info Section */}
                      <div className="p-4 bg-white">
                        <div className="space-y-2">
                          <h2 className="text-lg font-semibold text-gray-900">
                            {winner?.product?.name}
                          </h2>

                          <p className="text-sm text-gray-600 line-clamp-2">
                            {winner?.product?.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TournamentWinnerCardSlider;
