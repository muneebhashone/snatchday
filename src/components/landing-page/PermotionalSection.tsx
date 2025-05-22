import React from "react";
import PromotionalBanners from "../PermotionalBanners";
import { AppleIcon, PercentageIcon, SnatchIcon } from "../icons/icon";
import Image from "next/image";
import banner1 from "@/app/images/banner-iphone.png";
import banner2 from "@/app/images/banner2.png";
import percentage from "@/app/images/percentage.png";
import { useGetBanners } from "@/hooks/api";


const PermotionalSection = () => {

  const {data: banners} = useGetBanners();
  console.log(banners);
  const bannerList = banners?.data || [];
  const iphoneBanner = bannerList[0];
  const snatchDayBanner = bannerList[1];
  const saleBanner = bannerList[2];
  return (
    <section className="container max-w-[1920px] mx-auto  py-16">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"> */}
      <div className="flex flex-wrap gap-6 justify-center">
        <PromotionalBanners
          icon={iphoneBanner?.logoImage}
          iconbg="bg-[#FF6B3D]"
          iconText={iphoneBanner?.title}
          title= {iphoneBanner?.content && (
            <div className="mt-4" dangerouslySetInnerHTML={{ __html: iphoneBanner.content }} />
          )}
         
          mainbg="bg-[#FFF6F2]"
          discount={true}
          links={iphoneBanner?.link}
        >
          <div className="absolute top-[10%]  right-[2%] xs:right-[18%] sm:right-10">
            {/* <div className="flex items-center justify-center text-center bg-white text-foreground w-20 md:w-28 h-20 md:h-28 rounded-full text-sm absolute bottom-0 -left-10">
              <h3 className="text-center text-md md:text-lg">
                UP TO <h1 className="text-primary font-semibold text-[22px] md:text-[28px]">20%</h1>{" "}
                Off
              </h3>
            </div> */}
            <Image
              className="sm:h-[320px] lg:w-[300px] sm:w-[180px] lg:h-[470px] w-[120px] h-[190px] xs:w-[160px] xs:h-[220px] object-contain"
              src={iphoneBanner?.image}
              alt="banner"
              width={213}
              height={379}
            />
          </div>
          {/* Render content HTML from API */}
         
        </PromotionalBanners>

        <PromotionalBanners
          time={snatchDayBanner ? [
            { timer: "24", timerText: "Hours" },
            { timer: "00", timerText: "Minutes" },
            { timer: "00", timerText: "Seconds" },
          ] : undefined}
          icon={snatchDayBanner?.logoImage}
          mainbg="bg-[#E5D3FF]"
          iconbg="bg-[#8D4CC4]"
          iconText={snatchDayBanner?.title || "Snatch Day"}
          title={snatchDayBanner?.content && (
            <div className="mt-4" dangerouslySetInnerHTML={{ __html: snatchDayBanner.content }} />
          )}
          
          discount={false}
          links={snatchDayBanner?.link}
        >
          <div className="absolute top-12 xs:-top-5 -right-[5%] xs:right-[15%] sm:top-16 sm:right-5 cursor-pointer">
            <Image
              className="sm:h-[350px] lg:h-[350px] sm:w-[240px] lg:w-[350px] w-[220px] h-[250px] object-contain"
              src={snatchDayBanner?.image}
              width={400}
              height={379}
              alt="banner"
            />
          </div>
        </PromotionalBanners>

        <PromotionalBanners
          icon={saleBanner?.logoImage}
          mainbg="bg-[#fdcc3f]"
          iconbg="bg-white"
          iconText={saleBanner?.title}
          title={saleBanner?.content && (
            <div className="mt-4" dangerouslySetInnerHTML={{ __html: saleBanner.content }} />
          )}
      
          discount={false}
          links={saleBanner?.link}
        >
          <div className="absolute -top-5 xs:-top-4 sm:top-0 -right-[5%] xs:right-[23%] sm:right-0 opacity-90">
            <Image className="w-[250px] xs:w-[300px] sm:w-[350px] h-[350px] xs:h-[300px] object-contain" src={saleBanner?.image || percentage.src} width={500} height={450} alt="banner" />
          </div>
        </PromotionalBanners>
      </div>
    </section>
  );
};

export default PermotionalSection;
