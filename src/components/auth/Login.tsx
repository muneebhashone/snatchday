import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, X, LogOut, Loader2 } from "lucide-react";
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
import {  useAuthApi, useGetMyProfile, useLogout } from "@/hooks/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {user,setUserData,logout}=useUserContext()
  const router=useRouter()
  const { mutate: login, isPending } = useAuthApi();
  const {data:myProfile,isPending:isMyProfilePending}=useGetMyProfile()
  const {mutate:Userlogout}=useLogout()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
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
    Userlogout(undefined, {
      onSuccess: () => {
        setUserData(null);
        setIsLoggedIn(false);
        logout();
        toast.success("Logout successfully");
        router.push('/');
      },
      onError: (error) => {
        console.error('Logout failed:', error);
        toast.error("Logout failed");
      }
    });
  };

  useEffect(() => {
    if (user) { 
      setIsLoggedIn(true); 
    }
  }, [user]);


  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    login(
      {
        data: {
          email: data.email,
          password: data.password,
        },
        type: "login",
      },
      {
        onSuccess: ({data}) => {
          setIsLoggedIn(true);
          setUserData(data)
          setIsLoginOpen(false)
          toast.success("Login successful");
        },
        onError: (error) => {
          toast.error("Login failed");
          console.error("Login failed:", error);
        },
      }
    );
  };

  if (isRegisterOpen) {
    return <Register onBack={handleBackToLogin} />;
  }
 

  if (isLoggedIn) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
          <p className="text-lg font-medium text-card-foreground">{ isMyProfilePending ? <Loader2 className="animate-spin" /> : myProfile?.data?.user?.username || myProfile?.data?.user?.name }</p>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36 mt-6">
          <Link href="/my-account/my-profile">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <p className="text-sm font-medium text-card-foreground">My Account</p>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <p className="text-sm font-medium text-card-foreground text-red-600" >Logout</p>
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
            <DialogTitle className="text-[48px] font-extrabold">Log In</DialogTitle>
          </div>
        </DialogHeader>

        <div className="mt-5 px-24 pb-16">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="email"
              placeholder="E-mail address"
              className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
              {...register("email")}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            <Input
              type="password"
              placeholder="Password"
              className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
              {...register("password")}
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            <Button
              type="submit"
              className="w-full min-h-[60px] text-lg font-semibold gradient-primary text-white rounded-full mt-10"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login to your account"}
            </Button>
          </form>

          <div className="text-right mt-5">
            <Link href="/forgot-password" className="text-gray-600 hover:underline text-sm">
              Forgot your password?
            </Link>
          </div>

          <div className="flex items-center justify-between mt-10">
            <p className="text-center text-gray-600 mx-4">Or Login with Social Media</p>
            <FacebookIcon />
          </div>

          <Separator className="my-10" />

          <div className="text-left space-x-1">
            <span className="text-gray-600">Don&apos;t have account?</span>
            <button
              onClick={handleOpenRegister}
              className="text-[#FF6B3D] hover:underline font-light"
            >
              Register Now
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
