import React from "react";
import PromotionalBanners from "../PermotionalBanners";
import { AppleIcon, PercentageIcon, SnatchIcon } from "../icons/icon";
import Image from "next/image";
import banner1 from "@/app/images/banner-iphone.png";
import banner2 from "@/app/images/banner2.png";
import percentage from "@/app/images/percentage.png";
import { PromotionModal } from "../PromotionModal";
import { Dialog, DialogTrigger } from "../ui/dialog";
// import { Dialog, DialogClose, DialogTrigger } from "@radix-ui/react-dialog";

const PermotionalSection = () => {
  return (
    <section className="container max-w-[1920px] mx-auto px-12 py-16 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PromotionalBanners
          icon={<AppleIcon />}
          iconbg="bg-[#FF6B3D]"
          iconText="IPHONE"
          title="Best Deal Online on "
          boldText="IPHONE 15 SERIES."
          mainbg="bg-[#FFF6F2]"
          discount={true}
        >
          <div className="absolute top-10 right-0">
            <div className="flex items-center justify-center bg-white text-foreground w-28 h-28 rounded-full text-sm absolute bottom-24 right-0 sm:left-0">
              <h3 className="text-center font-semibold">
                UP TO <h1 className="text-primary font-bold text-2xl">20%</h1>{" "}
                Off
              </h3>
            </div>
            <Image
              className=""
              src={banner1}
              alt="banner"
              width={213}
              height={379}
            />
          </div>
        </PromotionalBanners>
        {/* <PromotionalBanners
          icon={<AppleIcon />}
          iconbg="bg-[#FF6B3D]"
          iconText="IPHONE"
          title="Best Deal Online on "
          boldText="IPHONE 15 SERIES."
          mainbg="bg-[#FFF6F2]"
          discount={true}
        >
          <div className="absolute top-10 right-0">
            <Image className="w-40 h-64" src={banner1} alt="banner" width={213} height={379} />
            <div className="flex items-center justify-center bg-white text-foreground w-16 sm:w-28 h-16 sm:h-28 rounded-full text-sm absolute bottom-24 left-0">
              <h3 className="text-center font-semibold">

                UP TO{" "}
                <h1 className="text-primary font-bold text-2xl">20%</h1> Off
              </h3>
            </div>
          </div>

        </PromotionalBanners> */}
        <Dialog>
          <DialogTrigger asChild>
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
              <div className="absolute top-10 right-0 cursor-pointer">
                <Image
                  src={banner2.src}
                  width={400}
                  height={379}
                  alt="banner"
                />
              </div>
            </PromotionalBanners>
          </DialogTrigger>
          <PromotionModal />
        </Dialog>

        {/* <PromotionalBanners 
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
          <div className="absolute top-10 right-0">
            <Image src={banner2.src} width={400} height={379} alt="banner" />
          </div>
          



        </PromotionalBanners> */}

        <PromotionalBanners
          icon={<PercentageIcon />}
          mainbg="bg-[#ffc107]"
          iconbg="bg-gray-500"
          iconText="70% OFF"
          title="Biggest Sale of the Month with "
          boldText="70% Off"
          discount={false}
        >
          <div className="absolute top-0 right-0 opacity-90">
            <Image src={percentage.src} width={500} height={450} alt="banner" />
          </div>
          <div />
        </PromotionalBanners>
      </div>
    </section>
  );
};

export default PermotionalSection;
