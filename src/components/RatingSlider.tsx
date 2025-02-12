import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatarimage from "@/app/images/avatarimage.svg";
import ratingmobileimage from "@/app/images/ratingmobileimage.png";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProvenExpertIcon } from "./icons/icon";


const RatingSlider = () => {
  const reviews = [
    {
      name: "Sher Gut",
      rating: 5,
      image: avatarimage,
      review:
        "Nunc non quam sit amet mi pretium pretium eu a eros. Proin semper rhoncus magna, et imperdiet ipsum faucibus vitae. Phasellus lacinia sagittis odio, et tempus erat aliquam eu.",
      product: {
        name: "Realme Narzo 60X",
        image: ratingmobileimage,
      },
    },
    {
      name: "Sher Gut",
      rating: 5,
      image: avatarimage,
      review:
        "Nunc non quam sit amet mi pretium pretium eu a eros. Proin semper rhoncus magna, et imperdiet ipsum faucibus vitae. Phasellus lacinia sagittis odio, et tempus erat aliquam eu.",
      product: {
        name: "Realme Narzo 60X",
        image: ratingmobileimage,
      },
    },
    // Add more reviews as needed
  ];

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="relative"
    >
      <CarouselContent>
        {reviews.map((review, index) => (
          <CarouselItem key={index}>
            <div className="bg-white px-16 shadow-sm rounded-xl pt-12 pb-16">
              
                {/* User Info */}
                <div className="flex sm:flex-row flex-col-reverse items-center justify-between gap-4 mb-6 border-b border-[#E0E0E0] pb-6">
                  <div className="flex items-center justify-center gap-4 text-center">
                    {/* <Avatar className="w-16 md:w-24 h-16 md:h-24"> */}
                    <Avatar className="w-24 h-24 text-md">
                      <AvatarImage src={review.image} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div>
                      {/* <h3 className="text-lg xl:text-xl font-semibold"> */}
                      <h3 className="text-xl md:text-2xl font-bold">
                        {review.name}
                      </h3>
                      <div className="flex text-2xl text-[#FF6B3D]">
                        {"★".repeat(review.rating)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                    <ProvenExpertIcon />
                    <span className="text-2xl text-black font-bold">
                      Proven <span className="font-thin">Expert</span>
                    </span>
                    </div>
                    <p className="text-sm text-gray-900 text-right">its All About Trust</p>
                  </div>
                </div>

                {/* Review Text */}

               

                {/* <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-10 text-center"> */}
                <div className="flex flex-wrap-reverse lg:flex-nowrap lg:flex-row items-center justify-center gap-10">
                  <div className="flex flex-col items-center justify-center md:mt-0 mt-5">
                    <p className="text-xl mb-6">
                      {review.review}
                    </p>
                    {/* <div className="flex justify-between mt-14 md:mt-16 lg:mt-20 px-20 md:mb-10 lg:mb-16 mb-10"> */}
                   
                  </div>

                  {/* Product Image */}

                  <Image
                    // className="lg:w-auto lg:h-auto w-40 md:w-32 h-44 md:h-32"
                    className="xl:w-64 xl:h-72 lg:w-56 lg:h-52 w-48 h-56"
                    src={review.product.image}
                    alt={review.product.name}
                    width={200}
                    height={200}
                  />
                </div>
              
              {/* <div className="flex">
                      <CarouselPrevious className=" w-16 md:w-20 h-16 md:h-20 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary" />
                      <CarouselNext className="w-16 md:w-20 h-16 md:h-20 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary" />
                    </div> */}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
   

        <CarouselPrevious className="w-16 md:w-20 h-16 md:h-20 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary" />
        <CarouselNext className="w-16 md:w-20 h-16 md:h-20 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary" />
      
    </Carousel>
  );
};

export default RatingSlider;
