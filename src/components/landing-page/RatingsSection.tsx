import Image from "next/image";
import React from "react";
import ratingsectionimage from "@/app/images/ratingsection.png";
import RatingSlider from "../RatingSlider";
const RatingsSection = () => {
  return (
    <div className="bg-[#F6E9E1] py-28 lg:py-24 xl:py-28 px-8 lg:pl-10 xl:pr-20 2xl:px-40 h-full overflow-x-hidden">
      {/* <div className="lg:grid grid-cols-1 lg:grid-cols-2 lg-grid-cols-1 lg:gap-10 flex items-center justify-center" > */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg-grid-cols-1 lg:gap-10 " >
        {/* <Image className="hidden lg:block lg:col-span-1" src={ratingsectionimage} alt="rating" /> */}
        <div className="hidden lg:col-span-1 h-full w-full lg:flex items-start"><Image className="object-contain" src={ratingsectionimage} alt="rating" /></div>
        <div className="content-center col-span-1 lg:col-span-1 p-0 md:p-10 self-center justify-self-center w-full">
          <RatingSlider />
        </div>
      </div>
    </div>

  );
};

export default RatingsSection;
