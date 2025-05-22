import React from "react";

import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

interface PromotionalBannersProps {
  icon: string;
  iconbg: string;
  iconText: string;
  title: string;
  discount: boolean;
  mainbg: string;
  children: React.ReactNode;
  time?: { timer: string; timerText: string }[];
  links: string;
}

const PromotionalBanners = ({
  icon,
  iconbg,
  iconText,
  title,
  mainbg,
  children,
  time,
  links,
}: PromotionalBannersProps) => {
  return (
    <div
      className={`${mainbg} object-fill w-[600px] md:w-[500px] grid rounded-3xl relative overflow-hidden group hover:shadow-lg transition-shadow pt-5 sm:pt-16 pl-5 lg:pl-10`}
    >
      <div className="">
        <div className="w-[60%] xs:w-[40%] sm:max-w-[45%] lg:max-w-[35%] relative z-10">
          <div className="flex sm:items-start items-start justify-start sm:flex-col gap-2 sm:gap-0">
            <div
              className={`h-14 sm:h-20 w-14 sm:w-20 ${iconbg} rounded-full flex items-center justify-center`}
            >
              <Image src={icon} alt="icon" width={24} height={24} />
            </div>

            <span
              className={`w-max inline-flex items-center px-3 sm:px-3 py-0 h-8 sm:h-auto rounded-full mt-3 text-xs sm:text-sm ${iconbg} ${
                iconText === "70% OFF" ? "text-black" : "text-white"
              }`}
            >
              {iconText}
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-lg text-[#1C1B1D] md:text-2xl bg-opacity-20 px-1 rounded-md">
              {title}
            </h3>
          </div>

          <Link
            href={links || "/deals"}
            className={`inline-flex items-center text-card-foreground text-md md:text-xl mt-4`}
          >
            Explore More
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="flex items-center xs:justify-center xs:pl-0 pl-2 sm:justify-start gap-4 relative z-10 my-7">
          {time?.map((item, i) => {
            return (
              <div key={`${item.timer} + ${i}`} className="text-center">
                <div className="text-xl xs:text-3xl bg-[#CDB3FF] px-4 py-1">
                  {item.timer}
                </div>

                <p>{item.timerText}</p>
              </div>
            );
          })}
        </div>
        {children}
      </div>
    </div>
  );
};

export default PromotionalBanners;
