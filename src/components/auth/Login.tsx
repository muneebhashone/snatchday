import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, X, LogOut } from "lucide-react";
import { FacebookIcon } from "../icons/icon";
import Link from "next/link";
import { Separator } from "../ui/separator";
import Register from "./Register";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRegister } from "@/hooks/api";

const Login = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  // Temporary state to simulate login status - replace with your auth logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName] = useState("Percy Reed");

  const { mutate: register, isPending } = useRegister({
     onSuccess: (data) => {
      console.log(data,"success");
     },
     onError: (error) => {
      console.log(error,"error");
     }
  });



  const handleOpenRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const handleBackToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Add your logout logic here
  };
  const handleRegister = () => {
    register();
  };

  if (isRegisterOpen) {
    return <Register onBack={handleBackToLogin} />;
  }

  if (isLoggedIn) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
          <p className="text-lg font-medium text-card-foreground">{userName}</p>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36 mt-6">
          <Link href="/my-account/my-profile">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <Link href="/my-account/my-profile">
                <p className="text-sm font-medium text-card-foreground">
                  My Account
                </p>
              </Link>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <p className="text-sm font-medium text-card-foreground text-red-600">
              Logout
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <User className="h-6 w-6" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[682px] p-0">
        <DialogHeader className="text-left relative px-24 pt-10">
          <DialogTrigger asChild className="absolute -right-5 -top-5 z-30">
            <Button
              variant="ghost"
              className="h-12 w-12 shadow-xl rounded-full bg-white p-0 hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-[48px] font-extrabold">
              Log In
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="mt-5 px-24 pb-16">
          {/* Email Input */}
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="E-mail address"
              className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
            />
            <Input
              type="password"
              placeholder="Password"
              className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right mt-5">
            <Link href="#" className="text-gray-600 hover:underline text-sm">
              Forgot your password?
            </Link>
          </div>

          {/* Login Button */}
          <Button className="w-full min-h-[60px] text-lg font-semibold gradient-primary text-white rounded-full mt-10">
            Login to your account
          </Button>

          {/* Social Login Divider */}
          <div className="flex items-center justify-between mt-10">
            <p className="text-center text-gray-600 mx-4">
              Or Login with Social Media
            </p>
            <FacebookIcon />
          </div>

          {/* Separator */}
          <Separator className="my-10" />

          {/* Register Link */}
          <div className="text-left space-x-1">
            <span className="text-gray-600">Don&apos;t have account?</span>
            <button
              onClick={handleOpenRegister}
              className="text-[#FF6B3D] hover:underline font-light"
            >
              Register Now
            </button>
            <button onClick={handleRegister}>Register</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
