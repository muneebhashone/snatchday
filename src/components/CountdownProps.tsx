import React from "react";

export interface CountdownProps {
  endDate: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

const CountdownDisplay: React.FC<CountdownProps> = ({ endDate, countdown }) => {
  return countdown.seconds < 1 ? (
    <div className="mb-5 text-center flex flex-col items-center justify-center gap-5">
      <h1 className="m-auto bg-green-700 text-white px-4 rounded-full mt-5">
        Tournament Has Been Started
      </h1>
      <div className="flex flex-col items-center justify-center">
        <h1 className="bg-primary px-4 rounded-full text-white w-max">
          Ending in
        </h1>
        <div className="flex items-center justify-center flex-wrap 2xl:gap-1 gap-2 mt-3  xl:mb-5">
          <div className="text-center text-[#1C1B1D]">
            <div className="border bg-white border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
              {endDate?.days ? endDate?.days : 0}
            </div>
            <p className="text-xs hidden xl:block">Days</p>
          </div>
          <div className="text-center text-[#1C1B1D]">
            <div className="border bg-white border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
              {endDate?.hours}
            </div>
            <p className="text-xs hidden xl:block">Hours</p>
            <p className="xl:hidden block text-xs">Hrs</p>
          </div>
          <div className="text-center text-[#1C1B1D]">
            <div className="border bg-white border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
              {endDate?.minutes}
            </div>
            <p className="text-xs hidden xl:block">Minutes</p>
            <p className="text-xs xl:hidden block">Min</p>
          </div>
          <div className="text-center text-[#1C1B1D]">
            <div className="border bg-white border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
              {endDate?.seconds}
            </div>
            <p className="text-xs hidden xl:block">Seconds</p>
            <p className="text-xs xl:hidden block">Sec</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center flex-wrap 2xl:gap-1 gap-2 mt-3 xl:mt-12 xl:mb-5">
      <div className="text-center text-[#1C1B1D]">
        <div className="border bg-white border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
          {countdown?.days ? countdown?.days : 0}
        </div>
        <p className="text-xs hidden xl:block">Days</p>
      </div>
      <div className="text-center text-[#1C1B1D]">
        <div className="border bg-white border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
          {countdown?.hours}
        </div>
        <p className="text-xs hidden xl:block">Hours</p>
        <p className="xl:hidden block text-xs">Hrs</p>
      </div>
      <div className="text-center text-[#1C1B1D]">
        <div className="border bg-white border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
          {countdown?.minutes}
        </div>
        <p className="text-xs hidden xl:block">Minutes</p>
        <p className="text-xs xl:hidden block">Min</p>
      </div>
      <div className="text-center text-[#1C1B1D]">
        <div className="border bg-white border-gray-200 text-[18px] xl:text-[30px] font-normal px-3 xl:px-7">
          {countdown?.seconds}
        </div>
        <p className="text-xs hidden xl:block">Seconds</p>
        <p className="text-xs xl:hidden block">Sec</p>
      </div>
    </div>
  );
};

export default CountdownDisplay;
