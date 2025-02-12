import React from "react";
import { Button } from "./ui/button";

interface GredientButtonProps {
  buttonText: string;
}

const GredientButton: React.FC<GredientButtonProps> = ({ buttonText }) => {
  return (
    <Button className="gradient-primary text-white text-xl py-8 rounded-full px-14">
      {buttonText}
    </Button>
  );
};

export default GredientButton;
