"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  role: string; 
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allCookies = document.cookie
    console.log(allCookies, "sessionData")
   
    const sessionData = allCookies.split(";").find(row => row.startsWith("connect.sid="));

    if (sessionData) {
      try {
        const parsedSession = JSON.parse(sessionData);
        if (parsedSession.expires && new Date(parsedSession.expires) < new Date()) {
          setUser(null);
        } else {
          setUser(parsedSession.user);
        }
      } catch (error) {
        console.error("Error parsing session cookie:", error);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
