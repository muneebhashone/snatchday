import Image from "next/image";
import React from "react";
import ratingsectionimage from "@/app/images/ratingsection.png";
import RatingSlider from "../RatingSlider";
const RatingsSection = () => {
  return (
    <div className="bg-[#F6E9E1] py-28 lg:py-24 xl:py-28 px-8 lg:pl-10 pr-20 xl:pr-40 2xl:px-40 h-full">
      <div className="lg:grid grid-cols-1 lg:grid-cols-2 lg-grid-cols-1 lg:gap-10 flex items-center justify-center" >
        {/* <Image className="hidden lg:block lg:col-span-1" src={ratingsectionimage} alt="rating" /> */}
        <div className="hidden lg:block lg:col-span-1"><Image className="" src={ratingsectionimage} alt="rating" /></div>
        <div className="content-center col-span-1 lg:col-span-1 px-10 self-center justify-self-center">
          <RatingSlider />
        </div>
      </div>
    </div>
    // <div className="bg-[#F6E9E1] py-28 lg:py-24 xl:py-28 px-8 lg:px-28 xl:px-40 mb-20 lg:mb-0">
    //   <div className="lg:grid grid-cols-1 xl:grid-cols-2 xl:gap-10 flex items-center justify-center" >
    //     <Image className="hidden lg:block lg:col-span-1 w-96 h-96 self-center justify-self-center" src={ratingsectionimage} alt="rating" />
    //     <div className="content-center col-span-1 lg:col-span-1 px-10 self-center justify-self-center">
    //       <RatingSlider />
    //     </div>
    //   </div>
    // </div>
  );
};

export default RatingsSection;
