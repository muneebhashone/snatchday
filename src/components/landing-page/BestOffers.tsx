import React from "react";
import BestOfferCard from "../BestOfferCards";
import { bestOffers } from "@/dummydata";
import { useGetBanners } from "@/hooks/api";
import tournament from "@/app/images/tournament.png";

import bestoffer from "@/app/images/bestoffer.png";

const BestOffers = () => {
  const { data: bestOffers } = useGetBanners()
  console.log(bestOffers)
  return (
    <section className="py-8">
      <div className="container max-w-[1920px] mx-auto px-5 xl:px-10">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
          {bestOffers?.data?.slice(3, 5).map((offer, index) => (
            <BestOfferCard 
              key={index}
              bgimage={index === 0 ? tournament : bestoffer}
              subtitle={offer.title}
              buttonText="Explore More"
              image={offer.image}
              buttonTextcolor="#000"
              links={offer.link}
            >
              {offer.content && (
                <div dangerouslySetInnerHTML={{ __html: offer.content }} />
              )}
            </BestOfferCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestOffers;
