import React from "react";
import BestOfferCard from "../BestOfferCards";
import tournament from "@/app/images/tournament.png";
import mobiles from "@/app/images/mobiles.png";
import bestoffer from "@/app/images/bestoffer.png";
import bestlaptop from "@/app/images/bestlaptop.png";

const BestOffers = () => {
  const offers = [
    {
      tag: "Tournament",
      title: "Start at 24 Jan",
      subtitle: "Mobile Competition",
      buttonText: "VIP-MITGLIED WERDEN",
      image: mobiles,
      bgimage: tournament,
      buttonTextcolor: "#F37835",
    },
    {
      tag: "Best Offer",
      title: "Biggest Sale of the Month with",
      subtitle: "70% Off",
      buttonText: "VIP-MITGLIED WERDEN",
      bgimage: bestoffer,
      image: bestlaptop,
      buttonTextcolor: "#692280",
    },
  ];

  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="container max-w-[1920px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {offers.map((offer, index) => (
            <BestOfferCard key={index} {...offer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestOffers;
