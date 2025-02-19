import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    <div className="flex items-center justify-center relative xl:h-[780px] md:h-[450px] h-[350px] max-w-[1920px] mx-auto">
      {/* Trophy and Stars Background */}
      <div className="absolute w-full h-full">
        <Image
          src={maintrophysection}
          alt="Trophy"
          className="object-cover object-center xl:h-[780px] md:h-[450px] h-[350px]"
          priority
        />
      </div>

      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {winners.map((winner, index) => (
            <CarouselItem key={index}>
              {/* Content */}
              <div className="py-0 lg:py-12 flex items-center">
                <div className="w-full max-w-7xl px-20 py-10 md:px-10 lg:px-8">
                  <div className="md:max-w-4xl md:pl-8 lg:pl-32 py-4 md:py-6 lg:py-0">
                    <div className="flex flex-col items-center md:items-start justify-start md:gap-2 ">
                      <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold text-white/90 mb-2">
                        {winner.heading}
                      </h3>
                      <h3 className="text-xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-6xl font-extrabold text-white/90 mb-2 md:mb-4 lg:mb-6">
                        Tournament{" "}
                        <span className="text-white bg-primary px-4 py-1 rounded">
                          Winner
                        </span>
                      </h3>
                    </div>

                    <p className="bg-opacity-10 text-xs sm:text-lg w-[68%] md:w-[62%] lg:text-xl xl:text-2xl text-white/90 leading-1 mb-2 md:mb-4 lg:mb-6">
                      {winner.title}
                    </p>

                    {/* <div className="flex md:flex-col flex-row-reverse md:items-start items-center justify-end"> */}
                    <div className="flex flex-col items-start ">
                      <p className="text-xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">
                        {winner.price}€
                      </p>

                      <div className="flex items-center gap-3 lg:gap-7">
                        <div className="xl:w-28 lg:w-20 w-16 xl:h-28 lg:h-20 h-16 rounded-full overflow-hidden border-8 lg:border-[12px] xl:border-[16px] border-[#FF6B3D] shadow-[0px_1px_24px_#FF6B3D] ">
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
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute sm:shadow-none shadow-[0px_0px_20px_#f37835] left-3 md:left-4 top-[37%] md:top-1/2 -translate-y-1/2 w-10 sm:w-16 h-10 sm:h-16 lg:w-24 lg:h-24 bg-white/10 rounded-full border-0 text-white hover:bg-primary transition-colors" />
        <CarouselNext className="absolute sm:shadow-none shadow-[0px_0px_20px_#f37835] right-20 sm:right-[50%] md:right-4 top-[37%] md:top-1/2 -translate-y-1/2 w-10 sm:w-16 h-10 sm:h-16 lg:w-24 lg:h-24 bg-white/10 rounded-full border-0 text-white hover:bg-primary transition-colors" />
      </Carousel>
    </div>
  );
};

export default TournamentWinnerCardSlider;
