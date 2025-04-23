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
import { User, X, LogOut, Loader2, ShoppingCartIcon } from "lucide-react";
import { FacebookIcon } from "../icons/icon";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useRequestEmailToken } from "@/hooks/api";
import Register from "./Register";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthApi, useGetMyProfile, useLogout } from "@/hooks/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import GredientButton from "../GredientButton";
import { useSocket } from "@/context/SocketContext";
import OtpModal from "@/otpmodal";
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

interface LoginProps {
  type?: string;
  addToCart?: boolean;
  smallAddtoCart?: boolean;
  useForTournament?: boolean;
}

const Login = ({
  type,
  addToCart = false,
  smallAddtoCart = false,
  useForTournament = false,
}: LoginProps) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [showResendButton, setShowResendButton] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);

  const { user, setUserData, logout } = useUserContext();
  const { data: myProfile, isPending: isMyProfilePending } = useGetMyProfile();
  const { mutate: Userlogout } = useLogout();
  const { mutate: requestEmailToken, isPending: isResending } =
    useRequestEmailToken();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { socket } = useSocket();

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
        toast.success("Logout successfully");
        socket.emit("logout");
        setUserData(null);
        setIsLoggedIn(false);
        setIsLoginOpen(false);
        logout();
       
        window.location.href = "/";
      },
      onError: (error) => {
        console.error("Logout failed:", error);
        toast.error("Logout failed");
      },
    });
  };

  // useEffect(() => {
  //   if (user) {
  //     setIsLoggedIn(true);
  //   }
  // }, [user]);

  useEffect(() => {
    if (isLoginOpen) {
      setShowResendButton(false);
      setIsEmailVerified(true);
    }
  }, [isLoginOpen]);

  if (isOtpOpen) {
    return (
      <OtpModal
        open={isOtpOpen}
        onClose={() => setIsOtpOpen(false)}
        email={getValues("email")}
      />
    );
  }

  const handleLogin = async (data) => {
    try {
      setIsLoggedIn(true);
      const res = await fetch("/api/v2/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const response = await res.json();
      if (res.ok) {
        socket.emit("join", response?.data?.user?._id);
        setUserData(response?.data);
        setIsLoginOpen(false);
        setIsEmailVerified(true);
        setShowResendButton(false);
        toast.success("Login successful");
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setIsLoggedIn(false);
    }
  };

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    handleLogin(data);
    // login(
    //   {
    //     data: {
    //       email: data.email,
    //       password: data.password,
    //     },
    //     type: "login",
    //   },
    //   {
    //     onSuccess: ({ data }) => {
    //       socket.emit("join", data?.user?._id);
    //       setIsLoggedIn(true);
    //       setUserData(data);
    //       setIsLoginOpen(false);
    //       setIsEmailVerified(true);
    //         setShowResendButton(false);
    //       toast.success("Login successful");
    //     },
    //     onError: (error) => {

    //       toast.error(error?.response?.data?.message || "Login failed", {
    //         style: {
    //           background: "#ff4d4f",
    //           color: "#fff",
    //         },
    //       });
    //       if (error?.response?.data?.message === "User not approved yet") {
    //         setIsEmailVerified(false);
    //         setShowResendButton(true);
    //       }
    //       console.error("Login failed:", error);
    //     },
    //   }
    // );
  };

  if (isRegisterOpen) {
    return <Register onBack={handleBackToLogin} />;
  }


  if (myProfile?.data?.user?.username) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
          <p className="text-lg font-medium text-card-foreground">
            {isMyProfilePending ? (
              <Loader2 className="animate-spin" />
            ) : (
              myProfile?.data?.user?.username || myProfile?.data?.user?.name
            )}
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36 mt-6">
          <Link href="/my-account/my-profile">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <p className="text-sm font-medium text-card-foreground">
                My Account
              </p>
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
  const handleResendVerification = (e: any) => {
    e.preventDefault();
    const email = getValues("email");
    requestEmailToken(
      { email },
      {
        onSuccess: () => {
          toast.success("Verification email sent successfully");
          setIsOtpOpen(true);
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "Failed to resend email"
          );
        },
      }
    );
  };

  return (
    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          {type === "TournamentRegister" ? (
            "Login"
          ) : type === "Register" ? (
            <GredientButton
              buttonText="Register for free"
              onClick={() => setIsRegisterOpen(true)}
            />
          ) : addToCart === false ? (
            <User className="h-6 w-6" />
          ) : useForTournament ? (
            <Button className="hover:bg-primary ">Play</Button>
          ) : (
            <button
              className={`gradient-primary flex items-center shadow-xl justify-center text-white text-lg rounded-full hover:opacity-90 ${
                smallAddtoCart ? "py-1 px-7 text-sm" : "w-64 h-14"
              } `}
            >
              <ShoppingCartIcon size={28} className="mr-2" />
              Add to Cart
              {/* {isAddToCartPending ? "adding..." : "Add to Cart"} */}
            </button>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[682px] p-0 " hideCloseButton={true}>
        <DialogHeader className="text-left relative px-24 pt-10 ">
          <DialogTrigger asChild className="absolute -right-5 -top-5 z-30">
            <Button
              onClick={() => reset()}
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="email"
              placeholder="E-mail address"
              className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <Input
              type="password"
              placeholder="Password"
              className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            {showResendButton && (
              <Button
                type="button"
                onClick={handleResendVerification}
                disabled={isResending}
                className="w-full min-h-[60px] text-lg font-semibold bg-orange-500 text-white rounded-full mt-4"
              >
                {isResending ? "Resending..." : "Resend Verification Code"}
              </Button>
            )}
            <Button
              type="submit"
              className="w-full min-h-[60px] text-lg font-semibold gradient-primary text-white rounded-full mt-10"
              disabled={isLoggedIn}
            >
              {isLoggedIn ? "Logging in..." : "Login to your account"}
            </Button>
          </form>

          <div className="text-right mt-5">
            <Link
              href="/forgot-password"
              className="text-gray-600 hover:underline text-sm"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="flex items-center justify-between mt-10">
            <p className="text-center text-gray-600 mx-4">
              Or Login with Social Media
            </p>
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
