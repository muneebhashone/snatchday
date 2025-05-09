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
import { useGetPoints } from "@/hooks/api";

interface CollectPointsModalProps {
  customTrigger?: React.ReactNode;
}

const CollectPointsModal = ({ customTrigger }: CollectPointsModalProps) => {
  const { data: points, isLoading: pointsLoading } = useGetPoints();

  const pointOptions = [
    {
      points: points?.data?.facebookLike || 0,
      type: "DISCOUNT POINTS",
      action: "Like",
      buttonText: "Facebook Like",
      buttonClass: "bg-[#1877F2] hover:bg-[#1877F2]/90",
    },
    {
      points: points?.data?.facebookShare || 0,
      type: "DISCOUNT POINTS",
      action: "Share",
      buttonText: "Facebook share",
      buttonClass: "bg-[#1877F2] hover:bg-[#1877F2]/90",
    },
    {
      points: points?.data?.referral || 0,
      type: "DISCOUNT POINTS",
      action: "Refer A Friend",
      buttonText: "Refer A Friend",
      buttonClass: "bg-red-500 hover:bg-red-600",
    },
  ];

  const defaultTrigger = (
    <Button 
      data-modal-trigger
      className="w-full bg-green-700 hover:bg-green-800 text-white rounded-full py-3 uppercase"
    >
      Would you like to collect additional points?
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {customTrigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent hideCloseButton={true} className="p-0">
        <DialogHeader className="bg-green-700 text-white p-8 rounded-t-[10px] relative">
          <DialogTitle className="text-2xl font-bold text-center">
            Collect additional points!
          </DialogTitle>
          <p className="text-center mt-2">
            Click Like, Share our page on your profile or invite your friends!
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
                    <p className="text-sm text-gray-600">{option.action}</p>
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
