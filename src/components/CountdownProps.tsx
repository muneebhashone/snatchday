import React from "react";

interface CountdownProps {
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

const CountdownDisplay: React.FC<CountdownProps> = ({ countdown }) => {
  return (
    <div className="flex items-center justify-center 2xl:gap-1 gap-2 mt-3 xl:mt-12">
      <div className="text-center text-[#1C1B1D]">
        <div className="border bg-white border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
          {countdown.days}
        </div>
        <p className="text-xs hidden xl:block">Days</p>
      </div>
      <div className="text-center text-[#1C1B1D]">
        <div className="border bg-white border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
          {countdown.hours}
        </div>
        <p className="text-xs hidden xl:block">Hours</p>
        <p className="xl:hidden block text-xs">Hrs</p>
      </div>
      <div className="text-center text-[#1C1B1D]">
        <div className="border bg-white border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
          {countdown.minutes}
        </div>
        <p className="text-xs hidden xl:block">Minutes</p>
        <p className="text-xs xl:hidden block">Min</p>
      </div>
      <div className="text-center text-[#1C1B1D]">
        <div className="border bg-white border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
          {countdown.seconds}
        </div>
        <p className="text-xs hidden xl:block">Seconds</p>
        <p className="text-xs xl:hidden block">Sec</p>
      </div>
    </div>
  );
};

export default CountdownDisplay;