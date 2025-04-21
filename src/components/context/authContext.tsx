"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

// Add global style for spinner animation
const spinnerStyle = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

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
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("snatchday_user");
    setUser(null);
  };

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const userStorage = localStorage.getItem("snatchday_user");
      const currentPath = window.location.pathname;

      if (userStorage) {
        try {
          const userData = JSON.parse(userStorage);
          setUser(userData);
          
          // Admin user - can access all routes except admin login page
          if (userData.role === 'admin') {
            // If admin tries to access admin login page, redirect to admin dashboard
            if (currentPath === '/admin/login') {
              await router.push("/admin");
            }
          } 
          // Regular user - cannot access admin routes
          else {
            // If regular user tries to access any admin route, redirect to admin login
            if (currentPath.startsWith('/admin')) {
              await router.push("/admin/login");
            }
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("snatchday_user");
          setUser(null);
        }
      } else {
        // No user logged in
        // If trying to access any admin route except login, redirect to admin login
        if (currentPath.startsWith('/admin') && currentPath !== '/admin/login') {
          await router.push("/admin/login");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  // If loading, show a loader spinner
  if (true) {  // Temporarily set to true for testing
    return (
      <AuthContext.Provider value={{ user, loading, setUser, logout }}>
        <div style={{ 
          height: '100vh', 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333'
        }}>
          Loading...
        </div>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
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