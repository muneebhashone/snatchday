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
import {
  useVerifyEmail,
  useRequestEmailToken,
  useForgetPassword,
  useResetPassword,
} from "./hooks/api";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "./components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

type OtpModalProps = {
  open: boolean;
  onClose: () => void;
  email: string;
  isOpenLogin?: () => void;
  forgotPasswordModal?: () => void;
};

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const FormSchemaForgotPassword = z.object({
  pin: z
    .string()
    .min(6, { message: "Your one-time password must be 6 characters." }),
  newPassword: z.string().min(6, {
    message: "Your password must be at least 6 characters.",
  }),
});

export default function OtpModal({
  open,
  onClose,
  email,
  isOpenLogin,
  forgotPasswordModal,
}: OtpModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get("admin");
  const { mutate: resetPassword } = useResetPassword();
  const { mutate: forgetPassword, isPending } = useForgetPassword();
  const verifyEmailMutation = useVerifyEmail();
  const { mutate: requestEmailToken, isPending: isResending } =
    useRequestEmailToken();
  const [countdown, setCountdown] = useState(0);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const forgotPasswordForm = useForm<z.infer<typeof FormSchemaForgotPassword>>({
    resolver: zodResolver(FormSchemaForgotPassword),
    defaultValues: {
      pin: "",
      newPassword: "",
    },
  });

  // Handle resend email with countdown
  const handleResendEmail = () => {
    if (countdown > 0) return;
    if (forgotPasswordModal) {
      forgetPassword(email as string, {
        onSuccess: () => {
          toast.success("Email sent successfully");
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Email not found");
        },
      });
    } else {
      requestEmailToken(
        { email },
        {
          onSuccess: () => {
            toast.success("Verification email resent successfully");
            setCountdown(60); // Start 60-second countdown
          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message || "Failed to resend email"
            );
          },
        }
      );
    }
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
        emailVerificationToken: data.pin,
      },
      {
        onSuccess: (data) => {
          toast.success(
            data?.message || "Email verification has been completed"
          );
          isOpenLogin && isOpenLogin();
          onClose();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Something went wrong",
            {
              style: {
                background: "#ff4d4f",
                color: "#fff",
              },
            }
          );
          console.error("Verification failed:", error);
        },
      }
    );
  }

  const onSubmitforgotPassword = (
    data: z.infer<typeof FormSchemaForgotPassword>
  ) => {
    resetPassword(
      {
        email: email as string,
        password: data.newPassword,
        passwordResetToken: data.pin as string,
      },
      {
        onSuccess: (data) => {
          toast.success("Password reset successfully");
          console.log(data, "data from hooks");
          if (isAdmin === "true") {
            router.push("/admin/login");
          } else {
            handleCloseOtpModal();
            router.push("/");
          }
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Password reset failed");
          console.log(error, "error from hooks");
        },
      }
    );
  };

  useEffect(() => {
    if (!open) {
      form.reset();
      setCountdown(0); // Reset countdown when modal closes
    }
  }, [open]);

  const handleCloseOtpModal = () => {
    onClose();
    if (isOpenLogin) {
      isOpenLogin();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseOtpModal}>
      <DialogContent className="max-w-[682px] p-0">
        <DialogHeader className="text-left relative px-24 pt-10">
          <Button
            onClick={handleCloseOtpModal}
            variant="ghost"
            className="absolute -right-5 -top-5 z-30 h-12 w-12 shadow-xl rounded-full bg-white p-0 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </Button>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-[48px] font-extrabold">
              OTP Verification
            </DialogTitle>
          </div>
          <p className="text-gray-600 mt-2">
            Enter the OTP code sent to your email address
          </p>
        </DialogHeader>

        <div className="mt-5 px-24 pb-16">
          {forgotPasswordModal ? (
            <Form {...forgotPasswordForm}>
              <form
                onSubmit={forgotPasswordForm.handleSubmit(
                  onSubmitforgotPassword
                )}
                className="space-y-8"
              >
                <FormField
                  control={forgotPasswordForm.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup className="gap-4 flex justify-center">
                            {[...Array(6)].map((_, i) => (
                              <InputOTPSlot
                                key={i}
                                index={i}
                                className="w-14 h-14 border-2 border-gray-200 focus:border-primary text-2xl rounded-xl"
                              />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage className="text-center" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={forgotPasswordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="New Password"
                          {...field}
                          className="w-full min-h-[60px] text-lg border-2 border-gray-200 focus:border-primary rounded-xl px-4"
                        />
                      </FormControl>
                      <FormMessage className="text-center" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={verifyEmailMutation.isPending}
                  className="w-full min-h-[60px] text-lg font-semibold gradient-primary text-white rounded-full mt-10"
                >
                  {verifyEmailMutation.isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Verifying...
                    </div>
                  ) : (
                    "Verify OTP"
                  )}
                </Button>

                <div className="text-center mt-6">
                  {countdown > 0 ? (
                    <p className="text-gray-600">
                      Resend code in{" "}
                      <span className="text-primary font-medium">
                        {countdown}s
                      </span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendEmail}
                      disabled={isResending}
                      className="text-primary hover:text-primary/80 font-medium focus:outline-none"
                    >
                      {isResending ? (
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Resending...
                        </div>
                      ) : (
                        "Resend Verification Code"
                      )}
                    </button>
                  )}
                </div>
              </form>
            </Form>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup className="gap-4 flex justify-center">
                            {[...Array(6)].map((_, i) => (
                              <InputOTPSlot
                                key={i}
                                index={i}
                                className="w-14 h-14 border-2 border-gray-200 focus:border-primary text-2xl rounded-xl"
                              />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage className="text-center" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={verifyEmailMutation.isPending}
                  className="w-full min-h-[60px] text-lg font-semibold gradient-primary text-white rounded-full mt-10"
                >
                  {verifyEmailMutation.isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Verifying...
                    </div>
                  ) : (
                    "Verify OTP"
                  )}
                </Button>

                <div className="text-center mt-6">
                  {countdown > 0 ? (
                    <p className="text-gray-600">
                      Resend code in{" "}
                      <span className="text-primary font-medium">
                        {countdown}s
                      </span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendEmail}
                      disabled={isResending}
                      className="text-primary hover:text-primary/80 font-medium focus:outline-none"
                    >
                      {isResending ? (
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Resending...
                        </div>
                      ) : (
                        "Resend Verification Code"
                      )}
                    </button>
                  )}
                </div>
              </form>
            </Form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
