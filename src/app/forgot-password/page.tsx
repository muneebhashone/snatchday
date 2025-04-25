"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/images/logo.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgetPassword } from "@/hooks/api";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { AtSign } from "lucide-react";

const schema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
});

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const { mutate: forgetPassword, isPending } = useForgetPassword();
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref"); 
  const isAdmin = ref === "admin"; 

  const onSubmit = (data: z.infer<typeof schema>) => {
    forgetPassword(data.email as string,{
      onSuccess: () => {
        toast.success("Email sent successfully");
        router.push(`/reset-password?email=${data.email}&admin=${isAdmin}`); // Pass isAdmin as a query parameter
      },
      onError: (error) => {
        toast.error("Email not found");
      },
    });
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
              Forgot your password?
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600 mb-6 dark:text-gray-400">
              Enter the email address associated with your account and we&apos;ll send
              you a link to reset your password.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <AtSign className="h-5 w-5 text-orange-500" />
              <h2 className="text-lg font-medium">Email Address</h2>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} method="POST">
              <div>
                <Label htmlFor="email" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="email"
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  className="border-gray-300 dark:border-gray-600 focus-visible:ring-orange-500 dark:focus-visible:ring-orange-400"
                />
                {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>}
              </div>
              <Button 
                type="submit" 
                disabled={isPending} 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white dark:bg-orange-600 dark:hover:bg-orange-700"
              >
                {isPending ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </div>
          
          <div className="flex justify-center mt-6">
            <Link
              href={`${isAdmin ? "/admin/login" : "/"}`}
              className="text-sm font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
              prefetch={false}
            >
              Back to login
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
