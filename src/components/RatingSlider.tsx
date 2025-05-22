"use client";

import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatarimage from "@/app/images/avatarimage.svg";
import ratingmobileimage from "@/app/images/ratingmobileimage.png";
import { reviews } from "@/dummydata";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProvenExpertIcon } from "./icons/icon";
import { useGetReviews } from "@/hooks/api";

const RatingSlider = () => {
  const { data: review } = useGetReviews();
  // console.log("review", review);
  const reviews = review?.data.reviews || [];

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      // className="relative max-w-[600px] lg:max-w-[700px] mb-24 xl:mb-0"
      className="relative max-w[90%] sm:max-w-[65%] lg:max-w-[500px] xl:max-w-[700px] mb-24 xl:mb-0 mx-auto"
    >
      <CarouselContent>
        {reviews.map((review, index) => (
          <CarouselItem key={index}>
            <div className="bg-white px-2 sm:px-10 lg:px-7 xl:px-16 shadow-sm rounded-xl pt-6 sm:pt-10 lg:pt-4 xl:pt-12 pb-6 sm:pb-10 lg:pb-2 xl:pb-16 w-full">
              {/* User Info */}
              <div className="flex flex-row items-center justify-between gap-4 mb-6 border-b border-[#E0E0E0] pb-6">
                {/* <div className="flex flex-wrap-reverse items-center justify-between gap-4 mb-6 border-b border-[#E0E0E0] pb-6"> */}
                <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-4 text-center">
                  {/* <Avatar className="w-16 md:w-24 h-16 md:h-24"> */}
                  <Avatar className="w-12 lg:w-14 2xl:w-24 h-12 lg:h-14 2xl:h-24 text-sm md:text-md">
                    <AvatarImage src={review.image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div>
                    {/* <h3 className="text-lg xl:text-xl font-semibold"> */}
                    <h3 className="text-sm sm:text-md md:text-xl xl:text-2xl font-bold">
                      {review.userName}
                    </h3>
                    <div className="flex text-sm sm:text-md md:text-xl xl:text-2xl text-[#FF6B3D]">
                      {"★".repeat(review.rating)}
                      <span className="text-gray-300">
                        {"★".repeat(5 - review.rating)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap items-center  gap-2 justify-center">
                    <ProvenExpertIcon />
                    <span className="text-sm sm:text-md md:text-xl xl:text-2xl text-black font-bold text-center">
                      Proven <span className="font-thin">Expert</span>
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-900 mx-auto w-max">
                    its All About Trust
                  </p>
                </div>
              </div>

              {/* Review Text */}

              {/* <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-10 text-center"> */}
              <div className="flex flex-col-reverse xl:flex-row items-center justify-between gap-10">
                <div className="min-w-[60%] flex flex-col items-center justify-center md:mt-0 mt-5 px-2 lg:text-start text-center">
                  <p className="text-sm sm:text-lg md:text-xl xl:text-xl mb-6">
                    {review.comment}
                  </p>
                  {/* <div className="flex justify-between mt-14 md:mt-16 lg:mt-20 px-20 md:mb-10 lg:mb-16 mb-10"> */}
                </div>

                {/* Product Image */}

                <Image
                  // className="lg:w-auto lg:h-auto w-40 md:w-32 h-44 md:h-32"
                  className="xl:max-w-[40%] xl:w-64 xl:h-72 lg:w-96 object-contain lg:h-48 w-36 md:w-48 h-40 md:h-56"
                  src={review.product.images[0]}
                  alt={review.product.name}
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="-left-5 sm:-left-12 flex items-center justify-center w-10 sm:w-16 md:w-20 h-10 sm:h-16 md:h-20 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary" />
      <CarouselNext className="-right-5 sm:-right-12 flex items-center justify-center w-10 sm:w-16 md:w-20 h-10 sm:h-16 md:h-20 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary" />
    </Carousel>
  );
};

export default RatingSlider;
