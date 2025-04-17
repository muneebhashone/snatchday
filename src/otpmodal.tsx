"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useVerifyEmail, useRequestEmailToken } from "./hooks/api";
import { toast } from "sonner";

type OtpModalProps = {
  open: boolean;
  onClose: () => void;
  email: string;
  isOpenLogin?: () => void;
};

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function OtpModal({ open, onClose, email, isOpenLogin }: OtpModalProps) {
    const verifyEmailMutation = useVerifyEmail();
    const { mutate: requestEmailToken, isPending: isResending } = useRequestEmailToken();
  const [countdown, setCountdown] = useState(0);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  // Handle resend email with countdown
  const handleResendEmail = () => {
    if (countdown > 0) return;

    requestEmailToken({ email }, {
      onSuccess: () => {
        toast.success("Verification email resent successfully");
        setCountdown(60); // Start 60-second countdown
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Failed to resend email");
      }
    });
  };

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    verifyEmailMutation.mutate(
      {
        email,
        emailVerificationToken: Number(data.pin),
      },
      {
        onSuccess: (data) => {
          toast.success(data?.message || "Email verification has been completed");
          isOpenLogin();
          onClose();
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Something went wrong", {
            style: {
              background: "#ff4d4f",
              color: "#fff",
            },
          });
          console.error("Verification failed:", error);
        },
      }
    );
  }
  

  useEffect(() => {
    if (!open) {
      form.reset();
      setCountdown(0); // Reset countdown when modal closes
    }
  }, [open]);

const handleCloseOtpModal=()=>{

  onClose()
  isOpenLogin();
}

  return (
    <Dialog open={open}   onOpenChange={handleCloseOtpModal}>
      <DialogContent className="max-w-lg">
        <div className="flex flex-col items-center">
          <Image
            src={logo}
            alt="Logo"
            width={200}
            height={70}
            className="mb-4"
          />
          <h1 className="mt-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
            OTP Verification
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Enter the OTP code sent to your email address
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-6"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-center text-lg font-medium">OTP Code</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field} className="text-center text-6xl">
                      <InputOTPGroup>
                        {[...Array(6)].map((_, i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="w-12 h-12 border-2 border-orange-300 focus:outline-none"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={verifyEmailMutation.isPending} className="w-full">
              {verifyEmailMutation.isPending ? "Submitting....." : "Submit"}
            </Button>
            
            <div className="text-center text-sm text-gray-600">
              {countdown > 0 ? (
                <span>Resend available in {countdown} seconds</span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className="text-primary hover:text-primary/80 underline focus:outline-none"
                >
                  {isResending ? "Resending..." : "Resend Verification Code"}
                </button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}