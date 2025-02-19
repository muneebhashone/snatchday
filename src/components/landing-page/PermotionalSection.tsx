import React from "react";
import PromotionalBanners from "../PermotionalBanners";
import { AppleIcon, PercentageIcon, SnatchIcon } from "../icons/icon";
import Image from "next/image";
import banner1 from "@/app/images/banner-iphone.png";
import banner2 from "@/app/images/banner2.png";
import percentage from "@/app/images/percentage.png";


const PermotionalSection = () => {
  return (
    <section className="container max-w-[1920px] mx-auto  py-16">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"> */}
      <div className="flex flex-wrap gap-6 justify-center">
        <PromotionalBanners
          icon={<AppleIcon />}
          iconbg="bg-[#FF6B3D]"
          iconText="IPHONE"
          title="Best Deal Online on "
          boldText="IPHONE 15 SERIES."
          mainbg="bg-[#FFF6F2]"
          discount={true}
        >
          <div className="absolute top-8 sm:top-20 lg:top-8 right-[25%] sm:right-10">
            <div className="flex items-center justify-center text-center bg-white text-foreground w-20 md:w-28 h-20 md:h-28 rounded-full text-sm absolute bottom-0 -left-10">
              <h3 className="text-center text-md md:text-lg">
                UP TO <h1 className="text-primary font-semibold text-[22px] md:text-[28px]">20%</h1>{" "}
                Off
              </h3>
            </div>
            <Image
              className="sm:h-[320px] lg:w-[220px] sm:w-[180px] lg:h-[400px] w-[120px] h-[220px]"
              src={banner1}
              alt="banner"
              width={213}
              height={379}
            />
          </div>
        </PromotionalBanners>

        <PromotionalBanners
          time={[
            { timer: "24", timerText: "Hours" },
            { timer: "00", timerText: "Minutes" },
            { timer: "00", timerText: "Seconds" },
          ]}
          icon={<SnatchIcon />}
          mainbg="bg-[#E5D3FF]"
          iconbg="bg-[#8D4CC4]"
          iconText="Snatch Day"
          title="New Offer Reveal with in after"
          boldText="24 hours."
          discount={false}
        >
          <div className="absolute -top-5 right-[20%] sm:top-16 sm:right-5 cursor-pointer">
            <Image
              className="sm:h-[350px] lg:h-[350px] sm:w-[240px] lg:w-[350px] w-[220px] h-[250px] object-contain"
              src={banner2.src}
              width={400}
              height={379}
              alt="banner"
            />
          </div>
        </PromotionalBanners>

        <PromotionalBanners
          icon={<PercentageIcon />}
          mainbg="bg-[#ffc107]"
          iconbg="bg-white"
          iconText="70% OFF"
          title="Biggest Sale of the Month with "
          boldText="70% Off"
          discount={false}
        >
          <div className="absolute top-10 sm:top-0 right-[23%] sm:right-0 opacity-90">
            <Image className="" src={percentage.src} width={500} height={450} alt="banner" />
          </div>
        </PromotionalBanners>
      </div>
    </section>
  );
};

export default PermotionalSection;
