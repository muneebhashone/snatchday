"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PricingPlan {
  duration: string;
  price: string;
  period: string;
}

const VipMembershipModal = () => {
  const pricingPlans: PricingPlan[] = [
    {
      duration: "1 month",
      price: "11.99",
      period: "1 x month",
    },
    {
      duration: "6 months",
      price: "60",
      period: "6 x month",
    },
    {
      duration: "1 year",
      price: "99",
      period: "1 x year",
    },
    {
      duration: "test",
      price: "5",
      period: "1 x day",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full py-3">
          BECOME A VIP MEMBER
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Buy ViP membership now!
          </DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>

        {/* Description Text */}
        <div className="text-gray-700 mb-8">
          <p className="mb-4">Please select one of the packages</p>
          <p className="text-sm leading-relaxed">
            At Snatch Day you have the option of taking out a VIP membership,
            which gives you a number of advantages. The fees vary depending on
            the selected term and these are displayed accordingly when you make
            your selection. The best thing is that every package includes 500
            snap points worth €5 each month. This means that the fee is
            automatically reduced and you will enjoy all the benefits. You can
            use the snap points available to you every month to take part in
            duels or tournaments and have the chance to get a bargain with your
            skill. Or you can use the points in our online shop, where you can
            find a variety of inexpensive products. Another highlight are the
            exclusive tournaments, which are exclusively for VIP members, where
            you can expect popular brand products and other exciting prizes. You
            can create and accept unlimited duels for free, saving 15 snap
            points for each duel. For all members-hips, you can easily cancel
            online in your My Account area, depending on the selected term. In
            addition, you can take part in the monthly competition worth 15 snap
            points each month for free, where you can win great prizes. Your
            right of return is extended to 30 days, so you have plenty of time
            if you change your mind. You get exclusive access to the VIP Shop,
            where very special bargains await you. The VIP Shop is only
            accessible to VIP members, the highlight is that the shop always
            opens some bargains at different times and on different days, which
            product is being sold and the selling price are also secret for the
            time being. So it remains exciting to see what bargain awaits you
            right up until the launch. You will find out half an hour beforehand
            when the VIP Shop opens, and of course you will be informed
            accordingly. Become a VIP member and secure the many benefits.
          </p>
        </div>

        {/* Pricing Plans Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-[#2A2E31] text-white p-6 rounded-lg relative"
            >
              <h3 className="text-xl font-bold mb-6 text-[#FF6B3D]">
                {plan.duration}
              </h3>
              <div className="mb-4">
                <p className="text-sm mb-2">{plan.period}</p>
                <p className="text-2xl font-bold">Price: {plan.price}€</p>
              </div>
              {/* Crown Icon */}
              <div className="absolute top-4 right-4">
                <svg
                  className="w-6 h-6 text-[#FFD700]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <Button className="w-full bg-[#FF6B3D] hover:bg-[#E55D2D] text-white rounded-md">
                ADD TO CART
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VipMembershipModal;
