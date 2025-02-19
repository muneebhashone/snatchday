import modalImage from "@/app/images/promoitonModalImage.png";
import imageBg from "@/app/images/promotionalBg.png";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export function PromotionModal() {
  const time = [
    {
      timer: "24",
      timerText: "Days",
    },
    {
      timer: "48",
      timerText: "Hours",
    },
    {
      timer: "37",
      timerText: "Minutes",
    },
    {
      timer: "19",
      timerText: "Seconds",
    },
  ];
  return (
    <div className="">
      <DialogContent className="max-w-[1504px] max-h-[90vh] p-0 border-none flex flex-col items-center gap-0">
        <DialogClose className="p-5 absolute z-50 bg-white rounded-full -right-5 -top-5">
          <X />
        </DialogClose>
        <DialogHeader
          style={{ backgroundImage: `url(${imageBg.src})` }}
          className="w-full object-contain min-h-[226px] bg-no-repeat bg-center rounded-t-3xl flex items-center justify-center sticky top-0 z-40"
        >
          <DialogTitle className="flex flex-col gap-3 lg:gap-7 items-center">
            <h1 className="text-white text-xl md:text-3xl lg:text-[48px] font-extrabold">
              Competiton In{" "}
              <span className="bg-[#FF6B3D] py-1 px-2 rounded-lg">
                &quot;January&quot;
              </span>
            </h1>
            <p className="text-white text-xs sm:text-sm lg:text-[24px] font-normal bg-[#D9AEE7] bg-opacity-10  py-4 px-14 rounded-full">
              Participation costs{" "}
              <span className="text-primary font-bold">{"0.50€ / 50"}</span>{" "}
              snap points
            </p>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-1 sm:grid-cols-2 pb-2 sm:pb-16 mx-auto gap-4">
            {/* Left side section */}
            <div className="sm:w-max flex flex-col justify-between items-center py-28 border-r pr-10 pl-20">
              <Image
                className="xl:w-[580px] lg:w-[420px] md:w-[320px] sm:w-[250px] w-[180px] h-[350px]"
                src={modalImage}
                alt=""
              />
              <div className="flex items-center justify-between gap-1 md:gap-4 relative z-10 mt-10">
                {time?.map((item) => (
                  <div
                    key={item.timer}
                    className="text-center flex flex-col items-center text-xs lg:text-lg"
                  >
                    <div className="bg-opacity-50 text-md sm:w-max lg:text-4xl border px-2 lg:px-7 py-1 lg:py-2">
                      <h1 className="font-light">{item.timer}</h1>
                    </div>
                    <p className="text-sm">{item.timerText}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Right side content */}
            <div className="flex flex-col gap-3 md:gap-12 sm:items-start items-center pt-10 pr-16">
              <div className="flex flex-col gap-7 sm:items-start justify-start">
                <p className="text-xl">This month you can get the product</p>
                <h1 className="text-[#1C1B1D] text-lg sm:text-3xl md:text-5xl lg:text-6xl font-extrabold">
                  Hisense 32A4BG - 80 cm (32`)
                </h1>
                <p className="md:text-xl text-sm">
                  The winner will be drawn on the 5th of each month at 6 p.m.
                  You can find further information in the terms and conditions.
                  The closing date for entries is 5:55 p.m.
                </p>
              </div>
              <div className="flex flex-col gap-7 sm:w-max">
                <p className="font-bold text-lg md:text-2xl">
                  What is the capital of Germany?
                </p>
                <RadioGroup className="flex justify-between" defaultValue="i">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem
                      className="focus-visible:ring-transparent "
                      value="berlin"
                      id="r2"
                    />
                    <Label
                      className="font-bold capitalize text-xl"
                      htmlFor="r2"
                    >
                      berlin
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="paris" id="r1" />
                    <Label
                      className="font-bold capitalize text-xl"
                      htmlFor="r1"
                    >
                      paris
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex flex-col gap-4 sm:gap-9">
                <RadioGroup className="flex justify-between" defaultValue="i">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      className="h-7 w-7 focus-visible:ring-transparent"
                      value="berlin"
                      id="r2"
                    />
                    <Label className="text-lg font-normal" htmlFor="r2">
                      I accept the conditions of participation.
                    </Label>
                  </div>
                </RadioGroup>
                <div className="flex gap-2">
                  <button className="md:text-xl text-xs h-[60px] w-[270px] rounded-full gradient-primary text-white">
                    Participate For A Fee
                  </button>
               
                </div>
                <p className="text-lg">
                  Participation fee <span className="font-semibold">50</span>{" "}
                  snap points / <span className="font-semibold">0.50€</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </div>
  );
}
