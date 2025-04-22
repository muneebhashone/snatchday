"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();
  
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const isAdmin = session?.user?.role === "admin";
  
  return {
    session,
    status,
    isAuthenticated,
    isLoading,
    isAdmin,
    user: session?.user,
    signIn,
    signOut,
  };
} 