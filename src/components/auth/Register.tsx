import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FacebookIcon } from "../icons/icon";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "../ui/separator";

interface RegisterProps {
  onBack: () => void;
}

const Register = ({ onBack }: RegisterProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onBack();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[1170px] p-0">
        <DialogHeader className="text-left relative px-24 pt-10">
          <button
            onClick={handleClose}
            className="absolute -right-5 -top-5 z-30 h-12 w-12 shadow-xl rounded-full bg-white p-0 hover:bg-gray-100 flex items-center justify-center"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-[48px] font-extrabold">
              Register
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="mt-5 px-24 pb-16">
          {/* Form Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="User Name"
              className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
            />
            <Input
              type="email"
              placeholder="E-Mail Address"
              className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
            />
            <Input
              type="password"
              placeholder="Password"
              className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
            />
            <Input
              type="password"
              placeholder="Repeat Password"
              className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
            />
          </div>

          {/* Terms and Newsletter Checkbox */}
          <div className="mt-10">
            <div className="flex items-start space-x-3">
              <Checkbox id="newsletter" className="mt-1 rounded-full" />
              <label htmlFor="newsletter" className="text-foreground">
                Yes, I would like to be informed about tournaments, special
                offers and news and receive newsletters from Snatch Day
              </label>
            </div>
            <div className="flex items-start space-x-3 mt-2">
              <Checkbox id="terms" className="mt-1 rounded-full" />
              <label htmlFor="terms" className="text-foreground">
                I agree to the{" "}
                <Link href="#" className="text-[#FF6B3D] hover:underline">
                  privacy policy
                </Link>{" "}
                and the{" "}
                <Link href="#" className="text-[#FF6B3D] hover:underline">
                  terms and conditions
                </Link>
              </label>
            </div>
          </div>

          {/* Register Button */}
          <Button className="min-h-[60px] text-lg font-semibold gradient-primary text-white rounded-full mt-8 px-11">
            Register Your Account
          </Button>

          <Separator className="mt-16 mb-6" />

          {/* Social Register */}
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-4">
              <p className="text-gray-600">Or Register with Social Media</p>
              <FacebookIcon />
            </div>

            {/* Login Link */}
            <div className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={handleClose}
                className="text-[#FF6B3D] hover:underline"
              >
                Login Now
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
