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
import { Separator } from "@radix-ui/react-separator";

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
    // Add more reviews as needed
  ];

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {reviews.map((review, index) => (
          <CarouselItem key={index}>
            <div className="bg-white rounded-[32px] p-8 shadow-sm">
              <div>
                
                  {/* User Info */}
                  <div className="flex items-start justify-between gap-4 mb-6">

                    <div className="flex items-center gap-4">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={review.image} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <div>
                      <h3 className="text-xl font-semibold">{review.name}</h3>
                      <div className="flex text-[#FF6B3D] mt-1">
                        {"★".repeat(review.rating)}
                      </div>
                    </div>

                    </div>

                      <div className="flex items-center gap-2">
                        <ProvenExpertIcon />
                        <span className="text-lg text-black font-bold">
                          Proven <span className="font-medium">Expert</span>
                        </span>
                      </div>


                    
                  </div>

                  {/* Review Text */}
                  
                
                <Separator color="#E0E0E0 w-full h-[2px]"/>


                <div className="flex items-center justify-between gap-10">
                  <p className="text-black leading-relaxed mb-6">
                    {review.review}
                  </p>

                {/* Product Image */}
                
                  <Image
                    src={review.product.image}
                    alt={review.product.name}
                    width={200}
                    height={200}
                
                  />
                
                </div>

              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="flex justify-start mt-20 px-20">
        <CarouselPrevious className="relative w-20 h-20 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary" />
        <CarouselNext className="relative w-20 h-20 bg-white shadow-lg border-0 text-gray-700 hover:bg-primary" />
      </div>
    </Carousel>




  );
};

export default RatingSlider;
