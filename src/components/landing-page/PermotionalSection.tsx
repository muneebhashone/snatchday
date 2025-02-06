import React from "react";
import PromotionalBanners from "../PermotionalBanners";
import bannerIphone from "@/app/images/banner-iphone.png";
import banner2 from "@/app/images/banner2.png";
import { AppleIcon, SnatchIcon } from "../icons/icon";

const PermotionalSection = () => {
  return (
    <section className="container max-w-[1920px] mx-auto px-12 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Promotional Banners */}
        {}
        <PromotionalBanners

          icon={<AppleIcon />}
          iconbg="bg-[#FF6B3D]"
          iconText="IPHONE"
          title="Best Deal Online on IPHONE 15 SERIES."
          discount={true}
          bannerImage={bannerIphone.src}
          mainbg="bg-[#FFF6F2]"
        />
        <PromotionalBanners
          icon={<SnatchIcon />}
          mainbg="bg-[#E5D3FF]"

          iconbg="bg-[#8D4CC4]"
          iconText="Snatch Day"
          title="New Offer Reveal with in after 24 hours."
          discount={false}
          bannerImage={banner2.src}

        />
        <PromotionalBanners
          icon={<SnatchIcon />}
          mainbg="bg-[#E5D3FF]"

          iconbg="bg-[#8D4CC4]"
          iconText="Snatch Day"
          title="New Offer Reveal with in after 24 hours."
          discount={false}
          bannerImage={banner2.src}

        />
    
      </div>
    </section>
  );
};

export default PermotionalSection;
