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
import { useResetPassword } from "@/hooks/api";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
export default function ResetPassword() {
  const router = useRouter();   
    const searchParams = useSearchParams();  
    const email = searchParams.get("email");
    const isAdmin = searchParams.get("admin"); 

    const {mutate: resetPassword,isPending} = useResetPassword();

  const FormSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
    password: z.string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data, "otp form data");
    resetPassword({
        email: email as string,
        password: data.password,
        passwordResetToken: data.pin as string,
    },{
        onSuccess: (data) => {
            toast.success("Password reset successfully");
            console.log(data, "data from hooks");
            if(isAdmin === "true"){
                router.push("/admin/login");
            }else{
                router.push("/");
            }
        },
        onError: (error) => {
            toast.error("Password reset failed");
            console.log(error, "error from hooks");
        },
    })
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md space-y-6">
        <Card className="p-6">
          <div className="flex flex-col items-center">
            <Image
              src={logo}
              alt="Logo"
              width={200}
              height={70}
              className="mb-4"
            />
            <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                Reset Password
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600 mb-4 dark:text-gray-400">
              Enter the OTP code sent to your email address and new password to reset your password
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-center ">
                      OTP Code
                    </FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        {...field}
                        className="w-full text-center text-6xl "
                      >
                        <InputOTPGroup>
                          <InputOTPSlot
                            className="w-12 h-12 border-2 border-orange-300 focus:outline-none"
                            index={0}
                          />
                          <InputOTPSlot
                            className="w-12 h-12 border-2 border-orange-300 focus:outline-none"
                            index={1}
                          />
                          <InputOTPSlot
                            className="w-12 h-12 border-2 border-orange-300 focus:outline-none"
                            index={2}
                          />
                          <InputOTPSlot
                            className="w-12 h-12 border-2 border-orange-300 focus:outline-none"
                            index={3}
                          />
                          <InputOTPSlot
                            className="w-12 h-12 border-2 border-orange-300 focus:outline-none"
                            index={4}
                          />
                          <InputOTPSlot
                            className="w-12 h-12 border-2 border-orange-300 focus:outline-none"
                            index={5}
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-center ">
                      {" "}
                      New Password
                    </FormLabel>
                    <FormControl>
                      <Input className="w-full" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
