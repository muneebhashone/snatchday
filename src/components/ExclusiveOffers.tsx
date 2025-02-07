import React from "react";
import ExclusiveCards from "./ExclusiveCards";
import { BubblesIcon, BubblesIcon1 } from "./icons/icon";

const ExclusiveOffers = () => {
  return (
    <section className="py-20 bg-gray-50 relative">
        <div className="absolute inset-0 w-full h-full">
            <BubblesIcon className="absolute top-0 left-0"/>
            <BubblesIcon1 className="absolute top-0 right-0"/>
            <BubblesIcon className="absolute bottom-0 left-0"/>
            <BubblesIcon1 className="absolute bottom-0 right-0"/>
            <BubblesIcon className="absolute top-1/2 left-1/2"/>
            <BubblesIcon1 className="absolute top-1/2 right-1/2"/>
            <BubblesIcon className="absolute bottom-1/2 left-1/2"/>
            <BubblesIcon1 className="absolute bottom-1/2 right-1/2"/>

            
        </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">

          <h3 className="text-4xl font-bold flex items-center justify-center gap-3">
            Our Exclusive
            <span className="bg-primary text-white px-4 py-2 rounded-lg">
              Offers
            </span>
          </h3>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur. Urna venenatis enim eget
            enim semper vitae dolor elementum. Nunc in nunc justo non tellus
            suscipit. Sed est faucibus nisl id lacinia sed felis ut. Neque
            aliquam laoreet etiam tempus amet.
          </p>
        </div>
        <ExclusiveCards />
      </div>
    </section>
  );
};

export default ExclusiveOffers;
