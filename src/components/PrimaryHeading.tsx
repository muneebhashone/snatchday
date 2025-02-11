import React from "react";

interface PrimaryHeadingProps {
  highlightText: string;
  remainingText: string;
  remainingHeading: string;
  textColor?: string;
}



const PrimaryHeading: React.FC<PrimaryHeadingProps> = ({
  highlightText,
  remainingText,
  remainingHeading,
  textColor,
}) => {
  return (
    <h1 className="text-2xl md:text-5xl font-bold">

      <span className="bg-primary px-3 py-2 rounded-md text-white">{highlightText}</span>

      <span className={`text-heading ml-2 ${textColor}`}>{remainingText}</span>
      <h1 className={`text-heading text-4xl md:text-7xl mt-3 ${textColor}`}>{remainingHeading}</h1>
    </h1>





  );
};

export default PrimaryHeading;
