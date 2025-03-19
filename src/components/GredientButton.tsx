import React from "react";
import { Button } from "./ui/button";

interface GredientButtonProps {
  buttonText: string;
  onClick?:()=>void
}

const GredientButton: React.FC<GredientButtonProps> = ({ buttonText,onClick }) => {
  return (
    <Button onClick={onClick} className="gradient-primary text-white text-lg xl:text-xl py-6 xl:py-8 rounded-full px-10 xl:px-14">
      {buttonText}
    </Button>
  );
};

export default GredientButton;
