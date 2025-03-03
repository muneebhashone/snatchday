"use client";

import Loading from "@/app/loading";
import { useAuth } from "@/components/context/authContext";
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  const { loading } = useAuth();

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
