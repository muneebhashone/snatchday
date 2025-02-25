import React from "react";
import BestOfferCard from "../BestOfferCards";
import tournament from "@/app/images/tournament.png";
import mobiles from "@/app/images/mobiles.png";
import bestoffer from "@/app/images/bestoffer.png";
import bestlaptop from "@/app/images/bestlaptop.png";

const BestOffers = () => {
  const offers = [
    {
      // tag: "Tournament",
      // title: "Start at 24 Jan",
      subtitle: "Special Offer for VIP Members",
      buttonText: "VIP-MITGLIED WERDEN",
      image: mobiles,
      bgimage: tournament,
      buttonTextcolor: "#F37835",
      price: '???'
    },
    {
      // tag: "Best Offer",
      // title: "Biggest Sale of the Month with",
      subtitle: "Advantages of VIP Membership",
      buttonText: "VIP-MITGLIED WERDEN",
      bgimage: bestoffer,
      image: bestlaptop,
      buttonTextcolor: "#692280",
      des: [
        '500 Snap Points package included every month',
        'Accept/create unlimited duels',
        'Collect 50 discount points for every non-won tournament',
        '30-day return policy + Free shipping',
        'Exclusive access to the VIP shop + Exclusive tournaments',
        'No contract period + 10% deposit bonus',
        'And much more...'
      ]
    },
  ];

  return (
    <section className="py-8">
      <div className="container max-w-[1920px] mx-auto px-5 xl:px-10">
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6"> */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
          {offers.map((offer, index) => (
            <BestOfferCard key={index} {...offer} >
              {offer.des?.map((item, i) => <li key={i}>{item}</li>)}
            </BestOfferCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestOffers;
