"use client";
import { Button } from "@/components/ui/button";
// import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import logo from "@/app/images/logo.png";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForgetPassword, useResetPassword } from "@/hooks/api";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RefreshCw, Key, LockKeyhole } from "lucide-react";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const isAdmin = searchParams.get("admin");
  const [timer, setTimer] = useState(60);
  const [timerActive, setTimerActive] = useState(true);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimerActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, timerActive]);

  // console.log(searchParams.get("email"), "email from search params");

  const { mutate: resetPassword, isPending } = useResetPassword();

  const FormSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data, "otp form data");
    resetPassword(
      {
        email: email as string,
        password: data.password,
        passwordResetToken: data.pin as string,
      },
      {
        onSuccess: (data) => {
          toast.success("Password reset successfully");
          console.log(data, "data from hooks");
          if (isAdmin === "true") {
            router.push("/admin/login");
          } else {
            router.push("/");
          }
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Password reset failed");
          console.log(error, "error from hooks");
        },
      }
    );
  }

  const { mutate: forgetPassword, isPending: isResending } =
    useForgetPassword();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const resendOTP = () => {
    if (!timerActive) {
      forgetPassword(email as string, {
        onSuccess: () => {
          toast.success("OTP sent successfully");
          setTimer(60);
          setTimerActive(true);
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "OTP sending failed");
        },
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto w-full max-w-md">
        <Card className="p-8 shadow-lg border-t-4 border-orange-500 dark:bg-gray-800">
          <div className="flex flex-col items-center">
            <Image
              src={logo}
              alt="Logo"
              width={180}
              height={60}
              className="mb-6"
            />
            <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Reset Password
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600 mb-6 dark:text-gray-400">
              Enter the OTP code sent to <span className="font-medium text-orange-600 dark:text-orange-400">{email}</span>
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-7"
            >
              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Key className="h-5 w-5 text-orange-500" />
                  <h2 className="text-lg font-medium">OTP Verification</h2>
                </div>
                <div className="flex flex-col items-center">
                  <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <InputOTP
                            maxLength={6}
                            {...field}
                            className="justify-center gap-2"
                          >
                            <InputOTPGroup>
                              <InputOTPSlot
                                className="w-11 h-11 border-2 border-gray-300 dark:border-gray-600 focus-within:!border-orange-500 dark:focus-within:!border-orange-400 transition-all rounded-lg text-lg"
                                index={0}
                              />
                              <InputOTPSlot
                                className="w-11 h-11 border-2 border-gray-300 dark:border-gray-600 focus-within:!border-orange-500 dark:focus-within:!border-orange-400 transition-all rounded-lg text-lg"
                                index={1}
                              />
                              <InputOTPSlot
                                className="w-11 h-11 border-2 border-gray-300 dark:border-gray-600 focus-within:!border-orange-500 dark:focus-within:!border-orange-400 transition-all rounded-lg text-lg"
                                index={2}
                              />
                              <InputOTPSlot
                                className="w-11 h-11 border-2 border-gray-300 dark:border-gray-600 focus-within:!border-orange-500 dark:focus-within:!border-orange-400 transition-all rounded-lg text-lg"
                                index={3}
                              />
                              <InputOTPSlot
                                className="w-11 h-11 border-2 border-gray-300 dark:border-gray-600 focus-within:!border-orange-500 dark:focus-within:!border-orange-400 transition-all rounded-lg text-lg"
                                index={4}
                              />
                              <InputOTPSlot
                                className="w-11 h-11 border-2 border-gray-300 dark:border-gray-600 focus-within:!border-orange-500 dark:focus-within:!border-orange-400 transition-all rounded-lg text-lg"
                                index={5}
                              />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage className="text-center" />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-center mt-4">
                    <button
                      type="button"
                      onClick={resendOTP}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm ${
                        timerActive
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700"
                          : "bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                      }`}
                      disabled={timerActive || isResending}
                    >
                      <RefreshCw className="h-4 w-4" />
                      {timerActive ? `Wait ${timer}s` : "Resend OTP"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <LockKeyhole className="h-5 w-5 text-orange-500" />
                  <h2 className="text-lg font-medium">New Password</h2>
                </div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          className="border-gray-300 dark:border-gray-600 focus-visible:ring-orange-500 dark:focus-visible:ring-orange-400" 
                          type="password" 
                          placeholder="Enter your new password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">
                        Must contain at least 6 characters, one uppercase letter and one special character.
                      </p>
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                disabled={isPending}
                className="bg-orange-500 hover:bg-orange-600 text-white dark:bg-orange-600 dark:hover:bg-orange-700 mt-2"
              >
                {isPending ? "Resetting Password..." : "Reset Password"}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
