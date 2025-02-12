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
    <div className="relative rounded-3xl overflow-hidden group hover:shadow-lg transition-all duration-300">
      {/* Background Image */}
      <div className="w-full h-full">
        <Image
          src={bgimage}
          alt="Background"
          width={892}
          height={500}
          className="w-full h-auto object-cover min-h-[500px] md:min-h-[400px]"
          priority
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-4 md:p-6 lg:p-10 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="w-[40%] space-y-3 md:space-y-4">
          {/* Tag Badge */}
          <span className="inline-flex items-center px-3 py-1.5 text-sm md:text-base border-2 border-white rounded text-white font-medium">
            {tag}
          </span>

          {/* Title Section */}
          <div className="space-y-1 md:space-y-2">
            <h3 className="text-xl md:text-2xl lg:text-3xl text-white font-medium">
              {title}
            </h3>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              {subtitle}
            </h2>
          </div>

          {/* Button */}
          <button
            className={`bg-white px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium hover:bg-white/90 transition-all`}
            style={{ color: buttonTextcolor }}
          >
            {buttonText}
          </button>
        </div>

        {/* Product Image */}
        <div className="w-[60%] mt-4 md:mt-0">
          <div className="flex justify-center md:justify-end">
            <Image
              src={image}
              alt="Product"
              width={468}
              height={300}
              className="md:w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestOfferCard;
