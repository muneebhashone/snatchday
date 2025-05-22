import React from "react";
import ExclusiveCards from "./ExclusiveCards";
import { BubblesIcon, BubblesIcon1 } from "./icons/icon";

const ExclusiveOffers = ({ disabled }: { disabled?: boolean }) => {
  return (
    <section className="mt-3 py-12 md:py-20 relative">
      <div className="absolute inset-0 w-full h-full">
        <BubblesIcon className="sm:block hidden absolute top-0 left-0" />
        <BubblesIcon1 className="sm:block hidden absolute top-0 right-0" />
        <BubblesIcon className="sm:block hidden absolute bottom-0 left-0" />
        <BubblesIcon1 className="sm:block hidden absolute bottom-0 right-0" />
        <BubblesIcon className="sm:block hidden absolute top-1/2 left-1/2" />
        <BubblesIcon1 className="sm:block hidden absolute top-1/2 right-1/2" />
        <BubblesIcon className="sm:block hidden absolute bottom-1/2 left-1/2" />
        <BubblesIcon1 className="sm:block hidden absolute bottom-1/2 right-1/2" />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16 flex flex-col items-center gap-5 md:gap-10">
          <h3 className="w-max sm:w-auto text-[26px] sm:text-[30px] md:text-[38px] lg:text-[42px] xl:text-[48px] font-extrabold flex items-center justify-center gap-1 md:gap-3">
            Our Exclusive
            <span className="bg-primary text-white px-4 rounded-lg">
              Offers
            </span>
          </h3>
          <p className="text-card-foreground text-md sm:text-lg md:text-2xl font-light">
            Lorem ipsum dolor sit amet consectetur. Urna venenatis enim eget
            enim semper vitae dolor elementum. Nunc in nunc justo non tellus
            suscipit. Sed est faucibus nisl id lacinia sed felis ut. Neque
            aliquam laoreet etiam tempus amet.
          </p>
        </div>
        <ExclusiveCards disabled={disabled} />
      </div>
    </section>
  );
};

export default ExclusiveOffers;
