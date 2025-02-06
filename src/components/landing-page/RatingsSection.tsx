import Image from "next/image";
import React from "react";
import ratingsectionimage from "@/app/images/ratingsection.png";
import RatingSlider from "../RatingSlider";
const RatingsSection = () => {
  return (
    <div className="bg-[#F6E9E1] py-32 px-40">
      <div className="grid grid-cols-2 gap-10">
        <Image src={ratingsectionimage} alt="rating" />
      <div className="content-center px-20">
        <RatingSlider />
      </div>
      </div>
    </div>
  );
};

export default RatingsSection;
