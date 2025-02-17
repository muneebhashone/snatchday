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
    <div className="relative max-w-[1920px] mx-auto">
      {/* Trophy and Stars Background */}
      <div className=" w-full h-full">
        <Image
          src={maintrophysection}
          alt="Trophy"
          className="md:object-contain md:h-auto h-[200px]"
          priority
        />
      </div>

      <Carousel className="absolute -top-7 sm:-top-2 md:top-0 left-0" opts={{ loop: true }}>
        <CarouselContent>
          {winners.map((winner, index) => (
            <CarouselItem key={index}>
              {/* Content */}
              <div className="py-0 lg:py-12 flex items-center">
                <div className="w-full max-w-7xl px-4 py-10 md:px-6 lg:px-8">
                  <div className="md:max-w-4xl md:pl-8 lg:pl-32 py-4 md:py-6 lg:py-0">
                    <h3 className="text-xl lg:text-5xl xl:text-7xl font-extrabold text-white/90 mb-2">
                      {winner.heading}
                    </h3>
                    <h3 className="text-xl lg:text-5xl xl:text-6xl font-extrabold text-white/90 mb-2 md:mb-4 lg:mb-7">
                      Tournament <span className="text-white bg-primary px-4 py-1 rounded">Winner</span>
                    </h3>


                    <p className="text-[24px] text-white leading-relaxed mb-2 md:mb-4 lg:mb-7">
                      {winner.title}
                    </p>

                    <div className="flex md:flex-col flex-row-reverse md:items-start items-center justify-between">
                      <p className="text-xl lg:text-[44px] font-extrabold text-white">
                        {winner.price}€
                      </p>

                      <div className="flex items-center gap-3 md:gap-4 mt-12">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 md:border-8 border-primary">
                          <Image
                            src={winner.winnerImage}
                            alt={winner.winnerName}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-white text-2xl font-extrabold">
                          {winner.winnerName}
                        </span>
                      </div>
                    </div>
                    {/* <p className="text-xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 lg:mb-6">
                      {winner.price}€
                    </p>

                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border-4 md:border-8 border-[#FF6B3D]">
                        <Image
                          src={winner.winnerImage}
                          alt={winner.winnerName}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-white text-base md:text-lg font-medium">
                        {winner.winnerName}
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-white/10 rounded-full border-0 text-white hover:bg-primary transition-colors" />
        <CarouselNext className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-white/10 rounded-full border-0 text-white hover:bg-primary transition-colors" />
      </Carousel>
    </div>
  );
};

export default TournamentWinnerCardSlider;
