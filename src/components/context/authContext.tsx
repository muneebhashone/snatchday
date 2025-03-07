"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("snatchday_user");

    if (user) {
      const userData = JSON.parse(user);
      setUser(userData);
      
      if (userData.user.role === 'admin') {
        if (window.location.pathname === '/admin/login' || window.location.pathname === '/') {
          router.push("/admin");
        }
      }
    } else {
      // No user logged in
      const allowedPaths = ['/forgot-password', '/otp',"/reset-password", '/admin/login']; 
      if (!allowedPaths.includes(window.location.pathname) && window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/admin/login')) {
        router.push("/admin/login");
      }
    }
    setLoading(false);
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
