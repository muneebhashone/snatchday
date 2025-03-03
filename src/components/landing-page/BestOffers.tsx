import React from "react";
import BestOfferCard from "../BestOfferCards";
import { bestOffers } from "@/dummydata";

const BestOffers = () => {
  return (
    <section className="py-8">
      <div className="container max-w-[1920px] mx-auto px-5 xl:px-10">
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6"> */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
          {bestOffers.map((offer, index) => (
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
