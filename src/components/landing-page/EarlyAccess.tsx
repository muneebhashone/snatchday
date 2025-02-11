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
    <div className="bg-[#F6E9E1] shadow-[0_4px_20px_rgba(0,0,0,0.15)] rounded-xl py-7 lg:py-10 px-8 sm:px-10 md:px-16 lg:px-16 xl:px-24 md:max-w-[95%] lg:max-w-[90%] mx-auto relative z-20 -top-28">
      <div className="xl:flex items-center gap-10">
        <div className="rounded-full bg-primary w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center">
          <MsgIcon />
        </div>
        <div>
          <p className="text-md md:text-lg lg:text-2xl text-foreground">
            Subscribe to our newsletter to{" "}
            <span className="text-primary font-semibold">win tournaments.</span>
          </p>
          <p className="text-xs lg:text-sm text-foreground">
            Be the first to know about our new tournaments by subscribing to our
            newsletter.
          </p>
          <div className="relative">
            <Input
              placeholder="Enter your email"
              className="w-full border border-primary rounded-lg h-12 lg:h-14 pl-12 mt-5"
            />
            <Button className="bg-white border border-primary absolute top-0 right-0 text-primary rounded-lg h-12 lg:h-14 px-6">
              <SubscriptIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute -z-10 top-1 xs:-top-5 sm:-top-[22px] md:-top-[82px] lg:-top-28 xl:-top-36 right-0">
        <Image
          className="w-[220px] sm:w-[270px] md:w-[350px] lg:w-[400px] xl:w-[450px] h-[190px] sm:h-[210px] md:h-[270px] lg:h-[320px] xl:h-[352px]"
          src={earlyformimage}
          width={450}
          height={384}
          alt="early-access"
        />
      </div>
    </div>
    // </div>
  );
};
export default EarlyAccess;
