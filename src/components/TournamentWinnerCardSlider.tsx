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

const TournamentWinnerCardSlider = () => {
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
      heading: "December Tournament Winner",
      title:
        "Acer Aspire 3 A315-35 - Intel Pentium Silver N6000 / 1.1 GHz - Win 11 Home - UHD Graphics - 8 GB RAM - 512 GB SSD QLC - 39.62 cm (15.6) - (4710886785170)",
      price: "535.99",

      winnerName: "Sher Gut",

      winnerImage: maintrophysection,
    },
    {
      heading: "December Tournament Winner",
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
              <div>
                <Image
                  src={maintrophysection}
                  alt="Trophy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="absolute top-0 left-0 z-10 w-full h-full flex items-center justify-start">
                <div className="max-w-7xl">
                  <div className="max-w-3xl pl-32 py-0 w-full h-full">
                    <h3 className="text-7xl font-bold text-white/90">
                      {winner.heading}


                    </h3>


                    <p className="text-xl text-white/90 leading-relaxed mt-6">
                      {winner.title}
                    </p>


                    <p className="text-5xl font-bold text-white mt-6">
                      {winner.price}€
                    </p>
                    <div className="flex items-center gap-4 mt-6">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-8 border-[#FF6B3D]">
                        <Image
                          src={winner.winnerImage}
                          alt={winner.winnerName}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-white text-lg font-medium">
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

      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full border-0 text-white hover:bg-white/20 transition-colors" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full border-0 text-white hover:bg-white/20 transition-colors" />
    </Carousel>
  );
};

export default TournamentWinnerCardSlider;
