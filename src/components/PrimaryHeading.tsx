import React from "react";

interface PrimaryHeadingProps {
  highlightText: string;
  remainingText: string;
  remainingHeading: string;
}


const PrimaryHeading: React.FC<PrimaryHeadingProps> = ({
  highlightText,
  remainingText,
  remainingHeading,
}) => {
  return (
    <h1 className="text-4xl md:text-5xl font-bold">
      <span className="bg-primary px-3 py-2 rounded-md text-white">{highlightText}</span>

      <span className="text-heading ml-2">{remainingText}</span>
      <h1 className="text-heading text-7xl mt-3">{remainingHeading}</h1>
    </h1>



  );
};

export default PrimaryHeading;
