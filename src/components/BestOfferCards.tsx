import React from "react";
import Image, { StaticImageData } from "next/image";

interface BestOfferCardProps {
  tag: string;
  title: string;
  subtitle: string;
  buttonText: string;
  image: StaticImageData;
  bgimage: StaticImageData;
  buttonTextcolor: string;
}





const BestOfferCard = ({
  tag,
  title,
  subtitle,
  buttonText,
  image,
  bgimage,
  buttonTextcolor,
}: BestOfferCardProps) => {
  return (
    <div className="relative">

      {/* Background Image */}
      <div className="top-0 left-0 w-full h-auto">
        <Image
          src={bgimage}
          alt="Background"
          width={892}
          height={500}
          className="object-contain w-full h-auto"
          


        />

      </div>

      {/* Content */}

      <div className="absolute top-0 left-0 z-10 w-full h-full flex items-center justify-between px-10">
        <div>
        {/* Tag Badge */}
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm bg-white/20 text-white font-medium mb-4">

          {tag}

        </span>

        {/* Title Section */}
        <div className="space-y-1 mb-6">
          <h3 className="text-2xl text-white font-medium">{title}</h3>
          <p className="text-4xl font-bold text-white">{subtitle}</p>
        </div>

        {/* Button */}
        <button className={`bg-white ${buttonTextcolor} px-6 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-all`}>
          {buttonText}
        </button>
        </div>

      


      {/* Product Image */}
      
        <div>
          <div>
            <Image
              src={image}
              alt="Product"
              width={280}
              height={180}
              className="object-contain w-full h-full transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>

        </div>
        </div>
      
    </div>
  );
};

export default BestOfferCard;
