"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const VipMembershipModal = () => {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full py-3">
          BECOME A VIP MEMBER
        </Button>
      </DialogTrigger>
      <DialogContent hideCloseButton={true} className="rounded-lg max-w-[1000px] p-6">
        <DialogHeader  className="">
          <DialogTitle className="text-4xl font-bold text-center">
            Buy ViP membership now!
          </DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100">
            <span className="text-gray-600">✖</span>
          </DialogClose>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[500px] px-10 pb-20 pt-10">
          {/* Basic Plan */}
          <div className="bg-white rounded-3xl shadow-lg p-6 text-center transition-transform duration-300 hover:scale-125 hover:border-2 hover:border-primary hover:bg-white hover:shadow-xl border border-gray-200">
            <div className=" bg-primary text-center rounded-full w-24 h-24 mx-auto flex items-center justify-center">
              <div className="">
                <p className="text-2xl font-bold text-white">$99</p>
                <p className="font-semibold text-white">per month</p>
              </div>
            </div>
              <h2 className="text-3xl text-foreground font-bold mb-2 mt-4">Basic</h2>
        
            <p className="text-card-foreground text-sm mb-2">Great Online Instructors</p>
            <p className="text-card-foreground text-sm mb-2">Get Learnly Certified Awards</p>
            <p className="text-card-foreground text-sm mb-4">Exclusive Course Materials</p>
            <Button className="gradient-primary text-white rounded-full py-2 px-4 hover:bg-primary/80 transition duration-300">
              Order now
            </Button>
          </div>

          {/* Premium Plan */}
          <div className="rounded-3xl shadow-lg p-8 text-center transition-transform duration-300 hover:scale-125 hover:border-2 hover:border-primary hover:bg-white hover:shadow-xl border border-gray-200">
          <div className="gradient-primary text-center rounded-full w-24 h-24 mx-auto flex items-center justify-center">
              <div className="">
                <p className="text-2xl font-bold text-white">$399</p>
                <p className="font-semibold text-white">per month</p>
              </div>
            </div>
            <h2 className="text-3xl text-foreground font-bold mb-2 mt-4">Premium</h2>
          
            <p className="text-card-foreground text-sm mb-2">Great Online Instructors</p>
            <p className="text-card-foreground text-sm mb-2">Get Learnly Certified Awards</p>
            <p className="text-card-foreground text-sm mb-4">Exclusive Course Materials</p>
            <Button className="gradient-primary text-white rounded-full py-2 px-4 hover:bg-primary/80 transition duration-300">
              Order now
            </Button>
          </div>

          {/* Standard Plan */}
          <div className="bg-white rounded-3xl shadow-lg p-6 text-center transition-transform duration-300 hover:scale-125 hover:border-2 hover:border-primary hover:bg-white hover:shadow-xl border border-gray-200">
            <div className=" bg-green-600 text-center rounded-full w-24 h-24 mx-auto flex items-center justify-center">
              <div className="">
                <p className="text-2xl font-bold text-white">$299</p>
                <p className="font-semibold text-white">per month</p>
              </div>
            </div>
              <h2 className="text-3xl text-foreground font-bold mb-2 mt-4">Standard</h2>
        
            <p className="text-card-foreground text-sm mb-2">Great Online Instructors</p>
            <p className="text-card-foreground text-sm mb-2">Get Learnly Certified Awards</p>
            <p className="text-card-foreground text-sm mb-4">Exclusive Course Materials</p>
            <Button className="gradient-primary text-white rounded-full py-2 px-4 hover:bg-primary/80 transition duration-300">
              Order now
            </Button>
          </div>
        </div>
      </DialogContent>
 
    </Dialog>
  );
};

export default VipMembershipModal;
