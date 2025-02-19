import React from "react";
import { MsgIcon } from "../icons/icon";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SubscriptIcon } from "../icons/icon";
import Image from "next/image";
import earlyformimage from "@/app/images/earlyformimage.png";

const EarlyAccess = () => {
  return (
    // max-w-[1440px]
    // <div className="absolute -top-20 left-0 w-full">
    <div className="overflow-visible lg:overflow-hidden xl:overflow-visible bg-[#F6E9E1] shadow-[0_4px_20px_rgba(0,0,0,0.15)] rounded-xl py-7 lg:py-10 px-8 sm:px-10 md:px-16 lg:px-10 xl:px-24 md:max-w-[95%] lg:max-w-[80%] mx-auto relative z-20 -top-28">
      <div className="absolute  -right-24 xl:right-0 bottom-0">
        <Image
          className="hidden lg:block w-full h-full object-contain object-right-bottom"
          src={earlyformimage}
          alt="early-access"
        />
      </div>
      <div className="flex xl:flex-row flex-row lg:flex-col xl:items-center justify-start gap-8 lg:gap-4 xl:gap-10">
        <div className="rounded-full bg-primary lg:w-16 lg:h-16 w-16 md:w-20 xl:w-24 h-16 md:h-20 xl:h-24 flex items-center justify-center">
          <MsgIcon />
        </div>
        <div className="w-[85%] lg:w-[75%]">
          <h2 className="text-md md:text-[32px] text-foreground">
            Subscribe to our newsletter to{" "}
            <h2 className="text-primary font-bold">win tournaments.</h2>
          </h2>
          <p className="text-sm sm:text-lg text-foreground mt-2">
            Be the first to know about our new tournaments by subscribing to our
            newsletter.
          </p>
          <div className="relative xl:max-w-[730px]">
            <Input
              placeholder="Enter Email Address"
              className="w-full border text-sm md:text-lg border-primary rounded-lg md:h-16 pl-4 md:pl-12 mt-5"
            />
            <Button className="bg-white border border-primary absolute top-0 right-0 text-primary rounded-lg w-16 md:h-16 hover:bg-white hover:text-primary">
              <SubscriptIcon />
            </Button>
          </div>
        </div>
      </div>

    </div>
    // </div>
  );
};
export default EarlyAccess;
