import React from "react";
import Image from "next/image";
import Link from "next/link";



interface PromotionalBannersProps {
  icon: React.ReactNode;
  iconbg: string;
  iconText: string;
  title: string;
  discount: boolean;
  bannerImage: string;
  mainbg: string;
}

const PromotionalBanners = ({ icon, iconbg, iconText, title, discount, bannerImage, mainbg }: PromotionalBannersProps) => {
  return (
   
        <div className={`${mainbg} rounded-3xl p-10 relative overflow-hidden group hover:shadow-lg transition-shadow`}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">


              <div className={`h-16 w-16 ${iconbg} rounded-full flex items-center justify-center`}>
              {icon}
              </div>


              <span className={`inline-flex items-center px-3 py-2 rounded-full text-sm ${iconbg} text-white`}>
               {iconText}
              </span>
              <div className="space-y-2">

                <h3 className="text-2xl font-medium">
                  {title}
                </h3>
              </div>


              <Link
                href="/deals"
                className={`inline-flex items-center ${iconbg} text-white hover:underline`}
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
            <div className="relative">
              <Image
                src={bannerImage}
                alt="iPhone 15"
                width={213}
                height={379}
                className="object-contain transform group-hover:scale-105 transition-transform duration-300"
              />
              {/* Discount */}
              {discount && (
                <div className="flex items-center justify-center bg-white text-foreground w-28 h-28 rounded-full text-sm absolute bottom-8 left-0">
                  <h3 className="text-center">

                  UP TO <h3 className="text-primary font-bold text-2xl">20%</h3>
                  Off
                </h3>
              </div>
              )}
            </div>
          </div>

        </div>
 
  );
};

export default PromotionalBanners;
