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
import winnerAvatar from "@/app/images/avatarimage.svg";

const TournamentWinnerCardSlider = () => {
  const winners = [
    {
      heading: "December",
      title:
        "Acer Aspire 3 A315-35 - Intel Pentium Silver N6000 / 1.1 GHz - Win 11 Home - UHD Graphics - 8 GB RAM - 512 GB SSD QLC - 39.62 cm (15.6) - (4710886785170)",
      price: "535.99",
      winnerName: "Sher Gut",
      winnerImage: winnerAvatar,
    },
    {
      heading: "November",
      title:
        "Acer Aspire 3 A315-35 - Intel Pentium Silver N6000 / 1.1 GHz - Win 11 Home - UHD Graphics - 8 GB RAM - 512 GB SSD QLC - 39.62 cm (15.6) - (4710886785170)",
      price: "535.99",
      winnerName: "Sher Gut",
      winnerImage: winnerAvatar,
    },
    {
      heading: "October",
      title:
        "Acer Aspire 3 A315-35 - Intel Pentium Silver N6000 / 1.1 GHz - Win 11 Home - UHD Graphics - 8 GB RAM - 512 GB SSD QLC - 39.62 cm (15.6) - (4710886785170)",
      price: "535.99",
      winnerName: "Sher Gut",
      winnerImage: winnerAvatar,
    },
  ];

  return (
    <div className="flex items-center justify-center relative xl:h-[718px] md:h-[450px] h-[350px] max-w-[1920px] mx-auto">
      {/* Trophy and Stars Background */}
      <div className="absolute w-full h-full">
        <Image
          src={maintrophysection}
          alt="Trophy"
          className="object-cover xl:object-contain object-center xl:h-[718px] md:h-[450px] h-[350px]"
          priority
        />
      </div>

      <Swiper
        effect={"fade"}
        navigation={true}
        // pagination={{
        //   clickable: true,
        // }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="w-full mySwiper"
      >
        {winners.map((winner, index) => (
          <SwiperSlide key={index}>
            <div className="py-0 lg:py-12 flex items-center">
              <div className="w-full max-w-7xl px-20 py-10 md:px-10 lg:px-16">
                <div className="md:pl-8 lg:pl-32 py-4 md:py-6 lg:py-0">
                  <div className="flex flex-col items-center md:items-start justify-start md:gap-2">
                    <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[82px] font-extrabold text-white/90 mb-2">
                      {winner.heading}
                    </h3>
                    <h3 className="text-xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-[64px] font-extrabold text-white/90 mb-2 md:mb-4 lg:mb-6">
                      Tournament{" "}
                      <span className="text-white bg-primary px-4 py-1 rounded">
                        Winner
                      </span>
                    </h3>
                  </div>

                  <p className="mt-4 text-xs sm:text-lg w-[68%] md:w-[62%] lg:text-xl xl:text-2xl text-white leading-1 mb-2 md:mb-4 lg:mb-6">
                    {winner.title}
                  </p>

                  <div className="flex flex-col items-start">
                    <p className="text-xl lg:text-4xl xl:text-[44px] font-bold text-white mb-4 lg:mb-6 xl:mb-10">
                      {winner.price}€
                    </p>

                    <div className="flex items-center gap-3 lg:gap-7">
                      <div className="xl:w-28 lg:w-20 w-16 xl:h-28 lg:h-20 h-16 rounded-full overflow-hidden border-8 lg:border-[12px] xl:border-[16px] border-[#FF6B3D] shadow-[0px_1px_24px_#FF6B3D]">
                        <Image
                          src={winner.winnerImage}
                          alt={winner.winnerName}
                          width={100}
                          height={100}
                          className="lg:w-full lg:h-full w-14 h-14 object-cover"
                        />
                      </div>
                      <span className="text-white text-xl lg:text-2xl font-extrabold">
                        {winner.winnerName}
                      </span>
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
