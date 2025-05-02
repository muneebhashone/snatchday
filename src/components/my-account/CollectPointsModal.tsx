import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import giftIcon from "@/app/images/crown.png";

const CollectPointsModal = () => {
  const pointOptions = [
    {
      points: 50,
      type: "DISCOUNT POINTS",
      action: "Like",
      buttonText: "Gefällt mir",
      buttonClass: "bg-[#1877F2] hover:bg-[#1877F2]/90",
    },
    {
      points: 100,
      type: "DISCOUNT POINTS",
      action: "Split",
      buttonText: "Split",
      buttonClass: "bg-[#1877F2] hover:bg-[#1877F2]/90",
    },
    {
      points: 100,
      type: "DISCOUNT POINTS",
      action: "Refer A Friend",
      buttonText: "Refer A Friend",
      buttonClass: "bg-red-500 hover:bg-red-600",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-green-700 hover:bg-green-800 text-white rounded-full py-3 uppercase">
          Would you like to collect additional points?
        </Button>
      </DialogTrigger>
      <DialogContent hideCloseButton={true} className="p-0 ">
        <DialogHeader className="bg-green-700 text-white p-8 rounded-t-3xl relative">
          <DialogTitle className="text-2xl font-bold text-center">
            Collect additional points!
          </DialogTitle>
          <p className="text-center mt-2">
            Click Like share our page on your profile or invite your friends!
          </p>
          <DialogTrigger className="absolute right-4 top-4">
            <X className="h-6 w-6 text-white" />
          </DialogTrigger>
        </DialogHeader>

        <div className="p-8">
          <div className="space-y-6">
            {pointOptions.map((option, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 relative">
                    <Image
                      src={giftIcon}
                      alt="Gift"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <div>
                    <p className="text-orange-500 font-bold">
                      +{option.points} {option.type}
                    </p>
                  </div>
                </div>
                <Button className={`px-8 ${option.buttonClass}`}>
                  {option.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CollectPointsModal;
