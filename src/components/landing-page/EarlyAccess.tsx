import React from "react";
import { MsgIcon } from "../icons/icon";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SubscriptIcon } from "../icons/icon";
import Image from "next/image";
import earlyformimage from "@/app/images/earlyformimage.png";

const EarlyAccess = () => {
  return (
    // <div className="absolute -top-20 left-0 w-full">
      <div className="bg-[#F6E9E1] shadow-[0_4px_20px_rgba(0,0,0,0.15)] rounded-xl py-10 px-24 max-w-[1440px] mx-auto relative z-20 -top-28">
        <div className="flex items-center gap-10">



          <div className="rounded-full bg-primary w-24 h-24 flex items-center justify-center">
            <MsgIcon />
          </div>
          <div>
            <p className="text-2xl text-foreground">
              Subscribe to our newsletter to{" "}
              <span className="text-primary font-semibold">
                win tournaments.
              </span>
            </p>
            <p className="text-sm text-foreground">
              Be the first to know about our new tournaments by subscribing to
              our newsletter.
            </p>
            <div className="relative">
              <Input
                placeholder="Enter your email"
                className="w-full border border-primary rounded-lg h-14 pl-12 mt-5"
              />
              <Button className="bg-white border border-primary absolute top-0 right-0 text-primary rounded-lg h-14 px-6">
                <SubscriptIcon />
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute -top-36 right-0">
          <Image
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
