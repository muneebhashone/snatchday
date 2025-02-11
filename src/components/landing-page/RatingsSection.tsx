import Image from "next/image";
import React from "react";
import ratingsectionimage from "@/app/images/ratingsection.png";
import RatingSlider from "../RatingSlider";
const RatingsSection = () => {
  return (
    <div className="bg-[#F6E9E1] py-16 lg:py-24 xl:py-28 px-8 lg:px-32 xl:px-40 flex items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10 items-center">
        <Image className="grid-cols-1 lg:col-span-1" src={ratingsectionimage} alt="rating" />
      <div className="content-center grid-cols-1 lg:col-span-1 px-">
        <RatingSlider />
      </div>
      </div>
    </div>
  );
};

export default RatingsSection;
