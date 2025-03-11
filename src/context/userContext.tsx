"use client"
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  emailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}


export type UserContextType = {
  user: User | null;
  setUserData: (value: User | null) => void;
  logout: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

const INITIAL_VALUE = null;
const STORAGE_KEY = "snatchday_user";

const getUserFromStorage = (): User | null => {
  if (typeof window === "undefined") return INITIAL_VALUE;
  
  const storedUser = localStorage.getItem(STORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : INITIAL_VALUE;
};

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => getUserFromStorage());

  const setUserData = (userData: User | null) => {
   
    setUser(userData);
  };

  const logout = async () => {
    setUser(INITIAL_VALUE);
    localStorage.removeItem(STORAGE_KEY);
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}; 