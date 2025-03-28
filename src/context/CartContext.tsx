"use client";
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext(null);
interface CartProviderProps {
  children: React.ReactNode;
}   

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartData, setCartData] = useState(null);
  return (
    <CartContext.Provider value={{ cartCount, setCartCount, cartData, setCartData }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
