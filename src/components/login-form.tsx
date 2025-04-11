"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthApi } from "@/hooks/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useUserContext } from "@/context/userContext";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import logo from "@/app/images/logo.png";
import { useSocket } from "@/context/SocketContext";
// Form validation schema
const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const { setUserData } = useUserContext();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "admin@ah2k.dev",
      password: "Snatchday@123",
    },
  });
  const { socket } = useSocket();

  const { mutate: login, isPending } = useAuthApi();

  const onSubmit = async (data: LoginFormValues) => {
    setIsRedirecting(true);
    login(
      {
        data: {
          email: data.email,
          password: data.password,
        },
        type: "login",
      },
      {
        onSuccess: ({ data }) => {
          socket.emit("join", data?.user?._id);
          setUserData(data);
          toast.success("Login successfully");
          router.push("/admin");
        },
        onError: (error) => {
          console.error("Login failed:", error);
          toast.error("Login failed");
        },
        onSettled: () => {
          setIsRedirecting(false);
        },
      }
    );
  };

  return (
    <>
      {isRedirecting ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Image src={logo} alt="Snatchday Logo" className="mb-4" />
          <Loader2 className="animate-spin size-14" />
        </div>
      ) : (
        <>
          <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="email">Email</Label>
                          <FormControl>
                            <Input
                              {...field}
                              id="email"
                              type="email"
                              placeholder="m@example.com"
                            />
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
                          <Label htmlFor="password">Password</Label>
                          <FormControl>
                            <Input {...field} id="password" type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full hover:bg-orange-500"
                      disabled={isPending}
                    >
                      {isPending ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </Form>
                <div className="flex justify-end my-2">
                  <Link
                    href={{
                      pathname: "/forgot-password",
                      query: { ref: "admin" },
                    }}
                    className="underline text-sm hover:text-orange-500"
                  >
                    Forgot password
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
}
