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

const schema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters").nonempty("Confirm Password is required"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // path of the error message
});

export default function ResetPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: z.infer<typeof schema>) => {
        console.log(data);
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
                        Reset your password
                    </h1>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Enter a new password to reset your account.
                    </p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} method="POST">
                    <div>
                        <Label htmlFor="password" className="sr-only">
                            New password
                        </Label>
                        <Input
                            id="password"
                            {...register("password")}
                            type="password"
                            autoComplete="new-password"
                            required
                            placeholder="New password"
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="confirmPassword" className="sr-only">
                            Confirm password
                        </Label>
                        <Input
                            id="confirmPassword"
                            {...register("confirmPassword")}
                            type="password"
                            autoComplete="new-password"
                            required
                            placeholder="Confirm password"
                        />
                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                    </div>
                    <Button type="submit" className="w-full capitalize">
                        submit
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
