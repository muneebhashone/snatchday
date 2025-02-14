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
    <div className="bg-[#F6E9E1] shadow-[0_4px_20px_rgba(0,0,0,0.15)] rounded-xl py-7 lg:py-10 px-8 sm:px-10 md:px-16 lg:px-16 xl:px-24 md:max-w-[95%] lg:max-w-[80%] mx-auto relative z-20 -top-28">
       <div className="absolute right-10 -top-[127px]">
        <Image
         
          src={earlyformimage}
          // width={450}
          // height={384}
          alt="early-access"
        />
      </div>
      <div className="flex items-center justify-start gap-10">
        <div className="rounded-full bg-primary w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center">
          <MsgIcon />
        </div>
        <div>
          <h2 className="text-md md:text-lg lg:text-[32px] text-foreground">
            Subscribe to our newsletter to{" "}
            <h2 className="text-primary font-bold">win tournaments.</h2>
          </h2>
          <p className="text-xs lg:text-lg text-foreground mt-2">
            Be the first to know about our new tournaments by subscribing to our
            newsletter.
          </p>
          <div className="relative">
            <Input
              placeholder="Enter Email Address"
              className="w-full border text-lg border-primary rounded-lg h-16 pl-12 mt-5"
            />
            <Button className="bg-white border border-primary absolute top-0 right-0 text-primary rounded-lg h-16 px-6 hover:bg-white hover:text-primary">
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
