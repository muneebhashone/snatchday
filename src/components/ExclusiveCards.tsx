"use client";

import React, { useState } from "react";
import Image from "next/image";
import crown from "@/app/images/crown.png";
import { useGetSubscriptionPlan } from "@/hooks/api";
import { Loader } from "lucide-react";
import SubscriptionModal from "./SubscriptionModal";

interface PricingFeature {
  text: string;
}

interface PricingCard {
  badge?: string;
  icon: string;
  title: string;
  subtitle: string;
  price: string;
  period: string;
  features: PricingFeature[];
  buttonText: string;
  isPopular?: boolean;
  bgcolor?: string;
}

// Helper function to format interval display
const formatInterval = (interval: string) => {
  switch (interval) {
    case "3months":
      return "/Quarterly";
    case "6months":
      return "/Semi-Annually";
    case "month":
      return "/Monthly";
    case "year":
      return "/Annually";
    default:
      return `/${interval}`;
  }
};

const ExclusiveCards = () => {
  const [pkg, setPkg] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [packageId, setPackageId] = useState("");
  const [packagePoints, setPackagePoints] = useState(0);
  const { data: subscriptionPlan, isLoading } = useGetSubscriptionPlan();
  const packages = subscriptionPlan?.data?.packages || [];
  console.log(packages);

  // Background colors for cards
  const bgColors = ["bg-gray-200", "bg-white", "bg-[#F6E9E1]"];

  // If there are no packages, show loading or fallback
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div
      id="scroll-to-packages"
      className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-[1440px] mx-auto"
    >
      {packages.map((pkg, index) => {
        // Determine if this card should be highlighted as popular (middle card)
        const isPopular = pkg.popular;

        return (
          <div
            key={pkg._id}
            className={`relative rounded-xl p-10 md:p-10 lg:p-8 lg:pt-16 xl:p-16 w-full md:w-auto flex flex-col justify-between ${
              isPopular ? "bg-[#8D4CC4]" : "bg-white"
            } ${isPopular ? "mt-0" : "lg:mt-20"} ${
              isPopular ? "lg:mb-20" : "mb-0"
            } ${
              isPopular ? "shadow-none" : "shadow-[0px_0px_15px_#f1f1f1]"
            } hover:scale-105 transition-transform duration-300`}
          >
            {/* Popular Badge */}
            {isPopular && (
              <span className="absolute top-5 right-5 bg-primary text-white text-sm px-4 py-1 rounded-full">
                POPULAR
              </span>
            )}

            {/* Card Header */}
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center gap-3 p-5 rounded-xl ${
                  bgColors[index % bgColors.length]
                }`}
              >
                <Image
                  src={crown.src}
                  alt={pkg.name}
                  width={24}
                  height={24}
                  className={`w-6 h-6 ${
                    index !== 0 ? "grayscale-0" : "grayscale"
                  }`}
                />
              </div>
              <div>
                <p
                  className={`text-lg ${
                    isPopular ? "text-white" : "text-foreground"
                  }`}
                >
                  {pkg.interval === "month"
                    ? "For individuals"
                    : pkg.interval === "6months"
                    ? "For startups"
                    : pkg.interval === "year"
                    ? "For businesses"
                    : "For customers"}
                </p>
                <h3
                  className={`text-xl font-extrabold ${
                    isPopular ? "text-white" : "text-gray-900"
                  }`}
                >
                  {pkg.name}
                </h3>
              </div>
            </div>

            <p
              className={`mt-5 ${isPopular ? "text-white" : "text-foreground"}`}
            >
              {pkg.description}
            </p>

            {/* Pricing */}
            <div className="lg:mt-4">
              <div className="flex items-baseline">
                <span
                  className={`text-[50px] xl:text-[68px] font-extrabold ${
                    isPopular ? "text-white" : "text-[#1C1B1D]"
                  }`}
                >
                  ${pkg.price}
                </span>
                <span
                  className={`ml-1 text-md xl:text-lg ${
                    isPopular ? "text-white/80" : "text-foreground"
                  }`}
                >
                  {formatInterval(pkg.interval)}
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="mt-3 space-y-2 lg:space-y-4">
              <h4
                className={`text-lg font-extrabold ${
                  isPopular ? "text-white" : "text-[#1C1B1D]"
                }`}
              >
                Whats Included
              </h4>
              <ul className="space-y-1 lg:space-y-3">
                {pkg.features &&
                  pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <svg
                        className={`w-6 h-6 ${
                          isPopular ? "text-white" : "text-[#8D4CC4]"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span
                        className={`text-sm ${
                          isPopular ? "text-white/80" : "text-[#1C1B1D]"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="w-full flex items-center sm:justify-center">
              <button
                className={`w-max sm:w-[70%] lg:w-full min-h-[48px] lg:min-h-[68px] mt-5 lg:mt-8 px-14 py-4 lg:px-4 lg:py-3 rounded-full text-lg font-medium transition-colors
                  ${
                    isPopular
                      ? "bg-white text-[#8D4CC4] hover:bg-gray-50"
                      : "gradient-primary text-white hover:opacity-90"
                  }
                `}
                onClick={() => {
                  setIsOpen(true);
                  setPackageId(pkg._id);
                  setPackagePoints(pkg.price * 100);
                  setPkg(pkg);
                }}
              >
                Get started
              </button>
            </div>
          </div>
        );
      })}
      <SubscriptionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        packageId={packageId}
        packagePoints={packagePoints}
        pkg={pkg}
      />
    </div>
  );
};

export default ExclusiveCards;
