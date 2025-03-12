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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="flex flex-col items-center">
          <Image
            src={logo}
            alt="Logo"
            width={200}
            height={70}
            className="mb-4"
          />
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Forgot your password?
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter the email address associated with your account and we&apos;ll send
            you a link to reset your password.
          </p>
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
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <Button type="submit" disabled={isPending} className="w-full capitalize">
            {isPending ? "Sending..." : "Submit"}
          </Button>
        </form>
        <div className="flex justify-center">
          <Link
            href="/admin/login"
            className="text-sm underline hover:text-orange-500 font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            prefetch={false}
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
