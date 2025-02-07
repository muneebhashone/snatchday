import React from "react";

import Link from "next/link";

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

      className={`${mainbg} rounded-3xl relative overflow-hidden group hover:shadow-lg transition-shadow`}
    >
      <div className="py-10 px-10">
        <div className="space-y-4 max-w-[300px] relative z-10">
          <div
            className={`h-16 w-16 ${iconbg} rounded-full flex items-center justify-center`}
          >
            {icon}
          </div>

          <span
            className={`inline-flex items-center px-3 py-2 rounded-full text-sm ${iconbg} text-white`}
          >
            {iconText}
          </span>
          <div className="space-y-2">
            <h3 className="text-2xl font-medium">
              {title} <span className="font-bold">{boldText}</span>
            </h3>
          </div>

          <Link
            href="/deals"
            className={`inline-flex items-center text-black hover:underline`}
          >
            Explore More
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
        <div className="flex items-center justify-start gap-4 relative z-10 mt-10">
          {time?.map((item)=>{
            return(
          <div key={item.timer} className="text-center">


            <div className="text-3xl bg-[#CDB3FF] px-4 py-2">{item.timer}</div>



            <p>{item.timerText}</p>
          </div>


            )
          })}
          

        </div>
        {children}
      </div>
    </div>
  );
};

export default PromotionalBanners;
