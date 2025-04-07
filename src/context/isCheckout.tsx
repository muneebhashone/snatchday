"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

interface CheckoutContextType {
    isCheckout: boolean;
    setIsCheckout: (value: boolean) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
    const [isCheckout, setIsCheckout] = useState(false);

    return (
        <CheckoutContext.Provider value={{ isCheckout, setIsCheckout }}>
            {children}
        </CheckoutContext.Provider>
    );
};

export const useCheckout = () => {
    const context = useContext(CheckoutContext);
    if (context === undefined) {
        throw new Error('useCheckout must be used within a CheckoutProvider');
    }
    return context;
};