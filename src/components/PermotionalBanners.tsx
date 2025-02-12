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
      className={`${mainbg} rounded-3xl relative overflow-hidden group hover:shadow-lg transition-shadow pt-16 pl-10`}
    >
      <div className="">
        <div className="space-y-4 max-w-[40%] relative z-10">
          <div
            className={`h-20 w-20 ${iconbg} rounded-full flex items-center justify-center`}
          >
            {icon}
          </div>

          <span
            className={`inline-flex items-center px-3 py-2 rounded-full text-sm ${iconbg} ${
              iconText === "70% OFF" ? "text-black" : "text-white"
            }`}
          >
            {iconText}
          </span>
          <div className="space-y-2">
            <h3 className="text-lg text-[#1C1B1D] md:text-2xl sm:bg-transparent bg-slate-200 bg-opacity-20 px-1 rounded-md">
              {title} <span className="font-bold">{boldText}</span>
            </h3>
          </div>

          <Link
            href="/deals"
            className={`inline-flex items-center text-card-foreground text-xl`}
          >
            Explore More
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="flex items-center justify-start gap-4 relative z-10 my-7">
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
