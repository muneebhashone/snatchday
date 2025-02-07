import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import maintrophysection from "@/app/images/maintrophysection.png";

const     TournamentWinnerCardSlider = () => {
  const winners = [
    {
      heading: "December Tournament Winner",
      title:
        "Acer Aspire 3 A315-35 - Intel Pentium Silver N6000 / 1.1 GHz - Win 11 Home - UHD Graphics - 8 GB RAM - 512 GB SSD QLC - 39.62 cm (15.6) - (4710886785170)",
      price: "535.99",
      winnerName: "Sher Gut",
      winnerImage: maintrophysection,
    },
    {
      heading: "November Tournament Winner",
      title:
        "Acer Aspire 3 A315-35 - Intel Pentium Silver N6000 / 1.1 GHz - Win 11 Home - UHD Graphics - 8 GB RAM - 512 GB SSD QLC - 39.62 cm (15.6) - (4710886785170)",
      price: "535.99",
      winnerName: "Sher Gut",
      winnerImage: maintrophysection,
    },
    {
      heading: "October Tournament Winner",
      title:
        "Acer Aspire 3 A315-35 - Intel Pentium Silver N6000 / 1.1 GHz - Win 11 Home - UHD Graphics - 8 GB RAM - 512 GB SSD QLC - 39.62 cm (15.6) - (4710886785170)",
      price: "535.99",

      winnerName: "Sher Gut",
      winnerImage: maintrophysection,
    },
    // Add more winners if needed
  ];

  return (
    <Carousel className="relative" opts={{ loop: true }}>
      <CarouselContent>
        {winners.map((winner, index) => (
          <CarouselItem key={index}>
            <div className="relative">
              {/* Trophy and Stars Background */}
              <div className="w-full">
                <Image
                  src={maintrophysection}
                  alt="Trophy"
                  className=""
                  priority
                />
              </div>

              {/* Content */}
              <div className="absolute top-0 left-0 z-10 w-full py-12 flex items-center">
                <div className="w-full max-w-8xl mx-auto px-4 py-10 md:px-6 lg:px-8">
                  <div className="md:max-w-3xl md:pl-8 lg:pl-32 py-4 md:py-6 lg:py-0">
                    <h3 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white/90 mb-4 md:mb-6">
                      {winner.heading}
                    </h3>

                    <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed mb-4 md:mb-6">
                      {winner.title}
                    </p>

                    <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white/10 rounded-full border-0 text-white hover:bg-white/20 transition-colors" />
      <CarouselNext className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white/10 rounded-full border-0 text-white hover:bg-white/20 transition-colors" />
    </Carousel>
  );
};

export default TournamentWinnerCardSlider;
