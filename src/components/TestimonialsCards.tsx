import React from "react";

import { ShieldIcon, DownloadIcon, HandIcon, FastDeliveryIcon } from "./icons/icon";
const TestimonialsCards = () => {
  const features = [
    {

      icon: <ShieldIcon/>,
      title: "Buyer Protection",
      bgColor: "bg-white",
      iconBg: "bg-orange-100",
    },

    {
      icon: <DownloadIcon/>,
      title: "Use your skill to find a bargain",
      bgColor: "bg-white",
      iconBg: "bg-purple-100",
    },

    {
      icon: <HandIcon/>,
      title: "14-day right of withdrawal",
      bgColor: "bg-white",
      iconBg: "bg-orange-100",
    },

    {
      icon: <FastDeliveryIcon/>,
      title: "Fast Shipping",
      bgColor: "bg-white",
      iconBg: "bg-purple-100",
    },

  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl`}>
              {feature.icon}
            </div>
            <h3 className="text-lg font-medium text-gray-800">
              {feature.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialsCards;
