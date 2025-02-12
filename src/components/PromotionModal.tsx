import { Button } from "@/components/ui/button";
import modalImage from "@/app/images/promoitonModalImage.png";
import imageBg from "@/app/images/promotionalBg.png";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

export function PromotionModal() {
  return (
    <DialogContent className="sm:max-w-[80%] p-0">
      <DialogHeader
        style={{ backgroundImage: `url(${imageBg.src})` }}
        className="w-full bg-cover rounded-t-lg h-[200px] bg-[#3a094a] flex items-center justify-center"
      >
        <DialogTitle className="flex flex-col gap-7 items-center">
          <h1 className="text-white text-4xl ">
            Competiton In{" "}
            <span className="bg-[#FF6B3D] py-1 px-2 rounded-lg">"January"</span>
          </h1>
          <p className="text-md text-white bg-white bg-opacity-10 py-2 px-7 w-max rounded-2xl">
            Participation costs <span>{"0.50€ / 50"}</span> snap points
          </p>
        </DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4  px-16">
        {/* right side section */}
        <div className="py-16">
          <Image className="w-[500px]" src={modalImage} alt="" />
          <div></div>
        </div>
        {/* right side content */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-md">This month you can get the product</p>
            <h1 className="text-7xl font-bold">Hisense 32A4BG - 80 cm (32`)</h1>
            <p className="text-lg text-">
              The winner will be drawn on the 5th of each month at 6 p.m. You
              can find further information in the terms and conditions. The
              closing date for entries is 5:55 p.m.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-max">
            <p className="font-bold text-xl">What is the capital of Germany?</p>
            <RadioGroup className="flex justify-between " defaultValue="i">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className="focus-visible:ring-transparent"
                  value="berlin"
                  id="r2"
                />
                <Label className="capitalize" htmlFor="r2">
                  berlin
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paris" id="r1" />
                <Label className="capitalize " htmlFor="r1">
                  paris
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <RadioGroup className="flex justify-between " defaultValue="i">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className="h-4 w-4 focus-visible:ring-transparent"
                  value="berlin"
                  id="r2"
                />
                <Label className="capitalize" htmlFor="r2">
                  berlin
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  );
}
