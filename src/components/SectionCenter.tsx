import Image from "next/image";
import React from "react";
import game1 from "@/app/images/game1.png";
import game2 from "@/app/images/game2.png";
import game3 from "@/app/images/game3.png";
import game4 from "@/app/images/game4.png";
import game5 from "@/app/images/game5.png";

const SectionCenter = ({
  title,
  titlebg,
  description,
}: {
  title: string;
  titlebg: string;
  description?: string;
}) => {
  const floatingImages = [
    {
      src: game1,
      alt: "game1",
      className: "animate-float-1 absolute top-20 left-[10%]",
    },
    {
      src: game2,
      alt: "game2",
      className: "animate-float-2 absolute bottom-40 right-[10%]",
    },
    {
      src: game3,
      alt: "game3",
      className: "animate-float-3 absolute top-40 right-[30%]",
    },
    {
      src: game4,
      alt: "game4",
      className: "animate-float-4 absolute bottom-20 left-[30%]",
    },
    {
      src: game5,
      alt: "game5",
      className: "animate-float-5 absolute top-60 right-[20%]",
    },

    {
      src: game2,
      alt: "game2",
      className: "animate-float-2 absolute top-32 right-[40%]",
    },
    {
      src: game3,
      alt: "game3",
      className: "animate-float-3 absolute bottom-32 right-[35%]",
    },
  ];
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {floatingImages.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            width={80}
            height={80}
            className={`${image.className} opacity-10 hover:opacity-20 transition-opacity duration-300`}
          />
        ))}
      </div>
      <div className="container max-w-[1440px] mx-auto px-12 relative z-10">
        <h2 className="text-3xl lg:text-6xl font-bold my-5 text-center">
          {title}
          <span className="bg-[#FF6B3D] text-white px-6 py-2 rounded-lg ml-1">
            {titlebg}
          </span>
        </h2>

        <p className="text-center text-xl text-card-foreground mt-10">
          {description}
        </p>
      </div>
    </section>
  );
};

export default SectionCenter;
