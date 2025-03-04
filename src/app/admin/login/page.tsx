"use client";

import Loading from "@/app/loading";
import { useAuth } from "@/components/context/authContext";
import { LoginForm } from "@/components/login-form"
import { authApi } from "@/hooks/api";
import { useEffect } from "react";

export default function LoginPage() {
  const { loading } = useAuth();
  const { mutate: login, isPending } = authApi();

  useEffect(()=>{
    login(
      {
        data: {
          email: "test@gmail.com",
          password: "111111",
        },
        type: "login",
      },
      {
        onSuccess: ({ data }) => {
          console.log(data, "data from login page");
          // setUserData(data);
          // router.push("/admin");
        },
        onError: (error) => {
          console.error("Login failed:", error);
        },
      }
    );
  }, [])
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
