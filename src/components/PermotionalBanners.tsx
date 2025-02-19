import React from "react";

import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

interface PromotionalBannersProps {
  icon: React.ReactNode;
  iconbg: string;
  iconText: string;
  title: string;
  discount: boolean;

  mainbg: string;
  boldText: string;
  children: React.ReactNode;
  time?: { timer: string; timerText: string }[];
}

const PromotionalBanners = ({
  icon,
  iconbg,
  iconText,
  title,
  mainbg,
  boldText,
  children,
  time,
}: PromotionalBannersProps) => {
  return (
    <div
      className={`${mainbg} w-[400px] sm:w-[550px] 2xl:w-[585px] h-[500px] flex sm:items-center sm:text-start text-center items-end justify-center rounded-3xl relative overflow-hidden group hover:shadow-lg transition-shadow pt-16 pl-2 sm:pl-0 lg:pl-10`}
    >
      <div className="">
        <div className="w-[90%] sm:max-w-[45%] lg:max-w-[35%] relative z-10">
          <div className="flex sm:items-start items-center justify-center sm:flex-col gap-2 sm:gap-0">
            <div
              className={`h-16 sm:h-20 w-16 sm:w-20 ${iconbg} rounded-full flex items-center justify-center`}
            >
              {icon}
            </div>

            <span
              className={`w-max inline-flex items-center px-3 py-0 h-8 sm:h-auto rounded-full mt-3 text-sm ${iconbg} ${iconText === "70% OFF" ? "text-black" : "text-white"
                }`}
            >
              {iconText}
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-lg text-[#1C1B1D] md:text-2xl bg-opacity-20 px-1 rounded-md">
              {title} <span className="font-bold">{boldText}</span>
            </h3>
          </div>

          <Link
            href="/deals"
            className={`inline-flex items-center text-card-foreground text-md md:text-xl mt-4`}
          >
            Explore More
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="flex items-center justify-center sm:justify-start gap-4 relative z-10 my-7">
          {time?.map((item) => {
            return (
              <div key={item.timer} className="text-center">
                <div className="text-3xl bg-[#CDB3FF] px-4 py-1">
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
