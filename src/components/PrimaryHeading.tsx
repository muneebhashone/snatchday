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
    <h1 className="text-2xl md:text-5xl 2xl:text-6xl font-extrabold ">
      <span className="bg-primary px-4 rounded-md text-white">
        {highlightText}
      </span>

      <span className={`text-heading ml-3 ${textColor}`}>{remainingText}</span>
      <h1 className={`text-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mt-3 ${textColor}`}>
        {remainingHeading}
      </h1>
    </h1>
  );
};

export default PrimaryHeading;
